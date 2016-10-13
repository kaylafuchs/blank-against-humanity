app.config(($stateProvider, $urlRouterProvider) => {

    $stateProvider.state('new-game', {
        url: '/new-game',
        abstract: true,
        templateUrl: 'js/new-game/main.html',
        controller: 'NewGameCtrl',
        resolve: {
            teamDecks: (GameFactory) => GameFactory.getDecksByTeamId(),
            standardDeck: (GameFactory) => GameFactory.getDecksByTeamId(1)
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
        }


    })

    $urlRouterProvider.otherwise('/new-game/setup-game');
})

app.controller('NewGameCtrl', ($scope, GameFactory, $state, teamDecks, standardDeck) => {
    $scope.currentView = 'addDecks'
    $scope.gameConfig = {};
    $scope.gameConfig.decks = {};
    $scope.goToDecks = () => {
        $state.go('new-game.add-decks', {}, { location: true, reload: true })
    }

    $scope.decks = standardDeck.concat(teamDecks);

    $scope.startNewGame = (gameConfig) => {
        GameFactory.startNewGame(gameConfig).then((id) => {
            GameFactory.addPileToGame(id, $scope.gameConfig.decks)
            $state.go('game.active-game', { gameId: id })

        })
    }
    $scope.addDecksToGame = GameFactory.addDecks;
    // $scope.$on('changedGame', (event, data) => {
    //     console.log('received event')
    //     console.log('data obj:', data)
    //     $scope.game = data;
    //     $scope.$digest()

    // })


})

app.controller('DeckCtrl', ($scope, GameFactory, $state, cards) => {
    $scope.cards = cards
})

