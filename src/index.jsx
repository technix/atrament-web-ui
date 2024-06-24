import { render } from 'preact';

// CSS
import 'normalize.css';
import 'src/style.css';

// App
import App from './components/app';

render(<App />, document.getElementById('app'));
