export default function onGameStart(atrament) {
  // register error handler
  atrament.ink.onError((error) => atrament.state.setKey('ERROR', error));
  // reset overlay state
  atrament.state.setKey('OVERLAY', {
    activeOverlay: null,
    content: '',
    title: null
  });
}
