import { h } from 'preact';
import style from './index.module.css';

const TextParagraph = ({ children }) => (
  <div class={[style.text_paragraph, 'atrament-text-paragraph'].join(' ')}>
    {children}
  </div>
);

export default TextParagraph;
