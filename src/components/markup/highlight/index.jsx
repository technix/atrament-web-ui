import { h } from 'preact';
import getTagAttributes from 'src/utils/get-tag-attributes';

// [highlight color=black bgcolor=red]highlighted text[/highlight]

export default {
  regexp: /\[highlight(?:\s+[^\]]+)?\].+?\[\/highlight\]/ig,
  replacer: (el, markup) => {
    const fragments = el.match(/\[highlight(.*?)\](.+?)\[\/highlight\]/i);
    let options = {};
    if (fragments[1]) {
      options = getTagAttributes(fragments[1]);
    }
    const highlightStyle = {
      'background-color': options.bgcolor || 'var(--accent-bg-color)',
      color: options.color || 'var(--accent-fg-color)',
      padding: options.bgcolor ? '0.1em' : 'inherit',
      'box-decoration-break': 'clone'
    };
    return (<span style={highlightStyle}>{markup(fragments[2])}</span>);
  }
}
