app.config(($stateProvider, $urlRouterProvider) => {

    $stateProvider.state('new-game', {
        url: '/new-game',
        abstract: true,
        templateUrl: 'js/new-game/main.html',
        controller: 'NewGameCtrl',
        resolve: {
            teamDecks: (GameFactory) => GameFactory.getDecksByTeamId(),
            standardDeck: (GameFactory) => GameFactory.getDecksByTeamId(0)
        }
    })

    .state('new-game.main', {
        url: '/setup-game',
        templateUrl: 'js/new-game/new-game.html',
    })

    .state('new-game.add-decks', {
        url: '/add-decks',
        templateUrl: 'js/new-game/add-decks.html',
    })

    .state('new-game.deck', {
        url: '/deck/:deckId',
        templateUrl: 'js/new-game/deck.html',
        controller: 'DeckCtrl',
        resolve: {
            cards: (GameFactory, $stateParams) => GameFactory.getCardsByDeckId($stateParams.deckId)
        },
    })

    $urlRouterProvider.otherwise('/new-game/setup-game');
})

app.controller('NewGameCtrl', ($scope, GameFactory, $state, teamDecks, standardDeck) => {
    console.log('curre', $scope)
    $scope.test = 1345234523
    $scope.currentView = 'addDecks'
    $scope.gameConfig = {};
    $scope.goToDecks = () => {
            $state.go('new-game.add-decks', {}, { location: true, reload: true })
        }
        //console.log('teamdecks is:', teamDecks)
        //$scope.cards = cards
    $scope.teamDecks = standardDeck.concat(teamDecks)

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

app.controller('DeckCtrl', ($scope, GameFactory, $state, cards) => {
    console.log('runnign decktrls')
    $scope.cards = cards
})

