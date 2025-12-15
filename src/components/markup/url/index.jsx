import { h } from 'preact';

// [url=URL]Text[/url]

export default {
  tag: 'url',
  replacer: (options, content, markup) => {
    const href = options.href || options.DEFAULT;
    return (<a href={href} class={options.class} target="_blank" rel="noreferrer">{markup(content)}</a>);
  }
}
