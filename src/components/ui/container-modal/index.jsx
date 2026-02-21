import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';
import catchClick from 'src/utils/catch-click';

const ContainerModal = ({ children, className = '' }) => (
  <div class={clsx(style.container_modal, 'atrament-container-modal', className)} onClick={catchClick}>
    {children}
  </div>
);

export default ContainerModal;
