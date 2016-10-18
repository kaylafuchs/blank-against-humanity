app.config(function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        cache: false,
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
            games: (GameFactory) => GameFactory.getGamesByTeamId()
        }
    })
})

app.controller('HomeCtrl', function($scope, $state, $cordovaOauth, UserFactory, GameFactory, $localStorage, $ionicPopup, games) {
    $scope.startNewGame = GameFactory.startNewGame;
    $scope.storage = $localStorage;
    $scope.games = games;
    $scope.goToGame = (gameId) => {
        return GameFactory.joinGameById(gameId)
            .then(() => $state.go('game.pregame', {gameId: gameId}))
    }
    $scope.goToNewGame = () => {
        $state.go('new-game.main')
    }
})