import { h, Component } from 'preact';
import { Router } from 'preact-router';
import createHashHistory from 'history/createHashHistory';

import scaleElement from '../lib/scale';

import { Provider } from 'unistore/preact';
import { store } from '../store';

import Home from '../routes/home';
import Game from '../routes/game';
import Settings from '../routes/settings';

export default class App extends Component {
  onResize = () => {
    const el = this.appContainer;
    if (window.innerWidth < 480) {
      el.style.transform = 'none';
      el.style.transformOrigin = 'none';
      return; // disable full scaling on mobile devices
    }
    scaleElement(el);
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
