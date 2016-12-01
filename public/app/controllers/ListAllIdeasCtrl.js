(function(){
	 var  ListAllIdeasCtrl = function($scope, $location, $routeParams, $window, userServices) {

		 console.log('Page loaded.');
$scope.categories = [
{name:'Health'}, 
{name:'Social'}, 
{name:'Economic'}, 
{name:'Finance'}, 
{name:'Personal'}, 
{name:'Business'}, 
{name:'Scientific'}, 
{name:'Educational'}
];     

$scope.myCategory = $scope.categories[2];

console.log($scope.categories);

$scope.items = [];
$scope.comments=[];
$scope.userid;
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
$scope.upvote = function(id,x){
    var ll={
        "idi": id,
        "idu": $scope.userid
    };
    alert(x);
     userServices.upvote(ll)
                    .then(function (ideas) {
                        alert('Idea upvoted');
                       window.location="/list_all_ideas";
                    })
                    .catch(function (err) {
                         $scope.items.pop();
                    $scope.items.push(err.data.message);
                    });
};

$scope.downvote = function(id){
    var ll={
        "idi": id,
        "idu": $scope.userid
    };
     userServices.downvote(ll)
                    .then(function (ideas) {
                        alert('Idea downvoted');
                       window.location="/list_all_ideas";
                    })
                    .catch(function (err) {
                         $scope.items.pop();
                    $scope.items.push(err.data.message);
                    });
};

$scope.getvotes = function(id){
     return userServices.getvotes(id)
                    .then(function (ideas) {
                        return ideas.data;
                    })
                    .catch(function (err) {
                         $scope.items.pop();
                    $scope.items.push(err.data.message);
                    }).$$state.status;
};

$scope.checkvote = function(id){
    var ll={
        "idi": id.idideas,
        "idu": $scope.userid
    };
    var x="a";
    id.votesc={};
     userServices.checkvote(ll)
     
                    .then(function (ideas) {
                        id.votesc= ideas.data;
                    })
                    .catch(function (err) {
                         $scope.items.pop();
                    $scope.items.push(err.data.message);
                    });
                    
};

$scope.deletevote = function(id){
    var ll=
    {
        "idi": id,
        "idu": $scope.userid
    };
     userServices.deletevote(ll)
                    .then(function (ideas) {
                         alert('Vote deleted');
                       window.location="/list_all_ideas";
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

    var kk = 
    {
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