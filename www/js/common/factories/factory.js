app.factory('LoginFactory', function($http){
	return {
		loginWithSlack: function(){
			window.location.href = 'http://localhost:1337/auth/slack'	
		}
	}
})


// https://slack.com/oauth/authorize?scope=identity.basic