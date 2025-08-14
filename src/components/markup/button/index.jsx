import { h } from 'preact';
import style from './index.module.css';
import { useCallback } from "preact/hooks";

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
      setOverlayContent(inkFn, result.output, options.display === 'modal' ? 'modal' : 'overlay');
    } else {
      refreshOverlay();
    }
  }, [ evaluateInkFunction, setOverlayContent, refreshOverlay, options ]);

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
  tag: 'button',
  replacer: (options, content, markup) => {
    if (options.DEFAULT) {
      options.onclick = options.DEFAULT;
    }
    return (<InlineButtonComponent options={options}>{markup(content)}</InlineButtonComponent>);
  }
}
