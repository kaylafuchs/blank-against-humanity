'use strict';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

window.app = angular.module('BlankAgainstHumanity', ['ionic', 'ui.router', 'ngCordova', 'ngCordovaOauth', 'ngStorage', 'ngAnimate']);

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
    var currentIp = ourIps.dan;

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

    var currentIp = ourIps.dan;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImNhcmRzLXRlc3QvY2FyZHNUZXN0LmpzIiwiZGVja3MvZGVja3MuanMiLCJmcm9tIGZzZy9mcm9tLWZzZy5qcyIsImdhbWUvZ2FtZS5qcyIsImhvbWUvaG9tZS5qcyIsImxvZ2luL2xvZ2luLmpzIiwibmV3LWdhbWUvbmV3LWdhbWUuanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiLCJjb21tb24vZmFjdG9yaWVzL0FjdGl2ZUdhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9HYW1lRmFjdG9yeS5qcyIsImNvbW1vbi9mYWN0b3JpZXMvdXNlckZhY3RvcnkuanMiXSwibmFtZXMiOlsid2luZG93IiwiYXBwIiwiYW5ndWxhciIsIm1vZHVsZSIsInJ1biIsIiRpb25pY1BsYXRmb3JtIiwicmVhZHkiLCJjb3Jkb3ZhIiwicGx1Z2lucyIsIktleWJvYXJkIiwiaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyIiwiZGlzYWJsZVNjcm9sbCIsIlN0YXR1c0JhciIsInN0eWxlTGlnaHRDb250ZW50IiwiY29udHJvbGxlciIsIiRzY29wZSIsIlVzZXJGYWN0b3J5IiwiJHN0YXRlIiwiJGxvY2FsU3RvcmFnZSIsIiR0aW1lb3V0IiwibG9nT3V0IiwiZ28iLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsInN0YXRlIiwidXJsIiwidGVtcGxhdGVVcmwiLCJncmVldGluZyIsInJlc29sdmUiLCJkZWNrcyIsIkdhbWVGYWN0b3J5IiwiJHN0YXRlUGFyYW1zIiwiZ2V0RGVja3NCeVRlYW1JZCIsInN0YXRlUGFyYW1zIiwidGVhbUlkIiwiYWJzdHJhY3QiLCJnYW1lIiwiZ2V0R2FtZUJ5R2FtZUlkIiwiZ2FtZUlkIiwicGxheWVySWQiLCJ1c2VyIiwiaWQiLCJjb25zb2xlIiwibG9nIiwidGVhbSIsImdhbWVOYW1lIiwic2V0dGluZ3MiLCJuYW1lIiwianVkZ2UiLCJwbGF5ZXJzIiwiY3VycmVudEp1ZGdlIiwiYmxhY2tDYXJkIiwiY3VycmVudEJsYWNrQ2FyZCIsImJsYWNrQ2FyZFRleHQiLCJPYmplY3QiLCJrZXlzIiwidGV4dCIsIndoaXRlQ2FyZHMiLCJwaWxlIiwid2hpdGVjYXJkcyIsInNsaWNlciIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsImxlbmd0aCIsInBsYXllckhhbmQiLCJoYW5kIiwic2hvd0NhcmRzIiwicGxheWVyQ291bnQiLCJBY3RpdmVHYW1lRmFjdG9yeSIsIm9uU3dpcGVEb3duIiwiJGV2YWxBc3luYyIsIm9uU3dpcGVVcCIsIm9uRG91YmxlVGFwIiwia2V5IiwicGxheWVkIiwicmVmaWxsTXlIYW5kIiwiJG9uIiwiZXZlbnQiLCJzbmFwc2hvdCIsIiR1cmxSb3V0ZXJQcm92aWRlciIsImdhbWVzIiwiZ2V0R2FtZXNCeVRlYW1JZCIsIiRjb3Jkb3ZhT2F1dGgiLCIkaW9uaWNQb3B1cCIsInN0YXJ0TmV3R2FtZSIsInN0b3JhZ2UiLCJKU09OIiwic3RyaW5naWZ5IiwiZ29Ub05ld0dhbWUiLCJqb2luR2FtZSIsImpvaW5HYW1lQnlJZCIsInNob3dQb3B1cCIsIndhaXRpbmdGb3JQbGF5ZXJzIiwibWluUGxheWVycyIsIm15UG9wdXAiLCJzaG93IiwidGl0bGUiLCJzY29wZSIsImJ1dHRvbnMiLCJ0eXBlIiwib25UYXAiLCJvdGhlcndpc2UiLCIkaW9uaWNTaWRlTWVudURlbGVnYXRlIiwibG9naW5XaXRoU2xhY2siLCJnZXRTbGFja0NyZWRzIiwidGhlbiIsInNsYWNrIiwiY3JlZHMiLCJjbGllbnRJRCIsImNsaWVudFNlY3JldCIsInNldFVzZXIiLCJpbmZvIiwiY2FuRHJhZ0NvbnRlbnQiLCJyZWRpcmVjdFVzZXIiLCJ0ZWFtRGVja3MiLCJzdGFuZGFyZERlY2siLCJjYXJkcyIsImdldENhcmRzQnlEZWNrSWQiLCJkZWNrSWQiLCJjdXJyZW50VmlldyIsImdhbWVDb25maWciLCJnb1RvRGVja3MiLCJsb2NhdGlvbiIsInJlbG9hZCIsImNvbmNhdCIsImFkZFBpbGVUb0dhbWUiLCJhZGREZWNrc1RvR2FtZSIsImFkZERlY2tzIiwiZmFjdG9yeSIsIiRodHRwIiwiJHJvb3RTY29wZSIsInJlZmlsbGVyIiwiY2FyZHNOZWVkZWQiLCJwaWxlUmVmIiwiaGFuZFJlZiIsImxpbWl0VG9GaXJzdCIsIm9uY2UiLCJjYXJkc1NuYXBzaG90IiwiZm9yRWFjaCIsInVwZGF0ZU9iaiIsImNhcmQiLCJyZWYiLCJ0cmFuc2FjdGlvbiIsImNhcmREYXRhIiwidXBkYXRlIiwiY2F0Y2giLCJlcnIiLCJnYW1lUmVmIiwiZmlyZWJhc2UiLCJkYXRhYmFzZSIsImNoaWxkIiwiaGFuZFNuYXBzaG90IiwibnVtQ2hpbGRyZW4iLCJzdWJtaXRXaGl0ZUNhcmQiLCJjYXJkSWQiLCJjYXJkVG9TdWJtaXQiLCJzdWJtaXRSZWYiLCJmaXJlYmFzZU1vdmVTaW5nbGVLZXlWYWx1ZSIsInNldCIsInN1Ym1pdHRlZEJ5Iiwib3VySXBzIiwibmlraXRhIiwia2F5bGEiLCJuaXRoeWEiLCJkYW4iLCJjdXJyZW50SXAiLCJjcmVhdG9ySWQiLCJwb3N0IiwiY3JlYXRvck5hbWUiLCJyZXMiLCJkYXRhIiwib24iLCIkYnJvYWRjYXN0IiwidmFsIiwiZ2V0IiwiZGVja3NBcnIiLCJwdXNoIiwicGxheWVyTmFtZSIsInBsYXllclJlZiIsImdldFVzZXJzQnlHYW1lSWQiLCJnYW1lc1JlZiIsImdldEdhbWVzQnlVc2VyIiwidXNlcklkIiwibWV0aG9kIiwiaGVhZGVycyIsInNldExvY2FsU3RvcmFnZSIsImdldFNsYWNrSW5mbyIsIiRyZXNldCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUFBLE9BQUFDLEdBQUEsR0FBQUMsUUFBQUMsTUFBQSxDQUFBLHNCQUFBLEVBQUEsQ0FBQSxPQUFBLEVBQUEsV0FBQSxFQUFBLFdBQUEsRUFBQSxnQkFBQSxFQUFBLFdBQUEsRUFBQSxXQUFBLENBQUEsQ0FBQTs7QUFHQUYsSUFBQUcsR0FBQSxDQUFBLFVBQUFDLGNBQUEsRUFBQTtBQUNBQSxtQkFBQUMsS0FBQSxDQUFB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Q0ExQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIElvbmljIFN0YXJ0ZXIgQXBwXG5cbi8vIGFuZ3VsYXIubW9kdWxlIGlzIGEgZ2xvYmFsIHBsYWNlIGZvciBjcmVhdGluZywgcmVnaXN0ZXJpbmcgYW5kIHJldHJpZXZpbmcgQW5ndWxhciBtb2R1bGVzXG4vLyAnc3RhcnRlcicgaXMgdGhlIG5hbWUgb2YgdGhpcyBhbmd1bGFyIG1vZHVsZSBleGFtcGxlIChhbHNvIHNldCBpbiBhIDxib2R5PiBhdHRyaWJ1dGUgaW4gaW5kZXguaHRtbClcbi8vIHRoZSAybmQgcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9mICdyZXF1aXJlcydcblxud2luZG93LmFwcCA9IGFuZ3VsYXIubW9kdWxlKCdCbGFua0FnYWluc3RIdW1hbml0eScsIFsnaW9uaWMnLCAndWkucm91dGVyJywgJ25nQ29yZG92YScsICduZ0NvcmRvdmFPYXV0aCcsICduZ1N0b3JhZ2UnLCAnbmdBbmltYXRlJ10pXG5cblxuYXBwLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxuICAgICAgICAgICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcblxuICAgICAgICAgICAgLy8gRG9uJ3QgcmVtb3ZlIHRoaXMgbGluZSB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nLiBJdCBzdG9wcyB0aGUgdmlld3BvcnRcbiAgICAgICAgICAgIC8vIGZyb20gc25hcHBpbmcgd2hlbiB0ZXh0IGlucHV0cyBhcmUgZm9jdXNlZC4gSW9uaWMgaGFuZGxlcyB0aGlzIGludGVybmFsbHkgZm9yXG4gICAgICAgICAgICAvLyBhIG11Y2ggbmljZXIga2V5Ym9hcmQgZXhwZXJpZW5jZS5cbiAgICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5kaXNhYmxlU2Nyb2xsKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICAgICAgICBTdGF0dXNCYXIuc3R5bGVMaWdodENvbnRlbnQoKVxuICAgICAgICB9XG4gICAgfSk7XG5cbn0pXG5cbiIsImFwcC5jb250cm9sbGVyKCdMb2dvdXRDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBVc2VyRmFjdG9yeSwgJHN0YXRlLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCl7XG5cdCRzY29wZS5sb2dPdXQgPSBmdW5jdGlvbigpe1xuXHRcdFVzZXJGYWN0b3J5LmxvZ091dCgpXG5cdFx0JHN0YXRlLmdvKCdsb2dpbicpXG5cdH1cbn0pIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcil7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdjYXJkcycsIHtcblx0XHR1cmw6ICcvY2FyZHMnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvY2FyZHMtdGVzdC9jYXJkcy10ZXN0Lmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdDYXJkc1Rlc3RDdHJsJ1xuXHR9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0NhcmRzVGVzdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpe1xuIFx0JHNjb3BlLmdyZWV0aW5nID0gXCJISVwiXG59KSIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdkZWNrcycsIHtcblx0XHR1cmw6ICdkZWNrcy86dGVhbWlkJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2RlY2tzL2RlY2tzLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdEZWNrQ3RybCcsXG5cdFx0cmVzb2x2ZToge1xuXHRcdFx0ZGVja3M6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkKHN0YXRlUGFyYW1zLnRlYW1JZClcblx0XHR9XG5cdH0pXG5cbn0pXG5cbmFwcC5jb250cm9sbGVyKCdEZWNrQ3RybCcsICgkc2NvcGUpID0+IHtcblxuXG5cdFxufSkiLCIvLyAoZnVuY3Rpb24gKCkge1xuXG4vLyAgICAgJ3VzZSBzdHJpY3QnO1xuXG4vLyAgICAgLy8gSG9wZSB5b3UgZGlkbid0IGZvcmdldCBBbmd1bGFyISBEdWgtZG95LlxuLy8gICAgIGlmICghd2luZG93LmFuZ3VsYXIpIHRocm93IG5ldyBFcnJvcignSSBjYW5cXCd0IGZpbmQgQW5ndWxhciEnKTtcblxuLy8gICAgIHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnZnNhUHJlQnVpbHQnLCBbXSk7XG5cbi8vICAgICBhcHAuZmFjdG9yeSgnU29ja2V0JywgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICBpZiAoIXdpbmRvdy5pbykgdGhyb3cgbmV3IEVycm9yKCdzb2NrZXQuaW8gbm90IGZvdW5kIScpO1xuLy8gICAgICAgICByZXR1cm4gd2luZG93LmlvKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pO1xuLy8gICAgIH0pO1xuXG4vLyAgICAgLy8gQVVUSF9FVkVOVFMgaXMgdXNlZCB0aHJvdWdob3V0IG91ciBhcHAgdG9cbi8vICAgICAvLyBicm9hZGNhc3QgYW5kIGxpc3RlbiBmcm9tIGFuZCB0byB0aGUgJHJvb3RTY29wZVxuLy8gICAgIC8vIGZvciBpbXBvcnRhbnQgZXZlbnRzIGFib3V0IGF1dGhlbnRpY2F0aW9uIGZsb3cuXG4vLyAgICAgYXBwLmNvbnN0YW50KCdBVVRIX0VWRU5UUycsIHtcbi8vICAgICAgICAgbG9naW5TdWNjZXNzOiAnYXV0aC1sb2dpbi1zdWNjZXNzJyxcbi8vICAgICAgICAgbG9naW5GYWlsZWQ6ICdhdXRoLWxvZ2luLWZhaWxlZCcsXG4vLyAgICAgICAgIGxvZ291dFN1Y2Nlc3M6ICdhdXRoLWxvZ291dC1zdWNjZXNzJyxcbi8vICAgICAgICAgc2Vzc2lvblRpbWVvdXQ6ICdhdXRoLXNlc3Npb24tdGltZW91dCcsXG4vLyAgICAgICAgIG5vdEF1dGhlbnRpY2F0ZWQ6ICdhdXRoLW5vdC1hdXRoZW50aWNhdGVkJyxcbi8vICAgICAgICAgbm90QXV0aG9yaXplZDogJ2F1dGgtbm90LWF1dGhvcml6ZWQnXG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuZmFjdG9yeSgnQXV0aEludGVyY2VwdG9yJywgZnVuY3Rpb24gKCRyb290U2NvcGUsICRxLCBBVVRIX0VWRU5UUykge1xuLy8gICAgICAgICB2YXIgc3RhdHVzRGljdCA9IHtcbi8vICAgICAgICAgICAgIDQwMTogQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCxcbi8vICAgICAgICAgICAgIDQwMzogQVVUSF9FVkVOVFMubm90QXV0aG9yaXplZCxcbi8vICAgICAgICAgICAgIDQxOTogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsXG4vLyAgICAgICAgICAgICA0NDA6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0XG4vLyAgICAgICAgIH07XG4vLyAgICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgICAgICByZXNwb25zZUVycm9yOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3Qoc3RhdHVzRGljdFtyZXNwb25zZS5zdGF0dXNdLCByZXNwb25zZSk7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXNwb25zZSlcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfTtcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5jb25maWcoZnVuY3Rpb24gKCRodHRwUHJvdmlkZXIpIHtcbi8vICAgICAgICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaChbXG4vLyAgICAgICAgICAgICAnJGluamVjdG9yJyxcbi8vICAgICAgICAgICAgIGZ1bmN0aW9uICgkaW5qZWN0b3IpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJGluamVjdG9yLmdldCgnQXV0aEludGVyY2VwdG9yJyk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIF0pO1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLnNlcnZpY2UoJ0F1dGhTZXJ2aWNlJywgZnVuY3Rpb24gKCRodHRwLCBTZXNzaW9uLCAkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUywgJHEpIHtcblxuLy8gICAgICAgICBmdW5jdGlvbiBvblN1Y2Nlc3NmdWxMb2dpbihyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgdmFyIHVzZXIgPSByZXNwb25zZS5kYXRhLnVzZXI7XG4vLyAgICAgICAgICAgICBTZXNzaW9uLmNyZWF0ZSh1c2VyKTtcbi8vICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dpblN1Y2Nlc3MpO1xuLy8gICAgICAgICAgICAgcmV0dXJuIHVzZXI7XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICAvLyBVc2VzIHRoZSBzZXNzaW9uIGZhY3RvcnkgdG8gc2VlIGlmIGFuXG4vLyAgICAgICAgIC8vIGF1dGhlbnRpY2F0ZWQgdXNlciBpcyBjdXJyZW50bHkgcmVnaXN0ZXJlZC5cbi8vICAgICAgICAgdGhpcy5pc0F1dGhlbnRpY2F0ZWQgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gISFTZXNzaW9uLnVzZXI7XG4vLyAgICAgICAgIH07XG5cbiAgICAgICAgXG4vLyAgICAgICAgIHRoaXMuaXNBZG1pbiA9IGZ1bmN0aW9uKHVzZXJJZCl7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZygncnVubmluZyBhZG1pbiBmdW5jJylcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJylcbi8vICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEudXNlci5pc0FkbWluKVxuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgdGhpcy5nZXRMb2dnZWRJblVzZXIgPSBmdW5jdGlvbiAoZnJvbVNlcnZlcikge1xuXG4vLyAgICAgICAgICAgICAvLyBJZiBhbiBhdXRoZW50aWNhdGVkIHNlc3Npb24gZXhpc3RzLCB3ZVxuLy8gICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSB1c2VyIGF0dGFjaGVkIHRvIHRoYXQgc2Vzc2lvblxuLy8gICAgICAgICAgICAgLy8gd2l0aCBhIHByb21pc2UuIFRoaXMgZW5zdXJlcyB0aGF0IHdlIGNhblxuLy8gICAgICAgICAgICAgLy8gYWx3YXlzIGludGVyZmFjZSB3aXRoIHRoaXMgbWV0aG9kIGFzeW5jaHJvbm91c2x5LlxuXG4vLyAgICAgICAgICAgICAvLyBPcHRpb25hbGx5LCBpZiB0cnVlIGlzIGdpdmVuIGFzIHRoZSBmcm9tU2VydmVyIHBhcmFtZXRlcixcbi8vICAgICAgICAgICAgIC8vIHRoZW4gdGhpcyBjYWNoZWQgdmFsdWUgd2lsbCBub3QgYmUgdXNlZC5cblxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuaXNBdXRoZW50aWNhdGVkKCkgJiYgZnJvbVNlcnZlciAhPT0gdHJ1ZSkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKFNlc3Npb24udXNlcik7XG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIC8vIE1ha2UgcmVxdWVzdCBHRVQgL3Nlc3Npb24uXG4vLyAgICAgICAgICAgICAvLyBJZiBpdCByZXR1cm5zIGEgdXNlciwgY2FsbCBvblN1Y2Nlc3NmdWxMb2dpbiB3aXRoIHRoZSByZXNwb25zZS5cbi8vICAgICAgICAgICAgIC8vIElmIGl0IHJldHVybnMgYSA0MDEgcmVzcG9uc2UsIHdlIGNhdGNoIGl0IGFuZCBpbnN0ZWFkIHJlc29sdmUgdG8gbnVsbC5cbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJykudGhlbihvblN1Y2Nlc3NmdWxMb2dpbikuY2F0Y2goZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuLy8gICAgICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmxvZ2luID0gZnVuY3Rpb24gKGNyZWRlbnRpYWxzKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2xvZ2luJywgY3JlZGVudGlhbHMpXG4vLyAgICAgICAgICAgICAgICAgLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pXG4vLyAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCh7IG1lc3NhZ2U6ICdJbnZhbGlkIGxvZ2luIGNyZWRlbnRpYWxzLid9KTtcbi8vICAgICAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLnNpZ251cCA9IGZ1bmN0aW9uKGNyZWRlbnRpYWxzKXtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4vLyAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4vLyAgICAgICAgICAgICAgICAgdXJsOiAnL3NpZ251cCcsXG4vLyAgICAgICAgICAgICAgICAgZGF0YTogY3JlZGVudGlhbHNcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4gcmVzdWx0LmRhdGEpXG4vLyAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oKXtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHttZXNzYWdlOiAnVGhhdCBlbWFpbCBpcyBhbHJlYWR5IGJlaW5nIHVzZWQuJ30pO1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmxvZ291dCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9sb2dvdXQnKS50aGVuKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICBTZXNzaW9uLmRlc3Ryb3koKTtcbi8vICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoQVVUSF9FVkVOVFMubG9nb3V0U3VjY2Vzcyk7XG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfTtcblxuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLnNlcnZpY2UoJ1Nlc3Npb24nLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMpIHtcblxuLy8gICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbi8vICAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCwgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgc2VsZi5kZXN0cm95KCk7XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgICRyb290U2NvcGUuJG9uKEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0LCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICBzZWxmLmRlc3Ryb3koKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcblxuLy8gICAgICAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uICh1c2VyKSB7XG4vLyAgICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICB9KTtcblxuLy8gfSgpKTtcbiIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnL2dhbWUvOmdhbWVJZCcsXG4gICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2dhbWUvZ2FtZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0dhbWVDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgZ2FtZSA6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXRHYW1lQnlHYW1lSWQoJHN0YXRlUGFyYW1zLmdhbWVJZClcbiAgICAgICAgfSAgXG4gICAgfSlcbiAgICAuc3RhdGUoJ2dhbWUuYWN0aXZlLWdhbWUnLCB7XG4gICAgICAgIHVybDogJy9hY3RpdmUtZ2FtZScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvZ2FtZS9hY3RpdmUtZ2FtZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0FjdGl2ZUdhbWVDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgZ2FtZSA6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXRHYW1lQnlHYW1lSWQoJHN0YXRlUGFyYW1zLmdhbWVJZClcbiAgICAgICAgfSAgICBcbiAgICB9KVxuICAgIC5zdGF0ZSgnZ2FtZS5zdWJtaXNzaW9uLWdhbWUnLCB7XG4gICAgICAgIHVybDogJy9zdWJtaXNzaW9uLWdhbWUnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2dhbWUvc3VibWlzc2lvbi1nYW1lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnU3VibWlzc2lvbkdhbWVDdHJsJ1xuICAgIH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignR2FtZUN0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zLCAkbG9jYWxTdG9yYWdlLCBnYW1lKSA9PiB7ICAgXG4gICAgY29uc3QgZ2FtZUlkID0gJHN0YXRlUGFyYW1zLmdhbWVJZDtcbiAgICBjb25zdCBwbGF5ZXJJZCA9ICRsb2NhbFN0b3JhZ2UudXNlci5pZDtcbiAgICBjb25zb2xlLmxvZyhcInBsYXllciBpZFwiLCBwbGF5ZXJJZClcbiAgICBjb25zdCB0ZWFtSWQgPSAkbG9jYWxTdG9yYWdlLnRlYW0uaWRcbiAgICAkc2NvcGUuZ2FtZSA9IGdhbWU7XG4gICAgJHNjb3BlLmdhbWVOYW1lID0gJHNjb3BlLmdhbWUuc2V0dGluZ3MubmFtZTtcbiAgICBjb25zb2xlLmxvZyhcImFjdGl2ZSBzdGF0ZSBnYW1lXCIsICRzY29wZS5nYW1lKTtcbiAgICAkc2NvcGUuanVkZ2UgPSAkc2NvcGUuZ2FtZS5wbGF5ZXJzWyRzY29wZS5nYW1lLmN1cnJlbnRKdWRnZV1cbiAgICBjb25zb2xlLmxvZyhcInRoZSBqdWRnZSBpc1wiLCAkc2NvcGUuanVkZ2UpXG4gICAgJHNjb3BlLmJsYWNrQ2FyZCA9ICRzY29wZS5nYW1lLmN1cnJlbnRCbGFja0NhcmQ7XG4gICAgJHNjb3BlLmJsYWNrQ2FyZFRleHQgPSAkc2NvcGUuYmxhY2tDYXJkW09iamVjdC5rZXlzKCRzY29wZS5ibGFja0NhcmQpWzBdXS50ZXh0XG4gICAgY29uc29sZS5sb2coXCJ0aGUgYmxhY2sgY2FyZCBpc1wiLCAkc2NvcGUuYmxhY2tDYXJkVGV4dClcbiAgICAvL3RoaXMgc2hvdWxkIGJlIHVuY29tbWVudGVkIGluIGZpbmFsIHZlcnNpb25zXG4gICAgJHNjb3BlLndoaXRlQ2FyZHMgPSAkc2NvcGUuZ2FtZS5waWxlLndoaXRlY2FyZHM7XG4gICAgdmFyIHNsaWNlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICRzY29wZS53aGl0ZUNhcmRzLmxlbmd0aCAtIDcpXG4gICAgLy8gJHNjb3BlLnBsYXllckhhbmQgPSAkc2NvcGUud2hpdGVDYXJkcy5zbGljZShzbGljZXIsIHNsaWNlciArIDgpXG4gICAgJHNjb3BlLnBsYXllckhhbmQgPSAkc2NvcGUuZ2FtZS5wbGF5ZXJzW3BsYXllcklkXS5oYW5kO1xuICAgIGNvbnNvbGUubG9nKCdwbGF5ZXJzIGhhbmQnLCAkc2NvcGUucGxheWVySGFuZClcblxuICAgIC8vdGVtcG9yYXJ5IGltcGxlbWVudGF0aW9uIGZvciBkZXNpZ24gcHVycG9zZXMuXG4gICAgLy8gJHNjb3BlLmdhbWUud2hpdGVDYXJkcyA9ICRzY29wZS5nYW1lLnBpbGUud2hpdGVjYXJkc1xuICAgICRzY29wZS5zaG93Q2FyZHMgPSBmYWxzZTtcblxuICAgIC8vJHNjb3BlLnBsYXllckhhbmQgPSAkc2NvcGUuZ2FtZS5wbGF5ZXJzW3BsYXllcklkXS5oYW5kO1xuICAgIC8vKGNvbnNvbGUubG9nKFwicGxheWVyIGhhbmRcIiwgJHNjb3BlLmhhbmQpKVxuXG4gICAgJHNjb3BlLnBsYXllckNvdW50ID0gT2JqZWN0LmtleXMoJHNjb3BlLmdhbWUucGxheWVycykubGVuZ3RoOyAgICAgXG59KVxuXG5cbmFwcC5jb250cm9sbGVyKFwiQWN0aXZlR2FtZUN0cmxcIiwgKCRzY29wZSwgR2FtZUZhY3RvcnksIEFjdGl2ZUdhbWVGYWN0b3J5LCBnYW1lLCAkc3RhdGVQYXJhbXMsICRsb2NhbFN0b3JhZ2UsICRzdGF0ZSkgPT4ge1xuXG4gICAgXG4gICAgJHNjb3BlLm9uU3dpcGVEb3duID0gKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnd29ya2luZycpO1xuICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuc2hvd0NhcmRzKTtcbiAgICAgICAgJHNjb3BlLnNob3dDYXJkcyA9IHRydWUgO1xuICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuc2hvd0NhcmRzKTtcbiAgICAgICAgJHNjb3BlLiRldmFsQXN5bmMoKTtcbiAgICB9XG5cbiAgICAkc2NvcGUub25Td2lwZVVwID0gKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcInN3aXBlZCB1cFwiKTtcbiAgICB9XG5cbiAgICAkc2NvcGUub25Eb3VibGVUYXAgPSAoa2V5KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZG91YmxlIHRhcHBlZFwiKVxuICAgICAgICAkc2NvcGUucGxheWVkID0gdHJ1ZTtcbiAgICAgICAgLy9jYWxsIHN1Ym1pdCBjYXJkIGZ1bmN0aW9uIGhlcmUuXG4gICAgfVxuXG4gICAgQWN0aXZlR2FtZUZhY3RvcnkucmVmaWxsTXlIYW5kKCRzY29wZS5nYW1lSWQsICRzY29wZS5wbGF5ZXJJZCwgJHNjb3BlLnRlYW1JZCk7XG5cbiAgICAkc2NvcGUuJG9uKCdjaGFuZ2VkR2FtZScsIChldmVudCxzbmFwc2hvdCkgPT57XG4gICAgICAgICRzY29wZS5nYW1lID0gc25hcHNob3Q7XG4gICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5nYW1lKTtcbiAgICAgICAgaWYoZ2FtZS5zdGF0ZSA9PT0gJ3N1Ym1pc3Npb24nKXtcbiAgICAgICAgICAgICRzdGF0ZS5nbygnZ2FtZS5zdWJtaXNzaW9uLWdhbWUnKVxuICAgICAgICB9IFxuICAgIH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignU3VibWlzc2lvbkdhbWVDdHJsJywgKCRzY29wZSwgJGxvY2FsU3RvcmFnZSkgPT4ge1xuICAgICRzY29wZS4kb24oJ2NoYW5nZWRHYW1lJywgKGV2ZW50LHNuYXBzaG90KSA9PntcbiAgICAgICAgJHNjb3BlLmdhbWUgPSBzbmFwc2hvdDtcbiAgICB9KVxuXG4gICAkc2NvcGUuanVkZ2UgPSAkc2NvcGUuZ2FtZS5wbGF5ZXJzWyRzY29wZS5nYW1lLmN1cnJlbnRKdWRnZV0ubmFtZVxufSlcblxuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgIHVybDogJy8nLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2hvbWUvaG9tZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgZ2FtZXM6IGZ1bmN0aW9uKEdhbWVGYWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdIb21lQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCAkY29yZG92YU9hdXRoLCBVc2VyRmFjdG9yeSwgR2FtZUZhY3RvcnksICRsb2NhbFN0b3JhZ2UsIGdhbWVzLCAkaW9uaWNQb3B1cCkge1xuICAgICRzY29wZS5zdGFydE5ld0dhbWUgPSBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWU7XG4gICAgJHNjb3BlLnN0b3JhZ2UgPSAkbG9jYWxTdG9yYWdlO1xuICAgICRzY29wZS5nYW1lcyA9IGdhbWVzO1xuXG4gICAgY29uc29sZS5sb2coXCJnYW1lc1wiLCBKU09OLnN0cmluZ2lmeSgkc2NvcGUuZ2FtZXMpKVxuICAgICRzY29wZS5nb1RvTmV3R2FtZSA9ICgpID0+IHtcbiAgICAgICAgJHN0YXRlLmdvKCduZXctZ2FtZS5tYWluJylcbiAgICB9XG5cblxuICAgICRzY29wZS5qb2luR2FtZSA9IEdhbWVGYWN0b3J5LmpvaW5HYW1lQnlJZDtcblxuICAgICRzY29wZS5zaG93UG9wdXAgPSBmdW5jdGlvbihnYW1lSWQpIHtcblxuICAgICAgICAkc2NvcGUuZ2FtZSA9ICRzY29wZS5nYW1lc1tnYW1lSWRdO1xuICAgICAgICAkc2NvcGUuZ2FtZU5hbWUgPSAkc2NvcGUuZ2FtZS5zZXR0aW5ncy5uYW1lO1xuICAgICAgICAkc2NvcGUucGxheWVyQ291bnQgPSBPYmplY3Qua2V5cygkc2NvcGUuZ2FtZS5wbGF5ZXJzKS5sZW5ndGg7XG4gICAgICAgICRzY29wZS53YWl0aW5nRm9yUGxheWVycyA9ICAoJHNjb3BlLmdhbWUuc2V0dGluZ3MubWluUGxheWVycyB8fCA0KSAtICRzY29wZS5wbGF5ZXJDb3VudDtcbiAgICAgICAgIFxuICAgICAgICAgY29uc3QgbXlQb3B1cCA9ICRpb25pY1BvcHVwLnNob3coe1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9ob21lL3BvcHVwLmh0bWwnLFxuICAgICAgICAgICAgdGl0bGU6ICdKb2luICcgKyAkc2NvcGUuZ2FtZU5hbWUsXG4gICAgICAgICAgICBzY29wZTogJHNjb3BlLFxuICAgICAgICAgICAgYnV0dG9uczogXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAge3RleHQ6ICdHbyBiYWNrJ30sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnSm9pbiBnYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbi1iYWxhbmNlZCcsXG4gICAgICAgICAgICAgICAgICAgIG9uVGFwOiBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5qb2luR2FtZShnYW1lSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdnYW1lLmFjdGl2ZS1nYW1lJywgeyBnYW1lSWQ6IGdhbWVJZCB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KVxuICAgIH1cbn0pXG5cbiIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdsb2dpbicsIHtcbiAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9sb2dpbi9sb2dpbi5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luQ3RybCdcbiAgICB9KVxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9sb2dpbicpO1xufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCBVc2VyRmFjdG9yeSwgJGNvcmRvdmFPYXV0aCwgJGxvY2FsU3RvcmFnZSwgJHRpbWVvdXQsICRpb25pY1NpZGVNZW51RGVsZWdhdGUpIHtcbiAgICAkc2NvcGUubG9naW5XaXRoU2xhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFVzZXJGYWN0b3J5LmdldFNsYWNrQ3JlZHMoKVxuICAgICAgICAgICAgLnRoZW4oY3JlZHMgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAkY29yZG92YU9hdXRoLnNsYWNrKGNyZWRzLmNsaWVudElELCBjcmVkcy5jbGllbnRTZWNyZXQsIFsnaWRlbnRpdHkuYmFzaWMnLCAnaWRlbnRpdHkudGVhbScsICdpZGVudGl0eS5hdmF0YXInXSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihpbmZvID0+IFVzZXJGYWN0b3J5LnNldFVzZXIoaW5mbykpXG4gICAgICAgICAgICAudGhlbigoKSA9PiAkc3RhdGUuZ28oJ2hvbWUnKSlcbiAgICB9XG5cbiAgICAkaW9uaWNTaWRlTWVudURlbGVnYXRlLmNhbkRyYWdDb250ZW50KGZhbHNlKTtcblxuICAgICRzY29wZS4kb24oJyRpb25pY1ZpZXcubGVhdmUnLCBmdW5jdGlvbigpIHsgJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZS5jYW5EcmFnQ29udGVudCh0cnVlKSB9KTtcblxuICAgICRzY29wZS5zdG9yYWdlID0gJGxvY2FsU3RvcmFnZVxuXG4gICAgZnVuY3Rpb24gcmVkaXJlY3RVc2VyKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInNjb3BlIHN0b3JhZ2UgdXNlclwiLCAkc2NvcGUuc3RvcmFnZS51c2VyKVxuICAgICAgICBpZiAoJHNjb3BlLnN0b3JhZ2UudXNlcikgJHN0YXRlLmdvKCdob21lJylcbiAgICB9XG5cbiAgICByZWRpcmVjdFVzZXIoKTtcbn0pXG5cbiIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpID0+IHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCduZXctZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnL25ldy1nYW1lJyxcbiAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvbWFpbi5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ05ld0dhbWVDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgdGVhbURlY2tzOiAoR2FtZUZhY3RvcnkpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoKSxcbiAgICAgICAgICAgIHN0YW5kYXJkRGVjazogKEdhbWVGYWN0b3J5KSA9PiBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkKDEpXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5tYWluJywge1xuICAgICAgICB1cmw6ICcvc2V0dXAtZ2FtZScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvbmV3LWdhbWUuaHRtbCcsXG4gICAgfSlcblxuICAgIC5zdGF0ZSgnbmV3LWdhbWUuYWRkLWRlY2tzJywge1xuICAgICAgICB1cmw6ICcvYWRkLWRlY2tzJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9hZGQtZGVja3MuaHRtbCcsXG4gICAgfSlcblxuICAgIC5zdGF0ZSgnbmV3LWdhbWUuZGVjaycsIHtcbiAgICAgICAgdXJsOiAnL2RlY2svOmRlY2tJZCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvZGVjay5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0RlY2tDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgY2FyZHM6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXRDYXJkc0J5RGVja0lkKCRzdGF0ZVBhcmFtcy5kZWNrSWQpXG4gICAgICAgIH1cblxuXG4gICAgfSlcblxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9uZXctZ2FtZS9zZXR1cC1nYW1lJyk7XG59KVxuXG5hcHAuY29udHJvbGxlcignTmV3R2FtZUN0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgJHN0YXRlLCB0ZWFtRGVja3MsIHN0YW5kYXJkRGVjaykgPT4ge1xuICAgICRzY29wZS5jdXJyZW50VmlldyA9ICdhZGREZWNrcydcbiAgICAkc2NvcGUuZ2FtZUNvbmZpZyA9IHt9O1xuICAgICRzY29wZS5nYW1lQ29uZmlnLmRlY2tzID0ge307XG4gICAgJHNjb3BlLmdvVG9EZWNrcyA9ICgpID0+IHtcbiAgICAgICAgJHN0YXRlLmdvKCduZXctZ2FtZS5hZGQtZGVja3MnLCB7fSwgeyBsb2NhdGlvbjogdHJ1ZSwgcmVsb2FkOiB0cnVlIH0pXG4gICAgfVxuXG4gICAgJHNjb3BlLmRlY2tzID0gc3RhbmRhcmREZWNrLmNvbmNhdCh0ZWFtRGVja3MpO1xuXG4gICAgJHNjb3BlLnN0YXJ0TmV3R2FtZSA9IChnYW1lQ29uZmlnKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2FsbGVkIHN0YXJ0IG5ldyBnYW1lXCIpXG4gICAgICAgIEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZShnYW1lQ29uZmlnKS50aGVuKChpZCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJtYWRlIGl0IHRvIHRoZSAudGhlblwiKVxuICAgICAgICAgICAgR2FtZUZhY3RvcnkuYWRkUGlsZVRvR2FtZShpZCwgJHNjb3BlLmdhbWVDb25maWcuZGVja3MpXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2dhbWUuYWN0aXZlLWdhbWUnLCB7IGdhbWVJZDogaWQgfSlcblxuXG4gICAgICAgIH0pXG4gICAgfVxuICAgICRzY29wZS5hZGREZWNrc1RvR2FtZSA9IEdhbWVGYWN0b3J5LmFkZERlY2tzO1xuICAgIC8vICRzY29wZS4kb24oJ2NoYW5nZWRHYW1lJywgKGV2ZW50LCBkYXRhKSA9PiB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdyZWNlaXZlZCBldmVudCcpXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdkYXRhIG9iajonLCBkYXRhKVxuICAgIC8vICAgICAkc2NvcGUuZ2FtZSA9IGRhdGE7XG4gICAgLy8gICAgICRzY29wZS4kZGlnZXN0KClcblxuICAgIC8vIH0pXG5cblxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0RlY2tDdHJsJywgKCRzY29wZSwgR2FtZUZhY3RvcnksICRzdGF0ZSwgY2FyZHMpID0+IHtcbiAgICAkc2NvcGUuY2FyZHMgPSBjYXJkc1xufSlcblxuIiwiLy9EaXJlY3RpdmUgRmlsZSIsImFwcC5mYWN0b3J5KCdBY3RpdmVHYW1lRmFjdG9yeScsICgkaHR0cCwgJHJvb3RTY29wZSwgJGxvY2FsU3RvcmFnZSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IEFjdGl2ZUdhbWVGYWN0b3J5ID0ge307XG5cbiAgICAgICAgY29uc3QgcmVmaWxsZXIgPSAoY2FyZHNOZWVkZWQsIHBpbGVSZWYsIGhhbmRSZWYpID0+IHtcbiAgICAgICAgICBwaWxlUmVmLmxpbWl0VG9GaXJzdChjYXJkc05lZWRlZCkub25jZSgndmFsdWUnLCBjYXJkc1NuYXBzaG90ID0+IHtcbiAgICAgICAgICAgIGNhcmRzU25hcHNob3QuZm9yRWFjaChjYXJkID0+IHtcbiAgICAgICAgICAgICAgbGV0IHVwZGF0ZU9iaiA9IHt9XG4gICAgICAgICAgICAgIGNhcmQucmVmLnRyYW5zYWN0aW9uKGNhcmREYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgIHVwZGF0ZU9ialtjYXJkLmtleV0gPSBjYXJkRGF0YVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IGhhbmRSZWYudXBkYXRlKHVwZGF0ZU9iaikpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICAgICAgfVxuXG4gICAgICAgIEFjdGl2ZUdhbWVGYWN0b3J5LnJlZmlsbE15SGFuZCA9IChnYW1lSWQsIHBsYXllcklkLCB0ZWFtSWQpID0+IHtcbiAgICAgICAgICAvLyBob3cgbWFueSBjYXJkcyBkbyBJIG5lZWQ/XG4gICAgICAgICAgbGV0IGNhcmRzTmVlZGVkID0gMFxuICAgICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgY29uc3QgaGFuZFJlZiA9IGdhbWVSZWYuY2hpbGQoYHBsYXllcnMvJHtwbGF5ZXJJZH0vaGFuZGApXG4gICAgICAgICAgY29uc3QgcGlsZVJlZiA9IGdhbWVSZWYuY2hpbGQoJ3BpbGUvd2hpdGVjYXJkcycpXG4gICAgICAgICAgaGFuZFJlZi5vbmNlKCd2YWx1ZScsIGhhbmRTbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgIGNhcmRzTmVlZGVkID0gNyAtIGhhbmRTbmFwc2hvdC5udW1DaGlsZHJlbigpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICByZWZpbGxlcihjYXJkc05lZWRlZCwgcGlsZVJlZiwgaGFuZFJlZilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBBY3RpdmVHYW1lRmFjdG9yeS5zdWJtaXRXaGl0ZUNhcmQgPSAocGxheWVySWQsIGNhcmRJZCwgZ2FtZUlkLCB0ZWFtSWQpID0+IHtcbiAgICAgICAgICBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKTtcbiAgICAgICAgICBjb25zdCBjYXJkVG9TdWJtaXQgPSBnYW1lUmVmLmNoaWxkKGBwbGF5ZXJzLyR7cGxheWVySWR9L2hhbmQvJHtjYXJkSWR9YCk7XG4gICAgICAgICAgY29uc3Qgc3VibWl0UmVmID0gZ2FtZVJlZi5jaGlsZCgnc3VibWl0dGVkV2hpdGVDYXJkcycpO1xuICAgICAgICAgIGZpcmViYXNlTW92ZVNpbmdsZUtleVZhbHVlKGNhcmRUb1N1Ym1pdCwgc3VibWl0UmVmKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gc3VibWl0UmVmLmNoaWxkKGNhcmRJZCkuc2V0KHtcbiAgICAgICAgICAgICAgc3VibWl0dGVkQnk6IHBsYXllcklkXG4gICAgICAgICAgICB9KSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBBY3RpdmVHYW1lRmFjdG9yeTsgXG5cblxufSk7IiwiYXBwLmZhY3RvcnkoJ0dhbWVGYWN0b3J5JywgKCRodHRwLCAkcm9vdFNjb3BlLCAkbG9jYWxTdG9yYWdlKSA9PiB7XG5cbiAgICAgICAgY29uc3Qgb3VySXBzID0ge1xuICAgICAgICAgICAgbmlraXRhOiBcIjE5Mi4xNjguNC4yMTNcIixcbiAgICAgICAgICAgIGtheWxhOiBcIjE5Mi4xNjguNC4yMjVcIixcbiAgICAgICAgICAgIG5pdGh5YTogXCIxOTIuMTY4LjEuNDhcIixcbiAgICAgICAgICAgIGRhbjogXCIxOTIuMTY4LjQuMjM2XCJcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjdXJyZW50SXAgPSBvdXJJcHMuZGFuXG5cblxuICAgICAgICAvLyBzdGFydCBhIG5ldyBnYW1lIGRlcnBcbiAgICAgICAgY29uc3QgR2FtZUZhY3RvcnkgPSB7fTtcbiAgICAgICAgR2FtZUZhY3Rvcnkuc3RhcnROZXdHYW1lID0gKGdhbWVDb25maWcpID0+IHtcbiAgICAgICAgICAgIC8vY2FuIGFsc28gZ2V0IGFsbCB0aGUgZGVja3MgYnkgdGVhbSBoZXJlIHRvIHByZXBhcmVcbiAgICAgICAgICAgIGNvbnN0IHRlYW1JZCA9ICRsb2NhbFN0b3JhZ2UudGVhbS5pZCB8fCAyO1xuICAgICAgICAgICAgY29uc3QgY3JlYXRvcklkID0gJGxvY2FsU3RvcmFnZS51c2VyLmlkIHx8IDM7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lc2AsIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZ2FtZUNvbmZpZy5uYW1lIHx8ICdBV0VTT01FIE5hbWUnLFxuICAgICAgICAgICAgICAgICAgICB0ZWFtSWQ6IHRlYW1JZCxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvcklkOiBjcmVhdG9ySWQsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0b3JOYW1lOiAkbG9jYWxTdG9yYWdlLnVzZXIubmFtZSB8fCAnZGFuJywgLy9taWdodCBiZSB1bm5lY2Vzc2FyeSBpZiB3ZSBoYXZlIHRoZSB1c2VyIGlkXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiBnYW1lQ29uZmlnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBnYW1lSWQgPSByZXMuZGF0YVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYC90ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICAgICAgICAgICAgZ2FtZVJlZi5vbigndmFsdWUnLCBzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2NoYW5nZWRHYW1lJywgc25hcHNob3QudmFsKCkpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2FtZUlkO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG4gICAgICAgIC8vIGdldCBhbGwgb2YgYSBkZWNrcyBjYXJkcyB0byBkaXNwbGF5IHdoZW4gbG9va2luZyBhdCBkZWNrc1xuICAgICAgICBHYW1lRmFjdG9yeS5nZXRDYXJkc0J5RGVja0lkID0gKGlkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2RlY2tzLyR7aWR9L2NhcmRzYClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFRPRE86IGNvbWJpbmUgdGhpcyBpbnRvIHRoZSBhYm92ZSBzdGFydE5ld0dhbWUgZnVuY1xuICAgICAgICAvLyB0YWtlIGFsbCBvZiB0aGUgc2VsZWN0ZWQgZGVja3MnIGNhcmRzIGFuZCBwdXQgdGhlbSBpbiB0aGUgZmlyZWJhc2UgZ2FtZSBvYmplY3QgcGlsZSAodGhyb3VnaCByb3V0ZSlcbiAgICAgICAgR2FtZUZhY3RvcnkuYWRkUGlsZVRvR2FtZSA9IChnYW1lSWQsIGRlY2tzKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImFkZGluZyBwaWxlIHRvIGdhbWVcIilcbiAgICAgICAgICAgIGNvbnN0IGRlY2tzQXJyID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBkZWNrSWQgaW4gZGVja3MpIHtcbiAgICAgICAgICAgICAgICBkZWNrc0Fyci5wdXNoKGRlY2tJZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzLyR7Z2FtZUlkfS9kZWNrc2AsIHtcbiAgICAgICAgICAgICAgICAnZGVja3MnOiBkZWNrc0FyclxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIEdhbWVGYWN0b3J5LmpvaW5HYW1lQnlJZCA9IChnYW1lSWQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRlYW1JZCA9ICRsb2NhbFN0b3JhZ2UudGVhbS5pZDtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllcklkID0gJGxvY2FsU3RvcmFnZS51c2VyLmlkO1xuICAgICAgICAgICAgY29uc3QgcGxheWVyTmFtZSA9ICRsb2NhbFN0b3JhZ2UudXNlci5uYW1lO1xuICAgICAgICAgICAgY29uc3QgcGxheWVyUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH0vcGxheWVycy8ke3BsYXllcklkfWApXG4gICAgICAgICAgICBwbGF5ZXJSZWYuc2V0KHtcbiAgICAgICAgICAgICAgICBuYW1lOiBwbGF5ZXJOYW1lXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICAgIGdhbWVSZWYub24oJ3ZhbHVlJywgc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnY2hhbmdlZEdhbWUnLCBzbmFwc2hvdC52YWwoKSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgJGh0dHAucG9zdChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0/cGxheWVySWQ9JHtwbGF5ZXJJZH1gKVxuICAgICAgICB9XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCA9IChpZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gKHR5cGVvZiBpZCAhPT0gJ251bWJlcicpID8gJGxvY2FsU3RvcmFnZS50ZWFtLmlkIDogaWQ7IC8vIGlkIHx8IGxvY2Fsc3RvcmFnZSBkb2Vzbid0IHdvcmsgYmVjYXVzZSAwIGlzIGZhbHNleVxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9kZWNrcz90ZWFtPSR7dGVhbUlkfWApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuXG4gICAgICAgIH07XG5cblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRVc2Vyc0J5R2FtZUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0vdXNlcnNgKTtcbiAgICAgICAgfTtcblxuXG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZUJ5R2FtZUlkID0gKGdhbWVJZCwgdGVhbUlkKSA9PiB7XG4gICAgICAgICAgICB0ZWFtSWQgPSB0ZWFtSWQgfHwgJGxvY2FsU3RvcmFnZS50ZWFtLmlkXG4gICAgICAgICAgICBjb25zdCBnYW1lc1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICAgIHJldHVybiBnYW1lc1JlZi5vbmNlKCd2YWx1ZScpLnRoZW4oc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBzbmFwc2hvdC52YWwoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCA9ICh0ZWFtSWQpID0+IHtcbiAgICAgICAgICAgIHRlYW1JZCA9IHRlYW1JZCB8fCAkbG9jYWxTdG9yYWdlLnRlYW0uaWRcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZ2FtZXMvP3RlYW1JZD0ke3RlYW1JZH1gKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgICAgIH07XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVVzZXIgPSAodXNlcklkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzLz91c2VySWQ9JHt1c2VySWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBHYW1lRmFjdG9yeTtcbiAgICB9XG5cbik7XG5cbiIsImFwcC5mYWN0b3J5KCdVc2VyRmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwLCAkbG9jYWxTdG9yYWdlKSB7XG4gICAgY29uc3Qgb3VySXBzID0ge1xuICAgICAgICBuaWtpdGE6IFwiMTkyLjE2OC40LjIxM1wiLFxuICAgICAgICBrYXlsYTogXCIxOTIuMTY4LjQuMjI1XCIsXG4gICAgICAgIG5pdGh5YTogXCIxOTIuMTY4LjEuNDhcIixcbiAgICAgICAgZGFuOiBcIjE5Mi4xNjguNC4yMzZcIlxuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRJcCA9IG91cklwcy5kYW5cbiAgICByZXR1cm4ge1xuICAgICAgICBzZXRVc2VyOiBmdW5jdGlvbihpbmZvKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS91c2Vyc2AsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogaW5mb1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRMb2NhbFN0b3JhZ2UocmVzLmRhdGEudXNlclswXSwgcmVzLmRhdGEudGVhbVswXSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0U2xhY2tDcmVkczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL3NsYWNrYClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmRhdGFcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBnZXRTbGFja0luZm86IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnaHR0cHM6Ly9zbGFjay5jb20vYXBpL3VzZXJzLmlkZW50aXR5JylcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRMb2NhbFN0b3JhZ2U6IGZ1bmN0aW9uKHVzZXIsIHRlYW0pIHtcbiAgICAgICAgICAgICRsb2NhbFN0b3JhZ2UudXNlciA9IHVzZXI7XG4gICAgICAgICAgICAkbG9jYWxTdG9yYWdlLnRlYW0gPSB0ZWFtO1xuICAgICAgICB9LFxuXG4gICAgICAgIGxvZ091dDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkbG9jYWxTdG9yYWdlLiRyZXNldCgpO1xuICAgICAgICB9XG4gICAgfVxufSlcblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
