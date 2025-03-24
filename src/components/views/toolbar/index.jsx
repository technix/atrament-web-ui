import { h } from 'preact';
import style from './index.module.css';
import { useTranslator } from '@eo-locale/preact';
import { useAtramentState } from 'src/atrament/hooks';
import Markup from 'src/components/ui/markup';
import { TOOLBAR_STORE_KEY, TOOLBAR_DEFAULT } from 'src/constants';

const Toolbar = () => {
  const translator = useTranslator();
  const atramentState = useAtramentState([TOOLBAR_STORE_KEY]);
  const toolbarContent = atramentState[TOOLBAR_STORE_KEY] !== TOOLBAR_DEFAULT
    ? atramentState[TOOLBAR_STORE_KEY]
    : translator.translate('default.title');

  return (
    <div class={[style.toolbar, 'atrament-toolbar'].join(' ')}>
      <Markup content={toolbarContent} />
    </div>
  )
};

export default Toolbar;
