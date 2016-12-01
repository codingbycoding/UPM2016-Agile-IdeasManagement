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

    exports.get_all_users = function(){
        return new Promise(function (resolve, reject) {
            client.query("SELECT * FROM public.users",
                         function (err, result) {
                             if (err) {
                                 reject(err);
                             } else {
                                 resolve(result);
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
         client.query("SELECT public.ideas.*, public.users.name FROM public.ideas INNER JOIN public.users ON public.users.idusers=public.ideas.idcreator WHERE ideas.draft='0'",
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
         client.query("SELECT public.ideas.*, public.users.name FROM public.ideas INNER JOIN public.users ON public.users.idusers=public.ideas.idcreator WHERE ideas.draft='0'",
            function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
         });
    }

    exports.insertidea = function (title,description,authorid,health,social,economic,cientific,educational,business,finance,personal,draft,price) {
        return new Promise(function (resolve, reject) {
            client.query('INSERT INTO public.ideas SET ?', {idcreator: authorid, ideatitle: title, ideadescription: description, health: health, social: social, economic: economic, cientific: cientific, educational: educational, business: business, finance: finance, personal: personal, draft: draft, price: price, votes: 0},
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

    exports.updateidea = function (id,title,description,authorid,health,social,economic,cientific,educational,business,finance,personal,draft,price) {
        return new Promise(function (resolve, reject) {
         client.query('UPDATE public.ideas SET ideatitle=?, ideadescription=?, health=?,social=?,economic=?,cientific=?,educational=?,business=?,finance=?,personal=?,draft=?,price=?  WHERE idideas = ?', [title,description,health,social,economic,cientific,educational,business,finance,personal,draft,price,id],
            function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
         });
    }

    exports.getcomments = function(id,idauthor){
         return new Promise(function (resolve, reject) {
         client.query("SELECT public.comments.*, public.users.name FROM public.comments INNER JOIN public.users ON public.users.idusers=public.comments.idauthor WHERE comments.ididea=?",[id],
            function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
         });
    }

    exports.addcomment = function(id,idauthor,text){
         return new Promise(function (resolve, reject) {
         client.query('INSERT INTO public.comments SET ?', {idauthor: idauthor,ididea: id,text: text},
            function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
         });
    }

    exports.deletecomment = function(id){
         return new Promise(function (resolve, reject) {
         client.query('DELETE FROM public.comments WHERE idcomments=?', [id],
            function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
         });
    }

    exports.deletevote = function(idi,idu){
         return new Promise(function (resolve, reject) {
         client.query('DELETE FROM public.votes WHERE user=? and idea=?', [idu,idi],
            function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
         });
    }

    exports.checkvote = function(idi,idu){
         return new Promise(function (resolve, reject) {
             
         client.query('SELECT idvotes FROM public.votes WHERE user='+idu+' AND idea='+idi,
            function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
         });
    }

    exports.getvotes = function(idi){
         return new Promise(function (resolve, reject) {
         client.query('SELECT votes FROM public.ideas WHERE idideas=?', [idi],
            function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
         });
    }

    exports.upvote = function(idi){
         return new Promise(function (resolve, reject) {
         client.query('UPDATE public.ideas SET votes=votes+1 WHERE idideas=?', [idi],
            function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
         });
    }

    exports.downvote = function(idi){
         return new Promise(function (resolve, reject) {
         client.query('UPDATE public.ideas SET votes=votes-1 WHERE idideas=?', [idi],
            function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
         });
    }

    exports.insertvote = function(idi,idu,x){
         return new Promise(function (resolve, reject) {
         client.query('INSERT INTO public.votes SET ?', {user: idu, idea: idi,up:x},
            function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
         });
    }

    exports.decreasevote = function(idi,idu){
         return new Promise(function (resolve, reject) {
         client.query('SELECT up FROM public.votes WHERE user='+idu+' AND idea='+idi,
            function (err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        if(result[0].up==0)
                            client.query('UPDATE public.ideas SET votes=votes+1 WHERE idideas=?', [idi],
                                function (err, result) {
                                        if (err) {
                                            reject(err);
                                        } else {
                                            resolve(result);
                                        }
                                    });
                        else
                             client.query('UPDATE public.ideas SET votes=votes-1 WHERE idideas=?', [idi],
                                function (err, result) {
                                        if (err) {
                                            reject(err);
                                        } else {
                                            resolve(result);
                                        }
                                    });
                        resolve(result);
                    }
                });
         });
    }

    


}());
