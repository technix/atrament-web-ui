import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
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

function getInkVariable(atrament, name) {
  let result;
  try {
    result = atrament.ink.getVariable(name);
  } catch (e) {
    atrament.ink.story().onError(e.toString());
  }
  return result;
}

const Input = ({inactive, options}) => {
  const [ defaultValue, setDefaultValue ] = useState(null);
  const { atrament } = useAtrament();
  useEffect(
    () => setDefaultValue(getInkVariable(atrament, options.var)),
    [atrament, options.var]
  );
  const onInput = (e) => {
    const targetValue = e.srcElement.value || defaultValue;
    setInkVariable(atrament, options.var, targetValue);
  };
  return (
    <input disabled={inactive} class={style.input} value={defaultValue} placeholder={options.placeholder} onInput={onInput} />
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
