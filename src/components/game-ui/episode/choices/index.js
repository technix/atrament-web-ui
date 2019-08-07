import { h } from 'preact';
import style from './style';

import Choice from './choice';

// choice component
const Choices = ({ choices, makeChoice, refChoices }) => (
  <div class={[style.choiceWrapper, 'is-animated'].join(' ')}>
    {choices.map((o) => <Choice option={o} makeChoice={makeChoice} setRef={refChoices} />)}
  </div>
);

export default Choices;