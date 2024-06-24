import { h } from 'preact';
import style from './index.module.css';

const Backdrop = ({ onClick }) => (
  <div class={[style.backdrop, 'atrament-backdrop'].join(' ')} onClick={onClick} />
);

export default Backdrop;
