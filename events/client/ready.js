module.exports = (Discord, client, message) => {
    console.log("Roomee is online!");

    startRentReminder(client);
    startWasteReminder(client);
}

// Sets a reminder for rent once a month
function startRentReminder(client) {

    console.log("Starting rent reminder.")
    const command = client.commands.get('rentReminder');

    if (command) {
        command.execute(client);
        console.log("Rent reminder is scheduled.")
    }
}

// Sets a reminder for rent once a month
function startWasteReminder(client) {

    console.log("Starting waste reminder.")
    const command = client.commands.get('garbageReminder');

    if (command) {
        command.execute(client);
        console.log("Waste reminder is scheduled.")
    }
}