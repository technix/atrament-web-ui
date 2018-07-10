import { h, Component } from 'preact';
import { Link } from 'preact-router/match';

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1 class="header">Home</h1>
        <p>This is main app screen.</p>
        <ul>
          <li><Link href="/game">Continue</Link></li>
          <li><Link href="/game">Start new game</Link></li>
          <li><Link href="/settings">Settings</Link></li>
        </ul>
      </div>
    );
  }
}


