import { h } from 'preact';

import TextParagraph from 'src/components/ui/text-paragraph';
import Markup from 'src/components/ui/markup';
import CircleLoader from 'src/components/ui/animation-circles';

import OverlayPresenter from './overlay';
import ModalPresenter from './modal';

import useOverlayContent from 'src/content/use-overlay-content';

const OverlayView = () => {
  const [ isLoaded, overlay, closeOverlay ] = useOverlayContent();

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
