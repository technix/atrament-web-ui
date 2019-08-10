import { h } from 'preact';
import style from './style';

// ripple effect
const Ripple = () => (
  <div class={style['lds-ripple']}>
    <div /><div />
  </div>
);

export default Ripple;
