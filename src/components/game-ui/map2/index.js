import { h, Component } from 'preact';
import style from './style';
import scale from '_src_/lib/scale';

const assetPath = 'assets/game/map';
const delayPositionAnimation = 1400;
const delayMapslideAnimation = 200;

// get this data from somewhere else:
const viewportWidth = 360;
const viewportHeight = 616;

class Point extends Component {
  makeChoice = (e) => {
    e.preventDefault();
    if (! this.props.data.disabled) {
      this.props.mapChoice(this.props.data);
    }
  }
  
  render({ data }) {
    const styles = [style.point];
    if (data.disabled) {
      styles.push(style.disabled);
    }
    return (
      <div class={styles.join(' ')} style={{
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

function handleEvent (e) {
  let pageX;
  let pageY;
  if (e.touches) {
    pageX = parseInt(e.touches[0].pageX, 10);
    pageY = parseInt(e.touches[0].pageY, 10);
  } else {
    e.preventDefault();
    pageX = e.pageX;
    pageY = e.pageY;
  }
  if (scale.ratio) {
    pageX /= scale.ratio;
    pageY /= scale.ratio;
  }
  return [pageX, pageY];
}


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
    mapClass: style.map,
    mapPoints: [],
    mapPosition: {}
  }

  dragStart = (e) => {
    console.log('startDrag');
    const [ pageX, pageY ] = handleEvent(e);
    this.dragPoint = {
      x: pageX - parseInt(this.mapEl.style.left, 10),
      y: pageY - parseInt(this.mapEl.style.top, 10)
    };
    if (e.touches) {
      window.addEventListener('touchmove', this.drag);
      window.addEventListener('touchend', this.dragStop);
      // this.mapEl.style.transition = 'left 0.25s linear, top 0.25s linear';
    } else {
      window.addEventListener('mousemove', this.drag);
      window.addEventListener('mouseup', this.dragStop);
      this.mapEl.style.transition = 'none';
    }
  }

  drag = (e) => {
    const [ pageX, pageY ] = handleEvent(e);
    let diffX = - (this.dragPoint.x - pageX);
    let diffY = - (this.dragPoint.y - pageY);
    if (diffX > 0) {
      diffX = 0;
    }
    if (diffY > 0) {
      diffY = 0;
    }
    if (diffX < this.mapEdgeW) {
      diffX = this.mapEdgeW;
    }
    if (diffY < this.mapEdgeH) {
      diffY = this.mapEdgeH;
    }
    window.requestAnimationFrame(() => this.moveMap(diffX, diffY));
  }

  dragStop = (e) => {
    e.preventDefault();
    console.log('stopDrag');
    if (e.touches) {
      window.removeEventListener('touchmove', this.drag);
      window.removeEventListener('touchend', this.dragStop);
    } else {
      window.removeEventListener('mousemove', this.drag);
      window.removeEventListener('mouseup', this.dragStop);
    }
  }

  moveMap(diffX, diffY) {
    this.mapEl.style.left = `${diffX}px`;
    this.mapEl.style.top = `${diffY}px`;
  }


  getMapRef = (e) => {
    this.mapEl = e;
  }

  mapChoice = (data) => {
    const mapPoints = this.state.mapPoints.map((d) => {
      d.disabled = true; return d;
    });
    this.setState({ mapPosition: data, mapPoints });
    setTimeout(() => {
      this.setState({ mapClass: style.map });
      setTimeout(() => this.props.makeChoice(data.id), delayMapslideAnimation);
    }, delayPositionAnimation);
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
    // precalc map movements
    this.mapEdgeW = viewportWidth - this.props.width;
    this.mapEdgeH = viewportHeight - this.props.height;

    //
    this.setState({ mapPoints, mapPosition });
  }

  componentDidMount() {
    this.mapEl.addEventListener('mousedown', this.dragStart);
    this.mapEl.addEventListener('touchstart', this.dragStart);
  }

  render({ scene, width, height }, { mapClass, mapPoints, mapPosition }) {
    return (
      <div class={mapClass} style={{
        'background-image': `url(${assetPath}/${scene.tags.bg})`,
        left: 0,
        top: 0,
        width: `${width}px`,
        height: `${height}px`
      }} ref={this.getMapRef}
      >
        {mapPoints.map((p) => <Point data={p} mapChoice={this.mapChoice} />)}
        <Marker data={mapPosition} />
      </div>
    );
  }
}

export default Map;
