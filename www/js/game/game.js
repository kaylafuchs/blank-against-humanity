app.config(($stateProvider) => {

    // $urlRouterProvider.when('/game/:gameId', '/game/:gameId/pregame')

    $stateProvider.state('game', {
        url: '/game/:gameId',
        abstract: true,
        templateUrl: 'js/game/game.html',
        controller: 'GameCtrl'
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
    const gameId = $stateParams.gameId
    $scope.gameId = gameId
    const playerId = $localStorage.user.id;
    $scope.playerId = playerId + ''
    $scope.playerId = $localStorage.user.id;
    const teamId = $localStorage.team.id
    $scope.teamId = teamId
    const gameRef = firebase.database().ref(`teams/${teamId}/games/${$scope.gameId}/`);
    var previousState
    let blackCard = ''

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
        let game = gameSnapshot.val()
        blackCard = game.currentBlackCard[Object.keys($scope.game.currentBlackCard)[0]]
        console.log(blackCard)
        $scope.game = gameSnapshot.val();
        $scope.gameName = $scope.game.settings.name;
        if ($scope.game.players[$scope.playerId].hand){
            $scope.playerHand = $scope.game.players[$scope.playerId].hand;
            $scope.playerHandCount = Object.keys($scope.playerHand).length;

        }
        $scope.blackCard = blackCard;
        $scope.players = $scope.game.players;
        $scope.needRefill = Object.keys(game.players[playerId].hand).length < 7;
        console.log($scope.needRefill)
        if (game.submittedWhiteCards) {
            $scope.submittedWhiteCards = Array.prototype.slice.call(game.submittedWhiteCards, 1);
        }
        $scope.judge = $scope.players[$scope.game.currentJudge];
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

    $scope.pickWinningWhiteCard = ActiveGameFactory.pickWinningWhiteCard
    $scope.submitWhiteCard = (cardId) => {
        let quantitySubmitted = 0
        if (quantitySubmitted < blackCard.pick) {
            ActiveGameFactory.submitWhiteCard(playerId, cardId, gameId, teamId)
            quantitySubmitted++
        }
    }
    // $scope.onDoubleTap = (cardId, cardText) => {
    //     if ($scope.game.state === 'submission') {
    //        ActiveGameFactory.submitWhiteCard($scope.playerId, cardId, $scope.gameId, teamId, cardText);
    //        //stateRedirect('game.judgement', {gameId: $scope.gameId});
    //        //$scope.judgeView = true;
    //        $scope.$evalAsync();
    //        //alert('Your card has been submitted.')
    //    } else {
    //     alert('You can\'t submit yet, doofus')
    //    }
    // }
})

