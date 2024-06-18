export default function onGameStart(atrament) {
  // register error handler
  atrament.ink.story().onError = (error) => {
    atrament.state.setKey('ERROR', error);
  };
  // add cards to state
  atrament.state.setKey('OVERLAY', {
    activeOverlay: null,
    content: ''
  });
}
