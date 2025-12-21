import { h } from 'preact';
import style from './index.module.css';

const Toggle = ({ name, enabled, onChange }) => (
  <div class={style.checkbox_wrapper}>
    <input type="checkbox" class={style.checkbox} checked={enabled} onChange={onChange} name={name} id={name} />
  </div>
);

export default Toggle;

