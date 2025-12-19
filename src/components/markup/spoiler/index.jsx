import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';
import { useState } from "preact/hooks";

// [spoiler]text in spoiler[/spoiler]

const classes = [
  style.hidden,
  style.revealed
];

const Spoiler = ({ options, children }) => {
  const [ currentStyle, setStyle ] = useState(0);
  return (
    <span
      class={clsx(classes[currentStyle], 'atrament-tag-spoiler', options.class)}
      onClick={() => setStyle(1 - currentStyle)}
    >
      <span>{children}</span>
    </span>
  );
};

export default {
  tag: 'spoiler',
  replacer: (options, content, markup) => <Spoiler options={options}>{markup(content)}</Spoiler>
}
