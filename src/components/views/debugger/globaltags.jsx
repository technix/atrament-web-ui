import { h } from 'preact';
import style from './index.module.css';

import { KNOWN_GLOBAL_TAGS } from 'src/constants';

import { useAtrament } from 'src/atrament/hooks';
import { useTranslator } from '@eo-locale/preact';

import Collapse from 'src/components/ui/collapse';
import Table from 'src/components/ui/table';

const DebugGlobaltags = () => {
  const { atrament } = useAtrament();
  const translator = useTranslator();
  const globaltags = atrament.ink.getGlobalTags();
  
  const displayGlobaltags = Object.keys(globaltags).map(k => {
    if (KNOWN_GLOBAL_TAGS.includes(k)) {
      return [k, globaltags[k]];
    }
    return [(
      <span
        key={k}
        class={style.unknown_tag}
        title={translator.translate('debug.unknown-tag')}
      >{k}</span>), globaltags[k]];
  });

  return(
    <Collapse title={translator.translate('debug.global-tags')} open>
      <Table data={displayGlobaltags} />
    </Collapse>
  );
};

export default DebugGlobaltags;
