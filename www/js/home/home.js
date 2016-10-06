app.config(function($stateProvider){
	$stateProvider.state('home', {
		url: '/home',
		templateUrl: 'js/home/home.html',
		controller: 'HomeCtrl'
	})
})

app.controller('HomeCtrl', function($scope, $state, $cordovaOauth, GameFactory){
	
	GameFactory.getGamesByUserId(2)
		.then(userGames => { $scope.userGames = userGames })

	$scope.greeting = "hello";
})
