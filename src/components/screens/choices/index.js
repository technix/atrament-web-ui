import { h } from 'preact';
import style from './index.css';
import { Block, ChoiceButton } from 'src/components/ui';

const Choices = ({ choices, handleClick }) => {
  if (!choices) {
    return;
  }
  return (
    <div key={Date.now()} class={[style.block_choices, 'atrament-block-choices', 'animation_appear'].join(' ')}>
      <Block>
        {choices.map((choice, index) => (
          <ChoiceButton
            key={`${Date.now()}-${index}`}
            choice={choice}
            handleClick={handleClick}
          />)
        )}
      </Block>
    </div>
  )
};

export default Choices;
