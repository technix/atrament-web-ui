import { h } from 'preact';
import { useEffect, useCallback } from 'preact/hooks';

import { useAtrament, useAtramentState } from 'src/atrament/hooks';

import ErrorModal from 'src/components/ui/error-modal';

const ErrorStory = () => {
  const { atrament } = useAtrament();
  const atramentState = useAtramentState(['ERROR']);

  const closeModal = useCallback(() => atrament.state.setKey('ERROR', null), [ atrament ]);

  const escHandler = useCallback((e) => {
    if (e.key === "Escape") {
      closeModal()
    }
  }, [ closeModal ]);

  useEffect(() => {
    document.addEventListener("keydown", escHandler, false);
    return () => {
      document.removeEventListener("keydown", escHandler, false);
    }
  }, [ escHandler ]);

  if (atramentState.ERROR) {
    return <ErrorModal close={closeModal} message={atramentState.ERROR} />;
  }
};

export default ErrorStory;