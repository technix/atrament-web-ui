import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';

const Break = ({ className = '' }) => (
  <div class={clsx(style.break, className, 'atrament-break')} />
);

export default Break;
