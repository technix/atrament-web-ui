import { h } from 'preact';
import style from './index.module.css';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { useTranslator } from '@eo-locale/preact';
import { useAtrament } from 'src/atrament/hooks';


// options
// clickable: when "click-to-continue" is allowed (0 - immediately)
// animation: when animation is displayed (0 - immediately)
// delay: when story continues (0 - only after click)

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
    document.getElementsByClassName('atrament-container-scene')[0].addEventListener("click", continueGame, false);
    document.getElementsByClassName('atrament-container-choices')[0].addEventListener("click", continueGame, false);
  }, [ continueGame, kbdChoiceHandler ]);

  const removeEventListeners = useCallback(() => {
    document.removeEventListener("keydown", kbdChoiceHandler, false);
    document.getElementsByClassName('atrament-container-scene')[0].removeEventListener("click", continueGame, false);
    document.getElementsByClassName('atrament-container-choices')[0].removeEventListener("click", continueGame, false);
  }, [ continueGame, kbdChoiceHandler ]);

  useEffect(() => {
    let delayChoice;
    let delayAnimation;
    let delayClickToContinue;
    // clickable
    if (clickable) {
      delayClickToContinue = setTimeout(addEventListeners, clickable * 1000);
    } else {
      addEventListeners();
    }
    // delay
    if (delay) {
      delayChoice = setTimeout(continueGame, delay * 1000);
    }
    // animation
    delayAnimation = setTimeout(() => {
      setIsVisible(true);
    }, animation * 1000);
    return () => {
      if (delayChoice) {
        clearTimeout(delayChoice);
      }
      if (delayAnimation) {
        clearTimeout(delayAnimation);
      }
      if (delayClickToContinue) {
        clearTimeout(delayClickToContinue);
      }
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