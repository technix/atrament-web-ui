import { Link } from 'preact-router/match';

const UISettings = ({
  sound, setSound,
  volume, setVolume
}) => (
  <div>
    <h1>Settings</h1>
    <form>
      <hr />
      <label>
        Sound:
        <input type="checkbox" checked={sound} onChange={setSound} /> | {sound.toString()}
      </label>
      <hr />
      <label>
        Volume:
        <input type="range" min="0" max="100" value={volume} onChange={setVolume} /> | {volume}
      </label>
      <hr />
    </form>
    <Link href="/">Back to menu</Link>
  </div>
);

export default UISettings;