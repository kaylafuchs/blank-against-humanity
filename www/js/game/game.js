app.config(($stateProvider) => {
    $stateProvider

        .state('game', {
            url: '/game/:teamId', ///:teamId /game/:teamId
            templateUrl: 'js/game/game.html',
            //abstract: true,
            controller: 'GameCtrl',
            resolve: { //this could still get the team games even without stateparams by using /session
                teamGames: (GameFactory, $stateParams) => GameFactory.getGamesByTeamId($stateParams.teamId)
            }


        })
        // .state('game.gameview', {
        //     url: '', // '' means this state becomes active when the parent state is navigated tp
        //     templateUrl: 'js/game/team-games.html',
        //     //controller: ''
        //     resolve: {
        //         teamGames: (GameFactory, $stateParams) => GameFactory.getGamesByTeamId($stateParams.teamId) 
        //     }
        // })
        // // maybe make this the join game screen
        // .state('game.allTeamGames', {
        //     url: '/game/team',
        //     templateUrl: 'js/game/team-games.html',
        //     //controller: ''
        //     resolve: {
        //         teamGames: (GameFactory, $stateParams) => GameFactory.getGamesByTeamId($stateParams.teamId) 
        //     }
        // })
        //.state('game.pickDecks')


})

app.controller('GameCtrl', ($scope, GameFactory, teamGames) => {
    console.log('running gamecrl')
    $scope.startNewGame = GameFactory.startNewGame;
    $scope.addDecksToGame = GameFactory.addDecks
    $scope.$on('changedGame', (event, data) => {
        console.log('received event')
        console.log('data obj:', data)
        $scope.game = data;
        $scope.$digest()

    })
    $scope.games = teamGames;

    //console.log('teamgames ', teamGames)
})
