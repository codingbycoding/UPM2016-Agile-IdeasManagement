(function(){
	 var  AddideaCtrl = function($scope, $location, $routeParams, $window, userServices) {

		 console.log('Page loaded.');
$scope.items = [];
$scope.draft="0";
$scope.returntomenu = function(){
    window.location="/menu";
};
         	  $scope.addidea = function(idea) {
                   if(!idea.Health)
                    idea.Health='0';
                   if(!idea.Social)
                    idea.Social='0';
                   if(!idea.Economic)
                    idea.Economic='0';
                   if(!idea.Cientific)
                    idea.Cientific='0';
                   if(!idea.Educational)
                    idea.Educational='0';
                   if(!idea.Business)
                    idea.Business='0';
                   if(!idea.Finance)
                    idea.Finance='0';
                   if(!idea.Personal)
                    idea.Personal='0';
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
                                    "health": idea.Health,
                                    "social": idea.Social,
                                    "economic": idea.Economic,
                                    "cientific": idea.Cientific,
                                    "educational": idea.Educational,
                                    "business": idea.Business,
                                    "finance": idea.Finance,
                                    "personal": idea.Personal,
                                    "draft": $scope.draft,
                                    "price": idea.price
                                };
                                if($scope.draft=="0"){
                                    if(confirm("Your idea will be pusblished, you will not be able to edit it again")){
                                    userServices.createIdea(ll)
                                        .then(function (result) {
                                            alert("Idea created");
                                            window.location="/menu";
                                        })
                                        .catch(function (err) {
                                            $scope.items.pop();
                                            $scope.items.push(err.data.message);
                                        });
                                    }
                                }
                                else{
                                     if(confirm('Your idea will be saved as "Draft", you will be able to edit it again')){
                                        userServices.createIdea(ll)
                                            .then(function (result) {
                                                alert("Idea Saved in draft");
                                                window.location="/menu";
                                            })
                                            .catch(function (err) {
                                                $scope.items.pop();
                                                $scope.items.push(err.data.message);
                                            });
                                     }
                                }

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
