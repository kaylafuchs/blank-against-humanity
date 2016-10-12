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
    const teamId = $localStorage.team.id
    $scope.game = game;
    $scope.gameName = $scope.game.settings.name;
    console.log("active state game", JSON.stringify($scope.game));

    //this should be uncommented in final versions
    //$scope.whiteCards = $scope.game.players[playerId].hand;

    //temporary implementation for design purposes.
    // $scope.game.whiteCards = $scope.game.pile.whitecards
    $scope.showCards = false;

    $scope.playerCount = Object.keys($scope.game.players).length;
    
    console.log('WHITECARDS', $scope.whiteCards);

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

    ActiveGameFactory.refillMyHand(gameId, playerId, teamId);

    $scope.$on('changedGame', (event,snapshot) =>{
        $scope.game = snapshot;
    })
    
})

app.controller('SubmissionGameCtrl', ($scope, $localStorage) => {


})

