import { h } from 'preact';
import style from './style';

const re = RegExp('\\s+(.+?)="(.+?)"', 'g');

// image component
const Image = ({ config }) => {
  let match;
  const img = {};
  while ((match = re.exec(config)) !== null) {
    img[match[1]] = match[2];
  }
  return (
    <img
      src={img.src}
      class={[
        style.image,
        img.class
      ].join(' ')}
      style={img.style}
    />
  );
};

export default Image;
