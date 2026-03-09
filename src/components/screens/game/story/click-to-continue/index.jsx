import { h } from 'preact';
import clsx from 'clsx';
import style from './index.module.css';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { useTranslator } from '@eo-locale/preact';
import { useAtrament } from 'src/atrament/hooks';
import { useKeyboardHandler } from 'src/hooks';

import getTagAttributes from 'src/utils/get-tag-attributes';

function clickToContinueOptions(param) {
  const options = {
    delay: 0,
    animation: 0,
    clickable: 0
  };
  if (param.startsWith('(')) {
    const attrs = getTagAttributes(param.replace(/[()]/g, ''));
    Object.entries(attrs).forEach(([k,v]) => options[k] = v);
    // alternate syntax
    if (options.continue) {
      options.delay = options.continue;
    }
  } else if (param) {
    options.delay = param;
  } else {
    options.animation = 3; // default animation pause
  }
  return options;
}


// options
// clickable: pause before "click-to-continue" is allowed (0 - immediately)
// animation: pause before animation is displayed (0 - immediately)
// delay: pause before story continues (0 - only after click)

const ClickToContinue = ({ setReady, withChoice = false, options }) => {
  const { makeChoice, continueStory } = useAtrament();
  const [ isVisible, setIsVisible ] = useState(false);
  const translator = useTranslator();

  const { delay, animation, clickable } = clickToContinueOptions(options);

  const continueGame = useCallback((e) => {
    e?.stopPropagation();
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

  useKeyboardHandler(kbdChoiceHandler);

  useEffect(() => {
    const delayClickToContinue = setTimeout(() => document.body.addEventListener("click", continueGame, false), clickable * 1000);
    const delayAnimation = setTimeout(() => setIsVisible(true), animation * 1000);
    const delayChoice = delay ? setTimeout(continueGame, delay * 1000) : undefined;
    return () => {
      clearTimeout(delayAnimation);
      clearTimeout(delayClickToContinue);
      clearTimeout(delayChoice);
      document.body.removeEventListener("click", continueGame, false);
    }
  }, [ continueGame, setIsVisible, clickable, delay, animation ]);

  return (
    <div class={style.container}>
      {isVisible
        ? <div class={clsx(style.circle, delay && style.circle_empty)} title={translator.translate('game.click-to-continue')} />
        : ''
      }
    </div>
  )
};

export default ClickToContinue;
