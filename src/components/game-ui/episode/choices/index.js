import { h, Component } from 'preact';
import style from './style';

import { animateRef } from '_src_/lib/animate';

import Choice from './choice';

// choice component
class Choices extends Component {
  makeChoice = (optionId) => {
    this.props.makeChoice(optionId);
  };

  refCurrentChoices = e => this.currentChoices = e;

  componentDidUpdate() {
    animateRef(this.currentChoices, 'choicesAppear');
  }

  render({ choices }) {
    return (
      <div class={[style.choiceWrapper, 'is-animated'].join(' ')} ref={this.refCurrentChoices}>
        {choices.map((o) => <Choice option={o} makeChoice={this.makeChoice} />)}
      </div>
    );
  }
}

export default Choices;