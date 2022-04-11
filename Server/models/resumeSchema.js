var mongoose = require("mongoose");

let Schema = mongoose.Schema;

var resumeSchema = new mongoose.Schema({
    name: String,
    experience: Array,
    education: Array,
});

// more to be added later 
module.exports = resumeSchema = mongoose.model('Resume', resumeSchema);