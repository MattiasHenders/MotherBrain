const mongoose = require("mongoose");

const deckSchema = new mongoose.Schema({
    userID: {type: String, require: true, unique: true},
    deckLink: {type: String, default: ""},
    card1: {type: String, default: ""},
    card2: {type: String, default: ""},
    card3: {type: String, default: ""},
    card4: {type: String, default: ""},
    card5: {type: String, default: ""},
    cardExtra: {type: String, default: ""}
});

const model = mongoose.model("DeckModels", deckSchema);

module.exports = model;