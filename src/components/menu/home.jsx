import { h } from 'preact';
import { Text } from '@eo-locale/preact';

import { useAtrament } from 'src/atrament/hooks';
import Settings from 'src/components/views/settings';
import MenuButtonAccent from 'src/components/ui/menu-button-accent';
import Break from 'src/components/ui/break';

const MenuHomeScreen = () => {
  const { atrament } = useAtrament();
  const exitApp = atrament.interfaces.platform.exitApp;
  return (<>
    <Settings />
    {exitApp ? (<><Break /><MenuButtonAccent onClick={exitApp}><Text id={'main.exit'} /></MenuButtonAccent></>): ''}
  </>);
};

export default MenuHomeScreen;
