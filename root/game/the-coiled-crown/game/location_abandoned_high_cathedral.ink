= location_abandoned_high_cathedral
# AUDIOLOOP: music/cathedral.mp3
# CLEAR
# IMAGE: images/high-cathedral-22.jpg

<h3>Abandoned High Cathedral</h3>

Stained glass windows and joyous murals surround an airy cathedral lined with decorative columns and polished wooden pews. The scratching of tall evergreen trees against the stained glass windows echoes through the cathedral with each gust of wind from outside.

A statue of a smiling hooded woman holding a bowl of writhing snakes stands at the head of the cathedral, her gaze cast down on a marble altar draped with a gilded tapestry.

Skeletons, their bones flecked with patches of green discoloration, litter the pews, many still facing the high altar in positions of prayer.

- (cathedral_opts)
+ {TURNS_SINCE(-> cathedral_altar) == 0 and not BMK} [Take the burial mask] -> cathedral_burial_mask
+ {TURNS_SINCE(-> cathedral_stained_windows) == 0 and HMD} [Read hymn of mending] -> cathedral_hymn_of_mending
+ {TURNS_SINCE(-> cathedral_altar) != 0} [Approach the altar] -> cathedral_altar
+ {TURNS_SINCE(-> cathedral_stained_windows) != 0} [Look upon the stained glass windows] -> cathedral_stained_windows
+ [Go back out onto the balcony] -> location_limestone_balcony

- (cathedral_altar)

Candles, incense, bowls, and polished bells sit meticulously arranged atop an altar covered in a gilded tapestry.

The statue of a hooded priestess clutching a bowl of stone snakes towers over you from behind the altar. The soft face of the priestess has been painted over with a hasty “X” the color of blood.

{not BMK: A brass burial mask rests atop the altar amid the other ceremonial relics.}

-> cathedral_opts

- (cathedral_stained_windows)
# IMAGE: images/stained-windows-27.jpg
You gaze upon the stained glass windows that line the cathedral walls high above. Three windows, larger than the others, are set into the wall above the altar.
The first window shows a fiery-haired woman descending from the mountains, [red]burial mask in hand[/red].
The second window has [red]shattered[/red] and lies in a heap of prismatic glass shards on the cold limestone floor.
The third window shows the woman [red]pressing the mask to her face[/red], tongues of flame issuing from the now-red mask.
-> cathedral_opts

- (cathedral_hymn_of_mending)

You pull the hymn of mending from your pack and unroll it, the inked letters glowing faintly in the overcast daylight that shines through the stained glass windows above. You speak the words gently at first, but with each verse your voice grows louder and more confident until it echoes through the pews.

The shards of glass on the floor rattle and sparks of magic dance between them. You watch as the stained glass window pulls itself back together, piece by piece, revealing the hidden second image of the three-window sequence: the woman heating the burial mask in the flames of a [red]pyre atop which a slain armored warrior rests[/red]. A moment later, the stained glass window falls to pieces once again.

-> cathedral_opts

- (cathedral_burial_mask)
# IMAGE: images/altar-73.jpg
You lift the mask from the altar, the delicate features of the face reflecting your own stern visage.

>>+ You now have the <b>brass burial mask</b>.
~ BMK = true

-> cathedral_opts





