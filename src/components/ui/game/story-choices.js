import { h } from 'preact';
import { useEffect } from 'preact/hooks';

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

export default UIStoryChoices;