(function(){
	 var  ListAllIdeasCtrl = function($scope, $location, $routeParams, $window, userServices) {

		 console.log('Page loaded.');
$scope.items = [];
         userServices.logged()
          .then(function(result) {
              console.log('User data loaded.');
              $scope.user = result.data;
              $scope.userid = result.data.idusers;
			  authorid = result.data.idusers;
			  
			  userServices.getAllIdeas(authorid)
                    .then(function (ideas) {
                        $scope.ideas = ideas.data;
                        console.log($scope.ideas);
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
    ListAllIdeasCtrl.$inject = ['$scope', '$location', '$routeParams', '$window','userServices'];

    // Enabling the controller in the app
    angular.module('ideasmanagement').controller('ListAllIdeasCtrl', ListAllIdeasCtrl);
}());