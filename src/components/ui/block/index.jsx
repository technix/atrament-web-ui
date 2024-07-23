import { h } from 'preact';
import style from './index.module.css';

const Block = ({ children, align = null }) => {
  const cssStyles = [style.block];
  if (align === 'start') {
    cssStyles.push(style.block_start);
  } else if (align === 'end') {
    cssStyles.push(style.block_end);
  }
  cssStyles.push('atrament-block');
  return (
    <div class={cssStyles.join(' ')}>
      {children}
    </div>
  );
};

export default Block;
