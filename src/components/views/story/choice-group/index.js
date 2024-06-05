import { h } from 'preact';
import { useCallback } from 'preact/hooks';
import { route } from 'preact-router';

import useAtrament from 'src/atrament/hooks';

import LinkHome from 'src/components/ui/link-home';

import ContainerChoices from '../container-choices';
import ChoiceButton from '../choice-button';

const ChoiceGroup = ({ currentScene, isReady, setReady }) => {
  const { atrament, makeChoice, continueStory } = useAtrament();

  const selectChoice = useCallback((id) => {
    setReady(false);
    setTimeout(() => {
      makeChoice(id);
      continueStory();  
    }, 200);
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