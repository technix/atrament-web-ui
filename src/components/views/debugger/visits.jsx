import { h } from 'preact';
import { useState } from 'preact/hooks';
import style from './index.module.css';
import { useAtrament } from 'src/atrament/hooks';
import { useTranslator } from '@eo-locale/preact';

import Collapse from 'src/components/ui/collapse';
import Table from 'src/components/ui/table';

function listInkVisits(atrament) {
  const visitCounts = atrament.ink.story().state._visitCounts;
  const inkVisitCounts = [];
  for (let item of visitCounts) {
    inkVisitCounts.push(item);
  }
  return inkVisitCounts.sort((a, b) => a[0] > b[0] ? 0 : -1);
}

const DebugVisits = () => {
  const [ visitNameFilter, setVisitNameFilter ] = useState('');
  const { atrament } = useAtrament();
  const translator = useTranslator();
  const inkVisits = listInkVisits(atrament).filter((v) => v[0].includes(visitNameFilter));

  const handleFilterChange = (e) => {
    setVisitNameFilter(e.target.value);
  };

  return(
    <Collapse title={translator.translate('debug.visits')}>
      <div class={style.input_div}>
        <input
          class={style.input}
          type="text"
          placeholder={translator.translate('debug.variables.filter-by-name')}
          value={visitNameFilter}
          onInput={handleFilterChange}
        />
      </div>
      <Table
        columns={[
          {name: translator.translate('debug.visits.path'), style: {width: '75%', 'text-align': 'left'}},
          {name: translator.translate('debug.visits.count'), style: {'text-align': 'left'}}
        ]}
        data={inkVisits}
        pageSize={10}
        fixed
      />
    </Collapse>
  );
};

export default DebugVisits;
