import { h } from 'preact';
import style from './index.module.css';
import { useTranslator } from '@eo-locale/preact';
import { useAtramentState } from 'src/atrament/hooks';
import Markup from 'src/components/ui/markup';

const toolbarKey = 'TOOLBAR';
const Toolbar = () => {
  const translator = useTranslator();
  const atramentState = useAtramentState([toolbarKey]);
  const toolbarContent = atramentState[toolbarKey] !== '__DEFAULT__'
    ? atramentState[toolbarKey]
    : translator.translate('default.title');

  return (
    <div class={[style.toolbar, 'atrament-toolbar'].join(' ')}>
      <Markup content={toolbarContent} />
    </div>
  )
};

export default Toolbar;
