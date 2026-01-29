export const setPageBackground = (background, getAssetPath) => {
  let bg = {
    backgroundImage: 'none'
  };
  if (background) {
    bg = {
      backgroundImage: `url(${getAssetPath(background)})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    };
  }
  Object.assign(document.body.style, bg);
};
