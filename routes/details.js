var express = require('express');
var passport = require('passport');
var Course = require('../models/course');
var User = require('../models/user');
var router = express.Router();


router.get('/:uid', function(req, res, next) {
    let id = req.params.uid;
    console.log(id);    //works

    Course.findOne({_id: id})
    .then((thisCourse) => {
        let enrolled = req.user.enrolledCourses.includes(thisCourse._id);
        let isCreator = (req.user._id == (thisCourse.creator + ""));


        res.render('details', { title: 'Course', course: thisCourse, user: req.user, enrolled: enrolled, isCreator: isCreator });
    });
    
});

router.get('/:uid/enroll', function(req, res, next) {
    let id = req.params.uid;
    console.log(id);    //works

    Course.findOneAndUpdate(
        {
            _id: id
        }, 
        
        {
            $push: {
                usersEnrolled: req.user._id
            },
            $inc: {
                enrolledCount: 1
            }
        }, 
        
        (err, course) => {
            if(err) {
                console.log(err);
            }
            console.log('Enrolled Courses', course);
    })   

    User.findOneAndUpdate(
        {
            _id: req.user._id
        }, 
        
        {
            $push: {
                enrolledCourses: id
            }
        }, 
        
        (err, user) => {
            if(err) {
                console.log(err);
            }
            console.log('Enrolled Users', user);
    })  
    res.redirect('/')
});

module.exports = router;