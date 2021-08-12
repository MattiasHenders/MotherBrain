const Discord = require('discord.js');
const client = new Discord.Client();

require("dotenv").config();

const keepAlive = require("./server");
keepAlive();

const mongoose = require("mongoose");

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord)
});

//Connect to the database
mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Connected to the database");
}).catch((err) => {
    console.log("Failed to connect to the database: " + err);
});

//Must stay at the end!
client.login(process.env.DISCORD_TOKEN);
