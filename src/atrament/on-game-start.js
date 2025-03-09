function registerToolbarHandler(atrament, toolbarFunction) {
  const refreshToolbar = () => {
    let result;
    try {
      result = atrament.ink.evaluateFunction(toolbarFunction, [], true);
      atrament.state.setKey('TOOLBAR', result.output);
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
  atrament.ink.onError((error) => atrament.state.setKey('ERROR', error));
  // reset overlay state
  atrament.state.setKey('OVERLAY', {
    activeOverlay: null,
    content: '',
    title: null
  });
  // configure toolbar
  const metadata = atrament.state.get().metadata;
  if (metadata.toolbar) {
    registerToolbarHandler(atrament, metadata.toolbar);
  } else if (metadata.title) {
    atrament.state.setKey('TOOLBAR', metadata.title);
  } else {
    atrament.state.setKey('TOOLBAR', '__DEFAULT__');
  }
}
