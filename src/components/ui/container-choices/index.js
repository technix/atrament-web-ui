import { h } from 'preact';
import style from './index.css';
import { useCallback } from 'preact/hooks';
// UI
import Block from '../block';
import ChoiceButton from '../choice-button';
import LinkHome from '../link-home';
// atrament
import useAtrament from 'src/atrament/hooks';

const ContainerChoices = ({ currentScene, readyHandler, isReady }) => {
  const { makeChoice, continueStory } = useAtrament();
  
  const selectChoice = useCallback((id) => {
    readyHandler(false);
    setTimeout(() => {
      makeChoice(id);
      continueStory();  
    }, 200);
  }, [ makeChoice, continueStory, readyHandler ]);

  if (!currentScene || !currentScene.choices) {
    return '';
  }
  if (currentScene.choices.length === 0) {
    return <LinkHome />;
  } 

  const key = `choices-${currentScene.uuid}`;
  return (
    <div key={key} class={[style.container_choices, 'atrament-container-choices', isReady ? 'animation_appear' : ''].join(' ')}>
      <div style={{ opacity: isReady ? 1 : 0 }}>
        <Block>
          {currentScene.choices.map((choice, index) => (
            <ChoiceButton
              key={`${key}-${index}`}
              choice={choice}
              handleClick={selectChoice}
            />)
          )}
        </Block>
      </div>
    </div>
  )
};

export default ContainerChoices;