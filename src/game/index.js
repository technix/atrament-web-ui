// game CSS
import './style';
// game fonts
import './fonts/alegreya';

// init libraries
import storage from '../lib/storage';

// import game config
import cfg from './config.json';

storage.setUUID(cfg.uuid); // set uuid for storage

export default '';