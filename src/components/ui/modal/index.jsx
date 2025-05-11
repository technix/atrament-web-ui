import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';

const Modal = ({ children }) => (
  <div class={clsx(style.modal, 'atrament-modal')}>
    {children}
  </div>
);

export default Modal;
