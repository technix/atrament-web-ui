import { h } from 'preact';
import style from './var-editor.module.css';
import { useEffect, useState } from 'preact/hooks';
import { useTranslator } from '@eo-locale/preact';
import { useAtrament } from 'src/atrament/hooks';

import Toggle from 'src/components/ui/toggle';

const NumberEditor = ({value, setNewValue}) => {
  const updateValue = (e) => setNewValue(+e.target.value);
  return (<input class={style.input} type="number" value={value} onInput={updateValue} />);
};

const StringEditor = ({value, setNewValue}) => {
  const updateValue = (e) => setNewValue(e.target.value);
  return (<input class={style.input} type="text" value={value} onInput={updateValue} />);
};

const BooleanEditor = ({value, setNewValue}) => {
  const updateValue = (e) => setNewValue(e.target.checked);
  return (<div class={style.toggle}><Toggle enabled={value} onChange={updateValue} /></div>);
};


const DebugVariableEditor = ({name, value}) => {
  const { getInkVariable, setInkVariable } = useAtrament();
  const translator = useTranslator();
  const [ editMode, setEditMode ] = useState(false);
  const [ initialValue, setInitialValue ] = useState(false);
  const [ newValue, setNewValue ] = useState(false);

  useEffect(() => {
    const v = getInkVariable(name);
    setInitialValue(v);
    setNewValue(v);
  }, [ name, getInkVariable, setInitialValue, setNewValue ]);

  const handleEdit = (e) => {
    e.preventDefault();
    setEditMode(true);
  };

  const cancelEdit = () => setEditMode(false);

  const saveValue = () => {
    if (newValue !== initialValue) {
      setInkVariable(name, newValue);
      setInitialValue(newValue);
    }
    setEditMode(false);
  }

  return (
    editMode ?
      <>
        <button class={style.button_close} onClick={cancelEdit} title={translator.translate('debug.variables.cancel')}>X</button>
        {typeof value === 'number' && <NumberEditor value={newValue} setNewValue={setNewValue} />}
        {typeof value === 'string' && <StringEditor value={newValue} setNewValue={setNewValue} />}
        {typeof value === 'boolean' && <BooleanEditor value={newValue} setNewValue={setNewValue} />}
        <button class={style.button} onClick={saveValue} title={translator.translate('debug.variables.save')}>&gt;</button>
      </>
      :
      <button class={style.button} onClick={handleEdit}>{JSON.stringify(newValue)}</button>
  );
}

export default DebugVariableEditor;
