app.config(($stateProvider) => {

    $stateProvider.state('game', {
        url: '/game/:gameId',
        templateUrl: 'js/game/game.html',
        controller: 'GameCtrl',
        // resolve: {
        //     game : (GameFactory, $stateParams) => GameFactory.getGameByGameId($stateParams.gameId)
        // }
    })
})

app.controller('GameCtrl', ($scope, GameFactory, $stateParams, $localStorage, ActiveGameFactory) => {
    $scope.gameId = $stateParams.gameId;
    //$scope.gameId = 12;
    const playerId = $localStorage.user.id;
    $scope.playerId = playerId + ''
    //const teamId = 2;
    const teamId = $localStorage.team.id
    $scope.teamId = teamId
    const gameRef = firebase.database().ref(`teams/${teamId}/games/${$scope.gameId}/`);

    gameRef.on('value', gameSnapshot => {
        // console.log(gameSnapshot.val())
        let game = gameSnapshot.val()
        $scope.game = gameSnapshot.val();
        console.log($scope.game.currentJudge === $scope.playerId)
        $scope.gameName = $scope.game.settings.name;
        if ($scope.game.players[playerId].hand){
            $scope.playerHand = $scope.game.players[playerId].hand;
            $scope.playerHandCount = Object.keys($scope.playerHand).length;
            $scope.game.joined = true;
            $scope.blackCard = $scope.game.currentBlackCard[Object.keys($scope.game.currentBlackCard)[0]].text;
        }
        $scope.judge = $scope.game.currentJudge;
        $scope.players = $scope.game.players;
        $scope.submittedWhiteCards = Array.prototype.slice.call(game.submittedWhiteCards, 1);
        console.log($scope.submittedWhiteCards)
        if ($scope.game.winningCard){
            $scope.winningCard = $scope.game.winningCard
        }
         $scope.$evalAsync();
    })

    //$scope.showCards = false;
    //$scope.submitted = false;

    $scope.onSwipeDown = (gameId) => {
        GameFactory.joinGameById(gameId)
        .then(() => {
          ActiveGameFactory.refillMyHand($scope.gameId, playerId, teamId)
          //$scope.showCards = true;
          $scope.game.joined = true;
          console.log("JOINED?", $scope.game.joined)
          console.log('SUBMITTED?', $scope.submitted)
          console.log('HAND', $scope.playerHand)
          $scope.$evalAsync();
          console.log('HAND AFTER EVAL', $scope.playerHand)
        })
    }

    $scope.onDoubleTap = (cardId, cardText) => {
        ActiveGameFactory.submitWhiteCard(playerId, cardId, $scope.gameId, teamId, cardText)
        //$scope.getSubmittedPlayers();
        $scope.submitted = true;
        $scope.$evalAsync();
    }

    // $scope.judgeDoubleTap = (cardId) => {
    //     // if (playerId === judge) {
    //         ActiveGameFactory.pickWinningWhiteCard(cardId, $scope.gameId, teamId)
    //         console.log("judging")
    //     // }
    // }
    $scope.pickWinningWhiteCard = ActiveGameFactory.pickWinningWhiteCard

    // $scope.getSubmittedPlayers = () => {
    //     $scope.playersToSubmit =  _.keyBy($scope.submittedWhiteCards, card => {
    //         return card.submittedBy;
    //     })
    // }

})

