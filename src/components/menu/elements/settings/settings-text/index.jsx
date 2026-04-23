import { h } from 'preact';
import clsx from 'clsx';
import { Text } from '@eo-locale/preact';
import style from './index.module.css';
import { useAtrament, useAtramentState } from 'src/atrament/hooks';

import {
  DEFAULT_FONT_SIZE, FONT_SIZE_STEP, FONT_SIZE_MIN, FONT_SIZE_MAX, 
  DEFAULT_LINE_HEIGHT, LINE_HEIGHT_STEP, LINE_HEIGHT_MIN, LINE_HEIGHT_MAX
} from 'src/constants';

import { fonts } from 'src/fonts';

const datapointsFontSize = [];
for (let s = FONT_SIZE_MIN; s <= FONT_SIZE_MAX; s += FONT_SIZE_STEP) {
  datapointsFontSize.push(s);
}

const datapointsLineHeight = [];
for (let s = LINE_HEIGHT_MIN; s <= LINE_HEIGHT_MAX; s += LINE_HEIGHT_STEP) {
  datapointsLineHeight.push(s);
}

const SettingsText = () => {
  const { updateSettings } = useAtrament();
  const atramentState = useAtramentState(['settings']);
  const { font, fontSize, lineHeight } = atramentState.settings;

  const handleFontSize = (e) => updateSettings('fontSize', e.target.value);
  const handleLineHeight = (e) => updateSettings('lineHeight', e.target.value);

  return (
    <div class={clsx(style.settings_text, 'atrament-settings-text')}>
      <div class={style.settings_fontsize_container}>
        <div class={style.settings_font_a} style={{ 'font-size': `${FONT_SIZE_MIN}%` }}>A</div>
        <div class={style.settings_fontsize_input_container}>
          <input
            class={style.settings_fontsize_input}
            type="range"
            min={FONT_SIZE_MIN}
            max={FONT_SIZE_MAX}
            step={FONT_SIZE_STEP}
            value={fontSize || DEFAULT_FONT_SIZE}
            onInput={handleFontSize}
            list="fontSizes"
          />
          <datalist id="fontSizes">
            {datapointsFontSize.map((f) => <option key={f} value={f} />)}
          </datalist>
        </div>
        <div class={style.settings_font_a} style={{ 'font-size': `${FONT_SIZE_MAX}%` }}>A</div>
      </div>
      <div class={style.settings_fontlineheight_container}>
        <div class={style.settings_font_sample} style={{ 'font-size': `${fontSize}%`, 'font-family': fonts[font], 'line-height': `${lineHeight}%` }}>
          <Text id={'font.sampleText'} />
        </div>
        <div>
          <input
            class={style.settings_fontlineheight_input}
            type="range"
            min={LINE_HEIGHT_MIN}
            max={LINE_HEIGHT_MAX}
            step={LINE_HEIGHT_STEP}
            value={lineHeight || DEFAULT_LINE_HEIGHT}
            onInput={handleLineHeight}
            list="lineHeights"
          />
          <datalist id="lineHeights">
            {datapointsLineHeight.map((f) => <option key={f} value={f} />)}
          </datalist>
        </div>
      </div>
    </div>
  );
};

export default SettingsText;
