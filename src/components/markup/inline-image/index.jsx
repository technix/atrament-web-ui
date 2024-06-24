import { h } from 'preact';
import style from './index.module.css';
import { getAssetPath } from "src/utils/get-asset-path";

export default {
  regexp: /\[img\].+?\[\/img\]/ig,
  replacer: (el) => {
    const fragments = el.match(/\[img\](.+?)\[\/img\]/i);
    return (<img class={style.inline_image} src={getAssetPath(fragments[1])} />);
  }
}
