(function() {

    'use strict';
    var Promise = require('bluebird'),
        mysql = require("mysql"),
        crypto = require('crypto'),
        bcrypt = require('bcrypt-nodejs'),
        client;

    exports.connect = function(){
        return new Promise(function(resolve, reject) {
            client = mysql.createPool({
                    connectionLimit : 100,
                    waitForConnection: true,
                    host     : 'localhost',
                    user     : 'root',
                    password : 'root1',
                    database : 'public',
                    debug    :  false
                });
                if(!client){
                    reject('Error creating pool for the database!');
                }
                else{
                    resolve();
                }
        });
    }

    <!------------------------------------------------------------------------------------------------ USERS ------------------------------------------------------------->

    exports.getUserByToken = function(token){
            return new Promise(function (resolve, reject) {
            var query = "SELECT * FROM public.users WHERE token = ?";
            query = mysql.format(query,token);
            client.query(query,function (err, result) {
                        if (err) {
                            reject(err);
                        } else if(result!=[] && result.length > 0){
                            delete result[0]['password'];
                            //delete result[0]['idusers'];
                            resolve(result[0]);
                        }
                        else{
                            reject("No users");
                        }
                    });
            });
        }
    exports.confirmLoginByEmail = function(user){
         return new Promise(function (resolve, reject) {
         var query = "SELECT * FROM public.users WHERE email = ?";
         query = mysql.format(query,user.email);
         client.query(query,function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        if (result.length > 0) {
                            bcrypt.compare(user.password, result[0].password,
                                function (err, res) {
                                    if (err) {
                                        reject(err);
                                    } else if (res === true) {
                                        delete result[0]._password;
                                        resolve(result[0]);
                                    } else if (res === false) {
                                        reject('Incorrect password.');
                                    }
                                });
                        } else {
                            reject('No users found with such email./Banned');
                        }
                    }
                });
         });
    }

    exports.insertUser = function (email, password, name, permission) {
        return new Promise(function (resolve, reject) {
            bcrypt.hash(password, null, null, function (err, hash) {
                if (err) {
                    reject(err);
                } else {
                    crypto.randomBytes(20, function (err, buf) {
                        if (err) {
                            reject(err);
                        } else {
                            client.query('INSERT INTO public.users SET ?', {email: email, name: name, password: hash, permission: permission, token: buf.toString('hex')},
                                function (err, result) {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        resolve(result.insertId);
                                    }
                                });
                        }
                    });
                }
            });
        });
    }
    exports.getideasbyauthor = function(iduser){
         return new Promise(function (resolve, reject) {
         client.query("SELECT * FROM public.ideas WHERE idcreator=?",[iduser],
            function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
         });
    }

        exports.get_all_ideas = function(iduser){
         return new Promise(function (resolve, reject) {
         client.query("SELECT * FROM public.ideas",
            function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
         });
    }

    exports.getideas = function(){
         return new Promise(function (resolve, reject) {
         client.query("SELECT public.ideas.*, public.users.name FROM public.ideas INNER JOIN public.users ON public.users.idusers=public.ideas.idcreator",
            function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
         });
    }

    exports.insertidea = function (title,description,authorid) {
        return new Promise(function (resolve, reject) {
            client.query('INSERT INTO public.ideas SET ?', {idcreator: authorid, ideatitle: title, ideadescription: description},
                                function (err, result) {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        resolve(result);
                                    }
                                });

        });
    }

    exports.deleteidea = function (id) {
        return new Promise(function (resolve, reject) {
            client.query('DELETE FROM public.ideas WHERE idideas=?', [id],
                                function (err, result) {
                                    if (err) {
                                        reject(err);
                                    } else {
                                        resolve(result);
                                    }
                                });

        });
    }


}());
