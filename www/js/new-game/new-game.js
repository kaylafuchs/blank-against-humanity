app.config(($stateProvider, $urlRouterProvider) => {

    $stateProvider
        .state('new-game', {
            url: '/new-game',
            templateUrl: 'js/new-game/main.html',
            controller: 'NewGameCtrl'

        })

    .state('new-game.main', {
        url: '/stoof',
        templateUrl: 'js/new-game/new-game.html',
    })

    .state('new-game.add-decks', {
        url: '/stuff',
        templateUrl: 'js/new-game/add-decks.html',
        resolve: {
            teamDecks: (GameFactory) => GameFactory.getDecksByTeamId
        }
    })

    $urlRouterProvider.otherwise('/new-game/stoof');
})



//         //controller: 'DeckCtrl',
//         // resolve: {
//         //     teamGames: (GameFactory, $stateParams) => GameFactory.getGamesByTeamId($stateParams.teamId) //stateParams.teamId
//         // }
//     })

// .state('new-game.add-decks', {
//     url: '/stuff',
//     views: {
//
// '': { templateUrl: 'js/new-game/add-decks.html' }
//        }
//        //templateUrl: 'js/new-game/add-decks.html',
//        //controller: 'DeckCtrl',
//        // resolve: {
//        //     teamGames: (GameFactory, $stateParams) => GameFactory.getGamesByTeamId($stateParams.teamId) //stateParams.teamId
//        // }
//    })



//$



app.controller('NewGameCtrl', ($scope, GameFactory, $state) => {
    console.log('curre', $scope)
    $scope.currentView = 'addDecks'
    $scope.gameConfig = {};
    $scope.goToDecks = () => {
        console.log('runnign t', $scope)


        // $scope.$digest()


        $state.go('new-game.add-decks', {}, { location: true, reload: true })
    }

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

app.controller('DeckCtrl', ($scope, GameFactory, $state) => {

    // $scope.$on('changedGame', (event, data) => {
    //     console.log('received event')
    //     console.log('data obj:', data)
    //     $scope.game = data;
    //     $scope.$digest()

    // })

    //$scope.games = teamGames;

    //console.log('teamgames ', teamGames)
})

