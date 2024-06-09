import { h } from 'preact';
import style from './index.css';

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
      dangerouslySetInnerHTML={{__html: choice.choice}}
    />
  );
};

export default ChoiceButton;