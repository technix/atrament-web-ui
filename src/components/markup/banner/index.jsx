import { h } from 'preact';
import style from './index.module.css';

// [banner style=highlight allcaps=false]text in info block[/banner]

import getTagAttributes from 'src/utils/get-tag-attributes';

const BannerBlock = ({children, options}) => {
  const classes = [style.bannerblock];
  if (options.style === 'accent') {
    classes.push(style.accent);
  }
  if (options.allcaps) {
    classes.push(style.allcaps);
  }
  return (<div class={classes.join(' ')}>{children}</div>);
};

export default {
  regexp: /\[banner.*?\].*?\[\/banner\]/ig,
  replacer: (el, markup) => {
    const fragments = el.match(/\[banner(.*?)\](.*?)\[\/banner\]/i);
    const options = getTagAttributes(fragments[1]);
    return (<BannerBlock options={options}>{markup(fragments[2])}</BannerBlock>);
  }
}
