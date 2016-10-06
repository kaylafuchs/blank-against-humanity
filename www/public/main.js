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

app.controller('LogoutCtrl', function ($scope, UserFactory, $state, $localStorage, $timeout) {
  $scope.logOut = function () {
    UserFactory.logOut();
    $state.go('login');
  };
});
app.config(function ($stateProvider) {
  $stateProvider.state('decks', {
    url: 'decks/:teamid',
    templateUrl: 'js/decks/decks.html',
    controller: 'DeckCtrl',
    resolve: {
      decks: function decks(GameFactory, $stateParams) {
        return GameFactory.getDecksByTeamId(stateParams.teamId);
      }
    }
  });
});

app.controller('DeckCtrl', function ($scope) {});
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

app.config(function ($stateProvider) {
  $stateProvider.state('home', {
    url: '/home',
    templateUrl: 'js/home/home.html',
    controller: 'HomeCtrl'
  });
});

app.controller('HomeCtrl', function ($scope, $state, $cordovaOauth, UserFactory, GameFactory, $localStorage) {
  $scope.storage = $localStorage;

  GameFactory.getGamesByUserId(2).then(function (userGames) {
    $scope.userGames = userGames;
  });

  $scope.greeting = "hello";
});

app.config(function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'js/login/login.html',
    controller: 'LoginCtrl'
  });
});

app.controller('LoginCtrl', function ($scope, $state, LoginFactory, UserFactory, $cordovaOauth, $localStorage, $timeout) {
  $scope.loginWithSlack = function () {
    return LoginFactory.getSlackCreds().then(function (creds) {
      return $cordovaOauth.slack(creds.clientID, creds.clientSecret, ['identity.basic', 'identity.team', 'identity.avatar']);
    }).then(function (info) {
      return UserFactory.setUser(info);
    }).then(function () {
      return $state.go('home');
    });
  };

  $scope.storage = $localStorage;
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
  GameFactory.getDecksByTeamId = function (teamId) {

    return $http.get('http://localhost:1337/api/decks/' + teamId).the(function (res) {
      return res.data;
    });
  };

  GameFactory.getCardsByCreator = function (userId) {};

  GameFactory.getUsersByGameId = function (gameId) {
    return $http.get('http://localhost:1337/api/games/' + gameId + '/users');
  };

  GameFactory.getGamesByUserId = function (userId) {
    return $http.get('http://localhost:1337/api/games/?userId=' + userId).then(function (res) {
      return res.data;
    });
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

app.factory('UserFactory', function ($http, $localStorage, $timeout, $state) {

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
        _this.setLocalStorage(res.data.user[0], res.data.team[0]);
      });
    },

    getSlackInfo: function getSlackInfo() {
      return $http.get('https://slack.com/api/users.identity');
    },

    setLocalStorage: function setLocalStorage(user, team) {
      $localStorage.user = user;
      $localStorage.team = team;
    },

    logOut: function logOut() {
      $localStorage.$reset();
    }
  };
});
//Directive File
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImRlY2tzL2RlY2tzLmpzIiwiZnJvbSBmc2cvZnJvbS1mc2cuanMiLCJnYW1lL2dhbWUuanMiLCJob21lL2hvbWUuanMiLCJsb2dpbi9sb2dpbi5qcyIsImNvbW1vbi9mYWN0b3JpZXMvR2FtZUZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yaWVzL2xvZ2luRmFjdG9yeS5qcyIsImNvbW1vbi9mYWN0b3JpZXMvdXNlckZhY3RvcnkuanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiXSwibmFtZXMiOlsid2luZG93IiwiYXBwIiwiYW5ndWxhciIsIm1vZHVsZSIsInJ1biIsIiRpb25pY1BsYXRmb3JtIiwicmVhZHkiLCJjb3Jkb3ZhIiwicGx1Z2lucyIsIktleWJvYXJkIiwiaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyIiwiZGlzYWJsZVNjcm9sbCIsIlN0YXR1c0JhciIsInN0eWxlRGVmYXVsdCIsImNvbnRyb2xsZXIiLCIkc2NvcGUiLCJVc2VyRmFjdG9yeSIsIiRzdGF0ZSIsIiRsb2NhbFN0b3JhZ2UiLCIkdGltZW91dCIsImxvZ091dCIsImdvIiwiY29uZmlnIiwiJHN0YXRlUHJvdmlkZXIiLCJzdGF0ZSIsInVybCIsInRlbXBsYXRlVXJsIiwicmVzb2x2ZSIsImRlY2tzIiwiR2FtZUZhY3RvcnkiLCIkc3RhdGVQYXJhbXMiLCJnZXREZWNrc0J5VGVhbUlkIiwic3RhdGVQYXJhbXMiLCJ0ZWFtSWQiLCJ0ZWFtR2FtZXMiLCJnZXRHYW1lc0J5VGVhbUlkIiwic3RhcnROZXdHYW1lIiwiJG9uIiwiZXZlbnQiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsImdhbWUiLCIkZGlnZXN0IiwiZ2FtZXMiLCIkY29yZG92YU9hdXRoIiwic3RvcmFnZSIsImdldEdhbWVzQnlVc2VySWQiLCJ0aGVuIiwidXNlckdhbWVzIiwiZ3JlZXRpbmciLCJMb2dpbkZhY3RvcnkiLCJsb2dpbldpdGhTbGFjayIsImdldFNsYWNrQ3JlZHMiLCJzbGFjayIsImNyZWRzIiwiY2xpZW50SUQiLCJjbGllbnRTZWNyZXQiLCJzZXRVc2VyIiwiaW5mbyIsImZhY3RvcnkiLCIkaHR0cCIsIiRyb290U2NvcGUiLCJpbml0aWFsaXplRmlyZWJhc2UiLCJhcGlLZXkiLCJhdXRoRG9tYWluIiwiZGF0YWJhc2VVUkwiLCJzdG9yYWdlQnVja2V0IiwibWVzc2FnaW5nU2VuZGVySWQiLCJmaXJlYmFzZSIsImluaXRpYWxpemVBcHAiLCJhZGRVc2VyIiwiZ2FtZU5hbWUiLCJ0ZWFtTmFtZSIsInBvc3QiLCJuYW1lIiwiY3JlYXRvcklkIiwicmVzIiwicmVmZiIsImRhdGFiYXNlIiwicmVmIiwiZ2FtZUlkIiwib24iLCJzbmFwc2hvdCIsInZhbCIsIiRicm9hZGNhc3QiLCJqb2luR2FtZUJ5SWQiLCJwbGF5ZXJJZCIsImNyZWF0ZUdhbWVCeUlkRmlyZUJhc2UiLCJmaXJlYmFzZWdhbWVJZCIsIm5ld1JlZiIsInB1c2giLCJzZXQiLCJyZXEiLCJxdWVyeSIsImdldCIsInRoZSIsImdldENhcmRzQnlDcmVhdG9yIiwidXNlcklkIiwiZ2V0VXNlcnNCeUdhbWVJZCIsImdhbWVzUmVmIiwib25jZSIsIm1ldGhvZCIsImhlYWRlcnMiLCJzZXRMb2NhbFN0b3JhZ2UiLCJ1c2VyIiwidGVhbSIsImdldFNsYWNrSW5mbyIsIiRyZXNldCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQUEsT0FBQUMsR0FBQSxHQUFBQyxRQUFBQyxNQUFBLENBQUEsc0JBQUEsRUFBQSxDQUFBLE9BQUEsRUFBQSxXQUFBLEVBQUEsV0FBQSxFQUFBLGdCQUFBLEVBQUEsV0FBQSxDQUFBLENBQUE7O0FBRUFGLElBQUFHLEdBQUEsQ0FBQSxVQUFBQyxjQUFBLEVBQUE7QUFDQUEsaUJBQUFDLEtBQUEsQ0FBQSxZQUFBO0FBQ0EsUUFBQU4sT0FBQU8sT0FBQSxJQUFBUCxPQUFBTyxPQUFBLENBQUFDLE9BQUEsQ0FBQUMsUUFBQSxFQUFBO0FBQ0E7QUFDQTtBQUNBRixj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SEE7QUFNQWhFLGNBQUFvQjtBQU5BLE9BQUEsRUFRQVgsSUFSQSxDQVFBLGVBQUE7QUFDQSxjQUFBd0QsZUFBQSxDQUFBM0IsSUFBQXRDLElBQUEsQ0FBQWtFLElBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQTVCLElBQUF0QyxJQUFBLENBQUFtRSxJQUFBLENBQUEsQ0FBQSxDQUFBO0FBQ0EsT0FWQSxDQUFBO0FBV0EsS0FiQTs7QUFlQUMsa0JBQUEsd0JBQUE7QUFDQSxhQUFBOUMsTUFBQWtDLEdBQUEsQ0FBQSxzQ0FBQSxDQUFBO0FBQ0EsS0FqQkE7O0FBbUJBUyxxQkFBQSx5QkFBQUMsSUFBQSxFQUFBQyxJQUFBLEVBQUE7QUFDQXhGLG9CQUFBdUYsSUFBQSxHQUFBQSxJQUFBO0FBQ0F2RixvQkFBQXdGLElBQUEsR0FBQUEsSUFBQTtBQUNBLEtBdEJBOztBQXdCQXRGLFlBQUEsa0JBQUE7QUFDQUYsb0JBQUEwRixNQUFBO0FBQ0E7QUExQkEsR0FBQTtBQTRCQSxDQTlCQTtBQ0FBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJb25pYyBTdGFydGVyIEFwcFxuXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xuLy8gJ3N0YXJ0ZXInIGlzIHRoZSBuYW1lIG9mIHRoaXMgYW5ndWxhciBtb2R1bGUgZXhhbXBsZSAoYWxzbyBzZXQgaW4gYSA8Ym9keT4gYXR0cmlidXRlIGluIGluZGV4Lmh0bWwpXG4vLyB0aGUgMm5kIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiAncmVxdWlyZXMnXG53aW5kb3cuYXBwID0gYW5ndWxhci5tb2R1bGUoJ0JsYW5rQWdhaW5zdEh1bWFuaXR5JywgWydpb25pYycsICd1aS5yb3V0ZXInLCduZ0NvcmRvdmEnLCduZ0NvcmRvdmFPYXV0aCcsICduZ1N0b3JhZ2UnXSlcblxuYXBwLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxuICAgICAgICAgICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcblxuICAgICAgICAgICAgLy8gRG9uJ3QgcmVtb3ZlIHRoaXMgbGluZSB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nLiBJdCBzdG9wcyB0aGUgdmlld3BvcnRcbiAgICAgICAgICAgIC8vIGZyb20gc25hcHBpbmcgd2hlbiB0ZXh0IGlucHV0cyBhcmUgZm9jdXNlZC4gSW9uaWMgaGFuZGxlcyB0aGlzIGludGVybmFsbHkgZm9yXG4gICAgICAgICAgICAvLyBhIG11Y2ggbmljZXIga2V5Ym9hcmQgZXhwZXJpZW5jZS5cbiAgICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5kaXNhYmxlU2Nyb2xsKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICAgICAgICBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSlcbiIsImFwcC5jb250cm9sbGVyKCdMb2dvdXRDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBVc2VyRmFjdG9yeSwgJHN0YXRlLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCl7XG5cdCRzY29wZS5sb2dPdXQgPSBmdW5jdGlvbigpe1xuXHRcdFVzZXJGYWN0b3J5LmxvZ091dCgpXG5cdFx0JHN0YXRlLmdvKCdsb2dpbicpXG5cdH1cbn0pIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIpID0+IHtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2RlY2tzJywge1xuXHRcdHVybDogJ2RlY2tzLzp0ZWFtaWQnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvZGVja3MvZGVja3MuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0RlY2tDdHJsJyxcblx0XHRyZXNvbHZlOiB7XG5cdFx0XHRkZWNrczogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoc3RhdGVQYXJhbXMudGVhbUlkKVxuXHRcdH1cblx0fSlcblxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0RlY2tDdHJsJywgKCRzY29wZSkgPT4ge1xuXG5cblx0XG59KSIsIi8vIChmdW5jdGlvbiAoKSB7XG5cbi8vICAgICAndXNlIHN0cmljdCc7XG5cbi8vICAgICAvLyBIb3BlIHlvdSBkaWRuJ3QgZm9yZ2V0IEFuZ3VsYXIhIER1aC1kb3kuXG4vLyAgICAgaWYgKCF3aW5kb3cuYW5ndWxhcikgdGhyb3cgbmV3IEVycm9yKCdJIGNhblxcJ3QgZmluZCBBbmd1bGFyIScpO1xuXG4vLyAgICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdmc2FQcmVCdWlsdCcsIFtdKTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdTb2NrZXQnLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgIGlmICghd2luZG93LmlvKSB0aHJvdyBuZXcgRXJyb3IoJ3NvY2tldC5pbyBub3QgZm91bmQhJyk7XG4vLyAgICAgICAgIHJldHVybiB3aW5kb3cuaW8od2luZG93LmxvY2F0aW9uLm9yaWdpbik7XG4vLyAgICAgfSk7XG5cbi8vICAgICAvLyBBVVRIX0VWRU5UUyBpcyB1c2VkIHRocm91Z2hvdXQgb3VyIGFwcCB0b1xuLy8gICAgIC8vIGJyb2FkY2FzdCBhbmQgbGlzdGVuIGZyb20gYW5kIHRvIHRoZSAkcm9vdFNjb3BlXG4vLyAgICAgLy8gZm9yIGltcG9ydGFudCBldmVudHMgYWJvdXQgYXV0aGVudGljYXRpb24gZmxvdy5cbi8vICAgICBhcHAuY29uc3RhbnQoJ0FVVEhfRVZFTlRTJywge1xuLy8gICAgICAgICBsb2dpblN1Y2Nlc3M6ICdhdXRoLWxvZ2luLXN1Y2Nlc3MnLFxuLy8gICAgICAgICBsb2dpbkZhaWxlZDogJ2F1dGgtbG9naW4tZmFpbGVkJyxcbi8vICAgICAgICAgbG9nb3V0U3VjY2VzczogJ2F1dGgtbG9nb3V0LXN1Y2Nlc3MnLFxuLy8gICAgICAgICBzZXNzaW9uVGltZW91dDogJ2F1dGgtc2Vzc2lvbi10aW1lb3V0Jyxcbi8vICAgICAgICAgbm90QXV0aGVudGljYXRlZDogJ2F1dGgtbm90LWF1dGhlbnRpY2F0ZWQnLFxuLy8gICAgICAgICBub3RBdXRob3JpemVkOiAnYXV0aC1ub3QtYXV0aG9yaXplZCdcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdBdXRoSW50ZXJjZXB0b3InLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHEsIEFVVEhfRVZFTlRTKSB7XG4vLyAgICAgICAgIHZhciBzdGF0dXNEaWN0ID0ge1xuLy8gICAgICAgICAgICAgNDAxOiBBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLFxuLy8gICAgICAgICAgICAgNDAzOiBBVVRIX0VWRU5UUy5ub3RBdXRob3JpemVkLFxuLy8gICAgICAgICAgICAgNDE5OiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCxcbi8vICAgICAgICAgICAgIDQ0MDogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXRcbi8vICAgICAgICAgfTtcbi8vICAgICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgICAgIHJlc3BvbnNlRXJyb3I6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChzdGF0dXNEaWN0W3Jlc3BvbnNlLnN0YXR1c10sIHJlc3BvbnNlKTtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlc3BvbnNlKVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9O1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLmNvbmZpZyhmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xuLy8gICAgICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKFtcbi8vICAgICAgICAgICAgICckaW5qZWN0b3InLFxuLy8gICAgICAgICAgICAgZnVuY3Rpb24gKCRpbmplY3Rvcikge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkaW5qZWN0b3IuZ2V0KCdBdXRoSW50ZXJjZXB0b3InKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgXSk7XG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuc2VydmljZSgnQXV0aFNlcnZpY2UnLCBmdW5jdGlvbiAoJGh0dHAsIFNlc3Npb24sICRyb290U2NvcGUsIEFVVEhfRVZFTlRTLCAkcSkge1xuXG4vLyAgICAgICAgIGZ1bmN0aW9uIG9uU3VjY2Vzc2Z1bExvZ2luKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICB2YXIgdXNlciA9IHJlc3BvbnNlLmRhdGEudXNlcjtcbi8vICAgICAgICAgICAgIFNlc3Npb24uY3JlYXRlKHVzZXIpO1xuLy8gICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ2luU3VjY2Vzcyk7XG4vLyAgICAgICAgICAgICByZXR1cm4gdXNlcjtcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIC8vIFVzZXMgdGhlIHNlc3Npb24gZmFjdG9yeSB0byBzZWUgaWYgYW5cbi8vICAgICAgICAgLy8gYXV0aGVudGljYXRlZCB1c2VyIGlzIGN1cnJlbnRseSByZWdpc3RlcmVkLlxuLy8gICAgICAgICB0aGlzLmlzQXV0aGVudGljYXRlZCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAhIVNlc3Npb24udXNlcjtcbi8vICAgICAgICAgfTtcblxuICAgICAgICBcbi8vICAgICAgICAgdGhpcy5pc0FkbWluID0gZnVuY3Rpb24odXNlcklkKXtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdydW5uaW5nIGFkbWluIGZ1bmMnKVxuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKVxuLy8gICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YS51c2VyLmlzQWRtaW4pXG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICB0aGlzLmdldExvZ2dlZEluVXNlciA9IGZ1bmN0aW9uIChmcm9tU2VydmVyKSB7XG5cbi8vICAgICAgICAgICAgIC8vIElmIGFuIGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbiBleGlzdHMsIHdlXG4vLyAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIHVzZXIgYXR0YWNoZWQgdG8gdGhhdCBzZXNzaW9uXG4vLyAgICAgICAgICAgICAvLyB3aXRoIGEgcHJvbWlzZS4gVGhpcyBlbnN1cmVzIHRoYXQgd2UgY2FuXG4vLyAgICAgICAgICAgICAvLyBhbHdheXMgaW50ZXJmYWNlIHdpdGggdGhpcyBtZXRob2QgYXN5bmNocm9ub3VzbHkuXG5cbi8vICAgICAgICAgICAgIC8vIE9wdGlvbmFsbHksIGlmIHRydWUgaXMgZ2l2ZW4gYXMgdGhlIGZyb21TZXJ2ZXIgcGFyYW1ldGVyLFxuLy8gICAgICAgICAgICAgLy8gdGhlbiB0aGlzIGNhY2hlZCB2YWx1ZSB3aWxsIG5vdCBiZSB1c2VkLlxuXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSAmJiBmcm9tU2VydmVyICE9PSB0cnVlKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLndoZW4oU2Vzc2lvbi51c2VyKTtcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgLy8gTWFrZSByZXF1ZXN0IEdFVCAvc2Vzc2lvbi5cbi8vICAgICAgICAgICAgIC8vIElmIGl0IHJldHVybnMgYSB1c2VyLCBjYWxsIG9uU3VjY2Vzc2Z1bExvZ2luIHdpdGggdGhlIHJlc3BvbnNlLlxuLy8gICAgICAgICAgICAgLy8gSWYgaXQgcmV0dXJucyBhIDQwMSByZXNwb25zZSwgd2UgY2F0Y2ggaXQgYW5kIGluc3RlYWQgcmVzb2x2ZSB0byBudWxsLlxuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKS50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKS5jYXRjaChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4vLyAgICAgICAgICAgICB9KTtcblxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbiAoY3JlZGVudGlhbHMpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvbG9naW4nLCBjcmVkZW50aWFscylcbi8vICAgICAgICAgICAgICAgICAudGhlbihvblN1Y2Nlc3NmdWxMb2dpbilcbi8vICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHsgbWVzc2FnZTogJ0ludmFsaWQgbG9naW4gY3JlZGVudGlhbHMuJ30pO1xuLy8gICAgICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMuc2lnbnVwID0gZnVuY3Rpb24oY3JlZGVudGlhbHMpe1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbi8vICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbi8vICAgICAgICAgICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbi8vICAgICAgICAgICAgICAgICBkYXRhOiBjcmVkZW50aWFsc1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQuZGF0YSlcbi8vICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbigpe1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3Qoe21lc3NhZ2U6ICdUaGF0IGVtYWlsIGlzIGFscmVhZHkgYmVpbmcgdXNlZC4nfSk7XG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL2xvZ291dCcpLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgIFNlc3Npb24uZGVzdHJveSgpO1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dvdXRTdWNjZXNzKTtcbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuc2VydmljZSgnU2Vzc2lvbicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUykge1xuXG4vLyAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuLy8gICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICBzZWxmLmRlc3Ryb3koKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuXG4vLyAgICAgICAgIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24gKHVzZXIpIHtcbi8vICAgICAgICAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcbi8vICAgICAgICAgfTtcblxuLy8gICAgIH0pO1xuXG4vLyB9KCkpO1xuIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIpID0+IHtcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnL2dhbWUvOnRlYW1JZCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvZ2FtZS9nYW1lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnR2FtZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICB0ZWFtR2FtZXM6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VGVhbUlkKCRzdGF0ZVBhcmFtcy50ZWFtSWQpIC8vc3RhdGVQYXJhbXMudGVhbUlkXG4gICAgICAgIH1cbiAgICB9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0dhbWVDdHJsJywgKCRzY29wZSwgR2FtZUZhY3RvcnksIHRlYW1HYW1lcykgPT4ge1xuICAgICRzY29wZS5zdGFydE5ld0dhbWUgPSBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWU7XG4gICAgJHNjb3BlLiRvbignY2hhbmdlZEdhbWUnLCAoZXZlbnQsIGRhdGEpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlY2VpdmVkIGV2ZW50JylcbiAgICAgICAgY29uc29sZS5sb2coJ2RhdGEgb2JqOicsIGRhdGEpXG4gICAgICAgICRzY29wZS5nYW1lID0gZGF0YTtcbiAgICAgICAgJHNjb3BlLiRkaWdlc3QoKVxuXG4gICAgfSlcbiAgICAkc2NvcGUuZ2FtZXMgPSB0ZWFtR2FtZXM7XG4gICAgY29uc29sZS5sb2coJ3RlYW1nYW1lcyAnLCB0ZWFtR2FtZXMpXG59KVxuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcil7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lJywge1xuXHRcdHVybDogJy9ob21lJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2hvbWUvaG9tZS5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnSG9tZUN0cmwnLFxuXHR9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUsICRjb3Jkb3ZhT2F1dGgsIFVzZXJGYWN0b3J5LCBHYW1lRmFjdG9yeSwgJGxvY2FsU3RvcmFnZSl7XG5cdCRzY29wZS5zdG9yYWdlID0gJGxvY2FsU3RvcmFnZVxuXHRcblx0R2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVVzZXJJZCgyKVxuXHRcdC50aGVuKHVzZXJHYW1lcyA9PiB7ICRzY29wZS51c2VyR2FtZXMgPSB1c2VyR2FtZXMgfSlcblxuXHQkc2NvcGUuZ3JlZXRpbmcgPSBcImhlbGxvXCI7XG59KVxuXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKXtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2xvZ2luJywge1xuXHRcdHVybDogJy9sb2dpbicsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9sb2dpbi9sb2dpbi5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnTG9naW5DdHJsJ1xuXHR9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCBMb2dpbkZhY3RvcnksIFVzZXJGYWN0b3J5LCAkY29yZG92YU9hdXRoLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCl7XG4gXHQkc2NvcGUubG9naW5XaXRoU2xhY2sgPSBmdW5jdGlvbigpe1xuIFx0XHRyZXR1cm4gTG9naW5GYWN0b3J5LmdldFNsYWNrQ3JlZHMoKVxuIFx0XHQudGhlbihjcmVkcyA9PntcbiBcdFx0XHRyZXR1cm4gJGNvcmRvdmFPYXV0aC5zbGFjayhjcmVkcy5jbGllbnRJRCwgY3JlZHMuY2xpZW50U2VjcmV0LCBbJ2lkZW50aXR5LmJhc2ljJywgJ2lkZW50aXR5LnRlYW0nLCAnaWRlbnRpdHkuYXZhdGFyJ10pXG4gXHRcdH0pXG4gXHRcdC50aGVuKGluZm8gPT4gVXNlckZhY3Rvcnkuc2V0VXNlcihpbmZvKSlcbiBcdFx0LnRoZW4oKCkgPT4gJHN0YXRlLmdvKCdob21lJykpXG4gXHR9XG5cbiBcdCRzY29wZS5zdG9yYWdlID0gJGxvY2FsU3RvcmFnZVxufSkiLCJhcHAuZmFjdG9yeSgnR2FtZUZhY3RvcnknLCAoJGh0dHAsICRyb290U2NvcGUpID0+IHtcbiAgICBjb25zdCBHYW1lRmFjdG9yeSA9IHt9O1xuXG4gICAgY29uc3QgaW5pdGlhbGl6ZUZpcmViYXNlID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgICAgICBhcGlLZXk6IFwiQUl6YVN5RC10RGV2WHZpcHl1RTVsemhlV0FScTRodXUxVW1xb0prXCIsXG4gICAgICAgICAgICBhdXRoRG9tYWluOiBcImNhcHN0b25lLWZiMGU4LmZpcmViYXNlYXBwLmNvbVwiLFxuICAgICAgICAgICAgZGF0YWJhc2VVUkw6IFwiaHR0cHM6Ly9jYXBzdG9uZS1mYjBlOC5maXJlYmFzZWlvLmNvbVwiLFxuICAgICAgICAgICAgc3RvcmFnZUJ1Y2tldDogXCJjYXBzdG9uZS1mYjBlOC5hcHBzcG90LmNvbVwiLFxuICAgICAgICAgICAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiODQ5ODM5NjgwMTA3XCJcbiAgICAgICAgfTtcbiAgICAgICAgZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChjb25maWcpO1xuICAgIH07XG4gICAgaW5pdGlhbGl6ZUZpcmViYXNlKCk7XG5cblxuICAgIEdhbWVGYWN0b3J5LmFkZFVzZXIgPSAoKSA9PiB7XG5cbiAgICB9O1xuXG4gICAgR2FtZUZhY3Rvcnkuc3RhcnROZXdHYW1lID0gKGdhbWVOYW1lLCB0ZWFtTmFtZSkgPT4ge1xuICAgICAgICAvL3JldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJykudGhlbih1c2VySWQgPT4ge1xuICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9nYW1lcycsIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBnYW1lTmFtZSB8fCAnQm9yaW5nIE5hbWUnLFxuICAgICAgICAgICAgICAgIHRlYW1JZDogdGVhbUlkIHx8IDIsXG4gICAgICAgICAgICAgICAgY3JlYXRvcklkOiAyXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICAgICAgLnRoZW4oZ2FtZUlkID0+IHtcbiAgICAgICAgICAgICAgICAvL2NvbnN0IHJlZmYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgL2dhbWVzL2ApXG4gICAgICAgICAgICAgICAgY29uc3QgcmVmZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGAvZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICAgICAgICByZWZmLm9uKCd2YWx1ZScsIHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc25hcHNob3QudmFsKCkpXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnY2hhbmdlZEdhbWUnLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvL3NldCB1cCB3YXRjaGVyXG4gICAgfTtcblxuXG4gICAgR2FtZUZhY3Rvcnkuam9pbkdhbWVCeUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnam9pbmluZyBnYW1lJylcbiAgICAgICAgICAgIC8vdmFyIHBsYXllcnNUZWFtID0gXG4gICAgICAgIHZhciBnYW1lSWQgPSA4O1xuICAgICAgICB2YXIgcGxheWVySWQgPSAyOyAvL2V2ZW50dWFsbHkgbWFrZSBpdCBnZXQgY3VycmVudCBcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYGh0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZ2FtZXMvJHtnYW1lSWR9P3BsYXllcklkPSR7cGxheWVySWR9YCwge1xuXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLy9cbiAgICBHYW1lRmFjdG9yeS5jcmVhdGVHYW1lQnlJZEZpcmVCYXNlID0gKGZpcmViYXNlZ2FtZUlkKSA9PiB7XG4gICAgICAgIC8vcmV0dXJuICRodHRwLnBvc3QoYGh0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZmlyZWJhc2UvZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgLy9uZWVkcyB0byBiZSAudGhlbmFibGVcbiAgICAgICAgY29uc3QgbmV3UmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYGdhbWVzLyR7ZmlyZWJhc2VnYW1lSWR9YCkucHVzaCgpO1xuICAgICAgICBuZXdSZWYuc2V0KHtcbiAgICAgICAgICAgIHBsYXllcklkOiByZXEucXVlcnkucGxheWVySWRcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cblxuICAgIC8vdnMgZ2V0Q2FyZHNCeVRlYW1JZFxuICAgIEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQgPSAodGVhbUlkKSA9PiB7XG5cbiAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9kZWNrcy8ke3RlYW1JZH1gKVxuICAgICAgICAgICAgLnRoZShyZXMgPT4gcmVzLmRhdGEpXG5cbiAgICB9O1xuXG4gICAgR2FtZUZhY3RvcnkuZ2V0Q2FyZHNCeUNyZWF0b3IgPSAodXNlcklkKSA9PiB7XG5cbiAgICB9XG5cbiAgICBHYW1lRmFjdG9yeS5nZXRVc2Vyc0J5R2FtZUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2dhbWVzLyR7Z2FtZUlkfS91c2Vyc2ApO1xuICAgIH07XG5cblxuICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlVc2VySWQgPSAodXNlcklkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2dhbWVzLz91c2VySWQ9JHt1c2VySWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgIH1cbiAgICAgICAgLy8gLnRoZW4oY3JlYXRlZEdhbWUgPT5cbiAgICAgICAgLy8gICAgIC8vYWRkd2F0Y2hlciB0byBnYW1lIGlkIGluIGZpcmViYXNlKVxuICAgICAgICAvLyAgICAgcmV0dXJuIGNyZWF0ZWRHYW1lXG4gICAgICAgIC8vIH07XG5cblxuXG4gICAgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCA9ICh0ZWFtSWQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RoZSB0ZWFtIGlzIGlkJywgdGVhbUlkKVxuXG4gICAgICAgIGNvbnN0IGdhbWVzUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lc2ApXG4gICAgICAgIHJldHVybiBnYW1lc1JlZi5vbmNlKCd2YWx1ZScpLnRoZW4oc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGUgdmFsIGlzJywgc25hcHNob3QudmFsKCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNuYXBzaG90LnZhbCgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZ2FtZXM/dGVhbUlkPSR7dGVhbUlkfWApXG4gICAgICAgICAgICAvLyAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICAgICAgLy8udGhlbihmb3VuZEdhbWVzID0+IClcbiAgICB9O1xuXG5cbiAgICAvL2dldCBhbGwgZ2FtZXMgYnkgdGVhbSByb3V0ZVxuXG4gICAgcmV0dXJuIEdhbWVGYWN0b3J5O1xufSk7XG5cblxuXG4vLyBpbXBsZW1lbnQgam9pbmluZyBhIGdhbWUgdXNpbmcgLyBzZXNzaW9uICRodHRwIHJlcXVlc3QgaW4gYW4gYW5ndWxhciBmYWN0b3J5IGNhbGxlZCBHYW1lRmFjdG9yeSB0aGF0IGhpdHMgdGhlIHJvdXRlIC8gYXBpIC8gZ2FtZXMgLyDigKYuLmZ1bmN0aW9uIGpvaW5HYW1lQnlJZChnYW1lSWQpIHtcbi8vICAgICBjb25zdCB1c2VyID0gZ2V0TG9nZ2VkSW5Vc2VyKCkgLy9hc3N1bWVzLCBjb3VsZCBsYXRlciBiZSBvcHRpb25hbCBpbiBhZG1pbiBwYW5lbFxuLy8gICAgIGdldExPZ2dlZEluVVNlcigpLnRoZW4obG9nZ2VkVVNlciA9PiB7XG4vLyAgICAgICAgIGRvbuKAmSB0IG5lZWQgZ2FtZS5maW5kYnkgaWQsIGNhbiBqdXN0IGRvIGZiIHBhcnQgb2YgZ2FtZXJzIGluZGVwZW5kZW50bHkgLy9HYW1lLmZpbmRCeUlkKGdhbWVJZCApLnRoZW4oZm91bmRHYW1lID0+IGxldCBnYW1lUmVmID0gZmIuZGIucmVmKOKAmC8gICAgICAgICBnYW1lc+KAmStmb3VuZEdhbWUuaWQpKVxuLy8gICAgIH0pXG4vLyB9XG4vLyBzaWduIGluIGJ1dHRvblxuIiwiYXBwLmZhY3RvcnkoJ0xvZ2luRmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwKXtcblx0cmV0dXJuIHtcblx0XHRnZXRTbGFja0NyZWRzOiBmdW5jdGlvbigpe1xuXHRcdFx0cmV0dXJuICRodHRwLmdldCgnaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9zbGFjaycpXHRcblx0XHRcdFx0LnRoZW4ocmVzID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gcmVzLmRhdGFcblx0XHRcdFx0fSlcblx0XHR9XG5cdH1cbn0pXG4iLCJhcHAuZmFjdG9yeSgnVXNlckZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCwgJGxvY2FsU3RvcmFnZSwgJHRpbWVvdXQsICRzdGF0ZSl7XG5cdFxuXHRyZXR1cm4ge1xuXHRcdHNldFVzZXI6IGZ1bmN0aW9uKGluZm8pe1xuXHRcdFx0cmV0dXJuICRodHRwKHtcblx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRcdHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvdXNlcnMnLFxuXHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRkYXRhOiBpbmZvXG5cdFx0XHR9KVxuXHRcdFx0LnRoZW4ocmVzID0+IHtcblx0XHRcdFx0dGhpcy5zZXRMb2NhbFN0b3JhZ2UocmVzLmRhdGEudXNlclswXSwgcmVzLmRhdGEudGVhbVswXSk7XG5cdFx0XHR9KVxuXHRcdH0sXG5cblx0XHRnZXRTbGFja0luZm86IGZ1bmN0aW9uKCl7XG5cdFx0XHRyZXR1cm4gJGh0dHAuZ2V0KCdodHRwczovL3NsYWNrLmNvbS9hcGkvdXNlcnMuaWRlbnRpdHknKVxuXHRcdH0sXG5cblx0XHRzZXRMb2NhbFN0b3JhZ2U6IGZ1bmN0aW9uKHVzZXIsIHRlYW0pe1xuXHRcdFx0JGxvY2FsU3RvcmFnZS51c2VyID0gdXNlcjtcblx0XHRcdCRsb2NhbFN0b3JhZ2UudGVhbSA9IHRlYW07XG5cdFx0fSxcblxuXHRcdGxvZ091dDogZnVuY3Rpb24oKXtcblx0XHRcdCRsb2NhbFN0b3JhZ2UuJHJlc2V0KCk7XG5cdFx0fVxuXHR9XG59KSIsIi8vRGlyZWN0aXZlIEZpbGUiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
