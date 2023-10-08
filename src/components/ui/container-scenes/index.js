import { h } from 'preact';
import style from './index.css';
import Scene from '../scene';

const ContainerScenes = ({ scenes, setReady }) => {
  const lastSceneIndex = scenes.length - 1;
  return (
    <div class={[style.container_scenes, 'atrament-container-scene'].join(' ')}>
      {
        scenes.map((s, i) => <Scene key={s.uuid} scene={s} isCurrent={i === lastSceneIndex} readyHandler={setReady} />)
      }
    </div>
  );
};

export default ContainerScenes;
