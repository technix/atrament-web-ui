import { h } from 'preact';
import style from './index.module.css';
import { useCallback } from "preact/hooks";

import { useAtrament, useAtramentState } from 'src/atrament/hooks';

const InlineLink = ({ children, choice }) => {
  const { atrament, makeChoice, continueStory } = useAtrament();
  const atramentState = useAtramentState(['scenes']);

  const clickHandler = useCallback(() => {
    const lastSceneIndex = atramentState.scenes.length - 1;
    const currentScene = atramentState.scenes[lastSceneIndex];
    const chosen = currentScene.choices.findIndex((item) => item.choice === choice);
    if (chosen < 0) {
      atrament.state.setKey('ERROR', `[link=${choice}] leads to nonexistent choice!`);
      return;
    }
    makeChoice(chosen);
    continueStory();
  }, [ atrament, continueStory, makeChoice, choice, atramentState.scenes ]);

  return (
    <a
      href="#"
      class={style.inline_link}
      onClick={clickHandler}
    >
      {children}
    </a>
  );
}

export default {
  regexp: /\[link=.+?\].+?\[\/link\]/ig,
  replacer: (el, markup) => {
    const fragments = el.match(/\[link=(.+?)\](.+?)\[\/link\]/i);
    return (<InlineLink choice={fragments[1]}>{markup(fragments[2])}</InlineLink>);
  }
}
