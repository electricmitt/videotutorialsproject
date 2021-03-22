var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('register', { });
});

router.post('/', function(req, res) {
    User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
        if (err) {
          return res.render('register', { error : err.message });
        }

        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});

module.exports = router;