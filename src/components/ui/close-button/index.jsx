import { h } from 'preact';
import style from './index.module.css';
import { useTranslator } from '@eo-locale/preact';

const CloseButton = ({ onClick }) => {
  const translator = useTranslator();
  return (
    <div class={style.close}>
      <button onClick={onClick} title={translator.translate('close')}>&#x2715;</button>
    </div>
  );
};

export default CloseButton;
