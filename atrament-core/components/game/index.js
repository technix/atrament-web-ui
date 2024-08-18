import { interfaces } from '../../utils/interfaces';
import { emit } from '../../utils/emitter';

import { init, loadInkFile, initInkStory, start, clear, reset } from './control';
import { getSession, setSession, getSessions, removeSession } from './sessions';

import ink from '../ink';
import { playSound, stopSound, playMusic, playSingleMusic, stopMusic } from '../sound';
import {
  getSaveSlotKey,
  load,
  save,
  existSave,
  removeSave,
  listSaves,
  SAVE_GAME,
  SAVE_AUTOSAVE,
  SAVE_CHECKPOINT
} from '../saves';

import internalSceneProcessors from '../../utils/scene-processors';

const sceneProcessors = [];

// ===========================================

async function canResume() {
  let saveSlot = null;
  const autosaveSlot = getSaveSlotKey({ type: SAVE_AUTOSAVE });
  if (await existSave(autosaveSlot)) {
    saveSlot = autosaveSlot;
  } else {
    const saves = await listSaves();
    const checkpoints = saves.filter((k) => k.type === SAVE_CHECKPOINT);
    if (checkpoints.length) {
      saveSlot = checkpoints.sort((a, b) => b.date - a.date)[0].id;
    }
  }
  emit('game/canResume', saveSlot);
  return saveSlot;
}


async function resume() {
  const saveSlot = await canResume();
  emit('game/resume', { saveSlot });
  ink.resetStory(); // reset ink story state
  await start(saveSlot);
}


async function restart(saveSlot) {
  emit('game/restart', { saveSlot });
  ink.resetStory(); // reset ink story state
  await start(saveSlot);
}


async function restartAndContinue(saveSlot) {
  await restart(saveSlot);
  continueStory();
}


async function saveGame(name) {
  await save({ type: SAVE_GAME, name });
}


async function saveCheckpoint(name) {
  await save({ type: SAVE_CHECKPOINT, name });
}


async function saveAutosave() {
  await save({ type: SAVE_AUTOSAVE });
}


const tagHandlers = {
  CLEAR: () => interfaces().state.setKey('scenes', []),
  AUDIO: (v) => (v ? playSound(v) : stopSound()),
  AUDIOLOOP: (v) => (v ? playSingleMusic(v) : stopMusic()),
  PLAY_SOUND: playSound,
  STOP_SOUND: (v) => (v === true ? stopSound() : stopSound(v)),
  PLAY_MUSIC: playMusic,
  STOP_MUSIC: (v) => (v === true ? stopMusic() : stopMusic(v)),
  CHECKPOINT: (v) => saveCheckpoint(v),
  SAVEGAME: (v) => saveGame(v)
};


function $processTags(list, tags) {
  list.forEach((tag) => {
    if (tag in tags && tag in tagHandlers) {
      tagHandlers[tag](tags[tag]);
      emit('game/handletag', { [tag]: tags[tag] });
    }
  });
}


function defineSceneProcessor(fn) {
  sceneProcessors.push(fn);
}


function continueStory() {
  const { state } = interfaces();
  const { metadata } = state.get();
  // get next scene
  const isContinueMaximally = !(metadata.continue_maximally === false)
  const scene = ink.getScene(isContinueMaximally);
  if (scene.content.length === 0) {
    /*
      if we have a scene with empty content
      (usually it happens after state load)
      do not process it further
    */
    return;
  }
  // run scene processors
  internalSceneProcessors.forEach((p) => p(scene));
  sceneProcessors.forEach((p) => p(scene));
  // process tags
  const { tags } = scene;

  // RESTART
  if (tags.RESTART) {
    restart();
    return;
  }

  // RESTART_FROM_CHECKPOINT
  if (tags.RESTART_FROM_CHECKPOINT) {
    restart(getSaveSlotKey({ type: 'checkpoint', name: tags.RESTART_FROM_CHECKPOINT }));
    return;
  }

  // tags to do pre-render actions
  $processTags(
    ['CLEAR', 'STOP_SOUND', 'STOP_MUSIC', 'PLAY_SOUND', 'PLAY_MUSIC', 'AUDIO', 'AUDIOLOOP'],
    tags
  );

  if (metadata.single_scene) {
    // put single scene to state
    state.setKey('scenes', [scene]);
  } else {
    // add scene to state
    state.appendKey('scenes', scene);
  }

  // handle game saves
  $processTags(
    ['CHECKPOINT', 'SAVEGAME'],
    tags
  );

  // if autosave mode is not disabled
  if (metadata.autosave !== false) {
    saveAutosave();
  }
  emit('game/continueStory');
}


export default {
  // game-control
  init,
  loadInkFile,
  initInkStory,
  start,
  clear,
  reset,
  // game
  resume,
  canResume,
  restart,
  restartAndContinue,
  continueStory,
  makeChoice: (id) => ink.makeChoice(id),
  getAssetPath: (path) => interfaces().loader.getAssetPath(path),
  defineSceneProcessor,
  // saves
  SAVE_GAME,
  SAVE_AUTOSAVE,
  SAVE_CHECKPOINT,
  getSaveSlotKey,
  saveGame,
  saveCheckpoint,
  saveAutosave,
  load,
  listSaves,
  removeSave,
  existSave,
  // sessions
  getSession,
  setSession,
  getSessions,
  removeSession
};
