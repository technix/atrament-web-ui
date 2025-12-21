import { h } from 'preact';
import clsx from 'clsx';
import { useEffect, useRef } from 'preact/hooks';
import { useAtrament, useAtramentState } from 'src/atrament/hooks';

// [video]path/to/video.mp4[/video]

const Video = ({ src, options }) => {
  const { getAssetPath } = useAtrament();
  const atramentState = useAtramentState(['settings']);
  const videoPlayerRef = useRef(null);
  const { volume, mute } = atramentState.settings;
  
  useEffect(() => {
    videoPlayerRef.current.volume = volume/100;
  }, [videoPlayerRef, volume]);

  useEffect(() => {
    videoPlayerRef.current.muted = mute;
  }, [videoPlayerRef, mute]);

  return (
    <video
      class={clsx('atrament-tag-video', options.class)}
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
  tagOptions: { raw: true },
  component: Video
}
