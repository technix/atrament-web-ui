import { h } from 'preact';
import style from './index.module.css';
import { useCallback } from "preact/hooks";

import getTagAttributes from 'src/utils/get-tag-attributes';
import { useAtramentOverlay } from 'src/atrament/hooks';

const InlineButtonComponent = ({ children, options }) => {
  const { openOverlay } = useAtramentOverlay();
  const clickHandler = useCallback(() => openOverlay(options.onclick), [ openOverlay, options.onclick ]);
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
