app.config(($stateProvider) => {

    $stateProvider.state('game', {
        url: '/game',
        abstract: true,
        templateUrl: 'js/game/game.html',
        controller: 'GameCtrl',
    })
    .state('game.active-game', {
        url: '/:gameId/active-game',
        templateUrl: 'js/game/active-game.html',
        controller: 'ActiveGameCtrl',
        resolve: {
            game : (GameFactory, $stateParams) => GameFactory.getGameByGameId($stateParams.gameId)
        }
    })
})

app.controller('GameCtrl', ($scope, GameFactory) => {   
   
})

app.controller("ActiveGameCtrl", ($scope, GameFactory, ActiveGameFactory, game, $stateParams, $localStorage) => {

    const gameId = $stateParams.gameId;
    const playerId = $localStorage.user.id;
    console.log("player id", playerId)
    const teamId = $localStorage.team.id
    $scope.game = game;
    $scope.gameName = $scope.game.settings.name;
    console.log("active state game", $scope.game);
    $scope.judge = $scope.game.players[$scope.game.currentJudge]
    console.log("the judge is", $scope.judge)
    $scope.blackCard = $scope.game.currentBlackCard;
    $scope.blackCardText = $scope.blackCard[Object.keys($scope.blackCard)[0]].text
    console.log("the black card is", $scope.blackCardText)
    //this should be uncommented in final versions
    $scope.whiteCards = $scope.game.pile.whitecards;
    var slicer = Math.floor(Math.random() * $scope.whiteCards.length - 7)
    // $scope.playerHand = $scope.whiteCards.slice(slicer, slicer + 8)
    $scope.playerHand = $scope.game.players[playerId].hand;
    console.log('players hand', $scope.playerHand)

    //temporary implementation for design purposes.
    // $scope.game.whiteCards = $scope.game.pile.whitecards
    $scope.showCards = false;

    //$scope.playerHand = $scope.game.players[playerId].hand;
    //(console.log("player hand", $scope.hand))

    $scope.playerCount = Object.keys($scope.game.players).length;
    

    $scope.onSwipeDown = () => {
        $scope.showCards = true;
        //$timeout(() => {}, 3000)
        //$scope.$evalAsync();

    }

    $scope.onSwipeUp = () => {
        console.log("swiped up");
        //this will trigger submisson function using card's 
        //unique id
    }

    //still need to be able to get player's hand from deck and set it on scope so we can render it

    $scope.onDoubleTap = (key) => {
        console.log("double tapped")
        $scope.played = true;
        //call submit card function here.
    }

    ActiveGameFactory.refillMyHand(gameId, playerId, teamId);

    $scope.$on('changedGame', (event,snapshot) =>{
        $scope.game = snapshot;
    })
    //need to listen for judge choice, refill hand after round
    
})

app.controller('SubmissionGameCtrl', ($scope, $localStorage) => {


})

