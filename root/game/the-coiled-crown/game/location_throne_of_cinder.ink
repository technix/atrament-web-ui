= location_throne_of_cinder
# AUDIOLOOP: music/kaldera.mp3
# CLEAR
# IMAGE: images/cinder-96.jpg
<h3>Throne of Cinder</h3>

The white fog gate dissipates, revealing an impossibly large cavern dotted with crumbling pillars, toppled statues, and the tattered banners of a benighted kingdom.

A low flight of broad steps leads up toward a throne of volcanic glass, its jagged outline silhouetted by the glowing of lava floes in the distance. A shadowy figure rises from the throne, casts off her cloak, and steps forward. A crown of coiled brass snakes is visible atop her head.

+ [Step forward]
-

# IMAGE: images/kaldera-97.jpg
You step forward to face the shadowy figure. The churning of the lava floes becomes more violent, casting deep crimson shadows along the rows of columns and towering statues that surround you in this throne cavern.

“You’ve come for my crown, seeker,” the figure intones. When your eyes adjust to the gloom, you make out the unmistakable figure of Kaldera, her body little more than dripping shadows and clouds of ash beneath the sparkling crown.

+ [Brace yourself]
-
Kaldera raises a cruel barbed spear that glows like a weapon just pulled from a forge. Arcing her lithe arms back, she prepares to cast her spear with the wrath of the ancient gods.

You dart your eyes around the unfamiliar cave in search of an advantage, but spy only a maze of pitch-dark passageways beyond the pillars, the red eyes of stalking undead peering out.

+ [Dodge into the pitch-dark passageways] -> throne_passageways
+ [Stand resolute and take the hit] -> throne_hit


= throne_passageways
You duck into the labyrinth of pitch-dark side passages, hoping to lose the pursuing wraith queen and evade her fiery wrath.
The red eyes you spied from the throne surround you, growing more numerous with each labored breath you take. The sound of snapping jaws and flapping wings grows louder as the eyes draw closer.
You feel that you are surrounded here in the dark.
+ [Wait]
-
{BFR: Suddenly, bright flames like sunlight erupt from your eyes, frightening away the undead — you have been protected by the <b>blessing of fire</b>.|Suddenly, you are pinned by a swarm of undead, their teeth, claws, and wings slicing open your leather armor and digging into your flesh.}
+ {BFR} [Run]
    Using the blessed light as a guide, you sprint through the maze of hallways and staircases until reaching a balcony directly above an enraged Kaldera.
    Before she realizes your maneuver, you shove an armored statue from the balcony down upon her, crushing her incorporeal form in an avalanche of stone.
    + + [Claim the Coiled Crown] -> claim_the_crown
+ {not BFR} [Run]
    # AUDIOLOOP: music/death.mp3
    You flail in an attempt to drive away the horde.
    Kaldera approaches you in your agony from the darkness, kneels down, and whispers to you:
    “Oh, to have journeyed so far, only to fall so close to what you sought.”
    >>! YOU DIED
    -> endgame

= throne_hit
You lock eyes with Kaldera and stare her down. She snarls back at you, her throat roaring with a deep red like the stoked coals of a brazier.
With an otherworldly shriek, she hurls her fiery spear at you with supernatural speed, an arcing trail of embers lingering in the darkness behind it.
{BIR:You expect to feel the sharp immobilizing pain of the spear tip, but instead the weapon is deflected as if your body had been encased in enchanted plate armor — you have been protected by the <b>blessing of iron</b>.|The point of the spear plunges into your chest, the searing pain spreading through your body in an instant.}
+ {BIR} [Throw the spear]
    # IMAGE: images/sparks-103.jpg
    You pick up the spear and hurl it back at Kaldera. Despite her incorporeal form, the burning spear pierces her chest and she collapses in a heap near her ruined throne.
    + + [Claim the Coiled Crown] -> claim_the_crown
+ {not BIR} [Fall to your knees]
    # AUDIOLOOP: music/death.mp3
    You fall to your knees and watch as your cloak, leather armor, and flesh peel away like parchment thrown into a bonfire.
    Kaldera approaches you in your agony, kneels down, and whispers to you:
    “Oh, to have journeyed so far, only to fall so close to what you sought.”
    >>! YOU DIED
    -> endgame

= claim_the_crown
# AUDIOLOOP: music/finale.mp3
# CLEAR
# IMAGE: images/soot-104.jpg
You approach Kaldera with your longsword at the ready. Drawing close, she reaches up at you with lanky arms in a feeble attempt to strike you. With a shout that reverberates through the entire Scorched Keep and the forest beyond, you plunge your blade into Kaldera’s inky undead form. She lets out a hoarse cry before her body runs like molten tar down the steps leading to her empty throne.

You kneel down and pull the [red]Coiled Crown[/red] from the puddle of boiling sludge, long strands of tar dripping from the tangle of brass snakes and polished gems and sticking to your hands. At long last, you have claimed what you have come for. <b>And now, there is one final decision you must make</b>.

+ [Leave this world] -> finale_1
+ [Remain in this world] -> finale_2

= finale_1
# CLEAR
# IMAGE: images/leave-105.jpg
Coiled Crown in hand, you turn away from the seeping tar-like remains of Kaldera and march toward an enormous glowing door at the head of this sprawling cavern. Blinding light glows through the seams. You tighten your grip on the Crown and, in a triumphant voice, shout for the portal to open back to your own world.
You have no desire to rule, to enmesh yourself in the petty squabbles of heirs, of courtiers, of merchants. You have no taste for the raising of monuments or the waging of war. You simply desire to be left alone, to indulge in your own appetites; and with the gold you’ll fetch for the crown you’ve claimed, a life of luxurious solitude awaits you back in the mortal realm.
>>@ VICTORY ACHIEVED
-> END

= finale_2
# CLEAR
# IMAGE: images/stay-106.jpg
Coiled Crown in hand, you turn away from the seeping tar-like remains of Kaldera and march toward the throne of volcanic glass that sits at the head of this sprawling cavern. You let out an exhausted sigh and drop onto the throne. Looking around, you see in the gloom statues of a regal woman, a fierce but fair ruler to her people that adored her so. Never in your past life did you command such attention, such respect, such love. 
With trembling fingers you place the mythic crown atop your head. Strangely, it is a perfect fit, as if fate had brought you to this throne, as if you were destined to breathe fire back into this dark world and raise its faithful people to glory once more.
>>@ VICTORY ACHIEVED
-> END
