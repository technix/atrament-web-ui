import { h, Component } from 'preact';
import { connect, actions } from '_src_/store';

import engine from '_src_/game/engine';

// --
import Episode from '_src_/components/game-ui/episode';
import Map from '_src_/components/game-ui/map';

class Game extends Component {
  makeChoice = (id) => {
    engine.makeChoice(id).then(this.renderScene);
    engine.saveGame();
  }

  componentWillMount() {
    engine.initGame().then(this.renderScene);
  }

  componentDidUpdate() {
    if (this.props.scene.choices.length === 0 ) {
      engine.clearSavedGame();
    }
  }

  renderScene = () => {
    engine.renderScene();
    this.props.gameState(engine.gameState);
  }

  render({ scene, episode }) {
    if (!scene) {
      return (
        <div style="width: 50%; padding-top: 200px; margin: auto;">Loading...</div>
      );
    }
    if (scene.type === 'map') {
      return (
        <Map scene={scene} makeChoice={this.makeChoice} />
      );
    }
    return (
      <Episode scene={scene} episode={episode} makeChoice={this.makeChoice} />
    );
  }
}

export default connect('scene,episode', actions)(Game);
