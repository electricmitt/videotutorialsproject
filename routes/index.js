var express = require('express');
var router = express.Router();
const Course = require('../models/course');


/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.user == undefined) {
    Course.find()
    .then((response) => {
      res.render('index', { title: 'Express', course: response });
    });
  } 
  else {
    Course.find()
    .then((response) => {
      res.render('user-home', { title: 'Express', user: req.user, course: response } );
    });
  };
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
