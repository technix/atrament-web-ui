import { h } from 'preact';
import { useState } from 'preact/hooks';

import useAtrament from 'src/atrament/hooks';

import ContainerText from 'src/components/ui/container-text';
import ContainerScenes from './container-scenes';
import ContainerChoices from './container-choices';

import Scene from './scene';
import Choices from './choices';

const StoryView = () => {
  const { state } = useAtrament();
  const [ isReady, setReady ] = useState(false);
  
  const lastSceneIndex = state.scenes.length - 1;
  const isHypertextMode = !!state.metadata.hypertext;
  const key = `choices-${state.scenes[lastSceneIndex]?.uuid}`;

  return (
    <ContainerText fontSize={state.settings.fontSize}>
      <ContainerScenes align={state.metadata.scenes_align}>
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
      <ContainerChoices isReady={isReady} key={key}>
        <Choices
          key={key}
          currentScene={state.scenes[lastSceneIndex]}
          setReady={setReady}
          isHypertextMode={isHypertextMode}
        />
      </ContainerChoices>
    </ContainerText>
  )
}

export default StoryView;
