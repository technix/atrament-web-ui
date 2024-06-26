import { h } from 'preact';
import style from './index.module.css';

import markup from 'src/atrament/markup';

const ChoiceButton = ({ choice, chosen, handleClick }) => {
  const choiceIsMade = chosen !== null; // something is chosen
  const activeChoice = chosen === choice.id; // this is the active choice
  const onClick = () => {
    if (!choiceIsMade) {
      handleClick(choice.id);
    }
  };
  return (
    <button
      class={`${style.choice_button} ${choiceIsMade ? (activeChoice ? style.choice_active : style.choice_inactive) : ''}`}
      onClick={onClick}
      disabled={choice.disabled}
    >
      {markup(choice.choice)}
    </button>
  );
};

export default ChoiceButton;
