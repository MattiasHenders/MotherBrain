//Get the module with the global variables
//Add the global variables
const {
    getFightMap,
    setFightMap
} = require('../index');

let fightMap = getFightMap();
//End of the global variables

module.exports = {
    name: 'clear',
    description: "Removes any fights from this user from the fight list",
    
    async execute(client, message, args){ 

        console.log("Starting clear command");

        //Args Checks
        if (args.length != 0) {
            message.author.send("You have entered arguments, it should just be '-clear'");
            return;
        }

        var challengerName = message.author.tag;

        //Check if the Map has the fighter
        if (fightMap.has(challengerName)) {
           
            //Remove the fighter from the map
            fightMap.delete(challengerName);
            console.log("Deleted previous fight");

            //Let the fighter know its cleared
            message.author.send("Cleared your fight! You may start a new fight anytime!");
           
        } else {
            //Let the user know they are not in queue
            console.log("User didn't have previous fights");
            message.author.send("You did not have any previous fights! You may start a new fight anytime!");
        }

        //Always finish by setting the global maps 
        setFightMap(fightMap);
        console.log("Finished clear command...");
    }
}

