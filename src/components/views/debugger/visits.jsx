import { h } from 'preact';
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
  const { atrament } = useAtrament();
  const translator = useTranslator();
  const inkVisits = listInkVisits(atrament);
  return(
    <Collapse title={translator.translate('debug.visits')}>
      <Table data={inkVisits} />
    </Collapse>
  );
};

export default DebugVisits;
