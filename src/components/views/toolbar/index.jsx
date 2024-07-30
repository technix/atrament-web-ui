import { h } from 'preact';
import { useTranslator } from '@eo-locale/preact';
import { useState } from 'preact/hooks';
import style from './index.module.css';

import { useAtrament, useAtramentState } from 'src/atrament/hooks';
import markup from 'src/atrament/markup';

const Toolbar = () => {
  const translator = useTranslator();
  const { evaluateInkFunction } = useAtrament();
  const atramentState = useAtramentState();
  const [ hasError, setError ] = useState(false);

  const { title, toolbar } = atramentState.metadata;
  let toolbarContent = title || translator.translate('default.title');
  if (toolbar && !hasError) {
    const result = evaluateInkFunction(toolbar);
    if (result.output) {
      toolbarContent = result.output;
    } else if (result.error) {
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
