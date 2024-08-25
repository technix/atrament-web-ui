import { h } from 'preact';
import style from './index.module.css';

const LinkMenu = ({children, key, onClick, attributes={}}) => (
  <div>
    <button key={key} onClick={onClick} class={style.link_menu} {...attributes}>{children}</button>
  </div>
);

export default LinkMenu;