let voices = [];

export function detectVoices() {
  voices = window.speechSynthesis.getVoices().sort((a, b) => {
    const aname = a.name.toUpperCase();
    const bname = b.name.toUpperCase();
    if (aname < bname) {
      return -1;
    } else if (aname == bname) {
      return 0;
    } else {
      return +1;
    }
  });
}

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = detectVoices;
}

detectVoices();

export function allVoices() {
  return voices;
}

export function getVoice(name) {
  return voices.filter((v) => v.name === name)[0];
}

export function getDefaultVoice() {
  const defaultVoice = voices.filter((v) => v.default);
  if (defaultVoice.length > 0) {
    return defaultVoice[0].name;
  } else {
    return '';
  }
}
