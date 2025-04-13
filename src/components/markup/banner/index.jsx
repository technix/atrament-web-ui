import { h } from 'preact';
import style from './index.module.css';

// [banner style=highlight allcaps=false]text in info block[/banner]

import getTagAttributes from 'src/utils/get-tag-attributes';

const BannerBlock = ({children, options}) => {
  const classList = [
    style.bannerblock,
    options.style === 'accent' ? style.accent : '',
    options.allcaps ? style.allcaps : ''
  ].join(' ');
  return (<div class={classList}>{children}</div>);
};

export default {
  regexp: /\[banner(?:\s+[^\]]+)?\].*?\[\/banner\]/ig,
  replacer: (el, markup) => {
    const fragments = el.match(/\[banner(.*?)\](.*?)\[\/banner\]/i);
    const options = getTagAttributes(fragments[1]);
    return (<BannerBlock options={options}>{markup(fragments[2])}</BannerBlock>);
  }
}
