import { h } from 'preact';
import style from './index.css';

const SettingsModal = ({ children }) => (
  <div class={[style.settings, 'atrament-settings-modal'].join(' ')}>
    {children}
  </div>
);

export default SettingsModal;
