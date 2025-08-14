import { h } from 'preact';
import style from './index.module.css';
import clsx from 'clsx';
import { useCallback, useContext } from "preact/hooks";
import { ERROR_STORE_KEY } from 'src/constants';
import { ActiveContentContext } from 'src/context';
import { useAtrament, useAtramentState } from 'src/atrament/hooks';

// [link=target choice text]Text[/link]

const InlineLink = ({ children, choice }) => {
  const isActive = useContext(ActiveContentContext);
  const { atrament, makeChoice, continueStory } = useAtrament();
  const atramentState = useAtramentState(['scenes']);

  const clickHandler = useCallback(() => {
    const lastSceneIndex = atramentState.scenes.length - 1;
    const currentScene = atramentState.scenes[lastSceneIndex];
    const chosen = currentScene.choices.findIndex((item) => item.choice === choice);
    if (chosen < 0) {
      atrament.state.setKey(ERROR_STORE_KEY, `[link=${choice}] leads to nonexistent choice!`);
      return;
    }
    makeChoice(chosen);
    continueStory();
  }, [ atrament, continueStory, makeChoice, choice, atramentState.scenes ]);

  return (
    <a
      href="#"
      class={clsx(style.inline_link, !isActive && style.disabled)}
      onClick={isActive ? clickHandler : () => {}}
    >
      {children}
    </a>
  );
}

export default {
  tag: 'link',
  replacer: (options, content, markup) => <InlineLink choice={options.DEFAULT}>{markup(content)}</InlineLink>
}
