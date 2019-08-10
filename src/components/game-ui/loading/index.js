import { h } from 'preact';
import style from './style';

// loading block
const Loading = () => (
  <div class={style.container}>
    <div class={style['lds-roller']}>
      <div /><div /><div /><div /><div /><div /><div /><div />
    </div>
  </div>
);

export default Loading;