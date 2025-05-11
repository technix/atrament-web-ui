import { h } from 'preact';
import { Text } from '@eo-locale/preact';

import { useAtrament } from 'src/atrament/hooks';
import Settings from 'src/components/views/settings';
import LinkHome from 'src/components/ui/link-home';
import Break from 'src/components/ui/break';

const MenuHomeScreen = () => {
  const { atrament } = useAtrament();
  const exitApp = atrament.interfaces.platform.exitApp;
  return (<>
    <Settings />
    {exitApp ? (<><Break /><LinkHome onClick={exitApp}><Text id={'main.exit'} /></LinkHome></>): ''}
  </>);
};

export default MenuHomeScreen;
