import { useEffect, useState, useCallback } from 'preact/hooks';

export function useKeyboardHandler(handlerFunction) {
  useEffect(() => {
    document.addEventListener("keydown", handlerFunction, false);
    return () => document.removeEventListener("keydown", handlerFunction, false);
  }, [ handlerFunction ]);
}

export function useToggle(initialValue = false) {
  const [ currentToggleValue, setToggleValue ] = useState(initialValue);
  const toggle = useCallback(() => setToggleValue((v) => !v), []);
  const enable = useCallback(() => setToggleValue(true), []);
  const disable = useCallback(() => setToggleValue(false), []);
  return [ currentToggleValue, toggle, setToggleValue, enable, disable ];
}
