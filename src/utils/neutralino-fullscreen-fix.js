// Neutralino bug on Windows: UI bottom is cut after exiting fullscreen

async function neutralinoFullscreenExitFix() {
  try {
    if (await window.Neutralino.window.isMaximized()) {
      await window.Neutralino.window.unmaximize();
      await window.Neutralino.window.maximize();
    }
  } catch (e) {
    console.warn('failed to fix window size after exiting fullscreen', e);
  }
}

if (window.Neutralino && window.NL_OS === 'Windows') {
  window.Neutralino.events.on('windowFullScreenExit', neutralinoFullscreenExitFix);
}
