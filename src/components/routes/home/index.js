import { h } from 'preact';
import style from './style';
import { Link } from 'preact-router/match';

import storage from '_src_/lib/storage';

function deleteAutosave() {
  storage.delete('auto');
}

const Home = () => (
  <div>
    <h1 class={style.header}>Home</h1>
    <p>This is main app screen.</p>
    {storage.exists('auto') ? <Link href="/game" class={style.button}>Continue</Link> : ''}
    <Link href="/game" onClick={deleteAutosave} class={style.button}>{storage.exists('auto') ? 'Restart game' : 'Start game' }</Link>
    <Link href="/settings" class={style.button}>Settings</Link>
  </div>
);

export default Home;