const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'add',
    description: "Lets the user know they are in the database",
    
    async execute(client, message, args, Discord, profileData){
    
        console.log("Starting score command");

        //Set up the message with tags
        var messageToSend = "<@" + profileData.userID + ">," + " you have been added to the database!";

        //Send it
        message.author.send(messageToSend);

        console.log("Ending score command.");
    }
}