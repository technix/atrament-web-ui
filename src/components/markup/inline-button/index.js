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

function setActiveOverlayContent(atrament, overlayName, content) {
  atrament.state.setSubkey('OVERLAY', 'activeOverlay', overlayName);
  let textContent = content;
  const contentArray = content.split('\n');
  const firstLine = contentArray.shift();
  const title = firstLine.match(/\[title\](.+?)\[\/title\]/i);
  if (title) {
    atrament.state.setSubkey('OVERLAY', 'title', title[1]);
    textContent = contentArray.join('\n');
  }
  atrament.state.setSubkey('OVERLAY', 'content', textContent);
}

const InlineButtonComponent = ({ children, callback, bordered }) => {
  const { atrament, state } = useAtrament();

  const clickHandler = useCallback(() => {
    const result = evaluateInkFunction(atrament, callback);
    if (result.output) {
      setActiveOverlayContent(atrament, callback, result.output);
    } else {
      const activeOverlay = state.OVERLAY.activeOverlay;
      if (activeOverlay) {
        // refresh active overlay
        const result = evaluateInkFunction(atrament, activeOverlay);
        setActiveOverlayContent(atrament, activeOverlay, result.output);
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
