import { h } from 'preact';
import { Text, useTranslator } from '@eo-locale/preact';
import { useEffect, useState, useCallback } from 'preact/hooks';

import { appLocale } from 'src/constants';
import { useAtrament, useAtramentState } from 'src/atrament/hooks';

import MenuListItem from 'src/components/ui/menu-list-item';

const datefmt = (date) => new Date(date).toLocaleString(appLocale);


const LoadGameView = ({ loadGame }) => {
  const [ saveslots, setSaveslots ] = useState([]);
  const translator = useTranslator();
  const { atrament } = useAtrament();
  const { metadata } = useAtramentState(['metadata']);
  
  const initLoadgame = useCallback(async () => {
    const existingSaves = await atrament.game.listSaves();
    const saveSlotList = [];
    // autosave
    const autosave = existingSaves.filter((s) => s.type === atrament.game.SAVE_AUTOSAVE)[0];
    if (autosave) {
      saveSlotList.push({
        ...autosave,
        slot: translator.translate('main.autosave', { date: datefmt(autosave.date)})
      });
    }
    // checkpoints
    if (metadata.load_from_checkpoints) {
      const checkpoints = existingSaves.filter((s) => s.type === atrament.game.SAVE_CHECKPOINT);
      if (checkpoints.length) {
        checkpoints.forEach((c) => saveSlotList.push({
          ...c,
          slot: typeof c.name === 'boolean'
            ? translator.translate('main.checkpoint')
            : translator.translate('main.checkpoint-named', { name: c.name })
        }));
      }
    }
    // saved games
    const saves = existingSaves.filter((s) => s.type === atrament.game.SAVE_GAME);
    [...Array(+metadata.saveslots).keys()].forEach((s) => {
      if (saves[s]) {
        saveSlotList.push({ ...saves[s], slot: datefmt(autosave.date) });
      } else {
        saveSlotList.push({});
      }
    })
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
          attributes={{
            "data-save": s.id
          }}
        >
          {s.type
            ? s.slot
            : <Text id='main.emptyslot' />
          }
        </MenuListItem>
      )}
    </>
  );
};

export default LoadGameView;