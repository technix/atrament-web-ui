import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';

const TextParagraph = ({ children, active = true, class_override = ''}) => (
  <div class={clsx(style.paragraph, !active && style.inactive, 'atrament-paragraph', class_override)}>
    {children}
  </div>
);

export default TextParagraph;
