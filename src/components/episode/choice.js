import { h, Component } from 'preact';

export default class Choice extends Component {
  makeChoice = (e) => {
    e.preventDefault();
    const p = this.props;
    p.makeChoice(p.choice.id);
  };

  render({ choice, cssClass }) {
    return (
      <a href="#" onClick={this.makeChoice} class={cssClass}>{choice.choice}</a>
    );
  }
}
