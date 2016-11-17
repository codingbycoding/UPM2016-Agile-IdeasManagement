(function() {

    'use strict';
    /**
     * Create the module and call the requires
     */
    var app = angular.module('ideasmanagement', [
        'ngRoute',
        'ngCookies',
        'ui.bootstrap'
    ]);

    /**
     * Configure the Routes */

    app.config(function($routeProvider, $locationProvider) {

        $routeProvider
            .when("/", {
				templateUrl: "app/views/home.html",
                controller: "HomeCtrl",
				css: "styles/home.css"
            })
            .when("/home", {
				templateUrl: "app/views/home.html",
                controller: "HomeCtrl",
				css: "styles/home.css"
            })
            .when("/menu", {
				templateUrl: "app/views/menu.html",
                controller: "MenuCtrl",
				css: "styles/home.css"
            })
            .when("/listideas", {
				templateUrl: "app/views/listideas.html",
                controller: "ListideasCtrl",
				css: "styles/home.css"
            })
             
            .otherwise({
                redirectTo: '/forbidden'
            });

        // Enabling HTML5 mode so that the URL doesn't show up with hashtags
        //$locationProvider.html5Mode({ enabled: true, requireBase: false });
        $locationProvider.html5Mode(true);

    });
}());
