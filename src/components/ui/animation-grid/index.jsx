
import { h } from 'preact';
import style from './style.module.css';

// https://tobiasahlin.com/spinkit/
// frid effect
const Grid = () => (
  <div class={style.sk_cube_grid}>
    <div class={style.sk_cube1} />
    <div class={style.sk_cube2} />
    <div class={style.sk_cube3} />
    <div class={style.sk_cube4} />
    <div class={style.sk_cube5} />
    <div class={style.sk_cube6} />
    <div class={style.sk_cube7} />
    <div class={style.sk_cube8} />
    <div class={style.sk_cube9} />
  </div>
);

export default Grid;