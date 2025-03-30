import { TOOLBAR_DEFAULT, TOOLBAR_STORE_KEY, OVERLAY_STORE_KEY, ERROR_STORE_KEY } from "src/constants";

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
  // refresh toolbar on continueStory and function evaluation (buttons etc)
  atrament.on('game/continueStory', delayedRefreshToolbar);
  atrament.on('ink/evaluateFunction', (params) => {
    if (params.function !== toolbarFunction) {
      delayedRefreshToolbar();
    }
  });
  // run refresh toolbar before game starts
  refreshToolbar();
}


export default function onGameStart(atrament) {
  // register error handler
  atrament.ink.onError((error) => atrament.state.setKey(ERROR_STORE_KEY, error));
  // reset overlay state
  atrament.state.setKey(OVERLAY_STORE_KEY, {
    current: null,
    content: '',
    title: null
  });
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
