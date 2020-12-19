import { createStoreon } from 'storeon';

import game from 'src/store/game';
import settings from 'src/store/settings';

export default createStoreon([
  game,
  settings
]);
