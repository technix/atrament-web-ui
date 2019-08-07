import { animateRef } from '_src_/lib/animate';

const Animate = {
  allChoiceRefs: [],

  refChoices: (i, e) => Animate.allChoiceRefs[i] = e,

  choicesAppear() {
    return Animate.allChoiceRefs.reduce((promiseChain, ref) => {
      if (ref === null) {
        return promiseChain;
      }
      return promiseChain.then(() => animateRef(ref, 'animation-choicesAppear'));
    }, Promise.resolve([]));
  },

  choicesDisappear(id) {
    const allAnimations = [];
    Animate.allChoiceRefs.forEach((ref, index) => {
      if (ref !== null && index !== id) {
        allAnimations.push(animateRef(ref, 'animation-choicesDisappear'));
      }
    });
    return Promise.all(allAnimations)
      .then(() => animateRef(Animate.allChoiceRefs[id], 'animation-choicesDisappear'));
  },

  sceneAppear(ref) {
    return animateRef(ref, 'animation-sceneAppear', true)
      .then(() => new Promise(resolve => setTimeout(resolve, 1000)));
  }

};

export default Animate;