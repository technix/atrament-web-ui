import { h } from 'preact';
import style from './index.module.css';

const LinkHome = ({ children, onClick }) => {
  return (
    <button key="mainmenu" onClick={onClick} class={style.link_home}>{children}</button>
  );
};

export default LinkHome;
