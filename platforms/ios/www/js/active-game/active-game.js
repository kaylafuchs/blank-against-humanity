app.config(($stateProvider) => {
	$stateProvider.state('active-game', {
		url: '/active-game',
		templateUrl: 'js/active-game/active-game.html',
		controller: 'ActiveGameCtrl',
	})
})

app.controller('ActiveGameCtrl', ($scope) => {
	 $scope.$on('changedGame', snapshot => {
	 	console.log(snapshot)
	 	$scope.game = snapshot; 
	 });
})


