import { h } from 'preact';
import style from './index.css';
import { Block, ChoiceButton } from 'src/components/ui';

const Choices = ({ currentScene, handleClick }) => {
  if (!currentScene || !currentScene.choices) {
    return;
  }
  const key = `choices-${currentScene.uuid}`;
  return (
    <div key={key} class={[style.block_choices, 'atrament-block-choices', 'animation_appear'].join(' ')}>
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
  )
};

export default Choices;
