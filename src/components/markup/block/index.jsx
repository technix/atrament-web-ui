import { h } from 'preact';
import clsx from 'clsx';

// [block width=50% align=left]text in bar[/block]

export default {
  tag: 'block',
  component: ({ options, children }) => {
    const blockStyle = {
      display: 'inline-block',
      width: options.width || '100%',
      'text-align': options.align || 'inherit',
      'vertical-align': options.valign || 'top'
    };
    return (<div style={blockStyle} class={clsx('atrament-tag-block', options.class)}>{children}</div>);
  }
}
