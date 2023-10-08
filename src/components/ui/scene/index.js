import { h, Fragment } from 'preact';
import style from './index.css';
import { useRef, useState, useEffect } from 'preact/hooks';
// UI
import ContainerImage from '../container-image';
import Paragraph from '../scene-paragraph';
// utils
import preloadImages from 'src/utils/preload-images';

const Scene = ({ scene, isCurrent, readyHandler }) => {
  const [ isLoaded, setIsLoaded ] = useState(false);
  const elementRef = useRef(null);

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
      await preloadImages(scene.images);
      setIsLoaded(true);
    }
    preloader();
  }, [ scene, setIsLoaded ]);

  return (
    <div class={[style.scene, 'atrament-scene', isCurrent && isLoaded ? 'animation_appear' : ''].join(' ')} ref={elementRef}>
      <div style={{ opacity: isLoaded ? 1 : 0 }}>
        {
          scene.content.map((item, i) => (
            <Fragment key={`paragraph-${scene.uuid}-${i}`}>
              <ContainerImage src={item.image} />
              <Paragraph isCurrent={isCurrent} content={item.text} />
            </Fragment>
          ))
        }
      </div>
    </div>
  )
};

export default Scene;
