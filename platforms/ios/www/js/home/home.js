<<<<<<< HEAD
app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
    })
})

app.controller('HomeCtrl', function($scope, $state, $cordovaOauth, UserFactory, GameFactory, $localStorage) {
    $scope.storage = $localStorage;


    $scope.startNewGame = GameFactory.startNewGame;

    $scope.$on('changedGame', (event, data) => {
        console.log('received event in home')
        console.log('data obj:', data)
            //$scope.game = data;
            // $scope.$digest()

    })

    // GameFactory.getGamesByUserId(2)
    //     .then(userGames => { $scope.userGames = userGames });




    $scope.greeting = "hello";
})
=======
app.config(function($stateProvider){
	$stateProvider.state('home', {
		url: '/home',
		templateUrl: 'js/home/home.html',
		controller: 'HomeCtrl',
	})
})

app.controller('HomeCtrl', function($scope, $state, $cordovaOauth, UserFactory, GameFactory, $localStorage){
	$scope.storage = $localStorage
	
	GameFactory.getGamesByUserId(2)
		.then(userGames => { $scope.userGames = userGames })

	$scope.greeting = "hello";
})

>>>>>>> master
