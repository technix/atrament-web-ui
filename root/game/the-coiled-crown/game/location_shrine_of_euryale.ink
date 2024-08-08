= location_shrine_of_euryale
# CHECKPOINT
# AUDIOLOOP: music/shrine.mp3
# CLEAR
# IMAGE: images/shrine-of-euryale-38.jpg
<h3>Shrine of Euryale</h3>

- (shrine_entrance)

Thick smoke clings to every surface of this shrine lit by hundreds of everburning candles. Slabs of stone depicting a sneering woman with fanged teeth and snakes for hair lie propped against the tar-coated walls.

A stone idol kneels in the center of the shrine, her body decorated with coiled patterns, her hands folded in prayer above a brazier filled with expired coals.

An archway is set into the shrine walls to both the left and the right, each covered by a curtain of fire beads on copper thread.

+ [Inspect the stone idol] -> stone_idol
+ [Pass through the curtain of fire beads to the left] -> curtain_left
+ [Pass through the curtain of fire beads to the right] -> curtain_right
+ [Go back out onto the balcony] -> location_limestone_balcony


- (stone_idol)
# IMAGE: images/stone-idol-75.jpg
The stone idol is hewn in the likeness of a long-haired woman in a tattered gown. Symbols of writhing snakes and dancing flames are etched onto her body, their curves drawing your eye toward the expired brazier at her feet.

An inscription is etched around her neck like a pendant. Tracing your fingers over the inscription, you see it is written in a language you can’t understand.

{ELX: A ghostly woman in a tattered gown sits on the back of the stone idol, her feet dangling impatiently as if waiting for someone.}

- (stone_idol_options)
+ {EBC} [Put everburning coal into the brazier]
    You toss the everburning coal into the brazier. Thick smoke billows from the glowing coals and forms into the shape of a coiled serpent with a woman’s face.
    
    The smoky apparition hisses at you: “Sseek the ssinging ssister. Ssing her ssacred sscroll amid the [red]sstained and sshattered[/red].”
    
    Just as quickly as the serpent-woman appeared, she dissipates.
+ {ELX} [Watch the ghost]
    The ghost peers down at you from her perch atop the stone idol and speaks:
    
    “My mother seeks in agony my final resting place in the [red]tombs outside this holy keep[/red]. Woefully, she does not know that my body and spirit are bound to this forgotten shrine, and so I must wait for her.”
	// + [To venture back outside the Scorched Keep] -> location_bridge_of_hollows
+ {RVK} [Examine the inscription closely]
    As if by some miracle, the heretofore unintelligible inscription across the collarbone of the stone idol shifts into writing you can understand:
    
    “The maiden Althea with her gaze so disarming was said to be the daughter of Euryale herself. Rather than suffer the ravages of the Carnophage, Althea cried out to her divine mother and was turned to stone so that she would never know the cruel fever that heralded the end. So deep was Althea’s faith that she sang with her last breath: ‘Bless my serpent tongue and heart of stone.’”
+ [Step away from the idol] -> shrine_entrance
- 
-> stone_idol_options


= curtain_left
This alcove is filled with the smoke of a burning pyre set against the far wall. Hundreds of everburning candles surround the pyre, the wax collecting into brass bowls etched with snaking patterns.

# IMAGE: images/shape-pillar.png
Drawing nearer to the pyre, you see that only ashes remain of whatever proud servant of the queen was immolated here. However, a stone slab set into the base of the pyre has been etched with the symbol of [red]three lines in the shape of a pillar[/red].

- (curtain_left_opts)
+ {ELX} [Watch the ghosts]
    A phantom warrior in plate armor rests atop the pyre amid the flames.
    # IMAGE: images/shape-pillar.png
    A ghostly priestess stands above the burning warrior, her silent lips mouthing a petition to the goddess Euryale to rid the deceased’s heart of guilt and make them light enough to pass into paradise.
+ {BMK} [Put burial mask on]
    You hold the burial mask over the roiling pyre flames, the brass glowing red hot. After hesitating, you thrust the mask onto your face. You expect blinding pain, but instead feel only a gentle, soothing warmth, as if you had submerged your head into a bath. Suddenly, a gentle voice fills your mind:
    “Euryale’s prayer is the key to the Throne of Cinder and the Coiled Crown you seek.”
    The brass burial mask then melts away from your face, collecting into a pool of rapidly cooling metal at your feet.
    >>+ You have received the <b>revelation of Kaldera</b>. 
    >>- You no longer have the <b>brass burial mask</b>.
    ~ RVK = true
    ~ BMK = false
+ [Go back out to the shrine] -> location_shrine_of_euryale
-
-> curtain_left_opts


= curtain_right

This alcove is filled with the smoke of a burning pyre set against the far wall. Hundreds of everburning candles surround the pyre, the wax collecting into brass bowls etched with snaking patterns.

# IMAGE: images/shape-cross.png
Drawing nearer to the pyre, you see that only ashes remain of whatever proud servant of the queen was immolated here. However, a stone slab set into the base of the pyre has been etched with the symbol of [red]three lines in the shape of a cross[/red].

- (curtain_right_opts)
+ {ELX} [Watch the ghosts]
    A phantom priestess clutching a holy symbol rests atop the pyre amid the flames.
    # IMAGE: images/shape-cross.png
    A ghostly maiden stands above the burning priestess, her silent lips mouthing a petition to the goddess Euryale to rid the deceased’s heart of guilt and make them light enough to pass into paradise.
+ {BMK} [Put burial mask on] -> burial_mask_on
+ [Go back out to the shrine] -> location_shrine_of_euryale
- 
-> curtain_right_opts

= burial_mask_on
You hold the burial mask over the roiling pyre flames, the brass glowing red hot. After hesitating for a moment, you thrust the mask onto your face.

Scorching heat and blinding pain shoots through your body. You shriek in agony, the sound muffled by the mask.

You try to throw the mask off your face, but it begins to melt and harden over your eyes, nose, and mouth.

+ {PTN} [Use the healing potion]
    # IMAGE: images/brass-71.jpg
    In desperation you grab the healing potion from your belt and pour it over your face. Luckily, the magic liquid loosens and cools the searing mask.
    You toss the misshapen chunk of brass into the corner of the shrine, knocking over several everburning candles in the process, and wipe the soot and tears from your swollen eyes.
    >>- You no longer have the <b>healing potion</b>.
    ~ PTN = false
    + + [Return to the shrine] -> location_shrine_of_euryale
+ {not PTN} [Try to throw off the mask]
    # AUDIOLOOP: music/death.mp3
    You try to throw the mask off your face, but it begins to melt and harden over your eyes, nose, and mouth.
    You fall to the ground and lose consciousness, the molten mask on your face twisted into an eternally screaming visage.
    >>! YOU DIED
    -> endgame
