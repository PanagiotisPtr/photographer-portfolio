import React, { useRef } from "react";
import { CallbackFunction } from "../utils/types/CallbackFunction";

/**
 * useFocus
 *
 * A React hook that sets focus to an HTML element
 *
 * @returns {[React.RefObject<T>, CallbackFunction<void>]}
 *          an array with two entries. The html reference to the element
 *          and a handler to set the focus to that element
 */
const useFocus = <T extends HTMLElement>() => {
  const htmlElementReference: React.RefObject<T> = useRef<T>(null);
  const setFocus: CallbackFunction<void> = () => {
    htmlElementReference.current && htmlElementReference.current.focus();
  };

  return [htmlElementReference, setFocus];
};

export default useFocus;
