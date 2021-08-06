let fightMap = new Map();

module.exports = {
    name: 'fight',
    description: "Declare or accept a fight with another player.",
    
    async execute(client, message, args){ 

        //Args Checks
        if (args.length != 2) {
            message.author.send("You have the wrong amount of arguments, it should be '-fight [user tag] [link to MoxField.com deck]'");
            return;
        }

        var challengerName = message.author.tag;
        var opponentName = args[0];
        var deckLink = args[1];

        if (!opponentName.includes("#")) {
            console.log("args0 = " + args[0]);
            message.author.send("Your first argument should be '[user#numbers]'");
            return;
        }

        if (!deckLink.includes("moxfield")) {
            console.log("args1 = " + args[1]);

            message.author.send("Your second argument should be a 'moxfield.com' link");
            return;
        }

        //Check if the Map is empty
        if (fightMap.length == 0) {
            //Right away add this person to the fight
            addFighter(challengerName, deckLink, message);
            return;
        }

        //The map is not empty so check if the fighter is in there
        if (addFighter(challengerName, deckLink, message)) {

            //Fighter is added, check if his opponent is in the map
            if (checkForOpponent(opponentName)) {

                //Oppoonent is in the map! Start the fight!
                startFight(challengerName, opponentName, client);
            }
        }

        //Now lets check if the challenged is in the map

        console.log("Finished fight command...");
    }
}

//Use later if we want to limit replies to a day...
function boolDateOverADay(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    var days = Math.abs(Math.floor((second-first)/(1000*60*60*24)));

    return (days >= 1);
}

function addFighter(challenger, deckLink, message) {
    
    if (fightMap.has(challenger)) {
        
        //Reply that the user is already in a game
        message.author.send("You already have a deck in queue for a fight! Lets finish that one first.");
        console.log(challenger + " already has a deck in the map.");
        return false;

    } else {
       
        //Add the user to the map
        fightMap.set(challenger, deckLink);
        console.log("Added " + challenger + " to the map.");
        return true;
    }
}

function checkForOpponent(opponentName) {
    
    if (fightMap.has(opponentName)) {
        
        //Opponent found, will start fight in startFight()
        console.log("Found" + opponentName + " in the map!");
        return true;

    } else {
       
        //No opponent found, let the user know their fight will start when the opponent replies
        console.log("Didn't find " + opponentName + " in the map...");
        return false;
    }
}

function startFight(fighter1, fighter2, client) {
    
    //Get the links
    var link1 = fightMap.get(fighter1);
    var link2 = fightMap.get(fighter2);

    var fighter1Name = fighter1.split('#')[0];
    var fighter2Name = fighter2.split('#')[0];

    //Set up the message
    var message = "🥊 Fight Begin 🥊" + "\n";
    message += "=================" + "\n\n";
    message += "Fighter 1: @" + fighter1Name + " - " + link1 + "\n\n";
    message += "vs. " + "\n\n";
    message += "Fighter 2: @" + fighter2Name + " - " + link2;
    
    //Send message to the specific channel
    const channel = client.channels.cache.find(channel => channel.name === '⚠-test-channel');
    channel.send(message);

    //Remove the fighters from the map
    fightMap.delete(fighter1);
    fightMap.delete(fighter2);

    console.log("FIGHT OVER!");
}
