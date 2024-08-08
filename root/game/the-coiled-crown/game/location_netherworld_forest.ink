// ================================
= location_netherworld_forest
# CHECKPOINT
# AUDIOLOOP: music/forest.mp3
# CLEAR
# IMAGE: images/netherworld-forest-64.jpg

<h3>Netherworld Forest</h3>

Gone is the ruined city with its fallen slabs of stone and screeching crows picking at vermin in the briars.
Instead, you stand surrounded by an endless forest of thin bare trees jutting up from the dirt like bleached bones. Fog hangs heavy in all directions. Sticking your hand out in front of you, you feel as if you could grab the thick mist out of the air.
A path of well-trodden dirt winds into the distance.

- (opts1)

* [Check your equipment]
    You are carrying a longsword and an [red]empty potion vial[/red] that was once filled with healing liquid.
    Your cloak and leather armor are a little worse for wear, but you are otherwise unharmed.
    -> opts1
+ [Follow the path through the fog]
-

The narrow dirt path winds between the trees. You see no buildings through the thick fog ahead of or behind you.

Pausing to take in your surroundings in search of any sign of a clearing, you spy at the edge of your vision a hooded ghostly figure drifting between the bare trees. Then another. And then still another, all identical to the apparition that snatched you from the tower crypt and brought you to this place.

In total, you spot more than two dozen ghosts amid the trees. None notice you, and none cross the walking path. For now.

{not WFG: A wax figurine rests against a cairn at your feet.}

- (opts2)
* {not WFG} [Take wax figurine]
    You pick up the wax figurine and inspect it. It’s carved in the likeness of a phoenix. Holding it close to your face, it smells faintly of soap.
    
    >>+ You now have the <b>wax figurine</b>.
    ~ WFG = true
    -> opts2
+ {WFG} [Continue on the path through the fog]
-

# IMAGE: images/forest-20.jpg
After wandering along the narrow dirt path for what feels like hours, the skeletal trees finally give way to a cliff face overlooking an evergreen forest draped in fog. The entire forest is eerie in its silence — not a single crunch of a branch, chirp of a bird, or whistle of air through leaves and needles.

+ [Peer over the cliff face] -> location_forest_cliff_face
