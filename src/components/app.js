import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { createHashHistory } from 'history';

import { Provider, store } from 'src/store';
import storage from 'src/lib/storage';

import Home from 'src/components/routes/home';
import Game from 'src/components/routes/game';
import Settings from 'src/components/routes/settings';

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
          </Router>
        </div>
      </Provider>
    );
  }
}
