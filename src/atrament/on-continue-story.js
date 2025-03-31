export default function onContinueStory(atrament) {
  // save current story path into game.$story_path for debugging purposes
  const path = atrament.ink.story().state.previousPathString;
  atrament.state.setSubkey('game', '$story_path', path);
}
