import { h } from 'preact';
import style from './index.module.css';

const ContainerImage = ({ src, options = {} }) => (
  <div
    class={[style.imagebox, 'atrament-image-container'].join(' ')}
    style={{
      'margin-left': options['leftmargin'] || 'none',
      'margin-right': options['rightmargin'] || 'none'
    }}
  >
    <img
      src={src}
      style={{
        width: options.width || 'auto',
      }}
      class={[
        style.image,
        options.fullsize ? '' : style.illustration,
        'atrament-image'
      ].join(' ')}
    />
  </div>
);

export default ContainerImage;