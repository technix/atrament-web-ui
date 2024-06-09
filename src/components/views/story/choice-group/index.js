import { h } from 'preact';
import { useState, useCallback } from 'preact/hooks';
import { route } from 'preact-router';

import useAtrament from 'src/atrament/hooks';

import LinkHome from 'src/components/ui/link-home';

import ContainerChoices from '../container-choices';
import ChoiceButton from '../choice-button';

const ChoiceGroup = ({ currentScene, isReady, setReady }) => {
  const { atrament, makeChoice, continueStory } = useAtrament();
  const [ chosen, setChosen ] = useState(null);

  const numberOfChoices = (currentScene && currentScene.choices) ? currentScene.choices.length : -1;

  const selectChoice = useCallback((id) => {
    const delay = numberOfChoices > 1 ? 350 : 150;
    setChosen(id);
    setTimeout(() => {
      // pass choice to Atrament
      setTimeout(() => {
        setChosen(null);
        setReady(false);
        makeChoice(id);
        continueStory();
      }, delay);
    }, 0);
  }, [ makeChoice, continueStory, setReady, numberOfChoices ]);

  const endGame = async () => {
    await atrament.game.removeSave();
    route('/');
  };

  if (numberOfChoices >= 0) {
    const key = `choices-${currentScene.uuid}`;
    return (
      <ContainerChoices isReady={isReady} key={key}>
        {numberOfChoices === 0 ?
          <LinkHome onClick={endGame} />
          :
          currentScene.choices.map((choice, index) => (
            <ChoiceButton
              key={`${key}-${index}`}
              choice={choice}
              chosen={chosen}
              handleClick={selectChoice}
            />)
          )
        }
      </ContainerChoices>
    )
  }
  return (<></>);
}

export default ChoiceGroup;