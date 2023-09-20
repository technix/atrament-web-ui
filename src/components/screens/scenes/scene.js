import { h } from 'preact';
import style from './index.css';
import { useRef, useEffect, useContext } from 'preact/hooks';
import { Image } from 'src/components/ui';
import Atrament from 'src/atrament-context';

const Scene = ({ scene, isCurrent }) => {
  const atrament = useContext(Atrament);
  let pStyle;
  if (!isCurrent) {
    pStyle = {opacity: '70%'};
  }
  const elementRef = useRef(null);
  useEffect(() => {
    if (isCurrent) {
      elementRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isCurrent, elementRef]);

  return (
    <div class={[style.block, 'atrament-block-text', isCurrent ? 'animation_appear' : ''].join(' ')} ref={elementRef}>
      {
        scene.content
          .map((item) => {
            return (
              <>
                {item.tags.IMAGE ? <Image src={atrament.game.getAssetPath(item.tags.IMAGE)} /> : ''}
                <p style={pStyle}>{item.text}</p>
              </>
            );
          })
      }
    </div>
  )
};

export default Scene;

