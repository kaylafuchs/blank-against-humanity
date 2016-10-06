app.config(($stateProvider) => {
	$stateProvider.state('active-game', {
		url: '/game/:gameId',
		templateUrl: 'js/active-game/active-game.html',
		controller: 'ActiveGameCtrl',
	})

})

app.controller('ActiveGameCtrl', ($scope, decks) => {

	
})

//game with 4 players
//deck of cards
//get user cards
//