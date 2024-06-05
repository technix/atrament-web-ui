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

  const selectChoice = useCallback((id) => {
    setChosen(id);
    setTimeout(() => {
      // pass choice to Atrament
      setTimeout(() => {
        setChosen(null);
        setReady(false);
        makeChoice(id);
        continueStory();
      }, 700);
    }, 0);
  }, [ makeChoice, continueStory, setReady ]);

  const endGame = async () => {
    await atrament.game.removeSave();
    route('/');
  };

  if (currentScene && currentScene.choices) {
    const key = `choices-${currentScene.uuid}`;
    return (
      <ContainerChoices isReady={isReady} key={key}>
        {currentScene.choices.length == 0 ?
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