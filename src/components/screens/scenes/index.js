import { h } from 'preact';
import style from './index.css';
import Scene from './scene';
import { useState, useCallback } from 'preact/hooks';
import Choices from 'src/components/screens/choices';
import LinkHome from 'src/components/ui/link-home';

import useAtrament from 'src/hooks/atrament';

const AllChoices = ({ currentScene, readyHandler, isReady }) => {
  const { makeChoice, continueStory } = useAtrament();
  
  const selectChoice = useCallback((id) => {
    readyHandler(false);
    setTimeout(() => {
      makeChoice(id);
      continueStory();  
    }, 200);
  }, [ makeChoice, continueStory, readyHandler ]);

  if (!currentScene) {
    return '';
  }

  return (
    <>
      { currentScene.choices.length === 0 ? <LinkHome /> : <Choices isReady={isReady} currentScene={currentScene} handleClick={selectChoice} /> }
    </>
  );
};

const BlockScenes = ({ scenes }) => {
  const [ isReady, setReady ] = useState(false);
  const lastSceneIndex = scenes.length - 1;
  return (
    <>
      <div class={[style.block_scene, 'atrament-block-scene'].join(' ')}>
        {
          scenes.map((s, i) => <Scene key={s.uuid} scene={s} isCurrent={i === lastSceneIndex} readyHandler={setReady} />)
        }
      </div>
      <AllChoices currentScene={scenes[lastSceneIndex]} isReady={isReady} readyHandler={setReady} />
    </>
  );
};

export default BlockScenes;
