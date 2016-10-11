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
            GameFactory.addPileToGame(id, $scope.gameConfig.decks);

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

app.factory('GameFactory', function ($http, $rootScope, $localStorage, $q) {

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

    GameFactory.startNewGame = function (gameConfig) {
        //can also get all the decks by team here to prepare
        console.log('the settings are:', gameConfig);
        var teamId = $localStorage.team.id || 2;
        var creatorId = $localStorage.user.id || 3;
        return $http.post('http://192.168.4.236:1337/api/games', {
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
                $rootScope.$broadcast('changedGame', snapshot.val());
            });
            return gameId;
        });
    };

    GameFactory.getCardsByDeckId = function (id) {
        return $http.get('http://192.168.4.236:1337/api/decks/' + id + '/cards').then(function (res) {
            return res.data;
        });
    };

    GameFactory.addPileToGame = function (gameId, decks) {
        var decksArr = [];
        for (var deckId in decks) {
            decksArr.push(deckId);
        }
        //console.log('the pile is', decksArr) //currently adds all decks
        return $http.post('http://192.168.4.236:1337/api/games/' + gameId + '/decks', { 'decks': decksArr });
    };

    // GameFactory.addDecksToGame = (gameId, decks) => {
    //     return $http.post(`api/games/${gameId}/decks`, decks)

    //     // const gameRef = firebase.database().ref(`teams/${teamId}/games/${gameId}/pile/`)
    //     // gameRef.set({
    //     //     deckId: true
    //     // })
    // }
    // GameFactory.getCardsByDeckId = (gameId, deckId) => {
    //     const teamId = $localStorage.team.id;
    //     let pileRef = firebase.database().ref(`teams/${teamId}/games/${gameId}/pile`);

    //     return $http.get(`api/decks/${deckId}/cards`)
    //         .then(data => res.data)
    //         .then(cards => {
    //             const addingCards = cards.map(card => pileRef.set({
    //                 [`${card.id}`]: true
    //             }))

    //         })
    // }

    // GameFactory.addPileToGame2 = (gameId) => {
    //     console.log('runnign addPileToGame with id', gameId)
    //     const teamId = $localStorage.team.id;
    //     let deckRef = firebase.database().ref(`teams/${teamId}/games/${gameId}/settings/decks`)

    //     deckRef.once('value').then(snapshot => {
    //             const addingCards = [];
    //             console.log('the value issss ', snapshot.val())
    //                                 //all deck ids
    //             for (var deckId in snapshot.val()){
    //                 let x = GameFactory.getCardsByDeckId
    //                 addingCards.push()
    //             }


    //             _.mapValues(snapshot.val(), v => deckRef.set({

    //             }))

    //             snapshot.val()

    //             _.mapValues({ one: 1, two: 2, three: 3 }, v => v * 3);
    //         })
    // let pileRef = firebase.database().ref(`teams/${teamId}/games/${gameId}/pile`);

    // return $http.get(`api/decks/${deckId}/cards`)
    //     .then(data => res.data)
    //     .then(cards => {
    //         const addingCards = cards.map(card => pileRef.set({
    //             [`${card.id}`]: true
    //         }))

    //     })
    // }


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
//Directive File
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImNhcmRzLXRlc3QvY2FyZHNUZXN0LmpzIiwiZGVja3MvZGVja3MuanMiLCJmcm9tIGZzZy9mcm9tLWZzZy5qcyIsImdhbWUvZ2FtZS5qcyIsImhvbWUvaG9tZS5qcyIsImxvZ2luL2xvZ2luLmpzIiwibmV3LWdhbWUvbmV3LWdhbWUuanMiLCJ0ZWFtLWdhbWVzL3RlYW0tZ2FtZXMuanMiLCJjb21tb24vZmFjdG9yaWVzL0dhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9sb2dpbkZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yaWVzL3VzZXJGYWN0b3J5LmpzIiwiY29tbW9uL2RpcmVjdGl2ZXMvZGlyZWN0aXZlLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImFwcCIsImFuZ3VsYXIiLCJtb2R1bGUiLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZUxpZ2h0Q29udGVudCIsImNvbnRyb2xsZXIiLCIkc2NvcGUiLCJVc2VyRmFjdG9yeSIsIiRzdGF0ZSIsIiRsb2NhbFN0b3JhZ2UiLCIkdGltZW91dCIsImxvZ091dCIsImdvIiwiY29uZmlnIiwiJHN0YXRlUHJvdmlkZXIiLCJzdGF0ZSIsInVybCIsInRlbXBsYXRlVXJsIiwiZ3JlZXRpbmciLCJyZXNvbHZlIiwiZGVja3MiLCJHYW1lRmFjdG9yeSIsIiRzdGF0ZVBhcmFtcyIsImdldERlY2tzQnlUZWFtSWQiLCJzdGF0ZVBhcmFtcyIsInRlYW1JZCIsImFic3RyYWN0IiwiZ2FtZSIsImdldEdhbWVCeUdhbWVJZCIsImdhbWVJZCIsImNvbnNvbGUiLCJsb2ciLCJuYW1lIiwic2V0dGluZ3MiLCJwbGF5ZXJDb3VudCIsIk9iamVjdCIsImtleXMiLCJwbGF5ZXJzIiwibGVuZ3RoIiwid2FpdGluZ0ZvclBsYXllcnMiLCJtaW5QbGF5ZXJzIiwid2hpdGVDYXJkcyIsInBpbGUiLCJ3aGl0ZWNhcmRzIiwiJHVybFJvdXRlclByb3ZpZGVyIiwiZ2FtZXMiLCJnZXRHYW1lc0J5VGVhbUlkIiwiJGNvcmRvdmFPYXV0aCIsInN0b3JhZ2UiLCJKU09OIiwic3RyaW5naWZ5IiwiZ29Ub05ld0dhbWUiLCIkb24iLCJldmVudCIsImRhdGEiLCJvdGhlcndpc2UiLCJMb2dpbkZhY3RvcnkiLCIkaW9uaWNTaWRlTWVudURlbGVnYXRlIiwibG9naW5XaXRoU2xhY2siLCJnZXRTbGFja0NyZWRzIiwidGhlbiIsInNsYWNrIiwiY3JlZHMiLCJjbGllbnRJRCIsImNsaWVudFNlY3JldCIsInNldFVzZXIiLCJpbmZvIiwiY2FuRHJhZ0NvbnRlbnQiLCJyZWRpcmVjdFVzZXIiLCJ1c2VyIiwidGVhbURlY2tzIiwic3RhbmRhcmREZWNrIiwiY2FyZHMiLCJnZXRDYXJkc0J5RGVja0lkIiwiZGVja0lkIiwiY3VycmVudFZpZXciLCJnYW1lQ29uZmlnIiwiZ29Ub0RlY2tzIiwibG9jYXRpb24iLCJyZWxvYWQiLCJjb25jYXQiLCJzdGFydE5ld0dhbWUiLCJpZCIsImFkZFBpbGVUb0dhbWUiLCJhZGREZWNrc1RvR2FtZSIsImFkZERlY2tzIiwiJGlvbmljUG9wdXAiLCIkZGlnZXN0Iiwic25hcHNob3QiLCJqb2luR2FtZSIsImpvaW5HYW1lQnlJZCIsInNob3dQb3B1cCIsIm15UG9wdXAiLCJzaG93IiwidGVtcGxhdGUiLCJ0aXRsZSIsInNjb3BlIiwiYnV0dG9ucyIsInRleHQiLCJ0eXBlIiwib25UYXAiLCJmYWN0b3J5IiwiJGh0dHAiLCIkcm9vdFNjb3BlIiwiJHEiLCJpbml0aWFsaXplRmlyZWJhc2UiLCJhcGlLZXkiLCJhdXRoRG9tYWluIiwiZGF0YWJhc2VVUkwiLCJzdG9yYWdlQnVja2V0IiwibWVzc2FnaW5nU2VuZGVySWQiLCJmaXJlYmFzZSIsImluaXRpYWxpemVBcHAiLCJ0ZWFtIiwiY3JlYXRvcklkIiwicG9zdCIsImNyZWF0b3JOYW1lIiwicmVzIiwiZ2FtZVJlZiIsImRhdGFiYXNlIiwicmVmIiwib24iLCIkYnJvYWRjYXN0IiwidmFsIiwiZ2V0IiwiZGVja3NBcnIiLCJwdXNoIiwicGxheWVySWQiLCJwbGF5ZXJOYW1lIiwicGxheWVyUmVmIiwic2V0IiwiZ2V0VXNlcnNCeUdhbWVJZCIsImdhbWVzUmVmIiwib25jZSIsImRlZmVyIiwicHJvbWlzZSIsImdldEdhbWVzQnlVc2VyIiwidXNlcklkIiwibWV0aG9kIiwiaGVhZGVycyIsInNldExvY2FsU3RvcmFnZSIsImdldFNsYWNrSW5mbyIsIiRyZXNldCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQUEsT0FBQUMsR0FBQSxHQUFBQyxRQUFBQyxNQUFBLENBQUEsc0JBQUEsRUFBQSxDQUFBLE9BQUEsRUFBQSxXQUFBLEVBQUEsV0FBQSxFQUFBLGdCQUFBLEVBQUEsV0FBQSxFQUFBLGNBQUEsQ0FBQSxDQUFBOztBQUVBRixJQUFBRyxHQUFBLENBQUEsVUFBQUMsY0FBQSxFQUFBO0FBQ0FBLG1CQUFBQyxLQUFBLENBQUEsWUFBQTtBQUNBLFlBQUFOLE9BQUFPLE9BQUEsSUFBQVAsT0FBQU8sT0FBQSxDQUFBQyxPQUFBLENBQUFDLFFBQUEsRUFBQTtBQUNBO0FBQ0E7QUFDQUYsb0JBQUFDLE9BQUEsQ0FBQUMsUUFBQSxDQUFBQyx3QkFBQSxDQUFBLElBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0FILG9CQUFBQyxPQUFBLENBQUFDLFFBQUEsQ0FBQUUsYUFBQSxDQUFBLElBQUE7QUFDQTtBQUNBLFlBQUFYLE9BQUFZLFNBQUEsRUFBQTtBQUNBQSxzQkFBQUMsaUJBQUE7QUFDQTtBQUNBLEtBZEE7QUFnQkEsQ0FqQkE7O0FDUEFaLElBQUFhLFVBQUEsQ0FBQSxZQUFBLEVBQUEsVUFBQUMsTUFBQSxFQUFBQyxXQUFBLEVBQUFDLE1BQUEsRUFBQUMsYUFBQSxFQUFBQyxRQUFBLEVBQUE7QUFDQUosV0FBQUssTUFBQSxHQUFBLFlBQUE7QUFD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QUNBLFdBQUE7QUFDQTNDLHVCQUFBLHlCQUFBO0FBQ0EsbUJBQUEyQyxNQUFBc0IsR0FBQSxDQUFBLGlDQUFBLEVBQ0FoRSxJQURBLENBQ0EsZUFBQTtBQUNBLHVCQUFBeUQsSUFBQS9ELElBQUE7QUFDQSxhQUhBLENBQUE7QUFJQTtBQU5BLEtBQUE7QUFRQSxDQVRBOztBQ0FBOUQsSUFBQTZHLE9BQUEsQ0FBQSxhQUFBLEVBQUEsVUFBQUMsS0FBQSxFQUFBN0YsYUFBQSxFQUFBQyxRQUFBLEVBQUFGLE1BQUEsRUFBQTs7QUFFQSxXQUFBO0FBQ0F5RCxpQkFBQSxpQkFBQUMsSUFBQSxFQUFBO0FBQUE7O0FBQ0EsbUJBQUFvQyxNQUFBO0FBQ0FvQyx3QkFBQSxNQURBO0FBRUExSCxxQkFBQSxpQ0FGQTtBQUdBMkgseUJBQUE7QUFDQSxvQ0FBQTtBQURBLGlCQUhBO0FBTUFyRixzQkFBQVk7QUFOQSxhQUFBLEVBUUFOLElBUkEsQ0FRQSxlQUFBO0FBQ0Esc0JBQUFnRixlQUFBLENBQUF2QixJQUFBL0QsSUFBQSxDQUFBZSxJQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUFnRCxJQUFBL0QsSUFBQSxDQUFBMkQsSUFBQSxDQUFBLENBQUEsQ0FBQTtBQUNBLGFBVkEsQ0FBQTtBQVdBLFNBYkE7O0FBZUE0QixzQkFBQSx3QkFBQTtBQUNBLG1CQUFBdkMsTUFBQXNCLEdBQUEsQ0FBQSxzQ0FBQSxDQUFBO0FBQ0EsU0FqQkE7O0FBbUJBZ0IseUJBQUEseUJBQUF2RSxJQUFBLEVBQUE0QyxJQUFBLEVBQUE7QUFDQXhHLDBCQUFBNEQsSUFBQSxHQUFBQSxJQUFBO0FBQ0E1RCwwQkFBQXdHLElBQUEsR0FBQUEsSUFBQTtBQUNBLFNBdEJBOztBQXdCQXRHLGdCQUFBLGtCQUFBO0FBQ0FGLDBCQUFBcUksTUFBQTtBQUNBO0FBMUJBLEtBQUE7QUE0QkEsQ0E5QkE7QUNBQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW9uaWMgU3RhcnRlciBBcHBcblxuLy8gYW5ndWxhci5tb2R1bGUgaXMgYSBnbG9iYWwgcGxhY2UgZm9yIGNyZWF0aW5nLCByZWdpc3RlcmluZyBhbmQgcmV0cmlldmluZyBBbmd1bGFyIG1vZHVsZXNcbi8vICdzdGFydGVyJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xud2luZG93LmFwcCA9IGFuZ3VsYXIubW9kdWxlKCdCbGFua0FnYWluc3RIdW1hbml0eScsIFsnaW9uaWMnLCAndWkucm91dGVyJywnbmdDb3Jkb3ZhJywnbmdDb3Jkb3ZhT2F1dGgnLCAnbmdTdG9yYWdlJywgJ3VpLmJvb3RzdHJhcCddKVxuXG5hcHAucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtKSB7XG4gICAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICAgICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAgICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuXG4gICAgICAgICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcbiAgICAgICAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxuICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgICAgICAgIFN0YXR1c0Jhci5zdHlsZUxpZ2h0Q29udGVudCgpXG4gICAgICAgIH1cbiAgICB9KTtcblxufSlcbiIsImFwcC5jb250cm9sbGVyKCdMb2dvdXRDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBVc2VyRmFjdG9yeSwgJHN0YXRlLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCl7XG5cdCRzY29wZS5sb2dPdXQgPSBmdW5jdGlvbigpe1xuXHRcdFVzZXJGYWN0b3J5LmxvZ091dCgpXG5cdFx0JHN0YXRlLmdvKCdsb2dpbicpXG5cdH1cbn0pIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcil7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdjYXJkcycsIHtcblx0XHR1cmw6ICcvY2FyZHMnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvY2FyZHMtdGVzdC9jYXJkcy10ZXN0Lmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdDYXJkc1Rlc3RDdHJsJ1xuXHR9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0NhcmRzVGVzdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpe1xuIFx0JHNjb3BlLmdyZWV0aW5nID0gXCJISVwiXG59KSIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdkZWNrcycsIHtcblx0XHR1cmw6ICdkZWNrcy86dGVhbWlkJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2RlY2tzL2RlY2tzLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdEZWNrQ3RybCcsXG5cdFx0cmVzb2x2ZToge1xuXHRcdFx0ZGVja3M6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkKHN0YXRlUGFyYW1zLnRlYW1JZClcblx0XHR9XG5cdH0pXG5cbn0pXG5cbmFwcC5jb250cm9sbGVyKCdEZWNrQ3RybCcsICgkc2NvcGUpID0+IHtcblxuXG5cdFxufSkiLCIvLyAoZnVuY3Rpb24gKCkge1xuXG4vLyAgICAgJ3VzZSBzdHJpY3QnO1xuXG4vLyAgICAgLy8gSG9wZSB5b3UgZGlkbid0IGZvcmdldCBBbmd1bGFyISBEdWgtZG95LlxuLy8gICAgIGlmICghd2luZG93LmFuZ3VsYXIpIHRocm93IG5ldyBFcnJvcignSSBjYW5cXCd0IGZpbmQgQW5ndWxhciEnKTtcblxuLy8gICAgIHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnZnNhUHJlQnVpbHQnLCBbXSk7XG5cbi8vICAgICBhcHAuZmFjdG9yeSgnU29ja2V0JywgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICBpZiAoIXdpbmRvdy5pbykgdGhyb3cgbmV3IEVycm9yKCdzb2NrZXQuaW8gbm90IGZvdW5kIScpO1xuLy8gICAgICAgICByZXR1cm4gd2luZG93LmlvKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pO1xuLy8gICAgIH0pO1xuXG4vLyAgICAgLy8gQVVUSF9FVkVOVFMgaXMgdXNlZCB0aHJvdWdob3V0IG91ciBhcHAgdG9cbi8vICAgICAvLyBicm9hZGNhc3QgYW5kIGxpc3RlbiBmcm9tIGFuZCB0byB0aGUgJHJvb3RTY29wZVxuLy8gICAgIC8vIGZvciBpbXBvcnRhbnQgZXZlbnRzIGFib3V0IGF1dGhlbnRpY2F0aW9uIGZsb3cuXG4vLyAgICAgYXBwLmNvbnN0YW50KCdBVVRIX0VWRU5UUycsIHtcbi8vICAgICAgICAgbG9naW5TdWNjZXNzOiAnYXV0aC1sb2dpbi1zdWNjZXNzJyxcbi8vICAgICAgICAgbG9naW5GYWlsZWQ6ICdhdXRoLWxvZ2luLWZhaWxlZCcsXG4vLyAgICAgICAgIGxvZ291dFN1Y2Nlc3M6ICdhdXRoLWxvZ291dC1zdWNjZXNzJyxcbi8vICAgICAgICAgc2Vzc2lvblRpbWVvdXQ6ICdhdXRoLXNlc3Npb24tdGltZW91dCcsXG4vLyAgICAgICAgIG5vdEF1dGhlbnRpY2F0ZWQ6ICdhdXRoLW5vdC1hdXRoZW50aWNhdGVkJyxcbi8vICAgICAgICAgbm90QXV0aG9yaXplZDogJ2F1dGgtbm90LWF1dGhvcml6ZWQnXG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuZmFjdG9yeSgnQXV0aEludGVyY2VwdG9yJywgZnVuY3Rpb24gKCRyb290U2NvcGUsICRxLCBBVVRIX0VWRU5UUykge1xuLy8gICAgICAgICB2YXIgc3RhdHVzRGljdCA9IHtcbi8vICAgICAgICAgICAgIDQwMTogQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCxcbi8vICAgICAgICAgICAgIDQwMzogQVVUSF9FVkVOVFMubm90QXV0aG9yaXplZCxcbi8vICAgICAgICAgICAgIDQxOTogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsXG4vLyAgICAgICAgICAgICA0NDA6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0XG4vLyAgICAgICAgIH07XG4vLyAgICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgICAgICByZXNwb25zZUVycm9yOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3Qoc3RhdHVzRGljdFtyZXNwb25zZS5zdGF0dXNdLCByZXNwb25zZSk7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXNwb25zZSlcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfTtcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5jb25maWcoZnVuY3Rpb24gKCRodHRwUHJvdmlkZXIpIHtcbi8vICAgICAgICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaChbXG4vLyAgICAgICAgICAgICAnJGluamVjdG9yJyxcbi8vICAgICAgICAgICAgIGZ1bmN0aW9uICgkaW5qZWN0b3IpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJGluamVjdG9yLmdldCgnQXV0aEludGVyY2VwdG9yJyk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIF0pO1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLnNlcnZpY2UoJ0F1dGhTZXJ2aWNlJywgZnVuY3Rpb24gKCRodHRwLCBTZXNzaW9uLCAkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUywgJHEpIHtcblxuLy8gICAgICAgICBmdW5jdGlvbiBvblN1Y2Nlc3NmdWxMb2dpbihyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgdmFyIHVzZXIgPSByZXNwb25zZS5kYXRhLnVzZXI7XG4vLyAgICAgICAgICAgICBTZXNzaW9uLmNyZWF0ZSh1c2VyKTtcbi8vICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dpblN1Y2Nlc3MpO1xuLy8gICAgICAgICAgICAgcmV0dXJuIHVzZXI7XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICAvLyBVc2VzIHRoZSBzZXNzaW9uIGZhY3RvcnkgdG8gc2VlIGlmIGFuXG4vLyAgICAgICAgIC8vIGF1dGhlbnRpY2F0ZWQgdXNlciBpcyBjdXJyZW50bHkgcmVnaXN0ZXJlZC5cbi8vICAgICAgICAgdGhpcy5pc0F1dGhlbnRpY2F0ZWQgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gISFTZXNzaW9uLnVzZXI7XG4vLyAgICAgICAgIH07XG5cbiAgICAgICAgXG4vLyAgICAgICAgIHRoaXMuaXNBZG1pbiA9IGZ1bmN0aW9uKHVzZXJJZCl7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZygncnVubmluZyBhZG1pbiBmdW5jJylcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJylcbi8vICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEudXNlci5pc0FkbWluKVxuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgdGhpcy5nZXRMb2dnZWRJblVzZXIgPSBmdW5jdGlvbiAoZnJvbVNlcnZlcikge1xuXG4vLyAgICAgICAgICAgICAvLyBJZiBhbiBhdXRoZW50aWNhdGVkIHNlc3Npb24gZXhpc3RzLCB3ZVxuLy8gICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSB1c2VyIGF0dGFjaGVkIHRvIHRoYXQgc2Vzc2lvblxuLy8gICAgICAgICAgICAgLy8gd2l0aCBhIHByb21pc2UuIFRoaXMgZW5zdXJlcyB0aGF0IHdlIGNhblxuLy8gICAgICAgICAgICAgLy8gYWx3YXlzIGludGVyZmFjZSB3aXRoIHRoaXMgbWV0aG9kIGFzeW5jaHJvbm91c2x5LlxuXG4vLyAgICAgICAgICAgICAvLyBPcHRpb25hbGx5LCBpZiB0cnVlIGlzIGdpdmVuIGFzIHRoZSBmcm9tU2VydmVyIHBhcmFtZXRlcixcbi8vICAgICAgICAgICAgIC8vIHRoZW4gdGhpcyBjYWNoZWQgdmFsdWUgd2lsbCBub3QgYmUgdXNlZC5cblxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuaXNBdXRoZW50aWNhdGVkKCkgJiYgZnJvbVNlcnZlciAhPT0gdHJ1ZSkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKFNlc3Npb24udXNlcik7XG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIC8vIE1ha2UgcmVxdWVzdCBHRVQgL3Nlc3Npb24uXG4vLyAgICAgICAgICAgICAvLyBJZiBpdCByZXR1cm5zIGEgdXNlciwgY2FsbCBvblN1Y2Nlc3NmdWxMb2dpbiB3aXRoIHRoZSByZXNwb25zZS5cbi8vICAgICAgICAgICAgIC8vIElmIGl0IHJldHVybnMgYSA0MDEgcmVzcG9uc2UsIHdlIGNhdGNoIGl0IGFuZCBpbnN0ZWFkIHJlc29sdmUgdG8gbnVsbC5cbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJykudGhlbihvblN1Y2Nlc3NmdWxMb2dpbikuY2F0Y2goZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuLy8gICAgICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmxvZ2luID0gZnVuY3Rpb24gKGNyZWRlbnRpYWxzKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2xvZ2luJywgY3JlZGVudGlhbHMpXG4vLyAgICAgICAgICAgICAgICAgLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pXG4vLyAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCh7IG1lc3NhZ2U6ICdJbnZhbGlkIGxvZ2luIGNyZWRlbnRpYWxzLid9KTtcbi8vICAgICAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLnNpZ251cCA9IGZ1bmN0aW9uKGNyZWRlbnRpYWxzKXtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4vLyAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4vLyAgICAgICAgICAgICAgICAgdXJsOiAnL3NpZ251cCcsXG4vLyAgICAgICAgICAgICAgICAgZGF0YTogY3JlZGVudGlhbHNcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4gcmVzdWx0LmRhdGEpXG4vLyAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oKXtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHttZXNzYWdlOiAnVGhhdCBlbWFpbCBpcyBhbHJlYWR5IGJlaW5nIHVzZWQuJ30pO1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmxvZ291dCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9sb2dvdXQnKS50aGVuKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICBTZXNzaW9uLmRlc3Ryb3koKTtcbi8vICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoQVVUSF9FVkVOVFMubG9nb3V0U3VjY2Vzcyk7XG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfTtcblxuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLnNlcnZpY2UoJ1Nlc3Npb24nLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMpIHtcblxuLy8gICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbi8vICAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCwgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgc2VsZi5kZXN0cm95KCk7XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgICRyb290U2NvcGUuJG9uKEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0LCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICBzZWxmLmRlc3Ryb3koKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcblxuLy8gICAgICAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uICh1c2VyKSB7XG4vLyAgICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICB9KTtcblxuLy8gfSgpKTtcbiIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnL2dhbWUnLFxuICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL2dhbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdHYW1lQ3RybCcsXG4gICAgfSlcbiAgICAuc3RhdGUoJ2dhbWUucHJlLWdhbWUnLCB7XG4gICAgICAgIHVybDogJy86Z2FtZUlkL3ByZS1nYW1lJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL3ByZS1nYW1lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnUHJlR2FtZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBnYW1lIDogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldEdhbWVCeUdhbWVJZCgkc3RhdGVQYXJhbXMuZ2FtZUlkKVxuICAgICAgICB9XG4gICAgfSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdHYW1lQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5KSA9PiB7XG4gICBcbn0pXG5cbmFwcC5jb250cm9sbGVyKFwiUHJlR2FtZUN0cmxcIiwgKCRzY29wZSwgR2FtZUZhY3RvcnksIGdhbWUpID0+IHtcblxuICAgIC8vICRzY29wZS4kb24oJ2NoYW5nZWRHYW1lJywgKGV2ZW50LHNuYXBzaG90KSA9PiB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKHNuYXBzaG90KTtcbiAgICAvLyAgICAgJHNjb3BlLm5hbWUgPSBzbmFwc2hvdC5uYW1lO1xuICAgIC8vICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgIC8vIH0pXG5cbiAgICBjb25zb2xlLmxvZyhnYW1lKTtcbiAgICAkc2NvcGUuZ2FtZSA9IGdhbWU7XG4gICAgJHNjb3BlLm5hbWUgPSBnYW1lLnNldHRpbmdzLm5hbWU7XG4gICAgJHNjb3BlLnBsYXllckNvdW50ID0gT2JqZWN0LmtleXMoZ2FtZS5wbGF5ZXJzKS5sZW5ndGg7XG4gICAgJHNjb3BlLndhaXRpbmdGb3JQbGF5ZXJzID0gIGdhbWUuc2V0dGluZ3MubWluUGxheWVycyAtICRzY29wZS5wbGF5ZXJDb3VudDtcbiAgICAkc2NvcGUud2hpdGVDYXJkcyA9IGdhbWUucGlsZS53aGl0ZWNhcmRzO1xuICAgXG4gICAgXG59KVxuXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgdXJsOiAnLycsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvaG9tZS9ob21lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnSG9tZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBnYW1lczogZnVuY3Rpb24oR2FtZUZhY3RvcnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUsICRjb3Jkb3ZhT2F1dGgsIFVzZXJGYWN0b3J5LCBHYW1lRmFjdG9yeSwgJGxvY2FsU3RvcmFnZSwgZ2FtZXMpIHtcbiAgICAkc2NvcGUuc3RvcmFnZSA9ICRsb2NhbFN0b3JhZ2U7XG4gICAgJHNjb3BlLmdhbWVzID0gZ2FtZXM7XG4gICAgY29uc29sZS5sb2coXCJnYW1lc1wiLCBKU09OLnN0cmluZ2lmeSgkc2NvcGUuZ2FtZXMpKVxuICAgICRzY29wZS5nb1RvTmV3R2FtZSA9ICgpID0+IHtcbiAgICAgICAgJHN0YXRlLmdvKCduZXctZ2FtZS5tYWluJylcbiAgICB9XG5cblxuICAgIC8vIC8vIGdldCBnYW1lcyBmcm9tIHBvc3RncmVzXG4gICAgLy8gR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVVzZXIoKVxuICAgIC8vIC50aGVuKGdhbWVzID0+IHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coXCJnYW1lcyBmb3VuZDpcIiwgZ2FtZXMpXG4gICAgLy8gICAgICRzY29wZS5nYW1lcyA9IGdhbWVzO1xuICAgIC8vIH0pXG5cbiAgICAvL2dldCBnYW1lcyBmcm9tIGZpcmViYXNlXG4gICAgLy8gR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCgkc2NvcGUuc3RvcmFnZS50ZWFtLmlkKVxuICAgIC8vIC50aGVuKGdhbWVzID0+IHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coXCJ0aGUgZ2FtZXMgYXJlOlwiLCBnYW1lcylcbiAgICAvLyAgICAgJHNjb3BlLmdhbWVzID0gZ2FtZXM7XG4gICAgLy8gfSlcblxuXG4gICAgJHNjb3BlLiRvbignY2hhbmdlZEdhbWUnLCAoZXZlbnQsIGRhdGEpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlY2VpdmVkIGV2ZW50IGluIGhvbWUnKVxuICAgICAgICBjb25zb2xlLmxvZygnZGF0YSBvYmo6JywgZGF0YSlcbiAgICAgICAgICAgIC8vJHNjb3BlLmdhbWUgPSBkYXRhO1xuICAgICAgICAgICAgLy8gJHNjb3BlLiRkaWdlc3QoKVxuXG4gICAgfSlcbn0pXG5cbiIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcil7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdsb2dpbicsIHtcblx0XHR1cmw6ICcvbG9naW4nLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvbG9naW4vbG9naW4uaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0xvZ2luQ3RybCdcblx0fSlcblx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2xvZ2luJyk7XG59KVxuXG5hcHAuY29udHJvbGxlcignTG9naW5DdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUsIExvZ2luRmFjdG9yeSwgVXNlckZhY3RvcnksICRjb3Jkb3ZhT2F1dGgsICRsb2NhbFN0b3JhZ2UsICR0aW1lb3V0LCAkaW9uaWNTaWRlTWVudURlbGVnYXRlKXtcbiBcdCRzY29wZS5sb2dpbldpdGhTbGFjayA9IGZ1bmN0aW9uKCl7XG4gXHRcdHJldHVybiBMb2dpbkZhY3RvcnkuZ2V0U2xhY2tDcmVkcygpXG4gXHRcdC50aGVuKGNyZWRzID0+e1xuIFx0XHRcdHJldHVybiAkY29yZG92YU9hdXRoLnNsYWNrKGNyZWRzLmNsaWVudElELCBjcmVkcy5jbGllbnRTZWNyZXQsIFsnaWRlbnRpdHkuYmFzaWMnLCAnaWRlbnRpdHkudGVhbScsICdpZGVudGl0eS5hdmF0YXInXSlcbiBcdFx0fSlcbiBcdFx0LnRoZW4oaW5mbyA9PiBVc2VyRmFjdG9yeS5zZXRVc2VyKGluZm8pKVxuIFx0XHQudGhlbigoKSA9PiAkc3RhdGUuZ28oJ2hvbWUnKSlcbiBcdH1cblxuIFx0JGlvbmljU2lkZU1lbnVEZWxlZ2F0ZS5jYW5EcmFnQ29udGVudChmYWxzZSk7XG5cbiBcdCRzY29wZS4kb24oJyRpb25pY1ZpZXcubGVhdmUnLCBmdW5jdGlvbiAoKSB7ICRpb25pY1NpZGVNZW51RGVsZWdhdGUuY2FuRHJhZ0NvbnRlbnQodHJ1ZSkgfSk7XG5cbiBcdCRzY29wZS5zdG9yYWdlID0gJGxvY2FsU3RvcmFnZVxuXG4gXHRmdW5jdGlvbiByZWRpcmVjdFVzZXIoKXtcbiBcdFx0Y29uc29sZS5sb2coXCJzY29wZSBzdG9yYWdlIHVzZXJcIiwgJHNjb3BlLnN0b3JhZ2UudXNlcilcbiBcdFx0aWYgKCRzY29wZS5zdG9yYWdlLnVzZXIpICRzdGF0ZS5nbygnaG9tZScpXG4gXHR9XG5cblx0cmVkaXJlY3RVc2VyKCk7XG59KSIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpID0+IHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCduZXctZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnL25ldy1nYW1lJyxcbiAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvbWFpbi5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ05ld0dhbWVDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgdGVhbURlY2tzOiAoR2FtZUZhY3RvcnkpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoKSxcbiAgICAgICAgICAgIHN0YW5kYXJkRGVjazogKEdhbWVGYWN0b3J5KSA9PiBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkKDApXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5tYWluJywge1xuICAgICAgICB1cmw6ICcvc2V0dXAtZ2FtZScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvbmV3LWdhbWUuaHRtbCcsXG4gICAgfSlcblxuICAgIC5zdGF0ZSgnbmV3LWdhbWUuYWRkLWRlY2tzJywge1xuICAgICAgICB1cmw6ICcvYWRkLWRlY2tzJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9hZGQtZGVja3MuaHRtbCcsXG4gICAgfSlcblxuICAgIC5zdGF0ZSgnbmV3LWdhbWUuZGVjaycsIHtcbiAgICAgICAgdXJsOiAnL2RlY2svOmRlY2tJZCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvZGVjay5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0RlY2tDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgY2FyZHM6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXRDYXJkc0J5RGVja0lkKCRzdGF0ZVBhcmFtcy5kZWNrSWQpXG4gICAgICAgIH1cblxuXG4gICAgfSlcblxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9uZXctZ2FtZS9zZXR1cC1nYW1lJyk7XG59KVxuXG5hcHAuY29udHJvbGxlcignTmV3R2FtZUN0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgJHN0YXRlLCB0ZWFtRGVja3MsIHN0YW5kYXJkRGVjaykgPT4ge1xuICAgICRzY29wZS5jdXJyZW50VmlldyA9ICdhZGREZWNrcydcbiAgICAkc2NvcGUuZ2FtZUNvbmZpZyA9IHt9O1xuICAgICRzY29wZS5nYW1lQ29uZmlnLmRlY2tzID0ge307XG4gICAgJHNjb3BlLmdvVG9EZWNrcyA9ICgpID0+IHtcbiAgICAgICAgJHN0YXRlLmdvKCduZXctZ2FtZS5hZGQtZGVja3MnLCB7fSwgeyBsb2NhdGlvbjogdHJ1ZSwgcmVsb2FkOiB0cnVlIH0pXG4gICAgfVxuXG4gICAgJHNjb3BlLmRlY2tzID0gc3RhbmRhcmREZWNrLmNvbmNhdCh0ZWFtRGVja3MpO1xuXG4gICAgJHNjb3BlLnN0YXJ0TmV3R2FtZSA9IChnYW1lQ29uZmlnKSA9PiB7XG4gICAgICAgIEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZShnYW1lQ29uZmlnKS50aGVuKChpZCkgPT4ge1xuICAgICAgICAgICAgR2FtZUZhY3RvcnkuYWRkUGlsZVRvR2FtZShpZCwgJHNjb3BlLmdhbWVDb25maWcuZGVja3MpXG5cbiAgICAgICAgICAgICRzdGF0ZS5nbygnaG9tZScpIC8vJ2dhbWUucHJlLWdhbWUnLCB7ICdnYW1lSWQnOiAxMDAgfVxuICAgICAgICB9KVxuICAgIH1cbiAgICAkc2NvcGUuYWRkRGVja3NUb0dhbWUgPSBHYW1lRmFjdG9yeS5hZGREZWNrcztcbiAgICAvLyAkc2NvcGUuJG9uKCdjaGFuZ2VkR2FtZScsIChldmVudCwgZGF0YSkgPT4ge1xuICAgIC8vICAgICBjb25zb2xlLmxvZygncmVjZWl2ZWQgZXZlbnQnKVxuICAgIC8vICAgICBjb25zb2xlLmxvZygnZGF0YSBvYmo6JywgZGF0YSlcbiAgICAvLyAgICAgJHNjb3BlLmdhbWUgPSBkYXRhO1xuICAgIC8vICAgICAkc2NvcGUuJGRpZ2VzdCgpXG5cbiAgICAvLyB9KVxuXG5cbn0pXG5cbmFwcC5jb250cm9sbGVyKCdEZWNrQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkc3RhdGUsIGNhcmRzKSA9PiB7XG4gICAgJHNjb3BlLmNhcmRzID0gY2FyZHNcbn0pXG5cbiIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCd0ZWFtLWdhbWVzJywge1xuXHRcdHVybDogJy90ZWFtLWdhbWVzJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL3RlYW0tZ2FtZXMvdGVhbS1nYW1lcy5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnVGVhbUdhbWVzQ3RybCcsXG5cdH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignVGVhbUdhbWVzQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkaW9uaWNQb3B1cCwgJHRpbWVvdXQsICRzdGF0ZSkgPT4ge1xuXHQgXG5cdCBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VGVhbUlkKCcxJylcblx0IFx0LnRoZW4oZ2FtZXMgPT4ge1xuXHQgXHRcdCRzY29wZS5nYW1lcyA9IGdhbWVzO1xuXHQgXHRcdCRzY29wZS4kZGlnZXN0KCk7XG5cdCBcdH0pXG5cblx0IFxuXHQgJHNjb3BlLiRvbignY2hhbmdlZEdhbWUnLCAoZXZlbnQsc25hcHNob3QpID0+e1xuXHQgXHQkc2NvcGUubmFtZT0gc25hcHNob3QubmFtZTtcblx0IFx0JHNjb3BlLiRkaWdlc3QoKTtcblx0IH0pXG5cblx0ICRzY29wZS5qb2luR2FtZSA9IEdhbWVGYWN0b3J5LmpvaW5HYW1lQnlJZDtcblxuXHQgJHNjb3BlLnNob3dQb3B1cCA9IGZ1bmN0aW9uIChnYW1lSWQpIHtcblx0ICAgICBcblx0ICAgICBjb25zdCBteVBvcHVwID0gJGlvbmljUG9wdXAuc2hvdyh7XG5cdCAgICAgXHR0ZW1wbGF0ZTogJzxwPkluZm9ybWF0aW9uPC9wPicsXG5cdCAgICAgXHR0aXRsZTogJ0dhbWUgSW5mb3JtYXRpb24nLFxuXHQgICAgIFx0c2NvcGU6ICRzY29wZSxcblx0ICAgICBcdGJ1dHRvbnM6IFtcblx0ICAgICBcdFx0e3RleHQ6ICdDYW5jZWwnfSxcblx0ICAgICBcdFx0e1xuXHQgICAgIFx0XHRcdHRleHQ6ICc8Yj5Kb2luPC9iPicsXG5cdCAgICAgXHRcdCBcdHR5cGU6ICdidXR0b24tcG9zaXRpdmUnLFxuXHQgICAgIFx0XHQgXHRvblRhcDogZSA9PiB7XG5cdCAgICAgXHRcdCBcdFx0Y29uc29sZS5sb2coZ2FtZUlkKTtcblx0ICAgICBcdFx0IFx0XHQkc2NvcGUuam9pbkdhbWUoZ2FtZUlkKTtcblx0ICAgICBcdFx0IFx0XHQkc3RhdGUuZ28oJ2dhbWUucHJlLWdhbWUnLCB7Z2FtZUlkOiBnYW1lSWR9KVxuXHQgICAgIFx0XHQgXHR9XG5cdCAgICAgXHRcdH1cblx0XHRcdF1cblx0ICAgIH0pXG5cdCB9XG59KVxuIiwiYXBwLmZhY3RvcnkoJ0dhbWVGYWN0b3J5JywgKCRodHRwLCAkcm9vdFNjb3BlLCAkbG9jYWxTdG9yYWdlLCAkcSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IEdhbWVGYWN0b3J5ID0ge307XG5cbiAgICAgICAgY29uc3QgaW5pdGlhbGl6ZUZpcmViYXNlID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgICAgICAgICAgIGFwaUtleTogXCJBSXphU3lELXREZXZYdmlweXVFNWx6aGVXQVJxNGh1dTFVbXFvSmtcIixcbiAgICAgICAgICAgICAgICBhdXRoRG9tYWluOiBcImNhcHN0b25lLWZiMGU4LmZpcmViYXNlYXBwLmNvbVwiLFxuICAgICAgICAgICAgICAgIGRhdGFiYXNlVVJMOiBcImh0dHBzOi8vY2Fwc3RvbmUtZmIwZTguZmlyZWJhc2Vpby5jb21cIixcbiAgICAgICAgICAgICAgICBzdG9yYWdlQnVja2V0OiBcImNhcHN0b25lLWZiMGU4LmFwcHNwb3QuY29tXCIsXG4gICAgICAgICAgICAgICAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiODQ5ODM5NjgwMTA3XCJcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmaXJlYmFzZS5pbml0aWFsaXplQXBwKGNvbmZpZyk7XG4gICAgICAgIH07XG4gICAgICAgIGluaXRpYWxpemVGaXJlYmFzZSgpO1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZSA9IChnYW1lQ29uZmlnKSA9PiB7XG4gICAgICAgICAgICAvL2NhbiBhbHNvIGdldCBhbGwgdGhlIGRlY2tzIGJ5IHRlYW0gaGVyZSB0byBwcmVwYXJlXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGhlIHNldHRpbmdzIGFyZTonLCBnYW1lQ29uZmlnKVxuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gJGxvY2FsU3RvcmFnZS50ZWFtLmlkIHx8IDI7XG4gICAgICAgICAgICBjb25zdCBjcmVhdG9ySWQgPSAkbG9jYWxTdG9yYWdlLnVzZXIuaWQgfHwgMztcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCdodHRwOi8vMTkyLjE2OC40LjIzNjoxMzM3L2FwaS9nYW1lcycsIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZ2FtZUNvbmZpZy5uYW1lIHx8ICdCb3JpbmcgTmFtZScsXG4gICAgICAgICAgICAgICAgICAgIHRlYW1JZDogdGVhbUlkLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdG9ySWQ6IGNyZWF0b3JJZCxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvck5hbWU6ICRsb2NhbFN0b3JhZ2UudXNlci5uYW1lIHx8ICdkYW4nLCAvL21pZ2h0IGJlIHVubmVjZXNzYXJ5IGlmIHdlIGhhdmUgdGhlIHVzZXIgaWRcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IGdhbWVDb25maWdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcbiAgICAgICAgICAgICAgICAudGhlbihnYW1lSWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYC90ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICAgICAgICAgICAgZ2FtZVJlZi5vbigndmFsdWUnLCBzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2NoYW5nZWRHYW1lJywgc25hcHNob3QudmFsKCkpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2FtZUlkO1xuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRDYXJkc0J5RGVja0lkID0gKGlkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vMTkyLjE2OC40LjIzNjoxMzM3L2FwaS9kZWNrcy8ke2lkfS9jYXJkc2ApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKTtcbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5hZGRQaWxlVG9HYW1lID0gKGdhbWVJZCwgZGVja3MpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRlY2tzQXJyID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBkZWNrSWQgaW4gZGVja3MpIHtcbiAgICAgICAgICAgICAgICBkZWNrc0Fyci5wdXNoKGRlY2tJZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3RoZSBwaWxlIGlzJywgZGVja3NBcnIpIC8vY3VycmVudGx5IGFkZHMgYWxsIGRlY2tzXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChgaHR0cDovLzE5Mi4xNjguNC4yMzY6MTMzNy9hcGkvZ2FtZXMvJHtnYW1lSWR9L2RlY2tzYCwgeyAnZGVja3MnOiBkZWNrc0FyciB9KVxuICAgICAgICB9XG5cblxuXG4gICAgICAgIC8vIEdhbWVGYWN0b3J5LmFkZERlY2tzVG9HYW1lID0gKGdhbWVJZCwgZGVja3MpID0+IHtcbiAgICAgICAgLy8gICAgIHJldHVybiAkaHR0cC5wb3N0KGBhcGkvZ2FtZXMvJHtnYW1lSWR9L2RlY2tzYCwgZGVja3MpXG5cbiAgICAgICAgLy8gICAgIC8vIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfS9waWxlL2ApXG4gICAgICAgIC8vICAgICAvLyBnYW1lUmVmLnNldCh7XG4gICAgICAgIC8vICAgICAvLyAgICAgZGVja0lkOiB0cnVlXG4gICAgICAgIC8vICAgICAvLyB9KVxuICAgICAgICAvLyB9XG4gICAgICAgIC8vIEdhbWVGYWN0b3J5LmdldENhcmRzQnlEZWNrSWQgPSAoZ2FtZUlkLCBkZWNrSWQpID0+IHtcbiAgICAgICAgLy8gICAgIGNvbnN0IHRlYW1JZCA9ICRsb2NhbFN0b3JhZ2UudGVhbS5pZDtcbiAgICAgICAgLy8gICAgIGxldCBwaWxlUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH0vcGlsZWApO1xuXG4gICAgICAgIC8vICAgICByZXR1cm4gJGh0dHAuZ2V0KGBhcGkvZGVja3MvJHtkZWNrSWR9L2NhcmRzYClcbiAgICAgICAgLy8gICAgICAgICAudGhlbihkYXRhID0+IHJlcy5kYXRhKVxuICAgICAgICAvLyAgICAgICAgIC50aGVuKGNhcmRzID0+IHtcbiAgICAgICAgLy8gICAgICAgICAgICAgY29uc3QgYWRkaW5nQ2FyZHMgPSBjYXJkcy5tYXAoY2FyZCA9PiBwaWxlUmVmLnNldCh7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBbYCR7Y2FyZC5pZH1gXTogdHJ1ZVxuICAgICAgICAvLyAgICAgICAgICAgICB9KSlcblxuICAgICAgICAvLyAgICAgICAgIH0pXG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyBHYW1lRmFjdG9yeS5hZGRQaWxlVG9HYW1lMiA9IChnYW1lSWQpID0+IHtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCdydW5uaWduIGFkZFBpbGVUb0dhbWUgd2l0aCBpZCcsIGdhbWVJZClcbiAgICAgICAgLy8gICAgIGNvbnN0IHRlYW1JZCA9ICRsb2NhbFN0b3JhZ2UudGVhbS5pZDtcbiAgICAgICAgLy8gICAgIGxldCBkZWNrUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH0vc2V0dGluZ3MvZGVja3NgKVxuXG4gICAgICAgIC8vICAgICBkZWNrUmVmLm9uY2UoJ3ZhbHVlJykudGhlbihzbmFwc2hvdCA9PiB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbnN0IGFkZGluZ0NhcmRzID0gW107XG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGUgdmFsdWUgaXNzc3MgJywgc25hcHNob3QudmFsKCkpXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hbGwgZGVjayBpZHNcbiAgICAgICAgLy8gICAgICAgICAgICAgZm9yICh2YXIgZGVja0lkIGluIHNuYXBzaG90LnZhbCgpKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxldCB4ID0gR2FtZUZhY3RvcnkuZ2V0Q2FyZHNCeURlY2tJZFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgYWRkaW5nQ2FyZHMucHVzaCgpXG4gICAgICAgIC8vICAgICAgICAgICAgIH1cblxuXG4gICAgICAgIC8vICAgICAgICAgICAgIF8ubWFwVmFsdWVzKHNuYXBzaG90LnZhbCgpLCB2ID0+IGRlY2tSZWYuc2V0KHtcblxuICAgICAgICAvLyAgICAgICAgICAgICB9KSlcblxuICAgICAgICAvLyAgICAgICAgICAgICBzbmFwc2hvdC52YWwoKVxuXG4gICAgICAgIC8vICAgICAgICAgICAgIF8ubWFwVmFsdWVzKHsgb25lOiAxLCB0d286IDIsIHRocmVlOiAzIH0sIHYgPT4gdiAqIDMpO1xuICAgICAgICAvLyAgICAgICAgIH0pXG4gICAgICAgIC8vIGxldCBwaWxlUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH0vcGlsZWApO1xuXG4gICAgICAgIC8vIHJldHVybiAkaHR0cC5nZXQoYGFwaS9kZWNrcy8ke2RlY2tJZH0vY2FyZHNgKVxuICAgICAgICAvLyAgICAgLnRoZW4oZGF0YSA9PiByZXMuZGF0YSlcbiAgICAgICAgLy8gICAgIC50aGVuKGNhcmRzID0+IHtcbiAgICAgICAgLy8gICAgICAgICBjb25zdCBhZGRpbmdDYXJkcyA9IGNhcmRzLm1hcChjYXJkID0+IHBpbGVSZWYuc2V0KHtcbiAgICAgICAgLy8gICAgICAgICAgICAgW2Ake2NhcmQuaWR9YF06IHRydWVcbiAgICAgICAgLy8gICAgICAgICB9KSlcblxuICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgLy8gfVxuXG5cbiAgICAgICAgR2FtZUZhY3Rvcnkuam9pbkdhbWVCeUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gMTtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllcklkID0gNDtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllck5hbWUgPSAnY2F0JztcbiAgICAgICAgICAgIGNvbnN0IHBsYXllclJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9L3BsYXllcnMvJHtwbGF5ZXJJZH1gKVxuICAgICAgICAgICAgcGxheWVyUmVmLnNldCh7XG4gICAgICAgICAgICAgICAgbmFtZTogcGxheWVyTmFtZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICBnYW1lUmVmLm9uKCd2YWx1ZScsIHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2NoYW5nZWRHYW1lJywgc25hcHNob3QudmFsKCkpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gR2FtZUZhY3RvcnkuY3JlYXRlR2FtZUJ5SWRGaXJlQmFzZSA9IChmaXJlYmFzZWdhbWVJZCkgPT4ge1xuICAgICAgICAvLyAgICAgLy9yZXR1cm4gJGh0dHAucG9zdChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9maXJlYmFzZS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAvLyAgICAgLy9uZWVkcyB0byBiZSAudGhlbmFibGVcbiAgICAgICAgLy8gICAgIGNvbnN0IG5ld1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBnYW1lcy8ke2ZpcmViYXNlZ2FtZUlkfWApLnB1c2goKTtcbiAgICAgICAgLy8gICAgIG5ld1JlZi5zZXQoe1xuICAgICAgICAvLyAgICAgICAgIHBsYXllcklkOiByZXEucXVlcnkucGxheWVySWRcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCA9IChpZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gKHR5cGVvZiBpZCAhPT0gJ251bWJlcicpID8gJGxvY2FsU3RvcmFnZS50ZWFtLmlkIDogaWQ7IC8vIGlkIHx8IGxvY2Fsc3RvcmFnZSBkb2Vzbid0IHdvcmsgYmVjYXVzZSAwIGlzIGZhbHNleVxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9kZWNrcz90ZWFtPSR7dGVhbUlkfWApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuXG4gICAgICAgIH07XG5cblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRVc2Vyc0J5R2FtZUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0vdXNlcnNgKTtcbiAgICAgICAgfTtcblxuXG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZUJ5R2FtZUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc3QgZGVmZXIgPSAkcS5kZWZlcigpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZ2FtZUlkKTtcbiAgICAgICAgICAgIGNvbnN0IHRlYW1JZCA9IDE7XG4gICAgICAgICAgICBjb25zdCBnYW1lc1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICAgIHJldHVybiBnYW1lc1JlZi5vbmNlKCd2YWx1ZScpLnRoZW4oc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdURVNUMycsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgIHJldHVybiBzbmFwc2hvdC52YWwoKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIC8vIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQgPSAodGVhbUlkKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGhlIHRlYW0gaXMgaWQnLCB0ZWFtSWQpXG5cbiAgICAgICAgICAgIGNvbnN0IGdhbWVzUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lc2ApXG4gICAgICAgICAgICByZXR1cm4gZ2FtZXNSZWYub25jZSgndmFsdWUnKS50aGVuKHNuYXBzaG90ID0+IHsgLy9taWdodCBicmVhayBhZnRlciB5b3UgZG8gaXQgb25jZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGUgdmFsIGlzJywgc25hcHNob3QudmFsKCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNuYXBzaG90LnZhbCgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VGVhbUlkID0gKHRlYW1JZCkgPT4ge1xuICAgICAgICAgICAgdGVhbUlkID0gdGVhbUlkIHx8ICRsb2NhbFN0b3JhZ2UudGVhbS5pZFxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZSB0ZWFtIGlzIGlkJywgdGVhbUlkKVxuICAgICAgICAgICAgY29uc3QgZGVmZXIgPSAkcS5kZWZlcigpO1xuXG4gICAgICAgICAgICBjb25zdCBnYW1lc1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXNgKVxuICAgICAgICAgICAgZ2FtZXNSZWYub24oJ3ZhbHVlJywgc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGUgdmFsIGlzJywgc25hcHNob3QudmFsKCkpXG4gICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZShzbmFwc2hvdC52YWwoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGVmZXIgcHJvbWlzZVwiLCBkZWZlci5wcm9taXNlKVxuICAgICAgICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XG4gICAgICAgIH07XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVVzZXIgPSAodXNlcklkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdodHRwOi8vbG9jYWxTdG9yYWdlOjEzMzcvYXBpL2dhbWVzLz91c2VySWQ9JyArIHVzZXJJZClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybiBHYW1lRmFjdG9yeTtcbiAgICB9XG5cbik7XG5cbiIsImFwcC5mYWN0b3J5KCdMb2dpbkZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCl7XG5cdHJldHVybiB7XG5cdFx0Z2V0U2xhY2tDcmVkczogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiAkaHR0cC5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvc2xhY2snKVx0XG5cdFx0XHRcdC50aGVuKHJlcyA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlcy5kYXRhXG5cdFx0XHRcdH0pXG5cdFx0fVxuXHR9XG59KVxuIiwiYXBwLmZhY3RvcnkoJ1VzZXJGYWN0b3J5JywgZnVuY3Rpb24oJGh0dHAsICRsb2NhbFN0b3JhZ2UsICR0aW1lb3V0LCAkc3RhdGUpe1xuXHRcblx0cmV0dXJuIHtcblx0XHRzZXRVc2VyOiBmdW5jdGlvbihpbmZvKXtcblx0XHRcdHJldHVybiAkaHR0cCh7XG5cdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdFx0XHR1cmw6ICdodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL3VzZXJzJyxcblx0XHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcblx0XHRcdFx0fSxcblx0XHRcdFx0ZGF0YTogaW5mb1xuXHRcdFx0fSlcblx0XHRcdC50aGVuKHJlcyA9PiB7XG5cdFx0XHRcdHRoaXMuc2V0TG9jYWxTdG9yYWdlKHJlcy5kYXRhLnVzZXJbMF0sIHJlcy5kYXRhLnRlYW1bMF0pO1xuXHRcdFx0fSlcblx0XHR9LFxuXG5cdFx0Z2V0U2xhY2tJbmZvOiBmdW5jdGlvbigpe1xuXHRcdFx0cmV0dXJuICRodHRwLmdldCgnaHR0cHM6Ly9zbGFjay5jb20vYXBpL3VzZXJzLmlkZW50aXR5Jylcblx0XHR9LFxuXG5cdFx0c2V0TG9jYWxTdG9yYWdlOiBmdW5jdGlvbih1c2VyLCB0ZWFtKXtcblx0XHRcdCRsb2NhbFN0b3JhZ2UudXNlciA9IHVzZXI7XG5cdFx0XHQkbG9jYWxTdG9yYWdlLnRlYW0gPSB0ZWFtO1xuXHRcdH0sXG5cblx0XHRsb2dPdXQ6IGZ1bmN0aW9uKCl7XG5cdFx0XHQkbG9jYWxTdG9yYWdlLiRyZXNldCgpO1xuXHRcdH1cblx0fVxufSkiLCIvL0RpcmVjdGl2ZSBGaWxlIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
