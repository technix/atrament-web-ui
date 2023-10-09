import { h } from 'preact';
import { route } from 'preact-router';
import style from './index.css';

import Block from '../block';
import useAtrament from 'src/atrament/hooks';

const LinkHome = () => {
  const { atrament } = useAtrament();

  const endGame = async () => {
    await atrament.game.removeSave();
    route('/');
  };

  return (
    <Block>
      <button key="mainmenu" onClick={endGame} class={style.link_home}>The end</button>
    </Block>
  );
};

export default LinkHome;
