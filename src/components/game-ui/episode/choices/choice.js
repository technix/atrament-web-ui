import { h, Component } from 'preact';
import style from './style';

// choice component
class Choice extends Component {
  makeChoice = (e) => {
    e.preventDefault();
    this.props.makeChoice(this.props.option.id);
  };

  render({ option }) {
    let optionText = option.choice;
    let choiceClasses = ['ui-choice', style.choice].join(' ');

    if (option.choice === '^') {
      optionText = '»';
      choiceClasses = ['ui-endepisode', style.endEpisode].join(' ');
    }

    return (
      <a href="#" onClick={this.makeChoice} class={choiceClasses}>{optionText}</a>
    );
  }
}

export default Choice;
