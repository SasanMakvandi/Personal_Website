var mongoose = require("mongoose"),
    crypto = require('crypto');

let Schema = mongoose.Schema;

var adminSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'is invalid']
      },
      email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "can't be blank"], 
        match: [/\S+@\S+\.\S+/, 'is invalid']
      },
});

adminSchema.plugin(uniqueValidator, {message: 'is already taken.'});

// admin Model Methods
adminSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 256, 'sha256').toString('hex');
};

adminSchema.methods.validPassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 256, 'sha256').toString('hex');
    return this.hash === hash;
};

module.exports = adminSchema = mongoose.model('Admin', adminSchema);
