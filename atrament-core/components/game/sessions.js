import { emit } from '../../utils/emitter';
import { interfaces } from '../../utils/interfaces';

async function $iteratePersistent(callback) {
  const { persistent } = interfaces();
  const keys = await persistent.keys();
  await Promise.all(
    keys.map(
      async (key) => {
        if (!key.includes('save')) {
          return; // this is not a saved game
        }
        const saveData = await persistent.get(key);
        await callback(key, saveData);
      }
    )
  );
}

// =============================================

export function validSession(v) {
  if (typeof v === 'number' || typeof v === 'string') {
    return v;
  }
  return '';
}

export function getSession() {
  const { state } = interfaces();
  return validSession(state.get().game.$sessionID);
}

export function setSession(sessionName) {
  const { state } = interfaces();
  const session = validSession(sessionName);
  state.setSubkey('game', '$sessionID', session);
  emit('game/setSession', session);
}

export async function getSessions() {
  const sessions = {};
  await $iteratePersistent(async (key, saveData) => {
    const sessionID = validSession(saveData.game.$sessionID);
    if (sessions[sessionID]) {
      sessions[sessionID] += 1;
    } else {
      sessions[sessionID] = 1;
    }
  });
  emit('game/getSessions', sessions);
  return sessions;
}

export async function removeSession(sessionName) {
  const { persistent } = interfaces();
  const session = validSession(sessionName);
  await $iteratePersistent(async (key, saveData) => {
    if (validSession(saveData.game.$sessionID) === session) {
      await persistent.remove(key);
    }
  });
  emit('game/deleteSession', session);
}
