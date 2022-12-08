import { h } from 'preact';
import UIStory from './game/story';

const UIGame = ({ scene, episode, makeChoice }) => {
  return (
    <div class='atrament-container'>
      <div class='toolbar'>⚙</div>
      <UIStory scene={scene} episode={episode} makeChoice={makeChoice} />
    </div>
  );
};

export default UIGame;