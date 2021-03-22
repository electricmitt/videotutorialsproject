const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');


const courseSchema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    title: String, //required //unique
    description: String, //required //max length of 50 symbols
    imageUrl: String, //required
    isPublic: Boolean, //default - false
    createdAt: {
        type: Date,
        default: Date.now
    }, //required
    usersEnrolled:[{ type: Schema.Types.ObjectId, ref: 'User'}],
    creator: { type: Schema.Types.ObjectId, ref: 'User'},
    enrolledCount: Number
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;