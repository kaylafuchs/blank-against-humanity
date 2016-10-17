app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        cache: false,
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
            games: (GameFactory) => GameFactory.getGamesByUserId(),
            openGames: (GameFactory) => {
                console.log('getting the games')
                return GameFactory.getOpenGames()
            }
        }
    })
})

app.controller('HomeCtrl', function($scope, $state, $cordovaOauth, UserFactory, GameFactory, $localStorage, $ionicPopup, games, openGames) {
    $scope.startNewGame = GameFactory.startNewGame;
    $scope.storage = $localStorage;
    $scope.games = games;
    $scope.openGames = openGames;
    console.log("###OPEN GAMES", $scope.openGames)
    console.log("###GAMES", $scope.games)
    $scope.goToNewGame = () => {
        $state.go('new-game.main')
    }

    $scope.openGames = openGames;
})

