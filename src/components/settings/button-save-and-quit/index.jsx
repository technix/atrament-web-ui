import { h } from 'preact';
import { route } from 'preact-router';
import { Text } from '@eo-locale/preact';

import { useAtrament } from 'src/atrament/hooks';
import LinkHome from 'src/components/ui/link-home';

const SaveAndQuit = () => {
  const { atrament } = useAtrament();
  const handleClick = async () => {
    await atrament.game.saveAutosave();
    route('/');
  }
  return (<LinkHome onClick={handleClick}><Text id={'game.save-and-quit'} /></LinkHome>);
};

export default SaveAndQuit;
