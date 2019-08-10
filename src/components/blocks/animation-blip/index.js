import { h } from 'preact';
import style from './style';

// https://tobiasahlin.com/spinkit/
// blip effect
const Blip = () => (
  <div class={style.spinner}>
    <div /><div />
  </div>
);

export default Blip;
