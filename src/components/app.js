import { h, Component } from 'preact';
import { Router } from 'preact-router';
import createHashHistory from 'history/createHashHistory';

import scale from '_src_/lib/scale';

import { Provider } from 'unistore/preact';
import { store } from '_src_/store';

import Home from './routes/home';
import Game from './routes/game';
import Settings from './routes/settings';

export default class App extends Component {
  onResize = () => {
    const el = this.appContainer;
    if (window.innerWidth < 480) {
      scale.disable(el); // disable full scaling on mobile devices
      return;
    }
    scale.enable(el);
  };

  handleRoute = e => {
    this.currentUrl = e.url;
  };

  componentDidMount = () => {
    this.onResize();
    window.onresize = this.onResize;
  }

  render() {
    return (
      <Provider store={store}>
        <div id="app" ref={c => this.appContainer = c}>
          <Router onChange={this.handleRoute} history={createHashHistory()}>
            <Home path="/" />
            <Game path="/game" />
            <Settings path="/settings" />
          </Router>
        </div>
      </Provider>
    );
  }
}
