import { h } from 'preact';
import style from './index.module.css';
import { useAtrament } from 'src/atrament/hooks';
import getTagAttributes from 'src/utils/get-tag-attributes';

import ContainerImage from 'src/components/ui/container-image'

// [picture align=left]path/to/image.jpg[/picture]

const Picture = ({ options, src }) => {
  const { getAssetPath } = useAtrament();
  if (options.aside) {
    return (
      <div
        class={`${style.aside_image_wrapper} ${style[`aside_image_wrapper_${options.aside}`]}`}
        style={{ width: options.width || '30%'}}
      >
        <img class={style.aside_image} src={getAssetPath(src)} />
      </div>
    );
  }
  const pictureOptions = {
    fullsize: true
  };
  if (options.width) {
    pictureOptions.width = options.width;
  }
  return (<ContainerImage src={getAssetPath(src)} options={pictureOptions} />);
}

export default {
  regexp: /\[picture.*?\].*?\[\/picture\]/ig,
  replacer: (el, markup) => {
    const fragments = el.match(/\[picture(.*?)\](.*?)\[\/picture\]/i);
    const options = getTagAttributes(fragments[1]);
    return (<Picture options={options} src={fragments[2]} />);
  }
}