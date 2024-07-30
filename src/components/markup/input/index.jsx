import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import style from './index.module.css';

import getTagAttributes from 'src/utils/get-tag-attributes';
import { useAtrament } from 'src/atrament/hooks';

// [input var=variable placeholder="placeholder text" type=number]

const Input = ({inactive, options}) => {
  const [ defaultValue, setDefaultValue ] = useState(null);
  const { getInkVariable, setInkVariable } = useAtrament();
  useEffect(
    () => setDefaultValue(getInkVariable(options.var)),
    [getInkVariable, options.var]
  );
  const onInput = (e) => {
    let targetValue = e.srcElement.value || defaultValue;
    if (options.type === 'number') {
      targetValue = +targetValue;
    }
    setInkVariable(options.var, targetValue);
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
