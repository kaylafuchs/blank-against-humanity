app.config(($stateProvider) => {
	$stateProvider.state('decks', {
		url: 'decks/:teamid',
		templateUrl: 'js/decks/decks.html',
		controller: 'DeckCtrl',
		resolve: {
			decks: (GameFactory, $stateParams) => GameFactory.getDecksByTeamId(stateParams.teamId)
		}
	})

})

app.controller('DeckCtrl', ($scope) => {


	
})