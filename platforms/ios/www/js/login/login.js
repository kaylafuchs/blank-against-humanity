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
 			return $cordovaOauth.slack(creds.clientID, creds.clientSecret, ['identity.basic'])
 		})
 		.then(info => {

 			console.log('type of info', typeof info);
 			// var testObj = JSON.parse(JSON.stringify(info))
 			// console.log("testobj", testObj)
 			return UserFactory.setUser(info.user.id)
 		})
 		.then(data => {
 			$scope.userTeam = data;

 			// console.log("userTeam", JSON.stringify($scope.userTeam))
 			$state.go('home');
 		})
 	}
})

//,'channels:read', 'chat:write:bot', 'team:read'