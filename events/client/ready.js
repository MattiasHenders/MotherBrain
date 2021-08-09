module.exports = (Discord, client, message) => {
    console.log("Mother Brain is online!");
}

// Sets a reminder for rent once a month
function startReminder(client) {

    console.log("Starting generic reminder.")
    const command = client.commands.get('someReminder');

    if (command) {
        command.execute(client);
        console.log("Some reminder is scheduled.")
    }
}
