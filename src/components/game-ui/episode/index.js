import { h, Component } from 'preact';
import style from './style';

import { makeChoice } from '_src_/game/engine';

import Choices from './choices';
import Section from './section';

import Animate from './animations';

// episode component
class Episode extends Component {
  getScroller = () => this.scroller; // required to pass 'scroller' object to parallax

  // save refs
  refScroller = e => this.scroller = e;
  refCurrentScene = e => this.currentScene = e;

  makeChoice(id) {
    Animate.choicesDisappear(id).then(() => makeChoice(id));
  }

  componentDidMount() {
    Animate.sceneAppear(this.currentScene)
      .then(Animate.choicesAppear);
  }

  componentDidUpdate() {
    if (this.scroller) {
      this.scroller.scrollTop = this.scroller.scrollHeight;
    }
    Animate.sceneAppear(this.currentScene)
      .then(Animate.choicesAppear);
  }
  
  render ({ episode, scene }, { scrollEvent }) {
    return (
      <div class={style.scroller}>
        <div id="episode" class={style.episode} ref={this.refScroller}>
          <div class={style.paragraphWrapper}>
            {episode.map((s) => <Section text={s.text} />)}
          </div>
          <div class={[style.currentScene, 'is-animated'].join(' ')} ref={this.refCurrentScene}>
            <Section text={scene.text} />
          </div>
          <Choices choices={scene.choices} makeChoice={this.makeChoice} refChoices={Animate.refChoices} />
        </div>
      </div>
    );
  }
}

export default Episode;
