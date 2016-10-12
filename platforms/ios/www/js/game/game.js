app.config(($stateProvider) => {

    $stateProvider.state('game', {
        url: '/game/:gameId',
        abstract: true,
        templateUrl: 'js/game/game.html',
        controller: 'GameCtrl',
        resolve: {
            game : (GameFactory, $stateParams) => GameFactory.getGameByGameId($stateParams.gameId)
        }
    })
    .state('game.active-game', {
        url: '/:gameId/active-game',
        templateUrl: 'js/game/active-game.html',
        controller: 'ActiveGameCtrl'
        
    })
    .state('game.submission-game', {
        url: '/:gameId/submission-game',
        templateUrl: 'js/game/submission-game.html',
        controller: 'SubmissionGameCtrl'
    })
})

app.controller('GameCtrl', ($scope, GameFactory) => {   

    const gameId = $stateParams.gameId;
    const playerId = $localStorage.user.id;
    const teamId = $localStorage.team.id
    $scope.game = game;
    $scope.gameName = $scope.game.settings.name;
    $scope.whiteCards = $scope.game.players[playerId].hand;
    $scope.showCards = false;
    $scope.playerCount = Object.keys($scope.game.players).length;
      
})

app.controller("ActiveGameCtrl", ($scope, GameFactory, ActiveGameFactory, game, $stateParams, $localStorage) => {

    $scope.onSwipeDown = () => {
        console.log('working');
        console.log($scope.showCards);
        $scope.showCards = true ;
        console.log($scope.showCards);
        $scope.$evalAsync();
    }

    ActiveGameFactory.refillMyHand(gameId, playerId, teamId);

    $scope.$on('changedGame', (event,snapshot) =>{
        $scope.game = snapshot;
    })

    //when playerCount > 4 -> state.go(submission.state) -->
    //judge is picked, black card is drawn, submit card function
  
})

app.controller('SubmissionGameCtrl', ($scope, $localStorage) => {
    $scope.$on('changedGame', (event,snapshot) =>{
        $scope.game = snapshot;
    })
})

