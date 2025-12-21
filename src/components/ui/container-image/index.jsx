import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';

const ContainerImage = ({ src, options = {} }) => (
  <div
    class={clsx(style.imagebox, 'atrament-image-container', options.class)}
    style={{
      'margin-left': options['leftmargin'] || 'none',
      'margin-right': options['rightmargin'] || 'none'
    }}
  >
    <img
      src={src}
      style={{
        width: options.width || 'auto'
      }}
      class={clsx(
        style.image,
        !options.fullsize && style.illustration,
        'atrament-image'
      )}
    />
  </div>
);

export default ContainerImage;
