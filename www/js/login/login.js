app.config(function($stateProvider){
	$stateProvider.state('login', {
		url: '/login',
		templateUrl: 'js/login/login.html',
		controller: 'LoginCtrl'
	})
})

app.controller('LoginCtrl', function($scope, $state, LoginFactory, $cordovaOauth){
 	$scope.loginWithSlack = function(){
 		console.log("im being called")
 		return LoginFactory.getSlackCreds()
 		.then(creds =>{
 			return $cordovaOauth.slack(creds.clientID, creds.clientSecret, ['channels:read', 'chat:write:bot', 'team:read'])
 		})
 		.then(() => {
 			$state.go('home')
 		})
 	}
})