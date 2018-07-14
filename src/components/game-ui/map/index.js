import { h, Component } from 'preact';
import style from './style';

const assetPath = 'assets/game/map';

class Point extends Component {
  makeChoice = (e) => {
    e.preventDefault();
    this.props.mapChoice(this.props.data.id);
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
class Map extends Component {
  state = {
    mapClass: [style.map, 'mapSlideIn'].join(' ')
  }

  mapChoice = (id) => {
    this.setState({ mapClass: [style.map, 'mapSlideOut'].join(' ') });
    setTimeout(() => this.props.makeChoice(id), 200);
  }

  render({ scene }, { mapClass }) {
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
      <div class={mapClass} style={{
        'background-image': `url(${assetPath}/${scene.tags.bg})`
      }}
      >
        {mapPoints.map((p) => <Point data={p} mapChoice={this.mapChoice} />)}
      </div>
    );
  }
}

export default Map;
