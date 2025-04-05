import { render } from 'preact';

// CSS
import 'normalize.css';
import 'src/app.css';
import '../resources/styles/custom.css';

// App
import App from './components/app';

// Patches
import 'src/utils/neutralino-out-of-bounds-fix';

render(<App />, document.getElementById('app'));
