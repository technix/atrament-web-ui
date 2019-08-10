import { h } from 'preact';
import style from './style';

// https://tobiasahlin.com/spinkit/
// bounce effect
const Bounce = () => (
  <div class={style.spinner}>
    <div class={style.bounce1} />
    <div class={style.bounce2} />
    <div class={style.bounce3} />
  </div>
);

export default Bounce;
