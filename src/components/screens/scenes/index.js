import { h } from 'preact';
import style from './index.css';
import Scene from './scene';
import { useState, useContext, useCallback } from 'preact/hooks';
import Choices from 'src/components/screens/choices';
import LinkHome from 'src/components/ui/link-home';
import Atrament from 'src/atrament-context';

const AllChoices = ({ currentScene, readyHandler, isReady }) => {
  const atrament = useContext(Atrament);

  const makeChoice = useCallback((id) => {
    readyHandler(false);
    setTimeout(() => {
      atrament.game.makeChoice(id);
      atrament.game.continueStory();  
    }, 200);
  }, [ atrament.game, readyHandler ]);

  if (!currentScene) {
    return '';
  }

  return (
    <>
      { currentScene.choices.length === 0 ? <LinkHome /> : <Choices isReady={isReady} currentScene={currentScene} handleClick={makeChoice} /> }
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
