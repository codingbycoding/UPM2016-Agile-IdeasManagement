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

    app.filter('searchAllIdeasFor', function(){
        return function(arr, searchString){
            if (!searchString) {
                return arr;
            }
            var result = [];
            searchString = searchString.toLowerCase();
            angular.forEach(arr, function(item) {
                if (item.ideatitle.toLowerCase().indexOf(searchString) !== -1
                    || item.ideadescription.toLowerCase().indexOf(searchString) !== -1
                    || item.name.toLowerCase().indexOf(searchString) !== -1) {
                    result.push(item);
                }
            });
            return result;
        };
    });

    app.filter('searchMyIdeasFor', function(){
        return function(arr, searchString){
            if (!searchString) {
                return arr;
            }
            var result = [];
            searchString = searchString.toLowerCase();
            angular.forEach(arr, function(item) {
                if (item.ideatitle.toLowerCase().indexOf(searchString) !== -1
                    || item.ideadescription.toLowerCase().indexOf(searchString) !== -1) {
                    result.push(item);
                }
            });
            return result;
        };
    });

    app.filter('filterByCategory', function() {
 
        return function(ideas, selectedCategory) {   
            var outIdeas = [];

            console.log("selectedCategory:" + selectedCategory);
            console.log("ideas:" + ideas);  

            if(selectedCategory == "" || typeof selectedCategory == 'undefined') {
                outIdeas = ideas;
            } else {

                for (var i = ideas.length - 1; i >= 0; i--) {                

                    if( (selectedCategory == "Health" && ideas[i].health =='1') 
                        || (selectedCategory == "Social" && ideas[i].social =='1')
                        || (selectedCategory == "Economic" && ideas[i].economic =='1')
                        || (selectedCategory == "Finance" && ideas[i].finance =='1')
                        || (selectedCategory == "Personal" && ideas[i].personal =='1')
                        || (selectedCategory == "Business" && ideas[i].business =='1')
                        || (selectedCategory == "Scientific" && ideas[i].cientific =='1')
                        || (selectedCategory == "Educational" && ideas[i].educational =='1')
                        ) {
                            outIdeas.push(ideas[i]);
                        }      
                }
            }

            return outIdeas;
          }

        });

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
                controller: "HomeCtrl",
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
            .when("/list_all_ideas", {
                templateUrl: "app/views/list_all_ideas.html",
                controller: "ListAllIdeasCtrl",
                css: "styles/home.css"
            })
            .when("/addidea", {
				templateUrl: "app/views/addidea.html",
                controller: "AddideaCtrl",
                css: "styles/addIdea.css"
            })
            .when("/manageideas", {
				templateUrl: "app/views/manageideas.html",
                controller: "ManageideasCtrl",
				css: "styles/home.css"
            })
            .when("/list_all_users", {
        		templateUrl: "app/views/list_all_users.html",
                controller: "ListAllUsersCtrl",
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
