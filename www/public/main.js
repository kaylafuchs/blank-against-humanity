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
    }).state('game.pre-game', {
        url: '/:gameId/pre-game',
        templateUrl: 'js/game/pre-game.html',
        controller: 'PreGameCtrl',
        resolve: {
            game: function game(GameFactory, $stateParams) {
                return GameFactory.getGameByGameId($stateParams.gameId);
            }
        }
    });
});

app.controller('GameCtrl', function ($scope, GameFactory) {});

app.controller("PreGameCtrl", function ($scope, GameFactory, game) {

    // $scope.$on('changedGame', (event,snapshot) => {
    //     console.log(snapshot);
    //     $scope.name = snapshot.name;
    //     $scope.$digest();
    // })

    console.log(game);
    $scope.game = game;
    $scope.name = game.settings.name;
    $scope.playerCount = Object.keys(game.players).length;
    $scope.waitingForPlayers = game.settings.minPlayers - $scope.playerCount;
    $scope.whiteCards = game.pile.whitecards;
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

app.controller('HomeCtrl', function ($scope, $state, $cordovaOauth, UserFactory, GameFactory, $localStorage, games) {
    $scope.storage = $localStorage;
    $scope.games = games;
    console.log("games", JSON.stringify($scope.games));
    $scope.goToNewGame = function () {
        $state.go('new-game.main');
    };

    // // get games from postgres
    // GameFactory.getGamesByUser()
    // .then(games => {
    //     console.log("games found:", games)
    //     $scope.games = games;
    // })

    //get games from firebase
    // GameFactory.getGamesByTeamId($scope.storage.team.id)
    // .then(games => {
    //     console.log("the games are:", games)
    //     $scope.games = games;
    // })

    //$scope.startNewGame = GameFactory.startNewGame;
    // $scope.createNewGame = () => {
    //     GameFactory.startNewGame()
    //     .then(() => {
    //         console.log('going to new state')
    //         $state.go('new-game.main')
    //     })
    // }

    $scope.$on('changedGame', function (event, data) {
        console.log('received event in home');
        console.log('data obj:', data);
        //$scope.game = data;
        // $scope.$digest()
    });
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

app.config(function ($stateProvider) {
    $stateProvider.state('team-games', {
        url: '/team-games',
        templateUrl: 'js/team-games/team-games.html',
        controller: 'TeamGamesCtrl'
    });
});

app.controller('TeamGamesCtrl', function ($scope, GameFactory, $ionicPopup, $timeout, $state) {

    GameFactory.getGamesByTeamId('1').then(function (games) {
        $scope.games = games;
        $scope.$digest();
    });

    $scope.$on('changedGame', function (event, snapshot) {
        $scope.name = snapshot.name;
        $scope.$digest();
    });

    $scope.joinGame = GameFactory.joinGameById;

    $scope.showPopup = function (gameId) {

        var myPopup = $ionicPopup.show({
            template: '<p>Information</p>',
            title: 'Game Information',
            scope: $scope,
            buttons: [{ text: 'Cancel' }, {
                text: '<b>Join</b>',
                type: 'button-positive',
                onTap: function onTap(e) {
                    console.log(gameId);
                    $scope.joinGame(gameId);
                    $state.go('game.pre-game', { gameId: gameId });
                }
            }]
        });
    };
});

//Directive File
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
        var teamId = 1;
        var playerId = 4;
        var playerName = 'cat';
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
            console.log('TEST3', snapshot.val());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImNhcmRzLXRlc3QvY2FyZHNUZXN0LmpzIiwiZGVja3MvZGVja3MuanMiLCJmcm9tIGZzZy9mcm9tLWZzZy5qcyIsImdhbWUvZ2FtZS5qcyIsImhvbWUvaG9tZS5qcyIsImxvZ2luL2xvZ2luLmpzIiwibmV3LWdhbWUvbmV3LWdhbWUuanMiLCJ0ZWFtLWdhbWVzL3RlYW0tZ2FtZXMuanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiLCJjb21tb24vZmFjdG9yaWVzL0dhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9sb2dpbkZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yaWVzL3VzZXJGYWN0b3J5LmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImFwcCIsImFuZ3VsYXIiLCJtb2R1bGUiLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZUxpZ2h0Q29udGVudCIsImNvbnRyb2xsZXIiLCIkc2NvcGUiLCJVc2VyRmFjdG9yeSIsIiRzdGF0ZSIsIiRsb2NhbFN0b3JhZ2UiLCIkdGltZW91dCIsImxvZ091dCIsImdvIiwiY29uZmlnIiwiJHN0YXRlUHJvdmlkZXIiLCJzdGF0ZSIsInVybCIsInRlbXBsYXRlVXJsIiwiZ3JlZXRpbmciLCJyZXNvbHZlIiwiZGVja3MiLCJHYW1lRmFjdG9yeSIsIiRzdGF0ZVBhcmFtcyIsImdldERlY2tzQnlUZWFtSWQiLCJzdGF0ZVBhcmFtcyIsInRlYW1JZCIsImFic3RyYWN0IiwiZ2FtZSIsImdldEdhbWVCeUdhbWVJZCIsImdhbWVJZCIsImNvbnNvbGUiLCJsb2ciLCJuYW1lIiwic2V0dGluZ3MiLCJwbGF5ZXJDb3VudCIsIk9iamVjdCIsImtleXMiLCJwbGF5ZXJzIiwibGVuZ3RoIiwid2FpdGluZ0ZvclBsYXllcnMiLCJtaW5QbGF5ZXJzIiwid2hpdGVDYXJkcyIsInBpbGUiLCJ3aGl0ZWNhcmRzIiwiJHVybFJvdXRlclByb3ZpZGVyIiwiZ2FtZXMiLCJnZXRHYW1lc0J5VGVhbUlkIiwiJGNvcmRvdmFPYXV0aCIsInN0b3JhZ2UiLCJKU09OIiwic3RyaW5naWZ5IiwiZ29Ub05ld0dhbWUiLCIkb24iLCJldmVudCIsImRhdGEiLCJvdGhlcndpc2UiLCJMb2dpbkZhY3RvcnkiLCIkaW9uaWNTaWRlTWVudURlbGVnYXRlIiwibG9naW5XaXRoU2xhY2siLCJnZXRTbGFja0NyZWRzIiwidGhlbiIsInNsYWNrIiwiY3JlZHMiLCJjbGllbnRJRCIsImNsaWVudFNlY3JldCIsInNldFVzZXIiLCJpbmZvIiwiY2FuRHJhZ0NvbnRlbnQiLCJyZWRpcmVjdFVzZXIiLCJ1c2VyIiwidGVhbURlY2tzIiwic3RhbmRhcmREZWNrIiwiY2FyZHMiLCJnZXRDYXJkc0J5RGVja0lkIiwiZGVja0lkIiwiY3VycmVudFZpZXciLCJnYW1lQ29uZmlnIiwiZ29Ub0RlY2tzIiwibG9jYXRpb24iLCJyZWxvYWQiLCJjb25jYXQiLCJzdGFydE5ld0dhbWUiLCJpZCIsImFkZERlY2tzVG9HYW1lIiwiYWRkRGVja3MiLCIkaW9uaWNQb3B1cCIsIiRkaWdlc3QiLCJzbmFwc2hvdCIsImpvaW5HYW1lIiwiam9pbkdhbWVCeUlkIiwic2hvd1BvcHVwIiwibXlQb3B1cCIsInNob3ciLCJ0ZW1wbGF0ZSIsInRpdGxlIiwic2NvcGUiLCJidXR0b25zIiwidGV4dCIsInR5cGUiLCJvblRhcCIsImZhY3RvcnkiLCIkaHR0cCIsIiRyb290U2NvcGUiLCIkcSIsImluaXRpYWxpemVGaXJlYmFzZSIsImFwaUtleSIsImF1dGhEb21haW4iLCJkYXRhYmFzZVVSTCIsInN0b3JhZ2VCdWNrZXQiLCJtZXNzYWdpbmdTZW5kZXJJZCIsImZpcmViYXNlIiwiaW5pdGlhbGl6ZUFwcCIsInRlYW0iLCJjcmVhdG9ySWQiLCJwb3N0IiwiY3JlYXRvck5hbWUiLCJyZXMiLCJnYW1lUmVmIiwiZGF0YWJhc2UiLCJyZWYiLCJvbiIsInZhbCIsIiRicm9hZGNhc3QiLCJnZXQiLCJwbGF5ZXJJZCIsInBsYXllck5hbWUiLCJwbGF5ZXJSZWYiLCJzZXQiLCJnZXRVc2Vyc0J5R2FtZUlkIiwiZ2FtZXNSZWYiLCJvbmNlIiwiZGVmZXIiLCJwcm9taXNlIiwiZ2V0R2FtZXNCeVVzZXIiLCJ1c2VySWQiLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0TG9jYWxTdG9yYWdlIiwiZ2V0U2xhY2tJbmZvIiwiJHJlc2V0Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBQSxPQUFBQyxHQUFBLEdBQUFDLFFBQUFDLE1BQUEsQ0FBQSxzQkFBQSxFQUFBLENBQUEsT0FBQSxFQUFBLFdBQUEsRUFBQSxXQUFBLEVBQUEsZ0JBQUEsRUFBQSxXQUFBLEVBQUEsY0FBQSxDQUFBLENBQUE7O0FBRUFGLElBQUFHLEdBQUEsQ0FBQSxVQUFBQyxjQUFBLEVBQUE7QUFDQUEsbUJBQUFDLEtBQUEsQ0FBQSxZQUFBO0FBQ0EsWUFBQU4sT0FBQU8sT0FBQSxJQUFBUCxPQUFBTyxPQUFBLENBQUFDLE9BQUEsQ0FBQUMsUUFBQSxFQUFBO0FBQ0E7QUFDQTtBQUNBRixvQkFBQUMsT0FBQSxDQUFBQyxRQUFBLENBQUFDLHdCQUFBLENBQUEsSUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQUgsb0JBQUFDLE9BQUEsQ0FBQUMsUUFBQSxDQUFBRSxhQUFBLENBQUEsSUFBQTtBQUNBO0FBQ0EsWUFBQVgsT0FBQVksU0FBQSxFQUFBO0FBQ0FBLHNCQUFBQyxpQkFBQTtBQUNBO0FBQ0EsS0FkQTtBQWdCQSxDQWpCQTs7QUNQQVosSUFBQWEsVUFBQSxDQUFBLFlBQUEsRUFBQSxVQUFBQyxNQUFBLEVBQUFDLFdBQUEsRUFBQUMsTUFBQSxFQUFBQyxhQUFBLEVBQUFDLFFBQUEsRUFBQTtBQUNBSixXQUFBSyxNQUFBLEdBQUEsWUFBQTtBQUNBSixvQkFBQUksTUFBQTtBQUNBSCxlQUFBSSxFQUFBLENB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QTs7QUFFQSxXQUFBO0FBQ0F5RCxpQkFBQSxpQkFBQUMsSUFBQSxFQUFBO0FBQUE7O0FBQ0EsbUJBQUFtQyxNQUFBO0FBQ0FrQyx3QkFBQSxNQURBO0FBRUF2SCxxQkFBQSxpQ0FGQTtBQUdBd0gseUJBQUE7QUFDQSxvQ0FBQTtBQURBLGlCQUhBO0FBTUFsRixzQkFBQVk7QUFOQSxhQUFBLEVBUUFOLElBUkEsQ0FRQSxlQUFBO0FBQ0Esc0JBQUE2RSxlQUFBLENBQUFyQixJQUFBOUQsSUFBQSxDQUFBZSxJQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUErQyxJQUFBOUQsSUFBQSxDQUFBMEQsSUFBQSxDQUFBLENBQUEsQ0FBQTtBQUNBLGFBVkEsQ0FBQTtBQVdBLFNBYkE7O0FBZUEwQixzQkFBQSx3QkFBQTtBQUNBLG1CQUFBckMsTUFBQXNCLEdBQUEsQ0FBQSxzQ0FBQSxDQUFBO0FBQ0EsU0FqQkE7O0FBbUJBYyx5QkFBQSx5QkFBQXBFLElBQUEsRUFBQTJDLElBQUEsRUFBQTtBQUNBdkcsMEJBQUE0RCxJQUFBLEdBQUFBLElBQUE7QUFDQTVELDBCQUFBdUcsSUFBQSxHQUFBQSxJQUFBO0FBQ0EsU0F0QkE7O0FBd0JBckcsZ0JBQUEsa0JBQUE7QUFDQUYsMEJBQUFrSSxNQUFBO0FBQ0E7QUExQkEsS0FBQTtBQTRCQSxDQTlCQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW9uaWMgU3RhcnRlciBBcHBcblxuLy8gYW5ndWxhci5tb2R1bGUgaXMgYSBnbG9iYWwgcGxhY2UgZm9yIGNyZWF0aW5nLCByZWdpc3RlcmluZyBhbmQgcmV0cmlldmluZyBBbmd1bGFyIG1vZHVsZXNcbi8vICdzdGFydGVyJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xud2luZG93LmFwcCA9IGFuZ3VsYXIubW9kdWxlKCdCbGFua0FnYWluc3RIdW1hbml0eScsIFsnaW9uaWMnLCAndWkucm91dGVyJywnbmdDb3Jkb3ZhJywnbmdDb3Jkb3ZhT2F1dGgnLCAnbmdTdG9yYWdlJywgJ3VpLmJvb3RzdHJhcCddKVxuXG5hcHAucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtKSB7XG4gICAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICAgICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAgICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuXG4gICAgICAgICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcbiAgICAgICAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxuICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgICAgICAgIFN0YXR1c0Jhci5zdHlsZUxpZ2h0Q29udGVudCgpXG4gICAgICAgIH1cbiAgICB9KTtcblxufSlcbiIsImFwcC5jb250cm9sbGVyKCdMb2dvdXRDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBVc2VyRmFjdG9yeSwgJHN0YXRlLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCl7XG5cdCRzY29wZS5sb2dPdXQgPSBmdW5jdGlvbigpe1xuXHRcdFVzZXJGYWN0b3J5LmxvZ091dCgpXG5cdFx0JHN0YXRlLmdvKCdsb2dpbicpXG5cdH1cbn0pIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcil7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdjYXJkcycsIHtcblx0XHR1cmw6ICcvY2FyZHMnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvY2FyZHMtdGVzdC9jYXJkcy10ZXN0Lmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdDYXJkc1Rlc3RDdHJsJ1xuXHR9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0NhcmRzVGVzdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpe1xuIFx0JHNjb3BlLmdyZWV0aW5nID0gXCJISVwiXG59KSIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdkZWNrcycsIHtcblx0XHR1cmw6ICdkZWNrcy86dGVhbWlkJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2RlY2tzL2RlY2tzLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdEZWNrQ3RybCcsXG5cdFx0cmVzb2x2ZToge1xuXHRcdFx0ZGVja3M6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkKHN0YXRlUGFyYW1zLnRlYW1JZClcblx0XHR9XG5cdH0pXG5cbn0pXG5cbmFwcC5jb250cm9sbGVyKCdEZWNrQ3RybCcsICgkc2NvcGUpID0+IHtcblxuXG5cdFxufSkiLCIvLyAoZnVuY3Rpb24gKCkge1xuXG4vLyAgICAgJ3VzZSBzdHJpY3QnO1xuXG4vLyAgICAgLy8gSG9wZSB5b3UgZGlkbid0IGZvcmdldCBBbmd1bGFyISBEdWgtZG95LlxuLy8gICAgIGlmICghd2luZG93LmFuZ3VsYXIpIHRocm93IG5ldyBFcnJvcignSSBjYW5cXCd0IGZpbmQgQW5ndWxhciEnKTtcblxuLy8gICAgIHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnZnNhUHJlQnVpbHQnLCBbXSk7XG5cbi8vICAgICBhcHAuZmFjdG9yeSgnU29ja2V0JywgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICBpZiAoIXdpbmRvdy5pbykgdGhyb3cgbmV3IEVycm9yKCdzb2NrZXQuaW8gbm90IGZvdW5kIScpO1xuLy8gICAgICAgICByZXR1cm4gd2luZG93LmlvKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pO1xuLy8gICAgIH0pO1xuXG4vLyAgICAgLy8gQVVUSF9FVkVOVFMgaXMgdXNlZCB0aHJvdWdob3V0IG91ciBhcHAgdG9cbi8vICAgICAvLyBicm9hZGNhc3QgYW5kIGxpc3RlbiBmcm9tIGFuZCB0byB0aGUgJHJvb3RTY29wZVxuLy8gICAgIC8vIGZvciBpbXBvcnRhbnQgZXZlbnRzIGFib3V0IGF1dGhlbnRpY2F0aW9uIGZsb3cuXG4vLyAgICAgYXBwLmNvbnN0YW50KCdBVVRIX0VWRU5UUycsIHtcbi8vICAgICAgICAgbG9naW5TdWNjZXNzOiAnYXV0aC1sb2dpbi1zdWNjZXNzJyxcbi8vICAgICAgICAgbG9naW5GYWlsZWQ6ICdhdXRoLWxvZ2luLWZhaWxlZCcsXG4vLyAgICAgICAgIGxvZ291dFN1Y2Nlc3M6ICdhdXRoLWxvZ291dC1zdWNjZXNzJyxcbi8vICAgICAgICAgc2Vzc2lvblRpbWVvdXQ6ICdhdXRoLXNlc3Npb24tdGltZW91dCcsXG4vLyAgICAgICAgIG5vdEF1dGhlbnRpY2F0ZWQ6ICdhdXRoLW5vdC1hdXRoZW50aWNhdGVkJyxcbi8vICAgICAgICAgbm90QXV0aG9yaXplZDogJ2F1dGgtbm90LWF1dGhvcml6ZWQnXG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuZmFjdG9yeSgnQXV0aEludGVyY2VwdG9yJywgZnVuY3Rpb24gKCRyb290U2NvcGUsICRxLCBBVVRIX0VWRU5UUykge1xuLy8gICAgICAgICB2YXIgc3RhdHVzRGljdCA9IHtcbi8vICAgICAgICAgICAgIDQwMTogQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCxcbi8vICAgICAgICAgICAgIDQwMzogQVVUSF9FVkVOVFMubm90QXV0aG9yaXplZCxcbi8vICAgICAgICAgICAgIDQxOTogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsXG4vLyAgICAgICAgICAgICA0NDA6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0XG4vLyAgICAgICAgIH07XG4vLyAgICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgICAgICByZXNwb25zZUVycm9yOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3Qoc3RhdHVzRGljdFtyZXNwb25zZS5zdGF0dXNdLCByZXNwb25zZSk7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXNwb25zZSlcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfTtcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5jb25maWcoZnVuY3Rpb24gKCRodHRwUHJvdmlkZXIpIHtcbi8vICAgICAgICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaChbXG4vLyAgICAgICAgICAgICAnJGluamVjdG9yJyxcbi8vICAgICAgICAgICAgIGZ1bmN0aW9uICgkaW5qZWN0b3IpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJGluamVjdG9yLmdldCgnQXV0aEludGVyY2VwdG9yJyk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIF0pO1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLnNlcnZpY2UoJ0F1dGhTZXJ2aWNlJywgZnVuY3Rpb24gKCRodHRwLCBTZXNzaW9uLCAkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUywgJHEpIHtcblxuLy8gICAgICAgICBmdW5jdGlvbiBvblN1Y2Nlc3NmdWxMb2dpbihyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgdmFyIHVzZXIgPSByZXNwb25zZS5kYXRhLnVzZXI7XG4vLyAgICAgICAgICAgICBTZXNzaW9uLmNyZWF0ZSh1c2VyKTtcbi8vICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dpblN1Y2Nlc3MpO1xuLy8gICAgICAgICAgICAgcmV0dXJuIHVzZXI7XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICAvLyBVc2VzIHRoZSBzZXNzaW9uIGZhY3RvcnkgdG8gc2VlIGlmIGFuXG4vLyAgICAgICAgIC8vIGF1dGhlbnRpY2F0ZWQgdXNlciBpcyBjdXJyZW50bHkgcmVnaXN0ZXJlZC5cbi8vICAgICAgICAgdGhpcy5pc0F1dGhlbnRpY2F0ZWQgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gISFTZXNzaW9uLnVzZXI7XG4vLyAgICAgICAgIH07XG5cbiAgICAgICAgXG4vLyAgICAgICAgIHRoaXMuaXNBZG1pbiA9IGZ1bmN0aW9uKHVzZXJJZCl7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZygncnVubmluZyBhZG1pbiBmdW5jJylcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJylcbi8vICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEudXNlci5pc0FkbWluKVxuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgdGhpcy5nZXRMb2dnZWRJblVzZXIgPSBmdW5jdGlvbiAoZnJvbVNlcnZlcikge1xuXG4vLyAgICAgICAgICAgICAvLyBJZiBhbiBhdXRoZW50aWNhdGVkIHNlc3Npb24gZXhpc3RzLCB3ZVxuLy8gICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSB1c2VyIGF0dGFjaGVkIHRvIHRoYXQgc2Vzc2lvblxuLy8gICAgICAgICAgICAgLy8gd2l0aCBhIHByb21pc2UuIFRoaXMgZW5zdXJlcyB0aGF0IHdlIGNhblxuLy8gICAgICAgICAgICAgLy8gYWx3YXlzIGludGVyZmFjZSB3aXRoIHRoaXMgbWV0aG9kIGFzeW5jaHJvbm91c2x5LlxuXG4vLyAgICAgICAgICAgICAvLyBPcHRpb25hbGx5LCBpZiB0cnVlIGlzIGdpdmVuIGFzIHRoZSBmcm9tU2VydmVyIHBhcmFtZXRlcixcbi8vICAgICAgICAgICAgIC8vIHRoZW4gdGhpcyBjYWNoZWQgdmFsdWUgd2lsbCBub3QgYmUgdXNlZC5cblxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuaXNBdXRoZW50aWNhdGVkKCkgJiYgZnJvbVNlcnZlciAhPT0gdHJ1ZSkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKFNlc3Npb24udXNlcik7XG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIC8vIE1ha2UgcmVxdWVzdCBHRVQgL3Nlc3Npb24uXG4vLyAgICAgICAgICAgICAvLyBJZiBpdCByZXR1cm5zIGEgdXNlciwgY2FsbCBvblN1Y2Nlc3NmdWxMb2dpbiB3aXRoIHRoZSByZXNwb25zZS5cbi8vICAgICAgICAgICAgIC8vIElmIGl0IHJldHVybnMgYSA0MDEgcmVzcG9uc2UsIHdlIGNhdGNoIGl0IGFuZCBpbnN0ZWFkIHJlc29sdmUgdG8gbnVsbC5cbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJykudGhlbihvblN1Y2Nlc3NmdWxMb2dpbikuY2F0Y2goZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuLy8gICAgICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmxvZ2luID0gZnVuY3Rpb24gKGNyZWRlbnRpYWxzKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2xvZ2luJywgY3JlZGVudGlhbHMpXG4vLyAgICAgICAgICAgICAgICAgLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pXG4vLyAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCh7IG1lc3NhZ2U6ICdJbnZhbGlkIGxvZ2luIGNyZWRlbnRpYWxzLid9KTtcbi8vICAgICAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLnNpZ251cCA9IGZ1bmN0aW9uKGNyZWRlbnRpYWxzKXtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4vLyAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4vLyAgICAgICAgICAgICAgICAgdXJsOiAnL3NpZ251cCcsXG4vLyAgICAgICAgICAgICAgICAgZGF0YTogY3JlZGVudGlhbHNcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4gcmVzdWx0LmRhdGEpXG4vLyAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oKXtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHttZXNzYWdlOiAnVGhhdCBlbWFpbCBpcyBhbHJlYWR5IGJlaW5nIHVzZWQuJ30pO1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmxvZ291dCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9sb2dvdXQnKS50aGVuKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICBTZXNzaW9uLmRlc3Ryb3koKTtcbi8vICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoQVVUSF9FVkVOVFMubG9nb3V0U3VjY2Vzcyk7XG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfTtcblxuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLnNlcnZpY2UoJ1Nlc3Npb24nLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMpIHtcblxuLy8gICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbi8vICAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCwgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgc2VsZi5kZXN0cm95KCk7XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgICRyb290U2NvcGUuJG9uKEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0LCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICBzZWxmLmRlc3Ryb3koKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcblxuLy8gICAgICAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uICh1c2VyKSB7XG4vLyAgICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICB9KTtcblxuLy8gfSgpKTtcbiIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnL2dhbWUnLFxuICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL2dhbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdHYW1lQ3RybCcsXG4gICAgfSlcbiAgICAuc3RhdGUoJ2dhbWUucHJlLWdhbWUnLCB7XG4gICAgICAgIHVybDogJy86Z2FtZUlkL3ByZS1nYW1lJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL3ByZS1nYW1lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnUHJlR2FtZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBnYW1lIDogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldEdhbWVCeUdhbWVJZCgkc3RhdGVQYXJhbXMuZ2FtZUlkKVxuICAgICAgICB9XG4gICAgfSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdHYW1lQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5KSA9PiB7XG4gICBcbn0pXG5cbmFwcC5jb250cm9sbGVyKFwiUHJlR2FtZUN0cmxcIiwgKCRzY29wZSwgR2FtZUZhY3RvcnksIGdhbWUpID0+IHtcblxuICAgIC8vICRzY29wZS4kb24oJ2NoYW5nZWRHYW1lJywgKGV2ZW50LHNuYXBzaG90KSA9PiB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKHNuYXBzaG90KTtcbiAgICAvLyAgICAgJHNjb3BlLm5hbWUgPSBzbmFwc2hvdC5uYW1lO1xuICAgIC8vICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgIC8vIH0pXG5cbiAgICBjb25zb2xlLmxvZyhnYW1lKTtcbiAgICAkc2NvcGUuZ2FtZSA9IGdhbWU7XG4gICAgJHNjb3BlLm5hbWUgPSBnYW1lLnNldHRpbmdzLm5hbWU7XG4gICAgJHNjb3BlLnBsYXllckNvdW50ID0gT2JqZWN0LmtleXMoZ2FtZS5wbGF5ZXJzKS5sZW5ndGg7XG4gICAgJHNjb3BlLndhaXRpbmdGb3JQbGF5ZXJzID0gIGdhbWUuc2V0dGluZ3MubWluUGxheWVycyAtICRzY29wZS5wbGF5ZXJDb3VudDtcbiAgICAkc2NvcGUud2hpdGVDYXJkcyA9IGdhbWUucGlsZS53aGl0ZWNhcmRzO1xuICAgXG4gICAgXG59KVxuXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgdXJsOiAnLycsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvaG9tZS9ob21lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnSG9tZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBnYW1lczogZnVuY3Rpb24oR2FtZUZhY3RvcnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUsICRjb3Jkb3ZhT2F1dGgsIFVzZXJGYWN0b3J5LCBHYW1lRmFjdG9yeSwgJGxvY2FsU3RvcmFnZSwgZ2FtZXMpIHtcbiAgICAkc2NvcGUuc3RvcmFnZSA9ICRsb2NhbFN0b3JhZ2U7XG4gICAgJHNjb3BlLmdhbWVzID0gZ2FtZXM7XG4gICAgY29uc29sZS5sb2coXCJnYW1lc1wiLCBKU09OLnN0cmluZ2lmeSgkc2NvcGUuZ2FtZXMpKVxuICAgICRzY29wZS5nb1RvTmV3R2FtZSA9ICgpID0+IHtcbiAgICAgICAgJHN0YXRlLmdvKCduZXctZ2FtZS5tYWluJylcbiAgICB9XG5cblxuICAgIC8vIC8vIGdldCBnYW1lcyBmcm9tIHBvc3RncmVzXG4gICAgLy8gR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVVzZXIoKVxuICAgIC8vIC50aGVuKGdhbWVzID0+IHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coXCJnYW1lcyBmb3VuZDpcIiwgZ2FtZXMpXG4gICAgLy8gICAgICRzY29wZS5nYW1lcyA9IGdhbWVzO1xuICAgIC8vIH0pXG5cbiAgICAvL2dldCBnYW1lcyBmcm9tIGZpcmViYXNlXG4gICAgLy8gR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCgkc2NvcGUuc3RvcmFnZS50ZWFtLmlkKVxuICAgIC8vIC50aGVuKGdhbWVzID0+IHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coXCJ0aGUgZ2FtZXMgYXJlOlwiLCBnYW1lcylcbiAgICAvLyAgICAgJHNjb3BlLmdhbWVzID0gZ2FtZXM7XG4gICAgLy8gfSlcblxuICAgIC8vJHNjb3BlLnN0YXJ0TmV3R2FtZSA9IEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZTtcbiAgICAvLyAkc2NvcGUuY3JlYXRlTmV3R2FtZSA9ICgpID0+IHtcbiAgICAvLyAgICAgR2FtZUZhY3Rvcnkuc3RhcnROZXdHYW1lKClcbiAgICAvLyAgICAgLnRoZW4oKCkgPT4ge1xuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coJ2dvaW5nIHRvIG5ldyBzdGF0ZScpXG4gICAgLy8gICAgICAgICAkc3RhdGUuZ28oJ25ldy1nYW1lLm1haW4nKVxuICAgIC8vICAgICB9KVxuICAgIC8vIH1cblxuICAgICRzY29wZS4kb24oJ2NoYW5nZWRHYW1lJywgKGV2ZW50LCBkYXRhKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZWNlaXZlZCBldmVudCBpbiBob21lJylcbiAgICAgICAgY29uc29sZS5sb2coJ2RhdGEgb2JqOicsIGRhdGEpXG4gICAgICAgICAgICAvLyRzY29wZS5nYW1lID0gZGF0YTtcbiAgICAgICAgICAgIC8vICRzY29wZS4kZGlnZXN0KClcblxuICAgIH0pXG59KVxuXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpe1xuXHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnbG9naW4nLCB7XG5cdFx0dXJsOiAnL2xvZ2luJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2xvZ2luL2xvZ2luLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdMb2dpbkN0cmwnXG5cdH0pXG5cdCR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9sb2dpbicpO1xufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCBMb2dpbkZhY3RvcnksIFVzZXJGYWN0b3J5LCAkY29yZG92YU9hdXRoLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCwgJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZSl7XG4gXHQkc2NvcGUubG9naW5XaXRoU2xhY2sgPSBmdW5jdGlvbigpe1xuIFx0XHRyZXR1cm4gTG9naW5GYWN0b3J5LmdldFNsYWNrQ3JlZHMoKVxuIFx0XHQudGhlbihjcmVkcyA9PntcbiBcdFx0XHRyZXR1cm4gJGNvcmRvdmFPYXV0aC5zbGFjayhjcmVkcy5jbGllbnRJRCwgY3JlZHMuY2xpZW50U2VjcmV0LCBbJ2lkZW50aXR5LmJhc2ljJywgJ2lkZW50aXR5LnRlYW0nLCAnaWRlbnRpdHkuYXZhdGFyJ10pXG4gXHRcdH0pXG4gXHRcdC50aGVuKGluZm8gPT4gVXNlckZhY3Rvcnkuc2V0VXNlcihpbmZvKSlcbiBcdFx0LnRoZW4oKCkgPT4gJHN0YXRlLmdvKCdob21lJykpXG4gXHR9XG5cbiBcdCRpb25pY1NpZGVNZW51RGVsZWdhdGUuY2FuRHJhZ0NvbnRlbnQoZmFsc2UpO1xuXG4gXHQkc2NvcGUuJG9uKCckaW9uaWNWaWV3LmxlYXZlJywgZnVuY3Rpb24gKCkgeyAkaW9uaWNTaWRlTWVudURlbGVnYXRlLmNhbkRyYWdDb250ZW50KHRydWUpIH0pO1xuXG4gXHQkc2NvcGUuc3RvcmFnZSA9ICRsb2NhbFN0b3JhZ2VcblxuIFx0ZnVuY3Rpb24gcmVkaXJlY3RVc2VyKCl7XG4gXHRcdGNvbnNvbGUubG9nKFwic2NvcGUgc3RvcmFnZSB1c2VyXCIsICRzY29wZS5zdG9yYWdlLnVzZXIpXG4gXHRcdGlmICgkc2NvcGUuc3RvcmFnZS51c2VyKSAkc3RhdGUuZ28oJ2hvbWUnKVxuIFx0fVxuXG5cdHJlZGlyZWN0VXNlcigpO1xufSkiLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSA9PiB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbmV3LWdhbWUnLCB7XG4gICAgICAgIHVybDogJy9uZXctZ2FtZScsXG4gICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL21haW4uaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdOZXdHYW1lQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIHRlYW1EZWNrczogKEdhbWVGYWN0b3J5KSA9PiBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkKCksXG4gICAgICAgICAgICBzdGFuZGFyZERlY2s6IChHYW1lRmFjdG9yeSkgPT4gR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCgwKVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIC5zdGF0ZSgnbmV3LWdhbWUubWFpbicsIHtcbiAgICAgICAgdXJsOiAnL3NldHVwLWdhbWUnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL25ldy1nYW1lLmh0bWwnLFxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ25ldy1nYW1lLmFkZC1kZWNrcycsIHtcbiAgICAgICAgdXJsOiAnL2FkZC1kZWNrcycsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvYWRkLWRlY2tzLmh0bWwnLFxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ25ldy1nYW1lLmRlY2snLCB7XG4gICAgICAgIHVybDogJy9kZWNrLzpkZWNrSWQnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL2RlY2suaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdEZWNrQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGNhcmRzOiAoR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcykgPT4gR2FtZUZhY3RvcnkuZ2V0Q2FyZHNCeURlY2tJZCgkc3RhdGVQYXJhbXMuZGVja0lkKVxuICAgICAgICB9XG5cblxuICAgIH0pXG5cbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvbmV3LWdhbWUvc2V0dXAtZ2FtZScpO1xufSlcblxuYXBwLmNvbnRyb2xsZXIoJ05ld0dhbWVDdHJsJywgKCRzY29wZSwgR2FtZUZhY3RvcnksICRzdGF0ZSwgdGVhbURlY2tzLCBzdGFuZGFyZERlY2spID0+IHtcbiAgICAkc2NvcGUuY3VycmVudFZpZXcgPSAnYWRkRGVja3MnXG4gICAgJHNjb3BlLmdhbWVDb25maWcgPSB7fTtcbiAgICAkc2NvcGUuZ2FtZUNvbmZpZy5kZWNrcyA9IHt9O1xuICAgICRzY29wZS5nb1RvRGVja3MgPSAoKSA9PiB7XG4gICAgICAgICRzdGF0ZS5nbygnbmV3LWdhbWUuYWRkLWRlY2tzJywge30sIHsgbG9jYXRpb246IHRydWUsIHJlbG9hZDogdHJ1ZSB9KVxuICAgIH1cblxuICAgICRzY29wZS5kZWNrcyA9IHN0YW5kYXJkRGVjay5jb25jYXQodGVhbURlY2tzKTtcblxuICAgICRzY29wZS5zdGFydE5ld0dhbWUgPSAoZ2FtZUNvbmZpZykgPT4ge1xuICAgICAgICBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWUoZ2FtZUNvbmZpZykudGhlbigoaWQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGUgZ2FtZSBpZCBpcycsIGlkKVxuICAgICAgICAgICAgJHN0YXRlLmdvKCdob21lJykgLy8nZ2FtZS5wcmUtZ2FtZScsIHsgJ2dhbWVJZCc6IDEwMCB9XG4gICAgICAgIH0pXG4gICAgfVxuICAgICRzY29wZS5hZGREZWNrc1RvR2FtZSA9IEdhbWVGYWN0b3J5LmFkZERlY2tzO1xuICAgIC8vICRzY29wZS4kb24oJ2NoYW5nZWRHYW1lJywgKGV2ZW50LCBkYXRhKSA9PiB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdyZWNlaXZlZCBldmVudCcpXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdkYXRhIG9iajonLCBkYXRhKVxuICAgIC8vICAgICAkc2NvcGUuZ2FtZSA9IGRhdGE7XG4gICAgLy8gICAgICRzY29wZS4kZGlnZXN0KClcblxuICAgIC8vIH0pXG5cblxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0RlY2tDdHJsJywgKCRzY29wZSwgR2FtZUZhY3RvcnksICRzdGF0ZSwgY2FyZHMpID0+IHtcbiAgICAkc2NvcGUuY2FyZHMgPSBjYXJkc1xufSlcblxuIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIpID0+IHtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ3RlYW0tZ2FtZXMnLCB7XG5cdFx0dXJsOiAnL3RlYW0tZ2FtZXMnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvdGVhbS1nYW1lcy90ZWFtLWdhbWVzLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdUZWFtR2FtZXNDdHJsJyxcblx0fSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdUZWFtR2FtZXNDdHJsJywgKCRzY29wZSwgR2FtZUZhY3RvcnksICRpb25pY1BvcHVwLCAkdGltZW91dCwgJHN0YXRlKSA9PiB7XG5cdCBcblx0IEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQoJzEnKVxuXHQgXHQudGhlbihnYW1lcyA9PiB7XG5cdCBcdFx0JHNjb3BlLmdhbWVzID0gZ2FtZXM7XG5cdCBcdFx0JHNjb3BlLiRkaWdlc3QoKTtcblx0IFx0fSlcblxuXHQgXG5cdCAkc2NvcGUuJG9uKCdjaGFuZ2VkR2FtZScsIChldmVudCxzbmFwc2hvdCkgPT57XG5cdCBcdCRzY29wZS5uYW1lPSBzbmFwc2hvdC5uYW1lO1xuXHQgXHQkc2NvcGUuJGRpZ2VzdCgpO1xuXHQgfSlcblxuXHQgJHNjb3BlLmpvaW5HYW1lID0gR2FtZUZhY3Rvcnkuam9pbkdhbWVCeUlkO1xuXG5cdCAkc2NvcGUuc2hvd1BvcHVwID0gZnVuY3Rpb24gKGdhbWVJZCkge1xuXHQgICAgIFxuXHQgICAgIGNvbnN0IG15UG9wdXAgPSAkaW9uaWNQb3B1cC5zaG93KHtcblx0ICAgICBcdHRlbXBsYXRlOiAnPHA+SW5mb3JtYXRpb248L3A+Jyxcblx0ICAgICBcdHRpdGxlOiAnR2FtZSBJbmZvcm1hdGlvbicsXG5cdCAgICAgXHRzY29wZTogJHNjb3BlLFxuXHQgICAgIFx0YnV0dG9uczogW1xuXHQgICAgIFx0XHR7dGV4dDogJ0NhbmNlbCd9LFxuXHQgICAgIFx0XHR7XG5cdCAgICAgXHRcdFx0dGV4dDogJzxiPkpvaW48L2I+Jyxcblx0ICAgICBcdFx0IFx0dHlwZTogJ2J1dHRvbi1wb3NpdGl2ZScsXG5cdCAgICAgXHRcdCBcdG9uVGFwOiBlID0+IHtcblx0ICAgICBcdFx0IFx0XHRjb25zb2xlLmxvZyhnYW1lSWQpO1xuXHQgICAgIFx0XHQgXHRcdCRzY29wZS5qb2luR2FtZShnYW1lSWQpO1xuXHQgICAgIFx0XHQgXHRcdCRzdGF0ZS5nbygnZ2FtZS5wcmUtZ2FtZScsIHtnYW1lSWQ6IGdhbWVJZH0pXG5cdCAgICAgXHRcdCBcdH1cblx0ICAgICBcdFx0fVxuXHRcdFx0XVxuXHQgICAgfSlcblx0IH1cbn0pXG4iLCIvL0RpcmVjdGl2ZSBGaWxlIiwiYXBwLmZhY3RvcnkoJ0dhbWVGYWN0b3J5JywgKCRodHRwLCAkcm9vdFNjb3BlLCAkbG9jYWxTdG9yYWdlLCAkcSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IEdhbWVGYWN0b3J5ID0ge307XG5cbiAgICAgICAgY29uc3QgaW5pdGlhbGl6ZUZpcmViYXNlID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgICAgICAgICAgICAgICBhcGlLZXk6IFwiQUl6YVN5QXZRN3lRN2ZLSVVVT3hFcUhQMi1oQ0JMenVNa2RvWGtvXCIsXG4gICAgICAgICAgICAgICAgICAgIGF1dGhEb21haW46IFwiYmxhbmstYWdhaW5zdC1odW1hbml0eS1kOWNiZi5maXJlYmFzZWFwcC5jb21cIixcbiAgICAgICAgICAgICAgICAgICAgZGF0YWJhc2VVUkw6IFwiaHR0cHM6Ly9ibGFuay1hZ2FpbnN0LWh1bWFuaXR5LWQ5Y2JmLmZpcmViYXNlaW8uY29tXCIsXG4gICAgICAgICAgICAgICAgICAgIHN0b3JhZ2VCdWNrZXQ6IFwiYmxhbmstYWdhaW5zdC1odW1hbml0eS1kOWNiZi5hcHBzcG90LmNvbVwiLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdpbmdTZW5kZXJJZDogXCI3NzgxMDgwNzE2NDZcIlxuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZpcmViYXNlLmluaXRpYWxpemVBcHAoY29uZmlnKTtcbiAgICAgICAgfTtcbiAgICAgICAgaW5pdGlhbGl6ZUZpcmViYXNlKCk7XG5cbiAgICAgICAgR2FtZUZhY3Rvcnkuc3RhcnROZXdHYW1lID0gKGdhbWVDb25maWcpID0+IHtcbiAgICAgICAgICAgIC8vY2FuIGFsc28gZ2V0IGFsbCB0aGUgZGVja3MgYnkgdGVhbSBoZXJlIHRvIHByZXBhcmVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGUgc2V0dGluZ3MgYXJlOicsIGdhbWVDb25maWcpXG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAkbG9jYWxTdG9yYWdlLnRlYW0uaWQgfHwgMjtcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0b3JJZCA9ICRsb2NhbFN0b3JhZ2UudXNlci5pZCB8fCAzO1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJ2h0dHA6Ly8xOTIuMTY4LjQuMjI1OjEzMzcvYXBpL2dhbWVzJywge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBnYW1lQ29uZmlnLm5hbWUgfHwgJ0JvcmluZyBOYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgdGVhbUlkOiB0ZWFtSWQsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0b3JJZDogY3JlYXRvcklkLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdG9yTmFtZTogJGxvY2FsU3RvcmFnZS51c2VyLm5hbWUgfHwgJ2RhbicsIC8vbWlnaHQgYmUgdW5uZWNlc3NhcnkgaWYgd2UgaGF2ZSB0aGUgdXNlciBpZFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczogZ2FtZUNvbmZpZ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICAgICAgICAgIC50aGVuKGdhbWVJZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgL3RlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAgICAgICAgICAgICBnYW1lUmVmLm9uKCd2YWx1ZScsIHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzbmFwc2hvdCBpbiBnYW1lZmFjdG9yeSBpczonLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnY2hhbmdlZEdhbWUnLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnYW1lSWQ7XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldENhcmRzQnlEZWNrSWQgPSAoaWQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8xOTIuMTY4LjQuMjM2OjEzMzcvYXBpL2RlY2tzLyR7aWR9L2NhcmRzYClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVzLmRhdGEgaXM6JywgcmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuZGF0YVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmFkZERlY2tzVG9HYW1lID0gKGdhbWVJZCwgZGVja3MpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGBhcGkvZ2FtZXMvJHtnYW1lSWR9L2RlY2tzYCwgZGVja3MpXG5cbiAgICAgICAgICAgIC8vIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfS9waWxlL2ApXG4gICAgICAgICAgICAvLyBnYW1lUmVmLnNldCh7XG4gICAgICAgICAgICAvLyAgICAgZGVja0lkOiB0cnVlXG4gICAgICAgICAgICAvLyB9KVxuICAgICAgICB9XG5cblxuICAgICAgICBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAxO1xuICAgICAgICAgICAgY29uc3QgcGxheWVySWQgPSA0O1xuICAgICAgICAgICAgY29uc3QgcGxheWVyTmFtZSA9ICdjYXQnO1xuICAgICAgICAgICAgY29uc3QgcGxheWVyUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH0vcGxheWVycy8ke3BsYXllcklkfWApXG4gICAgICAgICAgICBwbGF5ZXJSZWYuc2V0KHtcbiAgICAgICAgICAgICAgICBuYW1lOiBwbGF5ZXJOYW1lXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICAgIGdhbWVSZWYub24oJ3ZhbHVlJywgc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnY2hhbmdlZEdhbWUnLCBzbmFwc2hvdC52YWwoKSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cblxuICAgICAgICAvLyBHYW1lRmFjdG9yeS5jcmVhdGVHYW1lQnlJZEZpcmVCYXNlID0gKGZpcmViYXNlZ2FtZUlkKSA9PiB7XG4gICAgICAgIC8vICAgICAvL3JldHVybiAkaHR0cC5wb3N0KGBodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2ZpcmViYXNlL2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgIC8vICAgICAvL25lZWRzIHRvIGJlIC50aGVuYWJsZVxuICAgICAgICAvLyAgICAgY29uc3QgbmV3UmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYGdhbWVzLyR7ZmlyZWJhc2VnYW1lSWR9YCkucHVzaCgpO1xuICAgICAgICAvLyAgICAgbmV3UmVmLnNldCh7XG4gICAgICAgIC8vICAgICAgICAgcGxheWVySWQ6IHJlcS5xdWVyeS5wbGF5ZXJJZFxuICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgIC8vIH1cblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkID0gKGlkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAodHlwZW9mIGlkICE9PSAnbnVtYmVyJykgPyAkbG9jYWxTdG9yYWdlLnRlYW0uaWQgOiBpZDsgLy8gaWQgfHwgbG9jYWxzdG9yYWdlIGRvZXNuJ3Qgd29yayBiZWNhdXNlIDAgaXMgZmFsc2V5XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2RlY2tzP3RlYW09JHt0ZWFtSWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG5cbiAgICAgICAgfTtcblxuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldFVzZXJzQnlHYW1lSWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2dhbWVzLyR7Z2FtZUlkfS91c2Vyc2ApO1xuICAgICAgICB9O1xuXG5cblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRHYW1lQnlHYW1lSWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zdCBkZWZlciA9ICRxLmRlZmVyKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhnYW1lSWQpO1xuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gMTtcbiAgICAgICAgICAgIGNvbnN0IGdhbWVzUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAgICAgcmV0dXJuIGdhbWVzUmVmLm9uY2UoJ3ZhbHVlJykudGhlbihzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1RFU1QzJywgc25hcHNob3QudmFsKCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNuYXBzaG90LnZhbCgpO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgLy8gcmV0dXJuIGRlZmVyLnByb21pc2U7XG4gICAgICAgIH07XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCA9ICh0ZWFtSWQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGUgdGVhbSBpcyBpZCcsIHRlYW1JZClcblxuICAgICAgICAgICAgY29uc3QgZ2FtZXNSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzYClcbiAgICAgICAgICAgIHJldHVybiBnYW1lc1JlZi5vbmNlKCd2YWx1ZScpLnRoZW4oc25hcHNob3QgPT4geyAvL21pZ2h0IGJyZWFrIGFmdGVyIHlvdSBkbyBpdCBvbmNlXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZSB2YWwgaXMnLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gc25hcHNob3QudmFsKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQgPSAodGVhbUlkKSA9PiB7XG4gICAgICAgICAgICB0ZWFtSWQgPSB0ZWFtSWQgfHwgJGxvY2FsU3RvcmFnZS50ZWFtLmlkXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGhlIHRlYW0gaXMgaWQnLCB0ZWFtSWQpXG4gICAgICAgICAgICBjb25zdCBkZWZlciA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGdhbWVzUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lc2ApXG4gICAgICAgICAgICBnYW1lc1JlZi5vbigndmFsdWUnLCBzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZSB2YWwgaXMnLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICBkZWZlci5yZXNvbHZlKHNuYXBzaG90LnZhbCgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJkZWZlciBwcm9taXNlXCIsIGRlZmVyLnByb21pc2UpXG4gICAgICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VXNlciA9ICh1c2VySWQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2h0dHA6Ly9sb2NhbFN0b3JhZ2U6MTMzNy9hcGkvZ2FtZXMvP3VzZXJJZD0nICsgdXNlcklkKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmV0dXJuIEdhbWVGYWN0b3J5O1xuICAgIH1cblxuKTtcblxuIiwiYXBwLmZhY3RvcnkoJ0xvZ2luRmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwKXtcblx0cmV0dXJuIHtcblx0XHRnZXRTbGFja0NyZWRzOiBmdW5jdGlvbigpe1xuXHRcdFx0cmV0dXJuICRodHRwLmdldCgnaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9zbGFjaycpXHRcblx0XHRcdFx0LnRoZW4ocmVzID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gcmVzLmRhdGFcblx0XHRcdFx0fSlcblx0XHR9XG5cdH1cbn0pXG4iLCJhcHAuZmFjdG9yeSgnVXNlckZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCwgJGxvY2FsU3RvcmFnZSwgJHRpbWVvdXQsICRzdGF0ZSl7XG5cdFxuXHRyZXR1cm4ge1xuXHRcdHNldFVzZXI6IGZ1bmN0aW9uKGluZm8pe1xuXHRcdFx0cmV0dXJuICRodHRwKHtcblx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRcdHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvdXNlcnMnLFxuXHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRkYXRhOiBpbmZvXG5cdFx0XHR9KVxuXHRcdFx0LnRoZW4ocmVzID0+IHtcblx0XHRcdFx0dGhpcy5zZXRMb2NhbFN0b3JhZ2UocmVzLmRhdGEudXNlclswXSwgcmVzLmRhdGEudGVhbVswXSk7XG5cdFx0XHR9KVxuXHRcdH0sXG5cblx0XHRnZXRTbGFja0luZm86IGZ1bmN0aW9uKCl7XG5cdFx0XHRyZXR1cm4gJGh0dHAuZ2V0KCdodHRwczovL3NsYWNrLmNvbS9hcGkvdXNlcnMuaWRlbnRpdHknKVxuXHRcdH0sXG5cblx0XHRzZXRMb2NhbFN0b3JhZ2U6IGZ1bmN0aW9uKHVzZXIsIHRlYW0pe1xuXHRcdFx0JGxvY2FsU3RvcmFnZS51c2VyID0gdXNlcjtcblx0XHRcdCRsb2NhbFN0b3JhZ2UudGVhbSA9IHRlYW07XG5cdFx0fSxcblxuXHRcdGxvZ091dDogZnVuY3Rpb24oKXtcblx0XHRcdCRsb2NhbFN0b3JhZ2UuJHJlc2V0KCk7XG5cdFx0fVxuXHR9XG59KSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
