(function(){
	 var  ListAllIdeasCtrl = function($scope, $location, $routeParams, $window, userServices) {

		 console.log('Page loaded.');
$scope.items = [];
$scope.comments=[];
$scope.showDiv=false;
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

          $scope.toggle = function(id){

              if($scope.showDiv==id){
                  $scope.showDiv=-1;
              }
              else{
                  $scope.showDiv=id;
              }
          };
$scope.getcomments = function(id){
    userServices.getcomments(id)
                    .then(function (ideas) {
                        $scope.comments = ideas.data;
                    })
                    .catch(function (err) {
                         $scope.items.pop();
                    $scope.items.push(err.data.message);
                    });
};
$scope.returntomenu = function(){
    window.location="/menu";
};
$scope.addcomment = function(idea,com){
    var kk = {
        "author": $scope.user.idusers,
        "idideas": idea,
        "text": com
    };
    if(confirm('Are you sure you want to create this comment? This action is irreversible')){
     userServices.addcomment(kk)
                .then(function (res) {
                   alert("Comment Added");
                   $window.location.reload();
                })
                .catch(function (err) {
                    $scope.items.pop();
                    $scope.items.push(err.data.message);
                    
                });
    }
};
     
$scope.pop = function () {
            $scope.items.pop();
        };
	 };
	 // Injecting modules used for better minifing later on
    ListAllIdeasCtrl.$inject = ['$scope', '$location', '$routeParams', '$window','userServices'];

    // Enabling the controller in the app
    angular.module('ideasmanagement').controller('ListAllIdeasCtrl', ListAllIdeasCtrl);
}());