'use strict';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
window.app = angular.module('BlankAgainstHumanity', ['ionic', 'ui.router', 'ngCordova', 'ngCordovaOauth']);

console.log("APP", app);
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

app.controller('HomeCtrl', function ($scope, $state, $cordovaOauth, GameFactory) {

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

// https://slack.com/oauth/authorize?scope=identity.basic
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImRlY2tzL2RlY2tzLmpzIiwiZnJvbSBmc2cvZnJvbS1mc2cuanMiLCJnYW1lL2dhbWUuanMiLCJob21lL2hvbWUuanMiLCJsb2dpbi9sb2dpbi5qcyIsImNvbW1vbi9kaXJlY3RpdmVzL2RpcmVjdGl2ZS5qcyIsImNvbW1vbi9mYWN0b3JpZXMvR2FtZUZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yaWVzL2ZhY3RvcnkuanMiXSwibmFtZXMiOlsid2luZG93IiwiYXBwIiwiYW5ndWxhciIsIm1vZHVsZSIsImNvbnNvbGUiLCJsb2ciLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZURlZmF1bHQiLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsInN0YXRlIiwidXJsIiwidGVtcGxhdGVVcmwiLCJjb250cm9sbGVyIiwicmVzb2x2ZSIsImRlY2tzIiwiR2FtZUZhY3RvcnkiLCIkc3RhdGVQYXJhbXMiLCJnZXREZWNrc0J5VGVhbUlkIiwic3RhdGVQYXJhbXMiLCJ0ZWFtSWQiLCIkc2NvcGUiLCJ0ZWFtR2FtZXMiLCJnZXRHYW1lc0J5VGVhbUlkIiwic3RhcnROZXdHYW1lIiwiJG9uIiwiZXZlbnQiLCJkYXRhIiwiZ2FtZSIsIiRkaWdlc3QiLCJnYW1lcyIsIiRzdGF0ZSIsIiRjb3Jkb3ZhT2F1dGgiLCJnZXRHYW1lc0J5VXNlcklkIiwidGhlbiIsInVzZXJHYW1lcyIsImdyZWV0aW5nIiwiTG9naW5GYWN0b3J5IiwibG9naW5XaXRoU2xhY2siLCJnZXRTbGFja0NyZWRzIiwic2xhY2siLCJjcmVkcyIsImNsaWVudElEIiwiY2xpZW50U2VjcmV0IiwiZ28iLCJmYWN0b3J5IiwiJGh0dHAiLCIkcm9vdFNjb3BlIiwiaW5pdGlhbGl6ZUZpcmViYXNlIiwiYXBpS2V5IiwiYXV0aERvbWFpbiIsImRhdGFiYXNlVVJMIiwic3RvcmFnZUJ1Y2tldCIsIm1lc3NhZ2luZ1NlbmRlcklkIiwiZmlyZWJhc2UiLCJpbml0aWFsaXplQXBwIiwiYWRkVXNlciIsImdhbWVOYW1lIiwidGVhbU5hbWUiLCJwb3N0IiwibmFtZSIsImNyZWF0b3JJZCIsInJlcyIsInJlZmYiLCJkYXRhYmFzZSIsInJlZiIsImdhbWVJZCIsIm9uIiwic25hcHNob3QiLCJ2YWwiLCIkYnJvYWRjYXN0Iiwiam9pbkdhbWVCeUlkIiwicGxheWVySWQiLCJjcmVhdGVHYW1lQnlJZEZpcmVCYXNlIiwiZmlyZWJhc2VnYW1lSWQiLCJuZXdSZWYiLCJwdXNoIiwic2V0IiwicmVxIiwicXVlcnkiLCJnZXQiLCJ0aGUiLCJnZXRDYXJkc0J5Q3JlYXRvciIsInVzZXJJZCIsImdldFVzZXJzQnlHYW1lSWQiLCJnYW1lc1JlZiIsIm9uY2UiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0FBLE9BQUFDLEdBQUEsR0FBQUMsUUFBQUMsTUFBQSxDQUFBLHNCQUFBLEVBQUEsQ0FBQSxPQUFBLEVBQUEsV0FBQSxFQUFBLFdBQUEsRUFBQSxnQkFBQSxDQUFBLENBQUE7O0FBRUFDLFFBQUFDLEdBQUEsQ0FBQSxLQUFBLEVBQUFKLEdBQUE7QUFDQUEsSUFBQUssR0FBQSxDQUFBLFVBQUFDLGNBQUEsRUFBQTtBQUNBQSxtQkFBQUMsS0FBQSxDQUFBLFlBQUE7QUFDQSxZQUFBUixPQUFBUyxPQUFBLElBQUFULE9BQUFTLE9BQUEsQ0FBQUMsT0FBQSxDQUFBQyxRQUFBLEVBQUE7QUFDQTtBQUNBO0FBQ0FGLG9CQUFBQyxPQUFBLENBQUFDLFFBQUEsQ0FBQUMsd0JBQUEsQ0FBQSxJQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBSCxvQkFBQUMsT0FBQSxDQUFBQyxRQUFBLENBQUFFLGFBQUEsQ0FBQSxJQUFBO0FBQ0E7QUFDQSxZQUFBYixPQUFBYyxTQUFBLEVBQUE7QUFDQUEsc0JBQUFDLFlBQUE7QUFDQTtBQUNBLEtBZEE7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QUNySEF2QixJQUFBb0QsT0FBQSxDQUFBLGNBQUEsRUFBQSxVQUFBQyxLQUFBLEVBQUE7QUFDQSxXQUFBO0FBQ0FQLHVCQUFBLHlCQUFBO0FBQ0EsbUJBQUFPLE1BQUFrQyxHQUFBLENBQUEsaUNBQUEsRUFDQTlDLElBREEsQ0FDQTtBQUFBLHVCQUFBNEIsSUFBQW5DLElBQUE7QUFBQSxhQURBLENBQUE7QUFFQTtBQUpBLEtBQUE7QUFNQSxDQVBBOztBQVVBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJb25pYyBTdGFydGVyIEFwcFxuXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xuLy8gJ3N0YXJ0ZXInIGlzIHRoZSBuYW1lIG9mIHRoaXMgYW5ndWxhciBtb2R1bGUgZXhhbXBsZSAoYWxzbyBzZXQgaW4gYSA8Ym9keT4gYXR0cmlidXRlIGluIGluZGV4Lmh0bWwpXG4vLyB0aGUgMm5kIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiAncmVxdWlyZXMnXG53aW5kb3cuYXBwID0gYW5ndWxhci5tb2R1bGUoJ0JsYW5rQWdhaW5zdEh1bWFuaXR5JywgWydpb25pYycsICd1aS5yb3V0ZXInLCAnbmdDb3Jkb3ZhJywgJ25nQ29yZG92YU9hdXRoJ10pXG5cbmNvbnNvbGUubG9nKFwiQVBQXCIsIGFwcClcbmFwcC5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0pIHtcbiAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgICAgICAgIC8vIEhpZGUgdGhlIGFjY2Vzc29yeSBiYXIgYnkgZGVmYXVsdCAocmVtb3ZlIHRoaXMgdG8gc2hvdyB0aGUgYWNjZXNzb3J5IGJhciBhYm92ZSB0aGUga2V5Ym9hcmRcbiAgICAgICAgICAgIC8vIGZvciBmb3JtIGlucHV0cylcbiAgICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG5cbiAgICAgICAgICAgIC8vIERvbid0IHJlbW92ZSB0aGlzIGxpbmUgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZy4gSXQgc3RvcHMgdGhlIHZpZXdwb3J0XG4gICAgICAgICAgICAvLyBmcm9tIHNuYXBwaW5nIHdoZW4gdGV4dCBpbnB1dHMgYXJlIGZvY3VzZWQuIElvbmljIGhhbmRsZXMgdGhpcyBpbnRlcm5hbGx5IGZvclxuICAgICAgICAgICAgLy8gYSBtdWNoIG5pY2VyIGtleWJvYXJkIGV4cGVyaWVuY2UuXG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2luZG93LlN0YXR1c0Jhcikge1xuICAgICAgICAgICAgU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbn0pXG4iLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlcikgPT4ge1xuXHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnZGVja3MnLCB7XG5cdFx0dXJsOiAnZGVja3MvOnRlYW1pZCcsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9kZWNrcy9kZWNrcy5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnRGVja0N0cmwnLFxuXHRcdHJlc29sdmU6IHtcblx0XHRcdGRlY2tzOiAoR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcykgPT4gR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZChzdGF0ZVBhcmFtcy50ZWFtSWQpXG5cdFx0fVxuXHR9KVxuXG59KVxuXG5hcHAuY29udHJvbGxlcignRGVja0N0cmwnLCAoJHNjb3BlKSA9PiB7XG5cblxuXHRcbn0pIiwiLy8gKGZ1bmN0aW9uICgpIHtcblxuLy8gICAgICd1c2Ugc3RyaWN0JztcblxuLy8gICAgIC8vIEhvcGUgeW91IGRpZG4ndCBmb3JnZXQgQW5ndWxhciEgRHVoLWRveS5cbi8vICAgICBpZiAoIXdpbmRvdy5hbmd1bGFyKSB0aHJvdyBuZXcgRXJyb3IoJ0kgY2FuXFwndCBmaW5kIEFuZ3VsYXIhJyk7XG5cbi8vICAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2ZzYVByZUJ1aWx0JywgW10pO1xuXG4vLyAgICAgYXBwLmZhY3RvcnkoJ1NvY2tldCcsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgaWYgKCF3aW5kb3cuaW8pIHRocm93IG5ldyBFcnJvcignc29ja2V0LmlvIG5vdCBmb3VuZCEnKTtcbi8vICAgICAgICAgcmV0dXJuIHdpbmRvdy5pbyh3aW5kb3cubG9jYXRpb24ub3JpZ2luKTtcbi8vICAgICB9KTtcblxuLy8gICAgIC8vIEFVVEhfRVZFTlRTIGlzIHVzZWQgdGhyb3VnaG91dCBvdXIgYXBwIHRvXG4vLyAgICAgLy8gYnJvYWRjYXN0IGFuZCBsaXN0ZW4gZnJvbSBhbmQgdG8gdGhlICRyb290U2NvcGVcbi8vICAgICAvLyBmb3IgaW1wb3J0YW50IGV2ZW50cyBhYm91dCBhdXRoZW50aWNhdGlvbiBmbG93LlxuLy8gICAgIGFwcC5jb25zdGFudCgnQVVUSF9FVkVOVFMnLCB7XG4vLyAgICAgICAgIGxvZ2luU3VjY2VzczogJ2F1dGgtbG9naW4tc3VjY2VzcycsXG4vLyAgICAgICAgIGxvZ2luRmFpbGVkOiAnYXV0aC1sb2dpbi1mYWlsZWQnLFxuLy8gICAgICAgICBsb2dvdXRTdWNjZXNzOiAnYXV0aC1sb2dvdXQtc3VjY2VzcycsXG4vLyAgICAgICAgIHNlc3Npb25UaW1lb3V0OiAnYXV0aC1zZXNzaW9uLXRpbWVvdXQnLFxuLy8gICAgICAgICBub3RBdXRoZW50aWNhdGVkOiAnYXV0aC1ub3QtYXV0aGVudGljYXRlZCcsXG4vLyAgICAgICAgIG5vdEF1dGhvcml6ZWQ6ICdhdXRoLW5vdC1hdXRob3JpemVkJ1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLmZhY3RvcnkoJ0F1dGhJbnRlcmNlcHRvcicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkcSwgQVVUSF9FVkVOVFMpIHtcbi8vICAgICAgICAgdmFyIHN0YXR1c0RpY3QgPSB7XG4vLyAgICAgICAgICAgICA0MDE6IEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsXG4vLyAgICAgICAgICAgICA0MDM6IEFVVEhfRVZFTlRTLm5vdEF1dGhvcml6ZWQsXG4vLyAgICAgICAgICAgICA0MTk6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0LFxuLy8gICAgICAgICAgICAgNDQwOiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dFxuLy8gICAgICAgICB9O1xuLy8gICAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAgICAgcmVzcG9uc2VFcnJvcjogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KHN0YXR1c0RpY3RbcmVzcG9uc2Uuc3RhdHVzXSwgcmVzcG9uc2UpO1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzcG9uc2UpXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH07XG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuY29uZmlnKGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XG4vLyAgICAgICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goW1xuLy8gICAgICAgICAgICAgJyRpbmplY3RvcicsXG4vLyAgICAgICAgICAgICBmdW5jdGlvbiAoJGluamVjdG9yKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRpbmplY3Rvci5nZXQoJ0F1dGhJbnRlcmNlcHRvcicpO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICBdKTtcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5zZXJ2aWNlKCdBdXRoU2VydmljZScsIGZ1bmN0aW9uICgkaHR0cCwgU2Vzc2lvbiwgJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMsICRxKSB7XG5cbi8vICAgICAgICAgZnVuY3Rpb24gb25TdWNjZXNzZnVsTG9naW4ocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgIHZhciB1c2VyID0gcmVzcG9uc2UuZGF0YS51c2VyO1xuLy8gICAgICAgICAgICAgU2Vzc2lvbi5jcmVhdGUodXNlcik7XG4vLyAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoQVVUSF9FVkVOVFMubG9naW5TdWNjZXNzKTtcbi8vICAgICAgICAgICAgIHJldHVybiB1c2VyO1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgLy8gVXNlcyB0aGUgc2Vzc2lvbiBmYWN0b3J5IHRvIHNlZSBpZiBhblxuLy8gICAgICAgICAvLyBhdXRoZW50aWNhdGVkIHVzZXIgaXMgY3VycmVudGx5IHJlZ2lzdGVyZWQuXG4vLyAgICAgICAgIHRoaXMuaXNBdXRoZW50aWNhdGVkID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuICEhU2Vzc2lvbi51c2VyO1xuLy8gICAgICAgICB9O1xuXG4gICAgICAgIFxuLy8gICAgICAgICB0aGlzLmlzQWRtaW4gPSBmdW5jdGlvbih1c2VySWQpe1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ3J1bm5pbmcgYWRtaW4gZnVuYycpXG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpXG4vLyAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhLnVzZXIuaXNBZG1pbilcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIHRoaXMuZ2V0TG9nZ2VkSW5Vc2VyID0gZnVuY3Rpb24gKGZyb21TZXJ2ZXIpIHtcblxuLy8gICAgICAgICAgICAgLy8gSWYgYW4gYXV0aGVudGljYXRlZCBzZXNzaW9uIGV4aXN0cywgd2Vcbi8vICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgdXNlciBhdHRhY2hlZCB0byB0aGF0IHNlc3Npb25cbi8vICAgICAgICAgICAgIC8vIHdpdGggYSBwcm9taXNlLiBUaGlzIGVuc3VyZXMgdGhhdCB3ZSBjYW5cbi8vICAgICAgICAgICAgIC8vIGFsd2F5cyBpbnRlcmZhY2Ugd2l0aCB0aGlzIG1ldGhvZCBhc3luY2hyb25vdXNseS5cblxuLy8gICAgICAgICAgICAgLy8gT3B0aW9uYWxseSwgaWYgdHJ1ZSBpcyBnaXZlbiBhcyB0aGUgZnJvbVNlcnZlciBwYXJhbWV0ZXIsXG4vLyAgICAgICAgICAgICAvLyB0aGVuIHRoaXMgY2FjaGVkIHZhbHVlIHdpbGwgbm90IGJlIHVzZWQuXG5cbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlzQXV0aGVudGljYXRlZCgpICYmIGZyb21TZXJ2ZXIgIT09IHRydWUpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbihTZXNzaW9uLnVzZXIpO1xuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICAvLyBNYWtlIHJlcXVlc3QgR0VUIC9zZXNzaW9uLlxuLy8gICAgICAgICAgICAgLy8gSWYgaXQgcmV0dXJucyBhIHVzZXIsIGNhbGwgb25TdWNjZXNzZnVsTG9naW4gd2l0aCB0aGUgcmVzcG9uc2UuXG4vLyAgICAgICAgICAgICAvLyBJZiBpdCByZXR1cm5zIGEgNDAxIHJlc3BvbnNlLCB3ZSBjYXRjaCBpdCBhbmQgaW5zdGVhZCByZXNvbHZlIHRvIG51bGwuXG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbi8vICAgICAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5sb2dpbiA9IGZ1bmN0aW9uIChjcmVkZW50aWFscykge1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9sb2dpbicsIGNyZWRlbnRpYWxzKVxuLy8gICAgICAgICAgICAgICAgIC50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKVxuLy8gICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QoeyBtZXNzYWdlOiAnSW52YWxpZCBsb2dpbiBjcmVkZW50aWFscy4nfSk7XG4vLyAgICAgICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5zaWdudXAgPSBmdW5jdGlvbihjcmVkZW50aWFscyl7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuLy8gICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuLy8gICAgICAgICAgICAgICAgIHVybDogJy9zaWdudXAnLFxuLy8gICAgICAgICAgICAgICAgIGRhdGE6IGNyZWRlbnRpYWxzXG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5kYXRhKVxuLy8gICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKCl7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCh7bWVzc2FnZTogJ1RoYXQgZW1haWwgaXMgYWxyZWFkeSBiZWluZyB1c2VkLid9KTtcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5sb2dvdXQgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvbG9nb3V0JykudGhlbihmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgU2Vzc2lvbi5kZXN0cm95KCk7XG4vLyAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ291dFN1Y2Nlc3MpO1xuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5zZXJ2aWNlKCdTZXNzaW9uJywgZnVuY3Rpb24gKCRyb290U2NvcGUsIEFVVEhfRVZFTlRTKSB7XG5cbi8vICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4vLyAgICAgICAgICRyb290U2NvcGUuJG9uKEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCwgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgc2VsZi5kZXN0cm95KCk7XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XG5cbi8vICAgICAgICAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbiAodXNlcikge1xuLy8gICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgfSk7XG5cbi8vIH0oKSk7XG4iLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlcikgPT4ge1xuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdnYW1lJywge1xuICAgICAgICB1cmw6ICcvZ2FtZS86dGVhbUlkJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL2dhbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdHYW1lQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIHRlYW1HYW1lczogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQoJHN0YXRlUGFyYW1zLnRlYW1JZCkgLy9zdGF0ZVBhcmFtcy50ZWFtSWRcbiAgICAgICAgfVxuICAgIH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignR2FtZUN0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgdGVhbUdhbWVzKSA9PiB7XG4gICAgJHNjb3BlLnN0YXJ0TmV3R2FtZSA9IEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZTtcbiAgICAkc2NvcGUuJG9uKCdjaGFuZ2VkR2FtZScsIChldmVudCwgZGF0YSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygncmVjZWl2ZWQgZXZlbnQnKVxuICAgICAgICBjb25zb2xlLmxvZygnZGF0YSBvYmo6JywgZGF0YSlcbiAgICAgICAgJHNjb3BlLmdhbWUgPSBkYXRhO1xuICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpXG5cbiAgICB9KVxuICAgICRzY29wZS5nYW1lcyA9IHRlYW1HYW1lcztcbiAgICBjb25zb2xlLmxvZygndGVhbWdhbWVzICcsIHRlYW1HYW1lcylcbn0pXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKXtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2hvbWUnLCB7XG5cdFx0dXJsOiAnL2hvbWUnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvaG9tZS9ob21lLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdIb21lQ3RybCdcblx0fSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdIb21lQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCAkY29yZG92YU9hdXRoLCBHYW1lRmFjdG9yeSl7XG5cdFxuXHRHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VXNlcklkKDIpXG5cdFx0LnRoZW4odXNlckdhbWVzID0+IHsgJHNjb3BlLnVzZXJHYW1lcyA9IHVzZXJHYW1lcyB9KVxuXG5cdCRzY29wZS5ncmVldGluZyA9IFwiaGVsbG9cIjtcbn0pXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKXtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2xvZ2luJywge1xuXHRcdHVybDogJy9sb2dpbicsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9sb2dpbi9sb2dpbi5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnTG9naW5DdHJsJ1xuXHR9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCBMb2dpbkZhY3RvcnksICRjb3Jkb3ZhT2F1dGgpe1xuIFx0JHNjb3BlLmxvZ2luV2l0aFNsYWNrID0gZnVuY3Rpb24oKXtcbiBcdFx0Y29uc29sZS5sb2coXCJpbSBiZWluZyBjYWxsZWRcIilcbiBcdFx0cmV0dXJuIExvZ2luRmFjdG9yeS5nZXRTbGFja0NyZWRzKClcbiBcdFx0LnRoZW4oY3JlZHMgPT57XG4gXHRcdFx0cmV0dXJuICRjb3Jkb3ZhT2F1dGguc2xhY2soY3JlZHMuY2xpZW50SUQsIGNyZWRzLmNsaWVudFNlY3JldCwgWydjaGFubmVsczpyZWFkJywgJ2NoYXQ6d3JpdGU6Ym90JywgJ3RlYW06cmVhZCddKVxuIFx0XHR9KVxuIFx0XHQudGhlbigoKSA9PiB7XG4gXHRcdFx0JHN0YXRlLmdvKCdob21lJylcbiBcdFx0fSlcbiBcdH1cbn0pXG4iLCIvL0RpcmVjdGl2ZSBGaWxlIiwiYXBwLmZhY3RvcnkoJ0dhbWVGYWN0b3J5JywgKCRodHRwLCAkcm9vdFNjb3BlKSA9PiB7XG4gICAgY29uc3QgR2FtZUZhY3RvcnkgPSB7fTtcblxuICAgIGNvbnN0IGluaXRpYWxpemVGaXJlYmFzZSA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgICAgICAgYXBpS2V5OiBcIkFJemFTeUQtdERldlh2aXB5dUU1bHpoZVdBUnE0aHV1MVVtcW9Ka1wiLFxuICAgICAgICAgICAgYXV0aERvbWFpbjogXCJjYXBzdG9uZS1mYjBlOC5maXJlYmFzZWFwcC5jb21cIixcbiAgICAgICAgICAgIGRhdGFiYXNlVVJMOiBcImh0dHBzOi8vY2Fwc3RvbmUtZmIwZTguZmlyZWJhc2Vpby5jb21cIixcbiAgICAgICAgICAgIHN0b3JhZ2VCdWNrZXQ6IFwiY2Fwc3RvbmUtZmIwZTguYXBwc3BvdC5jb21cIixcbiAgICAgICAgICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjg0OTgzOTY4MDEwN1wiXG4gICAgICAgIH07XG4gICAgICAgIGZpcmViYXNlLmluaXRpYWxpemVBcHAoY29uZmlnKTtcbiAgICB9O1xuICAgIGluaXRpYWxpemVGaXJlYmFzZSgpO1xuXG5cbiAgICBHYW1lRmFjdG9yeS5hZGRVc2VyID0gKCkgPT4ge1xuXG4gICAgfTtcblxuICAgIEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZSA9IChnYW1lTmFtZSwgdGVhbU5hbWUpID0+IHtcbiAgICAgICAgLy9yZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpLnRoZW4odXNlcklkID0+IHtcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZ2FtZXMnLCB7XG4gICAgICAgICAgICAgICAgbmFtZTogZ2FtZU5hbWUgfHwgJ0JvcmluZyBOYW1lJyxcbiAgICAgICAgICAgICAgICB0ZWFtSWQ6IHRlYW1JZCB8fCAyLFxuICAgICAgICAgICAgICAgIGNyZWF0b3JJZDogMlxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcbiAgICAgICAgICAgIC50aGVuKGdhbWVJZCA9PiB7XG4gICAgICAgICAgICAgICAgLy9jb25zdCByZWZmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYC9nYW1lcy9gKVxuICAgICAgICAgICAgICAgIGNvbnN0IHJlZmYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgL2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICAgICAgcmVmZi5vbigndmFsdWUnLCBzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2NoYW5nZWRHYW1lJywgc25hcHNob3QudmFsKCkpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLy9zZXQgdXAgd2F0Y2hlclxuICAgIH07XG5cblxuICAgIEdhbWVGYWN0b3J5LmpvaW5HYW1lQnlJZCA9IChnYW1lSWQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2pvaW5pbmcgZ2FtZScpXG4gICAgICAgICAgICAvL3ZhciBwbGF5ZXJzVGVhbSA9IFxuICAgICAgICB2YXIgZ2FtZUlkID0gODtcbiAgICAgICAgdmFyIHBsYXllcklkID0gMjsgLy9ldmVudHVhbGx5IG1ha2UgaXQgZ2V0IGN1cnJlbnQgXG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGBodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2dhbWVzLyR7Z2FtZUlkfT9wbGF5ZXJJZD0ke3BsYXllcklkfWAsIHtcblxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8vXG4gICAgR2FtZUZhY3RvcnkuY3JlYXRlR2FtZUJ5SWRGaXJlQmFzZSA9IChmaXJlYmFzZWdhbWVJZCkgPT4ge1xuICAgICAgICAvL3JldHVybiAkaHR0cC5wb3N0KGBodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2ZpcmViYXNlL2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgIC8vbmVlZHMgdG8gYmUgLnRoZW5hYmxlXG4gICAgICAgIGNvbnN0IG5ld1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBnYW1lcy8ke2ZpcmViYXNlZ2FtZUlkfWApLnB1c2goKTtcbiAgICAgICAgbmV3UmVmLnNldCh7XG4gICAgICAgICAgICBwbGF5ZXJJZDogcmVxLnF1ZXJ5LnBsYXllcklkXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG5cbiAgICAvL3ZzIGdldENhcmRzQnlUZWFtSWRcbiAgICBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkID0gKHRlYW1JZCkgPT4ge1xuXG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZGVja3MvJHt0ZWFtSWR9YClcbiAgICAgICAgICAgIC50aGUocmVzID0+IHJlcy5kYXRhKVxuXG4gICAgfTtcblxuICAgIEdhbWVGYWN0b3J5LmdldENhcmRzQnlDcmVhdG9yID0gKHVzZXJJZCkgPT4ge1xuXG4gICAgfVxuXG4gICAgR2FtZUZhY3RvcnkuZ2V0VXNlcnNCeUdhbWVJZCA9IChnYW1lSWQpID0+IHtcbiAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0vdXNlcnNgKTtcbiAgICB9O1xuXG5cbiAgICBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VXNlcklkID0gKHVzZXJJZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9nYW1lcy8/dXNlcklkPSR7dXNlcklkfWApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICB9XG4gICAgICAgIC8vIC50aGVuKGNyZWF0ZWRHYW1lID0+XG4gICAgICAgIC8vICAgICAvL2FkZHdhdGNoZXIgdG8gZ2FtZSBpZCBpbiBmaXJlYmFzZSlcbiAgICAgICAgLy8gICAgIHJldHVybiBjcmVhdGVkR2FtZVxuICAgICAgICAvLyB9O1xuXG5cblxuICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQgPSAodGVhbUlkKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0aGUgdGVhbSBpcyBpZCcsIHRlYW1JZClcblxuICAgICAgICBjb25zdCBnYW1lc1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXNgKVxuICAgICAgICByZXR1cm4gZ2FtZXNSZWYub25jZSgndmFsdWUnKS50aGVuKHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGhlIHZhbCBpcycsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgIHJldHVybiBzbmFwc2hvdC52YWwoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2dhbWVzP3RlYW1JZD0ke3RlYW1JZH1gKVxuICAgICAgICAgICAgLy8gICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcbiAgICAgICAgICAgIC8vLnRoZW4oZm91bmRHYW1lcyA9PiApXG4gICAgfTtcblxuXG4gICAgLy9nZXQgYWxsIGdhbWVzIGJ5IHRlYW0gcm91dGVcblxuICAgIHJldHVybiBHYW1lRmFjdG9yeTtcbn0pO1xuXG5cblxuLy8gaW1wbGVtZW50IGpvaW5pbmcgYSBnYW1lIHVzaW5nIC8gc2Vzc2lvbiAkaHR0cCByZXF1ZXN0IGluIGFuIGFuZ3VsYXIgZmFjdG9yeSBjYWxsZWQgR2FtZUZhY3RvcnkgdGhhdCBoaXRzIHRoZSByb3V0ZSAvIGFwaSAvIGdhbWVzIC8g4oCmLi5mdW5jdGlvbiBqb2luR2FtZUJ5SWQoZ2FtZUlkKSB7XG4vLyAgICAgY29uc3QgdXNlciA9IGdldExvZ2dlZEluVXNlcigpIC8vYXNzdW1lcywgY291bGQgbGF0ZXIgYmUgb3B0aW9uYWwgaW4gYWRtaW4gcGFuZWxcbi8vICAgICBnZXRMT2dnZWRJblVTZXIoKS50aGVuKGxvZ2dlZFVTZXIgPT4ge1xuLy8gICAgICAgICBkb27igJkgdCBuZWVkIGdhbWUuZmluZGJ5IGlkLCBjYW4ganVzdCBkbyBmYiBwYXJ0IG9mIGdhbWVycyBpbmRlcGVuZGVudGx5IC8vR2FtZS5maW5kQnlJZChnYW1lSWQgKS50aGVuKGZvdW5kR2FtZSA9PiBsZXQgZ2FtZVJlZiA9IGZiLmRiLnJlZijigJgvICAgICAgICAgZ2FtZXPigJkrZm91bmRHYW1lLmlkKSlcbi8vICAgICB9KVxuLy8gfVxuLy8gc2lnbiBpbiBidXR0b25cbiIsImFwcC5mYWN0b3J5KCdMb2dpbkZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCl7XG5cdHJldHVybiB7XG5cdFx0Z2V0U2xhY2tDcmVkczogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiAkaHR0cC5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvc2xhY2snKVx0XG5cdFx0XHRcdC50aGVuKHJlcyA9PiByZXMuZGF0YSlcblx0XHR9XG5cdH1cbn0pXG5cblxuLy8gaHR0cHM6Ly9zbGFjay5jb20vb2F1dGgvYXV0aG9yaXplP3Njb3BlPWlkZW50aXR5LmJhc2ljIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
