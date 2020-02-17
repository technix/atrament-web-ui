import { h, Component } from 'preact';

import connectGame from '_src_/components/connect-game';

// --
import Loading from '_src_/components/game-ui/loading';
import Episode from '_src_/components/game-ui/episode';
import Map from '_src_/components/game-ui/map';


class Game extends Component {
  componentWillMount() {
    this.props.gameActions.initGame();
  }

  componentDidUpdate(props) {
    if (props.scene && props.scene.choices.length === 0 ) {
      this.props.gameActions.clearSavedGame();
    }
  }

  render({ scene }) {
    if (!scene) {
      return (<Loading />);
    }
    if (scene.type === 'map') {
      return (<Map scene={scene} />);
    }
    return (<Episode />);
  }
}

export default connectGame(Game);
