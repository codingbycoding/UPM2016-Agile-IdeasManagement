(function(){
	 var  HomeCtrl = function($scope, $location, $routeParams, $window, userServices) {

		 console.log('Page loaded.');
         $scope.hasSession="";
         $scope.items = [];
         $scope.items1 = [];
		 
		$scope.permission = -1;
	    $scope.login = function(user,remember){
             userServices.login(user, remember)
                .then(function (res) {
                    $scope.items.pop();
                    $scope.items.push();
                     if(res.data.permission=="1")
                        $window.location.href = '/menuadmin';
                    else
                        $window.location.href = '/menu';
                })
                .catch(function (err) {
                    $scope.items.pop();
                    $scope.items.push(err.data.message);
                    
                });
            
        };
        $scope.toreturn2 = function(){
            $window.location.href ='/home';
        };
        $scope.register = function(user){
            if(user.password.length<5){
                $scope.items1.pop();
                    $scope.items1.push("Password too short");
            }
            else{
             userServices.register(user)
                .then(function (res) {
                    $scope.items1.pop();
                    $scope.items1.push();
                    $scope.login(user,false);
                })
                .catch(function (err) {
                    $scope.items1.pop();
                    $scope.items1.push(err.data.message);
                    
                });
            }
        };
        $scope.redirect = function(){
            if($scope.hasSession.data.permission=="1"){
                        $window.location.href = '/menuadmin';
            }
                    else {
                        $window.location.href = '/menu';
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
        $scope.pop1 = function () {
            $scope.items1.pop();
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