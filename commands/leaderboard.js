let playerArray = new Array();
let scoreArray = new Array();

let highestScore = -1;
let highestPlayer = undefined;

const NUMBER_OF_LEADERS = 3;

module.exports = {
    name: 'leaderboard',
    description: "Show the leaderboard for the dojo!",
    
    async execute(client, message, args){ 

        console.log("Starting leaderboard");

        //Args Checks
        if (args.length != 0) {
            message.author.send("You have entered arguments, it should just be '-leaderboard'");
            return;
        }

        //Dont ever change the score map, use temp arrays
        playerArray = new Array();
        scoreArray = new Array();

        for (let i = 0; i < NUMBER_OF_LEADERS; i++) {

            //Reset the highest score check
            highestScore = -1;
            highestPlayer = undefined;

            //Itterate through the map and find the highest value
            scoreMap.forEach(getLargestMapNumber);

            //Add the top x amount of players
            if (highestScore != -1 && highestPlayer != undefined) {
                playerArray.push(highestPlayer);
                scoreArray.push(highestScore);
            }

            //After checking the map x times move on to print
        }
        
        //Check if the Array is empty
        if (playerArray.length != 0) {
            printTopLeaders(client);
        } else {
            printEmptyLeaderboard(client);
        }

        //Add in the users specific score who sent the message
        printUserScore(client, message);

        console.log("Finished leaderboard command...");
    }
}

function getLargestMapNumber(value, key, map) {
    console.log(`map.get('${key}') = ${value}`);

    //If the score is higher and is not in the temp array
    if (value >= highestScore && !playerArray.includes(key)) {
        highestScore = value;
        highestPlayer = key;
    }
}

function printTopLeaders(client) {
    
    //Set up the message
    var message = "🏆 Leaderboard 🏆" + "\n";
    message += "=================" + "\n\n";

    //Print each leader
    for (let i = 0; i < playerArray.length; i++) {

        //Adds it to the message
        message += i + ") " + playerArray[i] + "\t\t - SCORE: " + scoreArray[i] + "\n";
    }
    
    //Send message to the specific channel
    const channel = client.channels.cache.find(channel => channel.name === '⚠-test-channel');
    channel.send(message);
}

function printEmptyLeaderboard(client) {
    
    //Set up the message
    var message = "🏆 Leaderboard 🏆" + "\n";
    message += "=================" + "\n\n";
    message += "The Leaderboard is EMPTY! Start some matches to get it going!\n";
    
    //Send message to the specific channel
    const channel = client.channels.cache.find(channel => channel.name === '⚠-test-channel');
    channel.send(message);
}

function printUserScore(client, message) {
    
    //Get the users score right from the score map
    var userTag = message.author.tag;
    var userScore = scoreMap.get(userTag); 

    //Check that the user HAS a score
    if (userScore == null || userScore == undefined) {
        userScore = 0;
    }

    //Set up the message
    var message = "=================\n\n";
    message += "Your score " + message.author.name + " is: " + userScore;
    
    //Send message to the specific channel
    const channel = client.channels.cache.find(channel => channel.name === '⚠-test-channel');
    channel.send(message);
}