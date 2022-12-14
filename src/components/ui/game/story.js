import { h } from 'preact';
import { useCallback } from 'preact/hooks';

import UIStoryScene from './story-scene';
import UIStoryChoices from './story-choices';

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
    <div class='atrament-flex-container'>
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
