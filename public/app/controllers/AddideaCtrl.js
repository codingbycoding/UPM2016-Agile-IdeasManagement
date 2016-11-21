(function(){
	 var  AddideaCtrl = function($scope, $location, $routeParams, $window, userServices) {

		 console.log('Page loaded.');
$scope.items = [];
         	  $scope.addidea = function(idea) {
                   userServices.logged()
                        .then(function(result) {
                            console.log('User data loaded.');
                            $scope.user = result.data;
                            $scope.userid = result.data.idusers;
                            authorid = result.data.idusers;
                            
                             var ll = 
                                {
                                    "title": idea.title,
                                    "description": idea.description,
                                    "author": authorid
                                };

                                userServices.createIdea(ll)
                                    .then(function (result) {
                                        alert("Idea created");
                                        window.location="/menu";
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
	

           
        }
         $scope.pop = function () {
            $scope.items.pop();
        };   
       

	 };
	 // Injecting modules used for better minifing later on
    AddideaCtrl.$inject = ['$scope', '$location', '$routeParams', '$window','userServices'];

    // Enabling the controller in the app
    angular.module('ideasmanagement').controller('AddideaCtrl', AddideaCtrl);
}());
