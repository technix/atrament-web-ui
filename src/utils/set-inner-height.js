import { setCssProperty } from "./css-properties";

let vh;

function setInnerHeight () {
  if (window.innerHeight !== vh) {
    vh = window.innerHeight;
    setCssProperty('--screen-vh', `${vh}px`);
  }
}

export default setInnerHeight;
