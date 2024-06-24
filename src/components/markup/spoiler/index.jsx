import { h } from 'preact';
import style from './index.module.css';
import { useState } from "preact/hooks";

// [spoiler]text in spoiler[/spoiler]

const classes = [
  style.hidden,
  style.revealed
];

const Spoiler = ({children}) => {
  const [ currentStyle, setStyle ] = useState(0);
  return (
    <span
      class={classes[currentStyle]}
      onClick={() => setStyle(1 - currentStyle)}
    >
      <span>{children}</span>
    </span>
  );
};

export default {
  regexp: /\[spoiler\].*?\[\/spoiler\]/ig,
  replacer: (el, markup) => {
    const fragments = el.match(/\[spoiler\](.*?)\[\/spoiler\]/i);
    return (<Spoiler>{markup(fragments[1])}</Spoiler>);
  }
}
