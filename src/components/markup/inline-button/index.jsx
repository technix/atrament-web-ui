import { h } from 'preact';
import style from './index.module.css';
import { useCallback } from "preact/hooks";

import getTagAttributes from 'src/utils/get-tag-attributes';
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

const InlineButtonComponent = ({ children, options }) => {
  const { atrament, state } = useAtrament();
  const clickHandler = useCallback(() => {
    const result = evaluateInkFunction(atrament, options.onclick);
    if (result.output) {
      setActiveOverlayContent(atrament, options.onclick, result.output);
    } else {
      const activeOverlay = state.OVERLAY.activeOverlay;
      if (activeOverlay) {
        // refresh active overlay
        const result = evaluateInkFunction(atrament, activeOverlay);
        setActiveOverlayContent(atrament, activeOverlay, result.output);
      }
    }
  }, [ atrament, options.onclick, state ]);
  let buttonStyle = options.bordered === false ? style.inline_button : style.bordered_button;
  return (
    <button
      class={buttonStyle}
      onClick={clickHandler}
      disabled={options.disabled}
    >
      {children}
    </button>
  );
}

export default {
  regexp: /\[button.+?\].+?\[\/button\]/ig,
  replacer: (el, markup) => {
    const fragments = el.match(/\[button(.+?)\](.+?)\[\/button\]/i);
    let attributes = fragments[1];
    if (attributes.startsWith('=')) {
      attributes = `onclick${attributes}`;
    }
    const options = getTagAttributes(attributes);
    return (<InlineButtonComponent options={options}>{markup(fragments[2])}</InlineButtonComponent>);
  }
}
