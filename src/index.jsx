import { render } from 'preact';

// CSS
import 'normalize.css';
import 'src/styles/app.css';
import 'src/styles/custom.css';

// App
import App from './components/app';

render(<App />, document.getElementById('app'));
