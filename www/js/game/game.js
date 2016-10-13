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
        url: '/active-game',
        templateUrl: 'js/game/active-game.html',
        controller: 'ActiveGameCtrl',
        resolve: {
            game : (GameFactory, $stateParams) => GameFactory.getGameByGameId($stateParams.gameId)
        }    
    })
    .state('game.submission-game', {
        url: '/submission-game',
        templateUrl: 'js/game/submission-game.html',
        controller: 'SubmissionGameCtrl'
    })
})

app.controller('GameCtrl', ($scope, GameFactory, $stateParams, $localStorage, game) => {   

    $scope.gameId = $stateParams.gameId;
    $scope.playerId = $localStorage.user.id;
    $scope.teamId = $localStorage.team.id
    $scope.game = game;
    $scope.gameName = $scope.game.settings.name;
    $scope.whiteCards = $scope.game.players[$scope.playerId].hand;
    $scope.showCards = false;
    $scope.playerCount = Object.keys($scope.game.players).length;
      
})

app.controller("ActiveGameCtrl", ($scope, GameFactory, ActiveGameFactory, game, $stateParams, $localStorage, $state) => {

    
    $scope.onSwipeDown = () => {
        console.log('working');
        console.log($scope.showCards);
        $scope.showCards = true ;
        console.log($scope.showCards);
        $scope.$evalAsync();
    }

    $scope.onSwipeUp = () => {
        console.log("swiped up");
    }

    ActiveGameFactory.refillMyHand($scope.gameId, $scope.playerId, $scope.teamId);

    $scope.$on('changedGame', (event,snapshot) =>{
        $scope.game = snapshot;
        console.log($scope.game);
        if(game.state === 'submission'){
            $state.go('game.submission-game')
        } 
    })

  
})

app.controller('SubmissionGameCtrl', ($scope, $localStorage) => {
    $scope.$on('changedGame', (event,snapshot) =>{
        $scope.game = snapshot;
    })

   $scope.judge = $scope.game.players[$scope.game.currentJudge].name
})

