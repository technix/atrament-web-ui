import { h } from 'preact';
import { useAtrament } from 'src/atrament/hooks';

// [video]path/to/video.mp4[/video]

const Video = ({ src, options }) => {
  const { getAssetPath } = useAtrament();
  return (
    <video
      style={{ 'pointer-events': 'none' }}
      width='100%'
      autoplay
      disablePictureInPicture
      loop
      {...options}
    >
      <source src={getAssetPath(src)} />
    </video>
  );
}

export default {
  tag: 'video',
  replacer: (options, content) => <Video options={options} src={content} />
}
