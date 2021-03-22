const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Course = require('./course');
var passportLocalMongoose = require('passport-local-mongoose');

//id, username, password (hashed)

const userSchema = new Schema({
    username: String,
    password: String,
    enrolledCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;