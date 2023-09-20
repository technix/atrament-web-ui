import { h } from 'preact';
import style from './index.css';

const SettingsBackdrop = ({ onClick }) => (
  <div class={[style.backdrop, 'atrament-settings-backdrop'].join(' ')} onClick={onClick}></div>
);

export default SettingsBackdrop;
