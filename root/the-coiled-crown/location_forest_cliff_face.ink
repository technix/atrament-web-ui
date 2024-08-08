// =======================
= location_forest_cliff_face
# AUDIOLOOP: music/forest.mp3
# CLEAR
{location_forest_cliff_face > 1: You stand atop a cliff face overlooking a silent forest of evergreen trees draped in thick fog. The overcast sky shifts to a dull purple as whatever sun lights this world descends beneath some distant unseen mountain range.}

Peering over the cliff face, you see handholds carved into the rock, allowing you to climb down in relative safety should you so choose.

The dirt path turns to the left and follows the cliff edge toward a hazy spot of lantern light in the distance.

+ [Follow the path toward the lantern light] -> lantern_path
+ [Climb down the cliff face] -> cliff_down

= lantern_path

The narrow dirt path winds along the edge of the cliff face. Drawing nearer to the lantern light in the distance, you hear a sound that breaks the otherwise oppressive silence of the forest — the trickling of water.

+ [Move on]
-

You pass through a break in the fog to see thin sheets of water pouring down the side of a root-choked cliff face. An opening in the cliff, draped in shadows, is visible behind the waterfall.

Peering up toward the deepening violet sky, you see handholds carved into the rock. They ascend toward a crumbling stone structure nestled among the misty trees atop the cliff. A dim lantern burns on a ruined wall up above.

+ [Climb up toward the stone structure] -> location_handmaidens_shrine 
+ [Squeeze through the cave opening] -> location_mossy_cave

= cliff_down
# IMAGE: images/cliff-85.jpg

You climb down the side of the cliff, dirt and oily slime collecting underneath your fingernails. The evergreen trees now loom over you, silent.

Another narrow dirt path leads into the fog ahead of you, this time splitting into a number of forks that stretch off in all directions. It looks easy to get [red]lost[/red] down here.

+ [Continue into the evergreen forest] -> death_lost_in_the_woods
+ {BMP} [Follow the markings on a burnt map] -> follow_burnt_map
+ [Climb back up the cliff face] -> location_forest_cliff_face


= death_lost_in_the_woods
You wander through the fog-draped forest and quickly become lost. As the sun sets and darkness creeps over this silent netherworld, the cold pierces you to the bone and becomes unbearable.

+ [Pull your cloak tight]
-
# AUDIOLOOP: music/death.mp3
You pull your hooded cloak tight and curl up against a fallen tree trunk, teeth chattering. With no moon, you cannot even see the clouds of your last breaths or the reddening of your frostbitten skin before you drift into a numb sleep.
>>! YOU DIED
-> endgame

= follow_burnt_map

You follow the markings on the soot-covered map, the lines of faded ink leading you through a twisting maze of overgrown dirt paths.

The paths converge at a towering domed structure erected into the side of a steep cliff face. The roof of the building rises out of sight above the canopy of branches overhead. Dirty stained glass windows ring the structure, their darkened frames thick with cobwebs.

Many of the windows are broken, fallen shards of glass in cold colors stuck upright in the ground at the base of the structure like rigid flowers.

+ [Enter the domed structure] -> location_holy_gatehouse
+ [Go back to the cliff face] -> location_forest_cliff_face
