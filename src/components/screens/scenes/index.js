import { h } from 'preact';
import style from './index.css';
import Scene from './scene';

const BlockScenes = ({ scenes }) => {
  const lastSceneIndex = scenes.length - 1;
  return (
    <div class={[style.block_scene, 'atrament-block-scene'].join(' ')}>
      {
        scenes.map((s, i) => <Scene key={`scene-${Date.now()}-${i}`} scene={s} isCurrent={i === lastSceneIndex} />)
      }
    </div>
  );
};

export default BlockScenes;
