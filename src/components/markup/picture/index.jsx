import { h } from 'preact';
import { useAtrament } from 'src/atrament/hooks';

import ContainerImage from 'src/components/ui/container-image'

// [picture align=left]path/to/image.jpg[/picture]

const Picture = ({ options, children }) => {
  const { getAssetPath } = useAtrament();
  const pictureOptions = {
    fullsize: true
  };
  ['leftmargin', 'rightmargin', 'width'].forEach((k) => {
    if (options[k]) {
      pictureOptions[k] = options[k];
    }
  });
  return (<ContainerImage src={getAssetPath(children)} options={pictureOptions} />);
}

export default {
  tag: 'picture',
  tagOptions: { raw: true },
  component: Picture
}
