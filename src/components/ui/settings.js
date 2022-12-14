import { h } from 'preact';

import { useCallback } from 'preact/hooks';
import { useStoreon } from 'storeon/preact';

const minFontSize = 50;
const maxFontSize = 150;
const stepFontSize = 10;

const UISettings = ({ onClose }) => {
  const { dispatch, sound, volume, fontsize } = useStoreon('sound', 'volume', 'fontsize');
  const setSound = useCallback(() => {
    dispatch('switch/sound');
    dispatch('settings/save');
  }, [ dispatch ]);
  const setVolume = useCallback((e) => {
    dispatch('set/volume', e.target.value);
    dispatch('settings/save');
  }, [ dispatch ]);
  const setFontsize = useCallback((e) => {
    dispatch('set/fontsize', e.target.value);
    dispatch('settings/save');
  }, [ dispatch ]);

  return (
    <>
      <div class="settings-backdrop" onClick={onClose} />
      <div id="settings">
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
            <input disabled={!sound} type="range" min="0" max="100" value={volume} onChange={setVolume} /> | {volume}
          </label>
          <hr />
          <label>
            Font size:
            <input type="range" min={minFontSize} max={maxFontSize} step={stepFontSize} value={fontsize} onChange={setFontsize} /> | {fontsize}%
            <div id="settings-font-sample" style={{'font-size': `${fontsize}%`}}>
              Коли я розповідаю про текстові ігри, з’ясовується, що мої співрозмовники про них чули. У кожного з них своє ставлення до них, що врешті-решт зводиться до двох варіантів: “А, текстові квести! Це такі ретро-ігри, я пам’ятаю, як складно було в них грати” або “Це щось незвичайне, авангардне, дуже цікаве і дивне, але незрозуміле”.
            </div>
          </label>
          <hr />
        </form>
        <button onClick={onClose}>Back to menu</button>
      </div>
    </>
  );
};

export default UISettings;
