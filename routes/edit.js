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
        res.render('edit', { title: 'Course', course: thisCourse, user: req.user });
    });
});

router.post('/:uid', function(req, res, next) {
    let id = req.params.uid;
    console.log(id);    //works

    let data = req.body;
    
    Course.findOneAndUpdate(
        {_id: id},
        {
            title: data.title,//required //unique
            description: data.description, //required //max length of 50 symbols
            imageUrl: data.imageUrl, //required
            isPublic: (req.body.isPublic == "on")? true : false, //default - false
        }
    )
    .then((thisCourse) => {
        console.log(thisCourse);  
        res.redirect('/');
    });
});

module.exports = router;