import { h } from 'preact';
import { useEffect, useState, useCallback } from 'preact/hooks';
import { route } from 'preact-router';

import useAtrament from 'src/atrament/hooks';

import Container from '../ui/container';
import ContainerText from '../ui/container-text';
import ContainerChoices from '../ui/container-choices';
import ContainerScenes from '../ui/container-scenes';
import Toolbar from '../ui/toolbar';

import Scene from '../ui/scene';
import ChoiceButton from '../ui/choice-button';
import LinkHome from '../ui/link-home';

import Settings from 'src/components/settings';

const GameRoute = () => {
  const { atrament, state, makeChoice, continueStory } = useAtrament();
  const [ isReady, setReady ] = useState(false);

  useEffect(() => {
    continueStory();
  }, [ continueStory ]);
  
  const selectChoice = useCallback((id) => {
    setReady(false);
    setTimeout(() => {
      makeChoice(id);
      continueStory();  
    }, 200);
  }, [ makeChoice, continueStory ]);

  const endGame = async () => {
    await atrament.game.removeSave();
    route('/');
  };

  const lastSceneIndex = state.scenes.length - 1;
  const currentScene = state.scenes[lastSceneIndex];

  let choiceBlock = <></>;
  if (currentScene && currentScene.choices) {
    const key = `choices-${currentScene.uuid}`;
    choiceBlock = (
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

  return (
    <Container>
      <Settings />
      <Toolbar>{state.metadata.title}</Toolbar>
      <ContainerText fontSize={state.settings.fontSize}>
        <ContainerScenes>
          {state.scenes.map((s, i) => 
            <Scene
              key={s.uuid}
              scene={s}
              isCurrent={i === lastSceneIndex}
              isSingle={lastSceneIndex === 0}
              readyHandler={setReady}
            />
          )}
        </ContainerScenes>
        {choiceBlock}
      </ContainerText>
    </Container>
  );
};

export default GameRoute;
