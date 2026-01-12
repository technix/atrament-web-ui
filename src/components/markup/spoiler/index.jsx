import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';
import { useState, useCallback } from "preact/hooks";

// [spoiler]text in spoiler[/spoiler]

const classes = [
  style.hidden,
  style.revealed
];

const Spoiler = ({ options, children }) => {
  const [ currentStyle, setStyle ] = useState(0);
  const onClick = useCallback((e) => {
    e.stopPropagation();
    setStyle((v) => 1 - v);
  }, [ setStyle ]);
  return (
    <span
      class={clsx(classes[currentStyle], 'atrament-tag-spoiler', options.class)}
      onClick={onClick}
    >
      <span>{children}</span>
    </span>
  );
};

export default {
  tag: 'spoiler',
  component: Spoiler
}
