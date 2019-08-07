import { h, Component } from 'preact';
import style from './style';

import { fmtText } from '_src_/lib/typography';

// choice component
class Choice extends Component {
  getRefChoice = e => this.props.setRef(this.props.option.id, e);

  handleClick = (e) => {
    e.preventDefault();
    return this.props.makeChoice(this.props.option.id);
  };

  render({ option }) {
    let optionText = option.choice;
    let choiceClasses = ['ui-choice', style.choice].join(' ');

    if (option.choice === '^') {
      optionText = '»';
      choiceClasses = ['ui-endepisode', style.endEpisode].join(' ');
    }

    return (
      <a
        href="#"
        onClick={this.handleClick}
        class={choiceClasses}
        ref={this.getRefChoice}
      >
        {fmtText(optionText)}
      </a>
    );
  }
}

export default Choice;
