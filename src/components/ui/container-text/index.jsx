import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';

const ContainerText = ({ children, className = '' }) => {
  return (
    <div class={clsx(style.container_text, 'atrament-text-container', className)}>
      {children}
    </div>
  );
};

export default ContainerText;
