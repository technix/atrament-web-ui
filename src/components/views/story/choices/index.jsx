import { h } from 'preact';
import { Text } from '@eo-locale/preact';
import { route } from 'preact-router';
import { useAtrament } from 'src/atrament/hooks';
import LinkHome from 'src/components/ui/link-home';
import ChoiceButtonGroup from '../choice-button-group';
import ClickToContinue from '../click-to-continue';

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
  if ((numberOfChoices === 1 && currentScene.choices[0].choice === '')) {
    // empty choice
    return (<ClickToContinue setReady={setReady} withChoice />);
  } else if (numberOfChoices === 0) { 
    if (currentScene.canContinue) {
      // paragraph mode
      return (<ClickToContinue setReady={setReady} />);
    }
    // end game
    return (<EndGameLink />);
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
