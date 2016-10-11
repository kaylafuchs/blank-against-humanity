app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
            games: function(GameFactory) {
                return GameFactory.getGamesByTeamId()
            }
        }
    })
})

app.controller('HomeCtrl', function($scope, $state, $cordovaOauth, UserFactory, GameFactory, $localStorage, games) {
    $scope.storage = $localStorage;
    $scope.games = games;
    console.log("games", JSON.stringify($scope.games))
    $scope.goToNewGame = () => {
        console.log("calling goToNewGame")
        $state.go('new-game.main')
    }


    // // get games from postgres
    // GameFactory.getGamesByUser()
    // .then(games => {
    //     console.log("games found:", games)
    //     $scope.games = games;
    // })

    //get games from firebase
    // GameFactory.getGamesByTeamId($scope.storage.team.id)
    // .then(games => {
    //     console.log("the games are:", games)
    //     $scope.games = games;
    // })

    //$scope.startNewGame = GameFactory.startNewGame;
    // $scope.createNewGame = () => {
    //     GameFactory.startNewGame()
    //     .then(() => {
    //         console.log('going to new state')
    //         $state.go('new-game.main')
    //     })
    // }

    $scope.$on('changedGame', (event, data) => {
        console.log('received event in home')
        console.log('data obj:', data)
            //$scope.game = data;
            // $scope.$digest()

    })
})

