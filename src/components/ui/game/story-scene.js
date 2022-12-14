import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

const UIStoryScene = ({ scene, isOld }) => {
  const elementRef = useRef(null);
  const classes = ['atrament-paragraph'];
  useEffect(() => {
    if (!isOld) {
      elementRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOld, elementRef]);

  if (isOld) {
    classes.push('old-text');
  }  
  return (
    <div class={classes.join(' ')} ref={elementRef}>
      {scene.text.filter((item) => item !== '').map(
        (p, id) => <p key={`${scene.id}-${id}`}>{p}</p>
      )}
    </div>
  );
}

export default UIStoryScene;