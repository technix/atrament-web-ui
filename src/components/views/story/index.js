import { h } from 'preact';
import { useState } from 'preact/hooks';

import useAtrament from 'src/atrament/hooks';

import ContainerText from 'src/components/ui/container-text';
import ContainerScenes from './container-scenes';

import Scene from './scene';
import ChoiceGroup from './choice-group';

const StoryView = () => {
  const { state } = useAtrament();
  const [ isReady, setReady ] = useState(false);
  
  const lastSceneIndex = state.scenes.length - 1;
  const currentScene = state.scenes[lastSceneIndex];

  return (
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
      <ChoiceGroup
        currentScene={currentScene}
        isReady={isReady}
        setReady={setReady}
      />
    </ContainerText>
  )
}

export default StoryView;
