import { h, Component } from 'preact';

export default class Choice extends Component {
  makeChoice = () => {
    const p = this.props;
    p.makeChoice(p.choice.choice);
  };

  render({ choice, cssClass }) {
    return (
      <button onClick={this.makeChoice} class={cssClass}>{choice.text}</button>
    );
  }
}
