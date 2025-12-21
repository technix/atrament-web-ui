import { h } from 'preact';
import clsx from 'clsx';

// [highlight color=black bgcolor=red]highlighted text[/highlight]

export default {
  tag: 'highlight',
  component: ({ options, children }) => {
    const highlightStyle = {
      'background-color': options.bgcolor || 'var(--accent-bg-color)',
      color: options.color || 'var(--accent-fg-color)',
      padding: options.bgcolor ? '0.1em' : 'inherit',
      'box-decoration-break': 'clone'
    };
    return (<span style={highlightStyle} class={clsx('atrament-tag-highlight', options.class)}>{children}</span>);
  }
}
