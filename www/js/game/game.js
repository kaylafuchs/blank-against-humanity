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
    const playerId = $localStorage.user.id;
    $scope.playerId = playerId + ''
    //const teamId = 2;
    $scope.playerId = $localStorage.user.id;
    const teamId = $localStorage.team.id
    $scope.teamId = teamId
    const gameRef = firebase.database().ref(`teams/${teamId}/games/${$scope.gameId}/`);
    var previousState


    function stateRedirect(state){
        console.log("### GOT TO REDIRECT", state)
        $state.go('game.' + state, {gameId: $scope.gameId})
    }

    function formatTimer(timer){
        const addZeros = function(num){
            return num < 10 ? "0" + num : num;
        }
        const h = Math.floor(timer / 3600);
        const m = Math.floor((timer / 3600) % 1 * 60);
        const s = Math.floor((timer / 60) % 1 * 60)
        return h > 0 ? addZeros(h) + ':' + addZeros(m) + ':' + addZeros(s) : addZeros(m) + ':' + addZeros(s);
    }

    gameRef.on('value', gameSnapshot => {
        // console.log(gameSnapshot.val())
        let game = gameSnapshot.val()
        $scope.game = gameSnapshot.val();
        console.log($scope.game.currentJudge === $scope.playerId)
        $scope.gameName = $scope.game.settings.name;
        if ($scope.game.players[$scope.playerId].hand){
            $scope.playerHand = $scope.game.players[$scope.playerId].hand;
            $scope.playerHandCount = Object.keys($scope.playerHand).length;

        }
        $scope.blackCard = $scope.game.currentBlackCard[Object.keys($scope.game.currentBlackCard)[0]].text;
        $scope.players = $scope.game.players;
        $scope.submittedWhiteCards = Array.prototype.slice.call(game.submittedWhiteCards, 1);
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
        if ($scope.game.timer){
            $scope.timer = formatTimer($scope.game.timer)
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
    $scope.pickWinningWhiteCard = ActiveGameFactory.pickWinningWhiteCard
    $scope.onDoubleTap = (cardId, cardText) => {
        if ($scope.game.state === 'submission') {
           ActiveGameFactory.submitWhiteCard($scope.playerId, cardId, $scope.gameId, teamId, cardText);
           //stateRedirect('game.judgement', {gameId: $scope.gameId});
           //$scope.judgeView = true;
           $scope.$evalAsync();
           //alert('Your card has been submitted.')
       } else {
        alert('You can\'t submit yet, doofus')
       }
    }
})

