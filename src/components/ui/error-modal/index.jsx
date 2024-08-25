import { h } from 'preact';
import { useEffect, useCallback } from 'preact/hooks';

import { useAtrament, useAtramentState } from 'src/atrament/hooks';

import style from './index.module.css';

import Backdrop from 'src/components/ui/backdrop';
import Modal from 'src/components/ui/modal';
import CloseButton from 'src/components/ui/close-button';
import Block from 'src/components/ui/block';


const ErrorModal = () => {
  const { atrament } = useAtrament();
  const atramentState = useAtramentState(['ERROR']);

  const closeModal = useCallback(() => atrament.state.setKey('ERROR', null), [ atrament ]);

  const escHandler = useCallback((e) => {
    if (e.key === "Escape") {
      closeModal()
    }
  }, [ closeModal ]);

  useEffect(() => {
    document.addEventListener("keydown", escHandler, false);
    return () => {
      document.removeEventListener("keydown", escHandler, false);
    }
  }, [ escHandler ]);

  if (atramentState.ERROR) {
    return (
      <div class={style.error_modal}>
        <Backdrop onClick={closeModal} />
        <Modal>
          <div class={style.error_modal_content}>
            <CloseButton onClick={closeModal} />
            <Block>
              <p class={style.error_message}>{atramentState.ERROR}</p>
            </Block>
          </div>
        </Modal>
      </div>
    );
  }
};

export default ErrorModal;
