(function(){
	 var  ManageideasCtrl = function($scope, $location, $routeParams, $window, userServices) {

		 console.log('Page loaded.');
$scope.items = [];
        
			  userServices.getIdeas()
                    .then(function (ideas) {
                        $scope.ideas = ideas.data;
                        var i;
                    })
                    .catch(function (err) {
                        $scope.items.pop();
                    $scope.items.push(err.data.message);
                    });

            $scope.deleteidea = function(ideaid) {
                   var ll = 
                                {
                                    "id": ideaid
                                };
if (confirm('Are you sure you want to delete this?')) {
                                userServices.deleteIdea(ll)
                                    .then(function (result) {
                                        $window.location.reload();
                                    })
                                    .catch(function (err) {
                                        $scope.items.pop();
                    $scope.items.push(err.data.message);
                                    }); 
        }  
}
$scope.pop = function () {
            $scope.items.pop();
        };

         
       

	 };
	 // Injecting modules used for better minifing later on
    ManageideasCtrl.$inject = ['$scope', '$location', '$routeParams', '$window','userServices'];

    // Enabling the controller in the app
    angular.module('ideasmanagement').controller('ManageideasCtrl', ManageideasCtrl);
}());