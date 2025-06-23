import { h } from 'preact';

import { useAtramentOverlay } from 'src/atrament/hooks';
import TextParagraph from 'src/components/ui/text-paragraph';
import Markup from 'src/components/ui/markup';

import OverlayPresenter from './overlay';
import ModalPresenter from './modal';


const OverlayView = () => {
  const { overlay, closeOverlay } = useAtramentOverlay();

  if (!overlay.current) {
    return <></>;
  }

  const content = overlay.content.map((item, index) => <TextParagraph key={index}><Markup content={item} /></TextParagraph>);

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
