import { h } from 'preact';
import { useAtrament } from 'src/atrament/hooks';
import { Text, useTranslator } from '@eo-locale/preact';

import { STORYPATH_STORE_KEY } from 'src/constants';

import Collapse from 'src/components/ui/collapse';
import Table from 'src/components/ui/table';

const DebugInfo = () => {
  const { atrament } = useAtrament();
  const translator = useTranslator();

  const inkstory = atrament.ink.story();
  const inkstate = inkstory.state;
  const gamedata = atrament.state.get().game;

  const tableData = [
    [<Text id='debug.info.ink-file' key='ink-file' />, `${gamedata.$path}/${gamedata.$file}`],
    [<Text id='debug.info.story-seed' key='story-seed' />, inkstate.storySeed],
    [<Text id='debug.info.current-turn-index' key='current-turn-index' />, inkstate.currentTurnIndex],
    [<Text id='debug.info.path' key='path' />, gamedata[STORYPATH_STORE_KEY]]
  ];

  return (
    <Collapse title={translator.translate('debug.info')}>
      <Table data={tableData} fixed />
    </Collapse>
  );
};

export default DebugInfo;
