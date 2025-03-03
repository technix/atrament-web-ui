import { h } from 'preact';

// [font=Fira Sans]text with font applied[/font]

export default {
  regexp: /\[font=.+?\].+?\[\/font\]/ig,
  replacer: (el, markup) => {
    const fragments = el.match(/\[font=(.+?)\](.+?)\[\/font\]/i);
    return (<span style={{ 'font-family': fragments[1] }}>{markup(fragments[2])}</span>);
  }
}
