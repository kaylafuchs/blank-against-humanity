app.config(($stateProvider) => {

    $stateProvider.state('game', {
        url: '/game',
        abstract: true,
        templateUrl: 'js/game/game.html',
        controller: 'GameCtrl',
    })
    .state('game.pre-game', {
        url: '/:gameId/pre-game',
        templateUrl: 'js/game/pre-game.html',
        controller: 'PreGameCtrl',
        resolve: {
            game : (GameFactory, $stateParams) => GameFactory.getGameByGameId($stateParams.gameId)
        }
    })
})

app.controller('GameCtrl', ($scope, GameFactory) => {
   
})

app.controller("PreGameCtrl", ($scope, GameFactory, game) => {

    // $scope.$on('changedGame', (event,snapshot) => {
    //     console.log(snapshot);
    //     $scope.name = snapshot.name;
    //     $scope.$digest();
    // })

    console.log(game);
    $scope.game = game;
    $scope.name = game.settings.name;
    $scope.playerCount = Object.keys(game.players).length;
    $scope.waitingForPlayers =  game.settings.minPlayers - $scope.playerCount;
    $scope.whiteCards = game.pile.whitecards;
   
    
})

