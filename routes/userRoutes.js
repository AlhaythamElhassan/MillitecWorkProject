var express = require('express');
var router= express.Router();
var passwordHash = require('password-hash');
var jwt = require('jsonwebtoken');
var _ = require('underscore');
var User = require('../models/user');

/**
 * Login route
 */
router.post('/login', function (req, res, next) {
    var body = _.pick(req.body, 'email', 'password');
    User.authenticate(body, function (err, user) {
        if (err) {
            return res.status(401).json({
                error: err,
                message: err.message
            });
        }
        var token = jwt.sign({user: user}, 'tokenEncodingSecret');
        res.status(200).json({
            message: 'Success',
            token: token,
            user: user._id,
            role: user.role,
            email: user.email
        });
    });
});
/**
 * All upcoming routes require authentication and authorization
 */
router.use('/', function (req, res, next) {
    //to be able to add first system admin user
    if(req.body.byPass !== 'mySpecialAdminLogin') {
        return next();
    }
        jwt.verify(req.get('auth'), 'tokenEncodingSecret', function (err, decoded) {
            if (err) {
                return res.status(404).json({
                    title: 'Authentication failed',
                    error: err
                });
            }
            if (decoded.user.role !== 'admin') {
                return res.status(401).json({
                    title: 'You are not authorized to access this route',
                    error: 'Only admin can access'
                });
            }
            next();
        });
});

// Add users to the system
router.post('/', function (req, res, next) {
    if(!req.body.firstName || !req.body.lastName || !req.body.password || !req.body.email || !req.body.role){
        return res.status(400).json({
            error: 'Can not add user',
            message: 'User required field is missing'
        }).send();
    }
    var newUser = _.pick(req.body, 'firstName', 'lastName', 'password', 'email', 'role');
    User.create(newUser, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'user is not added due to an error please try again',
                error: err
            });
        } else {
            res.status(200).json({
                message: 'User added successfully',
                obj: user
            });
        }
    });
});

// Update user
router.patch('/:id', function (req, res, next) {
    if (!req.body.firstName || !req.body.lastName || !req.body.password || !req.body.email || !req.body.role) {
        return res.status(400).json({
            title: 'Can not update user',
            error: {message: 'User required field is missing'}
        }).send();
    }
    var userUpdates = _.pick(req.body, 'firstName', 'lastName', 'password', 'email', 'role');
    userUpdates._id = req.params.id;
    User.findByIdAndUpdate(req.params.id,userUpdates,{new : true}, function (err, user) {
        if (err) {
            return res.status(404).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!user){
            return res.status(404).json({
                title: "An error occurred",
                message:"user not found"
            });
        }
        res.status(200).json({
            message: 'success',
            user: user
        });
    });
});
//GET user by eamil
router.get('/:email', function (req, res, next) {
   User.findOne({email: req.params.email}, function (err, user) {
       if(err){
           return res.status(500).json({
               title: 'An error occurred',
               error: err
           });
       }
       if(!user) {
           return res.status(404).json({
               title: "An error occurred",
               message: "user not found"
           });
       }
       res.status(200).json({
           message: 'success',
           user: user
       });
   });
});
//GET all users
router.get('/users/all', function (req, res, next) {
    User.find({}, function (err, users) {
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!users) {
            return res.status(404).json({
                title: "An error occurred",
                message: "no user found"
            });
        }
        var _users = [];
        users.forEach(function (user) {
            var u = _.pick(user, 'firstName', '_id', 'email');
            _users.push(u);
        });
        res.status(200).json({
            Message: 'Success',
            docs: _users
        });
    });
});
module.exports = router;