import { h } from 'preact';
import style from './index.module.css';
import { KNOWN_SCENE_TAGS } from 'src/constants';

import { useAtrament, useAtramentState } from 'src/atrament/hooks';
import { useTranslator } from '@eo-locale/preact';

import Collapse from 'src/components/ui/collapse';
import Table from 'src/components/ui/table';

const DebugScenetags = () => {
  const { atrament } = useAtrament();
  const { scenes } = useAtramentState(['scenes']);
  const translator = useTranslator();
  const globalTags = atrament.ink.getGlobalTags();
  const tags = scenes[scenes.length - 1]?.tags;

  // no scene object
  if (!tags) {
    return '';
  }

  const displayScenetags = Object.keys(tags)
    .filter((k) => !globalTags.hasOwnProperty(k))
    .map(k => {
      if (KNOWN_SCENE_TAGS.includes(k)) {
      return [k, tags[k]];
      }
      return [(
      <span
          key={k}
          class={style.unknown_tag}
          title={translator.translate('debug.unknown-tag')}
      >{k}</span>), tags[k]];
    });

  return(
    <Collapse title={`${translator.translate('debug.scene-tags')} [${displayScenetags.length}]`}>
      <Table data={displayScenetags} fixed />
    </Collapse>
  );
};

export default DebugScenetags;
