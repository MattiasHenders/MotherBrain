require("dotenv").config();

module.exports = {
    name: 'version',
    description: "Gets the version and build",
    
    async execute(client, message, args, Discord, profileData){
    
        console.log("Starting version command");

        //Set up the message with tags
        var messageToSend = "Version: " + process.env.VERSION + "." + process.env.BUILD;

        //Send it
        message.author.send(messageToSend);

        console.log("Ending version command.");
    }
}