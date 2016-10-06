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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImZyb20gZnNnL2Zyb20tZnNnLmpzIiwiZ2FtZS9nYW1lLmpzIiwiaG9tZS9ob21lLmpzIiwibG9naW4vbG9naW4uanMiLCJjb21tb24vZmFjdG9yaWVzL0dhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9sb2dpbkZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yaWVzL3VzZXJGYWN0b3J5LmpzIiwiY29tbW9uL2RpcmVjdGl2ZXMvZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImFwcCIsImFuZ3VsYXIiLCJtb2R1bGUiLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZURlZmF1bHQiLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsInN0YXRlIiwidXJsIiwidGVtcGxhdGVVcmwiLCJjb250cm9sbGVyIiwicmVzb2x2ZSIsInRlYW1HYW1lcyIsIkdhbWVGYWN0b3J5IiwiJHN0YXRlUGFyYW1zIiwiZ2V0R2FtZXNCeVRlYW1JZCIsInRlYW1JZCIsIiRzY29wZSIsInN0YXJ0TmV3R2FtZSIsIiRvbiIsImV2ZW50IiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJnYW1lIiwiJGRpZ2VzdCIsImdhbWVzIiwiJHN0YXRlIiwiJGNvcmRvdmFPYXV0aCIsIlVzZXJGYWN0b3J5IiwiJGxvY2FsU3RvcmFnZSIsInVzZXIiLCJnZXRDdXJyZW50VXNlciIsInRlYW0iLCJnZXRDdXJyZW50VGVhbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJMb2dpbkZhY3RvcnkiLCJsb2dpbldpdGhTbGFjayIsImdldFNsYWNrQ3JlZHMiLCJ0aGVuIiwic2xhY2siLCJjcmVkcyIsImNsaWVudElEIiwiY2xpZW50U2VjcmV0Iiwic2V0VXNlciIsImluZm8iLCJnbyIsImZhY3RvcnkiLCIkaHR0cCIsIiRyb290U2NvcGUiLCJpbml0aWFsaXplRmlyZWJhc2UiLCJhcGlLZXkiLCJhdXRoRG9tYWluIiwiZGF0YWJhc2VVUkwiLCJzdG9yYWdlQnVja2V0IiwibWVzc2FnaW5nU2VuZGVySWQiLCJmaXJlYmFzZSIsImluaXRpYWxpemVBcHAiLCJhZGRVc2VyIiwiZ2FtZU5hbWUiLCJ0ZWFtTmFtZSIsInBvc3QiLCJuYW1lIiwiY3JlYXRvcklkIiwicmVzIiwicmVmZiIsImRhdGFiYXNlIiwicmVmIiwiZ2FtZUlkIiwib24iLCJzbmFwc2hvdCIsInZhbCIsIiRicm9hZGNhc3QiLCJqb2luR2FtZUJ5SWQiLCJwbGF5ZXJJZCIsImNyZWF0ZUdhbWVCeUlkRmlyZUJhc2UiLCJmaXJlYmFzZWdhbWVJZCIsIm5ld1JlZiIsInB1c2giLCJzZXQiLCJyZXEiLCJxdWVyeSIsImdldERlY2tzQnlUZWFtSWQiLCJnZXRDYXJkc0J5Q3JlYXRvciIsInVzZXJJZCIsImdldFVzZXJzQnlHYW1lSWQiLCJnZXQiLCJnZXRHYW1lc0J5VXNlcklkIiwiZ2FtZXNSZWYiLCJvbmNlIiwiY3VycmVudFVzZXIiLCJjdXJyZW50VGVhbSIsIm1ldGhvZCIsImhlYWRlcnMiLCJzZXRMb2NhbFN0b3JhZ2UiLCJnZXRTbGFja0luZm8iXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0FBLE9BQUFDLEdBQUEsR0FBQUMsUUFBQUMsTUFBQSxDQUFBLHNCQUFBLEVBQUEsQ0FBQSxPQUFBLEVBQUEsV0FBQSxFQUFBLFdBQUEsRUFBQSxnQkFBQSxFQUFBLFdBQUEsQ0FBQSxDQUFBOztBQUVBRixJQUFBRyxHQUFBLENBQUEsVUFBQUMsY0FBQSxFQUFBO0FBQ0FBLG1CQUFBQyxLQUFBLENBQUEsWUFBQTtBQUNBLFlBQUFOLE9BQUFPLE9BQUEsSUFBQVAsT0FBQU8sT0FBQSxDQUFBQyxPQUFBLENBQUFDLFFBQUEsRUFBQTtBQUNBO0FBQ0E7QUFDQUYsb0JBQUFDLE9BQUEsQ0FBQUMsUUFBQSxDQUFBQyx3QkFBQSxDQUFB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QUE1QyxJQUFBLENBQUFZLElBQUEsQ0FBQSxDQUFBLENBQUE7QUFDQVgsd0JBQUFDLEdBQUEsQ0FBQSxNQUFBLEVBQUFZLEtBQUFDLFNBQUEsQ0FBQXdELFdBQUEsQ0FBQTtBQUNBLHNCQUFBRyxlQUFBO0FBQ0EsYUFkQSxDQUFBO0FBZUEsU0FqQkE7O0FBbUJBQyxzQkFBQSx3QkFBQTtBQUNBLG1CQUFBL0MsTUFBQXNDLEdBQUEsQ0FBQSxzQ0FBQSxDQUFBO0FBQ0EsU0FyQkE7O0FBdUJBUSx5QkFBQSwyQkFBQTtBQUNBakUsMEJBQUFDLElBQUEsR0FBQTRELFdBQUE7QUFDQTdELDBCQUFBRyxJQUFBLEdBQUEyRCxXQUFBO0FBQ0EsU0ExQkE7O0FBNEJBNUQsd0JBQUEsMEJBQUE7QUFDQVYsb0JBQUFDLEdBQUEsQ0FBQSx5QkFBQSxFQUFBWSxLQUFBQyxTQUFBLENBQUF1RCxXQUFBLENBQUE7QUFDQSxtQkFBQUEsV0FBQTtBQUNBLFNBL0JBOztBQWlDQXpELHdCQUFBLDBCQUFBO0FBQ0FaLG9CQUFBQyxHQUFBLENBQUEseUJBQUEsRUFBQVksS0FBQUMsU0FBQSxDQUFBd0QsV0FBQSxDQUFBO0FBQ0EsbUJBQUFBLFdBQUE7QUFFQTtBQXJDQSxLQUFBO0FBdUNBLENBMUNBO0FDQUEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIElvbmljIFN0YXJ0ZXIgQXBwXG5cbi8vIGFuZ3VsYXIubW9kdWxlIGlzIGEgZ2xvYmFsIHBsYWNlIGZvciBjcmVhdGluZywgcmVnaXN0ZXJpbmcgYW5kIHJldHJpZXZpbmcgQW5ndWxhciBtb2R1bGVzXG4vLyAnc3RhcnRlcicgaXMgdGhlIG5hbWUgb2YgdGhpcyBhbmd1bGFyIG1vZHVsZSBleGFtcGxlIChhbHNvIHNldCBpbiBhIDxib2R5PiBhdHRyaWJ1dGUgaW4gaW5kZXguaHRtbClcbi8vIHRoZSAybmQgcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9mICdyZXF1aXJlcydcbndpbmRvdy5hcHAgPSBhbmd1bGFyLm1vZHVsZSgnQmxhbmtBZ2FpbnN0SHVtYW5pdHknLCBbJ2lvbmljJywgJ3VpLnJvdXRlcicsJ25nQ29yZG92YScsJ25nQ29yZG92YU9hdXRoJywgJ25nU3RvcmFnZSddKVxuXG5hcHAucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtKSB7XG4gICAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICAgICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAgICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuXG4gICAgICAgICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcbiAgICAgICAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxuICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgICAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG59KVxuIiwiLy8gKGZ1bmN0aW9uICgpIHtcblxuLy8gICAgICd1c2Ugc3RyaWN0JztcblxuLy8gICAgIC8vIEhvcGUgeW91IGRpZG4ndCBmb3JnZXQgQW5ndWxhciEgRHVoLWRveS5cbi8vICAgICBpZiAoIXdpbmRvdy5hbmd1bGFyKSB0aHJvdyBuZXcgRXJyb3IoJ0kgY2FuXFwndCBmaW5kIEFuZ3VsYXIhJyk7XG5cbi8vICAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2ZzYVByZUJ1aWx0JywgW10pO1xuXG4vLyAgICAgYXBwLmZhY3RvcnkoJ1NvY2tldCcsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgaWYgKCF3aW5kb3cuaW8pIHRocm93IG5ldyBFcnJvcignc29ja2V0LmlvIG5vdCBmb3VuZCEnKTtcbi8vICAgICAgICAgcmV0dXJuIHdpbmRvdy5pbyh3aW5kb3cubG9jYXRpb24ub3JpZ2luKTtcbi8vICAgICB9KTtcblxuLy8gICAgIC8vIEFVVEhfRVZFTlRTIGlzIHVzZWQgdGhyb3VnaG91dCBvdXIgYXBwIHRvXG4vLyAgICAgLy8gYnJvYWRjYXN0IGFuZCBsaXN0ZW4gZnJvbSBhbmQgdG8gdGhlICRyb290U2NvcGVcbi8vICAgICAvLyBmb3IgaW1wb3J0YW50IGV2ZW50cyBhYm91dCBhdXRoZW50aWNhdGlvbiBmbG93LlxuLy8gICAgIGFwcC5jb25zdGFudCgnQVVUSF9FVkVOVFMnLCB7XG4vLyAgICAgICAgIGxvZ2luU3VjY2VzczogJ2F1dGgtbG9naW4tc3VjY2VzcycsXG4vLyAgICAgICAgIGxvZ2luRmFpbGVkOiAnYXV0aC1sb2dpbi1mYWlsZWQnLFxuLy8gICAgICAgICBsb2dvdXRTdWNjZXNzOiAnYXV0aC1sb2dvdXQtc3VjY2VzcycsXG4vLyAgICAgICAgIHNlc3Npb25UaW1lb3V0OiAnYXV0aC1zZXNzaW9uLXRpbWVvdXQnLFxuLy8gICAgICAgICBub3RBdXRoZW50aWNhdGVkOiAnYXV0aC1ub3QtYXV0aGVudGljYXRlZCcsXG4vLyAgICAgICAgIG5vdEF1dGhvcml6ZWQ6ICdhdXRoLW5vdC1hdXRob3JpemVkJ1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLmZhY3RvcnkoJ0F1dGhJbnRlcmNlcHRvcicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkcSwgQVVUSF9FVkVOVFMpIHtcbi8vICAgICAgICAgdmFyIHN0YXR1c0RpY3QgPSB7XG4vLyAgICAgICAgICAgICA0MDE6IEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsXG4vLyAgICAgICAgICAgICA0MDM6IEFVVEhfRVZFTlRTLm5vdEF1dGhvcml6ZWQsXG4vLyAgICAgICAgICAgICA0MTk6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0LFxuLy8gICAgICAgICAgICAgNDQwOiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dFxuLy8gICAgICAgICB9O1xuLy8gICAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAgICAgcmVzcG9uc2VFcnJvcjogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KHN0YXR1c0RpY3RbcmVzcG9uc2Uuc3RhdHVzXSwgcmVzcG9uc2UpO1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzcG9uc2UpXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH07XG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuY29uZmlnKGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XG4vLyAgICAgICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goW1xuLy8gICAgICAgICAgICAgJyRpbmplY3RvcicsXG4vLyAgICAgICAgICAgICBmdW5jdGlvbiAoJGluamVjdG9yKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRpbmplY3Rvci5nZXQoJ0F1dGhJbnRlcmNlcHRvcicpO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICBdKTtcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5zZXJ2aWNlKCdBdXRoU2VydmljZScsIGZ1bmN0aW9uICgkaHR0cCwgU2Vzc2lvbiwgJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMsICRxKSB7XG5cbi8vICAgICAgICAgZnVuY3Rpb24gb25TdWNjZXNzZnVsTG9naW4ocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgIHZhciB1c2VyID0gcmVzcG9uc2UuZGF0YS51c2VyO1xuLy8gICAgICAgICAgICAgU2Vzc2lvbi5jcmVhdGUodXNlcik7XG4vLyAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoQVVUSF9FVkVOVFMubG9naW5TdWNjZXNzKTtcbi8vICAgICAgICAgICAgIHJldHVybiB1c2VyO1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgLy8gVXNlcyB0aGUgc2Vzc2lvbiBmYWN0b3J5IHRvIHNlZSBpZiBhblxuLy8gICAgICAgICAvLyBhdXRoZW50aWNhdGVkIHVzZXIgaXMgY3VycmVudGx5IHJlZ2lzdGVyZWQuXG4vLyAgICAgICAgIHRoaXMuaXNBdXRoZW50aWNhdGVkID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuICEhU2Vzc2lvbi51c2VyO1xuLy8gICAgICAgICB9O1xuXG4gICAgICAgIFxuLy8gICAgICAgICB0aGlzLmlzQWRtaW4gPSBmdW5jdGlvbih1c2VySWQpe1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ3J1bm5pbmcgYWRtaW4gZnVuYycpXG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpXG4vLyAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhLnVzZXIuaXNBZG1pbilcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIHRoaXMuZ2V0TG9nZ2VkSW5Vc2VyID0gZnVuY3Rpb24gKGZyb21TZXJ2ZXIpIHtcblxuLy8gICAgICAgICAgICAgLy8gSWYgYW4gYXV0aGVudGljYXRlZCBzZXNzaW9uIGV4aXN0cywgd2Vcbi8vICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgdXNlciBhdHRhY2hlZCB0byB0aGF0IHNlc3Npb25cbi8vICAgICAgICAgICAgIC8vIHdpdGggYSBwcm9taXNlLiBUaGlzIGVuc3VyZXMgdGhhdCB3ZSBjYW5cbi8vICAgICAgICAgICAgIC8vIGFsd2F5cyBpbnRlcmZhY2Ugd2l0aCB0aGlzIG1ldGhvZCBhc3luY2hyb25vdXNseS5cblxuLy8gICAgICAgICAgICAgLy8gT3B0aW9uYWxseSwgaWYgdHJ1ZSBpcyBnaXZlbiBhcyB0aGUgZnJvbVNlcnZlciBwYXJhbWV0ZXIsXG4vLyAgICAgICAgICAgICAvLyB0aGVuIHRoaXMgY2FjaGVkIHZhbHVlIHdpbGwgbm90IGJlIHVzZWQuXG5cbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlzQXV0aGVudGljYXRlZCgpICYmIGZyb21TZXJ2ZXIgIT09IHRydWUpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbihTZXNzaW9uLnVzZXIpO1xuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICAvLyBNYWtlIHJlcXVlc3QgR0VUIC9zZXNzaW9uLlxuLy8gICAgICAgICAgICAgLy8gSWYgaXQgcmV0dXJucyBhIHVzZXIsIGNhbGwgb25TdWNjZXNzZnVsTG9naW4gd2l0aCB0aGUgcmVzcG9uc2UuXG4vLyAgICAgICAgICAgICAvLyBJZiBpdCByZXR1cm5zIGEgNDAxIHJlc3BvbnNlLCB3ZSBjYXRjaCBpdCBhbmQgaW5zdGVhZCByZXNvbHZlIHRvIG51bGwuXG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbi8vICAgICAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5sb2dpbiA9IGZ1bmN0aW9uIChjcmVkZW50aWFscykge1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9sb2dpbicsIGNyZWRlbnRpYWxzKVxuLy8gICAgICAgICAgICAgICAgIC50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKVxuLy8gICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QoeyBtZXNzYWdlOiAnSW52YWxpZCBsb2dpbiBjcmVkZW50aWFscy4nfSk7XG4vLyAgICAgICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5zaWdudXAgPSBmdW5jdGlvbihjcmVkZW50aWFscyl7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuLy8gICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuLy8gICAgICAgICAgICAgICAgIHVybDogJy9zaWdudXAnLFxuLy8gICAgICAgICAgICAgICAgIGRhdGE6IGNyZWRlbnRpYWxzXG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5kYXRhKVxuLy8gICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKCl7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCh7bWVzc2FnZTogJ1RoYXQgZW1haWwgaXMgYWxyZWFkeSBiZWluZyB1c2VkLid9KTtcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5sb2dvdXQgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvbG9nb3V0JykudGhlbihmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgU2Vzc2lvbi5kZXN0cm95KCk7XG4vLyAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ291dFN1Y2Nlc3MpO1xuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5zZXJ2aWNlKCdTZXNzaW9uJywgZnVuY3Rpb24gKCRyb290U2NvcGUsIEFVVEhfRVZFTlRTKSB7XG5cbi8vICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4vLyAgICAgICAgICRyb290U2NvcGUuJG9uKEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCwgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgc2VsZi5kZXN0cm95KCk7XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XG5cbi8vICAgICAgICAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbiAodXNlcikge1xuLy8gICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgfSk7XG5cbi8vIH0oKSk7XG4iLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlcikgPT4ge1xuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdnYW1lJywge1xuICAgICAgICB1cmw6ICcvZ2FtZS86dGVhbUlkJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL2dhbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdHYW1lQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIHRlYW1HYW1lczogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQoJHN0YXRlUGFyYW1zLnRlYW1JZCkgLy9zdGF0ZVBhcmFtcy50ZWFtSWRcbiAgICAgICAgfVxuICAgIH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignR2FtZUN0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgdGVhbUdhbWVzKSA9PiB7XG4gICAgJHNjb3BlLnN0YXJ0TmV3R2FtZSA9IEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZTtcbiAgICAkc2NvcGUuJG9uKCdjaGFuZ2VkR2FtZScsIChldmVudCwgZGF0YSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygncmVjZWl2ZWQgZXZlbnQnKVxuICAgICAgICBjb25zb2xlLmxvZygnZGF0YSBvYmo6JywgZGF0YSlcbiAgICAgICAgJHNjb3BlLmdhbWUgPSBkYXRhO1xuICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpXG5cbiAgICB9KVxuICAgICRzY29wZS5nYW1lcyA9IHRlYW1HYW1lcztcbiAgICBjb25zb2xlLmxvZygndGVhbWdhbWVzICcsIHRlYW1HYW1lcylcbn0pXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKXtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2hvbWUnLCB7XG5cdFx0dXJsOiAnLycsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9ob21lL2hvbWUuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0hvbWVDdHJsJyxcblx0fSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdIb21lQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCAkY29yZG92YU9hdXRoLCBVc2VyRmFjdG9yeSwgJGxvY2FsU3RvcmFnZSl7XG5cdCRzY29wZS51c2VyID0gJGxvY2FsU3RvcmFnZS51c2VyIHx8IFVzZXJGYWN0b3J5LmdldEN1cnJlbnRVc2VyKCk7XG5cdCRzY29wZS50ZWFtID0gJGxvY2FsU3RvcmFnZS50ZWFtIHx8IFVzZXJGYWN0b3J5LmdldEN1cnJlbnRUZWFtKCk7XG5cdC8vICRsb2NhbFN0b3JhZ2UudXNlciA9ICRzY29wZS51c2VyXG5cdC8vICRsb2NhbFN0b3JhZ2UudGVhbSA9ICRzY29wZS50ZWFtXG5cdC8vIGNvbnNvbGUubG9nKFwibG9jYWwgc3RvcmFnZVwiLCBKU09OLnN0cmluZ2lmeSgkbG9jYWxTdG9yYWdlKSlcblx0Y29uc29sZS5sb2coXCJ1c2VyIGluIGhvbWUgY29udHJvbGxlclwiLCBKU09OLnN0cmluZ2lmeSgkc2NvcGUudXNlcikpXG5cdGNvbnNvbGUubG9nKFwidGVhbSBpbiBob21lIGNvbnRyb2xsZXJcIiwgSlNPTi5zdHJpbmdpZnkoJHNjb3BlLnRlYW0pKVxuXHRjb25zb2xlLmxvZyhcImxvY2FsIHN0b3JhZ2VcIiwgSlNPTi5zdHJpbmdpZnkoJGxvY2FsU3RvcmFnZSkpO1xufSkiLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKXtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2xvZ2luJywge1xuXHRcdHVybDogJy9sb2dpbicsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9sb2dpbi9sb2dpbi5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnTG9naW5DdHJsJ1xuXHR9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCBMb2dpbkZhY3RvcnksIFVzZXJGYWN0b3J5LCAkY29yZG92YU9hdXRoLCAkbG9jYWxTdG9yYWdlKXtcblx0Y29uc29sZS5sb2coXCJub3cgaW4gbG9naW4gc3RhdGVcIilcbiBcdCRzY29wZS5sb2dpbldpdGhTbGFjayA9IGZ1bmN0aW9uKCl7XG4gXHRcdGNvbnNvbGUubG9nKFwiaW0gYmVpbmcgY2FsbGVkXCIpXG4gXHRcdHJldHVybiBMb2dpbkZhY3RvcnkuZ2V0U2xhY2tDcmVkcygpXG4gXHRcdC50aGVuKGNyZWRzID0+e1xuIFx0XHRcdGNvbnNvbGUubG9nKFwiZ290IHRvIG9hdXRoIHN0ZXBcIilcbiBcdFx0XHRyZXR1cm4gJGNvcmRvdmFPYXV0aC5zbGFjayhjcmVkcy5jbGllbnRJRCwgY3JlZHMuY2xpZW50U2VjcmV0LCBbJ2lkZW50aXR5LmJhc2ljJywgJ2lkZW50aXR5LnRlYW0nLCAnaWRlbnRpdHkuYXZhdGFyJ10pXG4gXHRcdH0pXG4gXHRcdC50aGVuKGluZm8gPT4gVXNlckZhY3Rvcnkuc2V0VXNlcihpbmZvKSlcbiBcdFx0LnRoZW4oKCkgPT4ge1xuIFx0XHRcdCRzdGF0ZS5nbygnaG9tZScpO1xuIFx0XHR9KVxuIFx0fVxuXG4gXHQkc2NvcGUudXNlciA9ICRsb2NhbFN0b3JhZ2UudXNlciB8fCBVc2VyRmFjdG9yeS5nZXRDdXJyZW50VXNlcigpO1xuIFx0JHNjb3BlLnRlYW0gPSAkbG9jYWxTdG9yYWdlLnRlYW0gfHwgVXNlckZhY3RvcnkuZ2V0Q3VycmVudFRlYW0oKTtcblxuIFx0Y29uc29sZS5sb2coXCJ1c2VyIGluIGxvZ2luIGpzXCIsICRzY29wZS51c2VyKTtcbiBcdGNvbnNvbGUubG9nKFwidGVhbSBpbiBsb2dpbiBqc1wiLCAkc2NvcGUudGVhbSk7XG59KSIsImFwcC5mYWN0b3J5KCdHYW1lRmFjdG9yeScsICgkaHR0cCwgJHJvb3RTY29wZSkgPT4ge1xuICAgIGNvbnN0IEdhbWVGYWN0b3J5ID0ge307XG5cbiAgICBjb25zdCBpbml0aWFsaXplRmlyZWJhc2UgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgICAgICAgIGFwaUtleTogXCJBSXphU3lELXREZXZYdmlweXVFNWx6aGVXQVJxNGh1dTFVbXFvSmtcIixcbiAgICAgICAgICAgIGF1dGhEb21haW46IFwiY2Fwc3RvbmUtZmIwZTguZmlyZWJhc2VhcHAuY29tXCIsXG4gICAgICAgICAgICBkYXRhYmFzZVVSTDogXCJodHRwczovL2NhcHN0b25lLWZiMGU4LmZpcmViYXNlaW8uY29tXCIsXG4gICAgICAgICAgICBzdG9yYWdlQnVja2V0OiBcImNhcHN0b25lLWZiMGU4LmFwcHNwb3QuY29tXCIsXG4gICAgICAgICAgICBtZXNzYWdpbmdTZW5kZXJJZDogXCI4NDk4Mzk2ODAxMDdcIlxuICAgICAgICB9O1xuICAgICAgICBmaXJlYmFzZS5pbml0aWFsaXplQXBwKGNvbmZpZyk7XG4gICAgfTtcbiAgICBpbml0aWFsaXplRmlyZWJhc2UoKTtcblxuXG4gICAgR2FtZUZhY3RvcnkuYWRkVXNlciA9ICgpID0+IHtcblxuICAgIH07XG5cbiAgICBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWUgPSAoZ2FtZU5hbWUsIHRlYW1OYW1lKSA9PiB7XG4gICAgICAgIC8vcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKS50aGVuKHVzZXJJZCA9PiB7XG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCdodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2dhbWVzJywge1xuICAgICAgICAgICAgICAgIG5hbWU6IGdhbWVOYW1lIHx8ICdCb3JpbmcgTmFtZScsXG4gICAgICAgICAgICAgICAgdGVhbUlkOiB0ZWFtSWQgfHwgMixcbiAgICAgICAgICAgICAgICBjcmVhdG9ySWQ6IDJcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgICAgICAudGhlbihnYW1lSWQgPT4ge1xuICAgICAgICAgICAgICAgIC8vY29uc3QgcmVmZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGAvZ2FtZXMvYClcbiAgICAgICAgICAgICAgICBjb25zdCByZWZmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYC9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAgICAgICAgIHJlZmYub24oJ3ZhbHVlJywgc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdjaGFuZ2VkR2FtZScsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vc2V0IHVwIHdhdGNoZXJcbiAgICB9O1xuXG5cbiAgICBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdqb2luaW5nIGdhbWUnKVxuICAgICAgICAgICAgLy92YXIgcGxheWVyc1RlYW0gPSBcbiAgICAgICAgdmFyIGdhbWVJZCA9IDg7XG4gICAgICAgIHZhciBwbGF5ZXJJZCA9IDI7IC8vZXZlbnR1YWxseSBtYWtlIGl0IGdldCBjdXJyZW50IFxuICAgICAgICByZXR1cm4gJGh0dHAucG9zdChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0/cGxheWVySWQ9JHtwbGF5ZXJJZH1gLCB7XG5cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvL1xuICAgIEdhbWVGYWN0b3J5LmNyZWF0ZUdhbWVCeUlkRmlyZUJhc2UgPSAoZmlyZWJhc2VnYW1lSWQpID0+IHtcbiAgICAgICAgLy9yZXR1cm4gJGh0dHAucG9zdChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9maXJlYmFzZS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAvL25lZWRzIHRvIGJlIC50aGVuYWJsZVxuICAgICAgICBjb25zdCBuZXdSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgZ2FtZXMvJHtmaXJlYmFzZWdhbWVJZH1gKS5wdXNoKCk7XG4gICAgICAgIG5ld1JlZi5zZXQoe1xuICAgICAgICAgICAgcGxheWVySWQ6IHJlcS5xdWVyeS5wbGF5ZXJJZFxuICAgICAgICB9KTtcblxuICAgIH1cblxuXG4gICAgLy92cyBnZXRDYXJkc0J5VGVhbUlkXG4gICAgR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCA9ICh0ZWFtSWQpID0+IHtcblxuICAgIH07XG5cbiAgICBHYW1lRmFjdG9yeS5nZXRDYXJkc0J5Q3JlYXRvciA9ICh1c2VySWQpID0+IHtcblxuICAgIH1cblxuICAgIEdhbWVGYWN0b3J5LmdldFVzZXJzQnlHYW1lSWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZ2FtZXMvJHtnYW1lSWR9L3VzZXJzYCk7XG4gICAgfTtcblxuXG4gICAgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVVzZXJJZCA9ICh1c2VySWQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZ2FtZXMvP3VzZXJJZD0ke3VzZXJJZH1gKVxuICAgICAgICB9XG4gICAgICAgIC8vIC50aGVuKGNyZWF0ZWRHYW1lID0+XG4gICAgICAgIC8vICAgICAvL2FkZHdhdGNoZXIgdG8gZ2FtZSBpZCBpbiBmaXJlYmFzZSlcbiAgICAgICAgLy8gICAgIHJldHVybiBjcmVhdGVkR2FtZVxuICAgICAgICAvLyB9O1xuXG5cblxuICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQgPSAodGVhbUlkKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd0aGUgdGVhbSBpcyBpZCcsIHRlYW1JZClcblxuICAgICAgICBjb25zdCBnYW1lc1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXNgKVxuICAgICAgICByZXR1cm4gZ2FtZXNSZWYub25jZSgndmFsdWUnKS50aGVuKHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGhlIHZhbCBpcycsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgIHJldHVybiBzbmFwc2hvdC52YWwoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2dhbWVzP3RlYW1JZD0ke3RlYW1JZH1gKVxuICAgICAgICAgICAgLy8gICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcbiAgICAgICAgICAgIC8vLnRoZW4oZm91bmRHYW1lcyA9PiApXG4gICAgfTtcblxuXG5cbiAgICAvL2dldCBhbGwgZ2FtZXMgYnkgdGVhbSByb3V0ZVxuXG4gICAgcmV0dXJuIEdhbWVGYWN0b3J5O1xufSk7XG5cblxuXG4vLyBpbXBsZW1lbnQgam9pbmluZyBhIGdhbWUgdXNpbmcgLyBzZXNzaW9uICRodHRwIHJlcXVlc3QgaW4gYW4gYW5ndWxhciBmYWN0b3J5IGNhbGxlZCBHYW1lRmFjdG9yeSB0aGF0IGhpdHMgdGhlIHJvdXRlIC8gYXBpIC8gZ2FtZXMgLyDigKYuLmZ1bmN0aW9uIGpvaW5HYW1lQnlJZChnYW1lSWQpIHtcbi8vICAgICBjb25zdCB1c2VyID0gZ2V0TG9nZ2VkSW5Vc2VyKCkgLy9hc3N1bWVzLCBjb3VsZCBsYXRlciBiZSBvcHRpb25hbCBpbiBhZG1pbiBwYW5lbFxuLy8gICAgIGdldExPZ2dlZEluVVNlcigpLnRoZW4obG9nZ2VkVVNlciA9PiB7XG4vLyAgICAgICAgIGRvbuKAmSB0IG5lZWQgZ2FtZS5maW5kYnkgaWQsIGNhbiBqdXN0IGRvIGZiIHBhcnQgb2YgZ2FtZXJzIGluZGVwZW5kZW50bHkgLy9HYW1lLmZpbmRCeUlkKGdhbWVJZCApLnRoZW4oZm91bmRHYW1lID0+IGxldCBnYW1lUmVmID0gZmIuZGIucmVmKOKAmC8gICAgICAgICBnYW1lc+KAmStmb3VuZEdhbWUuaWQpKVxuLy8gICAgIH0pXG4vLyB9XG4vLyBzaWduIGluIGJ1dHRvblxuIiwiYXBwLmZhY3RvcnkoJ0xvZ2luRmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwKXtcblx0cmV0dXJuIHtcblx0XHRnZXRTbGFja0NyZWRzOiBmdW5jdGlvbigpe1xuXHRcdFx0cmV0dXJuICRodHRwLmdldCgnaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9zbGFjaycpXHRcblx0XHRcdFx0LnRoZW4ocmVzID0+IHtcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhcInJlcyBpbiBmYWN0b3J5XCIsIHJlcy5kYXRhKVxuXHRcdFx0XHRcdHJldHVybiByZXMuZGF0YVxuXHRcdFx0XHR9KVxuXHRcdH1cblx0fVxufSlcbiIsImFwcC5mYWN0b3J5KCdVc2VyRmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwLCAkbG9jYWxTdG9yYWdlKXtcblx0dmFyIGN1cnJlbnRVc2VyLCBjdXJyZW50VGVhbTsgXG5cblx0cmV0dXJuIHtcblx0XHRzZXRVc2VyOiBmdW5jdGlvbihpbmZvKXtcblx0XHRcdHJldHVybiAkaHR0cCh7XG5cdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdFx0XHR1cmw6ICdodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL3VzZXJzJyxcblx0XHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcblx0XHRcdFx0fSxcblx0XHRcdFx0ZGF0YTogaW5mb1xuXHRcdFx0fSlcblx0XHRcdC50aGVuKHJlcyA9PiB7XG5cdFx0XHRcdGN1cnJlbnRVc2VyID0gcmVzLmRhdGEudXNlclswXTtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJ1c2VyXCIsIEpTT04uc3RyaW5naWZ5KGN1cnJlbnRVc2VyKSk7XG5cdFx0XHRcdGN1cnJlbnRUZWFtID0gcmVzLmRhdGEudGVhbVswXTtcblx0XHRcdFx0Y29uc29sZS5sb2coXCJ0ZWFtXCIsIEpTT04uc3RyaW5naWZ5KGN1cnJlbnRUZWFtKSk7XG5cdFx0XHRcdHRoaXMuc2V0TG9jYWxTdG9yYWdlKCk7XG5cdFx0XHR9KVxuXHRcdH0sXG5cblx0XHRnZXRTbGFja0luZm86IGZ1bmN0aW9uKCl7XG5cdFx0XHRyZXR1cm4gJGh0dHAuZ2V0KCdodHRwczovL3NsYWNrLmNvbS9hcGkvdXNlcnMuaWRlbnRpdHknKVxuXHRcdH0sXG5cblx0XHRzZXRMb2NhbFN0b3JhZ2U6IGZ1bmN0aW9uKCl7XG5cdFx0XHQkbG9jYWxTdG9yYWdlLnVzZXIgPSBjdXJyZW50VXNlcjtcblx0XHRcdCRsb2NhbFN0b3JhZ2UudGVhbSA9IGN1cnJlbnRUZWFtO1xuXHRcdH0sXG5cblx0XHRnZXRDdXJyZW50VXNlcjogZnVuY3Rpb24oKXtcblx0XHRcdGNvbnNvbGUubG9nKFwiY3VycmVudCB1c2VyIGluIGZhY3RvcnlcIiwgSlNPTi5zdHJpbmdpZnkoY3VycmVudFVzZXIpKVxuXHRcdFx0cmV0dXJuIGN1cnJlbnRVc2VyXG5cdFx0fSxcblxuXHRcdGdldEN1cnJlbnRUZWFtOiBmdW5jdGlvbigpe1xuXHRcdFx0Y29uc29sZS5sb2coXCJjdXJyZW50IHRlYW0gaW4gZmFjdG9yeVwiLCBKU09OLnN0cmluZ2lmeShjdXJyZW50VGVhbSkpXG5cdFx0XHRyZXR1cm4gY3VycmVudFRlYW1cblxuXHRcdH1cblx0fVxufSkiLCIvL0RpcmVjdGl2ZSBGaWxlIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
