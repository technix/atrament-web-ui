import { h } from 'preact';
import { Link } from 'preact-router/match';

import { connect, actions } from 'src/store';

const Settings = ({
  settings,
  setHyphens, setTranscript, setDebug, setSound, setVolume
}) => (
  <div>
    <h1 class="header">Settings</h1>
    <form>
      <hr />
      <label>
        Hyphens:
        <input type="checkbox" checked={settings.hyphens} onChange={setHyphens} /> | {settings.hyphens.toString()}
      </label>
      <hr />
      <label>
        Sound:
        <input type="checkbox" checked={settings.sound} onChange={setSound} /> | {settings.sound.toString()}
      </label>
      <hr />
      <label>
        Volume:
        <input type="range" min="0" max="100" value={settings.volume} onChange={setVolume} /> | {settings.volume}
      </label>
      <hr />
      <label>
        Transcript:
        <input type="checkbox" checked={settings.transcript} onChange={setTranscript} /> | {settings.transcript.toString()}
      </label>
      <hr />
      <label>
        Debug:
        <input type="checkbox" checked={settings.debug} onChange={setDebug} /> | {settings.debug.toString()}
      </label>
    </form>
    <Link href="/">Back to menu</Link>
  </div>
);

export default connect('settings', actions)(Settings);
