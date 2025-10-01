import { h } from 'preact';
import style from './index.module.css';

const ButtonAccent = ({ children, onClick }) => (
  <button onClick={onClick} class={style.button_accent}>{children}</button>
);

export default ButtonAccent;
