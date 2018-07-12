import { h, Component } from 'preact';
import style from './style';

import engine from '../../components/engine';

// --
import Episode from '../../components/episode';

export default class Game extends Component {
  makeChoice = (id) => {
    engine.makeChoice(id).then(this.renderScene);
  }

  constructor() {
    super();
    this.state = {
      scene: { choices: [] },
      episode: []
    };
  }

  componentWillMount() {
    engine.startGame().then(this.renderScene);
  }

  renderScene = () => {
    engine.renderScene();
    this.setState(engine.gameState);
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
