import { h } from 'preact';
import style from './index.module.css';

import ContainerText from 'src/components/ui/container-text';
import ContainerModal from 'src/components/ui/container-modal';
import Backdrop from 'src/components/ui/backdrop';
import Modal from 'src/components/ui/modal';
import CloseButton from 'src/components/ui/close-button';
import Block from 'src/components/ui/block';

export default function ModalPresenter({ children, title, closeOverlay }) {
  return (
    <ContainerModal>
      <Backdrop onClick={closeOverlay} />
      <Modal>
        <ContainerText>
          <Block>
            <div class={style.overlay_header}>
              <div class={style.overlay_title}>{title}</div>
              <CloseButton onClick={closeOverlay} />
            </div>
          </Block>
          <Block>
            {children}
          </Block>
        </ContainerText>
      </Modal>
    </ContainerModal>
  );
}
