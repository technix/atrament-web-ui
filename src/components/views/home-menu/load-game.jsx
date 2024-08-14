
import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import { route } from 'preact-router';
import { Text } from '@eo-locale/preact';

import { useAtrament } from 'src/atrament/hooks';

import Block from 'src/components/ui/block';
import Header from 'src/components/ui/header';
import Break from 'src/components/ui/break';

import LoadGameView from 'src/components/views/loadgame';

const LoadGameMenu = ({ children }) => {
  const { gameStart, resetBackground } = useAtrament();
  const loadGame = useCallback(async (saveslot) => {
    resetBackground();
    await gameStart(saveslot);
    route('/game');
  }, [ resetBackground, gameStart ]);
  return (
    <Block align='end'>
      <Header><h2><Text id={'main.loadgame'} /></h2></Header>
      <LoadGameView loadGame={loadGame} />
      <Break />
      {children}
    </Block>
  );
};

export default LoadGameMenu;
