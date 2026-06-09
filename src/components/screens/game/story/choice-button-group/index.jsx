import { h } from 'preact';
import clsx from 'clsx';
import { useState, useCallback, useRef } from 'preact/hooks';
import { useAtrament, useAtramentState } from 'src/atrament/hooks';
import { useKeyboardHandler } from 'src/hooks';
import { SINGLE_CHOICE_DELAY, MULTI_CHOICE_DELAY } from 'src/constants';
import ChoiceButton from '../choice-button';
import ChoiceTimer from '../choice-timer';
import style from './index.module.css';

const noOp = () => {};

const ChoiceButtonGroup = ({ key, currentScene, setReady }) => {
  const { makeChoice, continueStory } = useAtrament();
  const { metadata } = useAtramentState(['metadata']);
  const [ chosen, setChosen ] = useState(null);
  const choiceGroupRef = useRef(null);

  // hide choices with #HIDDEN tag
  const availableChoices = currentScene.choices?.filter((i) => !i.tags?.HIDDEN);

  const numberOfChoices = Array.isArray(availableChoices) ? availableChoices.length : -1;

  const delay = numberOfChoices > 1 ? MULTI_CHOICE_DELAY : SINGLE_CHOICE_DELAY;

  // parse choices configuration
  // knot tag '#CHOICES' has more priority than global '#choices' tag
  const choiceConfig = currentScene.tags?.CHOICES || metadata.choices;

  // Parse grid columns from config (e.g., "grid-2", "grid-3")
  const gridMatch = choiceConfig?.match(/grid-(\d+)/);
  const gridColumns = gridMatch ? parseInt(gridMatch[1], 10) : null;
  let emptyCells = 0;
  if (gridColumns) {
    const remainder = availableChoices.length % gridColumns;
    if (remainder !== 0) {
      emptyCells = gridColumns - remainder;
    }
  }

  const choiceAppearance = {
    grouped: !!choiceConfig?.includes('grouped'),
    left: !!choiceConfig?.includes('left'),
    right: !!choiceConfig?.includes('right'),
    numbered: !!choiceConfig?.includes('numbered'),
    row: !!choiceConfig?.includes('row'),
    borderless: !!choiceConfig?.includes('borderless'),
    grid: gridColumns !== null,
    gridColumns: gridColumns
  };

  const choiceGroupHandlerFn = choiceAppearance.grouped && choiceAppearance.grid
    ? () => choiceGroupRef.current.style.setProperty("background-color", "var(--bg-color)")
    : noOp;

  const selectChoice = useCallback((id) => {
    choiceGroupHandlerFn();
    setChosen(id);
    // pass choice to Atrament
    setTimeout(() => {
      setChosen(null);
      setReady(false);
      makeChoice(id);
      continueStory();
    }, delay);
  }, [ makeChoice, continueStory, setReady, delay, choiceGroupHandlerFn ]);

  const kbdChoiceHandler = useCallback((e) => {
    if (chosen !== null) {
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

  const choiceButtonGroupClass = clsx(
    choiceAppearance.row && style.choice_row,
    (choiceAppearance.row && !choiceAppearance.grouped) && style.choice_row_ungrouped,
    choiceAppearance.grid && style.choice_grid,
    (choiceAppearance.grid && choiceAppearance.grouped) && style.choice_grid_grouped,
    choiceAppearance.grid && gridColumns && style[`choice_grid_${gridColumns}`],
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
      <div ref={choiceGroupRef} class={choiceButtonGroupClass} style={{ "--grid-columns": gridColumns }}>
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
        {
          (choiceAppearance.grid && choiceAppearance.grouped && emptyCells > 0) 
          && <div style={{"grid-column": `span ${emptyCells}`, "background-color": "var(--bg-color)"}}></div>
        }
      </div>
    </>
  )
};

export default ChoiceButtonGroup;
