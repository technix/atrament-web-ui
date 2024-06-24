import { h } from 'preact';
import style from './index.module.css';

const Modal = ({ children }) => (
  <div class={[style.modal, 'atrament-modal'].join(' ')}>
    {children}
  </div>
);

export default Modal;
