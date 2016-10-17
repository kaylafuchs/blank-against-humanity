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
    //const teamId = 2;
    const teamId = $localStorage.team.id;
    const gameRef = firebase.database().ref(`teams/${teamId}/games/${$scope.gameId}/`);

    gameRef.on('value', gameSnapshot => {
        // console.log(gameSnapshot.val())
        $scope.game = gameSnapshot.val();
        $scope.gameName = $scope.game.settings.name;
        if ($scope.game.players[playerId].hand) {
            $scope.playerHand = $scope.game.players[playerId].hand;
            $scope.playerHandCount = Object.keys($scope.playerHand).length;
            $scope.game.joined = true;
            $scope.blackCard = $scope.game.currentBlackCard[Object.keys($scope.game.currentBlackCard)[0]].text;
        }
        $scope.judge = $scope.game.currentJudge;
        $scope.players = $scope.game.players;
        $scope.submittedWhiteCards = $scope.game.submittedWhiteCards;
        $scope.$evalAsync();


        if ($scope.game.state === 'postround') {
            console.log('the game has entered postround')
            if ($scope.game.winningCard) {
                $scope.winningCard = $scope.game.winningCard
                $scope.winnerId = $scope.winningCard.submittedBy;
                $scope.winnerName = $scope.game.players[$scope.winnerId].name


                console.log('the scope is2:', $scope)
            }
        }

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

    $scope.judgeDoubleTap = (cardId) => {
        // if (playerId === judge) {
        ActiveGameFactory.pickWinningWhiteCard(cardId, $scope.gameId, teamId)
        console.log("judging")
            // }
    }


    // $scope.getSubmittedPlayers = () => {
    //     $scope.playersToSubmit =  _.keyBy($scope.submittedWhiteCards, card => {
    //         return card.submittedBy;
    //     })
    // }

})

