import { h } from 'preact';
import style from './index.module.css';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { useTranslator } from '@eo-locale/preact';
import { useAtrament } from 'src/atrament/hooks';

const ClickToContinue = ({ setReady, withChoice = false }) => {
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

  useEffect(() => {
    document.addEventListener("keydown", kbdChoiceHandler, false);
    document.getElementsByClassName('atrament-container-scene')[0].addEventListener("click", continueGame, false);
    document.getElementsByClassName('atrament-container-choices')[0].addEventListener("click", continueGame, false);
    setTimeout(() => {
      setIsVisible(true);
    }, 3000);
    return () => {
      document.removeEventListener("keydown", kbdChoiceHandler, false);
      document.getElementsByClassName('atrament-container-scene')[0].removeEventListener("click", continueGame, false);
      document.getElementsByClassName('atrament-container-choices')[0].removeEventListener("click", continueGame, false);
    }
  }, [ kbdChoiceHandler, continueGame, setIsVisible ]);

  return (
    <div class={style.container}>
      {isVisible && <div class={`${style.circle}`} title={translator.translate('game.click-to-continue')} />}
    </div>
  ) 
};

export default ClickToContinue;