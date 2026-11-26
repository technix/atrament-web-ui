import { setCssProperty } from "./css-properties";

function setScrollbarGutter () {
  const probe = document.createElement('div');
  probe.style.cssText = 'position:absolute;top:-9999px;left:-9999px;width:100px;height:100px;overflow:auto;scrollbar-gutter:stable;visibility:hidden;';
  document.body.appendChild(probe);
  const gutter = Math.max(0, probe.offsetWidth - probe.clientWidth);
  probe.remove();
  setCssProperty('--scrollbar-gutter-width', `${gutter}px`);
}

export default setScrollbarGutter;
