import { TOOLBAR_DEFAULT, TOOLBAR_STORE_KEY } from "src/constants";

function registerToolbarHandler(atrament, toolbarFunction) {
  const refreshToolbar = () => {
    let result;
    try {
      result = atrament.ink.evaluateFunction(toolbarFunction, [], true);
      atrament.state.setKey(TOOLBAR_STORE_KEY, result.output);
    } catch (e) {
      atrament.ink.story().onError(e.toString());
    }
  }
  const delayedRefreshToolbar = () => setTimeout(refreshToolbar, 0);
  // refresh toolbar on game start, continueStory, and function evaluation (buttons etc)
  atrament.on('game/start', delayedRefreshToolbar);
  atrament.on('game/continueStory', delayedRefreshToolbar);
  atrament.on('ink/evaluateFunction', (params) => {
    if (params.function !== toolbarFunction) {
      delayedRefreshToolbar();
    }
  });
}

export default function onGameInit(atrament) {
  // configure toolbar
  const metadata = atrament.state.get().metadata;
  if (metadata.toolbar) {
    registerToolbarHandler(atrament, metadata.toolbar);
  } else if (metadata.title) {
    atrament.state.setKey(TOOLBAR_STORE_KEY, metadata.title);
  } else {
    atrament.state.setKey(TOOLBAR_STORE_KEY, TOOLBAR_DEFAULT);
  }
}
