app.config(function($stateProvider){
	$stateProvider.state('login', {
		url: '/login',
		templateUrl: 'js/login/login.html',
		controller: 'LoginCtrl'
	})
})

app.controller('LoginCtrl', function($scope, $state, LoginFactory){
	console.log($scope)
 	$scope.loginWithSlack = function(){
 		console.log("im being called")
 		return LoginFactory.loginWithSlack()
 		.then(data  => {
 			console.log("data from slack: ", data)
 		})
 	}
})