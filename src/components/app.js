import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { createHashHistory } from 'history';

import { Provider, store } from '_src_/store';
import storage from '_src_/lib/storage';

import Home from './routes/home';
import Game from './routes/game';
import Settings from './routes/settings';

// playground
import Playground from './routes/playground';

export default class App extends Component {
  handleRoute = e => {
    if (e.current.props.url === '/game/new') {
      storage.delete('auto');
    }
    this.currentUrl = e.url;
  };

  render() {
    return (
      <Provider store={store}>
        <div id="app" ref={c => this.appContainer = c}>
          <Router onChange={this.handleRoute} history={createHashHistory()}>
            <Home path="/" />
            <Game path="/game/:new?" />
            <Settings path="/settings" />
            <Playground path="/playground/:subcomponent?" />
          </Router>
        </div>
      </Provider>
    );
  }
}
