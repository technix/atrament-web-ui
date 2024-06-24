import { h } from 'preact';
import style from './index.module.css';

const LinkHome = ({ onClick }) => {
  return (
    <button key="mainmenu" onClick={onClick} class={style.link_home}>The end</button>
  );
};

export default LinkHome;
