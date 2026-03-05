import { h } from 'preact';
import style from './index.module.css';

import { APP_VERSION } from 'src/constants';

const VersionInfo = ({ onClick }) => (
  <div class={style.atrament_version} onClick={onClick}>
    <div class={style.atrament_about}>?</div>
    <div class={style.atrament_appversion}>Atrament {APP_VERSION}</div>
  </div>
);

export default VersionInfo;
