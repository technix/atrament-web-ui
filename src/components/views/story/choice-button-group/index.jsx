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
      <div class={choiceButtonGroupClass}>
        {currentScene.choices.map((choice, index) => (
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
