app.factory('LoginFactory', function($http){
	return {
		getSlackCreds: function(){
			return $http.get('http://localhost:1337/api/slack')	
				.then(res => {
					return res.data
				})
		}
	}
})
