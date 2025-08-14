import { h } from 'preact';

// [url=URL]Text[/url]

export default {
  tag: 'url',
  replacer: (options, content, markup) => {
    return (<a href={options.DEFAULT} target="_blank" rel="noreferrer">{markup(content)}</a>);
  }
}
