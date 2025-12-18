let vh;

function setInnerHeight () {
  if (window.innerHeight !== vh) {
    vh = window.innerHeight;
    document.documentElement.style.setProperty('--screen-vh', `${vh - 1}px`);
  }
}

export default setInnerHeight;
