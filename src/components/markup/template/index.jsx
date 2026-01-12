import { h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';
import { createPortal } from 'preact/compat';
import templates from 'src/templates';
import mustache from 'mustache';
import { useAtrament } from 'src/atrament/hooks';

// [template src=t.htm var:title="aaa"]content[/template]
// options:
//  - src     path to template file relative to 'resources/templates'
//  - wrapper (div|span)
//  - var:VARNAME variable value

const HtmlTemplate = ({ options, children }) => {
  const { throwAtramentError, getAssetPath } = useAtrament();
  const rootRef = useRef(null);
  const [slot, setSlot] = useState(null);

  // attach content to the template wrapper
  useEffect(() => {
    if (!rootRef.current) return;
    const el = rootRef.current.querySelector('[data-mount="content"]');
    setSlot(el);
  }, []);

  // populate template variables
  let vars = {};
  Object.entries(options).forEach(([key, value]) => {
    const varString = key.match(/var:(.+)/);
    if (varString) {
      // use getAssetPath if variable contains game asset
      vars[varString[1]] = `${value}`.startsWith('GAME_ASSET:')
        ? getAssetPath(value.replace('GAME_ASSET:', ''))
        : value;
    }
  });

  if (!templates[options.src]) {
    throwAtramentError(`Template not found: ${options.src}`);
    return;
  }

  // render HTML content
  let htmlContent;
  try {
    htmlContent = mustache.render(templates[options.src], vars);
  } catch (e) {
    throwAtramentError(`Template: ${options.src}. ${e}`);
    console.error(e);
    return;
  }

  // render the template
  return (
    <>
      {
        options.wrapper === 'span'
          ? <span ref={rootRef} class={options.class} dangerouslySetInnerHTML={{ __html: htmlContent }} />
          : <div ref={rootRef} class={options.class} dangerouslySetInnerHTML={{ __html: htmlContent }} />
      }
      {slot && createPortal(children, slot)}
    </>
  );
}

export default {
  tag: 'template',
  component: HtmlTemplate
}
