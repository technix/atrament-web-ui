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
  let textContent = content;
  const contentArray = content.split('\n');
  const firstLine = contentArray.shift();
  const title = firstLine.match(/\[title\](.+?)\[\/title\]/i);
  if (title) {
    atrament.state.setSubkey('CARD', 'title', title[1]);
    textContent = contentArray.join('\n');
  }
  atrament.state.setSubkey('CARD', 'content', textContent);
}

const InlineButtonComponent = ({ children, callback, bordered }) => {
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
  return (
    <button
      class={bordered ? style.bordered_button : style.inline_button}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
}

export const Button = {
  regexp: /\[button=.+?\].+?\[\/button\]/ig,
  replacer: (el, markup) => {
    const fragments = el.match(/\[button=(.+?)\](.+?)\[\/button\]/i);
    return (<InlineButtonComponent callback={fragments[1]} bordered>{markup(fragments[2])}</InlineButtonComponent>);
  }
}

export const PlainButton = {
  regexp: /\[pbutton=.+?\].+?\[\/pbutton\]/ig,
  replacer: (el, markup) => {
    const fragments = el.match(/\[pbutton=(.+?)\](.+?)\[\/pbutton\]/i);
    return (<InlineButtonComponent callback={fragments[1]}>{markup(fragments[2])}</InlineButtonComponent>);
  }
}
