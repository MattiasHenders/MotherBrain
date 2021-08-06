let scoreMap = new Map();

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

        console.log("Finished score command...");
    }
}

function addScore(player, score) {
    
    if (scoreMap.has(player)) {
        
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
