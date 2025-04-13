import { h } from 'preact';

import getTagAttributes from 'src/utils/get-tag-attributes';

// [css class=classname style="style applied"]text with CSS class and style applied[/css]

export default {
  regexp: /\[css(?:\s+[^\]]+)?\].+?\[\/css\]/ig,
  replacer: (el, markup) => {
    const fragments = el.match(/\[css(.*?)\](.+?)\[\/css\]/i);
    let options = {};
    if (fragments[1]) {
      options = getTagAttributes(fragments[1]);
    }
    return (<span class={options.class} style={options.style}>{markup(fragments[2])}</span>);
  }
}
