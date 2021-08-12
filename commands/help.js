const message = require("../events/guild/message");
let helpString = "";
module.exports = {
    name: 'help',
    description: "Gets all the commands to display to the user.",
    
    async execute(client, message, args, Discord, profileData){
    
        console.log("Starting help command");

        helpString = "Commands\n=============\n";

        client.commands.forEach(logMapElements);

        message.author.send(helpString);
    
        console.log("Ending help command.");
    }
}

function logMapElements(value, key, map) {
    helpString += ("-" + key + "\n   -> " + value.description + "\n\n")
}