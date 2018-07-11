import { h } from 'preact';
import { Link } from 'preact-router/match';

import scene from '../../assets/mocks/scene.json';
import episode from '../../assets/mocks/episode.json';
import Episode from '../../components/episode';

function makeChoice(id) {
  console.log('CHOICE:', id);
}

const Home = () => (
  <div>
    <h1 class="header">Home</h1>
    <p>This is main app screen.</p>
    <ul>
      <li><Link href="/game">Continue</Link></li>
      <li><Link href="/game">Start new game</Link></li>
      <li><Link href="/settings">Settings</Link></li>
    </ul>
    <Episode scene={scene} episode={episode} makeChoice={makeChoice} />
  </div>
);

export default Home;
