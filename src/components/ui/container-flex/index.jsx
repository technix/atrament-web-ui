import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';

const ContainerFlex = ({ cssClass = '', children }) => (
  <div class={clsx(style.container_flex, cssClass, 'atrament-flex-container')}>
    {children}
  </div>
);

export default ContainerFlex;
