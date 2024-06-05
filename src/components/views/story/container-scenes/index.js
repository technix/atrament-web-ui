import { h } from 'preact';
import style from './index.css';

const ContainerScenes = ({ children }) => {
  return (
    <div class={[style.container_scenes, 'atrament-container-scene'].join(' ')}>
      {children}
    </div>
  );
};

export default ContainerScenes;
