import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import { ERROR_STORE_KEY } from 'src/constants';
import { useAtrament, useAtramentState } from 'src/atrament/hooks';
import { useKeyboardHandler } from 'src/hooks';

import ErrorModal from 'src/components/ui/error-modal';

const StoryError = () => {
  const { atrament } = useAtrament();
  const atramentState = useAtramentState([ERROR_STORE_KEY]);

  const closeModal = useCallback(() => atrament.state.setKey(ERROR_STORE_KEY, null), [ atrament ]);

  const escHandler = useCallback((e) => {
    if (e.key === "Escape") {
      closeModal()
    }
  }, [ closeModal ]);

  useKeyboardHandler(escHandler);

  if (atramentState[ERROR_STORE_KEY]) {
    return <ErrorModal close={closeModal} message={atramentState[ERROR_STORE_KEY]} />;
  }
};

export default StoryError;