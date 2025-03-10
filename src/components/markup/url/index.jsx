import { h } from 'preact';

// [url=URL]Text[/url]

export default {
  regexp: /\[url=.+?\].+?\[\/url\]/ig,
  replacer: (el, markup) => {
    const fragments = el.match(/\[url=(.+?)\](.+?)\[\/url\]/i);
    return (<a href={fragments[1]} target="_blank" rel="noreferrer">{markup(fragments[2])}</a>);
  }
}
