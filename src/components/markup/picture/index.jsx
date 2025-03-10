import { h } from 'preact';
import { useAtrament } from 'src/atrament/hooks';
import getTagAttributes from 'src/utils/get-tag-attributes';

import ContainerImage from 'src/components/ui/container-image'

// [picture align=left]path/to/image.jpg[/picture]

const Picture = ({ options, src }) => {
  const { getAssetPath } = useAtrament();
  const pictureOptions = {
    fullsize: true
  };
  ['leftmargin', 'rightmargin', 'width'].forEach((k) => {
    if (options[k]) {
      pictureOptions[k] = options[k];
    }
  });
  return (<ContainerImage src={getAssetPath(src)} options={pictureOptions} />);
}

export default {
  regexp: /\[picture.*?\].*?\[\/picture\]/ig,
  replacer: (el) => {
    const fragments = el.match(/\[picture(.*?)\](.*?)\[\/picture\]/i);
    const options = getTagAttributes(fragments[1]);
    return (<Picture options={options} src={fragments[2]} />);
  }
}