async function setFullscreenWeb(enabled, setFullscreenState) {
  if (enabled && !document.fullscreenElement) {
    try {
      await document.documentElement.requestFullscreen();
    } catch {
      setFullscreenState(false);
    }
  } else if (document.fullscreenElement && document.exitFullscreen) {
    document.exitFullscreen();
  }
}

export function applyFullscreen(enabled, callback) {
  setFullscreenWeb(enabled, callback);
}
