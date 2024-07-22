import { useContext, useCallback } from 'preact/hooks';
import { useStore } from '@nanostores/preact';
import AtramentContext from 'src/atrament/context';

export const useAtrament = () => {
  const atrament = useContext(AtramentContext);

  const getAssetPath = useCallback(
    (file) => file ? atrament.game.getAssetPath(file) : null,
    [ atrament ]
  );

  const updateSettings = useCallback(
    (name, value) => {
      atrament.settings.set(name, value);
      atrament.settings.save();
    },
    [ atrament ]
  );

  return {
    atrament,
    canResume: atrament.game.canResume,
    gameStart: atrament.game.start,
    gameResume: atrament.game.resume,
    makeChoice: atrament.game.makeChoice,
    continueStory: atrament.game.continueStory,
    getAssetPath,
    updateSettings
  };
};

export const useAtramentState = () => {
  const atrament = useContext(AtramentContext);
  return useStore(atrament.store);
}
