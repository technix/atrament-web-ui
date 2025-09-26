import { useTranslator } from '@eo-locale/preact';
import { useAtramentState } from 'src/atrament/hooks';
import { TOOLBAR_STORE_KEY, TOOLBAR_DEFAULT } from 'src/constants';

export default function useToolbarContent() {
  const translator = useTranslator();
  const atramentState = useAtramentState([TOOLBAR_STORE_KEY]);
  const toolbarContent = atramentState[TOOLBAR_STORE_KEY] !== TOOLBAR_DEFAULT
    ? atramentState[TOOLBAR_STORE_KEY]
    : translator.translate('default.title');
  return toolbarContent;
}
