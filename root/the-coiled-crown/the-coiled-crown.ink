# title: The Coiled Crown
# author: Sersa Victory
# inventory: player_inventory

INCLUDE inventory.ink
INCLUDE location_netherworld_forest.ink
INCLUDE location_forest_cliff_face.ink
INCLUDE location_handmaidens_shrine.ink
INCLUDE location_mossy_cave.ink
INCLUDE location_cave_exit.ink
INCLUDE location_holy_gatehouse.ink
INCLUDE location_bridge_of_hollows.ink
INCLUDE location_scorched_keep.ink
INCLUDE location_lift.ink
INCLUDE location_cursed_gateway.ink
INCLUDE location_lost_catacombs.ink
INCLUDE location_limestone_balcony.ink
INCLUDE location_abandoned_high_cathedral.ink
INCLUDE location_shrine_of_euryale.ink
INCLUDE location_throne_of_cinder.ink

VAR RVK = false // the revelation of Kaldera
VAR ELX = false // have drunk the séance elixir [ELX]
VAR SNK = false // sarcofagus is sunk

# IMAGE: images/intro.jpg
When the Carnophage came, not even the great queen’s invulnerable armored legions could turn back the scourge. Priestess and pauper, metalsmith and maiden — all fell ill to the plague that swept the halls of the Scorched Keep. Helpless to protect her people, the queen wept tears of charcoal. 

Now only a world in ashes remains. Cold forests, towering ruins, abandoned shrines, and darkened stained glass windows stand as a silent memorial to a realm once lit by the queen’s holy bonfires.

Though brigands have picked clean the occult reliquaries of the queen and her sacred sisterhood, one elusive relic remains: the mythic Coiled Crown once worn by the queen herself. Claim the crown, adventurer, and with it a power beyond human imagination.

+ [Your adventure begins...] -> start

= start
# CLEAR
You think you’ve finally found it.

For days you’ve explored this maze-like ruined city, climbing over toppled towers and crumbled monuments beneath a cold overcast sky that echoed with the shrieking of distant wyverns. 

After wedging open an unassuming steel door with your sword, you climbed a spiraling flight of broken stone steps until reaching a crypt dimly lit by shafts of gray daylight.

+ [Look around]
-

# IMAGE: images/sarchophagus.jpg
You step into the shafts of overcast daylight and look down upon the sarcophagus. Its' cover stone bears the likeness of a regal hooded woman, her outline traced in brass. 

The phrase “[red]<i>holy are those sisters who rise to lead</i>[/red]” is etched above her head. This must be where the ancient queen is buried — and with her, the Coiled Crown you so desperately seek.

+ [Open the sarcophagus]
-

The cover stone looks heavy, but feeling with gloved fingers along the edge, you find a seam into which you can slide your sword.

With a shout that echoes up into the high domed ceiling of this tower crypt, you push down on your blade like a lever and pry open the cover stone. The massive cover stone falls to the floor behind the sarcophagus, the thunderous sound frightening away unseen murders of crows perching outside the windows.

+ [Look inside]
-

When the dust settles and the stench of ancient rotting cloth disperses, you gaze into the open crypt and see ... nothing. 

This might be a trap.

+ [Step away]
    Suspecting a trap, you pull your sword to your side and spring backward in one smooth practiced motion.
+ [Wait]
    You wait to see if anything happens.
-

Sure enough, a cloud of embers begins to billow out of the open sarcophagus and coalesce into the vague shape of a hooded woman. You try to raise your sword in defense and turn to flee, but some occult force holds you still.

Eyes wide, you watch the wraith-like cloud surround you, distant whispers filling your ears, your vision of the tower fading into a foggy white.

+ [Shut your eyes]
-


You shut your eyes, hoping to blot out whatever netherworld magic has gripped you.

For a moment, you feel weightless. Then, there is silence, and you feel the crunch of solid ground beneath your boots.

+ [Open your eyes] -> location_netherworld_forest


= endgame

+ [Respawn]
    # RESTART_FROM_CHECKPOINT
+ [Start your journey again]
    # RESTART
-
-> END


