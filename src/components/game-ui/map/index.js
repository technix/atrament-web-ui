import { h, Component } from 'preact';
import style from './style';

const assetPath = 'assets/game/map';

function delay(sec) {
  return new Promise((resolve) => setTimeout(resolve, sec));
}

class Point extends Component {
  makeChoice = (e) => {
    e.preventDefault();
    this.props.mapChoice(this.props.data);
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

const Marker = ({ data }) => (
  <div class={style.marker} style={{
    top: data.y,
    left: data.x,
    'background-image': `url(${assetPath}/player.png)`
  }}
  />
);

function mapPoint(m, id) {
  console.warn(m);
  return {
    caption: m[0],
    x: m[1],
    y: m[2],
    bg: m[3],
    id
  };
}

// map component
class Map extends Component {
  state = {
    mapClass: [style.map, 'mapSlideIn'].join(' '),
    mapPoints: [],
    mapPosition: {}
  }

  mapChoice = (data) => {
    this.setState({ mapPosition: data });
    delay(1200).then(() => {
      this.setState({ mapClass: [style.map, 'mapSlideOut'].join(' ') });
      setTimeout(() => this.props.makeChoice(data.id), 200);
    });
  }

  componentWillMount() {
    const scene = this.props.scene;
    // position map points
    const mapPoints = scene.choices.map((c) => {
      const m = scene.tags[c.choice];
      if (m) {
        return mapPoint(m, c.id);
      }
    });
    // current place on map
    const currentPosition = scene.text[0].replace(/\n|\n/g, '');
    const mapPosition = mapPoint(scene.tags[currentPosition], 1);
    this.setState({ mapPoints, mapPosition });
  }

  render({ scene }, { mapClass, mapPoints, mapPosition }) {
    return (
      <div class={mapClass} style={{
        'background-image': `url(${assetPath}/${scene.tags.bg})`
      }}
      >
        {mapPoints.map((p) => <Point data={p} mapChoice={this.mapChoice} />)}
        <Marker data={mapPosition} />
      </div>
    );
  }
}

export default Map;
