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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImZyb20gZnNnL2Zyb20tZnNnLmpzIiwiaG9tZS9ob21lLmpzIiwibG9naW4vbG9naW4uanMiLCJnYW1lL2dhbWUuanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiLCJjb21tb24vZmFjdG9yaWVzL0dhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9sb2dpbkZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yaWVzL3VzZXJGYWN0b3J5LmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImFwcCIsImFuZ3VsYXIiLCJtb2R1bGUiLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZURlZmF1bHQiLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsInN0YXRlIiwidXJsIiwidGVtcGxhdGVVcmwiLCJjb250cm9sbGVyIiwiJHNjb3BlIiwiJHN0YXRlIiwiJGNvcmRvdmFPYXV0aCIsIlVzZXJGYWN0b3J5IiwiJGxvY2FsU3RvcmFnZSIsInVzZXIiLCJnZXRDdXJyZW50VXNlciIsInRlYW0iLCJnZXRDdXJyZW50VGVhbSIsImNvbnNvbGUiLCJsb2ciLCJKU09OIiwic3RyaW5naWZ5IiwiTG9naW5GYWN0b3J5IiwibG9naW5XaXRoU2xhY2siLCJnZXRTbGFja0NyZWRzIiwidGhlbiIsInNsYWNrIiwiY3JlZHMiLCJjbGllbnRJRCIsImNsaWVudFNlY3JldCIsInNldFVzZXIiLCJpbmZvIiwiZ28iLCJyZXNvbHZlIiwidGVhbUdhbWVzIiwiR2FtZUZhY3RvcnkiLCIkc3RhdGVQYXJhbXMiLCJnZXRHYW1lc0J5VGVhbUlkIiwidGVhbUlkIiwic3RhcnROZXdHYW1lIiwiJG9uIiwiZXZlbnQiLCJkYXRhIiwiZ2FtZSIsIiRkaWdlc3QiLCJnYW1lcyIsImZhY3RvcnkiLCIkaHR0cCIsIiRyb290U2NvcGUiLCJpbml0aWFsaXplRmlyZWJhc2UiLCJhcGlLZXkiLCJhdXRoRG9tYWluIiwiZGF0YWJhc2VVUkwiLCJzdG9yYWdlQnVja2V0IiwibWVzc2FnaW5nU2VuZGVySWQiLCJmaXJlYmFzZSIsImluaXRpYWxpemVBcHAiLCJhZGRVc2VyIiwiZ2FtZU5hbWUiLCJ0ZWFtTmFtZSIsInBvc3QiLCJuYW1lIiwiY3JlYXRvcklkIiwicmVzIiwicmVmZiIsImRhdGFiYXNlIiwicmVmIiwiZ2FtZUlkIiwib24iLCJzbmFwc2hvdCIsInZhbCIsIiRicm9hZGNhc3QiLCJqb2luR2FtZUJ5SWQiLCJwbGF5ZXJJZCIsImNyZWF0ZUdhbWVCeUlkRmlyZUJhc2UiLCJmaXJlYmFzZWdhbWVJZCIsIm5ld1JlZiIsInB1c2giLCJzZXQiLCJyZXEiLCJxdWVyeSIsImdldERlY2tzQnlUZWFtSWQiLCJnZXRDYXJkc0J5Q3JlYXRvciIsInVzZXJJZCIsImdldFVzZXJzQnlHYW1lSWQiLCJnZXQiLCJnZXRHYW1lc0J5VXNlcklkIiwiZ2FtZXNSZWYiLCJvbmNlIiwiY3VycmVudFVzZXIiLCJjdXJyZW50VGVhbSIsIm1ldGhvZCIsImhlYWRlcnMiLCJzZXRMb2NhbFN0b3JhZ2UiLCJnZXRTbGFja0luZm8iXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0FBLE9BQUFDLEdBQUEsR0FBQUMsUUFBQUMsTUFBQSxDQUFBLHNCQUFBLEVBQUEsQ0FBQSxPQUFBLEVBQUEsV0FBQSxFQUFBLFdBQUEsRUFBQSxnQkFBQSxFQUFBLFdBQUEsQ0FBQSxDQUFBOztBQUVBRixJQUFBRyxHQUFBLENBQUEsVUFBQUMsY0FBQSxFQUFBO0FBQ0FBLG1CQUFBQyxLQUFBLENBQUEsWUFBQTtBQUNBLFlBQUFOLE9BQUFPLE9BQUEsSUFBQVAsT0FBQU8sT0FBQSxDQUFBQyxPQUFBLENBQUFDLFFBQUEsRUFBQTtBQUNBO0FBQ0E7QUFDQUYsb0JBQUFDLE9BQUEsQ0FBQUMsUUFBQSxDQUFBQyx3QkFBQSxDQUFB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LDhCQUFBM0IsSUFBQXJCLElBQUEsQ0FBQTFCLElBQUEsQ0FBQSxDQUFBLENBQUE7QUFDQUUsd0JBQUFDLEdBQUEsQ0FBQSxNQUFBLEVBQUFDLEtBQUFDLFNBQUEsQ0FBQXFFLFdBQUEsQ0FBQTtBQUNBLHNCQUFBRyxlQUFBO0FBQ0EsYUFkQSxDQUFBO0FBZUEsU0FqQkE7O0FBbUJBQyxzQkFBQSx3QkFBQTtBQUNBLG1CQUFBL0MsTUFBQXNDLEdBQUEsQ0FBQSxzQ0FBQSxDQUFBO0FBQ0EsU0FyQkE7O0FBdUJBUSx5QkFBQSwyQkFBQTtBQUNBaEYsMEJBQUFDLElBQUEsR0FBQTJFLFdBQUE7QUFDQTVFLDBCQUFBRyxJQUFBLEdBQUEwRSxXQUFBO0FBQ0EsU0ExQkE7O0FBNEJBM0Usd0JBQUEsMEJBQUE7QUFDQUcsb0JBQUFDLEdBQUEsQ0FBQSx5QkFBQSxFQUFBQyxLQUFBQyxTQUFBLENBQUFvRSxXQUFBLENBQUE7QUFDQSxtQkFBQUEsV0FBQTtBQUNBLFNBL0JBOztBQWlDQXhFLHdCQUFBLDBCQUFBO0FBQ0FDLG9CQUFBQyxHQUFBLENBQUEseUJBQUEsRUFBQUMsS0FBQUMsU0FBQSxDQUFBcUUsV0FBQSxDQUFBO0FBQ0EsbUJBQUFBLFdBQUE7QUFFQTtBQXJDQSxLQUFBO0FBdUNBLENBMUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJb25pYyBTdGFydGVyIEFwcFxuXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xuLy8gJ3N0YXJ0ZXInIGlzIHRoZSBuYW1lIG9mIHRoaXMgYW5ndWxhciBtb2R1bGUgZXhhbXBsZSAoYWxzbyBzZXQgaW4gYSA8Ym9keT4gYXR0cmlidXRlIGluIGluZGV4Lmh0bWwpXG4vLyB0aGUgMm5kIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiAncmVxdWlyZXMnXG53aW5kb3cuYXBwID0gYW5ndWxhci5tb2R1bGUoJ0JsYW5rQWdhaW5zdEh1bWFuaXR5JywgWydpb25pYycsICd1aS5yb3V0ZXInLCduZ0NvcmRvdmEnLCduZ0NvcmRvdmFPYXV0aCcsICduZ1N0b3JhZ2UnXSlcblxuYXBwLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxuICAgICAgICAgICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcblxuICAgICAgICAgICAgLy8gRG9uJ3QgcmVtb3ZlIHRoaXMgbGluZSB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nLiBJdCBzdG9wcyB0aGUgdmlld3BvcnRcbiAgICAgICAgICAgIC8vIGZyb20gc25hcHBpbmcgd2hlbiB0ZXh0IGlucHV0cyBhcmUgZm9jdXNlZC4gSW9uaWMgaGFuZGxlcyB0aGlzIGludGVybmFsbHkgZm9yXG4gICAgICAgICAgICAvLyBhIG11Y2ggbmljZXIga2V5Ym9hcmQgZXhwZXJpZW5jZS5cbiAgICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5kaXNhYmxlU2Nyb2xsKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICAgICAgICBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxufSlcbiIsIi8vIChmdW5jdGlvbiAoKSB7XG5cbi8vICAgICAndXNlIHN0cmljdCc7XG5cbi8vICAgICAvLyBIb3BlIHlvdSBkaWRuJ3QgZm9yZ2V0IEFuZ3VsYXIhIER1aC1kb3kuXG4vLyAgICAgaWYgKCF3aW5kb3cuYW5ndWxhcikgdGhyb3cgbmV3IEVycm9yKCdJIGNhblxcJ3QgZmluZCBBbmd1bGFyIScpO1xuXG4vLyAgICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdmc2FQcmVCdWlsdCcsIFtdKTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdTb2NrZXQnLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgIGlmICghd2luZG93LmlvKSB0aHJvdyBuZXcgRXJyb3IoJ3NvY2tldC5pbyBub3QgZm91bmQhJyk7XG4vLyAgICAgICAgIHJldHVybiB3aW5kb3cuaW8od2luZG93LmxvY2F0aW9uLm9yaWdpbik7XG4vLyAgICAgfSk7XG5cbi8vICAgICAvLyBBVVRIX0VWRU5UUyBpcyB1c2VkIHRocm91Z2hvdXQgb3VyIGFwcCB0b1xuLy8gICAgIC8vIGJyb2FkY2FzdCBhbmQgbGlzdGVuIGZyb20gYW5kIHRvIHRoZSAkcm9vdFNjb3BlXG4vLyAgICAgLy8gZm9yIGltcG9ydGFudCBldmVudHMgYWJvdXQgYXV0aGVudGljYXRpb24gZmxvdy5cbi8vICAgICBhcHAuY29uc3RhbnQoJ0FVVEhfRVZFTlRTJywge1xuLy8gICAgICAgICBsb2dpblN1Y2Nlc3M6ICdhdXRoLWxvZ2luLXN1Y2Nlc3MnLFxuLy8gICAgICAgICBsb2dpbkZhaWxlZDogJ2F1dGgtbG9naW4tZmFpbGVkJyxcbi8vICAgICAgICAgbG9nb3V0U3VjY2VzczogJ2F1dGgtbG9nb3V0LXN1Y2Nlc3MnLFxuLy8gICAgICAgICBzZXNzaW9uVGltZW91dDogJ2F1dGgtc2Vzc2lvbi10aW1lb3V0Jyxcbi8vICAgICAgICAgbm90QXV0aGVudGljYXRlZDogJ2F1dGgtbm90LWF1dGhlbnRpY2F0ZWQnLFxuLy8gICAgICAgICBub3RBdXRob3JpemVkOiAnYXV0aC1ub3QtYXV0aG9yaXplZCdcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdBdXRoSW50ZXJjZXB0b3InLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHEsIEFVVEhfRVZFTlRTKSB7XG4vLyAgICAgICAgIHZhciBzdGF0dXNEaWN0ID0ge1xuLy8gICAgICAgICAgICAgNDAxOiBBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLFxuLy8gICAgICAgICAgICAgNDAzOiBBVVRIX0VWRU5UUy5ub3RBdXRob3JpemVkLFxuLy8gICAgICAgICAgICAgNDE5OiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCxcbi8vICAgICAgICAgICAgIDQ0MDogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXRcbi8vICAgICAgICAgfTtcbi8vICAgICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgICAgIHJlc3BvbnNlRXJyb3I6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChzdGF0dXNEaWN0W3Jlc3BvbnNlLnN0YXR1c10sIHJlc3BvbnNlKTtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlc3BvbnNlKVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9O1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLmNvbmZpZyhmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xuLy8gICAgICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKFtcbi8vICAgICAgICAgICAgICckaW5qZWN0b3InLFxuLy8gICAgICAgICAgICAgZnVuY3Rpb24gKCRpbmplY3Rvcikge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkaW5qZWN0b3IuZ2V0KCdBdXRoSW50ZXJjZXB0b3InKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgXSk7XG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuc2VydmljZSgnQXV0aFNlcnZpY2UnLCBmdW5jdGlvbiAoJGh0dHAsIFNlc3Npb24sICRyb290U2NvcGUsIEFVVEhfRVZFTlRTLCAkcSkge1xuXG4vLyAgICAgICAgIGZ1bmN0aW9uIG9uU3VjY2Vzc2Z1bExvZ2luKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICB2YXIgdXNlciA9IHJlc3BvbnNlLmRhdGEudXNlcjtcbi8vICAgICAgICAgICAgIFNlc3Npb24uY3JlYXRlKHVzZXIpO1xuLy8gICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ2luU3VjY2Vzcyk7XG4vLyAgICAgICAgICAgICByZXR1cm4gdXNlcjtcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIC8vIFVzZXMgdGhlIHNlc3Npb24gZmFjdG9yeSB0byBzZWUgaWYgYW5cbi8vICAgICAgICAgLy8gYXV0aGVudGljYXRlZCB1c2VyIGlzIGN1cnJlbnRseSByZWdpc3RlcmVkLlxuLy8gICAgICAgICB0aGlzLmlzQXV0aGVudGljYXRlZCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAhIVNlc3Npb24udXNlcjtcbi8vICAgICAgICAgfTtcblxuICAgICAgICBcbi8vICAgICAgICAgdGhpcy5pc0FkbWluID0gZnVuY3Rpb24odXNlcklkKXtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdydW5uaW5nIGFkbWluIGZ1bmMnKVxuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKVxuLy8gICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YS51c2VyLmlzQWRtaW4pXG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICB0aGlzLmdldExvZ2dlZEluVXNlciA9IGZ1bmN0aW9uIChmcm9tU2VydmVyKSB7XG5cbi8vICAgICAgICAgICAgIC8vIElmIGFuIGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbiBleGlzdHMsIHdlXG4vLyAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIHVzZXIgYXR0YWNoZWQgdG8gdGhhdCBzZXNzaW9uXG4vLyAgICAgICAgICAgICAvLyB3aXRoIGEgcHJvbWlzZS4gVGhpcyBlbnN1cmVzIHRoYXQgd2UgY2FuXG4vLyAgICAgICAgICAgICAvLyBhbHdheXMgaW50ZXJmYWNlIHdpdGggdGhpcyBtZXRob2QgYXN5bmNocm9ub3VzbHkuXG5cbi8vICAgICAgICAgICAgIC8vIE9wdGlvbmFsbHksIGlmIHRydWUgaXMgZ2l2ZW4gYXMgdGhlIGZyb21TZXJ2ZXIgcGFyYW1ldGVyLFxuLy8gICAgICAgICAgICAgLy8gdGhlbiB0aGlzIGNhY2hlZCB2YWx1ZSB3aWxsIG5vdCBiZSB1c2VkLlxuXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSAmJiBmcm9tU2VydmVyICE9PSB0cnVlKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLndoZW4oU2Vzc2lvbi51c2VyKTtcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgLy8gTWFrZSByZXF1ZXN0IEdFVCAvc2Vzc2lvbi5cbi8vICAgICAgICAgICAgIC8vIElmIGl0IHJldHVybnMgYSB1c2VyLCBjYWxsIG9uU3VjY2Vzc2Z1bExvZ2luIHdpdGggdGhlIHJlc3BvbnNlLlxuLy8gICAgICAgICAgICAgLy8gSWYgaXQgcmV0dXJucyBhIDQwMSByZXNwb25zZSwgd2UgY2F0Y2ggaXQgYW5kIGluc3RlYWQgcmVzb2x2ZSB0byBudWxsLlxuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKS50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKS5jYXRjaChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4vLyAgICAgICAgICAgICB9KTtcblxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbiAoY3JlZGVudGlhbHMpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvbG9naW4nLCBjcmVkZW50aWFscylcbi8vICAgICAgICAgICAgICAgICAudGhlbihvblN1Y2Nlc3NmdWxMb2dpbilcbi8vICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHsgbWVzc2FnZTogJ0ludmFsaWQgbG9naW4gY3JlZGVudGlhbHMuJ30pO1xuLy8gICAgICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMuc2lnbnVwID0gZnVuY3Rpb24oY3JlZGVudGlhbHMpe1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbi8vICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbi8vICAgICAgICAgICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbi8vICAgICAgICAgICAgICAgICBkYXRhOiBjcmVkZW50aWFsc1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQuZGF0YSlcbi8vICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbigpe1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3Qoe21lc3NhZ2U6ICdUaGF0IGVtYWlsIGlzIGFscmVhZHkgYmVpbmcgdXNlZC4nfSk7XG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL2xvZ291dCcpLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgIFNlc3Npb24uZGVzdHJveSgpO1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dvdXRTdWNjZXNzKTtcbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuc2VydmljZSgnU2Vzc2lvbicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUykge1xuXG4vLyAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuLy8gICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICBzZWxmLmRlc3Ryb3koKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuXG4vLyAgICAgICAgIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24gKHVzZXIpIHtcbi8vICAgICAgICAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcbi8vICAgICAgICAgfTtcblxuLy8gICAgIH0pO1xuXG4vLyB9KCkpO1xuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcil7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lJywge1xuXHRcdHVybDogJy8nLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvaG9tZS9ob21lLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdIb21lQ3RybCcsXG5cdH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignSG9tZUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSwgJGNvcmRvdmFPYXV0aCwgVXNlckZhY3RvcnksICRsb2NhbFN0b3JhZ2Upe1xuXHQkc2NvcGUudXNlciA9ICRsb2NhbFN0b3JhZ2UudXNlciB8fCBVc2VyRmFjdG9yeS5nZXRDdXJyZW50VXNlcigpO1xuXHQkc2NvcGUudGVhbSA9ICRsb2NhbFN0b3JhZ2UudGVhbSB8fCBVc2VyRmFjdG9yeS5nZXRDdXJyZW50VGVhbSgpO1xuXHQvLyAkbG9jYWxTdG9yYWdlLnVzZXIgPSAkc2NvcGUudXNlclxuXHQvLyAkbG9jYWxTdG9yYWdlLnRlYW0gPSAkc2NvcGUudGVhbVxuXHQvLyBjb25zb2xlLmxvZyhcImxvY2FsIHN0b3JhZ2VcIiwgSlNPTi5zdHJpbmdpZnkoJGxvY2FsU3RvcmFnZSkpXG5cdGNvbnNvbGUubG9nKFwidXNlciBpbiBob21lIGNvbnRyb2xsZXJcIiwgSlNPTi5zdHJpbmdpZnkoJHNjb3BlLnVzZXIpKVxuXHRjb25zb2xlLmxvZyhcInRlYW0gaW4gaG9tZSBjb250cm9sbGVyXCIsIEpTT04uc3RyaW5naWZ5KCRzY29wZS50ZWFtKSlcblx0Y29uc29sZS5sb2coXCJsb2NhbCBzdG9yYWdlXCIsIEpTT04uc3RyaW5naWZ5KCRsb2NhbFN0b3JhZ2UpKTtcbn0pIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcil7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdsb2dpbicsIHtcblx0XHR1cmw6ICcvbG9naW4nLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvbG9naW4vbG9naW4uaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0xvZ2luQ3RybCdcblx0fSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdMb2dpbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSwgTG9naW5GYWN0b3J5LCBVc2VyRmFjdG9yeSwgJGNvcmRvdmFPYXV0aCwgJGxvY2FsU3RvcmFnZSl7XG5cdGNvbnNvbGUubG9nKFwibm93IGluIGxvZ2luIHN0YXRlXCIpXG4gXHQkc2NvcGUubG9naW5XaXRoU2xhY2sgPSBmdW5jdGlvbigpe1xuIFx0XHRjb25zb2xlLmxvZyhcImltIGJlaW5nIGNhbGxlZFwiKVxuIFx0XHRyZXR1cm4gTG9naW5GYWN0b3J5LmdldFNsYWNrQ3JlZHMoKVxuIFx0XHQudGhlbihjcmVkcyA9PntcbiBcdFx0XHRjb25zb2xlLmxvZyhcImdvdCB0byBvYXV0aCBzdGVwXCIpXG4gXHRcdFx0cmV0dXJuICRjb3Jkb3ZhT2F1dGguc2xhY2soY3JlZHMuY2xpZW50SUQsIGNyZWRzLmNsaWVudFNlY3JldCwgWydpZGVudGl0eS5iYXNpYycsICdpZGVudGl0eS50ZWFtJywgJ2lkZW50aXR5LmF2YXRhciddKVxuIFx0XHR9KVxuIFx0XHQudGhlbihpbmZvID0+IFVzZXJGYWN0b3J5LnNldFVzZXIoaW5mbykpXG4gXHRcdC50aGVuKCgpID0+IHtcbiBcdFx0XHQkc3RhdGUuZ28oJ2hvbWUnKTtcbiBcdFx0fSlcbiBcdH1cblxuIFx0JHNjb3BlLnVzZXIgPSAkbG9jYWxTdG9yYWdlLnVzZXIgfHwgVXNlckZhY3RvcnkuZ2V0Q3VycmVudFVzZXIoKTtcbiBcdCRzY29wZS50ZWFtID0gJGxvY2FsU3RvcmFnZS50ZWFtIHx8IFVzZXJGYWN0b3J5LmdldEN1cnJlbnRUZWFtKCk7XG5cbiBcdGNvbnNvbGUubG9nKFwidXNlciBpbiBsb2dpbiBqc1wiLCAkc2NvcGUudXNlcik7XG4gXHRjb25zb2xlLmxvZyhcInRlYW0gaW4gbG9naW4ganNcIiwgJHNjb3BlLnRlYW0pO1xufSkiLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlcikgPT4ge1xuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdnYW1lJywge1xuICAgICAgICB1cmw6ICcvZ2FtZS86dGVhbUlkJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL2dhbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdHYW1lQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIHRlYW1HYW1lczogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQoJHN0YXRlUGFyYW1zLnRlYW1JZCkgLy9zdGF0ZVBhcmFtcy50ZWFtSWRcbiAgICAgICAgfVxuICAgIH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignR2FtZUN0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgdGVhbUdhbWVzKSA9PiB7XG4gICAgJHNjb3BlLnN0YXJ0TmV3R2FtZSA9IEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZTtcbiAgICAkc2NvcGUuJG9uKCdjaGFuZ2VkR2FtZScsIChldmVudCwgZGF0YSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygncmVjZWl2ZWQgZXZlbnQnKVxuICAgICAgICBjb25zb2xlLmxvZygnZGF0YSBvYmo6JywgZGF0YSlcbiAgICAgICAgJHNjb3BlLmdhbWUgPSBkYXRhO1xuICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpXG5cbiAgICB9KVxuICAgICRzY29wZS5nYW1lcyA9IHRlYW1HYW1lcztcbiAgICBjb25zb2xlLmxvZygndGVhbWdhbWVzICcsIHRlYW1HYW1lcylcbn0pXG4iLCIvL0RpcmVjdGl2ZSBGaWxlIiwiYXBwLmZhY3RvcnkoJ0dhbWVGYWN0b3J5JywgKCRodHRwLCAkcm9vdFNjb3BlKSA9PiB7XG4gICAgY29uc3QgR2FtZUZhY3RvcnkgPSB7fTtcblxuICAgIGNvbnN0IGluaXRpYWxpemVGaXJlYmFzZSA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgICAgICAgYXBpS2V5OiBcIkFJemFTeUQtdERldlh2aXB5dUU1bHpoZVdBUnE0aHV1MVVtcW9Ka1wiLFxuICAgICAgICAgICAgYXV0aERvbWFpbjogXCJjYXBzdG9uZS1mYjBlOC5maXJlYmFzZWFwcC5jb21cIixcbiAgICAgICAgICAgIGRhdGFiYXNlVVJMOiBcImh0dHBzOi8vY2Fwc3RvbmUtZmIwZTguZmlyZWJhc2Vpby5jb21cIixcbiAgICAgICAgICAgIHN0b3JhZ2VCdWNrZXQ6IFwiY2Fwc3RvbmUtZmIwZTguYXBwc3BvdC5jb21cIixcbiAgICAgICAgICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjg0OTgzOTY4MDEwN1wiXG4gICAgICAgIH07XG4gICAgICAgIGZpcmViYXNlLmluaXRpYWxpemVBcHAoY29uZmlnKTtcbiAgICB9O1xuICAgIGluaXRpYWxpemVGaXJlYmFzZSgpO1xuXG5cbiAgICBHYW1lRmFjdG9yeS5hZGRVc2VyID0gKCkgPT4ge1xuXG4gICAgfTtcblxuICAgIEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZSA9IChnYW1lTmFtZSwgdGVhbU5hbWUpID0+IHtcbiAgICAgICAgLy9yZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpLnRoZW4odXNlcklkID0+IHtcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZ2FtZXMnLCB7XG4gICAgICAgICAgICAgICAgbmFtZTogZ2FtZU5hbWUgfHwgJ0JvcmluZyBOYW1lJyxcbiAgICAgICAgICAgICAgICB0ZWFtSWQ6IHRlYW1JZCB8fCAyLFxuICAgICAgICAgICAgICAgIGNyZWF0b3JJZDogMlxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcbiAgICAgICAgICAgIC50aGVuKGdhbWVJZCA9PiB7XG4gICAgICAgICAgICAgICAgLy9jb25zdCByZWZmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYC9nYW1lcy9gKVxuICAgICAgICAgICAgICAgIGNvbnN0IHJlZmYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgL2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICAgICAgcmVmZi5vbigndmFsdWUnLCBzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2NoYW5nZWRHYW1lJywgc25hcHNob3QudmFsKCkpXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLy9zZXQgdXAgd2F0Y2hlclxuICAgIH07XG5cblxuICAgIEdhbWVGYWN0b3J5LmpvaW5HYW1lQnlJZCA9IChnYW1lSWQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2pvaW5pbmcgZ2FtZScpXG4gICAgICAgICAgICAvL3ZhciBwbGF5ZXJzVGVhbSA9IFxuICAgICAgICB2YXIgZ2FtZUlkID0gODtcbiAgICAgICAgdmFyIHBsYXllcklkID0gMjsgLy9ldmVudHVhbGx5IG1ha2UgaXQgZ2V0IGN1cnJlbnQgXG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGBodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2dhbWVzLyR7Z2FtZUlkfT9wbGF5ZXJJZD0ke3BsYXllcklkfWAsIHtcblxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8vXG4gICAgR2FtZUZhY3RvcnkuY3JlYXRlR2FtZUJ5SWRGaXJlQmFzZSA9IChmaXJlYmFzZWdhbWVJZCkgPT4ge1xuICAgICAgICAvL3JldHVybiAkaHR0cC5wb3N0KGBodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2ZpcmViYXNlL2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgIC8vbmVlZHMgdG8gYmUgLnRoZW5hYmxlXG4gICAgICAgIGNvbnN0IG5ld1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBnYW1lcy8ke2ZpcmViYXNlZ2FtZUlkfWApLnB1c2goKTtcbiAgICAgICAgbmV3UmVmLnNldCh7XG4gICAgICAgICAgICBwbGF5ZXJJZDogcmVxLnF1ZXJ5LnBsYXllcklkXG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG5cbiAgICAvL3ZzIGdldENhcmRzQnlUZWFtSWRcbiAgICBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkID0gKHRlYW1JZCkgPT4ge1xuXG4gICAgfTtcblxuICAgIEdhbWVGYWN0b3J5LmdldENhcmRzQnlDcmVhdG9yID0gKHVzZXJJZCkgPT4ge1xuXG4gICAgfVxuXG4gICAgR2FtZUZhY3RvcnkuZ2V0VXNlcnNCeUdhbWVJZCA9IChnYW1lSWQpID0+IHtcbiAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0vdXNlcnNgKTtcbiAgICB9O1xuXG5cbiAgICBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VXNlcklkID0gKHVzZXJJZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9nYW1lcy8/dXNlcklkPSR7dXNlcklkfWApXG4gICAgICAgIH1cbiAgICAgICAgLy8gLnRoZW4oY3JlYXRlZEdhbWUgPT5cbiAgICAgICAgLy8gICAgIC8vYWRkd2F0Y2hlciB0byBnYW1lIGlkIGluIGZpcmViYXNlKVxuICAgICAgICAvLyAgICAgcmV0dXJuIGNyZWF0ZWRHYW1lXG4gICAgICAgIC8vIH07XG5cblxuXG4gICAgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCA9ICh0ZWFtSWQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3RoZSB0ZWFtIGlzIGlkJywgdGVhbUlkKVxuXG4gICAgICAgIGNvbnN0IGdhbWVzUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lc2ApXG4gICAgICAgIHJldHVybiBnYW1lc1JlZi5vbmNlKCd2YWx1ZScpLnRoZW4oc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGUgdmFsIGlzJywgc25hcHNob3QudmFsKCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNuYXBzaG90LnZhbCgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZ2FtZXM/dGVhbUlkPSR7dGVhbUlkfWApXG4gICAgICAgICAgICAvLyAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICAgICAgLy8udGhlbihmb3VuZEdhbWVzID0+IClcbiAgICB9O1xuXG5cblxuICAgIC8vZ2V0IGFsbCBnYW1lcyBieSB0ZWFtIHJvdXRlXG5cbiAgICByZXR1cm4gR2FtZUZhY3Rvcnk7XG59KTtcblxuXG5cbi8vIGltcGxlbWVudCBqb2luaW5nIGEgZ2FtZSB1c2luZyAvIHNlc3Npb24gJGh0dHAgcmVxdWVzdCBpbiBhbiBhbmd1bGFyIGZhY3RvcnkgY2FsbGVkIEdhbWVGYWN0b3J5IHRoYXQgaGl0cyB0aGUgcm91dGUgLyBhcGkgLyBnYW1lcyAvIOKApi4uZnVuY3Rpb24gam9pbkdhbWVCeUlkKGdhbWVJZCkge1xuLy8gICAgIGNvbnN0IHVzZXIgPSBnZXRMb2dnZWRJblVzZXIoKSAvL2Fzc3VtZXMsIGNvdWxkIGxhdGVyIGJlIG9wdGlvbmFsIGluIGFkbWluIHBhbmVsXG4vLyAgICAgZ2V0TE9nZ2VkSW5VU2VyKCkudGhlbihsb2dnZWRVU2VyID0+IHtcbi8vICAgICAgICAgZG9u4oCZIHQgbmVlZCBnYW1lLmZpbmRieSBpZCwgY2FuIGp1c3QgZG8gZmIgcGFydCBvZiBnYW1lcnMgaW5kZXBlbmRlbnRseSAvL0dhbWUuZmluZEJ5SWQoZ2FtZUlkICkudGhlbihmb3VuZEdhbWUgPT4gbGV0IGdhbWVSZWYgPSBmYi5kYi5yZWYo4oCYLyAgICAgICAgIGdhbWVz4oCZK2ZvdW5kR2FtZS5pZCkpXG4vLyAgICAgfSlcbi8vIH1cbi8vIHNpZ24gaW4gYnV0dG9uXG4iLCJhcHAuZmFjdG9yeSgnTG9naW5GYWN0b3J5JywgZnVuY3Rpb24oJGh0dHApe1xuXHRyZXR1cm4ge1xuXHRcdGdldFNsYWNrQ3JlZHM6IGZ1bmN0aW9uKCl7XG5cdFx0XHRyZXR1cm4gJGh0dHAuZ2V0KCdodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL3NsYWNrJylcdFxuXHRcdFx0XHQudGhlbihyZXMgPT4ge1xuXHRcdFx0XHRcdGNvbnNvbGUubG9nKFwicmVzIGluIGZhY3RvcnlcIiwgcmVzLmRhdGEpXG5cdFx0XHRcdFx0cmV0dXJuIHJlcy5kYXRhXG5cdFx0XHRcdH0pXG5cdFx0fVxuXHR9XG59KVxuIiwiYXBwLmZhY3RvcnkoJ1VzZXJGYWN0b3J5JywgZnVuY3Rpb24oJGh0dHAsICRsb2NhbFN0b3JhZ2Upe1xuXHR2YXIgY3VycmVudFVzZXIsIGN1cnJlbnRUZWFtOyBcblxuXHRyZXR1cm4ge1xuXHRcdHNldFVzZXI6IGZ1bmN0aW9uKGluZm8pe1xuXHRcdFx0cmV0dXJuICRodHRwKHtcblx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRcdHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvdXNlcnMnLFxuXHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRkYXRhOiBpbmZvXG5cdFx0XHR9KVxuXHRcdFx0LnRoZW4ocmVzID0+IHtcblx0XHRcdFx0Y3VycmVudFVzZXIgPSByZXMuZGF0YS51c2VyWzBdO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcInVzZXJcIiwgSlNPTi5zdHJpbmdpZnkoY3VycmVudFVzZXIpKTtcblx0XHRcdFx0Y3VycmVudFRlYW0gPSByZXMuZGF0YS50ZWFtWzBdO1xuXHRcdFx0XHRjb25zb2xlLmxvZyhcInRlYW1cIiwgSlNPTi5zdHJpbmdpZnkoY3VycmVudFRlYW0pKTtcblx0XHRcdFx0dGhpcy5zZXRMb2NhbFN0b3JhZ2UoKTtcblx0XHRcdH0pXG5cdFx0fSxcblxuXHRcdGdldFNsYWNrSW5mbzogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiAkaHR0cC5nZXQoJ2h0dHBzOi8vc2xhY2suY29tL2FwaS91c2Vycy5pZGVudGl0eScpXG5cdFx0fSxcblxuXHRcdHNldExvY2FsU3RvcmFnZTogZnVuY3Rpb24oKXtcblx0XHRcdCRsb2NhbFN0b3JhZ2UudXNlciA9IGN1cnJlbnRVc2VyO1xuXHRcdFx0JGxvY2FsU3RvcmFnZS50ZWFtID0gY3VycmVudFRlYW07XG5cdFx0fSxcblxuXHRcdGdldEN1cnJlbnRVc2VyOiBmdW5jdGlvbigpe1xuXHRcdFx0Y29uc29sZS5sb2coXCJjdXJyZW50IHVzZXIgaW4gZmFjdG9yeVwiLCBKU09OLnN0cmluZ2lmeShjdXJyZW50VXNlcikpXG5cdFx0XHRyZXR1cm4gY3VycmVudFVzZXJcblx0XHR9LFxuXG5cdFx0Z2V0Q3VycmVudFRlYW06IGZ1bmN0aW9uKCl7XG5cdFx0XHRjb25zb2xlLmxvZyhcImN1cnJlbnQgdGVhbSBpbiBmYWN0b3J5XCIsIEpTT04uc3RyaW5naWZ5KGN1cnJlbnRUZWFtKSlcblx0XHRcdHJldHVybiBjdXJyZW50VGVhbVxuXG5cdFx0fVxuXHR9XG59KSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
