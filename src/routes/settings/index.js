import { h } from 'preact';
import { Link } from 'preact-router/match';

import { connect } from 'unistore/preact';
import { actions } from '../../store';

const Settings = ({
  sound, volume, transcript, debug,
  setTranscript, setDebug, setSound, setVolume
}) => (
  <div>
    <h1 class="header">Settings</h1>
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
      <label>
        Transcript:
        <input type="checkbox" checked={transcript} onChange={setTranscript} /> | {transcript.toString()}
      </label>
      <hr />
      <label>
        Debug:
        <input type="checkbox" checked={debug} onChange={setDebug} /> | {debug.toString()}
      </label>
    </form>
    <Link href="/">Back to menu</Link>
  </div>
);

export default connect('sound,volume,transcript,debug', actions)(Settings);
