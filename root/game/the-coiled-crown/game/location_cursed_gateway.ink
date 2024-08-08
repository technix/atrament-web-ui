= location_cursed_gateway
# AUDIOLOOP: false
# CLEAR
# IMAGE: images/cursed-gateway-74.jpg
<h3>Cursed Gateway</h3>

Dark algae-coated water fills this vast cistern that sprawls under the Scorched Keep. Dim torches sputter and crackle beneath an endless spray of water that drips from the glistening ceiling above.
A ledge just wide enough for you to shimmy across leads along the cistern wall toward an open portcullis to the left.
A small rowboat floats nearby, moored to a piton with frayed rope. The vessel looks sturdy despite its age, though you’re not sure it could support the weight of more than one person.

+ {not SNK} [Follow the ledge into the portcullis] -> portcullis
+ [Climb into the rowboat] -> rowboat
+ [Go back to the lift] -> location_lift


= rowboat
# IMAGE: images/skulls-06.jpg

You climb into the rowboat as gingerly as you can manage. The swollen wooden planks groan beneath your boots and the frayed rope mooring the vessel to the cistern entrance slowly begins to pull apart.

+ [Row a boat]
{
    - BIR:
        -> death_cursed_gateway
    - else:
        -> p53
}

= death_cursed_gateway
# AUDIOLOOP: music/death.mp3
For a moment, you feel steady. Suddenly, the wooden boat buckles and splinters beneath your boots and you plunge into the dark, dirty water.
As if dragged down by supernatural iron weights, you sink deeper into the frigid water of the cistern, the dim torchlight above slowly fading to an all-encompassing darkness.
>>> Your <b>blessing of iron</b> weighed you down.
>>! YOU DIED
-> endgame

= p53
# IMAGE: images/cistern-53.jpg

You manage to steady the vessel. Two cracked oars lie underneath the boat’s bench, which you pull from the grime and dip into the water.
After rowing for a few minutes, you come to a large reservoir at the end of the maze-like cistern filled with sediment and slimes of various sickening colors.
The mottled remains of a squid-like creature decompose in the corner of the reservoir, tiny grubs eating at the rubbery flesh that shimmers in the dim torchlight.
You feel a [red]chilling presence[/red].

+ {ELX} [Watch the ghosts] -> cursed_gateway_ghosts
+ [Row back to the cistern] -> location_cursed_gateway

= cursed_gateway_ghosts

A phantasmal woman hovers here, her eyes darkened by tears that drip into the murky water beneath her feet. A pile of slain ethereal knights surround her — each has their helmet removed to reveal sucking squid-like creatures covering their faces.
A ghostly young girl sits in the shallow water near the phantasmal woman. She bundles together colorless phantom flowers taken from the [red]garlands atop her head[/red] and sets them afloat on the cistern’s current.

+ [Row back to the cistern] -> location_cursed_gateway


= portcullis
# IMAGE: images/candles-16.jpg
A pair of brass sarcophagi recline in this damp tomb hidden beneath the Scorched Keep. Wet, muddy hand prints cover both sarcophagi, as if some frail creature had slithered from the cistern and tried to lift open the heavy cover plates.
Both sarcophagi are identical, except for the coiled patterns painted onto the cover plates: [red]black paint[/red] applied to the sarcophagus on the left, [red]white paint[/red] on the right.
Bouquets of dead flower stems float in the ankle-high water at the foot of each sarcophagus, the color of the ribbons binding the stems matching the color used to paint the sarcophagi.

- (opts_portcullis)
* [Gather up the bouquets of dead flowers] -> take_flowers
+ [Open the sarcophagus painted black] -> sarcophagus_black
+ [Open the sarcophagus painted white] -> sarcophagus_white
+ [Return to the cistern] -> location_cursed_gateway

- (take_flowers)
You collect the bundles of dead flower stems from the murky puddles of water that lap at the base of each sarcophagus.
>>+ You now have a <b>bouquet of dead flower stems bound in black ribbon</b>.
~ FLB = true
>>+ You now have a <b>bouquet of dead flower stems bound in white ribbon</b>.
~ FLW = true
-> opts_portcullis

- (sarcophagus_black)
With a groan, you throw open the sarcophagus painted with flowering black lines.
Before the cover plate can even crash to the floor, a volley of whistling darts sprays out from within the sarcophagus, their poisonous tips piercing your leather armor and bruised skin.
A numbing cold spreads through your body and you fall to your knees.

+ {PTN} [Drink the healing potion]
    # IMAGE: images/water-42.jpg
    Quickly, you pull the healing potion from your pack and drink the chalky fluid. The numbness and chills subside and you stagger to your feet.
    Just as you recover your balance against the slimy walls, the ground beneath your feet gives way. Both sarcophagi tumble into a deep pool of pitch-black water — and if you don’t move quickly, you will as well.
    >>- You no longer have the <b>healing potion</b>.
    ~ PTN = false
    The sarcophagi have sunk into the cistern [SNK].
    ~ SNK = true
    + + [Return to the cistern] -> location_cursed_gateway
+ {not PTN} [Try to get away]
    # AUDIOLOOP: music/death.mp3
    The last thing you hear before you lose consciousness is the soft brushing of the dead bouquets beneath your body and the ceaseless dripping of water into the cistern behind you.
    >>! YOU DIED
    -> endgame

- (sarcophagus_white)
With a groan, you throw open the sarcophagus painted with flowering white lines. The heavy cover plate crashes to the floor, the impact sending thousands of water droplets splashing down into the cistern behind you.

+ [Look inside]
-
You see inside the tomb a cage-like effigy of a woman made from brass wire, its interior stuffed with dessicated lilac petals. You reach into the sarcophagus, the stiff petals crumbling from your touch. A gentle voice fills your mind:
“Euryale’s prayer is the key to the Throne of Cinder and the Coiled Crown you seek.”

>>+ You have received the <b>revelation of Kaldera</b>.
~ RVK = true

+ [Return to the cistern] -> location_cursed_gateway



