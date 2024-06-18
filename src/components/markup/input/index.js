import { h } from 'preact';
import style from './index.css';

import getTagAttributes from 'src/utils/get-tag-attributes';
import useAtrament from 'src/atrament/hooks';

function setInkVariable(atrament, name, value) {
  try {
    atrament.ink.setVariable(name, value);
  } catch (e) {
    atrament.ink.story().onError(e.toString());
  }
}

const Input = ({inactive, options}) => {
  const { atrament } = useAtrament();
  const onInput = (e) => {
    setInkVariable(atrament, options.var, e.srcElement.value);
  };
  return (
    <input disabled={inactive} class={style.input} value={options.value} placeholder={options.placeholder} onInput={onInput} />
  );
};

export default {
  regexp: /\[input.+?\]/ig,
  replacer: (el, markup, isInactive) => {
    const fragments = el.match(/\[input(.+?)\]/i);
    const options = getTagAttributes(fragments[1]);
    return (<Input inactive={isInactive} options={options} />);
  }
}
