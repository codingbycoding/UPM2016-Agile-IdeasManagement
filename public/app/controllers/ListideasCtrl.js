(function(){
	 var  ListideasCtrl = function($scope, $location, $routeParams, $window, userServices) {

		 console.log('Page loaded.');

         userServices.logged()
          .then(function(result) {
              console.log('User data loaded.');
              $scope.user = result.data;
              $scope.userid = result.data.idusers;
			  authorid = result.data.idusers;
			  
			  userServices.getIdeasByAuthor(authorid)
                    .then(function (ideas) {
                        $scope.ideas = ideas.data;
                        console.log($scope.ideas);
                        var i;
                    })
                    .catch(function (err) {
                        $scope.items.push("Field projects: " + err.data);
                    });



          })
          .catch(function(err) {
              console.log('User error.');
              console.log(err);
          });
     

	 };
	 // Injecting modules used for better minifing later on
    ListideasCtrl.$inject = ['$scope', '$location', '$routeParams', '$window','userServices'];

    // Enabling the controller in the app
    angular.module('ideasmanagement').controller('ListideasCtrl', ListideasCtrl);
}());