import { h } from 'preact';
import { useContext } from 'preact/hooks';
import { route } from 'preact-router';
import Atrament from 'src/atrament-context';
import Block from '../block';
import style from './index.css';

const LinkHome = () => {
  const atrament = useContext(Atrament);

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
