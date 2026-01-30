import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';

const Backdrop = ({ onClick, className = '' }) => (
  <div class={clsx(style.backdrop, className, 'atrament-backdrop')} onClick={onClick} />
);

export default Backdrop;
