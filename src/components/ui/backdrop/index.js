import { h } from 'preact';
import style from './index.css';

const Backdrop = ({ onClick }) => (
  <div class={[style.backdrop, 'atrament-backdrop'].join(' ')} onClick={onClick} />
);

export default Backdrop;
