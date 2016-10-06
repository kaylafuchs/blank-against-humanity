app.controller('LogoutCtrl', function($scope, UserFactory, $state, $localStorage, $timeout){
	$scope.logOut = function(){
		UserFactory.logOut()
		$scope.user = UserFactory.getCurrentUser() || $localStorage.user
		$scope.team = UserFactory.getCurrentTeam() || $localStorage.team
		$state.go('login')
	}
})