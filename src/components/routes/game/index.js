import { h, Component } from 'preact';
import { connect, actions } from '_src_/store';

import { initGame, clearSavedGame } from '_src_/game/engine';

// --
import Loading from '_src_/components/game-ui/loading';
import Episode from '_src_/components/game-ui/episode';
import Map from '_src_/components/game-ui/map';


class Game extends Component {
  componentWillMount() {
    initGame();
  }

  componentDidUpdate(props) {
    if (props.scene && props.scene.choices.length === 0 ) {
      clearSavedGame();
    }
  }

  render({ scene, episode }) {
    if (!scene) {
      return (<Loading />);
    }
    if (scene.type === 'map') {
      return (<Map scene={scene} />);
    }
    return (<Episode scene={scene} episode={episode} />);
  }
}

export default connect('scene,episode', actions)(Game);
