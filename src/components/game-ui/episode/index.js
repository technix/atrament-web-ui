import { h, Component } from 'preact';
import style from './style';

import Choice from './choice';
import Paragraph from './paragraph';
import ParallaxImg from '_src_/components/blocks/parallax-img';

// episode component
class Episode extends Component {
  getScroller = () => this.scroller; // required to pass 'scroller' object to parallax

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
          <p>test 1</p>
    <p>test 2</p>
    <p>test 3</p>
    <p>test 4</p>
    <p>test 5</p>
    <p>test 6</p>
    <p>test 7</p>
    <p>test 8</p>
    <p>test 9 </p>
    <p>test 10</p>
    <p>test 11</p>
    <p>test 12</p>
    <p>test 13</p>
    <p>test 14</p>
    <p>test 15</p>
    <p>test 16</p>
    <p>test 17</p>
    <p>test 18</p>
    <p>test 19</p>
    <p>test 20</p>

    <ParallaxImg width={'360px'} height={'300px'} scroller={this.getScroller} />

    <p>test 1</p>
    <p>test 2</p>
    <p>test 3</p>
    <p>test 4</p>
    <p>test 5</p>
    <p>test 6</p>
    <p>test 7</p>
    <p>test 8</p>
    <p>test 9 </p>
    <p>test 10</p>
    <p>test 11</p>
    <p>test 12</p>
    <p>test 13</p>
    <p>test 14</p>
    <p>test 15</p>
    <p>test 16</p>
    <p>test 17</p>
    <p>test 18</p>
    <p>test 19</p>
    <p>test 20</p>

        </div>
      </div>
    );
  }
}

export default Episode;
