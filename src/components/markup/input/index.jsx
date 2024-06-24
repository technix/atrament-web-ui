import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import style from './index.module.css';

import getTagAttributes from 'src/utils/get-tag-attributes';
import useAtrament from 'src/atrament/hooks';

// [input var=variable placeholder="placeholder text" type=number]

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
    let targetValue = e.srcElement.value || defaultValue;
    if (options.type === 'number') {
      targetValue = +targetValue;
    }
    setInkVariable(atrament, options.var, targetValue);
    setDefaultValue(targetValue);
  };
  const inputType = options.type === 'number' ? 'number' : 'text';
  return (
    <input disabled={inactive} class={style.input} value={defaultValue} placeholder={options.placeholder} type={inputType} onInput={onInput} />
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
