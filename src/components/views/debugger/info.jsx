import { h } from 'preact';
import { useAtrament } from 'src/atrament/hooks';
import { useTranslator } from '@eo-locale/preact';

import Collapse from 'src/components/ui/collapse';
import Table from 'src/components/ui/table';

const DebugInfo = () => {
  const { atrament } = useAtrament();
  const translator = useTranslator();

  const inkstory = atrament.ink.story();
  const inkstate = inkstory.state;
  const gamedata = atrament.state.get().game;
  
  const tableData = [
    [translator.translate('debug.info.ink-file'), `${gamedata.$path}/${gamedata.$file}`],
    [translator.translate('debug.info.story-seed'), inkstate.storySeed],
    [translator.translate('debug.info.current-turn-index'), inkstate.currentTurnIndex],
  ];

  return(
    <Collapse title={translator.translate('debug.info')} open>
      <Table data={tableData} />
    </Collapse>
  );
};

export default DebugInfo;