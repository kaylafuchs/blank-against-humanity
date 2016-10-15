app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        cache: false,
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
            games: (GameFactory) => GameFactory.getGamesByTeamId(),
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
    //$scope.openGames = openGames;

    console.log("games", JSON.stringify($scope.games))
    $scope.goToNewGame = () => {
        $state.go('new-game.main')
    }

    $scope.openGames = openGames
    // GameFactory.getOpenGames().then(openGames => {
            //     console.log('getting the games')
            //     $scope.openGames = openGames;
            //     $scope.$evalAsync();
            // })



    // $scope.joinGame = GameFactory.joinGameById;

    // $scope.showPopup = function(gameId) {

    //     $scope.game = $scope.games[gameId];
    //     $scope.gameName = $scope.game.settings.name;
    //     $scope.playerCount = Object.keys($scope.game.players).length;
    //     $scope.waitingForPlayers =  ($scope.game.settings.minPlayers || 4) - $scope.playerCount;

    //      const myPopup = $ionicPopup.show({
    //         templateUrl: 'js/home/popup.html',
    //         title: 'Join ' + $scope.gameName,
    //         scope: $scope,
    //         buttons: 
    //         [
    //             {text: 'Go back'},
    //             {
    //                 text: 'Join game',
    //                 type: 'button-balanced',
    //                 onTap: e => {
    //                     $scope.joinGame(gameId);
    //                     $state.go('game.active-game', { gameId: gameId })
    //                 }
    //             }
    //         ]
    //     })
    // }
})

