import { h } from 'preact';
import { useRef, useState, useEffect } from 'preact/hooks';
import clsx from 'clsx';
import style from './index.module.css';

const LayeredImage = ({ layers = [], options = {} }) => {
  const containerRef = useRef(null);
  const [layout, setLayout] = useState(null);

  const overlays = [ ...layers.sort(((a, b) => a.index - b.index)) ];
  const background = overlays.shift();

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
          {overlays.map((o, i) => (
            <img
              class='atrament-layer'
              key={i}
              src={o.src}
              onClick={o.onclick}
              style={{
                position: 'absolute',
                left: (o.attrs?.x || 0) * layout.scale,
                top: (o.attrs?.y || 0) * layout.scale,
                width: o.width ? o.width * layout.scale : 'auto',
                height: o.height ? o.height * layout.scale : 'auto',
                cursor: o.onclick ? 'pointer' : 'auto'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LayeredImage;
