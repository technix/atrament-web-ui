import { OVERLAY_STORE_KEY } from "src/constants";

export default function initOverlay(atrament) {
  // set default overlay state
  atrament.state.setKey(OVERLAY_STORE_KEY, {
    current: null,
    content: '',
    title: null,
    display: null
  });
}
