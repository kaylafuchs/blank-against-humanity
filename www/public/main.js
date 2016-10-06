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
//Directive File
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImRlY2tzL2RlY2tzLmpzIiwiZnJvbSBmc2cvZnJvbS1mc2cuanMiLCJnYW1lL2dhbWUuanMiLCJob21lL2hvbWUuanMiLCJsb2dpbi9sb2dpbi5qcyIsImNvbW1vbi9mYWN0b3JpZXMvR2FtZUZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yaWVzL2ZhY3RvcnkuanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiXSwibmFtZXMiOlsid2luZG93IiwiYXBwIiwiYW5ndWxhciIsIm1vZHVsZSIsImNvbnNvbGUiLCJsb2ciLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZURlZmF1bHQiLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsInN0YXRlIiwidXJsIiwidGVtcGxhdGVVcmwiLCJjb250cm9sbGVyIiwicmVzb2x2ZSIsImRlY2tzIiwiR2FtZUZhY3RvcnkiLCIkc3RhdGVQYXJhbXMiLCJnZXREZWNrc0J5VGVhbUlkIiwic3RhdGVQYXJhbXMiLCJ0ZWFtSWQiLCIkc2NvcGUiLCJ0ZWFtR2FtZXMiLCJnZXRHYW1lc0J5VGVhbUlkIiwic3RhcnROZXdHYW1lIiwiJG9uIiwiZXZlbnQiLCJkYXRhIiwiZ2FtZSIsIiRkaWdlc3QiLCJnYW1lcyIsIiRzdGF0ZSIsIiRjb3Jkb3ZhT2F1dGgiLCJnZXRHYW1lc0J5VXNlcklkIiwidGhlbiIsInVzZXJHYW1lcyIsImdyZWV0aW5nIiwiTG9naW5GYWN0b3J5IiwibG9naW5XaXRoU2xhY2siLCJnZXRTbGFja0NyZWRzIiwic2xhY2siLCJjcmVkcyIsImNsaWVudElEIiwiY2xpZW50U2VjcmV0IiwiZ28iLCJmYWN0b3J5IiwiJGh0dHAiLCIkcm9vdFNjb3BlIiwiaW5pdGlhbGl6ZUZpcmViYXNlIiwiYXBpS2V5IiwiYXV0aERvbWFpbiIsImRhdGFiYXNlVVJMIiwic3RvcmFnZUJ1Y2tldCIsIm1lc3NhZ2luZ1NlbmRlcklkIiwiZmlyZWJhc2UiLCJpbml0aWFsaXplQXBwIiwiYWRkVXNlciIsImdhbWVOYW1lIiwidGVhbU5hbWUiLCJwb3N0IiwibmFtZSIsImNyZWF0b3JJZCIsInJlcyIsInJlZmYiLCJkYXRhYmFzZSIsInJlZiIsImdhbWVJZCIsIm9uIiwic25hcHNob3QiLCJ2YWwiLCIkYnJvYWRjYXN0Iiwiam9pbkdhbWVCeUlkIiwicGxheWVySWQiLCJjcmVhdGVHYW1lQnlJZEZpcmVCYXNlIiwiZmlyZWJhc2VnYW1lSWQiLCJuZXdSZWYiLCJwdXNoIiwic2V0IiwicmVxIiwicXVlcnkiLCJnZXQiLCJ0aGUiLCJnZXRDYXJkc0J5Q3JlYXRvciIsInVzZXJJZCIsImdldFVzZXJzQnlHYW1lSWQiLCJnYW1lc1JlZiIsIm9uY2UiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0FBLE9BQUFDLEdBQUEsR0FBQUMsUUFBQUMsTUFBQSxDQUFBLHNCQUFBLEVBQUEsQ0FBQSxPQUFBLEVBQUEsV0FBQSxFQUFBLFdBQUEsRUFBQSxnQkFBQSxDQUFBLENBQUE7O0FBRUFDLFFBQUFDLEdBQUEsQ0FBQSxLQUFBLEVBQUFKLEdBQUE7QUFDQUEsSUFBQUssR0FBQSxDQUFBLFVBQUFDLGNBQUEsRUFBQTtBQUNBQSxtQkFBQUMsS0FBQSxDQUFBLFlBQUE7QUFDQSxZQUFBUixPQUFBUyxPQUFBLElBQUFULE9BQUFTLE9BQUEsQ0FBQUMsT0FBQSxDQUFBQyxRQUFBLEVBQUE7QUFDQTtBQUNBO0FBQ0FGLG9CQUFBQyxPQUFBLENBQUFDLFFBQUEsQ0FBQUMsd0JBQUEsQ0FBQSxJQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBSCxvQkFBQUMsT0FBQSxDQUFBQyxRQUFBLENBQUFFLGFBQUEsQ0FBQSxJQUFBO0FBQ0E7QUFDQSxZQUFBYixPQUFBYyxTQUFBLEVBQUE7QUFDQUEsc0JBQUFDLFlBQUE7QUFDQTtBQUNBLEtBZEE7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dkIsSUFBQW9ELE9BQUEsQ0FBQSxjQUFBLEVBQUEsVUFBQUMsS0FBQSxFQUFBO0FBQ0EsV0FBQTtBQUNBUCx1QkFBQSx5QkFBQTtBQUNBLG1CQUFBTyxNQUFBa0MsR0FBQSxDQUFBLGlDQUFBLEVBQ0E5QyxJQURBLENBQ0E7QUFBQSx1QkFBQTRCLElBQUFuQyxJQUFBO0FBQUEsYUFEQSxDQUFBO0FBRUE7QUFKQSxLQUFBO0FBTUEsQ0FQQTs7QUFVQTtBQ1ZBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJb25pYyBTdGFydGVyIEFwcFxuXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xuLy8gJ3N0YXJ0ZXInIGlzIHRoZSBuYW1lIG9mIHRoaXMgYW5ndWxhciBtb2R1bGUgZXhhbXBsZSAoYWxzbyBzZXQgaW4gYSA8Ym9keT4gYXR0cmlidXRlIGluIGluZGV4Lmh0bWwpXG4vLyB0aGUgMm5kIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiAncmVxdWlyZXMnXG53aW5kb3cuYXBwID0gYW5ndWxhci5tb2R1bGUoJ0JsYW5rQWdhaW5zdEh1bWFuaXR5JywgWydpb25pYycsICd1aS5yb3V0ZXInLCAnbmdDb3Jkb3ZhJywgJ25nQ29yZG92YU9hdXRoJ10pXG5cbmNvbnNvbGUubG9nKFwiQVBQXCIsIGFwcClcbmFwcC5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0pIHtcbiAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgICAgICAgIC8vIEhpZGUgdGhlIGFjY2Vzc29yeSBiYXIgYnkgZGVmYXVsdCAocmVtb3ZlIHRoaXMgdG8gc2hvdyB0aGUgYWNjZXNzb3J5IGJhciBhYm92ZSB0aGUga2V5Ym9hcmRcbiAgICAgICAgICAgIC8vIGZvciBmb3JtIGlucHV0cylcbiAgICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG5cbiAgICAgICAgICAgIC8vIERvbid0IHJlbW92ZSB0aGlzIGxpbmUgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZy4gSXQgc3RvcHMgdGhlIHZpZXdwb3J0XG4gICAgICAgICAgICAvLyBmcm9tIHNuYXBwaW5nIHdoZW4gdGV4dCBpbnB1dHMgYXJlIGZvY3VzZWQuIElvbmljIGhhbmRsZXMgdGhpcyBpbnRlcm5hbGx5IGZvclxuICAgICAgICAgICAgLy8gYSBtdWNoIG5pY2VyIGtleWJvYXJkIGV4cGVyaWVuY2UuXG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2luZG93LlN0YXR1c0Jhcikge1xuICAgICAgICAgICAgU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbn0pXG4iLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlcikgPT4ge1xuXHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnZGVja3MnLCB7XG5cdFx0dXJsOiAnZGVja3MvOnRlYW1pZCcsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9kZWNrcy9kZWNrcy5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnRGVja0N0cmwnLFxuXHRcdHJlc29sdmU6IHtcblx0XHRcdGRlY2tzOiAoR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcykgPT4gR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZChzdGF0ZVBhcmFtcy50ZWFtSWQpXG5cdFx0fVxuXHR9KVxuXG59KVxuXG5hcHAuY29udHJvbGxlcignRGVja0N0cmwnLCAoJHNjb3BlKSA9PiB7XG5cblxuXHRcbn0pIiwiLy8gKGZ1bmN0aW9uICgpIHtcblxuLy8gICAgICd1c2Ugc3RyaWN0JztcblxuLy8gICAgIC8vIEhvcGUgeW91IGRpZG4ndCBmb3JnZXQgQW5ndWxhciEgRHVoLWRveS5cbi8vICAgICBpZiAoIXdpbmRvdy5hbmd1bGFyKSB0aHJvdyBuZXcgRXJyb3IoJ0kgY2FuXFwndCBmaW5kIEFuZ3VsYXIhJyk7XG5cbi8vICAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2ZzYVByZUJ1aWx0JywgW10pO1xuXG4vLyAgICAgYXBwLmZhY3RvcnkoJ1NvY2tldCcsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgaWYgKCF3aW5kb3cuaW8pIHRocm93IG5ldyBFcnJvcignc29ja2V0LmlvIG5vdCBmb3VuZCEnKTtcbi8vICAgICAgICAgcmV0dXJuIHdpbmRvdy5pbyh3aW5kb3cubG9jYXRpb24ub3JpZ2luKTtcbi8vICAgICB9KTtcblxuLy8gICAgIC8vIEFVVEhfRVZFTlRTIGlzIHVzZWQgdGhyb3VnaG91dCBvdXIgYXBwIHRvXG4vLyAgICAgLy8gYnJvYWRjYXN0IGFuZCBsaXN0ZW4gZnJvbSBhbmQgdG8gdGhlICRyb290U2NvcGVcbi8vICAgICAvLyBmb3IgaW1wb3J0YW50IGV2ZW50cyBhYm91dCBhdXRoZW50aWNhdGlvbiBmbG93LlxuLy8gICAgIGFwcC5jb25zdGFudCgnQVVUSF9FVkVOVFMnLCB7XG4vLyAgICAgICAgIGxvZ2luU3VjY2VzczogJ2F1dGgtbG9naW4tc3VjY2VzcycsXG4vLyAgICAgICAgIGxvZ2luRmFpbGVkOiAnYXV0aC1sb2dpbi1mYWlsZWQnLFxuLy8gICAgICAgICBsb2dvdXRTdWNjZXNzOiAnYXV0aC1sb2dvdXQtc3VjY2VzcycsXG4vLyAgICAgICAgIHNlc3Npb25UaW1lb3V0OiAnYXV0aC1zZXNzaW9uLXRpbWVvdXQnLFxuLy8gICAgICAgICBub3RBdXRoZW50aWNhdGVkOiAnYXV0aC1ub3QtYXV0aGVudGljYXRlZCcsXG4vLyAgICAgICAgIG5vdEF1dGhvcml6ZWQ6ICdhdXRoLW5vdC1hdXRob3JpemVkJ1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLmZhY3RvcnkoJ0F1dGhJbnRlcmNlcHRvcicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkcSwgQVVUSF9FVkVOVFMpIHtcbi8vICAgICAgICAgdmFyIHN0YXR1c0RpY3QgPSB7XG4vLyAgICAgICAgICAgICA0MDE6IEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsXG4vLyAgICAgICAgICAgICA0MDM6IEFVVEhfRVZFTlRTLm5vdEF1dGhvcml6ZWQsXG4vLyAgICAgICAgICAgICA0MTk6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0LFxuLy8gICAgICAgICAgICAgNDQwOiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dFxuLy8gICAgICAgICB9O1xuLy8gICAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAgICAgcmVzcG9uc2VFcnJvcjogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KHN0YXR1c0RpY3RbcmVzcG9uc2Uuc3RhdHVzXSwgcmVzcG9uc2UpO1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzcG9uc2UpXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH07XG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuY29uZmlnKGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XG4vLyAgICAgICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goW1xuLy8gICAgICAgICAgICAgJyRpbmplY3RvcicsXG4vLyAgICAgICAgICAgICBmdW5jdGlvbiAoJGluamVjdG9yKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRpbmplY3Rvci5nZXQoJ0F1dGhJbnRlcmNlcHRvcicpO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICBdKTtcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5zZXJ2aWNlKCdBdXRoU2VydmljZScsIGZ1bmN0aW9uICgkaHR0cCwgU2Vzc2lvbiwgJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMsICRxKSB7XG5cbi8vICAgICAgICAgZnVuY3Rpb24gb25TdWNjZXNzZnVsTG9naW4ocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgIHZhciB1c2VyID0gcmVzcG9uc2UuZGF0YS51c2VyO1xuLy8gICAgICAgICAgICAgU2Vzc2lvbi5jcmVhdGUodXNlcik7XG4vLyAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoQVVUSF9FVkVOVFMubG9naW5TdWNjZXNzKTtcbi8vICAgICAgICAgICAgIHJldHVybiB1c2VyO1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgLy8gVXNlcyB0aGUgc2Vzc2lvbiBmYWN0b3J5IHRvIHNlZSBpZiBhblxuLy8gICAgICAgICAvLyBhdXRoZW50aWNhdGVkIHVzZXIgaXMgY3VycmVudGx5IHJlZ2lzdGVyZWQuXG4vLyAgICAgICAgIHRoaXMuaXNBdXRoZW50aWNhdGVkID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuICEhU2Vzc2lvbi51c2VyO1xuLy8gICAgICAgICB9O1xuXG4gICAgICAgIFxuLy8gICAgICAgICB0aGlzLmlzQWRtaW4gPSBmdW5jdGlvbih1c2VySWQpe1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ3J1bm5pbmcgYWRtaW4gZnVuYycpXG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpXG4vLyAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhLnVzZXIuaXNBZG1pbilcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIHRoaXMuZ2V0TG9nZ2VkSW5Vc2VyID0gZnVuY3Rpb24gKGZyb21TZXJ2ZXIpIHtcblxuLy8gICAgICAgICAgICAgLy8gSWYgYW4gYXV0aGVudGljYXRlZCBzZXNzaW9uIGV4aXN0cywgd2Vcbi8vICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgdXNlciBhdHRhY2hlZCB0byB0aGF0IHNlc3Npb25cbi8vICAgICAgICAgICAgIC8vIHdpdGggYSBwcm9taXNlLiBUaGlzIGVuc3VyZXMgdGhhdCB3ZSBjYW5cbi8vICAgICAgICAgICAgIC8vIGFsd2F5cyBpbnRlcmZhY2Ugd2l0aCB0aGlzIG1ldGhvZCBhc3luY2hyb25vdXNseS5cblxuLy8gICAgICAgICAgICAgLy8gT3B0aW9uYWxseSwgaWYgdHJ1ZSBpcyBnaXZlbiBhcyB0aGUgZnJvbVNlcnZlciBwYXJhbWV0ZXIsXG4vLyAgICAgICAgICAgICAvLyB0aGVuIHRoaXMgY2FjaGVkIHZhbHVlIHdpbGwgbm90IGJlIHVzZWQuXG5cbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlzQXV0aGVudGljYXRlZCgpICYmIGZyb21TZXJ2ZXIgIT09IHRydWUpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbihTZXNzaW9uLnVzZXIpO1xuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICAvLyBNYWtlIHJlcXVlc3QgR0VUIC9zZXNzaW9uLlxuLy8gICAgICAgICAgICAgLy8gSWYgaXQgcmV0dXJucyBhIHVzZXIsIGNhbGwgb25TdWNjZXNzZnVsTG9naW4gd2l0aCB0aGUgcmVzcG9uc2UuXG4vLyAgICAgICAgICAgICAvLyBJZiBpdCByZXR1cm5zIGEgNDAxIHJlc3BvbnNlLCB3ZSBjYXRjaCBpdCBhbmQgaW5zdGVhZCByZXNvbHZlIHRvIG51bGwuXG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbi8vICAgICAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5sb2dpbiA9IGZ1bmN0aW9uIChjcmVkZW50aWFscykge1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9sb2dpbicsIGNyZWRlbnRpYWxzKVxuLy8gICAgICAgICAgICAgICAgIC50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKVxuLy8gICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QoeyBtZXNzYWdlOiAnSW52YWxpZCBsb2dpbiBjcmVkZW50aWFscy4nfSk7XG4vLyAgICAgICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5zaWdudXAgPSBmdW5jdGlvbihjcmVkZW50aWFscyl7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuLy8gICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuLy8gICAgICAgICAgICAgICAgIHVybDogJy9zaWdudXAnLFxuLy8gICAgICAgICAgICAgICAgIGRhdGE6IGNyZWRlbnRpYWxzXG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5kYXRhKVxuLy8gICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKCl7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCh7bWVzc2FnZTogJ1RoYXQgZW1haWwgaXMgYWxyZWFkeSBiZWluZyB1c2VkLid9KTtcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5sb2dvdXQgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvbG9nb3V0JykudGhlbihmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgU2Vzc2lvbi5kZXN0cm95KCk7XG4vLyAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ291dFN1Y2Nlc3MpO1xuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5zZXJ2aWNlKCdTZXNzaW9uJywgZnVuY3Rpb24gKCRyb290U2NvcGUsIEFVVEhfRVZFTlRTKSB7XG5cbi8vICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4vLyAgICAgICAgICRyb290U2NvcGUuJG9uKEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCwgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgc2VsZi5kZXN0cm95KCk7XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XG5cbi8vICAgICAgICAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbiAodXNlcikge1xuLy8gICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgfSk7XG5cbi8vIH0oKSk7XG4iLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlcikgPT4ge1xuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdnYW1lJywge1xuICAgICAgICB1cmw6ICcvZ2FtZS86dGVhbUlkJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL2dhbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdHYW1lQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIHRlYW1HYW1lczogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQoJHN0YXRlUGFyYW1zLnRlYW1JZCkgLy9zdGF0ZVBhcmFtcy50ZWFtSWRcbiAgICAgICAgfVxuICAgIH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignR2FtZUN0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgdGVhbUdhbWVzKSA9PiB7XG4gICAgJHNjb3BlLnN0YXJ0TmV3R2FtZSA9IEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZTtcbiAgICAkc2NvcGUuJG9uKCdjaGFuZ2VkR2FtZScsIChldmVudCwgZGF0YSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygncmVjZWl2ZWQgZXZlbnQnKVxuICAgICAgICBjb25zb2xlLmxvZygnZGF0YSBvYmo6JywgZGF0YSlcbiAgICAgICAgJHNjb3BlLmdhbWUgPSBkYXRhO1xuICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpXG5cbiAgICB9KVxuICAgICRzY29wZS5nYW1lcyA9IHRlYW1HYW1lcztcbiAgICBjb25zb2xlLmxvZygndGVhbWdhbWVzICcsIHRlYW1HYW1lcylcbn0pXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKXtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2hvbWUnLCB7XG5cdFx0dXJsOiAnL2hvbWUnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvaG9tZS9ob21lLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdIb21lQ3RybCdcblx0fSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdIb21lQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCAkY29yZG92YU9hdXRoLCBHYW1lRmFjdG9yeSl7XG5cdFxuXHRHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VXNlcklkKDIpXG5cdFx0LnRoZW4odXNlckdhbWVzID0+IHsgJHNjb3BlLnVzZXJHYW1lcyA9IHVzZXJHYW1lcyB9KVxuXG5cdCRzY29wZS5ncmVldGluZyA9IFwiaGVsbG9cIjtcbn0pXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKXtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2xvZ2luJywge1xuXHRcdHVybDogJy9sb2dpbicsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9sb2dpbi9sb2dpbi5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnTG9naW5DdHJsJ1xuXHR9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCBMb2dpbkZhY3RvcnksICRjb3Jkb3ZhT2F1dGgpe1xuIFx0JHNjb3BlLmxvZ2luV2l0aFNsYWNrID0gZnVuY3Rpb24oKXtcbiBcdFx0Y29uc29sZS5sb2coXCJpbSBiZWluZyBjYWxsZWRcIilcbiBcdFx0cmV0dXJuIExvZ2luRmFjdG9yeS5nZXRTbGFja0NyZWRzKClcbiBcdFx0LnRoZW4oY3JlZHMgPT57XG4gXHRcdFx0cmV0dXJuICRjb3Jkb3ZhT2F1dGguc2xhY2soY3JlZHMuY2xpZW50SUQsIGNyZWRzLmNsaWVudFNlY3JldCwgWydjaGFubmVsczpyZWFkJywgJ2NoYXQ6d3JpdGU6Ym90JywgJ3RlYW06cmVhZCddKVxuIFx0XHR9KVxuIFx0XHQudGhlbigoKSA9PiB7XG4gXHRcdFx0JHN0YXRlLmdvKCdob21lJylcbiBcdFx0fSlcbiBcdH1cbn0pXG4iLCJhcHAuZmFjdG9yeSgnR2FtZUZhY3RvcnknLCAoJGh0dHAsICRyb290U2NvcGUpID0+IHtcbiAgICBjb25zdCBHYW1lRmFjdG9yeSA9IHt9O1xuXG4gICAgY29uc3QgaW5pdGlhbGl6ZUZpcmViYXNlID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgICAgICBhcGlLZXk6IFwiQUl6YVN5RC10RGV2WHZpcHl1RTVsemhlV0FScTRodXUxVW1xb0prXCIsXG4gICAgICAgICAgICBhdXRoRG9tYWluOiBcImNhcHN0b25lLWZiMGU4LmZpcmViYXNlYXBwLmNvbVwiLFxuICAgICAgICAgICAgZGF0YWJhc2VVUkw6IFwiaHR0cHM6Ly9jYXBzdG9uZS1mYjBlOC5maXJlYmFzZWlvLmNvbVwiLFxuICAgICAgICAgICAgc3RvcmFnZUJ1Y2tldDogXCJjYXBzdG9uZS1mYjBlOC5hcHBzcG90LmNvbVwiLFxuICAgICAgICAgICAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiODQ5ODM5NjgwMTA3XCJcbiAgICAgICAgfTtcbiAgICAgICAgZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChjb25maWcpO1xuICAgIH07XG4gICAgaW5pdGlhbGl6ZUZpcmViYXNlKCk7XG5cblxuICAgIEdhbWVGYWN0b3J5LmFkZFVzZXIgPSAoKSA9PiB7XG5cbiAgICB9O1xuXG4gICAgR2FtZUZhY3Rvcnkuc3RhcnROZXdHYW1lID0gKGdhbWVOYW1lLCB0ZWFtTmFtZSkgPT4ge1xuICAgICAgICAvL3JldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJykudGhlbih1c2VySWQgPT4ge1xuICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9nYW1lcycsIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBnYW1lTmFtZSB8fCAnQm9yaW5nIE5hbWUnLFxuICAgICAgICAgICAgICAgIHRlYW1JZDogdGVhbUlkIHx8IDIsXG4gICAgICAgICAgICAgICAgY3JlYXRvcklkOiAyXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICAgICAgLnRoZW4oZ2FtZUlkID0+IHtcbiAgICAgICAgICAgICAgICAvL2NvbnN0IHJlZmYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgL2dhbWVzL2ApXG4gICAgICAgICAgICAgICAgY29uc3QgcmVmZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGAvZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICAgICAgICByZWZmLm9uKCd2YWx1ZScsIHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coc25hcHNob3QudmFsKCkpXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnY2hhbmdlZEdhbWUnLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvL3NldCB1cCB3YXRjaGVyXG4gICAgfTtcblxuXG4gICAgR2FtZUZhY3Rvcnkuam9pbkdhbWVCeUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnam9pbmluZyBnYW1lJylcbiAgICAgICAgICAgIC8vdmFyIHBsYXllcnNUZWFtID0gXG4gICAgICAgIHZhciBnYW1lSWQgPSA4O1xuICAgICAgICB2YXIgcGxheWVySWQgPSAyOyAvL2V2ZW50dWFsbHkgbWFrZSBpdCBnZXQgY3VycmVudCBcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYGh0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZ2FtZXMvJHtnYW1lSWR9P3BsYXllcklkPSR7cGxheWVySWR9YCwge1xuXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLy9cbiAgICBHYW1lRmFjdG9yeS5jcmVhdGVHYW1lQnlJZEZpcmVCYXNlID0gKGZpcmViYXNlZ2FtZUlkKSA9PiB7XG4gICAgICAgIC8vcmV0dXJuICRodHRwLnBvc3QoYGh0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZmlyZWJhc2UvZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgLy9uZWVkcyB0byBiZSAudGhlbmFibGVcbiAgICAgICAgY29uc3QgbmV3UmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYGdhbWVzLyR7ZmlyZWJhc2VnYW1lSWR9YCkucHVzaCgpO1xuICAgICAgICBuZXdSZWYuc2V0KHtcbiAgICAgICAgICAgIHBsYXllcklkOiByZXEucXVlcnkucGxheWVySWRcbiAgICAgICAgfSk7XG5cbiAgICB9XG5cblxuICAgIC8vdnMgZ2V0Q2FyZHNCeVRlYW1JZFxuICAgIEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQgPSAodGVhbUlkKSA9PiB7XG5cbiAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9kZWNrcy8ke3RlYW1JZH1gKVxuICAgICAgICAgICAgLnRoZShyZXMgPT4gcmVzLmRhdGEpXG5cbiAgICB9O1xuXG4gICAgR2FtZUZhY3RvcnkuZ2V0Q2FyZHNCeUNyZWF0b3IgPSAodXNlcklkKSA9PiB7XG5cbiAgICB9XG5cbiAgICBHYW1lRmFjdG9yeS5nZXRVc2Vyc0J5R2FtZUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2dhbWVzLyR7Z2FtZUlkfS91c2Vyc2ApO1xuICAgIH07XG5cblxuICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlVc2VySWQgPSAodXNlcklkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2dhbWVzLz91c2VySWQ9JHt1c2VySWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgIH1cbiAgICAgICAgLy8gLnRoZW4oY3JlYXRlZEdhbWUgPT5cbiAgICAgICAgLy8gICAgIC8vYWRkd2F0Y2hlciB0byBnYW1lIGlkIGluIGZpcmViYXNlKVxuICAgICAgICAvLyAgICAgcmV0dXJuIGNyZWF0ZWRHYW1lXG4gICAgICAgIC8vIH07XG5cblxuXG4gICAgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCA9ICh0ZWFtSWQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RoZSB0ZWFtIGlzIGlkJywgdGVhbUlkKVxuXG4gICAgICAgIGNvbnN0IGdhbWVzUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lc2ApXG4gICAgICAgIHJldHVybiBnYW1lc1JlZi5vbmNlKCd2YWx1ZScpLnRoZW4oc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGUgdmFsIGlzJywgc25hcHNob3QudmFsKCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNuYXBzaG90LnZhbCgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZ2FtZXM/dGVhbUlkPSR7dGVhbUlkfWApXG4gICAgICAgICAgICAvLyAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICAgICAgLy8udGhlbihmb3VuZEdhbWVzID0+IClcbiAgICB9O1xuXG5cbiAgICAvL2dldCBhbGwgZ2FtZXMgYnkgdGVhbSByb3V0ZVxuXG4gICAgcmV0dXJuIEdhbWVGYWN0b3J5O1xufSk7XG5cblxuXG4vLyBpbXBsZW1lbnQgam9pbmluZyBhIGdhbWUgdXNpbmcgLyBzZXNzaW9uICRodHRwIHJlcXVlc3QgaW4gYW4gYW5ndWxhciBmYWN0b3J5IGNhbGxlZCBHYW1lRmFjdG9yeSB0aGF0IGhpdHMgdGhlIHJvdXRlIC8gYXBpIC8gZ2FtZXMgLyDigKYuLmZ1bmN0aW9uIGpvaW5HYW1lQnlJZChnYW1lSWQpIHtcbi8vICAgICBjb25zdCB1c2VyID0gZ2V0TG9nZ2VkSW5Vc2VyKCkgLy9hc3N1bWVzLCBjb3VsZCBsYXRlciBiZSBvcHRpb25hbCBpbiBhZG1pbiBwYW5lbFxuLy8gICAgIGdldExPZ2dlZEluVVNlcigpLnRoZW4obG9nZ2VkVVNlciA9PiB7XG4vLyAgICAgICAgIGRvbuKAmSB0IG5lZWQgZ2FtZS5maW5kYnkgaWQsIGNhbiBqdXN0IGRvIGZiIHBhcnQgb2YgZ2FtZXJzIGluZGVwZW5kZW50bHkgLy9HYW1lLmZpbmRCeUlkKGdhbWVJZCApLnRoZW4oZm91bmRHYW1lID0+IGxldCBnYW1lUmVmID0gZmIuZGIucmVmKOKAmC8gICAgICAgICBnYW1lc+KAmStmb3VuZEdhbWUuaWQpKVxuLy8gICAgIH0pXG4vLyB9XG4vLyBzaWduIGluIGJ1dHRvblxuIiwiYXBwLmZhY3RvcnkoJ0xvZ2luRmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwKXtcblx0cmV0dXJuIHtcblx0XHRnZXRTbGFja0NyZWRzOiBmdW5jdGlvbigpe1xuXHRcdFx0cmV0dXJuICRodHRwLmdldCgnaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9zbGFjaycpXHRcblx0XHRcdFx0LnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuXHRcdH1cblx0fVxufSlcblxuXG4vLyBodHRwczovL3NsYWNrLmNvbS9vYXV0aC9hdXRob3JpemU/c2NvcGU9aWRlbnRpdHkuYmFzaWMiLCIvL0RpcmVjdGl2ZSBGaWxlIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
