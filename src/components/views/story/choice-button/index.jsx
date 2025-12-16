import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';

import Markup from 'src/components/ui/markup';

const ChoiceButton = ({ choice, chosen, index, handleClick, choiceAppearance }) => {

  const choiceIsMade = chosen !== null; // something is chosen
  const activeChoice = chosen === choice.id; // this is the active choice
  const onClick = () => {
    if (!choiceIsMade) {
      handleClick(choice.id);
    }
  };

  const choiceStateClass = choiceIsMade ? (activeChoice ? style.choice_active : style.choice_inactive) : '';
  const choiceGroupClass = choiceAppearance.grouped ? (choiceAppearance.row ? style.buttons_grouped_row : style.buttons_grouped) : style.buttons_separate;
  const choiceAlignmentClass = choiceAppearance.left ? style.left_aligned : choiceAppearance.right ? style.right_aligned : '';
  const elementClasses = clsx(
    style.choice_button,
    choiceGroupClass,
    choiceAlignmentClass,
    choiceStateClass,
    'atrament-choice',
    choice.tags.CLASS
  );

  return (
    <button class={elementClasses} onClick={onClick} disabled={choice.disabled}>
      {choiceAppearance.numbered ? <>{index + 1}.&nbsp;</> : ''}
      <Markup content={choice.choice} />
    </button>
  );
};

export default ChoiceButton;
