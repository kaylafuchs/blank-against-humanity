app.config(($stateProvider) => {

    $stateProvider.state('game', {
        url: '/games/:teamId',
        templateUrl: 'js/game/game.html',
        controller: 'GameCtrl',
        resolve: {
            teamGames: (GameFactory, $stateParams) => GameFactory.getGamesByTeamId($stateParams.teamId) //stateParams.teamId
        }
    })
})

app.controller('GameCtrl', ($scope, GameFactory) => {
    console.log('running gamecrl')
    $scope.startNewGame = GameFactory.startNewGame;
    $scope.addDecksToGame = GameFactory.addDecks
    $scope.$on('changedGame', (event, data) => {
        console.log('received event')
        console.log('data obj:', data)
        $scope.game = data;
        $scope.$digest()

    })

    //$scope.games = teamGames;

    //console.log('teamgames ', teamGames)
})
