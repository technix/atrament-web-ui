const atramentConfig = {
  applicationID: '!CHANGE_THIS',
  settings: {
    volume: 0,
    mute: true
  }
};

export function getConfig() {
  return atramentConfig;
}

export function setConfig(InkStory, cfg) {
  if (!InkStory) {
    throw new Error('atrament.init: provide ink Story constructor as a first argument!');
  }
  if (typeof InkStory !== 'function') {
    throw new Error('atrament.init: Story is not a constructor!');
  }
  if (!cfg) {
    return;
  }
  atramentConfig.InkStory = InkStory;
  Object.entries(cfg).forEach(([k, v]) => {
    // TODO use better deep copy here
    // TODO merge default config with the new config
    atramentConfig[k] = JSON.parse(JSON.stringify(v));
  });
}
