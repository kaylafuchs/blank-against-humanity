app.factory('UserFactory', function($http){
	return {
		setUser: function(id){
			console.log("type in factory", typeof id)
			console.log("in factory", JSON.stringify(id))
			return $http({
				method: 'POST',
				url: 'http://localhost:1337/api/users',
				headers: {
					'Content-Type': 'application/json'
				},
				data: {thing: id}
			})
			// return $http.post('http://localhost:1337/api/users', id)
			.then(res => res.data)
		},

		getSlackInfo: function(){
			return $http.get('https://slack.com/api/users.identity')
		}
	}
})