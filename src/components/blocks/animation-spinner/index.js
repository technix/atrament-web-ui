import { h } from 'preact';
import style from './style';

const Spinner = () => (
  <div class={style['lds-roller']}>
    <div /><div /><div /><div /><div /><div /><div /><div />
  </div>
);

export default Spinner;
