import { h, Component } from 'preact';
import style from './style';

import Choice from './choice';
import Paragraph from './paragraph';
import ParallaxImg from '_src_/components/blocks/parallax-img';

// episode component
class Episode extends Component {
  getScroller = () => this.scroller;

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
        <div id="episode" class={style.episode} ref={c => this.scroller = c}>
          <div class={style.paragraphWrapper}>
            {episode.map((s) => <Paragraph text={s.text} />)}
          </div>
          <div class={style.currentScene} ref={c => this.currentScene = c}>
            <Paragraph text={scene.text} />
          </div>
          <div class={style.choiceWrapper} ref={c => this.currentChoices = c}>
            {scene.choices.map((o) => <Choice option={o} makeChoice={makeChoice} />)}
          </div>
          <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>

    <ParallaxImg width={'200px'} height={'100px'} scroller={this.getScroller} />

    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>
    <p>test</p>

        </div>
      </div>
    );
  }
}

export default Episode;
