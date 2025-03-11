import { h } from 'preact';
import style from './index.module.css';
import { useCallback } from "preact/hooks";

import getTagAttributes from 'src/utils/get-tag-attributes';
import { useAtrament, useAtramentOverlay } from 'src/atrament/hooks';

// [button onclick=function]button text[/button]

const InlineButtonComponent = ({ children, options }) => {
  const { evaluateInkFunction } = useAtrament();
  const { setOverlayContent, refreshOverlay } = useAtramentOverlay();

  const clickHandler = useCallback((e) => {
    e.stopPropagation();
    const inkFn = options.onclick;
    const result = evaluateInkFunction(inkFn);
    if (result.output) {
      setOverlayContent(inkFn, result.output);
    } else {
      refreshOverlay();
    }
  }, [ evaluateInkFunction, setOverlayContent, refreshOverlay, options.onclick ]);

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
  regexp: /\[button[ =].+?\].+?\[\/button\]/ig,
  replacer: (el, markup) => {
    const fragments = el.match(/\[button([ =].+?)\](.+?)\[\/button\]/i);
    let attributes = fragments[1];
    if (attributes.startsWith('=')) {
      attributes = `onclick${attributes}`;
    }
    const options = getTagAttributes(attributes);
    return (<InlineButtonComponent options={options}>{markup(fragments[2])}</InlineButtonComponent>);
  }
}
