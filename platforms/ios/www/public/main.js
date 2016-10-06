'use strict';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
window.app = angular.module('BlankAgainstHumanity', ['ionic', 'ui.router', 'ngCordova', 'ngCordovaOauth', 'ngStorage']);

app.run(function ($ionicPlatform) {
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

app.controller('LogoutCtrl', function ($scope, UserFactory, $state, $localStorage) {
  $scope.logOut = function () {
    UserFactory.logOut();
    $state.go('login');
  };
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
app.config(function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'js/login/login.html',
    controller: 'LoginCtrl'
  });
});

app.controller('LoginCtrl', function ($scope, $state, LoginFactory, UserFactory, $cordovaOauth, $localStorage) {
  console.log("now in login state");
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

    logOut: function logOut() {
      $localStorage.team = $localStorage.user = currentTeam = currentUser = null;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImZyb20gZnNnL2Zyb20tZnNnLmpzIiwiaG9tZS9ob21lLmpzIiwibG9naW4vbG9naW4uanMiLCJnYW1lL2dhbWUuanMiLCJjb21tb24vZmFjdG9yaWVzL0dhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9sb2dpbkZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yaWVzL3VzZXJGYWN0b3J5LmpzIiwiY29tbW9uL2RpcmVjdGl2ZXMvZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImFwcCIsImFuZ3VsYXIiLCJtb2R1bGUiLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZURlZmF1bHQiLCJjb250cm9sbGVyIiwiJHNjb3BlIiwiVXNlckZhY3RvcnkiLCIkc3RhdGUiLCIkbG9jYWxTdG9yYWdlIiwibG9nT3V0IiwiZ28iLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsInN0YXRlIiwidXJsIiwidGVtcGxhdGVVcmwiLCIkY29yZG92YU9hdXRoIiwidXNlciIsImdldEN1cnJlbnRVc2VyIiwidGVhbSIsImdldEN1cnJlbnRUZWFtIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJMb2dpbkZhY3RvcnkiLCJsb2dpbldpdGhTbGFjayIsImdldFNsYWNrQ3JlZHMiLCJ0aGVuIiwic2xhY2siLCJjcmVkcyIsImNsaWVudElEIiwiY2xpZW50U2VjcmV0Iiwic2V0VXNlciIsImluZm8iLCJyZXNvbHZlIiwidGVhbUdhbWVzIiwiR2FtZUZhY3RvcnkiLCIkc3RhdGVQYXJhbXMiLCJnZXRHYW1lc0J5VGVhbUlkIiwidGVhbUlkIiwic3RhcnROZXdHYW1lIiwiJG9uIiwiZXZlbnQiLCJkYXRhIiwiZ2FtZSIsIiRkaWdlc3QiLCJnYW1lcyIsImZhY3RvcnkiLCIkaHR0cCIsIiRyb290U2NvcGUiLCJpbml0aWFsaXplRmlyZWJhc2UiLCJhcGlLZXkiLCJhdXRoRG9tYWluIiwiZGF0YWJhc2VVUkwiLCJzdG9yYWdlQnVja2V0IiwibWVzc2FnaW5nU2VuZGVySWQiLCJmaXJlYmFzZSIsImluaXRpYWxpemVBcHAiLCJhZGRVc2VyIiwiZ2FtZU5hbWUiLCJ0ZWFtTmFtZSIsInBvc3QiLCJuYW1lIiwiY3JlYXRvcklkIiwicmVzIiwicmVmZiIsImRhdGFiYXNlIiwicmVmIiwiZ2FtZUlkIiwib24iLCJzbmFwc2hvdCIsInZhbCIsIiRicm9hZGNhc3QiLCJqb2luR2FtZUJ5SWQiLCJwbGF5ZXJJZCIsImNyZWF0ZUdhbWVCeUlkRmlyZUJhc2UiLCJmaXJlYmFzZWdhbWVJZCIsIm5ld1JlZiIsInB1c2giLCJzZXQiLCJyZXEiLCJxdWVyeSIsImdldERlY2tzQnlUZWFtSWQiLCJnZXRDYXJkc0J5Q3JlYXRvciIsInVzZXJJZCIsImdldFVzZXJzQnlHYW1lSWQiLCJnZXQiLCJnZXRHYW1lc0J5VXNlcklkIiwiZ2FtZXNSZWYiLCJvbmNlIiwiY3VycmVudFVzZXIiLCJjdXJyZW50VGVhbSIsIm1ldGhvZCIsImhlYWRlcnMiLCJzZXRMb2NhbFN0b3JhZ2UiLCJnZXRTbGFja0luZm8iXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0FBLE9BQUFDLEdBQUEsR0FBQUMsUUFBQUMsTUFBQSxDQUFBLHNCQUFBLEVBQUEsQ0FBQSxPQUFBLEVBQUEsV0FBQSxFQUFBLFdBQUEsRUFBQSxnQkFBQSxFQUFBLFdBQUEsQ0FBQSxDQUFBOztBQUVBRixJQUFBRyxHQUFBLENBQUEsVUFBQUMsY0FBQSxFQUFBO0FBQ0FBLGlCQUFBQyxLQUFBLENBQUEsWUFBQTtBQUNBLFFBQUFOLE9BQUFPLE9BQUEsSUFBQVAsT0FBQU8sT0FBQSxDQUFBQyxPQUFBLENBQUFDLFFBQUEsRUFBQTtBQUNBO0FBQ0E7QUFDQUYsY0FBQUMsT0FBQSxDQUFBQyxR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QUFBVjtBQU5BLE9BQUEsRUFRQU4sSUFSQSxDQVFBLGVBQUE7QUFDQStELHNCQUFBMUIsSUFBQXJCLElBQUEsQ0FBQTNCLElBQUEsQ0FBQSxDQUFBLENBQUE7QUFDQUksZ0JBQUFDLEdBQUEsQ0FBQSxNQUFBLEVBQUFDLEtBQUFDLFNBQUEsQ0FBQW1FLFdBQUEsQ0FBQTtBQUNBQyxzQkFBQTNCLElBQUFyQixJQUFBLENBQUF6QixJQUFBLENBQUEsQ0FBQSxDQUFBO0FBQ0FFLGdCQUFBQyxHQUFBLENBQUEsTUFBQSxFQUFBQyxLQUFBQyxTQUFBLENBQUFvRSxXQUFBLENBQUE7QUFDQSxjQUFBRyxlQUFBO0FBQ0EsT0FkQSxDQUFBO0FBZUEsS0FqQkE7O0FBbUJBQyxrQkFBQSx3QkFBQTtBQUNBLGFBQUEvQyxNQUFBc0MsR0FBQSxDQUFBLHNDQUFBLENBQUE7QUFDQSxLQXJCQTs7QUF1QkFRLHFCQUFBLDJCQUFBO0FBQ0F2RixvQkFBQVMsSUFBQSxHQUFBMEUsV0FBQTtBQUNBbkYsb0JBQUFXLElBQUEsR0FBQXlFLFdBQUE7QUFDQSxLQTFCQTs7QUE0QkFuRixZQUFBLGtCQUFBO0FBQ0FELG9CQUFBVyxJQUFBLEdBQUFYLGNBQUFTLElBQUEsR0FBQTJFLGNBQUFELGNBQUEsSUFBQTtBQUNBLEtBOUJBOztBQWdDQXpFLG9CQUFBLDBCQUFBO0FBQ0FHLGNBQUFDLEdBQUEsQ0FBQSx5QkFBQSxFQUFBQyxLQUFBQyxTQUFBLENBQUFtRSxXQUFBLENBQUE7QUFDQSxhQUFBQSxXQUFBO0FBQ0EsS0FuQ0E7O0FBcUNBdkUsb0JBQUEsMEJBQUE7QUFDQUMsY0FBQUMsR0FBQSxDQUFBLHlCQUFBLEVBQUFDLEtBQUFDLFNBQUEsQ0FBQW9FLFdBQUEsQ0FBQTtBQUNBLGFBQUFBLFdBQUE7QUFFQTtBQXpDQSxHQUFBO0FBMkNBLENBOUNBO0FDQUEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIElvbmljIFN0YXJ0ZXIgQXBwXG5cbi8vIGFuZ3VsYXIubW9kdWxlIGlzIGEgZ2xvYmFsIHBsYWNlIGZvciBjcmVhdGluZywgcmVnaXN0ZXJpbmcgYW5kIHJldHJpZXZpbmcgQW5ndWxhciBtb2R1bGVzXG4vLyAnc3RhcnRlcicgaXMgdGhlIG5hbWUgb2YgdGhpcyBhbmd1bGFyIG1vZHVsZSBleGFtcGxlIChhbHNvIHNldCBpbiBhIDxib2R5PiBhdHRyaWJ1dGUgaW4gaW5kZXguaHRtbClcbi8vIHRoZSAybmQgcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9mICdyZXF1aXJlcydcbndpbmRvdy5hcHAgPSBhbmd1bGFyLm1vZHVsZSgnQmxhbmtBZ2FpbnN0SHVtYW5pdHknLCBbJ2lvbmljJywgJ3VpLnJvdXRlcicsJ25nQ29yZG92YScsJ25nQ29yZG92YU9hdXRoJywgJ25nU3RvcmFnZSddKVxuXG5hcHAucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtKSB7XG4gICAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICAgICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAgICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuXG4gICAgICAgICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcbiAgICAgICAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxuICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgICAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG59KVxuIiwiYXBwLmNvbnRyb2xsZXIoJ0xvZ291dEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIFVzZXJGYWN0b3J5LCAkc3RhdGUsICRsb2NhbFN0b3JhZ2Upe1xuXHQkc2NvcGUubG9nT3V0ID0gZnVuY3Rpb24oKXtcblx0XHRVc2VyRmFjdG9yeS5sb2dPdXQoKVxuXHRcdCRzdGF0ZS5nbygnbG9naW4nKVxuXHR9XG59KSIsIi8vIChmdW5jdGlvbiAoKSB7XG5cbi8vICAgICAndXNlIHN0cmljdCc7XG5cbi8vICAgICAvLyBIb3BlIHlvdSBkaWRuJ3QgZm9yZ2V0IEFuZ3VsYXIhIER1aC1kb3kuXG4vLyAgICAgaWYgKCF3aW5kb3cuYW5ndWxhcikgdGhyb3cgbmV3IEVycm9yKCdJIGNhblxcJ3QgZmluZCBBbmd1bGFyIScpO1xuXG4vLyAgICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdmc2FQcmVCdWlsdCcsIFtdKTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdTb2NrZXQnLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgIGlmICghd2luZG93LmlvKSB0aHJvdyBuZXcgRXJyb3IoJ3NvY2tldC5pbyBub3QgZm91bmQhJyk7XG4vLyAgICAgICAgIHJldHVybiB3aW5kb3cuaW8od2luZG93LmxvY2F0aW9uLm9yaWdpbik7XG4vLyAgICAgfSk7XG5cbi8vICAgICAvLyBBVVRIX0VWRU5UUyBpcyB1c2VkIHRocm91Z2hvdXQgb3VyIGFwcCB0b1xuLy8gICAgIC8vIGJyb2FkY2FzdCBhbmQgbGlzdGVuIGZyb20gYW5kIHRvIHRoZSAkcm9vdFNjb3BlXG4vLyAgICAgLy8gZm9yIGltcG9ydGFudCBldmVudHMgYWJvdXQgYXV0aGVudGljYXRpb24gZmxvdy5cbi8vICAgICBhcHAuY29uc3RhbnQoJ0FVVEhfRVZFTlRTJywge1xuLy8gICAgICAgICBsb2dpblN1Y2Nlc3M6ICdhdXRoLWxvZ2luLXN1Y2Nlc3MnLFxuLy8gICAgICAgICBsb2dpbkZhaWxlZDogJ2F1dGgtbG9naW4tZmFpbGVkJyxcbi8vICAgICAgICAgbG9nb3V0U3VjY2VzczogJ2F1dGgtbG9nb3V0LXN1Y2Nlc3MnLFxuLy8gICAgICAgICBzZXNzaW9uVGltZW91dDogJ2F1dGgtc2Vzc2lvbi10aW1lb3V0Jyxcbi8vICAgICAgICAgbm90QXV0aGVudGljYXRlZDogJ2F1dGgtbm90LWF1dGhlbnRpY2F0ZWQnLFxuLy8gICAgICAgICBub3RBdXRob3JpemVkOiAnYXV0aC1ub3QtYXV0aG9yaXplZCdcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdBdXRoSW50ZXJjZXB0b3InLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHEsIEFVVEhfRVZFTlRTKSB7XG4vLyAgICAgICAgIHZhciBzdGF0dXNEaWN0ID0ge1xuLy8gICAgICAgICAgICAgNDAxOiBBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLFxuLy8gICAgICAgICAgICAgNDAzOiBBVVRIX0VWRU5UUy5ub3RBdXRob3JpemVkLFxuLy8gICAgICAgICAgICAgNDE5OiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCxcbi8vICAgICAgICAgICAgIDQ0MDogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXRcbi8vICAgICAgICAgfTtcbi8vICAgICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgICAgIHJlc3BvbnNlRXJyb3I6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChzdGF0dXNEaWN0W3Jlc3BvbnNlLnN0YXR1c10sIHJlc3BvbnNlKTtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlc3BvbnNlKVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9O1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLmNvbmZpZyhmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xuLy8gICAgICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKFtcbi8vICAgICAgICAgICAgICckaW5qZWN0b3InLFxuLy8gICAgICAgICAgICAgZnVuY3Rpb24gKCRpbmplY3Rvcikge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkaW5qZWN0b3IuZ2V0KCdBdXRoSW50ZXJjZXB0b3InKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgXSk7XG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuc2VydmljZSgnQXV0aFNlcnZpY2UnLCBmdW5jdGlvbiAoJGh0dHAsIFNlc3Npb24sICRyb290U2NvcGUsIEFVVEhfRVZFTlRTLCAkcSkge1xuXG4vLyAgICAgICAgIGZ1bmN0aW9uIG9uU3VjY2Vzc2Z1bExvZ2luKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICB2YXIgdXNlciA9IHJlc3BvbnNlLmRhdGEudXNlcjtcbi8vICAgICAgICAgICAgIFNlc3Npb24uY3JlYXRlKHVzZXIpO1xuLy8gICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ2luU3VjY2Vzcyk7XG4vLyAgICAgICAgICAgICByZXR1cm4gdXNlcjtcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIC8vIFVzZXMgdGhlIHNlc3Npb24gZmFjdG9yeSB0byBzZWUgaWYgYW5cbi8vICAgICAgICAgLy8gYXV0aGVudGljYXRlZCB1c2VyIGlzIGN1cnJlbnRseSByZWdpc3RlcmVkLlxuLy8gICAgICAgICB0aGlzLmlzQXV0aGVudGljYXRlZCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAhIVNlc3Npb24udXNlcjtcbi8vICAgICAgICAgfTtcblxuICAgICAgICBcbi8vICAgICAgICAgdGhpcy5pc0FkbWluID0gZnVuY3Rpb24odXNlcklkKXtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdydW5uaW5nIGFkbWluIGZ1bmMnKVxuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKVxuLy8gICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YS51c2VyLmlzQWRtaW4pXG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICB0aGlzLmdldExvZ2dlZEluVXNlciA9IGZ1bmN0aW9uIChmcm9tU2VydmVyKSB7XG5cbi8vICAgICAgICAgICAgIC8vIElmIGFuIGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbiBleGlzdHMsIHdlXG4vLyAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIHVzZXIgYXR0YWNoZWQgdG8gdGhhdCBzZXNzaW9uXG4vLyAgICAgICAgICAgICAvLyB3aXRoIGEgcHJvbWlzZS4gVGhpcyBlbnN1cmVzIHRoYXQgd2UgY2FuXG4vLyAgICAgICAgICAgICAvLyBhbHdheXMgaW50ZXJmYWNlIHdpdGggdGhpcyBtZXRob2QgYXN5bmNocm9ub3VzbHkuXG5cbi8vICAgICAgICAgICAgIC8vIE9wdGlvbmFsbHksIGlmIHRydWUgaXMgZ2l2ZW4gYXMgdGhlIGZyb21TZXJ2ZXIgcGFyYW1ldGVyLFxuLy8gICAgICAgICAgICAgLy8gdGhlbiB0aGlzIGNhY2hlZCB2YWx1ZSB3aWxsIG5vdCBiZSB1c2VkLlxuXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSAmJiBmcm9tU2VydmVyICE9PSB0cnVlKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLndoZW4oU2Vzc2lvbi51c2VyKTtcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgLy8gTWFrZSByZXF1ZXN0IEdFVCAvc2Vzc2lvbi5cbi8vICAgICAgICAgICAgIC8vIElmIGl0IHJldHVybnMgYSB1c2VyLCBjYWxsIG9uU3VjY2Vzc2Z1bExvZ2luIHdpdGggdGhlIHJlc3BvbnNlLlxuLy8gICAgICAgICAgICAgLy8gSWYgaXQgcmV0dXJucyBhIDQwMSByZXNwb25zZSwgd2UgY2F0Y2ggaXQgYW5kIGluc3RlYWQgcmVzb2x2ZSB0byBudWxsLlxuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKS50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKS5jYXRjaChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4vLyAgICAgICAgICAgICB9KTtcblxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbiAoY3JlZGVudGlhbHMpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvbG9naW4nLCBjcmVkZW50aWFscylcbi8vICAgICAgICAgICAgICAgICAudGhlbihvblN1Y2Nlc3NmdWxMb2dpbilcbi8vICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHsgbWVzc2FnZTogJ0ludmFsaWQgbG9naW4gY3JlZGVudGlhbHMuJ30pO1xuLy8gICAgICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMuc2lnbnVwID0gZnVuY3Rpb24oY3JlZGVudGlhbHMpe1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbi8vICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbi8vICAgICAgICAgICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbi8vICAgICAgICAgICAgICAgICBkYXRhOiBjcmVkZW50aWFsc1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQuZGF0YSlcbi8vICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbigpe1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3Qoe21lc3NhZ2U6ICdUaGF0IGVtYWlsIGlzIGFscmVhZHkgYmVpbmcgdXNlZC4nfSk7XG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL2xvZ291dCcpLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgIFNlc3Npb24uZGVzdHJveSgpO1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dvdXRTdWNjZXNzKTtcbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuc2VydmljZSgnU2Vzc2lvbicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUykge1xuXG4vLyAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuLy8gICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICBzZWxmLmRlc3Ryb3koKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuXG4vLyAgICAgICAgIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24gKHVzZXIpIHtcbi8vICAgICAgICAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcbi8vICAgICAgICAgfTtcblxuLy8gICAgIH0pO1xuXG4vLyB9KCkpO1xuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcil7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lJywge1xuXHRcdHVybDogJy8nLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvaG9tZS9ob21lLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdIb21lQ3RybCcsXG5cdH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignSG9tZUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSwgJGNvcmRvdmFPYXV0aCwgVXNlckZhY3RvcnksICRsb2NhbFN0b3JhZ2Upe1xuXHQkc2NvcGUudXNlciA9ICRsb2NhbFN0b3JhZ2UudXNlciB8fCBVc2VyRmFjdG9yeS5nZXRDdXJyZW50VXNlcigpO1xuXHQkc2NvcGUudGVhbSA9ICRsb2NhbFN0b3JhZ2UudGVhbSB8fCBVc2VyRmFjdG9yeS5nZXRDdXJyZW50VGVhbSgpO1xuXHQvLyAkbG9jYWxTdG9yYWdlLnVzZXIgPSAkc2NvcGUudXNlclxuXHQvLyAkbG9jYWxTdG9yYWdlLnRlYW0gPSAkc2NvcGUudGVhbVxuXHQvLyBjb25zb2xlLmxvZyhcImxvY2FsIHN0b3JhZ2VcIiwgSlNPTi5zdHJpbmdpZnkoJGxvY2FsU3RvcmFnZSkpXG5cdGNvbnNvbGUubG9nKFwidXNlciBpbiBob21lIGNvbnRyb2xsZXJcIiwgSlNPTi5zdHJpbmdpZnkoJHNjb3BlLnVzZXIpKVxuXHRjb25zb2xlLmxvZyhcInRlYW0gaW4gaG9tZSBjb250cm9sbGVyXCIsIEpTT04uc3RyaW5naWZ5KCRzY29wZS50ZWFtKSlcblx0Y29uc29sZS5sb2coXCJsb2NhbCBzdG9yYWdlXCIsIEpTT04uc3RyaW5naWZ5KCRsb2NhbFN0b3JhZ2UpKTtcbn0pIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcil7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdsb2dpbicsIHtcblx0XHR1cmw6ICcvbG9naW4nLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvbG9naW4vbG9naW4uaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0xvZ2luQ3RybCdcblx0fSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdMb2dpbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSwgTG9naW5GYWN0b3J5LCBVc2VyRmFjdG9yeSwgJGNvcmRvdmFPYXV0aCwgJGxvY2FsU3RvcmFnZSl7XG5cdGNvbnNvbGUubG9nKFwibm93IGluIGxvZ2luIHN0YXRlXCIpXG4gXHQkc2NvcGUubG9naW5XaXRoU2xhY2sgPSBmdW5jdGlvbigpe1xuIFx0XHRjb25zb2xlLmxvZyhcImltIGJlaW5nIGNhbGxlZFwiKVxuIFx0XHRyZXR1cm4gTG9naW5GYWN0b3J5LmdldFNsYWNrQ3JlZHMoKVxuIFx0XHQudGhlbihjcmVkcyA9PntcbiBcdFx0XHRjb25zb2xlLmxvZyhcImdvdCB0byBvYXV0aCBzdGVwXCIpXG4gXHRcdFx0cmV0dXJuICRjb3Jkb3ZhT2F1dGguc2xhY2soY3JlZHMuY2xpZW50SUQsIGNyZWRzLmNsaWVudFNlY3JldCwgWydpZGVudGl0eS5iYXNpYycsICdpZGVudGl0eS50ZWFtJywgJ2lkZW50aXR5LmF2YXRhciddKVxuIFx0XHR9KVxuIFx0XHQudGhlbihpbmZvID0+IFVzZXJGYWN0b3J5LnNldFVzZXIoaW5mbykpXG4gXHRcdC50aGVuKCgpID0+IHtcbiBcdFx0XHQkc3RhdGUuZ28oJ2hvbWUnKTtcbiBcdFx0fSlcbiBcdH1cblxuIFx0JHNjb3BlLnVzZXIgPSAkbG9jYWxTdG9yYWdlLnVzZXIgfHwgVXNlckZhY3RvcnkuZ2V0Q3VycmVudFVzZXIoKTtcbiBcdCRzY29wZS50ZWFtID0gJGxvY2FsU3RvcmFnZS50ZWFtIHx8IFVzZXJGYWN0b3J5LmdldEN1cnJlbnRUZWFtKCk7XG5cbiBcdGNvbnNvbGUubG9nKFwidXNlciBpbiBsb2dpbiBqc1wiLCAkc2NvcGUudXNlcik7XG4gXHRjb25zb2xlLmxvZyhcInRlYW0gaW4gbG9naW4ganNcIiwgJHNjb3BlLnRlYW0pO1xufSkiLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlcikgPT4ge1xuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdnYW1lJywge1xuICAgICAgICB1cmw6ICcvZ2FtZS86dGVhbUlkJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL2dhbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdHYW1lQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIHRlYW1HYW1lczogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQoJHN0YXRlUGFyYW1zLnRlYW1JZCkgLy9zdGF0ZVBhcmFtcy50ZWFtSWRcbiAgICAgICAgfVxuICAgIH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignR2FtZUN0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgdGVhbUdhbWVzKSA9PiB7XG4gICAgJHNjb3BlLnN0YXJ0TmV3R2FtZSA9IEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZTtcbiAgICAkc2NvcGUuJG9uKCdjaGFuZ2VkR2FtZScsIChldmVudCwgZGF0YSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygncmVjZWl2ZWQgZXZlbnQnKVxuICAgICAgICBjb25zb2xlLmxvZygnZGF0YSBvYmo6JywgZGF0YSlcbiAgICAgICAgJHNjb3BlLmdhbWUgPSBkYXRhO1xuICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpXG5cbiAgICB9KVxuICAgICRzY29wZS5nYW1lcyA9IHRlYW1HYW1lcztcbiAgICBjb25zb2xlLmxvZygndGVhbWdhbWVzICcsIHRlYW1HYW1lcylcbn0pXG4iLCJhcHAuZmFjdG9yeSgnR2FtZUZhY3RvcnknLCAoJGh0dHAsICRyb290U2NvcGUpID0+IHtcbiAgICBjb25zdCBHYW1lRmFjdG9yeSA9IHt9O1xuXG4gICAgY29uc3QgaW5pdGlhbGl6ZUZpcmViYXNlID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgICAgICBhcGlLZXk6IFwiQUl6YVN5RC10RGV2WHZpcHl1RTVsemhlV0FScTRodXUxVW1xb0prXCIsXG4gICAgICAgICAgICBhdXRoRG9tYWluOiBcImNhcHN0b25lLWZiMGU4LmZpcmViYXNlYXBwLmNvbVwiLFxuICAgICAgICAgICAgZGF0YWJhc2VVUkw6IFwiaHR0cHM6Ly9jYXBzdG9uZS1mYjBlOC5maXJlYmFzZWlvLmNvbVwiLFxuICAgICAgICAgICAgc3RvcmFnZUJ1Y2tldDogXCJjYXBzdG9uZS1mYjBlOC5hcHBzcG90LmNvbVwiLFxuICAgICAgICAgICAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiODQ5ODM5NjgwMTA3XCJcbiAgICAgICAgfTtcbiAgICAgICAgZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChjb25maWcpO1xuICAgIH07XG4gICAgaW5pdGlhbGl6ZUZpcmViYXNlKCk7XG5cblxuICAgIEdhbWVGYWN0b3J5LmFkZFVzZXIgPSAoKSA9PiB7XG5cbiAgICB9O1xuXG4gICAgR2FtZUZhY3Rvcnkuc3RhcnROZXdHYW1lID0gKGdhbWVOYW1lLCB0ZWFtTmFtZSkgPT4ge1xuICAgICAgICAvL3JldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJykudGhlbih1c2VySWQgPT4ge1xuICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9nYW1lcycsIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBnYW1lTmFtZSB8fCAnQm9yaW5nIE5hbWUnLFxuICAgICAgICAgICAgICAgIHRlYW1JZDogdGVhbUlkIHx8IDIsXG4gICAgICAgICAgICAgICAgY3JlYXRvcklkOiAyXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICAgICAgLnRoZW4oZ2FtZUlkID0+IHtcbiAgICAgICAgICAgICAgICAvL2NvbnN0IHJlZmYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgL2dhbWVzL2ApXG4gICAgICAgICAgICAgICAgY29uc3QgcmVmZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGAvZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICAgICAgICByZWZmLm9uKCd2YWx1ZScsIHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc25hcHNob3QudmFsKCkpXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnY2hhbmdlZEdhbWUnLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvL3NldCB1cCB3YXRjaGVyXG4gICAgfTtcblxuXG4gICAgR2FtZUZhY3Rvcnkuam9pbkdhbWVCeUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnam9pbmluZyBnYW1lJylcbiAgICAgICAgICAgIC8vdmFyIHBsYXllcnNUZWFtID0gXG4gICAgICAgIHZhciBnYW1lSWQgPSA4O1xuICAgICAgICB2YXIgcGxheWVySWQgPSAyOyAvL2V2ZW50dWFsbHkgbWFrZSBpdCBnZXQgY3VycmVudCBcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYGh0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZ2FtZXMvJHtnYW1lSWR9P3BsYXllcklkPSR7cGxheWVySWR9YCwge1xuXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLy9cbiAgICBHYW1lRmFjdG9yeS5jcmVhdGVHYW1lQnlJZEZpcmVCYXNlID0gKGZpcmViYXNlZ2FtZUlkKSA9PiB7XG4gICAgICAgIC8vcmV0dXJuICRodHRwLnBvc3QoYGh0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZmlyZWJhc2UvZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgLy9uZWVkcyB0byBiZSAudGhlbmFibGVcbiAgICAgICAgY29uc3QgbmV3UmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYGdhbWVzLyR7ZmlyZWJhc2VnYW1lSWR9YCkucHVzaCgpO1xuICAgICAgICBuZXdSZWYuc2V0KHtcbiAgICAgICAgICAgIHBsYXllcklkOiByZXEucXVlcnkucGxheWVySWRcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cblxuICAgIC8vdnMgZ2V0Q2FyZHNCeVRlYW1JZFxuICAgIEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQgPSAodGVhbUlkKSA9PiB7XG5cbiAgICB9O1xuXG4gICAgR2FtZUZhY3RvcnkuZ2V0Q2FyZHNCeUNyZWF0b3IgPSAodXNlcklkKSA9PiB7XG5cbiAgICB9XG5cbiAgICBHYW1lRmFjdG9yeS5nZXRVc2Vyc0J5R2FtZUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2dhbWVzLyR7Z2FtZUlkfS91c2Vyc2ApO1xuICAgIH07XG5cblxuICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlVc2VySWQgPSAodXNlcklkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2dhbWVzLz91c2VySWQ9JHt1c2VySWR9YClcbiAgICAgICAgfVxuICAgICAgICAvLyAudGhlbihjcmVhdGVkR2FtZSA9PlxuICAgICAgICAvLyAgICAgLy9hZGR3YXRjaGVyIHRvIGdhbWUgaWQgaW4gZmlyZWJhc2UpXG4gICAgICAgIC8vICAgICByZXR1cm4gY3JlYXRlZEdhbWVcbiAgICAgICAgLy8gfTtcblxuXG5cbiAgICBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VGVhbUlkID0gKHRlYW1JZCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygndGhlIHRlYW0gaXMgaWQnLCB0ZWFtSWQpXG5cbiAgICAgICAgY29uc3QgZ2FtZXNSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzYClcbiAgICAgICAgcmV0dXJuIGdhbWVzUmVmLm9uY2UoJ3ZhbHVlJykudGhlbihzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZSB2YWwgaXMnLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gc25hcHNob3QudmFsKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLy8gcmV0dXJuICRodHRwLmdldChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9nYW1lcz90ZWFtSWQ9JHt0ZWFtSWR9YClcbiAgICAgICAgICAgIC8vICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgICAgICAvLy50aGVuKGZvdW5kR2FtZXMgPT4gKVxuICAgIH07XG5cblxuXG4gICAgLy9nZXQgYWxsIGdhbWVzIGJ5IHRlYW0gcm91dGVcblxuICAgIHJldHVybiBHYW1lRmFjdG9yeTtcbn0pO1xuXG5cblxuLy8gaW1wbGVtZW50IGpvaW5pbmcgYSBnYW1lIHVzaW5nIC8gc2Vzc2lvbiAkaHR0cCByZXF1ZXN0IGluIGFuIGFuZ3VsYXIgZmFjdG9yeSBjYWxsZWQgR2FtZUZhY3RvcnkgdGhhdCBoaXRzIHRoZSByb3V0ZSAvIGFwaSAvIGdhbWVzIC8g4oCmLi5mdW5jdGlvbiBqb2luR2FtZUJ5SWQoZ2FtZUlkKSB7XG4vLyAgICAgY29uc3QgdXNlciA9IGdldExvZ2dlZEluVXNlcigpIC8vYXNzdW1lcywgY291bGQgbGF0ZXIgYmUgb3B0aW9uYWwgaW4gYWRtaW4gcGFuZWxcbi8vICAgICBnZXRMT2dnZWRJblVTZXIoKS50aGVuKGxvZ2dlZFVTZXIgPT4ge1xuLy8gICAgICAgICBkb27igJkgdCBuZWVkIGdhbWUuZmluZGJ5IGlkLCBjYW4ganVzdCBkbyBmYiBwYXJ0IG9mIGdhbWVycyBpbmRlcGVuZGVudGx5IC8vR2FtZS5maW5kQnlJZChnYW1lSWQgKS50aGVuKGZvdW5kR2FtZSA9PiBsZXQgZ2FtZVJlZiA9IGZiLmRiLnJlZijigJgvICAgICAgICAgZ2FtZXPigJkrZm91bmRHYW1lLmlkKSlcbi8vICAgICB9KVxuLy8gfVxuLy8gc2lnbiBpbiBidXR0b25cbiIsImFwcC5mYWN0b3J5KCdMb2dpbkZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCl7XG5cdHJldHVybiB7XG5cdFx0Z2V0U2xhY2tDcmVkczogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiAkaHR0cC5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvc2xhY2snKVx0XG5cdFx0XHRcdC50aGVuKHJlcyA9PiB7XG5cdFx0XHRcdFx0Y29uc29sZS5sb2coXCJyZXMgaW4gZmFjdG9yeVwiLCByZXMuZGF0YSlcblx0XHRcdFx0XHRyZXR1cm4gcmVzLmRhdGFcblx0XHRcdFx0fSlcblx0XHR9XG5cdH1cbn0pXG4iLCJhcHAuZmFjdG9yeSgnVXNlckZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCwgJGxvY2FsU3RvcmFnZSl7XG5cdHZhciBjdXJyZW50VXNlciwgY3VycmVudFRlYW07IFxuXG5cdHJldHVybiB7XG5cdFx0c2V0VXNlcjogZnVuY3Rpb24oaW5mbyl7XG5cdFx0XHRyZXR1cm4gJGh0dHAoe1xuXHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdFx0dXJsOiAnaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS91c2VycycsXG5cdFx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRhdGE6IGluZm9cblx0XHRcdH0pXG5cdFx0XHQudGhlbihyZXMgPT4ge1xuXHRcdFx0XHRjdXJyZW50VXNlciA9IHJlcy5kYXRhLnVzZXJbMF07XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwidXNlclwiLCBKU09OLnN0cmluZ2lmeShjdXJyZW50VXNlcikpO1xuXHRcdFx0XHRjdXJyZW50VGVhbSA9IHJlcy5kYXRhLnRlYW1bMF07XG5cdFx0XHRcdGNvbnNvbGUubG9nKFwidGVhbVwiLCBKU09OLnN0cmluZ2lmeShjdXJyZW50VGVhbSkpO1xuXHRcdFx0XHR0aGlzLnNldExvY2FsU3RvcmFnZSgpO1xuXHRcdFx0fSlcblx0XHR9LFxuXG5cdFx0Z2V0U2xhY2tJbmZvOiBmdW5jdGlvbigpe1xuXHRcdFx0cmV0dXJuICRodHRwLmdldCgnaHR0cHM6Ly9zbGFjay5jb20vYXBpL3VzZXJzLmlkZW50aXR5Jylcblx0XHR9LFxuXG5cdFx0c2V0TG9jYWxTdG9yYWdlOiBmdW5jdGlvbigpe1xuXHRcdFx0JGxvY2FsU3RvcmFnZS51c2VyID0gY3VycmVudFVzZXI7XG5cdFx0XHQkbG9jYWxTdG9yYWdlLnRlYW0gPSBjdXJyZW50VGVhbTtcblx0XHR9LFxuXG5cdFx0bG9nT3V0OiBmdW5jdGlvbigpe1xuXHRcdFx0JGxvY2FsU3RvcmFnZS50ZWFtID0gJGxvY2FsU3RvcmFnZS51c2VyID0gIGN1cnJlbnRUZWFtID0gY3VycmVudFVzZXIgPSBudWxsO1xuXHRcdH0sXG5cblx0XHRnZXRDdXJyZW50VXNlcjogZnVuY3Rpb24oKXtcblx0XHRcdGNvbnNvbGUubG9nKFwiY3VycmVudCB1c2VyIGluIGZhY3RvcnlcIiwgSlNPTi5zdHJpbmdpZnkoY3VycmVudFVzZXIpKVxuXHRcdFx0cmV0dXJuIGN1cnJlbnRVc2VyXG5cdFx0fSxcblxuXHRcdGdldEN1cnJlbnRUZWFtOiBmdW5jdGlvbigpe1xuXHRcdFx0Y29uc29sZS5sb2coXCJjdXJyZW50IHRlYW0gaW4gZmFjdG9yeVwiLCBKU09OLnN0cmluZ2lmeShjdXJyZW50VGVhbSkpXG5cdFx0XHRyZXR1cm4gY3VycmVudFRlYW1cblxuXHRcdH1cblx0fVxufSkiLCIvL0RpcmVjdGl2ZSBGaWxlIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
