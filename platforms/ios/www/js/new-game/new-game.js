app.config(($stateProvider) => {

    $stateProvider.state('new-game', {
        url: '/new-game',
        templateUrl: 'js/new-game/new-game.html',
        controller: 'NewGameCtrl',
        // resolve: {
        //     teamGames: (GameFactory, $stateParams) => GameFactory.getGamesByTeamId($stateParams.teamId) //stateParams.teamId
        // }


    })
})

app.controller('NewGameCtrl', ($scope, GameFactory) => {
    $scope.gameConfig = {};

    $scope.startNewGame = GameFactory.startNewGame;
    $scope.addDecksToGame = GameFactory.addDecks;
    // $scope.$on('changedGame', (event, data) => {
            //     console.log('received event')
            //     console.log('data obj:', data)
            //     $scope.game = data;
            //     $scope.$digest()

            // })



    //$scope.games = teamGames;

    //console.log('teamgames ', teamGames)
})

