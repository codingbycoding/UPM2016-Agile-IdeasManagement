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
        server.get('/menuadmin', function (req, res) {
            res.render('index');
        });
        server.get('/addidea', function (req, res) {
            res.render('index');
        });
        server.get('/listmyideas', function (req, res) {
            res.render('index');
        });
        server.get('/manageideas', function (req, res) {
            res.render('index');
        });

        server.get('/list_all_ideas', function (req, res) {
            res.render('index');
        });

        server.get('/list_all_users', function (req, res) {
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
                        res.status(406).send('Session error');
                    });
            } else {
                res.status(404).send("Session doesn't exist");
            }
        });
       
        server.post('/api/login', function (req, res) {
            var user = {
                email: req.body.email.toLowerCase(),
                password: utils.checkPassword(req.body.password)
            };
            req.checkBody("email", "Not an correct email provided").isEmail();

             if(req.validationErrors() || user.password==""){
                 res.status(406).json({
                        message_class: 'error',
                        message: "Password empty"
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
                        message: "Error creating session, please try again later"
                    });
                        });

                })
                .catch(function (err) {

                    // Send the Response with message error
                    res.status(406).json({
                        message_class: 'error',
                        message: "Wrong password Or No account with that email registered"
                    });

                });

        });

        server.post('/api/register', function (req, res) {

    
        var email,pass,name,permission;
        email=req.body.email.toLowerCase();
        pass=req.body.password;
        name=req.body.name;
        permission="0";

            if(!validator.validate(email)){
                // Check if email is valid.
                res.status(400).json({
                    message_class: 'error',
                    message: 'Email provided is not valid'
                });
            }

            else{
            database.insertUser(email, pass, name, permission)
                .then(function (user_id) {
                    res.status(200).json({
                                message: "SUCCESS"
                            });
                })
                .catch(function (err) {

                        // If the e-mail is already in use
                        if (err.sqlState == '23000') {
                            // Send the Response with message error
                            res.status(406).json({
                                message_class: 'error',
                                message: "Email already in use"
                            });

                        } else {
                            // Sending the error to the log file
                            res.status(406).json({
                                message_class: 'error',
                                message: "Error adding user to the database, please try again later"
                            });

                        }
                    });
            }
        });

         server.get("/api/ideasbyauthor",function(req,res){

             var authorid = req.headers.authorid;
             database.getideasbyauthor(authorid)
               .then(function (ll) {
                    res.status(200).send(ll);
                })
                .catch(function (err) {
                    res.status(406).send('Error retrieving ideas from the database, please try again later');
                });
        });

         server.get("/api/all_ideas",function(req,res){

             var authorid = req.headers.authorid;
             database.getideasbyauthor(authorid)
               .then(function (ll) {
                    res.status(200).send(ll);
                })
                .catch(function (err) {
                    res.status(406).send('Error retrieving ideas from the database, please try again later');
                });
        });

         server.get("/api/ideas",function(req,res){

             database.getideas()
               .then(function (a) {
                    res.status(200).send(a);
                })
                .catch(function (err) {
                    res.status(406).send('Error retrieving ideas from the database, please try again later');
                });
        });

        server.get("/api/get_all_ideas",function(req,res){

         database.get_all_ideas()
           .then(function (a) {
                res.status(200).send(a);
            })
            .catch(function (err) {
                res.status(406).send('Error retrieving ideas from the database, please try again later');
            });
        });         

        server.get("/api/get_all_users",function(req,res){

            database.get_all_users()
                .then(function (a) {
                    res.status(200).send(a);
                })
                .catch(function (err) {
                    res.status(406).send('Error retrieving users from the database, please try again later');
                });
        });         

        server.post("/api/createidea",function(req,res){
                var title = req.body.title;
                var description = req.body.description;
                var authorid = req.body.author;
                var health = req.body.health;
                var social = req.body.social;
                var economic = req.body.economic;
                var cientific = req.body.cientific;
                var educational = req.body.educational;
                var business = req.body.business;
                var finance = req.body.finance;
                var personal = req.body.personal;
                var draft = req.body.draft;
                var price = req.body.price;
                if(health=="0" && social=="0" && economic=="0" && cientific=="0" && educational=="0" && business=="0" && finance=="0" && personal=="0"){
                    res.status(406).json({
                            message_class: 'error',
                            message: "Error, at least one category must be choosen"
                        });
                }
                database.insertidea(title,description,authorid,health,social,economic,cientific,educational,business,finance,personal,draft,price)
                    .then(function (idea) {
                        res.status(200).send(idea);
                    })
                    .catch(function (err) {
                        res.status(406).json({
                            message_class: 'error',
                            message: "Error adding idea to the database, please try again later"
                        });

                    });
         });

         server.post("/api/deleteidea",function(req,res){
                var id = req.body.id;

                database.deleteidea(id)
                    .then(function (idea) {
                        res.status(200).send(idea);
                    })
                    .catch(function (err) {
                        res.status(406).json({
                            message_class: 'error',
                            message: "Error removing idea from the database, please try again later"
                        });

                    });
         });

         server.post("/api/updateidea",function(req,res){
                var id = req.body.id;
                 var title = req.body.title;
                var description = req.body.description;
                var authorid = req.body.author;
                var health = req.body.health;
                var social = req.body.social;
                var economic = req.body.economic;
                var cientific = req.body.cientific;
                var educational = req.body.educational;
                var business = req.body.business;
                var finance = req.body.finance;
                var personal = req.body.personal;
                var draft = req.body.draft;
                var price = req.body.price;
                  if(health=="0" && social=="0" && economic=="0" && cientific=="0" && educational=="0" && business=="0" && finance=="0" && personal=="0"){
                    res.status(406).json({
                            message_class: 'error',
                            message: "Error, at least one category must be choosen"
                        });
                }
                database.updateidea(id,title,description,authorid,health,social,economic,cientific,educational,business,finance,personal,draft,price)
                    .then(function (idea) {
                        res.status(200).send(idea);
                    })
                    .catch(function (err) {
                        res.status(406).json({
                            message_class: 'error',
                            message: "Error updating idea in the database, please try again later"
                        });

                    });
         });

         server.get("/api/getcomments",function(req,res){
             var id = req.headers.idideas;

            database.getcomments(id)
                .then(function (a) {
                    res.status(200).send(a);
                })
                .catch(function (err) {
                    res.status(406).send('Error retrieving comments from the database, please try again later');
                });
        });

        server.post("/api/addcomment",function(req,res){
                var text = req.body.text;
                var id = req.body.idideas;
                var authorid = req.body.author;
                if(text==null){
                    res.status(406).json({
                            message_class: 'error',
                            message: "Error, you can't add an empty comment"
                        });
                }
                database.addcomment(id,authorid,text)
                    .then(function (idea) {
                        res.status(200).send(idea);
                    })
                    .catch(function (err) {
                        res.status(406).json({
                            message_class: 'error',
                            message: "Error adding comment to the database, please try again later"
                        });

                    });
         });

         server.post("/api/deletecomment",function(req,res){
                var id = req.body.id;
                database.deletecomment(id)
                    .then(function (idea) {
                        res.status(200).send(idea);
                    })
                    .catch(function (err) {
                        res.status(406).json({
                            message_class: 'error',
                            message: "Error removing comment from the database, please try again later"
                        });

                    });
         });

         server.post("/api/deletevote",function(req,res){
                var idi = req.body.idi;
                var idu = req.body.idu;
                database.decreasevote(idi,idu)
                    .then(function (idea) {
                        database.deletevote(idi,idu)
                            .then(function (idea) {
                                res.status(200).send(idea);
                            })
                            .catch(function (err) {
                                res.status(406).json({
                                    message_class: 'error',
                                    message: "Error deleting vote, please try again later"
                                });

                            });
                    })
                    .catch(function (err) {
                        res.status(406).json({
                            message_class: 'error',
                            message: "Error deleting vote, please try again later"
                        });

                    });
         });
         
         server.get("/api/checkvote",function(req,res){////////////////TWEAK
                var idi = req.headers.idi;
                var idu = req.headers.idu;
                database.checkvote(idi,idu)
                    .then(function (idea) {
                        if(idea.length==0){
                           res.status(200).send("0");
                        }
                        else{
                            res.status(200).send("1");
                        }
                        
                    })
                    .catch(function (err) {
                        res.status(406).json({
                            message_class: 'error',
                            message: "Error checking votes, please try again later"
                        });

                    });
         });

         server.get("/api/getvotes",function(req,res){
                var id = req.headers.idideas;
                
                database.getvotes(id)
                    .then(function (idea) {
                        res.status(200).send(idea);
                    })
                    .catch(function (err) {
                        res.status(406).json({
                            message_class: 'error',
                            message: "Error checking votes, please try again later"
                        });

                    });
         });
         //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
         server.post("/api/upvote",function(req,res){
                var idi = req.body.idi;
                var idu = req.body.idu;
                database.upvote(idi)
                    .then(function (idea) {
                        database.insertvote(idi,idu,1)
                            .then(function (idea) {
                                res.status(200).send(idea);
                            })
                            .catch(function (err) {
                                res.status(406).json({
                                    message_class: 'error',
                                    message: "Error upvoting idea, please try again later"
                                });

                            });
                    })
                    .catch(function (err) {
                        res.status(406).json({
                            message_class: 'error',
                            message: "Error upvoting idea, please try again later"
                        });

                    });
         });
         server.post("/api/downvote",function(req,res){
                var idi = req.body.idi;
                var idu = req.body.idu;
                database.downvote(idi)
                    .then(function (idea) {
                        database.insertvote(idi,idu,0)
                            .then(function (idea) {
                                res.status(200).send(idea);
                            })
                            .catch(function (err) {
                                res.status(406).json({
                                    message_class: 'error',
                                    message: "Error downvoting idea, please try again later"
                                });

                            });
                    })
                    .catch(function (err) {
                        res.status(406).json({
                            message_class: 'error',
                            message: "Error downvoting idea, please try again later"
                        });

                    });
         });
    };
} ());
