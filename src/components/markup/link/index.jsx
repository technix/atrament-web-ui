import { h } from 'preact';
import style from './index.module.css';
import clsx from 'clsx';
import { useCallback, useContext } from "preact/hooks";
import { ERROR_STORE_KEY } from 'src/constants';
import { ActiveContentContext } from 'src/context';
import { useAtrament, useAtramentState } from 'src/atrament/hooks';

// [link=target choice text]Text[/link]
// [link target=target choice text class=someclass]Text[/link]

const InlineLink = ({ children, options }) => {
  const isActive = useContext(ActiveContentContext);
  const { atrament, makeChoice, continueStory } = useAtrament();
  const atramentState = useAtramentState(['scenes']);

  const choice = options.to || options.DEFAULT;

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

  const linkClass = clsx(
    style.inline_link, 
    !isActive && style.disabled,
    options.class
  );

  return (
    <a
      href="#"
      class={linkClass}
      onClick={isActive ? clickHandler : () => {}}
    >
      {children}
    </a>
  );
}

export default {
  tag: 'link',
  replacer: (options, content, markup) => <InlineLink options={options}>{markup(content)}</InlineLink>
}
