import { h } from 'preact';
import style from './index.css';
import { useCallback } from 'preact/hooks';

const ChoiceButton = ({ choice, handleClick }) => {
  const onClick = useCallback(() => {
    handleClick(choice.id);
  }, [ choice, handleClick ]);
  return (
    <button class={style.choice_button} onClick={onClick} dangerouslySetInnerHTML={{__html: choice.choice}} />
  );
};

export default ChoiceButton;
