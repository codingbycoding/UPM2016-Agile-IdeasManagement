(function(){
	 var  AddideaCtrl = function($scope, $location, $routeParams, $window, userServices) {

		 console.log('Page loaded.');
$scope.items = [];
$scope.draft="0";
         	  $scope.addidea = function(idea) {
                   alert($scope.draft);
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
                                    "author": authorid,
                                    "health": idea.health,
                                    "social": idea.social,
                                    "economic": idea.economic,
                                    "cientific": idea.cientific,
                                    "educational": idea.educational,
                                    "business": idea.business,
                                    "finance": idea.finance,
                                    "personal": idea.personal,
                                    "draft": $scope.draft,
                                    "price": idea.price
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
