app.factory('UserFactory', function($http, $localStorage, $timeout, $state){
	
	return {
		setUser: function(info){
			return $http({
				method: 'POST',
				url: 'http://192.168.1.48:1337/api/users',
				headers: {
					'Content-Type': 'application/json'
				},
				data: info
			})
			.then(res => {
				this.setLocalStorage(res.data.user[0], res.data.team[0]);
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