import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { actions } from '../../store';

import engine from '../../game/engine';

// --
import Episode from '../../components/game-ui/episode';
import Map from '../../components/game-ui/map';

class Game extends Component {
  makeChoice = (id) => {
    engine.makeChoice(id).then(this.renderScene);
  }

  componentWillMount() {
    engine.startGame().then(this.renderScene);
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