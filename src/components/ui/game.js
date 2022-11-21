import { h } from 'preact';

const UIScene = ({ scene, isOld }) => {
  const classes = ['atrament-block'];
  if (isOld) {
    classes.push('old-text');
  }
  return (
    <div class={classes.join(' ')}>
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
    <div>
      {content.map((s, id) => <UIScene scene={s} isOld={id < content.length - 1} key={id} />)}
      <div class='atrament-block'>
        { scene.choices.map((c) => <button class='atrament-choice' data-id={c.id} key={c.id} onClick={handleClick}>{c.choice}</button>) }
      </div>
    </div>
  );
};

export default UIGame;