const express = require("express");

const server = express();

server.all("/", (req, res) => {
    res.send("MotherBrain is running!");
});

function keepAlive() {
    server.listen(3000, () => {
        console.log("MotherBrain Server is ready!");
    });
}

module.exports = keepAlive;