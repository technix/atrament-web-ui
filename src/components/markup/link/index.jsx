import { h } from 'preact';
import style from './index.module.css';
import clsx from 'clsx';
import { useCallback, useContext } from "preact/hooks";
import { ActiveContentContext } from 'src/context';
import { useAtrament, useAtramentState, useAtramentOverlay } from 'src/atrament/hooks';

// [link=target choice text]Text[/link]
// [link target=target choice text class=someclass]Text[/link]
// [link onclick=ink_function display=modal]Text[/link]

const InlineLink = ({ children, options }) => {
  const isActive = useContext(ActiveContentContext);
  const { makeChoice, continueStory, throwAtramentError } = useAtrament();
  const { execContentFunction } = useAtramentOverlay();

  const atramentState = useAtramentState(['scenes']);

  const choice = options.to || options.DEFAULT;

  const clickHandlerChoice = useCallback(() => {
    const lastSceneIndex = atramentState.scenes.length - 1;
    const currentScene = atramentState.scenes[lastSceneIndex];
    const chosen = currentScene.choices.findIndex((item) => item.choice === choice);
    if (chosen < 0) {
      throwAtramentError(`[link=${choice}] leads to nonexistent choice!`);
      return;
    }
    makeChoice(chosen);
    continueStory();
  }, [ throwAtramentError, continueStory, makeChoice, choice, atramentState.scenes ]);

  const clickHandlerFunction = useCallback(
    () => execContentFunction(options.onclick, options.display),
    [ execContentFunction, options ]
  );

  const linkClass = clsx(
    style.inline_link,
    !isActive && style.disabled,
    'atrament-tag-link',
    options.class
  );

  const onClickFunction = isActive
    ? (options.onclick ? clickHandlerFunction : clickHandlerChoice)
    : () => {};

  return (
    <a
      href="#"
      class={linkClass}
      onClick={onClickFunction}
    >
      {children}
    </a>
  );
}

export default {
  tag: 'link',
  component: InlineLink
}
