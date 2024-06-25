import { h } from 'preact';
import { useTranslator } from '@eo-locale/preact';
import { useState } from 'preact/hooks';
import style from './index.module.css';

import useAtrament from 'src/atrament/hooks';
import markup from 'src/atrament/markup';

const Toolbar = () => {
  const translator = useTranslator();
  const { atrament, state } = useAtrament();
  const [ hasError, setError ] = useState(false);

  let toolbarContent = state.metadata.title || translator.translate('default.title');
  if (state.metadata.toolbar && !hasError) {
    try {
      const result = atrament.ink.evaluateFunction(state.metadata.toolbar, [], true);
      if (result.output) {
        toolbarContent = result.output;
      }
    } catch (e) {
      atrament.ink.story().onError(e.toString());
      setError(true);
    }
  }
  const transformedToolbarContent = markup(toolbarContent);

  return (
    <div class={[style.toolbar, 'atrament-toolbar'].join(' ')}>
      {transformedToolbarContent}
    </div>
  )
};

export default Toolbar;
