import gameStorage from 'localforage';
const autosaveId = 'game_autosave';

async function autosaveExists() {
  const autosave = await gameStorage.getItem(autosaveId);
  return autosave !== null;
}

function autosaveClear() {
  return gameStorage.removeItem(autosaveId);
}

export {
  autosaveId,
  autosaveExists,
  autosaveClear
};
