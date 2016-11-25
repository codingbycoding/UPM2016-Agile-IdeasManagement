(function(){
    var  ListAllUsersCtrl = function($scope, $location, $routeParams, $window, userServices) {
        
	console.log('Page loaded.');
        $scope.items = [];
        $scope.returntomenu = function(){
    window.location="/menuadmin";
};
        userServices.logged()
            .then(function(result) {
                console.log('User data loaded.');
                $scope.user = result.data;
                $scope.userid = result.data.idusers;
		
		userServices.getAllUsers()
                    .then(function (users) {
                        console.log(users.data);
                        $scope.users = users.data;
                        console.log($scope.users);
                        var i;
                    })
                    .catch(function (err) {
                        $scope.items.pop();
                        $scope.items.push(err.data.message);
                    });



            })
            .catch(function(err) {
                $scope.items.pop();
                $scope.items.push(err.data.message);
            });
        
        $scope.pop = function () {
            $scope.items.pop();
        };
    };
    // Injecting modules used for better minifing later on
    ListAllUsersCtrl.$inject = ['$scope', '$location', '$routeParams', '$window','userServices'];

    // Enabling the controller in the app
    angular.module('ideasmanagement').controller('ListAllUsersCtrl', ListAllUsersCtrl);
}());
