import { h } from 'preact';
import style from './index.css';
import { Block, ChoiceButton } from 'src/components/ui';

const Choices = ({ currentScene, handleClick, isReady }) => {
  if (!currentScene || !currentScene.choices) {
    return;
  }
  const key = `choices-${currentScene.uuid}`;
  return (
    <div key={key} class={[style.block_choices, 'atrament-block-choices', isReady ? 'animation_appear' : ''].join(' ')}>
      <div style={{ opacity: isReady ? 1 : 0 }}>
        <Block>
          {currentScene.choices.map((choice, index) => (
            <ChoiceButton
              key={`${key}-${index}`}
              choice={choice}
              handleClick={handleClick}
            />)
          )}
        </Block>
      </div>
    </div>
  )
};

export default Choices;
