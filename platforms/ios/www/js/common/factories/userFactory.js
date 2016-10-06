app.factory('UserFactory', function($http, $localStorage, $timeout, $state){
	var currentUser, currentTeam; 

	return {
		setUser: function(info){
			return $http({
				method: 'POST',
				url: 'http://localhost:1337/api/users',
				headers: {
					'Content-Type': 'application/json'
				},
				data: info
			})
			.then(res => {
				this.setLocalStorage(res.data.user[0], res.data.user[0]);
			})
		},

		getSlackInfo: function(){
			return $http.get('https://slack.com/api/users.identity')
		},

		setLocalStorage: function(user, team){
			$localStorage.user = user;
			$localStorage.team = team;
		},

		logOut: function(){
			$localStorage.$reset();
		}
	}
})