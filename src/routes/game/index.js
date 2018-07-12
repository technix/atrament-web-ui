import { h, Component } from 'preact';
import style from './style';
import Atrament from 'atrament';

import game from '../../assets/game/capsule.ink.json';

import Episode from '../../components/episode';

let atrament;

export default class Game extends Component {
  makeChoice = (id) => {
    console.log('CHOICE:', id);
    atrament.makeChoice(id).then(this.renderScene);
  }

  constructor() {
    super();
    this.state = {
      scene: { choices: [] },
      episode: []
    };
  }

  componentWillMount() {
    atrament = new Atrament({
      episodes: [
        'capsule.ink.json'
      ]
    });
    atrament.on('loadStory', () => new Promise((resolve) => resolve(JSON.stringify(game))));
    atrament.registerCommand(
      'CLEAR',
      (params, episode) => {
        episode.reset(); return false;
      },
      ['episode']
    );
    atrament.startGame().then(this.renderScene);
  }

  renderScene = () => {
    atrament.renderScene();
    const ep = atrament.getCurrentEpisode();
    this.setState({
      scene: atrament.getCurrentScene(),
      episode: ep.slice(0, ep.length-1)
    });
  }

  render({}, { scene, episode }) {
    if (!scene.text) {
      return;
    }
    return (
      <Episode scene={scene} episode={episode} makeChoice={this.makeChoice} />
    );
  }
}
