'use strict';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
window.app = angular.module('BlankAgainstHumanity', ['ionic', 'ui.router', 'ngCordova', 'ngCordovaOauth', 'ngStorage']);

console.log("APP", app);
app.run(function ($ionicPlatform) {
<<<<<<< HEAD
	$ionicPlatform.ready(function () {
		if (window.cordova && window.cordova.plugins.Keyboard) {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

			// Don't remove this line unless you know what you are doing. It stops the viewport
			// from snapping when text inputs are focused. Ionic handles this internally for
			// a much nicer keyboard experience.
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
=======
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

app.config(function ($stateProvider) {
    $stateProvider.state('game', {
        url: '/game/:teamId',
        templateUrl: 'js/game/game.html',
        controller: 'GameCtrl',
        resolve: {
            teamGames: function teamGames(GameFactory, $stateParams) {
                return GameFactory.getGamesByTeamId($stateParams.teamId);
            } //stateParams.teamId
        }
    });
>>>>>>> master
});

app.controller('GameCtrl', function ($scope, GameFactory, teamGames) {
    $scope.startNewGame = GameFactory.startNewGame;
    $scope.$on('changedGame', function (event, data) {
        console.log('received event');
        console.log('data obj:', data);
        $scope.game = data;
        $scope.$digest();
    });
    $scope.games = teamGames;
    console.log('teamgames ', teamGames);
});

// (function () {

//     'use strict';

//     // Hope you didn't forget Angular! Duh-doy.
//     if (!window.angular) throw new Error('I can\'t find Angular!');

//     var app = angular.module('fsaPreBuilt', []);

//     app.factory('Socket', function () {
//         if (!window.io) throw new Error('socket.io not found!');
//         return window.io(window.location.origin);
//     });

//     // AUTH_EVENTS is used throughout our app to
//     // broadcast and listen from and to the $rootScope
//     // for important events about authentication flow.
//     app.constant('AUTH_EVENTS', {
//         loginSuccess: 'auth-login-success',
//         loginFailed: 'auth-login-failed',
//         logoutSuccess: 'auth-logout-success',
//         sessionTimeout: 'auth-session-timeout',
//         notAuthenticated: 'auth-not-authenticated',
//         notAuthorized: 'auth-not-authorized'
//     });

//     app.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
//         var statusDict = {
//             401: AUTH_EVENTS.notAuthenticated,
//             403: AUTH_EVENTS.notAuthorized,
//             419: AUTH_EVENTS.sessionTimeout,
//             440: AUTH_EVENTS.sessionTimeout
//         };
//         return {
//             responseError: function (response) {
//                 $rootScope.$broadcast(statusDict[response.status], response);
//                 return $q.reject(response)
//             }
//         };
//     });

//     app.config(function ($httpProvider) {
//         $httpProvider.interceptors.push([
//             '$injector',
//             function ($injector) {
//                 return $injector.get('AuthInterceptor');
//             }
//         ]);
//     });

//     app.service('AuthService', function ($http, Session, $rootScope, AUTH_EVENTS, $q) {

//         function onSuccessfulLogin(response) {
//             var user = response.data.user;
//             Session.create(user);
//             $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
//             return user;
//         }

//         // Uses the session factory to see if an
//         // authenticated user is currently registered.
//         this.isAuthenticated = function () {
//             return !!Session.user;
//         };


//         this.isAdmin = function(userId){
//             console.log('running admin func')
//             return $http.get('/session')
//                 .then(res => res.data.user.isAdmin)
//         }

//         this.getLoggedInUser = function (fromServer) {

//             // If an authenticated session exists, we
//             // return the user attached to that session
//             // with a promise. This ensures that we can
//             // always interface with this method asynchronously.

//             // Optionally, if true is given as the fromServer parameter,
//             // then this cached value will not be used.

//             if (this.isAuthenticated() && fromServer !== true) {
//                 return $q.when(Session.user);
//             }

//             // Make request GET /session.
//             // If it returns a user, call onSuccessfulLogin with the response.
//             // If it returns a 401 response, we catch it and instead resolve to null.
//             return $http.get('/session').then(onSuccessfulLogin).catch(function () {
//                 return null;
//             });

//         };

//         this.login = function (credentials) {
//             return $http.post('/login', credentials)
//                 .then(onSuccessfulLogin)
//                 .catch(function () {
//                     return $q.reject({ message: 'Invalid login credentials.'});
//                 });
//         };

//         this.signup = function(credentials){
//             return $http({
//                 method: 'POST',
//                 url: '/signup',
//                 data: credentials
//             })
//             .then(result => result.data)
//             .catch(function(){
//                 return $q.reject({message: 'That email is already being used.'});
//             })
//         };

//         this.logout = function () {
//             return $http.get('/logout').then(function () {
//                 Session.destroy();
//                 $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
//             });
//         };

//     });

//     app.service('Session', function ($rootScope, AUTH_EVENTS) {

//         var self = this;

//         $rootScope.$on(AUTH_EVENTS.notAuthenticated, function () {
//             self.destroy();
//         });

//         $rootScope.$on(AUTH_EVENTS.sessionTimeout, function () {
//             self.destroy();
//         });

//         this.user = null;

//         this.create = function (user) {
//             this.user = user;
//         };

//         this.destroy = function () {
//             this.user = null;
//         };

//     });

// }());

app.config(function ($stateProvider) {
<<<<<<< HEAD
	$stateProvider.state('login', {
		url: '/login',
		templateUrl: 'js/login/login.html',
		controller: 'LoginCtrl'
	});
});

app.controller('LoginCtrl', function ($scope, $state, LoginFactory, UserFactory, $cordovaOauth, $localStorage) {
	$scope.loginWithSlack = function () {
		console.log("im being called");
		return LoginFactory.getSlackCreds().then(function (creds) {
			console.log("got to oauth step");
			return $cordovaOauth.slack(creds.clientID, creds.clientSecret, ['identity.basic', 'identity.team', 'identity.avatar']);
		}).then(function (info) {
			return UserFactory.setUser(info);
		}).then(function () {
			$state.go('home');
		});
	};

	$scope.user = $localStorage.user || UserFactory.getCurrentUser();
	$scope.team = $localStorage.team || UserFactory.getCurrentTeam();

	console.log("user in login js", $scope.user);
	console.log("team in login js", $scope.team);
});
app.config(function ($stateProvider) {
	$stateProvider.state('home', {
		url: '/',
		templateUrl: 'js/home/home.html',
		controller: 'HomeCtrl'
	});
});

app.controller('HomeCtrl', function ($scope, $state, $cordovaOauth, UserFactory, $localStorage) {
	$scope.user = $localStorage.user || UserFactory.getCurrentUser();
	$scope.team = $localStorage.team || UserFactory.getCurrentTeam();
	// $localStorage.user = $scope.user
	// $localStorage.team = $scope.team
	// console.log("local storage", JSON.stringify($localStorage))
	console.log("user in home controller", JSON.stringify($scope.user));
	console.log("team in home controller", JSON.stringify($scope.team));
	console.log("local storage", JSON.stringify($localStorage));
});
app.factory('LoginFactory', function ($http) {
	return {
		getSlackCreds: function getSlackCreds() {
			return $http.get('http://localhost:1337/api/slack').then(function (res) {
				console.log("res in factory", res.data);
				return res.data;
			});
		}
	};
});

app.factory('UserFactory', function ($http, $localStorage) {
	var currentUser, currentTeam;

	return {
		setUser: function setUser(info) {
			var _this = this;

			return $http({
				method: 'POST',
				url: 'http://localhost:1337/api/users',
				headers: {
					'Content-Type': 'application/json'
				},
				data: info
			}).then(function (res) {
				currentUser = res.data.user[0];
				console.log("user", JSON.stringify(currentUser));
				currentTeam = res.data.team[0];
				console.log("team", JSON.stringify(currentTeam));
				_this.setLocalStorage();
			});
		},

		getSlackInfo: function getSlackInfo() {
			return $http.get('https://slack.com/api/users.identity');
		},

		setLocalStorage: function setLocalStorage() {
			$localStorage.user = currentUser;
			$localStorage.team = currentTeam;
		},

		getCurrentUser: function getCurrentUser() {
			console.log("current user in factory", JSON.stringify(currentUser));
			return currentUser;
		},

		getCurrentTeam: function getCurrentTeam() {
			console.log("current team in factory", JSON.stringify(currentTeam));
			return currentTeam;
		}
	};
});
//Directive File
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImZyb20gZnNnL2Zyb20tZnNnLmpzIiwibG9naW4vbG9naW4uanMiLCJob21lL2hvbWUuanMiLCJjb21tb24vZmFjdG9yaWVzL2xvZ2luRmFjdG9yeS5qcyIsImNvbW1vbi9mYWN0b3JpZXMvdXNlckZhY3RvcnkuanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiXSwibmFtZXMiOlsid2luZG93IiwiYXBwIiwiYW5ndWxhciIsIm1vZHVsZSIsImNvbnNvbGUiLCJsb2ciLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZURlZmF1bHQiLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsInN0YXRlIiwidXJsIiwidGVtcGxhdGVVcmwiLCJjb250cm9sbGVyIiwiJHNjb3BlIiwiJHN0YXRlIiwiTG9naW5GYWN0b3J5IiwiVXNlckZhY3RvcnkiLCIkY29yZG92YU9hdXRoIiwiJGxvY2FsU3RvcmFnZSIsImxvZ2luV2l0aFNsYWNrIiwiZ2V0U2xhY2tDcmVkcyIsInRoZW4iLCJzbGFjayIsImNyZWRzIiwiY2xpZW50SUQiLCJjbGllbnRTZWNyZXQiLCJzZXRVc2VyIiwiaW5mbyIsImdvIiwidXNlciIsImdldEN1cnJlbnRVc2VyIiwidGVhbSIsImdldEN1cnJlbnRUZWFtIiwiSlNPTiIsInN0cmluZ2lmeSIsImZhY3RvcnkiLCIkaHR0cCIsImdldCIsInJlcyIsImRhdGEiLCJjdXJyZW50VXNlciIsImN1cnJlbnRUZWFtIiwibWV0aG9kIiwiaGVhZGVycyIsInNldExvY2FsU3RvcmFnZSIsImdldFNsYWNrSW5mbyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQUEsT0FBQUMsR0FBQSxHQUFBQyxRQUFBQyxNQUFBLENBQUEsc0JBQUEsRUFBQSxDQUFBLE9BQUEsRUFBQSxXQUFBLEVBQUEsV0FBQSxFQUFBLGdCQUFBLEVBQUEsV0FBQSxDQUFBLENBQUE7O0FBRUFDLFFBQUFDLEdBQUEsQ0FBQSxLQUFBLEVBQUFKLEdBQUE7QUFDQUEsSUFBQUssR0FBQSxDQUFBLFVBQUFDLGNBQUEsRUFBQTtBQUNBQSxnQkFBQUMsS0FBQSxDQUFBLFlBQUE7QUFDQSxNQUFBUixPQUFBUyxPQUFBLElBQUFULE9BQUFTLE9BQUEsQ0FBQUMsT0FBQSxDQUFBQyxRQUFBLEVBQUE7QUFDQTtBQUNBO0FBQ0FGLFdBQUFDLE9BQUEsQ0FBQUMsUUFBQSxDQUFBQyx3QkFBQSxDQUFBLElBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0FILFdBQUFDLE9BQUEsQ0FBQUMsUUFBQSxDQUFBRSxhQUFBLENBQUEsSUFBQTtBQUNBO0FBQ0EsTUFBQWIsT0FBQWMsU0FBQSxFQUFBO0FBQ0FBLGFBQUFDLFlBQUE7QUFDQTtBQUNBLEVBZEE7QUFlQSxDQWhCQTtBQ1JBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QSxDQUFBO0FBQ0EsVUFBQUEsV0FBQTtBQUVBO0FBckNBLEVBQUE7QUF1Q0EsQ0ExQ0E7QUNBQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW9uaWMgU3RhcnRlciBBcHBcblxuLy8gYW5ndWxhci5tb2R1bGUgaXMgYSBnbG9iYWwgcGxhY2UgZm9yIGNyZWF0aW5nLCByZWdpc3RlcmluZyBhbmQgcmV0cmlldmluZyBBbmd1bGFyIG1vZHVsZXNcbi8vICdzdGFydGVyJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xud2luZG93LmFwcCA9IGFuZ3VsYXIubW9kdWxlKCdCbGFua0FnYWluc3RIdW1hbml0eScsIFsnaW9uaWMnLCAndWkucm91dGVyJywnbmdDb3Jkb3ZhJywnbmdDb3Jkb3ZhT2F1dGgnLCAnbmdTdG9yYWdlJ10pXG5cbmNvbnNvbGUubG9nKFwiQVBQXCIsIGFwcClcbmFwcC5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0pIHtcbiAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgaWYod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxuICAgICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcblxuICAgICAgLy8gRG9uJ3QgcmVtb3ZlIHRoaXMgbGluZSB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nLiBJdCBzdG9wcyB0aGUgdmlld3BvcnRcbiAgICAgIC8vIGZyb20gc25hcHBpbmcgd2hlbiB0ZXh0IGlucHV0cyBhcmUgZm9jdXNlZC4gSW9uaWMgaGFuZGxlcyB0aGlzIGludGVybmFsbHkgZm9yXG4gICAgICAvLyBhIG11Y2ggbmljZXIga2V5Ym9hcmQgZXhwZXJpZW5jZS5cbiAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5kaXNhYmxlU2Nyb2xsKHRydWUpO1xuICAgIH1cbiAgICBpZih3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XG4gICAgfVxuICB9KTtcbn0pIiwiLy8gKGZ1bmN0aW9uICgpIHtcblxuLy8gICAgICd1c2Ugc3RyaWN0JztcblxuLy8gICAgIC8vIEhvcGUgeW91IGRpZG4ndCBmb3JnZXQgQW5ndWxhciEgRHVoLWRveS5cbi8vICAgICBpZiAoIXdpbmRvdy5hbmd1bGFyKSB0aHJvdyBuZXcgRXJyb3IoJ0kgY2FuXFwndCBmaW5kIEFuZ3VsYXIhJyk7XG5cbi8vICAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2ZzYVByZUJ1aWx0JywgW10pO1xuXG4vLyAgICAgYXBwLmZhY3RvcnkoJ1NvY2tldCcsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgaWYgKCF3aW5kb3cuaW8pIHRocm93IG5ldyBFcnJvcignc29ja2V0LmlvIG5vdCBmb3VuZCEnKTtcbi8vICAgICAgICAgcmV0dXJuIHdpbmRvdy5pbyh3aW5kb3cubG9jYXRpb24ub3JpZ2luKTtcbi8vICAgICB9KTtcblxuLy8gICAgIC8vIEFVVEhfRVZFTlRTIGlzIHVzZWQgdGhyb3VnaG91dCBvdXIgYXBwIHRvXG4vLyAgICAgLy8gYnJvYWRjYXN0IGFuZCBsaXN0ZW4gZnJvbSBhbmQgdG8gdGhlICRyb290U2NvcGVcbi8vICAgICAvLyBmb3IgaW1wb3J0YW50IGV2ZW50cyBhYm91dCBhdXRoZW50aWNhdGlvbiBmbG93LlxuLy8gICAgIGFwcC5jb25zdGFudCgnQVVUSF9FVkVOVFMnLCB7XG4vLyAgICAgICAgIGxvZ2luU3VjY2VzczogJ2F1dGgtbG9naW4tc3VjY2VzcycsXG4vLyAgICAgICAgIGxvZ2luRmFpbGVkOiAnYXV0aC1sb2dpbi1mYWlsZWQnLFxuLy8gICAgICAgICBsb2dvdXRTdWNjZXNzOiAnYXV0aC1sb2dvdXQtc3VjY2VzcycsXG4vLyAgICAgICAgIHNlc3Npb25UaW1lb3V0OiAnYXV0aC1zZXNzaW9uLXRpbWVvdXQnLFxuLy8gICAgICAgICBub3RBdXRoZW50aWNhdGVkOiAnYXV0aC1ub3QtYXV0aGVudGljYXRlZCcsXG4vLyAgICAgICAgIG5vdEF1dGhvcml6ZWQ6ICdhdXRoLW5vdC1hdXRob3JpemVkJ1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLmZhY3RvcnkoJ0F1dGhJbnRlcmNlcHRvcicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkcSwgQVVUSF9FVkVOVFMpIHtcbi8vICAgICAgICAgdmFyIHN0YXR1c0RpY3QgPSB7XG4vLyAgICAgICAgICAgICA0MDE6IEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsXG4vLyAgICAgICAgICAgICA0MDM6IEFVVEhfRVZFTlRTLm5vdEF1dGhvcml6ZWQsXG4vLyAgICAgICAgICAgICA0MTk6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0LFxuLy8gICAgICAgICAgICAgNDQwOiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dFxuLy8gICAgICAgICB9O1xuLy8gICAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAgICAgcmVzcG9uc2VFcnJvcjogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KHN0YXR1c0RpY3RbcmVzcG9uc2Uuc3RhdHVzXSwgcmVzcG9uc2UpO1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzcG9uc2UpXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH07XG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuY29uZmlnKGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XG4vLyAgICAgICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goW1xuLy8gICAgICAgICAgICAgJyRpbmplY3RvcicsXG4vLyAgICAgICAgICAgICBmdW5jdGlvbiAoJGluamVjdG9yKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRpbmplY3Rvci5nZXQoJ0F1dGhJbnRlcmNlcHRvcicpO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICBdKTtcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5zZXJ2aWNlKCdBdXRoU2VydmljZScsIGZ1bmN0aW9uICgkaHR0cCwgU2Vzc2lvbiwgJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMsICRxKSB7XG5cbi8vICAgICAgICAgZnVuY3Rpb24gb25TdWNjZXNzZnVsTG9naW4ocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgIHZhciB1c2VyID0gcmVzcG9uc2UuZGF0YS51c2VyO1xuLy8gICAgICAgICAgICAgU2Vzc2lvbi5jcmVhdGUodXNlcik7XG4vLyAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoQVVUSF9FVkVOVFMubG9naW5TdWNjZXNzKTtcbi8vICAgICAgICAgICAgIHJldHVybiB1c2VyO1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgLy8gVXNlcyB0aGUgc2Vzc2lvbiBmYWN0b3J5IHRvIHNlZSBpZiBhblxuLy8gICAgICAgICAvLyBhdXRoZW50aWNhdGVkIHVzZXIgaXMgY3VycmVudGx5IHJlZ2lzdGVyZWQuXG4vLyAgICAgICAgIHRoaXMuaXNBdXRoZW50aWNhdGVkID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuICEhU2Vzc2lvbi51c2VyO1xuLy8gICAgICAgICB9O1xuXG4gICAgICAgIFxuLy8gICAgICAgICB0aGlzLmlzQWRtaW4gPSBmdW5jdGlvbih1c2VySWQpe1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ3J1bm5pbmcgYWRtaW4gZnVuYycpXG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpXG4vLyAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhLnVzZXIuaXNBZG1pbilcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIHRoaXMuZ2V0TG9nZ2VkSW5Vc2VyID0gZnVuY3Rpb24gKGZyb21TZXJ2ZXIpIHtcblxuLy8gICAgICAgICAgICAgLy8gSWYgYW4gYXV0aGVudGljYXRlZCBzZXNzaW9uIGV4aXN0cywgd2Vcbi8vICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgdXNlciBhdHRhY2hlZCB0byB0aGF0IHNlc3Npb25cbi8vICAgICAgICAgICAgIC8vIHdpdGggYSBwcm9taXNlLiBUaGlzIGVuc3VyZXMgdGhhdCB3ZSBjYW5cbi8vICAgICAgICAgICAgIC8vIGFsd2F5cyBpbnRlcmZhY2Ugd2l0aCB0aGlzIG1ldGhvZCBhc3luY2hyb25vdXNseS5cblxuLy8gICAgICAgICAgICAgLy8gT3B0aW9uYWxseSwgaWYgdHJ1ZSBpcyBnaXZlbiBhcyB0aGUgZnJvbVNlcnZlciBwYXJhbWV0ZXIsXG4vLyAgICAgICAgICAgICAvLyB0aGVuIHRoaXMgY2FjaGVkIHZhbHVlIHdpbGwgbm90IGJlIHVzZWQuXG5cbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlzQXV0aGVudGljYXRlZCgpICYmIGZyb21TZXJ2ZXIgIT09IHRydWUpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbihTZXNzaW9uLnVzZXIpO1xuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICAvLyBNYWtlIHJlcXVlc3QgR0VUIC9zZXNzaW9uLlxuLy8gICAgICAgICAgICAgLy8gSWYgaXQgcmV0dXJucyBhIHVzZXIsIGNhbGwgb25TdWNjZXNzZnVsTG9naW4gd2l0aCB0aGUgcmVzcG9uc2UuXG4vLyAgICAgICAgICAgICAvLyBJZiBpdCByZXR1cm5zIGEgNDAxIHJlc3BvbnNlLCB3ZSBjYXRjaCBpdCBhbmQgaW5zdGVhZCByZXNvbHZlIHRvIG51bGwuXG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbi8vICAgICAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5sb2dpbiA9IGZ1bmN0aW9uIChjcmVkZW50aWFscykge1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9sb2dpbicsIGNyZWRlbnRpYWxzKVxuLy8gICAgICAgICAgICAgICAgIC50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKVxuLy8gICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QoeyBtZXNzYWdlOiAnSW52YWxpZCBsb2dpbiBjcmVkZW50aWFscy4nfSk7XG4vLyAgICAgICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5zaWdudXAgPSBmdW5jdGlvbihjcmVkZW50aWFscyl7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuLy8gICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuLy8gICAgICAgICAgICAgICAgIHVybDogJy9zaWdudXAnLFxuLy8gICAgICAgICAgICAgICAgIGRhdGE6IGNyZWRlbnRpYWxzXG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5kYXRhKVxuLy8gICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKCl7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCh7bWVzc2FnZTogJ1RoYXQgZW1haWwgaXMgYWxyZWFkeSBiZWluZyB1c2VkLid9KTtcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5sb2dvdXQgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvbG9nb3V0JykudGhlbihmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgU2Vzc2lvbi5kZXN0cm95KCk7XG4vLyAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ291dFN1Y2Nlc3MpO1xuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5zZXJ2aWNlKCdTZXNzaW9uJywgZnVuY3Rpb24gKCRyb290U2NvcGUsIEFVVEhfRVZFTlRTKSB7XG5cbi8vICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4vLyAgICAgICAgICRyb290U2NvcGUuJG9uKEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCwgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgc2VsZi5kZXN0cm95KCk7XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XG5cbi8vICAgICAgICAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbiAodXNlcikge1xuLy8gICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgfSk7XG5cbi8vIH0oKSk7XG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKXtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2xvZ2luJywge1xuXHRcdHVybDogJy9sb2dpbicsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9sb2dpbi9sb2dpbi5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnTG9naW5DdHJsJ1xuXHR9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCBMb2dpbkZhY3RvcnksIFVzZXJGYWN0b3J5LCAkY29yZG92YU9hdXRoLCAkbG9jYWxTdG9yYWdlKXtcbiBcdCRzY29wZS5sb2dpbldpdGhTbGFjayA9IGZ1bmN0aW9uKCl7XG4gXHRcdGNvbnNvbGUubG9nKFwiaW0gYmVpbmcgY2FsbGVkXCIpXG4gXHRcdHJldHVybiBMb2dpbkZhY3RvcnkuZ2V0U2xhY2tDcmVkcygpXG4gXHRcdC50aGVuKGNyZWRzID0+e1xuIFx0XHRcdGNvbnNvbGUubG9nKFwiZ290IHRvIG9hdXRoIHN0ZXBcIilcbiBcdFx0XHRyZXR1cm4gJGNvcmRvdmFPYXV0aC5zbGFjayhjcmVkcy5jbGllbnRJRCwgY3JlZHMuY2xpZW50U2VjcmV0LCBbJ2lkZW50aXR5LmJhc2ljJywgJ2lkZW50aXR5LnRlYW0nLCAnaWRlbnRpdHkuYXZhdGFyJ10pXG4gXHRcdH0pXG4gXHRcdC50aGVuKGluZm8gPT4gVXNlckZhY3Rvcnkuc2V0VXNlcihpbmZvKSlcbiBcdFx0LnRoZW4oKCkgPT4ge1xuIFx0XHRcdCRzdGF0ZS5nbygnaG9tZScpO1xuIFx0XHR9KVxuIFx0fVxuXG4gXHQkc2NvcGUudXNlciA9ICRsb2NhbFN0b3JhZ2UudXNlciB8fCBVc2VyRmFjdG9yeS5nZXRDdXJyZW50VXNlcigpO1xuIFx0JHNjb3BlLnRlYW0gPSAkbG9jYWxTdG9yYWdlLnRlYW0gfHwgVXNlckZhY3RvcnkuZ2V0Q3VycmVudFRlYW0oKTtcblxuIFx0Y29uc29sZS5sb2coXCJ1c2VyIGluIGxvZ2luIGpzXCIsICRzY29wZS51c2VyKTtcbiBcdGNvbnNvbGUubG9nKFwidGVhbSBpbiBsb2dpbiBqc1wiLCAkc2NvcGUudGVhbSk7XG59KSIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpe1xuXHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnaG9tZScsIHtcblx0XHR1cmw6ICcvJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2hvbWUvaG9tZS5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnSG9tZUN0cmwnLFxuXHR9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUsICRjb3Jkb3ZhT2F1dGgsIFVzZXJGYWN0b3J5LCAkbG9jYWxTdG9yYWdlKXtcblx0JHNjb3BlLnVzZXIgPSAkbG9jYWxTdG9yYWdlLnVzZXIgfHwgVXNlckZhY3RvcnkuZ2V0Q3VycmVudFVzZXIoKTtcblx0JHNjb3BlLnRlYW0gPSAkbG9jYWxTdG9yYWdlLnRlYW0gfHwgVXNlckZhY3RvcnkuZ2V0Q3VycmVudFRlYW0oKTtcblx0Ly8gJGxvY2FsU3RvcmFnZS51c2VyID0gJHNjb3BlLnVzZXJcblx0Ly8gJGxvY2FsU3RvcmFnZS50ZWFtID0gJHNjb3BlLnRlYW1cblx0Ly8gY29uc29sZS5sb2coXCJsb2NhbCBzdG9yYWdlXCIsIEpTT04uc3RyaW5naWZ5KCRsb2NhbFN0b3JhZ2UpKVxuXHRjb25zb2xlLmxvZyhcInVzZXIgaW4gaG9tZSBjb250cm9sbGVyXCIsIEpTT04uc3RyaW5naWZ5KCRzY29wZS51c2VyKSlcblx0Y29uc29sZS5sb2coXCJ0ZWFtIGluIGhvbWUgY29udHJvbGxlclwiLCBKU09OLnN0cmluZ2lmeSgkc2NvcGUudGVhbSkpXG5cdGNvbnNvbGUubG9nKFwibG9jYWwgc3RvcmFnZVwiLCBKU09OLnN0cmluZ2lmeSgkbG9jYWxTdG9yYWdlKSk7XG59KSIsImFwcC5mYWN0b3J5KCdMb2dpbkZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCl7XG5cdHJldHVybiB7XG5cdFx0Z2V0U2xhY2tDcmVkczogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiAkaHR0cC5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvc2xhY2snKVx0XG5cdFx0XHRcdC50aGVuKHJlcyA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJyZXMgaW4gZmFjdG9yeVwiLCByZXMuZGF0YSlcblx0XHRcdFx0XHRyZXR1cm4gcmVzLmRhdGFcblx0XHRcdFx0fSlcblx0XHR9XG5cdH1cbn0pXG4iLCJhcHAuZmFjdG9yeSgnVXNlckZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCwgJGxvY2FsU3RvcmFnZSl7XG5cdHZhciBjdXJyZW50VXNlciwgY3VycmVudFRlYW07IFxuXG5cdHJldHVybiB7XG5cdFx0c2V0VXNlcjogZnVuY3Rpb24oaW5mbyl7XG5cdFx0XHRyZXR1cm4gJGh0dHAoe1xuXHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdFx0dXJsOiAnaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS91c2VycycsXG5cdFx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRhdGE6IGluZm9cblx0XHRcdH0pXG5cdFx0XHQudGhlbihyZXMgPT4ge1xuXHRcdFx0XHRjdXJyZW50VXNlciA9IHJlcy5kYXRhLnVzZXJbMF07XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwidXNlclwiLCBKU09OLnN0cmluZ2lmeShjdXJyZW50VXNlcikpO1xuXHRcdFx0XHRjdXJyZW50VGVhbSA9IHJlcy5kYXRhLnRlYW1bMF07XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwidGVhbVwiLCBKU09OLnN0cmluZ2lmeShjdXJyZW50VGVhbSkpO1xuXHRcdFx0XHR0aGlzLnNldExvY2FsU3RvcmFnZSgpO1xuXHRcdFx0fSlcblx0XHR9LFxuXG5cdFx0Z2V0U2xhY2tJbmZvOiBmdW5jdGlvbigpe1xuXHRcdFx0cmV0dXJuICRodHRwLmdldCgnaHR0cHM6Ly9zbGFjay5jb20vYXBpL3VzZXJzLmlkZW50aXR5Jylcblx0XHR9LFxuXG5cdFx0c2V0TG9jYWxTdG9yYWdlOiBmdW5jdGlvbigpe1xuXHRcdFx0JGxvY2FsU3RvcmFnZS51c2VyID0gY3VycmVudFVzZXI7XG5cdFx0XHQkbG9jYWxTdG9yYWdlLnRlYW0gPSBjdXJyZW50VGVhbTtcblx0XHR9LFxuXG5cdFx0Z2V0Q3VycmVudFVzZXI6IGZ1bmN0aW9uKCl7XG5cdFx0XHRjb25zb2xlLmxvZyhcImN1cnJlbnQgdXNlciBpbiBmYWN0b3J5XCIsIEpTT04uc3RyaW5naWZ5KGN1cnJlbnRVc2VyKSlcblx0XHRcdHJldHVybiBjdXJyZW50VXNlclxuXHRcdH0sXG5cblx0XHRnZXRDdXJyZW50VGVhbTogZnVuY3Rpb24oKXtcblx0XHRcdGNvbnNvbGUubG9nKFwiY3VycmVudCB0ZWFtIGluIGZhY3RvcnlcIiwgSlNPTi5zdHJpbmdpZnkoY3VycmVudFRlYW0pKVxuXHRcdFx0cmV0dXJuIGN1cnJlbnRUZWFtXG5cblx0XHR9XG5cdH1cbn0pIiwiLy9EaXJlY3RpdmUgRmlsZSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
=======
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl'
    });
});

app.controller('HomeCtrl', function ($scope, $state, $cordovaOauth) {
    console.log("Made it home");
});
app.config(function ($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });
});

app.controller('LoginCtrl', function ($scope, $state, LoginFactory, $cordovaOauth) {
    $scope.loginWithSlack = function () {
        console.log("im being called");
        return LoginFactory.getSlackCreds().then(function (creds) {
            return $cordovaOauth.slack(creds.clientID, creds.clientSecret, ['channels:read', 'chat:write:bot', 'team:read']);
        }).then(function () {
            $state.go('home');
        });
    };
});

//Directive File
app.factory('GameFactory', function ($http, $rootScope) {
    var GameFactory = {};

    var initializeFirebase = function initializeFirebase() {
        var config = {
            apiKey: "AIzaSyD-tDevXvipyuE5lzheWARq4huu1UmqoJk",
            authDomain: "capstone-fb0e8.firebaseapp.com",
            databaseURL: "https://capstone-fb0e8.firebaseio.com",
            storageBucket: "capstone-fb0e8.appspot.com",
            messagingSenderId: "849839680107"
        };
        firebase.initializeApp(config);
    };
    initializeFirebase();

    GameFactory.addUser = function () {};

    GameFactory.startNewGame = function (gameName, teamName) {
        //return $http.get('/session').then(userId => {
        return $http.post('http://localhost:1337/api/games', {
            name: gameName || 'Boring Name',
            teamId: teamId || 2,
            creatorId: 2
        }).then(function (res) {
            return res.data;
        }).then(function (gameId) {
            //const reff = firebase.database().ref(`/games/`)
            var reff = firebase.database().ref('/games/' + gameId);
            reff.on('value', function (snapshot) {
                console.log(snapshot.val());
                $rootScope.$broadcast('changedGame', snapshot.val());
            });
        });
        //set up watcher
    };

    GameFactory.joinGameById = function (gameId) {
        console.log('joining game');
        //var playersTeam = 
        var gameId = 8;
        var playerId = 2; //eventually make it get current 
        return $http.post('http://localhost:1337/api/games/' + gameId + '?playerId=' + playerId, {});
    };

    //
    GameFactory.createGameByIdFireBase = function (firebasegameId) {
        //return $http.post(`http://localhost:1337/api/firebase/games/${gameId}`)
        //needs to be .thenable
        var newRef = firebase.database().ref('games/' + firebasegameId).push();
        newRef.set({
            playerId: req.query.playerId
        });
    };

    //vs getCardsByTeamId
    GameFactory.getDecksByTeamId = function (teamId) {};

    GameFactory.getCardsByCreator = function (userId) {};

    GameFactory.getUsersByGameId = function (gameId) {
        return $http.get('http://localhost:1337/api/games/' + gameId + '/users');
    };

    GameFactory.getGamesByUserId = function (userId) {
        return $http.get('http://localhost:1337/api/games/?userId=' + userId);
    };
    // .then(createdGame =>
    //     //addwatcher to game id in firebase)
    //     return createdGame
    // };


    GameFactory.getGamesByTeamId = function (teamId) {
        console.log('the team is id', teamId);

        var gamesRef = firebase.database().ref('teams/' + teamId + '/games');
        return gamesRef.once('value').then(function (snapshot) {
            console.log('the val is', snapshot.val());
            return snapshot.val();
        });
        // return $http.get(`http://localhost:1337/api/games?teamId=${teamId}`)
        //     .then(res => res.data)
        //.then(foundGames => )
    };

    //get all games by team route

    return GameFactory;
});

// implement joining a game using / session $http request in an angular factory called GameFactory that hits the route / api / games / …..function joinGameById(gameId) {
//     const user = getLoggedInUser() //assumes, could later be optional in admin panel
//     getLOggedInUSer().then(loggedUSer => {
//         don’ t need game.findby id, can just do fb part of gamers independently //Game.findById(gameId ).then(foundGame => let gameRef = fb.db.ref(‘/         games’+foundGame.id))
//     })
// }
// sign in button

app.factory('LoginFactory', function ($http) {
    return {
        getSlackCreds: function getSlackCreds() {
            return $http.get('http://localhost:1337/api/slack').then(function (res) {
                return res.data;
            });
        }
    };
});

// https://slack.com/oauth/authorize?scope=identity.basic
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImdhbWUvZ2FtZS5qcyIsImZyb20gZnNnL2Zyb20tZnNnLmpzIiwiaG9tZS9ob21lLmpzIiwibG9naW4vbG9naW4uanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiLCJjb21tb24vZmFjdG9yaWVzL0dhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9mYWN0b3J5LmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImFwcCIsImFuZ3VsYXIiLCJtb2R1bGUiLCJjb25zb2xlIiwibG9nIiwicnVuIiwiJGlvbmljUGxhdGZvcm0iLCJyZWFkeSIsImNvcmRvdmEiLCJwbHVnaW5zIiwiS2V5Ym9hcmQiLCJoaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIiLCJkaXNhYmxlU2Nyb2xsIiwiU3RhdHVzQmFyIiwic3R5bGVEZWZhdWx0IiwiY29uZmlnIiwiJHN0YXRlUHJvdmlkZXIiLCJzdGF0ZSIsInVybCIsInRlbXBsYXRlVXJsIiwiY29udHJvbGxlciIsInJlc29sdmUiLCJ0ZWFtR2FtZXMiLCJHYW1lRmFjdG9yeSIsIiRzdGF0ZVBhcmFtcyIsImdldEdhbWVzQnlUZWFtSWQiLCJ0ZWFtSWQiLCIkc2NvcGUiLCJzdGFydE5ld0dhbWUiLCIkb24iLCJldmVudCIsImRhdGEiLCJnYW1lIiwiJGRpZ2VzdCIsImdhbWVzIiwiJHN0YXRlIiwiJGNvcmRvdmFPYXV0aCIsIkxvZ2luRmFjdG9yeSIsImxvZ2luV2l0aFNsYWNrIiwiZ2V0U2xhY2tDcmVkcyIsInRoZW4iLCJzbGFjayIsImNyZWRzIiwiY2xpZW50SUQiLCJjbGllbnRTZWNyZXQiLCJnbyIsImZhY3RvcnkiLCIkaHR0cCIsIiRyb290U2NvcGUiLCJpbml0aWFsaXplRmlyZWJhc2UiLCJhcGlLZXkiLCJhdXRoRG9tYWluIiwiZGF0YWJhc2VVUkwiLCJzdG9yYWdlQnVja2V0IiwibWVzc2FnaW5nU2VuZGVySWQiLCJmaXJlYmFzZSIsImluaXRpYWxpemVBcHAiLCJhZGRVc2VyIiwiZ2FtZU5hbWUiLCJ0ZWFtTmFtZSIsInBvc3QiLCJuYW1lIiwiY3JlYXRvcklkIiwicmVzIiwicmVmZiIsImRhdGFiYXNlIiwicmVmIiwiZ2FtZUlkIiwib24iLCJzbmFwc2hvdCIsInZhbCIsIiRicm9hZGNhc3QiLCJqb2luR2FtZUJ5SWQiLCJwbGF5ZXJJZCIsImNyZWF0ZUdhbWVCeUlkRmlyZUJhc2UiLCJmaXJlYmFzZWdhbWVJZCIsIm5ld1JlZiIsInB1c2giLCJzZXQiLCJyZXEiLCJxdWVyeSIsImdldERlY2tzQnlUZWFtSWQiLCJnZXRDYXJkc0J5Q3JlYXRvciIsInVzZXJJZCIsImdldFVzZXJzQnlHYW1lSWQiLCJnZXQiLCJnZXRHYW1lc0J5VXNlcklkIiwiZ2FtZXNSZWYiLCJvbmNlIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBQSxPQUFBQyxHQUFBLEdBQUFDLFFBQUFDLE1BQUEsQ0FBQSxzQkFBQSxFQUFBLENBQUEsT0FBQSxFQUFBLFdBQUEsRUFBQSxXQUFBLEVBQUEsZ0JBQUEsQ0FBQSxDQUFBOztBQUVBQyxRQUFBQyxHQUFBLENBQUEsS0FBQSxFQUFBSixHQUFBO0FBQ0FBLElBQUFLLEdBQUEsQ0FBQSxVQUFBQyxjQUFBLEVBQUE7QUFDQUEsbUJBQUFDLEtBQUEsQ0FBQSxZQUFBO0FBQ0EsWUFBQVIsT0FBQVMsT0FBQSxJQUFBVCxPQUFBUyxPQUFBLENBQUFDLE9BQUEsQ0FBQUMsUUFBQSxFQUFBO0FBQ0E7QUFDQTtBQUNBRixvQkFBQUMsT0FBQSxDQUFBQyxRQUFBLENBQUFDLHdCQUFBLENBQUEsSUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQUgsb0JBQUFDLE9BQUEsQ0FBQUMsUUFBQSxDQUFBRSxhQUFBLENBQUEsSUFBQTtBQUNBO0FBQ0EsWUFBQWIsT0FBQWMsU0FBQSxFQUFBO0FBQ0FBLHNCQUFBQyxZQUFBO0FBQ0E7QUFDQSxLQWRBO0FBZ0JBLENBakJBOztBQ1JBZCxJQUFBZSxNQUFBLENBQUEsVUFBQUMsY0FBQSxFQUFBO0FBQ0FBLG1CQUFBQyxLQUFB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QUFBQyxHQUFBLFlBQUF4QyxNQUFBLFlBQUE7QUFDQSxlQUFBNkQsU0FBQUMsSUFBQSxDQUFBLE9BQUEsRUFBQWhELElBQUEsQ0FBQSxvQkFBQTtBQUNBckMsb0JBQUFDLEdBQUEsQ0FBQSxZQUFBLEVBQUFpRSxTQUFBQyxHQUFBLEVBQUE7QUFDQSxtQkFBQUQsU0FBQUMsR0FBQSxFQUFBO0FBQ0EsU0FIQSxDQUFBO0FBSUE7QUFDQTtBQUNBO0FBQ0EsS0FYQTs7QUFlQTs7QUFFQSxXQUFBL0MsV0FBQTtBQUNBLENBeEdBOztBQTRHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSEF2QixJQUFBOEMsT0FBQSxDQUFBLGNBQUEsRUFBQSxVQUFBQyxLQUFBLEVBQUE7QUFDQSxXQUFBO0FBQ0FSLHVCQUFBLHlCQUFBO0FBQ0EsbUJBQUFRLE1BQUFzQyxHQUFBLENBQUEsaUNBQUEsRUFDQTdDLElBREEsQ0FDQTtBQUFBLHVCQUFBdUIsSUFBQWhDLElBQUE7QUFBQSxhQURBLENBQUE7QUFFQTtBQUpBLEtBQUE7QUFNQSxDQVBBOztBQVVBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJb25pYyBTdGFydGVyIEFwcFxuXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xuLy8gJ3N0YXJ0ZXInIGlzIHRoZSBuYW1lIG9mIHRoaXMgYW5ndWxhciBtb2R1bGUgZXhhbXBsZSAoYWxzbyBzZXQgaW4gYSA8Ym9keT4gYXR0cmlidXRlIGluIGluZGV4Lmh0bWwpXG4vLyB0aGUgMm5kIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiAncmVxdWlyZXMnXG53aW5kb3cuYXBwID0gYW5ndWxhci5tb2R1bGUoJ0JsYW5rQWdhaW5zdEh1bWFuaXR5JywgWydpb25pYycsICd1aS5yb3V0ZXInLCAnbmdDb3Jkb3ZhJywgJ25nQ29yZG92YU9hdXRoJ10pXG5cbmNvbnNvbGUubG9nKFwiQVBQXCIsIGFwcClcbmFwcC5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0pIHtcbiAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgICAgICAgIC8vIEhpZGUgdGhlIGFjY2Vzc29yeSBiYXIgYnkgZGVmYXVsdCAocmVtb3ZlIHRoaXMgdG8gc2hvdyB0aGUgYWNjZXNzb3J5IGJhciBhYm92ZSB0aGUga2V5Ym9hcmRcbiAgICAgICAgICAgIC8vIGZvciBmb3JtIGlucHV0cylcbiAgICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG5cbiAgICAgICAgICAgIC8vIERvbid0IHJlbW92ZSB0aGlzIGxpbmUgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZy4gSXQgc3RvcHMgdGhlIHZpZXdwb3J0XG4gICAgICAgICAgICAvLyBmcm9tIHNuYXBwaW5nIHdoZW4gdGV4dCBpbnB1dHMgYXJlIGZvY3VzZWQuIElvbmljIGhhbmRsZXMgdGhpcyBpbnRlcm5hbGx5IGZvclxuICAgICAgICAgICAgLy8gYSBtdWNoIG5pY2VyIGtleWJvYXJkIGV4cGVyaWVuY2UuXG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2luZG93LlN0YXR1c0Jhcikge1xuICAgICAgICAgICAgU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbn0pXG4iLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlcikgPT4ge1xuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdnYW1lJywge1xuICAgICAgICB1cmw6ICcvZ2FtZS86dGVhbUlkJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL2dhbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdHYW1lQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIHRlYW1HYW1lczogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQoJHN0YXRlUGFyYW1zLnRlYW1JZCkgLy9zdGF0ZVBhcmFtcy50ZWFtSWRcbiAgICAgICAgfVxuICAgIH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignR2FtZUN0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgdGVhbUdhbWVzKSA9PiB7XG4gICAgJHNjb3BlLnN0YXJ0TmV3R2FtZSA9IEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZTtcbiAgICAkc2NvcGUuJG9uKCdjaGFuZ2VkR2FtZScsIChldmVudCwgZGF0YSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygncmVjZWl2ZWQgZXZlbnQnKVxuICAgICAgICBjb25zb2xlLmxvZygnZGF0YSBvYmo6JywgZGF0YSlcbiAgICAgICAgJHNjb3BlLmdhbWUgPSBkYXRhO1xuICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpXG5cbiAgICB9KVxuICAgICRzY29wZS5nYW1lcyA9IHRlYW1HYW1lcztcbiAgICBjb25zb2xlLmxvZygndGVhbWdhbWVzICcsIHRlYW1HYW1lcylcbn0pXG4iLCIvLyAoZnVuY3Rpb24gKCkge1xuXG4vLyAgICAgJ3VzZSBzdHJpY3QnO1xuXG4vLyAgICAgLy8gSG9wZSB5b3UgZGlkbid0IGZvcmdldCBBbmd1bGFyISBEdWgtZG95LlxuLy8gICAgIGlmICghd2luZG93LmFuZ3VsYXIpIHRocm93IG5ldyBFcnJvcignSSBjYW5cXCd0IGZpbmQgQW5ndWxhciEnKTtcblxuLy8gICAgIHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnZnNhUHJlQnVpbHQnLCBbXSk7XG5cbi8vICAgICBhcHAuZmFjdG9yeSgnU29ja2V0JywgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICBpZiAoIXdpbmRvdy5pbykgdGhyb3cgbmV3IEVycm9yKCdzb2NrZXQuaW8gbm90IGZvdW5kIScpO1xuLy8gICAgICAgICByZXR1cm4gd2luZG93LmlvKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pO1xuLy8gICAgIH0pO1xuXG4vLyAgICAgLy8gQVVUSF9FVkVOVFMgaXMgdXNlZCB0aHJvdWdob3V0IG91ciBhcHAgdG9cbi8vICAgICAvLyBicm9hZGNhc3QgYW5kIGxpc3RlbiBmcm9tIGFuZCB0byB0aGUgJHJvb3RTY29wZVxuLy8gICAgIC8vIGZvciBpbXBvcnRhbnQgZXZlbnRzIGFib3V0IGF1dGhlbnRpY2F0aW9uIGZsb3cuXG4vLyAgICAgYXBwLmNvbnN0YW50KCdBVVRIX0VWRU5UUycsIHtcbi8vICAgICAgICAgbG9naW5TdWNjZXNzOiAnYXV0aC1sb2dpbi1zdWNjZXNzJyxcbi8vICAgICAgICAgbG9naW5GYWlsZWQ6ICdhdXRoLWxvZ2luLWZhaWxlZCcsXG4vLyAgICAgICAgIGxvZ291dFN1Y2Nlc3M6ICdhdXRoLWxvZ291dC1zdWNjZXNzJyxcbi8vICAgICAgICAgc2Vzc2lvblRpbWVvdXQ6ICdhdXRoLXNlc3Npb24tdGltZW91dCcsXG4vLyAgICAgICAgIG5vdEF1dGhlbnRpY2F0ZWQ6ICdhdXRoLW5vdC1hdXRoZW50aWNhdGVkJyxcbi8vICAgICAgICAgbm90QXV0aG9yaXplZDogJ2F1dGgtbm90LWF1dGhvcml6ZWQnXG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuZmFjdG9yeSgnQXV0aEludGVyY2VwdG9yJywgZnVuY3Rpb24gKCRyb290U2NvcGUsICRxLCBBVVRIX0VWRU5UUykge1xuLy8gICAgICAgICB2YXIgc3RhdHVzRGljdCA9IHtcbi8vICAgICAgICAgICAgIDQwMTogQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCxcbi8vICAgICAgICAgICAgIDQwMzogQVVUSF9FVkVOVFMubm90QXV0aG9yaXplZCxcbi8vICAgICAgICAgICAgIDQxOTogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsXG4vLyAgICAgICAgICAgICA0NDA6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0XG4vLyAgICAgICAgIH07XG4vLyAgICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgICAgICByZXNwb25zZUVycm9yOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3Qoc3RhdHVzRGljdFtyZXNwb25zZS5zdGF0dXNdLCByZXNwb25zZSk7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXNwb25zZSlcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfTtcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5jb25maWcoZnVuY3Rpb24gKCRodHRwUHJvdmlkZXIpIHtcbi8vICAgICAgICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaChbXG4vLyAgICAgICAgICAgICAnJGluamVjdG9yJyxcbi8vICAgICAgICAgICAgIGZ1bmN0aW9uICgkaW5qZWN0b3IpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJGluamVjdG9yLmdldCgnQXV0aEludGVyY2VwdG9yJyk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIF0pO1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLnNlcnZpY2UoJ0F1dGhTZXJ2aWNlJywgZnVuY3Rpb24gKCRodHRwLCBTZXNzaW9uLCAkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUywgJHEpIHtcblxuLy8gICAgICAgICBmdW5jdGlvbiBvblN1Y2Nlc3NmdWxMb2dpbihyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgdmFyIHVzZXIgPSByZXNwb25zZS5kYXRhLnVzZXI7XG4vLyAgICAgICAgICAgICBTZXNzaW9uLmNyZWF0ZSh1c2VyKTtcbi8vICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dpblN1Y2Nlc3MpO1xuLy8gICAgICAgICAgICAgcmV0dXJuIHVzZXI7XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICAvLyBVc2VzIHRoZSBzZXNzaW9uIGZhY3RvcnkgdG8gc2VlIGlmIGFuXG4vLyAgICAgICAgIC8vIGF1dGhlbnRpY2F0ZWQgdXNlciBpcyBjdXJyZW50bHkgcmVnaXN0ZXJlZC5cbi8vICAgICAgICAgdGhpcy5pc0F1dGhlbnRpY2F0ZWQgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gISFTZXNzaW9uLnVzZXI7XG4vLyAgICAgICAgIH07XG5cbiAgICAgICAgXG4vLyAgICAgICAgIHRoaXMuaXNBZG1pbiA9IGZ1bmN0aW9uKHVzZXJJZCl7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZygncnVubmluZyBhZG1pbiBmdW5jJylcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJylcbi8vICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEudXNlci5pc0FkbWluKVxuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgdGhpcy5nZXRMb2dnZWRJblVzZXIgPSBmdW5jdGlvbiAoZnJvbVNlcnZlcikge1xuXG4vLyAgICAgICAgICAgICAvLyBJZiBhbiBhdXRoZW50aWNhdGVkIHNlc3Npb24gZXhpc3RzLCB3ZVxuLy8gICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSB1c2VyIGF0dGFjaGVkIHRvIHRoYXQgc2Vzc2lvblxuLy8gICAgICAgICAgICAgLy8gd2l0aCBhIHByb21pc2UuIFRoaXMgZW5zdXJlcyB0aGF0IHdlIGNhblxuLy8gICAgICAgICAgICAgLy8gYWx3YXlzIGludGVyZmFjZSB3aXRoIHRoaXMgbWV0aG9kIGFzeW5jaHJvbm91c2x5LlxuXG4vLyAgICAgICAgICAgICAvLyBPcHRpb25hbGx5LCBpZiB0cnVlIGlzIGdpdmVuIGFzIHRoZSBmcm9tU2VydmVyIHBhcmFtZXRlcixcbi8vICAgICAgICAgICAgIC8vIHRoZW4gdGhpcyBjYWNoZWQgdmFsdWUgd2lsbCBub3QgYmUgdXNlZC5cblxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuaXNBdXRoZW50aWNhdGVkKCkgJiYgZnJvbVNlcnZlciAhPT0gdHJ1ZSkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKFNlc3Npb24udXNlcik7XG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIC8vIE1ha2UgcmVxdWVzdCBHRVQgL3Nlc3Npb24uXG4vLyAgICAgICAgICAgICAvLyBJZiBpdCByZXR1cm5zIGEgdXNlciwgY2FsbCBvblN1Y2Nlc3NmdWxMb2dpbiB3aXRoIHRoZSByZXNwb25zZS5cbi8vICAgICAgICAgICAgIC8vIElmIGl0IHJldHVybnMgYSA0MDEgcmVzcG9uc2UsIHdlIGNhdGNoIGl0IGFuZCBpbnN0ZWFkIHJlc29sdmUgdG8gbnVsbC5cbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJykudGhlbihvblN1Y2Nlc3NmdWxMb2dpbikuY2F0Y2goZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuLy8gICAgICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmxvZ2luID0gZnVuY3Rpb24gKGNyZWRlbnRpYWxzKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2xvZ2luJywgY3JlZGVudGlhbHMpXG4vLyAgICAgICAgICAgICAgICAgLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pXG4vLyAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCh7IG1lc3NhZ2U6ICdJbnZhbGlkIGxvZ2luIGNyZWRlbnRpYWxzLid9KTtcbi8vICAgICAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLnNpZ251cCA9IGZ1bmN0aW9uKGNyZWRlbnRpYWxzKXtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4vLyAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4vLyAgICAgICAgICAgICAgICAgdXJsOiAnL3NpZ251cCcsXG4vLyAgICAgICAgICAgICAgICAgZGF0YTogY3JlZGVudGlhbHNcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4gcmVzdWx0LmRhdGEpXG4vLyAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oKXtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHttZXNzYWdlOiAnVGhhdCBlbWFpbCBpcyBhbHJlYWR5IGJlaW5nIHVzZWQuJ30pO1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmxvZ291dCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9sb2dvdXQnKS50aGVuKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICBTZXNzaW9uLmRlc3Ryb3koKTtcbi8vICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoQVVUSF9FVkVOVFMubG9nb3V0U3VjY2Vzcyk7XG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfTtcblxuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLnNlcnZpY2UoJ1Nlc3Npb24nLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMpIHtcblxuLy8gICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbi8vICAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCwgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgc2VsZi5kZXN0cm95KCk7XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgICRyb290U2NvcGUuJG9uKEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0LCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICBzZWxmLmRlc3Ryb3koKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcblxuLy8gICAgICAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uICh1c2VyKSB7XG4vLyAgICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICB9KTtcblxuLy8gfSgpKTtcbiIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpe1xuXHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnaG9tZScsIHtcblx0XHR1cmw6ICcvJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2hvbWUvaG9tZS5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnSG9tZUN0cmwnXG5cdH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignSG9tZUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSwgJGNvcmRvdmFPYXV0aCl7XG5cdGNvbnNvbGUubG9nKFwiTWFkZSBpdCBob21lXCIpXG59KSIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpe1xuXHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnbG9naW4nLCB7XG5cdFx0dXJsOiAnL2xvZ2luJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2xvZ2luL2xvZ2luLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdMb2dpbkN0cmwnXG5cdH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignTG9naW5DdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUsIExvZ2luRmFjdG9yeSwgJGNvcmRvdmFPYXV0aCl7XG4gXHQkc2NvcGUubG9naW5XaXRoU2xhY2sgPSBmdW5jdGlvbigpe1xuIFx0XHRjb25zb2xlLmxvZyhcImltIGJlaW5nIGNhbGxlZFwiKVxuIFx0XHRyZXR1cm4gTG9naW5GYWN0b3J5LmdldFNsYWNrQ3JlZHMoKVxuIFx0XHQudGhlbihjcmVkcyA9PntcbiBcdFx0XHRyZXR1cm4gJGNvcmRvdmFPYXV0aC5zbGFjayhjcmVkcy5jbGllbnRJRCwgY3JlZHMuY2xpZW50U2VjcmV0LCBbJ2NoYW5uZWxzOnJlYWQnLCAnY2hhdDp3cml0ZTpib3QnLCAndGVhbTpyZWFkJ10pXG4gXHRcdH0pXG4gXHRcdC50aGVuKCgpID0+IHtcbiBcdFx0XHQkc3RhdGUuZ28oJ2hvbWUnKVxuIFx0XHR9KVxuIFx0fVxufSlcbiIsIi8vRGlyZWN0aXZlIEZpbGUiLCJhcHAuZmFjdG9yeSgnR2FtZUZhY3RvcnknLCAoJGh0dHAsICRyb290U2NvcGUpID0+IHtcbiAgICBjb25zdCBHYW1lRmFjdG9yeSA9IHt9O1xuXG4gICAgY29uc3QgaW5pdGlhbGl6ZUZpcmViYXNlID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgICAgICBhcGlLZXk6IFwiQUl6YVN5RC10RGV2WHZpcHl1RTVsemhlV0FScTRodXUxVW1xb0prXCIsXG4gICAgICAgICAgICBhdXRoRG9tYWluOiBcImNhcHN0b25lLWZiMGU4LmZpcmViYXNlYXBwLmNvbVwiLFxuICAgICAgICAgICAgZGF0YWJhc2VVUkw6IFwiaHR0cHM6Ly9jYXBzdG9uZS1mYjBlOC5maXJlYmFzZWlvLmNvbVwiLFxuICAgICAgICAgICAgc3RvcmFnZUJ1Y2tldDogXCJjYXBzdG9uZS1mYjBlOC5hcHBzcG90LmNvbVwiLFxuICAgICAgICAgICAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiODQ5ODM5NjgwMTA3XCJcbiAgICAgICAgfTtcbiAgICAgICAgZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChjb25maWcpO1xuICAgIH07XG4gICAgaW5pdGlhbGl6ZUZpcmViYXNlKCk7XG5cblxuICAgIEdhbWVGYWN0b3J5LmFkZFVzZXIgPSAoKSA9PiB7XG5cbiAgICB9O1xuXG4gICAgR2FtZUZhY3Rvcnkuc3RhcnROZXdHYW1lID0gKGdhbWVOYW1lLCB0ZWFtTmFtZSkgPT4ge1xuICAgICAgICAvL3JldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJykudGhlbih1c2VySWQgPT4ge1xuICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9nYW1lcycsIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBnYW1lTmFtZSB8fCAnQm9yaW5nIE5hbWUnLFxuICAgICAgICAgICAgICAgIHRlYW1JZDogdGVhbUlkIHx8IDIsXG4gICAgICAgICAgICAgICAgY3JlYXRvcklkOiAyXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICAgICAgLnRoZW4oZ2FtZUlkID0+IHtcbiAgICAgICAgICAgICAgICAvL2NvbnN0IHJlZmYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgL2dhbWVzL2ApXG4gICAgICAgICAgICAgICAgY29uc3QgcmVmZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGAvZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICAgICAgICByZWZmLm9uKCd2YWx1ZScsIHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc25hcHNob3QudmFsKCkpXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnY2hhbmdlZEdhbWUnLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvL3NldCB1cCB3YXRjaGVyXG4gICAgfTtcblxuXG4gICAgR2FtZUZhY3Rvcnkuam9pbkdhbWVCeUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnam9pbmluZyBnYW1lJylcbiAgICAgICAgICAgIC8vdmFyIHBsYXllcnNUZWFtID0gXG4gICAgICAgIHZhciBnYW1lSWQgPSA4O1xuICAgICAgICB2YXIgcGxheWVySWQgPSAyOyAvL2V2ZW50dWFsbHkgbWFrZSBpdCBnZXQgY3VycmVudCBcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYGh0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZ2FtZXMvJHtnYW1lSWR9P3BsYXllcklkPSR7cGxheWVySWR9YCwge1xuXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLy9cbiAgICBHYW1lRmFjdG9yeS5jcmVhdGVHYW1lQnlJZEZpcmVCYXNlID0gKGZpcmViYXNlZ2FtZUlkKSA9PiB7XG4gICAgICAgIC8vcmV0dXJuICRodHRwLnBvc3QoYGh0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZmlyZWJhc2UvZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgLy9uZWVkcyB0byBiZSAudGhlbmFibGVcbiAgICAgICAgY29uc3QgbmV3UmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYGdhbWVzLyR7ZmlyZWJhc2VnYW1lSWR9YCkucHVzaCgpO1xuICAgICAgICBuZXdSZWYuc2V0KHtcbiAgICAgICAgICAgIHBsYXllcklkOiByZXEucXVlcnkucGxheWVySWRcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cblxuICAgIC8vdnMgZ2V0Q2FyZHNCeVRlYW1JZFxuICAgIEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQgPSAodGVhbUlkKSA9PiB7XG5cbiAgICB9O1xuXG4gICAgR2FtZUZhY3RvcnkuZ2V0Q2FyZHNCeUNyZWF0b3IgPSAodXNlcklkKSA9PiB7XG5cbiAgICB9XG5cbiAgICBHYW1lRmFjdG9yeS5nZXRVc2Vyc0J5R2FtZUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2dhbWVzLyR7Z2FtZUlkfS91c2Vyc2ApO1xuICAgIH07XG5cblxuICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlVc2VySWQgPSAodXNlcklkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2dhbWVzLz91c2VySWQ9JHt1c2VySWR9YClcbiAgICAgICAgfVxuICAgICAgICAvLyAudGhlbihjcmVhdGVkR2FtZSA9PlxuICAgICAgICAvLyAgICAgLy9hZGR3YXRjaGVyIHRvIGdhbWUgaWQgaW4gZmlyZWJhc2UpXG4gICAgICAgIC8vICAgICByZXR1cm4gY3JlYXRlZEdhbWVcbiAgICAgICAgLy8gfTtcblxuXG5cbiAgICBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VGVhbUlkID0gKHRlYW1JZCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygndGhlIHRlYW0gaXMgaWQnLCB0ZWFtSWQpXG5cbiAgICAgICAgY29uc3QgZ2FtZXNSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzYClcbiAgICAgICAgcmV0dXJuIGdhbWVzUmVmLm9uY2UoJ3ZhbHVlJykudGhlbihzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZSB2YWwgaXMnLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gc25hcHNob3QudmFsKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLy8gcmV0dXJuICRodHRwLmdldChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9nYW1lcz90ZWFtSWQ9JHt0ZWFtSWR9YClcbiAgICAgICAgICAgIC8vICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgICAgICAvLy50aGVuKGZvdW5kR2FtZXMgPT4gKVxuICAgIH07XG5cblxuXG4gICAgLy9nZXQgYWxsIGdhbWVzIGJ5IHRlYW0gcm91dGVcblxuICAgIHJldHVybiBHYW1lRmFjdG9yeTtcbn0pO1xuXG5cblxuLy8gaW1wbGVtZW50IGpvaW5pbmcgYSBnYW1lIHVzaW5nIC8gc2Vzc2lvbiAkaHR0cCByZXF1ZXN0IGluIGFuIGFuZ3VsYXIgZmFjdG9yeSBjYWxsZWQgR2FtZUZhY3RvcnkgdGhhdCBoaXRzIHRoZSByb3V0ZSAvIGFwaSAvIGdhbWVzIC8g4oCmLi5mdW5jdGlvbiBqb2luR2FtZUJ5SWQoZ2FtZUlkKSB7XG4vLyAgICAgY29uc3QgdXNlciA9IGdldExvZ2dlZEluVXNlcigpIC8vYXNzdW1lcywgY291bGQgbGF0ZXIgYmUgb3B0aW9uYWwgaW4gYWRtaW4gcGFuZWxcbi8vICAgICBnZXRMT2dnZWRJblVTZXIoKS50aGVuKGxvZ2dlZFVTZXIgPT4ge1xuLy8gICAgICAgICBkb27igJkgdCBuZWVkIGdhbWUuZmluZGJ5IGlkLCBjYW4ganVzdCBkbyBmYiBwYXJ0IG9mIGdhbWVycyBpbmRlcGVuZGVudGx5IC8vR2FtZS5maW5kQnlJZChnYW1lSWQgKS50aGVuKGZvdW5kR2FtZSA9PiBsZXQgZ2FtZVJlZiA9IGZiLmRiLnJlZijigJgvICAgICAgICAgZ2FtZXPigJkrZm91bmRHYW1lLmlkKSlcbi8vICAgICB9KVxuLy8gfVxuLy8gc2lnbiBpbiBidXR0b25cbiIsImFwcC5mYWN0b3J5KCdMb2dpbkZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCl7XG5cdHJldHVybiB7XG5cdFx0Z2V0U2xhY2tDcmVkczogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiAkaHR0cC5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvc2xhY2snKVx0XG5cdFx0XHRcdC50aGVuKHJlcyA9PiByZXMuZGF0YSlcblx0XHR9XG5cdH1cbn0pXG5cblxuLy8gaHR0cHM6Ly9zbGFjay5jb20vb2F1dGgvYXV0aG9yaXplP3Njb3BlPWlkZW50aXR5LmJhc2ljIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
>>>>>>> master
