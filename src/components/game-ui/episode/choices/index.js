import { h, Component } from 'preact';
import style from './style';

import { makeChoice } from '_src_/game/engine';
import { animateRef } from '_src_/lib/animate';

import Choice from './choice';

// choice component
class Choices extends Component {
  allChoices = [];
  refChoices = (i, e) => this.allChoices[i] = e;

  animateChoicesAppear = () => {
    this.allChoices.reduce((promiseChain, ref) => {
      if (ref === null) {
        return promiseChain;
      }
      return promiseChain.then(() => animateRef(ref, 'animation-choicesAppear'));
    }, Promise.resolve([]));
  }

  animateChoicesDisappear = id => {
    const allAnimations = [];
    this.allChoices.forEach((ref, index) => {
      if (ref !== null && index !== id) {
        allAnimations.push(animateRef(ref, 'animation-choicesDisappear'));
      }
    });
    return Promise.all(allAnimations)
      .then(() => animateRef(this.allChoices[id], 'animation-choicesDisappear'));
  }

  makeChoice = (id) => {
    this.animateChoicesDisappear(id).then(() => makeChoice(id));
  }

  componentDidMount() {
    this.animateChoicesAppear();
  }

  componentDidUpdate() {
    this.animateChoicesAppear();
  }

  render({ choices }) {
    return (
      <div class={[style.choiceWrapper, 'is-animated'].join(' ')}>
        {choices.map((o) => <Choice option={o} makeChoice={this.makeChoice} setRef={this.refChoices} />)}
      </div>
    );
  }
}

export default Choices;