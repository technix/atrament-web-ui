import { h } from 'preact';
import style from './index.css';

const Toggle = ({enabled, onChange}) => (
  <div class={style.checkbox_wrapper}>
    <input type="checkbox" class={style.checkbox} checked={enabled} onChange={onChange} />
  </div>
);

export default Toggle;

