app.config(function($stateProvider){
	$stateProvider.state('cards', {
		url: '/cards',
		templateUrl: 'js/cards-test/cards-test.html',
		controller: 'CardsTestCtrl'
	})
})

app.controller('CardsTestCtrl', function($scope){
 	$scope.greeting = "HI"
})