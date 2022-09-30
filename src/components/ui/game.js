import { h } from 'preact';

const UIGame = ({ scene, episode, makeChoice }) => {
  function handleClick (e) {
    const id = e.target.getAttribute('data-id');
    makeChoice(id);
  }

  return (
    <div>
      <blockquote>
        { episode.map((s) => s.text.map((p) => p === '' ? '' : <p>{p}</p>)) }
      </blockquote>
      <br />
      <blockquote>
        <p>{scene.text.map((p) => p === '' ? '' : <p>{p}</p>)}</p>
      </blockquote>
      <ul>
        { scene.choices.map((c) => <li key={c.id}><button data-id={c.id} onClick={handleClick}>{c.choice}</button></li>) }
      </ul>
    </div>
  );
};

export default UIGame;