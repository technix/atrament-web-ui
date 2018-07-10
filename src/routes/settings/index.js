import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
export default class Settings extends Component {
  state = {
    sound: true,
    volume: 10
  };

  updateSound = () => {
    this.setState({ sound: !this.state.sound });
  };

  updateVolume = (e) => {
    this.setState({ volume: e.target.value });
  };

  render({}, { sound, volume }) {
    return (
      <div>
        <h1 class="header">Settings</h1>
        <form>
          <hr />
          <label>
            Sound:
            <input type="checkbox" checked={sound} onChange={this.updateSound} /> | {sound.toString()}
          </label>
          <hr />
          <label>
            Volume:
            <input type="range" min="0" max="100" value={volume} onChange={this.updateVolume} /> | {volume}
          </label>
        </form>
        <Link href="/">Back to menu</Link>
      </div>
    );
  }
}
