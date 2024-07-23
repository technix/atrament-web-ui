import { h } from 'preact';
import style from './index.module.css';

const ContainerImage = ({ src }) => (
  <div class={[style.imagebox, 'atrament-image-container'].join(' ')}>
    <img src={src} class={[style.image, 'atrament-image'].join(' ')} />
  </div>
);

export default ContainerImage;