app.config(($stateProvider) => {
	$stateProvider.state('active-game', {
		url: '/game/:gameId',
		templateUrl: 'js/active-game/active-game.html',
		controller: 'ActiveGameCtrl',
		resolve: {
			game: (GameFactory, $stateParams) => GameFactory.getGameByGameId($stateParams.gameId)
		}
	})

})

app.controller('ActiveGameCtrl', ($scope, game) => {

	$scope.game = game;
	
})