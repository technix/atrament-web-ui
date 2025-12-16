import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';
import { useCallback, useContext } from "preact/hooks";
import { ActiveContentContext } from 'src/context';

import { useAtramentOverlay } from 'src/atrament/hooks';

// [button onclick=function]button text[/button]

const InlineButtonComponent = ({ children, options }) => {
  const isActive = useContext(ActiveContentContext);
  const { execContentFunction } = useAtramentOverlay();

  const clickHandler = useCallback((e) => {
    e.stopPropagation();
    execContentFunction(options.onclick, options.display);
  }, [ execContentFunction, options ]);

  let buttonClass = clsx(
    options.bordered === false ? style.inline_button : style.bordered_button,
    options.class
  );
  return (
    <button
      class={buttonClass}
      onClick={clickHandler}
      disabled={!isActive || options.disabled}
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
