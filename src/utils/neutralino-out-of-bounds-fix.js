async function neutralinoOutOfBoundsFix() {
  const maxBounds = 10000;
  const xOutOfBounds = window.screenX < -maxBounds || window.screenX > window.screen.availWidth + maxBounds;
  const yOutOfBounds = window.screenY < -maxBounds || window.screenY > window.screen.availHeight + maxBounds;
  if (xOutOfBounds || yOutOfBounds) {
    console.warn("fixing unmaximize bug", window.screenX, window.screenY);
    await window.Neutralino.window.center();
  }
}

if (window.Neutralino) {
  addEventListener("resize", neutralinoOutOfBoundsFix);
  addEventListener('DOMContentLoaded', neutralinoOutOfBoundsFix);
}
