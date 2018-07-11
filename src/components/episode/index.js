import { h } from 'preact';
import style from './style';

// child components
import Choice from './choice';
import Paragraph from './paragraph';

//
const Episode = ({ episode, scene, makeChoice }) => (
  <div class={style.sceneContainer}>
    <div class={style.paragraphWrapper}>
      {episode.map((s) => <Paragraph text={s.text} cssClass={style.paragraph} />)}
    </div>
    <div class={style.choiceWrapper}>
      {scene.choices.map((c) => <Choice choice={c} makeChoice={makeChoice} cssClass={style.choice} />)}
    </div>
  </div>
);

export default Episode;
