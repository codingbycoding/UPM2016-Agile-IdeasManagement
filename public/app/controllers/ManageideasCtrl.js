(function(){
	 var  ManageideasCtrl = function($scope, $location, $routeParams, $window, userServices) {

		 console.log('Page loaded.');

        
			  userServices.getIdeas()
                    .then(function (ideas) {
                        $scope.ideas = ideas.data;
                        var i;
                    })
                    .catch(function (err) {
                        console.log("ERROR");
                    });

            $scope.deleteidea = function(ideaid) {
                   var ll = 
                                {
                                    "id": ideaid
                                };

                                userServices.deleteIdea(ll)
                                    .then(function (result) {
                                        window.location="/menuadmin";
                                    })
                                    .catch(function (err) {
                                        console.log("Failed to delete Idea.");
                                    }); 
        }  



         
       

	 };
	 // Injecting modules used for better minifing later on
    ManageideasCtrl.$inject = ['$scope', '$location', '$routeParams', '$window','userServices'];

    // Enabling the controller in the app
    angular.module('ideasmanagement').controller('ManageideasCtrl', ManageideasCtrl);
}());