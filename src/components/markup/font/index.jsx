import { h } from 'preact';

// [font=Fira Sans]text with font applied[/font]

export default {
  tag: 'font',
  replacer: (options, content, markup) => {
    const fontFamily = options.family || options.DEFAULT;
    return (<span class={options.class} style={{ 'font-family': fontFamily }}>{markup(content)}</span>);
  }
}
