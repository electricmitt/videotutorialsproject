var express = require('express');
var passport = require('passport');
var Course = require('../models/course');
var User = require('../models/user');
var router = express.Router();


router.get('/:uid', function(req, res, next) {
    let id = req.params.uid;
    console.log(id);    //works

    User.updateMany(
        {
            enrolledCourses: id
         }, 
         
        { 
            $pull: {
                enrolledCourses: id
            }
        }, 
        
        function(err, users) {
            if(err) {
                console.log(err);
            }
            console.log('Updated Users', users);
    })

    Course.findOneAndDelete({_id: id})
    .then((thisCourse) => {
        console.log('Course Deleted', thisCourse);
        res.redirect('/');
    });
});

module.exports = router;