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

        // Route to send forbidden view
        server.get('/forbidden', function (req, res) {
            res.render('index');
        });


        // <!------------------------------------------------------------------ USERS ---------------------------------------------------------------------------------------------------->

        server.get('/api/users', function (req, res) {

            database.getUser()
               .then(function (user) {
                    res.status(200).send(user);
                })
                .catch(function (err) {
                    res.status(406).send('ERRORUSERINFORMATION');
                });

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


        server.delete("/api/deleteuser",function(req,res){

            var email = req.body.email.toLowerCase();

            database.deleteUserByEmail(email)
                .then(function() {

                    res.status(200);

                })
                .catch(function (err) {


                    // Send the Response with message error
                    res.status(406).json({
                        message_class: 'error',
                        message: "ERRORDELETEUSER"
                    });

                });
        });

        server.put("/api/updateuseremail",function(req,res){

            //user to be edited
            var user = {
                id: req.body.idusers,
                name: req.body.name,
                email: req.body.email.toLowerCase(),
                permission: req.body.permissionid
            };
            var oldemail=req.body.oldemail.toLowerCase();
            //admin making the edition
            var admin = {
                pass: req.body.confirmpass,
                email: req.body.adminemail
            }

            database.checkPasswordbyEmail(admin.email, admin.pass)
                .then(function(){
                    database.updateUserByID(user.id,user.email, user.name, user.permission)
                        .then(function() {                            
                            res.status(200).json({
                                message: "SUCCESS"
                            });
                            
                        })
                        .catch(function (err) {
                           
                            res.status(406).json({
                                message_class: 'error',
                                message: "ERRORUPDATEUSEREMAIL"
                            });

                        });
                })
                .catch(function (err) {
                    // Send the Response with message error
                    res.status(406).json({
                        message_class: 'error',
                        message: "ERRORUPDATEUSEREMAILPASS"
                    });

                });
        });

    };
} ());
