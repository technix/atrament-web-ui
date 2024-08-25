import { h } from 'preact';
import { useTranslator } from '@eo-locale/preact';
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
  const numberOfSaveSlots = metadata.saves ? +metadata.saves : 0;
  
  const initSavegame = useCallback(async () => {
    const existingSaves = await atrament.game.listSaves();
    // saved games
    const saves = existingSaves
      .filter((s) => s.type === atrament.game.SAVE_GAME)
      .map((s) => ({ ...s, slot: datefmt(s.date) }));
    if (saves.length < numberOfSaveSlots) {
      // new save is possible
      saves.push({
        name: saves.length + 1,
        slot: translator.translate('main.new-save')
      });
    }
    setSaveslots(saves);
  }, [ atrament, translator, numberOfSaveSlots ]);

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
          {s.slot}
        </MenuListItem>
      )}
    </>
  );
};

export default SaveGameView;
