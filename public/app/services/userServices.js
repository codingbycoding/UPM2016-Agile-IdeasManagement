(function() {

    'use strict';
    var userServices = function($q, $http, $cookies, $window) {
        var deferred = $q.defer();

       // Function to login a user
        this.login = function(user, remember) {

            return $http.post('/api/login', user)
                .success(function(res) {
                    
                    var now = new Date(),
                        exp;
                    if (remember) {
                        exp = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
                    } else {
                        exp = null;
                    }

                    $cookies.put('session', res.token, {
                        path: '/',
                        expires: exp
                    });
                    //$window.location.href = '/home';

                    deferred.resolve('Success');

                })
                .error(function(err) {
                    deferred.reject(err);
                });

        };
        this.register = function(user) {

            return $http.post('/api/register', user)
                .success(function(res) {

                    //$window.location.href = '/home';

                    deferred.resolve('Success');

                })
                .error(function(err) {
                    deferred.reject(err);
                });

        };
        this.logged = function() {
            return $http.get('/api/verifysession')
                .success(function(res) {
                    deferred.resolve(res.data);
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };

        // Function to logout a user
        this.logout = function() {
            $cookies.remove('session', {
                path: '/'
            });

            $window.location.href = '/';

        };

        this.getAllUsers = function() {
            return $http.get('/api/get_all_users')
                .success(function(res) {
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };

        
      this.getIdeasByAuthor = function(userid) {
            var config = {
                headers: {
                    'authorid': userid
                }
            };
            return $http.get('/api/ideasbyauthor', config)
                .success(function(res) {
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };

        this.getAllIdeas = function(userid) {
            var config = {
                headers: {
                    'authorid': userid
                }
            };
            return $http.get('/api/get_all_ideas', config)
                .success(function(res) {
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    deferred.reject(err);
                });
        };

         this.getIdeas = function() {
            return $http.get('/api/ideas')
                .success(function(res) {
                    deferred.resolve('Success');
                })
                .error(function(err) {
                    console.log(err);
                    deferred.reject(err);
                });
        };

        this.createIdea = function(idea) {
        return $http.post('/api/createidea', idea)
            .success(function(res) {
                deferred.resolve("Success");
            })
            .error(function(err) {
                deferred.reject(err);
            });

    };
    this.deleteIdea = function(idea) {

        return $http.post('/api/deleteidea', idea)
            .success(function(res) {
                deferred.resolve(res.insertId);
            })
            .error(function(err) {
                deferred.reject(err);
            });

    };
    this.updateIdea = function(idea) {

        return $http.post('/api/updateidea', idea)
            .success(function(res) {
                deferred.resolve("Success");
            })
            .error(function(err) {
                deferred.reject(err);
            });

    };
    this.addcomment = function(idea) {

        return $http.post('/api/addcomment', idea)
            .success(function(res) {
                deferred.resolve("Success");
            })
            .error(function(err) {
                deferred.reject(err);
            });

    };
    this.getcomments = function(idea) {
        var config = {
                headers: {
                    'idideas': idea
                }
            };
        return $http.get('/api/getcomments', config)
            .success(function(res) {
                deferred.resolve("Success");
            })
            .error(function(err) {
                deferred.reject(err);
            });

    };
    this.deletecomment = function(idea) {

        return $http.post('/api/getcomments', idea)
            .success(function(res) {
                deferred.resolve("Success");
            })
            .error(function(err) {
                deferred.reject(err);
            });

    };





    };

    // Injecting modules used for better minifing later on
    userServices.$inject = ['$q', '$http', '$cookies', '$window'];

    // Enabling the service in the app
    angular.module('ideasmanagement').service('userServices', userServices);

}());
