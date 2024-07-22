export const setPageBackground = (background, getAssetPath) => {
  if (background) {
    document.body.style.backgroundImage = `url(${getAssetPath(background)})`
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
  } else {
    document.body.style.backgroundImage = 'none';
  }
};
