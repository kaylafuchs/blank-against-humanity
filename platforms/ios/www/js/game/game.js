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
    $scope.gameId = 32;
    const playerId = $localStorage.user.id;
    const teamId = 2; 
    // const teamId = $localStorage.team.id
    const gameRef = firebase.database().ref(`teams/${teamId}/games/${$scope.gameId}/`); 

    gameRef.on('value', gameSnapshot => {
        $scope.game = gameSnapshot.val();
        $scope.gameName = $scope.game.settings.name;
        $scope.playerHand = $scope.game.players[playerId].hand;
        $scope.playerHandCount = Object.keys($scope.playerHand).length; 
        $scope.blackCard = $scope.game.currentBlackCard;
        $scope.blackCardText = $scope.blackCard[Object.keys($scope.blackCard)[0]]
        $scope.judge = $scope.game.currentJudge;
        $scope.players = $scope.game.players;
        $scope.submittedWhiteCards= $scope.game.submittedWhiteCards
        console.log($scope.players);
        $scope.$evalAsync();
    })


    ActiveGameFactory.refillMyHand($scope.gameId, playerId, teamId)
    
    $scope.showCards = false;


    $scope.onSwipeDown = (gameId) => {
        if($scope.playerHandCount<7){
            ActiveGameFactory.refillMyHand($scope.gameId, playerId, teamId)
        }
        $scope.showCards = true ;
        //GameFactory.joinGameById(gameId);
        $scope.$evalAsync();
    }  

    $scope.onDoubleTap = (cardId, cardText) => {
        ActiveGameFactory.submitWhiteCard(playerId, cardId, $scope.gameId, teamId, cardText)
        console.log('TEST',  $scope.getSubmittedPlayers());
    }



    $scope.getSubmittedPlayers = () => {
       return  _.keyBy($scope.submittedWhiteCards, card =>{
            return card.submittedBy; 
        })
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



