import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';
import block from '../block';

// [banner style=highlight allcaps=false]text in info block[/banner]

const BannerBlock = ({ children, options }) => {
  const classList = clsx(
    style.bannerblock,
    options.style === 'accent' && style.accent,
    options.allcaps && style.allcaps,
    'atrament-tag-banner',
    options.class
  );
  const blockStyle = {};
  if (options.align === 'left' || options.align === 'right') {
    blockStyle['text-align'] = options.align;
    blockStyle[`padding-${options.align}`] = '0';
  }
  if (options.border === 'bottom' || options.border === 'none') {
    blockStyle['border-top'] = 'none';
  }
  if (options.border === 'top' || options.border === 'none') {
    blockStyle['border-bottom'] = 'none';
  }
  return (<div class={classList} style={blockStyle}>{children}</div>);
};

export default {
  tag: 'banner',
  component: BannerBlock
}
