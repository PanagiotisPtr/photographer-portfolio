import { useState, useEffect, KeyboardEvent } from "react";
import { CallbackFunction } from "../utils/types/CallbackFunction";

/**
 * useKeyEvents
 *
 * A React hook that returns a handler for a specific
 * key-press event
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code
 *
 * @param {string} targetKey this is the KeyboardEvent.key value
 *                 NOT the KeyboardEvent.keyCode - which is a number
 *
 * @returns {boolean} isDesktop whether or not we are
 *                    the window has desktop dimensions
 */
const useKeyEvents = (targetKey: string): boolean => {
  const [keyPressed, setKeyPressed] = useState<boolean>(false);

  const keyDownHandler = ({ key }: globalThis.KeyboardEvent) =>
    key === targetKey && setKeyPressed(true);

  const keyUpHandler = ({ key }: globalThis.KeyboardEvent) =>
    key === targetKey && setKeyPressed(false);

  useEffect(() => {
    window.addEventListener("keydown", keyDownHandler);
    window.addEventListener("keyup", keyUpHandler);

    return () => {
      window.removeEventListener("keydown", keyDownHandler);
      window.removeEventListener("keyup", keyUpHandler);
    };
  }, []);

  return keyPressed;
};

export default useKeyEvents;
