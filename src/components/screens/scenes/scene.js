import { h, Fragment } from 'preact';
import style from './index.css';
import { useRef, useState, useEffect, useContext, useCallback } from 'preact/hooks';
import { ContainerImage } from 'src/components/ui';
import Paragraph from './paragraph';
import preloadImages from 'src/utils/preload-images';
import Atrament from 'src/atrament-context';

const Scene = ({ scene, isCurrent, readyHandler }) => {
  const [ isLoaded, setIsLoaded ] = useState(false);
  const atrament = useContext(Atrament);
  const elementRef = useRef(null);

  const getImagesList = useCallback(() => {
    const images = [];
    scene.content.forEach(item => {
      if (item.tags.IMAGE) {
        images.push(atrament.game.getAssetPath(item.tags.IMAGE));
      }
    });
    return images;
  }, [ atrament.game, scene.content ]);

  useEffect(() => {
    if (isLoaded && isCurrent) {
      readyHandler(true);
      setTimeout(
        () => elementRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        100
      );
    }
  }, [isLoaded, isCurrent, elementRef, readyHandler]);

  // preload all images for scene
  useEffect(() => {
    const preloader = async () => {
      await preloadImages(getImagesList());
      setIsLoaded(true);
    }
    preloader();
  }, [ getImagesList, setIsLoaded ]);

  return (
    <div class={[style.block, 'atrament-block-text', isCurrent && isLoaded ? 'animation_appear' : ''].join(' ')} ref={elementRef}>
      <div style={{ opacity: isLoaded ? 1 : 0 }}>
        {
          scene.content.map((item, i) => (
            <Fragment key={`paragraph-${scene.uuid}-${i}`}>
              {item.tags.IMAGE ? <ContainerImage src={atrament.game.getAssetPath(item.tags.IMAGE)} /> : ''}
              <Paragraph isCurrent={isCurrent} content={item.text} />
            </Fragment>
          ))
        }
      </div>
    </div>
  )
};

export default Scene;

