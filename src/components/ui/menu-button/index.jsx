import { h } from 'preact';
import style from './index.module.css';

const MenuButton = ({ children, key, onClick, attributes={} }) => (
  <button key={key} onClick={onClick} class={style.menu_button} {...attributes}>{children}</button>
);

export default MenuButton;
