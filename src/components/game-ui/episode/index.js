import { h, Component } from 'preact';
import style from './style';

import Choice from './choice';
import Section from './section';

// episode component
class Episode extends Component {
  getScroller = () => this.scroller; // required to pass 'scroller' object to parallax

  // save refs
  refScroller = e => this.scroller = e;
  refCurrentScene = e => this.currentScene = e;
  refCurrentChoices = e => this.currentChoices = e;

  componentDidUpdate() {
    if (this.scroller) {
      this.scroller.scrollTop = this.scroller.scrollHeight;
      
      /*
      // Animations
      this.currentScene.classList.remove('sceneAppear');
      this.currentChoices.classList.remove('choicesAppear');
      void this.currentScene.offsetWidth;
      void this.currentChoices.offsetWidth;
      this.currentScene.classList.add('sceneAppear');
      this.currentChoices.classList.add('choicesAppear');
      */
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
          <div class={style.choiceWrapper} ref={this.refCurrentChoices}>
            {scene.choices.map((o) => <Choice option={o} makeChoice={makeChoice} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default Episode;
