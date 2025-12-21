import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';

const getAlign = (v) => {
  const alignments = {
    top: 'start',
    start: 'start',
    middle: 'center',
    bottom: 'end',
    end: 'end'
  };
  return alignments[v] || 'center';
}

const ContainerScenes = ({ children, align }) => {
  return (
    <div class={clsx(style.container_scenes, 'atrament-container-scene')} style={{ 'justify-content': getAlign(align) }}>
      {children}
    </div>
  );
};

export default ContainerScenes;
