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
    console.log("active state game", JSON.stringify($scope.game));

    //this should be uncommented in final versions
    //$scope.whiteCards = $scope.game.players[playerId].hand;

    //temporary implementation for design purposes.
    // $scope.game.whiteCards = $scope.game.pile.whitecards
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

    $scope.onSwipeUp = function () {
        console.log("swiped up");
        //this will trigger submisson function using card's 
        //unique id
    };

    ActiveGameFactory.refillMyHand(gameId, playerId, teamId);

    $scope.$on('changedGame', function (event, snapshot) {
        $scope.game = snapshot;
    });
});

app.controller('SubmissionGameCtrl', function ($scope, $localStorage) {});

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

    $scope.createNewGame = function () {
        console.log('going to new state');
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
                $rootScope.$broadcast('changedGame', snapshot.val());
            });
            return gameId;
        });
    };

    GameFactory.getCardsByDeckId = function (id) {
        return $http.get('http://192.168.4.225:1337/api/decks/' + id + '/cards').then(function (res) {
            return res.data;
        });
    };

    GameFactory.addPileToGame = function (gameId, decks) {
        var decksArr = [];
        for (var deckId in decks) {
            decksArr.push(deckId);
        }
        //console.log('the pile is', decksArr) //currently adds all decks
        return $http.post('http://192.168.4.225:1337/api/games/' + gameId + '/decks', { 'decks': decksArr });
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
        return $http.get('http://192.168.4.225:1337/api/decks?team=' + teamId).then(function (res) {
            return res.data;
        });
    };

    GameFactory.getUsersByGameId = function (gameId) {
        return $http.get('http://192.168.4.225:1337/api/games/' + gameId + '/users');
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
        return $http.get('http://192.168.4.225:1337/api/games/?userId=' + userId).then(function (res) {
            return res.data;
        });
    };

    GameFactory.addPileToGame = function (gameId, decks) {
        var decksArr = [];
        for (var deckId in decks) {
            decksArr.push(deckId);
        }
        //console.log('the pile is', decksArr) //currently adds all decks
        return $http.post('http://192.168.4.225:1337/api/games/' + gameId + '/decks', { 'decks': decksArr });
    };

    return GameFactory;
});

app.factory('LoginFactory', function ($http) {
    return {
        getSlackCreds: function getSlackCreds() {
            return $http.get('http://192.168.4.225:1337/api/slack').then(function (res) {
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
                url: 'http://192.168.4.225:1337/api/users',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImNhcmRzLXRlc3QvY2FyZHNUZXN0LmpzIiwiZGVja3MvZGVja3MuanMiLCJmcm9tIGZzZy9mcm9tLWZzZy5qcyIsImdhbWUvZ2FtZS5qcyIsImhvbWUvaG9tZS5qcyIsIm5ldy1nYW1lL25ldy1nYW1lLmpzIiwibG9naW4vbG9naW4uanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiLCJjb21tb24vZmFjdG9yaWVzL0FjdGl2ZUdhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9HYW1lRmFjdG9yeS5qcyIsImNvbW1vbi9mYWN0b3JpZXMvbG9naW5GYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy91c2VyRmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJhcHAiLCJhbmd1bGFyIiwibW9kdWxlIiwicnVuIiwiJGlvbmljUGxhdGZvcm0iLCJyZWFkeSIsImNvcmRvdmEiLCJwbHVnaW5zIiwiS2V5Ym9hcmQiLCJoaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIiLCJkaXNhYmxlU2Nyb2xsIiwiU3RhdHVzQmFyIiwic3R5bGVMaWdodENvbnRlbnQiLCJjb250cm9sbGVyIiwiJHNjb3BlIiwiVXNlckZhY3RvcnkiLCIkc3RhdGUiLCIkbG9jYWxTdG9yYWdlIiwiJHRpbWVvdXQiLCJsb2dPdXQiLCJnbyIsImNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwic3RhdGUiLCJ1cmwiLCJ0ZW1wbGF0ZVVybCIsImdyZWV0aW5nIiwicmVzb2x2ZSIsImRlY2tzIiwiR2FtZUZhY3RvcnkiLCIkc3RhdGVQYXJhbXMiLCJnZXREZWNrc0J5VGVhbUlkIiwic3RhdGVQYXJhbXMiLCJ0ZWFtSWQiLCJhYnN0cmFjdCIsImdhbWUiLCJnZXRHYW1lQnlHYW1lSWQiLCJnYW1lSWQiLCJBY3RpdmVHYW1lRmFjdG9yeSIsInBsYXllcklkIiwidXNlciIsImlkIiwidGVhbSIsImdhbWVOYW1lIiwic2V0dGluZ3MiLCJuYW1lIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJzaG93Q2FyZHMiLCJwbGF5ZXJDb3VudCIsIk9iamVjdCIsImtleXMiLCJwbGF5ZXJzIiwibGVuZ3RoIiwid2hpdGVDYXJkcyIsIm9uU3dpcGVEb3duIiwiJGV2YWxBc3luYyIsIm9uU3dpcGVVcCIsInJlZmlsbE15SGFuZCIsIiRvbiIsImV2ZW50Iiwic25hcHNob3QiLCIkdXJsUm91dGVyUHJvdmlkZXIiLCJnYW1lcyIsImdldEdhbWVzQnlUZWFtSWQiLCIkY29yZG92YU9hdXRoIiwiJGlvbmljUG9wdXAiLCJzdGFydE5ld0dhbWUiLCJzdG9yYWdlIiwiZ29Ub05ld0dhbWUiLCJjcmVhdGVOZXdHYW1lIiwiam9pbkdhbWUiLCJqb2luR2FtZUJ5SWQiLCJzaG93UG9wdXAiLCJ3YWl0aW5nRm9yUGxheWVycyIsIm1pblBsYXllcnMiLCJteVBvcHVwIiwic2hvdyIsInRpdGxlIiwic2NvcGUiLCJidXR0b25zIiwidGV4dCIsInR5cGUiLCJvblRhcCIsInRlYW1EZWNrcyIsInN0YW5kYXJkRGVjayIsImNhcmRzIiwiZ2V0Q2FyZHNCeURlY2tJZCIsImRlY2tJZCIsIm90aGVyd2lzZSIsImN1cnJlbnRWaWV3IiwiZ2FtZUNvbmZpZyIsImdvVG9EZWNrcyIsImxvY2F0aW9uIiwicmVsb2FkIiwiY29uY2F0IiwidGhlbiIsImFkZFBpbGVUb0dhbWUiLCJhZGREZWNrc1RvR2FtZSIsImFkZERlY2tzIiwiTG9naW5GYWN0b3J5IiwiJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZSIsImxvZ2luV2l0aFNsYWNrIiwiZ2V0U2xhY2tDcmVkcyIsInNsYWNrIiwiY3JlZHMiLCJjbGllbnRJRCIsImNsaWVudFNlY3JldCIsInNldFVzZXIiLCJpbmZvIiwiY2FuRHJhZ0NvbnRlbnQiLCJyZWRpcmVjdFVzZXIiLCJmYWN0b3J5IiwiJGh0dHAiLCIkcm9vdFNjb3BlIiwicmVmaWxsZXIiLCJjYXJkc05lZWRlZCIsInBpbGVSZWYiLCJoYW5kUmVmIiwibGltaXRUb0ZpcnN0Iiwib25jZSIsImNhcmRzU25hcHNob3QiLCJmb3JFYWNoIiwidXBkYXRlT2JqIiwiY2FyZCIsInJlZiIsInRyYW5zYWN0aW9uIiwia2V5IiwiY2FyZERhdGEiLCJ1cGRhdGUiLCJjYXRjaCIsImVyciIsImdhbWVSZWYiLCJmaXJlYmFzZSIsImRhdGFiYXNlIiwiY2hpbGQiLCJoYW5kU25hcHNob3QiLCJudW1DaGlsZHJlbiIsInN1Ym1pdFdoaXRlQ2FyZCIsImNhcmRJZCIsImNhcmRUb1N1Ym1pdCIsInN1Ym1pdFJlZiIsImZpcmViYXNlTW92ZVNpbmdsZUtleVZhbHVlIiwic2V0Iiwic3VibWl0dGVkQnkiLCIkcSIsImluaXRpYWxpemVGaXJlYmFzZSIsImFwaUtleSIsImF1dGhEb21haW4iLCJkYXRhYmFzZVVSTCIsInN0b3JhZ2VCdWNrZXQiLCJtZXNzYWdpbmdTZW5kZXJJZCIsImluaXRpYWxpemVBcHAiLCJjcmVhdG9ySWQiLCJwb3N0IiwiY3JlYXRvck5hbWUiLCJyZXMiLCJkYXRhIiwib24iLCIkYnJvYWRjYXN0IiwidmFsIiwiZ2V0IiwiZGVja3NBcnIiLCJwdXNoIiwicGxheWVyTmFtZSIsInBsYXllclJlZiIsImdldFVzZXJzQnlHYW1lSWQiLCJnYW1lc1JlZiIsImRlZmVyIiwicHJvbWlzZSIsImdldEdhbWVzQnlVc2VyIiwidXNlcklkIiwibWV0aG9kIiwiaGVhZGVycyIsInNldExvY2FsU3RvcmFnZSIsImdldFNsYWNrSW5mbyIsIiRyZXNldCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQUEsT0FBQUMsR0FBQSxHQUFBQyxRQUFBQyxNQUFBLENBQUEsc0JBQUEsRUFBQSxDQUFBLE9BQUEsRUFBQSxXQUFBLEVBQUEsV0FBQSxFQUFBLGdCQUFBLEVBQUEsV0FBQSxFQUFBLGNBQUEsQ0FBQSxDQUFBOztBQUVBRixJQUFBRyxHQUFBLENBQUEsVUFBQUMsY0FBQSxFQUFBO0FBQ0FBLG1CQUFBQyxLQUFBLENBQUEsWUFBQTtBQUNBLFlBQUFOLE9BQUFPLE9BQUEsSUFBQVAsT0FBQU8sT0FBQSxDQUFBQyxPQUFBLENBQUFDLFFBQUEsRUFBQTtBQUNBO0FBQ0E7QUFDQUYsb0JBQUFDLE9BQUEsQ0FBQUMsUUFBQSxDQUFBQyx3QkFBQSxDQUFBLElBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0FILG9CQUFBQyxPQUFBLENBQUFDLFFBQUEsQ0FBQUUsYUFBQSxDQUFBLElBQUE7QUFDQTtBQUNBLFlBQUFYLE9BQUFZLFNBQUEsRUFBQTtBQUNBQSxzQkFBQUMsaUJBQUE7QUFDQTtBQUNBLEtBZEE7QUFnQkEsQ0FqQkE7O0FDUEFaLElBQUFhLFVBQUEsQ0FBQSxZQUFBLEVBQUEsVUFBQUMsTUFBQSxFQUFBQyxXQUFBLEVBQUFDLE1BQUEsRUFBQUMsYUFBQSxFQUFBQyxRQUFBLEVBQUE7QUFDQUosV0FBQUssTUFBQSxHQUFBLFlBQUE7QUFDQUosb0JBQUFJLE1BQUE7QUFDQUgsZUFBQUksRUFBQSxDQUFBLE9BQUE7QUFDQSxLQUhBO0FBSUEsQ0FMQTtBQ0FBcEIsSUFBQXFCLE1BQUEsQ0FBQSxVQUFBQyxjQUFBLEVBQUE7QUFDQUEsbUJBQUFDLEtBQUEsQ0FBQSxPQUFBLEVBQUE7QUFDQUMsYUFBQSxRQURBO0FBRUFDLHFCQUFBLCtCQUZBO0FBR0FaLG9CQUFBO0FBSEEsS0FBQTtBQUtBLENBTkE7O0FBUUFiLElBQUFhLFVBQUEsQ0FBQSxlQUFBLEVBQUEsVUFBQUMsTUFBQSxFQUFBO0FBQ0FBLFdBQUFZLFFBQUEsR0FBQSxJQUFBO0FBQ0EsQ0FGQTtBQ1JBMUIsSUFBQXFCLE1BQUEsQ0FBQSxVQUFBQyxjQUFBLEVBQUE7QUFDQUEsbUJBQUFDLEtBQUEsQ0FBQSxPQUFBLEVBQUE7QUFDQUMsYUFBQSxlQURBO0FBRUFDLHFCQUFBLHFCQUZBO0FBR0FaLG9CQUFBLFVBSEE7QUFJQWMsaUJBQUE7QUFDQUMsbUJBQUEsZUFBQUMsV0FBQSxFQUFBQyxZQUFBO0FBQUEsdUJBQUFELFlBQUFFLGdCQUFBLENBQUFDLFlBQUFDLE1BQUEsQ0FBQTtBQUFBO0FBREE7QUFKQSxLQUFBO0FBU0EsQ0FWQTs7QUFZQWpDLElBQUFhLFVBQUEsQ0FBQSxVQUFBLEVBQUEsVUFBQUMsTUFBQSxFQUFBLENBSUEsQ0FKQTtBQ1pBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUNwSkFkLElBQUFxQixNQUFBLENBQUEsVUFBQUMsY0FBQSxFQUFBOztBQUVBQSxtQkFBQUMsS0FBQSxDQUFBLE1BQUEsRUFBQTtBQUNBQyxhQUFBLE9BREE7QUFFQVUsa0JBQUEsSUFGQTtBQUdBVCxxQkFBQSxtQkFIQTtBQUlBWixvQkFBQTtBQUpBLEtBQUEsRUFNQVUsS0FOQSxDQU1BLGtCQU5BLEVBTUE7QUFDQUMsYUFBQSxzQkFEQTtBQUVBQyxxQkFBQSwwQkFGQTtBQUdBWixvQkFBQSxnQkFIQTtBQUlBYyxpQkFBQTtBQUNBUSxrQkFBQSxjQUFBTixXQUFBLEVBQUFDLFlBQUE7QUFBQSx1QkFBQUQsWUFBQU8sZUFBQSxDQUFBTixhQUFBTyxNQUFBLENBQUE7QUFBQTtBQURBO0FBSkEsS0FOQTtBQWNBLENBaEJBOztBQWtCQXJDLElBQUFhLFVBQUEsQ0FBQSxVQUFBLEVBQUEsVUFBQUMsTUFBQSxFQUFBZSxXQUFBLEVBQUEsQ0FFQSxDQUZBOztBQUlBN0IsSUFBQWEsVUFBQSxDQUFBLGdCQUFBLEVBQUEsVUFBQUMsTUFBQSxFQUFBZSxXQUFBLEVBQUFTLGlCQUFBLEVBQUFILElBQUEsRUFBQUwsWUFBQSxFQUFBYixhQUFBLEVBQUE7O0FBRUEsUUFBQW9CLFNBQUFQLGFBQUFPLE1BQUE7QUFDQSxRQUFBRSxXQUFBdEIsY0FBQXVCLElBQUEsQ0FBQUMsRUFBQTtBQUNBLFFBQUFSLFNBQUFoQixjQUFBeUIsSUFBQSxDQUFBRCxFQUFBO0FBQ0EzQixXQUFBcUIsSUFBQSxHQUFBQSxJQUFBO0FBQ0FyQixXQUFBNkIsUUFBQSxHQUFBN0IsT0FBQXFCLElBQUEsQ0FBQVMsUUFBQSxDQUFBQyxJQUFBO0FBQ0FDLFlBQUFDLEdBQUEsQ0FBQSxtQkFBQSxFQUFBQyxLQUFBQyxTQUFBLENBQUFuQyxPQUFBcUIsSUFBQSxDQUFBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBckIsV0FBQW9DLFNBQUEsR0FBQSxLQUFBOztBQUVBcEMsV0FBQXFDLFdBQUEsR0FBQUMsT0FBQUMsSUFBQSxDQUFBdkMsT0FBQXFCLElBQUEsQ0FBQW1CLE9BQUEsRUFBQUMsTUFBQTs7QUFFQVQsWUFBQUMsR0FBQSxDQUFBLFlBQUEsRUFBQWpDLE9BQUEwQyxVQUFBOztBQUVBMUMsV0FBQTJDLFdBQUEsR0FBQSxZQUFBO0FBQ0FYLGdCQUFBQyxHQUFBLENBQUEsU0FBQTtBQUNBRCxnQkFBQUMsR0FBQSxDQUFBakMsT0FBQW9DLFNBQUE7QUFDQXBDLGVBQUFvQyxTQUFBLEdBQUEsSUFBQTtBQUNBSixnQkFBQUMsR0FBQSxDQUFBakMsT0FBQW9DLFNBQUE7QUFDQXBDLGVBQUE0QyxVQUFBO0FBRUEsS0FQQTs7QUFTQTVDLFdBQUE2QyxTQUFBLEdBQUEsWUFBQTtBQUNBYixnQkFBQUMsR0FBQSxDQUFBLFdBQUE7QUFDQTtBQUNBO0FBQ0EsS0FKQTs7QUFNQVQsc0JBQUFzQixZQUFBLENBQUF2QixNQUFBLEVBQUFFLFFBQUEsRUFBQU4sTUFBQTs7QUFFQW5CLFdBQUErQyxHQUFBLENBQUEsYUFBQSxFQUFBLFVBQUFDLEtBQUEsRUFBQUMsUUFBQSxFQUFBO0FBQ0FqRCxlQUFBcUIsSUFBQSxHQUFBNEIsUUFBQTtBQUNBLEtBRkE7QUFJQSxDQXpDQTs7QUEyQ0EvRCxJQUFBYSxVQUFBLENBQUEsb0JBQUEsRUFBQSxVQUFBQyxNQUFBLEVBQUFHLGFBQUEsRUFBQSxDQUdBLENBSEE7O0FDakVBakIsSUFBQXFCLE1BQUEsQ0FBQSxVQUFBQyxjQUFBLEVBQUEwQyxrQkFBQSxFQUFBO0FBQ0ExQyxtQkFBQUMsS0FBQSxDQUFBLE1BQUEsRUFBQTtBQUNBQyxhQUFBLEdBREE7QUFFQUMscUJBQUEsbUJBRkE7QUFHQVosb0JBQUEsVUFIQTtBQUlBYyxpQkFBQTtBQUNBc0MsbUJBQUEsZUFBQXBDLFdBQUEsRUFBQTtBQUNBLHVCQUFBQSxZQUFBcUMsZ0JBQUEsRUFBQTtBQUNBO0FBSEE7QUFKQSxLQUFBO0FBVUEsQ0FYQTs7QUFhQWxFLElBQUFhLFVBQUEsQ0FBQSxVQUFBLEVBQUEsVUFBQUMsTUFBQSxFQUFBRSxNQUFBLEVBQUFtRCxhQUFBLEVBQUFwRCxXQUFBLEVBQUFjLFdBQUEsRUFBQVosYUFBQSxFQUFBZ0QsS0FBQSxFQUFBRyxXQUFBLEVBQUE7QUFDQXRELFdBQUF1RCxZQUFBLEdBQUF4QyxZQUFBd0MsWUFBQTtBQUNBdkQsV0FBQXdELE9BQUEsR0FBQXJELGFBQUE7QUFDQUgsV0FBQW1ELEtBQUEsR0FBQUEsS0FBQTs7QUFFQW5CLFlBQUFDLEdBQUEsQ0FBQSxPQUFBLEVBQUFDLEtBQUFDLFNBQUEsQ0FBQW5DLE9BQUFtRCxLQUFBLENBQUE7QUFDQW5ELFdBQUF5RCxXQUFBLEdBQUEsWUFBQTtBQUNBdkQsZUFBQUksRUFBQSxDQUFBLGVBQUE7QUFDQSxLQUZBOztBQUtBTixXQUFBMEQsYUFBQSxHQUFBLFlBQUE7QUFDQTFCLGdCQUFBQyxHQUFBLENBQUEsb0JBQUE7QUFDQS9CLGVBQUFJLEVBQUEsQ0FBQSxlQUFBO0FBQ0EsS0FIQTs7QUFLQU4sV0FBQTJELFFBQUEsR0FBQTVDLFlBQUE2QyxZQUFBOztBQUVBNUQsV0FBQTZELFNBQUEsR0FBQSxVQUFBdEMsTUFBQSxFQUFBOztBQUVBdkIsZUFBQXFCLElBQUEsR0FBQXJCLE9BQUFtRCxLQUFBLENBQUE1QixNQUFBLENBQUE7QUFDQXZCLGVBQUE2QixRQUFBLEdBQUE3QixPQUFBcUIsSUFBQSxDQUFBUyxRQUFBLENBQUFDLElBQUE7QUFDQS9CLGVBQUFxQyxXQUFBLEdBQUFDLE9BQUFDLElBQUEsQ0FBQXZDLE9BQUFxQixJQUFBLENBQUFtQixPQUFBLEVBQUFDLE1BQUE7QUFDQXpDLGVBQUE4RCxpQkFBQSxHQUFBLENBQUE5RCxPQUFBcUIsSUFBQSxDQUFBUyxRQUFBLENBQUFpQyxVQUFBLElBQUEsQ0FBQSxJQUFBL0QsT0FBQXFDLFdBQUE7O0FBRUEsWUFBQTJCLFVBQUFWLFlBQUFXLElBQUEsQ0FBQTtBQUNBdEQseUJBQUEsb0JBREE7QUFFQXVELG1CQUFBLFVBQUFsRSxPQUFBNkIsUUFGQTtBQUdBc0MsbUJBQUFuRSxNQUhBO0FBSUFvRSxxQkFDQSxDQUNBLEVBQUFDLE1BQUEsU0FBQSxFQURBLEVBRUE7QUFDQUEsc0JBQUEsV0FEQTtBQUVBQyxzQkFBQSxpQkFGQTtBQUdBQyx1QkFBQSxrQkFBQTtBQUNBdkUsMkJBQUEyRCxRQUFBLENBQUFwQyxNQUFBO0FBQ0FyQiwyQkFBQUksRUFBQSxDQUFBLGtCQUFBLEVBQUEsRUFBQWlCLFFBQUFBLE1BQUEsRUFBQTtBQUNBO0FBTkEsYUFGQTtBQUxBLFNBQUEsQ0FBQTtBQWlCQSxLQXhCQTtBQXlCQSxDQTNDQTs7QUNiQXJDLElBQUFxQixNQUFBLENBQUEsVUFBQUMsY0FBQSxFQUFBMEMsa0JBQUEsRUFBQTs7QUFFQTFDLG1CQUFBQyxLQUFBLENBQUEsVUFBQSxFQUFBO0FBQ0FDLGFBQUEsV0FEQTtBQUVBVSxrQkFBQSxJQUZBO0FBR0FULHFCQUFBLHVCQUhBO0FBSUFaLG9CQUFBLGFBSkE7QUFLQWMsaUJBQUE7QUFDQTJELHVCQUFBLG1CQUFBekQsV0FBQTtBQUFBLHVCQUFBQSxZQUFBRSxnQkFBQSxFQUFBO0FBQUEsYUFEQTtBQUVBd0QsMEJBQUEsc0JBQUExRCxXQUFBO0FBQUEsdUJBQUFBLFlBQUFFLGdCQUFBLENBQUEsQ0FBQSxDQUFBO0FBQUE7QUFGQTtBQUxBLEtBQUEsRUFXQVIsS0FYQSxDQVdBLGVBWEEsRUFXQTtBQUNBQyxhQUFBLGFBREE7QUFFQUMscUJBQUE7QUFGQSxLQVhBLEVBZ0JBRixLQWhCQSxDQWdCQSxvQkFoQkEsRUFnQkE7QUFDQUMsYUFBQSxZQURBO0FBRUFDLHFCQUFBO0FBRkEsS0FoQkEsRUFxQkFGLEtBckJBLENBcUJBLGVBckJBLEVBcUJBO0FBQ0FDLGFBQUEsZUFEQTtBQUVBQyxxQkFBQSx1QkFGQTtBQUdBWixvQkFBQSxVQUhBO0FBSUFjLGlCQUFBO0FBQ0E2RCxtQkFBQSxlQUFBM0QsV0FBQSxFQUFBQyxZQUFBO0FBQUEsdUJBQUFELFlBQUE0RCxnQkFBQSxDQUFBM0QsYUFBQTRELE1BQUEsQ0FBQTtBQUFBO0FBREE7O0FBSkEsS0FyQkE7O0FBZ0NBMUIsdUJBQUEyQixTQUFBLENBQUEsc0JBQUE7QUFDQSxDQW5DQTs7QUFxQ0EzRixJQUFBYSxVQUFBLENBQUEsYUFBQSxFQUFBLFVBQUFDLE1BQUEsRUFBQWUsV0FBQSxFQUFBYixNQUFBLEVBQUFzRSxTQUFBLEVBQUFDLFlBQUEsRUFBQTtBQUNBekUsV0FBQThFLFdBQUEsR0FBQSxVQUFBO0FBQ0E5RSxXQUFBK0UsVUFBQSxHQUFBLEVBQUE7QUFDQS9FLFdBQUErRSxVQUFBLENBQUFqRSxLQUFBLEdBQUEsRUFBQTtBQUNBZCxXQUFBZ0YsU0FBQSxHQUFBLFlBQUE7QUFDQTlFLGVBQUFJLEVBQUEsQ0FBQSxvQkFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBMkUsVUFBQSxJQUFBLEVBQUFDLFFBQUEsSUFBQSxFQUFBO0FBQ0EsS0FGQTs7QUFJQWxGLFdBQUFjLEtBQUEsR0FBQTJELGFBQUFVLE1BQUEsQ0FBQVgsU0FBQSxDQUFBOztBQUVBeEUsV0FBQXVELFlBQUEsR0FBQSxVQUFBd0IsVUFBQSxFQUFBO0FBQ0FoRSxvQkFBQXdDLFlBQUEsQ0FBQXdCLFVBQUEsRUFBQUssSUFBQSxDQUFBLFVBQUF6RCxFQUFBLEVBQUE7QUFDQVosd0JBQUFzRSxhQUFBLENBQUExRCxFQUFBLEVBQUEzQixPQUFBK0UsVUFBQSxDQUFBakUsS0FBQTtBQUNBWixtQkFBQUksRUFBQSxDQUFBLGtCQUFBLEVBQUEsRUFBQWlCLFFBQUFJLEVBQUEsRUFBQTtBQUVBLFNBSkE7QUFLQSxLQU5BO0FBT0EzQixXQUFBc0YsY0FBQSxHQUFBdkUsWUFBQXdFLFFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUdBLENBM0JBOztBQTZCQXJHLElBQUFhLFVBQUEsQ0FBQSxVQUFBLEVBQUEsVUFBQUMsTUFBQSxFQUFBZSxXQUFBLEVBQUFiLE1BQUEsRUFBQXdFLEtBQUEsRUFBQTtBQUNBMUUsV0FBQTBFLEtBQUEsR0FBQUEsS0FBQTtBQUNBLENBRkE7O0FDbEVBeEYsSUFBQXFCLE1BQUEsQ0FBQSxVQUFBQyxjQUFBLEVBQUEwQyxrQkFBQSxFQUFBO0FBQ0ExQyxtQkFBQUMsS0FBQSxDQUFBLE9BQUEsRUFBQTtBQUNBQyxhQUFBLFFBREE7QUFFQUMscUJBQUEscUJBRkE7QUFHQVosb0JBQUE7QUFIQSxLQUFBO0FBS0FtRCx1QkFBQTJCLFNBQUEsQ0FBQSxRQUFBO0FBQ0EsQ0FQQTs7QUFTQTNGLElBQUFhLFVBQUEsQ0FBQSxXQUFBLEVBQUEsVUFBQUMsTUFBQSxFQUFBRSxNQUFBLEVBQUFzRixZQUFBLEVBQUF2RixXQUFBLEVBQUFvRCxhQUFBLEVBQUFsRCxhQUFBLEVBQUFDLFFBQUEsRUFBQXFGLHNCQUFBLEVBQUE7QUFDQXpGLFdBQUEwRixjQUFBLEdBQUEsWUFBQTtBQUNBLGVBQUFGLGFBQUFHLGFBQUEsR0FDQVAsSUFEQSxDQUNBLGlCQUFBO0FBQ0EsbUJBQUEvQixjQUFBdUMsS0FBQSxDQUFBQyxNQUFBQyxRQUFBLEVBQUFELE1BQUFFLFlBQUEsRUFBQSxDQUFBLGdCQUFBLEVBQUEsZUFBQSxFQUFBLGlCQUFBLENBQUEsQ0FBQTtBQUNBLFNBSEEsRUFJQVgsSUFKQSxDQUlBO0FBQUEsbUJBQUFuRixZQUFBK0YsT0FBQSxDQUFBQyxJQUFBLENBQUE7QUFBQSxTQUpBLEVBS0FiLElBTEEsQ0FLQTtBQUFBLG1CQUFBbEYsT0FBQUksRUFBQSxDQUFBLE1BQUEsQ0FBQTtBQUFBLFNBTEEsQ0FBQTtBQU1BLEtBUEE7O0FBU0FtRiwyQkFBQVMsY0FBQSxDQUFBLEtBQUE7O0FBRUFsRyxXQUFBK0MsR0FBQSxDQUFBLGtCQUFBLEVBQUEsWUFBQTtBQUFBMEMsK0JBQUFTLGNBQUEsQ0FBQSxJQUFBO0FBQUEsS0FBQTs7QUFFQWxHLFdBQUF3RCxPQUFBLEdBQUFyRCxhQUFBOztBQUVBLGFBQUFnRyxZQUFBLEdBQUE7QUFDQW5FLGdCQUFBQyxHQUFBLENBQUEsb0JBQUEsRUFBQWpDLE9BQUF3RCxPQUFBLENBQUE5QixJQUFBO0FBQ0EsWUFBQTFCLE9BQUF3RCxPQUFBLENBQUE5QixJQUFBLEVBQUF4QixPQUFBSSxFQUFBLENBQUEsTUFBQTtBQUNBOztBQUVBNkY7QUFDQSxDQXRCQTtBQ1RBO0FDQUFqSCxJQUFBa0gsT0FBQSxDQUFBLG1CQUFBLEVBQUEsVUFBQUMsS0FBQSxFQUFBQyxVQUFBLEVBQUFuRyxhQUFBLEVBQUE7O0FBRUEsUUFBQXFCLG9CQUFBLEVBQUE7O0FBRUEsUUFBQStFLFdBQUEsU0FBQUEsUUFBQSxDQUFBQyxXQUFBLEVBQUFDLE9BQUEsRUFBQUMsT0FBQSxFQUFBO0FBQ0FELGdCQUFBRSxZQUFBLENBQUFILFdBQUEsRUFBQUksSUFBQSxDQUFBLE9BQUEsRUFBQSx5QkFBQTtBQUNBQywwQkFBQUMsT0FBQSxDQUFBLGdCQUFBO0FBQ0Esb0JBQUFDLFlBQUEsRUFBQTtBQUNBQyxxQkFBQUMsR0FBQSxDQUFBQyxXQUFBLENBQUEsb0JBQUE7QUFDQUgsOEJBQUFDLEtBQUFHLEdBQUEsSUFBQUMsUUFBQTtBQUNBLDJCQUFBLElBQUE7QUFDQSxpQkFIQSxFQUlBaEMsSUFKQSxDQUlBO0FBQUEsMkJBQUFzQixRQUFBVyxNQUFBLENBQUFOLFNBQUEsQ0FBQTtBQUFBLGlCQUpBLEVBS0FPLEtBTEEsQ0FLQTtBQUFBLDJCQUFBdEYsUUFBQUMsR0FBQSxDQUFBc0YsR0FBQSxDQUFBO0FBQUEsaUJBTEE7QUFNQSxhQVJBO0FBU0EsU0FWQSxFQVdBRCxLQVhBLENBV0E7QUFBQSxtQkFBQXRGLFFBQUFDLEdBQUEsQ0FBQXNGLEdBQUEsQ0FBQTtBQUFBLFNBWEE7QUFZQSxLQWJBOztBQWVBL0Ysc0JBQUFzQixZQUFBLEdBQUEsVUFBQXZCLE1BQUEsRUFBQUUsUUFBQSxFQUFBTixNQUFBLEVBQUE7QUFDQTtBQUNBLFlBQUFxRixjQUFBLENBQUE7QUFDQSxZQUFBZ0IsVUFBQUMsU0FBQUMsUUFBQSxHQUFBVCxHQUFBLFlBQUE5RixNQUFBLGVBQUFJLE1BQUEsQ0FBQTtBQUNBLFlBQUFtRixVQUFBYyxRQUFBRyxLQUFBLGNBQUFsRyxRQUFBLFdBQUE7QUFDQSxZQUFBZ0YsVUFBQWUsUUFBQUcsS0FBQSxDQUFBLGlCQUFBLENBQUE7QUFDQWpCLGdCQUFBRSxJQUFBLENBQUEsT0FBQSxFQUFBLHdCQUFBO0FBQ0FKLDBCQUFBLElBQUFvQixhQUFBQyxXQUFBLEVBQUE7QUFDQSxTQUZBLEVBR0F6QyxJQUhBLENBR0EsWUFBQTtBQUNBbUIscUJBQUFDLFdBQUEsRUFBQUMsT0FBQSxFQUFBQyxPQUFBO0FBQ0EsU0FMQTtBQU1BLEtBWkE7O0FBY0FsRixzQkFBQXNHLGVBQUEsR0FBQSxVQUFBckcsUUFBQSxFQUFBc0csTUFBQSxFQUFBeEcsTUFBQSxFQUFBSixNQUFBLEVBQUE7QUFDQSxZQUFBcUcsVUFBQUMsU0FBQUMsUUFBQSxHQUFBVCxHQUFBLFlBQUE5RixNQUFBLGVBQUFJLE1BQUEsQ0FBQTtBQUNBLFlBQUF5RyxlQUFBUixRQUFBRyxLQUFBLGNBQUFsRyxRQUFBLGNBQUFzRyxNQUFBLENBQUE7QUFDQSxZQUFBRSxZQUFBVCxRQUFBRyxLQUFBLENBQUEscUJBQUEsQ0FBQTtBQUNBTyxtQ0FBQUYsWUFBQSxFQUFBQyxTQUFBLEVBQ0E3QyxJQURBLENBQ0E7QUFBQSxtQkFBQTZDLFVBQUFOLEtBQUEsQ0FBQUksTUFBQSxFQUFBSSxHQUFBLENBQUE7QUFDQUMsNkJBQUEzRztBQURBLGFBQUEsQ0FBQTtBQUFBLFNBREE7QUFJQSxLQVJBOztBQVVBLFdBQUFELGlCQUFBO0FBR0EsQ0E5Q0E7QUNBQXRDLElBQUFrSCxPQUFBLENBQUEsYUFBQSxFQUFBLFVBQUFDLEtBQUEsRUFBQUMsVUFBQSxFQUFBbkcsYUFBQSxFQUFBa0ksRUFBQSxFQUFBOztBQUVBLFFBQUF0SCxjQUFBLEVBQUE7O0FBRUEsUUFBQXVILHFCQUFBLFNBQUFBLGtCQUFBLEdBQUE7QUFDQSxZQUFBL0gsU0FBQTtBQUNBZ0ksb0JBQUEseUNBREE7QUFFQUMsd0JBQUEsNENBRkE7QUFHQUMseUJBQUEsbURBSEE7QUFJQUMsMkJBQUEsd0NBSkE7QUFLQUMsK0JBQUE7QUFMQSxTQUFBO0FBT0FsQixpQkFBQW1CLGFBQUEsQ0FBQXJJLE1BQUE7QUFDQSxLQVRBO0FBVUErSDs7QUFFQXZILGdCQUFBd0MsWUFBQSxHQUFBLFVBQUF3QixVQUFBLEVBQUE7QUFDQTtBQUNBL0MsZ0JBQUFDLEdBQUEsQ0FBQSxtQkFBQSxFQUFBOEMsVUFBQTtBQUNBLFlBQUE1RCxTQUFBaEIsY0FBQXlCLElBQUEsQ0FBQUQsRUFBQSxJQUFBLENBQUE7QUFDQSxZQUFBa0gsWUFBQTFJLGNBQUF1QixJQUFBLENBQUFDLEVBQUEsSUFBQSxDQUFBO0FBQ0EsZUFBQTBFLE1BQUF5QyxJQUFBLENBQUEscUNBQUEsRUFBQTtBQUNBL0csa0JBQUFnRCxXQUFBaEQsSUFBQSxJQUFBLGFBREE7QUFFQVosb0JBQUFBLE1BRkE7QUFHQTBILHVCQUFBQSxTQUhBO0FBSUFFLHlCQUFBNUksY0FBQXVCLElBQUEsQ0FBQUssSUFBQSxJQUFBLEtBSkEsRUFJQTtBQUNBRCxzQkFBQWlEO0FBTEEsU0FBQSxFQU9BSyxJQVBBLENBT0E7QUFBQSxtQkFBQTRELElBQUFDLElBQUE7QUFBQSxTQVBBLEVBUUE3RCxJQVJBLENBUUEsa0JBQUE7QUFDQSxnQkFBQW9DLFVBQUFDLFNBQUFDLFFBQUEsR0FBQVQsR0FBQSxhQUFBOUYsTUFBQSxlQUFBSSxNQUFBLENBQUE7QUFDQWlHLG9CQUFBMEIsRUFBQSxDQUFBLE9BQUEsRUFBQSxvQkFBQTtBQUNBNUMsMkJBQUE2QyxVQUFBLENBQUEsYUFBQSxFQUFBbEcsU0FBQW1HLEdBQUEsRUFBQTtBQUNBLGFBRkE7QUFHQSxtQkFBQTdILE1BQUE7QUFDQSxTQWRBLENBQUE7QUFnQkEsS0FyQkE7O0FBdUJBUixnQkFBQTRELGdCQUFBLEdBQUEsVUFBQWhELEVBQUEsRUFBQTtBQUNBLGVBQUEwRSxNQUFBZ0QsR0FBQSwwQ0FBQTFILEVBQUEsYUFDQXlELElBREEsQ0FDQTtBQUFBLG1CQUFBNEQsSUFBQUMsSUFBQTtBQUFBLFNBREEsQ0FBQTtBQUVBLEtBSEE7O0FBS0FsSSxnQkFBQXNFLGFBQUEsR0FBQSxVQUFBOUQsTUFBQSxFQUFBVCxLQUFBLEVBQUE7QUFDQSxZQUFBd0ksV0FBQSxFQUFBO0FBQ0EsYUFBQSxJQUFBMUUsTUFBQSxJQUFBOUQsS0FBQSxFQUFBO0FBQ0F3SSxxQkFBQUMsSUFBQSxDQUFBM0UsTUFBQTtBQUNBO0FBQ0E7QUFDQSxlQUFBeUIsTUFBQXlDLElBQUEsMENBQUF2SCxNQUFBLGFBQUEsRUFBQSxTQUFBK0gsUUFBQSxFQUFBLENBQUE7QUFDQSxLQVBBOztBQVdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBdkksZ0JBQUE2QyxZQUFBLEdBQUEsVUFBQXJDLE1BQUEsRUFBQTtBQUNBLFlBQUFKLFNBQUFoQixjQUFBeUIsSUFBQSxDQUFBRCxFQUFBO0FBQ0EsWUFBQUYsV0FBQXRCLGNBQUF1QixJQUFBLENBQUFDLEVBQUE7QUFDQSxZQUFBNkgsYUFBQXJKLGNBQUF1QixJQUFBLENBQUFLLElBQUE7QUFDQSxZQUFBMEgsWUFBQWhDLFNBQUFDLFFBQUEsR0FBQVQsR0FBQSxZQUFBOUYsTUFBQSxlQUFBSSxNQUFBLGlCQUFBRSxRQUFBLENBQUE7QUFDQWdJLGtCQUFBdEIsR0FBQSxDQUFBO0FBQ0FwRyxrQkFBQXlIO0FBREEsU0FBQTtBQUdBLFlBQUFoQyxVQUFBQyxTQUFBQyxRQUFBLEdBQUFULEdBQUEsWUFBQTlGLE1BQUEsZUFBQUksTUFBQSxDQUFBO0FBQ0FpRyxnQkFBQTBCLEVBQUEsQ0FBQSxPQUFBLEVBQUEsb0JBQUE7QUFDQTVDLHVCQUFBNkMsVUFBQSxDQUFBLGFBQUEsRUFBQWxHLFNBQUFtRyxHQUFBLEVBQUE7QUFDQSxTQUZBO0FBR0EsS0FaQTs7QUFlQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBckksZ0JBQUFFLGdCQUFBLEdBQUEsVUFBQVUsRUFBQSxFQUFBO0FBQ0EsWUFBQVIsU0FBQSxPQUFBUSxFQUFBLEtBQUEsUUFBQSxHQUFBeEIsY0FBQXlCLElBQUEsQ0FBQUQsRUFBQSxHQUFBQSxFQUFBLENBREEsQ0FDQTtBQUNBLGVBQUEwRSxNQUFBZ0QsR0FBQSwrQ0FBQWxJLE1BQUEsRUFDQWlFLElBREEsQ0FDQTtBQUFBLG1CQUFBNEQsSUFBQUMsSUFBQTtBQUFBLFNBREEsQ0FBQTtBQUdBLEtBTEE7O0FBUUFsSSxnQkFBQTJJLGdCQUFBLEdBQUEsVUFBQW5JLE1BQUEsRUFBQTtBQUNBLGVBQUE4RSxNQUFBZ0QsR0FBQSwwQ0FBQTlILE1BQUEsWUFBQTtBQUNBLEtBRkE7O0FBTUFSLGdCQUFBTyxlQUFBLEdBQUEsVUFBQUMsTUFBQSxFQUFBO0FBQ0E7QUFDQVMsZ0JBQUFDLEdBQUEsQ0FBQVYsTUFBQTtBQUNBLFlBQUFKLFNBQUEsQ0FBQTtBQUNBLFlBQUF3SSxXQUFBbEMsU0FBQUMsUUFBQSxHQUFBVCxHQUFBLFlBQUE5RixNQUFBLGVBQUFJLE1BQUEsQ0FBQTtBQUNBLGVBQUFvSSxTQUFBL0MsSUFBQSxDQUFBLE9BQUEsRUFBQXhCLElBQUEsQ0FBQSxvQkFBQTtBQUNBcEQsb0JBQUFDLEdBQUEsQ0FBQSxhQUFBLEVBQUFnQixTQUFBbUcsR0FBQSxFQUFBO0FBQ0EsbUJBQUFuRyxTQUFBbUcsR0FBQSxFQUFBO0FBQ0EsU0FIQSxDQUFBOztBQUtBO0FBQ0EsS0FYQTs7QUFhQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUFySSxnQkFBQXFDLGdCQUFBLEdBQUEsVUFBQWpDLE1BQUEsRUFBQTtBQUNBQSxpQkFBQUEsVUFBQWhCLGNBQUF5QixJQUFBLENBQUFELEVBQUE7QUFDQUssZ0JBQUFDLEdBQUEsQ0FBQSxnQkFBQSxFQUFBZCxNQUFBO0FBQ0EsWUFBQXlJLFFBQUF2QixHQUFBdUIsS0FBQSxFQUFBOztBQUVBLFlBQUFELFdBQUFsQyxTQUFBQyxRQUFBLEdBQUFULEdBQUEsWUFBQTlGLE1BQUEsWUFBQTtBQUNBd0ksaUJBQUFULEVBQUEsQ0FBQSxPQUFBLEVBQUEsb0JBQUE7QUFDQWxILG9CQUFBQyxHQUFBLENBQUEsWUFBQSxFQUFBZ0IsU0FBQW1HLEdBQUEsRUFBQTtBQUNBUSxrQkFBQS9JLE9BQUEsQ0FBQW9DLFNBQUFtRyxHQUFBLEVBQUE7QUFDQSxTQUhBO0FBSUFwSCxnQkFBQUMsR0FBQSxDQUFBLGVBQUEsRUFBQTJILE1BQUFDLE9BQUE7QUFDQSxlQUFBRCxNQUFBQyxPQUFBO0FBQ0EsS0FaQTs7QUFjQTlJLGdCQUFBK0ksY0FBQSxHQUFBLFVBQUFDLE1BQUEsRUFBQTtBQUNBLGVBQUExRCxNQUFBZ0QsR0FBQSxDQUFBLGlEQUFBVSxNQUFBLEVBQ0EzRSxJQURBLENBQ0E7QUFBQSxtQkFBQTRELElBQUFDLElBQUE7QUFBQSxTQURBLENBQUE7QUFFQSxLQUhBOztBQUtBbEksZ0JBQUFzRSxhQUFBLEdBQUEsVUFBQTlELE1BQUEsRUFBQVQsS0FBQSxFQUFBO0FBQ0EsWUFBQXdJLFdBQUEsRUFBQTtBQUNBLGFBQUEsSUFBQTFFLE1BQUEsSUFBQTlELEtBQUEsRUFBQTtBQUNBd0kscUJBQUFDLElBQUEsQ0FBQTNFLE1BQUE7QUFDQTtBQUNBO0FBQ0EsZUFBQXlCLE1BQUF5QyxJQUFBLDBDQUFBdkgsTUFBQSxhQUFBLEVBQUEsU0FBQStILFFBQUEsRUFBQSxDQUFBO0FBQ0EsS0FQQTs7QUFVQSxXQUFBdkksV0FBQTtBQUNBLENBOU1BOztBQ0FBN0IsSUFBQWtILE9BQUEsQ0FBQSxjQUFBLEVBQUEsVUFBQUMsS0FBQSxFQUFBO0FBQ0EsV0FBQTtBQUNBVix1QkFBQSx5QkFBQTtBQUNBLG1CQUFBVSxNQUFBZ0QsR0FBQSxDQUFBLHFDQUFBLEVBQ0FqRSxJQURBLENBQ0EsZUFBQTtBQUNBLHVCQUFBNEQsSUFBQUMsSUFBQTtBQUNBLGFBSEEsQ0FBQTtBQUlBO0FBTkEsS0FBQTtBQVFBLENBVEE7O0FDQUEvSixJQUFBa0gsT0FBQSxDQUFBLGFBQUEsRUFBQSxVQUFBQyxLQUFBLEVBQUFsRyxhQUFBLEVBQUFDLFFBQUEsRUFBQUYsTUFBQSxFQUFBOztBQUVBLFdBQUE7QUFDQThGLGlCQUFBLGlCQUFBQyxJQUFBLEVBQUE7QUFBQTs7QUFDQSxtQkFBQUksTUFBQTtBQUNBMkQsd0JBQUEsTUFEQTtBQUVBdEoscUJBQUEscUNBRkE7QUFHQXVKLHlCQUFBO0FBQ0Esb0NBQUE7QUFEQSxpQkFIQTtBQU1BaEIsc0JBQUFoRDtBQU5BLGFBQUEsRUFRQWIsSUFSQSxDQVFBLGVBQUE7QUFDQSxzQkFBQThFLGVBQUEsQ0FBQWxCLElBQUFDLElBQUEsQ0FBQXZILElBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQXNILElBQUFDLElBQUEsQ0FBQXJILElBQUEsQ0FBQSxDQUFBLENBQUE7QUFDQSxhQVZBLENBQUE7QUFXQSxTQWJBOztBQWVBdUksc0JBQUEsd0JBQUE7QUFDQSxtQkFBQTlELE1BQUFnRCxHQUFBLENBQUEsc0NBQUEsQ0FBQTtBQUNBLFNBakJBOztBQW1CQWEseUJBQUEseUJBQUF4SSxJQUFBLEVBQUFFLElBQUEsRUFBQTtBQUNBekIsMEJBQUF1QixJQUFBLEdBQUFBLElBQUE7QUFDQXZCLDBCQUFBeUIsSUFBQSxHQUFBQSxJQUFBO0FBQ0EsU0F0QkE7O0FBd0JBdkIsZ0JBQUEsa0JBQUE7QUFDQUYsMEJBQUFpSyxNQUFBO0FBQ0E7QUExQkEsS0FBQTtBQTRCQSxDQTlCQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW9uaWMgU3RhcnRlciBBcHBcblxuLy8gYW5ndWxhci5tb2R1bGUgaXMgYSBnbG9iYWwgcGxhY2UgZm9yIGNyZWF0aW5nLCByZWdpc3RlcmluZyBhbmQgcmV0cmlldmluZyBBbmd1bGFyIG1vZHVsZXNcbi8vICdzdGFydGVyJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xud2luZG93LmFwcCA9IGFuZ3VsYXIubW9kdWxlKCdCbGFua0FnYWluc3RIdW1hbml0eScsIFsnaW9uaWMnLCAndWkucm91dGVyJywnbmdDb3Jkb3ZhJywnbmdDb3Jkb3ZhT2F1dGgnLCAnbmdTdG9yYWdlJywgJ3VpLmJvb3RzdHJhcCddKVxuXG5hcHAucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtKSB7XG4gICAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICAgICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAgICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuXG4gICAgICAgICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcbiAgICAgICAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxuICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgICAgICAgIFN0YXR1c0Jhci5zdHlsZUxpZ2h0Q29udGVudCgpXG4gICAgICAgIH1cbiAgICB9KTtcblxufSlcbiIsImFwcC5jb250cm9sbGVyKCdMb2dvdXRDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBVc2VyRmFjdG9yeSwgJHN0YXRlLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCl7XG5cdCRzY29wZS5sb2dPdXQgPSBmdW5jdGlvbigpe1xuXHRcdFVzZXJGYWN0b3J5LmxvZ091dCgpXG5cdFx0JHN0YXRlLmdvKCdsb2dpbicpXG5cdH1cbn0pIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcil7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdjYXJkcycsIHtcblx0XHR1cmw6ICcvY2FyZHMnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvY2FyZHMtdGVzdC9jYXJkcy10ZXN0Lmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdDYXJkc1Rlc3RDdHJsJ1xuXHR9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0NhcmRzVGVzdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpe1xuIFx0JHNjb3BlLmdyZWV0aW5nID0gXCJISVwiXG59KSIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdkZWNrcycsIHtcblx0XHR1cmw6ICdkZWNrcy86dGVhbWlkJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2RlY2tzL2RlY2tzLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdEZWNrQ3RybCcsXG5cdFx0cmVzb2x2ZToge1xuXHRcdFx0ZGVja3M6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkKHN0YXRlUGFyYW1zLnRlYW1JZClcblx0XHR9XG5cdH0pXG5cbn0pXG5cbmFwcC5jb250cm9sbGVyKCdEZWNrQ3RybCcsICgkc2NvcGUpID0+IHtcblxuXG5cdFxufSkiLCIvLyAoZnVuY3Rpb24gKCkge1xuXG4vLyAgICAgJ3VzZSBzdHJpY3QnO1xuXG4vLyAgICAgLy8gSG9wZSB5b3UgZGlkbid0IGZvcmdldCBBbmd1bGFyISBEdWgtZG95LlxuLy8gICAgIGlmICghd2luZG93LmFuZ3VsYXIpIHRocm93IG5ldyBFcnJvcignSSBjYW5cXCd0IGZpbmQgQW5ndWxhciEnKTtcblxuLy8gICAgIHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnZnNhUHJlQnVpbHQnLCBbXSk7XG5cbi8vICAgICBhcHAuZmFjdG9yeSgnU29ja2V0JywgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICBpZiAoIXdpbmRvdy5pbykgdGhyb3cgbmV3IEVycm9yKCdzb2NrZXQuaW8gbm90IGZvdW5kIScpO1xuLy8gICAgICAgICByZXR1cm4gd2luZG93LmlvKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pO1xuLy8gICAgIH0pO1xuXG4vLyAgICAgLy8gQVVUSF9FVkVOVFMgaXMgdXNlZCB0aHJvdWdob3V0IG91ciBhcHAgdG9cbi8vICAgICAvLyBicm9hZGNhc3QgYW5kIGxpc3RlbiBmcm9tIGFuZCB0byB0aGUgJHJvb3RTY29wZVxuLy8gICAgIC8vIGZvciBpbXBvcnRhbnQgZXZlbnRzIGFib3V0IGF1dGhlbnRpY2F0aW9uIGZsb3cuXG4vLyAgICAgYXBwLmNvbnN0YW50KCdBVVRIX0VWRU5UUycsIHtcbi8vICAgICAgICAgbG9naW5TdWNjZXNzOiAnYXV0aC1sb2dpbi1zdWNjZXNzJyxcbi8vICAgICAgICAgbG9naW5GYWlsZWQ6ICdhdXRoLWxvZ2luLWZhaWxlZCcsXG4vLyAgICAgICAgIGxvZ291dFN1Y2Nlc3M6ICdhdXRoLWxvZ291dC1zdWNjZXNzJyxcbi8vICAgICAgICAgc2Vzc2lvblRpbWVvdXQ6ICdhdXRoLXNlc3Npb24tdGltZW91dCcsXG4vLyAgICAgICAgIG5vdEF1dGhlbnRpY2F0ZWQ6ICdhdXRoLW5vdC1hdXRoZW50aWNhdGVkJyxcbi8vICAgICAgICAgbm90QXV0aG9yaXplZDogJ2F1dGgtbm90LWF1dGhvcml6ZWQnXG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuZmFjdG9yeSgnQXV0aEludGVyY2VwdG9yJywgZnVuY3Rpb24gKCRyb290U2NvcGUsICRxLCBBVVRIX0VWRU5UUykge1xuLy8gICAgICAgICB2YXIgc3RhdHVzRGljdCA9IHtcbi8vICAgICAgICAgICAgIDQwMTogQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCxcbi8vICAgICAgICAgICAgIDQwMzogQVVUSF9FVkVOVFMubm90QXV0aG9yaXplZCxcbi8vICAgICAgICAgICAgIDQxOTogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsXG4vLyAgICAgICAgICAgICA0NDA6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0XG4vLyAgICAgICAgIH07XG4vLyAgICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgICAgICByZXNwb25zZUVycm9yOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3Qoc3RhdHVzRGljdFtyZXNwb25zZS5zdGF0dXNdLCByZXNwb25zZSk7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXNwb25zZSlcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfTtcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5jb25maWcoZnVuY3Rpb24gKCRodHRwUHJvdmlkZXIpIHtcbi8vICAgICAgICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaChbXG4vLyAgICAgICAgICAgICAnJGluamVjdG9yJyxcbi8vICAgICAgICAgICAgIGZ1bmN0aW9uICgkaW5qZWN0b3IpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJGluamVjdG9yLmdldCgnQXV0aEludGVyY2VwdG9yJyk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIF0pO1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLnNlcnZpY2UoJ0F1dGhTZXJ2aWNlJywgZnVuY3Rpb24gKCRodHRwLCBTZXNzaW9uLCAkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUywgJHEpIHtcblxuLy8gICAgICAgICBmdW5jdGlvbiBvblN1Y2Nlc3NmdWxMb2dpbihyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgdmFyIHVzZXIgPSByZXNwb25zZS5kYXRhLnVzZXI7XG4vLyAgICAgICAgICAgICBTZXNzaW9uLmNyZWF0ZSh1c2VyKTtcbi8vICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dpblN1Y2Nlc3MpO1xuLy8gICAgICAgICAgICAgcmV0dXJuIHVzZXI7XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICAvLyBVc2VzIHRoZSBzZXNzaW9uIGZhY3RvcnkgdG8gc2VlIGlmIGFuXG4vLyAgICAgICAgIC8vIGF1dGhlbnRpY2F0ZWQgdXNlciBpcyBjdXJyZW50bHkgcmVnaXN0ZXJlZC5cbi8vICAgICAgICAgdGhpcy5pc0F1dGhlbnRpY2F0ZWQgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gISFTZXNzaW9uLnVzZXI7XG4vLyAgICAgICAgIH07XG5cbiAgICAgICAgXG4vLyAgICAgICAgIHRoaXMuaXNBZG1pbiA9IGZ1bmN0aW9uKHVzZXJJZCl7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZygncnVubmluZyBhZG1pbiBmdW5jJylcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJylcbi8vICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEudXNlci5pc0FkbWluKVxuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgdGhpcy5nZXRMb2dnZWRJblVzZXIgPSBmdW5jdGlvbiAoZnJvbVNlcnZlcikge1xuXG4vLyAgICAgICAgICAgICAvLyBJZiBhbiBhdXRoZW50aWNhdGVkIHNlc3Npb24gZXhpc3RzLCB3ZVxuLy8gICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSB1c2VyIGF0dGFjaGVkIHRvIHRoYXQgc2Vzc2lvblxuLy8gICAgICAgICAgICAgLy8gd2l0aCBhIHByb21pc2UuIFRoaXMgZW5zdXJlcyB0aGF0IHdlIGNhblxuLy8gICAgICAgICAgICAgLy8gYWx3YXlzIGludGVyZmFjZSB3aXRoIHRoaXMgbWV0aG9kIGFzeW5jaHJvbm91c2x5LlxuXG4vLyAgICAgICAgICAgICAvLyBPcHRpb25hbGx5LCBpZiB0cnVlIGlzIGdpdmVuIGFzIHRoZSBmcm9tU2VydmVyIHBhcmFtZXRlcixcbi8vICAgICAgICAgICAgIC8vIHRoZW4gdGhpcyBjYWNoZWQgdmFsdWUgd2lsbCBub3QgYmUgdXNlZC5cblxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuaXNBdXRoZW50aWNhdGVkKCkgJiYgZnJvbVNlcnZlciAhPT0gdHJ1ZSkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKFNlc3Npb24udXNlcik7XG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIC8vIE1ha2UgcmVxdWVzdCBHRVQgL3Nlc3Npb24uXG4vLyAgICAgICAgICAgICAvLyBJZiBpdCByZXR1cm5zIGEgdXNlciwgY2FsbCBvblN1Y2Nlc3NmdWxMb2dpbiB3aXRoIHRoZSByZXNwb25zZS5cbi8vICAgICAgICAgICAgIC8vIElmIGl0IHJldHVybnMgYSA0MDEgcmVzcG9uc2UsIHdlIGNhdGNoIGl0IGFuZCBpbnN0ZWFkIHJlc29sdmUgdG8gbnVsbC5cbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJykudGhlbihvblN1Y2Nlc3NmdWxMb2dpbikuY2F0Y2goZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuLy8gICAgICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmxvZ2luID0gZnVuY3Rpb24gKGNyZWRlbnRpYWxzKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2xvZ2luJywgY3JlZGVudGlhbHMpXG4vLyAgICAgICAgICAgICAgICAgLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pXG4vLyAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCh7IG1lc3NhZ2U6ICdJbnZhbGlkIGxvZ2luIGNyZWRlbnRpYWxzLid9KTtcbi8vICAgICAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLnNpZ251cCA9IGZ1bmN0aW9uKGNyZWRlbnRpYWxzKXtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4vLyAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4vLyAgICAgICAgICAgICAgICAgdXJsOiAnL3NpZ251cCcsXG4vLyAgICAgICAgICAgICAgICAgZGF0YTogY3JlZGVudGlhbHNcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4gcmVzdWx0LmRhdGEpXG4vLyAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oKXtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHttZXNzYWdlOiAnVGhhdCBlbWFpbCBpcyBhbHJlYWR5IGJlaW5nIHVzZWQuJ30pO1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmxvZ291dCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9sb2dvdXQnKS50aGVuKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICBTZXNzaW9uLmRlc3Ryb3koKTtcbi8vICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoQVVUSF9FVkVOVFMubG9nb3V0U3VjY2Vzcyk7XG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfTtcblxuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLnNlcnZpY2UoJ1Nlc3Npb24nLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMpIHtcblxuLy8gICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbi8vICAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCwgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgc2VsZi5kZXN0cm95KCk7XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgICRyb290U2NvcGUuJG9uKEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0LCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICBzZWxmLmRlc3Ryb3koKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcblxuLy8gICAgICAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uICh1c2VyKSB7XG4vLyAgICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICB9KTtcblxuLy8gfSgpKTtcbiIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnL2dhbWUnLFxuICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL2dhbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdHYW1lQ3RybCcsXG4gICAgfSlcbiAgICAuc3RhdGUoJ2dhbWUuYWN0aXZlLWdhbWUnLCB7XG4gICAgICAgIHVybDogJy86Z2FtZUlkL2FjdGl2ZS1nYW1lJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL2FjdGl2ZS1nYW1lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnQWN0aXZlR2FtZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBnYW1lIDogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldEdhbWVCeUdhbWVJZCgkc3RhdGVQYXJhbXMuZ2FtZUlkKVxuICAgICAgICB9XG4gICAgfSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdHYW1lQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5KSA9PiB7ICAgXG4gICBcbn0pXG5cbmFwcC5jb250cm9sbGVyKFwiQWN0aXZlR2FtZUN0cmxcIiwgKCRzY29wZSwgR2FtZUZhY3RvcnksIEFjdGl2ZUdhbWVGYWN0b3J5LCBnYW1lLCAkc3RhdGVQYXJhbXMsICRsb2NhbFN0b3JhZ2UpID0+IHtcblxuICAgIGNvbnN0IGdhbWVJZCA9ICRzdGF0ZVBhcmFtcy5nYW1lSWQ7XG4gICAgY29uc3QgcGxheWVySWQgPSAkbG9jYWxTdG9yYWdlLnVzZXIuaWQ7XG4gICAgY29uc3QgdGVhbUlkID0gJGxvY2FsU3RvcmFnZS50ZWFtLmlkXG4gICAgJHNjb3BlLmdhbWUgPSBnYW1lO1xuICAgICRzY29wZS5nYW1lTmFtZSA9ICRzY29wZS5nYW1lLnNldHRpbmdzLm5hbWU7XG4gICAgY29uc29sZS5sb2coXCJhY3RpdmUgc3RhdGUgZ2FtZVwiLCBKU09OLnN0cmluZ2lmeSgkc2NvcGUuZ2FtZSkpO1xuXG4gICAgLy90aGlzIHNob3VsZCBiZSB1bmNvbW1lbnRlZCBpbiBmaW5hbCB2ZXJzaW9uc1xuICAgIC8vJHNjb3BlLndoaXRlQ2FyZHMgPSAkc2NvcGUuZ2FtZS5wbGF5ZXJzW3BsYXllcklkXS5oYW5kO1xuXG4gICAgLy90ZW1wb3JhcnkgaW1wbGVtZW50YXRpb24gZm9yIGRlc2lnbiBwdXJwb3Nlcy5cbiAgICAvLyAkc2NvcGUuZ2FtZS53aGl0ZUNhcmRzID0gJHNjb3BlLmdhbWUucGlsZS53aGl0ZWNhcmRzXG4gICAgJHNjb3BlLnNob3dDYXJkcyA9IGZhbHNlO1xuXG4gICAgJHNjb3BlLnBsYXllckNvdW50ID0gT2JqZWN0LmtleXMoJHNjb3BlLmdhbWUucGxheWVycykubGVuZ3RoO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKCdXSElURUNBUkRTJywgJHNjb3BlLndoaXRlQ2FyZHMpO1xuXG4gICAgJHNjb3BlLm9uU3dpcGVEb3duID0gKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnd29ya2luZycpO1xuICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuc2hvd0NhcmRzKTtcbiAgICAgICAgJHNjb3BlLnNob3dDYXJkcyA9IHRydWUgO1xuICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuc2hvd0NhcmRzKTtcbiAgICAgICAgJHNjb3BlLiRldmFsQXN5bmMoKTtcblxuICAgIH1cblxuICAgICRzY29wZS5vblN3aXBlVXAgPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic3dpcGVkIHVwXCIpO1xuICAgICAgICAvL3RoaXMgd2lsbCB0cmlnZ2VyIHN1Ym1pc3NvbiBmdW5jdGlvbiB1c2luZyBjYXJkJ3MgXG4gICAgICAgIC8vdW5pcXVlIGlkXG4gICAgfVxuXG4gICAgQWN0aXZlR2FtZUZhY3RvcnkucmVmaWxsTXlIYW5kKGdhbWVJZCwgcGxheWVySWQsIHRlYW1JZCk7XG5cbiAgICAkc2NvcGUuJG9uKCdjaGFuZ2VkR2FtZScsIChldmVudCxzbmFwc2hvdCkgPT57XG4gICAgICAgICRzY29wZS5nYW1lID0gc25hcHNob3Q7XG4gICAgfSlcbiAgICBcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdTdWJtaXNzaW9uR2FtZUN0cmwnLCAoJHNjb3BlLCAkbG9jYWxTdG9yYWdlKSA9PiB7XG5cblxufSlcblxuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgIHVybDogJy8nLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2hvbWUvaG9tZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgZ2FtZXM6IGZ1bmN0aW9uKEdhbWVGYWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdIb21lQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCAkY29yZG92YU9hdXRoLCBVc2VyRmFjdG9yeSwgR2FtZUZhY3RvcnksICRsb2NhbFN0b3JhZ2UsIGdhbWVzLCAkaW9uaWNQb3B1cCkge1xuICAgICRzY29wZS5zdGFydE5ld0dhbWUgPSBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWU7XG4gICAgJHNjb3BlLnN0b3JhZ2UgPSAkbG9jYWxTdG9yYWdlO1xuICAgICRzY29wZS5nYW1lcyA9IGdhbWVzO1xuXG4gICAgY29uc29sZS5sb2coXCJnYW1lc1wiLCBKU09OLnN0cmluZ2lmeSgkc2NvcGUuZ2FtZXMpKVxuICAgICRzY29wZS5nb1RvTmV3R2FtZSA9ICgpID0+IHtcbiAgICAgICAgJHN0YXRlLmdvKCduZXctZ2FtZS5tYWluJylcbiAgICB9XG5cblxuICAgICRzY29wZS5jcmVhdGVOZXdHYW1lID0gKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnZ29pbmcgdG8gbmV3IHN0YXRlJylcbiAgICAgICAgJHN0YXRlLmdvKCduZXctZ2FtZS5tYWluJylcbiAgICB9XG5cbiAgICAkc2NvcGUuam9pbkdhbWUgPSBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWQ7XG5cbiAgICAkc2NvcGUuc2hvd1BvcHVwID0gZnVuY3Rpb24oZ2FtZUlkKSB7XG5cbiAgICAgICAgJHNjb3BlLmdhbWUgPSAkc2NvcGUuZ2FtZXNbZ2FtZUlkXTtcbiAgICAgICAgJHNjb3BlLmdhbWVOYW1lID0gJHNjb3BlLmdhbWUuc2V0dGluZ3MubmFtZTtcbiAgICAgICAgJHNjb3BlLnBsYXllckNvdW50ID0gT2JqZWN0LmtleXMoJHNjb3BlLmdhbWUucGxheWVycykubGVuZ3RoO1xuICAgICAgICAkc2NvcGUud2FpdGluZ0ZvclBsYXllcnMgPSAgKCRzY29wZS5nYW1lLnNldHRpbmdzLm1pblBsYXllcnMgfHwgNCkgLSAkc2NvcGUucGxheWVyQ291bnQ7XG4gICAgICAgICBcbiAgICAgICAgIGNvbnN0IG15UG9wdXAgPSAkaW9uaWNQb3B1cC5zaG93KHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnanMvaG9tZS9wb3B1cC5odG1sJyxcbiAgICAgICAgICAgIHRpdGxlOiAnSm9pbiAnICsgJHNjb3BlLmdhbWVOYW1lLFxuICAgICAgICAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgICAgICAgIGJ1dHRvbnM6IFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIHt0ZXh0OiAnR28gYmFjayd9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0pvaW4gZ2FtZScsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdidXR0b24tYmFsYW5jZWQnLFxuICAgICAgICAgICAgICAgICAgICBvblRhcDogZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuam9pbkdhbWUoZ2FtZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnZ2FtZS5hY3RpdmUtZ2FtZScsIHsgZ2FtZUlkOiBnYW1lSWQgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSlcbiAgICB9XG59KVxuXG4iLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSA9PiB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbmV3LWdhbWUnLCB7XG4gICAgICAgIHVybDogJy9uZXctZ2FtZScsXG4gICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL21haW4uaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdOZXdHYW1lQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIHRlYW1EZWNrczogKEdhbWVGYWN0b3J5KSA9PiBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkKCksXG4gICAgICAgICAgICBzdGFuZGFyZERlY2s6IChHYW1lRmFjdG9yeSkgPT4gR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCgwKVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIC5zdGF0ZSgnbmV3LWdhbWUubWFpbicsIHtcbiAgICAgICAgdXJsOiAnL3NldHVwLWdhbWUnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL25ldy1nYW1lLmh0bWwnLFxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ25ldy1nYW1lLmFkZC1kZWNrcycsIHtcbiAgICAgICAgdXJsOiAnL2FkZC1kZWNrcycsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvYWRkLWRlY2tzLmh0bWwnLFxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ25ldy1nYW1lLmRlY2snLCB7XG4gICAgICAgIHVybDogJy9kZWNrLzpkZWNrSWQnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL2RlY2suaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdEZWNrQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGNhcmRzOiAoR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcykgPT4gR2FtZUZhY3RvcnkuZ2V0Q2FyZHNCeURlY2tJZCgkc3RhdGVQYXJhbXMuZGVja0lkKVxuICAgICAgICB9XG5cblxuICAgIH0pXG5cbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvbmV3LWdhbWUvc2V0dXAtZ2FtZScpO1xufSlcblxuYXBwLmNvbnRyb2xsZXIoJ05ld0dhbWVDdHJsJywgKCRzY29wZSwgR2FtZUZhY3RvcnksICRzdGF0ZSwgdGVhbURlY2tzLCBzdGFuZGFyZERlY2spID0+IHtcbiAgICAkc2NvcGUuY3VycmVudFZpZXcgPSAnYWRkRGVja3MnXG4gICAgJHNjb3BlLmdhbWVDb25maWcgPSB7fTtcbiAgICAkc2NvcGUuZ2FtZUNvbmZpZy5kZWNrcyA9IHt9O1xuICAgICRzY29wZS5nb1RvRGVja3MgPSAoKSA9PiB7XG4gICAgICAgICRzdGF0ZS5nbygnbmV3LWdhbWUuYWRkLWRlY2tzJywge30sIHsgbG9jYXRpb246IHRydWUsIHJlbG9hZDogdHJ1ZSB9KVxuICAgIH1cblxuICAgICRzY29wZS5kZWNrcyA9IHN0YW5kYXJkRGVjay5jb25jYXQodGVhbURlY2tzKTtcblxuICAgICRzY29wZS5zdGFydE5ld0dhbWUgPSAoZ2FtZUNvbmZpZykgPT4ge1xuICAgICAgICBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWUoZ2FtZUNvbmZpZykudGhlbigoaWQpID0+IHtcbiAgICAgICAgICAgIEdhbWVGYWN0b3J5LmFkZFBpbGVUb0dhbWUoaWQsICRzY29wZS5nYW1lQ29uZmlnLmRlY2tzKVxuICAgICAgICAgICAgJHN0YXRlLmdvKCdnYW1lLmFjdGl2ZS1nYW1lJywge2dhbWVJZDogaWR9KSBcblxuICAgICAgICB9KVxuICAgIH1cbiAgICAkc2NvcGUuYWRkRGVja3NUb0dhbWUgPSBHYW1lRmFjdG9yeS5hZGREZWNrcztcbiAgICAvLyAkc2NvcGUuJG9uKCdjaGFuZ2VkR2FtZScsIChldmVudCwgZGF0YSkgPT4ge1xuICAgIC8vICAgICBjb25zb2xlLmxvZygncmVjZWl2ZWQgZXZlbnQnKVxuICAgIC8vICAgICBjb25zb2xlLmxvZygnZGF0YSBvYmo6JywgZGF0YSlcbiAgICAvLyAgICAgJHNjb3BlLmdhbWUgPSBkYXRhO1xuICAgIC8vICAgICAkc2NvcGUuJGRpZ2VzdCgpXG5cbiAgICAvLyB9KVxuXG5cbn0pXG5cbmFwcC5jb250cm9sbGVyKCdEZWNrQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkc3RhdGUsIGNhcmRzKSA9PiB7XG4gICAgJHNjb3BlLmNhcmRzID0gY2FyZHNcbn0pXG5cbiIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcil7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdsb2dpbicsIHtcblx0XHR1cmw6ICcvbG9naW4nLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvbG9naW4vbG9naW4uaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0xvZ2luQ3RybCdcblx0fSlcblx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2xvZ2luJyk7XG59KVxuXG5hcHAuY29udHJvbGxlcignTG9naW5DdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUsIExvZ2luRmFjdG9yeSwgVXNlckZhY3RvcnksICRjb3Jkb3ZhT2F1dGgsICRsb2NhbFN0b3JhZ2UsICR0aW1lb3V0LCAkaW9uaWNTaWRlTWVudURlbGVnYXRlKXtcbiBcdCRzY29wZS5sb2dpbldpdGhTbGFjayA9IGZ1bmN0aW9uKCl7XG4gXHRcdHJldHVybiBMb2dpbkZhY3RvcnkuZ2V0U2xhY2tDcmVkcygpXG4gXHRcdC50aGVuKGNyZWRzID0+e1xuIFx0XHRcdHJldHVybiAkY29yZG92YU9hdXRoLnNsYWNrKGNyZWRzLmNsaWVudElELCBjcmVkcy5jbGllbnRTZWNyZXQsIFsnaWRlbnRpdHkuYmFzaWMnLCAnaWRlbnRpdHkudGVhbScsICdpZGVudGl0eS5hdmF0YXInXSlcbiBcdFx0fSlcbiBcdFx0LnRoZW4oaW5mbyA9PiBVc2VyRmFjdG9yeS5zZXRVc2VyKGluZm8pKVxuIFx0XHQudGhlbigoKSA9PiAkc3RhdGUuZ28oJ2hvbWUnKSlcbiBcdH1cblxuIFx0JGlvbmljU2lkZU1lbnVEZWxlZ2F0ZS5jYW5EcmFnQ29udGVudChmYWxzZSk7XG5cbiBcdCRzY29wZS4kb24oJyRpb25pY1ZpZXcubGVhdmUnLCBmdW5jdGlvbiAoKSB7ICRpb25pY1NpZGVNZW51RGVsZWdhdGUuY2FuRHJhZ0NvbnRlbnQodHJ1ZSkgfSk7XG5cbiBcdCRzY29wZS5zdG9yYWdlID0gJGxvY2FsU3RvcmFnZVxuXG4gXHRmdW5jdGlvbiByZWRpcmVjdFVzZXIoKXtcbiBcdFx0Y29uc29sZS5sb2coXCJzY29wZSBzdG9yYWdlIHVzZXJcIiwgJHNjb3BlLnN0b3JhZ2UudXNlcilcbiBcdFx0aWYgKCRzY29wZS5zdG9yYWdlLnVzZXIpICRzdGF0ZS5nbygnaG9tZScpXG4gXHR9XG5cblx0cmVkaXJlY3RVc2VyKCk7XG59KSIsIi8vRGlyZWN0aXZlIEZpbGUiLCJhcHAuZmFjdG9yeSgnQWN0aXZlR2FtZUZhY3RvcnknLCAoJGh0dHAsICRyb290U2NvcGUsICRsb2NhbFN0b3JhZ2UpID0+IHtcblxuICAgICAgICBjb25zdCBBY3RpdmVHYW1lRmFjdG9yeSA9IHt9O1xuXG4gICAgICAgIGNvbnN0IHJlZmlsbGVyID0gKGNhcmRzTmVlZGVkLCBwaWxlUmVmLCBoYW5kUmVmKSA9PiB7XG4gICAgICAgICAgcGlsZVJlZi5saW1pdFRvRmlyc3QoY2FyZHNOZWVkZWQpLm9uY2UoJ3ZhbHVlJywgY2FyZHNTbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICBjYXJkc1NuYXBzaG90LmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgICAgICAgIGxldCB1cGRhdGVPYmogPSB7fVxuICAgICAgICAgICAgICBjYXJkLnJlZi50cmFuc2FjdGlvbihjYXJkRGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICB1cGRhdGVPYmpbY2FyZC5rZXldID0gY2FyZERhdGFcbiAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBoYW5kUmVmLnVwZGF0ZSh1cGRhdGVPYmopKVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgICAgIH1cblxuICAgICAgICBBY3RpdmVHYW1lRmFjdG9yeS5yZWZpbGxNeUhhbmQgPSAoZ2FtZUlkLCBwbGF5ZXJJZCwgdGVhbUlkKSA9PiB7XG4gICAgICAgICAgLy8gaG93IG1hbnkgY2FyZHMgZG8gSSBuZWVkP1xuICAgICAgICAgIGxldCBjYXJkc05lZWRlZCA9IDBcbiAgICAgICAgICBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAgIGNvbnN0IGhhbmRSZWYgPSBnYW1lUmVmLmNoaWxkKGBwbGF5ZXJzLyR7cGxheWVySWR9L2hhbmRgKVxuICAgICAgICAgIGNvbnN0IHBpbGVSZWYgPSBnYW1lUmVmLmNoaWxkKCdwaWxlL3doaXRlY2FyZHMnKVxuICAgICAgICAgIGhhbmRSZWYub25jZSgndmFsdWUnLCBoYW5kU25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICBjYXJkc05lZWRlZCA9IDcgLSBoYW5kU25hcHNob3QubnVtQ2hpbGRyZW4oKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgcmVmaWxsZXIoY2FyZHNOZWVkZWQsIHBpbGVSZWYsIGhhbmRSZWYpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgQWN0aXZlR2FtZUZhY3Rvcnkuc3VibWl0V2hpdGVDYXJkID0gKHBsYXllcklkLCBjYXJkSWQsIGdhbWVJZCwgdGVhbUlkKSA9PiB7XG4gICAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YCk7XG4gICAgICAgICAgY29uc3QgY2FyZFRvU3VibWl0ID0gZ2FtZVJlZi5jaGlsZChgcGxheWVycy8ke3BsYXllcklkfS9oYW5kLyR7Y2FyZElkfWApO1xuICAgICAgICAgIGNvbnN0IHN1Ym1pdFJlZiA9IGdhbWVSZWYuY2hpbGQoJ3N1Ym1pdHRlZFdoaXRlQ2FyZHMnKTtcbiAgICAgICAgICBmaXJlYmFzZU1vdmVTaW5nbGVLZXlWYWx1ZShjYXJkVG9TdWJtaXQsIHN1Ym1pdFJlZilcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHN1Ym1pdFJlZi5jaGlsZChjYXJkSWQpLnNldCh7XG4gICAgICAgICAgICAgIHN1Ym1pdHRlZEJ5OiBwbGF5ZXJJZFxuICAgICAgICAgICAgfSkpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gQWN0aXZlR2FtZUZhY3Rvcnk7IFxuXG5cbn0pOyIsImFwcC5mYWN0b3J5KCdHYW1lRmFjdG9yeScsICgkaHR0cCwgJHJvb3RTY29wZSwgJGxvY2FsU3RvcmFnZSwgJHEpID0+IHtcblxuICAgICAgICBjb25zdCBHYW1lRmFjdG9yeSA9IHt9O1xuXG4gICAgICAgIGNvbnN0IGluaXRpYWxpemVGaXJlYmFzZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICAgICAgYXBpS2V5OiBcIkFJemFTeUNpaFNOa1VsX08teHV6VnJMWkZ6X21aSkFHY3dxSmNkRVwiLFxuICAgICAgICAgICAgICAgICAgICBhdXRoRG9tYWluOiBcImJsYW5rYWdhaW5zdGh1bWFuaXR5LWEzZTdjLmZpcmViYXNlYXBwLmNvbVwiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhYmFzZVVSTDogXCJodHRwczovL2JsYW5rYWdhaW5zdGh1bWFuaXR5LWEzZTdjLmZpcmViYXNlaW8uY29tXCIsXG4gICAgICAgICAgICAgICAgICAgIHN0b3JhZ2VCdWNrZXQ6IFwiYmxhbmthZ2FpbnN0aHVtYW5pdHktYTNlN2MuYXBwc3BvdC5jb21cIixcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiNjQ3NDE1MDk5MTY5XCJcbiAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmaXJlYmFzZS5pbml0aWFsaXplQXBwKGNvbmZpZyk7XG4gICAgICAgIH07XG4gICAgICAgIGluaXRpYWxpemVGaXJlYmFzZSgpO1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZSA9IChnYW1lQ29uZmlnKSA9PiB7XG4gICAgICAgICAgICAvL2NhbiBhbHNvIGdldCBhbGwgdGhlIGRlY2tzIGJ5IHRlYW0gaGVyZSB0byBwcmVwYXJlXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGhlIHNldHRpbmdzIGFyZTonLCBnYW1lQ29uZmlnKVxuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gJGxvY2FsU3RvcmFnZS50ZWFtLmlkIHx8IDI7XG4gICAgICAgICAgICBjb25zdCBjcmVhdG9ySWQgPSAkbG9jYWxTdG9yYWdlLnVzZXIuaWQgfHwgMztcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCdodHRwOi8vMTkyLjE2OC40LjIyNToxMzM3L2FwaS9nYW1lcycsIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZ2FtZUNvbmZpZy5uYW1lIHx8ICdCb3JpbmcgTmFtZScsXG4gICAgICAgICAgICAgICAgICAgIHRlYW1JZDogdGVhbUlkLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdG9ySWQ6IGNyZWF0b3JJZCxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvck5hbWU6ICRsb2NhbFN0b3JhZ2UudXNlci5uYW1lIHx8ICdkYW4nLCAvL21pZ2h0IGJlIHVubmVjZXNzYXJ5IGlmIHdlIGhhdmUgdGhlIHVzZXIgaWRcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IGdhbWVDb25maWdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcbiAgICAgICAgICAgICAgICAudGhlbihnYW1lSWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYC90ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICAgICAgICAgICAgZ2FtZVJlZi5vbigndmFsdWUnLCBzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2NoYW5nZWRHYW1lJywgc25hcHNob3QudmFsKCkpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2FtZUlkO1xuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRDYXJkc0J5RGVja0lkID0gKGlkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vMTkyLjE2OC40LjIyNToxMzM3L2FwaS9kZWNrcy8ke2lkfS9jYXJkc2ApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKTtcbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5hZGRQaWxlVG9HYW1lID0gKGdhbWVJZCwgZGVja3MpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRlY2tzQXJyID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBkZWNrSWQgaW4gZGVja3MpIHtcbiAgICAgICAgICAgICAgICBkZWNrc0Fyci5wdXNoKGRlY2tJZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3RoZSBwaWxlIGlzJywgZGVja3NBcnIpIC8vY3VycmVudGx5IGFkZHMgYWxsIGRlY2tzXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChgaHR0cDovLzE5Mi4xNjguNC4yMjU6MTMzNy9hcGkvZ2FtZXMvJHtnYW1lSWR9L2RlY2tzYCwgeyAnZGVja3MnOiBkZWNrc0FyciB9KVxuICAgICAgICB9XG5cblxuXG4gICAgICAgIC8vIEdhbWVGYWN0b3J5LmFkZERlY2tzVG9HYW1lID0gKGdhbWVJZCwgZGVja3MpID0+IHtcbiAgICAgICAgLy8gICAgIHJldHVybiAkaHR0cC5wb3N0KGBhcGkvZ2FtZXMvJHtnYW1lSWR9L2RlY2tzYCwgZGVja3MpXG5cbiAgICAgICAgLy8gICAgIC8vIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfS9waWxlL2ApXG4gICAgICAgIC8vICAgICAvLyBnYW1lUmVmLnNldCh7XG4gICAgICAgIC8vICAgICAvLyAgICAgZGVja0lkOiB0cnVlXG4gICAgICAgIC8vICAgICAvLyB9KVxuICAgICAgICAvLyB9XG4gICAgICAgIC8vIEdhbWVGYWN0b3J5LmdldENhcmRzQnlEZWNrSWQgPSAoZ2FtZUlkLCBkZWNrSWQpID0+IHtcbiAgICAgICAgLy8gICAgIGNvbnN0IHRlYW1JZCA9ICRsb2NhbFN0b3JhZ2UudGVhbS5pZDtcbiAgICAgICAgLy8gICAgIGxldCBwaWxlUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH0vcGlsZWApO1xuXG4gICAgICAgIC8vICAgICByZXR1cm4gJGh0dHAuZ2V0KGBhcGkvZGVja3MvJHtkZWNrSWR9L2NhcmRzYClcbiAgICAgICAgLy8gICAgICAgICAudGhlbihkYXRhID0+IHJlcy5kYXRhKVxuICAgICAgICAvLyAgICAgICAgIC50aGVuKGNhcmRzID0+IHtcbiAgICAgICAgLy8gICAgICAgICAgICAgY29uc3QgYWRkaW5nQ2FyZHMgPSBjYXJkcy5tYXAoY2FyZCA9PiBwaWxlUmVmLnNldCh7XG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBbYCR7Y2FyZC5pZH1gXTogdHJ1ZVxuICAgICAgICAvLyAgICAgICAgICAgICB9KSlcblxuICAgICAgICAvLyAgICAgICAgIH0pXG4gICAgICAgIC8vIH1cblxuICAgICAgICAvLyBHYW1lRmFjdG9yeS5hZGRQaWxlVG9HYW1lMiA9IChnYW1lSWQpID0+IHtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKCdydW5uaWduIGFkZFBpbGVUb0dhbWUgd2l0aCBpZCcsIGdhbWVJZClcbiAgICAgICAgLy8gICAgIGNvbnN0IHRlYW1JZCA9ICRsb2NhbFN0b3JhZ2UudGVhbS5pZDtcbiAgICAgICAgLy8gICAgIGxldCBkZWNrUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH0vc2V0dGluZ3MvZGVja3NgKVxuXG4gICAgICAgIC8vICAgICBkZWNrUmVmLm9uY2UoJ3ZhbHVlJykudGhlbihzbmFwc2hvdCA9PiB7XG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbnN0IGFkZGluZ0NhcmRzID0gW107XG4gICAgICAgIC8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGUgdmFsdWUgaXNzc3MgJywgc25hcHNob3QudmFsKCkpXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hbGwgZGVjayBpZHNcbiAgICAgICAgLy8gICAgICAgICAgICAgZm9yICh2YXIgZGVja0lkIGluIHNuYXBzaG90LnZhbCgpKXtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxldCB4ID0gR2FtZUZhY3RvcnkuZ2V0Q2FyZHNCeURlY2tJZFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgYWRkaW5nQ2FyZHMucHVzaCgpXG4gICAgICAgIC8vICAgICAgICAgICAgIH1cblxuXG4gICAgICAgIC8vICAgICAgICAgICAgIF8ubWFwVmFsdWVzKHNuYXBzaG90LnZhbCgpLCB2ID0+IGRlY2tSZWYuc2V0KHtcblxuICAgICAgICAvLyAgICAgICAgICAgICB9KSlcblxuICAgICAgICAvLyAgICAgICAgICAgICBzbmFwc2hvdC52YWwoKVxuXG4gICAgICAgIC8vICAgICAgICAgICAgIF8ubWFwVmFsdWVzKHsgb25lOiAxLCB0d286IDIsIHRocmVlOiAzIH0sIHYgPT4gdiAqIDMpO1xuICAgICAgICAvLyAgICAgICAgIH0pXG4gICAgICAgIC8vIGxldCBwaWxlUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH0vcGlsZWApO1xuXG4gICAgICAgIC8vIHJldHVybiAkaHR0cC5nZXQoYGFwaS9kZWNrcy8ke2RlY2tJZH0vY2FyZHNgKVxuICAgICAgICAvLyAgICAgLnRoZW4oZGF0YSA9PiByZXMuZGF0YSlcbiAgICAgICAgLy8gICAgIC50aGVuKGNhcmRzID0+IHtcbiAgICAgICAgLy8gICAgICAgICBjb25zdCBhZGRpbmdDYXJkcyA9IGNhcmRzLm1hcChjYXJkID0+IHBpbGVSZWYuc2V0KHtcbiAgICAgICAgLy8gICAgICAgICAgICAgW2Ake2NhcmQuaWR9YF06IHRydWVcbiAgICAgICAgLy8gICAgICAgICB9KSlcblxuICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgLy8gfVxuXG5cbiAgICAgICAgR2FtZUZhY3Rvcnkuam9pbkdhbWVCeUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gJGxvY2FsU3RvcmFnZS50ZWFtLmlkO1xuICAgICAgICAgICAgY29uc3QgcGxheWVySWQgPSAkbG9jYWxTdG9yYWdlLnVzZXIuaWQ7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJOYW1lID0gJGxvY2FsU3RvcmFnZS51c2VyLm5hbWU7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfS9wbGF5ZXJzLyR7cGxheWVySWR9YClcbiAgICAgICAgICAgIHBsYXllclJlZi5zZXQoe1xuICAgICAgICAgICAgICAgIG5hbWU6IHBsYXllck5hbWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAgICAgZ2FtZVJlZi5vbigndmFsdWUnLCBzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdjaGFuZ2VkR2FtZScsIHNuYXBzaG90LnZhbCgpKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIEdhbWVGYWN0b3J5LmNyZWF0ZUdhbWVCeUlkRmlyZUJhc2UgPSAoZmlyZWJhc2VnYW1lSWQpID0+IHtcbiAgICAgICAgLy8gICAgIC8vcmV0dXJuICRodHRwLnBvc3QoYGh0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZmlyZWJhc2UvZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgLy8gICAgIC8vbmVlZHMgdG8gYmUgLnRoZW5hYmxlXG4gICAgICAgIC8vICAgICBjb25zdCBuZXdSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgZ2FtZXMvJHtmaXJlYmFzZWdhbWVJZH1gKS5wdXNoKCk7XG4gICAgICAgIC8vICAgICBuZXdSZWYuc2V0KHtcbiAgICAgICAgLy8gICAgICAgICBwbGF5ZXJJZDogcmVxLnF1ZXJ5LnBsYXllcklkXG4gICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQgPSAoaWQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRlYW1JZCA9ICh0eXBlb2YgaWQgIT09ICdudW1iZXInKSA/ICRsb2NhbFN0b3JhZ2UudGVhbS5pZCA6IGlkOyAvLyBpZCB8fCBsb2NhbHN0b3JhZ2UgZG9lc24ndCB3b3JrIGJlY2F1c2UgMCBpcyBmYWxzZXlcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8xOTIuMTY4LjQuMjI1OjEzMzcvYXBpL2RlY2tzP3RlYW09JHt0ZWFtSWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG5cbiAgICAgICAgfTtcblxuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldFVzZXJzQnlHYW1lSWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vMTkyLjE2OC40LjIyNToxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0vdXNlcnNgKTtcbiAgICAgICAgfTtcblxuXG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZUJ5R2FtZUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc3QgZGVmZXIgPSAkcS5kZWZlcigpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZ2FtZUlkKTtcbiAgICAgICAgICAgIGNvbnN0IHRlYW1JZCA9IDE7XG4gICAgICAgICAgICBjb25zdCBnYW1lc1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICAgIHJldHVybiBnYW1lc1JlZi5vbmNlKCd2YWx1ZScpLnRoZW4oc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdGQUNUT1JZVEVTVCcsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgIHJldHVybiBzbmFwc2hvdC52YWwoKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIC8vIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEtlZXAgdGhpcyBjb21tZW50ZWQgb3V0IG9yIHRoZSBob21lIHN0YXRlIHdpbGwgYnJlYWshIVxuICAgICAgICAvLyBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VGVhbUlkID0gKHRlYW1JZCkgPT4ge1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coJ3RoZSB0ZWFtIGlzIGlkJywgdGVhbUlkKVxuICAgICAgICAvLyAgICAgdGVhbUlkID0gdGVhbUlkIHx8ICRsb2NhbFN0b3JhZ2UudGVhbS5pZFxuXG4gICAgICAgIC8vICAgICBjb25zdCBnYW1lc1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXNgKVxuICAgICAgICAvLyAgICAgcmV0dXJuIGdhbWVzUmVmLm9uY2UoJ3ZhbHVlJykudGhlbihzbmFwc2hvdCA9PiB7IC8vbWlnaHQgYnJlYWsgYWZ0ZXIgeW91IGRvIGl0IG9uY2VcbiAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZygndGhlIHZhbCBpcycsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAvLyAgICAgICAgIHJldHVybiBzbmFwc2hvdC52YWwoKTtcbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vIH07XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCA9ICh0ZWFtSWQpID0+IHtcbiAgICAgICAgICAgIHRlYW1JZCA9IHRlYW1JZCB8fCAkbG9jYWxTdG9yYWdlLnRlYW0uaWRcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGUgdGVhbSBpcyBpZCcsIHRlYW1JZClcbiAgICAgICAgICAgIGNvbnN0IGRlZmVyID0gJHEuZGVmZXIoKTtcblxuICAgICAgICAgICAgY29uc3QgZ2FtZXNSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzYClcbiAgICAgICAgICAgIGdhbWVzUmVmLm9uKCd2YWx1ZScsIHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGhlIHZhbCBpcycsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUoc25hcHNob3QudmFsKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRlZmVyIHByb21pc2VcIiwgZGVmZXIucHJvbWlzZSlcbiAgICAgICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlVc2VyID0gKHVzZXJJZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnaHR0cDovLzE5Mi4xNjguNC4yMjU6MTMzNy9hcGkvZ2FtZXMvP3VzZXJJZD0nICsgdXNlcklkKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcbiAgICAgICAgfVxuXG4gICAgICAgIEdhbWVGYWN0b3J5LmFkZFBpbGVUb0dhbWUgPSAoZ2FtZUlkLCBkZWNrcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZWNrc0FyciA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBkZWNrSWQgaW4gZGVja3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlY2tzQXJyLnB1c2goZGVja0lkKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3RoZSBwaWxlIGlzJywgZGVja3NBcnIpIC8vY3VycmVudGx5IGFkZHMgYWxsIGRlY2tzXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGBodHRwOi8vMTkyLjE2OC40LjIyNToxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0vZGVja3NgLCB7ICdkZWNrcyc6IGRlY2tzQXJyIH0pXG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybiBHYW1lRmFjdG9yeTtcbiAgICB9XG5cbik7XG5cbiIsImFwcC5mYWN0b3J5KCdMb2dpbkZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCl7XG5cdHJldHVybiB7XG5cdFx0Z2V0U2xhY2tDcmVkczogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiAkaHR0cC5nZXQoJ2h0dHA6Ly8xOTIuMTY4LjQuMjI1OjEzMzcvYXBpL3NsYWNrJylcdFxuXHRcdFx0XHQudGhlbihyZXMgPT4ge1xuXHRcdFx0XHRcdHJldHVybiByZXMuZGF0YVxuXHRcdFx0XHR9KVxuXHRcdH1cblx0fVxufSlcbiIsImFwcC5mYWN0b3J5KCdVc2VyRmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCwgJHN0YXRlKXtcblx0XG5cdHJldHVybiB7XG5cdFx0c2V0VXNlcjogZnVuY3Rpb24oaW5mbyl7XG5cdFx0XHRyZXR1cm4gJGh0dHAoe1xuXHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdFx0dXJsOiAnaHR0cDovLzE5Mi4xNjguNC4yMjU6MTMzNy9hcGkvdXNlcnMnLFxuXHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRkYXRhOiBpbmZvXG5cdFx0XHR9KVxuXHRcdFx0LnRoZW4ocmVzID0+IHtcblx0XHRcdFx0dGhpcy5zZXRMb2NhbFN0b3JhZ2UocmVzLmRhdGEudXNlclswXSwgcmVzLmRhdGEudGVhbVswXSk7XG5cdFx0XHR9KVxuXHRcdH0sXG5cblx0XHRnZXRTbGFja0luZm86IGZ1bmN0aW9uKCl7XG5cdFx0XHRyZXR1cm4gJGh0dHAuZ2V0KCdodHRwczovL3NsYWNrLmNvbS9hcGkvdXNlcnMuaWRlbnRpdHknKVxuXHRcdH0sXG5cblx0XHRzZXRMb2NhbFN0b3JhZ2U6IGZ1bmN0aW9uKHVzZXIsIHRlYW0pe1xuXHRcdFx0JGxvY2FsU3RvcmFnZS51c2VyID0gdXNlcjtcblx0XHRcdCRsb2NhbFN0b3JhZ2UudGVhbSA9IHRlYW07XG5cdFx0fSxcblxuXHRcdGxvZ091dDogZnVuY3Rpb24oKXtcblx0XHRcdCRsb2NhbFN0b3JhZ2UuJHJlc2V0KCk7XG5cdFx0fVxuXHR9XG59KSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
