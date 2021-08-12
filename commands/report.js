require("dotenv").config();
const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'report',
    description: "Report the score for the 1v1 dojo matches.",
    
    async execute(client, message, args, Discord, profileData){ 

        let channelToSend = getChannelToSend();

        //Args Checks
        if (args.length != 3) {
            message.author.send("You have the wrong amount of arguments:\n"
                + "It should be '-report @Opponent [your score] [their score]'");
            return;
        }

        var opponentID = message.mentions.users.first().id;
        var playerOneScoreString = args[1];
        var playerTwoScoreString = args[2];

        var playerOneScoreReport = 0;
        var playerTwoScoreReport = 0;

        //Check the opponent is in the database
        var playerOne = profileData;
        var playerTwo = await profileModel.findOne({userID: opponentID});

        //If not, return an error message
        if (playerTwo == undefined) {
            
            sendReportError(client, channelToSend);
            return;
        }

        //Check that the users score is valid
        try {
            playerOneScoreReport = parseInt(playerOneScoreString);
        } catch (e) {
            message.author.send("Your score is not a valid number!");
            return;
        }

        //Check that the opponents score is valid
        try {
            playerTwoScoreReport = parseInt(playerTwoScoreString);
        } catch (e) {
            message.author.send("Opponents score is not a valid number!");
            return;
        }

        //Player One Report
        try {

            var filter = {userID: playerOne.userID};
            var update = {$inc:{dojoPoints: playerOneScoreReport}};

            await profileModel.updateOne(filter, update);
            console.log("Increased player 1 by " + playerOneScoreReport);

        } catch (err) {
            console.log("Error playerOne sending report to database: " + err);
        }

        //Player Two Report
        try {

            var filter = {userID: playerTwo.userID};
            var update = {$inc:{dojoPoints: playerTwoScoreReport}};

            await profileModel.updateOne(filter, update);
            console.log("Increased player 2 by " + playerTwoScoreReport);

        } catch (err) {
            console.log("Error playerTwo sending report to database: " + err);
        }

        //Send the message
        sendReportMessage(client, channelToSend, playerOne, playerTwo, playerOneScoreReport, playerTwoScoreReport);

        console.log("Finished report command...");
    }
}

function sendReportMessage(client, channelToSend, playerOne, playerTwo, playerOneScore, playerTwoScore) {
    
    var message = "✏️ Report Recieved ✏️\n"
    + "=================\n"
    + "You have reported:\n"
    + "<@"+ playerOne.userID + "> : " + playerOneScore + "\n"
    + "<@"+ playerTwo.userID + "> : " + playerTwoScore;

    //Send message to the specific channel
    const channel = client.channels.cache.find(channel => channel.name === channelToSend);
    channel.send(message);
}

function sendReportError(client, channelToSend) {
    
    var message = "Please tag your opponent properly! Try Again";

    //Send message to the specific channel
    const channel = client.channels.cache.find(channel => channel.name === channelToSend);
    channel.send(message);
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
