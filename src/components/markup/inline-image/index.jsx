import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';
import { useAtrament } from 'src/atrament/hooks';

// [img]path/to/image.jpg[/img]

const InlineImage = ({ options, children }) => {
  const { getAssetPath } = useAtrament();
  const imgClass = clsx(style.inline_image, 'atrament-tag-img', options.class);
  return (<img class={imgClass} src={getAssetPath(children)} />);
}

export default {
  tag: 'img',
  tagOptions: { raw: true },
  component: InlineImage
}
