require("dotenv").config();
const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'leaderboard',
    description: "Show the leaderboard for the dojo!",
    
    async execute(client, message, args, Discord, profileData){ 

        let channelToSend = getChannelToSend();

        console.log("Starting leaderboard");

        const MAX_LEADERBOARD = parseInt(process.env.MAX_LEADERBOARD_SIZE);

        //Args Checks
        if (args.length != 0) {
            message.author.send("You have entered arguments, it should just be '-leaderboard'");
            return;
        }

        //Get the users findOne({ userID: message.author.id});
        var leaderCluster = await profileModel.find({}).sort({ dojoPoints: -1}).limit(MAX_LEADERBOARD);

        //Set up the array to print
        var playerArray = new Array();

        //Load the array in proper order
        for (var i = 0; i < leaderCluster.length; i++) {
            playerArray.push(leaderCluster[i]);
        }

        //Check if the Array is empty
        if (playerArray.length != 0) {
            printTopLeaders(client, channelToSend, playerArray);
        } else {
            printEmptyLeaderboard(client, channelToSend);
        }

        //Add in the users specific score who sent the message
        printUserScore(client, channelToSend, profileData);

        console.log("Finished leaderboard command...");
    }
}

function printTopLeaders(client, channelToSend, playerArray) {

    console.log("Leaderboard is printing with players");
    
    var message = "";

    //Get each leader
    for (let i = 0; i < playerArray.length; i++) {

        //Adds it to the message
        console.log(playerArray[i]);

        message += (i + 1) + ") " + playerArray[i].userTag.split("#")[0] + "\n> SCORE: " + playerArray[i].dojoPoints + "\n\n";
    }
    
    //Set up the messages
    const leaderEmbed = {
        "type": "rich",
        "title": `🏆 Leaderboard 🏆`,
        "description": `${message}`,
        "color": 0xfce938,
        "thumbnail": {
            "url": `https://github.com/MattiasHenders/MotherBrain/blob/main/media/topdecklethal%20logo.png?raw=true`,
            "height": 0,
            "width": 0
        },
    };

    //Send message to the specific channel
    const channel = client.channels.cache.find(channel => channel.name == channelToSend);
    channel.send({embed: leaderEmbed});
}

function printEmptyLeaderboard(client, channelToSend) {

    console.log("Leaderboard is printing empty");
    
    //Set up the message
    var message = "The Leaderboard is EMPTY! Start some matches to get it going!";

    //Set up the messages
    const leaderEmbed = {
        "type": "rich",
        "title": `🏆 Leaderboard 🏆`,
        "description": `${message}`,
        "color": 0xfce938,
        "thumbnail": {
            "url": `https://github.com/MattiasHenders/MotherBrain/blob/main/media/topdecklethal%20logo.png?raw=true`,
            "height": 0,
            "width": 0
        },
    };

    //Send message to the specific channel
    const channel = client.channels.cache.find(channel => channel.name == channelToSend);
    channel.send({embed: leaderEmbed});
}

function printUserScore(client, channelToSend, player) {

    //Set up the message
    var userDetails = "Your score <@" + player.userID + "> is: " + player.dojoPoints + " points";
    
    //Send message to the specific channel
    const channel = client.channels.cache.find(channel => channel.name == channelToSend);
    channel.send(userDetails);
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
