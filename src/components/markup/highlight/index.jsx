import { h } from 'preact';
import getTagAttributes from 'src/utils/get-tag-attributes';

// [highlight color=black bgcolor=red]highlighted text[/highlight]

export default {
  regexp: /\[highlight.*?\].+?\[\/highlight\]/ig,
  replacer: (el, markup) => {
    const fragments = el.match(/\[highlight(.*?)\](.+?)\[\/highlight\]/i);
    let options = {};
    if (fragments[1]) {
      options = getTagAttributes(fragments[1]);
    }
    const highlightStyle = {
      display: 'inline-block',
      'background-color': options.bgcolor || 'var(--accent-bg-color)',
      color: options.color || 'var(--accent-fg-color)'
    };
    return (<span style={highlightStyle}>{markup(fragments[2])}</span>);
  }
}
