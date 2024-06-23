import { h } from 'preact';
import { useState, useCallback, useEffect } from 'preact/hooks';
import { route } from 'preact-router';

import useAtrament from 'src/atrament/hooks';

import LinkHome from 'src/components/ui/link-home';

import ContainerChoices from '../container-choices';
import ChoiceButton from '../choice-button';

const ChoiceGroup = ({ isReady, setReady }) => {
  const { atrament, state, makeChoice, continueStory } = useAtrament();
  const [ chosen, setChosen ] = useState(null);

  const lastSceneIndex = state.scenes.length - 1;
  const currentScene = state.scenes[lastSceneIndex];
  const numberOfChoices = (currentScene && currentScene.choices) ? currentScene.choices.length : -1;
  const isHypertextMode = !!state.metadata.hypertext;

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

  const kbdChoiceHandler = useCallback((e) => {
    const kbdChoice = +e.key;
    const targetElement = e.target.tagName.toLowerCase();
    if (targetElement === 'input' || isHypertextMode) {
      // ignore keyboard event
      return; 
    }
    if (numberOfChoices > 0 && kbdChoice > 0 && kbdChoice <= numberOfChoices) {
      selectChoice(kbdChoice - 1);
    }
  }, [ numberOfChoices, selectChoice, isHypertextMode ]);

  useEffect(() => {
    document.addEventListener("keydown", kbdChoiceHandler, false);
    return () => {
      document.removeEventListener("keydown", kbdChoiceHandler, false);
    }
  }, [ kbdChoiceHandler ]);

  const endGame = async () => {
    await atrament.game.removeSave();
    route('/');
  };

  if (isHypertextMode) {
    return numberOfChoices === 0 ? <ContainerChoices isReady><LinkHome onClick={endGame} /></ContainerChoices> : <></>;
  } else if (numberOfChoices >= 0) {
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