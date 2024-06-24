import { h } from 'preact';
import style from './index.module.css';

const ContainerText = ({ children, fontSize }) => {  
  return (
    <div class={[style.container_text, 'atrament-text-container'].join(' ')} style={{'font-size': `${fontSize}%`}}>
      {children}
    </div>
  );
};

export default ContainerText;
