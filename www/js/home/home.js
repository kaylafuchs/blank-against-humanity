app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider.state('home', {
		url: '/',
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

})
