import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';

// [progress min=0 max=100 value=99 style=accent]text in bar[/progress]

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

  const classList = clsx(
    style.progress_bar,
    options.style === 'accent' ? style.accent : style.standard
  );

  return (
    <div class={style.progress_frame}>
      <div class={classList} style={{width:`${width}%`}} />
      <div class={style.progress_content}>{children}&nbsp;</div>
    </div> 
  );
};

export default {
  tag: 'progress',
  replacer: (options, content, markup) => <Progress options={options}>{markup(content)}</Progress>
}
