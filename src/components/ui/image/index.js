import { h } from 'preact';
import style from './index.css';

const Image = ({ src }) => (
  src ?
    <div class={[style.imagebox, 'atrament-imagebox'].join(' ')}>
      <img src={src} class={[style.image, 'atrament-picture'].join(' ')} />
    </div>
  :
    ''
);

export default Image;