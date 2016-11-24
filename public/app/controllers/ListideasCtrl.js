(function(){
	 var  ListideasCtrl = function($scope, $location, $routeParams, $window, userServices) {

		 console.log('Page loaded.');
$scope.items = [];
$scope.items1 = [];
$scope.draft="0";
$scope.idea1=[];
         userServices.logged()
          .then(function(result) {
              console.log('User data loaded.');
              $scope.user = result.data;
              $scope.userid = result.data.idusers;
			  authorid = result.data.idusers;
			  
			  userServices.getIdeasByAuthor(authorid)
                    .then(function (ideas) {
                        $scope.ideas = ideas.data;
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

$scope.updateidea = function(){
     var ll = 
                                {
                                    "id": $scope.idea1.idideas,
                                    "title": $scope.idea1.ideatitle,
                                    "description": $scope.idea1.ideadescription,
                                    "health": $scope.idea1.health,
                                    "social": $scope.idea1.social,
                                    "economic": $scope.idea1.economic,
                                    "cientific": $scope.idea1.cientific,
                                    "educational": $scope.idea1.educational,
                                    "business": $scope.idea1.business,
                                    "finance": $scope.idea1.finance,
                                    "personal": $scope.idea1.personal,
                                    "draft": $scope.draft,
                                    "price": $scope.idea1.price
                                };

     userServices.updateIdea(ll)
                .then(function (res) {
                   alert("Idea updated");
                   $window.location.reload();
                })
                .catch(function (err) {
                    $scope.items1.pop();
                    $scope.items1.push(err.data.message);
                    
                });
};
    $scope.deleteidea = function(idea) {
                   var ll = 
                                {
                                    "id": idea.idideas
                                };
if (confirm('Are you sure you want to delete this?')) {
                                userServices.deleteIdea(ll)
                                    .then(function (result) {
                                        alert("Idea deleted");
                                        $window.location.reload();
                                    })
                                    .catch(function (err) {
                                        $scope.items.pop();
                    $scope.items.push(err.data.message);
                                    }); 
        }  
};
    
         $scope.ideatoupdatef = function (idea) {
            $scope.idea1 = idea;
            $scope.idea1.health="0";
            $scope.idea1.social="0";
            $scope.idea1.economic="0";
            $scope.idea1.cientific="0";
            $scope.idea1.educational="0";
            $scope.idea1.business="0";
            $scope.idea1.finance="0";
            $scope.idea1.personal="0";
        };
$scope.pop = function () {
            $scope.items.pop();
        };
         $scope.pop1 = function () {
            $scope.items1.pop();
        };
	 };
	 // Injecting modules used for better minifing later on
    ListideasCtrl.$inject = ['$scope', '$location', '$routeParams', '$window','userServices'];

    // Enabling the controller in the app
    angular.module('ideasmanagement').controller('ListideasCtrl', ListideasCtrl);
}());