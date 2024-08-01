import { h } from 'preact';
import { useAtrament } from 'src/atrament/hooks';
import { useTranslator } from '@eo-locale/preact';

import Collapse from 'src/components/ui/collapse';
import Table from 'src/components/ui/table';

const DebugGlobaltags = () => {
  const { atrament } = useAtrament();
  const translator = useTranslator();
  const globaltags = atrament.ink.getGlobalTags();
  return(
    <Collapse title={translator.translate('debug.global-tags')} open>
      <Table data={Object.entries(globaltags)} />
    </Collapse>
  );
};

export default DebugGlobaltags;
