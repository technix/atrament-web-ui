export const setBackground = (elementRef, background, getAssetPath) => {
  let bg = 'none';
  if (background) {
    const cssBackground = background.match(/CSS\((.+?)\)/i);
    if (cssBackground) {
      bg = cssBackground[1];
    } else {
      bg = `url(${getAssetPath(background)}) center center / cover no-repeat`;
    }
  }
  elementRef.style.background = bg;
};
