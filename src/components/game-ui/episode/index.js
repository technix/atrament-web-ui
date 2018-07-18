import { h, Component } from 'preact';
import style from './style';

// paragraph component
const Paragraph = ({ text }) => (
  <div class={style.paragraph}>
    { text.map((line) => <p dangerouslySetInnerHTML={{ __html: line }} />) }
  </div>
);

// choice component
class Choice extends Component {
  makeChoice = (e) => {
    e.preventDefault();
    this.props.makeChoice(this.props.option.id);
  };

  render({ option }) {
    return (
      <a href="#" onClick={this.makeChoice} class={style.choice}>{option.choice}</a>
    );
  }
}

// episode component
class Episode extends Component {
  componentDidUpdate() {
    if (this.currentScene) {
      this.currentScene.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
  
  render ({ episode, scene, makeChoice }) {
    return (
      <div class={style.scroller}>
        <div class={style.episode}>
          <div class={style.paragraphWrapper}>
            {episode.map((s) => <Paragraph text={s.text} />)}
          </div>
          <div class={style.currentScene} ref={c => this.currentScene = c}>
            <Paragraph text={scene.text} />
          </div>
          <div class={style.choiceWrapper}>
            {scene.choices.map((o) => <Choice option={o} makeChoice={makeChoice} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default Episode;
