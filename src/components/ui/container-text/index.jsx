import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';

const ContainerText = ({ children }) => {
  return (
    <div class={clsx(style.container_text, 'atrament-text-container')}>
      {children}
    </div>
  );
};

export default ContainerText;
