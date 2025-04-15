import { h } from 'preact';
import style from './index.module.css';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { useTranslator } from '@eo-locale/preact';
import { useAtrament } from 'src/atrament/hooks';

const getSceneElement = () => document.getElementsByClassName('atrament-container-scene')[0];
const getChoicesElement = () => document.getElementsByClassName('atrament-container-choices')[0];

// options
// clickable: pause before "click-to-continue" is allowed (0 - immediately)
// animation: pause before animation is displayed (0 - immediately)
// delay: pause before story continues (0 - only after click)

const ClickToContinue = ({ setReady, withChoice = false, delay = 0, animation = 0, clickable = 0 }) => {
  const { makeChoice, continueStory } = useAtrament();
  const [ isVisible, setIsVisible ] = useState(false);
  const translator = useTranslator();

  const continueGame = useCallback(() => {
    setTimeout(() => {
      setReady(false);
      if (withChoice) {
        makeChoice(0);
      }
      continueStory();
    }, 0);
  }, [ makeChoice, continueStory, setReady, withChoice ]);

  const kbdChoiceHandler = useCallback((e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      continueGame();
    }
  }, [ continueGame ]);

  const addEventListeners = useCallback(() => {
    document.addEventListener("keydown", kbdChoiceHandler, false);
    getSceneElement().addEventListener("click", continueGame, false);
    getChoicesElement().addEventListener("click", continueGame, false);
    return 0;
  }, [ continueGame, kbdChoiceHandler ]);

  const removeEventListeners = useCallback(() => {
    document.removeEventListener("keydown", kbdChoiceHandler, false);
    getSceneElement().removeEventListener("click", continueGame, false);
    getChoicesElement().removeEventListener("click", continueGame, false);
    return 0;
  }, [ continueGame, kbdChoiceHandler ]);

  useEffect(() => {
    const delayClickToContinue = setTimeout(addEventListeners, clickable * 1000);
    const delayAnimation = setTimeout(() => setIsVisible(true), animation * 1000);
    const delayChoice = delay ? setTimeout(continueGame, delay * 1000) : undefined;
    return () => {
      clearTimeout(delayAnimation);
      clearTimeout(delayClickToContinue);
      clearTimeout(delayChoice);
      removeEventListeners();
    }
  }, [ addEventListeners, removeEventListeners, continueGame, setIsVisible, clickable, delay, animation ]);

  const elementStyles = [style.circle];
  if (delay) {
    elementStyles.push(style.circle_empty);
  }

  return (
    <div class={style.container}>
      {isVisible
        ? <div class={elementStyles.join(' ')} title={translator.translate('game.click-to-continue')} />
        : ''
      }
    </div>
  ) 
};

export default ClickToContinue;