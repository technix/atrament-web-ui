import { h, Component } from 'preact';
import style from './style';

import Choices from './choices';
import Section from './section';

// episode component
class Episode extends Component {
  getScroller = () => this.scroller; // required to pass 'scroller' object to parallax

  // save refs
  refScroller = e => this.scroller = e;
  refCurrentScene = e => this.currentScene = e;

  componentDidUpdate() {
    if (this.scroller) {
      this.scroller.scrollTop = this.scroller.scrollHeight;

      // Animations
      this.currentScene.classList.remove('sceneAppear');
      void this.currentScene.offsetWidth;
      this.currentScene.classList.add('sceneAppear');
    }
  }
  
  render ({ episode, scene, makeChoice }, { scrollEvent }) {
    return (
      <div class={style.scroller}>
        <div id="episode" class={style.episode} ref={this.refScroller}>
          <div class={style.paragraphWrapper}>
            {episode.map((s) => <Section text={s.text} />)}
          </div>
          <div class={style.currentScene} ref={this.refCurrentScene}>
            <Section text={scene.text} />
          </div>
          <Choices choices={scene.choices} makeChoice={makeChoice} />
        </div>
      </div>
    );
  }
}

export default Episode;
