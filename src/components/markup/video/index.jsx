import { h } from 'preact';
import { useAtrament } from 'src/atrament/hooks';
import getTagAttributes from 'src/utils/get-tag-attributes';

const Video = ({ src, options }) => {
  const { getAssetPath } = useAtrament();
  return (<video width="100%" autoplay disablePictureInPicture loop {...options}>
    <source src={getAssetPath(src)} />
  </video>);
}

export default {
  regexp: /\[video.*?\].+?\[\/video\]/ig,
  replacer: (el) => {
    const fragments = el.match(/\[video(.*?)\](.+?)\[\/video\]/i);
    let options = {};
    if (fragments[1]) {
      options = getTagAttributes(fragments[1]);
    }
    return (<Video options={options} src={fragments[2]} />);
  }
}
