import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';

import { useAtramentState } from 'src/atrament/hooks';
import Markup from 'src/components/ui/markup';

const ChoiceButton = ({ choice, chosen, handleClick }) => {
  const { metadata } = useAtramentState(['metadata']);

  const choiceIsMade = chosen !== null; // something is chosen
  const activeChoice = chosen === choice.id; // this is the active choice
  const onClick = () => {
    if (!choiceIsMade) {
      handleClick(choice.id);
    }
  };

  const choiceStateClass = choiceIsMade ? (activeChoice ? style.choice_active : style.choice_inactive) : '';
  const choiceGroupStyle = metadata.choices?.includes('grouped') ? style.buttons_grouped : style.buttons_separate;
  const choiceAlignment = metadata.choices?.includes('left') ? style.left_aligned : metadata.choices?.includes('right') ? style.right_aligned : '';
  const elementClasses = clsx(style.choice_button, choiceGroupStyle, choiceAlignment, choiceStateClass, 'atrament-choice', choice.tags.CLASS);

  return (
    <button
      class={elementClasses}
      onClick={onClick}
      disabled={choice.disabled}
    >
      {metadata.choices?.includes('numbered') ? <>{choice.id + 1}.&nbsp;</> : ''}
      <Markup content={choice.choice} />
    </button>
  );
};

export default ChoiceButton;
