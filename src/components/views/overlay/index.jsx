import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { useAtrament, useAtramentOverlay } from 'src/atrament/hooks';
import preloadImages from 'src/utils/preload-images';
import getImagesFromContent from "src/utils/get-images-from-content";

import TextParagraph from 'src/components/ui/text-paragraph';
import Markup from 'src/components/ui/markup';
import CircleLoader from 'src/components/ui/animation-circles';

import OverlayPresenter from './overlay';
import ModalPresenter from './modal';


const OverlayView = () => {
  const { getAssetPath } = useAtrament();
  const { overlay, closeOverlay } = useAtramentOverlay();
  const [ isLoaded, setIsLoaded ] = useState(false);

  const preloader = async () => {
    await preloadImages(getAssetPath, getImagesFromContent(overlay.content));
    setIsLoaded(true);
  }

  // preload all images for overlay
  useEffect(() => {
    if (overlay.current) {
      preloader();
    }
  });

  if (!overlay.current) {
    return <></>;
  }

  const content = isLoaded
    ? overlay.content.map((item, index) => <TextParagraph key={index}><Markup content={item} /></TextParagraph>)
    : <CircleLoader />;

  if (overlay.display === 'modal') {
    return (
      <ModalPresenter title={overlay.title} closeOverlay={closeOverlay}>{content}</ModalPresenter>
    );
  }
  return (
    <OverlayPresenter title={overlay.title} closeOverlay={closeOverlay}>{content}</OverlayPresenter>
  );
}

export default OverlayView;
