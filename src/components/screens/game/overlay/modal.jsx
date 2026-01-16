import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';

import ContainerText from 'src/components/ui/container-text';
import ContainerModal from 'src/components/ui/container-modal';
import Backdrop from 'src/components/ui/backdrop';
import Modal from 'src/components/ui/modal';
import CloseButton from 'src/components/ui/close-button';

export default function ModalPresenter({ children, title, closeOverlay }) {
  return (
    <ContainerModal>
      <Backdrop onClick={closeOverlay} />
      <Modal>
        <div class={clsx(style.overlay_header, style.overlay_header_modal, title && style.overlay_header_bottom_line)}>
          <div class={clsx(style.overlay_title, style.overlay_title_modal)}>{title}</div>
          <div><CloseButton onClick={closeOverlay} /></div>
        </div>
        <ContainerText>
          <div class={clsx(style.overlay_content, 'atrament-overlay')}>
            {children}
          </div>
        </ContainerText>
      </Modal>
    </ContainerModal>
  );
}
