const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'score',
    description: "Gets the specific users score.",
    
    async execute(client, message, args, Discord, profileData){
    
        console.log("Starting score command");

        //Set up the message with tags
        var messageToSend = "<@" + profileData.userID + ">," + " you have " + profileData.dojoPoints + " points from dojo matches!";

        //Send it
        message.channel.send(messageToSend);

        console.log("Ending score command.");
    }
}