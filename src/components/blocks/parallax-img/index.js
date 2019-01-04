import { h, Component } from 'preact';
// import style from './style';

class ParallaxImg extends Component {
  scrollListener = () => {
    const { top, bottom, height } = this.element.getBoundingClientRect();
    const isVisible = top < this.scrollerHeight && bottom > 0;
    this.setState({ visible: isVisible });
    if (isVisible) {
      let step = (this.scrollerHeight + height) / 100;
      let scrollPercentage = Math.round(100 - ((top + height) / step));
      this.setState({ scrollPercentage });
    }
  }

  componentDidMount() {
    this.scroller = this.props.scroller();
    this.scrollerHeight = this.scroller.getBoundingClientRect().height;
    this.scroller.addEventListener('scroll', this.scrollListener);
  }

  componentWillUnmount() {
    this.scroller.removeEventListener('scroll', this.scrollListener);
  }

  render({ width, height }, { visible, scrollPercentage }) {
    return (
      <div style={`background-color: ${visible ? '#990000' : '#000000'}; width: ${width}; height: ${height}`} ref={(e) => this.element = e}>
        <div style={`width: 30px; height: 30px; position: relative; top: 30px; left: 30px; background-color: #FFFFFF; transition: 300ms linear all; transform: rotate(${scrollPercentage}deg);`} />
      </div>
    );
  }
}

export default ParallaxImg;
