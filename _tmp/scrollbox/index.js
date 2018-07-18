import { h, Component } from 'preact';
import style from './style';
import content from './LICENSE.txt';

export default class Scrollbox extends Component {
  state = {
    oldTouchY: 0,
    posY: 0
  }

  getMaxScroll = () => this.elemContent.clientHeight - this.elemContainer.clientHeight;

  scrollY = (delta) => {
    const maxScroll = this.getMaxScroll();
    let newY = this.state.posY - delta;
    if (newY > 0) {
      newY = 0;
    }
    if (0 - newY > maxScroll) {
      newY = -maxScroll;
    }
    if (newY !== this.state.posY) {
      console.log(newY);
      this.setState({ posY: newY });
    }
  }

  onWheel = (e) => {
    this.scrollY(e.deltaY);
  }

  onTouchMove = (e) => {
    const touchY = e.targetTouches[0].clientY;
    if (!this.state.oldTouchY) {
      this.setState({ oldTouchY: touchY });
    } else {
      const deltaY = this.state.oldTouchY - touchY;
      this.setState({ oldTouchY: touchY });
      this.scrollY(deltaY);
    }
  }

/*
      <div
        class={style.container}
        onWheel={this.onWheel}
        onTouchMove={this.onTouchMove}
        ref={c => this.elemContainer = c}
      >
*/

  render({}, { posY }) {
    return (
      <div
        class={style.container}
        ref={c => this.elemContainer = c}
      >
        <div
          class={style.content}
          style={{ transform: `translateY(${posY}px)` }}
          ref={c => this.elemContent = c}
        >
          {content}
        </div>
      </div>
    );
  }
}