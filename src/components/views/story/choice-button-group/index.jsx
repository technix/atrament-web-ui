import { h } from 'preact';
import clsx from 'clsx';
import { useState, useCallback } from 'preact/hooks';
import { useAtrament, useAtramentState } from 'src/atrament/hooks';
import { useKeyboardHandler } from 'src/hooks';
import { SINGLE_CHOICE_DELAY, MULTI_CHOICE_DELAY } from 'src/constants';
import ChoiceButton from '../choice-button';
import ChoiceTimer from '../choice-timer';
import style from './index.module.css';

const ChoiceButtonGroup = ({ key, currentScene, setReady }) => {
  const { makeChoice, continueStory } = useAtrament();
  const { metadata } = useAtramentState(['metadata']);
  const [ chosen, setChosen ] = useState(null);

  // hide choices with #HIDDEN tag
  const availableChoices = currentScene.choices?.filter((i) => !i.tags?.HIDDEN);

  const numberOfChoices = Array.isArray(availableChoices) ? availableChoices.length : -1;

  const delay = numberOfChoices > 1 ? MULTI_CHOICE_DELAY : SINGLE_CHOICE_DELAY;

  const selectChoice = useCallback((id) => {
    setChosen(id);
    // pass choice to Atrament
    setTimeout(() => {
      setChosen(null);
      setReady(false);
      makeChoice(id);
      continueStory();
    }, delay);
  }, [ makeChoice, continueStory, setReady, delay ]);

  const kbdChoiceHandler = useCallback((e) => {
    if (chosen) {
      // only single keyboard choice can be made
      return;
    }
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
      !availableChoices[kbdChoice-1].disabled
    ) {
      selectChoice(availableChoices[kbdChoice-1].id);
    }
  }, [ numberOfChoices, selectChoice, availableChoices, chosen ]);

  useKeyboardHandler(kbdChoiceHandler);

  // knot tag '#CHOICES' has more priority than global '#choices' tag
  const choiceConfig = currentScene.tags?.CHOICES || metadata.choices;
  const choiceAppearance = {
    grouped: !!choiceConfig?.includes('grouped'),
    left: !!choiceConfig?.includes('left'),
    right: !!choiceConfig?.includes('right'),
    numbered: !!choiceConfig?.includes('numbered'),
    row: !!choiceConfig?.includes('row')
  };

  const choiceButtonGroupClass = clsx(
    choiceAppearance.row && style.choice_row,
    (choiceAppearance.row && !choiceAppearance.grouped) && style.choice_row_ungrouped,
    'atrament-choices'
  );

  return (
    <>
      {currentScene.tags?.PROMPT && <div class={clsx(style.choice_prompt, 'atrament-prompt')}>{currentScene.tags.PROMPT}</div>}
      {currentScene.tags?.AUTO_CHOICE &&
        <ChoiceTimer
          options={currentScene.tags.AUTO_CHOICE}
          choices={currentScene.choices} 
          selectChoice={selectChoice}
        />
      }
      <div class={choiceButtonGroupClass}>
        {availableChoices.map((choice, index) => (
          <ChoiceButton
            key={`${key}-${index}`}
            index={index}
            choice={choice}
            chosen={chosen}
            handleClick={selectChoice}
            choiceAppearance={choiceAppearance}
          />))
        }
      </div>
    </>
  )
};

export default ChoiceButtonGroup;
