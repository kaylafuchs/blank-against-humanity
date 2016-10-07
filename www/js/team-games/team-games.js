app.config(($stateProvider) => {
	$stateProvider.state('team-games', {
		url: '/team-games',
		templateUrl: 'js/team-games/team-games.html',
		controller: 'TeamGamesCtrl',
	})
})

app.controller('TeamGamesCtrl', ($scope, GameFactory) => {
	 
	 GameFactory.getGamesByTeamId('team')
	 	.then(games => {
	 		console.log(games);
	 		$scope.games = games;
	 		$scope.$digest();
	 	})

	 $scope.joinGame = GameFactory.joinGameById;
	 
})
