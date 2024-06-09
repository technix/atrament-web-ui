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
| `# toolbar: toolbar_function` | Use output of this function as a toolbar content. |

### Knot tags
| Tag | Description                |
| :-------- | :------------------------- |
| `# IMAGE: some/picture.jpg` | Show image before paragraph text. |
| `# CLEAR` | Clear scenes list before saving current scene to Atrament state. |
| `# AUDIO: sound.mp3` | Play sound (once). |
| `# AUDIOLOOP: music.mp3` | Play music (looped). |
| `# AUDIOLOOP: false` | Stop playing music. |
| `# PLAY_SOUND: sound.mp3` | Play sound (once). |
| `# STOP_SOUND: sound.mp3` | Stop playing specific sound. |
| `# STOP_SOUND` | Stop playing all sounds. |
| `# PLAY_MUSIC: music.mp3` | Play background music (looped). |
| `# STOP_MUSIC: music.mp3` | Stop playing specific background music. |
| `# STOP_MUSIC` | Stop playing all background music. |
| `# CHECKPOINT` | Save game to 'default' checkpoint. |
| `# CHECKPOINT: checkpointName` | Save game to  checkpoint `checkpointName`. |
| `# SAVEGAME: saveslot` | Save game to `saveslot`. |
| `# RESTART` | Start game from beginning. |
| `# RESTART_FROM_CHECKPOINT` | Restart game from latest checkpoint. |
| `# RESTART_FROM_CHECKPOINT: checkpointName` | Restart game from named checkpoint. |

Note: For sound effects, please use either AUDIO/AUDIOLOOP or PLAY_SOUND/PLAY_MUSIC/STOP_SOUND/STOP_MUSIC tags. Combining them may lead to unexpected side effects.

### Custom markup
| Markup | Description                |
| :-------- | :------------------------- |
| `[img]path/to/image.jpg[/img]` | Display inline image. |
| `[button=function]Text[/button]` | Display button, call a function when clicked. If function returns text, it will be displayed as a new card content. If not, existing card content will be updated. |
| `[pbutton=function]Text[/pbutton]` | Same as `[button]`, but borderless. |

### Cards

Atrament UI can display custom data (inventory, character stats etc.) as a card overlay. 

To display a card, you need to define a button in the toolbar or in the game content, with `[button]` or `[pbutton]` tag. If the function returns text content, it will be displayed as a card overlay. Card overlays can have buttons too.

If the first line of the function is a `[title]Card Title[/title]` tag, this title will be displayed in the toolbar.

Example of toolbar and cards:
```
# toolbar: game_toolbar

...

=== function game_toolbar()
  [button=inventory]Inventory[/button]
  [button=stats]Stats[/button]

=== function inventory()
  [title]Inventory[/title]
  You are carrying:
  ...

=== function stats()
  [title]Character: {character_name}[/title]
  Health: {health}
  ...

```

## More documentation

See [Atrament core documentation](https://github.com/technix/atrament-core/blob/master/README.md).

## Atrament repositories

- [atrament-web](https://github.com/technix/atrament-web)
- [atrament-core](https://github.com/technix/atrament-core)

## LICENSE

Atrament is distributed under MIT license.

Copyright (c) 2023 Serhii "techniX" Mozhaiskyi
