(function(){
	 var  AddideaCtrl = function($scope, $location, $routeParams, $window, userServices) {

		 console.log('Page loaded.');

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
                                        window.location="/menu";
                                    })
                                    .catch(function (err) {
                                        console.log("Failed to save Idea.");
                                    });

                        })
                        .catch(function(err) {
                            console.log('User error.');
                            console.log(err);
                        });
	

           
        }   
       

	 };
	 // Injecting modules used for better minifing later on
    AddideaCtrl.$inject = ['$scope', '$location', '$routeParams', '$window','userServices'];

    // Enabling the controller in the app
    angular.module('ideasmanagement').controller('AddideaCtrl', AddideaCtrl);
}());
