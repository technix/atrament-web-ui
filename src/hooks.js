import { useEffect } from 'preact/hooks';

export function useKeyboardHandler(handlerFunction) {
  useEffect(() => {
    document.addEventListener("keydown", handlerFunction, false);
    return () => document.removeEventListener("keydown", handlerFunction, false);
  }, [ handlerFunction ]);
}
