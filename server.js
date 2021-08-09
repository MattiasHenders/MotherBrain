//=======================================
//   GLOBAL VARIABLES
//=======================================
let playerArray = new Array();
let scoreArray = new Array();
let scoreMap = new Map();

exports.playerArray = playerArray;
exports.scoreArray = scoreArray;
exports.scoreMap = scoreMap;
//=======================================

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