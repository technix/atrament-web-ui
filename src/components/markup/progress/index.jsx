import { h } from 'preact';
import style from './index.module.css';

// [progress min=0 max=100 value=99 style=accent]text in bar[/progress]

import getTagAttributes from 'src/utils/get-tag-attributes';

const Progress = ({options, children}) => {
  const min = +options.min || 0;
  const max = +options.max || 100;
  const value = +options.value || 0;
  let width = value ? ((value - min) * 100)/(max - min) : 0;
  if (width > 100) {
    width = 100;
  }
  if (width < 0) {
    width = 0;
  }

  const classList = [
    style.progress_bar,
    options.style === 'accent' ? style.accent : style.standard
  ].join(' ');

  return (
    <div class={style.progress_frame}>
      <div class={classList} style={{width:`${width}%`}} />
      <div class={style.progress_content}>{children}&nbsp;</div>
    </div> 
  );
};

export default {
  regexp: /\[progress(?:\s+[^\]]+)?\].*?\[\/progress\]/ig,
  replacer: (el, markup) => {
    const fragments = el.match(/\[progress(.+?)\](.*?)\[\/progress\]/i);
    const options = getTagAttributes(fragments[1]);
    return (<Progress options={options}>{markup(fragments[2])}</Progress>);
  }
}
