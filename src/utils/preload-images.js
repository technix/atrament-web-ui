export default function preloadImages(imageList) {
  const imagePreloads = [];
  for (let img of imageList) {
    imagePreloads.push(new Promise((resolve) => {
      const imgToPreload = new Image();
      imgToPreload.onload = resolve;
      imgToPreload.onerror = resolve;
      imgToPreload.src = img;
    }));
  }
  return Promise.allSettled(imagePreloads);
}
