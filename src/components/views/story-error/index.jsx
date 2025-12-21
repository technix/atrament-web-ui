import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import { useKeyboardHandler } from 'src/hooks';
import useErrorContent from 'src/content/use-error-content';

import ErrorModal from 'src/components/ui/error-modal';

const StoryError = () => {
  const [ errorMessage, clearError ] = useErrorContent();

  const escHandler = useCallback((e) => {
    if (e.key === "Escape") {
      clearError()
    }
  }, [ clearError ]);

  useKeyboardHandler(escHandler);

  if (errorMessage) {
    return <ErrorModal close={clearError} message={errorMessage} />;
  }
};

export default StoryError;
