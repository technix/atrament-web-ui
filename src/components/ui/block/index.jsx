import { h } from 'preact';
import style from './index.module.css';

const Block = ({ children, align = null }) => {
  const cssStyles = [
    style.block,
    align === 'start' ? style.block_start : '',
    align === 'end' ? style.block_end : '',
    'atrament-block'
  ].join(' ');
  return (
    <div class={cssStyles}>
      {children}
    </div>
  );
};

export default Block;
