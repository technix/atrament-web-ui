import { h } from 'preact';

// [font=Fira Sans]text with font applied[/font]

export default {
  tag: 'font',
  replacer: (options, content, markup) => <span style={{ 'font-family': options.DEFAULT }}>{markup(content)}</span>
}
