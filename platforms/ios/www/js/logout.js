app.controller('LogoutCtrl', function($scope, UserFactory, $state, $localStorage, $timeout){
	$scope.logOut = function(){
		UserFactory.logOut()
		$state.go('login')
	}
})