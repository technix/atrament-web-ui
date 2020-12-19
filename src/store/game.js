export default function gameStore(store) {
  // Initial state
  store.on('@init', () => (
    {
      scene: null,
      episode: null
    }
  ));
  // Reducers returns only changed part of the state
  store.on('game/update', (state, { scene, episode }) => ({ scene, episode }));
  store.on('game/reset', () => ({ scene: null, episode: null }));
}
