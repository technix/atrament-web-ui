= location_lost_catacombs 
# AUDIOLOOP: false
# CLEAR
# IMAGE: images/voices-05.jpg
<h3>Lost Catacombs</h3>
Thousands of bones litter the walls and ground of this oncesealed maze of catacomb tunnels. Piles of ash drift like snow on an unseen draft, revealing tarnished keepsakes that crunch beneath your boots.
Drawing closer to the bones, you can see spots of sickly green discoloration — a sign of the Carnophage, no doubt. The air reeks of lye.
Three tunnels snake off into darkness. The discordant sound of different voices singing reverberates from deep within the catacombs.
+ [Follow the sound of joyous singing] -> catacombs_danger
+ [Follow the sound of gloomy singing] -> catacombs_witch
+ [Follow the sound of angry singing] -> catacombs_danger

= catacombs_danger
# IMAGE: images/skull-17.jpg
You press your gloved hand against the wall and follow the curve of the tunnels toward the echoing voices in the dark.
Suddenly, you feel the ground sink ever so slightly beneath your boots. The singing halts.
Around you in the pitch darkness, you hear a skull tumble from its shelf and shatter against the ground, followed by the whipping of an arrow through the air.
A piercing pain and a damp warmth shoots through your neck. Groping with your fingers and struggling to breathe, you feel the shaft of an arrow protruding from your neck.

+ {PTN} [Drink the healing potion]
    You fumble in the dark for your healing potion and drink it, the wound in your neck sealing up in an instant.
    You hear another skull fall to the ground, and another, and still another until the darkness around you is filled with the sound of shattering bone and shooting arrows.
        >>- You no longer have the <b>healing potion</b>.
    ~ PTN = false
    + + [Sprint back to the catacombs entrance] -> location_lost_catacombs
+ {not PTN} [Try to pull the arrow]
    # AUDIOLOOP: music/death.mp3
    You try to pull the arrow, but your strength gives out and you tumble into a pile of shifting skeletons.
    You hear another skull fall to the ground, and another, and still another until the darkness around you is filled with the sound of shattering bone and shooting arrows.
    >>! YOU DIED
    -> endgame

= catacombs_witch
# IMAGE: images/witch-57.jpg
A black-clad young witch sits atop a bed of branches she has made for herself in this claustrophobic cave. The hovel is lit only by pungent candles and flickering brass lanterns taken from the Scorched Keep above.
Her gaze is cast downward, her painted fingers smudging wax across the skull of some captured cave-dwelling creature. She sings a gloomy song in an unknown language.
- (opts_witch)
{not HMD: A scroll in a brass tube lies half-buried in the ashes that collect at your feet.}
+ {not HMD} [Take the scroll]
    You pull the scroll from the mound of ashes and unfurl it.
    When your eyes adjust to the dim light of the witch’s hovel, you can read that the scroll is a hymn of mending.
    “Please, take it,” the witch hums. “With that forgotten hymn, you can restore that which has fallen to ruin in this dead world. I have no need for such magic — I am quite comfortable here in the rubble.”
    >>+ You now have the <b>hymn of mending</b>.
    ~ HMD = true
+ {WFG} [Give witch a wax figurine]
    The witch looks up, breathes deep of the air, and smiles. She takes the phoenix figurine from you and tosses it into a hissing kettle at her feet. The wax figurine melts into a viscous substance that she mixes with flower petals and bits of bone.    
    “Sip this.” She pours the elixir into a wooden bowl and motions it toward you. You press the bowl to your lips and drink the pungent, chalky liquid. Whispering fills the air. “With this concoction, you may commune with the restless spirits that wander this haunted keep.”    
    >>+ You have drunk the <b>séance elixir</b>.
    >>- You no longer have the <b>wax figurine</b>.
    ~ ELX = true
    ~ WFG = false
+ [Leave the witch be and go back to the lift] -> location_lift
-
-> opts_witch
