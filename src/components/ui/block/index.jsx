import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';

const Block = ({ children, align = null }) => {
  const cssStyles = clsx(
    style.block,
    align === 'start' && style.block_start,
    align === 'end' && style.block_end,
    'atrament-block'
  );
  return (
    <div class={cssStyles}>
      {children}
    </div>
  );
};

export default Block;
