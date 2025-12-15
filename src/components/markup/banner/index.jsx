import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';

// [banner style=highlight allcaps=false]text in info block[/banner]

const BannerBlock = ({children, options}) => {
  const classList = clsx(
    style.bannerblock,
    options.style === 'accent' && style.accent,
    options.allcaps && style.allcaps,
    options.class
  );
  return (<div class={classList}>{children}</div>);
};

export default {
  tag: 'banner',
  replacer: (options, content, markup) => <BannerBlock options={options}>{markup(content)}</BannerBlock>
}
