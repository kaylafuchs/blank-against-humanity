'use strict';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
<<<<<<< HEAD
window.app = angular.module('BlankAgainstHumanity', ['ionic', 'ui.router', 'ngCordova', 'ngCordovaOauth', 'ngStorage']);
=======
window.app = angular.module('BlankAgainstHumanity', ['ionic', 'ui.router', 'ngCordova', 'ngCordovaOauth', 'ngStorage', 'ngAnimate']);
>>>>>>> master

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
    var gameId = $stateParams.gameId;
    var playerId = $localStorage.user.id;
    console.log("player id", playerId);
    var teamId = $localStorage.team.id;
    $scope.game = game;
    $scope.gameName = $scope.game.settings.name;
    console.log("active state game", $scope.game);
    $scope.judge = $scope.game.players[$scope.game.currentJudge];
    console.log("the judge is", $scope.judge);
    $scope.blackCard = $scope.game.currentBlackCard;
    $scope.blackCardText = $scope.blackCard[Object.keys($scope.blackCard)[0]].text;
    console.log("the black card is", $scope.blackCardText);
    //this should be uncommented in final versions
    $scope.whiteCards = $scope.game.pile.whitecards;
    var slicer = Math.floor(Math.random() * $scope.whiteCards.length - 7);
    // $scope.playerHand = $scope.whiteCards.slice(slicer, slicer + 8)
    $scope.playerHand = $scope.game.players[playerId].hand;
    console.log('players hand', $scope.playerHand);

    //temporary implementation for design purposes.
    // $scope.game.whiteCards = $scope.game.pile.whitecards
    $scope.showCards = false;

    //$scope.playerHand = $scope.game.players[playerId].hand;
    //(console.log("player hand", $scope.hand))

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

    $scope.onDoubleTap = function (key) {
        console.log("double tapped");
        $scope.played = true;
        //call submit card function here.
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

app.controller('LoginCtrl', function ($scope, $state, UserFactory, $cordovaOauth, $localStorage, $timeout, $ionicSideMenuDelegate) {
    $scope.loginWithSlack = function () {
        return UserFactory.getSlackCreds().then(function (creds) {
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
                return GameFactory.getDecksByTeamId(1);
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
        console.log("called start new game");
        GameFactory.startNewGame(gameConfig).then(function (id) {
            console.log("made it to the .then");
            GameFactory.addPileToGame(id, $scope.gameConfig.decks);
            console.log("added pile to game");
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
app.factory('GameFactory', function ($http, $rootScope, $localStorage) {
    var ourIps = {
        nikita: "192.168.4.213",
        kayla: "192.168.4.225",
        nithya: "192.168.1.48",
        dan: "192.168.4.236"
    };
<<<<<<< HEAD
    var currentIp = ourIps.dan;
=======
    var currentIp = ourIps.kayla;
>>>>>>> master

    // start a new game derp
    var GameFactory = {};
    GameFactory.startNewGame = function (gameConfig) {
        //can also get all the decks by team here to prepare
        var teamId = $localStorage.team.id || 2;
        var creatorId = $localStorage.user.id || 3;
        return $http.post('http://' + currentIp + ':1337/api/games', {
            name: gameConfig.name || 'AWESOME Name',
            teamId: teamId,
            creatorId: creatorId,
            creatorName: $localStorage.user.name || 'dan', //might be unnecessary if we have the user id
            settings: gameConfig
        }).then(function (res) {
            var gameId = res.data;
            var gameRef = firebase.database().ref('/teams/' + teamId + '/games/' + gameId);
            gameRef.on('value', function (snapshot) {
                $rootScope.$broadcast('changedGame', snapshot.val());
            });
            return gameId;
        });
    };
    // get all of a decks cards to display when looking at decks
    GameFactory.getCardsByDeckId = function (id) {
        return $http.get('http://' + currentIp + ':1337/api/decks/' + id + '/cards').then(function (res) {
            return res.data;
        });
    };

    // TODO: combine this into the above startNewGame func
    // take all of the selected decks' cards and put them in the firebase game object pile (through route)
    GameFactory.addPileToGame = function (gameId, decks) {
        console.log("adding pile to game");
        var decksArr = [];
        for (var deckId in decks) {
            decksArr.push(deckId);
        }
        return $http.post('http://' + currentIp + ':1337/api/games/' + gameId + '/decks', {
            'decks': decksArr
        });
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
        $http.post('http://' + currentIp + ':1337/api/games/' + gameId + '?playerId=' + playerId);
    };

    GameFactory.getDecksByTeamId = function (id) {
        var teamId = typeof id !== 'number' ? $localStorage.team.id : id; // id || localstorage doesn't work because 0 is falsey
        return $http.get('http://' + currentIp + ':1337/api/decks?team=' + teamId).then(function (res) {
            return res.data;
        });
    };

    GameFactory.getUsersByGameId = function (gameId) {
        return $http.get('http://' + currentIp + ':1337/api/games/' + gameId + '/users');
    };

    GameFactory.getGameByGameId = function (gameId, teamId) {
        teamId = teamId || $localStorage.team.id;
        var gamesRef = firebase.database().ref('teams/' + teamId + '/games/' + gameId);
        return gamesRef.once('value').then(function (snapshot) {
            return snapshot.val();
        });
    };

    GameFactory.getGamesByTeamId = function (teamId) {
        teamId = teamId || $localStorage.team.id;
        return $http.get('http://' + currentIp + ':1337/api/games/?teamId=' + teamId).then(function (res) {
            return res.data;
        }).catch(function (err) {
            return console.log(err);
        });
    };

    GameFactory.getGamesByUser = function (userId) {
        return $http.get('http://' + currentIp + ':1337/api/games/?userId=' + userId).then(function (res) {
            return res.data;
        }).catch(function (err) {
            return console.log(err);
        });
    };
    return GameFactory;
});

app.factory('UserFactory', function ($http, $localStorage) {
    var ourIps = {
        nikita: "192.168.4.213",
        kayla: "192.168.4.225",
        nithya: "192.168.1.48",
        dan: "192.168.4.236"
    };
<<<<<<< HEAD
    var currentIp = ourIps.dan;
=======
    var currentIp = ourIps.kayla;
>>>>>>> master
    return {
        setUser: function setUser(info) {
            var _this = this;

            return $http({
                method: 'POST',
                url: 'http://' + currentIp + ':1337/api/users',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: info
            }).then(function (res) {
                _this.setLocalStorage(res.data.user[0], res.data.team[0]);
            });
        },
        getSlackCreds: function getSlackCreds() {
            return $http.get('http://' + currentIp + ':1337/api/slack').then(function (res) {
                return res.data;
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
<<<<<<< HEAD
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImNhcmRzLXRlc3QvY2FyZHNUZXN0LmpzIiwiZGVja3MvZGVja3MuanMiLCJmcm9tIGZzZy9mcm9tLWZzZy5qcyIsImdhbWUvZ2FtZS5qcyIsImhvbWUvaG9tZS5qcyIsImxvZ2luL2xvZ2luLmpzIiwibmV3LWdhbWUvbmV3LWdhbWUuanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiLCJjb21tb24vZmFjdG9yaWVzL0FjdGl2ZUdhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9HYW1lRmFjdG9yeS5qcyIsImNvbW1vbi9mYWN0b3JpZXMvdXNlckZhY3RvcnkuanMiXSwibmFtZXMiOlsid2luZG93IiwiYXBwIiwiYW5ndWxhciIsIm1vZHVsZSIsInJ1biIsIiRpb25pY1BsYXRmb3JtIiwicmVhZHkiLCJjb3Jkb3ZhIiwicGx1Z2lucyIsIktleWJvYXJkIiwiaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyIiwiZGlzYWJsZVNjcm9sbCIsIlN0YXR1c0JhciIsInN0eWxlTGlnaHRDb250ZW50IiwiY29udHJvbGxlciIsIiRzY29wZSIsIlVzZXJGYWN0b3J5IiwiJHN0YXRlIiwiJGxvY2FsU3RvcmFnZSIsIiR0aW1lb3V0IiwibG9nT3V0IiwiZ28iLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsInN0YXRlIiwidXJsIiwidGVtcGxhdGVVcmwiLCJncmVldGluZyIsInJlc29sdmUiLCJkZWNrcyIsIkdhbWVGYWN0b3J5IiwiJHN0YXRlUGFyYW1zIiwiZ2V0RGVja3NCeVRlYW1JZCIsInN0YXRlUGFyYW1zIiwidGVhbUlkIiwiYWJzdHJhY3QiLCJnYW1lIiwiZ2V0R2FtZUJ5R2FtZUlkIiwiZ2FtZUlkIiwicGxheWVySWQiLCJ1c2VyIiwiaWQiLCJ0ZWFtIiwiZ2FtZU5hbWUiLCJzZXR0aW5ncyIsIm5hbWUiLCJ3aGl0ZUNhcmRzIiwicGxheWVycyIsImhhbmQiLCJzaG93Q2FyZHMiLCJwbGF5ZXJDb3VudCIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJBY3RpdmVHYW1lRmFjdG9yeSIsIm9uU3dpcGVEb3duIiwiY29uc29sZSIsImxvZyIsIiRldmFsQXN5bmMiLCJvblN3aXBlVXAiLCJyZWZpbGxNeUhhbmQiLCIkb24iLCJldmVudCIsInNuYXBzaG90IiwianVkZ2UiLCJjdXJyZW50SnVkZ2UiLCIkdXJsUm91dGVyUHJvdmlkZXIiLCJnYW1lcyIsImdldEdhbWVzQnlUZWFtSWQiLCIkY29yZG92YU9hdXRoIiwiJGlvbmljUG9wdXAiLCJzdGFydE5ld0dhbWUiLCJzdG9yYWdlIiwiSlNPTiIsInN0cmluZ2lmeSIsImdvVG9OZXdHYW1lIiwiam9pbkdhbWUiLCJqb2luR2FtZUJ5SWQiLCJzaG93UG9wdXAiLCJ3YWl0aW5nRm9yUGxheWVycyIsIm1pblBsYXllcnMiLCJteVBvcHVwIiwic2hvdyIsInRpdGxlIiwic2NvcGUiLCJidXR0b25zIiwidGV4dCIsInR5cGUiLCJvblRhcCIsIm90aGVyd2lzZSIsIiRpb25pY1NpZGVNZW51RGVsZWdhdGUiLCJsb2dpbldpdGhTbGFjayIsImdldFNsYWNrQ3JlZHMiLCJ0aGVuIiwic2xhY2siLCJjcmVkcyIsImNsaWVudElEIiwiY2xpZW50U2VjcmV0Iiwic2V0VXNlciIsImluZm8iLCJjYW5EcmFnQ29udGVudCIsInJlZGlyZWN0VXNlciIsInRlYW1EZWNrcyIsInN0YW5kYXJkRGVjayIsImNhcmRzIiwiZ2V0Q2FyZHNCeURlY2tJZCIsImRlY2tJZCIsImN1cnJlbnRWaWV3IiwiZ2FtZUNvbmZpZyIsImdvVG9EZWNrcyIsImxvY2F0aW9uIiwicmVsb2FkIiwiY29uY2F0IiwiYWRkUGlsZVRvR2FtZSIsImFkZERlY2tzVG9HYW1lIiwiYWRkRGVja3MiLCJmYWN0b3J5IiwiJGh0dHAiLCIkcm9vdFNjb3BlIiwicmVmaWxsZXIiLCJjYXJkc05lZWRlZCIsInBpbGVSZWYiLCJoYW5kUmVmIiwibGltaXRUb0ZpcnN0Iiwib25jZSIsImNhcmRzU25hcHNob3QiLCJmb3JFYWNoIiwidXBkYXRlT2JqIiwiY2FyZCIsInJlZiIsInRyYW5zYWN0aW9uIiwia2V5IiwiY2FyZERhdGEiLCJ1cGRhdGUiLCJjYXRjaCIsImVyciIsImdhbWVSZWYiLCJmaXJlYmFzZSIsImRhdGFiYXNlIiwiY2hpbGQiLCJoYW5kU25hcHNob3QiLCJudW1DaGlsZHJlbiIsInN1Ym1pdFdoaXRlQ2FyZCIsImNhcmRJZCIsImNhcmRUb1N1Ym1pdCIsInN1Ym1pdFJlZiIsImZpcmViYXNlTW92ZVNpbmdsZUtleVZhbHVlIiwic2V0Iiwic3VibWl0dGVkQnkiLCJvdXJJcHMiLCJuaWtpdGEiLCJrYXlsYSIsIm5pdGh5YSIsImRhbiIsImN1cnJlbnRJcCIsImNyZWF0b3JJZCIsInBvc3QiLCJjcmVhdG9yTmFtZSIsInJlcyIsImRhdGEiLCJvbiIsIiRicm9hZGNhc3QiLCJ2YWwiLCJnZXQiLCJkZWNrc0FyciIsInB1c2giLCJwbGF5ZXJOYW1lIiwicGxheWVyUmVmIiwiZ2V0VXNlcnNCeUdhbWVJZCIsImdhbWVzUmVmIiwiZ2V0R2FtZXNCeVVzZXIiLCJ1c2VySWQiLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0TG9jYWxTdG9yYWdlIiwiZ2V0U2xhY2tJbmZvIiwiJHJlc2V0Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBQSxPQUFBQyxHQUFBLEdBQUFDLFFBQUFDLE1BQUEsQ0FBQSxzQkFBQSxFQUFBLENBQUEsT0FBQSxFQUFBLFdBQUEsRUFBQSxXQUFBLEVBQUEsZ0JBQUEsRUFBQSxXQUFBLENBQUEsQ0FBQTs7QUFFQUYsSUFBQUcsR0FBQSxDQUFBLFVBQUFDLGNBQUEsRUFBQTtBQUNBQSxtQkFBQUMsS0FBQSxDQUFBLFlBQUE7QUFDQSxZQUFBTixPQUFBTyxPQUFBLElBQUFQLE9BQUFPLE9BQUEsQ0FBQUMsT0FBQSxDQUFBQyxRQUFBLEVBQUE7QUFDQTtBQUNBO0FBQ0FGLG9CQUFBQyxPQUFBLENBQUFDLFFBQUEsQ0FBQUMsd0JBQUEsQ0FBQSxJQUFBOztBQUVBO0FBQ0E7QUFD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bmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xuLy8gJ3N0YXJ0ZXInIGlzIHRoZSBuYW1lIG9mIHRoaXMgYW5ndWxhciBtb2R1bGUgZXhhbXBsZSAoYWxzbyBzZXQgaW4gYSA8Ym9keT4gYXR0cmlidXRlIGluIGluZGV4Lmh0bWwpXG4vLyB0aGUgMm5kIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiAncmVxdWlyZXMnXG53aW5kb3cuYXBwID0gYW5ndWxhci5tb2R1bGUoJ0JsYW5rQWdhaW5zdEh1bWFuaXR5JywgWydpb25pYycsICd1aS5yb3V0ZXInLCAnbmdDb3Jkb3ZhJywgJ25nQ29yZG92YU9hdXRoJywgJ25nU3RvcmFnZSddKVxuXG5hcHAucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtKSB7XG4gICAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICAgICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAgICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuXG4gICAgICAgICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcbiAgICAgICAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxuICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgICAgICAgIFN0YXR1c0Jhci5zdHlsZUxpZ2h0Q29udGVudCgpXG4gICAgICAgIH1cbiAgICB9KTtcblxufSlcblxuIiwiYXBwLmNvbnRyb2xsZXIoJ0xvZ291dEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIFVzZXJGYWN0b3J5LCAkc3RhdGUsICRsb2NhbFN0b3JhZ2UsICR0aW1lb3V0KXtcblx0JHNjb3BlLmxvZ091dCA9IGZ1bmN0aW9uKCl7XG5cdFx0VXNlckZhY3RvcnkubG9nT3V0KClcblx0XHQkc3RhdGUuZ28oJ2xvZ2luJylcblx0fVxufSkiLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKXtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2NhcmRzJywge1xuXHRcdHVybDogJy9jYXJkcycsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9jYXJkcy10ZXN0L2NhcmRzLXRlc3QuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0NhcmRzVGVzdEN0cmwnXG5cdH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignQ2FyZHNUZXN0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSl7XG4gXHQkc2NvcGUuZ3JlZXRpbmcgPSBcIkhJXCJcbn0pIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIpID0+IHtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2RlY2tzJywge1xuXHRcdHVybDogJ2RlY2tzLzp0ZWFtaWQnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvZGVja3MvZGVja3MuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0RlY2tDdHJsJyxcblx0XHRyZXNvbHZlOiB7XG5cdFx0XHRkZWNrczogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoc3RhdGVQYXJhbXMudGVhbUlkKVxuXHRcdH1cblx0fSlcblxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0RlY2tDdHJsJywgKCRzY29wZSkgPT4ge1xuXG5cblx0XG59KSIsIi8vIChmdW5jdGlvbiAoKSB7XG5cbi8vICAgICAndXNlIHN0cmljdCc7XG5cbi8vICAgICAvLyBIb3BlIHlvdSBkaWRuJ3QgZm9yZ2V0IEFuZ3VsYXIhIER1aC1kb3kuXG4vLyAgICAgaWYgKCF3aW5kb3cuYW5ndWxhcikgdGhyb3cgbmV3IEVycm9yKCdJIGNhblxcJ3QgZmluZCBBbmd1bGFyIScpO1xuXG4vLyAgICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdmc2FQcmVCdWlsdCcsIFtdKTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdTb2NrZXQnLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgIGlmICghd2luZG93LmlvKSB0aHJvdyBuZXcgRXJyb3IoJ3NvY2tldC5pbyBub3QgZm91bmQhJyk7XG4vLyAgICAgICAgIHJldHVybiB3aW5kb3cuaW8od2luZG93LmxvY2F0aW9uLm9yaWdpbik7XG4vLyAgICAgfSk7XG5cbi8vICAgICAvLyBBVVRIX0VWRU5UUyBpcyB1c2VkIHRocm91Z2hvdXQgb3VyIGFwcCB0b1xuLy8gICAgIC8vIGJyb2FkY2FzdCBhbmQgbGlzdGVuIGZyb20gYW5kIHRvIHRoZSAkcm9vdFNjb3BlXG4vLyAgICAgLy8gZm9yIGltcG9ydGFudCBldmVudHMgYWJvdXQgYXV0aGVudGljYXRpb24gZmxvdy5cbi8vICAgICBhcHAuY29uc3RhbnQoJ0FVVEhfRVZFTlRTJywge1xuLy8gICAgICAgICBsb2dpblN1Y2Nlc3M6ICdhdXRoLWxvZ2luLXN1Y2Nlc3MnLFxuLy8gICAgICAgICBsb2dpbkZhaWxlZDogJ2F1dGgtbG9naW4tZmFpbGVkJyxcbi8vICAgICAgICAgbG9nb3V0U3VjY2VzczogJ2F1dGgtbG9nb3V0LXN1Y2Nlc3MnLFxuLy8gICAgICAgICBzZXNzaW9uVGltZW91dDogJ2F1dGgtc2Vzc2lvbi10aW1lb3V0Jyxcbi8vICAgICAgICAgbm90QXV0aGVudGljYXRlZDogJ2F1dGgtbm90LWF1dGhlbnRpY2F0ZWQnLFxuLy8gICAgICAgICBub3RBdXRob3JpemVkOiAnYXV0aC1ub3QtYXV0aG9yaXplZCdcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdBdXRoSW50ZXJjZXB0b3InLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHEsIEFVVEhfRVZFTlRTKSB7XG4vLyAgICAgICAgIHZhciBzdGF0dXNEaWN0ID0ge1xuLy8gICAgICAgICAgICAgNDAxOiBBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLFxuLy8gICAgICAgICAgICAgNDAzOiBBVVRIX0VWRU5UUy5ub3RBdXRob3JpemVkLFxuLy8gICAgICAgICAgICAgNDE5OiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCxcbi8vICAgICAgICAgICAgIDQ0MDogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXRcbi8vICAgICAgICAgfTtcbi8vICAgICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgICAgIHJlc3BvbnNlRXJyb3I6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChzdGF0dXNEaWN0W3Jlc3BvbnNlLnN0YXR1c10sIHJlc3BvbnNlKTtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlc3BvbnNlKVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9O1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLmNvbmZpZyhmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xuLy8gICAgICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKFtcbi8vICAgICAgICAgICAgICckaW5qZWN0b3InLFxuLy8gICAgICAgICAgICAgZnVuY3Rpb24gKCRpbmplY3Rvcikge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkaW5qZWN0b3IuZ2V0KCdBdXRoSW50ZXJjZXB0b3InKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgXSk7XG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuc2VydmljZSgnQXV0aFNlcnZpY2UnLCBmdW5jdGlvbiAoJGh0dHAsIFNlc3Npb24sICRyb290U2NvcGUsIEFVVEhfRVZFTlRTLCAkcSkge1xuXG4vLyAgICAgICAgIGZ1bmN0aW9uIG9uU3VjY2Vzc2Z1bExvZ2luKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICB2YXIgdXNlciA9IHJlc3BvbnNlLmRhdGEudXNlcjtcbi8vICAgICAgICAgICAgIFNlc3Npb24uY3JlYXRlKHVzZXIpO1xuLy8gICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ2luU3VjY2Vzcyk7XG4vLyAgICAgICAgICAgICByZXR1cm4gdXNlcjtcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIC8vIFVzZXMgdGhlIHNlc3Npb24gZmFjdG9yeSB0byBzZWUgaWYgYW5cbi8vICAgICAgICAgLy8gYXV0aGVudGljYXRlZCB1c2VyIGlzIGN1cnJlbnRseSByZWdpc3RlcmVkLlxuLy8gICAgICAgICB0aGlzLmlzQXV0aGVudGljYXRlZCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAhIVNlc3Npb24udXNlcjtcbi8vICAgICAgICAgfTtcblxuICAgICAgICBcbi8vICAgICAgICAgdGhpcy5pc0FkbWluID0gZnVuY3Rpb24odXNlcklkKXtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdydW5uaW5nIGFkbWluIGZ1bmMnKVxuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKVxuLy8gICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YS51c2VyLmlzQWRtaW4pXG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICB0aGlzLmdldExvZ2dlZEluVXNlciA9IGZ1bmN0aW9uIChmcm9tU2VydmVyKSB7XG5cbi8vICAgICAgICAgICAgIC8vIElmIGFuIGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbiBleGlzdHMsIHdlXG4vLyAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIHVzZXIgYXR0YWNoZWQgdG8gdGhhdCBzZXNzaW9uXG4vLyAgICAgICAgICAgICAvLyB3aXRoIGEgcHJvbWlzZS4gVGhpcyBlbnN1cmVzIHRoYXQgd2UgY2FuXG4vLyAgICAgICAgICAgICAvLyBhbHdheXMgaW50ZXJmYWNlIHdpdGggdGhpcyBtZXRob2QgYXN5bmNocm9ub3VzbHkuXG5cbi8vICAgICAgICAgICAgIC8vIE9wdGlvbmFsbHksIGlmIHRydWUgaXMgZ2l2ZW4gYXMgdGhlIGZyb21TZXJ2ZXIgcGFyYW1ldGVyLFxuLy8gICAgICAgICAgICAgLy8gdGhlbiB0aGlzIGNhY2hlZCB2YWx1ZSB3aWxsIG5vdCBiZSB1c2VkLlxuXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSAmJiBmcm9tU2VydmVyICE9PSB0cnVlKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLndoZW4oU2Vzc2lvbi51c2VyKTtcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgLy8gTWFrZSByZXF1ZXN0IEdFVCAvc2Vzc2lvbi5cbi8vICAgICAgICAgICAgIC8vIElmIGl0IHJldHVybnMgYSB1c2VyLCBjYWxsIG9uU3VjY2Vzc2Z1bExvZ2luIHdpdGggdGhlIHJlc3BvbnNlLlxuLy8gICAgICAgICAgICAgLy8gSWYgaXQgcmV0dXJucyBhIDQwMSByZXNwb25zZSwgd2UgY2F0Y2ggaXQgYW5kIGluc3RlYWQgcmVzb2x2ZSB0byBudWxsLlxuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKS50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKS5jYXRjaChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4vLyAgICAgICAgICAgICB9KTtcblxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbiAoY3JlZGVudGlhbHMpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvbG9naW4nLCBjcmVkZW50aWFscylcbi8vICAgICAgICAgICAgICAgICAudGhlbihvblN1Y2Nlc3NmdWxMb2dpbilcbi8vICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHsgbWVzc2FnZTogJ0ludmFsaWQgbG9naW4gY3JlZGVudGlhbHMuJ30pO1xuLy8gICAgICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMuc2lnbnVwID0gZnVuY3Rpb24oY3JlZGVudGlhbHMpe1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbi8vICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbi8vICAgICAgICAgICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbi8vICAgICAgICAgICAgICAgICBkYXRhOiBjcmVkZW50aWFsc1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQuZGF0YSlcbi8vICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbigpe1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3Qoe21lc3NhZ2U6ICdUaGF0IGVtYWlsIGlzIGFscmVhZHkgYmVpbmcgdXNlZC4nfSk7XG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL2xvZ291dCcpLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgIFNlc3Npb24uZGVzdHJveSgpO1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dvdXRTdWNjZXNzKTtcbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuc2VydmljZSgnU2Vzc2lvbicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUykge1xuXG4vLyAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuLy8gICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICBzZWxmLmRlc3Ryb3koKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuXG4vLyAgICAgICAgIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24gKHVzZXIpIHtcbi8vICAgICAgICAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcbi8vICAgICAgICAgfTtcblxuLy8gICAgIH0pO1xuXG4vLyB9KCkpO1xuIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIpID0+IHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdnYW1lJywge1xuICAgICAgICB1cmw6ICcvZ2FtZS86Z2FtZUlkJyxcbiAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvZ2FtZS9nYW1lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnR2FtZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBnYW1lIDogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldEdhbWVCeUdhbWVJZCgkc3RhdGVQYXJhbXMuZ2FtZUlkKVxuICAgICAgICB9ICBcbiAgICB9KVxuICAgIC5zdGF0ZSgnZ2FtZS5hY3RpdmUtZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnL2FjdGl2ZS1nYW1lJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL2FjdGl2ZS1nYW1lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnQWN0aXZlR2FtZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBnYW1lIDogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldEdhbWVCeUdhbWVJZCgkc3RhdGVQYXJhbXMuZ2FtZUlkKVxuICAgICAgICB9ICAgIFxuICAgIH0pXG4gICAgLnN0YXRlKCdnYW1lLnN1Ym1pc3Npb24tZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnL3N1Ym1pc3Npb24tZ2FtZScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvZ2FtZS9zdWJtaXNzaW9uLWdhbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdTdWJtaXNzaW9uR2FtZUN0cmwnXG4gICAgfSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdHYW1lQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMsICRsb2NhbFN0b3JhZ2UsIGdhbWUpID0+IHsgICBcblxuICAgICRzY29wZS5nYW1lSWQgPSAkc3RhdGVQYXJhbXMuZ2FtZUlkO1xuICAgICRzY29wZS5wbGF5ZXJJZCA9ICRsb2NhbFN0b3JhZ2UudXNlci5pZDtcbiAgICAkc2NvcGUudGVhbUlkID0gJGxvY2FsU3RvcmFnZS50ZWFtLmlkXG4gICAgJHNjb3BlLmdhbWUgPSBnYW1lO1xuICAgICRzY29wZS5nYW1lTmFtZSA9ICRzY29wZS5nYW1lLnNldHRpbmdzLm5hbWU7XG4gICAgJHNjb3BlLndoaXRlQ2FyZHMgPSAkc2NvcGUuZ2FtZS5wbGF5ZXJzWyRzY29wZS5wbGF5ZXJJZF0uaGFuZDtcbiAgICAkc2NvcGUuc2hvd0NhcmRzID0gZmFsc2U7XG4gICAgJHNjb3BlLnBsYXllckNvdW50ID0gT2JqZWN0LmtleXMoJHNjb3BlLmdhbWUucGxheWVycykubGVuZ3RoO1xuICAgICAgXG59KVxuXG5hcHAuY29udHJvbGxlcihcIkFjdGl2ZUdhbWVDdHJsXCIsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCBBY3RpdmVHYW1lRmFjdG9yeSwgZ2FtZSwgJHN0YXRlUGFyYW1zLCAkbG9jYWxTdG9yYWdlLCAkc3RhdGUpID0+IHtcblxuICAgIFxuICAgICRzY29wZS5vblN3aXBlRG93biA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3dvcmtpbmcnKTtcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnNob3dDYXJkcyk7XG4gICAgICAgICRzY29wZS5zaG93Q2FyZHMgPSB0cnVlIDtcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnNob3dDYXJkcyk7XG4gICAgICAgICRzY29wZS4kZXZhbEFzeW5jKCk7XG4gICAgfVxuXG4gICAgJHNjb3BlLm9uU3dpcGVVcCA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzd2lwZWQgdXBcIik7XG4gICAgfVxuXG4gICAgQWN0aXZlR2FtZUZhY3RvcnkucmVmaWxsTXlIYW5kKCRzY29wZS5nYW1lSWQsICRzY29wZS5wbGF5ZXJJZCwgJHNjb3BlLnRlYW1JZCk7XG5cbiAgICAkc2NvcGUuJG9uKCdjaGFuZ2VkR2FtZScsIChldmVudCxzbmFwc2hvdCkgPT57XG4gICAgICAgICRzY29wZS5nYW1lID0gc25hcHNob3Q7XG4gICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5nYW1lKTtcbiAgICAgICAgaWYoZ2FtZS5zdGF0ZSA9PT0gJ3N1Ym1pc3Npb24nKXtcbiAgICAgICAgICAgICRzdGF0ZS5nbygnZ2FtZS5zdWJtaXNzaW9uLWdhbWUnKVxuICAgICAgICB9IFxuICAgIH0pXG5cbiAgXG59KVxuXG5hcHAuY29udHJvbGxlcignU3VibWlzc2lvbkdhbWVDdHJsJywgKCRzY29wZSwgJGxvY2FsU3RvcmFnZSkgPT4ge1xuICAgICRzY29wZS4kb24oJ2NoYW5nZWRHYW1lJywgKGV2ZW50LHNuYXBzaG90KSA9PntcbiAgICAgICAgJHNjb3BlLmdhbWUgPSBzbmFwc2hvdDtcbiAgICB9KVxuXG4gICAkc2NvcGUuanVkZ2UgPSAkc2NvcGUuZ2FtZS5wbGF5ZXJzWyRzY29wZS5nYW1lLmN1cnJlbnRKdWRnZV0ubmFtZVxufSlcblxuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgIHVybDogJy8nLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2hvbWUvaG9tZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgZ2FtZXM6IGZ1bmN0aW9uKEdhbWVGYWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdIb21lQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCAkY29yZG92YU9hdXRoLCBVc2VyRmFjdG9yeSwgR2FtZUZhY3RvcnksICRsb2NhbFN0b3JhZ2UsIGdhbWVzLCAkaW9uaWNQb3B1cCkge1xuICAgICRzY29wZS5zdGFydE5ld0dhbWUgPSBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWU7XG4gICAgJHNjb3BlLnN0b3JhZ2UgPSAkbG9jYWxTdG9yYWdlO1xuICAgICRzY29wZS5nYW1lcyA9IGdhbWVzO1xuXG4gICAgY29uc29sZS5sb2coXCJnYW1lc1wiLCBKU09OLnN0cmluZ2lmeSgkc2NvcGUuZ2FtZXMpKVxuICAgICRzY29wZS5nb1RvTmV3R2FtZSA9ICgpID0+IHtcbiAgICAgICAgJHN0YXRlLmdvKCduZXctZ2FtZS5tYWluJylcbiAgICB9XG5cblxuICAgICRzY29wZS5qb2luR2FtZSA9IEdhbWVGYWN0b3J5LmpvaW5HYW1lQnlJZDtcblxuICAgICRzY29wZS5zaG93UG9wdXAgPSBmdW5jdGlvbihnYW1lSWQpIHtcblxuICAgICAgICAkc2NvcGUuZ2FtZSA9ICRzY29wZS5nYW1lc1tnYW1lSWRdO1xuICAgICAgICAkc2NvcGUuZ2FtZU5hbWUgPSAkc2NvcGUuZ2FtZS5zZXR0aW5ncy5uYW1lO1xuICAgICAgICAkc2NvcGUucGxheWVyQ291bnQgPSBPYmplY3Qua2V5cygkc2NvcGUuZ2FtZS5wbGF5ZXJzKS5sZW5ndGg7XG4gICAgICAgICRzY29wZS53YWl0aW5nRm9yUGxheWVycyA9ICAoJHNjb3BlLmdhbWUuc2V0dGluZ3MubWluUGxheWVycyB8fCA0KSAtICRzY29wZS5wbGF5ZXJDb3VudDtcbiAgICAgICAgIFxuICAgICAgICAgY29uc3QgbXlQb3B1cCA9ICRpb25pY1BvcHVwLnNob3coe1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9ob21lL3BvcHVwLmh0bWwnLFxuICAgICAgICAgICAgdGl0bGU6ICdKb2luICcgKyAkc2NvcGUuZ2FtZU5hbWUsXG4gICAgICAgICAgICBzY29wZTogJHNjb3BlLFxuICAgICAgICAgICAgYnV0dG9uczogXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAge3RleHQ6ICdHbyBiYWNrJ30sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnSm9pbiBnYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbi1iYWxhbmNlZCcsXG4gICAgICAgICAgICAgICAgICAgIG9uVGFwOiBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5qb2luR2FtZShnYW1lSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdnYW1lLmFjdGl2ZS1nYW1lJywgeyBnYW1lSWQ6IGdhbWVJZCB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KVxuICAgIH1cbn0pXG5cbiIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdsb2dpbicsIHtcbiAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9sb2dpbi9sb2dpbi5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luQ3RybCdcbiAgICB9KVxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9sb2dpbicpO1xufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCBVc2VyRmFjdG9yeSwgJGNvcmRvdmFPYXV0aCwgJGxvY2FsU3RvcmFnZSwgJHRpbWVvdXQsICRpb25pY1NpZGVNZW51RGVsZWdhdGUpIHtcbiAgICAkc2NvcGUubG9naW5XaXRoU2xhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFVzZXJGYWN0b3J5LmdldFNsYWNrQ3JlZHMoKVxuICAgICAgICAgICAgLnRoZW4oY3JlZHMgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAkY29yZG92YU9hdXRoLnNsYWNrKGNyZWRzLmNsaWVudElELCBjcmVkcy5jbGllbnRTZWNyZXQsIFsnaWRlbnRpdHkuYmFzaWMnLCAnaWRlbnRpdHkudGVhbScsICdpZGVudGl0eS5hdmF0YXInXSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihpbmZvID0+IFVzZXJGYWN0b3J5LnNldFVzZXIoaW5mbykpXG4gICAgICAgICAgICAudGhlbigoKSA9PiAkc3RhdGUuZ28oJ2hvbWUnKSlcbiAgICB9XG5cbiAgICAkaW9uaWNTaWRlTWVudURlbGVnYXRlLmNhbkRyYWdDb250ZW50KGZhbHNlKTtcblxuICAgICRzY29wZS4kb24oJyRpb25pY1ZpZXcubGVhdmUnLCBmdW5jdGlvbigpIHsgJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZS5jYW5EcmFnQ29udGVudCh0cnVlKSB9KTtcblxuICAgICRzY29wZS5zdG9yYWdlID0gJGxvY2FsU3RvcmFnZVxuXG4gICAgZnVuY3Rpb24gcmVkaXJlY3RVc2VyKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInNjb3BlIHN0b3JhZ2UgdXNlclwiLCAkc2NvcGUuc3RvcmFnZS51c2VyKVxuICAgICAgICBpZiAoJHNjb3BlLnN0b3JhZ2UudXNlcikgJHN0YXRlLmdvKCdob21lJylcbiAgICB9XG5cbiAgICByZWRpcmVjdFVzZXIoKTtcbn0pXG5cbiIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpID0+IHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCduZXctZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnL25ldy1nYW1lJyxcbiAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvbWFpbi5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ05ld0dhbWVDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgdGVhbURlY2tzOiAoR2FtZUZhY3RvcnkpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoKSxcbiAgICAgICAgICAgIHN0YW5kYXJkRGVjazogKEdhbWVGYWN0b3J5KSA9PiBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkKDEpXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5tYWluJywge1xuICAgICAgICB1cmw6ICcvc2V0dXAtZ2FtZScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvbmV3LWdhbWUuaHRtbCcsXG4gICAgfSlcblxuICAgIC5zdGF0ZSgnbmV3LWdhbWUuYWRkLWRlY2tzJywge1xuICAgICAgICB1cmw6ICcvYWRkLWRlY2tzJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9hZGQtZGVja3MuaHRtbCcsXG4gICAgfSlcblxuICAgIC5zdGF0ZSgnbmV3LWdhbWUuZGVjaycsIHtcbiAgICAgICAgdXJsOiAnL2RlY2svOmRlY2tJZCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvZGVjay5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0RlY2tDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgY2FyZHM6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXRDYXJkc0J5RGVja0lkKCRzdGF0ZVBhcmFtcy5kZWNrSWQpXG4gICAgICAgIH1cblxuXG4gICAgfSlcblxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9uZXctZ2FtZS9zZXR1cC1nYW1lJyk7XG59KVxuXG5hcHAuY29udHJvbGxlcignTmV3R2FtZUN0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgJHN0YXRlLCB0ZWFtRGVja3MsIHN0YW5kYXJkRGVjaykgPT4ge1xuICAgICRzY29wZS5jdXJyZW50VmlldyA9ICdhZGREZWNrcydcbiAgICAkc2NvcGUuZ2FtZUNvbmZpZyA9IHt9O1xuICAgICRzY29wZS5nYW1lQ29uZmlnLmRlY2tzID0ge307XG4gICAgJHNjb3BlLmdvVG9EZWNrcyA9ICgpID0+IHtcbiAgICAgICAgJHN0YXRlLmdvKCduZXctZ2FtZS5hZGQtZGVja3MnLCB7fSwgeyBsb2NhdGlvbjogdHJ1ZSwgcmVsb2FkOiB0cnVlIH0pXG4gICAgfVxuXG4gICAgJHNjb3BlLmRlY2tzID0gc3RhbmRhcmREZWNrLmNvbmNhdCh0ZWFtRGVja3MpO1xuXG4gICAgJHNjb3BlLnN0YXJ0TmV3R2FtZSA9IChnYW1lQ29uZmlnKSA9PiB7XG4gICAgICAgIEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZShnYW1lQ29uZmlnKS50aGVuKChpZCkgPT4ge1xuICAgICAgICAgICAgR2FtZUZhY3RvcnkuYWRkUGlsZVRvR2FtZShpZCwgJHNjb3BlLmdhbWVDb25maWcuZGVja3MpXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2dhbWUuYWN0aXZlLWdhbWUnLCB7IGdhbWVJZDogaWQgfSlcblxuICAgICAgICB9KVxuICAgIH1cbiAgICAkc2NvcGUuYWRkRGVja3NUb0dhbWUgPSBHYW1lRmFjdG9yeS5hZGREZWNrcztcbiAgICAvLyAkc2NvcGUuJG9uKCdjaGFuZ2VkR2FtZScsIChldmVudCwgZGF0YSkgPT4ge1xuICAgIC8vICAgICBjb25zb2xlLmxvZygncmVjZWl2ZWQgZXZlbnQnKVxuICAgIC8vICAgICBjb25zb2xlLmxvZygnZGF0YSBvYmo6JywgZGF0YSlcbiAgICAvLyAgICAgJHNjb3BlLmdhbWUgPSBkYXRhO1xuICAgIC8vICAgICAkc2NvcGUuJGRpZ2VzdCgpXG5cbiAgICAvLyB9KVxuXG5cbn0pXG5cbmFwcC5jb250cm9sbGVyKCdEZWNrQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkc3RhdGUsIGNhcmRzKSA9PiB7XG4gICAgJHNjb3BlLmNhcmRzID0gY2FyZHNcbn0pXG5cbiIsIi8vRGlyZWN0aXZlIEZpbGUiLCJhcHAuZmFjdG9yeSgnQWN0aXZlR2FtZUZhY3RvcnknLCAoJGh0dHAsICRyb290U2NvcGUsICRsb2NhbFN0b3JhZ2UpID0+IHtcblxuICAgICAgICBjb25zdCBBY3RpdmVHYW1lRmFjdG9yeSA9IHt9O1xuXG4gICAgICAgIGNvbnN0IHJlZmlsbGVyID0gKGNhcmRzTmVlZGVkLCBwaWxlUmVmLCBoYW5kUmVmKSA9PiB7XG4gICAgICAgICAgcGlsZVJlZi5saW1pdFRvRmlyc3QoY2FyZHNOZWVkZWQpLm9uY2UoJ3ZhbHVlJywgY2FyZHNTbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICBjYXJkc1NuYXBzaG90LmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgICAgICAgIGxldCB1cGRhdGVPYmogPSB7fVxuICAgICAgICAgICAgICBjYXJkLnJlZi50cmFuc2FjdGlvbihjYXJkRGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICB1cGRhdGVPYmpbY2FyZC5rZXldID0gY2FyZERhdGFcbiAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBoYW5kUmVmLnVwZGF0ZSh1cGRhdGVPYmopKVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgICAgIH1cblxuICAgICAgICBBY3RpdmVHYW1lRmFjdG9yeS5yZWZpbGxNeUhhbmQgPSAoZ2FtZUlkLCBwbGF5ZXJJZCwgdGVhbUlkKSA9PiB7XG4gICAgICAgICAgLy8gaG93IG1hbnkgY2FyZHMgZG8gSSBuZWVkP1xuICAgICAgICAgIGxldCBjYXJkc05lZWRlZCA9IDBcbiAgICAgICAgICBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAgIGNvbnN0IGhhbmRSZWYgPSBnYW1lUmVmLmNoaWxkKGBwbGF5ZXJzLyR7cGxheWVySWR9L2hhbmRgKVxuICAgICAgICAgIGNvbnN0IHBpbGVSZWYgPSBnYW1lUmVmLmNoaWxkKCdwaWxlL3doaXRlY2FyZHMnKVxuICAgICAgICAgIGhhbmRSZWYub25jZSgndmFsdWUnLCBoYW5kU25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICBjYXJkc05lZWRlZCA9IDcgLSBoYW5kU25hcHNob3QubnVtQ2hpbGRyZW4oKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgcmVmaWxsZXIoY2FyZHNOZWVkZWQsIHBpbGVSZWYsIGhhbmRSZWYpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgQWN0aXZlR2FtZUZhY3Rvcnkuc3VibWl0V2hpdGVDYXJkID0gKHBsYXllcklkLCBjYXJkSWQsIGdhbWVJZCwgdGVhbUlkKSA9PiB7XG4gICAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YCk7XG4gICAgICAgICAgY29uc3QgY2FyZFRvU3VibWl0ID0gZ2FtZVJlZi5jaGlsZChgcGxheWVycy8ke3BsYXllcklkfS9oYW5kLyR7Y2FyZElkfWApO1xuICAgICAgICAgIGNvbnN0IHN1Ym1pdFJlZiA9IGdhbWVSZWYuY2hpbGQoJ3N1Ym1pdHRlZFdoaXRlQ2FyZHMnKTtcbiAgICAgICAgICBmaXJlYmFzZU1vdmVTaW5nbGVLZXlWYWx1ZShjYXJkVG9TdWJtaXQsIHN1Ym1pdFJlZilcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHN1Ym1pdFJlZi5jaGlsZChjYXJkSWQpLnNldCh7XG4gICAgICAgICAgICAgIHN1Ym1pdHRlZEJ5OiBwbGF5ZXJJZFxuICAgICAgICAgICAgfSkpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gQWN0aXZlR2FtZUZhY3Rvcnk7IFxuXG5cbn0pOyIsImFwcC5mYWN0b3J5KCdHYW1lRmFjdG9yeScsICgkaHR0cCwgJHJvb3RTY29wZSwgJGxvY2FsU3RvcmFnZSkgPT4ge1xuICAgICAgICBjb25zdCBvdXJJcHMgPSB7XG4gICAgICAgICAgICBuaWtpdGE6IFwiMTkyLjE2OC40LjIxM1wiLFxuICAgICAgICAgICAga2F5bGE6IFwiMTkyLjE2OC40LjIyNVwiLFxuICAgICAgICAgICAgbml0aHlhOiBcIjE5Mi4xNjguMS40OFwiLFxuICAgICAgICAgICAgZGFuOiBcIjE5Mi4xNjguNC4yMzZcIlxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGN1cnJlbnRJcCA9IG91cklwcy5kYW5cblxuICAgICAgICAvLyBzdGFydCBhIG5ldyBnYW1lIGRlcnBcbiAgICAgICAgY29uc3QgR2FtZUZhY3RvcnkgPSB7fTtcbiAgICAgICAgR2FtZUZhY3Rvcnkuc3RhcnROZXdHYW1lID0gKGdhbWVDb25maWcpID0+IHtcbiAgICAgICAgICAgIC8vY2FuIGFsc28gZ2V0IGFsbCB0aGUgZGVja3MgYnkgdGVhbSBoZXJlIHRvIHByZXBhcmVcbiAgICAgICAgICAgIGNvbnN0IHRlYW1JZCA9ICRsb2NhbFN0b3JhZ2UudGVhbS5pZCB8fCAyO1xuICAgICAgICAgICAgY29uc3QgY3JlYXRvcklkID0gJGxvY2FsU3RvcmFnZS51c2VyLmlkIHx8IDM7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lc2AsIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZ2FtZUNvbmZpZy5uYW1lIHx8ICdBV0VTT01FIE5hbWUnLFxuICAgICAgICAgICAgICAgICAgICB0ZWFtSWQ6IHRlYW1JZCxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvcklkOiBjcmVhdG9ySWQsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0b3JOYW1lOiAkbG9jYWxTdG9yYWdlLnVzZXIubmFtZSB8fCAnZGFuJywgLy9taWdodCBiZSB1bm5lY2Vzc2FyeSBpZiB3ZSBoYXZlIHRoZSB1c2VyIGlkXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiBnYW1lQ29uZmlnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBnYW1lSWQgPSByZXMuZGF0YVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYC90ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICAgICAgICAgICAgZ2FtZVJlZi5vbigndmFsdWUnLCBzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2NoYW5nZWRHYW1lJywgc25hcHNob3QudmFsKCkpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2FtZUlkO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG4gICAgICAgIC8vIGdldCBhbGwgb2YgYSBkZWNrcyBjYXJkcyB0byBkaXNwbGF5IHdoZW4gbG9va2luZyBhdCBkZWNrc1xuICAgICAgICBHYW1lRmFjdG9yeS5nZXRDYXJkc0J5RGVja0lkID0gKGlkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2RlY2tzLyR7aWR9L2NhcmRzYClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFRPRE86IGNvbWJpbmUgdGhpcyBpbnRvIHRoZSBhYm92ZSBzdGFydE5ld0dhbWUgZnVuY1xuICAgICAgICAvLyB0YWtlIGFsbCBvZiB0aGUgc2VsZWN0ZWQgZGVja3MnIGNhcmRzIGFuZCBwdXQgdGhlbSBpbiB0aGUgZmlyZWJhc2UgZ2FtZSBvYmplY3QgcGlsZSAodGhyb3VnaCByb3V0ZSlcbiAgICAgICAgR2FtZUZhY3RvcnkuYWRkUGlsZVRvR2FtZSA9IChnYW1lSWQsIGRlY2tzKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkZWNrc0FyciA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgZGVja0lkIGluIGRlY2tzKSB7XG4gICAgICAgICAgICAgICAgZGVja3NBcnIucHVzaChkZWNrSWQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0vZGVja3NgLCB7XG4gICAgICAgICAgICAgICAgJ2RlY2tzJzogZGVja3NBcnJcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAkbG9jYWxTdG9yYWdlLnRlYW0uaWQ7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJJZCA9ICRsb2NhbFN0b3JhZ2UudXNlci5pZDtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllck5hbWUgPSAkbG9jYWxTdG9yYWdlLnVzZXIubmFtZTtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllclJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9L3BsYXllcnMvJHtwbGF5ZXJJZH1gKVxuICAgICAgICAgICAgcGxheWVyUmVmLnNldCh7XG4gICAgICAgICAgICAgICAgbmFtZTogcGxheWVyTmFtZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICBnYW1lUmVmLm9uKCd2YWx1ZScsIHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2NoYW5nZWRHYW1lJywgc25hcHNob3QudmFsKCkpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICRodHRwLnBvc3QoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZ2FtZXMvJHtnYW1lSWR9P3BsYXllcklkPSR7cGxheWVySWR9YClcbiAgICAgICAgfVxuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQgPSAoaWQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRlYW1JZCA9ICh0eXBlb2YgaWQgIT09ICdudW1iZXInKSA/ICRsb2NhbFN0b3JhZ2UudGVhbS5pZCA6IGlkOyAvLyBpZCB8fCBsb2NhbHN0b3JhZ2UgZG9lc24ndCB3b3JrIGJlY2F1c2UgMCBpcyBmYWxzZXlcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZGVja3M/dGVhbT0ke3RlYW1JZH1gKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcblxuICAgICAgICB9O1xuXG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0VXNlcnNCeUdhbWVJZCA9IChnYW1lSWQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZ2FtZXMvJHtnYW1lSWR9L3VzZXJzYCk7XG4gICAgICAgIH07XG5cblxuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVCeUdhbWVJZCA9IChnYW1lSWQsIHRlYW1JZCkgPT4ge1xuICAgICAgICAgICAgdGVhbUlkID0gdGVhbUlkIHx8ICRsb2NhbFN0b3JhZ2UudGVhbS5pZFxuICAgICAgICAgICAgY29uc3QgZ2FtZXNSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICByZXR1cm4gZ2FtZXNSZWYub25jZSgndmFsdWUnKS50aGVuKHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc25hcHNob3QudmFsKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQgPSAodGVhbUlkKSA9PiB7XG4gICAgICAgICAgICB0ZWFtSWQgPSB0ZWFtSWQgfHwgJGxvY2FsU3RvcmFnZS50ZWFtLmlkXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzLz90ZWFtSWQ9JHt0ZWFtSWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlVc2VyID0gKHVzZXJJZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lcy8/dXNlcklkPSR7dXNlcklkfWApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gR2FtZUZhY3Rvcnk7XG4gICAgfVxuXG4pO1xuXG4iLCJhcHAuZmFjdG9yeSgnVXNlckZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCwgJGxvY2FsU3RvcmFnZSkge1xuICAgIGNvbnN0IG91cklwcyA9IHtcbiAgICAgICAgbmlraXRhOiBcIjE5Mi4xNjguNC4yMTNcIixcbiAgICAgICAga2F5bGE6IFwiMTkyLjE2OC40LjIyNVwiLFxuICAgICAgICBuaXRoeWE6IFwiMTkyLjE2OC4xLjQ4XCIsXG4gICAgICAgIGRhbjogXCIxOTIuMTY4LjQuMjM2XCJcbiAgICB9XG4gICAgY29uc3QgY3VycmVudElwID0gb3VySXBzLmRhblxuICAgIHJldHVybiB7XG4gICAgICAgIHNldFVzZXI6IGZ1bmN0aW9uKGluZm8pIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL3VzZXJzYCxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBpbmZvXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldExvY2FsU3RvcmFnZShyZXMuZGF0YS51c2VyWzBdLCByZXMuZGF0YS50ZWFtWzBdKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBnZXRTbGFja0NyZWRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvc2xhY2tgKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuZGF0YVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGdldFNsYWNrSW5mbzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdodHRwczovL3NsYWNrLmNvbS9hcGkvdXNlcnMuaWRlbnRpdHknKVxuICAgICAgICB9LFxuXG4gICAgICAgIHNldExvY2FsU3RvcmFnZTogZnVuY3Rpb24odXNlciwgdGVhbSkge1xuICAgICAgICAgICAgJGxvY2FsU3RvcmFnZS51c2VyID0gdXNlcjtcbiAgICAgICAgICAgICRsb2NhbFN0b3JhZ2UudGVhbSA9IHRlYW07XG4gICAgICAgIH0sXG5cbiAgICAgICAgbG9nT3V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRsb2NhbFN0b3JhZ2UuJHJlc2V0KCk7XG4gICAgICAgIH1cbiAgICB9XG59KVxuXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
=======
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImNhcmRzLXRlc3QvY2FyZHNUZXN0LmpzIiwiZGVja3MvZGVja3MuanMiLCJmcm9tIGZzZy9mcm9tLWZzZy5qcyIsImdhbWUvZ2FtZS5qcyIsImhvbWUvaG9tZS5qcyIsImxvZ2luL2xvZ2luLmpzIiwibmV3LWdhbWUvbmV3LWdhbWUuanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiLCJjb21tb24vZmFjdG9yaWVzL0FjdGl2ZUdhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9HYW1lRmFjdG9yeS5qcyIsImNvbW1vbi9mYWN0b3JpZXMvdXNlckZhY3RvcnkuanMiXSwibmFtZXMiOlsid2luZG93IiwiYXBwIiwiYW5ndWxhciIsIm1vZHVsZSIsInJ1biIsIiRpb25pY1BsYXRmb3JtIiwicmVhZHkiLCJjb3Jkb3ZhIiwicGx1Z2lucyIsIktleWJvYXJkIiwiaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyIiwiZGlzYWJsZVNjcm9sbCIsIlN0YXR1c0JhciIsInN0eWxlTGlnaHRDb250ZW50IiwiY29udHJvbGxlciIsIiRzY29wZSIsIlVzZXJGYWN0b3J5IiwiJHN0YXRlIiwiJGxvY2FsU3RvcmFnZSIsIiR0aW1lb3V0IiwibG9nT3V0IiwiZ28iLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsInN0YXRlIiwidXJsIiwidGVtcGxhdGVVcmwiLCJncmVldGluZyIsInJlc29sdmUiLCJkZWNrcyIsIkdhbWVGYWN0b3J5IiwiJHN0YXRlUGFyYW1zIiwiZ2V0RGVja3NCeVRlYW1JZCIsInN0YXRlUGFyYW1zIiwidGVhbUlkIiwiYWJzdHJhY3QiLCJnYW1lIiwiZ2V0R2FtZUJ5R2FtZUlkIiwiZ2FtZUlkIiwicGxheWVySWQiLCJ1c2VyIiwiaWQiLCJjb25zb2xlIiwibG9nIiwidGVhbSIsImdhbWVOYW1lIiwic2V0dGluZ3MiLCJuYW1lIiwianVkZ2UiLCJwbGF5ZXJzIiwiY3VycmVudEp1ZGdlIiwiYmxhY2tDYXJkIiwiY3VycmVudEJsYWNrQ2FyZCIsImJsYWNrQ2FyZFRleHQiLCJPYmplY3QiLCJrZXlzIiwidGV4dCIsIndoaXRlQ2FyZHMiLCJwaWxlIiwid2hpdGVjYXJkcyIsInNsaWNlciIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImxlbmd0aCIsInBsYXllckhhbmQiLCJoYW5kIiwic2hvd0NhcmRzIiwicGxheWVyQ291bnQiLCJBY3RpdmVHYW1lRmFjdG9yeSIsIm9uU3dpcGVEb3duIiwiJGV2YWxBc3luYyIsIm9uU3dpcGVVcCIsIm9uRG91YmxlVGFwIiwia2V5IiwicGxheWVkIiwicmVmaWxsTXlIYW5kIiwiJG9uIiwiZXZlbnQiLCJzbmFwc2hvdCIsIiR1cmxSb3V0ZXJQcm92aWRlciIsImdhbWVzIiwiZ2V0R2FtZXNCeVRlYW1JZCIsIiRjb3Jkb3ZhT2F1dGgiLCIkaW9uaWNQb3B1cCIsInN0YXJ0TmV3R2FtZSIsInN0b3JhZ2UiLCJKU09OIiwic3RyaW5naWZ5IiwiZ29Ub05ld0dhbWUiLCJqb2luR2FtZSIsImpvaW5HYW1lQnlJZCIsInNob3dQb3B1cCIsIndhaXRpbmdGb3JQbGF5ZXJzIiwibWluUGxheWVycyIsIm15UG9wdXAiLCJzaG93IiwidGl0bGUiLCJzY29wZSIsImJ1dHRvbnMiLCJ0eXBlIiwib25UYXAiLCJvdGhlcndpc2UiLCJMb2dpbkZhY3RvcnkiLCIkaW9uaWNTaWRlTWVudURlbGVnYXRlIiwibG9naW5XaXRoU2xhY2siLCJnZXRTbGFja0NyZWRzIiwidGhlbiIsInNsYWNrIiwiY3JlZHMiLCJjbGllbnRJRCIsImNsaWVudFNlY3JldCIsInNldFVzZXIiLCJpbmZvIiwiY2FuRHJhZ0NvbnRlbnQiLCJyZWRpcmVjdFVzZXIiLCJ0ZWFtRGVja3MiLCJzdGFuZGFyZERlY2siLCJjYXJkcyIsImdldENhcmRzQnlEZWNrSWQiLCJkZWNrSWQiLCJjdXJyZW50VmlldyIsImdhbWVDb25maWciLCJnb1RvRGVja3MiLCJsb2NhdGlvbiIsInJlbG9hZCIsImNvbmNhdCIsImFkZFBpbGVUb0dhbWUiLCJhZGREZWNrc1RvR2FtZSIsImFkZERlY2tzIiwiZmFjdG9yeSIsIiRodHRwIiwiJHJvb3RTY29wZSIsInJlZmlsbGVyIiwiY2FyZHNOZWVkZWQiLCJwaWxlUmVmIiwiaGFuZFJlZiIsImxpbWl0VG9GaXJzdCIsIm9uY2UiLCJjYXJkc1NuYXBzaG90IiwiZm9yRWFjaCIsInVwZGF0ZU9iaiIsImNhcmQiLCJyZWYiLCJ0cmFuc2FjdGlvbiIsImNhcmREYXRhIiwidXBkYXRlIiwiY2F0Y2giLCJlcnIiLCJnYW1lUmVmIiwiZmlyZWJhc2UiLCJkYXRhYmFzZSIsImNoaWxkIiwiaGFuZFNuYXBzaG90IiwibnVtQ2hpbGRyZW4iLCJzdWJtaXRXaGl0ZUNhcmQiLCJjYXJkSWQiLCJjYXJkVG9TdWJtaXQiLCJzdWJtaXRSZWYiLCJmaXJlYmFzZU1vdmVTaW5nbGVLZXlWYWx1ZSIsInNldCIsInN1Ym1pdHRlZEJ5Iiwib3VySXBzIiwibmlraXRhIiwia2F5bGEiLCJuaXRoeWEiLCJkYW4iLCJjdXJyZW50SXAiLCJjcmVhdG9ySWQiLCJwb3N0IiwiY3JlYXRvck5hbWUiLCJyZXMiLCJkYXRhIiwib24iLCIkYnJvYWRjYXN0IiwidmFsIiwiZ2V0IiwiZGVja3NBcnIiLCJwdXNoIiwicGxheWVyTmFtZSIsInBsYXllclJlZiIsImdldFVzZXJzQnlHYW1lSWQiLCJnYW1lc1JlZiIsImdldEdhbWVzQnlVc2VyIiwidXNlcklkIiwibWV0aG9kIiwiaGVhZGVycyIsInNldExvY2FsU3RvcmFnZSIsImdldFNsYWNrSW5mbyIsIiRyZXNldCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQUEsT0FBQUMsR0FBQSxHQUFBQyxRQUFBQyxNQUFBLENBQUEsc0JBQUEsRUFBQSxDQUFBLE9BQUEsRUFBQSxXQUFBLEVBQUEsV0FBQSxFQUFBLGdCQUFBLEVBQUEsV0FBQSxFQUFBLFdBQUEsQ0FBQSxDQUFBOztBQUVBRixJQUFBRyxHQUFBLENBQUEsVUFBQUMsY0FBQSxFQUFBO0FBQ0FBLG1C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QkFBQSxrQkFBQTtBQUNBRiwwQkFBQTJLLE1BQUE7QUFDQTtBQS9CQSxLQUFBO0FBaUNBLENBekNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJb25pYyBTdGFydGVyIEFwcFxuXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xuLy8gJ3N0YXJ0ZXInIGlzIHRoZSBuYW1lIG9mIHRoaXMgYW5ndWxhciBtb2R1bGUgZXhhbXBsZSAoYWxzbyBzZXQgaW4gYSA8Ym9keT4gYXR0cmlidXRlIGluIGluZGV4Lmh0bWwpXG4vLyB0aGUgMm5kIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiAncmVxdWlyZXMnXG53aW5kb3cuYXBwID0gYW5ndWxhci5tb2R1bGUoJ0JsYW5rQWdhaW5zdEh1bWFuaXR5JywgWydpb25pYycsICd1aS5yb3V0ZXInLCduZ0NvcmRvdmEnLCduZ0NvcmRvdmFPYXV0aCcsICduZ1N0b3JhZ2UnLCAnbmdBbmltYXRlJ10pXG5cbmFwcC5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0pIHtcbiAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgICAgICAgIC8vIEhpZGUgdGhlIGFjY2Vzc29yeSBiYXIgYnkgZGVmYXVsdCAocmVtb3ZlIHRoaXMgdG8gc2hvdyB0aGUgYWNjZXNzb3J5IGJhciBhYm92ZSB0aGUga2V5Ym9hcmRcbiAgICAgICAgICAgIC8vIGZvciBmb3JtIGlucHV0cylcbiAgICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG5cbiAgICAgICAgICAgIC8vIERvbid0IHJlbW92ZSB0aGlzIGxpbmUgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZy4gSXQgc3RvcHMgdGhlIHZpZXdwb3J0XG4gICAgICAgICAgICAvLyBmcm9tIHNuYXBwaW5nIHdoZW4gdGV4dCBpbnB1dHMgYXJlIGZvY3VzZWQuIElvbmljIGhhbmRsZXMgdGhpcyBpbnRlcm5hbGx5IGZvclxuICAgICAgICAgICAgLy8gYSBtdWNoIG5pY2VyIGtleWJvYXJkIGV4cGVyaWVuY2UuXG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2luZG93LlN0YXR1c0Jhcikge1xuICAgICAgICAgICAgU3RhdHVzQmFyLnN0eWxlTGlnaHRDb250ZW50KClcbiAgICAgICAgfVxuICAgIH0pO1xuXG59KVxuIiwiYXBwLmNvbnRyb2xsZXIoJ0xvZ291dEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIFVzZXJGYWN0b3J5LCAkc3RhdGUsICRsb2NhbFN0b3JhZ2UsICR0aW1lb3V0KXtcblx0JHNjb3BlLmxvZ091dCA9IGZ1bmN0aW9uKCl7XG5cdFx0VXNlckZhY3RvcnkubG9nT3V0KClcblx0XHQkc3RhdGUuZ28oJ2xvZ2luJylcblx0fVxufSkiLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKXtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2NhcmRzJywge1xuXHRcdHVybDogJy9jYXJkcycsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9jYXJkcy10ZXN0L2NhcmRzLXRlc3QuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0NhcmRzVGVzdEN0cmwnXG5cdH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignQ2FyZHNUZXN0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSl7XG4gXHQkc2NvcGUuZ3JlZXRpbmcgPSBcIkhJXCJcbn0pIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIpID0+IHtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2RlY2tzJywge1xuXHRcdHVybDogJ2RlY2tzLzp0ZWFtaWQnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvZGVja3MvZGVja3MuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0RlY2tDdHJsJyxcblx0XHRyZXNvbHZlOiB7XG5cdFx0XHRkZWNrczogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoc3RhdGVQYXJhbXMudGVhbUlkKVxuXHRcdH1cblx0fSlcblxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0RlY2tDdHJsJywgKCRzY29wZSkgPT4ge1xuXG5cblx0XG59KSIsIi8vIChmdW5jdGlvbiAoKSB7XG5cbi8vICAgICAndXNlIHN0cmljdCc7XG5cbi8vICAgICAvLyBIb3BlIHlvdSBkaWRuJ3QgZm9yZ2V0IEFuZ3VsYXIhIER1aC1kb3kuXG4vLyAgICAgaWYgKCF3aW5kb3cuYW5ndWxhcikgdGhyb3cgbmV3IEVycm9yKCdJIGNhblxcJ3QgZmluZCBBbmd1bGFyIScpO1xuXG4vLyAgICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdmc2FQcmVCdWlsdCcsIFtdKTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdTb2NrZXQnLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgIGlmICghd2luZG93LmlvKSB0aHJvdyBuZXcgRXJyb3IoJ3NvY2tldC5pbyBub3QgZm91bmQhJyk7XG4vLyAgICAgICAgIHJldHVybiB3aW5kb3cuaW8od2luZG93LmxvY2F0aW9uLm9yaWdpbik7XG4vLyAgICAgfSk7XG5cbi8vICAgICAvLyBBVVRIX0VWRU5UUyBpcyB1c2VkIHRocm91Z2hvdXQgb3VyIGFwcCB0b1xuLy8gICAgIC8vIGJyb2FkY2FzdCBhbmQgbGlzdGVuIGZyb20gYW5kIHRvIHRoZSAkcm9vdFNjb3BlXG4vLyAgICAgLy8gZm9yIGltcG9ydGFudCBldmVudHMgYWJvdXQgYXV0aGVudGljYXRpb24gZmxvdy5cbi8vICAgICBhcHAuY29uc3RhbnQoJ0FVVEhfRVZFTlRTJywge1xuLy8gICAgICAgICBsb2dpblN1Y2Nlc3M6ICdhdXRoLWxvZ2luLXN1Y2Nlc3MnLFxuLy8gICAgICAgICBsb2dpbkZhaWxlZDogJ2F1dGgtbG9naW4tZmFpbGVkJyxcbi8vICAgICAgICAgbG9nb3V0U3VjY2VzczogJ2F1dGgtbG9nb3V0LXN1Y2Nlc3MnLFxuLy8gICAgICAgICBzZXNzaW9uVGltZW91dDogJ2F1dGgtc2Vzc2lvbi10aW1lb3V0Jyxcbi8vICAgICAgICAgbm90QXV0aGVudGljYXRlZDogJ2F1dGgtbm90LWF1dGhlbnRpY2F0ZWQnLFxuLy8gICAgICAgICBub3RBdXRob3JpemVkOiAnYXV0aC1ub3QtYXV0aG9yaXplZCdcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdBdXRoSW50ZXJjZXB0b3InLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHEsIEFVVEhfRVZFTlRTKSB7XG4vLyAgICAgICAgIHZhciBzdGF0dXNEaWN0ID0ge1xuLy8gICAgICAgICAgICAgNDAxOiBBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLFxuLy8gICAgICAgICAgICAgNDAzOiBBVVRIX0VWRU5UUy5ub3RBdXRob3JpemVkLFxuLy8gICAgICAgICAgICAgNDE5OiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCxcbi8vICAgICAgICAgICAgIDQ0MDogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXRcbi8vICAgICAgICAgfTtcbi8vICAgICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgICAgIHJlc3BvbnNlRXJyb3I6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChzdGF0dXNEaWN0W3Jlc3BvbnNlLnN0YXR1c10sIHJlc3BvbnNlKTtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlc3BvbnNlKVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9O1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLmNvbmZpZyhmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xuLy8gICAgICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKFtcbi8vICAgICAgICAgICAgICckaW5qZWN0b3InLFxuLy8gICAgICAgICAgICAgZnVuY3Rpb24gKCRpbmplY3Rvcikge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkaW5qZWN0b3IuZ2V0KCdBdXRoSW50ZXJjZXB0b3InKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgXSk7XG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuc2VydmljZSgnQXV0aFNlcnZpY2UnLCBmdW5jdGlvbiAoJGh0dHAsIFNlc3Npb24sICRyb290U2NvcGUsIEFVVEhfRVZFTlRTLCAkcSkge1xuXG4vLyAgICAgICAgIGZ1bmN0aW9uIG9uU3VjY2Vzc2Z1bExvZ2luKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICB2YXIgdXNlciA9IHJlc3BvbnNlLmRhdGEudXNlcjtcbi8vICAgICAgICAgICAgIFNlc3Npb24uY3JlYXRlKHVzZXIpO1xuLy8gICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ2luU3VjY2Vzcyk7XG4vLyAgICAgICAgICAgICByZXR1cm4gdXNlcjtcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIC8vIFVzZXMgdGhlIHNlc3Npb24gZmFjdG9yeSB0byBzZWUgaWYgYW5cbi8vICAgICAgICAgLy8gYXV0aGVudGljYXRlZCB1c2VyIGlzIGN1cnJlbnRseSByZWdpc3RlcmVkLlxuLy8gICAgICAgICB0aGlzLmlzQXV0aGVudGljYXRlZCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAhIVNlc3Npb24udXNlcjtcbi8vICAgICAgICAgfTtcblxuICAgICAgICBcbi8vICAgICAgICAgdGhpcy5pc0FkbWluID0gZnVuY3Rpb24odXNlcklkKXtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdydW5uaW5nIGFkbWluIGZ1bmMnKVxuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKVxuLy8gICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YS51c2VyLmlzQWRtaW4pXG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICB0aGlzLmdldExvZ2dlZEluVXNlciA9IGZ1bmN0aW9uIChmcm9tU2VydmVyKSB7XG5cbi8vICAgICAgICAgICAgIC8vIElmIGFuIGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbiBleGlzdHMsIHdlXG4vLyAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIHVzZXIgYXR0YWNoZWQgdG8gdGhhdCBzZXNzaW9uXG4vLyAgICAgICAgICAgICAvLyB3aXRoIGEgcHJvbWlzZS4gVGhpcyBlbnN1cmVzIHRoYXQgd2UgY2FuXG4vLyAgICAgICAgICAgICAvLyBhbHdheXMgaW50ZXJmYWNlIHdpdGggdGhpcyBtZXRob2QgYXN5bmNocm9ub3VzbHkuXG5cbi8vICAgICAgICAgICAgIC8vIE9wdGlvbmFsbHksIGlmIHRydWUgaXMgZ2l2ZW4gYXMgdGhlIGZyb21TZXJ2ZXIgcGFyYW1ldGVyLFxuLy8gICAgICAgICAgICAgLy8gdGhlbiB0aGlzIGNhY2hlZCB2YWx1ZSB3aWxsIG5vdCBiZSB1c2VkLlxuXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSAmJiBmcm9tU2VydmVyICE9PSB0cnVlKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLndoZW4oU2Vzc2lvbi51c2VyKTtcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgLy8gTWFrZSByZXF1ZXN0IEdFVCAvc2Vzc2lvbi5cbi8vICAgICAgICAgICAgIC8vIElmIGl0IHJldHVybnMgYSB1c2VyLCBjYWxsIG9uU3VjY2Vzc2Z1bExvZ2luIHdpdGggdGhlIHJlc3BvbnNlLlxuLy8gICAgICAgICAgICAgLy8gSWYgaXQgcmV0dXJucyBhIDQwMSByZXNwb25zZSwgd2UgY2F0Y2ggaXQgYW5kIGluc3RlYWQgcmVzb2x2ZSB0byBudWxsLlxuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKS50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKS5jYXRjaChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4vLyAgICAgICAgICAgICB9KTtcblxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbiAoY3JlZGVudGlhbHMpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvbG9naW4nLCBjcmVkZW50aWFscylcbi8vICAgICAgICAgICAgICAgICAudGhlbihvblN1Y2Nlc3NmdWxMb2dpbilcbi8vICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHsgbWVzc2FnZTogJ0ludmFsaWQgbG9naW4gY3JlZGVudGlhbHMuJ30pO1xuLy8gICAgICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMuc2lnbnVwID0gZnVuY3Rpb24oY3JlZGVudGlhbHMpe1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbi8vICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbi8vICAgICAgICAgICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbi8vICAgICAgICAgICAgICAgICBkYXRhOiBjcmVkZW50aWFsc1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQuZGF0YSlcbi8vICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbigpe1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3Qoe21lc3NhZ2U6ICdUaGF0IGVtYWlsIGlzIGFscmVhZHkgYmVpbmcgdXNlZC4nfSk7XG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL2xvZ291dCcpLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgIFNlc3Npb24uZGVzdHJveSgpO1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dvdXRTdWNjZXNzKTtcbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuc2VydmljZSgnU2Vzc2lvbicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUykge1xuXG4vLyAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuLy8gICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICBzZWxmLmRlc3Ryb3koKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuXG4vLyAgICAgICAgIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24gKHVzZXIpIHtcbi8vICAgICAgICAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcbi8vICAgICAgICAgfTtcblxuLy8gICAgIH0pO1xuXG4vLyB9KCkpO1xuIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIpID0+IHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdnYW1lJywge1xuICAgICAgICB1cmw6ICcvZ2FtZS86Z2FtZUlkJyxcbiAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvZ2FtZS9nYW1lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnR2FtZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBnYW1lIDogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldEdhbWVCeUdhbWVJZCgkc3RhdGVQYXJhbXMuZ2FtZUlkKVxuICAgICAgICB9ICBcbiAgICB9KVxuICAgIC5zdGF0ZSgnZ2FtZS5hY3RpdmUtZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnL2FjdGl2ZS1nYW1lJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL2FjdGl2ZS1nYW1lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnQWN0aXZlR2FtZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBnYW1lIDogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldEdhbWVCeUdhbWVJZCgkc3RhdGVQYXJhbXMuZ2FtZUlkKVxuICAgICAgICB9ICAgIFxuICAgIH0pXG4gICAgLnN0YXRlKCdnYW1lLnN1Ym1pc3Npb24tZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnL3N1Ym1pc3Npb24tZ2FtZScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvZ2FtZS9zdWJtaXNzaW9uLWdhbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdTdWJtaXNzaW9uR2FtZUN0cmwnXG4gICAgfSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdHYW1lQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMsICRsb2NhbFN0b3JhZ2UsIGdhbWUpID0+IHsgICBcbiAgICBjb25zdCBnYW1lSWQgPSAkc3RhdGVQYXJhbXMuZ2FtZUlkO1xuICAgIGNvbnN0IHBsYXllcklkID0gJGxvY2FsU3RvcmFnZS51c2VyLmlkO1xuICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGlkXCIsIHBsYXllcklkKVxuICAgIGNvbnN0IHRlYW1JZCA9ICRsb2NhbFN0b3JhZ2UudGVhbS5pZFxuICAgICRzY29wZS5nYW1lID0gZ2FtZTtcbiAgICAkc2NvcGUuZ2FtZU5hbWUgPSAkc2NvcGUuZ2FtZS5zZXR0aW5ncy5uYW1lO1xuICAgIGNvbnNvbGUubG9nKFwiYWN0aXZlIHN0YXRlIGdhbWVcIiwgJHNjb3BlLmdhbWUpO1xuICAgICRzY29wZS5qdWRnZSA9ICRzY29wZS5nYW1lLnBsYXllcnNbJHNjb3BlLmdhbWUuY3VycmVudEp1ZGdlXVxuICAgIGNvbnNvbGUubG9nKFwidGhlIGp1ZGdlIGlzXCIsICRzY29wZS5qdWRnZSlcbiAgICAkc2NvcGUuYmxhY2tDYXJkID0gJHNjb3BlLmdhbWUuY3VycmVudEJsYWNrQ2FyZDtcbiAgICAkc2NvcGUuYmxhY2tDYXJkVGV4dCA9ICRzY29wZS5ibGFja0NhcmRbT2JqZWN0LmtleXMoJHNjb3BlLmJsYWNrQ2FyZClbMF1dLnRleHRcbiAgICBjb25zb2xlLmxvZyhcInRoZSBibGFjayBjYXJkIGlzXCIsICRzY29wZS5ibGFja0NhcmRUZXh0KVxuICAgIC8vdGhpcyBzaG91bGQgYmUgdW5jb21tZW50ZWQgaW4gZmluYWwgdmVyc2lvbnNcbiAgICAkc2NvcGUud2hpdGVDYXJkcyA9ICRzY29wZS5nYW1lLnBpbGUud2hpdGVjYXJkcztcbiAgICB2YXIgc2xpY2VyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogJHNjb3BlLndoaXRlQ2FyZHMubGVuZ3RoIC0gNylcbiAgICAvLyAkc2NvcGUucGxheWVySGFuZCA9ICRzY29wZS53aGl0ZUNhcmRzLnNsaWNlKHNsaWNlciwgc2xpY2VyICsgOClcbiAgICAkc2NvcGUucGxheWVySGFuZCA9ICRzY29wZS5nYW1lLnBsYXllcnNbcGxheWVySWRdLmhhbmQ7XG4gICAgY29uc29sZS5sb2coJ3BsYXllcnMgaGFuZCcsICRzY29wZS5wbGF5ZXJIYW5kKVxuXG4gICAgLy90ZW1wb3JhcnkgaW1wbGVtZW50YXRpb24gZm9yIGRlc2lnbiBwdXJwb3Nlcy5cbiAgICAvLyAkc2NvcGUuZ2FtZS53aGl0ZUNhcmRzID0gJHNjb3BlLmdhbWUucGlsZS53aGl0ZWNhcmRzXG4gICAgJHNjb3BlLnNob3dDYXJkcyA9IGZhbHNlO1xuXG4gICAgLy8kc2NvcGUucGxheWVySGFuZCA9ICRzY29wZS5nYW1lLnBsYXllcnNbcGxheWVySWRdLmhhbmQ7XG4gICAgLy8oY29uc29sZS5sb2coXCJwbGF5ZXIgaGFuZFwiLCAkc2NvcGUuaGFuZCkpXG5cbiAgICAkc2NvcGUucGxheWVyQ291bnQgPSBPYmplY3Qua2V5cygkc2NvcGUuZ2FtZS5wbGF5ZXJzKS5sZW5ndGg7ICAgICBcbn0pXG5cblxuYXBwLmNvbnRyb2xsZXIoXCJBY3RpdmVHYW1lQ3RybFwiLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgQWN0aXZlR2FtZUZhY3RvcnksIGdhbWUsICRzdGF0ZVBhcmFtcywgJGxvY2FsU3RvcmFnZSwgJHN0YXRlKSA9PiB7XG5cbiAgICBcbiAgICAkc2NvcGUub25Td2lwZURvd24gPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCd3b3JraW5nJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5zaG93Q2FyZHMpO1xuICAgICAgICAkc2NvcGUuc2hvd0NhcmRzID0gdHJ1ZSA7XG4gICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5zaG93Q2FyZHMpO1xuICAgICAgICAkc2NvcGUuJGV2YWxBc3luYygpO1xuICAgIH1cblxuICAgICRzY29wZS5vblN3aXBlVXAgPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic3dpcGVkIHVwXCIpO1xuICAgIH1cblxuICAgICRzY29wZS5vbkRvdWJsZVRhcCA9IChrZXkpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJkb3VibGUgdGFwcGVkXCIpXG4gICAgICAgICRzY29wZS5wbGF5ZWQgPSB0cnVlO1xuICAgICAgICAvL2NhbGwgc3VibWl0IGNhcmQgZnVuY3Rpb24gaGVyZS5cbiAgICB9XG5cbiAgICBBY3RpdmVHYW1lRmFjdG9yeS5yZWZpbGxNeUhhbmQoJHNjb3BlLmdhbWVJZCwgJHNjb3BlLnBsYXllcklkLCAkc2NvcGUudGVhbUlkKTtcblxuICAgICRzY29wZS4kb24oJ2NoYW5nZWRHYW1lJywgKGV2ZW50LHNuYXBzaG90KSA9PntcbiAgICAgICAgJHNjb3BlLmdhbWUgPSBzbmFwc2hvdDtcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmdhbWUpO1xuICAgICAgICBpZihnYW1lLnN0YXRlID09PSAnc3VibWlzc2lvbicpe1xuICAgICAgICAgICAgJHN0YXRlLmdvKCdnYW1lLnN1Ym1pc3Npb24tZ2FtZScpXG4gICAgICAgIH0gXG4gICAgfSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdTdWJtaXNzaW9uR2FtZUN0cmwnLCAoJHNjb3BlLCAkbG9jYWxTdG9yYWdlKSA9PiB7XG4gICAgJHNjb3BlLiRvbignY2hhbmdlZEdhbWUnLCAoZXZlbnQsc25hcHNob3QpID0+e1xuICAgICAgICAkc2NvcGUuZ2FtZSA9IHNuYXBzaG90O1xuICAgIH0pXG5cbiAgICRzY29wZS5qdWRnZSA9ICRzY29wZS5nYW1lLnBsYXllcnNbJHNjb3BlLmdhbWUuY3VycmVudEp1ZGdlXS5uYW1lXG59KVxuXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgdXJsOiAnLycsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvaG9tZS9ob21lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnSG9tZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBnYW1lczogZnVuY3Rpb24oR2FtZUZhY3RvcnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUsICRjb3Jkb3ZhT2F1dGgsIFVzZXJGYWN0b3J5LCBHYW1lRmFjdG9yeSwgJGxvY2FsU3RvcmFnZSwgZ2FtZXMsICRpb25pY1BvcHVwKSB7XG4gICAgJHNjb3BlLnN0YXJ0TmV3R2FtZSA9IEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZTtcbiAgICAkc2NvcGUuc3RvcmFnZSA9ICRsb2NhbFN0b3JhZ2U7XG4gICAgJHNjb3BlLmdhbWVzID0gZ2FtZXM7XG5cbiAgICBjb25zb2xlLmxvZyhcImdhbWVzXCIsIEpTT04uc3RyaW5naWZ5KCRzY29wZS5nYW1lcykpXG4gICAgJHNjb3BlLmdvVG9OZXdHYW1lID0gKCkgPT4ge1xuICAgICAgICAkc3RhdGUuZ28oJ25ldy1nYW1lLm1haW4nKVxuICAgIH1cblxuXG4gICAgJHNjb3BlLmpvaW5HYW1lID0gR2FtZUZhY3Rvcnkuam9pbkdhbWVCeUlkO1xuXG4gICAgJHNjb3BlLnNob3dQb3B1cCA9IGZ1bmN0aW9uKGdhbWVJZCkge1xuXG4gICAgICAgICRzY29wZS5nYW1lID0gJHNjb3BlLmdhbWVzW2dhbWVJZF07XG4gICAgICAgICRzY29wZS5nYW1lTmFtZSA9ICRzY29wZS5nYW1lLnNldHRpbmdzLm5hbWU7XG4gICAgICAgICRzY29wZS5wbGF5ZXJDb3VudCA9IE9iamVjdC5rZXlzKCRzY29wZS5nYW1lLnBsYXllcnMpLmxlbmd0aDtcbiAgICAgICAgJHNjb3BlLndhaXRpbmdGb3JQbGF5ZXJzID0gICgkc2NvcGUuZ2FtZS5zZXR0aW5ncy5taW5QbGF5ZXJzIHx8IDQpIC0gJHNjb3BlLnBsYXllckNvdW50O1xuICAgICAgICAgXG4gICAgICAgICBjb25zdCBteVBvcHVwID0gJGlvbmljUG9wdXAuc2hvdyh7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2hvbWUvcG9wdXAuaHRtbCcsXG4gICAgICAgICAgICB0aXRsZTogJ0pvaW4gJyArICRzY29wZS5nYW1lTmFtZSxcbiAgICAgICAgICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgICAgICAgICBidXR0b25zOiBcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICB7dGV4dDogJ0dvIGJhY2snfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdKb2luIGdhbWUnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYnV0dG9uLWJhbGFuY2VkJyxcbiAgICAgICAgICAgICAgICAgICAgb25UYXA6IGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmpvaW5HYW1lKGdhbWVJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2dhbWUuYWN0aXZlLWdhbWUnLCB7IGdhbWVJZDogZ2FtZUlkIH0pXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pXG4gICAgfVxufSlcblxuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKXtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2xvZ2luJywge1xuXHRcdHVybDogJy9sb2dpbicsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9sb2dpbi9sb2dpbi5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnTG9naW5DdHJsJ1xuXHR9KVxuXHQkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvbG9naW4nKTtcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdMb2dpbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSwgTG9naW5GYWN0b3J5LCBVc2VyRmFjdG9yeSwgJGNvcmRvdmFPYXV0aCwgJGxvY2FsU3RvcmFnZSwgJHRpbWVvdXQsICRpb25pY1NpZGVNZW51RGVsZWdhdGUpe1xuIFx0JHNjb3BlLmxvZ2luV2l0aFNsYWNrID0gZnVuY3Rpb24oKXtcbiBcdFx0cmV0dXJuIExvZ2luRmFjdG9yeS5nZXRTbGFja0NyZWRzKClcbiBcdFx0LnRoZW4oY3JlZHMgPT57XG4gXHRcdFx0cmV0dXJuICRjb3Jkb3ZhT2F1dGguc2xhY2soY3JlZHMuY2xpZW50SUQsIGNyZWRzLmNsaWVudFNlY3JldCwgWydpZGVudGl0eS5iYXNpYycsICdpZGVudGl0eS50ZWFtJywgJ2lkZW50aXR5LmF2YXRhciddKVxuIFx0XHR9KVxuIFx0XHQudGhlbihpbmZvID0+IFVzZXJGYWN0b3J5LnNldFVzZXIoaW5mbykpXG4gXHRcdC50aGVuKCgpID0+ICRzdGF0ZS5nbygnaG9tZScpKVxuIFx0fVxuXG4gXHQkaW9uaWNTaWRlTWVudURlbGVnYXRlLmNhbkRyYWdDb250ZW50KGZhbHNlKTtcblxuIFx0JHNjb3BlLiRvbignJGlvbmljVmlldy5sZWF2ZScsIGZ1bmN0aW9uICgpIHsgJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZS5jYW5EcmFnQ29udGVudCh0cnVlKSB9KTtcblxuIFx0JHNjb3BlLnN0b3JhZ2UgPSAkbG9jYWxTdG9yYWdlXG5cbiBcdGZ1bmN0aW9uIHJlZGlyZWN0VXNlcigpe1xuIFx0XHRjb25zb2xlLmxvZyhcInNjb3BlIHN0b3JhZ2UgdXNlclwiLCAkc2NvcGUuc3RvcmFnZS51c2VyKVxuIFx0XHRpZiAoJHNjb3BlLnN0b3JhZ2UudXNlcikgJHN0YXRlLmdvKCdob21lJylcbiBcdH1cblxuXHRyZWRpcmVjdFVzZXIoKTtcbn0pIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikgPT4ge1xuXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ25ldy1nYW1lJywge1xuICAgICAgICB1cmw6ICcvbmV3LWdhbWUnLFxuICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9tYWluLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnTmV3R2FtZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICB0ZWFtRGVja3M6IChHYW1lRmFjdG9yeSkgPT4gR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCgpLFxuICAgICAgICAgICAgc3RhbmRhcmREZWNrOiAoR2FtZUZhY3RvcnkpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoMClcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ25ldy1nYW1lLm1haW4nLCB7XG4gICAgICAgIHVybDogJy9zZXR1cC1nYW1lJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9uZXctZ2FtZS5odG1sJyxcbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5hZGQtZGVja3MnLCB7XG4gICAgICAgIHVybDogJy9hZGQtZGVja3MnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL2FkZC1kZWNrcy5odG1sJyxcbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5kZWNrJywge1xuICAgICAgICB1cmw6ICcvZGVjay86ZGVja0lkJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9kZWNrLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnRGVja0N0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBjYXJkczogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldENhcmRzQnlEZWNrSWQoJHN0YXRlUGFyYW1zLmRlY2tJZClcbiAgICAgICAgfVxuXG5cbiAgICB9KVxuXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL25ldy1nYW1lL3NldHVwLWdhbWUnKTtcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdOZXdHYW1lQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkc3RhdGUsIHRlYW1EZWNrcywgc3RhbmRhcmREZWNrKSA9PiB7XG4gICAgJHNjb3BlLmN1cnJlbnRWaWV3ID0gJ2FkZERlY2tzJ1xuICAgICRzY29wZS5nYW1lQ29uZmlnID0ge307XG4gICAgJHNjb3BlLmdhbWVDb25maWcuZGVja3MgPSB7fTtcbiAgICAkc2NvcGUuZ29Ub0RlY2tzID0gKCkgPT4ge1xuICAgICAgICAkc3RhdGUuZ28oJ25ldy1nYW1lLmFkZC1kZWNrcycsIHt9LCB7IGxvY2F0aW9uOiB0cnVlLCByZWxvYWQ6IHRydWUgfSlcbiAgICB9XG5cbiAgICAkc2NvcGUuZGVja3MgPSBzdGFuZGFyZERlY2suY29uY2F0KHRlYW1EZWNrcyk7XG5cbiAgICAkc2NvcGUuc3RhcnROZXdHYW1lID0gKGdhbWVDb25maWcpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJjYWxsZWQgc3RhcnQgbmV3IGdhbWVcIilcbiAgICAgICAgR2FtZUZhY3Rvcnkuc3RhcnROZXdHYW1lKGdhbWVDb25maWcpLnRoZW4oKGlkKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1hZGUgaXQgdG8gdGhlIC50aGVuXCIpXG4gICAgICAgICAgICBHYW1lRmFjdG9yeS5hZGRQaWxlVG9HYW1lKGlkLCAkc2NvcGUuZ2FtZUNvbmZpZy5kZWNrcylcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRkZWQgcGlsZSB0byBnYW1lXCIpXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2dhbWUuYWN0aXZlLWdhbWUnLCB7Z2FtZUlkOiBpZH0pIFxuXG4gICAgICAgIH0pXG4gICAgfVxuICAgICRzY29wZS5hZGREZWNrc1RvR2FtZSA9IEdhbWVGYWN0b3J5LmFkZERlY2tzO1xuICAgIC8vICRzY29wZS4kb24oJ2NoYW5nZWRHYW1lJywgKGV2ZW50LCBkYXRhKSA9PiB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdyZWNlaXZlZCBldmVudCcpXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdkYXRhIG9iajonLCBkYXRhKVxuICAgIC8vICAgICAkc2NvcGUuZ2FtZSA9IGRhdGE7XG4gICAgLy8gICAgICRzY29wZS4kZGlnZXN0KClcblxuICAgIC8vIH0pXG5cblxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0RlY2tDdHJsJywgKCRzY29wZSwgR2FtZUZhY3RvcnksICRzdGF0ZSwgY2FyZHMpID0+IHtcbiAgICAkc2NvcGUuY2FyZHMgPSBjYXJkc1xufSlcblxuIiwiLy9EaXJlY3RpdmUgRmlsZSIsImFwcC5mYWN0b3J5KCdBY3RpdmVHYW1lRmFjdG9yeScsICgkaHR0cCwgJHJvb3RTY29wZSwgJGxvY2FsU3RvcmFnZSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IEFjdGl2ZUdhbWVGYWN0b3J5ID0ge307XG5cbiAgICAgICAgY29uc3QgcmVmaWxsZXIgPSAoY2FyZHNOZWVkZWQsIHBpbGVSZWYsIGhhbmRSZWYpID0+IHtcbiAgICAgICAgICBwaWxlUmVmLmxpbWl0VG9GaXJzdChjYXJkc05lZWRlZCkub25jZSgndmFsdWUnLCBjYXJkc1NuYXBzaG90ID0+IHtcbiAgICAgICAgICAgIGNhcmRzU25hcHNob3QuZm9yRWFjaChjYXJkID0+IHtcbiAgICAgICAgICAgICAgbGV0IHVwZGF0ZU9iaiA9IHt9XG4gICAgICAgICAgICAgIGNhcmQucmVmLnRyYW5zYWN0aW9uKGNhcmREYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgIHVwZGF0ZU9ialtjYXJkLmtleV0gPSBjYXJkRGF0YVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IGhhbmRSZWYudXBkYXRlKHVwZGF0ZU9iaikpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICAgICAgfVxuXG4gICAgICAgIEFjdGl2ZUdhbWVGYWN0b3J5LnJlZmlsbE15SGFuZCA9IChnYW1lSWQsIHBsYXllcklkLCB0ZWFtSWQpID0+IHtcbiAgICAgICAgICAvLyBob3cgbWFueSBjYXJkcyBkbyBJIG5lZWQ/XG4gICAgICAgICAgbGV0IGNhcmRzTmVlZGVkID0gMFxuICAgICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgY29uc3QgaGFuZFJlZiA9IGdhbWVSZWYuY2hpbGQoYHBsYXllcnMvJHtwbGF5ZXJJZH0vaGFuZGApXG4gICAgICAgICAgY29uc3QgcGlsZVJlZiA9IGdhbWVSZWYuY2hpbGQoJ3BpbGUvd2hpdGVjYXJkcycpXG4gICAgICAgICAgaGFuZFJlZi5vbmNlKCd2YWx1ZScsIGhhbmRTbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgIGNhcmRzTmVlZGVkID0gNyAtIGhhbmRTbmFwc2hvdC5udW1DaGlsZHJlbigpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICByZWZpbGxlcihjYXJkc05lZWRlZCwgcGlsZVJlZiwgaGFuZFJlZilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBBY3RpdmVHYW1lRmFjdG9yeS5zdWJtaXRXaGl0ZUNhcmQgPSAocGxheWVySWQsIGNhcmRJZCwgZ2FtZUlkLCB0ZWFtSWQpID0+IHtcbiAgICAgICAgICBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKTtcbiAgICAgICAgICBjb25zdCBjYXJkVG9TdWJtaXQgPSBnYW1lUmVmLmNoaWxkKGBwbGF5ZXJzLyR7cGxheWVySWR9L2hhbmQvJHtjYXJkSWR9YCk7XG4gICAgICAgICAgY29uc3Qgc3VibWl0UmVmID0gZ2FtZVJlZi5jaGlsZCgnc3VibWl0dGVkV2hpdGVDYXJkcycpO1xuICAgICAgICAgIGZpcmViYXNlTW92ZVNpbmdsZUtleVZhbHVlKGNhcmRUb1N1Ym1pdCwgc3VibWl0UmVmKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gc3VibWl0UmVmLmNoaWxkKGNhcmRJZCkuc2V0KHtcbiAgICAgICAgICAgICAgc3VibWl0dGVkQnk6IHBsYXllcklkXG4gICAgICAgICAgICB9KSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBBY3RpdmVHYW1lRmFjdG9yeTsgXG5cblxufSk7IiwiYXBwLmZhY3RvcnkoJ0dhbWVGYWN0b3J5JywgKCRodHRwLCAkcm9vdFNjb3BlLCAkbG9jYWxTdG9yYWdlKSA9PiB7XG4gICAgY29uc3Qgb3VySXBzID0ge1xuICAgICAgICBuaWtpdGE6IFwiMTkyLjE2OC40LjIxM1wiLFxuICAgICAgICBrYXlsYTogXCIxOTIuMTY4LjQuMjI1XCIsXG4gICAgICAgIG5pdGh5YTogXCIxOTIuMTY4LjEuNDhcIixcbiAgICAgICAgZGFuOiBcIjE5Mi4xNjguNC4yMzZcIlxuICAgIH1cbiAgICBjb25zdCBjdXJyZW50SXAgPSBvdXJJcHMua2F5bGE7XG5cbiAgICAgICAgLy8gc3RhcnQgYSBuZXcgZ2FtZSBkZXJwXG4gICAgICAgIGNvbnN0IEdhbWVGYWN0b3J5ID0ge307XG4gICAgICAgIEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZSA9IChnYW1lQ29uZmlnKSA9PiB7XG4gICAgICAgICAgICAvL2NhbiBhbHNvIGdldCBhbGwgdGhlIGRlY2tzIGJ5IHRlYW0gaGVyZSB0byBwcmVwYXJlXG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAkbG9jYWxTdG9yYWdlLnRlYW0uaWQgfHwgMjtcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0b3JJZCA9ICRsb2NhbFN0b3JhZ2UudXNlci5pZCB8fCAzO1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZ2FtZXNgLCB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGdhbWVDb25maWcubmFtZSB8fCAnQVdFU09NRSBOYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgdGVhbUlkOiB0ZWFtSWQsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0b3JJZDogY3JlYXRvcklkLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdG9yTmFtZTogJGxvY2FsU3RvcmFnZS51c2VyLm5hbWUgfHwgJ2RhbicsIC8vbWlnaHQgYmUgdW5uZWNlc3NhcnkgaWYgd2UgaGF2ZSB0aGUgdXNlciBpZFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczogZ2FtZUNvbmZpZ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2FtZUlkID0gcmVzLmRhdGFcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGAvdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICAgICAgICAgIGdhbWVSZWYub24oJ3ZhbHVlJywgc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdjaGFuZ2VkR2FtZScsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdhbWVJZDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9O1xuICAgICAgICAvLyBnZXQgYWxsIG9mIGEgZGVja3MgY2FyZHMgdG8gZGlzcGxheSB3aGVuIGxvb2tpbmcgYXQgZGVja3NcbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0Q2FyZHNCeURlY2tJZCA9IChpZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9kZWNrcy8ke2lkfS9jYXJkc2ApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBUT0RPOiBjb21iaW5lIHRoaXMgaW50byB0aGUgYWJvdmUgc3RhcnROZXdHYW1lIGZ1bmNcbiAgICAgICAgLy8gdGFrZSBhbGwgb2YgdGhlIHNlbGVjdGVkIGRlY2tzJyBjYXJkcyBhbmQgcHV0IHRoZW0gaW4gdGhlIGZpcmViYXNlIGdhbWUgb2JqZWN0IHBpbGUgKHRocm91Z2ggcm91dGUpXG4gICAgICAgIEdhbWVGYWN0b3J5LmFkZFBpbGVUb0dhbWUgPSAoZ2FtZUlkLCBkZWNrcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZGRpbmcgcGlsZSB0byBnYW1lXCIpXG4gICAgICAgICAgICBjb25zdCBkZWNrc0FyciA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgZGVja0lkIGluIGRlY2tzKSB7XG4gICAgICAgICAgICAgICAgZGVja3NBcnIucHVzaChkZWNrSWQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0vZGVja3NgLCB7XG4gICAgICAgICAgICAgICAgJ2RlY2tzJzogZGVja3NBcnJcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAkbG9jYWxTdG9yYWdlLnRlYW0uaWQ7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJJZCA9ICRsb2NhbFN0b3JhZ2UudXNlci5pZDtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllck5hbWUgPSAkbG9jYWxTdG9yYWdlLnVzZXIubmFtZTtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllclJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9L3BsYXllcnMvJHtwbGF5ZXJJZH1gKVxuICAgICAgICAgICAgcGxheWVyUmVmLnNldCh7XG4gICAgICAgICAgICAgICAgbmFtZTogcGxheWVyTmFtZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICBnYW1lUmVmLm9uKCd2YWx1ZScsIHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2NoYW5nZWRHYW1lJywgc25hcHNob3QudmFsKCkpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICRodHRwLnBvc3QoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZ2FtZXMvJHtnYW1lSWR9P3BsYXllcklkPSR7cGxheWVySWR9YClcbiAgICAgICAgfVxuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQgPSAoaWQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRlYW1JZCA9ICh0eXBlb2YgaWQgIT09ICdudW1iZXInKSA/ICRsb2NhbFN0b3JhZ2UudGVhbS5pZCA6IGlkOyAvLyBpZCB8fCBsb2NhbHN0b3JhZ2UgZG9lc24ndCB3b3JrIGJlY2F1c2UgMCBpcyBmYWxzZXlcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZGVja3M/dGVhbT0ke3RlYW1JZH1gKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcblxuICAgICAgICB9O1xuXG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0VXNlcnNCeUdhbWVJZCA9IChnYW1lSWQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZ2FtZXMvJHtnYW1lSWR9L3VzZXJzYCk7XG4gICAgICAgIH07XG5cblxuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVCeUdhbWVJZCA9IChnYW1lSWQsIHRlYW1JZCkgPT4ge1xuICAgICAgICAgICAgdGVhbUlkID0gdGVhbUlkIHx8ICRsb2NhbFN0b3JhZ2UudGVhbS5pZFxuICAgICAgICAgICAgY29uc3QgZ2FtZXNSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICByZXR1cm4gZ2FtZXNSZWYub25jZSgndmFsdWUnKS50aGVuKHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc25hcHNob3QudmFsKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQgPSAodGVhbUlkKSA9PiB7XG4gICAgICAgICAgICB0ZWFtSWQgPSB0ZWFtSWQgfHwgJGxvY2FsU3RvcmFnZS50ZWFtLmlkXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzLz90ZWFtSWQ9JHt0ZWFtSWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlVc2VyID0gKHVzZXJJZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lcy8/dXNlcklkPSR7dXNlcklkfWApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gR2FtZUZhY3Rvcnk7XG4gICAgfVxuXG4pO1xuIiwiYXBwLmZhY3RvcnkoJ1VzZXJGYWN0b3J5JywgZnVuY3Rpb24oJGh0dHAsICRsb2NhbFN0b3JhZ2Upe1xuXHRjb25zdCBvdXJJcHMgPSB7XG4gICAgICAgIG5pa2l0YTogXCIxOTIuMTY4LjQuMjEzXCIsXG4gICAgICAgIGtheWxhOiBcIjE5Mi4xNjguNC4yMjVcIixcbiAgICAgICAgbml0aHlhOiBcIjE5Mi4xNjguMS40OFwiLFxuICAgICAgICBkYW46IFwiMTkyLjE2OC40LjIzNlwiXG4gICAgfVxuICAgIGNvbnN0IGN1cnJlbnRJcCA9IG91cklwcy5rYXlsYVxuXHRyZXR1cm4ge1xuXHRcdHNldFVzZXI6IGZ1bmN0aW9uKGluZm8pe1xuXHRcdFx0cmV0dXJuICRodHRwKHtcblx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRcdHVybDogYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvdXNlcnNgLFxuXHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRkYXRhOiBpbmZvXG5cdFx0XHR9KVxuXHRcdFx0LnRoZW4ocmVzID0+IHtcblx0XHRcdFx0dGhpcy5zZXRMb2NhbFN0b3JhZ2UocmVzLmRhdGEudXNlclswXSwgcmVzLmRhdGEudGVhbVswXSk7XG5cdFx0XHR9KVxuXHRcdH0sXG5cdFx0Z2V0U2xhY2tDcmVkczogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvc2xhY2tgKVxuXHRcdFx0XHQudGhlbihyZXMgPT4ge1xuXHRcdFx0XHRcdHJldHVybiByZXMuZGF0YVxuXHRcdFx0XHR9KVxuXHRcdH0sXG5cdFx0Z2V0U2xhY2tJbmZvOiBmdW5jdGlvbigpe1xuXHRcdFx0cmV0dXJuICRodHRwLmdldCgnaHR0cHM6Ly9zbGFjay5jb20vYXBpL3VzZXJzLmlkZW50aXR5Jylcblx0XHR9LFxuXG5cdFx0c2V0TG9jYWxTdG9yYWdlOiBmdW5jdGlvbih1c2VyLCB0ZWFtKXtcblx0XHRcdCRsb2NhbFN0b3JhZ2UudXNlciA9IHVzZXI7XG5cdFx0XHQkbG9jYWxTdG9yYWdlLnRlYW0gPSB0ZWFtO1xuXHRcdH0sXG5cblx0XHRsb2dPdXQ6IGZ1bmN0aW9uKCl7XG5cdFx0XHQkbG9jYWxTdG9yYWdlLiRyZXNldCgpO1xuXHRcdH1cblx0fVxufSlcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
>>>>>>> master
