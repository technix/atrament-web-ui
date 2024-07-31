import { h } from 'preact';
import style from './index.module.css';

import Markup from 'src/components/ui/markup';

const ChoiceButton = ({ choice, chosen, handleClick }) => {
  const choiceIsMade = chosen !== null; // something is chosen
  const activeChoice = chosen === choice.id; // this is the active choice
  const onClick = () => {
    if (!choiceIsMade) {
      handleClick(choice.id);
    }
  };

  const choiceStateClass = choiceIsMade ? (activeChoice ? style.choice_active : style.choice_inactive) : '';

  let choiceCustomClass = choice.tags.CLASS;
  if (Array.isArray(choiceCustomClass)) {
    choiceCustomClass = choiceCustomClass.join(' ');
  }

  return (
    <button
      class={`${style.choice_button} ${choiceStateClass} ${choiceCustomClass}`}
      onClick={onClick}
      disabled={choice.disabled}
    >
      <Markup content={choice.choice} />
    </button>
  );
};

export default ChoiceButton;
