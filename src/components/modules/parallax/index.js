import { h, Component } from 'preact';

/*
// Outer scrolling element should be passed as 'scroller' prop

class myParallaxImage extends Parallax {
  componentDidMount() {
    // if needed
    super.componentDidMount();
  }

  componentWillUnmount() {
    // if needed
    super.componentWillMount();
  }

  // parallaxProgress changes from 0 (bottom edge) to 100 (top edge)
  render({}, { parallaxIsVisible, parallaxProgress }) {
    // should expose ref to outer dom element:
    <div ref={this.parallaxRef} />
  }
}
*/

class ParallaxComponent extends Component {
  _sl = () => {
    const { top, bottom, height } = this._prx.getBoundingClientRect();
    const parallaxIsVisible = top < this._sh && bottom > 0;
    this.setState({ parallaxIsVisible });
    if (parallaxIsVisible) {
      // isFullyVisible = top > 0 && bottom < this.scrollerHeight;
      let step = (this._sh + height) / 100;
      let parallaxProgress = Math.round(100 - ((top + height) / step));
      this.setState({ parallaxProgress });
    }
  }

  parallaxRef = (e) => this._prx = e;

  componentDidMount() {
    this._scr = this.props.scroller();
    this._sh = this._scr.getBoundingClientRect().height;
    this._scr.addEventListener('scroll', this._sl);
  }

  componentWillUnmount() {
    this._scr.removeEventListener('scroll', this._sl);
  }
}

export default ParallaxComponent;
