const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    userID: {type: String, require: true, unique: true},
    userTag: {type: String, default: ""},
    dojoDeck: {type: String, default: ""},
    dojoPoints: {type: Number, default: 0},
    dojoOpponent: {type: String, default: ""}
});

const model = mongoose.model("ProfileModels", profileSchema);

module.exports = model;