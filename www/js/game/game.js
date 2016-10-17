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
    //$scope.gameId = 93;
    console.log("###GAME ID", $scope.gameId)
    $scope.joinedGames = $localStorage.user.games;
    $scope.playerId = $localStorage.user.id;
    const teamId = $localStorage.team.id
    const gameRef = firebase.database().ref(`teams/${teamId}/games/${$scope.gameId}/`);

    //$state.go('game.pregame', {gameId: $scope.gameId})

    function stateRedirect(state){
        //if ($location !== state)
        console.log("### GOT TO REDIRECT", state)
        $state.go('game.' + state, {gameId: $scope.gameId})
    }

    // if (!$scope.game) {
    //     stateRedirect('pregame')
    // }

    gameRef.on('value', gameSnapshot => {
        $scope.game = gameSnapshot.val();
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
        //stateRedirect($scope.game.state);
        $scope.$evalAsync();
        if ($scope.game.winningCard){
            $scope.winningCard = $scope.game.winningCard
        }
    })

    $scope.onSwipeDown = (gameId) => {
        return GameFactory.joinGameById(gameId)
            .then(() => {
                  if($scope.playerId === $scope.game.currentJudge){
                    $state.go('game.submission', {gameId: gameId})
                  }else{
                    ActiveGameFactory.refillMyHand($scope.gameId, $scope.playerId, teamId)
                    //$scope.playerView = true; 
                  }
                  $scope.$evalAsync();    
            })
    }

    $scope.onDoubleTap = (cardId, cardText) => {
        ActiveGameFactory.submitWhiteCard($scope.playerId, cardId, $scope.gameId, teamId, cardText)
        $scope.judgeView = true;
        $scope.$evalAsync();
    }


    // console.log($scope.game.state)

    // if($scope.game.state==="pregame"){
    //     $scope.onSwipeDown = (gameId) => {
    //         return GameFactory.joinGameById(gameId)
    //             .then(() => {
    //                   if(playerId === $scope.game.currentJudge){
    //                     $scope.judgeView = true;
    //                   }else{
    //                     ActiveGameFactory.refillMyHand($scope.gameId, playerId, teamId)
    //                     $scope.playerView = true; 
    //                   }
    //                   $scope.$evalAsync();    
    //             })
    //     }
    // }

    // if($scope.game.state==="submission"){
    //     if(playerId === $scope.game.currentJudge){
    //         $scope.judgeDoubleTap = (cardId) => {
    //             ActiveGameFactory.pickWinningWhiteCard(cardId, $scope.gameId, teamId)
    //         }
    //     }else{
    //         $scope.onDoubleTap = (cardId, cardText) => {
    //             ActiveGameFactory.submitWhiteCard(playerId, cardId, $scope.gameId, teamId, cardText)
    //             $scope.judgeView = true;
    //             $scope.$evalAsync();
    //         }
    //     }
    // }

 
})

