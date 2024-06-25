import { h } from 'preact';
import { Text } from '@eo-locale/preact';
import { route } from 'preact-router';
import useAtrament from 'src/atrament/hooks';
import LinkHome from 'src/components/ui/link-home';
import ChoiceButtonGroup from '../choice-button-group';

const EndGameLink = () => {
  const { atrament } = useAtrament();
  const endGame = async () => {
    await atrament.game.removeSave();
    route('/');
  };
  return (<LinkHome onClick={endGame}><Text id={'game.end'} /></LinkHome>);
};


const Choices = ({ key, currentScene, setReady, isHypertextMode }) => {
  const numberOfChoices = (currentScene && currentScene.choices) ? currentScene.choices.length : -1;
  
  if (numberOfChoices === 0) {
    return (<EndGameLink />)
  } else if (numberOfChoices >= 0 && !isHypertextMode) {
    return (
      <ChoiceButtonGroup
        key={key}
        currentScene={currentScene}
        setReady={setReady}
      />
    );
  }
};

export default Choices;
