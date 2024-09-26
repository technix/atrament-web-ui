import { h } from 'preact';
import style from './index.module.css';
import { useState } from 'preact/hooks';
import { useAtrament } from 'src/atrament/hooks';
import { useTranslator } from '@eo-locale/preact';

import Collapse from 'src/components/ui/collapse';
import Table from 'src/components/ui/table';

import DebugVariableEditor from './var-editor';

function listInkVariables(atrament) {
  const varState = atrament.ink.getVariables();
  const inkVariables = Object.entries(varState);
  return inkVariables.sort((a, b) => a[0] > b[0] ? 0 : -1);
}

const DebugVariablesTable = ({ variables }) => {
  const translator = useTranslator();
  const tableData = variables.map(
    (item, i) => [ item[0], <DebugVariableEditor key={i} name={item[0]} value={item[1]} />]
  );
  return(
    <Table columns={
      [
        { name: translator.translate('debug.variables.name'), style: {width: '25%', 'text-align': 'left'} },
        { name: translator.translate('debug.variables.value'), style: {'text-align': 'left'} }
      ]
    } data={tableData} pageSize={10} />
  );
}

const DebugVariables = () => {
  const [ varNameFilter, setVarNameFilter ] = useState('');
  const { atrament } = useAtrament();
  const translator = useTranslator();
  const inkVariables = listInkVariables(atrament).filter((v) => v[0].includes(varNameFilter));
  
  const handleFilterChange = (e) => {
    setVarNameFilter(e.target.value);
  };

  return(
    <Collapse title={translator.translate('debug.variables')}>
      <div class={style.input_div}>
        <input
          class={style.input}
          type="text"
          placeholder={translator.translate('debug.variables.filter-by-name')}
          value={varNameFilter}
          onInput={handleFilterChange}
        />
      </div>
      <DebugVariablesTable variables={inkVariables} />
    </Collapse>
  );
};

export default DebugVariables;
