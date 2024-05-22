export default function preloadImages(getAssetPath, imageList) {
  const imagePreloads = [];
  for (let img of imageList) {
    imagePreloads.push(new Promise((resolve) => {
      const imgToPreload = new Image();
      imgToPreload.onload = resolve;
      imgToPreload.onerror = resolve;
      imgToPreload.src = getAssetPath(img);
    }));
  }
  return Promise.allSettled(imagePreloads);
}
