'use strict';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
window.app = angular.module('BlankAgainstHumanity', ['ionic', 'ui.router', 'ngCordova', 'ngCordovaOauth', 'ngStorage', 'ui.bootstrap']);

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
        url: '/game',
        abstract: true,
        templateUrl: 'js/game/game.html',
        controller: 'GameCtrl'
    }).state('game.active-game', {
        url: '/:gameId/active-game',
        templateUrl: 'js/game/active-game.html',
        controller: 'ActiveGameCtrl',
        resolve: {
            game: function game(GameFactory, $stateParams) {
                return GameFactory.getGameByGameId($stateParams.gameId);
            }
        }
    });
});

app.controller('GameCtrl', function ($scope, GameFactory) {});

app.controller("ActiveGameCtrl", function ($scope, GameFactory, ActiveGameFactory, game, $stateParams, $localStorage) {

    var gameId = $stateParams.gameId;
    var playerId = $localStorage.user.id;
    var teamId = $localStorage.team.id;
    $scope.game = game;
    $scope.gameName = $scope.game.settings.name;
    $scope.whiteCards = $scope.game.players[playerId].hand;

    $scope.showCards = false;

    $scope.playerCount = Object.keys($scope.game.players).length;

    console.log('WHITECARDS', $scope.whiteCards);

    $scope.onSwipeDown = function () {
        console.log('working');
        console.log($scope.showCards);
        $scope.showCards = true;
        console.log($scope.showCards);
        $scope.$evalAsync();
    };

    ActiveGameFactory.refillMyHand(gameId, playerId, teamId);

    $scope.$on('changedGame', function (event, snapshot) {
        $scope.game = snapshot;
    });
});

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
            games: function games(GameFactory) {
                return GameFactory.getGamesByTeamId();
            }
        }
    });
});

app.controller('HomeCtrl', function ($scope, $state, $cordovaOauth, UserFactory, GameFactory, $localStorage, games, $ionicPopup) {
    $scope.startNewGame = GameFactory.startNewGame;
    $scope.storage = $localStorage;
    $scope.games = games;

    $scope.$on('changedGame', function (event, snapshot) {
        $scope.name = snapshot.name;
        $scope.$digest();
    });

    $scope.joinGame = GameFactory.joinGameById;

    $scope.showPopup = function (gameId) {

        $scope.game = $scope.games[gameId];
        $scope.gameName = $scope.game.settings.name;
        $scope.playerCount = Object.keys($scope.game.players).length;
        $scope.waitingForPlayers = $scope.game.settings.minPlayers - $scope.playerCount;

        var myPopup = $ionicPopup.show({
            templateUrl: 'js/home/popup.html',
            title: 'Join Game',
            scope: $scope,
            buttons: [{ text: 'Cancel' }, {
                text: '<b>Join</b>',
                type: 'button-positive',
                onTap: function onTap(e) {
                    $scope.joinGame(gameId);
                    $state.go('game.active-game', { gameId: gameId });
                }
            }]
        });
    };
});
app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });
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
app.factory('ActiveGameFactory', function ($http, $rootScope, $localStorage) {

    var ActiveGameFactory = {};

    var refiller = function refiller(cardsNeeded, pileRef, handRef) {
        pileRef.limitToFirst(cardsNeeded).once('value', function (cardsSnapshot) {
            cardsSnapshot.forEach(function (card) {
                var updateObj = {};
                card.ref.transaction(function (cardData) {
                    updateObj[card.key] = cardData;
                    return null;
                }).then(function () {
                    return handRef.update(updateObj);
                }).catch(function (err) {
                    return console.log(err);
                });
            });
        }).catch(function (err) {
            return console.log(err);
        });
    };

    ActiveGameFactory.refillMyHand = function (gameId, playerId, teamId) {
        // how many cards do I need?
        var cardsNeeded = 0;
        var gameRef = firebase.database().ref('teams/' + teamId + '/games/' + gameId);
        var handRef = gameRef.child('players/' + playerId + '/hand');
        var pileRef = gameRef.child('pile/whitecards');
        handRef.once('value', function (handSnapshot) {
            cardsNeeded = 7 - handSnapshot.numChildren();
        }).then(function () {
            refiller(cardsNeeded, pileRef, handRef);
        });
    };

    ActiveGameFactory.submitWhiteCard = function (playerId, cardId, gameId, teamId) {
        var gameRef = firebase.database().ref('teams/' + teamId + '/games/' + gameId);
        var cardToSubmit = gameRef.child('players/' + playerId + '/hand/' + cardId);
        var submitRef = gameRef.child('submittedWhiteCards');
        firebaseMoveSingleKeyValue(cardToSubmit, submitRef).then(function () {
            return submitRef.child(cardId).set({
                submittedBy: playerId
            });
        });
    };

    return ActiveGameFactory;
});

app.factory('GameFactory', function ($http, $rootScope, $localStorage, $q) {

    var GameFactory = {};

    var initializeFirebase = function initializeFirebase() {
        var config = {
            apiKey: "AIzaSyCihSNkUl_O-xuzVrLZFz_mZJAGcwqJcdE",
            authDomain: "blankagainsthumanity-a3e7c.firebaseapp.com",
            databaseURL: "https://blankagainsthumanity-a3e7c.firebaseio.com",
            storageBucket: "blankagainsthumanity-a3e7c.appspot.com",
            messagingSenderId: "647415099169"
        };
        firebase.initializeApp(config);
    };
    initializeFirebase();

    GameFactory.startNewGame = function (gameName, teamId) {
        //return $http.get('/session').then(userId => {
        //can also get all the decks by team here to prepare
        return $http.post('http://localhost:1337/api/games', {
            name: gameName || 'Boring Name',
            teamId: teamId || 2,

            creatorId: 2
        }).then(function (res) {
            return res.data;
        }).then(function (gameId) {
            console.log('the gameid is:', gameId);
            //const reff = firebase.database().ref(`/games/`)
            var reff = firebase.database().ref('/games/' + gameId);
            reff.on('value', function (snapshot) {
                console.log('snapshot is:', snapshot.val());
                $rootScope.$broadcast('changedGame', snapshot.val());
            });
        });
        //set up watcher
    };

    GameFactory.addCardToGame = function (gameId) {};

    GameFactory.addDecksToGame = function (gameId, decks) {
        return $http.post('api/games/' + gameId + '/decks', decks);

        // const gameRef = firebase.database().ref(`teams/${teamId}/games/${gameId}/pile/`)
        // gameRef.set({
        //     deckId: true
        // })
    };

    GameFactory.joinGameById = function (gameId) {
        var teamId = $localStorage.team.id;
        var playerId = $localStorage.user.id;
        var playerName = $localStorage.user.name;
        var playerRef = firebase.database().ref('teams/' + teamId + '/games/' + gameId + '/players/' + playerId);
        playerRef.set({
            name: playerName
        });
        var gameRef = firebase.database().ref('teams/' + teamId + '/games/' + gameId);
        gameRef.on('value', function (snapshot) {
            $rootScope.$broadcast('changedGame', snapshot.val());
        });
    };

    GameFactory.createGameByIdFireBase = function (firebasegameId) {
        //return $http.post(`http://localhost:1337/api/firebase/games/${gameId}`)
        //needs to be .thenable
        var newRef = firebase.database().ref('games/' + firebasegameId).push();
        newRef.set({
            playerId: req.query.playerId
        });
    };

    // }

    GameFactory.getDecksByTeamId = function (teamId) {

        return $http.get('http://localhost:1337/api/decks/' + teamId).the(function (res) {
            return res.data;
        });
    };

    GameFactory.getUsersByGameId = function (gameId) {
        return $http.get('http://localhost:1337/api/games/' + gameId + '/users');
    };

    GameFactory.getGameByGameId = function (gameId) {
        // const defer = $q.defer();
        console.log(gameId);
        var teamId = 1;
        var gamesRef = firebase.database().ref('teams/' + teamId + '/games/' + gameId);
        return gamesRef.once('value').then(function (snapshot) {
            console.log('FACTORYTEST', snapshot.val());
            return snapshot.val();
        });

        // return defer.promise;
    };

    GameFactory.getGamesByTeamId = function (teamId) {
        console.log('the team is id', teamId);

        var gamesRef = firebase.database().ref('teams/' + teamId + '/games');
        return gamesRef.once('value').then(function (snapshot) {
            //might break after you do it once
            console.log('the val is', snapshot.val());
            return snapshot.val();
        });
    };

    GameFactory.getGamesByTeamId = function (teamId) {
        teamId = teamId || $localStorage.team.id;
        console.log('the team is id', teamId);
        var defer = $q.defer();

        var gamesRef = firebase.database().ref('teams/' + teamId + '/games');
        gamesRef.on('value', function (snapshot) {
            console.log('the val is', snapshot.val());
            defer.resolve(snapshot.val());
        });
        console.log("defer promise", defer.promise);
        return defer.promise;
    };

    GameFactory.getGamesByUser = function (userId) {
        return $http.get('http://localStorage:1337/api/games/?userId=' + userId).then(function (res) {
            return res.data;
        });
    };

    return GameFactory;
});

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImNhcmRzLXRlc3QvY2FyZHNUZXN0LmpzIiwiZGVja3MvZGVja3MuanMiLCJmcm9tIGZzZy9mcm9tLWZzZy5qcyIsImdhbWUvZ2FtZS5qcyIsImhvbWUvaG9tZS5qcyIsImxvZ2luL2xvZ2luLmpzIiwiY29tbW9uL2RpcmVjdGl2ZXMvZGlyZWN0aXZlLmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9BY3RpdmVHYW1lRmFjdG9yeS5qcyIsImNvbW1vbi9mYWN0b3JpZXMvR2FtZUZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yaWVzL2xvZ2luRmFjdG9yeS5qcyIsImNvbW1vbi9mYWN0b3JpZXMvdXNlckZhY3RvcnkuanMiXSwibmFtZXMiOlsid2luZG93IiwiYXBwIiwiYW5ndWxhciIsIm1vZHVsZSIsInJ1biIsIiRpb25pY1BsYXRmb3JtIiwicmVhZHkiLCJjb3Jkb3ZhIiwicGx1Z2lucyIsIktleWJvYXJkIiwiaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyIiwiZGlzYWJsZVNjcm9sbCIsIlN0YXR1c0JhciIsInN0eWxlTGlnaHRDb250ZW50IiwiY29udHJvbGxlciIsIiRzY29wZSIsIlVzZXJGYWN0b3J5IiwiJHN0YXRlIiwiJGxvY2FsU3RvcmFnZSIsIiR0aW1lb3V0IiwibG9nT3V0IiwiZ28iLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsInN0YXRlIiwidXJsIiwidGVtcGxhdGVVcmwiLCJncmVldGluZyIsInJlc29sdmUiLCJkZWNrcyIsIkdhbWVGYWN0b3J5IiwiJHN0YXRlUGFyYW1zIiwiZ2V0RGVja3NCeVRlYW1JZCIsInN0YXRlUGFyYW1zIiwidGVhbUlkIiwiYWJzdHJhY3QiLCJnYW1lIiwiZ2V0R2FtZUJ5R2FtZUlkIiwiZ2FtZUlkIiwiQWN0aXZlR2FtZUZhY3RvcnkiLCJwbGF5ZXJJZCIsInVzZXIiLCJpZCIsInRlYW0iLCJnYW1lTmFtZSIsInNldHRpbmdzIiwibmFtZSIsIndoaXRlQ2FyZHMiLCJwbGF5ZXJzIiwiaGFuZCIsInNob3dDYXJkcyIsInBsYXllckNvdW50IiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJvblN3aXBlRG93biIsIiRldmFsQXN5bmMiLCJyZWZpbGxNeUhhbmQiLCIkb24iLCJldmVudCIsInNuYXBzaG90IiwiJHVybFJvdXRlclByb3ZpZGVyIiwiZ2FtZXMiLCJnZXRHYW1lc0J5VGVhbUlkIiwiJGNvcmRvdmFPYXV0aCIsIiRpb25pY1BvcHVwIiwic3RhcnROZXdHYW1lIiwic3RvcmFnZSIsIiRkaWdlc3QiLCJqb2luR2FtZSIsImpvaW5HYW1lQnlJZCIsInNob3dQb3B1cCIsIndhaXRpbmdGb3JQbGF5ZXJzIiwibWluUGxheWVycyIsIm15UG9wdXAiLCJzaG93IiwidGl0bGUiLCJzY29wZSIsImJ1dHRvbnMiLCJ0ZXh0IiwidHlwZSIsIm9uVGFwIiwib3RoZXJ3aXNlIiwiTG9naW5GYWN0b3J5IiwiJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZSIsImxvZ2luV2l0aFNsYWNrIiwiZ2V0U2xhY2tDcmVkcyIsInRoZW4iLCJzbGFjayIsImNyZWRzIiwiY2xpZW50SUQiLCJjbGllbnRTZWNyZXQiLCJzZXRVc2VyIiwiaW5mbyIsImNhbkRyYWdDb250ZW50IiwicmVkaXJlY3RVc2VyIiwiZmFjdG9yeSIsIiRodHRwIiwiJHJvb3RTY29wZSIsInJlZmlsbGVyIiwiY2FyZHNOZWVkZWQiLCJwaWxlUmVmIiwiaGFuZFJlZiIsImxpbWl0VG9GaXJzdCIsIm9uY2UiLCJjYXJkc1NuYXBzaG90IiwiZm9yRWFjaCIsInVwZGF0ZU9iaiIsImNhcmQiLCJyZWYiLCJ0cmFuc2FjdGlvbiIsImtleSIsImNhcmREYXRhIiwidXBkYXRlIiwiY2F0Y2giLCJlcnIiLCJnYW1lUmVmIiwiZmlyZWJhc2UiLCJkYXRhYmFzZSIsImNoaWxkIiwiaGFuZFNuYXBzaG90IiwibnVtQ2hpbGRyZW4iLCJzdWJtaXRXaGl0ZUNhcmQiLCJjYXJkSWQiLCJjYXJkVG9TdWJtaXQiLCJzdWJtaXRSZWYiLCJmaXJlYmFzZU1vdmVTaW5nbGVLZXlWYWx1ZSIsInNldCIsInN1Ym1pdHRlZEJ5IiwiJHEiLCJpbml0aWFsaXplRmlyZWJhc2UiLCJhcGlLZXkiLCJhdXRoRG9tYWluIiwiZGF0YWJhc2VVUkwiLCJzdG9yYWdlQnVja2V0IiwibWVzc2FnaW5nU2VuZGVySWQiLCJpbml0aWFsaXplQXBwIiwicG9zdCIsImNyZWF0b3JJZCIsInJlcyIsImRhdGEiLCJyZWZmIiwib24iLCJ2YWwiLCIkYnJvYWRjYXN0IiwiYWRkQ2FyZFRvR2FtZSIsImFkZERlY2tzVG9HYW1lIiwicGxheWVyTmFtZSIsInBsYXllclJlZiIsImNyZWF0ZUdhbWVCeUlkRmlyZUJhc2UiLCJmaXJlYmFzZWdhbWVJZCIsIm5ld1JlZiIsInB1c2giLCJyZXEiLCJxdWVyeSIsImdldCIsInRoZSIsImdldFVzZXJzQnlHYW1lSWQiLCJnYW1lc1JlZiIsImRlZmVyIiwicHJvbWlzZSIsImdldEdhbWVzQnlVc2VyIiwidXNlcklkIiwibWV0aG9kIiwiaGVhZGVycyIsInNldExvY2FsU3RvcmFnZSIsImdldFNsYWNrSW5mbyIsIiRyZXNldCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQUEsT0FBQUMsR0FBQSxHQUFBQyxRQUFBQyxNQUFBLENBQUEsc0JBQUEsRUFBQSxDQUFBLE9BQUEsRUFBQSxXQUFBLEVBQUEsV0FBQSxFQUFBLGdCQUFBLEVBQUEsV0FBQSxFQUFBLGNBQUEsQ0FBQSxDQUFBOztBQUVBRixJQUFBRyxHQUFBLENBQUEsVUFBQUMsY0FBQSxFQUFBO0FBQ0FBLG1CQUFBQyxLQUFBLENBQUEsWUFBQTtBQUNBLFlBQUFOLE9BQUFPLE9BQUEsSUFBQVAsT0FBQU8sT0FBQSxDQUFBQyxPQUFBLENBQUFDLFFBQUEsRUFBQTtBQUNBO0FBQ0E7QUFDQUYsb0JBQUFDLE9BQUEsQ0FBQUMsUUFBQSxDQUFBQyx3QkFBQSxDQUFBLElBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0FILG9CQUFBQyxPQUFBLENBQUFDLFFBQUEs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OztBQ0FBN0ksSUFBQWlHLE9BQUEsQ0FBQSxhQUFBLEVBQUEsVUFBQUMsS0FBQSxFQUFBakYsYUFBQSxFQUFBQyxRQUFBLEVBQUFGLE1BQUEsRUFBQTs7QUFFQSxXQUFBO0FBQ0E2RSxpQkFBQSxpQkFBQUMsSUFBQSxFQUFBO0FBQUE7O0FBQ0EsbUJBQUFJLE1BQUE7QUFDQWtFLHdCQUFBLE1BREE7QUFFQTVJLHFCQUFBLGlDQUZBO0FBR0E2SSx5QkFBQTtBQUNBLG9DQUFBO0FBREEsaUJBSEE7QUFNQXhCLHNCQUFBL0M7QUFOQSxhQUFBLEVBUUFOLElBUkEsQ0FRQSxlQUFBO0FBQ0Esc0JBQUE4RSxlQUFBLENBQUExQixJQUFBQyxJQUFBLENBQUFyRyxJQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUFvRyxJQUFBQyxJQUFBLENBQUFuRyxJQUFBLENBQUEsQ0FBQSxDQUFBO0FBQ0EsYUFWQSxDQUFBO0FBV0EsU0FiQTs7QUFlQTZILHNCQUFBLHdCQUFBO0FBQ0EsbUJBQUFyRSxNQUFBMEQsR0FBQSxDQUFBLHNDQUFBLENBQUE7QUFDQSxTQWpCQTs7QUFtQkFVLHlCQUFBLHlCQUFBOUgsSUFBQSxFQUFBRSxJQUFBLEVBQUE7QUFDQXpCLDBCQUFBdUIsSUFBQSxHQUFBQSxJQUFBO0FBQ0F2QiwwQkFBQXlCLElBQUEsR0FBQUEsSUFBQTtBQUNBLFNBdEJBOztBQXdCQXZCLGdCQUFBLGtCQUFBO0FBQ0FGLDBCQUFBdUosTUFBQTtBQUNBO0FBMUJBLEtBQUE7QUE0QkEsQ0E5QkEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIElvbmljIFN0YXJ0ZXIgQXBwXG5cbi8vIGFuZ3VsYXIubW9kdWxlIGlzIGEgZ2xvYmFsIHBsYWNlIGZvciBjcmVhdGluZywgcmVnaXN0ZXJpbmcgYW5kIHJldHJpZXZpbmcgQW5ndWxhciBtb2R1bGVzXG4vLyAnc3RhcnRlcicgaXMgdGhlIG5hbWUgb2YgdGhpcyBhbmd1bGFyIG1vZHVsZSBleGFtcGxlIChhbHNvIHNldCBpbiBhIDxib2R5PiBhdHRyaWJ1dGUgaW4gaW5kZXguaHRtbClcbi8vIHRoZSAybmQgcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9mICdyZXF1aXJlcydcbndpbmRvdy5hcHAgPSBhbmd1bGFyLm1vZHVsZSgnQmxhbmtBZ2FpbnN0SHVtYW5pdHknLCBbJ2lvbmljJywgJ3VpLnJvdXRlcicsJ25nQ29yZG92YScsJ25nQ29yZG92YU9hdXRoJywgJ25nU3RvcmFnZScsICd1aS5ib290c3RyYXAnXSlcblxuYXBwLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxuICAgICAgICAgICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcblxuICAgICAgICAgICAgLy8gRG9uJ3QgcmVtb3ZlIHRoaXMgbGluZSB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nLiBJdCBzdG9wcyB0aGUgdmlld3BvcnRcbiAgICAgICAgICAgIC8vIGZyb20gc25hcHBpbmcgd2hlbiB0ZXh0IGlucHV0cyBhcmUgZm9jdXNlZC4gSW9uaWMgaGFuZGxlcyB0aGlzIGludGVybmFsbHkgZm9yXG4gICAgICAgICAgICAvLyBhIG11Y2ggbmljZXIga2V5Ym9hcmQgZXhwZXJpZW5jZS5cbiAgICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5kaXNhYmxlU2Nyb2xsKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICAgICAgICBTdGF0dXNCYXIuc3R5bGVMaWdodENvbnRlbnQoKVxuICAgICAgICB9XG4gICAgfSk7XG5cbn0pXG4iLCJhcHAuY29udHJvbGxlcignTG9nb3V0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgVXNlckZhY3RvcnksICRzdGF0ZSwgJGxvY2FsU3RvcmFnZSwgJHRpbWVvdXQpe1xuXHQkc2NvcGUubG9nT3V0ID0gZnVuY3Rpb24oKXtcblx0XHRVc2VyRmFjdG9yeS5sb2dPdXQoKVxuXHRcdCRzdGF0ZS5nbygnbG9naW4nKVxuXHR9XG59KSIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpe1xuXHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnY2FyZHMnLCB7XG5cdFx0dXJsOiAnL2NhcmRzJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2NhcmRzLXRlc3QvY2FyZHMtdGVzdC5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnQ2FyZHNUZXN0Q3RybCdcblx0fSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdDYXJkc1Rlc3RDdHJsJywgZnVuY3Rpb24oJHNjb3BlKXtcbiBcdCRzY29wZS5ncmVldGluZyA9IFwiSElcIlxufSkiLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlcikgPT4ge1xuXHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnZGVja3MnLCB7XG5cdFx0dXJsOiAnZGVja3MvOnRlYW1pZCcsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9kZWNrcy9kZWNrcy5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnRGVja0N0cmwnLFxuXHRcdHJlc29sdmU6IHtcblx0XHRcdGRlY2tzOiAoR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcykgPT4gR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZChzdGF0ZVBhcmFtcy50ZWFtSWQpXG5cdFx0fVxuXHR9KVxuXG59KVxuXG5hcHAuY29udHJvbGxlcignRGVja0N0cmwnLCAoJHNjb3BlKSA9PiB7XG5cblxuXHRcbn0pIiwiLy8gKGZ1bmN0aW9uICgpIHtcblxuLy8gICAgICd1c2Ugc3RyaWN0JztcblxuLy8gICAgIC8vIEhvcGUgeW91IGRpZG4ndCBmb3JnZXQgQW5ndWxhciEgRHVoLWRveS5cbi8vICAgICBpZiAoIXdpbmRvdy5hbmd1bGFyKSB0aHJvdyBuZXcgRXJyb3IoJ0kgY2FuXFwndCBmaW5kIEFuZ3VsYXIhJyk7XG5cbi8vICAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2ZzYVByZUJ1aWx0JywgW10pO1xuXG4vLyAgICAgYXBwLmZhY3RvcnkoJ1NvY2tldCcsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgaWYgKCF3aW5kb3cuaW8pIHRocm93IG5ldyBFcnJvcignc29ja2V0LmlvIG5vdCBmb3VuZCEnKTtcbi8vICAgICAgICAgcmV0dXJuIHdpbmRvdy5pbyh3aW5kb3cubG9jYXRpb24ub3JpZ2luKTtcbi8vICAgICB9KTtcblxuLy8gICAgIC8vIEFVVEhfRVZFTlRTIGlzIHVzZWQgdGhyb3VnaG91dCBvdXIgYXBwIHRvXG4vLyAgICAgLy8gYnJvYWRjYXN0IGFuZCBsaXN0ZW4gZnJvbSBhbmQgdG8gdGhlICRyb290U2NvcGVcbi8vICAgICAvLyBmb3IgaW1wb3J0YW50IGV2ZW50cyBhYm91dCBhdXRoZW50aWNhdGlvbiBmbG93LlxuLy8gICAgIGFwcC5jb25zdGFudCgnQVVUSF9FVkVOVFMnLCB7XG4vLyAgICAgICAgIGxvZ2luU3VjY2VzczogJ2F1dGgtbG9naW4tc3VjY2VzcycsXG4vLyAgICAgICAgIGxvZ2luRmFpbGVkOiAnYXV0aC1sb2dpbi1mYWlsZWQnLFxuLy8gICAgICAgICBsb2dvdXRTdWNjZXNzOiAnYXV0aC1sb2dvdXQtc3VjY2VzcycsXG4vLyAgICAgICAgIHNlc3Npb25UaW1lb3V0OiAnYXV0aC1zZXNzaW9uLXRpbWVvdXQnLFxuLy8gICAgICAgICBub3RBdXRoZW50aWNhdGVkOiAnYXV0aC1ub3QtYXV0aGVudGljYXRlZCcsXG4vLyAgICAgICAgIG5vdEF1dGhvcml6ZWQ6ICdhdXRoLW5vdC1hdXRob3JpemVkJ1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLmZhY3RvcnkoJ0F1dGhJbnRlcmNlcHRvcicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkcSwgQVVUSF9FVkVOVFMpIHtcbi8vICAgICAgICAgdmFyIHN0YXR1c0RpY3QgPSB7XG4vLyAgICAgICAgICAgICA0MDE6IEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsXG4vLyAgICAgICAgICAgICA0MDM6IEFVVEhfRVZFTlRTLm5vdEF1dGhvcml6ZWQsXG4vLyAgICAgICAgICAgICA0MTk6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0LFxuLy8gICAgICAgICAgICAgNDQwOiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dFxuLy8gICAgICAgICB9O1xuLy8gICAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAgICAgcmVzcG9uc2VFcnJvcjogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KHN0YXR1c0RpY3RbcmVzcG9uc2Uuc3RhdHVzXSwgcmVzcG9uc2UpO1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzcG9uc2UpXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH07XG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuY29uZmlnKGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XG4vLyAgICAgICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goW1xuLy8gICAgICAgICAgICAgJyRpbmplY3RvcicsXG4vLyAgICAgICAgICAgICBmdW5jdGlvbiAoJGluamVjdG9yKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRpbmplY3Rvci5nZXQoJ0F1dGhJbnRlcmNlcHRvcicpO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICBdKTtcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5zZXJ2aWNlKCdBdXRoU2VydmljZScsIGZ1bmN0aW9uICgkaHR0cCwgU2Vzc2lvbiwgJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMsICRxKSB7XG5cbi8vICAgICAgICAgZnVuY3Rpb24gb25TdWNjZXNzZnVsTG9naW4ocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgIHZhciB1c2VyID0gcmVzcG9uc2UuZGF0YS51c2VyO1xuLy8gICAgICAgICAgICAgU2Vzc2lvbi5jcmVhdGUodXNlcik7XG4vLyAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoQVVUSF9FVkVOVFMubG9naW5TdWNjZXNzKTtcbi8vICAgICAgICAgICAgIHJldHVybiB1c2VyO1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgLy8gVXNlcyB0aGUgc2Vzc2lvbiBmYWN0b3J5IHRvIHNlZSBpZiBhblxuLy8gICAgICAgICAvLyBhdXRoZW50aWNhdGVkIHVzZXIgaXMgY3VycmVudGx5IHJlZ2lzdGVyZWQuXG4vLyAgICAgICAgIHRoaXMuaXNBdXRoZW50aWNhdGVkID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuICEhU2Vzc2lvbi51c2VyO1xuLy8gICAgICAgICB9O1xuXG4gICAgICAgIFxuLy8gICAgICAgICB0aGlzLmlzQWRtaW4gPSBmdW5jdGlvbih1c2VySWQpe1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ3J1bm5pbmcgYWRtaW4gZnVuYycpXG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpXG4vLyAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhLnVzZXIuaXNBZG1pbilcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIHRoaXMuZ2V0TG9nZ2VkSW5Vc2VyID0gZnVuY3Rpb24gKGZyb21TZXJ2ZXIpIHtcblxuLy8gICAgICAgICAgICAgLy8gSWYgYW4gYXV0aGVudGljYXRlZCBzZXNzaW9uIGV4aXN0cywgd2Vcbi8vICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgdXNlciBhdHRhY2hlZCB0byB0aGF0IHNlc3Npb25cbi8vICAgICAgICAgICAgIC8vIHdpdGggYSBwcm9taXNlLiBUaGlzIGVuc3VyZXMgdGhhdCB3ZSBjYW5cbi8vICAgICAgICAgICAgIC8vIGFsd2F5cyBpbnRlcmZhY2Ugd2l0aCB0aGlzIG1ldGhvZCBhc3luY2hyb25vdXNseS5cblxuLy8gICAgICAgICAgICAgLy8gT3B0aW9uYWxseSwgaWYgdHJ1ZSBpcyBnaXZlbiBhcyB0aGUgZnJvbVNlcnZlciBwYXJhbWV0ZXIsXG4vLyAgICAgICAgICAgICAvLyB0aGVuIHRoaXMgY2FjaGVkIHZhbHVlIHdpbGwgbm90IGJlIHVzZWQuXG5cbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlzQXV0aGVudGljYXRlZCgpICYmIGZyb21TZXJ2ZXIgIT09IHRydWUpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbihTZXNzaW9uLnVzZXIpO1xuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICAvLyBNYWtlIHJlcXVlc3QgR0VUIC9zZXNzaW9uLlxuLy8gICAgICAgICAgICAgLy8gSWYgaXQgcmV0dXJucyBhIHVzZXIsIGNhbGwgb25TdWNjZXNzZnVsTG9naW4gd2l0aCB0aGUgcmVzcG9uc2UuXG4vLyAgICAgICAgICAgICAvLyBJZiBpdCByZXR1cm5zIGEgNDAxIHJlc3BvbnNlLCB3ZSBjYXRjaCBpdCBhbmQgaW5zdGVhZCByZXNvbHZlIHRvIG51bGwuXG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbi8vICAgICAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5sb2dpbiA9IGZ1bmN0aW9uIChjcmVkZW50aWFscykge1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9sb2dpbicsIGNyZWRlbnRpYWxzKVxuLy8gICAgICAgICAgICAgICAgIC50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKVxuLy8gICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QoeyBtZXNzYWdlOiAnSW52YWxpZCBsb2dpbiBjcmVkZW50aWFscy4nfSk7XG4vLyAgICAgICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5zaWdudXAgPSBmdW5jdGlvbihjcmVkZW50aWFscyl7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuLy8gICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuLy8gICAgICAgICAgICAgICAgIHVybDogJy9zaWdudXAnLFxuLy8gICAgICAgICAgICAgICAgIGRhdGE6IGNyZWRlbnRpYWxzXG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5kYXRhKVxuLy8gICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKCl7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCh7bWVzc2FnZTogJ1RoYXQgZW1haWwgaXMgYWxyZWFkeSBiZWluZyB1c2VkLid9KTtcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5sb2dvdXQgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvbG9nb3V0JykudGhlbihmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgU2Vzc2lvbi5kZXN0cm95KCk7XG4vLyAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ291dFN1Y2Nlc3MpO1xuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5zZXJ2aWNlKCdTZXNzaW9uJywgZnVuY3Rpb24gKCRyb290U2NvcGUsIEFVVEhfRVZFTlRTKSB7XG5cbi8vICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4vLyAgICAgICAgICRyb290U2NvcGUuJG9uKEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCwgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgc2VsZi5kZXN0cm95KCk7XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XG5cbi8vICAgICAgICAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbiAodXNlcikge1xuLy8gICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgfSk7XG5cbi8vIH0oKSk7XG4iLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlcikgPT4ge1xuXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2dhbWUnLCB7XG4gICAgICAgIHVybDogJy9nYW1lJyxcbiAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvZ2FtZS9nYW1lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnR2FtZUN0cmwnLFxuICAgIH0pXG4gICAgLnN0YXRlKCdnYW1lLmFjdGl2ZS1nYW1lJywge1xuICAgICAgICB1cmw6ICcvOmdhbWVJZC9hY3RpdmUtZ2FtZScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvZ2FtZS9hY3RpdmUtZ2FtZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0FjdGl2ZUdhbWVDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgZ2FtZSA6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXRHYW1lQnlHYW1lSWQoJHN0YXRlUGFyYW1zLmdhbWVJZClcbiAgICAgICAgfVxuICAgIH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignR2FtZUN0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSkgPT4geyAgIFxuICAgXG59KVxuXG5hcHAuY29udHJvbGxlcihcIkFjdGl2ZUdhbWVDdHJsXCIsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCBBY3RpdmVHYW1lRmFjdG9yeSwgZ2FtZSwgJHN0YXRlUGFyYW1zLCAkbG9jYWxTdG9yYWdlKSA9PiB7XG5cbiAgICBjb25zdCBnYW1lSWQgPSAkc3RhdGVQYXJhbXMuZ2FtZUlkO1xuICAgIGNvbnN0IHBsYXllcklkID0gJGxvY2FsU3RvcmFnZS51c2VyLmlkO1xuICAgIGNvbnN0IHRlYW1JZCA9ICRsb2NhbFN0b3JhZ2UudGVhbS5pZFxuICAgICRzY29wZS5nYW1lID0gZ2FtZTtcbiAgICAkc2NvcGUuZ2FtZU5hbWUgPSAkc2NvcGUuZ2FtZS5zZXR0aW5ncy5uYW1lO1xuICAgICRzY29wZS53aGl0ZUNhcmRzID0gJHNjb3BlLmdhbWUucGxheWVyc1twbGF5ZXJJZF0uaGFuZDtcbiAgICBcbiAgICAkc2NvcGUuc2hvd0NhcmRzID0gZmFsc2U7XG5cbiAgICAkc2NvcGUucGxheWVyQ291bnQgPSBPYmplY3Qua2V5cygkc2NvcGUuZ2FtZS5wbGF5ZXJzKS5sZW5ndGg7XG4gICAgXG4gICAgY29uc29sZS5sb2coJ1dISVRFQ0FSRFMnLCAkc2NvcGUud2hpdGVDYXJkcyk7XG5cbiAgICAkc2NvcGUub25Td2lwZURvd24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd3b3JraW5nJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5zaG93Q2FyZHMpO1xuICAgICAgICAkc2NvcGUuc2hvd0NhcmRzID0gdHJ1ZSA7XG4gICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5zaG93Q2FyZHMpO1xuICAgICAgICAkc2NvcGUuJGV2YWxBc3luYygpO1xuXG4gICAgfVxuXG4gICAgQWN0aXZlR2FtZUZhY3RvcnkucmVmaWxsTXlIYW5kKGdhbWVJZCwgcGxheWVySWQsIHRlYW1JZClcblxuICAgICRzY29wZS4kb24oJ2NoYW5nZWRHYW1lJywgKGV2ZW50LHNuYXBzaG90KSA9PntcbiAgICAgICAgJHNjb3BlLmdhbWUgPSBzbmFwc2hvdDtcbiAgICB9KVxuXG5cbiAgIFxuICAgIFxufSlcblxuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKXtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2hvbWUnLCB7XG5cdFx0dXJsOiAnLycsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9ob21lL2hvbWUuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0hvbWVDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgZ2FtZXM6IGZ1bmN0aW9uKEdhbWVGYWN0b3J5KXtcbiAgICAgICAgICAgICAgICByZXR1cm4gR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblx0fSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdIb21lQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCAkY29yZG92YU9hdXRoLCBVc2VyRmFjdG9yeSwgR2FtZUZhY3RvcnksICRsb2NhbFN0b3JhZ2UsIGdhbWVzLCAkaW9uaWNQb3B1cCkge1xuICAgICRzY29wZS5zdGFydE5ld0dhbWUgPSBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWU7XG4gICAgJHNjb3BlLnN0b3JhZ2UgPSAkbG9jYWxTdG9yYWdlO1xuICAgICRzY29wZS5nYW1lcyA9IGdhbWVzO1xuICAgIFxuXG4gICAgJHNjb3BlLiRvbignY2hhbmdlZEdhbWUnLCAoZXZlbnQsc25hcHNob3QpID0+e1xuICAgICAgICAkc2NvcGUubmFtZT0gc25hcHNob3QubmFtZTtcbiAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcbiAgICB9KVxuXG4gICAgJHNjb3BlLmpvaW5HYW1lID0gR2FtZUZhY3Rvcnkuam9pbkdhbWVCeUlkO1xuXG4gICAgJHNjb3BlLnNob3dQb3B1cCA9IGZ1bmN0aW9uIChnYW1lSWQpIHtcblxuICAgICAgICAkc2NvcGUuZ2FtZSA9ICRzY29wZS5nYW1lc1tnYW1lSWRdO1xuICAgICAgICAkc2NvcGUuZ2FtZU5hbWUgPSAkc2NvcGUuZ2FtZS5zZXR0aW5ncy5uYW1lO1xuICAgICAgICAkc2NvcGUucGxheWVyQ291bnQgPSBPYmplY3Qua2V5cygkc2NvcGUuZ2FtZS5wbGF5ZXJzKS5sZW5ndGg7XG4gICAgICAgICRzY29wZS53YWl0aW5nRm9yUGxheWVycyA9ICAkc2NvcGUuZ2FtZS5zZXR0aW5ncy5taW5QbGF5ZXJzIC0gJHNjb3BlLnBsYXllckNvdW50O1xuICAgICAgICAgXG4gICAgICAgICBjb25zdCBteVBvcHVwID0gJGlvbmljUG9wdXAuc2hvdyh7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2hvbWUvcG9wdXAuaHRtbCcsXG4gICAgICAgICAgICB0aXRsZTogJ0pvaW4gR2FtZScsXG4gICAgICAgICAgICBzY29wZTogJHNjb3BlLFxuICAgICAgICAgICAgYnV0dG9uczogXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAge3RleHQ6ICdDYW5jZWwnfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICc8Yj5Kb2luPC9iPicsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdidXR0b24tcG9zaXRpdmUnLFxuICAgICAgICAgICAgICAgICAgICBvblRhcDogZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuam9pbkdhbWUoZ2FtZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnZ2FtZS5hY3RpdmUtZ2FtZScsIHtnYW1lSWQ6IGdhbWVJZH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pXG4gICAgfVxufSkiLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpe1xuXHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnbG9naW4nLCB7XG5cdFx0dXJsOiAnL2xvZ2luJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2xvZ2luL2xvZ2luLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdMb2dpbkN0cmwnXG5cdH0pXG5cdCR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9sb2dpbicpO1xufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCBMb2dpbkZhY3RvcnksIFVzZXJGYWN0b3J5LCAkY29yZG92YU9hdXRoLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCwgJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZSl7XG4gXHQkc2NvcGUubG9naW5XaXRoU2xhY2sgPSBmdW5jdGlvbigpe1xuIFx0XHRyZXR1cm4gTG9naW5GYWN0b3J5LmdldFNsYWNrQ3JlZHMoKVxuIFx0XHQudGhlbihjcmVkcyA9PntcbiBcdFx0XHRyZXR1cm4gJGNvcmRvdmFPYXV0aC5zbGFjayhjcmVkcy5jbGllbnRJRCwgY3JlZHMuY2xpZW50U2VjcmV0LCBbJ2lkZW50aXR5LmJhc2ljJywgJ2lkZW50aXR5LnRlYW0nLCAnaWRlbnRpdHkuYXZhdGFyJ10pXG4gXHRcdH0pXG4gXHRcdC50aGVuKGluZm8gPT4gVXNlckZhY3Rvcnkuc2V0VXNlcihpbmZvKSlcbiBcdFx0LnRoZW4oKCkgPT4gJHN0YXRlLmdvKCdob21lJykpXG4gXHR9XG5cbiBcdCRpb25pY1NpZGVNZW51RGVsZWdhdGUuY2FuRHJhZ0NvbnRlbnQoZmFsc2UpO1xuXG4gXHQkc2NvcGUuJG9uKCckaW9uaWNWaWV3LmxlYXZlJywgZnVuY3Rpb24gKCkgeyAkaW9uaWNTaWRlTWVudURlbGVnYXRlLmNhbkRyYWdDb250ZW50KHRydWUpIH0pO1xuXG4gXHQkc2NvcGUuc3RvcmFnZSA9ICRsb2NhbFN0b3JhZ2VcblxuIFx0ZnVuY3Rpb24gcmVkaXJlY3RVc2VyKCl7XG4gXHRcdGNvbnNvbGUubG9nKFwic2NvcGUgc3RvcmFnZSB1c2VyXCIsICRzY29wZS5zdG9yYWdlLnVzZXIpXG4gXHRcdGlmICgkc2NvcGUuc3RvcmFnZS51c2VyKSAkc3RhdGUuZ28oJ2hvbWUnKVxuIFx0fVxuXG5cdHJlZGlyZWN0VXNlcigpO1xufSkiLCIvL0RpcmVjdGl2ZSBGaWxlIiwiYXBwLmZhY3RvcnkoJ0FjdGl2ZUdhbWVGYWN0b3J5JywgKCRodHRwLCAkcm9vdFNjb3BlLCAkbG9jYWxTdG9yYWdlKSA9PiB7XG5cbiAgICAgICAgY29uc3QgQWN0aXZlR2FtZUZhY3RvcnkgPSB7fTtcblxuICAgICAgICBjb25zdCByZWZpbGxlciA9IChjYXJkc05lZWRlZCwgcGlsZVJlZiwgaGFuZFJlZikgPT4ge1xuICAgICAgICAgIHBpbGVSZWYubGltaXRUb0ZpcnN0KGNhcmRzTmVlZGVkKS5vbmNlKCd2YWx1ZScsIGNhcmRzU25hcHNob3QgPT4ge1xuICAgICAgICAgICAgY2FyZHNTbmFwc2hvdC5mb3JFYWNoKGNhcmQgPT4ge1xuICAgICAgICAgICAgICBsZXQgdXBkYXRlT2JqID0ge31cbiAgICAgICAgICAgICAgY2FyZC5yZWYudHJhbnNhY3Rpb24oY2FyZERhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgdXBkYXRlT2JqW2NhcmQua2V5XSA9IGNhcmREYXRhXG4gICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gaGFuZFJlZi51cGRhdGUodXBkYXRlT2JqKSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICB9XG5cbiAgICAgICAgQWN0aXZlR2FtZUZhY3RvcnkucmVmaWxsTXlIYW5kID0gKGdhbWVJZCwgcGxheWVySWQsIHRlYW1JZCkgPT4ge1xuICAgICAgICAgIC8vIGhvdyBtYW55IGNhcmRzIGRvIEkgbmVlZD9cbiAgICAgICAgICBsZXQgY2FyZHNOZWVkZWQgPSAwXG4gICAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICBjb25zdCBoYW5kUmVmID0gZ2FtZVJlZi5jaGlsZChgcGxheWVycy8ke3BsYXllcklkfS9oYW5kYClcbiAgICAgICAgICBjb25zdCBwaWxlUmVmID0gZ2FtZVJlZi5jaGlsZCgncGlsZS93aGl0ZWNhcmRzJylcbiAgICAgICAgICBoYW5kUmVmLm9uY2UoJ3ZhbHVlJywgaGFuZFNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgY2FyZHNOZWVkZWQgPSA3IC0gaGFuZFNuYXBzaG90Lm51bUNoaWxkcmVuKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHJlZmlsbGVyKGNhcmRzTmVlZGVkLCBwaWxlUmVmLCBoYW5kUmVmKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIEFjdGl2ZUdhbWVGYWN0b3J5LnN1Ym1pdFdoaXRlQ2FyZCA9IChwbGF5ZXJJZCwgY2FyZElkLCBnYW1lSWQsIHRlYW1JZCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApO1xuICAgICAgICAgIGNvbnN0IGNhcmRUb1N1Ym1pdCA9IGdhbWVSZWYuY2hpbGQoYHBsYXllcnMvJHtwbGF5ZXJJZH0vaGFuZC8ke2NhcmRJZH1gKTtcbiAgICAgICAgICBjb25zdCBzdWJtaXRSZWYgPSBnYW1lUmVmLmNoaWxkKCdzdWJtaXR0ZWRXaGl0ZUNhcmRzJyk7XG4gICAgICAgICAgZmlyZWJhc2VNb3ZlU2luZ2xlS2V5VmFsdWUoY2FyZFRvU3VibWl0LCBzdWJtaXRSZWYpXG4gICAgICAgICAgICAudGhlbigoKSA9PiBzdWJtaXRSZWYuY2hpbGQoY2FyZElkKS5zZXQoe1xuICAgICAgICAgICAgICBzdWJtaXR0ZWRCeTogcGxheWVySWRcbiAgICAgICAgICAgIH0pKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEFjdGl2ZUdhbWVGYWN0b3J5OyBcblxuXG59KTsiLCJcbmFwcC5mYWN0b3J5KCdHYW1lRmFjdG9yeScsICgkaHR0cCwgJHJvb3RTY29wZSwgJGxvY2FsU3RvcmFnZSwgJHEpID0+IHtcblxuICAgICAgICBjb25zdCBHYW1lRmFjdG9yeSA9IHt9O1xuXG4gICAgICAgIGNvbnN0IGluaXRpYWxpemVGaXJlYmFzZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgYXBpS2V5OiBcIkFJemFTeUNpaFNOa1VsX08teHV6VnJMWkZ6X21aSkFHY3dxSmNkRVwiLFxuICAgICAgICAgICAgICAgICAgICBhdXRoRG9tYWluOiBcImJsYW5rYWdhaW5zdGh1bWFuaXR5LWEzZTdjLmZpcmViYXNlYXBwLmNvbVwiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhYmFzZVVSTDogXCJodHRwczovL2JsYW5rYWdhaW5zdGh1bWFuaXR5LWEzZTdjLmZpcmViYXNlaW8uY29tXCIsXG4gICAgICAgICAgICAgICAgICAgIHN0b3JhZ2VCdWNrZXQ6IFwiYmxhbmthZ2FpbnN0aHVtYW5pdHktYTNlN2MuYXBwc3BvdC5jb21cIixcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiNjQ3NDE1MDk5MTY5XCJcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmaXJlYmFzZS5pbml0aWFsaXplQXBwKGNvbmZpZyk7XG4gICAgICAgIH07XG4gICAgICAgIGluaXRpYWxpemVGaXJlYmFzZSgpO1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZSA9IChnYW1lTmFtZSwgdGVhbUlkKSA9PiB7XG4gICAgICAgICAgICAvL3JldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJykudGhlbih1c2VySWQgPT4ge1xuICAgICAgICAgICAgLy9jYW4gYWxzbyBnZXQgYWxsIHRoZSBkZWNrcyBieSB0ZWFtIGhlcmUgdG8gcHJlcGFyZVxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZ2FtZXMnLCB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGdhbWVOYW1lIHx8ICdCb3JpbmcgTmFtZScsXG4gICAgICAgICAgICAgICAgICAgIHRlYW1JZDogdGVhbUlkIHx8IDIsXG5cbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvcklkOiAyXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgLnRoZW4oZ2FtZUlkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZSBnYW1laWQgaXM6JywgZ2FtZUlkKVxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zdCByZWZmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYC9nYW1lcy9gKVxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWZmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYC9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAgICAgICAgICAgICByZWZmLm9uKCd2YWx1ZScsIHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzbmFwc2hvdCBpczonLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnY2hhbmdlZEdhbWUnLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvL3NldCB1cCB3YXRjaGVyXG4gICAgICAgIH07XG5cblxuICAgICAgICBHYW1lRmFjdG9yeS5hZGRDYXJkVG9HYW1lID0gKGdhbWVJZCkgPT4ge1xuXG4gICAgICAgIH1cblxuICAgICAgICBHYW1lRmFjdG9yeS5hZGREZWNrc1RvR2FtZSA9IChnYW1lSWQsIGRlY2tzKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChgYXBpL2dhbWVzLyR7Z2FtZUlkfS9kZWNrc2AsIGRlY2tzKVxuXG4gICAgICAgICAgICAvLyBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH0vcGlsZS9gKVxuICAgICAgICAgICAgLy8gZ2FtZVJlZi5zZXQoe1xuICAgICAgICAgICAgLy8gICAgIGRlY2tJZDogdHJ1ZVxuICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgfVxuXG4gICAgICAgIEdhbWVGYWN0b3J5LmpvaW5HYW1lQnlJZCA9IChnYW1lSWQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRlYW1JZCA9ICRsb2NhbFN0b3JhZ2UudGVhbS5pZDtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllcklkID0gJGxvY2FsU3RvcmFnZS51c2VyLmlkO1xuICAgICAgICAgICAgY29uc3QgcGxheWVyTmFtZSA9ICRsb2NhbFN0b3JhZ2UudXNlci5uYW1lO1xuICAgICAgICAgICAgY29uc3QgcGxheWVyUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH0vcGxheWVycy8ke3BsYXllcklkfWApXG4gICAgICAgICAgICBwbGF5ZXJSZWYuc2V0KHtcbiAgICAgICAgICAgICAgICBuYW1lOiBwbGF5ZXJOYW1lXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICAgIGdhbWVSZWYub24oJ3ZhbHVlJywgc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnY2hhbmdlZEdhbWUnLCBzbmFwc2hvdC52YWwoKSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgICAgICBcblxuICAgICAgICBHYW1lRmFjdG9yeS5jcmVhdGVHYW1lQnlJZEZpcmVCYXNlID0gKGZpcmViYXNlZ2FtZUlkKSA9PiB7XG4gICAgICAgICAgICAvL3JldHVybiAkaHR0cC5wb3N0KGBodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2ZpcmViYXNlL2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICAvL25lZWRzIHRvIGJlIC50aGVuYWJsZVxuICAgICAgICAgICAgY29uc3QgbmV3UmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYGdhbWVzLyR7ZmlyZWJhc2VnYW1lSWR9YCkucHVzaCgpO1xuICAgICAgICAgICAgbmV3UmVmLnNldCh7XG4gICAgICAgICAgICAgICAgcGxheWVySWQ6IHJlcS5xdWVyeS5wbGF5ZXJJZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB9XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCA9ICh0ZWFtSWQpID0+IHtcblxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9kZWNrcy8ke3RlYW1JZH1gKVxuICAgICAgICAgICAgICAgIC50aGUocmVzID0+IHJlcy5kYXRhKVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0VXNlcnNCeUdhbWVJZCA9IChnYW1lSWQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZ2FtZXMvJHtnYW1lSWR9L3VzZXJzYCk7XG4gICAgICAgIH07XG5cblxuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVCeUdhbWVJZCA9IChnYW1lSWQpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnN0IGRlZmVyID0gJHEuZGVmZXIoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGdhbWVJZCk7XG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAxO1xuICAgICAgICAgICAgY29uc3QgZ2FtZXNSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICByZXR1cm4gZ2FtZXNSZWYub25jZSgndmFsdWUnKS50aGVuKHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRkFDVE9SWVRFU1QnLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gc25hcHNob3QudmFsKCk7XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAvLyByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VGVhbUlkID0gKHRlYW1JZCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZSB0ZWFtIGlzIGlkJywgdGVhbUlkKVxuXG4gICAgICAgICAgICBjb25zdCBnYW1lc1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXNgKVxuICAgICAgICAgICAgcmV0dXJuIGdhbWVzUmVmLm9uY2UoJ3ZhbHVlJykudGhlbihzbmFwc2hvdCA9PiB7IC8vbWlnaHQgYnJlYWsgYWZ0ZXIgeW91IGRvIGl0IG9uY2VcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZSB2YWwgaXMnLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNuYXBzaG90LnZhbCgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCA9ICh0ZWFtSWQpID0+IHtcbiAgICAgICAgICAgIHRlYW1JZCA9IHRlYW1JZCB8fCAkbG9jYWxTdG9yYWdlLnRlYW0uaWRcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGUgdGVhbSBpcyBpZCcsIHRlYW1JZClcbiAgICAgICAgICAgIGNvbnN0IGRlZmVyID0gJHEuZGVmZXIoKTtcblxuICAgICAgICAgICAgY29uc3QgZ2FtZXNSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzYClcbiAgICAgICAgICAgIGdhbWVzUmVmLm9uKCd2YWx1ZScsIHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGhlIHZhbCBpcycsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUoc25hcHNob3QudmFsKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRlZmVyIHByb21pc2VcIiwgZGVmZXIucHJvbWlzZSlcbiAgICAgICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlVc2VyID0gKHVzZXJJZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnaHR0cDovL2xvY2FsU3RvcmFnZToxMzM3L2FwaS9nYW1lcy8/dXNlcklkPScgKyB1c2VySWQpXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybiBHYW1lRmFjdG9yeTtcbiAgICB9XG5cbik7XG4iLCJhcHAuZmFjdG9yeSgnTG9naW5GYWN0b3J5JywgZnVuY3Rpb24oJGh0dHApe1xuXHRyZXR1cm4ge1xuXHRcdGdldFNsYWNrQ3JlZHM6IGZ1bmN0aW9uKCl7XG5cdFx0XHRyZXR1cm4gJGh0dHAuZ2V0KCdodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL3NsYWNrJylcdFxuXHRcdFx0XHQudGhlbihyZXMgPT4ge1xuXHRcdFx0XHRcdHJldHVybiByZXMuZGF0YVxuXHRcdFx0XHR9KVxuXHRcdH1cblx0fVxufSlcbiIsImFwcC5mYWN0b3J5KCdVc2VyRmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCwgJHN0YXRlKXtcblx0XG5cdHJldHVybiB7XG5cdFx0c2V0VXNlcjogZnVuY3Rpb24oaW5mbyl7XG5cdFx0XHRyZXR1cm4gJGh0dHAoe1xuXHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdFx0dXJsOiAnaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS91c2VycycsXG5cdFx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRhdGE6IGluZm9cblx0XHRcdH0pXG5cdFx0XHQudGhlbihyZXMgPT4ge1xuXHRcdFx0XHR0aGlzLnNldExvY2FsU3RvcmFnZShyZXMuZGF0YS51c2VyWzBdLCByZXMuZGF0YS50ZWFtWzBdKTtcblx0XHRcdH0pXG5cdFx0fSxcblxuXHRcdGdldFNsYWNrSW5mbzogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiAkaHR0cC5nZXQoJ2h0dHBzOi8vc2xhY2suY29tL2FwaS91c2Vycy5pZGVudGl0eScpXG5cdFx0fSxcblxuXHRcdHNldExvY2FsU3RvcmFnZTogZnVuY3Rpb24odXNlciwgdGVhbSl7XG5cdFx0XHQkbG9jYWxTdG9yYWdlLnVzZXIgPSB1c2VyO1xuXHRcdFx0JGxvY2FsU3RvcmFnZS50ZWFtID0gdGVhbTtcblx0XHR9LFxuXG5cdFx0bG9nT3V0OiBmdW5jdGlvbigpe1xuXHRcdFx0JGxvY2FsU3RvcmFnZS4kcmVzZXQoKTtcblx0XHR9XG5cdH1cbn0pIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
