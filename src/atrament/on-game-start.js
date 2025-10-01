import { OVERLAY_STORE_KEY } from "src/constants";

export default function onGameStart(atrament) {
  // reset overlay state
  atrament.state.setKey(OVERLAY_STORE_KEY, {
    current: null,
    content: '',
    title: null,
    display: null
  });
}
