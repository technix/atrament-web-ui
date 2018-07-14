import { h, Component } from 'preact';
import style from './style';

const assetPath = 'assets/game/map';

const currentMap = {
  bg: 'bg-citymap.jpg',
  points: [
    { id: 0, x: 40, y: 420, bg: 'ae-house.png', caption: 'Дом Томаса' },
    { id: 1, x: 60, y: 320, bg: 'ae-church.png', caption: 'Церковь' },
    { id: 2, x: 170, y: 240, bg: 'ae-general_store.png', caption: 'Магазин' },
    { id: 4, x: 180, y: 440, bg: 'ae-historical.png', caption: 'Гостиница' },
    { id: 5, x: 250, y: 80, bg: 'ae-harbor.png', caption: 'Берег моря' }
  ]
};

class Point extends Component {
  makeChoice = (e) => {
    e.preventDefault();
    this.props.makeChoice(this.props.data.id);
  }
  
  render({ data }) {
    return (
      <div class={style.point} style={{
        top: data.y,
        left: data.x,
        'background-image': `url(${assetPath}/${data.bg})`
      }} onClick={this.makeChoice}
      >
        <div class={style.caption}>{data.caption}</div>
      </div>
    );
  }
}

// map component
const Map = ({ scene, makeChoice }) => {
  const mapPoints = scene.choices.map((c) => {
    const m = scene.tags[c.choice];
    if (m) {
      return {
        caption: m[0],
        x: m[1],
        y: m[2],
        bg: m[3],
        id: c.id
      };
    }
  });

  return (
    <div class={style.map} style={{
      'background-image': `url(${assetPath}/${currentMap.bg})`
    }}
    >
      {mapPoints.map((p) => <Point data={p} makeChoice={makeChoice} />)}
    </div>
  );
};

export default Map;
