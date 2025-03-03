import { h } from 'preact';
import style from './index.module.css';
import { useAtrament } from 'src/atrament/hooks';

// [img]path/to/image.jpg[/img]

const InlineImage = ({ src }) => {
  const { getAssetPath } = useAtrament();
  return (<img class={style.inline_image} src={getAssetPath(src)} />);
}

export default {
  regexp: /\[img\].+?\[\/img\]/ig,
  replacer: (el) => {
    const fragments = el.match(/\[img\](.+?)\[\/img\]/i);
    return (<InlineImage src={fragments[1]} />);
  }
}
