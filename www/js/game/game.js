app.config(($stateProvider) => {

    $stateProvider.state('game', {
        url: '/game/:gameId',
        templateUrl: 'js/game/game.html',
        controller: 'GameCtrl',
    })
})

app.controller('GameCtrl', ($scope, GameFactory, $stateParams, $localStorage, ActiveGameFactory) => {
    $scope.gameId = $stateParams.gameId;
    $scope.joinedGames = $localStorage.user.games;
    const playerId = $localStorage.user.id;
    const teamId = $localStorage.team.id;
    const gameRef = firebase.database().ref(`teams/${teamId}/games/${$scope.gameId}/`);

    gameRef.on('value', gameSnapshot => {
        $scope.game = gameSnapshot.val();
        $scope.gameName = $scope.game.settings.name;
        if ($scope.game.players[playerId].hand) {
            $scope.playerHand = $scope.game.players[playerId].hand;
            $scope.playerHandCount = Object.keys($scope.playerHand).length;
            $scope.blackCard = $scope.game.currentBlackCard[Object.keys($scope.game.currentBlackCard)[0]].text;
        }

        if ($scope.game.currentJudge == playerId) {
            $localStorage.user.games[$scope.gameId].judge = true;
            $scope.isJudge = $localStorage.user.games[$scope.gameId].judge
        }
        console.log("###AM I  JUDGE?", $scope.isJudge)
        $scope.players = $scope.game.players;
        $scope.judge = $scope.players[$scope.game.currentJudge];
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

    $scope.onSwipeDown = (gameId) => {
        GameFactory.joinGameById(gameId)
            .then(() => {
                ActiveGameFactory.refillMyHand($scope.gameId, playerId, teamId)
                $localStorage.user.games[gameId] = { joined: true };
                console.log("###LOCALSTORAGE USER JOINED", $localStorage.user.games[gameId])
                $scope.$evalAsync();
            })
    }

    $scope.onDoubleTap = (cardId, cardText) => {
        ActiveGameFactory.submitWhiteCard(playerId, cardId, $scope.gameId, teamId, cardText)

        $localStorage.user.games[$scope.gameId].submitted = true;
        console.log("SUBMITTED?", $scope.joinedGames[$scope.gameId].submitted)
        $scope.submitted = true;
        $scope.$evalAsync();
    }

    $scope.judgeDoubleTap = (cardId) => {
        // if (playerId === judge) {
        ActiveGameFactory.pickWinningWhiteCard(cardId, $scope.gameId, teamId)
        console.log("judging")
            // }
    }

})

