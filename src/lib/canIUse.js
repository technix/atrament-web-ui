function testStorage (storage) {
  try {
    const key = '__atrament_ui_set_random_key__';
    storage.setItem(key, key);
    storage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
}

// https://github.com/filamentgroup/woff2-feature-test
function testWoff2 () {
  if ( !( 'FontFace' in window ) ) {
    return false;
  }
  const f = new FontFace('t', 'url( "data:font/woff2;base64,d09GMgABAAAAAADwAAoAAAAAAiQAAACoAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmAALAogOAE2AiQDBgsGAAQgBSAHIBuDAciO1EZ3I/mL5/+5/rfPnTt9/9Qa8H4cUUZxaRbh36LiKJoVh61XGzw6ufkpoeZBW4KphwFYIJGHB4LAY4hby++gW+6N1EN94I49v86yCpUdYgqeZrOWN34CMQg2tAmthdli0eePIwAKNIIRS4AGZFzdX9lbBUAQlm//f262/61o8PlYO/D1/X4FrWFFgdCQD9DpGJSxmFyjOAGUU4P0qigcNb82GAAA" ) format( "woff2" )', {});
  f.load().catch(() => {});
  return f.status === 'loading' || f.status === 'loaded';
}

function testWebAudio () {
  try {
    // Fix up for prefixing
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContext();
    context.close();
    return true;
  } catch (e) {
    return false;
  }
}

function canIUse() {
  return {
    localStorage: testStorage('localStorage' in window ? window.localStorage : {}),
    woff2: testWoff2(),
    webAudio: testWebAudio()
  };
}

export default canIUse;