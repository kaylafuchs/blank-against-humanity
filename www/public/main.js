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
app.factory('GameFactory', function ($http, $rootScope, $localStorage) {
    var ourIps = {
        nikita: "192.168.4.213",
        kayla: "192.168.4.225",
        nithya: "192.168.1.48",
        dan: "192.168.4.236"
    };
    var currentIp = ourIps.nithya;

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
    var currentIp = ourIps.nikita;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImNhcmRzLXRlc3QvY2FyZHNUZXN0LmpzIiwiZGVja3MvZGVja3MuanMiLCJmcm9tIGZzZy9mcm9tLWZzZy5qcyIsImdhbWUvZ2FtZS5qcyIsImhvbWUvaG9tZS5qcyIsImxvZ2luL2xvZ2luLmpzIiwibmV3LWdhbWUvbmV3LWdhbWUuanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiLCJjb21tb24vZmFjdG9yaWVzL0FjdGl2ZUdhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9HYW1lRmFjdG9yeS5qcyIsImNvbW1vbi9mYWN0b3JpZXMvdXNlckZhY3RvcnkuanMiXSwibmFtZXMiOlsid2luZG93IiwiYXBwIiwiYW5ndWxhciIsIm1vZHVsZSIsInJ1biIsIiRpb25pY1BsYXRmb3JtIiwicmVhZHkiLCJjb3Jkb3ZhIiwicGx1Z2lucyIsIktleWJvYXJkIiwiaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyIiwiZGlzYWJsZVNjcm9sbCIsIlN0YXR1c0JhciIsInN0eWxlTGlnaHRDb250ZW50IiwiY29udHJvbGxlciIsIiRzY29wZSIsIlVzZXJGYWN0b3J5IiwiJHN0YXRlIiwiJGxvY2FsU3RvcmFnZSIsIiR0aW1lb3V0IiwibG9nT3V0IiwiZ28iLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsInN0YXRlIiwidXJsIiwidGVtcGxhdGVVcmwiLCJncmVldGluZyIsInJlc29sdmUiLCJkZWNrcyIsIkdhbWVGYWN0b3J5IiwiJHN0YXRlUGFyYW1zIiwiZ2V0RGVja3NCeVRlYW1JZCIsInN0YXRlUGFyYW1zIiwidGVhbUlkIiwiYWJzdHJhY3QiLCJnYW1lIiwiZ2V0R2FtZUJ5R2FtZUlkIiwiZ2FtZUlkIiwicGxheWVySWQiLCJ1c2VyIiwiaWQiLCJ0ZWFtIiwiZ2FtZU5hbWUiLCJzZXR0aW5ncyIsIm5hbWUiLCJ3aGl0ZUNhcmRzIiwicGxheWVycyIsImhhbmQiLCJzaG93Q2FyZHMiLCJwbGF5ZXJDb3VudCIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJBY3RpdmVHYW1lRmFjdG9yeSIsIm9uU3dpcGVEb3duIiwiY29uc29sZSIsImxvZyIsIiRldmFsQXN5bmMiLCJvblN3aXBlVXAiLCJyZWZpbGxNeUhhbmQiLCIkb24iLCJldmVudCIsInNuYXBzaG90IiwianVkZ2UiLCJjdXJyZW50SnVkZ2UiLCIkdXJsUm91dGVyUHJvdmlkZXIiLCJnYW1lcyIsImdldEdhbWVzQnlUZWFtSWQiLCIkY29yZG92YU9hdXRoIiwiJGlvbmljUG9wdXAiLCJzdGFydE5ld0dhbWUiLCJzdG9yYWdlIiwiSlNPTiIsInN0cmluZ2lmeSIsImdvVG9OZXdHYW1lIiwiam9pbkdhbWUiLCJqb2luR2FtZUJ5SWQiLCJzaG93UG9wdXAiLCJ3YWl0aW5nRm9yUGxheWVycyIsIm1pblBsYXllcnMiLCJteVBvcHVwIiwic2hvdyIsInRpdGxlIiwic2NvcGUiLCJidXR0b25zIiwidGV4dCIsInR5cGUiLCJvblRhcCIsIm90aGVyd2lzZSIsIkxvZ2luRmFjdG9yeSIsIiRpb25pY1NpZGVNZW51RGVsZWdhdGUiLCJsb2dpbldpdGhTbGFjayIsImdldFNsYWNrQ3JlZHMiLCJ0aGVuIiwic2xhY2siLCJjcmVkcyIsImNsaWVudElEIiwiY2xpZW50U2VjcmV0Iiwic2V0VXNlciIsImluZm8iLCJjYW5EcmFnQ29udGVudCIsInJlZGlyZWN0VXNlciIsInRlYW1EZWNrcyIsInN0YW5kYXJkRGVjayIsImNhcmRzIiwiZ2V0Q2FyZHNCeURlY2tJZCIsImRlY2tJZCIsImN1cnJlbnRWaWV3IiwiZ2FtZUNvbmZpZyIsImdvVG9EZWNrcyIsImxvY2F0aW9uIiwicmVsb2FkIiwiY29uY2F0IiwiYWRkUGlsZVRvR2FtZSIsImFkZERlY2tzVG9HYW1lIiwiYWRkRGVja3MiLCJmYWN0b3J5IiwiJGh0dHAiLCIkcm9vdFNjb3BlIiwicmVmaWxsZXIiLCJjYXJkc05lZWRlZCIsInBpbGVSZWYiLCJoYW5kUmVmIiwibGltaXRUb0ZpcnN0Iiwib25jZSIsImNhcmRzU25hcHNob3QiLCJmb3JFYWNoIiwidXBkYXRlT2JqIiwiY2FyZCIsInJlZiIsInRyYW5zYWN0aW9uIiwia2V5IiwiY2FyZERhdGEiLCJ1cGRhdGUiLCJjYXRjaCIsImVyciIsImdhbWVSZWYiLCJmaXJlYmFzZSIsImRhdGFiYXNlIiwiY2hpbGQiLCJoYW5kU25hcHNob3QiLCJudW1DaGlsZHJlbiIsInN1Ym1pdFdoaXRlQ2FyZCIsImNhcmRJZCIsImNhcmRUb1N1Ym1pdCIsInN1Ym1pdFJlZiIsImZpcmViYXNlTW92ZVNpbmdsZUtleVZhbHVlIiwic2V0Iiwic3VibWl0dGVkQnkiLCJvdXJJcHMiLCJuaWtpdGEiLCJrYXlsYSIsIm5pdGh5YSIsImRhbiIsImN1cnJlbnRJcCIsImNyZWF0b3JJZCIsInBvc3QiLCJjcmVhdG9yTmFtZSIsInJlcyIsImRhdGEiLCJvbiIsIiRicm9hZGNhc3QiLCJ2YWwiLCJnZXQiLCJkZWNrc0FyciIsInB1c2giLCJwbGF5ZXJOYW1lIiwicGxheWVyUmVmIiwiZ2V0VXNlcnNCeUdhbWVJZCIsImdhbWVzUmVmIiwiZ2V0R2FtZXNCeVVzZXIiLCJ1c2VySWQiLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0TG9jYWxTdG9yYWdlIiwiZ2V0U2xhY2tJbmZvIiwiJHJlc2V0Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBQSxPQUFBQyxHQUFBLEdBQUFDLFFBQUFDLE1BQUEsQ0FBQSxzQkFBQSxFQUFBLENBQUEsT0FBQSxFQUFBLFdBQUEsRUFBQSxXQUFBLEVBQUEsZ0JBQUEsRUFBQSxXQUFBLENBQUEsQ0FBQTs7QUFFQUYsSUFBQUcsR0FBQSxDQUFBLFVBQUFDLGNBQUEsRUFBQTtBQUNBQSxtQkFBQUMsS0FBQSxDQUFBLFlBQUE7QUFDQSxZQUFBTixPQUFBTyxPQUFBLElBQUFQLE9BQUFPLE9BQUEsQ0FBQUMsT0FBQSxDQUFBQyxRQUFBLEVBQUE7QUFDQTtBQUNBO0FBQ0FGLG9CQUFBQyxPQUFBLENBQUFDLFFBQUEsQ0FBQUMsd0JBQUEsQ0FBQSxJQUFB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SW9uaWMgU3RhcnRlciBBcHBcblxuLy8gYW5ndWxhci5tb2R1bGUgaXMgYSBnbG9iYWwgcGxhY2UgZm9yIGNyZWF0aW5nLCByZWdpc3RlcmluZyBhbmQgcmV0cmlldmluZyBBbmd1bGFyIG1vZHVsZXNcbi8vICdzdGFydGVyJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xud2luZG93LmFwcCA9IGFuZ3VsYXIubW9kdWxlKCdCbGFua0FnYWluc3RIdW1hbml0eScsIFsnaW9uaWMnLCAndWkucm91dGVyJywnbmdDb3Jkb3ZhJywnbmdDb3Jkb3ZhT2F1dGgnLCAnbmdTdG9yYWdlJ10pXG5cbmFwcC5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0pIHtcbiAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgICAgICAgIC8vIEhpZGUgdGhlIGFjY2Vzc29yeSBiYXIgYnkgZGVmYXVsdCAocmVtb3ZlIHRoaXMgdG8gc2hvdyB0aGUgYWNjZXNzb3J5IGJhciBhYm92ZSB0aGUga2V5Ym9hcmRcbiAgICAgICAgICAgIC8vIGZvciBmb3JtIGlucHV0cylcbiAgICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG5cbiAgICAgICAgICAgIC8vIERvbid0IHJlbW92ZSB0aGlzIGxpbmUgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZy4gSXQgc3RvcHMgdGhlIHZpZXdwb3J0XG4gICAgICAgICAgICAvLyBmcm9tIHNuYXBwaW5nIHdoZW4gdGV4dCBpbnB1dHMgYXJlIGZvY3VzZWQuIElvbmljIGhhbmRsZXMgdGhpcyBpbnRlcm5hbGx5IGZvclxuICAgICAgICAgICAgLy8gYSBtdWNoIG5pY2VyIGtleWJvYXJkIGV4cGVyaWVuY2UuXG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2luZG93LlN0YXR1c0Jhcikge1xuICAgICAgICAgICAgU3RhdHVzQmFyLnN0eWxlTGlnaHRDb250ZW50KClcbiAgICAgICAgfVxuICAgIH0pO1xuXG59KVxuIiwiYXBwLmNvbnRyb2xsZXIoJ0xvZ291dEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIFVzZXJGYWN0b3J5LCAkc3RhdGUsICRsb2NhbFN0b3JhZ2UsICR0aW1lb3V0KXtcblx0JHNjb3BlLmxvZ091dCA9IGZ1bmN0aW9uKCl7XG5cdFx0VXNlckZhY3RvcnkubG9nT3V0KClcblx0XHQkc3RhdGUuZ28oJ2xvZ2luJylcblx0fVxufSkiLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKXtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2NhcmRzJywge1xuXHRcdHVybDogJy9jYXJkcycsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9jYXJkcy10ZXN0L2NhcmRzLXRlc3QuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0NhcmRzVGVzdEN0cmwnXG5cdH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignQ2FyZHNUZXN0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSl7XG4gXHQkc2NvcGUuZ3JlZXRpbmcgPSBcIkhJXCJcbn0pIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIpID0+IHtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2RlY2tzJywge1xuXHRcdHVybDogJ2RlY2tzLzp0ZWFtaWQnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvZGVja3MvZGVja3MuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0RlY2tDdHJsJyxcblx0XHRyZXNvbHZlOiB7XG5cdFx0XHRkZWNrczogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoc3RhdGVQYXJhbXMudGVhbUlkKVxuXHRcdH1cblx0fSlcblxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0RlY2tDdHJsJywgKCRzY29wZSkgPT4ge1xuXG5cblx0XG59KSIsIi8vIChmdW5jdGlvbiAoKSB7XG5cbi8vICAgICAndXNlIHN0cmljdCc7XG5cbi8vICAgICAvLyBIb3BlIHlvdSBkaWRuJ3QgZm9yZ2V0IEFuZ3VsYXIhIER1aC1kb3kuXG4vLyAgICAgaWYgKCF3aW5kb3cuYW5ndWxhcikgdGhyb3cgbmV3IEVycm9yKCdJIGNhblxcJ3QgZmluZCBBbmd1bGFyIScpO1xuXG4vLyAgICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdmc2FQcmVCdWlsdCcsIFtdKTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdTb2NrZXQnLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgIGlmICghd2luZG93LmlvKSB0aHJvdyBuZXcgRXJyb3IoJ3NvY2tldC5pbyBub3QgZm91bmQhJyk7XG4vLyAgICAgICAgIHJldHVybiB3aW5kb3cuaW8od2luZG93LmxvY2F0aW9uLm9yaWdpbik7XG4vLyAgICAgfSk7XG5cbi8vICAgICAvLyBBVVRIX0VWRU5UUyBpcyB1c2VkIHRocm91Z2hvdXQgb3VyIGFwcCB0b1xuLy8gICAgIC8vIGJyb2FkY2FzdCBhbmQgbGlzdGVuIGZyb20gYW5kIHRvIHRoZSAkcm9vdFNjb3BlXG4vLyAgICAgLy8gZm9yIGltcG9ydGFudCBldmVudHMgYWJvdXQgYXV0aGVudGljYXRpb24gZmxvdy5cbi8vICAgICBhcHAuY29uc3RhbnQoJ0FVVEhfRVZFTlRTJywge1xuLy8gICAgICAgICBsb2dpblN1Y2Nlc3M6ICdhdXRoLWxvZ2luLXN1Y2Nlc3MnLFxuLy8gICAgICAgICBsb2dpbkZhaWxlZDogJ2F1dGgtbG9naW4tZmFpbGVkJyxcbi8vICAgICAgICAgbG9nb3V0U3VjY2VzczogJ2F1dGgtbG9nb3V0LXN1Y2Nlc3MnLFxuLy8gICAgICAgICBzZXNzaW9uVGltZW91dDogJ2F1dGgtc2Vzc2lvbi10aW1lb3V0Jyxcbi8vICAgICAgICAgbm90QXV0aGVudGljYXRlZDogJ2F1dGgtbm90LWF1dGhlbnRpY2F0ZWQnLFxuLy8gICAgICAgICBub3RBdXRob3JpemVkOiAnYXV0aC1ub3QtYXV0aG9yaXplZCdcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdBdXRoSW50ZXJjZXB0b3InLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHEsIEFVVEhfRVZFTlRTKSB7XG4vLyAgICAgICAgIHZhciBzdGF0dXNEaWN0ID0ge1xuLy8gICAgICAgICAgICAgNDAxOiBBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLFxuLy8gICAgICAgICAgICAgNDAzOiBBVVRIX0VWRU5UUy5ub3RBdXRob3JpemVkLFxuLy8gICAgICAgICAgICAgNDE5OiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCxcbi8vICAgICAgICAgICAgIDQ0MDogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXRcbi8vICAgICAgICAgfTtcbi8vICAgICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgICAgIHJlc3BvbnNlRXJyb3I6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChzdGF0dXNEaWN0W3Jlc3BvbnNlLnN0YXR1c10sIHJlc3BvbnNlKTtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlc3BvbnNlKVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9O1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLmNvbmZpZyhmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xuLy8gICAgICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKFtcbi8vICAgICAgICAgICAgICckaW5qZWN0b3InLFxuLy8gICAgICAgICAgICAgZnVuY3Rpb24gKCRpbmplY3Rvcikge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkaW5qZWN0b3IuZ2V0KCdBdXRoSW50ZXJjZXB0b3InKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgXSk7XG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuc2VydmljZSgnQXV0aFNlcnZpY2UnLCBmdW5jdGlvbiAoJGh0dHAsIFNlc3Npb24sICRyb290U2NvcGUsIEFVVEhfRVZFTlRTLCAkcSkge1xuXG4vLyAgICAgICAgIGZ1bmN0aW9uIG9uU3VjY2Vzc2Z1bExvZ2luKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICB2YXIgdXNlciA9IHJlc3BvbnNlLmRhdGEudXNlcjtcbi8vICAgICAgICAgICAgIFNlc3Npb24uY3JlYXRlKHVzZXIpO1xuLy8gICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ2luU3VjY2Vzcyk7XG4vLyAgICAgICAgICAgICByZXR1cm4gdXNlcjtcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIC8vIFVzZXMgdGhlIHNlc3Npb24gZmFjdG9yeSB0byBzZWUgaWYgYW5cbi8vICAgICAgICAgLy8gYXV0aGVudGljYXRlZCB1c2VyIGlzIGN1cnJlbnRseSByZWdpc3RlcmVkLlxuLy8gICAgICAgICB0aGlzLmlzQXV0aGVudGljYXRlZCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAhIVNlc3Npb24udXNlcjtcbi8vICAgICAgICAgfTtcblxuICAgICAgICBcbi8vICAgICAgICAgdGhpcy5pc0FkbWluID0gZnVuY3Rpb24odXNlcklkKXtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdydW5uaW5nIGFkbWluIGZ1bmMnKVxuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKVxuLy8gICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YS51c2VyLmlzQWRtaW4pXG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICB0aGlzLmdldExvZ2dlZEluVXNlciA9IGZ1bmN0aW9uIChmcm9tU2VydmVyKSB7XG5cbi8vICAgICAgICAgICAgIC8vIElmIGFuIGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbiBleGlzdHMsIHdlXG4vLyAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIHVzZXIgYXR0YWNoZWQgdG8gdGhhdCBzZXNzaW9uXG4vLyAgICAgICAgICAgICAvLyB3aXRoIGEgcHJvbWlzZS4gVGhpcyBlbnN1cmVzIHRoYXQgd2UgY2FuXG4vLyAgICAgICAgICAgICAvLyBhbHdheXMgaW50ZXJmYWNlIHdpdGggdGhpcyBtZXRob2QgYXN5bmNocm9ub3VzbHkuXG5cbi8vICAgICAgICAgICAgIC8vIE9wdGlvbmFsbHksIGlmIHRydWUgaXMgZ2l2ZW4gYXMgdGhlIGZyb21TZXJ2ZXIgcGFyYW1ldGVyLFxuLy8gICAgICAgICAgICAgLy8gdGhlbiB0aGlzIGNhY2hlZCB2YWx1ZSB3aWxsIG5vdCBiZSB1c2VkLlxuXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSAmJiBmcm9tU2VydmVyICE9PSB0cnVlKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLndoZW4oU2Vzc2lvbi51c2VyKTtcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgLy8gTWFrZSByZXF1ZXN0IEdFVCAvc2Vzc2lvbi5cbi8vICAgICAgICAgICAgIC8vIElmIGl0IHJldHVybnMgYSB1c2VyLCBjYWxsIG9uU3VjY2Vzc2Z1bExvZ2luIHdpdGggdGhlIHJlc3BvbnNlLlxuLy8gICAgICAgICAgICAgLy8gSWYgaXQgcmV0dXJucyBhIDQwMSByZXNwb25zZSwgd2UgY2F0Y2ggaXQgYW5kIGluc3RlYWQgcmVzb2x2ZSB0byBudWxsLlxuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKS50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKS5jYXRjaChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4vLyAgICAgICAgICAgICB9KTtcblxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbiAoY3JlZGVudGlhbHMpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvbG9naW4nLCBjcmVkZW50aWFscylcbi8vICAgICAgICAgICAgICAgICAudGhlbihvblN1Y2Nlc3NmdWxMb2dpbilcbi8vICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHsgbWVzc2FnZTogJ0ludmFsaWQgbG9naW4gY3JlZGVudGlhbHMuJ30pO1xuLy8gICAgICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMuc2lnbnVwID0gZnVuY3Rpb24oY3JlZGVudGlhbHMpe1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbi8vICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbi8vICAgICAgICAgICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbi8vICAgICAgICAgICAgICAgICBkYXRhOiBjcmVkZW50aWFsc1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQuZGF0YSlcbi8vICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbigpe1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3Qoe21lc3NhZ2U6ICdUaGF0IGVtYWlsIGlzIGFscmVhZHkgYmVpbmcgdXNlZC4nfSk7XG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL2xvZ291dCcpLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgIFNlc3Npb24uZGVzdHJveSgpO1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dvdXRTdWNjZXNzKTtcbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuc2VydmljZSgnU2Vzc2lvbicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUykge1xuXG4vLyAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuLy8gICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICBzZWxmLmRlc3Ryb3koKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuXG4vLyAgICAgICAgIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24gKHVzZXIpIHtcbi8vICAgICAgICAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcbi8vICAgICAgICAgfTtcblxuLy8gICAgIH0pO1xuXG4vLyB9KCkpO1xuIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIpID0+IHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdnYW1lJywge1xuICAgICAgICB1cmw6ICcvZ2FtZS86Z2FtZUlkJyxcbiAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvZ2FtZS9nYW1lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnR2FtZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBnYW1lIDogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldEdhbWVCeUdhbWVJZCgkc3RhdGVQYXJhbXMuZ2FtZUlkKVxuICAgICAgICB9ICBcbiAgICB9KVxuICAgIC5zdGF0ZSgnZ2FtZS5hY3RpdmUtZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnL2FjdGl2ZS1nYW1lJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL2FjdGl2ZS1nYW1lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnQWN0aXZlR2FtZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBnYW1lIDogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldEdhbWVCeUdhbWVJZCgkc3RhdGVQYXJhbXMuZ2FtZUlkKVxuICAgICAgICB9ICAgIFxuICAgIH0pXG4gICAgLnN0YXRlKCdnYW1lLnN1Ym1pc3Npb24tZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnL3N1Ym1pc3Npb24tZ2FtZScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvZ2FtZS9zdWJtaXNzaW9uLWdhbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdTdWJtaXNzaW9uR2FtZUN0cmwnXG4gICAgfSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdHYW1lQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMsICRsb2NhbFN0b3JhZ2UsIGdhbWUpID0+IHsgICBcblxuICAgICRzY29wZS5nYW1lSWQgPSAkc3RhdGVQYXJhbXMuZ2FtZUlkO1xuICAgICRzY29wZS5wbGF5ZXJJZCA9ICRsb2NhbFN0b3JhZ2UudXNlci5pZDtcbiAgICAkc2NvcGUudGVhbUlkID0gJGxvY2FsU3RvcmFnZS50ZWFtLmlkXG4gICAgJHNjb3BlLmdhbWUgPSBnYW1lO1xuICAgICRzY29wZS5nYW1lTmFtZSA9ICRzY29wZS5nYW1lLnNldHRpbmdzLm5hbWU7XG4gICAgJHNjb3BlLndoaXRlQ2FyZHMgPSAkc2NvcGUuZ2FtZS5wbGF5ZXJzWyRzY29wZS5wbGF5ZXJJZF0uaGFuZDtcbiAgICAkc2NvcGUuc2hvd0NhcmRzID0gZmFsc2U7XG4gICAgJHNjb3BlLnBsYXllckNvdW50ID0gT2JqZWN0LmtleXMoJHNjb3BlLmdhbWUucGxheWVycykubGVuZ3RoO1xuICAgICAgXG59KVxuXG5hcHAuY29udHJvbGxlcihcIkFjdGl2ZUdhbWVDdHJsXCIsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCBBY3RpdmVHYW1lRmFjdG9yeSwgZ2FtZSwgJHN0YXRlUGFyYW1zLCAkbG9jYWxTdG9yYWdlLCAkc3RhdGUpID0+IHtcblxuICAgIFxuICAgICRzY29wZS5vblN3aXBlRG93biA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3dvcmtpbmcnKTtcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnNob3dDYXJkcyk7XG4gICAgICAgICRzY29wZS5zaG93Q2FyZHMgPSB0cnVlIDtcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnNob3dDYXJkcyk7XG4gICAgICAgICRzY29wZS4kZXZhbEFzeW5jKCk7XG4gICAgfVxuXG4gICAgJHNjb3BlLm9uU3dpcGVVcCA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzd2lwZWQgdXBcIik7XG4gICAgfVxuXG4gICAgQWN0aXZlR2FtZUZhY3RvcnkucmVmaWxsTXlIYW5kKCRzY29wZS5nYW1lSWQsICRzY29wZS5wbGF5ZXJJZCwgJHNjb3BlLnRlYW1JZCk7XG5cbiAgICAkc2NvcGUuJG9uKCdjaGFuZ2VkR2FtZScsIChldmVudCxzbmFwc2hvdCkgPT57XG4gICAgICAgICRzY29wZS5nYW1lID0gc25hcHNob3Q7XG4gICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5nYW1lKTtcbiAgICAgICAgaWYoZ2FtZS5zdGF0ZSA9PT0gJ3N1Ym1pc3Npb24nKXtcbiAgICAgICAgICAgICRzdGF0ZS5nbygnZ2FtZS5zdWJtaXNzaW9uLWdhbWUnKVxuICAgICAgICB9IFxuICAgIH0pXG5cbiAgXG59KVxuXG5hcHAuY29udHJvbGxlcignU3VibWlzc2lvbkdhbWVDdHJsJywgKCRzY29wZSwgJGxvY2FsU3RvcmFnZSkgPT4ge1xuICAgICRzY29wZS4kb24oJ2NoYW5nZWRHYW1lJywgKGV2ZW50LHNuYXBzaG90KSA9PntcbiAgICAgICAgJHNjb3BlLmdhbWUgPSBzbmFwc2hvdDtcbiAgICB9KVxuXG4gICAkc2NvcGUuanVkZ2UgPSAkc2NvcGUuZ2FtZS5wbGF5ZXJzWyRzY29wZS5nYW1lLmN1cnJlbnRKdWRnZV0ubmFtZVxufSlcblxuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgIHVybDogJy8nLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2hvbWUvaG9tZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgZ2FtZXM6IGZ1bmN0aW9uKEdhbWVGYWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdIb21lQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCAkY29yZG92YU9hdXRoLCBVc2VyRmFjdG9yeSwgR2FtZUZhY3RvcnksICRsb2NhbFN0b3JhZ2UsIGdhbWVzLCAkaW9uaWNQb3B1cCkge1xuICAgICRzY29wZS5zdGFydE5ld0dhbWUgPSBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWU7XG4gICAgJHNjb3BlLnN0b3JhZ2UgPSAkbG9jYWxTdG9yYWdlO1xuICAgICRzY29wZS5nYW1lcyA9IGdhbWVzO1xuXG4gICAgY29uc29sZS5sb2coXCJnYW1lc1wiLCBKU09OLnN0cmluZ2lmeSgkc2NvcGUuZ2FtZXMpKVxuICAgICRzY29wZS5nb1RvTmV3R2FtZSA9ICgpID0+IHtcbiAgICAgICAgJHN0YXRlLmdvKCduZXctZ2FtZS5tYWluJylcbiAgICB9XG5cblxuICAgICRzY29wZS5qb2luR2FtZSA9IEdhbWVGYWN0b3J5LmpvaW5HYW1lQnlJZDtcblxuICAgICRzY29wZS5zaG93UG9wdXAgPSBmdW5jdGlvbihnYW1lSWQpIHtcblxuICAgICAgICAkc2NvcGUuZ2FtZSA9ICRzY29wZS5nYW1lc1tnYW1lSWRdO1xuICAgICAgICAkc2NvcGUuZ2FtZU5hbWUgPSAkc2NvcGUuZ2FtZS5zZXR0aW5ncy5uYW1lO1xuICAgICAgICAkc2NvcGUucGxheWVyQ291bnQgPSBPYmplY3Qua2V5cygkc2NvcGUuZ2FtZS5wbGF5ZXJzKS5sZW5ndGg7XG4gICAgICAgICRzY29wZS53YWl0aW5nRm9yUGxheWVycyA9ICAoJHNjb3BlLmdhbWUuc2V0dGluZ3MubWluUGxheWVycyB8fCA0KSAtICRzY29wZS5wbGF5ZXJDb3VudDtcbiAgICAgICAgIFxuICAgICAgICAgY29uc3QgbXlQb3B1cCA9ICRpb25pY1BvcHVwLnNob3coe1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9ob21lL3BvcHVwLmh0bWwnLFxuICAgICAgICAgICAgdGl0bGU6ICdKb2luICcgKyAkc2NvcGUuZ2FtZU5hbWUsXG4gICAgICAgICAgICBzY29wZTogJHNjb3BlLFxuICAgICAgICAgICAgYnV0dG9uczogXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAge3RleHQ6ICdHbyBiYWNrJ30sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnSm9pbiBnYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbi1iYWxhbmNlZCcsXG4gICAgICAgICAgICAgICAgICAgIG9uVGFwOiBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5qb2luR2FtZShnYW1lSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdnYW1lLmFjdGl2ZS1nYW1lJywgeyBnYW1lSWQ6IGdhbWVJZCB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KVxuICAgIH1cbn0pXG5cbiIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcil7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdsb2dpbicsIHtcblx0XHR1cmw6ICcvbG9naW4nLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvbG9naW4vbG9naW4uaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0xvZ2luQ3RybCdcblx0fSlcblx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2xvZ2luJyk7XG59KVxuXG5hcHAuY29udHJvbGxlcignTG9naW5DdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUsIExvZ2luRmFjdG9yeSwgVXNlckZhY3RvcnksICRjb3Jkb3ZhT2F1dGgsICRsb2NhbFN0b3JhZ2UsICR0aW1lb3V0LCAkaW9uaWNTaWRlTWVudURlbGVnYXRlKXtcbiBcdCRzY29wZS5sb2dpbldpdGhTbGFjayA9IGZ1bmN0aW9uKCl7XG4gXHRcdHJldHVybiBMb2dpbkZhY3RvcnkuZ2V0U2xhY2tDcmVkcygpXG4gXHRcdC50aGVuKGNyZWRzID0+e1xuIFx0XHRcdHJldHVybiAkY29yZG92YU9hdXRoLnNsYWNrKGNyZWRzLmNsaWVudElELCBjcmVkcy5jbGllbnRTZWNyZXQsIFsnaWRlbnRpdHkuYmFzaWMnLCAnaWRlbnRpdHkudGVhbScsICdpZGVudGl0eS5hdmF0YXInXSlcbiBcdFx0fSlcbiBcdFx0LnRoZW4oaW5mbyA9PiBVc2VyRmFjdG9yeS5zZXRVc2VyKGluZm8pKVxuIFx0XHQudGhlbigoKSA9PiAkc3RhdGUuZ28oJ2hvbWUnKSlcbiBcdH1cblxuIFx0JGlvbmljU2lkZU1lbnVEZWxlZ2F0ZS5jYW5EcmFnQ29udGVudChmYWxzZSk7XG5cbiBcdCRzY29wZS4kb24oJyRpb25pY1ZpZXcubGVhdmUnLCBmdW5jdGlvbiAoKSB7ICRpb25pY1NpZGVNZW51RGVsZWdhdGUuY2FuRHJhZ0NvbnRlbnQodHJ1ZSkgfSk7XG5cbiBcdCRzY29wZS5zdG9yYWdlID0gJGxvY2FsU3RvcmFnZVxuXG4gXHRmdW5jdGlvbiByZWRpcmVjdFVzZXIoKXtcbiBcdFx0Y29uc29sZS5sb2coXCJzY29wZSBzdG9yYWdlIHVzZXJcIiwgJHNjb3BlLnN0b3JhZ2UudXNlcilcbiBcdFx0aWYgKCRzY29wZS5zdG9yYWdlLnVzZXIpICRzdGF0ZS5nbygnaG9tZScpXG4gXHR9XG5cblx0cmVkaXJlY3RVc2VyKCk7XG59KSIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpID0+IHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCduZXctZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnL25ldy1nYW1lJyxcbiAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvbWFpbi5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ05ld0dhbWVDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgdGVhbURlY2tzOiAoR2FtZUZhY3RvcnkpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoKSxcbiAgICAgICAgICAgIHN0YW5kYXJkRGVjazogKEdhbWVGYWN0b3J5KSA9PiBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkKDApXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5tYWluJywge1xuICAgICAgICB1cmw6ICcvc2V0dXAtZ2FtZScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvbmV3LWdhbWUuaHRtbCcsXG4gICAgfSlcblxuICAgIC5zdGF0ZSgnbmV3LWdhbWUuYWRkLWRlY2tzJywge1xuICAgICAgICB1cmw6ICcvYWRkLWRlY2tzJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9hZGQtZGVja3MuaHRtbCcsXG4gICAgfSlcblxuICAgIC5zdGF0ZSgnbmV3LWdhbWUuZGVjaycsIHtcbiAgICAgICAgdXJsOiAnL2RlY2svOmRlY2tJZCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvZGVjay5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0RlY2tDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgY2FyZHM6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXRDYXJkc0J5RGVja0lkKCRzdGF0ZVBhcmFtcy5kZWNrSWQpXG4gICAgICAgIH1cblxuXG4gICAgfSlcblxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9uZXctZ2FtZS9zZXR1cC1nYW1lJyk7XG59KVxuXG5hcHAuY29udHJvbGxlcignTmV3R2FtZUN0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgJHN0YXRlLCB0ZWFtRGVja3MsIHN0YW5kYXJkRGVjaykgPT4ge1xuICAgICRzY29wZS5jdXJyZW50VmlldyA9ICdhZGREZWNrcydcbiAgICAkc2NvcGUuZ2FtZUNvbmZpZyA9IHt9O1xuICAgICRzY29wZS5nYW1lQ29uZmlnLmRlY2tzID0ge307XG4gICAgJHNjb3BlLmdvVG9EZWNrcyA9ICgpID0+IHtcbiAgICAgICAgJHN0YXRlLmdvKCduZXctZ2FtZS5hZGQtZGVja3MnLCB7fSwgeyBsb2NhdGlvbjogdHJ1ZSwgcmVsb2FkOiB0cnVlIH0pXG4gICAgfVxuXG4gICAgJHNjb3BlLmRlY2tzID0gc3RhbmRhcmREZWNrLmNvbmNhdCh0ZWFtRGVja3MpO1xuXG4gICAgJHNjb3BlLnN0YXJ0TmV3R2FtZSA9IChnYW1lQ29uZmlnKSA9PiB7XG4gICAgICAgIEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZShnYW1lQ29uZmlnKS50aGVuKChpZCkgPT4ge1xuICAgICAgICAgICAgR2FtZUZhY3RvcnkuYWRkUGlsZVRvR2FtZShpZCwgJHNjb3BlLmdhbWVDb25maWcuZGVja3MpXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2dhbWUuYWN0aXZlLWdhbWUnLCB7Z2FtZUlkOiBpZH0pIFxuXG4gICAgICAgIH0pXG4gICAgfVxuICAgICRzY29wZS5hZGREZWNrc1RvR2FtZSA9IEdhbWVGYWN0b3J5LmFkZERlY2tzO1xuICAgIC8vICRzY29wZS4kb24oJ2NoYW5nZWRHYW1lJywgKGV2ZW50LCBkYXRhKSA9PiB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdyZWNlaXZlZCBldmVudCcpXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdkYXRhIG9iajonLCBkYXRhKVxuICAgIC8vICAgICAkc2NvcGUuZ2FtZSA9IGRhdGE7XG4gICAgLy8gICAgICRzY29wZS4kZGlnZXN0KClcblxuICAgIC8vIH0pXG5cblxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0RlY2tDdHJsJywgKCRzY29wZSwgR2FtZUZhY3RvcnksICRzdGF0ZSwgY2FyZHMpID0+IHtcbiAgICAkc2NvcGUuY2FyZHMgPSBjYXJkc1xufSlcblxuIiwiLy9EaXJlY3RpdmUgRmlsZSIsImFwcC5mYWN0b3J5KCdBY3RpdmVHYW1lRmFjdG9yeScsICgkaHR0cCwgJHJvb3RTY29wZSwgJGxvY2FsU3RvcmFnZSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IEFjdGl2ZUdhbWVGYWN0b3J5ID0ge307XG5cbiAgICAgICAgY29uc3QgcmVmaWxsZXIgPSAoY2FyZHNOZWVkZWQsIHBpbGVSZWYsIGhhbmRSZWYpID0+IHtcbiAgICAgICAgICBwaWxlUmVmLmxpbWl0VG9GaXJzdChjYXJkc05lZWRlZCkub25jZSgndmFsdWUnLCBjYXJkc1NuYXBzaG90ID0+IHtcbiAgICAgICAgICAgIGNhcmRzU25hcHNob3QuZm9yRWFjaChjYXJkID0+IHtcbiAgICAgICAgICAgICAgbGV0IHVwZGF0ZU9iaiA9IHt9XG4gICAgICAgICAgICAgIGNhcmQucmVmLnRyYW5zYWN0aW9uKGNhcmREYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgIHVwZGF0ZU9ialtjYXJkLmtleV0gPSBjYXJkRGF0YVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IGhhbmRSZWYudXBkYXRlKHVwZGF0ZU9iaikpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICAgICAgfVxuXG4gICAgICAgIEFjdGl2ZUdhbWVGYWN0b3J5LnJlZmlsbE15SGFuZCA9IChnYW1lSWQsIHBsYXllcklkLCB0ZWFtSWQpID0+IHtcbiAgICAgICAgICAvLyBob3cgbWFueSBjYXJkcyBkbyBJIG5lZWQ/XG4gICAgICAgICAgbGV0IGNhcmRzTmVlZGVkID0gMFxuICAgICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgY29uc3QgaGFuZFJlZiA9IGdhbWVSZWYuY2hpbGQoYHBsYXllcnMvJHtwbGF5ZXJJZH0vaGFuZGApXG4gICAgICAgICAgY29uc3QgcGlsZVJlZiA9IGdhbWVSZWYuY2hpbGQoJ3BpbGUvd2hpdGVjYXJkcycpXG4gICAgICAgICAgaGFuZFJlZi5vbmNlKCd2YWx1ZScsIGhhbmRTbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgIGNhcmRzTmVlZGVkID0gNyAtIGhhbmRTbmFwc2hvdC5udW1DaGlsZHJlbigpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICByZWZpbGxlcihjYXJkc05lZWRlZCwgcGlsZVJlZiwgaGFuZFJlZilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBBY3RpdmVHYW1lRmFjdG9yeS5zdWJtaXRXaGl0ZUNhcmQgPSAocGxheWVySWQsIGNhcmRJZCwgZ2FtZUlkLCB0ZWFtSWQpID0+IHtcbiAgICAgICAgICBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKTtcbiAgICAgICAgICBjb25zdCBjYXJkVG9TdWJtaXQgPSBnYW1lUmVmLmNoaWxkKGBwbGF5ZXJzLyR7cGxheWVySWR9L2hhbmQvJHtjYXJkSWR9YCk7XG4gICAgICAgICAgY29uc3Qgc3VibWl0UmVmID0gZ2FtZVJlZi5jaGlsZCgnc3VibWl0dGVkV2hpdGVDYXJkcycpO1xuICAgICAgICAgIGZpcmViYXNlTW92ZVNpbmdsZUtleVZhbHVlKGNhcmRUb1N1Ym1pdCwgc3VibWl0UmVmKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gc3VibWl0UmVmLmNoaWxkKGNhcmRJZCkuc2V0KHtcbiAgICAgICAgICAgICAgc3VibWl0dGVkQnk6IHBsYXllcklkXG4gICAgICAgICAgICB9KSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBBY3RpdmVHYW1lRmFjdG9yeTsgXG5cblxufSk7IiwiYXBwLmZhY3RvcnkoJ0dhbWVGYWN0b3J5JywgKCRodHRwLCAkcm9vdFNjb3BlLCAkbG9jYWxTdG9yYWdlKSA9PiB7XG4gICAgY29uc3Qgb3VySXBzID0ge1xuICAgICAgICBuaWtpdGE6IFwiMTkyLjE2OC40LjIxM1wiLFxuICAgICAgICBrYXlsYTogXCIxOTIuMTY4LjQuMjI1XCIsXG4gICAgICAgIG5pdGh5YTogXCIxOTIuMTY4LjEuNDhcIixcbiAgICAgICAgZGFuOiBcIjE5Mi4xNjguNC4yMzZcIlxuICAgIH1cbiAgICBjb25zdCBjdXJyZW50SXAgPSBvdXJJcHMubml0aHlhO1xuXG4gICAgICAgIC8vIHN0YXJ0IGEgbmV3IGdhbWUgZGVycFxuICAgICAgICBjb25zdCBHYW1lRmFjdG9yeSA9IHt9O1xuICAgICAgICBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWUgPSAoZ2FtZUNvbmZpZykgPT4ge1xuICAgICAgICAgICAgLy9jYW4gYWxzbyBnZXQgYWxsIHRoZSBkZWNrcyBieSB0ZWFtIGhlcmUgdG8gcHJlcGFyZVxuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gJGxvY2FsU3RvcmFnZS50ZWFtLmlkIHx8IDI7XG4gICAgICAgICAgICBjb25zdCBjcmVhdG9ySWQgPSAkbG9jYWxTdG9yYWdlLnVzZXIuaWQgfHwgMztcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzYCwge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBnYW1lQ29uZmlnLm5hbWUgfHwgJ0FXRVNPTUUgTmFtZScsXG4gICAgICAgICAgICAgICAgICAgIHRlYW1JZDogdGVhbUlkLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdG9ySWQ6IGNyZWF0b3JJZCxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvck5hbWU6ICRsb2NhbFN0b3JhZ2UudXNlci5uYW1lIHx8ICdkYW4nLCAvL21pZ2h0IGJlIHVubmVjZXNzYXJ5IGlmIHdlIGhhdmUgdGhlIHVzZXIgaWRcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IGdhbWVDb25maWdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdhbWVJZCA9IHJlcy5kYXRhXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgL3RlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAgICAgICAgICAgICBnYW1lUmVmLm9uKCd2YWx1ZScsIHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnY2hhbmdlZEdhbWUnLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnYW1lSWQ7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcbiAgICAgICAgLy8gZ2V0IGFsbCBvZiBhIGRlY2tzIGNhcmRzIHRvIGRpc3BsYXkgd2hlbiBsb29raW5nIGF0IGRlY2tzXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldENhcmRzQnlEZWNrSWQgPSAoaWQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZGVja3MvJHtpZH0vY2FyZHNgKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gVE9ETzogY29tYmluZSB0aGlzIGludG8gdGhlIGFib3ZlIHN0YXJ0TmV3R2FtZSBmdW5jXG4gICAgICAgIC8vIHRha2UgYWxsIG9mIHRoZSBzZWxlY3RlZCBkZWNrcycgY2FyZHMgYW5kIHB1dCB0aGVtIGluIHRoZSBmaXJlYmFzZSBnYW1lIG9iamVjdCBwaWxlICh0aHJvdWdoIHJvdXRlKVxuICAgICAgICBHYW1lRmFjdG9yeS5hZGRQaWxlVG9HYW1lID0gKGdhbWVJZCwgZGVja3MpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRlY2tzQXJyID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBkZWNrSWQgaW4gZGVja3MpIHtcbiAgICAgICAgICAgICAgICBkZWNrc0Fyci5wdXNoKGRlY2tJZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzLyR7Z2FtZUlkfS9kZWNrc2AsIHtcbiAgICAgICAgICAgICAgICAnZGVja3MnOiBkZWNrc0FyclxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIEdhbWVGYWN0b3J5LmpvaW5HYW1lQnlJZCA9IChnYW1lSWQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRlYW1JZCA9ICRsb2NhbFN0b3JhZ2UudGVhbS5pZDtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllcklkID0gJGxvY2FsU3RvcmFnZS51c2VyLmlkO1xuICAgICAgICAgICAgY29uc3QgcGxheWVyTmFtZSA9ICRsb2NhbFN0b3JhZ2UudXNlci5uYW1lO1xuICAgICAgICAgICAgY29uc3QgcGxheWVyUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH0vcGxheWVycy8ke3BsYXllcklkfWApXG4gICAgICAgICAgICBwbGF5ZXJSZWYuc2V0KHtcbiAgICAgICAgICAgICAgICBuYW1lOiBwbGF5ZXJOYW1lXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICAgIGdhbWVSZWYub24oJ3ZhbHVlJywgc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnY2hhbmdlZEdhbWUnLCBzbmFwc2hvdC52YWwoKSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgJGh0dHAucG9zdChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0/cGxheWVySWQ9JHtwbGF5ZXJJZH1gKVxuICAgICAgICB9XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCA9IChpZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gKHR5cGVvZiBpZCAhPT0gJ251bWJlcicpID8gJGxvY2FsU3RvcmFnZS50ZWFtLmlkIDogaWQ7IC8vIGlkIHx8IGxvY2Fsc3RvcmFnZSBkb2Vzbid0IHdvcmsgYmVjYXVzZSAwIGlzIGZhbHNleVxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9kZWNrcz90ZWFtPSR7dGVhbUlkfWApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuXG4gICAgICAgIH07XG5cblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRVc2Vyc0J5R2FtZUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0vdXNlcnNgKTtcbiAgICAgICAgfTtcblxuXG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZUJ5R2FtZUlkID0gKGdhbWVJZCwgdGVhbUlkKSA9PiB7XG4gICAgICAgICAgICB0ZWFtSWQgPSB0ZWFtSWQgfHwgJGxvY2FsU3RvcmFnZS50ZWFtLmlkXG4gICAgICAgICAgICBjb25zdCBnYW1lc1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICAgIHJldHVybiBnYW1lc1JlZi5vbmNlKCd2YWx1ZScpLnRoZW4oc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBzbmFwc2hvdC52YWwoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCA9ICh0ZWFtSWQpID0+IHtcbiAgICAgICAgICAgIHRlYW1JZCA9IHRlYW1JZCB8fCAkbG9jYWxTdG9yYWdlLnRlYW0uaWRcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZ2FtZXMvP3RlYW1JZD0ke3RlYW1JZH1gKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgICAgIH07XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVVzZXIgPSAodXNlcklkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzLz91c2VySWQ9JHt1c2VySWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBHYW1lRmFjdG9yeTtcbiAgICB9XG5cbik7XG4iLCJhcHAuZmFjdG9yeSgnVXNlckZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCwgJGxvY2FsU3RvcmFnZSl7XG5cdGNvbnN0IG91cklwcyA9IHtcbiAgICAgICAgbmlraXRhOiBcIjE5Mi4xNjguNC4yMTNcIixcbiAgICAgICAga2F5bGE6IFwiMTkyLjE2OC40LjIyNVwiLFxuICAgICAgICBuaXRoeWE6IFwiMTkyLjE2OC4xLjQ4XCIsXG4gICAgICAgIGRhbjogXCIxOTIuMTY4LjQuMjM2XCJcbiAgICB9XG4gICAgY29uc3QgY3VycmVudElwID0gb3VySXBzLm5pa2l0YVxuXHRyZXR1cm4ge1xuXHRcdHNldFVzZXI6IGZ1bmN0aW9uKGluZm8pe1xuXHRcdFx0cmV0dXJuICRodHRwKHtcblx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRcdHVybDogYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvdXNlcnNgLFxuXHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRkYXRhOiBpbmZvXG5cdFx0XHR9KVxuXHRcdFx0LnRoZW4ocmVzID0+IHtcblx0XHRcdFx0dGhpcy5zZXRMb2NhbFN0b3JhZ2UocmVzLmRhdGEudXNlclswXSwgcmVzLmRhdGEudGVhbVswXSk7XG5cdFx0XHR9KVxuXHRcdH0sXG5cdFx0Z2V0U2xhY2tDcmVkczogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvc2xhY2tgKVxuXHRcdFx0XHQudGhlbihyZXMgPT4ge1xuXHRcdFx0XHRcdHJldHVybiByZXMuZGF0YVxuXHRcdFx0XHR9KVxuXHRcdH0sXG5cdFx0Z2V0U2xhY2tJbmZvOiBmdW5jdGlvbigpe1xuXHRcdFx0cmV0dXJuICRodHRwLmdldCgnaHR0cHM6Ly9zbGFjay5jb20vYXBpL3VzZXJzLmlkZW50aXR5Jylcblx0XHR9LFxuXG5cdFx0c2V0TG9jYWxTdG9yYWdlOiBmdW5jdGlvbih1c2VyLCB0ZWFtKXtcblx0XHRcdCRsb2NhbFN0b3JhZ2UudXNlciA9IHVzZXI7XG5cdFx0XHQkbG9jYWxTdG9yYWdlLnRlYW0gPSB0ZWFtO1xuXHRcdH0sXG5cblx0XHRsb2dPdXQ6IGZ1bmN0aW9uKCl7XG5cdFx0XHQkbG9jYWxTdG9yYWdlLiRyZXNldCgpO1xuXHRcdH1cblx0fVxufSlcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
