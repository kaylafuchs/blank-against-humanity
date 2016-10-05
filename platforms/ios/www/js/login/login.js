app.config(function($stateProvider){
	$stateProvider.state('login', {
		url: '/login',
		templateUrl: 'js/login/login.html',
		controller: 'LoginCtrl'
	})
})

app.controller('LoginCtrl', function($scope, $state, LoginFactory, $cordovaOauth){
 	$scope.loginWithSlack = function(){
 		return LoginFactory.getSlackCreds()
 		.then(creds =>{
 			return $cordovaOauth.slack(creds.clientID, creds.clientSecret, ['channels:read', 'chat:write:bot', 'team:read'])
 		})
 		.then(info => {
 			console.log('user info', info)
 			$state.go('home')
 		})
 	}
})
