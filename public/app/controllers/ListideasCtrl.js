(function(){
	 var  ListideasCtrl = function($scope, $location, $routeParams, $window, userServices) {

		 console.log('Page loaded.');


       

	 };
	 // Injecting modules used for better minifing later on
    ListideasCtrl.$inject = ['$scope', '$location', '$routeParams', '$window','userServices'];

    // Enabling the controller in the app
    angular.module('ideasmanagement').controller('ListideasCtrl', ListideasCtrl);
}());