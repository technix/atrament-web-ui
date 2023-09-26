import { h } from 'preact';
import style from './index.css';

const LinkMenu = ({children, key, onClick}) => (
  <div>
    <button key={key} onClick={onClick} class={style.link_menu}>{children}</button>
  </div>
);

export default LinkMenu;