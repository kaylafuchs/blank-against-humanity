app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider.state('home', {
		url: '/',
		templateUrl: 'js/home/home.html',
		controller: 'HomeCtrl',
        resolve: {
            games: function(GameFactory){
                return GameFactory.getGamesByTeamId()
            }
        }
	})
})

app.controller('HomeCtrl', function($scope, $state, $cordovaOauth, UserFactory, GameFactory, $localStorage, games, $ionicPopup) {
    $scope.startNewGame = GameFactory.startNewGame;
    $scope.storage = $localStorage;
    $scope.games = games;
    

    $scope.$on('changedGame', (event,snapshot) =>{
        $scope.name= snapshot.name;
        $scope.$digest();
    })

    $scope.joinGame = GameFactory.joinGameById;

    $scope.showPopup = function (gameId) {

        $scope.game = $scope.games[gameId];
        $scope.gameName = $scope.game.settings.name;
        $scope.playerCount = Object.keys($scope.game.players).length;
        $scope.waitingForPlayers =  $scope.game.settings.minPlayers - $scope.playerCount;
         
         const myPopup = $ionicPopup.show({
            templateUrl: 'js/home/popup.html',
            title: 'Join Game',
            scope: $scope,
            buttons: 
            [
                {text: 'Cancel'},
                {
                    text: '<b>Join</b>',
                    type: 'button-positive',
                    onTap: e => {
                        $scope.joinGame(gameId);
                        $state.go('game.active-game', {gameId: gameId})
                    }
                }
            ]
        })
    }
})