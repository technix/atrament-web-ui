import { h } from 'preact';
import style from './index.module.css';

const ContainerModal = ({ children }) => (
  <div class={[style.container_modal, 'atrament-container-modal'].join(' ')}>
    {children}
  </div>
);

export default ContainerModal;