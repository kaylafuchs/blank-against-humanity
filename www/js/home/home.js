app.config(function($stateProvider){
	$stateProvider.state('home', {
		url: '/',
		templateUrl: 'js/home/home.html',
		controller: 'HomeCtrl',
	})
})

app.controller('HomeCtrl', function($scope, $state, $cordovaOauth, UserFactory, $localStorage){
	$scope.user = $localStorage.user || UserFactory.getCurrentUser();
	$scope.team = $localStorage.team || UserFactory.getCurrentTeam();
	// $localStorage.user = $scope.user
	// $localStorage.team = $scope.team
	// console.log("local storage", JSON.stringify($localStorage))
	console.log("user in home controller", JSON.stringify($scope.user))
	console.log("team in home controller", JSON.stringify($scope.team))
	console.log("local storage", JSON.stringify($localStorage));
})