import { h } from 'preact';
import { Text } from '@eo-locale/preact';
import style from './index.module.css';
import { useAtrament, useAtramentState } from 'src/atrament/hooks';

import { defaultFontSize, stepFontSize, minFontSize, maxFontSize } from 'src/constants';

import { fonts } from 'src/fonts';

const datapointsFontSize = [];
for (let s=minFontSize; s <= maxFontSize; s+= stepFontSize) {
  datapointsFontSize.push(s);
}

const SettingsText = () => {
  const { updateSettings } = useAtrament();
  const atramentState = useAtramentState(['settings']);
  const { font, fontSize } = atramentState.settings;

  const handleFontSize = (e) => updateSettings('fontSize', e.target.value);

  return (
    <div class={[style.settings_text, 'atrament-settings-text'].join(' ')}>
      <div class={style.settings_fontsize_container}>
        <div class={style.settings_font_a} style={{'font-size': `${minFontSize}%`}}>A</div>
        <div class={style.settings_fontsize_input_container}>
          <input
            class={style.settings_fontsize_input}
            type="range"
            min={minFontSize}
            max={maxFontSize}
            step={stepFontSize}
            value={fontSize || defaultFontSize}
            onInput={handleFontSize}
            list="fontSizes"
          />
          <datalist id="fontSizes">
            {datapointsFontSize.map((f) => <option key={f} value={f} />)}
          </datalist>
        </div>
        <div class={style.settings_font_a} style={{'font-size': `${maxFontSize}%`}}>A</div>
      </div>
      <div class={style.settings_font_sample} style={{'font-size': `${fontSize}%`, 'font-family': fonts[font]}}>
        <Text id={'font.sampleText'} />
      </div>
    </div>
  );
};

export default SettingsText;
