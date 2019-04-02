import { h, Component } from 'preact';
import { connect, actions } from '_src_/store';

import engine from '_src_/game/engine';

// --
import Loading from '_src_/components/game-ui/loading';
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

  componentDidUpdate(props) {
    if (props.scene.choices.length === 0 ) {
      engine.clearSavedGame();
    }
  }

  renderScene = () => {
    this.props.gameState(engine.renderScene());
  }

  render({ scene, episode }) {
    if (!scene) {
      return (<Loading />);
    }
    if (scene.type === 'map') {
      return (<Map scene={scene} makeChoice={this.makeChoice} />);
    }
    return (<Episode scene={scene} episode={episode} makeChoice={this.makeChoice} />);
  }
}

export default connect('scene,episode', actions)(Game);
