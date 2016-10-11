app.config(($stateProvider) => {
	$stateProvider.state('team-games', {
		url: '/team-games',
		templateUrl: 'js/team-games/team-games.html',
		controller: 'TeamGamesCtrl',
	})
})

app.controller('TeamGamesCtrl', ($scope, GameFactory, $ionicPopup, $timeout, $state) => {
	 
	 GameFactory.getGamesByTeamId('1')
	 	.then(games => {
	 		$scope.games = games;
	 		$scope.$digest();
	 	})

	 
	 $scope.$on('changedGame', (event,snapshot) =>{
	 	$scope.name= snapshot.name;
	 	$scope.$digest();
	 })

	 $scope.joinGame = GameFactory.joinGameById;

	 $scope.showPopup = function (gameId) {
	     
	     const myPopup = $ionicPopup.show({
	     	template: '<p>Information</p>',
	     	title: 'Game Information',
	     	scope: $scope,
	     	buttons: [
	     		{text: 'Cancel'},
	     		{
	     			text: '<b>Join</b>',
	     		 	type: 'button-positive',
	     		 	onTap: e => {
	     		 		console.log(gameId);
	     		 		$scope.joinGame(gameId);
	     		 		$state.go('game.pre-game', {gameId: gameId})
	     		 	}
	     		}
			]
	    })
	 }
})
