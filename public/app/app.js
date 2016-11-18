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
            .when("/menuadmin", {
				templateUrl: "app/views/menuadmin.html",
                controller: "MenuAdminCtrl",
				css: "styles/home.css"
            })
            .when("/menu", {
				templateUrl: "app/views/menu.html",
                controller: "HomeCtrl",
				css: "styles/home.css"
            })
            .when("/listmyideas", {
				templateUrl: "app/views/listideas.html",
                controller: "ListideasCtrl",
				css: "styles/home.css"
            })
            .when("/addidea", {
				templateUrl: "app/views/addidea.html",
                controller: "AddideaCtrl",
                css: "styles/addIdea.css"
            })
            .when("/manageideas", {
				templateUrl: "app/views/manageideas.html",
                controller: "HomeCtrl",
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
