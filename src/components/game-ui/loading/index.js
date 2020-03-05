import { h } from 'preact';
import style from './style';
import Fold from 'src/components/blocks/animation-fold';

// loading block
const Loading = () => (
  <div class={style.container}>
    <Fold />
  </div>
);

export default Loading;