// Example of a plug-in functionality using Atrament events and scene processors
// should be called from src/atrament/init.js 

function setBackground(bg) {
  if (!bg) {
    return;
  }
  const container = document.querySelector('.atrament-text-container');
  container.style.background = bg;
}

export default function handleTagBackground(atrament) {
  atrament.on('game/continueStory', () => setBackground(atrament.state.get().game.background));
  atrament.game.defineSceneProcessor((scene) => {
    if (scene.tags?.BACKGROUND) {
      const background = scene.tags?.BACKGROUND;
      atrament.state.setSubkey('game', 'background', background);
      setBackground(background);
    }
  });
}
