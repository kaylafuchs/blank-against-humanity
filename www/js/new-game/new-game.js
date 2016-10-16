app.config(($stateProvider, $urlRouterProvider) => {

    $stateProvider.state('new-game', {
        url: '/new-game',
        abstract: true,
        templateUrl: 'js/new-game/main.html',
        controller: 'NewGameCtrl',
        resolve: {
            teamDecks: (GameFactory) => {
                console.log('Navigating to state or trying to hello')
                return GameFactory.getDecksByTeamId()
            },
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
    //$scope.gameConfig = {};
    //$scope.gameConfig.decks = {};
    $scope.goToDecks = () => {
        $state.go('new-game.add-decks', {}, { location: true, reload: true })
    }



    $scope.decks = standardDeck.concat(teamDecks);

    $scope.startNewGame = (gameConfig) => {
        return GameFactory.startNewGame(gameConfig)
            .then((id) => GameFactory.addPileToGame(id, gameConfig.decks))
            .then((id) => {
                console.log('im here');
                //console.log('###GAME RULES', $scope.gameRules)
                //$scope.gameRules.$setPristine();
                $state.go('game', { gameId: id })
            });
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

