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
    .state('game.postround', {
        url: '/game/:gameId/postround',
        templateUrl: 'js/game/postgame.html',
        controller: 'GameCtrl'
    })


})

app.controller('GameCtrl', ($scope, $state, GameFactory, $stateParams, $localStorage, ActiveGameFactory) => {
    const gameId = $stateParams.gameId
    $scope.gameId = gameId
    const playerId = $localStorage.user.id;
    $scope.playerId = playerId + ''
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
    const handRef = gameRef.child(`players/${playerId}/hand`)
    handRef.on('value', handSnapshot => {
        const hand = handSnapshot.val()
        if (hand) {
            $scope.playerHand = hand
            $scope.haveHand = true;
            $scope.needRefill = _.size($scope.playerHand) < 7;
            $scope.$evalAsync();
        } else {
            $scope.haveHand = false
        }
    })
    const blackCardRef = gameRef.child('currentBlackCard')
    blackCardRef.on('value', blackCardSnapshot => {
        blackCard = _.entries(blackCardSnapshot.val())
        console.log(blackCard)
        $scope.blackCard = blackCard[0][1].text
    })
    gameRef.on('value', gameSnapshot => {
        let game = gameSnapshot.val()
        $scope.game = game;
        $scope.gameName = $scope.game.settings.name;
        $scope.players = $scope.game.players;
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
    let quantityWCSubmitted = 0
    const stateRef = gameRef.child('state')
    stateRef.on('value', stateSnap => {
        const state = stateSnap.val()
        if (state === 'submission') quantityWCSubmitted = 0;
        if (state === 'judgement') {
            gameRef.child('submittedWhiteCards')
                .once('value')
                .then(submittedWCsSnap => {
                    $scope.submittedWhiteCards = submittedWCsSnap.val()
                })
        }
    })
    $scope.refillMyHand = ActiveGameFactory.refillMyHand
    $scope.pickWinningWhiteCard = ActiveGameFactory.pickWinningWhiteCard
    $scope.submitWhiteCard = (cardId) => {
        console.log('asd;lkfjasdf', typeof blackCard[0][1].pick)
        if (quantityWCSubmitted < blackCard[0][1].pick) {
            ActiveGameFactory.submitWhiteCard(playerId, cardId, gameId, teamId)
            quantityWCSubmitted++
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

