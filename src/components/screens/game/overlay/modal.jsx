import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';

import ContainerText from 'src/components/ui/container-text';
import ContainerModal from 'src/components/ui/container-modal';
import Backdrop from 'src/components/ui/backdrop';
import Modal from 'src/components/ui/modal';
import CloseButton from 'src/components/ui/close-button';

export default function ModalPresenter({ children, title, closeOverlay }) {
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
    <ContainerModal>
      <Backdrop onClick={closeOverlay} />
      <Modal>
        <div class={headerClasses}>
          <div class={titleClasses}>{title}</div>
          <div><CloseButton onClick={closeOverlay} /></div>
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
