(function () {

    'use strict';
     var database = require('../database/database'),
         utils = require('../middleware/utils'),
         cookie = require('../middleware/cookie'),
         crypto = require('crypto'),
         inspect = require('util').inspect,
         validator = require("email-validator")
    // Main router where all routes are called. This is done so the project code is cleaner and more maintainable.
    module.exports = function (server) {

        //<!------------------------------------------------------------------ RENDERS ---------------------------------------------------------------------------------------------------->

        server.get('/', function (req, res) {
            res.render('index');
        });

        server.get('/home', function (req, res) {
            res.render('index');
        });
        server.get('/menu', function (req, res) {
            res.render('index');
        });
        server.get('/listideas', function (req, res) {
            res.render('index');
        });

        // Route to send forbidden view
        server.get('/forbidden', function (req, res) {
            res.render('index');
        });


        // <!------------------------------------------------------------------ USERS ---------------------------------------------------------------------------------------------------->

       server.get('/api/verifysession', function (req, res){
             if (req.cookies.session) {
                cookie.verifySession(req.cookies.session)
                    .then(function (user) {
                        res.status(200).json(user);
                    })
                    .catch(function (err) {
                        res.status(406).send('ERRORSESSION');
                    });
            } else {
                res.status(404).send('ERRORSESSION');
            }
        });
       
        server.post('/api/login', function (req, res) {
            var user = {
                email: req.body.email.toLowerCase(),
                password: utils.checkPassword(req.body.password)
            };
            req.checkBody("email", "ERRORLOGIN").isEmail();

             if(req.validationErrors() || user.password==""){
                 res.status(406).json({
                        message_class: 'error',
                        message: "ERRORLOGIN"
                    });
             }

            
            database.confirmLoginByEmail(user)
                 .then(function (user) {
                    utils.encode(user.token)
                        .then(function (encoded) {
                            user.token=encoded;
                            res.status(200).json(user);
                        })
                        .catch(function (err) {
                           res.status(406).json({
                        message_class: 'error',
                        message: "ERRORLOGIN1"
                    });
                        });

                })
                .catch(function (err) {

                    // Send the Response with message error
                    res.status(406).json({
                        message_class: 'error',
                        message: "ERRORLOGIN"
                    });

                });

        });


    };
} ());
