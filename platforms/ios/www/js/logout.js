app.controller('LogoutCtrl', function($scope, UserFactory, $state, $localStorage){
	$scope.logOut = function(){
		UserFactory.logOut()
		$state.go('login')
	}
})