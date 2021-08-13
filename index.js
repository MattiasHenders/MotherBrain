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

//Connect to the users database
mongoose.createConnection(process.env.DB_CONNECT_USERS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Connected to the users database");
}).catch((err) => {
    console.log("Failed to connect to the users database: " + err);
});

//Connect to the decks database
mongoose.createConnection(process.env.DB_CONNECT_DECKS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Connected to the decks database");
}).catch((err) => {
    console.log("Failed to connect to the decks database: " + err);
});

//Must stay at the end!
client.login(process.env.DISCORD_TOKEN);
