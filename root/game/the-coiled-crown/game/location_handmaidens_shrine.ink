// =================
= location_handmaidens_shrine
# CHECKPOINT
# AUDIOLOOP: music/shrine.mp3
# CLEAR
# IMAGE: images/handmaidens-shrine-36.jpg
<h3>Handmaiden's Shrine</h3>

Torrents of water issue from the mouths of ornate figures carved into the root-covered walls of this crumbling shrine.
Alcoves in the stone walls, once overflowing with offerings to some unknown goddess, now sit empty, their contents long since plundered by others who journeyed this way in search of the Coiled Crown.
A large bell hangs from a rusted post nearby, the light of a lantern reflected in its intricately carved surface.
Part of the floor has collapsed, leaving a wide hole down into a mossy cave beneath your feet.

+ [Approach the bell] -> shrine_bell
+ [Jump down into the mossy cave] -> location_mossy_cave

= shrine_bell
# IMAGE: images/bell-82.jpg
Occult symbols and an inscription carefully etched in tiny letters cover the surface of this large bell.
Patches of rust and discoloration streak across the bell, as if it had hung here exposed to the elements for a thousand years.

- (opts)
+ {TURNS_SINCE(-> inscription_bell) != 0} [Read the inscription on the bell] -> inscription_bell
* [Ring the bell] -> ring_bell
+ [Leave the bell alone and exit the shrine] -> location_cave_exit

- (inscription_bell)
The inscription in tiny letters reads:
“When the first handmaiden [red]Iryea[/red] fell ill to the Carnophage and her song no longer resounded through the halls of our Keep, our queen forged this great bell in her memory so that her song would ring eternal. This memorial bell is to be hung in the serene forest outside the Keep where the maiden so loved to wander. The mournful procession shall leave fragrant [red]lilacs[/red] along the wooded path, as such flowers brightened our beloved handmaid’s last days.”
-> opts

- (ring_bell)
The tolling of the bell resounds through the silent forest below, the sound rattling across needle-like branches and echoing through ruined shrines long since abandoned by those who once dwelled in this world. The branches beneath your feet twist and writhe like snakes before shaping themselves into the likeness of a horned woman. She speaks with a voice like wind rustling through the falling leaves of autumn.
+ [Listen]
-
“From her throne atop the Scorched Keep, the great queen [red]Kaldera[/red] once ruled over this land full of color and song, her divine bonfires driving away the nether spirits that now blanket our world in shadows and silence. Altars to the high goddess [red]Euryale[/red], who watched over the people of this land, crumble as the ages pass and the crown goes unworn.”
+ [Continue listening]
-
“To have rung this blessed bell is to declare to this world that you seek the Coiled Crown once worn by our queen — I am bound to offer you one of her blessings so that you might face the malice that haunts her ruined stronghold.”
+ [Continue listening]
-
“You may choose to accept her blessing of fire. Fire [red]drives away what stalks in the dark[/red], but may also make ashes of what you treasure most.”
“Or, you may choose to accept her blessing of iron. Iron [red]turns away the piercing spear[/red], but may also weigh you down when you must tread lightly.”
+ [Accept the blessing of fire] -> blessing_of_fire
+ [Accept the blessing of iron] -> blessing_of_iron


- (blessing_of_fire)
You feel a warmth spread through your body. Your eyes crackle like the flames of a campfire and your fingertips glow a dull red.
“Seek the Scorched Keep,” the dryad whispers. “The Coiled Crown awaits you there.”
The bell tolls one final time, and the dryad melts back into the tangle of branches beneath your boots.
>>+ You now have the <b>blessing of fire</b>.
~ BFR = true

-> opts

- (blessing_of_iron)
You feel a warmth spread through your body. Your eyes glitter like sunlight off a knight’s shield and your heart swells with courage.
“Seek the Scorched Keep,” the dryad whispers. “The Coiled Crown awaits you there.”
The bell tolls one final time, and the dryad melts back into the tangle of branches beneath your boots.
>>+ You now have the <b>blessing of iron</b>.
~ BIR = true

-> opts


