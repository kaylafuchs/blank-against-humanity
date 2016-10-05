app.factory('UserFactory', function($http){
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
			.then(res => res.data)
		},

		getSlackInfo: function(){
			return $http.get('https://slack.com/api/users.identity')
		}
	}
})