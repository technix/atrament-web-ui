# Atrament Web UI

`atrament-web-ui` is a web application to run Ink games.

It uses [inkjs](https://github.com/y-lohse/inkjs) to interpret Ink scripts, [Atrament](https://github.com/technix/atrament-core) as a game engine, and [Preact](https://preactjs.com/) as a Web UI framework.

[Live Demo](https://technix.github.io/atrament-web-ui/)

## Getting started

### Get source code and install dependencies

```
git clone https://github.com/technix/atrament-web-ui.git --depth 1
cd atrament-web-ui
npm install
npm run install-inklecate
```

### Run application locally in dev mode
```
npm start
```

The application is available at http://localhost:8900. If any source file (Ink or Javascript) is edited, the application automatically restarts with these changes.

### Build application for publishing to web
```
npm run build
```

The standalone web application files will be in `build` folder. Use `npm run preview` command to test it in browser at http://localhost:4173/.

## Create your own game with Atrament Web UI

1. Remove all files from `root/game` and put your game files there (ink script, images, music etc).
2. Edit `atrament.config.json`, change the `source` parameter in `game` section to name of your main Ink file. File path for this file is relative to `root/game` folder.
3. You may change other configuration options in `atrament.config.json`:
    * "`name`": your application name
    * "`short_name`": your application short name, or codename
    * "`description`": your application description
    * "`theme`": default app theme, may be "`light`", "`sepia`", or "`dark`"
    * "`font`": default game font, may be "`System`", "`Sans Serif`", "`Serif`", "`Monospaced`", "`Fira Sans`", "`Lora`", "`Merriweather`", or "`OpenDyslexic`"
4. (optionally) replace `root/logo.png` with your project logo. This image is used to generate favicon and application icon.
5. That's it! You can make a test run with `npm start`, or build standalone web app with `npm run build`.

## Ink tags handled by Atrament Web UI

### Global tags

| Tag | Description                |
| :-------- | :------------------------- |
| `# title: A Story Written In Ink` | Game title |
| `# author: John Doe` | Author |
| `# theme: light` | Game color theme: `light`, `sepia`, or `dark` |
| `# font: System` | Game font: `System`, `Sans Serif`, `Serif`, `Monospaced`, `Fira Sans`, `Lora`, `Merriweather`, or `OpenDyslexic` |
| `# observe: varName` | Register variable observer for `varName` Ink variable. Variable value is available in `vars` section of Atrament state. |
| `# persist: varName` | Save `varName` Ink variable value to persistent storage, restore before game starts. |
| `# sessions: 3` | Amount of game sessions. Each session has its own set of saves. |
| `# autosave: false` | Disables autosaves. |
| `# saves: 5` | Amount of available slots for saves. |
| `# load_from_checkpoints` | Show checkpoints in the list of games to load. |
| `# continue_maximally: false` | Pause story after each line. |
| `# single_scene` | Store only last scene in Atrament state. |
| `# scenes_align: center` | Scene alignment on the screen. Can be set to `top`, `center`, or `bottom`. |
| `# hypertext` | Use links instead of choices. See "[Hypertext mode](#hypertext-mode)". |
| `# toolbar: toolbar_function` | Use output of this function as a toolbar content. |
| `# cover: some/image.jpg` | Cover image to display at the main menu screen |
| `# background: some/picture.jpg` | Set background image for the game backdrop. |

### Knot tags
| Tag | Description                |
| :-------- | :------------------------- |
| `# IMAGE: some/picture.jpg` | Show image before paragraph text. |
| `# BACKGROUND: some/picture.jpg` | Set background image for the game text. Use `# BACKGROUND: false` to unset it. |
| `# PAGE_BACKGROUND: some/picture.jpg` | Set background image for the game backdrop. Use `# PAGE_BACKGROUND: false` to unset it. |
| `# CLEAR` | Clear scenes list before saving current scene to Atrament state. |
| `# AUDIO: sound.mp3` | Play sound (once). |
| `# AUDIOLOOP: music.mp3` | Play background music (looped). There can be only one background music track. |
| `# AUDIOLOOP: false` | Stop playing music. |
| `# PLAY_SOUND: sound.mp3` | Play sound (once). |
| `# STOP_SOUND: sound.mp3` | Stop playing specific sound. |
| `# STOP_SOUND` | Stop playing all sounds. |
| `# PLAY_MUSIC: music.mp3` | Play background music (looped). There can be multiple background music tracks, played simultaneously. |
| `# STOP_MUSIC: music.mp3` | Stop playing specific background music. |
| `# STOP_MUSIC` | Stop playing all background music. |
| `# CHECKPOINT` | Save game to 'default' checkpoint. |
| `# CHECKPOINT: checkpointName` | Save game to checkpoint `checkpointName`. |
| `# SAVEGAME: saveslot` | Save game to `saveslot`. |
| `# RESTART` | Start game from beginning. |
| `# RESTART_FROM_CHECKPOINT` | Restart game from latest checkpoint. |
| `# RESTART_FROM_CHECKPOINT: checkpointName` | Restart game from named checkpoint. |
| `# CLASS: classname` | Apply CSS class to the paragraph `<p>` element. |

Note: For sound effects, please use either AUDIO/AUDIOLOOP or PLAY_SOUND/PLAY_MUSIC/STOP_SOUND/STOP_MUSIC tags. Combining them may lead to unexpected side effects.

### Choice tags
| Tag | Description                |
| :-------- | :------------------------- |
| `# UNCLICKABLE` | The choice can't be selected. Alternative names: `#DISABLED`, `#INACTIVE` |
| `# CLASS: classname` | Apply CSS class to the choice `<button>` element. |

## Save management

Atrament Web UI supports the following save types:

1. **Autosave**. By default, game saves its progress after each choice. If autosave is present for the game, player can continue playing by clicking "Continue" in the main menu. When global tag `autosave: false` is present, autosaving is disabled. If autosaving is disabled and there are no saved checkpoints, "Continue" button will not be available.
2. **Checkpoints**. They are controlled by knot tags `#CHECKPOINT` and `#RESTART_FROM_CHECKPOINT`. Authors can use named checkpoints, adding names to these tags. If there are no autosave, players can continue playing from latest saved checkpoint by clicking "Continue" in the main menu.
3. **Saves**. They are disabled by default. Authors can set global tag `#saves` to define amount of available save slots. Players can save and load games using the slots provided. If global tag `#load_from_checkpoints` is set, players can also load game from any saved checkpoint.

In addition to above, Atrament Web UI supports **sessions**, which can be enabled by global tag `#sessions`. If they are enabled, players have to choose game session before starting a game. Each session has its own autosaves, checkpoints, and saves.

## "Click to continue"

When there is a single empty choice (see example below), it is treated as "click to continue". Choice list is not shown, and player can continue story by clicking the screen or pressing "Space" or "Enter" key. After 3 seconds of inactivity, hint is displayed in the bottom of the screen.

```
This story will proceed when user clicks screen.

+ [ ] -> next_knot
```

## Hypertext mode

When global tag `hypertext` is set, Atrament UI switches to hypertext mode. In this mode choice options are not displayed. However, author can use `[link=target choice text]link text[/link]` to link specific phrases to scene choices.

For better use experience in hypertext mode authors can set global tags `single_scene` and `scenes_align: top`.

```
# hypertext
# single_scene
# scenes_align: top

You are standing in an open field west of a white house, with a boarded [link=Open door]front door[/link]. There is a [link=Examine mailbox]small mailbox[/link] here.

+ [Examine mailbox] -> examine_mailbox
+ [Open door] -> inside_house
```

## Custom markup
| Markup | Description                |
| :-------- | :------------------------- |
| `[img]path/to/image.jpg[/img]` | Display inline image. |
| `[button=function]Text[/button]`<br>`[button onclick=function]Text[/button]` | Display button, call a function when clicked. If function returns text, it will be displayed as a new overlay content. If not, existing overlay content will be updated.<br>Attributes:<br>`onclick=function` function to be called when clicked.<br>`disabled=true` disables the button<br>`bordered=false` hide button borders |
| `[link=target choice text]Text[/link]` | Creates a link. When clicked, the target choice is activated, and game continues. |
| `[progress value={variable}]Inner text[/progress]` | Displays progress bar.<br>Attributes:<br>`value=x` current progressbar value<br>`min=x` minimal progressbar value<br>`max=x` maximal progressbar value<br>`style=accent` highlight progressbar with accent theme color |
| `[input var=variable]` | Input element, sets value of given variable. Default value of this field is read from the same variable. Disabled on inactive scenes. <br>Attributes:<br>`var=n` variable name to change<br>`type=number` input type. Possible values: `text`, `number`.<br>`placeholder=text` placeholder text |
| `[spoiler]text[/spoiler]` | Hidden text. Clicking it toggles text visibility. |
| `[info]text[/info]` | Display text as an information block. Since this is a block element, it is recommended to use it on a whole paragraph.<br>Attributes:<br>`font=system` use system font<br>`side=n` add color to the left infobox side. Possible values: `highlight`, `accent`. |
| `[banner]text[/banner]` | Display text as an banner block. Since this is a block element, it is recommended to use it on a whole paragraph.<br>Attributes:<br>`style=accent` use accent color<br>`allcaps=true` display text in all capitals |
| `[font=Courier New]text[/font]` | Applies font to the text. |
| `[highlight]text[/highlight]`<br>`[highlight color=yellow bgcolor=black]Text[/highlight]` | Highlights text with accent color.<br>Optional parameters `bgcolor` and `color` allow to set both background and foreground color for text. |

Note: it is not possible to wrap multiple paragraphs with these tags. Use `<br>` tag for line breaks if you need multiline text in tags.

## Overlay

Atrament Web UI can display custom data (inventory, character stats etc.) as an overlay. 

To display an overlay, you need to define a button in the toolbar or in the game content with the `[button]` tag. If the function returns text content, it will be displayed as an overlay. Overlay content can have buttons too.

If the first line of the function is a `[title]Overlay Title[/title]` tag, this title will be displayed in the toolbar.

Example of toolbar and overlays:
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

## Keyboard shortcuts
| Key | Description                |
| :-------- | :------------------------- |
| 1,2,3... | Select corresponding choice option. |
| Space, Enter | Continue story. |
| Esc | Show/hide settings dialog. |

## Single file build
Atrament Web UI build is designed as web application for web server deployment. However, you may want to build your game as a standalone web page, which can be opened locally too - similar to Inky or Twine web export.

All you need to do is to build your game with `npm run singlefile` command. The resulting web page will be in the `build_singlefile` folder.

## Debugger
When Atrament UI is run in development mode (i.e. via `npm start`), debugger can be invoked with double pressing of `~` button.

Debugger provides the following functionality:

* General information on ink script
* List of global tags
* List of ink variables (view and edit)
* List of visit counts
* Navigation to knot/stich path

## Atrament repositories

- [atrament-web](https://github.com/technix/atrament-web)
- [atrament-core](https://github.com/technix/atrament-core)

See also [Atrament core documentation](https://github.com/technix/atrament-core/blob/master/README.md) for additional info on Atrament API.

## LICENSE

Atrament is distributed under [MIT license](LICENSE.md).

Copyright (c) 2023 Serhii "techniX" Mozhaiskyi

Made with the support of the [Interactive Fiction Technology Foundation](https://iftechfoundation.org/)

<img src="https://iftechfoundation.org/logo.svg" width="200px">
