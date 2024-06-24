import { h } from 'preact';
import style from './index.module.css';

const ContainerFlex = ({ children }) => (
  <div class={[style.container_flex, 'atrament-flex-container'].join(' ')}>
    {children}
  </div>
);

export default ContainerFlex;
