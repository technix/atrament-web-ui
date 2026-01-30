import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';

const Modal = ({ children, className = '' }) => (
  <div class={clsx(style.modal, className, 'atrament-modal')}>
    {children}
  </div>
);

export default Modal;
