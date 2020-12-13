import { h, Component } from 'preact';

import connectGame from 'src/components/connect-game';

// --
import Loading from 'src/components/game-ui/loading';
import Episode from 'src/components/game-ui/episode';

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
    return (<Episode />);
  }
}

export default connectGame(Game);
