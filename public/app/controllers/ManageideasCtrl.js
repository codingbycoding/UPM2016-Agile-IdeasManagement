(function(){
	 var  ManageideasCtrl = function($scope, $location, $routeParams, $window, userServices) {

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
$scope.users = [];
$scope.items = [];
        $scope.comments=[];
$scope.showDiv=false;
			  userServices.getIdeas()
                    .then(function (ideas) {
                        $scope.ideas = ideas.data;
                        for(var i=0;i<ideas.data.length;i++){
                            var y=0;
                            for(var x=0;x<$scope.users.length;x++){
                                if($scope.users[x].name==ideas.data[i].name)
                                    y=1;
                            }
                            if(y==0){
                                $scope.users.push({'name': ideas.data[i].name});
                            }
                        }
                        var i;
                        alert(JSON.stringify($scope.ideas));
                    })
                    .catch(function (err) {
                        $scope.items.pop();
                    $scope.items.push(err.data.message);
                    });

            $scope.deleteidea = function(ideaid) {
                   var ll = 
                                {
                                    "id": ideaid
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
$scope.returntomenu1 = function(){
    window.location="/menuadmin";
};
$scope.deletecomment=function(id){
 var ll = 
                                {
                                    "id": id
                                };
if (confirm('Are you sure you want to delete this?')) {
                                userServices.deletecomment(ll)
                                    .then(function (result) {
                                        alert("Comment deleted");
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
    ManageideasCtrl.$inject = ['$scope', '$location', '$routeParams', '$window','userServices'];

    // Enabling the controller in the app
    angular.module('ideasmanagement').controller('ManageideasCtrl', ManageideasCtrl);
}());
