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

app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'js/home/home.html',
    controller: 'HomeCtrl'
  });

  // $urlRouterProvider.otherwise('/');
});

app.controller('HomeCtrl', function ($scope, $state, $cordovaOauth, UserFactory, GameFactory, $localStorage) {
  $scope.storage = $localStorage;

  GameFactory.getGamesByUserId(2).then(function (userGames) {
    $scope.userGames = userGames;
  });

  $scope.greeting = "hello";
});

app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'js/login/login.html',
    controller: 'LoginCtrl'
  });

  //var user = $localStorage.user
  // $urlRouterProvider.otherwise(($injector, $location) => {
  // 	return user ? '/games' : '/login'
  // })


  // $urlRouterProvider.otherwise(($injector, $location) => {
  // 	var user = true;
  // 	return user ? '/' : '/login'
  // })

  $urlRouterProvider.otherwise('/login');
});

app.controller('LoginCtrl', function ($scope, $state, LoginFactory, UserFactory, $cordovaOauth, $localStorage, $timeout, $ionicSideMenuDelegate) {
  $scope.loginWithSlack = function () {
    return LoginFactory.getSlackCreds().then(function (creds) {
      return $cordovaOauth.slack(creds.clientID, creds.clientSecret, ['identity.basic', 'identity.team', 'identity.avatar']);
    }).then(function (info) {
      return UserFactory.setUser(info);
    }).then(function () {
      return $state.go('home');
    });
  };

  $ionicSideMenuDelegate.canDragContent(false);

  $scope.$on('$ionicView.leave', function () {
    $ionicSideMenuDelegate.canDragContent(true);
  });

  $scope.storage = $localStorage;

  function redirectUser() {
    console.log("scope storage user", $scope.storage.user);
    if ($scope.storage.user) $state.go('home');
  }

  redirectUser();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImFjdGl2ZS1nYW1lL2FjdGl2ZS1nYW1lLmpzIiwiY2FyZHMtdGVzdC9jYXJkc1Rlc3QuanMiLCJkZWNrcy9kZWNrcy5qcyIsImZyb20gZnNnL2Zyb20tZnNnLmpzIiwiZ2FtZS9nYW1lLmpzIiwiaG9tZS9ob21lLmpzIiwibG9naW4vbG9naW4uanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiLCJjb21tb24vZmFjdG9yaWVzL0dhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9sb2dpbkZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yaWVzL3VzZXJGYWN0b3J5LmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImFwcCIsImFuZ3VsYXIiLCJtb2R1bGUiLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZUxpZ2h0Q29udGVudCIsImNvbnRyb2xsZXIiLCIkc2NvcGUiLCJVc2VyRmFjdG9yeSIsIiRzdGF0ZSIsIiRsb2NhbFN0b3JhZ2UiLCIkdGltZW91dCIsImxvZ091dCIsImdvIiwiY29uZmlnIiwiJHN0YXRlUHJvdmlkZXIiLCJzdGF0ZSIsInVybCIsInRlbXBsYXRlVXJsIiwicmVzb2x2ZSIsImdhbWUiLCJHYW1lRmFjdG9yeSIsIiRzdGF0ZVBhcmFtcyIsImdldEdhbWVCeUdhbWVJZCIsImdhbWVJZCIsImdyZWV0aW5nIiwiZGVja3MiLCJnZXREZWNrc0J5VGVhbUlkIiwic3RhdGVQYXJhbXMiLCJ0ZWFtSWQiLCJ0ZWFtR2FtZXMiLCJnZXRHYW1lc0J5VGVhbUlkIiwic3RhcnROZXdHYW1lIiwiJG9uIiwiZXZlbnQiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsIiRkaWdlc3QiLCJnYW1lcyIsIiR1cmxSb3V0ZXJQcm92aWRlciIsIiRjb3Jkb3ZhT2F1dGgiLCJzdG9yYWdlIiwiZ2V0R2FtZXNCeVVzZXJJZCIsInRoZW4iLCJ1c2VyR2FtZXMiLCJvdGhlcndpc2UiLCJMb2dpbkZhY3RvcnkiLCIkaW9uaWNTaWRlTWVudURlbGVnYXRlIiwibG9naW5XaXRoU2xhY2siLCJnZXRTbGFja0NyZWRzIiwic2xhY2siLCJjcmVkcyIsImNsaWVudElEIiwiY2xpZW50U2VjcmV0Iiwic2V0VXNlciIsImluZm8iLCJjYW5EcmFnQ29udGVudCIsInJlZGlyZWN0VXNlciIsInVzZXIiLCJmYWN0b3J5IiwiJGh0dHAiLCIkcm9vdFNjb3BlIiwiaW5pdGlhbGl6ZUZpcmViYXNlIiwiYXBpS2V5IiwiYXV0aERvbWFpbiIsImRhdGFiYXNlVVJMIiwic3RvcmFnZUJ1Y2tldCIsIm1lc3NhZ2luZ1NlbmRlcklkIiwiZmlyZWJhc2UiLCJpbml0aWFsaXplQXBwIiwiYWRkVXNlciIsImdhbWVOYW1lIiwidGVhbU5hbWUiLCJwb3N0IiwibmFtZSIsImNyZWF0b3JJZCIsInJlcyIsInJlZmYiLCJkYXRhYmFzZSIsInJlZiIsIm9uIiwic25hcHNob3QiLCJ2YWwiLCIkYnJvYWRjYXN0Iiwiam9pbkdhbWVCeUlkIiwicGxheWVySWQiLCJjcmVhdGVHYW1lQnlJZEZpcmVCYXNlIiwiZmlyZWJhc2VnYW1lSWQiLCJuZXdSZWYiLCJwdXNoIiwic2V0IiwicmVxIiwicXVlcnkiLCJnZXQiLCJ0aGUiLCJnZXRDYXJkc0J5Q3JlYXRvciIsInVzZXJJZCIsImdldFVzZXJzQnlHYW1lSWQiLCJnYW1lc1JlZiIsIm9uY2UiLCJ0ZWFtIiwiaWQiLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0TG9jYWxTdG9yYWdlIiwiZ2V0U2xhY2tJbmZvIiwiJHJlc2V0Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBQSxPQUFBQyxHQUFBLEdBQUFDLFFBQUFDLE1BQUEsQ0FBQSxzQkFBQSxFQUFBLENBQUEsT0FBQSxFQUFBLFdBQUEsRUFBQSxXQUFBLEVBQUEsZ0JB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RixvQkFBQWlHLE1BQUE7QUFDQTtBQTFCQSxHQUFBO0FBNEJBLENBOUJBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJb25pYyBTdGFydGVyIEFwcFxuXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xuLy8gJ3N0YXJ0ZXInIGlzIHRoZSBuYW1lIG9mIHRoaXMgYW5ndWxhciBtb2R1bGUgZXhhbXBsZSAoYWxzbyBzZXQgaW4gYSA8Ym9keT4gYXR0cmlidXRlIGluIGluZGV4Lmh0bWwpXG4vLyB0aGUgMm5kIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiAncmVxdWlyZXMnXG53aW5kb3cuYXBwID0gYW5ndWxhci5tb2R1bGUoJ0JsYW5rQWdhaW5zdEh1bWFuaXR5JywgWydpb25pYycsICd1aS5yb3V0ZXInLCduZ0NvcmRvdmEnLCduZ0NvcmRvdmFPYXV0aCcsICduZ1N0b3JhZ2UnXSlcblxuYXBwLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxuICAgICAgICAgICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcblxuICAgICAgICAgICAgLy8gRG9uJ3QgcmVtb3ZlIHRoaXMgbGluZSB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nLiBJdCBzdG9wcyB0aGUgdmlld3BvcnRcbiAgICAgICAgICAgIC8vIGZyb20gc25hcHBpbmcgd2hlbiB0ZXh0IGlucHV0cyBhcmUgZm9jdXNlZC4gSW9uaWMgaGFuZGxlcyB0aGlzIGludGVybmFsbHkgZm9yXG4gICAgICAgICAgICAvLyBhIG11Y2ggbmljZXIga2V5Ym9hcmQgZXhwZXJpZW5jZS5cbiAgICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5kaXNhYmxlU2Nyb2xsKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICAgICAgICBTdGF0dXNCYXIuc3R5bGVMaWdodENvbnRlbnQoKVxuICAgICAgICB9XG4gICAgfSk7XG5cbn0pXG4iLCJhcHAuY29udHJvbGxlcignTG9nb3V0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgVXNlckZhY3RvcnksICRzdGF0ZSwgJGxvY2FsU3RvcmFnZSwgJHRpbWVvdXQpe1xuXHQkc2NvcGUubG9nT3V0ID0gZnVuY3Rpb24oKXtcblx0XHRVc2VyRmFjdG9yeS5sb2dPdXQoKVxuXHRcdCRzdGF0ZS5nbygnbG9naW4nKVxuXHR9XG59KSIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdhY3RpdmUtZ2FtZScsIHtcblx0XHR1cmw6ICcvZ2FtZS86Z2FtZUlkJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2FjdGl2ZS1nYW1lL2FjdGl2ZS1nYW1lLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdBY3RpdmVHYW1lQ3RybCcsXG5cdFx0cmVzb2x2ZToge1xuXHRcdFx0Z2FtZTogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldEdhbWVCeUdhbWVJZCgkc3RhdGVQYXJhbXMuZ2FtZUlkKVxuXHRcdH1cblx0fSlcblxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0FjdGl2ZUdhbWVDdHJsJywgKCRzY29wZSwgZ2FtZSkgPT4ge1xuXG5cdCRzY29wZS5nYW1lID0gZ2FtZTtcblx0XG59KSIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpe1xuXHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnY2FyZHMnLCB7XG5cdFx0dXJsOiAnL2NhcmRzJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2NhcmRzLXRlc3QvY2FyZHMtdGVzdC5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnQ2FyZHNUZXN0Q3RybCdcblx0fSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdDYXJkc1Rlc3RDdHJsJywgZnVuY3Rpb24oJHNjb3BlKXtcbiBcdCRzY29wZS5ncmVldGluZyA9IFwiSElcIlxufSkiLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlcikgPT4ge1xuXHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnZGVja3MnLCB7XG5cdFx0dXJsOiAnZGVja3MvOnRlYW1pZCcsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9kZWNrcy9kZWNrcy5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnRGVja0N0cmwnLFxuXHRcdHJlc29sdmU6IHtcblx0XHRcdGRlY2tzOiAoR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcykgPT4gR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZChzdGF0ZVBhcmFtcy50ZWFtSWQpXG5cdFx0fVxuXHR9KVxuXG59KVxuXG5hcHAuY29udHJvbGxlcignRGVja0N0cmwnLCAoJHNjb3BlKSA9PiB7XG5cblxuXHRcbn0pIiwiLy8gKGZ1bmN0aW9uICgpIHtcblxuLy8gICAgICd1c2Ugc3RyaWN0JztcblxuLy8gICAgIC8vIEhvcGUgeW91IGRpZG4ndCBmb3JnZXQgQW5ndWxhciEgRHVoLWRveS5cbi8vICAgICBpZiAoIXdpbmRvdy5hbmd1bGFyKSB0aHJvdyBuZXcgRXJyb3IoJ0kgY2FuXFwndCBmaW5kIEFuZ3VsYXIhJyk7XG5cbi8vICAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2ZzYVByZUJ1aWx0JywgW10pO1xuXG4vLyAgICAgYXBwLmZhY3RvcnkoJ1NvY2tldCcsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgaWYgKCF3aW5kb3cuaW8pIHRocm93IG5ldyBFcnJvcignc29ja2V0LmlvIG5vdCBmb3VuZCEnKTtcbi8vICAgICAgICAgcmV0dXJuIHdpbmRvdy5pbyh3aW5kb3cubG9jYXRpb24ub3JpZ2luKTtcbi8vICAgICB9KTtcblxuLy8gICAgIC8vIEFVVEhfRVZFTlRTIGlzIHVzZWQgdGhyb3VnaG91dCBvdXIgYXBwIHRvXG4vLyAgICAgLy8gYnJvYWRjYXN0IGFuZCBsaXN0ZW4gZnJvbSBhbmQgdG8gdGhlICRyb290U2NvcGVcbi8vICAgICAvLyBmb3IgaW1wb3J0YW50IGV2ZW50cyBhYm91dCBhdXRoZW50aWNhdGlvbiBmbG93LlxuLy8gICAgIGFwcC5jb25zdGFudCgnQVVUSF9FVkVOVFMnLCB7XG4vLyAgICAgICAgIGxvZ2luU3VjY2VzczogJ2F1dGgtbG9naW4tc3VjY2VzcycsXG4vLyAgICAgICAgIGxvZ2luRmFpbGVkOiAnYXV0aC1sb2dpbi1mYWlsZWQnLFxuLy8gICAgICAgICBsb2dvdXRTdWNjZXNzOiAnYXV0aC1sb2dvdXQtc3VjY2VzcycsXG4vLyAgICAgICAgIHNlc3Npb25UaW1lb3V0OiAnYXV0aC1zZXNzaW9uLXRpbWVvdXQnLFxuLy8gICAgICAgICBub3RBdXRoZW50aWNhdGVkOiAnYXV0aC1ub3QtYXV0aGVudGljYXRlZCcsXG4vLyAgICAgICAgIG5vdEF1dGhvcml6ZWQ6ICdhdXRoLW5vdC1hdXRob3JpemVkJ1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLmZhY3RvcnkoJ0F1dGhJbnRlcmNlcHRvcicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkcSwgQVVUSF9FVkVOVFMpIHtcbi8vICAgICAgICAgdmFyIHN0YXR1c0RpY3QgPSB7XG4vLyAgICAgICAgICAgICA0MDE6IEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsXG4vLyAgICAgICAgICAgICA0MDM6IEFVVEhfRVZFTlRTLm5vdEF1dGhvcml6ZWQsXG4vLyAgICAgICAgICAgICA0MTk6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0LFxuLy8gICAgICAgICAgICAgNDQwOiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dFxuLy8gICAgICAgICB9O1xuLy8gICAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAgICAgcmVzcG9uc2VFcnJvcjogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KHN0YXR1c0RpY3RbcmVzcG9uc2Uuc3RhdHVzXSwgcmVzcG9uc2UpO1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzcG9uc2UpXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH07XG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuY29uZmlnKGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XG4vLyAgICAgICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goW1xuLy8gICAgICAgICAgICAgJyRpbmplY3RvcicsXG4vLyAgICAgICAgICAgICBmdW5jdGlvbiAoJGluamVjdG9yKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRpbmplY3Rvci5nZXQoJ0F1dGhJbnRlcmNlcHRvcicpO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICBdKTtcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5zZXJ2aWNlKCdBdXRoU2VydmljZScsIGZ1bmN0aW9uICgkaHR0cCwgU2Vzc2lvbiwgJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMsICRxKSB7XG5cbi8vICAgICAgICAgZnVuY3Rpb24gb25TdWNjZXNzZnVsTG9naW4ocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgIHZhciB1c2VyID0gcmVzcG9uc2UuZGF0YS51c2VyO1xuLy8gICAgICAgICAgICAgU2Vzc2lvbi5jcmVhdGUodXNlcik7XG4vLyAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoQVVUSF9FVkVOVFMubG9naW5TdWNjZXNzKTtcbi8vICAgICAgICAgICAgIHJldHVybiB1c2VyO1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgLy8gVXNlcyB0aGUgc2Vzc2lvbiBmYWN0b3J5IHRvIHNlZSBpZiBhblxuLy8gICAgICAgICAvLyBhdXRoZW50aWNhdGVkIHVzZXIgaXMgY3VycmVudGx5IHJlZ2lzdGVyZWQuXG4vLyAgICAgICAgIHRoaXMuaXNBdXRoZW50aWNhdGVkID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuICEhU2Vzc2lvbi51c2VyO1xuLy8gICAgICAgICB9O1xuXG4gICAgICAgIFxuLy8gICAgICAgICB0aGlzLmlzQWRtaW4gPSBmdW5jdGlvbih1c2VySWQpe1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ3J1bm5pbmcgYWRtaW4gZnVuYycpXG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpXG4vLyAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhLnVzZXIuaXNBZG1pbilcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIHRoaXMuZ2V0TG9nZ2VkSW5Vc2VyID0gZnVuY3Rpb24gKGZyb21TZXJ2ZXIpIHtcblxuLy8gICAgICAgICAgICAgLy8gSWYgYW4gYXV0aGVudGljYXRlZCBzZXNzaW9uIGV4aXN0cywgd2Vcbi8vICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgdXNlciBhdHRhY2hlZCB0byB0aGF0IHNlc3Npb25cbi8vICAgICAgICAgICAgIC8vIHdpdGggYSBwcm9taXNlLiBUaGlzIGVuc3VyZXMgdGhhdCB3ZSBjYW5cbi8vICAgICAgICAgICAgIC8vIGFsd2F5cyBpbnRlcmZhY2Ugd2l0aCB0aGlzIG1ldGhvZCBhc3luY2hyb25vdXNseS5cblxuLy8gICAgICAgICAgICAgLy8gT3B0aW9uYWxseSwgaWYgdHJ1ZSBpcyBnaXZlbiBhcyB0aGUgZnJvbVNlcnZlciBwYXJhbWV0ZXIsXG4vLyAgICAgICAgICAgICAvLyB0aGVuIHRoaXMgY2FjaGVkIHZhbHVlIHdpbGwgbm90IGJlIHVzZWQuXG5cbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlzQXV0aGVudGljYXRlZCgpICYmIGZyb21TZXJ2ZXIgIT09IHRydWUpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbihTZXNzaW9uLnVzZXIpO1xuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICAvLyBNYWtlIHJlcXVlc3QgR0VUIC9zZXNzaW9uLlxuLy8gICAgICAgICAgICAgLy8gSWYgaXQgcmV0dXJucyBhIHVzZXIsIGNhbGwgb25TdWNjZXNzZnVsTG9naW4gd2l0aCB0aGUgcmVzcG9uc2UuXG4vLyAgICAgICAgICAgICAvLyBJZiBpdCByZXR1cm5zIGEgNDAxIHJlc3BvbnNlLCB3ZSBjYXRjaCBpdCBhbmQgaW5zdGVhZCByZXNvbHZlIHRvIG51bGwuXG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbi8vICAgICAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5sb2dpbiA9IGZ1bmN0aW9uIChjcmVkZW50aWFscykge1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9sb2dpbicsIGNyZWRlbnRpYWxzKVxuLy8gICAgICAgICAgICAgICAgIC50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKVxuLy8gICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QoeyBtZXNzYWdlOiAnSW52YWxpZCBsb2dpbiBjcmVkZW50aWFscy4nfSk7XG4vLyAgICAgICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5zaWdudXAgPSBmdW5jdGlvbihjcmVkZW50aWFscyl7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuLy8gICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuLy8gICAgICAgICAgICAgICAgIHVybDogJy9zaWdudXAnLFxuLy8gICAgICAgICAgICAgICAgIGRhdGE6IGNyZWRlbnRpYWxzXG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5kYXRhKVxuLy8gICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKCl7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCh7bWVzc2FnZTogJ1RoYXQgZW1haWwgaXMgYWxyZWFkeSBiZWluZyB1c2VkLid9KTtcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5sb2dvdXQgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvbG9nb3V0JykudGhlbihmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgU2Vzc2lvbi5kZXN0cm95KCk7XG4vLyAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ291dFN1Y2Nlc3MpO1xuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5zZXJ2aWNlKCdTZXNzaW9uJywgZnVuY3Rpb24gKCRyb290U2NvcGUsIEFVVEhfRVZFTlRTKSB7XG5cbi8vICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4vLyAgICAgICAgICRyb290U2NvcGUuJG9uKEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCwgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgc2VsZi5kZXN0cm95KCk7XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XG5cbi8vICAgICAgICAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbiAodXNlcikge1xuLy8gICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgfSk7XG5cbi8vIH0oKSk7XG4iLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlcikgPT4ge1xuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdnYW1lJywge1xuICAgICAgICB1cmw6ICcvZ2FtZXMvOnRlYW1JZCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvZ2FtZS9nYW1lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnR2FtZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICB0ZWFtR2FtZXM6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VGVhbUlkKCRzdGF0ZVBhcmFtcy50ZWFtSWQpIC8vc3RhdGVQYXJhbXMudGVhbUlkXG4gICAgICAgIH1cbiAgICB9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0dhbWVDdHJsJywgKCRzY29wZSwgR2FtZUZhY3RvcnksIHRlYW1HYW1lcykgPT4ge1xuICAgICRzY29wZS5zdGFydE5ld0dhbWUgPSBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWU7XG4gICAgJHNjb3BlLiRvbignY2hhbmdlZEdhbWUnLCAoZXZlbnQsIGRhdGEpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlY2VpdmVkIGV2ZW50JylcbiAgICAgICAgY29uc29sZS5sb2coJ2RhdGEgb2JqOicsIGRhdGEpXG4gICAgICAgICRzY29wZS5nYW1lID0gZGF0YTtcbiAgICAgICAgJHNjb3BlLiRkaWdlc3QoKVxuXG4gICAgfSlcbiAgICAkc2NvcGUuZ2FtZXMgPSB0ZWFtR2FtZXM7XG4gICAgY29uc29sZS5sb2coJ3RlYW1nYW1lcyAnLCB0ZWFtR2FtZXMpXG59KVxuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKXtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2hvbWUnLCB7XG5cdFx0dXJsOiAnLycsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9ob21lL2hvbWUuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0hvbWVDdHJsJyxcblx0XHQvLyBvbkVudGVyOiBmdW5jdGlvbigkc3RhdGUsICRsb2NhbFN0b3JhZ2Upe1xuXHRcdC8vIFx0aWYgKCFsb2NhbFN0b3JhZ2UudXNlcil7XG5cdFx0Ly8gXHRcdCRzdGF0ZS5nbygnbG9naW4nKTtcblx0XHQvLyBcdH1cblx0XHQvLyB9XG5cdH0pXG5cblx0Ly8gJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUsICRjb3Jkb3ZhT2F1dGgsIFVzZXJGYWN0b3J5LCBHYW1lRmFjdG9yeSwgJGxvY2FsU3RvcmFnZSl7XG5cdCRzY29wZS5zdG9yYWdlID0gJGxvY2FsU3RvcmFnZVxuXHRcblx0R2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVVzZXJJZCgyKVxuXHRcdC50aGVuKHVzZXJHYW1lcyA9PiB7ICRzY29wZS51c2VyR2FtZXMgPSB1c2VyR2FtZXMgfSlcblxuXHQkc2NvcGUuZ3JlZXRpbmcgPSBcImhlbGxvXCI7XG59KVxuXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpe1xuXHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnbG9naW4nLCB7XG5cdFx0dXJsOiAnL2xvZ2luJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2xvZ2luL2xvZ2luLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdMb2dpbkN0cmwnXG5cdH0pXG5cblxuXHQvL3ZhciB1c2VyID0gJGxvY2FsU3RvcmFnZS51c2VyXG5cdC8vICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoKCRpbmplY3RvciwgJGxvY2F0aW9uKSA9PiB7XG5cdC8vIFx0cmV0dXJuIHVzZXIgPyAnL2dhbWVzJyA6ICcvbG9naW4nXG5cdC8vIH0pXG5cblxuXHQvLyAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCgkaW5qZWN0b3IsICRsb2NhdGlvbikgPT4ge1xuXHQvLyBcdHZhciB1c2VyID0gdHJ1ZTtcblx0Ly8gXHRyZXR1cm4gdXNlciA/ICcvJyA6ICcvbG9naW4nXG5cdC8vIH0pXG5cblx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2xvZ2luJyk7XG59KVxuXG5hcHAuY29udHJvbGxlcignTG9naW5DdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUsIExvZ2luRmFjdG9yeSwgVXNlckZhY3RvcnksICRjb3Jkb3ZhT2F1dGgsICRsb2NhbFN0b3JhZ2UsICR0aW1lb3V0LCAkaW9uaWNTaWRlTWVudURlbGVnYXRlKXtcbiBcdCRzY29wZS5sb2dpbldpdGhTbGFjayA9IGZ1bmN0aW9uKCl7XG4gXHRcdHJldHVybiBMb2dpbkZhY3RvcnkuZ2V0U2xhY2tDcmVkcygpXG4gXHRcdC50aGVuKGNyZWRzID0+e1xuIFx0XHRcdHJldHVybiAkY29yZG92YU9hdXRoLnNsYWNrKGNyZWRzLmNsaWVudElELCBjcmVkcy5jbGllbnRTZWNyZXQsIFsnaWRlbnRpdHkuYmFzaWMnLCAnaWRlbnRpdHkudGVhbScsICdpZGVudGl0eS5hdmF0YXInXSlcbiBcdFx0fSlcbiBcdFx0LnRoZW4oaW5mbyA9PiBVc2VyRmFjdG9yeS5zZXRVc2VyKGluZm8pKVxuIFx0XHQudGhlbigoKSA9PiAkc3RhdGUuZ28oJ2hvbWUnKSlcbiBcdH1cblxuIFx0JGlvbmljU2lkZU1lbnVEZWxlZ2F0ZS5jYW5EcmFnQ29udGVudChmYWxzZSk7XG5cbiBcdCRzY29wZS4kb24oJyRpb25pY1ZpZXcubGVhdmUnLCBmdW5jdGlvbiAoKSB7ICRpb25pY1NpZGVNZW51RGVsZWdhdGUuY2FuRHJhZ0NvbnRlbnQodHJ1ZSkgfSk7XG5cbiBcdCRzY29wZS5zdG9yYWdlID0gJGxvY2FsU3RvcmFnZVxuXG4gXHRmdW5jdGlvbiByZWRpcmVjdFVzZXIoKXtcbiBcdFx0Y29uc29sZS5sb2coXCJzY29wZSBzdG9yYWdlIHVzZXJcIiwgJHNjb3BlLnN0b3JhZ2UudXNlcilcbiBcdFx0aWYgKCRzY29wZS5zdG9yYWdlLnVzZXIpICRzdGF0ZS5nbygnaG9tZScpXG4gXHR9XG5cblx0cmVkaXJlY3RVc2VyKCk7XG59KSIsIi8vRGlyZWN0aXZlIEZpbGUiLCJhcHAuZmFjdG9yeSgnR2FtZUZhY3RvcnknLCAoJGh0dHAsICRyb290U2NvcGUpID0+IHtcbiAgICBjb25zdCBHYW1lRmFjdG9yeSA9IHt9O1xuXG4gICAgY29uc3QgaW5pdGlhbGl6ZUZpcmViYXNlID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgICAgICBhcGlLZXk6IFwiQUl6YVN5RC10RGV2WHZpcHl1RTVsemhlV0FScTRodXUxVW1xb0prXCIsXG4gICAgICAgICAgICBhdXRoRG9tYWluOiBcImNhcHN0b25lLWZiMGU4LmZpcmViYXNlYXBwLmNvbVwiLFxuICAgICAgICAgICAgZGF0YWJhc2VVUkw6IFwiaHR0cHM6Ly9jYXBzdG9uZS1mYjBlOC5maXJlYmFzZWlvLmNvbVwiLFxuICAgICAgICAgICAgc3RvcmFnZUJ1Y2tldDogXCJjYXBzdG9uZS1mYjBlOC5hcHBzcG90LmNvbVwiLFxuICAgICAgICAgICAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiODQ5ODM5NjgwMTA3XCJcbiAgICAgICAgfTtcbiAgICAgICAgZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChjb25maWcpO1xuICAgIH07XG4gICAgaW5pdGlhbGl6ZUZpcmViYXNlKCk7XG5cblxuICAgIEdhbWVGYWN0b3J5LmFkZFVzZXIgPSAoKSA9PiB7XG5cbiAgICB9O1xuXG4gICAgR2FtZUZhY3Rvcnkuc3RhcnROZXdHYW1lID0gKGdhbWVOYW1lLCB0ZWFtTmFtZSkgPT4ge1xuICAgICAgICAvL3JldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJykudGhlbih1c2VySWQgPT4ge1xuICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9nYW1lcycsIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBnYW1lTmFtZSB8fCAnQm9yaW5nIE5hbWUnLFxuICAgICAgICAgICAgICAgIHRlYW1JZDogdGVhbUlkIHx8IDIsXG4gICAgICAgICAgICAgICAgY3JlYXRvcklkOiAyXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICAgICAgLnRoZW4oZ2FtZUlkID0+IHtcbiAgICAgICAgICAgICAgICAvL2NvbnN0IHJlZmYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgL2dhbWVzL2ApXG4gICAgICAgICAgICAgICAgY29uc3QgcmVmZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGAvZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICAgICAgICByZWZmLm9uKCd2YWx1ZScsIHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc25hcHNob3QudmFsKCkpXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnY2hhbmdlZEdhbWUnLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvL3NldCB1cCB3YXRjaGVyXG4gICAgfTtcblxuXG4gICAgR2FtZUZhY3Rvcnkuam9pbkdhbWVCeUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnam9pbmluZyBnYW1lJylcbiAgICAgICAgICAgIC8vdmFyIHBsYXllcnNUZWFtID0gXG4gICAgICAgIHZhciBnYW1lSWQgPSA4O1xuICAgICAgICB2YXIgcGxheWVySWQgPSAyOyAvL2V2ZW50dWFsbHkgbWFrZSBpdCBnZXQgY3VycmVudCBcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYGh0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZ2FtZXMvJHtnYW1lSWR9P3BsYXllcklkPSR7cGxheWVySWR9YCwge1xuXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLy9cbiAgICBHYW1lRmFjdG9yeS5jcmVhdGVHYW1lQnlJZEZpcmVCYXNlID0gKGZpcmViYXNlZ2FtZUlkKSA9PiB7XG4gICAgICAgIC8vcmV0dXJuICRodHRwLnBvc3QoYGh0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZmlyZWJhc2UvZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgLy9uZWVkcyB0byBiZSAudGhlbmFibGVcbiAgICAgICAgY29uc3QgbmV3UmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYGdhbWVzLyR7ZmlyZWJhc2VnYW1lSWR9YCkucHVzaCgpO1xuICAgICAgICBuZXdSZWYuc2V0KHtcbiAgICAgICAgICAgIHBsYXllcklkOiByZXEucXVlcnkucGxheWVySWRcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cblxuICAgIC8vdnMgZ2V0Q2FyZHNCeVRlYW1JZFxuICAgIEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQgPSAodGVhbUlkKSA9PiB7XG5cbiAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9kZWNrcy8ke3RlYW1JZH1gKVxuICAgICAgICAgICAgLnRoZShyZXMgPT4gcmVzLmRhdGEpXG5cbiAgICB9O1xuXG4gICAgR2FtZUZhY3RvcnkuZ2V0Q2FyZHNCeUNyZWF0b3IgPSAodXNlcklkKSA9PiB7XG5cbiAgICB9XG5cbiAgICBHYW1lRmFjdG9yeS5nZXRVc2Vyc0J5R2FtZUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2dhbWVzLyR7Z2FtZUlkfS91c2Vyc2ApO1xuICAgIH07XG5cblxuICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlVc2VySWQgPSAodXNlcklkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2dhbWVzLz91c2VySWQ9JHt1c2VySWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgIH1cbiAgICAgICAgLy8gLnRoZW4oY3JlYXRlZEdhbWUgPT5cbiAgICAgICAgLy8gICAgIC8vYWRkd2F0Y2hlciB0byBnYW1lIGlkIGluIGZpcmViYXNlKVxuICAgICAgICAvLyAgICAgcmV0dXJuIGNyZWF0ZWRHYW1lXG4gICAgICAgIC8vIH07XG5cblxuXG4gICAgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCA9ICh0ZWFtSWQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RoZSB0ZWFtIGlzIGlkJywgdGVhbUlkKVxuXG4gICAgICAgIGNvbnN0IGdhbWVzUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lc2ApXG4gICAgICAgIHJldHVybiBnYW1lc1JlZi5vbmNlKCd2YWx1ZScpLnRoZW4oc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGUgdmFsIGlzJywgc25hcHNob3QudmFsKCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNuYXBzaG90LnZhbCgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZ2FtZXM/dGVhbUlkPSR7dGVhbUlkfWApXG4gICAgICAgICAgICAvLyAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICAgICAgLy8udGhlbihmb3VuZEdhbWVzID0+IClcbiAgICB9O1xuXG4gICAgR2FtZUZhY3RvcnkuZ2V0R2FtZUJ5R2FtZUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICBjb25zdCB0ZWFtSWQgPSAkbG9jYWxTdG9yYWdlLnRlYW0uaWRcbiAgICAgICAgY29uc3QgZ2FtZXNSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgIHJldHVybiBnYW1lc1JlZi5vbmNlKCd2YWx1ZScpLnRoZW4oc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHNuYXBzaG90LnZhbCgpO1xuICAgICAgICB9KVxuICAgIH1cblxuXG5cblxuICAgIC8vZ2V0IGFsbCBnYW1lcyBieSB0ZWFtIHJvdXRlXG5cbiAgICByZXR1cm4gR2FtZUZhY3Rvcnk7XG59KTtcblxuXG5cbi8vIGltcGxlbWVudCBqb2luaW5nIGEgZ2FtZSB1c2luZyAvIHNlc3Npb24gJGh0dHAgcmVxdWVzdCBpbiBhbiBhbmd1bGFyIGZhY3RvcnkgY2FsbGVkIEdhbWVGYWN0b3J5IHRoYXQgaGl0cyB0aGUgcm91dGUgLyBhcGkgLyBnYW1lcyAvIOKApi4uZnVuY3Rpb24gam9pbkdhbWVCeUlkKGdhbWVJZCkge1xuLy8gICAgIGNvbnN0IHVzZXIgPSBnZXRMb2dnZWRJblVzZXIoKSAvL2Fzc3VtZXMsIGNvdWxkIGxhdGVyIGJlIG9wdGlvbmFsIGluIGFkbWluIHBhbmVsXG4vLyAgICAgZ2V0TE9nZ2VkSW5VU2VyKCkudGhlbihsb2dnZWRVU2VyID0+IHtcbi8vICAgICAgICAgZG9u4oCZIHQgbmVlZCBnYW1lLmZpbmRieSBpZCwgY2FuIGp1c3QgZG8gZmIgcGFydCBvZiBnYW1lcnMgaW5kZXBlbmRlbnRseSAvL0dhbWUuZmluZEJ5SWQoZ2FtZUlkICkudGhlbihmb3VuZEdhbWUgPT4gbGV0IGdhbWVSZWYgPSBmYi5kYi5yZWYo4oCYLyAgICAgICAgIGdhbWVz4oCZK2ZvdW5kR2FtZS5pZCkpXG4vLyAgICAgfSlcbi8vIH1cbi8vIHNpZ24gaW4gYnV0dG9uXG4iLCJhcHAuZmFjdG9yeSgnTG9naW5GYWN0b3J5JywgZnVuY3Rpb24oJGh0dHApe1xuXHRyZXR1cm4ge1xuXHRcdGdldFNsYWNrQ3JlZHM6IGZ1bmN0aW9uKCl7XG5cdFx0XHRyZXR1cm4gJGh0dHAuZ2V0KCdodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL3NsYWNrJylcdFxuXHRcdFx0XHQudGhlbihyZXMgPT4ge1xuXHRcdFx0XHRcdHJldHVybiByZXMuZGF0YVxuXHRcdFx0XHR9KVxuXHRcdH1cblx0fVxufSlcbiIsImFwcC5mYWN0b3J5KCdVc2VyRmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCwgJHN0YXRlKXtcblx0XG5cdHJldHVybiB7XG5cdFx0c2V0VXNlcjogZnVuY3Rpb24oaW5mbyl7XG5cdFx0XHRyZXR1cm4gJGh0dHAoe1xuXHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdFx0dXJsOiAnaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS91c2VycycsXG5cdFx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRhdGE6IGluZm9cblx0XHRcdH0pXG5cdFx0XHQudGhlbihyZXMgPT4ge1xuXHRcdFx0XHR0aGlzLnNldExvY2FsU3RvcmFnZShyZXMuZGF0YS51c2VyWzBdLCByZXMuZGF0YS50ZWFtWzBdKTtcblx0XHRcdH0pXG5cdFx0fSxcblxuXHRcdGdldFNsYWNrSW5mbzogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiAkaHR0cC5nZXQoJ2h0dHBzOi8vc2xhY2suY29tL2FwaS91c2Vycy5pZGVudGl0eScpXG5cdFx0fSxcblxuXHRcdHNldExvY2FsU3RvcmFnZTogZnVuY3Rpb24odXNlciwgdGVhbSl7XG5cdFx0XHQkbG9jYWxTdG9yYWdlLnVzZXIgPSB1c2VyO1xuXHRcdFx0JGxvY2FsU3RvcmFnZS50ZWFtID0gdGVhbTtcblx0XHR9LFxuXG5cdFx0bG9nT3V0OiBmdW5jdGlvbigpe1xuXHRcdFx0JGxvY2FsU3RvcmFnZS4kcmVzZXQoKTtcblx0XHR9XG5cdH1cbn0pIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
