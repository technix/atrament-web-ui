import { h } from 'preact';
import style from './index.css';
import { useCallback } from "preact/hooks";

import useAtrament from 'src/atrament/hooks';

const InlineButtonComponent = ({ children, callback }) => {
  const { atrament } = useAtrament();
  const clickHandler = useCallback(() => {
    try {
      const result = atrament.ink.evaluateFunction(callback, [], true); 
      console.warn(result);
    } catch (e) {
      atrament.ink.story().onError(e.toString());
    }
  }, [ atrament, callback ]);
  return (<button class={style.inline_button} onClick={clickHandler}>{children}</button>);
}

export default {
  regexp: /<\[.+?\]\[.+?\]>/g,
  replacer: (el, markup) => {
    const fragments = el.match(/<\[(.+?)\]\[(.+?)\]>/);
    return (<InlineButtonComponent callback={fragments[2]}>{markup(fragments[1])}</InlineButtonComponent>);
  }
}
