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
  $stateProvider.state('active-game', {
    url: '/game/:gameId',
    templateUrl: 'js/active-game/active-game.html',
    controller: 'ActiveGameCtrl',
    resolve: {
      game: function game(GameFactory, $stateParams) {
        return GameFactory.getGameByGameId($stateParams.gameId);
      }
    }
  });
});

app.controller('ActiveGameCtrl', function ($scope, game) {

  $scope.game = game;
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
    url: '/games/:teamId',
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

  GameFactory.getGameByGameId = function (gameId) {
    var teamId = $localStorage.team.id;
    var gamesRef = firebase.database().ref('teams/' + teamId + '/games/' + gameId);
    return gamesRef.once('value').then(function (snapshot) {
      return snapshot.val();
    });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImFjdGl2ZS1nYW1lL2FjdGl2ZS1nYW1lLmpzIiwiY2FyZHMtdGVzdC9jYXJkc1Rlc3QuanMiLCJkZWNrcy9kZWNrcy5qcyIsImZyb20gZnNnL2Zyb20tZnNnLmpzIiwiZ2FtZS9nYW1lLmpzIiwiaG9tZS9ob21lLmpzIiwibG9naW4vbG9naW4uanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiLCJjb21tb24vZmFjdG9yaWVzL0dhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9sb2dpbkZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yaWVzL3VzZXJGYWN0b3J5LmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImFwcCIsImFuZ3VsYXIiLCJtb2R1bGUiLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZUxpZ2h0Q29udGVudCIsImNvbnRyb2xsZXIiLCIkc2NvcGUiLCJVc2VyRmFjdG9yeSIsIiRzdGF0ZSIsIiRsb2NhbFN0b3JhZ2UiLCIkdGltZW91dCIsImxvZ091dCIsImdvIiwiY29uZmlnIiwiJHN0YXRlUHJvdmlkZXIiLCJzdGF0ZSIsInVybCIsInRlbXBsYXRlVXJsIiwicmVzb2x2ZSIsImdhbWUiLCJHYW1lRmFjdG9yeSIsIiRzdGF0ZVBhcmFtcyIsImdldEdhbWVCeUdhbWVJZCIsImdhbWVJZCIsImdyZWV0aW5nIiwiZGVja3MiLCJnZXREZWNrc0J5VGVhbUlkIiwic3RhdGVQYXJhbXMiLCJ0ZWFtSWQiLCJ0ZWFtR2FtZXMiLCJnZXRHYW1lc0J5VGVhbUlkIiwic3RhcnROZXdHYW1lIiwiJG9uIiwiZXZlbnQiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsIiRkaWdlc3QiLCJnYW1lcyIsIiRjb3Jkb3ZhT2F1dGgiLCJzdG9yYWdlIiwiZ2V0R2FtZXNCeVVzZXJJZCIsInRoZW4iLCJ1c2VyR2FtZXMiLCJMb2dpbkZhY3RvcnkiLCJsb2dpbldpdGhTbGFjayIsImdldFNsYWNrQ3JlZHMiLCJzbGFjayIsImNyZWRzIiwiY2xpZW50SUQiLCJjbGllbnRTZWNyZXQiLCJzZXRVc2VyIiwiaW5mbyIsImZhY3RvcnkiLCIkaHR0cCIsIiRyb290U2NvcGUiLCJpbml0aWFsaXplRmlyZWJhc2UiLCJhcGlLZXkiLCJhdXRoRG9tYWluIiwiZGF0YWJhc2VVUkwiLCJzdG9yYWdlQnVja2V0IiwibWVzc2FnaW5nU2VuZGVySWQiLCJmaXJlYmFzZSIsImluaXRpYWxpemVBcHAiLCJhZGRVc2VyIiwiZ2FtZU5hbWUiLCJ0ZWFtTmFtZSIsInBvc3QiLCJuYW1lIiwiY3JlYXRvcklkIiwicmVzIiwicmVmZiIsImRhdGFiYXNlIiwicmVmIiwib24iLCJzbmFwc2hvdCIsInZhbCIsIiRicm9hZGNhc3QiLCJqb2luR2FtZUJ5SWQiLCJwbGF5ZXJJZCIsImNyZWF0ZUdhbWVCeUlkRmlyZUJhc2UiLCJmaXJlYmFzZWdhbWVJZCIsIm5ld1JlZiIsInB1c2giLCJzZXQiLCJyZXEiLCJxdWVyeSIsImdldCIsInRoZSIsImdldENhcmRzQnlDcmVhdG9yIiwidXNlcklkIiwiZ2V0VXNlcnNCeUdhbWVJZCIsImdhbWVzUmVmIiwib25jZSIsInRlYW0iLCJpZCIsIm1ldGhvZCIsImhlYWRlcnMiLCJzZXRMb2NhbFN0b3JhZ2UiLCJ1c2VyIiwiZ2V0U2xhY2tJbmZvIiwiJHJlc2V0Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBQSxPQUFBQyxHQUFBLEdBQUFDLFFBQUFDLE1BQUEsQ0FBQSxzQkFBQSxFQUFBLENBQUEsT0FBQSxFQUFBLFdBQUEsRUFBQSxXQUFBLEVBQUEsZ0JBQUEsRUFBQSxXQUFBLENBQUEsQ0FBQTs7QUFFQUYsSUFBQUcsR0FBQSxDQUFBLFVBQUFDLGNBQUEsRUFBQTtBQUNBQSxpQkFBQUMsS0FBQSxDQUFBLFlBQUE7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QUE7QUFDQSwwQkFBQTtBQURBLFNBSEE7QUFNQS9ELGNBQUFrQjtBQU5BLE9BQUEsRUFRQVYsSUFSQSxDQVFBLGVBQUE7QUFDQSxjQUFBd0QsZUFBQSxDQUFBNUIsSUFBQXBDLElBQUEsQ0FBQWlFLElBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQTdCLElBQUFwQyxJQUFBLENBQUE0RCxJQUFBLENBQUEsQ0FBQSxDQUFBO0FBQ0EsT0FWQSxDQUFBO0FBV0EsS0FiQTs7QUFlQU0sa0JBQUEsd0JBQUE7QUFDQSxhQUFBOUMsTUFBQWlDLEdBQUEsQ0FBQSxzQ0FBQSxDQUFBO0FBQ0EsS0FqQkE7O0FBbUJBVyxxQkFBQSx5QkFBQUMsSUFBQSxFQUFBTCxJQUFBLEVBQUE7QUFDQXJGLG9CQUFBMEYsSUFBQSxHQUFBQSxJQUFBO0FBQ0ExRixvQkFBQXFGLElBQUEsR0FBQUEsSUFBQTtBQUNBLEtBdEJBOztBQXdCQW5GLFlBQUEsa0JBQUE7QUFDQUYsb0JBQUE0RixNQUFBO0FBQ0E7QUExQkEsR0FBQTtBQTRCQSxDQTlCQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW9uaWMgU3RhcnRlciBBcHBcblxuLy8gYW5ndWxhci5tb2R1bGUgaXMgYSBnbG9iYWwgcGxhY2UgZm9yIGNyZWF0aW5nLCByZWdpc3RlcmluZyBhbmQgcmV0cmlldmluZyBBbmd1bGFyIG1vZHVsZXNcbi8vICdzdGFydGVyJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xud2luZG93LmFwcCA9IGFuZ3VsYXIubW9kdWxlKCdCbGFua0FnYWluc3RIdW1hbml0eScsIFsnaW9uaWMnLCAndWkucm91dGVyJywnbmdDb3Jkb3ZhJywnbmdDb3Jkb3ZhT2F1dGgnLCAnbmdTdG9yYWdlJ10pXG5cbmFwcC5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0pIHtcbiAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgICAgICAgIC8vIEhpZGUgdGhlIGFjY2Vzc29yeSBiYXIgYnkgZGVmYXVsdCAocmVtb3ZlIHRoaXMgdG8gc2hvdyB0aGUgYWNjZXNzb3J5IGJhciBhYm92ZSB0aGUga2V5Ym9hcmRcbiAgICAgICAgICAgIC8vIGZvciBmb3JtIGlucHV0cylcbiAgICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG5cbiAgICAgICAgICAgIC8vIERvbid0IHJlbW92ZSB0aGlzIGxpbmUgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZy4gSXQgc3RvcHMgdGhlIHZpZXdwb3J0XG4gICAgICAgICAgICAvLyBmcm9tIHNuYXBwaW5nIHdoZW4gdGV4dCBpbnB1dHMgYXJlIGZvY3VzZWQuIElvbmljIGhhbmRsZXMgdGhpcyBpbnRlcm5hbGx5IGZvclxuICAgICAgICAgICAgLy8gYSBtdWNoIG5pY2VyIGtleWJvYXJkIGV4cGVyaWVuY2UuXG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2luZG93LlN0YXR1c0Jhcikge1xuICAgICAgICAgICAgU3RhdHVzQmFyLnN0eWxlTGlnaHRDb250ZW50KClcbiAgICAgICAgfVxuICAgIH0pO1xuXG59KVxuIiwiYXBwLmNvbnRyb2xsZXIoJ0xvZ291dEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIFVzZXJGYWN0b3J5LCAkc3RhdGUsICRsb2NhbFN0b3JhZ2UsICR0aW1lb3V0KXtcblx0JHNjb3BlLmxvZ091dCA9IGZ1bmN0aW9uKCl7XG5cdFx0VXNlckZhY3RvcnkubG9nT3V0KClcblx0XHQkc3RhdGUuZ28oJ2xvZ2luJylcblx0fVxufSkiLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlcikgPT4ge1xuXHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnYWN0aXZlLWdhbWUnLCB7XG5cdFx0dXJsOiAnL2dhbWUvOmdhbWVJZCcsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9hY3RpdmUtZ2FtZS9hY3RpdmUtZ2FtZS5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnQWN0aXZlR2FtZUN0cmwnLFxuXHRcdHJlc29sdmU6IHtcblx0XHRcdGdhbWU6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXRHYW1lQnlHYW1lSWQoJHN0YXRlUGFyYW1zLmdhbWVJZClcblx0XHR9XG5cdH0pXG5cbn0pXG5cbmFwcC5jb250cm9sbGVyKCdBY3RpdmVHYW1lQ3RybCcsICgkc2NvcGUsIGdhbWUpID0+IHtcblxuXHQkc2NvcGUuZ2FtZSA9IGdhbWU7XG5cdFxufSkiLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKXtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2NhcmRzJywge1xuXHRcdHVybDogJy9jYXJkcycsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9jYXJkcy10ZXN0L2NhcmRzLXRlc3QuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0NhcmRzVGVzdEN0cmwnXG5cdH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignQ2FyZHNUZXN0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSl7XG4gXHQkc2NvcGUuZ3JlZXRpbmcgPSBcIkhJXCJcbn0pIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIpID0+IHtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2RlY2tzJywge1xuXHRcdHVybDogJ2RlY2tzLzp0ZWFtaWQnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvZGVja3MvZGVja3MuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0RlY2tDdHJsJyxcblx0XHRyZXNvbHZlOiB7XG5cdFx0XHRkZWNrczogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoc3RhdGVQYXJhbXMudGVhbUlkKVxuXHRcdH1cblx0fSlcblxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0RlY2tDdHJsJywgKCRzY29wZSkgPT4ge1xuXG5cblx0XG59KSIsIi8vIChmdW5jdGlvbiAoKSB7XG5cbi8vICAgICAndXNlIHN0cmljdCc7XG5cbi8vICAgICAvLyBIb3BlIHlvdSBkaWRuJ3QgZm9yZ2V0IEFuZ3VsYXIhIER1aC1kb3kuXG4vLyAgICAgaWYgKCF3aW5kb3cuYW5ndWxhcikgdGhyb3cgbmV3IEVycm9yKCdJIGNhblxcJ3QgZmluZCBBbmd1bGFyIScpO1xuXG4vLyAgICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdmc2FQcmVCdWlsdCcsIFtdKTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdTb2NrZXQnLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgIGlmICghd2luZG93LmlvKSB0aHJvdyBuZXcgRXJyb3IoJ3NvY2tldC5pbyBub3QgZm91bmQhJyk7XG4vLyAgICAgICAgIHJldHVybiB3aW5kb3cuaW8od2luZG93LmxvY2F0aW9uLm9yaWdpbik7XG4vLyAgICAgfSk7XG5cbi8vICAgICAvLyBBVVRIX0VWRU5UUyBpcyB1c2VkIHRocm91Z2hvdXQgb3VyIGFwcCB0b1xuLy8gICAgIC8vIGJyb2FkY2FzdCBhbmQgbGlzdGVuIGZyb20gYW5kIHRvIHRoZSAkcm9vdFNjb3BlXG4vLyAgICAgLy8gZm9yIGltcG9ydGFudCBldmVudHMgYWJvdXQgYXV0aGVudGljYXRpb24gZmxvdy5cbi8vICAgICBhcHAuY29uc3RhbnQoJ0FVVEhfRVZFTlRTJywge1xuLy8gICAgICAgICBsb2dpblN1Y2Nlc3M6ICdhdXRoLWxvZ2luLXN1Y2Nlc3MnLFxuLy8gICAgICAgICBsb2dpbkZhaWxlZDogJ2F1dGgtbG9naW4tZmFpbGVkJyxcbi8vICAgICAgICAgbG9nb3V0U3VjY2VzczogJ2F1dGgtbG9nb3V0LXN1Y2Nlc3MnLFxuLy8gICAgICAgICBzZXNzaW9uVGltZW91dDogJ2F1dGgtc2Vzc2lvbi10aW1lb3V0Jyxcbi8vICAgICAgICAgbm90QXV0aGVudGljYXRlZDogJ2F1dGgtbm90LWF1dGhlbnRpY2F0ZWQnLFxuLy8gICAgICAgICBub3RBdXRob3JpemVkOiAnYXV0aC1ub3QtYXV0aG9yaXplZCdcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdBdXRoSW50ZXJjZXB0b3InLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHEsIEFVVEhfRVZFTlRTKSB7XG4vLyAgICAgICAgIHZhciBzdGF0dXNEaWN0ID0ge1xuLy8gICAgICAgICAgICAgNDAxOiBBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLFxuLy8gICAgICAgICAgICAgNDAzOiBBVVRIX0VWRU5UUy5ub3RBdXRob3JpemVkLFxuLy8gICAgICAgICAgICAgNDE5OiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCxcbi8vICAgICAgICAgICAgIDQ0MDogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXRcbi8vICAgICAgICAgfTtcbi8vICAgICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgICAgIHJlc3BvbnNlRXJyb3I6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChzdGF0dXNEaWN0W3Jlc3BvbnNlLnN0YXR1c10sIHJlc3BvbnNlKTtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlc3BvbnNlKVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9O1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLmNvbmZpZyhmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xuLy8gICAgICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKFtcbi8vICAgICAgICAgICAgICckaW5qZWN0b3InLFxuLy8gICAgICAgICAgICAgZnVuY3Rpb24gKCRpbmplY3Rvcikge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkaW5qZWN0b3IuZ2V0KCdBdXRoSW50ZXJjZXB0b3InKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgXSk7XG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuc2VydmljZSgnQXV0aFNlcnZpY2UnLCBmdW5jdGlvbiAoJGh0dHAsIFNlc3Npb24sICRyb290U2NvcGUsIEFVVEhfRVZFTlRTLCAkcSkge1xuXG4vLyAgICAgICAgIGZ1bmN0aW9uIG9uU3VjY2Vzc2Z1bExvZ2luKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICB2YXIgdXNlciA9IHJlc3BvbnNlLmRhdGEudXNlcjtcbi8vICAgICAgICAgICAgIFNlc3Npb24uY3JlYXRlKHVzZXIpO1xuLy8gICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ2luU3VjY2Vzcyk7XG4vLyAgICAgICAgICAgICByZXR1cm4gdXNlcjtcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIC8vIFVzZXMgdGhlIHNlc3Npb24gZmFjdG9yeSB0byBzZWUgaWYgYW5cbi8vICAgICAgICAgLy8gYXV0aGVudGljYXRlZCB1c2VyIGlzIGN1cnJlbnRseSByZWdpc3RlcmVkLlxuLy8gICAgICAgICB0aGlzLmlzQXV0aGVudGljYXRlZCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAhIVNlc3Npb24udXNlcjtcbi8vICAgICAgICAgfTtcblxuICAgICAgICBcbi8vICAgICAgICAgdGhpcy5pc0FkbWluID0gZnVuY3Rpb24odXNlcklkKXtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdydW5uaW5nIGFkbWluIGZ1bmMnKVxuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKVxuLy8gICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YS51c2VyLmlzQWRtaW4pXG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICB0aGlzLmdldExvZ2dlZEluVXNlciA9IGZ1bmN0aW9uIChmcm9tU2VydmVyKSB7XG5cbi8vICAgICAgICAgICAgIC8vIElmIGFuIGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbiBleGlzdHMsIHdlXG4vLyAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIHVzZXIgYXR0YWNoZWQgdG8gdGhhdCBzZXNzaW9uXG4vLyAgICAgICAgICAgICAvLyB3aXRoIGEgcHJvbWlzZS4gVGhpcyBlbnN1cmVzIHRoYXQgd2UgY2FuXG4vLyAgICAgICAgICAgICAvLyBhbHdheXMgaW50ZXJmYWNlIHdpdGggdGhpcyBtZXRob2QgYXN5bmNocm9ub3VzbHkuXG5cbi8vICAgICAgICAgICAgIC8vIE9wdGlvbmFsbHksIGlmIHRydWUgaXMgZ2l2ZW4gYXMgdGhlIGZyb21TZXJ2ZXIgcGFyYW1ldGVyLFxuLy8gICAgICAgICAgICAgLy8gdGhlbiB0aGlzIGNhY2hlZCB2YWx1ZSB3aWxsIG5vdCBiZSB1c2VkLlxuXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSAmJiBmcm9tU2VydmVyICE9PSB0cnVlKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLndoZW4oU2Vzc2lvbi51c2VyKTtcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgLy8gTWFrZSByZXF1ZXN0IEdFVCAvc2Vzc2lvbi5cbi8vICAgICAgICAgICAgIC8vIElmIGl0IHJldHVybnMgYSB1c2VyLCBjYWxsIG9uU3VjY2Vzc2Z1bExvZ2luIHdpdGggdGhlIHJlc3BvbnNlLlxuLy8gICAgICAgICAgICAgLy8gSWYgaXQgcmV0dXJucyBhIDQwMSByZXNwb25zZSwgd2UgY2F0Y2ggaXQgYW5kIGluc3RlYWQgcmVzb2x2ZSB0byBudWxsLlxuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKS50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKS5jYXRjaChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4vLyAgICAgICAgICAgICB9KTtcblxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbiAoY3JlZGVudGlhbHMpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvbG9naW4nLCBjcmVkZW50aWFscylcbi8vICAgICAgICAgICAgICAgICAudGhlbihvblN1Y2Nlc3NmdWxMb2dpbilcbi8vICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHsgbWVzc2FnZTogJ0ludmFsaWQgbG9naW4gY3JlZGVudGlhbHMuJ30pO1xuLy8gICAgICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMuc2lnbnVwID0gZnVuY3Rpb24oY3JlZGVudGlhbHMpe1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbi8vICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbi8vICAgICAgICAgICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbi8vICAgICAgICAgICAgICAgICBkYXRhOiBjcmVkZW50aWFsc1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQuZGF0YSlcbi8vICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbigpe1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3Qoe21lc3NhZ2U6ICdUaGF0IGVtYWlsIGlzIGFscmVhZHkgYmVpbmcgdXNlZC4nfSk7XG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL2xvZ291dCcpLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgIFNlc3Npb24uZGVzdHJveSgpO1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dvdXRTdWNjZXNzKTtcbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuc2VydmljZSgnU2Vzc2lvbicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUykge1xuXG4vLyAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuLy8gICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICBzZWxmLmRlc3Ryb3koKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuXG4vLyAgICAgICAgIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24gKHVzZXIpIHtcbi8vICAgICAgICAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcbi8vICAgICAgICAgfTtcblxuLy8gICAgIH0pO1xuXG4vLyB9KCkpO1xuIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIpID0+IHtcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnL2dhbWVzLzp0ZWFtSWQnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2dhbWUvZ2FtZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0dhbWVDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgdGVhbUdhbWVzOiAoR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcykgPT4gR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCgkc3RhdGVQYXJhbXMudGVhbUlkKSAvL3N0YXRlUGFyYW1zLnRlYW1JZFxuICAgICAgICB9XG4gICAgfSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdHYW1lQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCB0ZWFtR2FtZXMpID0+IHtcbiAgICAkc2NvcGUuc3RhcnROZXdHYW1lID0gR2FtZUZhY3Rvcnkuc3RhcnROZXdHYW1lO1xuICAgICRzY29wZS4kb24oJ2NoYW5nZWRHYW1lJywgKGV2ZW50LCBkYXRhKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZWNlaXZlZCBldmVudCcpXG4gICAgICAgIGNvbnNvbGUubG9nKCdkYXRhIG9iajonLCBkYXRhKVxuICAgICAgICAkc2NvcGUuZ2FtZSA9IGRhdGE7XG4gICAgICAgICRzY29wZS4kZGlnZXN0KClcblxuICAgIH0pXG4gICAgJHNjb3BlLmdhbWVzID0gdGVhbUdhbWVzO1xuICAgIGNvbnNvbGUubG9nKCd0ZWFtZ2FtZXMgJywgdGVhbUdhbWVzKVxufSlcbiIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpe1xuXHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnaG9tZScsIHtcblx0XHR1cmw6ICcvaG9tZScsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9ob21lL2hvbWUuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0hvbWVDdHJsJyxcblx0fSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdIb21lQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCAkY29yZG92YU9hdXRoLCBVc2VyRmFjdG9yeSwgR2FtZUZhY3RvcnksICRsb2NhbFN0b3JhZ2Upe1xuXHQkc2NvcGUuc3RvcmFnZSA9ICRsb2NhbFN0b3JhZ2Vcblx0XG5cdEdhbWVGYWN0b3J5LmdldEdhbWVzQnlVc2VySWQoMilcblx0XHQudGhlbih1c2VyR2FtZXMgPT4geyAkc2NvcGUudXNlckdhbWVzID0gdXNlckdhbWVzIH0pXG5cblx0JHNjb3BlLmdyZWV0aW5nID0gXCJoZWxsb1wiO1xufSlcblxuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcil7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdsb2dpbicsIHtcblx0XHR1cmw6ICcvbG9naW4nLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvbG9naW4vbG9naW4uaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0xvZ2luQ3RybCdcblx0fSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdMb2dpbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSwgTG9naW5GYWN0b3J5LCBVc2VyRmFjdG9yeSwgJGNvcmRvdmFPYXV0aCwgJGxvY2FsU3RvcmFnZSwgJHRpbWVvdXQpe1xuIFx0JHNjb3BlLmxvZ2luV2l0aFNsYWNrID0gZnVuY3Rpb24oKXtcbiBcdFx0cmV0dXJuIExvZ2luRmFjdG9yeS5nZXRTbGFja0NyZWRzKClcbiBcdFx0LnRoZW4oY3JlZHMgPT57XG4gXHRcdFx0cmV0dXJuICRjb3Jkb3ZhT2F1dGguc2xhY2soY3JlZHMuY2xpZW50SUQsIGNyZWRzLmNsaWVudFNlY3JldCwgWydpZGVudGl0eS5iYXNpYycsICdpZGVudGl0eS50ZWFtJywgJ2lkZW50aXR5LmF2YXRhciddKVxuIFx0XHR9KVxuIFx0XHQudGhlbihpbmZvID0+IFVzZXJGYWN0b3J5LnNldFVzZXIoaW5mbykpXG4gXHRcdC50aGVuKCgpID0+ICRzdGF0ZS5nbygnaG9tZScpKVxuIFx0fVxuXG4gXHQkc2NvcGUuc3RvcmFnZSA9ICRsb2NhbFN0b3JhZ2Vcbn0pIiwiLy9EaXJlY3RpdmUgRmlsZSIsImFwcC5mYWN0b3J5KCdHYW1lRmFjdG9yeScsICgkaHR0cCwgJHJvb3RTY29wZSkgPT4ge1xuICAgIGNvbnN0IEdhbWVGYWN0b3J5ID0ge307XG5cbiAgICBjb25zdCBpbml0aWFsaXplRmlyZWJhc2UgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgICAgICAgIGFwaUtleTogXCJBSXphU3lELXREZXZYdmlweXVFNWx6aGVXQVJxNGh1dTFVbXFvSmtcIixcbiAgICAgICAgICAgIGF1dGhEb21haW46IFwiY2Fwc3RvbmUtZmIwZTguZmlyZWJhc2VhcHAuY29tXCIsXG4gICAgICAgICAgICBkYXRhYmFzZVVSTDogXCJodHRwczovL2NhcHN0b25lLWZiMGU4LmZpcmViYXNlaW8uY29tXCIsXG4gICAgICAgICAgICBzdG9yYWdlQnVja2V0OiBcImNhcHN0b25lLWZiMGU4LmFwcHNwb3QuY29tXCIsXG4gICAgICAgICAgICBtZXNzYWdpbmdTZW5kZXJJZDogXCI4NDk4Mzk2ODAxMDdcIlxuICAgICAgICB9O1xuICAgICAgICBmaXJlYmFzZS5pbml0aWFsaXplQXBwKGNvbmZpZyk7XG4gICAgfTtcbiAgICBpbml0aWFsaXplRmlyZWJhc2UoKTtcblxuXG4gICAgR2FtZUZhY3RvcnkuYWRkVXNlciA9ICgpID0+IHtcblxuICAgIH07XG5cbiAgICBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWUgPSAoZ2FtZU5hbWUsIHRlYW1OYW1lKSA9PiB7XG4gICAgICAgIC8vcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKS50aGVuKHVzZXJJZCA9PiB7XG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCdodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2dhbWVzJywge1xuICAgICAgICAgICAgICAgIG5hbWU6IGdhbWVOYW1lIHx8ICdCb3JpbmcgTmFtZScsXG4gICAgICAgICAgICAgICAgdGVhbUlkOiB0ZWFtSWQgfHwgMixcbiAgICAgICAgICAgICAgICBjcmVhdG9ySWQ6IDJcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgICAgICAudGhlbihnYW1lSWQgPT4ge1xuICAgICAgICAgICAgICAgIC8vY29uc3QgcmVmZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGAvZ2FtZXMvYClcbiAgICAgICAgICAgICAgICBjb25zdCByZWZmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYC9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAgICAgICAgIHJlZmYub24oJ3ZhbHVlJywgc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdjaGFuZ2VkR2FtZScsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vc2V0IHVwIHdhdGNoZXJcbiAgICB9O1xuXG5cbiAgICBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdqb2luaW5nIGdhbWUnKVxuICAgICAgICAgICAgLy92YXIgcGxheWVyc1RlYW0gPSBcbiAgICAgICAgdmFyIGdhbWVJZCA9IDg7XG4gICAgICAgIHZhciBwbGF5ZXJJZCA9IDI7IC8vZXZlbnR1YWxseSBtYWtlIGl0IGdldCBjdXJyZW50IFxuICAgICAgICByZXR1cm4gJGh0dHAucG9zdChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0/cGxheWVySWQ9JHtwbGF5ZXJJZH1gLCB7XG5cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvL1xuICAgIEdhbWVGYWN0b3J5LmNyZWF0ZUdhbWVCeUlkRmlyZUJhc2UgPSAoZmlyZWJhc2VnYW1lSWQpID0+IHtcbiAgICAgICAgLy9yZXR1cm4gJGh0dHAucG9zdChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9maXJlYmFzZS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAvL25lZWRzIHRvIGJlIC50aGVuYWJsZVxuICAgICAgICBjb25zdCBuZXdSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgZ2FtZXMvJHtmaXJlYmFzZWdhbWVJZH1gKS5wdXNoKCk7XG4gICAgICAgIG5ld1JlZi5zZXQoe1xuICAgICAgICAgICAgcGxheWVySWQ6IHJlcS5xdWVyeS5wbGF5ZXJJZFxuICAgICAgICB9KTtcblxuICAgIH1cblxuXG4gICAgLy92cyBnZXRDYXJkc0J5VGVhbUlkXG4gICAgR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCA9ICh0ZWFtSWQpID0+IHtcblxuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2RlY2tzLyR7dGVhbUlkfWApXG4gICAgICAgICAgICAudGhlKHJlcyA9PiByZXMuZGF0YSlcblxuICAgIH07XG5cbiAgICBHYW1lRmFjdG9yeS5nZXRDYXJkc0J5Q3JlYXRvciA9ICh1c2VySWQpID0+IHtcblxuICAgIH1cblxuICAgIEdhbWVGYWN0b3J5LmdldFVzZXJzQnlHYW1lSWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZ2FtZXMvJHtnYW1lSWR9L3VzZXJzYCk7XG4gICAgfTtcblxuXG4gICAgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVVzZXJJZCA9ICh1c2VySWQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZ2FtZXMvP3VzZXJJZD0ke3VzZXJJZH1gKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcbiAgICAgICAgfVxuICAgICAgICAvLyAudGhlbihjcmVhdGVkR2FtZSA9PlxuICAgICAgICAvLyAgICAgLy9hZGR3YXRjaGVyIHRvIGdhbWUgaWQgaW4gZmlyZWJhc2UpXG4gICAgICAgIC8vICAgICByZXR1cm4gY3JlYXRlZEdhbWVcbiAgICAgICAgLy8gfTtcblxuXG5cbiAgICBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VGVhbUlkID0gKHRlYW1JZCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygndGhlIHRlYW0gaXMgaWQnLCB0ZWFtSWQpXG5cbiAgICAgICAgY29uc3QgZ2FtZXNSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzYClcbiAgICAgICAgcmV0dXJuIGdhbWVzUmVmLm9uY2UoJ3ZhbHVlJykudGhlbihzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZSB2YWwgaXMnLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gc25hcHNob3QudmFsKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLy8gcmV0dXJuICRodHRwLmdldChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9nYW1lcz90ZWFtSWQ9JHt0ZWFtSWR9YClcbiAgICAgICAgICAgIC8vICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgICAgICAvLy50aGVuKGZvdW5kR2FtZXMgPT4gKVxuICAgIH07XG5cbiAgICBHYW1lRmFjdG9yeS5nZXRHYW1lQnlHYW1lSWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgIGNvbnN0IHRlYW1JZCA9ICRsb2NhbFN0b3JhZ2UudGVhbS5pZFxuICAgICAgICBjb25zdCBnYW1lc1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgcmV0dXJuIGdhbWVzUmVmLm9uY2UoJ3ZhbHVlJykudGhlbihzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gc25hcHNob3QudmFsKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG5cblxuXG4gICAgLy9nZXQgYWxsIGdhbWVzIGJ5IHRlYW0gcm91dGVcblxuICAgIHJldHVybiBHYW1lRmFjdG9yeTtcbn0pO1xuXG5cblxuLy8gaW1wbGVtZW50IGpvaW5pbmcgYSBnYW1lIHVzaW5nIC8gc2Vzc2lvbiAkaHR0cCByZXF1ZXN0IGluIGFuIGFuZ3VsYXIgZmFjdG9yeSBjYWxsZWQgR2FtZUZhY3RvcnkgdGhhdCBoaXRzIHRoZSByb3V0ZSAvIGFwaSAvIGdhbWVzIC8g4oCmLi5mdW5jdGlvbiBqb2luR2FtZUJ5SWQoZ2FtZUlkKSB7XG4vLyAgICAgY29uc3QgdXNlciA9IGdldExvZ2dlZEluVXNlcigpIC8vYXNzdW1lcywgY291bGQgbGF0ZXIgYmUgb3B0aW9uYWwgaW4gYWRtaW4gcGFuZWxcbi8vICAgICBnZXRMT2dnZWRJblVTZXIoKS50aGVuKGxvZ2dlZFVTZXIgPT4ge1xuLy8gICAgICAgICBkb27igJkgdCBuZWVkIGdhbWUuZmluZGJ5IGlkLCBjYW4ganVzdCBkbyBmYiBwYXJ0IG9mIGdhbWVycyBpbmRlcGVuZGVudGx5IC8vR2FtZS5maW5kQnlJZChnYW1lSWQgKS50aGVuKGZvdW5kR2FtZSA9PiBsZXQgZ2FtZVJlZiA9IGZiLmRiLnJlZijigJgvICAgICAgICAgZ2FtZXPigJkrZm91bmRHYW1lLmlkKSlcbi8vICAgICB9KVxuLy8gfVxuLy8gc2lnbiBpbiBidXR0b25cbiIsImFwcC5mYWN0b3J5KCdMb2dpbkZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCl7XG5cdHJldHVybiB7XG5cdFx0Z2V0U2xhY2tDcmVkczogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiAkaHR0cC5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvc2xhY2snKVx0XG5cdFx0XHRcdC50aGVuKHJlcyA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlcy5kYXRhXG5cdFx0XHRcdH0pXG5cdFx0fVxuXHR9XG59KVxuIiwiYXBwLmZhY3RvcnkoJ1VzZXJGYWN0b3J5JywgZnVuY3Rpb24oJGh0dHAsICRsb2NhbFN0b3JhZ2UsICR0aW1lb3V0LCAkc3RhdGUpe1xuXHRcblx0cmV0dXJuIHtcblx0XHRzZXRVc2VyOiBmdW5jdGlvbihpbmZvKXtcblx0XHRcdHJldHVybiAkaHR0cCh7XG5cdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdFx0XHR1cmw6ICdodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL3VzZXJzJyxcblx0XHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcblx0XHRcdFx0fSxcblx0XHRcdFx0ZGF0YTogaW5mb1xuXHRcdFx0fSlcblx0XHRcdC50aGVuKHJlcyA9PiB7XG5cdFx0XHRcdHRoaXMuc2V0TG9jYWxTdG9yYWdlKHJlcy5kYXRhLnVzZXJbMF0sIHJlcy5kYXRhLnRlYW1bMF0pO1xuXHRcdFx0fSlcblx0XHR9LFxuXG5cdFx0Z2V0U2xhY2tJbmZvOiBmdW5jdGlvbigpe1xuXHRcdFx0cmV0dXJuICRodHRwLmdldCgnaHR0cHM6Ly9zbGFjay5jb20vYXBpL3VzZXJzLmlkZW50aXR5Jylcblx0XHR9LFxuXG5cdFx0c2V0TG9jYWxTdG9yYWdlOiBmdW5jdGlvbih1c2VyLCB0ZWFtKXtcblx0XHRcdCRsb2NhbFN0b3JhZ2UudXNlciA9IHVzZXI7XG5cdFx0XHQkbG9jYWxTdG9yYWdlLnRlYW0gPSB0ZWFtO1xuXHRcdH0sXG5cblx0XHRsb2dPdXQ6IGZ1bmN0aW9uKCl7XG5cdFx0XHQkbG9jYWxTdG9yYWdlLiRyZXNldCgpO1xuXHRcdH1cblx0fVxufSkiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
