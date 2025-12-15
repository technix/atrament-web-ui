import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { useAtrament, useAtramentState } from 'src/atrament/hooks';

// [video]path/to/video.mp4[/video]

const Video = ({ src, options }) => {
  const { getAssetPath } = useAtrament();
  const atramentState = useAtramentState(['settings']);
  const videoPlayerRef = useRef(null);
  const soundVolume = atramentState.settings.volume;
  
  useEffect(() => {
    videoPlayerRef.current.volume = soundVolume/100;
  }, [videoPlayerRef, soundVolume]);

  return (
    <video
      class={options.class}
      ref={videoPlayerRef}
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
