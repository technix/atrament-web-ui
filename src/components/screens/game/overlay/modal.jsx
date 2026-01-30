import { h } from 'preact';
import { useState, useCallback } from 'preact/hooks';
import clsx from 'clsx';
import style from './index.module.css';
import { CLOSE_OVERLAY_DELAY } from 'src/constants';
import ContainerText from 'src/components/ui/container-text';
import ContainerModal from 'src/components/ui/container-modal';
import Backdrop from 'src/components/ui/backdrop';
import Modal from 'src/components/ui/modal';
import CloseButton from 'src/components/ui/close-button';

export default function ModalPresenter({ children, title, closeOverlay }) {
  const [isClosing, setIsClosing] = useState(false);
  const closeHandler = useCallback(() => {
    setIsClosing(true);
    setTimeout(closeOverlay, CLOSE_OVERLAY_DELAY);
  }, [ setIsClosing, closeOverlay ]);

  const containerClasses = clsx(
    'transparent animation_appear animation_appear_overlay',
    isClosing && 'animation_disappear'
  );
  const headerClasses = clsx(
    style.overlay_header,
    style.overlay_header_modal,
    title && style.overlay_header_bottom_line,
    'atrament-overlay-header-modal'
  );
  const titleClasses = clsx(
    style.overlay_title,
    style.overlay_title_modal,
    'atrament-overlay-title-modal'
  );
  const overlayClasses = clsx(
    style.overlay_content,
    'atrament-overlay-content-modal'
  );

  return (
    <ContainerModal className={containerClasses}>
      <Backdrop onClick={closeHandler} />
      <Modal>
        <div class={headerClasses}>
          <div class={titleClasses}>{title}</div>
          <div><CloseButton onClick={closeHandler} /></div>
        </div>
        <ContainerText>
          <div class={overlayClasses}>
            {children}
          </div>
        </ContainerText>
      </Modal>
    </ContainerModal>
  );
}
