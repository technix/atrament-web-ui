import { h } from 'preact';
import { useAtrament } from 'src/atrament/hooks';

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
  tag: 'picture',
  replacer: (options, content) => {
    return (<Picture options={options} src={content} />);
  }
}