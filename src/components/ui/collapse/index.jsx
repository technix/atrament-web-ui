import { h } from 'preact';
import style from './index.module.css';

const Collapse = ({ title, children, open = false }) => (
  <details class={style.collapse} open={open}>
    <summary class={style.collapse_title}>{title}</summary>
    <div class={style.collapse_children}>
      {children}
    </div>
  </details>
);

export default Collapse;
