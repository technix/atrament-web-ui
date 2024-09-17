import { h } from 'preact';
import getTagAttributes from 'src/utils/get-tag-attributes';

// [block width=50% align=left]text in bar[/block]

export default {
  regexp: /\[block.*?\].+?\[\/block\]/ig,
  replacer: (el, markup) => {
    const fragments = el.match(/\[block(.*?)\](.+?)\[\/block\]/i);
    let options = {};
    if (fragments[1]) {
      options = getTagAttributes(fragments[1]);
    }
    const blockStyle = {
      display: 'inline-block',
      width: options.width || '100%',
      'text-align': options.align || 'inherit',
      'vertical-align': options.valign || 'top',
    };
    return (<div style={blockStyle}>{markup(fragments[2])}</div>);
  }
}
