import { h, Fragment } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';
import { useRef, useState, useEffect, useCallback } from 'preact/hooks';
import { scrollIntoView } from "seamless-scroll-polyfill";
import { SCROLL_INTO_VIEW_DELAY, SCROLL_INTO_VIEW_DURATION } from 'src/constants';
// UI
import ContainerImage from 'src/components/ui/container-image';
import Paragraph from '../scene-paragraph';
// utils
import { useAtrament } from 'src/atrament/hooks';
import preloadImages from 'src/utils/preload-images';
import CircleLoader from 'src/components/ui/animation-circles';

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
        scrollIntoView(elementRef.current, { behavior, block: 'start' }, { duration: SCROLL_INTO_VIEW_DURATION });
      },
      SCROLL_INTO_VIEW_DELAY
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

  const hasNoContent = scene.images.length === 0 && scene.isEmpty;
  if (hasNoContent) {
    return <></>;
  }

  const sceneClasses = clsx(
    style.scene,
    'atrament-scene',
    isCurrent && 'atrament-scene-current',
    (isCurrent && isLoaded) && 'animation_appear',
  );

  return (
    <div class={sceneClasses} ref={elementRef}>
      { isLoaded ?
        scene.content.map((item, i) => (
          <Fragment key={`paragraph-${scene.uuid}-${i}`}>
            {item.images.map(
              (img, i) => <ContainerImage key={`${i}-${img}`} src={getAssetPath(img)} />
            )}
            <Paragraph isCurrent={isCurrent} content={item} />
          </Fragment>
        ))
        :
        <CircleLoader />
      }
    </div>
  )
};

export default Scene;
