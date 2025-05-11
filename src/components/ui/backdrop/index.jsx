import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';

const Backdrop = ({ onClick }) => (
  <div class={clsx(style.backdrop, 'atrament-backdrop')} onClick={onClick} />
);

export default Backdrop;
