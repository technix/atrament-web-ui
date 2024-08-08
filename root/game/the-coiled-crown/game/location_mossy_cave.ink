// ============
= location_mossy_cave
# AUDIOLOOP: music/forest.mp3
# CLEAR
<h3>Mossy Cave</h3>

Streams of dirty water pour from an opening in the ceiling of this cramped cave, the droplets falling onto a long-since expired campfire on the ground.

The fading purple daylight glimmers off an ornate bell visible through the hole high above, far out of reach.

A low tunnel leads further into the cave. When your eyes adjust to the gloom, you can see the flickering of candles at the tunnel’s far end.

{not BMP: You spy amid the charred wood and rocks at your feet a scroll tube covered in soot.}

- (opts)

+ {not BMP} [Take the scroll tube]
    You rescue the scroll tube from the spent campfire and brush off the soot with gloved fingers.
    
    Pulling open the stopper, a piece of dirty parchment falls into your hands. Unfurling it, you see it is a crudely drawn map showing many [red]twisting path[/red] leading toward a domed structure.
    
    >>+ You now have the <b>burnt map</b>.
    ~ BMP = true
    -> opts
+ [Push farther into the cave] -> witch_cave

= witch_cave
# IMAGE: images/witch-77.jpg

A black-clad young witch sits atop a bed of branches she has made for herself in this claustrophobic cave. The hovel is lit only by pungent candles and the flickering faces of jacko’- lanterns. Her gaze is cast downward, her painted fingers smudging wax across the skull of some captured forest creature. She [red]sings a gloomy song[/red] in an unknown language.

{WFG: The witch looks up, breathes deep of the air, and smiles. “I smell that figurine you carry, seeker of the crown. If you like, I can melt that figurine into a healing liquid to fill that empty vial of yours. Or, if you desire something stronger, you might offer it to my sister beneath the Scorched Keep, who can use it to mix a much more potent elixir.”}

- (opts)
+ {WFG} [Give the witch the wax figurine]
    The witch takes the phoenix figurine and tosses it into a tin pot boiling atop a bed of glowing coals. Stirring it with a thin bone, the figurine melts into a thick sludge the color of rotten berries.
    
    She motions in a hurry for your empty vial. “Quick, before it sets!”
    
    + + [Give the witch the empty vial]
        You hand her the vial and she pours the substance in, the glass fogging up from the heat.
        
        She hands the heavy vial back to you and picks up her waxcoated skull once more. “Be safe, seeker.”
        
        >>+ You now have the <b>healing potion</b>. 
        >>- You no longer have the <b>wax figurine</b>.
        ~ EPV = false
        ~ PTN = true
        ~ WFG = false
        -> opts
+ [Leave the witch be and exit the cave] -> location_cave_exit
