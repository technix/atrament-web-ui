import { h } from 'preact';

// [css class=classname style="style applied"]text with CSS class and style applied[/css]

export default {
  tag: 'css',
  replacer: (options, content, markup) => <span class={options.class} style={options.style}>{markup(content)}</span>
}
