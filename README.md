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
npm run build-web
```

The standalone web application files will be in `build/web` folder. Use `npm run preview` command to test it in browser at http://localhost:4173/.

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
5. That's it! You can make a test run with `npm start`, or build standalone web app with `npm run build-web`.

## Ink tags handled by Atrament Web UI

### Global tags

| Tag | Description                |
| :-------- | :------------------------- |
| `# title: A Story Written In Ink` | Game title |
| `# author: John Doe` | Author |
| `# theme: light` | Game color theme: `light`, `sepia`, or `dark` |
| `# font: System` | Game font: `System`, `Sans Serif`, `Serif`, `Monospaced`, `Fira Sans`, `Lora`, `Merriweather`, or `OpenDyslexic` |
| `# observe: varName` | Register variable observer for `varName` Ink variable. Variable value is available in `vars` section of the Atrament state. |
| `# persist: varName` | Save `varName` Ink variable value to the persistent storage, restore before game starts. |
| `# sessions: 3` | Amount of game sessions. Each session has its own set of saves. |
| `# autosave: false` | Disables autosaves. |
| `# saves: 5` | Amount of available slots for saves. |
| `# load_from_checkpoints` | Show checkpoints in the list of games to load. |
| `# continue_maximally: false` | Pause the story after each line. |
| `# single_scene` | Store only the last scene in the Atrament state. |
| `# scenes_align: center` | Scene alignment on the screen. Can be set to `top`, `center`, or `bottom`. |
| `# choices: grouped numbered` | Changes the choices appearance. Can be set to any combination of: `grouped` (displayed as button group); `numbered` (displays numbers of choices); `left` or `right` (aligns choice text to the left or right) |
| `# hypertext` | Use links instead of choices. See "[Hypertext mode](#hypertext-mode)". |
| `# toolbar: toolbar_function` | Use output of this function as a toolbar content. |
| `# about: about_function` | Use output of this function as an "About" screen content. |
| `# cover: some/image.jpg` | Cover image to display at the main menu screen. |
| `# background: some/picture.jpg` | Set background image for the game backdrop. |
| `# debug` | Enable Ink story debugger. |

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
| `# CHECKPOINT` | Save game to the 'default' checkpoint. |
| `# CHECKPOINT: checkpointName` | Save game to checkpoint `checkpointName`. |
| `# SAVEGAME: saveslot` | Save game to `saveslot`. |
| `# RESTART` | Start game from beginning. |
| `# RESTART_FROM_CHECKPOINT` | Restart game from latest checkpoint. |
| `# RESTART_FROM_CHECKPOINT: checkpointName` | Restart game from named checkpoint. |
| `# CLASS: classname` | Apply CSS class to the paragraph `<div>` element. |
| `# SHUFFLE_CHOICES` | Shuffle choice order in this knot. |

Note: For sound effects, please use either AUDIO/AUDIOLOOP or PLAY_SOUND/PLAY_MUSIC/STOP_SOUND/STOP_MUSIC tags. Combining them may lead to unexpected side effects.

### Choice tags
| Tag | Description                |
| :-------- | :------------------------- |
| `# UNCLICKABLE` | The choice can't be selected. Alternative names: `#DISABLED`, `#INACTIVE` |
| `# CLASS: classname` | Apply CSS class to the choice `<button>` element. |

## Features

### Save management

Atrament Web UI supports the following save types:

1. **Autosave**. By default, game saves its progress after each choice. If autosave is present for the game, player can continue playing by clicking "Continue" in the main menu. When global tag `autosave: false` is present, autosaving is disabled. If autosaving is disabled and there are no saved checkpoints, "Continue" button will not be available.
2. **Checkpoints**. They are controlled by knot tags `#CHECKPOINT` and `#RESTART_FROM_CHECKPOINT`. Authors can use named checkpoints, adding names to these tags. If there is no autosave, players can continue playing from latest saved checkpoint by clicking "Continue" in the main menu.
3. **Saves**. They are disabled by default. Authors can set global tag `#saves` to define amount of available save slots. Players can save and load games using the slots provided. If global tag `#load_from_checkpoints` is set, players can also load game from any saved checkpoint.

In addition to above, Atrament Web UI supports **sessions**, which can be enabled by global tag `#sessions`. If they are enabled, players have to choose game session before starting a game. Each session has its own autosaves, checkpoints, and saves.

### "Click to continue"

A single choice with text '>>>' is treated as "click to continue". Choice list is not shown, and player can continue story by clicking the screen or pressing "Space" or "Enter" key. After 3 seconds of inactivity, animated hint is displayed in the bottom of the screen.

```
This story will proceed when user clicks screen.
+ [>>>] -> next_knot
```

You can also provide a delay in **seconds** for the "click to continue". A timed choice is presented as a slightly different circular button. After the delay, story continues automatically.
```
This story will proceed either after user clicks screen or after 3 seconds.
+ [>>>3] -> next_knot
```

Click-to-continue choice can be configured:
* `clickable` - pause before the choice becomes clickable and player can continue the story. If omitted, player can click and continue story immediately.
* `animation` - pause before displaying animation. If omitted, the animation displays immediately.
* `continue` - pause before story continues automatically. If omitted, the game continues only after click or keypress.

All pauses are set in seconds.
```
+ [>>>(clickable=3 animation=5 continue=10)] -> next_knot
```

### Hypertext mode

If global tag `hypertext` is set, Atrament UI switches to hypertext mode. In this mode choice options are not displayed. However, author can use `[link=target choice text]link text[/link]` to link specific phrases to the choices.

For better user experience in hypertext mode authors can set global tags `single_scene` and `scenes_align: top`.

```
# hypertext
# single_scene
# scenes_align: top

You are standing in an open field west of a white house, 
with a boarded [link=Open door]front door[/link]. 
There is a [link=Examine mailbox]small mailbox[/link] here.

+ [Examine mailbox] -> examine_mailbox
+ [Open door] -> inside_house
```

### Custom markup
| Markup | Description                |
| :-------- | :------------------------- |
| `[picture]path/to/image.jpg[/picture]` | Display image (same as `#IMAGE` knot tag). The image is sized automatically to fit the container. When using images inside of the `[block]` tags, you may want to set picture margins.<br>Attributes:<br>`width=50%` sets picture width.<br>`leftmargin=0.5em` sets left margin. <br>`rightmargin=0.5em` sets right margin.|
| `[img]path/to/image.jpg[/img]` | Display inline image. |
| `[button=function]Text[/button]`<br>`[button onclick=function]Text[/button]` | Display button, call a function when clicked. If function outputs a text, it will be displayed as a new overlay content. If not, current overlay content will be updated.<br>Attributes:<br>`onclick=function` function to be called when clicked.<br>`disabled=true` disables the button<br>`bordered=false` hide button borders |
| `[link=target choice text]Text[/link]` | Creates a link. When clicked, the target choice is activated, and game continues. |
| `[progress value={variable}]Inner text[/progress]` | Displays a progress bar.<br>Attributes:<br>`value=x` current progressbar value<br>`min=x` minimal progressbar value<br>`max=x` maximal progressbar value<br>`style=accent` highlight progressbar with accent theme color |
| `[input var=variable]` | Input element, sets value of given variable. Default value of this field is read from the same variable. Disabled on the inactive scenes. <br>Attributes:<br>`var=n` variable name to change<br>`type=number` input type. Possible values: `text`, `number`.<br>`placeholder=text` placeholder text |
| `[spoiler]text[/spoiler]` | Hidden text. Text visibility toggles on click. |
| `[info]text[/info]` | Display text as an information block. Since this is a block element, it is recommended to use it on a whole paragraph.<br>Attributes:<br>`font=system` use system font<br>`side=n` add color to the left infobox side. Possible values: `highlight`, `accent`. |
| `[banner]text[/banner]` | Display text as an banner block. Since this is a block element, it is recommended to use it on a whole paragraph.<br>Attributes:<br>`style=accent` use accent color<br>`allcaps=true` display text in all capitals |
| `[css]text[/css]` | Applies CSS classed and/or styles to the text.<br>Attributes:<br>`class=CSS_class` applies CSS class to the text.<br>`style="CSS style string"` applies CSS style to the text. |
| `[font=Courier New]text[/font]` | Applies font to the text. |
| `[highlight]text[/highlight]`<br>`[highlight color=yellow bgcolor=black]Text[/highlight]` | Highlights text with accent color.<br>Optional parameters `bgcolor` and `color` allow to set both background and foreground color for text. |
| `[block]text[/block]` | Defines a text block.<br>Attributes:<br>`width=value` block width. Can be defined in percents (recommended) or other CSS units.<br>`align=left` aligns text horizontally in the block. Possible values: `left`, `center`, `right`<br>`valign=top` aligns text vertically in the block. Possible values: `top`, `middle`, `bottom` |
| `[video]path/to/video.mp4[/video]` | Display video. <br>Attributes:<br>`loop=false` disable video loop.<br>`muted=true` play video muted|
| `[url=https:\/\/atrament.ink]link text[/url]` | Creates a link to an web resource. When clicked, the resource is opened in a new browser tab. *Note: you have to escape "/" symbols in the URL, as shown in the example.* |

Note: it is not possible to wrap multiple paragraphs with these tags. Use `<br>` tag for line breaks if you need multiline text in tags.

#### Tables

You can make tables with the following markup:
```
[table]<>
  [header]Header 1[ ]Header 2[ ]Header 3[/header]<>
	[row]Cell 1[ ]Cell 2[ ]Cell 3[/row]<>
	[row]Cell 4[ ]Cell 5[ ]Cell 6[/row]<>
[/table]
```
Please note `<>` operator at the end of each table line - this is required to render the table properly.

The table consists of header `[header][/header]` (optional) and rows `[row][/row]`. The `[ ]` is a cell separator.

Attributes of the `[table]` tag:
* `border=false` disables table borders.
* `padding=false` disables table cell paddings.
* `columns="20% 20% 60%"` sets column width. You have to set width for each column in the table.

### Overlay

Atrament UI can display custom data (inventory, character stats etc.) as an overlay. 

To display an overlay, authors need to define a button with the `[button]` tag, which calls an Ink function. If the function returns text content, it will be displayed as an overlay. The overlay content can have buttons too.

If the first line of the function is a `[title]Overlay Title[/title]` tag, this title will be displayed in the toolbar.

Example of the toolbar and overlays:
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

### "About" screen

Author can add an "About" screen to the game with the `#about` global tag. When it is set, UI shows "About" button on the main game page. Clicking it will display content from the function in the Ink file - see example:
```
# about: game_about

...

=== function game_about()
  <h1>Game Title</h1>
  "About" screen content
  ...

```

## Customization

### Themes
To add a theme to the application, create a JSON file in the `resources/themes` folder with the following structure:
```
{
  "name": "custom",
  "theme": {
    "bg-color": "#FCFCFC",
    "fg-color": "#5D576B",
    "shade-color": "rgba(0, 0, 0, 0.1)",
    "font-color": "#333333",
    "accent-bg-color": "#FCFCFC",
    "accent-fg-color": "#F7567C",
    "border-radius": "0.5rem",
    "border-radius-inline": "0.25rem"
  }
}
```
| Theme parameter | Description                |
| :-------- | :------------------------- |
| name | Theme display name. |
| bg-color | App background color. |
| fg-color | Primary color for controls. |
| shade-color | Shadows and highlights. |
| font-color | App and game text color. |
| accent-bg-color | Background for accented elements. |
| accent-fg-color | Foreground for accented elements. |
| border-radius | Round the corners of choices, modals, and boxes. |
| border-radius-inline | Round the corners of inline buttons. |

*Note: You can use any valid CSS values for the theme.*

### Fonts
To add a font to the application, create a folder in the `resources/fonts` folder with the following files:
* `index.js` with the following content:
```
import('./index.css');
export default {
  name: 'Font Name',
  fallback: 'sans-serif', // fallback font
};
```
* `index.css`, which includes corresponding `@font-face` directives
* font files, referenced in the `index.css`

To remove font from the application, delete the font folder from `resources/fonts`.

### Custom CSS styles and classes
To add custom CSS classes or modify styles of existing elements, edit `resources/styles/custom.css` file. It contains a list of modifiable element classes for reference.

## Export

Default Atrament UI build, `npm run build-web`, is a web application for web server deployment. However, there are other export modes.

### Single file build
The game can be exported to a standalone web page, which can be opened locally - similar to Inky or Twine web export.

To export game in a single file format, run `npm run build-singlefile` command. The resulting web page files will be in the `build/singlefile` folder.

*Please note: single file build uses only system fonts to reduce file size. If you want to include all fonts from the `resources/fonts` folder, use `npm run build-singlefile -- -- --embed-fonts` command to build the game.*

### Standalone executables build
To build standalone executables for Windows, Linux, and MacOS, use `npm run build-standalone` command. The folder with executables for all platforms will be in the `build/standalone` folder. The build also creates ZIP archives for each platform.

### Zipped game content
Atrament UI supports zipped game content, when whole game is loaded into browser as a single zip file. The advantage of this mode is instant asset loading at the cost of increased startup time. However, it makes sense only for default web export mode.

To enable this feature, edit `atrament.config.json` and add `zip` option to it with the name of zip file:
```
{
  ...
  "game": {
    "path": "game",
    "source": "gamefile.ink",
    "zip": "yourgame.zip"
  }
}
```
*Please note: this option is ignored for development and single file builds.*

## Debugger
When `#debug` global tag is set, debugger can be invoked by pressing debugger button on the screen or double pressing of `~` key.

Atrament Debugger provides the following functionality:

* General information on ink script
* List of global tags
* List of ink variables (view and edit)
* List of visit counts
* Navigation to knot/stich path

## Keyboard shortcuts
| Key | Description                |
| :-------- | :------------------------- |
| 1,2,3... | Select corresponding choice option. |
| Space, Enter | Continue story. |
| Esc | Show/hide settings dialog. |

## Atrament repositories

- [atrament-web](https://github.com/technix/atrament-web)
- [atrament-core](https://github.com/technix/atrament-core)

See also [Atrament core documentation](https://github.com/technix/atrament-core/blob/master/README.md) for additional info on Atrament API.

## LICENSE

Atrament is distributed under [MIT license](LICENSE.md).

Copyright (c) 2023 Serhii "techniX" Mozhaiskyi

Made with the support of the [Interactive Fiction Technology Foundation](https://iftechfoundation.org/)

<img src="https://iftechfoundation.org/logo.svg" width="200px">
