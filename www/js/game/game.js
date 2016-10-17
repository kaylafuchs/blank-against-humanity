app.config(($stateProvider, $urlRouterProvider) => {

    // $urlRouterProvider.when('/game/:gameId', '/game/:gameId/pregame')

    $stateProvider.state('game', {
        url: '/game/:gameId',
        abstract:true,
        templateUrl: 'js/game/game.html',
        controller: 'GameCtrl',
    })
    .state('game.pregame', {
        url: '/game/:gameId/pregame',
        templateUrl: 'js/game/pregame.html',
        controller: 'GameCtrl'
    })
    .state('game.submission', {
        url: '/game/:gameId/submission',
        templateUrl: 'js/game/submission.html',
        controller: 'GameCtrl'
    })
    .state('game.judgement', {
        url: '/game/:gameId/judgement',
        templateUrl: 'js/game/judgement.html',
        controller: 'GameCtrl'
    })
    .state('game.postgame', {
        url: '/game/:gameId/postgame',
        templateUrl: 'js/game/postgame.html',
        controller: 'GameCtrl'
    })

    
})

app.controller('GameCtrl', ($scope, $state, GameFactory, $stateParams, $localStorage, ActiveGameFactory) => {
    console.log('###STATEPARAMS', $stateParams)
    $scope.gameId = $stateParams.gameId;
    console.log("###GAME ID", $scope.gameId)
    $scope.joinedGames = $localStorage.user.games;
    $scope.playerId = $localStorage.user.id;
    const teamId = $localStorage.team.id
    const gameRef = firebase.database().ref(`teams/${teamId}/games/${$scope.gameId}/`);
    var previousState


    function stateRedirect(state){
        console.log("### GOT TO REDIRECT", state)
        $state.go('game.' + state, {gameId: $scope.gameId})
    }

    gameRef.on('value', gameSnapshot => {
        
        $scope.game = gameSnapshot.val();
        console.log('###SNAPSHOT VAL', gameSnapshot.val())
        $scope.gameName = $scope.game.settings.name;
        if ($scope.game.players[$scope.playerId].hand){
            $scope.playerHand = $scope.game.players[$scope.playerId].hand;
            $scope.playerHandCount = Object.keys($scope.playerHand).length;
            
        }
        $scope.blackCard = $scope.game.currentBlackCard[Object.keys($scope.game.currentBlackCard)[0]].text;
        $scope.players = $scope.game.players;
        $scope.judge = $scope.players[$scope.game.currentJudge];
        $scope.submittedWhiteCards = $scope.game.submittedWhiteCards;
        console.log("###GAME STATE", $scope.game.state)
        $scope.$evalAsync();
        if ($scope.game.winningCard){
            $scope.winningCard = $scope.game.winningCard
        }
        if (previousState !== $scope.game.state){
           stateRedirect($scope.game.state);
        } 
        previousState = $scope.game.state;
    })

    $scope.onSwipeDown = (gameId) => {
        return GameFactory.joinGameById(gameId)
            .then(() => {
                  if ($scope.playerId === $scope.game.currentJudge){
                    console.log('####I AM THE JUDGE')
                    $state.go('game.judgement', {gameId: gameId})
                  } else {
                    ActiveGameFactory.refillMyHand($scope.gameId, $scope.playerId, teamId)
                  }
                  $scope.$evalAsync();
            })
    }

    $scope.onDoubleTap = (cardId, cardText) => {
        ActiveGameFactory.submitWhiteCard($scope.playerId, cardId, $scope.gameId, teamId, cardText);
        //stateRedirect('game.judgement', {gameId: $scope.gameId});
        //$scope.judgeView = true;
        $scope.$evalAsync();
    }
})

