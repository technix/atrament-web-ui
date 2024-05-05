/* eslint-env browser */
export default function muteWhenInactive(atrament) {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      atrament.interfaces.sound.mute(atrament.settings.get('mute'));
    } else {
      atrament.interfaces.sound.mute(true);
    }
  });
}
