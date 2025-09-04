# title: Atrament UI Showcase
# author: Serhii "techniX" Mozhaiskyi
# debug
# font: Lora
# toolbar: game_toolbar
# about: game_about

VAR health = 10
VAR completion = 10
VAR character_name = "John Doe"
VAR empty_text = ""

-> start

=== start ===
# CLEAR
Atrament UI features showcase.
Some items are disabled - it means there is no example available yet.

+ [Game] -> game
+ [Markup] -> markup
+ [Media] -> media

// Game
=== game ===
# CLEAR
Atrament game-related features.

+ [Checkpoints#DISABLED] -> checkpoints
+ [Shuffled choices] -> shuffled_choices
+ [Choice prompt] -> choice_prompt
+ [Click to continue] -> click_to_continue
+ [Input] -> markup_input
+ [<<< Back] -> start

=== checkpoints
TO DO
+ [OK] -> game

=== shuffled_choices
# SHUFFLE_CHOICES
These choices are shuffled.

+ [Choice 1]
    Choice 1 was selected.
+ [Choice 2]
    Choice 2 was selected.
+ [Choice 3#UNCLICKABLE]
+ [Choice 4]
    Choice 4 was selected.
+ [Choice 5]
    Choice 5 was selected.
-
+ [OK] -> game

=== choice_prompt
# PROMPT: What would you like to do?
You can have a prompt before the choices.

+ [Continue]
    You chose to continue.
+ [Proceed]
    You chose to proceed.
+ [Move on]
    You chose to move on.
-
+ [OK] -> game

=== click_to_continue
# CLEAR
Default click to continue. Shows animation after 3 seconds.
+ [>>>]
-
Timed click to continue. Shows animation immediately, continues after 5 seconds.
+ [>>>5]
-
Custom click to continue: no animation, continues in 3 seconds.
+ [>>>(delay=3 animation=10)]
-
Custom click to continue: can't be continued before animation, animation starts after 3 seconds, auto-continue after 6 seconds.
+ [>>>(clickable=3 animation=3 delay=6)]
-
Done.
+ [OK] -> game

=== markup_input
# CLEAR
Text input:
[input var=character_name]
+ [OK]
-
The character name is "{character_name}".
Numeric input:
[input var=completion type=number]
+ [OK]
-
New value is "{completion}".
Input with placeholder:
[input var=empty_text placeholder=Enter some text...]
+ [OK]
-
New value is "{empty_text}".
Done.
+ [OK]
    ~ completion = 10
    ~ character_name = "John Doe"
    ~ empty_text = ""
    -> game

////////////////////////////////////////////////////////////////////////////////////
// Media
=== media ===
# CLEAR
Atrament multimedia features.
+ [Images] -> media_images
+ [Backgrounds] -> media_bgimages
+ [Video] -> media_video
+ [Sound#DISABLED] -> media_sound
+ [Music#DISABLED] -> media_music
+ [<<< Back] -> start

=== media_images
# CLEAR
This is an inline image: [img]fountain-pen.png[/img]. It is created with "img" markup tag and fits into paragraph text.
+ [Next]
-
# IMAGE: rule-book.png
This is an image, set with IMAGE paragraph tag. It is always displayed at the beginning of the paragraph. 
+ [Next]
-
This scene contains an image, set with "picture" markup tag.
It can be placed anywhere. [picture]quill-ink.png[/picture] However, it breaks the text flow.
+ [Next]
-
You can define width of the picture placed with "picture" tag: [picture width=50%]quill-ink.png[/picture] 
+ [Next]
-
You can combine images, placing them in the "block" markup tag.
[block width=33%][picture]fountain-pen.png[/picture][/block][block width=33%][picture]quill-ink.png[/picture][/block][block width=33%][picture]rule-book.png[/picture][/block] 
+ [OK] -> media

=== media_bgimages
# CLEAR
# BACKGROUND: sandbg.jpg
This scene has image as a background, set via "BACKGROUND" paragraph tag.
+ [Next]
-
# BACKGROUND: false
To reset the background, use "BACKGROUND: false".
+ [Next]
-
# PAGE_BACKGROUND: sandbg.jpg
The background outside of text are is set via "PAGE_BACKGROUND" paragraph tag. It is visible only on desktop.
+ [Next]
-
# PAGE_BACKGROUND: false
To reset the page background, use "PAGE_BACKGROUND: false".
+ [OK] -> media

=== media_video
# CLEAR
This paragraph contains video.
[video]https:\/\/storage.googleapis.com\/gtv-videos-bucket\/sample\/ForBiggerEscapes.mp4[/video]
+ [OK] -> media

=== media_sound
# CLEAR
TO DO
+ [OK] -> media

=== media_music
# CLEAR
TO DO
+ [OK] -> media


=== markup ===
# CLEAR
Atrament markup-related features.

+ [Block] -> layout_block
+ [Table] -> layout_table
+ [Info] -> markup_info
+ [Banner] -> markup_banner
+ [Progressbar] -> markup_progress
+ [Spoiler] -> markup_spoiler
+ [CSS, font, highlight] -> markup_css_font_highlight
+ [Link, URL] -> markup_link_url
+ [<<< Back] -> start

=== layout_block
# CLEAR
Two content blocks, distributed evenly.
[block width=50%]This is a first block of content.[/block][block width=50%]Another block of content.[progress value=50][/progress][/block]
+ [Next]
-
Three content blocks with different content alignment.
[block width=33% align=left]Left<br>This text is aligned to the left.[/block][block width=33% align=center]Center<br>This text is centered.[/block][block width=33% align=right]Right<br>This text is aligned to the right.[/block]
+ [Next]
-
Two content blocks with different vertical alignment.
[block width=20%]-<br/>-<br/>-<br/>-[/block][block width=40% valign=top]This text is on top of the block.[/block][block width=40% valign=bottom]This text is aligned to the bottom of the block.[/block]

+ [OK] -> markup

=== layout_table
# CLEAR
Table with header and active content.
[table]<>
[header]Item[ ]Name[ ]Value[/header]<>
[row]1[ ]456[ ][progress value=50][/progress][/row]<>
[row]2[ ][button onclick=stats]Show stats[/button][ ]890[/row]<>
[row]3[ ]67[ ]This is a sample text content[/row]<>
[/table]
+ [Next]
-
Table without header, borders, and paddings. Column width is predefined.
[table border=false padding=false columns="25% 50% 25%"]<>
[row]1[ ]456[ ][progress value=50][/progress][/row]<>
[row]2[ ][button onclick=stats]Show stats[/button][ ]890[/row]<>
[row]3[ ]67[ ]This is a sample text content[/row]<>
[/table]
+ [OK] -> markup

=== markup_link_url
# CLEAR
[link=Next]Link[/link] to choice.
[url=https:\/\/atrament.ink]Link[/url] to external web page.
+ [Next]
-
Choice links are inactive on the inactive scenes. External links are always active.
[link=OK]Link[/link] to choice.
[url=https:\/\/atrament.ink]Link[/url] to external web page.
+ [OK] -> markup

=== markup_progress
# CLEAR
Default progress bar.
[progress value={completion}][/progress]
+ [Next]
-
Progress bar with text.
[progress value={completion}]Completion[/progress]
+ [Next]
-
Progress bar with custom min/max.
[progress value={completion} min=5 max=15]Completion[/progress]
+ [Next]
-
Progress bar with accent style.
[progress value={completion} style=accent]Completion[/progress]
+ [Next]
-
Done.
+ [OK] -> markup

=== markup_spoiler
# CLEAR
One of words in this sentence is [spoiler]hidden[/spoiler] behind spoiler.
Actuallly, you can hide not only words, [spoiler]but the whole sentences or even paragraphs, if it suits your purpose[/spoiler]. Feel free to use this tag when you need to.
+ [OK] -> markup

=== markup_info
# CLEAR
[info]This is information block.[/info]
[info side=accent]This is information block with accent.[/info]
[info side=highlight]This is information block with highlight.[/info]
[info font=system]This is informational message with system font.[/info]
[info font=system side=accent]This is accented informational message with system font.[/info]
+ [OK] -> markup

=== markup_banner
# CLEAR
Default banner.
[banner]Banner[/banner]
Accented banner.
[banner style=accent]Accented Banner[/banner]
All caps.
[banner allcaps=true]All caps banner[/banner]
All together.
[banner style=accent allcaps=true]Another all caps banner[/banner]
+ [OK] -> markup

=== markup_css_font_highlight
# CLEAR
This text has [css style="border: 1px dashed \#990000; padding: 0.1em"]applied CSS style[/css].
This text is [font="Fira Sans"]displayed with Fira Sans font[/font].
This text is [highlight]highlighted[/highlight].
This text is [highlight color=yellow bgcolor=black]yellow highlighted on black background[/highlight].

+ [OK] -> markup

////////////////////////////

=== function game_about()
  [banner]Atrament UI showcase[/banner]
  Demonstrational Ink story to show Atrament UI possibilities.
  Images: [url=https:\/\/game-icons.net]Game-Icons.net[/url], CC BY 3.0
  Background: photo by [url=https:\/\/unsplash.com\/@hdjislk?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash]Daniel Straub[/url] on [url=https:\/\/unsplash.com\/photos\/brown-sands-n5HOJGtYt4Q?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"]Unsplash[/url]

=== function game_toolbar()
  HEALTH: {health}
  [button onclick=stats]Stats[/button]
  [button onclick=stats display=modal]StatsModal[/button]

=== function stats()
  [title]Stats[/title]
  Stats health: {health}
  You can [button=health_plus]increase[/button] or [button=health_minus]decrease[/button] it.
  
=== function health_plus()
  ~ health = health + 1

=== function health_minus()
  ~ health = health - 1
