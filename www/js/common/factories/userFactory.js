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
				currentUser = res.data.user[0];
				console.log("user", JSON.stringify(currentUser));
				currentTeam = res.data.team[0];
				console.log("team", JSON.stringify(currentTeam));
				this.setLocalStorage();
			})
		},

		getSlackInfo: function(){
			return $http.get('https://slack.com/api/users.identity')
		},

		setLocalStorage: function(){
			$localStorage.user = currentUser;
			$localStorage.team = currentTeam;
		},

		logOut: function(){
			currentTeam = currentUser = null;
			$localStorage.$reset();
		},

		getCurrentUser: function(){
			console.log("current user in factory", JSON.stringify(currentUser))
			return currentUser
		},

		getCurrentTeam: function(){
			console.log("current team in factory", JSON.stringify(currentTeam))
			return currentTeam

		}
	}
})