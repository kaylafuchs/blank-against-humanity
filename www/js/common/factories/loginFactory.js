app.factory('LoginFactory', function($http){
	return {
		getSlackCreds: function(){
			return $http.get('http://192.168.1.48:1337/api/slack')	
				.then(res => {
					return res.data
				})
		}
	}
})
