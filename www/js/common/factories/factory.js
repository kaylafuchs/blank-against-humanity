app.factory('LoginFactory', function($http){
	return {
		getSlackCreds: function(){
			return $http.get('http://localhost:1337/api/slack')	
				.then(res => res.data)
		}
	}
})


// https://slack.com/oauth/authorize?scope=identity.basic