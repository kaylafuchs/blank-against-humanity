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
        templateUrl: 'js/game/game.html',
        controller: 'GameCtrl'
    });
});

app.controller('GameCtrl', function ($scope, GameFactory, $stateParams, $localStorage, ActiveGameFactory) {
    // const gameId = $stateParams.gameId;
    var gameId = 32;
    var playerId = $localStorage.user.id;
    var teamId = 2;
    // const teamId = $localStorage.team.id
    var gameRef = firebase.database().ref('teams/' + teamId + '/games/' + gameId + '/');
    gameRef.on('value', function (gameSnapshot) {
        $scope.game = gameSnapshot.val();
        $scope.gameName = $scope.game.settings.name;
    });

    ActiveGameFactory.refillMyHand(gameId, playerId, teamId);
    $scope.playerHand = $scope.game.players[playerId].hand;

    $scope.showCards = false;

    $scope.onSwipeDown = function () {
        $scope.showCards = true;
        $scope.$evalAsync();
    };
});

// app.controller("ActiveGameCtrl", ($scope, GameFactory, ActiveGameFactory, game, $stateParams, $localStorage, $state) => {


//     $scope.onSwipeDown = () => {
//         console.log('working');
//         console.log($scope.showCards);
//         $scope.showCards = true ;
//         console.log($scope.showCards);
//         $scope.$evalAsync();
//     }

//     $scope.onSwipeUp = () => {
//         console.log("swiped up");
//     }

//     $scope.onDoubleTap = (key) => {
//         console.log("double tapped")
//         $scope.played = true;
//         //call submit card function here.
//     }

//     ActiveGameFactory.refillMyHand($scope.gameId, $scope.playerId, $scope.teamId);

//     $scope.$on('changedGame', (event,snapshot) =>{
//         $scope.game = snapshot;
//         console.log($scope.game);
//         if(game.state === 'submission'){
//             $state.go('game.submission-game')
//         } 
//     })
// })


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

    var currentIp = ourIps.nithya;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImNhcmRzLXRlc3QvY2FyZHNUZXN0LmpzIiwiZGVja3MvZGVja3MuanMiLCJmcm9tIGZzZy9mcm9tLWZzZy5qcyIsImdhbWUvZ2FtZS5qcyIsImhvbWUvaG9tZS5qcyIsImxvZ2luL2xvZ2luLmpzIiwibmV3LWdhbWUvbmV3LWdhbWUuanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiLCJjb21tb24vZmFjdG9yaWVzL0FjdGl2ZUdhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9HYW1lRmFjdG9yeS5qcyIsImNvbW1vbi9mYWN0b3JpZXMvdXNlckZhY3RvcnkuanMiXSwibmFtZXMiOlsid2luZG93IiwiYXBwIiwiYW5ndWxhciIsIm1vZHVsZSIsInJ1biIsIiRpb25pY1BsYXRmb3JtIiwicmVhZHkiLCJjb3Jkb3ZhIiwicGx1Z2lucyIsIktleWJvYXJkIiwiaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyIiwiZGlzYWJsZVNjcm9sbCIsIlN0YXR1c0JhciIsInN0eWxlTGlnaHRDb250ZW50IiwiY29udHJvbGxlciIsIiRzY29wZSIsIlVzZXJGYWN0b3J5IiwiJHN0YXRlIiwiJGxvY2FsU3RvcmFnZSIsIiR0aW1lb3V0IiwibG9nT3V0IiwiZ28iLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsInN0YXRlIiwidXJsIiwidGVtcGxhdGVVcmwiLCJncmVldGluZyIsInJlc29sdmUiLCJkZWNrcyIsIkdhbWVGYWN0b3J5IiwiJHN0YXRlUGFyYW1zIiwiZ2V0RGVja3NCeVRlYW1JZCIsInN0YXRlUGFyYW1zIiwidGVhbUlkIiwiQWN0aXZlR2FtZUZhY3RvcnkiLCJnYW1lSWQiLCJwbGF5ZXJJZCIsInVzZXIiLCJpZCIsImdhbWVSZWYiLCJmaXJlYmFzZSIsImRhdGFiYXNlIiwicmVmIiwib24iLCJnYW1lIiwiZ2FtZVNuYXBzaG90IiwidmFsIiwiZ2FtZU5hbWUiLCJzZXR0aW5ncyIsIm5hbWUiLCJyZWZpbGxNeUhhbmQiLCJwbGF5ZXJIYW5kIiwicGxheWVycyIsImhhbmQiLCJzaG93Q2FyZHMiLCJvblN3aXBlRG93biIsIiRldmFsQXN5bmMiLCIkdXJsUm91dGVyUHJvdmlkZXIiLCJnYW1lcyIsImdldEdhbWVzQnlUZWFtSWQiLCIkY29yZG92YU9hdXRoIiwiJGlvbmljUG9wdXAiLCJzdGFydE5ld0dhbWUiLCJzdG9yYWdlIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJnb1RvTmV3R2FtZSIsImpvaW5HYW1lIiwiam9pbkdhbWVCeUlkIiwic2hvd1BvcHVwIiwicGxheWVyQ291bnQiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwid2FpdGluZ0ZvclBsYXllcnMiLCJtaW5QbGF5ZXJzIiwibXlQb3B1cCIsInNob3ciLCJ0aXRsZSIsInNjb3BlIiwiYnV0dG9ucyIsInRleHQiLCJ0eXBlIiwib25UYXAiLCJvdGhlcndpc2UiLCIkaW9uaWNTaWRlTWVudURlbGVnYXRlIiwibG9naW5XaXRoU2xhY2siLCJnZXRTbGFja0NyZWRzIiwidGhlbiIsInNsYWNrIiwiY3JlZHMiLCJjbGllbnRJRCIsImNsaWVudFNlY3JldCIsInNldFVzZXIiLCJpbmZvIiwiY2FuRHJhZ0NvbnRlbnQiLCIkb24iLCJyZWRpcmVjdFVzZXIiLCJhYnN0cmFjdCIsInRlYW1EZWNrcyIsInN0YW5kYXJkRGVjayIsImNhcmRzIiwiZ2V0Q2FyZHNCeURlY2tJZCIsImRlY2tJZCIsImN1cnJlbnRWaWV3IiwiZ2FtZUNvbmZpZyIsImdvVG9EZWNrcyIsImxvY2F0aW9uIiwicmVsb2FkIiwiY29uY2F0IiwiYWRkUGlsZVRvR2FtZSIsImFkZERlY2tzVG9HYW1lIiwiYWRkRGVja3MiLCJmYWN0b3J5IiwiJGh0dHAiLCIkcm9vdFNjb3BlIiwicmVmaWxsZXIiLCJjYXJkc05lZWRlZCIsInBpbGVSZWYiLCJoYW5kUmVmIiwibGltaXRUb0ZpcnN0Iiwib25jZSIsImNhcmRzU25hcHNob3QiLCJmb3JFYWNoIiwidXBkYXRlT2JqIiwiY2FyZCIsInRyYW5zYWN0aW9uIiwia2V5IiwiY2FyZERhdGEiLCJ1cGRhdGUiLCJjYXRjaCIsImVyciIsImNoaWxkIiwiaGFuZFNuYXBzaG90IiwibnVtQ2hpbGRyZW4iLCJzdWJtaXRXaGl0ZUNhcmQiLCJjYXJkSWQiLCJjYXJkVG9TdWJtaXQiLCJzdWJtaXRSZWYiLCJmaXJlYmFzZU1vdmVTaW5nbGVLZXlWYWx1ZSIsInNldCIsInN1Ym1pdHRlZEJ5Iiwib3VySXBzIiwibmlraXRhIiwia2F5bGEiLCJuaXRoeWEiLCJkYW4iLCJjdXJyZW50SXAiLCJ0ZWFtIiwiY3JlYXRvcklkIiwicG9zdCIsImNyZWF0b3JOYW1lIiwicmVzIiwiZGF0YSIsIiRicm9hZGNhc3QiLCJzbmFwc2hvdCIsImdldCIsImRlY2tzQXJyIiwicHVzaCIsInBsYXllck5hbWUiLCJwbGF5ZXJSZWYiLCJnZXRVc2Vyc0J5R2FtZUlkIiwiZ2V0R2FtZUJ5R2FtZUlkIiwiZ2FtZXNSZWYiLCJnZXRHYW1lc0J5VXNlciIsInVzZXJJZCIsIm1ldGhvZCIsImhlYWRlcnMiLCJzZXRMb2NhbFN0b3JhZ2UiLCJnZXRTbGFja0luZm8iLCIkcmVzZXQiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBQSxPQUFBQyxHQUFBLEdBQUFDLFFBQUFDLE1BQUEsQ0FBQSxzQkFBQSxFQUFBLENBQUEsT0FBQSxFQUFBLFdBQUEsRUFBQSxXQUFBLEVBQUEsZ0JBQUEsRUFBQSxXQUFBLEVBQUEsV0FBQSxDQUFBLENBQUE7O0FBR0FGLElBQUFHLEdBQUEsQ0FBQSxVQUFBQyxjQUFBLEVBQUE7QUFDQUEsbUJBQUFDLEtBQUEsQ0FBQSxZQUFBO0FBQ0EsWUFBQU4sT0FBQU8sT0FBQSxJQUFBUCxPQUFBTyxPQUFBLENBQUFDLE9BQUEsQ0FBQUMsUUFBQSxFQUFBO0FBQ0E7QUFDQTtBQUNBRixvQkFBQUMsT0FBQSxDQUFBQyxRQUFBLENBQUFDLHdCQUFBLENBQUEsSUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQUgsb0JBQUFDLE9BQUEsQ0FBQUMsUUFBQSxDQUFBRSxhQUFBLENBQUEsSUFBQTtBQUNBO0FBQ0EsWUFBQVgsT0FBQVksU0FBQSxFQUFBO0FBQ0FBLHNCQUFBQyxpQkFBQTtBQUNBO0FBQ0EsS0FkQTtBQWdCQSxDQWpCQTs7QUNUQVosSUFBQWEsVUFBQSxDQUFBLFlBQUEsRUFBQSxVQUFBQyxNQUFBLEVBQUFDLFdBQUEsRUFBQUMsTUFBQSxFQUFBQyxhQUFBLEVBQUFDLFFBQUEsRUFBQTtBQUNBSixXQUFBSyxNQUFBLEdBQUEsWUFBQTtBQUNBSixvQkFBQUksTUFBQTtBQUNBSCxlQUFBSSxFQUFBLENBQUEsT0FBQTtBQUNBLEtBSEE7QUFJQSxDQUxBO0FDQUFwQixJQUFBcUIsTUFBQSxDQUFBLFVBQUFDLGNBQUEsRUFBQTtBQUNBQSxtQkFBQUMsS0FBQSxDQUFBLE9BQUEsRUFBQTtBQUNBQyxhQUFBLFFBREE7QUFFQUMscUJBQUEsK0JBRkE7QUFHQVosb0JBQUE7QUFIQSxLQUFBO0FBS0EsQ0FOQTs7QUFRQWIsSUFBQWEsVUFBQSxDQUFBLGVBQUEsRUFBQSxVQUFBQyxNQUFBLEVBQUE7QUFDQUEsV0FBQVksUUFBQSxHQUFBLElBQUE7QUFDQSxDQUZBO0FDUkExQixJQUFBcUIsTUFBQSxDQUFBLFVBQUFDLGNBQUEsRUFBQTtBQUNBQSxtQkFBQUMsS0FBQSxDQUFBLE9BQUEsRUFBQTtBQUNBQyxhQUFBLGVBREE7QUFFQUMscUJBQUEscUJBRkE7QUFHQVosb0JBQUEsVUFIQTtBQUlBYyxpQkFBQTtBQUNBQyxtQkFBQSxlQUFBQyxXQUFBLEVBQUFDLFlBQUE7QUFBQSx1QkFBQUQsWUFBQUUsZ0JBQUEsQ0FBQUMsWUFBQUMsTUFBQSxDQUFBO0FBQUE7QUFEQTtBQUpBLEtBQUE7QUFTQSxDQVZBOztBQVlBakMsSUFBQWEsVUFBQSxDQUFBLFVBQUEsRUFBQSxVQUFBQyxNQUFBLEVBQUEsQ0FJQSxDQUpBO0FDWkE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQ3BKQWQsSUFBQXFCLE1BQUEsQ0FBQSxVQUFBQyxjQUFBLEVBQUE7O0FBRUFBLG1CQUFBQyxLQUFBLENBQUEsTUFBQSxFQUFBO0FBQ0FDLGFBQUEsZUFEQTtBQUVBQyxxQkFBQSxtQkFGQTtBQUdBWixvQkFBQTtBQUhBLEtBQUE7QUFRQSxDQVZBOztBQVlBYixJQUFBYSxVQUFBLENBQUEsVUFBQSxFQUFBLFVBQUFDLE1BQUEsRUFBQWUsV0FBQSxFQUFBQyxZQUFBLEVBQUFiLGFBQUEsRUFBQWlCLGlCQUFBLEVBQUE7QUFDQTtBQUNBLFFBQUFDLFNBQUEsRUFBQTtBQUNBLFFBQUFDLFdBQUFuQixjQUFBb0IsSUFBQSxDQUFBQyxFQUFBO0FBQ0EsUUFBQUwsU0FBQSxDQUFBO0FBQ0E7QUFDQSxRQUFBTSxVQUFBQyxTQUFBQyxRQUFBLEdBQUFDLEdBQUEsWUFBQVQsTUFBQSxlQUFBRSxNQUFBLE9BQUE7QUFDQUksWUFBQUksRUFBQSxDQUFBLE9BQUEsRUFBQSx3QkFBQTtBQUNBN0IsZUFBQThCLElBQUEsR0FBQUMsYUFBQUMsR0FBQSxFQUFBO0FBQ0FoQyxlQUFBaUMsUUFBQSxHQUFBakMsT0FBQThCLElBQUEsQ0FBQUksUUFBQSxDQUFBQyxJQUFBO0FBQ0EsS0FIQTs7QUFLQWYsc0JBQUFnQixZQUFBLENBQUFmLE1BQUEsRUFBQUMsUUFBQSxFQUFBSCxNQUFBO0FBQ0FuQixXQUFBcUMsVUFBQSxHQUFBckMsT0FBQThCLElBQUEsQ0FBQVEsT0FBQSxDQUFBaEIsUUFBQSxFQUFBaUIsSUFBQTs7QUFFQXZDLFdBQUF3QyxTQUFBLEdBQUEsS0FBQTs7QUFFQXhDLFdBQUF5QyxXQUFBLEdBQUEsWUFBQTtBQUNBekMsZUFBQXdDLFNBQUEsR0FBQSxJQUFBO0FBQ0F4QyxlQUFBMEMsVUFBQTtBQUNBLEtBSEE7QUFJQSxDQXJCQTs7QUF3QkE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ2xFQXhELElBQUFxQixNQUFBLENBQUEsVUFBQUMsY0FBQSxFQUFBbUMsa0JBQUEsRUFBQTtBQUNBbkMsbUJBQUFDLEtBQUEsQ0FBQSxNQUFBLEVBQUE7QUFDQUMsYUFBQSxHQURBO0FBRUFDLHFCQUFBLG1CQUZBO0FBR0FaLG9CQUFBLFVBSEE7QUFJQWMsaUJBQUE7QUFDQStCLG1CQUFBLGVBQUE3QixXQUFBLEVBQUE7QUFDQSx1QkFBQUEsWUFBQThCLGdCQUFBLEVBQUE7QUFDQTtBQUhBO0FBSkEsS0FBQTtBQVVBLENBWEE7O0FBYUEzRCxJQUFBYSxVQUFBLENBQUEsVUFBQSxFQUFBLFVBQUFDLE1BQUEsRUFBQUUsTUFBQSxFQUFBNEMsYUFBQSxFQUFBN0MsV0FBQSxFQUFBYyxXQUFBLEVBQUFaLGFBQUEsRUFBQXlDLEtBQUEsRUFBQUcsV0FBQSxFQUFBO0FBQ0EvQyxXQUFBZ0QsWUFBQSxHQUFBakMsWUFBQWlDLFlBQUE7QUFDQWhELFdBQUFpRCxPQUFBLEdBQUE5QyxhQUFBO0FBQ0FILFdBQUE0QyxLQUFBLEdBQUFBLEtBQUE7O0FBRUFNLFlBQUFDLEdBQUEsQ0FBQSxPQUFBLEVBQUFDLEtBQUFDLFNBQUEsQ0FBQXJELE9BQUE0QyxLQUFBLENBQUE7QUFDQTVDLFdBQUFzRCxXQUFBLEdBQUEsWUFBQTtBQUNBcEQsZUFBQUksRUFBQSxDQUFBLGVBQUE7QUFDQSxLQUZBOztBQUtBTixXQUFBdUQsUUFBQSxHQUFBeEMsWUFBQXlDLFlBQUE7O0FBRUF4RCxXQUFBeUQsU0FBQSxHQUFBLFVBQUFwQyxNQUFBLEVBQUE7O0FBRUFyQixlQUFBOEIsSUFBQSxHQUFBOUIsT0FBQTRDLEtBQUEsQ0FBQXZCLE1BQUEsQ0FBQTtBQUNBckIsZUFBQWlDLFFBQUEsR0FBQWpDLE9BQUE4QixJQUFBLENBQUFJLFFBQUEsQ0FBQUMsSUFBQTtBQUNBbkMsZUFBQTBELFdBQUEsR0FBQUMsT0FBQUMsSUFBQSxDQUFBNUQsT0FBQThCLElBQUEsQ0FBQVEsT0FBQSxFQUFBdUIsTUFBQTtBQUNBN0QsZUFBQThELGlCQUFBLEdBQUEsQ0FBQTlELE9BQUE4QixJQUFBLENBQUFJLFFBQUEsQ0FBQTZCLFVBQUEsSUFBQSxDQUFBLElBQUEvRCxPQUFBMEQsV0FBQTs7QUFFQSxZQUFBTSxVQUFBakIsWUFBQWtCLElBQUEsQ0FBQTtBQUNBdEQseUJBQUEsb0JBREE7QUFFQXVELG1CQUFBLFVBQUFsRSxPQUFBaUMsUUFGQTtBQUdBa0MsbUJBQUFuRSxNQUhBO0FBSUFvRSxxQkFDQSxDQUNBLEVBQUFDLE1BQUEsU0FBQSxFQURBLEVBRUE7QUFDQUEsc0JBQUEsV0FEQTtBQUVBQyxzQkFBQSxpQkFGQTtBQUdBQyx1QkFBQSxrQkFBQTtBQUNBdkUsMkJBQUF1RCxRQUFBLENBQUFsQyxNQUFBO0FBQ0FuQiwyQkFBQUksRUFBQSxDQUFBLGtCQUFBLEVBQUEsRUFBQWUsUUFBQUEsTUFBQSxFQUFBO0FBQ0E7QUFOQSxhQUZBO0FBTEEsU0FBQSxDQUFBO0FBaUJBLEtBeEJBO0FBeUJBLENBdENBOztBQ2JBbkMsSUFBQXFCLE1BQUEsQ0FBQSxVQUFBQyxjQUFBLEVBQUFtQyxrQkFBQSxFQUFBO0FBQ0FuQyxtQkFBQUMsS0FBQSxDQUFBLE9BQUEsRUFBQTtBQUNBQyxhQUFBLFFBREE7QUFFQUMscUJBQUEscUJBRkE7QUFHQVosb0JBQUE7QUFIQSxLQUFBO0FBS0E0Qyx1QkFBQTZCLFNBQUEsQ0FBQSxRQUFBO0FBQ0EsQ0FQQTs7QUFTQXRGLElBQUFhLFVBQUEsQ0FBQSxXQUFBLEVBQUEsVUFBQUMsTUFBQSxFQUFBRSxNQUFBLEVBQUFELFdBQUEsRUFBQTZDLGFBQUEsRUFBQTNDLGFBQUEsRUFBQUMsUUFBQSxFQUFBcUUsc0JBQUEsRUFBQTtBQUNBekUsV0FBQTBFLGNBQUEsR0FBQSxZQUFBO0FBQ0EsZUFBQXpFLFlBQUEwRSxhQUFBLEdBQ0FDLElBREEsQ0FDQSxpQkFBQTtBQUNBLG1CQUFBOUIsY0FBQStCLEtBQUEsQ0FBQUMsTUFBQUMsUUFBQSxFQUFBRCxNQUFBRSxZQUFBLEVBQUEsQ0FBQSxnQkFBQSxFQUFBLGVBQUEsRUFBQSxpQkFBQSxDQUFBLENBQUE7QUFDQSxTQUhBLEVBSUFKLElBSkEsQ0FJQTtBQUFBLG1CQUFBM0UsWUFBQWdGLE9BQUEsQ0FBQUMsSUFBQSxDQUFBO0FBQUEsU0FKQSxFQUtBTixJQUxBLENBS0E7QUFBQSxtQkFBQTFFLE9BQUFJLEVBQUEsQ0FBQSxNQUFBLENBQUE7QUFBQSxTQUxBLENBQUE7QUFNQSxLQVBBOztBQVNBbUUsMkJBQUFVLGNBQUEsQ0FBQSxLQUFBOztBQUVBbkYsV0FBQW9GLEdBQUEsQ0FBQSxrQkFBQSxFQUFBLFlBQUE7QUFBQVgsK0JBQUFVLGNBQUEsQ0FBQSxJQUFBO0FBQUEsS0FBQTs7QUFFQW5GLFdBQUFpRCxPQUFBLEdBQUE5QyxhQUFBOztBQUVBLGFBQUFrRixZQUFBLEdBQUE7QUFDQW5DLGdCQUFBQyxHQUFBLENBQUEsb0JBQUEsRUFBQW5ELE9BQUFpRCxPQUFBLENBQUExQixJQUFBO0FBQ0EsWUFBQXZCLE9BQUFpRCxPQUFBLENBQUExQixJQUFBLEVBQUFyQixPQUFBSSxFQUFBLENBQUEsTUFBQTtBQUNBOztBQUVBK0U7QUFDQSxDQXRCQTs7QUNUQW5HLElBQUFxQixNQUFBLENBQUEsVUFBQUMsY0FBQSxFQUFBbUMsa0JBQUEsRUFBQTs7QUFFQW5DLG1CQUFBQyxLQUFBLENBQUEsVUFBQSxFQUFBO0FBQ0FDLGFBQUEsV0FEQTtBQUVBNEUsa0JBQUEsSUFGQTtBQUdBM0UscUJBQUEsdUJBSEE7QUFJQVosb0JBQUEsYUFKQTtBQUtBYyxpQkFBQTtBQUNBMEUsdUJBQUEsbUJBQUF4RSxXQUFBO0FBQUEsdUJBQUFBLFlBQUFFLGdCQUFBLEVBQUE7QUFBQSxhQURBO0FBRUF1RSwwQkFBQSxzQkFBQXpFLFdBQUE7QUFBQSx1QkFBQUEsWUFBQUUsZ0JBQUEsQ0FBQSxDQUFBLENBQUE7QUFBQTtBQUZBO0FBTEEsS0FBQSxFQVdBUixLQVhBLENBV0EsZUFYQSxFQVdBO0FBQ0FDLGFBQUEsYUFEQTtBQUVBQyxxQkFBQTtBQUZBLEtBWEEsRUFnQkFGLEtBaEJBLENBZ0JBLG9CQWhCQSxFQWdCQTtBQUNBQyxhQUFBLFlBREE7QUFFQUMscUJBQUE7QUFGQSxLQWhCQSxFQXFCQUYsS0FyQkEsQ0FxQkEsZUFyQkEsRUFxQkE7QUFDQUMsYUFBQSxlQURBO0FBRUFDLHFCQUFBLHVCQUZBO0FBR0FaLG9CQUFBLFVBSEE7QUFJQWMsaUJBQUE7QUFDQTRFLG1CQUFBLGVBQUExRSxXQUFBLEVBQUFDLFlBQUE7QUFBQSx1QkFBQUQsWUFBQTJFLGdCQUFBLENBQUExRSxhQUFBMkUsTUFBQSxDQUFBO0FBQUE7QUFEQTs7QUFKQSxLQXJCQTs7QUFnQ0FoRCx1QkFBQTZCLFNBQUEsQ0FBQSxzQkFBQTtBQUNBLENBbkNBOztBQXFDQXRGLElBQUFhLFVBQUEsQ0FBQSxhQUFBLEVBQUEsVUFBQUMsTUFBQSxFQUFBZSxXQUFBLEVBQUFiLE1BQUEsRUFBQXFGLFNBQUEsRUFBQUMsWUFBQSxFQUFBO0FBQ0F4RixXQUFBNEYsV0FBQSxHQUFBLFVBQUE7QUFDQTVGLFdBQUE2RixVQUFBLEdBQUEsRUFBQTtBQUNBN0YsV0FBQTZGLFVBQUEsQ0FBQS9FLEtBQUEsR0FBQSxFQUFBO0FBQ0FkLFdBQUE4RixTQUFBLEdBQUEsWUFBQTtBQUNBNUYsZUFBQUksRUFBQSxDQUFBLG9CQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUF5RixVQUFBLElBQUEsRUFBQUMsUUFBQSxJQUFBLEVBQUE7QUFDQSxLQUZBOztBQUlBaEcsV0FBQWMsS0FBQSxHQUFBMEUsYUFBQVMsTUFBQSxDQUFBVixTQUFBLENBQUE7O0FBRUF2RixXQUFBZ0QsWUFBQSxHQUFBLFVBQUE2QyxVQUFBLEVBQUE7QUFDQTNDLGdCQUFBQyxHQUFBLENBQUEsdUJBQUE7QUFDQXBDLG9CQUFBaUMsWUFBQSxDQUFBNkMsVUFBQSxFQUFBakIsSUFBQSxDQUFBLFVBQUFwRCxFQUFBLEVBQUE7QUFDQTBCLG9CQUFBQyxHQUFBLENBQUEsc0JBQUE7QUFDQXBDLHdCQUFBbUYsYUFBQSxDQUFBMUUsRUFBQSxFQUFBeEIsT0FBQTZGLFVBQUEsQ0FBQS9FLEtBQUE7QUFDQVosbUJBQUFJLEVBQUEsQ0FBQSxrQkFBQSxFQUFBLEVBQUFlLFFBQUFHLEVBQUEsRUFBQTtBQUdBLFNBTkE7QUFPQSxLQVRBO0FBVUF4QixXQUFBbUcsY0FBQSxHQUFBcEYsWUFBQXFGLFFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUdBLENBOUJBOztBQWdDQWxILElBQUFhLFVBQUEsQ0FBQSxVQUFBLEVBQUEsVUFBQUMsTUFBQSxFQUFBZSxXQUFBLEVBQUFiLE1BQUEsRUFBQXVGLEtBQUEsRUFBQTtBQUNBekYsV0FBQXlGLEtBQUEsR0FBQUEsS0FBQTtBQUNBLENBRkE7O0FDckVBO0FDQUF2RyxJQUFBbUgsT0FBQSxDQUFBLG1CQUFBLEVBQUEsVUFBQUMsS0FBQSxFQUFBQyxVQUFBLEVBQUFwRyxhQUFBLEVBQUE7O0FBRUEsUUFBQWlCLG9CQUFBLEVBQUE7O0FBRUEsUUFBQW9GLFdBQUEsU0FBQUEsUUFBQSxDQUFBQyxXQUFBLEVBQUFDLE9BQUEsRUFBQUMsT0FBQSxFQUFBO0FBQ0FELGdCQUFBRSxZQUFBLENBQUFILFdBQUEsRUFBQUksSUFBQSxDQUFBLE9BQUEsRUFBQSx5QkFBQTtBQUNBQywwQkFBQUMsT0FBQSxDQUFBLGdCQUFBO0FBQ0Esb0JBQUFDLFlBQUEsRUFBQTtBQUNBQyxxQkFBQXJGLEdBQUEsQ0FBQXNGLFdBQUEsQ0FBQSxvQkFBQTtBQUNBRiw4QkFBQUMsS0FBQUUsR0FBQSxJQUFBQyxRQUFBO0FBQ0EsMkJBQUEsSUFBQTtBQUNBLGlCQUhBLEVBSUF4QyxJQUpBLENBSUE7QUFBQSwyQkFBQStCLFFBQUFVLE1BQUEsQ0FBQUwsU0FBQSxDQUFBO0FBQUEsaUJBSkEsRUFLQU0sS0FMQSxDQUtBO0FBQUEsMkJBQUFwRSxRQUFBQyxHQUFBLENBQUFvRSxHQUFBLENBQUE7QUFBQSxpQkFMQTtBQU1BLGFBUkE7QUFTQSxTQVZBLEVBV0FELEtBWEEsQ0FXQTtBQUFBLG1CQUFBcEUsUUFBQUMsR0FBQSxDQUFBb0UsR0FBQSxDQUFBO0FBQUEsU0FYQTtBQVlBLEtBYkE7O0FBZUFuRyxzQkFBQWdCLFlBQUEsR0FBQSxVQUFBZixNQUFBLEVBQUFDLFFBQUEsRUFBQUgsTUFBQSxFQUFBO0FBQ0E7QUFDQSxZQUFBc0YsY0FBQSxDQUFBO0FBQ0EsWUFBQWhGLFVBQUFDLFNBQUFDLFFBQUEsR0FBQUMsR0FBQSxZQUFBVCxNQUFBLGVBQUFFLE1BQUEsQ0FBQTtBQUNBLFlBQUFzRixVQUFBbEYsUUFBQStGLEtBQUEsY0FBQWxHLFFBQUEsV0FBQTtBQUNBLFlBQUFvRixVQUFBakYsUUFBQStGLEtBQUEsQ0FBQSxpQkFBQSxDQUFBO0FBQ0FiLGdCQUFBRSxJQUFBLENBQUEsT0FBQSxFQUFBLHdCQUFBO0FBQ0FKLDBCQUFBLElBQUFnQixhQUFBQyxXQUFBLEVBQUE7QUFDQSxTQUZBLEVBR0E5QyxJQUhBLENBR0EsWUFBQTtBQUNBNEIscUJBQUFDLFdBQUEsRUFBQUMsT0FBQSxFQUFBQyxPQUFBO0FBQ0EsU0FMQTtBQU1BLEtBWkE7O0FBY0F2RixzQkFBQXVHLGVBQUEsR0FBQSxVQUFBckcsUUFBQSxFQUFBc0csTUFBQSxFQUFBdkcsTUFBQSxFQUFBRixNQUFBLEVBQUE7QUFDQSxZQUFBTSxVQUFBQyxTQUFBQyxRQUFBLEdBQUFDLEdBQUEsWUFBQVQsTUFBQSxlQUFBRSxNQUFBLENBQUE7QUFDQSxZQUFBd0csZUFBQXBHLFFBQUErRixLQUFBLGNBQUFsRyxRQUFBLGNBQUFzRyxNQUFBLENBQUE7QUFDQSxZQUFBRSxZQUFBckcsUUFBQStGLEtBQUEsQ0FBQSxxQkFBQSxDQUFBO0FBQ0FPLG1DQUFBRixZQUFBLEVBQUFDLFNBQUEsRUFDQWxELElBREEsQ0FDQTtBQUFBLG1CQUFBa0QsVUFBQU4sS0FBQSxDQUFBSSxNQUFBLEVBQUFJLEdBQUEsQ0FBQTtBQUNBQyw2QkFBQTNHO0FBREEsYUFBQSxDQUFBO0FBQUEsU0FEQTtBQUlBLEtBUkE7O0FBVUEsV0FBQUYsaUJBQUE7QUFHQSxDQTlDQTtBQ0FBbEMsSUFBQW1ILE9BQUEsQ0FBQSxhQUFBLEVBQUEsVUFBQUMsS0FBQSxFQUFBQyxVQUFBLEVBQUFwRyxhQUFBLEVBQUE7O0FBRUEsUUFBQStILFNBQUE7QUFDQUMsZ0JBQUEsZUFEQTtBQUVBQyxlQUFBLGVBRkE7QUFHQUMsZ0JBQUEsY0FIQTtBQUlBQyxhQUFBO0FBSkEsS0FBQTtBQU1BLFFBQUFDLFlBQUFMLE9BQUFHLE1BQUE7O0FBR0E7QUFDQSxRQUFBdEgsY0FBQSxFQUFBO0FBQ0FBLGdCQUFBaUMsWUFBQSxHQUFBLFVBQUE2QyxVQUFBLEVBQUE7QUFDQTtBQUNBLFlBQUExRSxTQUFBaEIsY0FBQXFJLElBQUEsQ0FBQWhILEVBQUEsSUFBQSxDQUFBO0FBQ0EsWUFBQWlILFlBQUF0SSxjQUFBb0IsSUFBQSxDQUFBQyxFQUFBLElBQUEsQ0FBQTtBQUNBLGVBQUE4RSxNQUFBb0MsSUFBQSxhQUFBSCxTQUFBLHNCQUFBO0FBQ0FwRyxrQkFBQTBELFdBQUExRCxJQUFBLElBQUEsY0FEQTtBQUVBaEIsb0JBQUFBLE1BRkE7QUFHQXNILHVCQUFBQSxTQUhBO0FBSUFFLHlCQUFBeEksY0FBQW9CLElBQUEsQ0FBQVksSUFBQSxJQUFBLEtBSkEsRUFJQTtBQUNBRCxzQkFBQTJEO0FBTEEsU0FBQSxFQU9BakIsSUFQQSxDQU9BLGVBQUE7QUFDQSxnQkFBQXZELFNBQUF1SCxJQUFBQyxJQUFBO0FBQ0EsZ0JBQUFwSCxVQUFBQyxTQUFBQyxRQUFBLEdBQUFDLEdBQUEsYUFBQVQsTUFBQSxlQUFBRSxNQUFBLENBQUE7QUFDQUksb0JBQUFJLEVBQUEsQ0FBQSxPQUFBLEVBQUEsb0JBQUE7QUFDQTBFLDJCQUFBdUMsVUFBQSxDQUFBLGFBQUEsRUFBQUMsU0FBQS9HLEdBQUEsRUFBQTtBQUNBLGFBRkE7QUFHQSxtQkFBQVgsTUFBQTtBQUNBLFNBZEEsQ0FBQTtBQWVBLEtBbkJBO0FBb0JBO0FBQ0FOLGdCQUFBMkUsZ0JBQUEsR0FBQSxVQUFBbEUsRUFBQSxFQUFBO0FBQ0EsZUFBQThFLE1BQUEwQyxHQUFBLGFBQUFULFNBQUEsd0JBQUEvRyxFQUFBLGFBQ0FvRCxJQURBLENBQ0E7QUFBQSxtQkFBQWdFLElBQUFDLElBQUE7QUFBQSxTQURBLENBQUE7QUFFQSxLQUhBOztBQUtBO0FBQ0E7QUFDQTlILGdCQUFBbUYsYUFBQSxHQUFBLFVBQUE3RSxNQUFBLEVBQUFQLEtBQUEsRUFBQTtBQUNBb0MsZ0JBQUFDLEdBQUEsQ0FBQSxxQkFBQTtBQUNBLFlBQUE4RixXQUFBLEVBQUE7QUFDQSxhQUFBLElBQUF0RCxNQUFBLElBQUE3RSxLQUFBLEVBQUE7QUFDQW1JLHFCQUFBQyxJQUFBLENBQUF2RCxNQUFBO0FBQ0E7QUFDQSxlQUFBVyxNQUFBb0MsSUFBQSxhQUFBSCxTQUFBLHdCQUFBbEgsTUFBQSxhQUFBO0FBQ0EscUJBQUE0SDtBQURBLFNBQUEsQ0FBQTtBQUdBLEtBVEE7O0FBV0FsSSxnQkFBQXlDLFlBQUEsR0FBQSxVQUFBbkMsTUFBQSxFQUFBO0FBQ0EsWUFBQUYsU0FBQWhCLGNBQUFxSSxJQUFBLENBQUFoSCxFQUFBO0FBQ0EsWUFBQUYsV0FBQW5CLGNBQUFvQixJQUFBLENBQUFDLEVBQUE7QUFDQSxZQUFBMkgsYUFBQWhKLGNBQUFvQixJQUFBLENBQUFZLElBQUE7QUFDQSxZQUFBaUgsWUFBQTFILFNBQUFDLFFBQUEsR0FBQUMsR0FBQSxZQUFBVCxNQUFBLGVBQUFFLE1BQUEsaUJBQUFDLFFBQUEsQ0FBQTtBQUNBOEgsa0JBQUFwQixHQUFBLENBQUE7QUFDQTdGLGtCQUFBZ0g7QUFEQSxTQUFBO0FBR0EsWUFBQTFILFVBQUFDLFNBQUFDLFFBQUEsR0FBQUMsR0FBQSxZQUFBVCxNQUFBLGVBQUFFLE1BQUEsQ0FBQTtBQUNBSSxnQkFBQUksRUFBQSxDQUFBLE9BQUEsRUFBQSxvQkFBQTtBQUNBMEUsdUJBQUF1QyxVQUFBLENBQUEsYUFBQSxFQUFBQyxTQUFBL0csR0FBQSxFQUFBO0FBQ0EsU0FGQTtBQUdBc0UsY0FBQW9DLElBQUEsYUFBQUgsU0FBQSx3QkFBQWxILE1BQUEsa0JBQUFDLFFBQUE7QUFDQSxLQWJBOztBQWVBUCxnQkFBQUUsZ0JBQUEsR0FBQSxVQUFBTyxFQUFBLEVBQUE7QUFDQSxZQUFBTCxTQUFBLE9BQUFLLEVBQUEsS0FBQSxRQUFBLEdBQUFyQixjQUFBcUksSUFBQSxDQUFBaEgsRUFBQSxHQUFBQSxFQUFBLENBREEsQ0FDQTtBQUNBLGVBQUE4RSxNQUFBMEMsR0FBQSxhQUFBVCxTQUFBLDZCQUFBcEgsTUFBQSxFQUNBeUQsSUFEQSxDQUNBO0FBQUEsbUJBQUFnRSxJQUFBQyxJQUFBO0FBQUEsU0FEQSxDQUFBO0FBR0EsS0FMQTs7QUFRQTlILGdCQUFBc0ksZ0JBQUEsR0FBQSxVQUFBaEksTUFBQSxFQUFBO0FBQ0EsZUFBQWlGLE1BQUEwQyxHQUFBLGFBQUFULFNBQUEsd0JBQUFsSCxNQUFBLFlBQUE7QUFDQSxLQUZBOztBQU1BTixnQkFBQXVJLGVBQUEsR0FBQSxVQUFBakksTUFBQSxFQUFBRixNQUFBLEVBQUE7QUFDQUEsaUJBQUFBLFVBQUFoQixjQUFBcUksSUFBQSxDQUFBaEgsRUFBQTtBQUNBLFlBQUErSCxXQUFBN0gsU0FBQUMsUUFBQSxHQUFBQyxHQUFBLFlBQUFULE1BQUEsZUFBQUUsTUFBQSxDQUFBO0FBQ0EsZUFBQWtJLFNBQUExQyxJQUFBLENBQUEsT0FBQSxFQUFBakMsSUFBQSxDQUFBLG9CQUFBO0FBQ0EsbUJBQUFtRSxTQUFBL0csR0FBQSxFQUFBO0FBQ0EsU0FGQSxDQUFBO0FBR0EsS0FOQTs7QUFRQWpCLGdCQUFBOEIsZ0JBQUEsR0FBQSxVQUFBMUIsTUFBQSxFQUFBO0FBQ0FBLGlCQUFBQSxVQUFBaEIsY0FBQXFJLElBQUEsQ0FBQWhILEVBQUE7QUFDQSxlQUFBOEUsTUFBQTBDLEdBQUEsYUFBQVQsU0FBQSxnQ0FBQXBILE1BQUEsRUFDQXlELElBREEsQ0FDQTtBQUFBLG1CQUFBZ0UsSUFBQUMsSUFBQTtBQUFBLFNBREEsRUFFQXZCLEtBRkEsQ0FFQTtBQUFBLG1CQUFBcEUsUUFBQUMsR0FBQSxDQUFBb0UsR0FBQSxDQUFBO0FBQUEsU0FGQSxDQUFBO0FBR0EsS0FMQTs7QUFPQXhHLGdCQUFBeUksY0FBQSxHQUFBLFVBQUFDLE1BQUEsRUFBQTtBQUNBLGVBQUFuRCxNQUFBMEMsR0FBQSxhQUFBVCxTQUFBLGdDQUFBa0IsTUFBQSxFQUNBN0UsSUFEQSxDQUNBO0FBQUEsbUJBQUFnRSxJQUFBQyxJQUFBO0FBQUEsU0FEQSxFQUVBdkIsS0FGQSxDQUVBO0FBQUEsbUJBQUFwRSxRQUFBQyxHQUFBLENBQUFvRSxHQUFBLENBQUE7QUFBQSxTQUZBLENBQUE7QUFHQSxLQUpBO0FBS0EsV0FBQXhHLFdBQUE7QUFDQSxDQXRHQTs7QUNBQTdCLElBQUFtSCxPQUFBLENBQUEsYUFBQSxFQUFBLFVBQUFDLEtBQUEsRUFBQW5HLGFBQUEsRUFBQTtBQUNBLFFBQUErSCxTQUFBO0FBQ0FDLGdCQUFBLGVBREE7QUFFQUMsZUFBQSxlQUZBO0FBR0FDLGdCQUFBLGNBSEE7QUFJQUMsYUFBQTtBQUpBLEtBQUE7O0FBT0EsUUFBQUMsWUFBQUwsT0FBQUcsTUFBQTtBQUNBLFdBQUE7QUFDQXBELGlCQUFBLGlCQUFBQyxJQUFBLEVBQUE7QUFBQTs7QUFDQSxtQkFBQW9CLE1BQUE7QUFDQW9ELHdCQUFBLE1BREE7QUFFQWhKLGlDQUFBNkgsU0FBQSxvQkFGQTtBQUdBb0IseUJBQUE7QUFDQSxvQ0FBQTtBQURBLGlCQUhBO0FBTUFkLHNCQUFBM0Q7QUFOQSxhQUFBLEVBUUFOLElBUkEsQ0FRQSxlQUFBO0FBQ0Esc0JBQUFnRixlQUFBLENBQUFoQixJQUFBQyxJQUFBLENBQUF0SCxJQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUFxSCxJQUFBQyxJQUFBLENBQUFMLElBQUEsQ0FBQSxDQUFBLENBQUE7QUFDQSxhQVZBLENBQUE7QUFXQSxTQWJBO0FBY0E3RCx1QkFBQSx5QkFBQTtBQUNBLG1CQUFBMkIsTUFBQTBDLEdBQUEsYUFBQVQsU0FBQSxzQkFDQTNELElBREEsQ0FDQSxlQUFBO0FBQ0EsdUJBQUFnRSxJQUFBQyxJQUFBO0FBQ0EsYUFIQSxDQUFBO0FBSUEsU0FuQkE7QUFvQkFnQixzQkFBQSx3QkFBQTtBQUNBLG1CQUFBdkQsTUFBQTBDLEdBQUEsQ0FBQSxzQ0FBQSxDQUFBO0FBQ0EsU0F0QkE7O0FBd0JBWSx5QkFBQSx5QkFBQXJJLElBQUEsRUFBQWlILElBQUEsRUFBQTtBQUNBckksMEJBQUFvQixJQUFBLEdBQUFBLElBQUE7QUFDQXBCLDBCQUFBcUksSUFBQSxHQUFBQSxJQUFBO0FBQ0EsU0EzQkE7O0FBNkJBbkksZ0JBQUEsa0JBQUE7QUFDQUYsMEJBQUEySixNQUFBO0FBQ0E7QUEvQkEsS0FBQTtBQWlDQSxDQTFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW9uaWMgU3RhcnRlciBBcHBcblxuLy8gYW5ndWxhci5tb2R1bGUgaXMgYSBnbG9iYWwgcGxhY2UgZm9yIGNyZWF0aW5nLCByZWdpc3RlcmluZyBhbmQgcmV0cmlldmluZyBBbmd1bGFyIG1vZHVsZXNcbi8vICdzdGFydGVyJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xuXG53aW5kb3cuYXBwID0gYW5ndWxhci5tb2R1bGUoJ0JsYW5rQWdhaW5zdEh1bWFuaXR5JywgWydpb25pYycsICd1aS5yb3V0ZXInLCAnbmdDb3Jkb3ZhJywgJ25nQ29yZG92YU9hdXRoJywgJ25nU3RvcmFnZScsICduZ0FuaW1hdGUnXSlcblxuXG5hcHAucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtKSB7XG4gICAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICAgICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAgICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuXG4gICAgICAgICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcbiAgICAgICAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxuICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgICAgICAgIFN0YXR1c0Jhci5zdHlsZUxpZ2h0Q29udGVudCgpXG4gICAgICAgIH1cbiAgICB9KTtcblxufSlcblxuIiwiYXBwLmNvbnRyb2xsZXIoJ0xvZ291dEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIFVzZXJGYWN0b3J5LCAkc3RhdGUsICRsb2NhbFN0b3JhZ2UsICR0aW1lb3V0KXtcblx0JHNjb3BlLmxvZ091dCA9IGZ1bmN0aW9uKCl7XG5cdFx0VXNlckZhY3RvcnkubG9nT3V0KClcblx0XHQkc3RhdGUuZ28oJ2xvZ2luJylcblx0fVxufSkiLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKXtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2NhcmRzJywge1xuXHRcdHVybDogJy9jYXJkcycsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9jYXJkcy10ZXN0L2NhcmRzLXRlc3QuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0NhcmRzVGVzdEN0cmwnXG5cdH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignQ2FyZHNUZXN0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSl7XG4gXHQkc2NvcGUuZ3JlZXRpbmcgPSBcIkhJXCJcbn0pIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIpID0+IHtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2RlY2tzJywge1xuXHRcdHVybDogJ2RlY2tzLzp0ZWFtaWQnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvZGVja3MvZGVja3MuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0RlY2tDdHJsJyxcblx0XHRyZXNvbHZlOiB7XG5cdFx0XHRkZWNrczogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoc3RhdGVQYXJhbXMudGVhbUlkKVxuXHRcdH1cblx0fSlcblxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0RlY2tDdHJsJywgKCRzY29wZSkgPT4ge1xuXG5cblx0XG59KSIsIi8vIChmdW5jdGlvbiAoKSB7XG5cbi8vICAgICAndXNlIHN0cmljdCc7XG5cbi8vICAgICAvLyBIb3BlIHlvdSBkaWRuJ3QgZm9yZ2V0IEFuZ3VsYXIhIER1aC1kb3kuXG4vLyAgICAgaWYgKCF3aW5kb3cuYW5ndWxhcikgdGhyb3cgbmV3IEVycm9yKCdJIGNhblxcJ3QgZmluZCBBbmd1bGFyIScpO1xuXG4vLyAgICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdmc2FQcmVCdWlsdCcsIFtdKTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdTb2NrZXQnLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgIGlmICghd2luZG93LmlvKSB0aHJvdyBuZXcgRXJyb3IoJ3NvY2tldC5pbyBub3QgZm91bmQhJyk7XG4vLyAgICAgICAgIHJldHVybiB3aW5kb3cuaW8od2luZG93LmxvY2F0aW9uLm9yaWdpbik7XG4vLyAgICAgfSk7XG5cbi8vICAgICAvLyBBVVRIX0VWRU5UUyBpcyB1c2VkIHRocm91Z2hvdXQgb3VyIGFwcCB0b1xuLy8gICAgIC8vIGJyb2FkY2FzdCBhbmQgbGlzdGVuIGZyb20gYW5kIHRvIHRoZSAkcm9vdFNjb3BlXG4vLyAgICAgLy8gZm9yIGltcG9ydGFudCBldmVudHMgYWJvdXQgYXV0aGVudGljYXRpb24gZmxvdy5cbi8vICAgICBhcHAuY29uc3RhbnQoJ0FVVEhfRVZFTlRTJywge1xuLy8gICAgICAgICBsb2dpblN1Y2Nlc3M6ICdhdXRoLWxvZ2luLXN1Y2Nlc3MnLFxuLy8gICAgICAgICBsb2dpbkZhaWxlZDogJ2F1dGgtbG9naW4tZmFpbGVkJyxcbi8vICAgICAgICAgbG9nb3V0U3VjY2VzczogJ2F1dGgtbG9nb3V0LXN1Y2Nlc3MnLFxuLy8gICAgICAgICBzZXNzaW9uVGltZW91dDogJ2F1dGgtc2Vzc2lvbi10aW1lb3V0Jyxcbi8vICAgICAgICAgbm90QXV0aGVudGljYXRlZDogJ2F1dGgtbm90LWF1dGhlbnRpY2F0ZWQnLFxuLy8gICAgICAgICBub3RBdXRob3JpemVkOiAnYXV0aC1ub3QtYXV0aG9yaXplZCdcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdBdXRoSW50ZXJjZXB0b3InLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHEsIEFVVEhfRVZFTlRTKSB7XG4vLyAgICAgICAgIHZhciBzdGF0dXNEaWN0ID0ge1xuLy8gICAgICAgICAgICAgNDAxOiBBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLFxuLy8gICAgICAgICAgICAgNDAzOiBBVVRIX0VWRU5UUy5ub3RBdXRob3JpemVkLFxuLy8gICAgICAgICAgICAgNDE5OiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCxcbi8vICAgICAgICAgICAgIDQ0MDogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXRcbi8vICAgICAgICAgfTtcbi8vICAgICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgICAgIHJlc3BvbnNlRXJyb3I6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChzdGF0dXNEaWN0W3Jlc3BvbnNlLnN0YXR1c10sIHJlc3BvbnNlKTtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlc3BvbnNlKVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9O1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLmNvbmZpZyhmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xuLy8gICAgICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKFtcbi8vICAgICAgICAgICAgICckaW5qZWN0b3InLFxuLy8gICAgICAgICAgICAgZnVuY3Rpb24gKCRpbmplY3Rvcikge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkaW5qZWN0b3IuZ2V0KCdBdXRoSW50ZXJjZXB0b3InKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgXSk7XG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuc2VydmljZSgnQXV0aFNlcnZpY2UnLCBmdW5jdGlvbiAoJGh0dHAsIFNlc3Npb24sICRyb290U2NvcGUsIEFVVEhfRVZFTlRTLCAkcSkge1xuXG4vLyAgICAgICAgIGZ1bmN0aW9uIG9uU3VjY2Vzc2Z1bExvZ2luKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICB2YXIgdXNlciA9IHJlc3BvbnNlLmRhdGEudXNlcjtcbi8vICAgICAgICAgICAgIFNlc3Npb24uY3JlYXRlKHVzZXIpO1xuLy8gICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ2luU3VjY2Vzcyk7XG4vLyAgICAgICAgICAgICByZXR1cm4gdXNlcjtcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIC8vIFVzZXMgdGhlIHNlc3Npb24gZmFjdG9yeSB0byBzZWUgaWYgYW5cbi8vICAgICAgICAgLy8gYXV0aGVudGljYXRlZCB1c2VyIGlzIGN1cnJlbnRseSByZWdpc3RlcmVkLlxuLy8gICAgICAgICB0aGlzLmlzQXV0aGVudGljYXRlZCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAhIVNlc3Npb24udXNlcjtcbi8vICAgICAgICAgfTtcblxuICAgICAgICBcbi8vICAgICAgICAgdGhpcy5pc0FkbWluID0gZnVuY3Rpb24odXNlcklkKXtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdydW5uaW5nIGFkbWluIGZ1bmMnKVxuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKVxuLy8gICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YS51c2VyLmlzQWRtaW4pXG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICB0aGlzLmdldExvZ2dlZEluVXNlciA9IGZ1bmN0aW9uIChmcm9tU2VydmVyKSB7XG5cbi8vICAgICAgICAgICAgIC8vIElmIGFuIGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbiBleGlzdHMsIHdlXG4vLyAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIHVzZXIgYXR0YWNoZWQgdG8gdGhhdCBzZXNzaW9uXG4vLyAgICAgICAgICAgICAvLyB3aXRoIGEgcHJvbWlzZS4gVGhpcyBlbnN1cmVzIHRoYXQgd2UgY2FuXG4vLyAgICAgICAgICAgICAvLyBhbHdheXMgaW50ZXJmYWNlIHdpdGggdGhpcyBtZXRob2QgYXN5bmNocm9ub3VzbHkuXG5cbi8vICAgICAgICAgICAgIC8vIE9wdGlvbmFsbHksIGlmIHRydWUgaXMgZ2l2ZW4gYXMgdGhlIGZyb21TZXJ2ZXIgcGFyYW1ldGVyLFxuLy8gICAgICAgICAgICAgLy8gdGhlbiB0aGlzIGNhY2hlZCB2YWx1ZSB3aWxsIG5vdCBiZSB1c2VkLlxuXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSAmJiBmcm9tU2VydmVyICE9PSB0cnVlKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLndoZW4oU2Vzc2lvbi51c2VyKTtcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgLy8gTWFrZSByZXF1ZXN0IEdFVCAvc2Vzc2lvbi5cbi8vICAgICAgICAgICAgIC8vIElmIGl0IHJldHVybnMgYSB1c2VyLCBjYWxsIG9uU3VjY2Vzc2Z1bExvZ2luIHdpdGggdGhlIHJlc3BvbnNlLlxuLy8gICAgICAgICAgICAgLy8gSWYgaXQgcmV0dXJucyBhIDQwMSByZXNwb25zZSwgd2UgY2F0Y2ggaXQgYW5kIGluc3RlYWQgcmVzb2x2ZSB0byBudWxsLlxuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKS50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKS5jYXRjaChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4vLyAgICAgICAgICAgICB9KTtcblxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbiAoY3JlZGVudGlhbHMpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvbG9naW4nLCBjcmVkZW50aWFscylcbi8vICAgICAgICAgICAgICAgICAudGhlbihvblN1Y2Nlc3NmdWxMb2dpbilcbi8vICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHsgbWVzc2FnZTogJ0ludmFsaWQgbG9naW4gY3JlZGVudGlhbHMuJ30pO1xuLy8gICAgICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMuc2lnbnVwID0gZnVuY3Rpb24oY3JlZGVudGlhbHMpe1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbi8vICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbi8vICAgICAgICAgICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbi8vICAgICAgICAgICAgICAgICBkYXRhOiBjcmVkZW50aWFsc1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQuZGF0YSlcbi8vICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbigpe1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3Qoe21lc3NhZ2U6ICdUaGF0IGVtYWlsIGlzIGFscmVhZHkgYmVpbmcgdXNlZC4nfSk7XG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL2xvZ291dCcpLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgIFNlc3Npb24uZGVzdHJveSgpO1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dvdXRTdWNjZXNzKTtcbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuc2VydmljZSgnU2Vzc2lvbicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUykge1xuXG4vLyAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuLy8gICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICBzZWxmLmRlc3Ryb3koKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuXG4vLyAgICAgICAgIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24gKHVzZXIpIHtcbi8vICAgICAgICAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcbi8vICAgICAgICAgfTtcblxuLy8gICAgIH0pO1xuXG4vLyB9KCkpO1xuIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIpID0+IHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdnYW1lJywge1xuICAgICAgICB1cmw6ICcvZ2FtZS86Z2FtZUlkJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL2dhbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdHYW1lQ3RybCcsXG4gICAgICAgIC8vIHJlc29sdmU6IHtcbiAgICAgICAgLy8gICAgIGdhbWUgOiAoR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcykgPT4gR2FtZUZhY3RvcnkuZ2V0R2FtZUJ5R2FtZUlkKCRzdGF0ZVBhcmFtcy5nYW1lSWQpXG4gICAgICAgIC8vIH0gIFxuICAgIH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignR2FtZUN0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zLCAkbG9jYWxTdG9yYWdlLCBBY3RpdmVHYW1lRmFjdG9yeSkgPT4geyAgIFxuICAgIC8vIGNvbnN0IGdhbWVJZCA9ICRzdGF0ZVBhcmFtcy5nYW1lSWQ7XG4gICAgY29uc3QgZ2FtZUlkID0gMzI7XG4gICAgY29uc3QgcGxheWVySWQgPSAkbG9jYWxTdG9yYWdlLnVzZXIuaWQ7XG4gICAgY29uc3QgdGVhbUlkID0gMjsgXG4gICAgLy8gY29uc3QgdGVhbUlkID0gJGxvY2FsU3RvcmFnZS50ZWFtLmlkXG4gICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9L2ApO1xuICAgIGdhbWVSZWYub24oJ3ZhbHVlJywgZ2FtZVNuYXBzaG90ID0+IHtcbiAgICAgICAgJHNjb3BlLmdhbWUgPSBnYW1lU25hcHNob3QudmFsKCk7XG4gICAgICAgICRzY29wZS5nYW1lTmFtZSA9ICRzY29wZS5nYW1lLnNldHRpbmdzLm5hbWU7XG4gICAgfSlcblxuICAgIEFjdGl2ZUdhbWVGYWN0b3J5LnJlZmlsbE15SGFuZChnYW1lSWQsIHBsYXllcklkLCB0ZWFtSWQpXG4gICAgJHNjb3BlLnBsYXllckhhbmQgPSAkc2NvcGUuZ2FtZS5wbGF5ZXJzW3BsYXllcklkXS5oYW5kO1xuXG4gICAgJHNjb3BlLnNob3dDYXJkcyA9IGZhbHNlO1xuXG4gICAgJHNjb3BlLm9uU3dpcGVEb3duID0gKCkgPT4ge1xuICAgICAgICAgICAgICRzY29wZS5zaG93Q2FyZHMgPSB0cnVlIDtcbiAgICAgICAgICAgICAkc2NvcGUuJGV2YWxBc3luYygpO1xuICAgIH0gIFxufSlcblxuXG4vLyBhcHAuY29udHJvbGxlcihcIkFjdGl2ZUdhbWVDdHJsXCIsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCBBY3RpdmVHYW1lRmFjdG9yeSwgZ2FtZSwgJHN0YXRlUGFyYW1zLCAkbG9jYWxTdG9yYWdlLCAkc3RhdGUpID0+IHtcblxuICAgIFxuLy8gICAgICRzY29wZS5vblN3aXBlRG93biA9ICgpID0+IHtcbi8vICAgICAgICAgY29uc29sZS5sb2coJ3dvcmtpbmcnKTtcbi8vICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnNob3dDYXJkcyk7XG4vLyAgICAgICAgICRzY29wZS5zaG93Q2FyZHMgPSB0cnVlIDtcbi8vICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnNob3dDYXJkcyk7XG4vLyAgICAgICAgICRzY29wZS4kZXZhbEFzeW5jKCk7XG4vLyAgICAgfVxuXG4vLyAgICAgJHNjb3BlLm9uU3dpcGVVcCA9ICgpID0+IHtcbi8vICAgICAgICAgY29uc29sZS5sb2coXCJzd2lwZWQgdXBcIik7XG4vLyAgICAgfVxuXG4vLyAgICAgJHNjb3BlLm9uRG91YmxlVGFwID0gKGtleSkgPT4ge1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhcImRvdWJsZSB0YXBwZWRcIilcbi8vICAgICAgICAgJHNjb3BlLnBsYXllZCA9IHRydWU7XG4vLyAgICAgICAgIC8vY2FsbCBzdWJtaXQgY2FyZCBmdW5jdGlvbiBoZXJlLlxuLy8gICAgIH1cblxuLy8gICAgIEFjdGl2ZUdhbWVGYWN0b3J5LnJlZmlsbE15SGFuZCgkc2NvcGUuZ2FtZUlkLCAkc2NvcGUucGxheWVySWQsICRzY29wZS50ZWFtSWQpO1xuXG4vLyAgICAgJHNjb3BlLiRvbignY2hhbmdlZEdhbWUnLCAoZXZlbnQsc25hcHNob3QpID0+e1xuLy8gICAgICAgICAkc2NvcGUuZ2FtZSA9IHNuYXBzaG90O1xuLy8gICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuZ2FtZSk7XG4vLyAgICAgICAgIGlmKGdhbWUuc3RhdGUgPT09ICdzdWJtaXNzaW9uJyl7XG4vLyAgICAgICAgICAgICAkc3RhdGUuZ28oJ2dhbWUuc3VibWlzc2lvbi1nYW1lJylcbi8vICAgICAgICAgfSBcbi8vICAgICB9KVxuLy8gfSlcblxuXG5cbiIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lJywge1xuICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9ob21lL2hvbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGdhbWVzOiBmdW5jdGlvbihHYW1lRmFjdG9yeSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VGVhbUlkKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignSG9tZUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSwgJGNvcmRvdmFPYXV0aCwgVXNlckZhY3RvcnksIEdhbWVGYWN0b3J5LCAkbG9jYWxTdG9yYWdlLCBnYW1lcywgJGlvbmljUG9wdXApIHtcbiAgICAkc2NvcGUuc3RhcnROZXdHYW1lID0gR2FtZUZhY3Rvcnkuc3RhcnROZXdHYW1lO1xuICAgICRzY29wZS5zdG9yYWdlID0gJGxvY2FsU3RvcmFnZTtcbiAgICAkc2NvcGUuZ2FtZXMgPSBnYW1lcztcblxuICAgIGNvbnNvbGUubG9nKFwiZ2FtZXNcIiwgSlNPTi5zdHJpbmdpZnkoJHNjb3BlLmdhbWVzKSlcbiAgICAkc2NvcGUuZ29Ub05ld0dhbWUgPSAoKSA9PiB7XG4gICAgICAgICRzdGF0ZS5nbygnbmV3LWdhbWUubWFpbicpXG4gICAgfVxuXG5cbiAgICAkc2NvcGUuam9pbkdhbWUgPSBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWQ7XG5cbiAgICAkc2NvcGUuc2hvd1BvcHVwID0gZnVuY3Rpb24oZ2FtZUlkKSB7XG5cbiAgICAgICAgJHNjb3BlLmdhbWUgPSAkc2NvcGUuZ2FtZXNbZ2FtZUlkXTtcbiAgICAgICAgJHNjb3BlLmdhbWVOYW1lID0gJHNjb3BlLmdhbWUuc2V0dGluZ3MubmFtZTtcbiAgICAgICAgJHNjb3BlLnBsYXllckNvdW50ID0gT2JqZWN0LmtleXMoJHNjb3BlLmdhbWUucGxheWVycykubGVuZ3RoO1xuICAgICAgICAkc2NvcGUud2FpdGluZ0ZvclBsYXllcnMgPSAgKCRzY29wZS5nYW1lLnNldHRpbmdzLm1pblBsYXllcnMgfHwgNCkgLSAkc2NvcGUucGxheWVyQ291bnQ7XG4gICAgICAgICBcbiAgICAgICAgIGNvbnN0IG15UG9wdXAgPSAkaW9uaWNQb3B1cC5zaG93KHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnanMvaG9tZS9wb3B1cC5odG1sJyxcbiAgICAgICAgICAgIHRpdGxlOiAnSm9pbiAnICsgJHNjb3BlLmdhbWVOYW1lLFxuICAgICAgICAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAgICAgICAgIGJ1dHRvbnM6IFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIHt0ZXh0OiAnR28gYmFjayd9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0pvaW4gZ2FtZScsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdidXR0b24tYmFsYW5jZWQnLFxuICAgICAgICAgICAgICAgICAgICBvblRhcDogZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuam9pbkdhbWUoZ2FtZUlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnZ2FtZS5hY3RpdmUtZ2FtZScsIHsgZ2FtZUlkOiBnYW1lSWQgfSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSlcbiAgICB9XG59KVxuXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbG9naW4nLCB7XG4gICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbG9naW4vbG9naW4uaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdMb2dpbkN0cmwnXG4gICAgfSlcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvbG9naW4nKTtcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdMb2dpbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSwgVXNlckZhY3RvcnksICRjb3Jkb3ZhT2F1dGgsICRsb2NhbFN0b3JhZ2UsICR0aW1lb3V0LCAkaW9uaWNTaWRlTWVudURlbGVnYXRlKSB7XG4gICAgJHNjb3BlLmxvZ2luV2l0aFNsYWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBVc2VyRmFjdG9yeS5nZXRTbGFja0NyZWRzKClcbiAgICAgICAgICAgIC50aGVuKGNyZWRzID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGNvcmRvdmFPYXV0aC5zbGFjayhjcmVkcy5jbGllbnRJRCwgY3JlZHMuY2xpZW50U2VjcmV0LCBbJ2lkZW50aXR5LmJhc2ljJywgJ2lkZW50aXR5LnRlYW0nLCAnaWRlbnRpdHkuYXZhdGFyJ10pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oaW5mbyA9PiBVc2VyRmFjdG9yeS5zZXRVc2VyKGluZm8pKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gJHN0YXRlLmdvKCdob21lJykpXG4gICAgfVxuXG4gICAgJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZS5jYW5EcmFnQ29udGVudChmYWxzZSk7XG5cbiAgICAkc2NvcGUuJG9uKCckaW9uaWNWaWV3LmxlYXZlJywgZnVuY3Rpb24oKSB7ICRpb25pY1NpZGVNZW51RGVsZWdhdGUuY2FuRHJhZ0NvbnRlbnQodHJ1ZSkgfSk7XG5cbiAgICAkc2NvcGUuc3RvcmFnZSA9ICRsb2NhbFN0b3JhZ2VcblxuICAgIGZ1bmN0aW9uIHJlZGlyZWN0VXNlcigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzY29wZSBzdG9yYWdlIHVzZXJcIiwgJHNjb3BlLnN0b3JhZ2UudXNlcilcbiAgICAgICAgaWYgKCRzY29wZS5zdG9yYWdlLnVzZXIpICRzdGF0ZS5nbygnaG9tZScpXG4gICAgfVxuXG4gICAgcmVkaXJlY3RVc2VyKCk7XG59KVxuXG4iLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSA9PiB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbmV3LWdhbWUnLCB7XG4gICAgICAgIHVybDogJy9uZXctZ2FtZScsXG4gICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL21haW4uaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdOZXdHYW1lQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIHRlYW1EZWNrczogKEdhbWVGYWN0b3J5KSA9PiBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkKCksXG4gICAgICAgICAgICBzdGFuZGFyZERlY2s6IChHYW1lRmFjdG9yeSkgPT4gR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCgxKVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIC5zdGF0ZSgnbmV3LWdhbWUubWFpbicsIHtcbiAgICAgICAgdXJsOiAnL3NldHVwLWdhbWUnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL25ldy1nYW1lLmh0bWwnLFxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ25ldy1nYW1lLmFkZC1kZWNrcycsIHtcbiAgICAgICAgdXJsOiAnL2FkZC1kZWNrcycsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvYWRkLWRlY2tzLmh0bWwnLFxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ25ldy1nYW1lLmRlY2snLCB7XG4gICAgICAgIHVybDogJy9kZWNrLzpkZWNrSWQnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL2RlY2suaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdEZWNrQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGNhcmRzOiAoR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcykgPT4gR2FtZUZhY3RvcnkuZ2V0Q2FyZHNCeURlY2tJZCgkc3RhdGVQYXJhbXMuZGVja0lkKVxuICAgICAgICB9XG5cblxuICAgIH0pXG5cbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvbmV3LWdhbWUvc2V0dXAtZ2FtZScpO1xufSlcblxuYXBwLmNvbnRyb2xsZXIoJ05ld0dhbWVDdHJsJywgKCRzY29wZSwgR2FtZUZhY3RvcnksICRzdGF0ZSwgdGVhbURlY2tzLCBzdGFuZGFyZERlY2spID0+IHtcbiAgICAkc2NvcGUuY3VycmVudFZpZXcgPSAnYWRkRGVja3MnXG4gICAgJHNjb3BlLmdhbWVDb25maWcgPSB7fTtcbiAgICAkc2NvcGUuZ2FtZUNvbmZpZy5kZWNrcyA9IHt9O1xuICAgICRzY29wZS5nb1RvRGVja3MgPSAoKSA9PiB7XG4gICAgICAgICRzdGF0ZS5nbygnbmV3LWdhbWUuYWRkLWRlY2tzJywge30sIHsgbG9jYXRpb246IHRydWUsIHJlbG9hZDogdHJ1ZSB9KVxuICAgIH1cblxuICAgICRzY29wZS5kZWNrcyA9IHN0YW5kYXJkRGVjay5jb25jYXQodGVhbURlY2tzKTtcblxuICAgICRzY29wZS5zdGFydE5ld0dhbWUgPSAoZ2FtZUNvbmZpZykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcImNhbGxlZCBzdGFydCBuZXcgZ2FtZVwiKVxuICAgICAgICBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWUoZ2FtZUNvbmZpZykudGhlbigoaWQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibWFkZSBpdCB0byB0aGUgLnRoZW5cIilcbiAgICAgICAgICAgIEdhbWVGYWN0b3J5LmFkZFBpbGVUb0dhbWUoaWQsICRzY29wZS5nYW1lQ29uZmlnLmRlY2tzKVxuICAgICAgICAgICAgJHN0YXRlLmdvKCdnYW1lLmFjdGl2ZS1nYW1lJywgeyBnYW1lSWQ6IGlkIH0pXG5cblxuICAgICAgICB9KVxuICAgIH1cbiAgICAkc2NvcGUuYWRkRGVja3NUb0dhbWUgPSBHYW1lRmFjdG9yeS5hZGREZWNrcztcbiAgICAvLyAkc2NvcGUuJG9uKCdjaGFuZ2VkR2FtZScsIChldmVudCwgZGF0YSkgPT4ge1xuICAgIC8vICAgICBjb25zb2xlLmxvZygncmVjZWl2ZWQgZXZlbnQnKVxuICAgIC8vICAgICBjb25zb2xlLmxvZygnZGF0YSBvYmo6JywgZGF0YSlcbiAgICAvLyAgICAgJHNjb3BlLmdhbWUgPSBkYXRhO1xuICAgIC8vICAgICAkc2NvcGUuJGRpZ2VzdCgpXG5cbiAgICAvLyB9KVxuXG5cbn0pXG5cbmFwcC5jb250cm9sbGVyKCdEZWNrQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkc3RhdGUsIGNhcmRzKSA9PiB7XG4gICAgJHNjb3BlLmNhcmRzID0gY2FyZHNcbn0pXG5cbiIsIi8vRGlyZWN0aXZlIEZpbGUiLCJhcHAuZmFjdG9yeSgnQWN0aXZlR2FtZUZhY3RvcnknLCAoJGh0dHAsICRyb290U2NvcGUsICRsb2NhbFN0b3JhZ2UpID0+IHtcblxuICAgICAgICBjb25zdCBBY3RpdmVHYW1lRmFjdG9yeSA9IHt9O1xuXG4gICAgICAgIGNvbnN0IHJlZmlsbGVyID0gKGNhcmRzTmVlZGVkLCBwaWxlUmVmLCBoYW5kUmVmKSA9PiB7XG4gICAgICAgICAgcGlsZVJlZi5saW1pdFRvRmlyc3QoY2FyZHNOZWVkZWQpLm9uY2UoJ3ZhbHVlJywgY2FyZHNTbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICBjYXJkc1NuYXBzaG90LmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgICAgICAgIGxldCB1cGRhdGVPYmogPSB7fVxuICAgICAgICAgICAgICBjYXJkLnJlZi50cmFuc2FjdGlvbihjYXJkRGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICB1cGRhdGVPYmpbY2FyZC5rZXldID0gY2FyZERhdGFcbiAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBoYW5kUmVmLnVwZGF0ZSh1cGRhdGVPYmopKVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgICAgIH1cblxuICAgICAgICBBY3RpdmVHYW1lRmFjdG9yeS5yZWZpbGxNeUhhbmQgPSAoZ2FtZUlkLCBwbGF5ZXJJZCwgdGVhbUlkKSA9PiB7XG4gICAgICAgICAgLy8gaG93IG1hbnkgY2FyZHMgZG8gSSBuZWVkP1xuICAgICAgICAgIGxldCBjYXJkc05lZWRlZCA9IDBcbiAgICAgICAgICBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAgIGNvbnN0IGhhbmRSZWYgPSBnYW1lUmVmLmNoaWxkKGBwbGF5ZXJzLyR7cGxheWVySWR9L2hhbmRgKVxuICAgICAgICAgIGNvbnN0IHBpbGVSZWYgPSBnYW1lUmVmLmNoaWxkKCdwaWxlL3doaXRlY2FyZHMnKVxuICAgICAgICAgIGhhbmRSZWYub25jZSgndmFsdWUnLCBoYW5kU25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICBjYXJkc05lZWRlZCA9IDcgLSBoYW5kU25hcHNob3QubnVtQ2hpbGRyZW4oKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgcmVmaWxsZXIoY2FyZHNOZWVkZWQsIHBpbGVSZWYsIGhhbmRSZWYpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgQWN0aXZlR2FtZUZhY3Rvcnkuc3VibWl0V2hpdGVDYXJkID0gKHBsYXllcklkLCBjYXJkSWQsIGdhbWVJZCwgdGVhbUlkKSA9PiB7XG4gICAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YCk7XG4gICAgICAgICAgY29uc3QgY2FyZFRvU3VibWl0ID0gZ2FtZVJlZi5jaGlsZChgcGxheWVycy8ke3BsYXllcklkfS9oYW5kLyR7Y2FyZElkfWApO1xuICAgICAgICAgIGNvbnN0IHN1Ym1pdFJlZiA9IGdhbWVSZWYuY2hpbGQoJ3N1Ym1pdHRlZFdoaXRlQ2FyZHMnKTtcbiAgICAgICAgICBmaXJlYmFzZU1vdmVTaW5nbGVLZXlWYWx1ZShjYXJkVG9TdWJtaXQsIHN1Ym1pdFJlZilcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHN1Ym1pdFJlZi5jaGlsZChjYXJkSWQpLnNldCh7XG4gICAgICAgICAgICAgIHN1Ym1pdHRlZEJ5OiBwbGF5ZXJJZFxuICAgICAgICAgICAgfSkpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gQWN0aXZlR2FtZUZhY3Rvcnk7IFxuXG5cbn0pOyIsImFwcC5mYWN0b3J5KCdHYW1lRmFjdG9yeScsICgkaHR0cCwgJHJvb3RTY29wZSwgJGxvY2FsU3RvcmFnZSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IG91cklwcyA9IHtcbiAgICAgICAgICAgIG5pa2l0YTogXCIxOTIuMTY4LjQuMjEzXCIsXG4gICAgICAgICAgICBrYXlsYTogXCIxOTIuMTY4LjQuMjI1XCIsXG4gICAgICAgICAgICBuaXRoeWE6IFwiMTkyLjE2OC4xLjQ4XCIsXG4gICAgICAgICAgICBkYW46IFwiMTkyLjE2OC40LjIzNlwiXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY3VycmVudElwID0gb3VySXBzLm5pdGh5YVxuXG5cbiAgICAgICAgLy8gc3RhcnQgYSBuZXcgZ2FtZSBkZXJwXG4gICAgICAgIGNvbnN0IEdhbWVGYWN0b3J5ID0ge307XG4gICAgICAgIEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZSA9IChnYW1lQ29uZmlnKSA9PiB7XG4gICAgICAgICAgICAvL2NhbiBhbHNvIGdldCBhbGwgdGhlIGRlY2tzIGJ5IHRlYW0gaGVyZSB0byBwcmVwYXJlXG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAkbG9jYWxTdG9yYWdlLnRlYW0uaWQgfHwgMjtcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0b3JJZCA9ICRsb2NhbFN0b3JhZ2UudXNlci5pZCB8fCAzO1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZ2FtZXNgLCB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGdhbWVDb25maWcubmFtZSB8fCAnQVdFU09NRSBOYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgdGVhbUlkOiB0ZWFtSWQsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0b3JJZDogY3JlYXRvcklkLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdG9yTmFtZTogJGxvY2FsU3RvcmFnZS51c2VyLm5hbWUgfHwgJ2RhbicsIC8vbWlnaHQgYmUgdW5uZWNlc3NhcnkgaWYgd2UgaGF2ZSB0aGUgdXNlciBpZFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczogZ2FtZUNvbmZpZ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2FtZUlkID0gcmVzLmRhdGFcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGAvdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICAgICAgICAgIGdhbWVSZWYub24oJ3ZhbHVlJywgc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdjaGFuZ2VkR2FtZScsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdhbWVJZDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9O1xuICAgICAgICAvLyBnZXQgYWxsIG9mIGEgZGVja3MgY2FyZHMgdG8gZGlzcGxheSB3aGVuIGxvb2tpbmcgYXQgZGVja3NcbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0Q2FyZHNCeURlY2tJZCA9IChpZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9kZWNrcy8ke2lkfS9jYXJkc2ApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBUT0RPOiBjb21iaW5lIHRoaXMgaW50byB0aGUgYWJvdmUgc3RhcnROZXdHYW1lIGZ1bmNcbiAgICAgICAgLy8gdGFrZSBhbGwgb2YgdGhlIHNlbGVjdGVkIGRlY2tzJyBjYXJkcyBhbmQgcHV0IHRoZW0gaW4gdGhlIGZpcmViYXNlIGdhbWUgb2JqZWN0IHBpbGUgKHRocm91Z2ggcm91dGUpXG4gICAgICAgIEdhbWVGYWN0b3J5LmFkZFBpbGVUb0dhbWUgPSAoZ2FtZUlkLCBkZWNrcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZGRpbmcgcGlsZSB0byBnYW1lXCIpXG4gICAgICAgICAgICBjb25zdCBkZWNrc0FyciA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgZGVja0lkIGluIGRlY2tzKSB7XG4gICAgICAgICAgICAgICAgZGVja3NBcnIucHVzaChkZWNrSWQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0vZGVja3NgLCB7XG4gICAgICAgICAgICAgICAgJ2RlY2tzJzogZGVja3NBcnJcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAkbG9jYWxTdG9yYWdlLnRlYW0uaWQ7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJJZCA9ICRsb2NhbFN0b3JhZ2UudXNlci5pZDtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllck5hbWUgPSAkbG9jYWxTdG9yYWdlLnVzZXIubmFtZTtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllclJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9L3BsYXllcnMvJHtwbGF5ZXJJZH1gKVxuICAgICAgICAgICAgcGxheWVyUmVmLnNldCh7XG4gICAgICAgICAgICAgICAgbmFtZTogcGxheWVyTmFtZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICBnYW1lUmVmLm9uKCd2YWx1ZScsIHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2NoYW5nZWRHYW1lJywgc25hcHNob3QudmFsKCkpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICRodHRwLnBvc3QoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZ2FtZXMvJHtnYW1lSWR9P3BsYXllcklkPSR7cGxheWVySWR9YClcbiAgICAgICAgfVxuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQgPSAoaWQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRlYW1JZCA9ICh0eXBlb2YgaWQgIT09ICdudW1iZXInKSA/ICRsb2NhbFN0b3JhZ2UudGVhbS5pZCA6IGlkOyAvLyBpZCB8fCBsb2NhbHN0b3JhZ2UgZG9lc24ndCB3b3JrIGJlY2F1c2UgMCBpcyBmYWxzZXlcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZGVja3M/dGVhbT0ke3RlYW1JZH1gKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcblxuICAgICAgICB9O1xuXG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0VXNlcnNCeUdhbWVJZCA9IChnYW1lSWQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZ2FtZXMvJHtnYW1lSWR9L3VzZXJzYCk7XG4gICAgICAgIH07XG5cblxuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVCeUdhbWVJZCA9IChnYW1lSWQsIHRlYW1JZCkgPT4ge1xuICAgICAgICAgICAgdGVhbUlkID0gdGVhbUlkIHx8ICRsb2NhbFN0b3JhZ2UudGVhbS5pZFxuICAgICAgICAgICAgY29uc3QgZ2FtZXNSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICByZXR1cm4gZ2FtZXNSZWYub25jZSgndmFsdWUnKS50aGVuKHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc25hcHNob3QudmFsKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQgPSAodGVhbUlkKSA9PiB7XG4gICAgICAgICAgICB0ZWFtSWQgPSB0ZWFtSWQgfHwgJGxvY2FsU3RvcmFnZS50ZWFtLmlkXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzLz90ZWFtSWQ9JHt0ZWFtSWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlVc2VyID0gKHVzZXJJZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lcy8/dXNlcklkPSR7dXNlcklkfWApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gR2FtZUZhY3Rvcnk7XG4gICAgfVxuXG4pO1xuXG4iLCJhcHAuZmFjdG9yeSgnVXNlckZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCwgJGxvY2FsU3RvcmFnZSkge1xuICAgIGNvbnN0IG91cklwcyA9IHtcbiAgICAgICAgbmlraXRhOiBcIjE5Mi4xNjguNC4yMTNcIixcbiAgICAgICAga2F5bGE6IFwiMTkyLjE2OC40LjIyNVwiLFxuICAgICAgICBuaXRoeWE6IFwiMTkyLjE2OC4xLjQ4XCIsXG4gICAgICAgIGRhbjogXCIxOTIuMTY4LjQuMjM2XCJcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50SXAgPSBvdXJJcHMubml0aHlhXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0VXNlcjogZnVuY3Rpb24oaW5mbykge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgIHVybDogYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvdXNlcnNgLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGluZm9cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TG9jYWxTdG9yYWdlKHJlcy5kYXRhLnVzZXJbMF0sIHJlcy5kYXRhLnRlYW1bMF0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGdldFNsYWNrQ3JlZHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9zbGFja2ApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5kYXRhXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0U2xhY2tJbmZvOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2h0dHBzOi8vc2xhY2suY29tL2FwaS91c2Vycy5pZGVudGl0eScpXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0TG9jYWxTdG9yYWdlOiBmdW5jdGlvbih1c2VyLCB0ZWFtKSB7XG4gICAgICAgICAgICAkbG9jYWxTdG9yYWdlLnVzZXIgPSB1c2VyO1xuICAgICAgICAgICAgJGxvY2FsU3RvcmFnZS50ZWFtID0gdGVhbTtcbiAgICAgICAgfSxcblxuICAgICAgICBsb2dPdXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGxvY2FsU3RvcmFnZS4kcmVzZXQoKTtcbiAgICAgICAgfVxuICAgIH1cbn0pXG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
