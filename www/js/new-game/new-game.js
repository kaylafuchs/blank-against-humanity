app.config(($stateProvider, $urlRouterProvider) => {

    $stateProvider.state('new-game', {
        url: '/new-game',
        abstract: true,
        templateUrl: 'js/new-game/main.html',
        controller: 'NewGameCtrl'
    })

    .state('new-game.main', {
        url: '/setup-game',
        templateUrl: 'js/new-game/new-game.html',
    })

    .state('new-game.add-decks', {
        url: '/add-decks',
        templateUrl: 'js/new-game/add-decks.html',
        resolve: {
            teamDecks: (GameFactory) => GameFactory.getDecksByTeamId
        }
    })

    $urlRouterProvider.otherwise('/new-game/setup-game');
})

app.controller('NewGameCtrl', ($scope, GameFactory, $state) => {
    console.log('curre', $scope)
    $scope.test = 1345234523
    $scope.currentView = 'addDecks'
    $scope.gameConfig = {};
    $scope.goToDecks = () => {
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

