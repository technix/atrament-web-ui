import { useState, useEffect } from 'preact/hooks';
import { useAtrament } from './use-atrament';
import { useAtramentState } from './use-atrament-state';

export const useAtramentSaves = () => {
  const [ canBeResumed, setResumeState ] = useState(false);
  const [ canBeLoaded, setLoadedState ] = useState(false);
  const { atrament, canResume } = useAtrament();
  const { metadata } = useAtramentState(['metadata']);

  const checkForSaves = async () => {
    const canResumeGame = await canResume();
    setResumeState(!!canResumeGame);
    const existingSaves = await atrament.game.listSaves();
    const saves = existingSaves.filter(
      (s) => {
        if (metadata.load_from_checkpoints && s.type === atrament.game.SAVE_CHECKPOINT) {
          return true;
        }
        return s.type === atrament.game.SAVE_GAME;
      }
    );
    setLoadedState(saves.length > 0);
  }

  useEffect(() => { checkForSaves(); });

  return [ canBeResumed, canBeLoaded ];
};

