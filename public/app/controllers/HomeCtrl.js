(function(){
	 var  HomeCtrl = function($scope, $location, $routeParams, $window, userServices) {

		 console.log('Page loaded.');
         $scope.hasSession="";
         $scope.items = [];
		 
		$scope.permission = -1;
	    $scope.login = function(user,remember){
             userServices.login(user, remember)
                .then(function (res) {
                    $scope.items.pop();
                    $scope.items.push();
                     if(res.data.permission=="1")
                        $window.location.href = '/menu';
                    else
                        $window.location.href = '/listideas';
                })
                .catch(function (err) {
                    $scope.items.pop();
                    $scope.items.push(err.data.message);
                    
                });
            
        };
        $scope.register = function(user){
             userServices.register(user)
                .then(function (res) {
                    $scope.items.pop();
                    $scope.items.push();
                    $scope.login(user,false);
                })
                .catch(function (err) {
                    $scope.items.pop();
                    $scope.items.push(err.data.message);
                    
                });
            
        };
        $scope.redirect = function(){
            if($scope.hasSession.data.permission=="1"){
                        $window.location.href = '/menu';
            }
                    else {
                        $window.location.href = '/listideas';
                    }
        };
        $scope.hasAdminLevel = function() {
			return $scope.permission <= 1;
		}
		
		$scope.hasSubLevel = function() {
			return $scope.permission <= 0;
		}
        $scope.logged = function(){
            userServices.logged()
                .then(function(res){
                    $scope.hasSession=res;
					$scope.permission=res.data.permission;
                    $scope.hasSession.logged=true;
                    if($scope.getPath()=="/")
					    $scope.redirect();
                })
                .catch( function (err){
                    $scope.hasSession.logged=false;
                });
                
        };
        $scope.logout = function(){
            userServices.logout();
        };
         $scope.pop = function () {
            $scope.items.pop();
        };
        
		$scope.logged();
        $scope.getPath = function() {
			return $location.$$path;
		 }

	 };
	 // Injecting modules used for better minifing later on
    HomeCtrl.$inject = ['$scope', '$location', '$routeParams', '$window','userServices'];

    // Enabling the controller in the app
    angular.module('ideasmanagement').controller('HomeCtrl', HomeCtrl);
}());