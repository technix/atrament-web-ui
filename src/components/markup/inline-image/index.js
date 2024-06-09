import { h } from 'preact';
import style from './index.css';
import { getAssetPath } from "src/utils/get-asset-path";

export default {
  regexp: /<IMAGE\[.+?\]>/g,
  replacer: (el) => {
    const fragments = el.match(/<IMAGE\[(.+?)\]>/);
    return (<img class={style.inline_image} src={getAssetPath(fragments[1])} />);
  }
}
