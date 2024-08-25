import { h } from 'preact';
import { Text, useTranslator } from '@eo-locale/preact';
import { useEffect, useState, useCallback } from 'preact/hooks';

import { useAtrament, useAtramentState } from 'src/atrament/hooks';

import MenuListItem from 'src/components/ui/menu-list-item';


const SessionsView = ({ newGame, loadGame, resumeGame, canResume }) => {
  const [ sessions, setSessions ] = useState([]);
  const translator = useTranslator();
  const { atrament } = useAtrament();
  const { metadata } = useAtramentState(['metadata']);
  
  const initSessions = useCallback(async () => {
    const existingSessions = await atrament.game.getSessions();
    let firstEmptySlot = true;
    setSessions([...Array(+metadata.sessions).keys()].map((s) => {
      const id = s + 1;
      const name = `session${id}`;
      const hasSaves = !!existingSessions[`session${id}`];
      const canStart = hasSaves || firstEmptySlot;
      if (!hasSaves && firstEmptySlot) {
        firstEmptySlot = false;
      }
      return { id, name, hasSaves, canStart };
    }));
  }, [ atrament, metadata, setSessions ]);

  const startSession = useCallback(async (ev) => {
    const chosenSession = ev.target.getAttribute('data-session');
    const sessionData = sessions.filter(item => item.name === chosenSession)[0];
    if (!sessionData) {
      return;
    }
    atrament.game.setSession(chosenSession);
    if (sessionData.hasSaves) {
      if (await canResume()) {
        await resumeGame();
      } else {
        await loadGame();
      }
    } else {
      await newGame();
    }
  }, [ atrament, sessions, newGame, canResume, resumeGame, loadGame ]);

  const deleteSession = useCallback(async (ev) => {
    const chosenSession = ev.target.getAttribute('data-session');
    await atrament.game.removeSession(chosenSession);
    await initSessions();
  }, [ atrament, initSessions ]);

  useEffect(() => {
    const onLoad = async () => initSessions();
    onLoad();
  }, [ initSessions ]);


  return (
    <>      
      {sessions.map((s) => 
        <MenuListItem
          key={s.name}
          onSelect={startSession}
          onDelete={deleteSession}
          isDisabled={!s.canStart}
          isDeletable={s.hasSaves}
          deletePrompt={translator.translate('main.delete-session')}
          attributes={{
            "data-session": s.name
          }}
        >
          {s.hasSaves
            ? <Text id='main.continue-session' session={s.id} />
            : (s.canStart
              ? <Text id='main.newgame' />
              : <Text id='main.emptyslot' />
            )}
        </MenuListItem>
      )}
    </>
  );
};

export default SessionsView;
