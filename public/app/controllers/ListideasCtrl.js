(function(){
	 var  ListideasCtrl = function($scope, $location, $routeParams, $window, userServices) {

		 console.log('Page loaded.');
$scope.items = [];
$scope.items1 = [];
$scope.draft="0";
$scope.ideatoupdate = [];
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

$scope.updateidea = function(idea){
    alert("qqqqqqqqqq");
    idea.idideas=$scope.ideatoupdate.idideas;
     userServices.updateIdea(idea)
                .then(function (res) {
                   alert("Idea updated");
                   $window.location.reload();
                })
                .catch(function (err) {
                    $scope.items1.pop1();
                    $scope.items1.push(err.data.message);
                    
                });
};
     $scope.pop1 = function () {
            $scope.items1.pop();
        };
         $scope.ideatoupdatef = function (idea) {
            $scope.ideatoupdate = idea;
            $scope.idea1 = idea;
            alert(JSON.stringify($scope.ideatoupdate));
        };
$scope.pop = function () {
            $scope.items.pop();
        };
	 };
	 // Injecting modules used for better minifing later on
    ListideasCtrl.$inject = ['$scope', '$location', '$routeParams', '$window','userServices'];

    // Enabling the controller in the app
    angular.module('ideasmanagement').controller('ListideasCtrl', ListideasCtrl);
}());