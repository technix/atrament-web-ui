import { h } from 'preact';
import { useCallback } from "preact/hooks";

const regexp = /<\[.+?\]\[.+?\]>/g;

const ButtonComponent = ({ content, callback }) => {
  const clickHandler = useCallback(() => callback(), [ callback ]);
  return (<a onClick={clickHandler}>{content}</a>);
}

const replacer = (el) => {
  const fragments = el.match(/<\[(.+?)\]\[(.+?)\]>/);
  console.log(fragments);
  return (<ButtonComponent content={fragments[1]} callback={() => console.log(fragments[2])} />);
}

export default {
  regexp,
  replacer
}