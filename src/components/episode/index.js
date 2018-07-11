import { h, Component } from 'preact';
import Choice from '../choice';

export default class Episode extends Component {
  render({ episode, scene, makeChoice }) {
    const paragraphs = episode.map((s) => <p>{s.text}</p>);
    const choices = scene.choices.map((c) => <Choice choice={c} makeChoice={makeChoice}/>);
    return (
      <div class="scene-container">
        <div class="text-wrapper">
          {paragraphs}
        </div>
        <div class="choice-wrapper">
          {choices}
        </div>
      </div>
    );
  }
}