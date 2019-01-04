import { h, Component } from 'preact';
// import style from './style';

class ParallaxImg extends Component {
  scrollListener = (scrollEvent) => {
    const scroller = this.scroller;
    const scrollerCoords = scroller.getBoundingClientRect();
    const elCoords = this.element.getBoundingClientRect();
    const isVisible = elCoords.top < scrollerCoords.height && elCoords.bottom > 0;
    this.setState({ visible: isVisible });
    if (isVisible) {

      let step = scrollerCoords.height / 100;

      let scrollPercentage = elCoords.top / step;
      console.log('scrollPercentage', scrollPercentage);
    }
  }

  componentDidMount() {
    this.scroller = this.props.scroller();
    this.scroller.addEventListener('scroll', this.scrollListener);
  }

  componentWillUnmount() {
    this.scroller.removeEventListener('scroll', this.scrollListener);
  }

  render({ width, height }, { visible }) {
    return (
      <div style={`background-color: ${visible ? '#990000' : '#000000'}; width: ${width}; height: ${height}`} ref={(e) => this.element = e} />
    );
  }
}

export default ParallaxImg;
