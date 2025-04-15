import { h } from 'preact';
import { Text } from '@eo-locale/preact';
import { route } from 'preact-router';
import { useAtrament } from 'src/atrament/hooks';
import LinkHome from 'src/components/ui/link-home';
import ChoiceButtonGroup from '../choice-button-group';
import ClickToContinue from '../click-to-continue';

import getTagAttributes from 'src/utils/get-tag-attributes';

function clickToContinueOptions(param) {
  const options = {
    delay: 0,
    animation: 0,
    clickable: 0
  };
  if (param.startsWith('(')) {
    const attrs = getTagAttributes(param.replace(/[()]/g, ''));
    Object.entries(attrs).forEach(([k,v]) => options[k] = v);
    // alternate syntax
    if (options.continue) {
      options.delay = options.continue;
    }
  } else if (param) {
    options.delay = param;
  } else {
    options.animation = 3; // default animation pause
  }
  return options;
}


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
  if (numberOfChoices === 1) {
    const isClickToContinue = currentScene.choices[0].choice.match(/^(|>>>(\d*|\(.+?\)))$/);
    if (isClickToContinue) {
      // click-to-continue choice
      const options = clickToContinueOptions(isClickToContinue[2]);
      return (<ClickToContinue
        setReady={setReady}
        withChoice
        delay={options.delay}
        animation={options.animation}
        clickable={options.clickable}
      />);
    }
  } else if (numberOfChoices === 0) { 
    if (currentScene.canContinue) {
      // paragraph mode
      return (<ClickToContinue setReady={setReady} animation={3} />);
    }
    // end game
    return (<EndGameLink />);
  }
  if (isHypertextMode) {
    return <></>;
  }
  return (
    <ChoiceButtonGroup
      key={key}
      currentScene={currentScene}
      setReady={setReady}
    />
  );
};

export default Choices;
