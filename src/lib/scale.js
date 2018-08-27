function scaleElement(el) {
  let elHeight = el.offsetHeight;
  let elWidth = el.offsetWidth;
  let scale = Math.min(
    window.innerWidth / elWidth,
    window.innerHeight / elHeight
  );
  el.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

export default scaleElement;
