import { h } from 'preact';
import clsx from 'clsx';
// [url=URL]Text[/url]

export default {
  tag: 'url',
  component: ({options, children }) => {
    const href = options.href || options.DEFAULT;
    return (<a href={href} class={clsx('atrament-tag-url',options.class)} target="_blank" rel="noreferrer">{children}</a>);
  }
}
