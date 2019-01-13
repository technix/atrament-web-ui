import { h, Component } from 'preact';
import { connect } from 'unistore/preact';
import { actions } from '_src_/store';

import engine from '_src_/game/engine';

// --
import Episode from '_src_/components/game-ui/episode';
import Map from '_src_/components/game-ui/map2';

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
    //if (scene.type === 'map') {
    const scene1 = {
      tags: {
        scene: 'map',
        bg: 'bg-citymap.jpg',
        mp_road: [ "Дорога", 150, 160, "ae-house.png" ],
        mp_house: [ "Дом Томаса", 150, 720, "ae-house.png" ],
        mp_church: [ "Церковь", 360, 450, "ae-church.png" ],
        mp_store: [ "Магазин", 540, 680, "ae-general_store.png" ],
        mp_hotel: [ "Гостиница", 360, 280, "ae-historical.png" ],
        mp_seaside: [ "Берег моря", 545, 235, "ae-harbor.png" ],
      },
      text: [
        'mp_road'
      ],
      choices: [
        { id: 0, choice: 'mp_house' },
        { id: 1, choice: 'mp_hotel' },
        { id: 2, choice: 'mp_store' },
        { id: 3, choice: 'mp_seaside' }
      ]
    };

      return (
        <Map width={654} height={1041} scene={scene1} makeChoice={this.makeChoice} />
      );
    //}
    //return (
    //  <Episode scene={scene} episode={episode} makeChoice={this.makeChoice} />
    //);
  }
}

export default connect('scene,episode', actions)(Game);
