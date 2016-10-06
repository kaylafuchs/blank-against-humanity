app.config(function($stateProvider){
	$stateProvider.state('home', {
		url: '/',
		templateUrl: 'js/home/home.html',
		controller: 'HomeCtrl',
	})
})

app.controller('HomeCtrl', function($scope, $state, $cordovaOauth, UserFactory, $localStorage){
	$scope.storage = $localStorage
})