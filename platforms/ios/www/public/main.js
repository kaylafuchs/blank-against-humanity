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
        url: '/game/:gameId',
        abstract: true,
        templateUrl: 'js/game/game.html',
        controller: 'GameCtrl',
        resolve: {
            game: function game(GameFactory, $stateParams) {
                return GameFactory.getGameByGameId($stateParams.gameId);
            }
        }
    }).state('game.active-game', {
        url: '/active-game',
        templateUrl: 'js/game/active-game.html',
        controller: 'ActiveGameCtrl',
        resolve: {
            game: function game(GameFactory, $stateParams) {
                return GameFactory.getGameByGameId($stateParams.gameId);
            }
        }
    }).state('game.submission-game', {
        url: '/submission-game',
        templateUrl: 'js/game/submission-game.html',
        controller: 'SubmissionGameCtrl'
    });
});

app.controller('GameCtrl', function ($scope, GameFactory, $stateParams, $localStorage, game) {

    $scope.gameId = $stateParams.gameId;
    $scope.playerId = $localStorage.user.id;
    $scope.teamId = $localStorage.team.id;
    $scope.game = game;
    $scope.gameName = $scope.game.settings.name;
    $scope.whiteCards = $scope.game.players[$scope.playerId].hand;
    $scope.showCards = false;
    $scope.playerCount = Object.keys($scope.game.players).length;
});

app.controller("ActiveGameCtrl", function ($scope, GameFactory, ActiveGameFactory, game, $stateParams, $localStorage, $state) {

    $scope.onSwipeDown = function () {
        console.log('working');
        console.log($scope.showCards);
        $scope.showCards = true;
        console.log($scope.showCards);
        $scope.$evalAsync();
    };

    $scope.onSwipeUp = function () {
        console.log("swiped up");
    };

    ActiveGameFactory.refillMyHand($scope.gameId, $scope.playerId, $scope.teamId);

    $scope.$on('changedGame', function (event, snapshot) {
        $scope.game = snapshot;
        console.log($scope.game);
        if (game.state === 'submission') {
            $state.go('game.submission-game');
        }
    });
});

app.controller('SubmissionGameCtrl', function ($scope, $localStorage) {
    $scope.$on('changedGame', function (event, snapshot) {
        $scope.game = snapshot;
    });

    $scope.judge = $scope.game.players[$scope.game.currentJudge].name;
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
            GameFactory.addPileToGame(id, $scope.gameConfig.decks);
            $state.go('game.active-game', { gameId: id });
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
            apiKey: "AIzaSyCihSNkUl_O-xuzVrLZFz_mZJAGcwqJcdE",
            authDomain: "blankagainsthumanity-a3e7c.firebaseapp.com",
            databaseURL: "https://blankagainsthumanity-a3e7c.firebaseio.com",
            storageBucket: "blankagainsthumanity-a3e7c.appspot.com",
            messagingSenderId: "647415099169"
        };
        firebase.initializeApp(config);
    };
    initializeFirebase();

    GameFactory.startNewGame = function (gameConfig) {
        //can also get all the decks by team here to prepare
        console.log('the settings are:', gameConfig);
        var teamId = $localStorage.team.id || 2;
        var creatorId = $localStorage.user.id || 3;
        return $http.post('http://192.168.1.48:1337/api/games', {
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
        return $http.get('http://192.168.1.48:1337/api/decks/' + id + '/cards').then(function (res) {
            return res.data;
        });
    };

    GameFactory.addPileToGame = function (gameId, decks) {
        var decksArr = [];
        for (var deckId in decks) {
            decksArr.push(deckId);
        }
        //console.log('the pile is', decksArr) //currently adds all decks
        return $http.post('http://192.168.1.48:1337/api/games/' + gameId + '/decks', { 'decks': decksArr });
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
        return $http.get('http://192.168.1.48:1337/api/decks?team=' + teamId).then(function (res) {
            return res.data;
        });
    };

    GameFactory.getUsersByGameId = function (gameId) {
        return $http.get('http://192.168.1.48:1337/api/games/' + gameId + '/users');
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
        return $http.get('http://192.168.1.48:1337/api/games/?userId=' + userId).then(function (res) {
            return res.data;
        });
    };

    GameFactory.addPileToGame = function (gameId, decks) {
        var decksArr = [];
        for (var deckId in decks) {
            decksArr.push(deckId);
        }
        //console.log('the pile is', decksArr) //currently adds all decks
        return $http.post('http://192.168.1.48:1337/api/games/' + gameId + '/decks', { 'decks': decksArr });
    };

    return GameFactory;
});

app.factory('LoginFactory', function ($http) {
    return {
        getSlackCreds: function getSlackCreds() {
            return $http.get('http://192.168.1.48:1337/api/slack').then(function (res) {
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
                url: 'http://192.168.1.48:1337/api/users',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImNhcmRzLXRlc3QvY2FyZHNUZXN0LmpzIiwiZGVja3MvZGVja3MuanMiLCJmcm9tIGZzZy9mcm9tLWZzZy5qcyIsImdhbWUvZ2FtZS5qcyIsImhvbWUvaG9tZS5qcyIsImxvZ2luL2xvZ2luLmpzIiwibmV3LWdhbWUvbmV3LWdhbWUuanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiLCJjb21tb24vZmFjdG9yaWVzL0FjdGl2ZUdhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9HYW1lRmFjdG9yeS5qcyIsImNvbW1vbi9mYWN0b3JpZXMvbG9naW5GYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy91c2VyRmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJhcHAiLCJhbmd1bGFyIiwibW9kdWxlIiwicnVuIiwiJGlvbmljUGxhdGZvcm0iLCJyZWFkeSIsImNvcmRvdmEiLCJwbHVnaW5zIiwiS2V5Ym9hcmQiLCJoaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIiLCJkaXNhYmxlU2Nyb2xsIiwiU3RhdHVzQmFyIiwic3R5bGVMaWdodENvbnRlbnQiLCJjb250cm9sbGVyIiwiJHNjb3BlIiwiVXNlckZhY3RvcnkiLCIkc3RhdGUiLCIkbG9jYWxTdG9yYWdlIiwiJHRpbWVvdXQiLCJsb2dPdXQiLCJnbyIsImNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwic3RhdGUiLCJ1cmwiLCJ0ZW1wbGF0ZVVybCIsImdyZWV0aW5nIiwicmVzb2x2ZSIsImRlY2tzIiwiR2FtZUZhY3RvcnkiLCIkc3RhdGVQYXJhbXMiLCJnZXREZWNrc0J5VGVhbUlkIiwic3RhdGVQYXJhbXMiLCJ0ZWFtSWQiLCJhYnN0cmFjdCIsImdhbWUiLCJnZXRHYW1lQnlHYW1lSWQiLCJnYW1lSWQiLCJwbGF5ZXJJZCIsInVzZXIiLCJpZCIsInRlYW0iLCJnYW1lTmFtZSIsInNldHRpbmdzIiwibmFtZSIsIndoaXRlQ2FyZHMiLCJwbGF5ZXJzIiwiaGFuZCIsInNob3dDYXJkcyIsInBsYXllckNvdW50IiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsIkFjdGl2ZUdhbWVGYWN0b3J5Iiwib25Td2lwZURvd24iLCJjb25zb2xlIiwibG9nIiwiJGV2YWxBc3luYyIsIm9uU3dpcGVVcCIsInJlZmlsbE15SGFuZCIsIiRvbiIsImV2ZW50Iiwic25hcHNob3QiLCJqdWRnZSIsImN1cnJlbnRKdWRnZSIsIiR1cmxSb3V0ZXJQcm92aWRlciIsImdhbWVzIiwiZ2V0R2FtZXNCeVRlYW1JZCIsIiRjb3Jkb3ZhT2F1dGgiLCIkaW9uaWNQb3B1cCIsInN0YXJ0TmV3R2FtZSIsInN0b3JhZ2UiLCJKU09OIiwic3RyaW5naWZ5IiwiZ29Ub05ld0dhbWUiLCJqb2luR2FtZSIsImpvaW5HYW1lQnlJZCIsInNob3dQb3B1cCIsIndhaXRpbmdGb3JQbGF5ZXJzIiwibWluUGxheWVycyIsIm15UG9wdXAiLCJzaG93IiwidGl0bGUiLCJzY29wZSIsImJ1dHRvbnMiLCJ0ZXh0IiwidHlwZSIsIm9uVGFwIiwib3RoZXJ3aXNlIiwiTG9naW5GYWN0b3J5IiwiJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZSIsImxvZ2luV2l0aFNsYWNrIiwiZ2V0U2xhY2tDcmVkcyIsInRoZW4iLCJzbGFjayIsImNyZWRzIiwiY2xpZW50SUQiLCJjbGllbnRTZWNyZXQiLCJzZXRVc2VyIiwiaW5mbyIsImNhbkRyYWdDb250ZW50IiwicmVkaXJlY3RVc2VyIiwidGVhbURlY2tzIiwic3RhbmRhcmREZWNrIiwiY2FyZHMiLCJnZXRDYXJkc0J5RGVja0lkIiwiZGVja0lkIiwiY3VycmVudFZpZXciLCJnYW1lQ29uZmlnIiwiZ29Ub0RlY2tzIiwibG9jYXRpb24iLCJyZWxvYWQiLCJjb25jYXQiLCJhZGRQaWxlVG9HYW1lIiwiYWRkRGVja3NUb0dhbWUiLCJhZGREZWNrcyIsImZhY3RvcnkiLCIkaHR0cCIsIiRyb290U2NvcGUiLCJyZWZpbGxlciIsImNhcmRzTmVlZGVkIiwicGlsZVJlZiIsImhhbmRSZWYiLCJsaW1pdFRvRmlyc3QiLCJvbmNlIiwiY2FyZHNTbmFwc2hvdCIsImZvckVhY2giLCJ1cGRhdGVPYmoiLCJjYXJkIiwicmVmIiwidHJhbnNhY3Rpb24iLCJrZXkiLCJjYXJkRGF0YSIsInVwZGF0ZSIsImNhdGNoIiwiZXJyIiwiZ2FtZVJlZiIsImZpcmViYXNlIiwiZGF0YWJhc2UiLCJjaGlsZCIsImhhbmRTbmFwc2hvdCIsIm51bUNoaWxkcmVuIiwic3VibWl0V2hpdGVDYXJkIiwiY2FyZElkIiwiY2FyZFRvU3VibWl0Iiwic3VibWl0UmVmIiwiZmlyZWJhc2VNb3ZlU2luZ2xlS2V5VmFsdWUiLCJzZXQiLCJzdWJtaXR0ZWRCeSIsIiRxIiwiaW5pdGlhbGl6ZUZpcmViYXNlIiwiYXBpS2V5IiwiYXV0aERvbWFpbiIsImRhdGFiYXNlVVJMIiwic3RvcmFnZUJ1Y2tldCIsIm1lc3NhZ2luZ1NlbmRlcklkIiwiaW5pdGlhbGl6ZUFwcCIsImNyZWF0b3JJZCIsInBvc3QiLCJjcmVhdG9yTmFtZSIsInJlcyIsImRhdGEiLCJvbiIsIiRicm9hZGNhc3QiLCJ2YWwiLCJnZXQiLCJkZWNrc0FyciIsInB1c2giLCJwbGF5ZXJOYW1lIiwicGxheWVyUmVmIiwiZ2V0VXNlcnNCeUdhbWVJZCIsImdhbWVzUmVmIiwiZGVmZXIiLCJwcm9taXNlIiwiZ2V0R2FtZXNCeVVzZXIiLCJ1c2VySWQiLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0TG9jYWxTdG9yYWdlIiwiZ2V0U2xhY2tJbmZvIiwiJHJlc2V0Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBQSxPQUFBQyxHQUFBLEdBQUFDLFFBQUFDLE1BQUEsQ0FBQSxzQkFBQSxFQUFBLENBQUEsT0FBQSxFQUFBLFdBQUEsRUFBQSxXQUFBLEVBQUEsZ0JBQUEsRUFBQSxXQUFBLEVBQUEsY0FBQSxDQUFBLENBQUE7O0FBRUFGLElBQUFHLEdBQUEsQ0FBQSxVQUFBQyxjQUFBLEVBQUE7QUFDQUEsbUJBQUFDLEtBQUEsQ0FBQSxZQUFBO0FB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QUFBLFVBQUFDLEtBQUEsRUFBQTtBQUNBLFdBQUE7QUFDQXpCLHVCQUFBLHlCQUFBO0FBQ0EsbUJBQUF5QixNQUFBZ0QsR0FBQSxDQUFBLG9DQUFBLEVBQ0F4RSxJQURBLENBQ0EsZUFBQTtBQUNBLHVCQUFBbUUsSUFBQUMsSUFBQTtBQUNBLGFBSEEsQ0FBQTtBQUlBO0FBTkEsS0FBQTtBQVFBLENBVEE7O0FDQUFqSyxJQUFBb0gsT0FBQSxDQUFBLGFBQUEsRUFBQSxVQUFBQyxLQUFBLEVBQUFwRyxhQUFBLEVBQUFDLFFBQUEsRUFBQUYsTUFBQSxFQUFBOztBQUVBLFdBQUE7QUFDQWtGLGlCQUFBLGlCQUFBQyxJQUFBLEVBQUE7QUFBQTs7QUFDQSxtQkFBQWtCLE1BQUE7QUFDQTJELHdCQUFBLE1BREE7QUFFQXhKLHFCQUFBLG9DQUZBO0FBR0F5Six5QkFBQTtBQUNBLG9DQUFBO0FBREEsaUJBSEE7QUFNQWhCLHNCQUFBOUQ7QUFOQSxhQUFBLEVBUUFOLElBUkEsQ0FRQSxlQUFBO0FBQ0Esc0JBQUFxRixlQUFBLENBQUFsQixJQUFBQyxJQUFBLENBQUExSCxJQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUF5SCxJQUFBQyxJQUFBLENBQUF4SCxJQUFBLENBQUEsQ0FBQSxDQUFBO0FBQ0EsYUFWQSxDQUFBO0FBV0EsU0FiQTs7QUFlQTBJLHNCQUFBLHdCQUFBO0FBQ0EsbUJBQUE5RCxNQUFBZ0QsR0FBQSxDQUFBLHNDQUFBLENBQUE7QUFDQSxTQWpCQTs7QUFtQkFhLHlCQUFBLHlCQUFBM0ksSUFBQSxFQUFBRSxJQUFBLEVBQUE7QUFDQXhCLDBCQUFBc0IsSUFBQSxHQUFBQSxJQUFBO0FBQ0F0QiwwQkFBQXdCLElBQUEsR0FBQUEsSUFBQTtBQUNBLFNBdEJBOztBQXdCQXRCLGdCQUFBLGtCQUFBO0FBQ0FGLDBCQUFBbUssTUFBQTtBQUNBO0FBMUJBLEtBQUE7QUE0QkEsQ0E5QkEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIElvbmljIFN0YXJ0ZXIgQXBwXG5cbi8vIGFuZ3VsYXIubW9kdWxlIGlzIGEgZ2xvYmFsIHBsYWNlIGZvciBjcmVhdGluZywgcmVnaXN0ZXJpbmcgYW5kIHJldHJpZXZpbmcgQW5ndWxhciBtb2R1bGVzXG4vLyAnc3RhcnRlcicgaXMgdGhlIG5hbWUgb2YgdGhpcyBhbmd1bGFyIG1vZHVsZSBleGFtcGxlIChhbHNvIHNldCBpbiBhIDxib2R5PiBhdHRyaWJ1dGUgaW4gaW5kZXguaHRtbClcbi8vIHRoZSAybmQgcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9mICdyZXF1aXJlcydcbndpbmRvdy5hcHAgPSBhbmd1bGFyLm1vZHVsZSgnQmxhbmtBZ2FpbnN0SHVtYW5pdHknLCBbJ2lvbmljJywgJ3VpLnJvdXRlcicsJ25nQ29yZG92YScsJ25nQ29yZG92YU9hdXRoJywgJ25nU3RvcmFnZScsICd1aS5ib290c3RyYXAnXSlcblxuYXBwLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxuICAgICAgICAgICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcblxuICAgICAgICAgICAgLy8gRG9uJ3QgcmVtb3ZlIHRoaXMgbGluZSB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nLiBJdCBzdG9wcyB0aGUgdmlld3BvcnRcbiAgICAgICAgICAgIC8vIGZyb20gc25hcHBpbmcgd2hlbiB0ZXh0IGlucHV0cyBhcmUgZm9jdXNlZC4gSW9uaWMgaGFuZGxlcyB0aGlzIGludGVybmFsbHkgZm9yXG4gICAgICAgICAgICAvLyBhIG11Y2ggbmljZXIga2V5Ym9hcmQgZXhwZXJpZW5jZS5cbiAgICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5kaXNhYmxlU2Nyb2xsKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICAgICAgICBTdGF0dXNCYXIuc3R5bGVMaWdodENvbnRlbnQoKVxuICAgICAgICB9XG4gICAgfSk7XG5cbn0pXG4iLCJhcHAuY29udHJvbGxlcignTG9nb3V0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgVXNlckZhY3RvcnksICRzdGF0ZSwgJGxvY2FsU3RvcmFnZSwgJHRpbWVvdXQpe1xuXHQkc2NvcGUubG9nT3V0ID0gZnVuY3Rpb24oKXtcblx0XHRVc2VyRmFjdG9yeS5sb2dPdXQoKVxuXHRcdCRzdGF0ZS5nbygnbG9naW4nKVxuXHR9XG59KSIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpe1xuXHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnY2FyZHMnLCB7XG5cdFx0dXJsOiAnL2NhcmRzJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2NhcmRzLXRlc3QvY2FyZHMtdGVzdC5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnQ2FyZHNUZXN0Q3RybCdcblx0fSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdDYXJkc1Rlc3RDdHJsJywgZnVuY3Rpb24oJHNjb3BlKXtcbiBcdCRzY29wZS5ncmVldGluZyA9IFwiSElcIlxufSkiLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlcikgPT4ge1xuXHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnZGVja3MnLCB7XG5cdFx0dXJsOiAnZGVja3MvOnRlYW1pZCcsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9kZWNrcy9kZWNrcy5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnRGVja0N0cmwnLFxuXHRcdHJlc29sdmU6IHtcblx0XHRcdGRlY2tzOiAoR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcykgPT4gR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZChzdGF0ZVBhcmFtcy50ZWFtSWQpXG5cdFx0fVxuXHR9KVxuXG59KVxuXG5hcHAuY29udHJvbGxlcignRGVja0N0cmwnLCAoJHNjb3BlKSA9PiB7XG5cblxuXHRcbn0pIiwiLy8gKGZ1bmN0aW9uICgpIHtcblxuLy8gICAgICd1c2Ugc3RyaWN0JztcblxuLy8gICAgIC8vIEhvcGUgeW91IGRpZG4ndCBmb3JnZXQgQW5ndWxhciEgRHVoLWRveS5cbi8vICAgICBpZiAoIXdpbmRvdy5hbmd1bGFyKSB0aHJvdyBuZXcgRXJyb3IoJ0kgY2FuXFwndCBmaW5kIEFuZ3VsYXIhJyk7XG5cbi8vICAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2ZzYVByZUJ1aWx0JywgW10pO1xuXG4vLyAgICAgYXBwLmZhY3RvcnkoJ1NvY2tldCcsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgaWYgKCF3aW5kb3cuaW8pIHRocm93IG5ldyBFcnJvcignc29ja2V0LmlvIG5vdCBmb3VuZCEnKTtcbi8vICAgICAgICAgcmV0dXJuIHdpbmRvdy5pbyh3aW5kb3cubG9jYXRpb24ub3JpZ2luKTtcbi8vICAgICB9KTtcblxuLy8gICAgIC8vIEFVVEhfRVZFTlRTIGlzIHVzZWQgdGhyb3VnaG91dCBvdXIgYXBwIHRvXG4vLyAgICAgLy8gYnJvYWRjYXN0IGFuZCBsaXN0ZW4gZnJvbSBhbmQgdG8gdGhlICRyb290U2NvcGVcbi8vICAgICAvLyBmb3IgaW1wb3J0YW50IGV2ZW50cyBhYm91dCBhdXRoZW50aWNhdGlvbiBmbG93LlxuLy8gICAgIGFwcC5jb25zdGFudCgnQVVUSF9FVkVOVFMnLCB7XG4vLyAgICAgICAgIGxvZ2luU3VjY2VzczogJ2F1dGgtbG9naW4tc3VjY2VzcycsXG4vLyAgICAgICAgIGxvZ2luRmFpbGVkOiAnYXV0aC1sb2dpbi1mYWlsZWQnLFxuLy8gICAgICAgICBsb2dvdXRTdWNjZXNzOiAnYXV0aC1sb2dvdXQtc3VjY2VzcycsXG4vLyAgICAgICAgIHNlc3Npb25UaW1lb3V0OiAnYXV0aC1zZXNzaW9uLXRpbWVvdXQnLFxuLy8gICAgICAgICBub3RBdXRoZW50aWNhdGVkOiAnYXV0aC1ub3QtYXV0aGVudGljYXRlZCcsXG4vLyAgICAgICAgIG5vdEF1dGhvcml6ZWQ6ICdhdXRoLW5vdC1hdXRob3JpemVkJ1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLmZhY3RvcnkoJ0F1dGhJbnRlcmNlcHRvcicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkcSwgQVVUSF9FVkVOVFMpIHtcbi8vICAgICAgICAgdmFyIHN0YXR1c0RpY3QgPSB7XG4vLyAgICAgICAgICAgICA0MDE6IEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsXG4vLyAgICAgICAgICAgICA0MDM6IEFVVEhfRVZFTlRTLm5vdEF1dGhvcml6ZWQsXG4vLyAgICAgICAgICAgICA0MTk6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0LFxuLy8gICAgICAgICAgICAgNDQwOiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dFxuLy8gICAgICAgICB9O1xuLy8gICAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAgICAgcmVzcG9uc2VFcnJvcjogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KHN0YXR1c0RpY3RbcmVzcG9uc2Uuc3RhdHVzXSwgcmVzcG9uc2UpO1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzcG9uc2UpXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH07XG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuY29uZmlnKGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XG4vLyAgICAgICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goW1xuLy8gICAgICAgICAgICAgJyRpbmplY3RvcicsXG4vLyAgICAgICAgICAgICBmdW5jdGlvbiAoJGluamVjdG9yKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRpbmplY3Rvci5nZXQoJ0F1dGhJbnRlcmNlcHRvcicpO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICBdKTtcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5zZXJ2aWNlKCdBdXRoU2VydmljZScsIGZ1bmN0aW9uICgkaHR0cCwgU2Vzc2lvbiwgJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMsICRxKSB7XG5cbi8vICAgICAgICAgZnVuY3Rpb24gb25TdWNjZXNzZnVsTG9naW4ocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgIHZhciB1c2VyID0gcmVzcG9uc2UuZGF0YS51c2VyO1xuLy8gICAgICAgICAgICAgU2Vzc2lvbi5jcmVhdGUodXNlcik7XG4vLyAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoQVVUSF9FVkVOVFMubG9naW5TdWNjZXNzKTtcbi8vICAgICAgICAgICAgIHJldHVybiB1c2VyO1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgLy8gVXNlcyB0aGUgc2Vzc2lvbiBmYWN0b3J5IHRvIHNlZSBpZiBhblxuLy8gICAgICAgICAvLyBhdXRoZW50aWNhdGVkIHVzZXIgaXMgY3VycmVudGx5IHJlZ2lzdGVyZWQuXG4vLyAgICAgICAgIHRoaXMuaXNBdXRoZW50aWNhdGVkID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuICEhU2Vzc2lvbi51c2VyO1xuLy8gICAgICAgICB9O1xuXG4gICAgICAgIFxuLy8gICAgICAgICB0aGlzLmlzQWRtaW4gPSBmdW5jdGlvbih1c2VySWQpe1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ3J1bm5pbmcgYWRtaW4gZnVuYycpXG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpXG4vLyAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhLnVzZXIuaXNBZG1pbilcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIHRoaXMuZ2V0TG9nZ2VkSW5Vc2VyID0gZnVuY3Rpb24gKGZyb21TZXJ2ZXIpIHtcblxuLy8gICAgICAgICAgICAgLy8gSWYgYW4gYXV0aGVudGljYXRlZCBzZXNzaW9uIGV4aXN0cywgd2Vcbi8vICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgdXNlciBhdHRhY2hlZCB0byB0aGF0IHNlc3Npb25cbi8vICAgICAgICAgICAgIC8vIHdpdGggYSBwcm9taXNlLiBUaGlzIGVuc3VyZXMgdGhhdCB3ZSBjYW5cbi8vICAgICAgICAgICAgIC8vIGFsd2F5cyBpbnRlcmZhY2Ugd2l0aCB0aGlzIG1ldGhvZCBhc3luY2hyb25vdXNseS5cblxuLy8gICAgICAgICAgICAgLy8gT3B0aW9uYWxseSwgaWYgdHJ1ZSBpcyBnaXZlbiBhcyB0aGUgZnJvbVNlcnZlciBwYXJhbWV0ZXIsXG4vLyAgICAgICAgICAgICAvLyB0aGVuIHRoaXMgY2FjaGVkIHZhbHVlIHdpbGwgbm90IGJlIHVzZWQuXG5cbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlzQXV0aGVudGljYXRlZCgpICYmIGZyb21TZXJ2ZXIgIT09IHRydWUpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbihTZXNzaW9uLnVzZXIpO1xuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICAvLyBNYWtlIHJlcXVlc3QgR0VUIC9zZXNzaW9uLlxuLy8gICAgICAgICAgICAgLy8gSWYgaXQgcmV0dXJucyBhIHVzZXIsIGNhbGwgb25TdWNjZXNzZnVsTG9naW4gd2l0aCB0aGUgcmVzcG9uc2UuXG4vLyAgICAgICAgICAgICAvLyBJZiBpdCByZXR1cm5zIGEgNDAxIHJlc3BvbnNlLCB3ZSBjYXRjaCBpdCBhbmQgaW5zdGVhZCByZXNvbHZlIHRvIG51bGwuXG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbi8vICAgICAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5sb2dpbiA9IGZ1bmN0aW9uIChjcmVkZW50aWFscykge1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9sb2dpbicsIGNyZWRlbnRpYWxzKVxuLy8gICAgICAgICAgICAgICAgIC50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKVxuLy8gICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QoeyBtZXNzYWdlOiAnSW52YWxpZCBsb2dpbiBjcmVkZW50aWFscy4nfSk7XG4vLyAgICAgICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5zaWdudXAgPSBmdW5jdGlvbihjcmVkZW50aWFscyl7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuLy8gICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuLy8gICAgICAgICAgICAgICAgIHVybDogJy9zaWdudXAnLFxuLy8gICAgICAgICAgICAgICAgIGRhdGE6IGNyZWRlbnRpYWxzXG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5kYXRhKVxuLy8gICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKCl7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCh7bWVzc2FnZTogJ1RoYXQgZW1haWwgaXMgYWxyZWFkeSBiZWluZyB1c2VkLid9KTtcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5sb2dvdXQgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvbG9nb3V0JykudGhlbihmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgU2Vzc2lvbi5kZXN0cm95KCk7XG4vLyAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ291dFN1Y2Nlc3MpO1xuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5zZXJ2aWNlKCdTZXNzaW9uJywgZnVuY3Rpb24gKCRyb290U2NvcGUsIEFVVEhfRVZFTlRTKSB7XG5cbi8vICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4vLyAgICAgICAgICRyb290U2NvcGUuJG9uKEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCwgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgc2VsZi5kZXN0cm95KCk7XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XG5cbi8vICAgICAgICAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbiAodXNlcikge1xuLy8gICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgfSk7XG5cbi8vIH0oKSk7XG4iLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlcikgPT4ge1xuXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2dhbWUnLCB7XG4gICAgICAgIHVybDogJy9nYW1lLzpnYW1lSWQnLFxuICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL2dhbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdHYW1lQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGdhbWUgOiAoR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcykgPT4gR2FtZUZhY3RvcnkuZ2V0R2FtZUJ5R2FtZUlkKCRzdGF0ZVBhcmFtcy5nYW1lSWQpXG4gICAgICAgIH0gIFxuICAgIH0pXG4gICAgLnN0YXRlKCdnYW1lLmFjdGl2ZS1nYW1lJywge1xuICAgICAgICB1cmw6ICcvYWN0aXZlLWdhbWUnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2dhbWUvYWN0aXZlLWdhbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdBY3RpdmVHYW1lQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGdhbWUgOiAoR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcykgPT4gR2FtZUZhY3RvcnkuZ2V0R2FtZUJ5R2FtZUlkKCRzdGF0ZVBhcmFtcy5nYW1lSWQpXG4gICAgICAgIH0gICAgXG4gICAgfSlcbiAgICAuc3RhdGUoJ2dhbWUuc3VibWlzc2lvbi1nYW1lJywge1xuICAgICAgICB1cmw6ICcvc3VibWlzc2lvbi1nYW1lJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL3N1Ym1pc3Npb24tZ2FtZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ1N1Ym1pc3Npb25HYW1lQ3RybCdcbiAgICB9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0dhbWVDdHJsJywgKCRzY29wZSwgR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcywgJGxvY2FsU3RvcmFnZSwgZ2FtZSkgPT4geyAgIFxuXG4gICAgJHNjb3BlLmdhbWVJZCA9ICRzdGF0ZVBhcmFtcy5nYW1lSWQ7XG4gICAgJHNjb3BlLnBsYXllcklkID0gJGxvY2FsU3RvcmFnZS51c2VyLmlkO1xuICAgICRzY29wZS50ZWFtSWQgPSAkbG9jYWxTdG9yYWdlLnRlYW0uaWRcbiAgICAkc2NvcGUuZ2FtZSA9IGdhbWU7XG4gICAgJHNjb3BlLmdhbWVOYW1lID0gJHNjb3BlLmdhbWUuc2V0dGluZ3MubmFtZTtcbiAgICAkc2NvcGUud2hpdGVDYXJkcyA9ICRzY29wZS5nYW1lLnBsYXllcnNbJHNjb3BlLnBsYXllcklkXS5oYW5kO1xuICAgICRzY29wZS5zaG93Q2FyZHMgPSBmYWxzZTtcbiAgICAkc2NvcGUucGxheWVyQ291bnQgPSBPYmplY3Qua2V5cygkc2NvcGUuZ2FtZS5wbGF5ZXJzKS5sZW5ndGg7XG4gICAgICBcbn0pXG5cbmFwcC5jb250cm9sbGVyKFwiQWN0aXZlR2FtZUN0cmxcIiwgKCRzY29wZSwgR2FtZUZhY3RvcnksIEFjdGl2ZUdhbWVGYWN0b3J5LCBnYW1lLCAkc3RhdGVQYXJhbXMsICRsb2NhbFN0b3JhZ2UsICRzdGF0ZSkgPT4ge1xuXG4gICAgXG4gICAgJHNjb3BlLm9uU3dpcGVEb3duID0gKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnd29ya2luZycpO1xuICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuc2hvd0NhcmRzKTtcbiAgICAgICAgJHNjb3BlLnNob3dDYXJkcyA9IHRydWUgO1xuICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuc2hvd0NhcmRzKTtcbiAgICAgICAgJHNjb3BlLiRldmFsQXN5bmMoKTtcbiAgICB9XG5cbiAgICAkc2NvcGUub25Td2lwZVVwID0gKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcInN3aXBlZCB1cFwiKTtcbiAgICB9XG5cbiAgICBBY3RpdmVHYW1lRmFjdG9yeS5yZWZpbGxNeUhhbmQoJHNjb3BlLmdhbWVJZCwgJHNjb3BlLnBsYXllcklkLCAkc2NvcGUudGVhbUlkKTtcblxuICAgICRzY29wZS4kb24oJ2NoYW5nZWRHYW1lJywgKGV2ZW50LHNuYXBzaG90KSA9PntcbiAgICAgICAgJHNjb3BlLmdhbWUgPSBzbmFwc2hvdDtcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmdhbWUpO1xuICAgICAgICBpZihnYW1lLnN0YXRlID09PSAnc3VibWlzc2lvbicpe1xuICAgICAgICAgICAgJHN0YXRlLmdvKCdnYW1lLnN1Ym1pc3Npb24tZ2FtZScpXG4gICAgICAgIH0gXG4gICAgfSlcblxuICBcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdTdWJtaXNzaW9uR2FtZUN0cmwnLCAoJHNjb3BlLCAkbG9jYWxTdG9yYWdlKSA9PiB7XG4gICAgJHNjb3BlLiRvbignY2hhbmdlZEdhbWUnLCAoZXZlbnQsc25hcHNob3QpID0+e1xuICAgICAgICAkc2NvcGUuZ2FtZSA9IHNuYXBzaG90O1xuICAgIH0pXG5cbiAgICRzY29wZS5qdWRnZSA9ICRzY29wZS5nYW1lLnBsYXllcnNbJHNjb3BlLmdhbWUuY3VycmVudEp1ZGdlXS5uYW1lXG59KVxuXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgdXJsOiAnLycsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvaG9tZS9ob21lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnSG9tZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBnYW1lczogZnVuY3Rpb24oR2FtZUZhY3RvcnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUsICRjb3Jkb3ZhT2F1dGgsIFVzZXJGYWN0b3J5LCBHYW1lRmFjdG9yeSwgJGxvY2FsU3RvcmFnZSwgZ2FtZXMsICRpb25pY1BvcHVwKSB7XG4gICAgJHNjb3BlLnN0YXJ0TmV3R2FtZSA9IEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZTtcbiAgICAkc2NvcGUuc3RvcmFnZSA9ICRsb2NhbFN0b3JhZ2U7XG4gICAgJHNjb3BlLmdhbWVzID0gZ2FtZXM7XG5cbiAgICBjb25zb2xlLmxvZyhcImdhbWVzXCIsIEpTT04uc3RyaW5naWZ5KCRzY29wZS5nYW1lcykpXG4gICAgJHNjb3BlLmdvVG9OZXdHYW1lID0gKCkgPT4ge1xuICAgICAgICAkc3RhdGUuZ28oJ25ldy1nYW1lLm1haW4nKVxuICAgIH1cblxuXG4gICAgJHNjb3BlLmpvaW5HYW1lID0gR2FtZUZhY3Rvcnkuam9pbkdhbWVCeUlkO1xuXG4gICAgJHNjb3BlLnNob3dQb3B1cCA9IGZ1bmN0aW9uKGdhbWVJZCkge1xuXG4gICAgICAgICRzY29wZS5nYW1lID0gJHNjb3BlLmdhbWVzW2dhbWVJZF07XG4gICAgICAgICRzY29wZS5nYW1lTmFtZSA9ICRzY29wZS5nYW1lLnNldHRpbmdzLm5hbWU7XG4gICAgICAgICRzY29wZS5wbGF5ZXJDb3VudCA9IE9iamVjdC5rZXlzKCRzY29wZS5nYW1lLnBsYXllcnMpLmxlbmd0aDtcbiAgICAgICAgJHNjb3BlLndhaXRpbmdGb3JQbGF5ZXJzID0gICgkc2NvcGUuZ2FtZS5zZXR0aW5ncy5taW5QbGF5ZXJzIHx8IDQpIC0gJHNjb3BlLnBsYXllckNvdW50O1xuICAgICAgICAgXG4gICAgICAgICBjb25zdCBteVBvcHVwID0gJGlvbmljUG9wdXAuc2hvdyh7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2hvbWUvcG9wdXAuaHRtbCcsXG4gICAgICAgICAgICB0aXRsZTogJ0pvaW4gJyArICRzY29wZS5nYW1lTmFtZSxcbiAgICAgICAgICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgICAgICAgICBidXR0b25zOiBcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICB7dGV4dDogJ0dvIGJhY2snfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdKb2luIGdhbWUnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYnV0dG9uLWJhbGFuY2VkJyxcbiAgICAgICAgICAgICAgICAgICAgb25UYXA6IGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmpvaW5HYW1lKGdhbWVJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2dhbWUuYWN0aXZlLWdhbWUnLCB7IGdhbWVJZDogZ2FtZUlkIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pXG4gICAgfVxufSlcblxuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKXtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2xvZ2luJywge1xuXHRcdHVybDogJy9sb2dpbicsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9sb2dpbi9sb2dpbi5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnTG9naW5DdHJsJ1xuXHR9KVxuXHQkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvbG9naW4nKTtcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdMb2dpbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSwgTG9naW5GYWN0b3J5LCBVc2VyRmFjdG9yeSwgJGNvcmRvdmFPYXV0aCwgJGxvY2FsU3RvcmFnZSwgJHRpbWVvdXQsICRpb25pY1NpZGVNZW51RGVsZWdhdGUpe1xuIFx0JHNjb3BlLmxvZ2luV2l0aFNsYWNrID0gZnVuY3Rpb24oKXtcbiBcdFx0cmV0dXJuIExvZ2luRmFjdG9yeS5nZXRTbGFja0NyZWRzKClcbiBcdFx0LnRoZW4oY3JlZHMgPT57XG4gXHRcdFx0cmV0dXJuICRjb3Jkb3ZhT2F1dGguc2xhY2soY3JlZHMuY2xpZW50SUQsIGNyZWRzLmNsaWVudFNlY3JldCwgWydpZGVudGl0eS5iYXNpYycsICdpZGVudGl0eS50ZWFtJywgJ2lkZW50aXR5LmF2YXRhciddKVxuIFx0XHR9KVxuIFx0XHQudGhlbihpbmZvID0+IFVzZXJGYWN0b3J5LnNldFVzZXIoaW5mbykpXG4gXHRcdC50aGVuKCgpID0+ICRzdGF0ZS5nbygnaG9tZScpKVxuIFx0fVxuXG4gXHQkaW9uaWNTaWRlTWVudURlbGVnYXRlLmNhbkRyYWdDb250ZW50KGZhbHNlKTtcblxuIFx0JHNjb3BlLiRvbignJGlvbmljVmlldy5sZWF2ZScsIGZ1bmN0aW9uICgpIHsgJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZS5jYW5EcmFnQ29udGVudCh0cnVlKSB9KTtcblxuIFx0JHNjb3BlLnN0b3JhZ2UgPSAkbG9jYWxTdG9yYWdlXG5cbiBcdGZ1bmN0aW9uIHJlZGlyZWN0VXNlcigpe1xuIFx0XHRjb25zb2xlLmxvZyhcInNjb3BlIHN0b3JhZ2UgdXNlclwiLCAkc2NvcGUuc3RvcmFnZS51c2VyKVxuIFx0XHRpZiAoJHNjb3BlLnN0b3JhZ2UudXNlcikgJHN0YXRlLmdvKCdob21lJylcbiBcdH1cblxuXHRyZWRpcmVjdFVzZXIoKTtcbn0pIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikgPT4ge1xuXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ25ldy1nYW1lJywge1xuICAgICAgICB1cmw6ICcvbmV3LWdhbWUnLFxuICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9tYWluLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnTmV3R2FtZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICB0ZWFtRGVja3M6IChHYW1lRmFjdG9yeSkgPT4gR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCgpLFxuICAgICAgICAgICAgc3RhbmRhcmREZWNrOiAoR2FtZUZhY3RvcnkpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoMClcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ25ldy1nYW1lLm1haW4nLCB7XG4gICAgICAgIHVybDogJy9zZXR1cC1nYW1lJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9uZXctZ2FtZS5odG1sJyxcbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5hZGQtZGVja3MnLCB7XG4gICAgICAgIHVybDogJy9hZGQtZGVja3MnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL2FkZC1kZWNrcy5odG1sJyxcbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5kZWNrJywge1xuICAgICAgICB1cmw6ICcvZGVjay86ZGVja0lkJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9kZWNrLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnRGVja0N0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBjYXJkczogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldENhcmRzQnlEZWNrSWQoJHN0YXRlUGFyYW1zLmRlY2tJZClcbiAgICAgICAgfVxuXG5cbiAgICB9KVxuXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL25ldy1nYW1lL3NldHVwLWdhbWUnKTtcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdOZXdHYW1lQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkc3RhdGUsIHRlYW1EZWNrcywgc3RhbmRhcmREZWNrKSA9PiB7XG4gICAgJHNjb3BlLmN1cnJlbnRWaWV3ID0gJ2FkZERlY2tzJ1xuICAgICRzY29wZS5nYW1lQ29uZmlnID0ge307XG4gICAgJHNjb3BlLmdhbWVDb25maWcuZGVja3MgPSB7fTtcbiAgICAkc2NvcGUuZ29Ub0RlY2tzID0gKCkgPT4ge1xuICAgICAgICAkc3RhdGUuZ28oJ25ldy1nYW1lLmFkZC1kZWNrcycsIHt9LCB7IGxvY2F0aW9uOiB0cnVlLCByZWxvYWQ6IHRydWUgfSlcbiAgICB9XG5cbiAgICAkc2NvcGUuZGVja3MgPSBzdGFuZGFyZERlY2suY29uY2F0KHRlYW1EZWNrcyk7XG5cbiAgICAkc2NvcGUuc3RhcnROZXdHYW1lID0gKGdhbWVDb25maWcpID0+IHtcbiAgICAgICAgR2FtZUZhY3Rvcnkuc3RhcnROZXdHYW1lKGdhbWVDb25maWcpLnRoZW4oKGlkKSA9PiB7XG4gICAgICAgICAgICBHYW1lRmFjdG9yeS5hZGRQaWxlVG9HYW1lKGlkLCAkc2NvcGUuZ2FtZUNvbmZpZy5kZWNrcylcbiAgICAgICAgICAgICRzdGF0ZS5nbygnZ2FtZS5hY3RpdmUtZ2FtZScsIHtnYW1lSWQ6IGlkfSkgXG5cbiAgICAgICAgfSlcbiAgICB9XG4gICAgJHNjb3BlLmFkZERlY2tzVG9HYW1lID0gR2FtZUZhY3RvcnkuYWRkRGVja3M7XG4gICAgLy8gJHNjb3BlLiRvbignY2hhbmdlZEdhbWUnLCAoZXZlbnQsIGRhdGEpID0+IHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ3JlY2VpdmVkIGV2ZW50JylcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ2RhdGEgb2JqOicsIGRhdGEpXG4gICAgLy8gICAgICRzY29wZS5nYW1lID0gZGF0YTtcbiAgICAvLyAgICAgJHNjb3BlLiRkaWdlc3QoKVxuXG4gICAgLy8gfSlcblxuXG59KVxuXG5hcHAuY29udHJvbGxlcignRGVja0N0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgJHN0YXRlLCBjYXJkcykgPT4ge1xuICAgICRzY29wZS5jYXJkcyA9IGNhcmRzXG59KVxuXG4iLCIvL0RpcmVjdGl2ZSBGaWxlIiwiYXBwLmZhY3RvcnkoJ0FjdGl2ZUdhbWVGYWN0b3J5JywgKCRodHRwLCAkcm9vdFNjb3BlLCAkbG9jYWxTdG9yYWdlKSA9PiB7XG5cbiAgICAgICAgY29uc3QgQWN0aXZlR2FtZUZhY3RvcnkgPSB7fTtcblxuICAgICAgICBjb25zdCByZWZpbGxlciA9IChjYXJkc05lZWRlZCwgcGlsZVJlZiwgaGFuZFJlZikgPT4ge1xuICAgICAgICAgIHBpbGVSZWYubGltaXRUb0ZpcnN0KGNhcmRzTmVlZGVkKS5vbmNlKCd2YWx1ZScsIGNhcmRzU25hcHNob3QgPT4ge1xuICAgICAgICAgICAgY2FyZHNTbmFwc2hvdC5mb3JFYWNoKGNhcmQgPT4ge1xuICAgICAgICAgICAgICBsZXQgdXBkYXRlT2JqID0ge31cbiAgICAgICAgICAgICAgY2FyZC5yZWYudHJhbnNhY3Rpb24oY2FyZERhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgdXBkYXRlT2JqW2NhcmQua2V5XSA9IGNhcmREYXRhXG4gICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gaGFuZFJlZi51cGRhdGUodXBkYXRlT2JqKSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICB9XG5cbiAgICAgICAgQWN0aXZlR2FtZUZhY3RvcnkucmVmaWxsTXlIYW5kID0gKGdhbWVJZCwgcGxheWVySWQsIHRlYW1JZCkgPT4ge1xuICAgICAgICAgIC8vIGhvdyBtYW55IGNhcmRzIGRvIEkgbmVlZD9cbiAgICAgICAgICBsZXQgY2FyZHNOZWVkZWQgPSAwXG4gICAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICBjb25zdCBoYW5kUmVmID0gZ2FtZVJlZi5jaGlsZChgcGxheWVycy8ke3BsYXllcklkfS9oYW5kYClcbiAgICAgICAgICBjb25zdCBwaWxlUmVmID0gZ2FtZVJlZi5jaGlsZCgncGlsZS93aGl0ZWNhcmRzJylcbiAgICAgICAgICBoYW5kUmVmLm9uY2UoJ3ZhbHVlJywgaGFuZFNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgY2FyZHNOZWVkZWQgPSA3IC0gaGFuZFNuYXBzaG90Lm51bUNoaWxkcmVuKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHJlZmlsbGVyKGNhcmRzTmVlZGVkLCBwaWxlUmVmLCBoYW5kUmVmKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIEFjdGl2ZUdhbWVGYWN0b3J5LnN1Ym1pdFdoaXRlQ2FyZCA9IChwbGF5ZXJJZCwgY2FyZElkLCBnYW1lSWQsIHRlYW1JZCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApO1xuICAgICAgICAgIGNvbnN0IGNhcmRUb1N1Ym1pdCA9IGdhbWVSZWYuY2hpbGQoYHBsYXllcnMvJHtwbGF5ZXJJZH0vaGFuZC8ke2NhcmRJZH1gKTtcbiAgICAgICAgICBjb25zdCBzdWJtaXRSZWYgPSBnYW1lUmVmLmNoaWxkKCdzdWJtaXR0ZWRXaGl0ZUNhcmRzJyk7XG4gICAgICAgICAgZmlyZWJhc2VNb3ZlU2luZ2xlS2V5VmFsdWUoY2FyZFRvU3VibWl0LCBzdWJtaXRSZWYpXG4gICAgICAgICAgICAudGhlbigoKSA9PiBzdWJtaXRSZWYuY2hpbGQoY2FyZElkKS5zZXQoe1xuICAgICAgICAgICAgICBzdWJtaXR0ZWRCeTogcGxheWVySWRcbiAgICAgICAgICAgIH0pKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEFjdGl2ZUdhbWVGYWN0b3J5OyBcblxuXG59KTsiLCJhcHAuZmFjdG9yeSgnR2FtZUZhY3RvcnknLCAoJGh0dHAsICRyb290U2NvcGUsICRsb2NhbFN0b3JhZ2UsICRxKSA9PiB7XG5cbiAgICAgICAgY29uc3QgR2FtZUZhY3RvcnkgPSB7fTtcblxuICAgICAgICBjb25zdCBpbml0aWFsaXplRmlyZWJhc2UgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgICAgICAgICAgICAgIGFwaUtleTogXCJBSXphU3lDaWhTTmtVbF9PLXh1elZyTFpGel9tWkpBR2N3cUpjZEVcIixcbiAgICAgICAgICAgICAgICAgICAgYXV0aERvbWFpbjogXCJibGFua2FnYWluc3RodW1hbml0eS1hM2U3Yy5maXJlYmFzZWFwcC5jb21cIixcbiAgICAgICAgICAgICAgICAgICAgZGF0YWJhc2VVUkw6IFwiaHR0cHM6Ly9ibGFua2FnYWluc3RodW1hbml0eS1hM2U3Yy5maXJlYmFzZWlvLmNvbVwiLFxuICAgICAgICAgICAgICAgICAgICBzdG9yYWdlQnVja2V0OiBcImJsYW5rYWdhaW5zdGh1bWFuaXR5LWEzZTdjLmFwcHNwb3QuY29tXCIsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjY0NzQxNTA5OTE2OVwiXG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChjb25maWcpO1xuICAgICAgICB9O1xuICAgICAgICBpbml0aWFsaXplRmlyZWJhc2UoKTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWUgPSAoZ2FtZUNvbmZpZykgPT4ge1xuICAgICAgICAgICAgLy9jYW4gYWxzbyBnZXQgYWxsIHRoZSBkZWNrcyBieSB0ZWFtIGhlcmUgdG8gcHJlcGFyZVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZSBzZXR0aW5ncyBhcmU6JywgZ2FtZUNvbmZpZylcbiAgICAgICAgICAgIGNvbnN0IHRlYW1JZCA9ICRsb2NhbFN0b3JhZ2UudGVhbS5pZCB8fCAyO1xuICAgICAgICAgICAgY29uc3QgY3JlYXRvcklkID0gJGxvY2FsU3RvcmFnZS51c2VyLmlkIHx8IDM7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnaHR0cDovLzE5Mi4xNjguMS40ODoxMzM3L2FwaS9nYW1lcycsIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZ2FtZUNvbmZpZy5uYW1lIHx8ICdCb3JpbmcgTmFtZScsXG4gICAgICAgICAgICAgICAgICAgIHRlYW1JZDogdGVhbUlkLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdG9ySWQ6IGNyZWF0b3JJZCxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvck5hbWU6ICRsb2NhbFN0b3JhZ2UudXNlci5uYW1lIHx8ICdkYW4nLCAvL21pZ2h0IGJlIHVubmVjZXNzYXJ5IGlmIHdlIGhhdmUgdGhlIHVzZXIgaWRcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IGdhbWVDb25maWdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcbiAgICAgICAgICAgICAgICAudGhlbihnYW1lSWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYC90ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICAgICAgICAgICAgZ2FtZVJlZi5vbigndmFsdWUnLCBzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2NoYW5nZWRHYW1lJywgc25hcHNob3QudmFsKCkpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2FtZUlkO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0Q2FyZHNCeURlY2tJZCA9IChpZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLzE5Mi4xNjguMS40ODoxMzM3L2FwaS9kZWNrcy8ke2lkfS9jYXJkc2ApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKTtcbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5hZGRQaWxlVG9HYW1lID0gKGdhbWVJZCwgZGVja3MpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRlY2tzQXJyID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBkZWNrSWQgaW4gZGVja3MpIHtcbiAgICAgICAgICAgICAgICBkZWNrc0Fyci5wdXNoKGRlY2tJZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3RoZSBwaWxlIGlzJywgZGVja3NBcnIpIC8vY3VycmVudGx5IGFkZHMgYWxsIGRlY2tzXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChgaHR0cDovLzE5Mi4xNjguMS40ODoxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0vZGVja3NgLCB7ICdkZWNrcyc6IGRlY2tzQXJyIH0pXG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgLy8gR2FtZUZhY3RvcnkuYWRkRGVja3NUb0dhbWUgPSAoZ2FtZUlkLCBkZWNrcykgPT4ge1xuICAgICAgICAvLyAgICAgcmV0dXJuICRodHRwLnBvc3QoYGFwaS9nYW1lcy8ke2dhbWVJZH0vZGVja3NgLCBkZWNrcylcblxuICAgICAgICAvLyAgICAgLy8gY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9L3BpbGUvYClcbiAgICAgICAgLy8gICAgIC8vIGdhbWVSZWYuc2V0KHtcbiAgICAgICAgLy8gICAgIC8vICAgICBkZWNrSWQ6IHRydWVcbiAgICAgICAgLy8gICAgIC8vIH0pXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gR2FtZUZhY3RvcnkuZ2V0Q2FyZHNCeURlY2tJZCA9IChnYW1lSWQsIGRlY2tJZCkgPT4ge1xuICAgICAgICAvLyAgICAgY29uc3QgdGVhbUlkID0gJGxvY2FsU3RvcmFnZS50ZWFtLmlkO1xuICAgICAgICAvLyAgICAgbGV0IHBpbGVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfS9waWxlYCk7XG5cbiAgICAgICAgLy8gICAgIHJldHVybiAkaHR0cC5nZXQoYGFwaS9kZWNrcy8ke2RlY2tJZH0vY2FyZHNgKVxuICAgICAgICAvLyAgICAgICAgIC50aGVuKGRhdGEgPT4gcmVzLmRhdGEpXG4gICAgICAgIC8vICAgICAgICAgLnRoZW4oY2FyZHMgPT4ge1xuICAgICAgICAvLyAgICAgICAgICAgICBjb25zdCBhZGRpbmdDYXJkcyA9IGNhcmRzLm1hcChjYXJkID0+IHBpbGVSZWYuc2V0KHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIFtgJHtjYXJkLmlkfWBdOiB0cnVlXG4gICAgICAgIC8vICAgICAgICAgICAgIH0pKVxuXG4gICAgICAgIC8vICAgICAgICAgfSlcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIEdhbWVGYWN0b3J5LmFkZFBpbGVUb0dhbWUyID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ3J1bm5pZ24gYWRkUGlsZVRvR2FtZSB3aXRoIGlkJywgZ2FtZUlkKVxuICAgICAgICAvLyAgICAgY29uc3QgdGVhbUlkID0gJGxvY2FsU3RvcmFnZS50ZWFtLmlkO1xuICAgICAgICAvLyAgICAgbGV0IGRlY2tSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfS9zZXR0aW5ncy9kZWNrc2ApXG5cbiAgICAgICAgLy8gICAgIGRlY2tSZWYub25jZSgndmFsdWUnKS50aGVuKHNuYXBzaG90ID0+IHtcbiAgICAgICAgLy8gICAgICAgICAgICAgY29uc3QgYWRkaW5nQ2FyZHMgPSBbXTtcbiAgICAgICAgLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZSB2YWx1ZSBpc3NzcyAnLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2FsbCBkZWNrIGlkc1xuICAgICAgICAvLyAgICAgICAgICAgICBmb3IgKHZhciBkZWNrSWQgaW4gc25hcHNob3QudmFsKCkpe1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgbGV0IHggPSBHYW1lRmFjdG9yeS5nZXRDYXJkc0J5RGVja0lkXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBhZGRpbmdDYXJkcy5wdXNoKClcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gICAgICAgICAgICAgXy5tYXBWYWx1ZXMoc25hcHNob3QudmFsKCksIHYgPT4gZGVja1JlZi5zZXQoe1xuXG4gICAgICAgIC8vICAgICAgICAgICAgIH0pKVxuXG4gICAgICAgIC8vICAgICAgICAgICAgIHNuYXBzaG90LnZhbCgpXG5cbiAgICAgICAgLy8gICAgICAgICAgICAgXy5tYXBWYWx1ZXMoeyBvbmU6IDEsIHR3bzogMiwgdGhyZWU6IDMgfSwgdiA9PiB2ICogMyk7XG4gICAgICAgIC8vICAgICAgICAgfSlcbiAgICAgICAgLy8gbGV0IHBpbGVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfS9waWxlYCk7XG5cbiAgICAgICAgLy8gcmV0dXJuICRodHRwLmdldChgYXBpL2RlY2tzLyR7ZGVja0lkfS9jYXJkc2ApXG4gICAgICAgIC8vICAgICAudGhlbihkYXRhID0+IHJlcy5kYXRhKVxuICAgICAgICAvLyAgICAgLnRoZW4oY2FyZHMgPT4ge1xuICAgICAgICAvLyAgICAgICAgIGNvbnN0IGFkZGluZ0NhcmRzID0gY2FyZHMubWFwKGNhcmQgPT4gcGlsZVJlZi5zZXQoe1xuICAgICAgICAvLyAgICAgICAgICAgICBbYCR7Y2FyZC5pZH1gXTogdHJ1ZVxuICAgICAgICAvLyAgICAgICAgIH0pKVxuXG4gICAgICAgIC8vICAgICB9KVxuICAgICAgICAvLyB9XG5cblxuICAgICAgICBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAkbG9jYWxTdG9yYWdlLnRlYW0uaWQ7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJJZCA9ICRsb2NhbFN0b3JhZ2UudXNlci5pZDtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllck5hbWUgPSAkbG9jYWxTdG9yYWdlLnVzZXIubmFtZTtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllclJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9L3BsYXllcnMvJHtwbGF5ZXJJZH1gKVxuICAgICAgICAgICAgcGxheWVyUmVmLnNldCh7XG4gICAgICAgICAgICAgICAgbmFtZTogcGxheWVyTmFtZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICBnYW1lUmVmLm9uKCd2YWx1ZScsIHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2NoYW5nZWRHYW1lJywgc25hcHNob3QudmFsKCkpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy8gR2FtZUZhY3RvcnkuY3JlYXRlR2FtZUJ5SWRGaXJlQmFzZSA9IChmaXJlYmFzZWdhbWVJZCkgPT4ge1xuICAgICAgICAvLyAgICAgLy9yZXR1cm4gJGh0dHAucG9zdChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9maXJlYmFzZS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAvLyAgICAgLy9uZWVkcyB0byBiZSAudGhlbmFibGVcbiAgICAgICAgLy8gICAgIGNvbnN0IG5ld1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBnYW1lcy8ke2ZpcmViYXNlZ2FtZUlkfWApLnB1c2goKTtcbiAgICAgICAgLy8gICAgIG5ld1JlZi5zZXQoe1xuICAgICAgICAvLyAgICAgICAgIHBsYXllcklkOiByZXEucXVlcnkucGxheWVySWRcbiAgICAgICAgLy8gICAgIH0pO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCA9IChpZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gKHR5cGVvZiBpZCAhPT0gJ251bWJlcicpID8gJGxvY2FsU3RvcmFnZS50ZWFtLmlkIDogaWQ7IC8vIGlkIHx8IGxvY2Fsc3RvcmFnZSBkb2Vzbid0IHdvcmsgYmVjYXVzZSAwIGlzIGZhbHNleVxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLzE5Mi4xNjguMS40ODoxMzM3L2FwaS9kZWNrcz90ZWFtPSR7dGVhbUlkfWApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuXG4gICAgICAgIH07XG5cblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRVc2Vyc0J5R2FtZUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLzE5Mi4xNjguMS40ODoxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0vdXNlcnNgKTtcbiAgICAgICAgfTtcblxuXG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZUJ5R2FtZUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc3QgZGVmZXIgPSAkcS5kZWZlcigpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZ2FtZUlkKTtcbiAgICAgICAgICAgIGNvbnN0IHRlYW1JZCA9IDE7XG4gICAgICAgICAgICBjb25zdCBnYW1lc1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICAgIHJldHVybiBnYW1lc1JlZi5vbmNlKCd2YWx1ZScpLnRoZW4oc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdGQUNUT1JZVEVTVCcsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgIHJldHVybiBzbmFwc2hvdC52YWwoKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIC8vIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEtlZXAgdGhpcyBjb21tZW50ZWQgb3V0IG9yIHRoZSBob21lIHN0YXRlIHdpbGwgYnJlYWshIVxuICAgICAgICAvLyBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VGVhbUlkID0gKHRlYW1JZCkgPT4ge1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ3RoZSB0ZWFtIGlzIGlkJywgdGVhbUlkKVxuICAgICAgICAvLyAgICAgdGVhbUlkID0gdGVhbUlkIHx8ICRsb2NhbFN0b3JhZ2UudGVhbS5pZFxuXG4gICAgICAgIC8vICAgICBjb25zdCBnYW1lc1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXNgKVxuICAgICAgICAvLyAgICAgcmV0dXJuIGdhbWVzUmVmLm9uY2UoJ3ZhbHVlJykudGhlbihzbmFwc2hvdCA9PiB7IC8vbWlnaHQgYnJlYWsgYWZ0ZXIgeW91IGRvIGl0IG9uY2VcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZygndGhlIHZhbCBpcycsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAvLyAgICAgICAgIHJldHVybiBzbmFwc2hvdC52YWwoKTtcbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vIH07XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCA9ICh0ZWFtSWQpID0+IHtcbiAgICAgICAgICAgIHRlYW1JZCA9IHRlYW1JZCB8fCAkbG9jYWxTdG9yYWdlLnRlYW0uaWRcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGUgdGVhbSBpcyBpZCcsIHRlYW1JZClcbiAgICAgICAgICAgIGNvbnN0IGRlZmVyID0gJHEuZGVmZXIoKTtcblxuICAgICAgICAgICAgY29uc3QgZ2FtZXNSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzYClcbiAgICAgICAgICAgIGdhbWVzUmVmLm9uKCd2YWx1ZScsIHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGhlIHZhbCBpcycsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUoc25hcHNob3QudmFsKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRlZmVyIHByb21pc2VcIiwgZGVmZXIucHJvbWlzZSlcbiAgICAgICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlVc2VyID0gKHVzZXJJZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnaHR0cDovLzE5Mi4xNjguMS40ODoxMzM3L2FwaS9nYW1lcy8/dXNlcklkPScgKyB1c2VySWQpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICB9XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuYWRkUGlsZVRvR2FtZSA9IChnYW1lSWQsIGRlY2tzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRlY2tzQXJyID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGRlY2tJZCBpbiBkZWNrcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVja3NBcnIucHVzaChkZWNrSWQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygndGhlIHBpbGUgaXMnLCBkZWNrc0FycikgLy9jdXJyZW50bHkgYWRkcyBhbGwgZGVja3NcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYGh0dHA6Ly8xOTIuMTY4LjEuNDg6MTMzNy9hcGkvZ2FtZXMvJHtnYW1lSWR9L2RlY2tzYCwgeyAnZGVja3MnOiBkZWNrc0FyciB9KVxuICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4gR2FtZUZhY3Rvcnk7XG4gICAgfVxuXG4pO1xuXG4iLCJhcHAuZmFjdG9yeSgnTG9naW5GYWN0b3J5JywgZnVuY3Rpb24oJGh0dHApe1xuXHRyZXR1cm4ge1xuXHRcdGdldFNsYWNrQ3JlZHM6IGZ1bmN0aW9uKCl7XG5cdFx0XHRyZXR1cm4gJGh0dHAuZ2V0KCdodHRwOi8vMTkyLjE2OC4xLjQ4OjEzMzcvYXBpL3NsYWNrJylcdFxuXHRcdFx0XHQudGhlbihyZXMgPT4ge1xuXHRcdFx0XHRcdHJldHVybiByZXMuZGF0YVxuXHRcdFx0XHR9KVxuXHRcdH1cblx0fVxufSlcbiIsImFwcC5mYWN0b3J5KCdVc2VyRmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCwgJHN0YXRlKXtcblx0XG5cdHJldHVybiB7XG5cdFx0c2V0VXNlcjogZnVuY3Rpb24oaW5mbyl7XG5cdFx0XHRyZXR1cm4gJGh0dHAoe1xuXHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdFx0dXJsOiAnaHR0cDovLzE5Mi4xNjguMS40ODoxMzM3L2FwaS91c2VycycsXG5cdFx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRhdGE6IGluZm9cblx0XHRcdH0pXG5cdFx0XHQudGhlbihyZXMgPT4ge1xuXHRcdFx0XHR0aGlzLnNldExvY2FsU3RvcmFnZShyZXMuZGF0YS51c2VyWzBdLCByZXMuZGF0YS50ZWFtWzBdKTtcblx0XHRcdH0pXG5cdFx0fSxcblxuXHRcdGdldFNsYWNrSW5mbzogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiAkaHR0cC5nZXQoJ2h0dHBzOi8vc2xhY2suY29tL2FwaS91c2Vycy5pZGVudGl0eScpXG5cdFx0fSxcblxuXHRcdHNldExvY2FsU3RvcmFnZTogZnVuY3Rpb24odXNlciwgdGVhbSl7XG5cdFx0XHQkbG9jYWxTdG9yYWdlLnVzZXIgPSB1c2VyO1xuXHRcdFx0JGxvY2FsU3RvcmFnZS50ZWFtID0gdGVhbTtcblx0XHR9LFxuXG5cdFx0bG9nT3V0OiBmdW5jdGlvbigpe1xuXHRcdFx0JGxvY2FsU3RvcmFnZS4kcmVzZXQoKTtcblx0XHR9XG5cdH1cbn0pIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
