import { h } from 'preact';
import { useEffect, useCallback } from 'preact/hooks';

import { useAtrament, useAtramentState } from 'src/atrament/hooks';

import style from './index.module.css';

import Backdrop from 'src/components/ui/backdrop';
import Modal from 'src/components/ui/modal';
import CloseButton from 'src/components/ui/close-button';

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
          <CloseButton onClick={closeModal} />
          <p class={style.error_message}>{atramentState.ERROR}</p>
        </Modal>
      </div>
    );
  }
};

export default ErrorModal;
