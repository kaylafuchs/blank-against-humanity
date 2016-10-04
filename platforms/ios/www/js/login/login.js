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

 		// $cordovaOauth.slack('85257560000.86181104260', 'f6d57e53f68d012eae2ea5485de4f5d0', ['channels:read', 'chat:write:bot', 'team:read'])
 		// .then(() => {
 		// 	$state.go('home')
 		// });
 	}
})