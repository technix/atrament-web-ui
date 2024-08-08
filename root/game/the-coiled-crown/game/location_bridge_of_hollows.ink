// =========================
= location_bridge_of_hollows
# CHECKPOINT
# AUDIOLOOP: music/castle.mp3
# CLEAR
# IMAGE: images/bridge-of-hollows-12.jpg

<h3>Bridge of Hollows</h3>

An enormous keep built from soot-covered limestone rises around you, its looming towers and soaring battlements piercing the gray clouds that hang low in the freezing sky.

Wind whips through abandoned alleys, gloomy alcoves, and decaying courtyards all draped in the shadow of a colossal bridge overhead that leads to the keep entrance.

A flight of stone steps littered with discarded spears rises toward the bridge above.

+ [Climb the stairs up to the bridge] -> limestone_bridge
+ [Explore the castle grounds] -> mausoleums
+ [Go back to the gatehouse] -> location_holy_gatehouse

= limestone_bridge

This colossal limestone bridge is lined with statues of armored warriors, their shields engraved with the likeness of a fearsome woman with fanged teeth and writhing snakes for hair.

The bridge, wide enough for five merchant’s carts to ride side by side, leads to a gargantuan set of double doors inlaid with gems that shimmer the color of fire even in the overcast daylight.

The doors are open ever so slightly, allowing you to slip through and enter the imposing keep.

+ [Slip through the gargantuan doors] -> location_scorched_keep
+ [Climb down the stairs toward the castle grounds] -> location_bridge_of_hollows

= mausoleums
# CLEAR
# IMAGE: images/mausoleums-48.jpg

Wandering the gray, windswept castle grounds, you come across a small graveyard nestled in the shadow of the great stone bridge that looms above you. Toppled and cracked headstones lie face down in the dirt forming a cobblestonelike path toward [red]three mausoleums[/red] that stand among the overgrown roots and weeds.

A sign creaks in the wind. The runes etched onto its surface tell that those interred in this honored graveyard perished while protecting others from the ravenous Carnophage.

* {ELX} [Watch a wandering ghost] -> mausoleum_ghost
+ [Inspect the open mausoleum] -> mausoleum_open
+ [Inspect the closed mausoleum] -> mausoleum_closed
+ [Inspect the cracked mausoleum] -> mausoleum_cracked
+ [Climb the stairs up to the bridge] -> limestone_bridge


= mausoleum_open

The door of this decrepit mausoleum has been pried open, the bent hinges pulled free from the jamb and cast aside in the nearby weeds.

Peering inside, a skeleton reclines on a marble slab, its bones still encased in a suit of rusted plate mail. It clutches a battered two-handed sword in ancient gauntlets, the blade so dull it would struggle to cut parchment. Whatever other relics this warrior was interred with have long since been plundered.

# IMAGE: images/shape-pillar.png
A threadbare tapestry hangs on the mausoleum wall behind the slab. A crude symbol — [red]three lines in the shape of a pillar[/red] — is inked onto the tapestry.

+ [Inspect the other mausoleums] -> mausoleums


= mausoleum_closed

The door of this decrepit mausoleum is sealed with heavy stone and bands of riveted iron.

A threadbare tapestry dangles from a pole that stands next to the door, the fabric billowing in the cold air that whips through this cemetery in the shadow of the great bridge above.

# IMAGE: images/shape-cross.png
The image of a woman in flowing priestess robes has been embroidered onto the tapestry. A nimbus glows above her head and her delicately rendered hands clutch a holy symbol — [red]three lines in the shape of a cross[/red].

+ [Inspect the other mausoleums] -> mausoleums


= mausoleum_cracked

The door of this decrepit mausoleum is sealed with heavy stone and bands of riveted iron.

Peering through a crack in the side of the mausoleum, you can barely make out a robed skeleton resting atop a slab. Talismans and bracelets dangle from the interred sorceress’s feeble bones. Moldy tomes lie stacked on the floor, their pages swollen and rotted with moisture.

# IMAGE: images/shape-bonfire.png
A threadbare tapestry hangs on the mausoleum wall behind the slab. A crude symbol — [red]three lines in the shape of a bonfire[/red] — is inked onto the tapestry.

+ [Inspect the other mausoleums] -> mausoleums

= mausoleum_ghost

A ghostly gorgon in funeral garb wanders the cemetery, stopping occasionally in an attempt to prop up one of the toppled headstones. She lets out a quiet sob each time her ethereal fingers pass through the stone. The gorgon then turns to face you, her petrifying eyes hidden behind a dark funerary veil.

“My devoted daughter,” the gorgon wails. “She is not buried here among the other honored dead. I cannot know peace until I find her resting place. So deep was her faith that, with her final breaths in this world, she [red]sang my prayer[/red].”

She then turns her gaze away and continues to drift through this graveyard in the cold shadow of the colossal bridge.

+ [Leave the ghost to her mourning] -> mausoleums


