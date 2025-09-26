import { useCallback } from 'preact/hooks';
import { ERROR_STORE_KEY } from 'src/constants';
import { useAtrament, useAtramentState } from 'src/atrament/hooks';

export default function useErrorContent() {
  const { atrament } = useAtrament();
  const atramentState = useAtramentState([ERROR_STORE_KEY]);
  const clearError = useCallback(() => atrament.state.setKey(ERROR_STORE_KEY, null), [ atrament ]);
  return [ atramentState[ERROR_STORE_KEY], clearError ];
}
