import { h } from 'preact';
import { useState } from 'preact/hooks';

import { useAtramentState } from 'src/atrament/hooks';

import ContainerText from 'src/components/ui/container-text';
import ContainerScenes from './container-scenes';
import ContainerChoices from './container-choices';

import Scene from './scene';
import Choices from './choices';

const StoryView = () => {
  const atramentState = useAtramentState(['scenes', 'metadata']);
  const [ isReady, setReady ] = useState(false);
  
  const lastSceneIndex = atramentState.scenes.length - 1;
  const isHypertextMode = !!atramentState.metadata.hypertext;
  const key = `choices-${atramentState.scenes[lastSceneIndex]?.uuid}`;

  return (
    <ContainerText>
      <ContainerScenes align={atramentState.metadata.scenes_align}>
        {atramentState.scenes.map((s, i) => 
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
          currentScene={atramentState.scenes[lastSceneIndex]}
          setReady={setReady}
          isHypertextMode={isHypertextMode}
        />
      </ContainerChoices>
    </ContainerText>
  )
}

export default StoryView;
