import { h } from 'preact';
import style from './style';
import { Link } from 'preact-router/match';

const Home = () => (
  <div>
    <h1 class={style.header}>Home</h1>
    <p>This is main app screen.</p>
    <Link href="/game" class={style.button}>Continue</Link>
    <Link href="/game" class={style.button}>Start new game</Link>
    <Link href="/settings" class={style.button}>Settings</Link>
    <Link href="/map" class={style.button}>Map</Link>
  </div>
);

export default Home;
