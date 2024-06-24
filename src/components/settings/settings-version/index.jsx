import { h } from 'preact';
import style from './index.module.css';
import useAtrament from 'src/atrament/hooks';

const SettingsVersion = () => {
  const { atrament } = useAtrament();
  return (<div class={style.settings_about}>atrament {atrament.version}</div>);
};

export default SettingsVersion;

