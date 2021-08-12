require("dotenv").config();
const profileModel = require('../../models/profileSchema');

module.exports = async (Discord, client, message) => {

    const prefix = process.env.PREFIX;

    //If the message is not a command or IS from a bot, ignore it
    if (!message.content.startsWith(prefix) || message.author.bot) {
        return;
    }

    //Check if the user is in the database, if not, add them
    let profileData;
    try {
        profileData = await profileModel.findOne({ userID: message.author.id});
        if (!profileData) {
            let profile = await profileModel.create({
                userID: message.author.id,
                userTag: message.author.tag,
                dojoDeck: "",
                dojoPoints: 0,
                dojoOpponent: ""
            });
            profile.save();
        }
    } catch (err) {
        console.log(err);
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);

    if (command) {
        command.execute(client, message, args, Discord, profileData);
    }
}