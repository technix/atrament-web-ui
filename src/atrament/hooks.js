import { useContext } from 'preact/hooks';
import { useStore } from '@nanostores/preact';
import AtramentContext from 'src/atrament/context';

const useAtrament = () => {
  const atrament = useContext(AtramentContext);
  const state = useStore(atrament.store);

  return {
    atrament,
    state,
    canResume: atrament.game.canResume,
    gameStart: atrament.game.start,
    gameResume: atrament.game.resume,
    makeChoice: atrament.game.makeChoice,
    continueStory: atrament.game.continueStory,
    updateSettings: (name, value) => {
      atrament.settings.set(name, value);
      atrament.settings.save();
    }
  };
};

export default useAtrament;
