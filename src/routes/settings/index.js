import { h, Component } from 'preact';

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
        <h1>Settings</h1>
        <form>
          <hr />
          <label>
            Sound:
            <input type="checkbox" checked={sound} onChange={this.updateSound} /> | {sound.toString()}
          </label>
          <hr />
          <label>
            Volume:
            <input type="text" value={volume} onChange={this.updateVolume} /> | {volume}
          </label>
        </form>
      </div>
    );
  }
}
