
import { h } from 'preact';
import { Text } from '@eo-locale/preact';

import Block from 'src/components/ui/block';
import Header from 'src/components/ui/header';
import Break from 'src/components/ui/break';

import LoadGameView from 'src/components/views/loadgame';

import useGameControls from './use-game-controls';

const LoadGameMenu = ({ children }) => {
  const { loadGame } = useGameControls();
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
