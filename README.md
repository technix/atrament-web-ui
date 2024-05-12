# Atrament Preact UI

`atrament-preact-ui` is an example application for playing Ink games, built with inkjs, Atrament, and Preact.

[Live Demo](https://technix.github.io/atrament-preact-ui/)

## Run application locally

```
git clone https://github.com/technix/atrament-preact-ui.git
cd atrament-preact-ui
npm install
npm start
```

The application is available at `http://localhost:8900`

To build the application bundle for publishing, use `npm run build` command. Application will be in `build` folder.

## Building your own game

1. Remove all files from `src/assets/game` and put your game files there (ink script, images, music etc).
2. Edit `atrament.config.json`, change the following parameters in `game` section:
    * `source`: your main Ink file name
    * `script`: desired compiled Ink file name (JSON extension is mandatory)
3. You may also change default configuration in `atrament.config.json`:
    * "`theme`": "`light`", "`sepia`", or "`dark`"
    * "`font`": "`System`", "`Fira Sans`", "`Lora`", "`Merriweather`", or "`OpenDyslexic`"
4. (optionally) edit `src/manifest.json` and change `name` and `short_name` parameters.
5. That's it! You can make a test run with `npm start`, or build standalone web app with `npm run build`.

## Ink tags handled by Atrament Preact UI

### Global tags

| Tag | Description                |
| :-------- | :------------------------- |
| `# title: A Story Written In Ink` | Game title |
| `# author: John Doe` | Author |
| `# theme: light` | Game color theme: `light`, `sepia`, or `dark` |
| `# font: System` | Game font: `System`, `Fira Sans`, `Lora`, `Merriweather`, or `OpenDyslexic` |
| `# observe: varName` | Register variable observer for `varName` Ink variable. Variable value is available in `vars` section of Atrament state. |
| `# autosave: false` | Disables autosaves. |
| `# single_scene` | Store only last scene in Atrament state. |

### Knot tags
| Tag | Description                |
| :-------- | :------------------------- |
| `# IMAGE: some/picture.jpg` | Show image before paragraph text. |
| `# CLEAR` | Clear scenes list before saving current scene to Atrament state. |
| `# AUDIOLOOP: music.mp3` <br/> `# MUSIC: music.mp3` | Play music (looped). |
| `# AUDIOLOOP: false` <br/> `# MUSIC: false` | Stop playing music. |
| `# AUDIO: sound.mp3` <br/> `# SOUND: sound.mp3` | Play sound (once). |
| `# CHECKPOINT` | Save game to 'default' checkpoint. |
| `# CHECKPOINT: checkpointName` | Save game to  checkpoint `checkpointName`. |
| `# SAVEGAME: saveslot` | Save game to `saveslot`. |
| `# RESTART` | Start game from beginning. |
| `# RESTART_FROM_CHECKPOINT` | Restart game from latest checkpoint. |
| `# RESTART_FROM_CHECKPOINT: checkpointName` | Restart game from named checkpoint. |

## More documentation

See [Atrament core documentation](https://github.com/technix/atrament-core/blob/master/README.md).

## Atrament repositories

- [atrament-web](https://github.com/technix/atrament-web)
- [atrament-core](https://github.com/technix/atrament-core)

## LICENSE

Atrament is distributed under MIT license.

Copyright (c) 2023 Serhii "techniX" Mozhaiskyi
