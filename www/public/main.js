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

    console.log("games", JSON.stringify($scope.games));
    $scope.goToNewGame = function () {
        console.log("calling goToNewGame");
        $state.go('new-game.main');
    };

    $scope.joinGame = GameFactory.joinGameById;

    $scope.showPopup = function (gameId) {

        $scope.game = $scope.games[gameId];
        $scope.gameName = $scope.game.settings.name;
        $scope.playerCount = Object.keys($scope.game.players).length;
        $scope.waitingForPlayers = ($scope.game.settings.minPlayers || 4) - $scope.playerCount;

        var myPopup = $ionicPopup.show({
            templateUrl: 'js/home/popup.html',
            title: 'Join ' + $scope.gameName,
            scope: $scope,
            buttons: [{ text: 'Go back' }, {
                text: 'Join game',
                type: 'button-balanced',
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
app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('new-game', {
        url: '/new-game',
        abstract: true,
        templateUrl: 'js/new-game/main.html',
        controller: 'NewGameCtrl',
        resolve: {
            teamDecks: function teamDecks(GameFactory) {
                return GameFactory.getDecksByTeamId();
            },
            standardDeck: function standardDeck(GameFactory) {
                return GameFactory.getDecksByTeamId(0);
            }
        }
    }).state('new-game.main', {
        url: '/setup-game',
        templateUrl: 'js/new-game/new-game.html'
    }).state('new-game.add-decks', {
        url: '/add-decks',
        templateUrl: 'js/new-game/add-decks.html'
    }).state('new-game.deck', {
        url: '/deck/:deckId',
        templateUrl: 'js/new-game/deck.html',
        controller: 'DeckCtrl',
        resolve: {
            cards: function cards(GameFactory, $stateParams) {
                return GameFactory.getCardsByDeckId($stateParams.deckId);
            }
        }

    });

    $urlRouterProvider.otherwise('/new-game/setup-game');
});

app.controller('NewGameCtrl', function ($scope, GameFactory, $state, teamDecks, standardDeck) {
    $scope.currentView = 'addDecks';
    $scope.gameConfig = {};
    $scope.gameConfig.decks = {};
    $scope.goToDecks = function () {
        $state.go('new-game.add-decks', {}, { location: true, reload: true });
    };

    $scope.decks = standardDeck.concat(teamDecks);

    $scope.startNewGame = function (gameConfig) {
        GameFactory.startNewGame(gameConfig).then(function (id) {
            console.log('the game id is', id);
            $state.go('home'); //'game.pre-game', { 'gameId': 100 }
        });
    };
    $scope.addDecksToGame = GameFactory.addDecks;
    // $scope.$on('changedGame', (event, data) => {
    //     console.log('received event')
    //     console.log('data obj:', data)
    //     $scope.game = data;
    //     $scope.$digest()

    // })

});

app.controller('DeckCtrl', function ($scope, GameFactory, $state, cards) {
    $scope.cards = cards;
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
            apiKey: "AIzaSyAvQ7yQ7fKIUUOxEqHP2-hCBLzuMkdoXko",
            authDomain: "blank-against-humanity-d9cbf.firebaseapp.com",
            databaseURL: "https://blank-against-humanity-d9cbf.firebaseio.com",
            storageBucket: "blank-against-humanity-d9cbf.appspot.com",
            messagingSenderId: "778108071646"
        };
        firebase.initializeApp(config);
    };
    initializeFirebase();

    GameFactory.startNewGame = function (gameConfig) {
        //can also get all the decks by team here to prepare
        console.log('the settings are:', gameConfig);
        var teamId = $localStorage.team.id || 2;
        var creatorId = $localStorage.user.id || 3;
        return $http.post('http://192.168.4.225:1337/api/games', {
            name: gameConfig.name || 'Boring Name',
            teamId: teamId,
            creatorId: creatorId,
            creatorName: $localStorage.user.name || 'dan', //might be unnecessary if we have the user id
            settings: gameConfig
        }).then(function (res) {
            return res.data;
        }).then(function (gameId) {
            var gameRef = firebase.database().ref('/teams/' + teamId + '/games/' + gameId);
            gameRef.on('value', function (snapshot) {
                console.log('snapshot in gamefactory is:', snapshot.val());
                $rootScope.$broadcast('changedGame', snapshot.val());
            });
            return gameId;
        });
    };

    GameFactory.getCardsByDeckId = function (id) {
        return $http.get('http://192.168.4.236:1337/api/decks/' + id + '/cards').then(function (res) {
            console.log('res.data is:', res.data);
            return res.data;
        });
    };

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

    // GameFactory.createGameByIdFireBase = (firebasegameId) => {
    //     //return $http.post(`http://localhost:1337/api/firebase/games/${gameId}`)
    //     //needs to be .thenable
    //     const newRef = firebase.database().ref(`games/${firebasegameId}`).push();
    //     newRef.set({
    //         playerId: req.query.playerId
    //     });
    // }

    GameFactory.getDecksByTeamId = function (id) {
        var teamId = typeof id !== 'number' ? $localStorage.team.id : id; // id || localstorage doesn't work because 0 is falsey
        return $http.get('http://localhost:1337/api/decks?team=' + teamId).then(function (res) {
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

    // Keep this commented out or the home state will break!!
    // GameFactory.getGamesByTeamId = (teamId) => {
    //     console.log('the team is id', teamId)
    //     teamId = teamId || $localStorage.team.id

    //     const gamesRef = firebase.database().ref(`teams/${teamId}/games`)
    //     return gamesRef.once('value').then(snapshot => { //might break after you do it once
    //         console.log('the val is', snapshot.val())
    //         return snapshot.val();
    //     })
    // };

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImNhcmRzLXRlc3QvY2FyZHNUZXN0LmpzIiwiZGVja3MvZGVja3MuanMiLCJmcm9tIGZzZy9mcm9tLWZzZy5qcyIsImdhbWUvZ2FtZS5qcyIsImhvbWUvaG9tZS5qcyIsImxvZ2luL2xvZ2luLmpzIiwibmV3LWdhbWUvbmV3LWdhbWUuanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiLCJjb21tb24vZmFjdG9yaWVzL0FjdGl2ZUdhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9HYW1lRmFjdG9yeS5qcyIsImNvbW1vbi9mYWN0b3JpZXMvbG9naW5GYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy91c2VyRmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJhcHAiLCJhbmd1bGFyIiwibW9kdWxlIiwicnVuIiwiJGlvbmljUGxhdGZvcm0iLCJyZWFkeSIsImNvcmRvdmEiLCJwbHVnaW5zIiwiS2V5Ym9hcmQiLCJoaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIiLCJkaXNhYmxlU2Nyb2xsIiwiU3RhdHVzQmFyIiwic3R5bGVMaWdodENvbnRlbnQiLCJjb250cm9sbGVyIiwiJHNjb3BlIiwiVXNlckZhY3RvcnkiLCIkc3RhdGUiLCIkbG9jYWxTdG9yYWdlIiwiJHRpbWVvdXQiLCJsb2dPdXQiLCJnbyIsImNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwic3RhdGUiLCJ1cmwiLCJ0ZW1wbGF0ZVVybCIsImdyZWV0aW5nIiwicmVzb2x2ZSIsImRlY2tzIiwiR2FtZUZhY3RvcnkiLCIkc3RhdGVQYXJhbXMiLCJnZXREZWNrc0J5VGVhbUlkIiwic3RhdGVQYXJhbXMiLCJ0ZWFtSWQiLCJhYnN0cmFjdCIsImdhbWUiLCJnZXRHYW1lQnlHYW1lSWQiLCJnYW1lSWQiLCJBY3RpdmVHYW1lRmFjdG9yeSIsInBsYXllcklkIiwidXNlciIsImlkIiwidGVhbSIsImdhbWVOYW1lIiwic2V0dGluZ3MiLCJuYW1lIiwid2hpdGVDYXJkcyIsInBsYXllcnMiLCJoYW5kIiwic2hvd0NhcmRzIiwicGxheWVyQ291bnQiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiY29uc29sZSIsImxvZyIsIm9uU3dpcGVEb3duIiwiJGV2YWxBc3luYyIsInJlZmlsbE15SGFuZCIsIiRvbiIsImV2ZW50Iiwic25hcHNob3QiLCIkdXJsUm91dGVyUHJvdmlkZXIiLCJnYW1lcyIsImdldEdhbWVzQnlUZWFtSWQiLCIkY29yZG92YU9hdXRoIiwiJGlvbmljUG9wdXAiLCJzdGFydE5ld0dhbWUiLCJzdG9yYWdlIiwiSlNPTiIsInN0cmluZ2lmeSIsImdvVG9OZXdHYW1lIiwiam9pbkdhbWUiLCJqb2luR2FtZUJ5SWQiLCJzaG93UG9wdXAiLCJ3YWl0aW5nRm9yUGxheWVycyIsIm1pblBsYXllcnMiLCJteVBvcHVwIiwic2hvdyIsInRpdGxlIiwic2NvcGUiLCJidXR0b25zIiwidGV4dCIsInR5cGUiLCJvblRhcCIsIm90aGVyd2lzZSIsIkxvZ2luRmFjdG9yeSIsIiRpb25pY1NpZGVNZW51RGVsZWdhdGUiLCJsb2dpbldpdGhTbGFjayIsImdldFNsYWNrQ3JlZHMiLCJ0aGVuIiwic2xhY2siLCJjcmVkcyIsImNsaWVudElEIiwiY2xpZW50U2VjcmV0Iiwic2V0VXNlciIsImluZm8iLCJjYW5EcmFnQ29udGVudCIsInJlZGlyZWN0VXNlciIsInRlYW1EZWNrcyIsInN0YW5kYXJkRGVjayIsImNhcmRzIiwiZ2V0Q2FyZHNCeURlY2tJZCIsImRlY2tJZCIsImN1cnJlbnRWaWV3IiwiZ2FtZUNvbmZpZyIsImdvVG9EZWNrcyIsImxvY2F0aW9uIiwicmVsb2FkIiwiY29uY2F0IiwiYWRkRGVja3NUb0dhbWUiLCJhZGREZWNrcyIsImZhY3RvcnkiLCIkaHR0cCIsIiRyb290U2NvcGUiLCJyZWZpbGxlciIsImNhcmRzTmVlZGVkIiwicGlsZVJlZiIsImhhbmRSZWYiLCJsaW1pdFRvRmlyc3QiLCJvbmNlIiwiY2FyZHNTbmFwc2hvdCIsImZvckVhY2giLCJ1cGRhdGVPYmoiLCJjYXJkIiwicmVmIiwidHJhbnNhY3Rpb24iLCJrZXkiLCJjYXJkRGF0YSIsInVwZGF0ZSIsImNhdGNoIiwiZXJyIiwiZ2FtZVJlZiIsImZpcmViYXNlIiwiZGF0YWJhc2UiLCJjaGlsZCIsImhhbmRTbmFwc2hvdCIsIm51bUNoaWxkcmVuIiwic3VibWl0V2hpdGVDYXJkIiwiY2FyZElkIiwiY2FyZFRvU3VibWl0Iiwic3VibWl0UmVmIiwiZmlyZWJhc2VNb3ZlU2luZ2xlS2V5VmFsdWUiLCJzZXQiLCJzdWJtaXR0ZWRCeSIsIiRxIiwiaW5pdGlhbGl6ZUZpcmViYXNlIiwiYXBpS2V5IiwiYXV0aERvbWFpbiIsImRhdGFiYXNlVVJMIiwic3RvcmFnZUJ1Y2tldCIsIm1lc3NhZ2luZ1NlbmRlcklkIiwiaW5pdGlhbGl6ZUFwcCIsImNyZWF0b3JJZCIsInBvc3QiLCJjcmVhdG9yTmFtZSIsInJlcyIsImRhdGEiLCJvbiIsInZhbCIsIiRicm9hZGNhc3QiLCJnZXQiLCJwbGF5ZXJOYW1lIiwicGxheWVyUmVmIiwiZ2V0VXNlcnNCeUdhbWVJZCIsImdhbWVzUmVmIiwiZGVmZXIiLCJwcm9taXNlIiwiZ2V0R2FtZXNCeVVzZXIiLCJ1c2VySWQiLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0TG9jYWxTdG9yYWdlIiwiZ2V0U2xhY2tJbmZvIiwiJHJlc2V0Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBQSxPQUFBQyxHQUFBLEdBQUFDLFFBQUFDLE1BQUEsQ0FBQSxzQkFBQSxFQUFBLENBQUEsT0FBQSxFQUFBLFdBQUEsRUFBQSxXQUFBLEVBQUEsZ0JBQUEsRUFBQSxXQUFBLEVBQUEsY0FBQSxDQUFBLENBQUE7O0FBRUFGLElBQUFHLEdBQUEsQ0FBQSxVQUFBQyxjQUFBLEVBQUE7QUFDQUEsbUJBQUFDLEtBQUEsQ0FBQSxZQUFBO0FBQ0EsWUFBQU4sT0FBQU8sT0FBQSxJQUFBUCxPQUFBTyxPQUFBLENBQUFDLE9BQUEsQ0FBQUMsUUFBQSxFQUFBO0FBQ0E7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LHdCQUFBLE1BREE7QUFFQWxKLHFCQUFBLGlDQUZBO0FBR0FtSix5QkFBQTtBQUNBLG9DQUFBO0FBREEsaUJBSEE7QUFNQWQsc0JBQUE3RDtBQU5BLGFBQUEsRUFRQU4sSUFSQSxDQVFBLGVBQUE7QUFDQSxzQkFBQWtGLGVBQUEsQ0FBQWhCLElBQUFDLElBQUEsQ0FBQXJILElBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQW9ILElBQUFDLElBQUEsQ0FBQW5ILElBQUEsQ0FBQSxDQUFBLENBQUE7QUFDQSxhQVZBLENBQUE7QUFXQSxTQWJBOztBQWVBbUksc0JBQUEsd0JBQUE7QUFDQSxtQkFBQTVELE1BQUFnRCxHQUFBLENBQUEsc0NBQUEsQ0FBQTtBQUNBLFNBakJBOztBQW1CQVcseUJBQUEseUJBQUFwSSxJQUFBLEVBQUFFLElBQUEsRUFBQTtBQUNBekIsMEJBQUF1QixJQUFBLEdBQUFBLElBQUE7QUFDQXZCLDBCQUFBeUIsSUFBQSxHQUFBQSxJQUFBO0FBQ0EsU0F0QkE7O0FBd0JBdkIsZ0JBQUEsa0JBQUE7QUFDQUYsMEJBQUE2SixNQUFBO0FBQ0E7QUExQkEsS0FBQTtBQTRCQSxDQTlCQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW9uaWMgU3RhcnRlciBBcHBcblxuLy8gYW5ndWxhci5tb2R1bGUgaXMgYSBnbG9iYWwgcGxhY2UgZm9yIGNyZWF0aW5nLCByZWdpc3RlcmluZyBhbmQgcmV0cmlldmluZyBBbmd1bGFyIG1vZHVsZXNcbi8vICdzdGFydGVyJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xud2luZG93LmFwcCA9IGFuZ3VsYXIubW9kdWxlKCdCbGFua0FnYWluc3RIdW1hbml0eScsIFsnaW9uaWMnLCAndWkucm91dGVyJywnbmdDb3Jkb3ZhJywnbmdDb3Jkb3ZhT2F1dGgnLCAnbmdTdG9yYWdlJywgJ3VpLmJvb3RzdHJhcCddKVxuXG5hcHAucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtKSB7XG4gICAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICAgICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAgICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuXG4gICAgICAgICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcbiAgICAgICAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxuICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgICAgICAgIFN0YXR1c0Jhci5zdHlsZUxpZ2h0Q29udGVudCgpXG4gICAgICAgIH1cbiAgICB9KTtcblxufSlcbiIsImFwcC5jb250cm9sbGVyKCdMb2dvdXRDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBVc2VyRmFjdG9yeSwgJHN0YXRlLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCl7XG5cdCRzY29wZS5sb2dPdXQgPSBmdW5jdGlvbigpe1xuXHRcdFVzZXJGYWN0b3J5LmxvZ091dCgpXG5cdFx0JHN0YXRlLmdvKCdsb2dpbicpXG5cdH1cbn0pIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcil7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdjYXJkcycsIHtcblx0XHR1cmw6ICcvY2FyZHMnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvY2FyZHMtdGVzdC9jYXJkcy10ZXN0Lmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdDYXJkc1Rlc3RDdHJsJ1xuXHR9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0NhcmRzVGVzdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpe1xuIFx0JHNjb3BlLmdyZWV0aW5nID0gXCJISVwiXG59KSIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdkZWNrcycsIHtcblx0XHR1cmw6ICdkZWNrcy86dGVhbWlkJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2RlY2tzL2RlY2tzLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdEZWNrQ3RybCcsXG5cdFx0cmVzb2x2ZToge1xuXHRcdFx0ZGVja3M6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkKHN0YXRlUGFyYW1zLnRlYW1JZClcblx0XHR9XG5cdH0pXG5cbn0pXG5cbmFwcC5jb250cm9sbGVyKCdEZWNrQ3RybCcsICgkc2NvcGUpID0+IHtcblxuXG5cdFxufSkiLCIvLyAoZnVuY3Rpb24gKCkge1xuXG4vLyAgICAgJ3VzZSBzdHJpY3QnO1xuXG4vLyAgICAgLy8gSG9wZSB5b3UgZGlkbid0IGZvcmdldCBBbmd1bGFyISBEdWgtZG95LlxuLy8gICAgIGlmICghd2luZG93LmFuZ3VsYXIpIHRocm93IG5ldyBFcnJvcignSSBjYW5cXCd0IGZpbmQgQW5ndWxhciEnKTtcblxuLy8gICAgIHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnZnNhUHJlQnVpbHQnLCBbXSk7XG5cbi8vICAgICBhcHAuZmFjdG9yeSgnU29ja2V0JywgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICBpZiAoIXdpbmRvdy5pbykgdGhyb3cgbmV3IEVycm9yKCdzb2NrZXQuaW8gbm90IGZvdW5kIScpO1xuLy8gICAgICAgICByZXR1cm4gd2luZG93LmlvKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pO1xuLy8gICAgIH0pO1xuXG4vLyAgICAgLy8gQVVUSF9FVkVOVFMgaXMgdXNlZCB0aHJvdWdob3V0IG91ciBhcHAgdG9cbi8vICAgICAvLyBicm9hZGNhc3QgYW5kIGxpc3RlbiBmcm9tIGFuZCB0byB0aGUgJHJvb3RTY29wZVxuLy8gICAgIC8vIGZvciBpbXBvcnRhbnQgZXZlbnRzIGFib3V0IGF1dGhlbnRpY2F0aW9uIGZsb3cuXG4vLyAgICAgYXBwLmNvbnN0YW50KCdBVVRIX0VWRU5UUycsIHtcbi8vICAgICAgICAgbG9naW5TdWNjZXNzOiAnYXV0aC1sb2dpbi1zdWNjZXNzJyxcbi8vICAgICAgICAgbG9naW5GYWlsZWQ6ICdhdXRoLWxvZ2luLWZhaWxlZCcsXG4vLyAgICAgICAgIGxvZ291dFN1Y2Nlc3M6ICdhdXRoLWxvZ291dC1zdWNjZXNzJyxcbi8vICAgICAgICAgc2Vzc2lvblRpbWVvdXQ6ICdhdXRoLXNlc3Npb24tdGltZW91dCcsXG4vLyAgICAgICAgIG5vdEF1dGhlbnRpY2F0ZWQ6ICdhdXRoLW5vdC1hdXRoZW50aWNhdGVkJyxcbi8vICAgICAgICAgbm90QXV0aG9yaXplZDogJ2F1dGgtbm90LWF1dGhvcml6ZWQnXG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuZmFjdG9yeSgnQXV0aEludGVyY2VwdG9yJywgZnVuY3Rpb24gKCRyb290U2NvcGUsICRxLCBBVVRIX0VWRU5UUykge1xuLy8gICAgICAgICB2YXIgc3RhdHVzRGljdCA9IHtcbi8vICAgICAgICAgICAgIDQwMTogQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCxcbi8vICAgICAgICAgICAgIDQwMzogQVVUSF9FVkVOVFMubm90QXV0aG9yaXplZCxcbi8vICAgICAgICAgICAgIDQxOTogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsXG4vLyAgICAgICAgICAgICA0NDA6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0XG4vLyAgICAgICAgIH07XG4vLyAgICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgICAgICByZXNwb25zZUVycm9yOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3Qoc3RhdHVzRGljdFtyZXNwb25zZS5zdGF0dXNdLCByZXNwb25zZSk7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXNwb25zZSlcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfTtcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5jb25maWcoZnVuY3Rpb24gKCRodHRwUHJvdmlkZXIpIHtcbi8vICAgICAgICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaChbXG4vLyAgICAgICAgICAgICAnJGluamVjdG9yJyxcbi8vICAgICAgICAgICAgIGZ1bmN0aW9uICgkaW5qZWN0b3IpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJGluamVjdG9yLmdldCgnQXV0aEludGVyY2VwdG9yJyk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIF0pO1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLnNlcnZpY2UoJ0F1dGhTZXJ2aWNlJywgZnVuY3Rpb24gKCRodHRwLCBTZXNzaW9uLCAkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUywgJHEpIHtcblxuLy8gICAgICAgICBmdW5jdGlvbiBvblN1Y2Nlc3NmdWxMb2dpbihyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgdmFyIHVzZXIgPSByZXNwb25zZS5kYXRhLnVzZXI7XG4vLyAgICAgICAgICAgICBTZXNzaW9uLmNyZWF0ZSh1c2VyKTtcbi8vICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dpblN1Y2Nlc3MpO1xuLy8gICAgICAgICAgICAgcmV0dXJuIHVzZXI7XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICAvLyBVc2VzIHRoZSBzZXNzaW9uIGZhY3RvcnkgdG8gc2VlIGlmIGFuXG4vLyAgICAgICAgIC8vIGF1dGhlbnRpY2F0ZWQgdXNlciBpcyBjdXJyZW50bHkgcmVnaXN0ZXJlZC5cbi8vICAgICAgICAgdGhpcy5pc0F1dGhlbnRpY2F0ZWQgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gISFTZXNzaW9uLnVzZXI7XG4vLyAgICAgICAgIH07XG5cbiAgICAgICAgXG4vLyAgICAgICAgIHRoaXMuaXNBZG1pbiA9IGZ1bmN0aW9uKHVzZXJJZCl7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZygncnVubmluZyBhZG1pbiBmdW5jJylcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJylcbi8vICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEudXNlci5pc0FkbWluKVxuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgdGhpcy5nZXRMb2dnZWRJblVzZXIgPSBmdW5jdGlvbiAoZnJvbVNlcnZlcikge1xuXG4vLyAgICAgICAgICAgICAvLyBJZiBhbiBhdXRoZW50aWNhdGVkIHNlc3Npb24gZXhpc3RzLCB3ZVxuLy8gICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSB1c2VyIGF0dGFjaGVkIHRvIHRoYXQgc2Vzc2lvblxuLy8gICAgICAgICAgICAgLy8gd2l0aCBhIHByb21pc2UuIFRoaXMgZW5zdXJlcyB0aGF0IHdlIGNhblxuLy8gICAgICAgICAgICAgLy8gYWx3YXlzIGludGVyZmFjZSB3aXRoIHRoaXMgbWV0aG9kIGFzeW5jaHJvbm91c2x5LlxuXG4vLyAgICAgICAgICAgICAvLyBPcHRpb25hbGx5LCBpZiB0cnVlIGlzIGdpdmVuIGFzIHRoZSBmcm9tU2VydmVyIHBhcmFtZXRlcixcbi8vICAgICAgICAgICAgIC8vIHRoZW4gdGhpcyBjYWNoZWQgdmFsdWUgd2lsbCBub3QgYmUgdXNlZC5cblxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuaXNBdXRoZW50aWNhdGVkKCkgJiYgZnJvbVNlcnZlciAhPT0gdHJ1ZSkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKFNlc3Npb24udXNlcik7XG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIC8vIE1ha2UgcmVxdWVzdCBHRVQgL3Nlc3Npb24uXG4vLyAgICAgICAgICAgICAvLyBJZiBpdCByZXR1cm5zIGEgdXNlciwgY2FsbCBvblN1Y2Nlc3NmdWxMb2dpbiB3aXRoIHRoZSByZXNwb25zZS5cbi8vICAgICAgICAgICAgIC8vIElmIGl0IHJldHVybnMgYSA0MDEgcmVzcG9uc2UsIHdlIGNhdGNoIGl0IGFuZCBpbnN0ZWFkIHJlc29sdmUgdG8gbnVsbC5cbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJykudGhlbihvblN1Y2Nlc3NmdWxMb2dpbikuY2F0Y2goZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuLy8gICAgICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmxvZ2luID0gZnVuY3Rpb24gKGNyZWRlbnRpYWxzKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2xvZ2luJywgY3JlZGVudGlhbHMpXG4vLyAgICAgICAgICAgICAgICAgLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pXG4vLyAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCh7IG1lc3NhZ2U6ICdJbnZhbGlkIGxvZ2luIGNyZWRlbnRpYWxzLid9KTtcbi8vICAgICAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLnNpZ251cCA9IGZ1bmN0aW9uKGNyZWRlbnRpYWxzKXtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4vLyAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4vLyAgICAgICAgICAgICAgICAgdXJsOiAnL3NpZ251cCcsXG4vLyAgICAgICAgICAgICAgICAgZGF0YTogY3JlZGVudGlhbHNcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4gcmVzdWx0LmRhdGEpXG4vLyAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oKXtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHttZXNzYWdlOiAnVGhhdCBlbWFpbCBpcyBhbHJlYWR5IGJlaW5nIHVzZWQuJ30pO1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmxvZ291dCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9sb2dvdXQnKS50aGVuKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICBTZXNzaW9uLmRlc3Ryb3koKTtcbi8vICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoQVVUSF9FVkVOVFMubG9nb3V0U3VjY2Vzcyk7XG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfTtcblxuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLnNlcnZpY2UoJ1Nlc3Npb24nLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMpIHtcblxuLy8gICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbi8vICAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCwgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgc2VsZi5kZXN0cm95KCk7XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgICRyb290U2NvcGUuJG9uKEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0LCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICBzZWxmLmRlc3Ryb3koKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcblxuLy8gICAgICAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uICh1c2VyKSB7XG4vLyAgICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICB9KTtcblxuLy8gfSgpKTtcbiIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnL2dhbWUnLFxuICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL2dhbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdHYW1lQ3RybCcsXG4gICAgfSlcbiAgICAuc3RhdGUoJ2dhbWUuYWN0aXZlLWdhbWUnLCB7XG4gICAgICAgIHVybDogJy86Z2FtZUlkL2FjdGl2ZS1nYW1lJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL2FjdGl2ZS1nYW1lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnQWN0aXZlR2FtZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBnYW1lIDogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldEdhbWVCeUdhbWVJZCgkc3RhdGVQYXJhbXMuZ2FtZUlkKVxuICAgICAgICB9XG4gICAgfSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdHYW1lQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5KSA9PiB7ICAgXG4gICBcbn0pXG5cbmFwcC5jb250cm9sbGVyKFwiQWN0aXZlR2FtZUN0cmxcIiwgKCRzY29wZSwgR2FtZUZhY3RvcnksIEFjdGl2ZUdhbWVGYWN0b3J5LCBnYW1lLCAkc3RhdGVQYXJhbXMsICRsb2NhbFN0b3JhZ2UpID0+IHtcblxuICAgIGNvbnN0IGdhbWVJZCA9ICRzdGF0ZVBhcmFtcy5nYW1lSWQ7XG4gICAgY29uc3QgcGxheWVySWQgPSAkbG9jYWxTdG9yYWdlLnVzZXIuaWQ7XG4gICAgY29uc3QgdGVhbUlkID0gJGxvY2FsU3RvcmFnZS50ZWFtLmlkXG4gICAgJHNjb3BlLmdhbWUgPSBnYW1lO1xuICAgICRzY29wZS5nYW1lTmFtZSA9ICRzY29wZS5nYW1lLnNldHRpbmdzLm5hbWU7XG4gICAgJHNjb3BlLndoaXRlQ2FyZHMgPSAkc2NvcGUuZ2FtZS5wbGF5ZXJzW3BsYXllcklkXS5oYW5kO1xuICAgIFxuICAgICRzY29wZS5zaG93Q2FyZHMgPSBmYWxzZTtcblxuICAgICRzY29wZS5wbGF5ZXJDb3VudCA9IE9iamVjdC5rZXlzKCRzY29wZS5nYW1lLnBsYXllcnMpLmxlbmd0aDtcbiAgICBcbiAgICBjb25zb2xlLmxvZygnV0hJVEVDQVJEUycsICRzY29wZS53aGl0ZUNhcmRzKTtcblxuICAgICRzY29wZS5vblN3aXBlRG93biA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3dvcmtpbmcnKTtcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnNob3dDYXJkcyk7XG4gICAgICAgICRzY29wZS5zaG93Q2FyZHMgPSB0cnVlIDtcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnNob3dDYXJkcyk7XG4gICAgICAgICRzY29wZS4kZXZhbEFzeW5jKCk7XG5cbiAgICB9XG5cbiAgICBBY3RpdmVHYW1lRmFjdG9yeS5yZWZpbGxNeUhhbmQoZ2FtZUlkLCBwbGF5ZXJJZCwgdGVhbUlkKTtcblxuICAgICRzY29wZS4kb24oJ2NoYW5nZWRHYW1lJywgKGV2ZW50LHNuYXBzaG90KSA9PntcbiAgICAgICAgJHNjb3BlLmdhbWUgPSBzbmFwc2hvdDtcbiAgICB9KVxuXG5cbiAgIFxuICAgIFxufSlcblxuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgIHVybDogJy8nLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2hvbWUvaG9tZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgZ2FtZXM6IGZ1bmN0aW9uKEdhbWVGYWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdIb21lQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCAkY29yZG92YU9hdXRoLCBVc2VyRmFjdG9yeSwgR2FtZUZhY3RvcnksICRsb2NhbFN0b3JhZ2UsIGdhbWVzLCAkaW9uaWNQb3B1cCkge1xuICAgICRzY29wZS5zdGFydE5ld0dhbWUgPSBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWU7XG4gICAgJHNjb3BlLnN0b3JhZ2UgPSAkbG9jYWxTdG9yYWdlO1xuICAgICRzY29wZS5nYW1lcyA9IGdhbWVzO1xuXG4gICAgY29uc29sZS5sb2coXCJnYW1lc1wiLCBKU09OLnN0cmluZ2lmeSgkc2NvcGUuZ2FtZXMpKVxuICAgICRzY29wZS5nb1RvTmV3R2FtZSA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJjYWxsaW5nIGdvVG9OZXdHYW1lXCIpXG4gICAgICAgICRzdGF0ZS5nbygnbmV3LWdhbWUubWFpbicpXG4gICAgfVxuXG4gICAgJHNjb3BlLmpvaW5HYW1lID0gR2FtZUZhY3Rvcnkuam9pbkdhbWVCeUlkO1xuXG4gICAgJHNjb3BlLnNob3dQb3B1cCA9IGZ1bmN0aW9uIChnYW1lSWQpIHtcblxuICAgICAgICAkc2NvcGUuZ2FtZSA9ICRzY29wZS5nYW1lc1tnYW1lSWRdO1xuICAgICAgICAkc2NvcGUuZ2FtZU5hbWUgPSAkc2NvcGUuZ2FtZS5zZXR0aW5ncy5uYW1lO1xuICAgICAgICAkc2NvcGUucGxheWVyQ291bnQgPSBPYmplY3Qua2V5cygkc2NvcGUuZ2FtZS5wbGF5ZXJzKS5sZW5ndGg7XG4gICAgICAgICRzY29wZS53YWl0aW5nRm9yUGxheWVycyA9ICAoJHNjb3BlLmdhbWUuc2V0dGluZ3MubWluUGxheWVycyB8fCA0KSAtICRzY29wZS5wbGF5ZXJDb3VudDtcbiAgICAgICAgIFxuICAgICAgICAgY29uc3QgbXlQb3B1cCA9ICRpb25pY1BvcHVwLnNob3coe1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9ob21lL3BvcHVwLmh0bWwnLFxuICAgICAgICAgICAgdGl0bGU6ICdKb2luICcgKyAkc2NvcGUuZ2FtZU5hbWUsXG4gICAgICAgICAgICBzY29wZTogJHNjb3BlLFxuICAgICAgICAgICAgYnV0dG9uczogXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAge3RleHQ6ICdHbyBiYWNrJ30sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnSm9pbiBnYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbi1iYWxhbmNlZCcsXG4gICAgICAgICAgICAgICAgICAgIG9uVGFwOiBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5qb2luR2FtZShnYW1lSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdnYW1lLmFjdGl2ZS1nYW1lJywge2dhbWVJZDogZ2FtZUlkfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSlcbiAgICB9XG59KVxuXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpe1xuXHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnbG9naW4nLCB7XG5cdFx0dXJsOiAnL2xvZ2luJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2xvZ2luL2xvZ2luLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdMb2dpbkN0cmwnXG5cdH0pXG5cdCR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9sb2dpbicpO1xufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCBMb2dpbkZhY3RvcnksIFVzZXJGYWN0b3J5LCAkY29yZG92YU9hdXRoLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCwgJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZSl7XG4gXHQkc2NvcGUubG9naW5XaXRoU2xhY2sgPSBmdW5jdGlvbigpe1xuIFx0XHRyZXR1cm4gTG9naW5GYWN0b3J5LmdldFNsYWNrQ3JlZHMoKVxuIFx0XHQudGhlbihjcmVkcyA9PntcbiBcdFx0XHRyZXR1cm4gJGNvcmRvdmFPYXV0aC5zbGFjayhjcmVkcy5jbGllbnRJRCwgY3JlZHMuY2xpZW50U2VjcmV0LCBbJ2lkZW50aXR5LmJhc2ljJywgJ2lkZW50aXR5LnRlYW0nLCAnaWRlbnRpdHkuYXZhdGFyJ10pXG4gXHRcdH0pXG4gXHRcdC50aGVuKGluZm8gPT4gVXNlckZhY3Rvcnkuc2V0VXNlcihpbmZvKSlcbiBcdFx0LnRoZW4oKCkgPT4gJHN0YXRlLmdvKCdob21lJykpXG4gXHR9XG5cbiBcdCRpb25pY1NpZGVNZW51RGVsZWdhdGUuY2FuRHJhZ0NvbnRlbnQoZmFsc2UpO1xuXG4gXHQkc2NvcGUuJG9uKCckaW9uaWNWaWV3LmxlYXZlJywgZnVuY3Rpb24gKCkgeyAkaW9uaWNTaWRlTWVudURlbGVnYXRlLmNhbkRyYWdDb250ZW50KHRydWUpIH0pO1xuXG4gXHQkc2NvcGUuc3RvcmFnZSA9ICRsb2NhbFN0b3JhZ2VcblxuIFx0ZnVuY3Rpb24gcmVkaXJlY3RVc2VyKCl7XG4gXHRcdGNvbnNvbGUubG9nKFwic2NvcGUgc3RvcmFnZSB1c2VyXCIsICRzY29wZS5zdG9yYWdlLnVzZXIpXG4gXHRcdGlmICgkc2NvcGUuc3RvcmFnZS51c2VyKSAkc3RhdGUuZ28oJ2hvbWUnKVxuIFx0fVxuXG5cdHJlZGlyZWN0VXNlcigpO1xufSkiLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSA9PiB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbmV3LWdhbWUnLCB7XG4gICAgICAgIHVybDogJy9uZXctZ2FtZScsXG4gICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL21haW4uaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdOZXdHYW1lQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIHRlYW1EZWNrczogKEdhbWVGYWN0b3J5KSA9PiBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkKCksXG4gICAgICAgICAgICBzdGFuZGFyZERlY2s6IChHYW1lRmFjdG9yeSkgPT4gR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCgwKVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIC5zdGF0ZSgnbmV3LWdhbWUubWFpbicsIHtcbiAgICAgICAgdXJsOiAnL3NldHVwLWdhbWUnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL25ldy1nYW1lLmh0bWwnLFxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ25ldy1nYW1lLmFkZC1kZWNrcycsIHtcbiAgICAgICAgdXJsOiAnL2FkZC1kZWNrcycsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvYWRkLWRlY2tzLmh0bWwnLFxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ25ldy1nYW1lLmRlY2snLCB7XG4gICAgICAgIHVybDogJy9kZWNrLzpkZWNrSWQnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL2RlY2suaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdEZWNrQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGNhcmRzOiAoR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcykgPT4gR2FtZUZhY3RvcnkuZ2V0Q2FyZHNCeURlY2tJZCgkc3RhdGVQYXJhbXMuZGVja0lkKVxuICAgICAgICB9XG5cblxuICAgIH0pXG5cbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvbmV3LWdhbWUvc2V0dXAtZ2FtZScpO1xufSlcblxuYXBwLmNvbnRyb2xsZXIoJ05ld0dhbWVDdHJsJywgKCRzY29wZSwgR2FtZUZhY3RvcnksICRzdGF0ZSwgdGVhbURlY2tzLCBzdGFuZGFyZERlY2spID0+IHtcbiAgICAkc2NvcGUuY3VycmVudFZpZXcgPSAnYWRkRGVja3MnXG4gICAgJHNjb3BlLmdhbWVDb25maWcgPSB7fTtcbiAgICAkc2NvcGUuZ2FtZUNvbmZpZy5kZWNrcyA9IHt9O1xuICAgICRzY29wZS5nb1RvRGVja3MgPSAoKSA9PiB7XG4gICAgICAgICRzdGF0ZS5nbygnbmV3LWdhbWUuYWRkLWRlY2tzJywge30sIHsgbG9jYXRpb246IHRydWUsIHJlbG9hZDogdHJ1ZSB9KVxuICAgIH1cblxuICAgICRzY29wZS5kZWNrcyA9IHN0YW5kYXJkRGVjay5jb25jYXQodGVhbURlY2tzKTtcblxuICAgICRzY29wZS5zdGFydE5ld0dhbWUgPSAoZ2FtZUNvbmZpZykgPT4ge1xuICAgICAgICBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWUoZ2FtZUNvbmZpZykudGhlbigoaWQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGUgZ2FtZSBpZCBpcycsIGlkKVxuICAgICAgICAgICAgJHN0YXRlLmdvKCdob21lJykgLy8nZ2FtZS5wcmUtZ2FtZScsIHsgJ2dhbWVJZCc6IDEwMCB9XG4gICAgICAgIH0pXG4gICAgfVxuICAgICRzY29wZS5hZGREZWNrc1RvR2FtZSA9IEdhbWVGYWN0b3J5LmFkZERlY2tzO1xuICAgIC8vICRzY29wZS4kb24oJ2NoYW5nZWRHYW1lJywgKGV2ZW50LCBkYXRhKSA9PiB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdyZWNlaXZlZCBldmVudCcpXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdkYXRhIG9iajonLCBkYXRhKVxuICAgIC8vICAgICAkc2NvcGUuZ2FtZSA9IGRhdGE7XG4gICAgLy8gICAgICRzY29wZS4kZGlnZXN0KClcblxuICAgIC8vIH0pXG5cblxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0RlY2tDdHJsJywgKCRzY29wZSwgR2FtZUZhY3RvcnksICRzdGF0ZSwgY2FyZHMpID0+IHtcbiAgICAkc2NvcGUuY2FyZHMgPSBjYXJkc1xufSlcblxuIiwiLy9EaXJlY3RpdmUgRmlsZSIsImFwcC5mYWN0b3J5KCdBY3RpdmVHYW1lRmFjdG9yeScsICgkaHR0cCwgJHJvb3RTY29wZSwgJGxvY2FsU3RvcmFnZSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IEFjdGl2ZUdhbWVGYWN0b3J5ID0ge307XG5cbiAgICAgICAgY29uc3QgcmVmaWxsZXIgPSAoY2FyZHNOZWVkZWQsIHBpbGVSZWYsIGhhbmRSZWYpID0+IHtcbiAgICAgICAgICBwaWxlUmVmLmxpbWl0VG9GaXJzdChjYXJkc05lZWRlZCkub25jZSgndmFsdWUnLCBjYXJkc1NuYXBzaG90ID0+IHtcbiAgICAgICAgICAgIGNhcmRzU25hcHNob3QuZm9yRWFjaChjYXJkID0+IHtcbiAgICAgICAgICAgICAgbGV0IHVwZGF0ZU9iaiA9IHt9XG4gICAgICAgICAgICAgIGNhcmQucmVmLnRyYW5zYWN0aW9uKGNhcmREYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgIHVwZGF0ZU9ialtjYXJkLmtleV0gPSBjYXJkRGF0YVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IGhhbmRSZWYudXBkYXRlKHVwZGF0ZU9iaikpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICAgICAgfVxuXG4gICAgICAgIEFjdGl2ZUdhbWVGYWN0b3J5LnJlZmlsbE15SGFuZCA9IChnYW1lSWQsIHBsYXllcklkLCB0ZWFtSWQpID0+IHtcbiAgICAgICAgICAvLyBob3cgbWFueSBjYXJkcyBkbyBJIG5lZWQ/XG4gICAgICAgICAgbGV0IGNhcmRzTmVlZGVkID0gMFxuICAgICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgY29uc3QgaGFuZFJlZiA9IGdhbWVSZWYuY2hpbGQoYHBsYXllcnMvJHtwbGF5ZXJJZH0vaGFuZGApXG4gICAgICAgICAgY29uc3QgcGlsZVJlZiA9IGdhbWVSZWYuY2hpbGQoJ3BpbGUvd2hpdGVjYXJkcycpXG4gICAgICAgICAgaGFuZFJlZi5vbmNlKCd2YWx1ZScsIGhhbmRTbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgIGNhcmRzTmVlZGVkID0gNyAtIGhhbmRTbmFwc2hvdC5udW1DaGlsZHJlbigpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICByZWZpbGxlcihjYXJkc05lZWRlZCwgcGlsZVJlZiwgaGFuZFJlZilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBBY3RpdmVHYW1lRmFjdG9yeS5zdWJtaXRXaGl0ZUNhcmQgPSAocGxheWVySWQsIGNhcmRJZCwgZ2FtZUlkLCB0ZWFtSWQpID0+IHtcbiAgICAgICAgICBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKTtcbiAgICAgICAgICBjb25zdCBjYXJkVG9TdWJtaXQgPSBnYW1lUmVmLmNoaWxkKGBwbGF5ZXJzLyR7cGxheWVySWR9L2hhbmQvJHtjYXJkSWR9YCk7XG4gICAgICAgICAgY29uc3Qgc3VibWl0UmVmID0gZ2FtZVJlZi5jaGlsZCgnc3VibWl0dGVkV2hpdGVDYXJkcycpO1xuICAgICAgICAgIGZpcmViYXNlTW92ZVNpbmdsZUtleVZhbHVlKGNhcmRUb1N1Ym1pdCwgc3VibWl0UmVmKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gc3VibWl0UmVmLmNoaWxkKGNhcmRJZCkuc2V0KHtcbiAgICAgICAgICAgICAgc3VibWl0dGVkQnk6IHBsYXllcklkXG4gICAgICAgICAgICB9KSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBBY3RpdmVHYW1lRmFjdG9yeTsgXG5cblxufSk7IiwiYXBwLmZhY3RvcnkoJ0dhbWVGYWN0b3J5JywgKCRodHRwLCAkcm9vdFNjb3BlLCAkbG9jYWxTdG9yYWdlLCAkcSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IEdhbWVGYWN0b3J5ID0ge307XG5cbiAgICAgICAgY29uc3QgaW5pdGlhbGl6ZUZpcmViYXNlID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgICAgICAgICAgICAgICBhcGlLZXk6IFwiQUl6YVN5QXZRN3lRN2ZLSVVVT3hFcUhQMi1oQ0JMenVNa2RvWGtvXCIsXG4gICAgICAgICAgICAgICAgICAgIGF1dGhEb21haW46IFwiYmxhbmstYWdhaW5zdC1odW1hbml0eS1kOWNiZi5maXJlYmFzZWFwcC5jb21cIixcbiAgICAgICAgICAgICAgICAgICAgZGF0YWJhc2VVUkw6IFwiaHR0cHM6Ly9ibGFuay1hZ2FpbnN0LWh1bWFuaXR5LWQ5Y2JmLmZpcmViYXNlaW8uY29tXCIsXG4gICAgICAgICAgICAgICAgICAgIHN0b3JhZ2VCdWNrZXQ6IFwiYmxhbmstYWdhaW5zdC1odW1hbml0eS1kOWNiZi5hcHBzcG90LmNvbVwiLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdpbmdTZW5kZXJJZDogXCI3NzgxMDgwNzE2NDZcIlxuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZpcmViYXNlLmluaXRpYWxpemVBcHAoY29uZmlnKTtcbiAgICAgICAgfTtcbiAgICAgICAgaW5pdGlhbGl6ZUZpcmViYXNlKCk7XG5cbiAgICAgICAgR2FtZUZhY3Rvcnkuc3RhcnROZXdHYW1lID0gKGdhbWVDb25maWcpID0+IHtcbiAgICAgICAgICAgIC8vY2FuIGFsc28gZ2V0IGFsbCB0aGUgZGVja3MgYnkgdGVhbSBoZXJlIHRvIHByZXBhcmVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGUgc2V0dGluZ3MgYXJlOicsIGdhbWVDb25maWcpXG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAkbG9jYWxTdG9yYWdlLnRlYW0uaWQgfHwgMjtcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0b3JJZCA9ICRsb2NhbFN0b3JhZ2UudXNlci5pZCB8fCAzO1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJ2h0dHA6Ly8xOTIuMTY4LjQuMjI1OjEzMzcvYXBpL2dhbWVzJywge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBnYW1lQ29uZmlnLm5hbWUgfHwgJ0JvcmluZyBOYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgdGVhbUlkOiB0ZWFtSWQsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0b3JJZDogY3JlYXRvcklkLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdG9yTmFtZTogJGxvY2FsU3RvcmFnZS51c2VyLm5hbWUgfHwgJ2RhbicsIC8vbWlnaHQgYmUgdW5uZWNlc3NhcnkgaWYgd2UgaGF2ZSB0aGUgdXNlciBpZFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczogZ2FtZUNvbmZpZ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICAgICAgICAgIC50aGVuKGdhbWVJZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgL3RlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAgICAgICAgICAgICBnYW1lUmVmLm9uKCd2YWx1ZScsIHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzbmFwc2hvdCBpbiBnYW1lZmFjdG9yeSBpczonLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnY2hhbmdlZEdhbWUnLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnYW1lSWQ7XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldENhcmRzQnlEZWNrSWQgPSAoaWQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8xOTIuMTY4LjQuMjM2OjEzMzcvYXBpL2RlY2tzLyR7aWR9L2NhcmRzYClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVzLmRhdGEgaXM6JywgcmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuZGF0YVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmFkZERlY2tzVG9HYW1lID0gKGdhbWVJZCwgZGVja3MpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGBhcGkvZ2FtZXMvJHtnYW1lSWR9L2RlY2tzYCwgZGVja3MpXG5cbiAgICAgICAgICAgIC8vIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfS9waWxlL2ApXG4gICAgICAgICAgICAvLyBnYW1lUmVmLnNldCh7XG4gICAgICAgICAgICAvLyAgICAgZGVja0lkOiB0cnVlXG4gICAgICAgICAgICAvLyB9KVxuICAgICAgICB9XG5cblxuICAgICAgICBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAkbG9jYWxTdG9yYWdlLnRlYW0uaWQ7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJJZCA9ICRsb2NhbFN0b3JhZ2UudXNlci5pZDtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllck5hbWUgPSAkbG9jYWxTdG9yYWdlLnVzZXIubmFtZTtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllclJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9L3BsYXllcnMvJHtwbGF5ZXJJZH1gKVxuICAgICAgICAgICAgcGxheWVyUmVmLnNldCh7XG4gICAgICAgICAgICAgICAgbmFtZTogcGxheWVyTmFtZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICBnYW1lUmVmLm9uKCd2YWx1ZScsIHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2NoYW5nZWRHYW1lJywgc25hcHNob3QudmFsKCkpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gR2FtZUZhY3RvcnkuY3JlYXRlR2FtZUJ5SWRGaXJlQmFzZSA9IChmaXJlYmFzZWdhbWVJZCkgPT4ge1xuICAgICAgICAvLyAgICAgLy9yZXR1cm4gJGh0dHAucG9zdChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9maXJlYmFzZS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAvLyAgICAgLy9uZWVkcyB0byBiZSAudGhlbmFibGVcbiAgICAgICAgLy8gICAgIGNvbnN0IG5ld1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBnYW1lcy8ke2ZpcmViYXNlZ2FtZUlkfWApLnB1c2goKTtcbiAgICAgICAgLy8gICAgIG5ld1JlZi5zZXQoe1xuICAgICAgICAvLyAgICAgICAgIHBsYXllcklkOiByZXEucXVlcnkucGxheWVySWRcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCA9IChpZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gKHR5cGVvZiBpZCAhPT0gJ251bWJlcicpID8gJGxvY2FsU3RvcmFnZS50ZWFtLmlkIDogaWQ7IC8vIGlkIHx8IGxvY2Fsc3RvcmFnZSBkb2Vzbid0IHdvcmsgYmVjYXVzZSAwIGlzIGZhbHNleVxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9kZWNrcz90ZWFtPSR7dGVhbUlkfWApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuXG4gICAgICAgIH07XG5cblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRVc2Vyc0J5R2FtZUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0vdXNlcnNgKTtcbiAgICAgICAgfTtcblxuXG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZUJ5R2FtZUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc3QgZGVmZXIgPSAkcS5kZWZlcigpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZ2FtZUlkKTtcbiAgICAgICAgICAgIGNvbnN0IHRlYW1JZCA9IDE7XG4gICAgICAgICAgICBjb25zdCBnYW1lc1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICAgIHJldHVybiBnYW1lc1JlZi5vbmNlKCd2YWx1ZScpLnRoZW4oc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdGQUNUT1JZVEVTVCcsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgIHJldHVybiBzbmFwc2hvdC52YWwoKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIC8vIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEtlZXAgdGhpcyBjb21tZW50ZWQgb3V0IG9yIHRoZSBob21lIHN0YXRlIHdpbGwgYnJlYWshIVxuICAgICAgICAvLyBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VGVhbUlkID0gKHRlYW1JZCkgPT4ge1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ3RoZSB0ZWFtIGlzIGlkJywgdGVhbUlkKVxuICAgICAgICAvLyAgICAgdGVhbUlkID0gdGVhbUlkIHx8ICRsb2NhbFN0b3JhZ2UudGVhbS5pZFxuXG4gICAgICAgIC8vICAgICBjb25zdCBnYW1lc1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXNgKVxuICAgICAgICAvLyAgICAgcmV0dXJuIGdhbWVzUmVmLm9uY2UoJ3ZhbHVlJykudGhlbihzbmFwc2hvdCA9PiB7IC8vbWlnaHQgYnJlYWsgYWZ0ZXIgeW91IGRvIGl0IG9uY2VcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZygndGhlIHZhbCBpcycsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAvLyAgICAgICAgIHJldHVybiBzbmFwc2hvdC52YWwoKTtcbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vIH07XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCA9ICh0ZWFtSWQpID0+IHtcbiAgICAgICAgICAgIHRlYW1JZCA9IHRlYW1JZCB8fCAkbG9jYWxTdG9yYWdlLnRlYW0uaWRcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGUgdGVhbSBpcyBpZCcsIHRlYW1JZClcbiAgICAgICAgICAgIGNvbnN0IGRlZmVyID0gJHEuZGVmZXIoKTtcblxuICAgICAgICAgICAgY29uc3QgZ2FtZXNSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzYClcbiAgICAgICAgICAgIGdhbWVzUmVmLm9uKCd2YWx1ZScsIHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGhlIHZhbCBpcycsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUoc25hcHNob3QudmFsKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRlZmVyIHByb21pc2VcIiwgZGVmZXIucHJvbWlzZSlcbiAgICAgICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlVc2VyID0gKHVzZXJJZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnaHR0cDovL2xvY2FsU3RvcmFnZToxMzM3L2FwaS9nYW1lcy8/dXNlcklkPScgKyB1c2VySWQpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4gR2FtZUZhY3Rvcnk7XG4gICAgfVxuXG4pO1xuXG4iLCJhcHAuZmFjdG9yeSgnTG9naW5GYWN0b3J5JywgZnVuY3Rpb24oJGh0dHApe1xuXHRyZXR1cm4ge1xuXHRcdGdldFNsYWNrQ3JlZHM6IGZ1bmN0aW9uKCl7XG5cdFx0XHRyZXR1cm4gJGh0dHAuZ2V0KCdodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL3NsYWNrJylcdFxuXHRcdFx0XHQudGhlbihyZXMgPT4ge1xuXHRcdFx0XHRcdHJldHVybiByZXMuZGF0YVxuXHRcdFx0XHR9KVxuXHRcdH1cblx0fVxufSlcbiIsImFwcC5mYWN0b3J5KCdVc2VyRmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCwgJHN0YXRlKXtcblx0XG5cdHJldHVybiB7XG5cdFx0c2V0VXNlcjogZnVuY3Rpb24oaW5mbyl7XG5cdFx0XHRyZXR1cm4gJGh0dHAoe1xuXHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdFx0dXJsOiAnaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS91c2VycycsXG5cdFx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRhdGE6IGluZm9cblx0XHRcdH0pXG5cdFx0XHQudGhlbihyZXMgPT4ge1xuXHRcdFx0XHR0aGlzLnNldExvY2FsU3RvcmFnZShyZXMuZGF0YS51c2VyWzBdLCByZXMuZGF0YS50ZWFtWzBdKTtcblx0XHRcdH0pXG5cdFx0fSxcblxuXHRcdGdldFNsYWNrSW5mbzogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiAkaHR0cC5nZXQoJ2h0dHBzOi8vc2xhY2suY29tL2FwaS91c2Vycy5pZGVudGl0eScpXG5cdFx0fSxcblxuXHRcdHNldExvY2FsU3RvcmFnZTogZnVuY3Rpb24odXNlciwgdGVhbSl7XG5cdFx0XHQkbG9jYWxTdG9yYWdlLnVzZXIgPSB1c2VyO1xuXHRcdFx0JGxvY2FsU3RvcmFnZS50ZWFtID0gdGVhbTtcblx0XHR9LFxuXG5cdFx0bG9nT3V0OiBmdW5jdGlvbigpe1xuXHRcdFx0JGxvY2FsU3RvcmFnZS4kcmVzZXQoKTtcblx0XHR9XG5cdH1cbn0pIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
