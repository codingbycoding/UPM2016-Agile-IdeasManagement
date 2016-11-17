(function(){
	 var  MenuCtrl = function($scope, $location, $routeParams, $window, userServices) {

		 console.log('Page loaded.');


       

	 };
	 // Injecting modules used for better minifing later on
    MenuCtrl.$inject = ['$scope', '$location', '$routeParams', '$window','userServices'];

    // Enabling the controller in the app
    angular.module('ideasmanagement').controller('MenuCtrl', MenuCtrl);
}());