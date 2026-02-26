import { useContext } from 'preact/hooks';
import { AtramentContext } from 'src/context';
import { useStore } from '@nanostores/preact';

export const useAtramentState = (keys = undefined) => {
  const atrament = useContext(AtramentContext);
  return useStore(atrament.store, { keys });
};
