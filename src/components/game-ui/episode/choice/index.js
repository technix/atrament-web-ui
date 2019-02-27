import { h, Component } from 'preact';
import style from './style';

// choice component
class Choice extends Component {
  makeChoice = (e) => {
    e.preventDefault();
    this.props.makeChoice(this.props.option.id);
  };

  render({ option }) {
    if (option.choice === '^') {
      return (
        <a href="#" onClick={this.makeChoice} class={['ui-endepisode', style.endEpisode].join(' ')}>»</a>
      );
    }
    return (
      <a href="#" onClick={this.makeChoice} class={['ui-choice', style.choice].join(' ')}>{option.choice}</a>
    );
  }
}

export default Choice;
