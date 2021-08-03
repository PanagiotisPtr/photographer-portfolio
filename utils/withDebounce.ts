import { useState } from 'react';

type CallbackFunction<T> = (...args: any[]) => T;

/**
 * withDebounce
 *
 * Prevents function from being called too many times
 * within a time period
 * 
 * @param {CallbackFunction<T>} callback the function to call
 * @param {number} delay the time to wait before calling again
 *
 * @return {CallbackFunction<T | null>} new callback function
 */
const withDebounce = <T extends unknown>(
  callback: CallbackFunction<T>,
  delay: number
): CallbackFunction<T | null> => {
  const [ready, setReady] = useState<boolean>(true);

  return (...args: any[]) => {
    if (ready) {
      setReady(false);

      setTimeout(() => setReady(true), delay);

      return callback(...args);
    }
    
    return null;
  }
};

export default withDebounce;
