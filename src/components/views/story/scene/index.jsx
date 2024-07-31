import { h, Fragment } from 'preact';
import style from './index.module.css';
import { useRef, useState, useEffect, useCallback } from 'preact/hooks';
import { scrollIntoView } from "seamless-scroll-polyfill";
// UI
import ContainerImage from 'src/components/ui/container-image';
import Paragraph from '../scene-paragraph';
// utils
import { useAtrament } from 'src/atrament/hooks';
import preloadImages from 'src/utils/preload-images';

const Scene = ({ scene, isCurrent, isSingle, readyHandler }) => {
  const { getAssetPath } = useAtrament();
  const [ isLoaded, setIsLoaded ] = useState(false);
  const elementRef = useRef(null);

  const scrollToScene = useCallback((behavior) => {
    readyHandler(true);
    setTimeout(
      () => {
        // elementRef.current.scrollIntoView({ behavior, block: 'start' });
        // native 'scrollIntoView' glitches sometimes, so we use polyfill instead
        scrollIntoView(elementRef.current, { behavior, block: 'start' }, { duration: 300 });
      },
      100
    );
  }, [ readyHandler ]);

  useEffect(() => {
    if (isLoaded && isCurrent) {
      scrollToScene(isSingle ? 'instant' : 'smooth');
    }
  }, [isLoaded, isCurrent, isSingle, scrollToScene]);

  // preload all images for scene
  useEffect(() => {
    const preloader = async () => {
      await preloadImages(getAssetPath, scene.images);
      setIsLoaded(true);
    }
    preloader();
  }, [ scene, setIsLoaded, getAssetPath ]);

  return (
    <div class={[style.scene, 'atrament-scene', isCurrent && isLoaded ? 'animation_appear' : ''].join(' ')} ref={elementRef}>
      <div style={{ opacity: isLoaded ? 1 : 0 }}>
        {
          scene.content.map((item, i) => (
            <Fragment key={`paragraph-${scene.uuid}-${i}`}>
              {item.images.map(
                (img, i) => <ContainerImage key={`${i}-${img}`} src={getAssetPath(img)} />
              )}
              <Paragraph isCurrent={isCurrent} content={item} />
            </Fragment>
          ))
        }
      </div>
    </div>
  )
};

export default Scene;
