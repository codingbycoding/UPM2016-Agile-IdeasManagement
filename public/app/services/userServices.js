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







    };

    // Injecting modules used for better minifing later on
    userServices.$inject = ['$q', '$http', '$cookies', '$window'];

    // Enabling the service in the app
    angular.module('ideasmanagement').service('userServices', userServices);

}());