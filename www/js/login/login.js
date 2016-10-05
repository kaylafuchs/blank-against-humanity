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
 			console.log("got to oauth step")
 			return $cordovaOauth.slack(creds.clientID, creds.clientSecret, ['channels:read', 'chat:write:bot', 'team:read'])
 		})
 		.then(info => {
 			$scope.user = info;
 			console.log("scope user", JSON.stringify($scope.user))
 			$state.go('home')
 		})
 	}
})
