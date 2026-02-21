import { h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import clsx from 'clsx';
import style from './index.module.css';
import catchClick from 'src/utils/catch-click';

import { useAtrament } from 'src/atrament/hooks';
import { ActiveContentContext } from 'src/context';

// [input var=variable placeholder="placeholder text" type=number]

const Input = ({ options }) => {
  const isActive = useContext(ActiveContentContext);

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
  const inputClass = clsx(style.input, 'atrament-tag-input', options.class);
  return (
    <input
      disabled={!isActive}
      class={inputClass}
      value={defaultValue}
      placeholder={options.placeholder}
      type={inputType}
      onInput={onInput}
      onClick={catchClick}
    />
  );
};

export default {
  tag: 'input',
  tagOptions: { single: true },
  component: Input
}
