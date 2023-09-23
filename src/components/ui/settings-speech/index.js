import { h } from 'preact';
import style from './index.css';
import { useCallback, useEffect, useState } from 'preact/hooks';
import Toggle from '../toggle';

import { allVoices, getDefaultVoice } from 'src/speech-synthesis';

const SettingsSpeech = ({ speech_synthesis, speech_synthesis_voice, setSpeech, setVoice }) => {
  const [speechVoices, setVoices] = useState([]);
  const handleSpeech = useCallback((e) => setSpeech(e.target.checked), [ setSpeech ]);
  const handleVoice = useCallback((e) => setVoice(e.target.value), [ setVoice ]);
  useEffect(() => {
    const allVoicesList = allVoices().map((v) => ({ name: v.name, lang: v.lang}));
    setVoices(allVoicesList);
  }, []);
  return (
    <>
      <div class={[style.settings_speech, 'atrament-settings-speech'].join(' ')}>
        <Toggle enabled={speech_synthesis} onChange={handleSpeech} /> Speech 
      </div>
      <div class={style.settings_speech_container}>
        <select onChange={handleVoice} disabled={!speech_synthesis}>
          {speechVoices.map((i) => <option selected={speech_synthesis_voice === i.name} value={i.name}>{i.name}</option>)}
        </select>
      </div>
    </>
  );
};

export default SettingsSpeech;
