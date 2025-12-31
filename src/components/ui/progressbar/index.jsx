import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';

const ProgressBar = ({ options, children }) => {
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

  const classListFrame = clsx(
    style.progress_frame,
    options.border === false && style.borderless,
    'atrament-tag-progressbar',
    options.class
  );

  const classListGauge = clsx(
    style.progress_bar,
    options.style === 'accent' ? style.accent : style.standard,
    options.solid && style.progress_bar_solid,
    'atrament-tag-progressbar-gauge'
  );

  return (
    <div class={classListFrame}>
      <div class={classListGauge} style={{ width:`${width}%` }} />
      <div class={clsx(style.progress_content, 'atrament-tag-progressbar-content')}>
        {children}{options.display === 'thin' ? '' : <>&nbsp;</>}
      </div>
    </div>
  );
};

export default ProgressBar;
