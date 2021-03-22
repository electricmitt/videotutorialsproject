var express = require('express');
var router = express.Router();
const Course = require("../models/course");


/* GET create listing. */
router.get('/', function(req, res, next) {
    res.render('create', { title: 'Create Course Page', user: req.user });
});

router.post('/', function(req, res, next) {
    console.log('create course');
    console.log('~req', req.body);
    let data = req.body;

    let course = new Course({
        title: data.title,//required //unique
        description: data.description, //required //max length of 50 symbols
        imageUrl: data.imageUrl, //required
        isPublic: (req.body.isPublic == "on")? true : false, //default - false
        usersEnrolled:[],
        creator: req.user._id
    });

    course.save()
    .then((response) => {
        console.log(response);
        res.redirect('/');
    });
});

module.exports = router;