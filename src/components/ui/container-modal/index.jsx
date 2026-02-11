import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';

const ContainerModal = ({ children, className = '' }) => (
  <div class={clsx(style.container_modal, 'atrament-container-modal', className)}>
    {children}
  </div>
);

export default ContainerModal;
