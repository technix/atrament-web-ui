import { h } from 'preact';
import { useEffect, useRef, useCallback } from 'preact/hooks';

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

const UIStoryChoices = ({ scene, handleClick }) => {
  useEffect(() => {
    console.log('choices rendered');
  }, []);

  return (
    <div class='atrament-paragraph'>
      { scene.choices.map((c) => (
        <button class='atrament-choice' data-id={c.id} key={c.id} onClick={handleClick}>{c.choice}</button>
      )) }
    </div>
  );
};

const UIStory = ({ scene, episode, makeChoice }) => {
  const handleClick = useCallback(
    (e) => {
      const id = e.target.getAttribute('data-id');
      makeChoice(id);
    },
    [makeChoice]
  );

  const content = [ ...episode, scene ];
    
  return (
    <div class='atrament-story'>
      <div class='atrament-story-content'>
        {
          content.map((s, id) => (
            <UIStoryScene scene={s} isOld={id < content.length - 1} key={id} />
          ))
        }
        <UIStoryChoices scene={scene} key={scene.id} handleClick={handleClick} />
      </div>
    </div>
  );
};
  
export default UIStory;
