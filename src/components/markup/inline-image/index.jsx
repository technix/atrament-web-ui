import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';
import { useAtrament } from 'src/atrament/hooks';

// [img]path/to/image.jpg[/img]

const InlineImage = ({ options, src }) => {
  const { getAssetPath } = useAtrament();
  const imgClass = clsx(style.inline_image, options.class);
  return (<img class={imgClass} src={getAssetPath(src)} />);
}

export default {
  tag: 'img',
  replacer: (options, content) => <InlineImage options={options} src={content} />
}
