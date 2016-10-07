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
      StatusBar.styleLightContent();
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
  $stateProvider.state('cards', {
    url: '/cards',
    templateUrl: 'js/cards-test/cards-test.html',
    controller: 'CardsTestCtrl'
  });
});

app.controller('CardsTestCtrl', function ($scope) {
  $scope.greeting = "HI";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImNhcmRzLXRlc3QvY2FyZHNUZXN0LmpzIiwiZnJvbSBmc2cvZnJvbS1mc2cuanMiLCJkZWNrcy9kZWNrcy5qcyIsImdhbWUvZ2FtZS5qcyIsImhvbWUvaG9tZS5qcyIsImxvZ2luL2xvZ2luLmpzIiwiY29tbW9uL2RpcmVjdGl2ZXMvZGlyZWN0aXZlLmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9HYW1lRmFjdG9yeS5qcyIsImNvbW1vbi9mYWN0b3JpZXMvbG9naW5GYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy91c2VyRmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJhcHAiLCJhbmd1bGFyIiwibW9kdWxlIiwicnVuIiwiJGlvbmljUGxhdGZvcm0iLCJyZWFkeSIsImNvcmRvdmEiLCJwbHVnaW5zIiwiS2V5Ym9hcmQiLCJoaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIiLCJkaXNhYmxlU2Nyb2xsIiwiU3RhdHVzQmFyIiwic3R5bGVMaWdodENvbnRlbnQiLCJjb250cm9sbGVyIiwiJHNjb3BlIiwiVXNlckZhY3RvcnkiLCIkc3RhdGUiLCIkbG9jYWxTdG9yYWdlIiwiJHRpbWVvdXQiLCJsb2dPdXQiLCJnbyIsImNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwic3RhdGUiLCJ1cmwiLCJ0ZW1wbGF0ZVVybCIsImdyZWV0aW5nIiwicmVzb2x2ZSIsImRlY2tzIiwiR2FtZUZhY3RvcnkiLCIkc3RhdGVQYXJhbXMiLCJnZXREZWNrc0J5VGVhbUlkIiwic3RhdGVQYXJhbXMiLCJ0ZWFtSWQiLCJ0ZWFtR2FtZXMiLCJnZXRHYW1lc0J5VGVhbUlkIiwic3RhcnROZXdHYW1lIiwiJG9uIiwiZXZlbnQiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsImdhbWUiLCIkZGlnZXN0IiwiZ2FtZXMiLCIkY29yZG92YU9hdXRoIiwic3RvcmFnZSIsImdldEdhbWVzQnlVc2VySWQiLCJ0aGVuIiwidXNlckdhbWVzIiwiTG9naW5GYWN0b3J5IiwibG9naW5XaXRoU2xhY2siLCJnZXRTbGFja0NyZWRzIiwic2xhY2siLCJjcmVkcyIsImNsaWVudElEIiwiY2xpZW50U2VjcmV0Iiwic2V0VXNlciIsImluZm8iLCJmYWN0b3J5IiwiJGh0dHAiLCIkcm9vdFNjb3BlIiwiaW5pdGlhbGl6ZUZpcmViYXNlIiwiYXBpS2V5IiwiYXV0aERvbWFpbiIsImRhdGFiYXNlVVJMIiwic3RvcmFnZUJ1Y2tldCIsIm1lc3NhZ2luZ1NlbmRlcklkIiwiZmlyZWJhc2UiLCJpbml0aWFsaXplQXBwIiwiYWRkVXNlciIsImdhbWVOYW1lIiwidGVhbU5hbWUiLCJwb3N0IiwibmFtZSIsImNyZWF0b3JJZCIsInJlcyIsInJlZmYiLCJkYXRhYmFzZSIsInJlZiIsImdhbWVJZCIsIm9uIiwic25hcHNob3QiLCJ2YWwiLCIkYnJvYWRjYXN0Iiwiam9pbkdhbWVCeUlkIiwicGxheWVySWQiLCJjcmVhdGVHYW1lQnlJZEZpcmVCYXNlIiwiZmlyZWJhc2VnYW1lSWQiLCJuZXdSZWYiLCJwdXNoIiwic2V0IiwicmVxIiwicXVlcnkiLCJnZXQiLCJ0aGUiLCJnZXRDYXJkc0J5Q3JlYXRvciIsInVzZXJJZCIsImdldFVzZXJzQnlHYW1lSWQiLCJnYW1lc1JlZiIsIm9uY2UiLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0TG9jYWxTdG9yYWdlIiwidXNlciIsInRlYW0iLCJnZXRTbGFja0luZm8iLCIkcmVzZXQiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0FBLE9BQUFDLEdBQUEsR0FBQUMsUUFBQUMsTUFBQSxDQUFBLHNCQUFBLEVBQUEsQ0FBQSxPQUFBLEVBQUEsV0FBQSxFQUFBLFdBQUEsRUFBQSxnQkFBQSxFQUFBLFdBQUEsQ0FBQSxDQUFBOztBQUVBRixJQUFBRyxHQUFBLENBQUEsVUFBQUMsY0FBQSxFQUFBO0FBQ0FBLGlCQUFBQyxLQUFBLENBQUEsWUFBQTtBQUNBLFFBQUFOLE9BQUFPLE9BQUEsSUFBQVAsT0FBQU8sT0FBQSxDQUFBQyxPQUFBLENB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QyxJQUFBO0FBQ0EsT0FIQSxDQUFBO0FBSUE7QUFOQSxHQUFBO0FBUUEsQ0FUQTs7QUNBQXZDLElBQUEyRCxPQUFBLENBQUEsYUFBQSxFQUFBLFVBQUFDLEtBQUEsRUFBQTNDLGFBQUEsRUFBQUMsUUFBQSxFQUFBRixNQUFBLEVBQUE7O0FBRUEsU0FBQTtBQUNBeUMsYUFBQSxpQkFBQUMsSUFBQSxFQUFBO0FBQUE7O0FBQ0EsYUFBQUUsTUFBQTtBQUNBeUMsZ0JBQUEsTUFEQTtBQUVBN0UsYUFBQSxpQ0FGQTtBQUdBOEUsaUJBQUE7QUFDQSwwQkFBQTtBQURBLFNBSEE7QUFNQS9ELGNBQUFtQjtBQU5BLE9BQUEsRUFRQVYsSUFSQSxDQVFBLGVBQUE7QUFDQSxjQUFBdUQsZUFBQSxDQUFBM0IsSUFBQXJDLElBQUEsQ0FBQWlFLElBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQTVCLElBQUFyQyxJQUFBLENBQUFrRSxJQUFBLENBQUEsQ0FBQSxDQUFBO0FBQ0EsT0FWQSxDQUFBO0FBV0EsS0FiQTs7QUFlQUMsa0JBQUEsd0JBQUE7QUFDQSxhQUFBOUMsTUFBQWtDLEdBQUEsQ0FBQSxzQ0FBQSxDQUFBO0FBQ0EsS0FqQkE7O0FBbUJBUyxxQkFBQSx5QkFBQUMsSUFBQSxFQUFBQyxJQUFBLEVBQUE7QUFDQXhGLG9CQUFBdUYsSUFBQSxHQUFBQSxJQUFBO0FBQ0F2RixvQkFBQXdGLElBQUEsR0FBQUEsSUFBQTtBQUNBLEtBdEJBOztBQXdCQXRGLFlBQUEsa0JBQUE7QUFDQUYsb0JBQUEwRixNQUFBO0FBQ0E7QUExQkEsR0FBQTtBQTRCQSxDQTlCQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW9uaWMgU3RhcnRlciBBcHBcblxuLy8gYW5ndWxhci5tb2R1bGUgaXMgYSBnbG9iYWwgcGxhY2UgZm9yIGNyZWF0aW5nLCByZWdpc3RlcmluZyBhbmQgcmV0cmlldmluZyBBbmd1bGFyIG1vZHVsZXNcbi8vICdzdGFydGVyJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xud2luZG93LmFwcCA9IGFuZ3VsYXIubW9kdWxlKCdCbGFua0FnYWluc3RIdW1hbml0eScsIFsnaW9uaWMnLCAndWkucm91dGVyJywnbmdDb3Jkb3ZhJywnbmdDb3Jkb3ZhT2F1dGgnLCAnbmdTdG9yYWdlJ10pXG5cbmFwcC5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0pIHtcbiAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgICAgICAgIC8vIEhpZGUgdGhlIGFjY2Vzc29yeSBiYXIgYnkgZGVmYXVsdCAocmVtb3ZlIHRoaXMgdG8gc2hvdyB0aGUgYWNjZXNzb3J5IGJhciBhYm92ZSB0aGUga2V5Ym9hcmRcbiAgICAgICAgICAgIC8vIGZvciBmb3JtIGlucHV0cylcbiAgICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG5cbiAgICAgICAgICAgIC8vIERvbid0IHJlbW92ZSB0aGlzIGxpbmUgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZy4gSXQgc3RvcHMgdGhlIHZpZXdwb3J0XG4gICAgICAgICAgICAvLyBmcm9tIHNuYXBwaW5nIHdoZW4gdGV4dCBpbnB1dHMgYXJlIGZvY3VzZWQuIElvbmljIGhhbmRsZXMgdGhpcyBpbnRlcm5hbGx5IGZvclxuICAgICAgICAgICAgLy8gYSBtdWNoIG5pY2VyIGtleWJvYXJkIGV4cGVyaWVuY2UuXG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2luZG93LlN0YXR1c0Jhcikge1xuICAgICAgICAgICAgU3RhdHVzQmFyLnN0eWxlTGlnaHRDb250ZW50KClcbiAgICAgICAgfVxuICAgIH0pO1xuXG59KVxuIiwiYXBwLmNvbnRyb2xsZXIoJ0xvZ291dEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIFVzZXJGYWN0b3J5LCAkc3RhdGUsICRsb2NhbFN0b3JhZ2UsICR0aW1lb3V0KXtcblx0JHNjb3BlLmxvZ091dCA9IGZ1bmN0aW9uKCl7XG5cdFx0VXNlckZhY3RvcnkubG9nT3V0KClcblx0XHQkc3RhdGUuZ28oJ2xvZ2luJylcblx0fVxufSkiLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKXtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2NhcmRzJywge1xuXHRcdHVybDogJy9jYXJkcycsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9jYXJkcy10ZXN0L2NhcmRzLXRlc3QuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0NhcmRzVGVzdEN0cmwnXG5cdH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignQ2FyZHNUZXN0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSl7XG4gXHQkc2NvcGUuZ3JlZXRpbmcgPSBcIkhJXCJcbn0pIiwiLy8gKGZ1bmN0aW9uICgpIHtcblxuLy8gICAgICd1c2Ugc3RyaWN0JztcblxuLy8gICAgIC8vIEhvcGUgeW91IGRpZG4ndCBmb3JnZXQgQW5ndWxhciEgRHVoLWRveS5cbi8vICAgICBpZiAoIXdpbmRvdy5hbmd1bGFyKSB0aHJvdyBuZXcgRXJyb3IoJ0kgY2FuXFwndCBmaW5kIEFuZ3VsYXIhJyk7XG5cbi8vICAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2ZzYVByZUJ1aWx0JywgW10pO1xuXG4vLyAgICAgYXBwLmZhY3RvcnkoJ1NvY2tldCcsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgaWYgKCF3aW5kb3cuaW8pIHRocm93IG5ldyBFcnJvcignc29ja2V0LmlvIG5vdCBmb3VuZCEnKTtcbi8vICAgICAgICAgcmV0dXJuIHdpbmRvdy5pbyh3aW5kb3cubG9jYXRpb24ub3JpZ2luKTtcbi8vICAgICB9KTtcblxuLy8gICAgIC8vIEFVVEhfRVZFTlRTIGlzIHVzZWQgdGhyb3VnaG91dCBvdXIgYXBwIHRvXG4vLyAgICAgLy8gYnJvYWRjYXN0IGFuZCBsaXN0ZW4gZnJvbSBhbmQgdG8gdGhlICRyb290U2NvcGVcbi8vICAgICAvLyBmb3IgaW1wb3J0YW50IGV2ZW50cyBhYm91dCBhdXRoZW50aWNhdGlvbiBmbG93LlxuLy8gICAgIGFwcC5jb25zdGFudCgnQVVUSF9FVkVOVFMnLCB7XG4vLyAgICAgICAgIGxvZ2luU3VjY2VzczogJ2F1dGgtbG9naW4tc3VjY2VzcycsXG4vLyAgICAgICAgIGxvZ2luRmFpbGVkOiAnYXV0aC1sb2dpbi1mYWlsZWQnLFxuLy8gICAgICAgICBsb2dvdXRTdWNjZXNzOiAnYXV0aC1sb2dvdXQtc3VjY2VzcycsXG4vLyAgICAgICAgIHNlc3Npb25UaW1lb3V0OiAnYXV0aC1zZXNzaW9uLXRpbWVvdXQnLFxuLy8gICAgICAgICBub3RBdXRoZW50aWNhdGVkOiAnYXV0aC1ub3QtYXV0aGVudGljYXRlZCcsXG4vLyAgICAgICAgIG5vdEF1dGhvcml6ZWQ6ICdhdXRoLW5vdC1hdXRob3JpemVkJ1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLmZhY3RvcnkoJ0F1dGhJbnRlcmNlcHRvcicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkcSwgQVVUSF9FVkVOVFMpIHtcbi8vICAgICAgICAgdmFyIHN0YXR1c0RpY3QgPSB7XG4vLyAgICAgICAgICAgICA0MDE6IEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsXG4vLyAgICAgICAgICAgICA0MDM6IEFVVEhfRVZFTlRTLm5vdEF1dGhvcml6ZWQsXG4vLyAgICAgICAgICAgICA0MTk6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0LFxuLy8gICAgICAgICAgICAgNDQwOiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dFxuLy8gICAgICAgICB9O1xuLy8gICAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAgICAgcmVzcG9uc2VFcnJvcjogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KHN0YXR1c0RpY3RbcmVzcG9uc2Uuc3RhdHVzXSwgcmVzcG9uc2UpO1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzcG9uc2UpXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH07XG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuY29uZmlnKGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XG4vLyAgICAgICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goW1xuLy8gICAgICAgICAgICAgJyRpbmplY3RvcicsXG4vLyAgICAgICAgICAgICBmdW5jdGlvbiAoJGluamVjdG9yKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRpbmplY3Rvci5nZXQoJ0F1dGhJbnRlcmNlcHRvcicpO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICBdKTtcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5zZXJ2aWNlKCdBdXRoU2VydmljZScsIGZ1bmN0aW9uICgkaHR0cCwgU2Vzc2lvbiwgJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMsICRxKSB7XG5cbi8vICAgICAgICAgZnVuY3Rpb24gb25TdWNjZXNzZnVsTG9naW4ocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgIHZhciB1c2VyID0gcmVzcG9uc2UuZGF0YS51c2VyO1xuLy8gICAgICAgICAgICAgU2Vzc2lvbi5jcmVhdGUodXNlcik7XG4vLyAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoQVVUSF9FVkVOVFMubG9naW5TdWNjZXNzKTtcbi8vICAgICAgICAgICAgIHJldHVybiB1c2VyO1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgLy8gVXNlcyB0aGUgc2Vzc2lvbiBmYWN0b3J5IHRvIHNlZSBpZiBhblxuLy8gICAgICAgICAvLyBhdXRoZW50aWNhdGVkIHVzZXIgaXMgY3VycmVudGx5IHJlZ2lzdGVyZWQuXG4vLyAgICAgICAgIHRoaXMuaXNBdXRoZW50aWNhdGVkID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuICEhU2Vzc2lvbi51c2VyO1xuLy8gICAgICAgICB9O1xuXG4gICAgICAgIFxuLy8gICAgICAgICB0aGlzLmlzQWRtaW4gPSBmdW5jdGlvbih1c2VySWQpe1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ3J1bm5pbmcgYWRtaW4gZnVuYycpXG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpXG4vLyAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhLnVzZXIuaXNBZG1pbilcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIHRoaXMuZ2V0TG9nZ2VkSW5Vc2VyID0gZnVuY3Rpb24gKGZyb21TZXJ2ZXIpIHtcblxuLy8gICAgICAgICAgICAgLy8gSWYgYW4gYXV0aGVudGljYXRlZCBzZXNzaW9uIGV4aXN0cywgd2Vcbi8vICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgdXNlciBhdHRhY2hlZCB0byB0aGF0IHNlc3Npb25cbi8vICAgICAgICAgICAgIC8vIHdpdGggYSBwcm9taXNlLiBUaGlzIGVuc3VyZXMgdGhhdCB3ZSBjYW5cbi8vICAgICAgICAgICAgIC8vIGFsd2F5cyBpbnRlcmZhY2Ugd2l0aCB0aGlzIG1ldGhvZCBhc3luY2hyb25vdXNseS5cblxuLy8gICAgICAgICAgICAgLy8gT3B0aW9uYWxseSwgaWYgdHJ1ZSBpcyBnaXZlbiBhcyB0aGUgZnJvbVNlcnZlciBwYXJhbWV0ZXIsXG4vLyAgICAgICAgICAgICAvLyB0aGVuIHRoaXMgY2FjaGVkIHZhbHVlIHdpbGwgbm90IGJlIHVzZWQuXG5cbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlzQXV0aGVudGljYXRlZCgpICYmIGZyb21TZXJ2ZXIgIT09IHRydWUpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbihTZXNzaW9uLnVzZXIpO1xuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICAvLyBNYWtlIHJlcXVlc3QgR0VUIC9zZXNzaW9uLlxuLy8gICAgICAgICAgICAgLy8gSWYgaXQgcmV0dXJucyBhIHVzZXIsIGNhbGwgb25TdWNjZXNzZnVsTG9naW4gd2l0aCB0aGUgcmVzcG9uc2UuXG4vLyAgICAgICAgICAgICAvLyBJZiBpdCByZXR1cm5zIGEgNDAxIHJlc3BvbnNlLCB3ZSBjYXRjaCBpdCBhbmQgaW5zdGVhZCByZXNvbHZlIHRvIG51bGwuXG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbi8vICAgICAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5sb2dpbiA9IGZ1bmN0aW9uIChjcmVkZW50aWFscykge1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9sb2dpbicsIGNyZWRlbnRpYWxzKVxuLy8gICAgICAgICAgICAgICAgIC50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKVxuLy8gICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QoeyBtZXNzYWdlOiAnSW52YWxpZCBsb2dpbiBjcmVkZW50aWFscy4nfSk7XG4vLyAgICAgICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5zaWdudXAgPSBmdW5jdGlvbihjcmVkZW50aWFscyl7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuLy8gICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuLy8gICAgICAgICAgICAgICAgIHVybDogJy9zaWdudXAnLFxuLy8gICAgICAgICAgICAgICAgIGRhdGE6IGNyZWRlbnRpYWxzXG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5kYXRhKVxuLy8gICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKCl7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCh7bWVzc2FnZTogJ1RoYXQgZW1haWwgaXMgYWxyZWFkeSBiZWluZyB1c2VkLid9KTtcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5sb2dvdXQgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvbG9nb3V0JykudGhlbihmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgU2Vzc2lvbi5kZXN0cm95KCk7XG4vLyAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ291dFN1Y2Nlc3MpO1xuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5zZXJ2aWNlKCdTZXNzaW9uJywgZnVuY3Rpb24gKCRyb290U2NvcGUsIEFVVEhfRVZFTlRTKSB7XG5cbi8vICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4vLyAgICAgICAgICRyb290U2NvcGUuJG9uKEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCwgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgc2VsZi5kZXN0cm95KCk7XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XG5cbi8vICAgICAgICAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbiAodXNlcikge1xuLy8gICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgfSk7XG5cbi8vIH0oKSk7XG4iLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlcikgPT4ge1xuXHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnZGVja3MnLCB7XG5cdFx0dXJsOiAnZGVja3MvOnRlYW1pZCcsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9kZWNrcy9kZWNrcy5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnRGVja0N0cmwnLFxuXHRcdHJlc29sdmU6IHtcblx0XHRcdGRlY2tzOiAoR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcykgPT4gR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZChzdGF0ZVBhcmFtcy50ZWFtSWQpXG5cdFx0fVxuXHR9KVxuXG59KVxuXG5hcHAuY29udHJvbGxlcignRGVja0N0cmwnLCAoJHNjb3BlKSA9PiB7XG5cblxuXHRcbn0pIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIpID0+IHtcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnL2dhbWUvOnRlYW1JZCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvZ2FtZS9nYW1lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnR2FtZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICB0ZWFtR2FtZXM6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VGVhbUlkKCRzdGF0ZVBhcmFtcy50ZWFtSWQpIC8vc3RhdGVQYXJhbXMudGVhbUlkXG4gICAgICAgIH1cbiAgICB9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0dhbWVDdHJsJywgKCRzY29wZSwgR2FtZUZhY3RvcnksIHRlYW1HYW1lcykgPT4ge1xuICAgICRzY29wZS5zdGFydE5ld0dhbWUgPSBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWU7XG4gICAgJHNjb3BlLiRvbignY2hhbmdlZEdhbWUnLCAoZXZlbnQsIGRhdGEpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlY2VpdmVkIGV2ZW50JylcbiAgICAgICAgY29uc29sZS5sb2coJ2RhdGEgb2JqOicsIGRhdGEpXG4gICAgICAgICRzY29wZS5nYW1lID0gZGF0YTtcbiAgICAgICAgJHNjb3BlLiRkaWdlc3QoKVxuXG4gICAgfSlcbiAgICAkc2NvcGUuZ2FtZXMgPSB0ZWFtR2FtZXM7XG4gICAgY29uc29sZS5sb2coJ3RlYW1nYW1lcyAnLCB0ZWFtR2FtZXMpXG59KVxuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcil7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lJywge1xuXHRcdHVybDogJy9ob21lJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2hvbWUvaG9tZS5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnSG9tZUN0cmwnLFxuXHR9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUsICRjb3Jkb3ZhT2F1dGgsIFVzZXJGYWN0b3J5LCBHYW1lRmFjdG9yeSwgJGxvY2FsU3RvcmFnZSl7XG5cdCRzY29wZS5zdG9yYWdlID0gJGxvY2FsU3RvcmFnZVxuXHRcblx0R2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVVzZXJJZCgyKVxuXHRcdC50aGVuKHVzZXJHYW1lcyA9PiB7ICRzY29wZS51c2VyR2FtZXMgPSB1c2VyR2FtZXMgfSlcblxuXHQkc2NvcGUuZ3JlZXRpbmcgPSBcImhlbGxvXCI7XG59KVxuXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKXtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2xvZ2luJywge1xuXHRcdHVybDogJy9sb2dpbicsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9sb2dpbi9sb2dpbi5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnTG9naW5DdHJsJ1xuXHR9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCBMb2dpbkZhY3RvcnksIFVzZXJGYWN0b3J5LCAkY29yZG92YU9hdXRoLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCl7XG4gXHQkc2NvcGUubG9naW5XaXRoU2xhY2sgPSBmdW5jdGlvbigpe1xuIFx0XHRyZXR1cm4gTG9naW5GYWN0b3J5LmdldFNsYWNrQ3JlZHMoKVxuIFx0XHQudGhlbihjcmVkcyA9PntcbiBcdFx0XHRyZXR1cm4gJGNvcmRvdmFPYXV0aC5zbGFjayhjcmVkcy5jbGllbnRJRCwgY3JlZHMuY2xpZW50U2VjcmV0LCBbJ2lkZW50aXR5LmJhc2ljJywgJ2lkZW50aXR5LnRlYW0nLCAnaWRlbnRpdHkuYXZhdGFyJ10pXG4gXHRcdH0pXG4gXHRcdC50aGVuKGluZm8gPT4gVXNlckZhY3Rvcnkuc2V0VXNlcihpbmZvKSlcbiBcdFx0LnRoZW4oKCkgPT4gJHN0YXRlLmdvKCdob21lJykpXG4gXHR9XG5cbiBcdCRzY29wZS5zdG9yYWdlID0gJGxvY2FsU3RvcmFnZVxufSkiLCIvL0RpcmVjdGl2ZSBGaWxlIiwiYXBwLmZhY3RvcnkoJ0dhbWVGYWN0b3J5JywgKCRodHRwLCAkcm9vdFNjb3BlKSA9PiB7XG4gICAgY29uc3QgR2FtZUZhY3RvcnkgPSB7fTtcblxuICAgIGNvbnN0IGluaXRpYWxpemVGaXJlYmFzZSA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgICAgICAgYXBpS2V5OiBcIkFJemFTeUQtdERldlh2aXB5dUU1bHpoZVdBUnE0aHV1MVVtcW9Ka1wiLFxuICAgICAgICAgICAgYXV0aERvbWFpbjogXCJjYXBzdG9uZS1mYjBlOC5maXJlYmFzZWFwcC5jb21cIixcbiAgICAgICAgICAgIGRhdGFiYXNlVVJMOiBcImh0dHBzOi8vY2Fwc3RvbmUtZmIwZTguZmlyZWJhc2Vpby5jb21cIixcbiAgICAgICAgICAgIHN0b3JhZ2VCdWNrZXQ6IFwiY2Fwc3RvbmUtZmIwZTguYXBwc3BvdC5jb21cIixcbiAgICAgICAgICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjg0OTgzOTY4MDEwN1wiXG4gICAgICAgIH07XG4gICAgICAgIGZpcmViYXNlLmluaXRpYWxpemVBcHAoY29uZmlnKTtcbiAgICB9O1xuICAgIGluaXRpYWxpemVGaXJlYmFzZSgpO1xuXG5cbiAgICBHYW1lRmFjdG9yeS5hZGRVc2VyID0gKCkgPT4ge1xuXG4gICAgfTtcblxuICAgIEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZSA9IChnYW1lTmFtZSwgdGVhbU5hbWUpID0+IHtcbiAgICAgICAgLy9yZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpLnRoZW4odXNlcklkID0+IHtcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZ2FtZXMnLCB7XG4gICAgICAgICAgICAgICAgbmFtZTogZ2FtZU5hbWUgfHwgJ0JvcmluZyBOYW1lJyxcbiAgICAgICAgICAgICAgICB0ZWFtSWQ6IHRlYW1JZCB8fCAyLFxuICAgICAgICAgICAgICAgIGNyZWF0b3JJZDogMlxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcbiAgICAgICAgICAgIC50aGVuKGdhbWVJZCA9PiB7XG4gICAgICAgICAgICAgICAgLy9jb25zdCByZWZmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYC9nYW1lcy9gKVxuICAgICAgICAgICAgICAgIGNvbnN0IHJlZmYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgL2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICAgICAgcmVmZi5vbigndmFsdWUnLCBzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2NoYW5nZWRHYW1lJywgc25hcHNob3QudmFsKCkpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLy9zZXQgdXAgd2F0Y2hlclxuICAgIH07XG5cblxuICAgIEdhbWVGYWN0b3J5LmpvaW5HYW1lQnlJZCA9IChnYW1lSWQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2pvaW5pbmcgZ2FtZScpXG4gICAgICAgICAgICAvL3ZhciBwbGF5ZXJzVGVhbSA9IFxuICAgICAgICB2YXIgZ2FtZUlkID0gODtcbiAgICAgICAgdmFyIHBsYXllcklkID0gMjsgLy9ldmVudHVhbGx5IG1ha2UgaXQgZ2V0IGN1cnJlbnQgXG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGBodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2dhbWVzLyR7Z2FtZUlkfT9wbGF5ZXJJZD0ke3BsYXllcklkfWAsIHtcblxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8vXG4gICAgR2FtZUZhY3RvcnkuY3JlYXRlR2FtZUJ5SWRGaXJlQmFzZSA9IChmaXJlYmFzZWdhbWVJZCkgPT4ge1xuICAgICAgICAvL3JldHVybiAkaHR0cC5wb3N0KGBodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2ZpcmViYXNlL2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgIC8vbmVlZHMgdG8gYmUgLnRoZW5hYmxlXG4gICAgICAgIGNvbnN0IG5ld1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBnYW1lcy8ke2ZpcmViYXNlZ2FtZUlkfWApLnB1c2goKTtcbiAgICAgICAgbmV3UmVmLnNldCh7XG4gICAgICAgICAgICBwbGF5ZXJJZDogcmVxLnF1ZXJ5LnBsYXllcklkXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG5cbiAgICAvL3ZzIGdldENhcmRzQnlUZWFtSWRcbiAgICBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkID0gKHRlYW1JZCkgPT4ge1xuXG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZGVja3MvJHt0ZWFtSWR9YClcbiAgICAgICAgICAgIC50aGUocmVzID0+IHJlcy5kYXRhKVxuXG4gICAgfTtcblxuICAgIEdhbWVGYWN0b3J5LmdldENhcmRzQnlDcmVhdG9yID0gKHVzZXJJZCkgPT4ge1xuXG4gICAgfVxuXG4gICAgR2FtZUZhY3RvcnkuZ2V0VXNlcnNCeUdhbWVJZCA9IChnYW1lSWQpID0+IHtcbiAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0vdXNlcnNgKTtcbiAgICB9O1xuXG5cbiAgICBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VXNlcklkID0gKHVzZXJJZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9nYW1lcy8/dXNlcklkPSR7dXNlcklkfWApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICB9XG4gICAgICAgIC8vIC50aGVuKGNyZWF0ZWRHYW1lID0+XG4gICAgICAgIC8vICAgICAvL2FkZHdhdGNoZXIgdG8gZ2FtZSBpZCBpbiBmaXJlYmFzZSlcbiAgICAgICAgLy8gICAgIHJldHVybiBjcmVhdGVkR2FtZVxuICAgICAgICAvLyB9O1xuXG5cblxuICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQgPSAodGVhbUlkKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0aGUgdGVhbSBpcyBpZCcsIHRlYW1JZClcblxuICAgICAgICBjb25zdCBnYW1lc1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXNgKVxuICAgICAgICByZXR1cm4gZ2FtZXNSZWYub25jZSgndmFsdWUnKS50aGVuKHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGhlIHZhbCBpcycsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgIHJldHVybiBzbmFwc2hvdC52YWwoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2dhbWVzP3RlYW1JZD0ke3RlYW1JZH1gKVxuICAgICAgICAgICAgLy8gICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcbiAgICAgICAgICAgIC8vLnRoZW4oZm91bmRHYW1lcyA9PiApXG4gICAgfTtcblxuXG4gICAgLy9nZXQgYWxsIGdhbWVzIGJ5IHRlYW0gcm91dGVcblxuICAgIHJldHVybiBHYW1lRmFjdG9yeTtcbn0pO1xuXG5cblxuLy8gaW1wbGVtZW50IGpvaW5pbmcgYSBnYW1lIHVzaW5nIC8gc2Vzc2lvbiAkaHR0cCByZXF1ZXN0IGluIGFuIGFuZ3VsYXIgZmFjdG9yeSBjYWxsZWQgR2FtZUZhY3RvcnkgdGhhdCBoaXRzIHRoZSByb3V0ZSAvIGFwaSAvIGdhbWVzIC8g4oCmLi5mdW5jdGlvbiBqb2luR2FtZUJ5SWQoZ2FtZUlkKSB7XG4vLyAgICAgY29uc3QgdXNlciA9IGdldExvZ2dlZEluVXNlcigpIC8vYXNzdW1lcywgY291bGQgbGF0ZXIgYmUgb3B0aW9uYWwgaW4gYWRtaW4gcGFuZWxcbi8vICAgICBnZXRMT2dnZWRJblVTZXIoKS50aGVuKGxvZ2dlZFVTZXIgPT4ge1xuLy8gICAgICAgICBkb27igJkgdCBuZWVkIGdhbWUuZmluZGJ5IGlkLCBjYW4ganVzdCBkbyBmYiBwYXJ0IG9mIGdhbWVycyBpbmRlcGVuZGVudGx5IC8vR2FtZS5maW5kQnlJZChnYW1lSWQgKS50aGVuKGZvdW5kR2FtZSA9PiBsZXQgZ2FtZVJlZiA9IGZiLmRiLnJlZijigJgvICAgICAgICAgZ2FtZXPigJkrZm91bmRHYW1lLmlkKSlcbi8vICAgICB9KVxuLy8gfVxuLy8gc2lnbiBpbiBidXR0b25cbiIsImFwcC5mYWN0b3J5KCdMb2dpbkZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCl7XG5cdHJldHVybiB7XG5cdFx0Z2V0U2xhY2tDcmVkczogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiAkaHR0cC5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvc2xhY2snKVx0XG5cdFx0XHRcdC50aGVuKHJlcyA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlcy5kYXRhXG5cdFx0XHRcdH0pXG5cdFx0fVxuXHR9XG59KVxuIiwiYXBwLmZhY3RvcnkoJ1VzZXJGYWN0b3J5JywgZnVuY3Rpb24oJGh0dHAsICRsb2NhbFN0b3JhZ2UsICR0aW1lb3V0LCAkc3RhdGUpe1xuXHRcblx0cmV0dXJuIHtcblx0XHRzZXRVc2VyOiBmdW5jdGlvbihpbmZvKXtcblx0XHRcdHJldHVybiAkaHR0cCh7XG5cdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdFx0XHR1cmw6ICdodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL3VzZXJzJyxcblx0XHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcblx0XHRcdFx0fSxcblx0XHRcdFx0ZGF0YTogaW5mb1xuXHRcdFx0fSlcblx0XHRcdC50aGVuKHJlcyA9PiB7XG5cdFx0XHRcdHRoaXMuc2V0TG9jYWxTdG9yYWdlKHJlcy5kYXRhLnVzZXJbMF0sIHJlcy5kYXRhLnRlYW1bMF0pO1xuXHRcdFx0fSlcblx0XHR9LFxuXG5cdFx0Z2V0U2xhY2tJbmZvOiBmdW5jdGlvbigpe1xuXHRcdFx0cmV0dXJuICRodHRwLmdldCgnaHR0cHM6Ly9zbGFjay5jb20vYXBpL3VzZXJzLmlkZW50aXR5Jylcblx0XHR9LFxuXG5cdFx0c2V0TG9jYWxTdG9yYWdlOiBmdW5jdGlvbih1c2VyLCB0ZWFtKXtcblx0XHRcdCRsb2NhbFN0b3JhZ2UudXNlciA9IHVzZXI7XG5cdFx0XHQkbG9jYWxTdG9yYWdlLnRlYW0gPSB0ZWFtO1xuXHRcdH0sXG5cblx0XHRsb2dPdXQ6IGZ1bmN0aW9uKCl7XG5cdFx0XHQkbG9jYWxTdG9yYWdlLiRyZXNldCgpO1xuXHRcdH1cblx0fVxufSkiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
