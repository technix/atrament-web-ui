import { useEffect, useState } from 'preact/hooks';
import { useAtrament, useAtramentOverlay } from 'src/atrament/hooks';
import preloadImages from 'src/utils/preload-images';
import getImagesFromContent from "src/utils/get-images-from-content";

export default function useOverlayContent() {
  const { getAssetPath } = useAtrament();
  const { overlay, closeOverlay } = useAtramentOverlay();
  const images = getImagesFromContent(overlay.content?.split('\n'));
  const [ isLoaded, setIsLoaded ] = useState(() => images.length === 0);

  const preloader = async () => {
    await preloadImages(getAssetPath, images);
    setIsLoaded(true);
  }

  // preload all images for overlay
  useEffect(() => {
    if (overlay.current) {
      preloader();
    }
  });

  return [ isLoaded, overlay, closeOverlay ];
}
