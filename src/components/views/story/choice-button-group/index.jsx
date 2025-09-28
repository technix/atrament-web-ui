import { h } from 'preact';
import clsx from 'clsx';
import { useState, useCallback } from 'preact/hooks';
import { useAtrament, useAtramentState } from 'src/atrament/hooks';
import { useKeyboardHandler } from 'src/hooks';
import ChoiceButton from '../choice-button';
import style from './index.module.css';

const ChoiceButtonGroup = ({ key, currentScene, setReady }) => {
  const { makeChoice, continueStory } = useAtrament();
  const { metadata } = useAtramentState(['metadata']);
  const [ chosen, setChosen ] = useState(null);

  const numberOfChoices = (currentScene && currentScene.choices) ? currentScene.choices.length : -1;

  const selectChoice = useCallback((id) => {
    const delay = numberOfChoices > 1 ? 350 : 150;
    setChosen(id);
    setTimeout(() => {
      // pass choice to Atrament
      setTimeout(() => {
        setChosen(null);
        setReady(false);
        makeChoice(id);
        continueStory();
      }, delay);
    }, 0);
  }, [ makeChoice, continueStory, setReady, numberOfChoices ]);

  const kbdChoiceHandler = useCallback((e) => {
    const kbdChoice = +e.key;
    const targetElement = e.target.tagName.toLowerCase();
    if (targetElement === 'input') {
      // ignore keyboard event
      return; 
    }
    if (
      numberOfChoices > 0 &&
      kbdChoice > 0 &&
      kbdChoice <= numberOfChoices &&
      !currentScene.choices[kbdChoice-1].disabled
    ) {
      selectChoice(currentScene.choices[kbdChoice-1].id);
    }
  }, [ numberOfChoices, selectChoice, currentScene.choices ]);

  useKeyboardHandler(kbdChoiceHandler);

  const isGrouped = metadata.choices?.includes('grouped');
  const isSingleRow = metadata.choices?.includes('row');
  const choiceButtonGroupClass = clsx(
    isSingleRow && style.choice_row,
    (isSingleRow && !isGrouped) && style.choice_row_ungrouped,
    'atrament-choices'
  );

  return (
    <>
      {currentScene.tags?.PROMPT && <div class={clsx(style.choice_prompt, 'atrament-prompt')}>{currentScene.tags.PROMPT}</div>}
      <div class={choiceButtonGroupClass}>
        {currentScene.choices.map((choice, index) => (
          <ChoiceButton
            key={`${key}-${index}`}
            index={index}
            choice={choice}
            chosen={chosen}
            handleClick={selectChoice}
          />))
        }
      </div>
    </>
  ) 
};

export default ChoiceButtonGroup;
