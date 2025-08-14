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
  tag: 'spoiler',
  replacer: (options, content, markup) => <Spoiler>{markup(content)}</Spoiler>
}
