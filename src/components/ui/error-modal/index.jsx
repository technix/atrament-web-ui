import { h } from 'preact';
import style from './index.module.css';

import ContainerModal from '../container-modal';
import Backdrop from 'src/components/ui/backdrop';
import Modal from 'src/components/ui/modal';
import CloseButton from 'src/components/ui/close-button';
import Block from 'src/components/ui/block';

const noop = () => {};

const ErrorModal = ({ close = noop, message }) => {
  return (
    <ContainerModal>
      <Backdrop onClick={noop} />
      <Modal>
        <div class={style.error_modal_content}>
          {close !== noop ? <CloseButton onClick={close} /> : ''}
          <Block>
            <p class={style.error_message}>{message}</p>
          </Block>
        </div>
      </Modal>
    </ContainerModal>
  );
};

export default ErrorModal;
