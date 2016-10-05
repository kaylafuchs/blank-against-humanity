app.config(function($stateProvider){
	$stateProvider.state('login', {
		url: '/login',
		templateUrl: 'js/login/login.html',
		controller: 'LoginCtrl'
	})
})

app.controller('LoginCtrl', function($scope, $state, LoginFactory, UserFactory, $cordovaOauth){
 	$scope.loginWithSlack = function(){
 		console.log("im being called")
 		return LoginFactory.getSlackCreds()
 		.then(creds =>{
 			console.log("got to oauth step")
 			return $cordovaOauth.slack(creds.clientID, creds.clientSecret, ['identity.basic', 'identity.team', 'identity.avatar'])
 		})
 		.then(info => {
 			return UserFactory.setUser(info)
 		})
 		.then(data => {
 			$scope.userTeam = data;
 			console.log('data from slack', JSON.stringify(data))

 			// console.log("userTeam", JSON.stringify($scope.userTeam))
 			$state.go('home');
 		})
 	}
})

//,'channels:read', 'chat:write:bot', 'team:read'