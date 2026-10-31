import { OVERLAY_STORE_KEY, EMPTY_OVERLAY } from "src/constants";

export default function initOverlay(atrament) {
  // set default overlay state
  atrament.state.setKey(OVERLAY_STORE_KEY, EMPTY_OVERLAY);
}
