VAR BMP = false // burnt map
VAR BMK = false // brass burial mask
VAR PTN = false // healing potion
VAR HMD = false // hymn of mending
VAR WFG = false // wax figurine
VAR FLB = false // bouquet of dead flower stems bound in black ribbon
VAR FLW = false // bouquet of dead flower stems bound in white ribbon
VAR EBC = false // the everburning coal
VAR EPV = true // empty potion vial

VAR BIR = false // blessing of iron
VAR BFR = false // blessing of fire

=== function player_inventory()
    You are carrying:
    <ul>
    {BMP:<li>Burnt map</li>}<>
    {FLB:<li>Bouquet of dead flower stems bound in black ribbon</li>}<>
    {FLW:<li>Bouquet of dead flower stems bound in white ribbon</li>}<>
    {BMK:<li>Brass burial mask</li>}<>
    {EPV:<li>Empty potion vial</li>}<>
    {EBC:<li>Everburning coal</li>}<>
    {PTN:<li>Healing potion</li>}<>
    {HMD:<li>Hymn of mending</li>}<>
    <li>Longsword</li><>
    {WFG:<li>Wax figurine</li>}<>
    </ul>

    {
        - BFR:
            You have the <b>blessing of fire</b>.
        - BIR:
            You have the <b>blessing of iron</b>.
    }

    {RVK: You have the <b>revelation of Kaldera</b>.}
