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
    // const gameId = $stateParams.gameId;
    const gameId = $stateParams.gameId //32;
    const playerId = $localStorage.user.id;
    $scope.playerId = playerId;
    const teamId = $localStorage.team.id //;
        // const teamId = $localStorage.team.id
    const gameRef = firebase.database().ref(`teams/${teamId}/games/${gameId}/`);
    console.log(gameRef.toString())
    $scope.round = {};


    $scope.showCards = false;

    gameRef.on('value', gameSnapshot => {
        // console.log(gameSnapshot.val())
        $scope.game = gameSnapshot.val();
        $scope.gameName = $scope.game.settings.name;
        // $scope.playerHand = $scope.game.players[playerId].hand ? $scope.game.players[playerId].hand : null
        // console.log('phand is', JSON.stringify($scope.playerHand))
        // $scope.playerHandCount = Object.keys($scope.playerHand).length;

        $scope.blackCard = $scope.game.currentBlackCard[1];
        // console.log('black card', $scope.blackCard)
        $scope.blackCardText = $scope.blackCard.text
        $scope.judge = $scope.game.currentJudge;
        $scope.$evalAsync();
    })





    //ActiveGameFactory.refillMyHand($scope.gameId, playerId, teamId)

    // $scope.join = GameFactory.joinGameById
    // $scope.joinAndGetHand = (gameId, playerId, teamId) => {
    //         GameFactory.joinGameById(gameId)
    //         ActiveGameFactory.refillMyHand(gameId, playerId, teamId)
    //     }
    $scope.joinThenGetCards = () => {
        $scope.showCards = true;
        GameFactory.joinGameById(gameId)
            .then(() => ActiveGameFactory.refillMyHand(gameId, playerId, teamId))
            .then(() => {
                console.log($scope.game.players[playerId])
                console.log('playerHand', $scope.playerHand)
                $scope.$evalAsync()
            })
            .catch(err => console.log(err))
    }

    $scope.onDoubleTap = (cardId) => {
        ActiveGameFactory.submitWhiteCard(playerId, cardId, gameId, teamId)
    }

})


// app.controller("ActiveGameCtrl", ($scope, GameFactory, ActiveGameFactory, game, $stateParams, $localStorage, $state) => {


//     $scope.onSwipeDown = () => {
//         console.log('working');
//         console.log($scope.showCards);
//         $scope.showCards = true ;
//         console.log($scope.showCards);
//         $scope.$evalAsync();
//     }

//     $scope.onSwipeUp = () => {
//         console.log("swiped up");
//     }

//     $scope.onDoubleTap = (key) => {
//         console.log("double tapped")
//         $scope.played = true;
//         //call submit card function here.
//     }

//     ActiveGameFactory.refillMyHand($scope.gameId, $scope.playerId, $scope.teamId);

//     $scope.$on('changedGame', (event,snapshot) =>{
//         $scope.game = snapshot;
//         console.log($scope.game);
//         if(game.state === 'submission'){
//             $state.go('game.submission-game')
//         } 
//     })
// })

