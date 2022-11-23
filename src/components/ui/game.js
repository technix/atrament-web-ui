import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';

const UIScene = ({ scene, isOld }) => {
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
      {scene.text.map((p) => p === '' ? '' : <p>{p}</p>)}
    </div>
  );
}


const UIGame = ({ scene, episode, makeChoice }) => {
  function handleClick (e) {
    const id = e.target.getAttribute('data-id');
    makeChoice(id);
  }
  
  const content = [ ...episode, scene ];
  console.log(content);
  return (
    <div class='atrament-storytext'>
      <div class='toolbar'>⚙</div>
      <div class='atrament-storytext-content'>
        {content.map((s, id) => <UIScene scene={s} isOld={id < content.length - 1} key={id} />)}
        <div class='atrament-paragraph'>
          { scene.choices.map((c) => <button class='atrament-choice' data-id={c.id} key={c.id} onClick={handleClick}>{c.choice}</button>) }
        </div>
      </div>
    </div>
  );
};

export default UIGame;