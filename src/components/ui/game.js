import { h } from 'preact';
import UIStory from './game/story';
import UIToolbar from './toolbar';

const UIGame = ({ scene, episode, makeChoice }) => {
  console.log(scene);
  return (
    <div class='atrament-container'>
      <UIToolbar />
      <UIStory scene={scene} episode={episode} makeChoice={makeChoice} />
    </div>
  );
};

export default UIGame;