//Get the module with the global variables
//Add the global variables
const {
    getScoreMap,
    setScoreMap
} = require('../index');

let scoreMap = getScoreMap();
//End of the global variables

module.exports = {
    name: 'report',
    description: "Report the score for the 1v1 dojo matches.",
    
    async execute(client, message, args){ 

        //Args Checks
        if (args.length != 3) {
            message.author.send("You have the wrong amount of arguments:\n"
                + "It should be '-report [opponents tag] [your score] [their score]'");
            return;
        }

        var playerOneTag = message.author.tag;
        var playerTwoTag = args[0];

        var playerOneScoreString = args[1];
        var playerTwoScoreString = args[2];

        var playerOneScore = 0;
        var playerTwoScore = 0;

        //Users tag check
        if (!playerOneTag.includes("#")) {
            console.log("playerOneTag = " + playerOneTag);
            message.author.send("Your tag is missing...not sure how");
            return;
        }

        //Opponent tag check
        if (!playerTwoTag.includes("#")) {
            console.log("playerTwoTag = " + playerTwoTag);
            message.author.send("Your first field should be your opponents tag!");
            return;
        }

        //Check that the users score is valid
        try {
            playerOneScore = parseInt(playerOneScoreString);
        } catch (e) {
            message.author.send("Your score is not a valid number!");
            return;
        }

        //Check that the opponents score is valid
        try {
            playerTwoScore = parseInt(playerTwoScoreString);
        } catch (e) {
            message.author.send("Opponents score is not a valid number!");
            return;
        }

        //If checks are passed then add the score for each user 
        addScore(playerOneTag, playerOneScore);
        addScore(playerTwoTag, playerTwoScore);

        //Get players tags
        playerOneTag = client.users.cache.find(user => user.username == playerOneTag);
        playerTwoTag = client.users.cache.find(user => user.username == playerTwoTag);
        
        var message = "✏️ Report Recieved ✏️\n"
            + "=================\n"
            + "You have reported:\n"
            + "<@"+ playerOneTag + ">: " + playerOneScore + "\n"
            + "<@"+ playerTwoTag + ">: " + playerTwoScore + "\n"

        //Send message to the specific channel
        const channel = client.channels.cache.find(channel => channel.name === '5cb-dojo');
        channel.send(message);

        //Always finish by setting the global maps 
        setScoreMap(scoreMap);
        console.log("Finished score command...");
    }
}

function addScore(player, score) {
    
    if (scoreMap == undefined) {

        scoreMap = new Map();

        //Add the user to the map
        console.log(player + " is NOT in the map. Adding and setting score");

    } else if (scoreMap.has(player)) {
        
        //Reply that the user is already in a game
        console.log(player + " is in the map. Increasing score");

        //Get the score
        var scoreToAddTo = scoreMap.get(player);
        score += scoreToAddTo;

    } else {
       
        //Add the user to the map
        console.log(player + " is NOT in the map. Adding and setting score");
    }

    //Set the score
    scoreMap.set(player, score);
}
