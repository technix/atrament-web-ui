import { h, Component } from 'preact';

import engine from '../../game/engine';

// --
import Episode from '../../components/game-ui/episode';

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
      return (
        <div style="width: 50%; padding-top: 200px; margin: auto;">Loading...</div>
      );
    }
    return (
      <Episode scene={scene} episode={episode} makeChoice={this.makeChoice} />
    );
  }
}
