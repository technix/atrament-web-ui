import { h } from 'preact';
import style from './index.module.css';

import { appVersion } from 'src/constants';

const VersionInfo = ({ onClick }) => (
  <div class={style.atrament_version} onClick={onClick}>
    <div class={style.atrament_about}>?</div>
    <div class={style.atrament_appversion}>Atrament {appVersion}</div>
  </div>
);

export default VersionInfo;
