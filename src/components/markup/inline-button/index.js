import { h } from 'preact';
import style from './index.css';
import { useCallback } from "preact/hooks";

import useAtrament from 'src/atrament/hooks';

function evaluateInkFunction(atrament, fn) {
  let result;
  try {
    result = atrament.ink.evaluateFunction(fn, [], true); 
  } catch (e) {
    atrament.ink.story().onError(e.toString());
  }
  return result;
}

function activeCardContent(atrament, card, content) {
  atrament.state.setSubkey('CARD', 'activeCard', card);
  atrament.state.setSubkey('CARD', 'content', content);
}

const InlineButtonComponent = ({ children, callback }) => {
  const { atrament, state } = useAtrament();

  const clickHandler = useCallback(() => {
    const result = evaluateInkFunction(atrament, callback);
    if (result.output) {
      activeCardContent(atrament, callback, result.output);
    } else {
      const activeCard = state.CARD.activeCard;
      if (activeCard) {
        // refresh activeCard
        const result = evaluateInkFunction(atrament, activeCard);
        activeCardContent(atrament, activeCard, result.output);
      }
    }
  }, [ atrament, callback, state ]);
  return (<button class={style.inline_button} onClick={clickHandler}>{children}</button>);
}

export default {
  regexp: /<\[.+?\]\[.+?\]>/g,
  replacer: (el, markup) => {
    const fragments = el.match(/<\[(.+?)\]\[(.+?)\]>/);
    return (<InlineButtonComponent callback={fragments[2]}>{markup(fragments[1])}</InlineButtonComponent>);
  }
}
