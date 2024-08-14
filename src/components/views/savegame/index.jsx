import { h } from 'preact';
import { Text, useTranslator } from '@eo-locale/preact';
import { useEffect, useState, useCallback } from 'preact/hooks';

import { appLocale } from 'src/constants';
import { useAtrament, useAtramentState } from 'src/atrament/hooks';

import MenuListItem from 'src/components/ui/menu-list-item';

const datefmt = (date) => new Date(date).toLocaleString(appLocale);

const SaveGameView = ({ saveGame }) => {
  const [ saveslots, setSaveslots ] = useState([]);
  const translator = useTranslator();
  const { atrament } = useAtrament();
  const { metadata } = useAtramentState(['metadata']);
  
  const initSavegame = useCallback(async () => {
    const existingSaves = await atrament.game.listSaves();
    // saved games
    const saves = existingSaves
      .filter((s) => s.type === atrament.game.SAVE_GAME)
      .map((s) => ({ ...s, slot: datefmt(s.date) }));
    if (saves.length < +metadata.saveslots) {
      saves.push({ name: saves.length + 1 });
    }
    setSaveslots(saves);
  }, [ atrament, metadata ]);

  const saveGameToSlot = useCallback(async (ev) => {
    const chosenSaveslot = ev.target.getAttribute('data-savename');
    await saveGame(chosenSaveslot);
    await initSavegame();
  }, [ saveGame, initSavegame ]);

  const deleteSavedGame = useCallback(async (ev) => {
    const chosenSaveslot = ev.target.getAttribute('data-saveid');
    await atrament.game.removeSave(chosenSaveslot);
    await initSavegame();
  }, [ atrament, initSavegame ]);

  useEffect(() => {
    const onLoad = async () => initSavegame();
    onLoad();
  }, [ initSavegame ]);

  return (
    <>      
      {saveslots.map((s) => 
        <MenuListItem
          key={s.name}
          onSelect={saveGameToSlot}
          onDelete={deleteSavedGame}
          isDisabled={false}
          isDeletable={s.type}
          deletePrompt={translator.translate('main.delete-save')}
          hasConfirmation={s.type}
          confirmPrompt={translator.translate('main.confirm-save')}
          attributes={{
            "data-saveid": s.id,
            "data-savename": s.name
          }}
        >
          {s.type
            ? s.slot
            : <Text id='main.new-save' />
          }
        </MenuListItem>
      )}
    </>
  );
};

export default SaveGameView;