app.config(($stateProvider) => {

    $stateProvider.state('game', {
        url: '/game/:gameId',
        abstract: true,
        templateUrl: 'js/game/game.html',
        controller: 'GameCtrl',
        resolve: {
            game : (GameFactory, $stateParams) => GameFactory.getGameByGameId($stateParams.gameId)
        }  
    })
    .state('game.active-game', {
        url: '/active-game',
        templateUrl: 'js/game/active-game.html',
        controller: 'ActiveGameCtrl',
        resolve: {
            game : (GameFactory, $stateParams) => GameFactory.getGameByGameId($stateParams.gameId)
        }    
    })
    .state('game.submission-game', {
        url: '/submission-game',
        templateUrl: 'js/game/submission-game.html',
        controller: 'SubmissionGameCtrl'
    })
})

app.controller('GameCtrl', ($scope, GameFactory, $stateParams, $localStorage, game) => {   
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
})


app.controller("ActiveGameCtrl", ($scope, GameFactory, ActiveGameFactory, game, $stateParams, $localStorage, $state) => {

    
    $scope.onSwipeDown = () => {
        console.log('working');
        console.log($scope.showCards);
        $scope.showCards = true ;
        console.log($scope.showCards);
        $scope.$evalAsync();
    }

    $scope.onSwipeUp = () => {
        console.log("swiped up");
    }

    $scope.onDoubleTap = (key) => {
        console.log("double tapped")
        $scope.played = true;
        //call submit card function here.
    }

    ActiveGameFactory.refillMyHand($scope.gameId, $scope.playerId, $scope.teamId);

    $scope.$on('changedGame', (event,snapshot) =>{
        $scope.game = snapshot;
        console.log($scope.game);
        if(game.state === 'submission'){
            $state.go('game.submission-game')
        } 
    })
})

app.controller('SubmissionGameCtrl', ($scope, $localStorage) => {
    $scope.$on('changedGame', (event,snapshot) =>{
        $scope.game = snapshot;
    })

   $scope.judge = $scope.game.players[$scope.game.currentJudge].name
})

