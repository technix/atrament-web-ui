import { h } from 'preact';
import { useTranslator } from '@eo-locale/preact';
import { useEffect, useState, useCallback } from 'preact/hooks';

import { appLocale } from 'src/constants';
import { useAtrament, useAtramentState } from 'src/atrament/hooks';

import MenuListItem from 'src/components/ui/menu-list-item';

const datefmt = (date) => new Date(date).toLocaleString(appLocale);


const LoadGameView = ({ loadGame, hasConfirmation = false }) => {
  const [ saveslots, setSaveslots ] = useState([]);
  const translator = useTranslator();
  const { atrament } = useAtrament();
  const { metadata } = useAtramentState(['metadata']);
  
  const initLoadgame = useCallback(async () => {
    const existingSaves = await atrament.game.listSaves();
    const saveSlotList = [];
    // autosave
    const autosave = existingSaves
      .filter((s) => s.type === atrament.game.SAVE_AUTOSAVE)
      .map((s) => ({ ...s, slot: translator.translate('main.autosave', { date: datefmt(s.date) }) }));
    if (autosave.length) {
      saveSlotList.push(autosave[0]);
    }
    // checkpoints
    if (metadata.load_from_checkpoints) {
      const checkpoints = existingSaves
        .filter((s) => s.type === atrament.game.SAVE_CHECKPOINT)
        .map((s) => ({
          ...s,
          slot: typeof s.name === 'boolean'
            ? translator.translate('main.checkpoint')
            : translator.translate('main.checkpoint-named', { name: s.name })
        }));
      if (checkpoints.length) {
        saveSlotList.push(...checkpoints);
      }
    }
    // saved games
    const saves = existingSaves
      .filter((s) => s.type === atrament.game.SAVE_GAME)
      .map((s) => ({ ...s, slot: datefmt(s.date) }));
    saveSlotList.push(...saves);
    // done
    setSaveslots(saveSlotList);
  }, [ atrament, metadata, translator ]);

  const startSavedGame = useCallback(async (ev) => {
    const chosenSaveslot = ev.target.getAttribute('data-save');
    await loadGame(chosenSaveslot);
  }, [ loadGame ]);

  const deleteSavedGame = useCallback(async (ev) => {
    const chosenSaveslot = ev.target.getAttribute('data-save');
    await atrament.game.removeSave(chosenSaveslot);
    await initLoadgame();
  }, [ atrament, initLoadgame ]);

  useEffect(() => {
    const onLoad = async () => initLoadgame();
    onLoad();
  }, [ initLoadgame ]);

  return (
    <>      
      {saveslots.map((s) => 
        <MenuListItem
          key={s.name}
          onSelect={startSavedGame}
          onDelete={deleteSavedGame}
          isDisabled={!s.type}
          isDeletable={s.type}
          deletePrompt={translator.translate('main.delete-save')}
          hasConfirmation={hasConfirmation}
          confirmPrompt={translator.translate('main.confirm-load')}
          attributes={{
            "data-save": s.id
          }}
        >
          {s.slot}
        </MenuListItem>
      )}
    </>
  );
};

export default LoadGameView;
