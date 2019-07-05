import { h, Component } from 'preact';
import style from './style';

import { makeChoice } from '_src_/game/engine';

import { fmtText } from '_src_/lib/typography';

// choice component
class Choice extends Component {
  handleClick = (e) => {
    e.preventDefault();
    return makeChoice(this.props.option.id);
  };

  render({ option }) {
    let optionText = option.choice;
    let choiceClasses = ['ui-choice', style.choice].join(' ');

    if (option.choice === '^') {
      optionText = '»';
      choiceClasses = ['ui-endepisode', style.endEpisode].join(' ');
    }

    return (
      <a href="#" onClick={this.handleClick} class={choiceClasses}>{fmtText(optionText)}</a>
    );
  }
}

export default Choice;
