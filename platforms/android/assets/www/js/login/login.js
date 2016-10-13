app.config(function($stateProvider){
	$stateProvider.state('login', {
		url: '/login',
		templateUrl: 'js/login/login.html',
		controller: 'LoginCtrl'
	})
})

app.controller('LoginCtrl', function($scope, $state, UserFactory, $cordovaOauth, $localStorage, $timeout){
 	$scope.loginWithSlack = function(){
 		return UserFactory.getSlackCreds()
 		.then(creds =>{
 			return $cordovaOauth.slack(creds.clientID, creds.clientSecret, ['identity.basic', 'identity.team', 'identity.avatar'])
 		})
 		.then(info => UserFactory.setUser(info))
 		.then(() => $state.go('home'))
 	}

 	$scope.storage = $localStorage
})