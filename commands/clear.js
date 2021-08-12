require("dotenv").config();
const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'clear',
    description: "Removes any fights from this user from the fight list",
    
    async execute(client, message, args, Discord, profileData){ 

        console.log("Starting clear command");

        //Args Checks
        if (args.length != 0) {
            message.author.send("You have entered arguments, it should just be '-clear'");
            return;
        }

        var filter = {userID: profileData.userID};
        var update = {
            dojoDeck: "",
            dojoOpponent: ""
        };

        await profileModel.findOneAndUpdate(filter, update);

        message.author.send("Cleared all previous matches! Enter a new one anytime.");
        
        console.log("Finished clear command...");
    }
}

