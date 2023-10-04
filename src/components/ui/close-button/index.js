import { h } from 'preact';
import style from './index.css';

const CloseButton = ({onClick}) => (
  <div class={style.close}>
    <button onClick={onClick} title="Close">&#x2715;</button>
  </div>
);

export default CloseButton;
