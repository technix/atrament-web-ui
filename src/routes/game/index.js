import { h, Component } from 'preact';
import style from './style';

import scene from '../../assets/mocks/scene.json';
import episode from '../../assets/mocks/episode.json';

import Episode from '../../components/episode';

function makeChoice(id) {
  console.log('CHOICE:', id);
}
export default class Game extends Component {
  render({ option, cssClass }) {
    return (
      <Episode scene={scene} episode={episode} makeChoice={makeChoice} />
    );
  }
}
