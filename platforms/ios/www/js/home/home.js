app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider.state('home', {
		url: '/',
		templateUrl: 'js/home/home.html',
		controller: 'HomeCtrl',
		// onEnter: function($state, $localStorage){
		// 	if (!localStorage.user){
		// 		$state.go('login');
		// 	}
		// }
	})

	// $urlRouterProvider.otherwise('/');
})

app.controller('HomeCtrl', function($scope, $state, $cordovaOauth, UserFactory, GameFactory, $localStorage){
	$scope.storage = $localStorage
	
	GameFactory.getGamesByUserId(2)
		.then(userGames => { $scope.userGames = userGames })

	$scope.greeting = "hello";
})

