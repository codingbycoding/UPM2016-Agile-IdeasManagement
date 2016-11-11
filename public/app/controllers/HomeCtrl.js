(function(){
	 var  HomeCtrl = function($scope, $location, $routeParams, $window, userServices) {

		 console.log('Page loaded.');
		  $scope.logged = function(){
            userServices.logged()
                .then(function(res){
                    $scope.hasSession=res;
                    $scope.hasSession.logged=true;
                })
                .catch( function (err){
					if(getPath()!="/" && getPath()!="/forbidden")
						window.location.replace("/");
                    $scope.hasSession.logged=false;
                });
        };
$scope.logged();
         $scope.pop = function () {
            $scope.items.pop();
        };
		 $scope.hasSession="";
		         $scope.redirect2 = function(){
            $window.location.href = '/';
        };
		 getPath = function() {
			return $location.$$path;
		 }

		

        $scope.logout = function(){
            userServices.logout();
        };
		

	 };
	 // Injecting modules used for better minifing later on
    HomeCtrl.$inject = ['$scope', '$location', '$routeParams', '$window','userServices'];

    // Enabling the controller in the app
    angular.module('ideasmanagement').controller('HomeCtrl', HomeCtrl);
}());