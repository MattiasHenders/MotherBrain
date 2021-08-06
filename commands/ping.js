module.exports = {
    name: 'ping',
    description: "This is a ping command to see if the bot is online.",
    
    async execute(client, message, args){ 
        message.channel.send('pong!');
    }
}