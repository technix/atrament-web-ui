import { h } from 'preact';
import { useRef, useState, useEffect } from 'preact/hooks';
import clsx from 'clsx';
import style from './index.module.css';

const ImageLayer = ({ key, scale, item }) => (<img
  class='atrament-layer'
  key={key}
  src={item.src}
  onClick={item.onclick}
  style={{
    position: 'absolute',
    left: (item.attrs?.x || 0) * scale,
    top: (item.attrs?.y || 0) * scale,
    width: item.width ? item.width * scale : 'auto',
    height: item.height ? item.height * scale : 'auto',
    cursor: item.onclick ? 'pointer' : 'auto'
  }}
/>);

const AreaLayer = ({ key, scale, item }) => (<div
  class='atrament-layer-area'
  key={key}
  onClick={item.onclick}
  style={{
    position: 'absolute',
    left: (item.attrs.x || 0) * scale,
    top: (item.attrs.y || 0) * scale,
    width: (item.attrs.width || (item.attrs.x1 - item.attrs.x)) * scale,
    height: (item.attrs.height || (item.attrs.y1 - item.attrs.y)) * scale,
    cursor: item.onclick ? 'pointer' : 'auto'
  }}
/>);

const LayeredImage = ({ layers = [], areas=[], options = {} }) => {
  const containerRef = useRef(null);
  const [layout, setLayout] = useState(null);

  const overlays = [ ...layers.sort(((a, b) => a.index - b.index)) ];
  const background = overlays.shift();
  const overlayAreas = [ ...areas.sort(((a, b) => a.index - b.index)) ];

  useEffect(() => {
    const update = () => {
      const container = containerRef.current;
      if (!container) return;
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      const scale = Math.min(
        cw / background.width,
        ch / background.height
      );
      const renderWidth = background.width * scale;
      const renderHeight = background.height * scale;
      const offsetX = (cw - renderWidth) / 2;
      const offsetY = (ch - renderHeight) / 2;

      setLayout({
        scale,
        renderWidth,
        renderHeight,
        offsetX,
        offsetY
      });
    }

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);


  return (
    <div
      class={clsx(style.imagebox, 'atrament-layer-container', options.class)}
      style={{
        'margin-left': options['leftmargin'] || 'none',
        'margin-right': options['rightmargin'] || 'none'
      }}
      ref={containerRef}
    >
      <img
        src={background.src}
        class={clsx(style.background, 'atrament-layer-backround')}
        style={{
          width: options.width || 'auto'
        }}
      />
      {layout && (
        <div
          class={style.layer_wrapper}
          style={{
            left: layout.offsetX,
            top: layout.offsetY,
            width: layout.renderWidth,
            height: layout.renderHeight,  
          }}
        >
          {overlays.map((o, k) => <ImageLayer key={k} item={o} scale={layout.scale} />)}
          {overlayAreas.map((o, k) => <AreaLayer key={k} item={o} scale={layout.scale} />)}
        </div>
      )}
    </div>
  );
};

export default LayeredImage;
