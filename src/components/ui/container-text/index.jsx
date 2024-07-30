import { h } from 'preact';
import style from './index.module.css';

const ContainerText = ({ children }) => {
  return (
    <div class={[style.container_text, 'atrament-text-container'].join(' ')}>
      {children}
    </div>
  );
};

export default ContainerText;
