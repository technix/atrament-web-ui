import { render } from 'preact';

// CSS
import 'normalize.css';
import 'src/app.css';

// App
import App from './components/app';

// Patches
import 'src/utils/neutralino-out-of-bounds-fix';

// Override CSS styles
import '../resources/styles/custom.css';

render(<App />, document.getElementById('app'));
