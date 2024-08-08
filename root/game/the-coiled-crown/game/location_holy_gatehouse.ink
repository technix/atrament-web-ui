
// ============================ HOLY GATEHOUSE ========================
= location_holy_gatehouse
# AUDIOLOOP: music/castle.mp3
# CLEAR
# IMAGE: images/holy-gatehouse-43.jpg

<h3>Holy Gatehouse</h3>
-> gatehouse_entrance

= gatehouse_entrance
Curved rafters support a domed ceiling that rises high above this shadowy gatehouse. Ornate columns set into the walls and pillars are carved in the likeness of a crowned woman in flowing robes decorated with swirling fire.

Polished marble stairs rise along the walls, curving upward toward a heavy brass door high above that leads into the stone of the cliff face itself.

A statue of an armored paladin stands in the center of the gatehouse amid a ring of pillars, shield and cudgel gripped tightly in gauntleted hands painted the color of embers. A kneeling stone rests at the statue’s feet.

+ [Kneel at the statue] -> kneel_paladin
+ [Climb the stairs toward the brass door] -> gatehouse_brass_doors
+ [Go to the forest] -> location_forest_cliff_face

= kneel_paladin
# IMAGE: images/paladin-84.jpg

You lower your sword and kneel at the paladin statue’s feet. When you feel the scratch of the stone against your knees, your weight shifts and it descends an inch into the floor with a soft click.

A tentative young woman’s voice rings from within the brass statue as if it were hollow:

“This fortress stands as a monument to our great queen. It is a haven to those who would move through this world in the same manner she once did, when the bonfires still burned. Pray tell, traveler, do you lead, or is it better to follow?”

+ [Say “I lead”] -> say_lead
+ [Say “It is better to follow”] -> say_follow
+ [Say nothing and stand back up] -> gatehouse_entrance

= say_follow

The voice inside the hollow brass paladin statue breathes a ringing sigh of despair.

“It brings me no joy to do this.”

Clanging gears rattle within the statue, followed by a cloud of noxious dust that issues from the seams of the breastplate.

+ [Jump up from the kneeling stone]
-
# IMAGE: images/fire-19.jpg
You jump up from the kneeling stone, but not before the billowing dust surrounds you, filling your mouth, nose, and eyes.

Through fits of painful coughing and choking, you fall to the ground, the paladin statue towering over you as your vision {PTN:blurs|fades to tearful darkness}.

+ {PTN} [Drink the healing potion]
    You feel for the healing potion at your side and drink it, the chalky fluid soothing your burning insides. Still on your back, you wipe tears from your swollen eyes.
    >>- You no longer have the <b>healing potion</b>.
    ~ PTN = false
    + + [Move away from statue] -> gatehouse_entrance
+ {not PTN} [Try to breathe]
    # AUDIOLOOP: music/death.mp3
    You hear quiet sobbing from within the hollow breastplate of the statue.
    >>! YOU DIED
    -> endgame

= say_lead
The voice inside the hollow brass paladin statue breathes a ringing sigh of relief. “Just as our queen demands.”
Clanging gears rattle within the statue, followed by a cloud of dust that issues from the seams of the breastplate. The visor of the helmet opens with a creak.

+ [Peer inside the helmet]
-
You stand from the kneeling stone and peer inside the helmet to see a dimly glowing chunk of everburning coal. 
{not EBC:
    Feeling expectant eyes upon you, you grab the coal with gloved hands, the warmth comforting.
    >>+ You now have the <b>everburning coal</b>.
    ~ EBC = true
}
+ [Move away from statue] -> gatehouse_entrance


= gatehouse_brass_doors
Deep shadows dance across the sprawling baroque reliefs set into the face of this heavy brass door.
The door has a seam down the middle but no visible handles.
A polished plaque riveted onto the door reads: “Speak the name of our holy queen to pass into her sacred keep.”
You think back to some of the names you’ve heard in passing during your journey to claim the Coiled Crown ...
+ [Speak “Iryea”] -> gatehouse_brass_doors_death
+ [Speak “Kaldera”] -> p50
+ [Speak “Euryale”] -> gatehouse_brass_doors_death
+ [Say nothing and go back down the stairs] -> gatehouse_entrance


= gatehouse_brass_doors_death

You hear the sound of gears turning and tumblers clicking from within the heavy brass door. You step back, expecting a trap, but instead are greeted with a final loud thunk, the sound of a heavy lock sliding into place, and then silence.

+ [Speak other names]
-
You try to speak the other names you’ve heard on your journey, but to no avail. Undeterred, you spend the next several hours seeking another path forward, but find no means to bypass the great door.
+ [Wait]
-
# AUDIOLOOP: music/death.mp3
Hours turn to days and days turn to weeks, until finally you collapse from hunger, dirty fingers scratching at the sealed brass door.
>>! YOU DIED
-> endgame

= p50
# IMAGE: images/door-72.jpg
You hear the sound of gears turning and tumblers clicking from within the heavy brass door.
You step back, expecting a trap, but instead are greeted with a loud thunk and the groaning of the door slowly opening into an unworked dark tunnel that leads directly into the cliff face.
+ [Enter through the brass door] -> p72
+ [Go back down the stairs] -> gatehouse_entrance
+ [Leave the gatehouse and go back out into the forest] -> location_forest_cliff_face

= p72
The dark, unworked tunnel stretches hundreds of feet into the cliff face before giving way to smooth walls of tightly fitted limestone.
Silvery shafts of daylight shine through narrow barred windows onto an unassuming wooden door painted red, the flecks of peeling paint like a path of rose petals.
The door’s iron bands rattle with each gust of wind that howls from outside.

+ [Open the door and step outside] -> location_bridge_of_hollows
+ [Go back to the gatehouse] -> gatehouse_entrance
