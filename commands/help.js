const message = require("../events/guild/message");
let helpString = "";
module.exports = {
    name: 'help',
    description: "Gets all the commands to display to the user.",
    
    async execute(client, message, args, Discord, profileData){
    
        console.log("Starting help command");

        helpString = "";
        client.commands.forEach(logMapElements);

        //Set up the messages
        const helpEmbed = {
            "type": "rich",
            "title": `HELP PANEL`,
            "description": `${helpString}`,
            "color": 0x4632a8,
            "thumbnail": {
                "url": `https://github.com/MattiasHenders/MotherBrain/blob/main/media/topdecklethal%20logo.png?raw=true`,
                "height": 0,
                "width": 0
            },
        };

        message.author.send({embed: helpEmbed});
    
        console.log("Ending help command.");
    }
}

function logMapElements(value, key, map) {
    helpString += ("-" + key + "\n   > " + value.description + "\n\n")
}