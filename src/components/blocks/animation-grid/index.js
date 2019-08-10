
import { h } from 'preact';
import style from './style';

// https://tobiasahlin.com/spinkit/
// frid effect
const Grid = () => (
  <div class={style['sk-cube-grid']}>
    <div class={`${style['sk-cube']} ${style['sk-cube1']}`} />
    <div class={`${style['sk-cube']} ${style['sk-cube2']}`} />
    <div class={`${style['sk-cube']} ${style['sk-cube3']}`} />
    <div class={`${style['sk-cube']} ${style['sk-cube4']}`} />
    <div class={`${style['sk-cube']} ${style['sk-cube5']}`} />
    <div class={`${style['sk-cube']} ${style['sk-cube6']}`} />
    <div class={`${style['sk-cube']} ${style['sk-cube7']}`} />
    <div class={`${style['sk-cube']} ${style['sk-cube8']}`} />
    <div class={`${style['sk-cube']} ${style['sk-cube9']}`} />
  </div>
);

export default Grid;