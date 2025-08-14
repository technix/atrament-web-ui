import { h } from 'preact';
import style from './index.module.css';
import { useAtrament } from 'src/atrament/hooks';

// [img]path/to/image.jpg[/img]

const InlineImage = ({ src }) => {
  const { getAssetPath } = useAtrament();
  return (<img class={style.inline_image} src={getAssetPath(src)} />);
}

export default {
  tag: 'img',
  replacer: (options, content) => <InlineImage src={content} />
}
