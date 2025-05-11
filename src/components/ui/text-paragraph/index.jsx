import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';

const TextParagraph = ({ children }) => (
  <div class={clsx(style.text_paragraph, 'atrament-text-paragraph')}>
    {children}
  </div>
);

export default TextParagraph;
