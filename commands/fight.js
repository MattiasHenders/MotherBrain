require("dotenv").config();
const profileModel = require('../models/profileSchema');
const deckModel = require('../models/deckSchema');

module.exports = {
    name: 'fight',
    description: "Declare or accept a fight with another player.",
    
    async execute(client, message, args, Discord, profileData){ 

        let channelToSend = getChannelToSend();

        //Args Checks
        if ((args.length != 2 && args.length != 1)) {
            message.author.send("You have the wrong amount of arguments, it should be -fight @User 'link to MoxField.com deck'\n"
                + "Or just -fight 'link to MoxField.com deck'");
            return;
        }

        //Check if the moxfield link needs '/goldfish' added to the end
        if (args.length == 1 && !args[0].includes("/goldfish")) {
            args[0] = args[0] + "/goldfish"
        } else if (args.length == 2 && !args[1].includes("/goldfish")) {
            args[1] = args[1] + "/goldfish"
        }

        if (args.length == 1 && args[0].includes("moxfield.com")) {
            
            //Add just the fight to the database, do not fight
            let playerOne = profileData;

            //Get the deck
            let dojoDeck = args[0];

            let deckSearch;
            //Try and see if the deck has been used before
            try {
                deckSearch = await deckModel.findOne({deckLink: dojoDeck});
            } catch (err) { 
                deckSearch = undefined;
            }

            //Add deck to the database if not found
            if (deckSearch == undefined) {
                addDeckToDatabase(playerOne.userID, dojoDeck);
            }

            addFighterToDataBase(playerOne, dojoDeck);
            message.author.send("Your deck is added, just need to wait for your opponent now!");
            
        } else if (args.length == 2 && args[1].includes("moxfield.com")) {

            //Add the fight and try to fight a given user
            var opponentTag = args[0];
            let dojoDeck = args[1];

            //Check the opponent is in the database
            let playerOne = profileData;
            let playerTwo = await profileModel.findOne({userTag: opponentTag});

            let deckSearch;
            //Try and see if the deck has been used before
            try {
                deckSearch = await deckModel.findOne({deckLink: dojoDeck});
            } catch (err) { 
                deckSearch = undefined;
            }

            //Add deck to the database if not found
            if (deckSearch == undefined) {
                addDeckToDatabase(playerOne.userID, dojoDeck);
            }

            //Add the deck to the user
            playerOne.dojoDeck = dojoDeck;

            //If no opponent found, return an deafult message
            if (playerTwo == undefined
                || playerTwo.dojoDeck == "") {

                addFighterToDataBase(playerOne, dojoDeck);
                
                message.author.send("Your opponent is not ready yet. You're deck has been added though!");
                return;
            }

            //At this point the fight is on, start it up
            sendFightMessage(client, channelToSend, playerOne, playerTwo);

            //After the fight clear both fighters
            clearFighters(playerOne, playerTwo);

        } else {

            //Say error message
            message.author.send("Some arguments we're incorrect, it should be -fight @User 'link to MoxField.com deck'\n"
                + "Or just -fight 'link to MoxField.com deck'");
        }

        console.log("Finished fight command...");
    }
}

async function addFighterToDataBase(player, dojoDeck, opponent) {

    //Hard check for opponent
    opponent = (typeof opponent !== 'undefined') ?  opponent : undefined

    //Set player to database
    try {
        var filter = {userID: player.userID};
        var update = {dojoDeck: dojoDeck};

        if (opponent != undefined) {
            update = {dojoDeck: dojoDeck,
                      dojoOpponent: opponent.userID};
        }

        await profileModel.updateOne(filter, update);
        console.log("Set player " + player.userTag + " with deck " + dojoDeck);

    } catch (err) {
        console.log("Error playerOne sending report to database: " + err);
    }
}

function sendFightMessage(client, channelToSend, fighter1, fighter2) {

    //Set up the messages
    var messageToSend = "🥊 Fight Begin 🥊" + "\n";
    messageToSend += "=================" + "\n\n";
    messageToSend += "Fighter 1: <@" + fighter1.userID + "> - " + fighter1.dojoDeck + "\n\n";
    messageToSend += "vs. " + "\n\n";
    messageToSend += "Fighter 2: <@" + fighter2.userID + "> - " + fighter2.dojoDeck;
    
    //Send message to the specific channel
    const channel = client.channels.cache.find(channel => channel.name === channelToSend);
    channel.send(messageToSend);

    //Remove the fighters decks and opponents from the database


    console.log("FIGHT OVER!");
}

async function clearFighters(playerOne, playerTwo) {
    
    //Clear player 1 to database
    try {
        var filter = {userID: playerOne.userID};
        var update = {dojoDeck: "",
                      dojoOpponent: ""};

        await profileModel.updateOne(filter, update);
        console.log("Cleared player" + playerOne.userTag);

    } catch (err) {
        console.log("Error playerOne clearing database: " + err);
    }

    //Clear player 2 to database
    try {
        var filter = {userID: playerTwo.userID};
        var update = {dojoDeck: "",
                      dojoOpponent: ""};

        await profileModel.updateOne(filter, update);
        console.log("Cleared player" + playerTwo.userTag);

    } catch (err) {
        console.log("Error playerOne clearing database: " + err);
    }

}

//Use later if we want to limit replies to a day...
function boolDateOverADay(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    var days = Math.abs(Math.floor((second-first)/(1000*60*60*24)));

    return (days >= 1);
}

//Gets the channel to send based on .env file
function getChannelToSend() {

    var boolTesting = process.env.BOOL_TESTING;
    var channel = process.env.PRODUCTION_CHANNEL;

    if (boolTesting == 'true') {
        channel = process.env.TEST_CHANNEL;
    }
    
    return channel
}

async function addDeckToDatabase(userID, deckLink) {

    await deckModel.create(
        {   userID: userID,
            deckLink: deckLink,
            card1: "",
            card2: "",
            card3: "",
            card4: "",
            card5: "",
            cardExtra: "",
        }
     );
}