import {} from 'normalize.css';
import './style';
import './style/animation';
// game CSS
import './game/style';
// game fonts
import './game/fonts/alegreya';

// app
import App from './components/app';

// init libraries
import storage from './lib/storage';

// import game config
import cfg from './game/config.json';

storage.setUUID(cfg.uuid); // set uuid for storage

export default App;
