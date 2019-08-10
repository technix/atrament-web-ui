
import { h } from 'preact';
import style from './style';

// https://tobiasahlin.com/spinkit/
// fold effect
const Fold = () => (
  <div class={style['sk-folding-cube']}>
    <div class={`${style['sk-cube1']} ${style['sk-cube']}`} />
    <div class={`${style['sk-cube2']} ${style['sk-cube']}`} />
    <div class={`${style['sk-cube4']} ${style['sk-cube']}`} />
    <div class={`${style['sk-cube3']} ${style['sk-cube']}`} />
  </div>
);

export default Fold;
