import { h } from 'preact';

// [block width=50% align=left]text in bar[/block]

export default {
  tag: 'block',
  replacer: (options, content, markup) => {
    const blockStyle = {
      display: 'inline-block',
      width: options.width || '100%',
      'text-align': options.align || 'inherit',
      'vertical-align': options.valign || 'top',
    };
    return (<div style={blockStyle} class={options.class}>{markup(content)}</div>);
  }
}
