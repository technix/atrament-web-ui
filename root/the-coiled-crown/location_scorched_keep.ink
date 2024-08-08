= location_scorched_keep
# AUDIOLOOP: music/cathedral.mp3
# CLEAR
# IMAGE: images/scorched-keep-83.jpg
<h3>Scorched Keep</h3>
An ornate dome, truly cyclopean in scope, towers over a great hall ringed by columns, archways, and balconies.
The scent of a burning campfire fills the entire great hall, wisps of smoke barely visible in the soft light that pours down from a skylight high above.
In the peripheral alcoves of the hall where the overcast daylight is dimmest, charred signet rings lie discarded in heaps.
The ashes of tapestries pulled down from their now-rusted chains drift on an unseen breeze from toppled braziers.

+ [Look around] -> scorched_keep_entrance

= scorched_keep_entrance
# IMAGE: images/inscriptions-83.jpg
A wrought-iron flight of spiral steps ascends toward a balcony on the second floor of the great hall. In the center of the hall, a lift on heavy pulleys and chains dangles in a tower-like station.
Straight ahead, beyond both the spiral stairs and the lift station, is an archway decorated with tapestries depicting a fearsome armored woman driving a spear down into the maw of a writhing kraken.
A young woman draped in flowering wreaths sits on the floor near the lift station, her dirt-covered fingers sorting through a  stiff deck of faded tarot cards.
+ [Climb the spiral stairs to the second-floor balcony] -> location_limestone_balcony
+ [Descend the lift into darkness below] -> location_lift
+ [Pass through the archway ahead] -> scorched_keep_archway
+ [Approach the fortune teller] -> fortune_teller

= scorched_keep_archway
# IMAGE: images/obsidian-door-56.jpg
Holy symbols, coins, fragrant candles, and other offerings lie scattered at the foot of an imposing door hewn from obsidian. The exotic stone is unlike anything you’ve seen elsewhere in the keep or the surrounding forest. Columns on either side of the door depict an armored woman driving her spear down into the tendrils of a kraken.
The surface of the obsidian door heaves and shifts, forming into an imposing skull the size of a boulder. Embers smolder in its single leering eye and across its flicking serpent’s tongue. The skull looks ready to lunge from the door and swallow you.
+ [Strike the skull’s eye with your longsword] -> death_scorched_keep
+ [Strike the skull’s tongue with your longsword] -> p95
+ [Flee] -> scorched_keep_entrance

= p95
You lash out at the enormous skull, the echoing of your shout drawing the sound of scuffling footsteps from behind you. Turning your head, you can see the fortune teller, draped in flowering wreaths, peeking out at you from behind a pillar.
You cleave the obsidian skull’s tongue with your longsword, severing it from the skull’s maw with a thunderous crack and a shriek from the fortune teller. Its single eye crumbles to dust.
The obsidian skull lets out a groan like metal buckling under the weight of stone and two more organs glow like embers within its imposing form: a heart and a brain.
+ [Strike the skull’s heart with your longsword] -> location_white_fog_gate
+ [Strike the skull’s brain with your longsword] -> death_scorched_keep

= death_scorched_keep
# AUDIOLOOP: music/death.mp3
You lash out at the enormous skull, the echoing of your shout drawing the sound of scuffling footsteps from behind you. Turning your head, you can see the fortune teller, draped in flowering wreaths, peeking out at you from behind a pillar.
Your blade shatters when it strikes the obsidian skull, which coils outward from the door like a striking serpent. Before you can turn to flee or call to the fortune teller for help, the skull bites down on you and swallows your body whole.
Darkness and the painful grinding of stone envelops you.
>>! YOU DIED
-> endgame


= location_white_fog_gate
# CLEAR
# IMAGE: images/white-fog-gate-41.jpg
<h3>White Fog Gate</h3>

You plunge your longsword into the glowing heart of embers. There is a crash of thunder and the skull explodes in a concussive hail of obsidian shards, revealing an archway filled with white fog. The archway is set into a mosaic depicting an armored woman calling down a fiery conflagration upon her enemies. The fortune teller cheers, then hides.

Numberless souls have journeyed into the netherworld in search of the Coiled Crown, but looking upon this fearsome mural beyond the destroyed obsidian skull, you are certain that you are the only mortal to pass this way in aeons.

{not RVK: You hear a quiet whisper coming from the fog, "Seek revelation". The fog gate does not let you enter. }

+ {RVK} [Enter the Gate] -> location_throne_of_cinder
+ [Go back to Scorched Keep] -> location_scorched_keep


VAR tarot_death = false
= fortune_teller
~ tarot_death = false
You approach the young woman sitting cross-legged on the cold limestone floor. She places her deck of tarot cards at her side and looks up at you.

“Many of the [red]flowers[/red] in this forest can heal the sick,” she says, running her fingers along the garlands that cover her body.

“The Carnophage came too quickly. The extinct people of this land had no time to learn how to use the blessings of the forest around them — a pity, really, as Gaea provides remedies for all ills, even those as dreadful as the Carnophage.”

- (fortune_teller_opts)
* [“Tell me my fortune.”] -> tell_fortune
+ {FLB} [Give her flowers with black ribbon] -> flowers_roses
+ {FLW} [Give her flowers with white ribbon] -> flowers_lilacs
+ [Leave the young woman be] -> scorched_keep_entrance
+ {tarot_death} [Venture back out into the Netherworld Forest] -> location_forest_cliff_face


- (tell_fortune)
# IMAGE: images/tarot-86.jpg
The young woman smiles and collects the cards at her feet.

With each snapping shuffle of the deck, the sound echoes through the colossal great hall and kicks up clouds of crushed flower petals.

+ [Draw a card]
{
    - BFR:
        -> card_blessing_of_fire
    - BIR:
        -> card_blessing_of_iron
    - else:
        -> card_tarot
}

- (card_blessing_of_fire)
You draw a card from the top of the deck, the rough parchment scraping against your gloved fingertips.

Before you can turn the card to reveal its face, the card between your fingers erupts in flames!

You shout and shake the ashes from your fingertips that still glow a dull red like embers. The fortune teller slides back in surprise and pulls the rest of her tarot cards close to her chest.

>>> Your <b>blessing of fire</b> incinerated the card.
-> fortune_teller_opts

- (card_blessing_of_iron)
You flip the card to reveal its face. Looking down, you see that you have drawn the High Priestess.

# IMAGE: images/tarot-high-priestess.jpg
The fortune teller looks up at you with eyes of deep green and speaks.

“I sense that a priestess of this land has gifted you with a divine blessing, seeker of the crown. I pray that you [red]trust in this blessing[/red] when you come to face the mortal danger that dwells in this haunted Keep.”
-> fortune_teller_opts

- (card_tarot)
~ tarot_death = true
You flip the card to reveal its face. Looking down, you see that you have drawn Death.

# IMAGE: images/tarot-death.jpg
The fortune teller bites her lip and whispers without looking up from the card.

“You are in grave danger, seeker of the crown. I sense there is something important you have left behind [red]outside the walls of this Keep[/red]. I pray that you find it, lest you join the wandering chorus of ghosts.”
-> fortune_teller_opts


- (flowers_roses)
You hand the fortune teller the bundle of dead flower stems bound with [red]black ribbon[/red].

She pulls the stems close to her face before smelling them, tasting them, and rolling them between her painted fingers. She holds the stems up into the dim light that shines down through the windows high above, her deep green eyes drinking in every detail.

“[red]Roses[/red],” the fortune teller finally whispers. “These bare stems were once roses, red with the burning passion of those who loved their queen so dearly.”
-> fortune_teller_opts


- (flowers_lilacs)
You hand the fortune teller the bundle of dead flower stems bound with [red]white ribbon[/red].

She pulls the stems close to her face before smelling them, tasting them, and rolling them between her painted fingers. She holds the stems up into the dim light that shines down through the windows high above, her deep green eyes drinking in every detail.

“[red]Lilacs[/red],” the fortune teller finally whispers. “These bare stems were once lilacs, fragrant totems of eternal youth and renewal promised by the great queen that once ruled here.”
-> fortune_teller_opts
