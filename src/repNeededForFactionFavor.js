/*
usage: run repNeededForFactionFavor.js favorTarget currentFavor
    returns how much reputation you need at maximum to reach the faction favor favorTarget, given your current favor
    (this is off by the reputationRollOver from last augmentation, if you already have favor)
    (note that company favor uses different constants)

formula adapted from (Faction.js/getFavorGain):
    https://github.com/danielyxie/bitburner/blob/master/src/Faction.js
    
    also available as netscript 1.0 script (running in Firefox)
    https://github.com/sschmidTU/BitBurnerScripts/
    @author sschmidTU
*/

function repNeededForFactionFavor(targetFavor,currentFavor) {  
    let favorGain = 0;
    let rep = 0;
    
    let FactionReputationToFavorBase = 500;
    let FactionReputationToFavorMult = 1.02;
    
    let reqdRep = FactionReputationToFavorBase *
                      Math.pow(FactionReputationToFavorMult, currentFavor);
    
    while (currentFavor + favorGain < targetFavor) {
        rep += reqdRep;
        ++favorGain;
        reqdRep *= FactionReputationToFavorMult;
    }
    
    return rep;
}

export async function main(ns) {
    let targetFavor = ns.args[0];
    let currentFavor = ns.args[1];
    
    ns.tprint('required rep: ' + repNeededForFactionFavor(targetFavor, currentFavor));
}
