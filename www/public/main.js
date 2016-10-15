'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
    $scope.gameId = 57;
    var playerId = $localStorage.user.id;
    var teamId = 2;
    // const teamId = $localStorage.team.id
    var gameRef = firebase.database().ref('teams/' + teamId + '/games/' + $scope.gameId + '/');

    gameRef.on('value', function (gameSnapshot) {
        $scope.game = gameSnapshot.val();
        $scope.gameName = $scope.game.settings.name;
        if ($scope.game.players[playerId].hand) {
            $scope.playerHand = $scope.game.players[playerId].hand;
            $scope.playerHandCount = Object.keys($scope.playerHand).length;
        }
        $scope.blackCard = $scope.game.currentBlackCard[1].text;
        console.log("blackCard", $scope.blackCard);
        $scope.judge = $scope.game.currentJudge;
        $scope.players = $scope.game.players;
        console.log("players", $scope.players);
        console.log("typeof players", _typeof($scope.players));
        $scope.submittedWhiteCards = $scope.game.submittedWhiteCards;
        $scope.$evalAsync();
    });

    $scope.showCards = false;
    $scope.submitted = false;

    $scope.onSwipeDown = function (gameId) {
        GameFactory.joinGameById(gameId).then(function () {
            ActiveGameFactory.refillMyHand($scope.gameId, playerId, teamId);
            $scope.showCards = true;
            console.log($scope.playerHand);
            $scope.$evalAsync();
        });
    };

    $scope.onDoubleTap = function (cardId, cardText) {
        ActiveGameFactory.submitWhiteCard(playerId, cardId, $scope.gameId, teamId, cardText);
        $scope.getSubmittedPlayers();
        $scope.submitted = true;
        $scope.$evalAsync();
        console.log("submitted players", $scope.playersToSubmit);
        console.log("submitted", $scope.submitted);
    };

    $scope.judgeDoubleTap = function (cardId) {
        // if (playerId === judge) {
        ActiveGameFactory.pickWinningWhiteCard(cardId, $scope.gameId, teamId);
        console.log("judging");
        // }
    };

    $scope.getSubmittedPlayers = function () {
        $scope.playersToSubmit = _.keyBy($scope.submittedWhiteCards, function (card) {
            return card.submittedBy;
        });
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

    // $scope.joinGame = GameFactory.joinGameById;

    // $scope.showPopup = function(gameId) {

    //     $scope.game = $scope.games[gameId];
    //     $scope.gameName = $scope.game.settings.name;
    //     $scope.playerCount = Object.keys($scope.game.players).length;
    //     $scope.waitingForPlayers =  ($scope.game.settings.minPlayers || 4) - $scope.playerCount;

    //      const myPopup = $ionicPopup.show({
    //         templateUrl: 'js/home/popup.html',
    //         title: 'Join ' + $scope.gameName,
    //         scope: $scope,
    //         buttons: 
    //         [
    //             {text: 'Go back'},
    //             {
    //                 text: 'Join game',
    //                 type: 'button-balanced',
    //                 onTap: e => {
    //                     $scope.joinGame(gameId);
    //                     $state.go('game.active-game', { gameId: gameId })
    //                 }
    //             }
    //         ]
    //     })
    // }
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
app.directive('submittedCards', function () {

    return {

        restrict: 'E',
        templateUrl: 'js/common/directives/submitted-cards.html',
        controller: 'GameCtrl'
    };
});
app.directive('whiteCards', function () {

    return {

        restrict: 'E',
        templateUrl: 'js/common/directives/white-cards.html',
        controller: 'GameCtrl'
    };
});
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
        console.log("refilling hand");
        var cardsNeeded = 0;
        var gameRef = firebase.database().ref('teams/' + teamId + '/games/' + gameId);
        var handRef = gameRef.child('players/' + playerId + '/hand');
        var pileRef = gameRef.child('pile/whitecards');
        handRef.once('value', function (handSnapshot) {
            cardsNeeded = 7 - handSnapshot.numChildren();
        }).then(function () {
            refiller(cardsNeeded, pileRef, handRef);
            console.log("made it to refiller");
        });
    };

    var firebaseMoveSingleKeyValue = function firebaseMoveSingleKeyValue(oldRef, newRef) {
        var removeUpdate = {};
        var newUpdate = {};
        return oldRef.once('value').catch(function (err) {
            return console.log(err);
        }).then(function (snapshot) {
            removeUpdate[snapshot.key] = null;
            newUpdate[snapshot.key] = snapshot.val();
            return newRef.update(newUpdate);
        }).then(function () {
            return oldRef.parent.update(removeUpdate);
        });
    };

    ActiveGameFactory.submitWhiteCard = function (playerId, cardId, gameId, teamId, cardText) {
        var gameRef = firebase.database().ref('teams/' + teamId + '/games/' + gameId);
        var cardToSubmit = gameRef.child('players/' + playerId + '/hand/' + cardId);
        var submitRef = gameRef.child('submittedWhiteCards');
        firebaseMoveSingleKeyValue(cardToSubmit, submitRef).then(function () {
            submitRef.child(cardId).set({
                submittedBy: playerId,
                text: cardText
            });
        });
    };

    //nikita's updated version
    // ActiveGameFactory.submitWhiteCard = (playerId, cardId, gameId, teamId, cardText) => {
    //   const gameRef = firebase.database().ref(`teams/${teamId}/games/${gameId}`);
    //   const cardToSubmit = gameRef.child(`players/${playerId}/hand/${cardId}/text`);
    //   const submitRef = gameRef.child('submittedWhiteCards');
    //   let text = ''
    //   return cardToSubmit.transaction(cardText => {
    //       text = cardText
    //       return null
    //     })
    //     .then(() => {
    //       let updateObj = {};
    //       updateObj[playerId].text = text;
    //       updateObj[playerId].cardId = cardId
    //       return submitRef.update(updateObj)
    //     })
    //     .then(() => console.log('submission success'))
    //     .catch((err) => console.log(err))
    // }


    ActiveGameFactory.pickWinningWhiteCard = function (cardId, gameId, teamId) {
        var gameRef = firebase.database().ref('teams/' + teamId + '/games/' + gameId);
        var winner = gameRef.child('submittedWhiteCards/' + cardId + '/submittedBy');
        var blackCardId = '';
        var blackCardWon = {};
        winner.once('value').then(function (winnerId) {
            winner = winnerId.val();
        }).then(function () {
            var setRoundStateToOver = gameRef.child('state').set('postround');
            var awardBlackCard = gameRef.child('currentBlackCard').transaction(function (currentBlackCard) {
                blackCardWon = currentBlackCard;
                return null;
            }).then(function () {
                console.log("####BLACK CARD WON", blackCardWon);
                gameRef.child('players/' + winner + '/blackCardsWon').set(blackCardWon).catch(function (err) {
                    console.log(err);
                });
            });
            return Promise.all([setRoundStateToOver, awardBlackCard, gameRef.child('submittedWhiteCards').remove()]);
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
    var currentIp = ourIps.kayla;

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
        return $http.post('http://' + currentIp + ':1337/api/games/' + gameId + '?playerId=' + playerId);
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

    var currentIp = ourIps.kayla;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImNhcmRzLXRlc3QvY2FyZHNUZXN0LmpzIiwiZGVja3MvZGVja3MuanMiLCJmcm9tIGZzZy9mcm9tLWZzZy5qcyIsImdhbWUvZ2FtZS5qcyIsImhvbWUvaG9tZS5qcyIsImxvZ2luL2xvZ2luLmpzIiwibmV3LWdhbWUvbmV3LWdhbWUuanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiLCJjb21tb24vZGlyZWN0aXZlcy9zdWJtaXR0ZWQtY2FyZHMuanMiLCJjb21tb24vZGlyZWN0aXZlcy93aGl0ZS1jYXJkcy5qcyIsImNvbW1vbi9mYWN0b3JpZXMvQWN0aXZlR2FtZUZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yaWVzL0dhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy91c2VyRmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJhcHAiLCJhbmd1bGFyIiwibW9kdWxlIiwicnVuIiwiJGlvbmljUGxhdGZvcm0iLCJyZWFkeSIsImNvcmRvdmEiLCJwbHVnaW5zIiwiS2V5Ym9hcmQiLCJoaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIiLCJkaXNhYmxlU2Nyb2xsIiwiU3RhdHVzQmFyIiwic3R5bGVMaWdodENvbnRlbnQiLCJjb250cm9sbGVyIiwiJHNjb3BlIiwiVXNlckZhY3RvcnkiLCIkc3RhdGUiLCIkbG9jYWxTdG9yYWdlIiwiJHRpbWVvdXQiLCJsb2dPdXQiLCJnbyIsImNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwic3RhdGUiLCJ1cmwiLCJ0ZW1wbGF0ZVVybCIsImdyZWV0aW5nIiwicmVzb2x2ZSIsImRlY2tzIiwiR2FtZUZhY3RvcnkiLCIkc3RhdGVQYXJhbXMiLCJnZXREZWNrc0J5VGVhbUlkIiwic3RhdGVQYXJhbXMiLCJ0ZWFtSWQiLCJBY3RpdmVHYW1lRmFjdG9yeSIsImdhbWVJZCIsInBsYXllcklkIiwidXNlciIsImlkIiwiZ2FtZVJlZiIsImZpcmViYXNlIiwiZGF0YWJhc2UiLCJyZWYiLCJvbiIsImdhbWUiLCJnYW1lU25hcHNob3QiLCJ2YWwiLCJnYW1lTmFtZSIsInNldHRpbmdzIiwibmFtZSIsInBsYXllcnMiLCJoYW5kIiwicGxheWVySGFuZCIsInBsYXllckhhbmRDb3VudCIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJibGFja0NhcmQiLCJjdXJyZW50QmxhY2tDYXJkIiwidGV4dCIsImNvbnNvbGUiLCJsb2ciLCJqdWRnZSIsImN1cnJlbnRKdWRnZSIsInN1Ym1pdHRlZFdoaXRlQ2FyZHMiLCIkZXZhbEFzeW5jIiwic2hvd0NhcmRzIiwic3VibWl0dGVkIiwib25Td2lwZURvd24iLCJqb2luR2FtZUJ5SWQiLCJ0aGVuIiwicmVmaWxsTXlIYW5kIiwib25Eb3VibGVUYXAiLCJjYXJkSWQiLCJjYXJkVGV4dCIsInN1Ym1pdFdoaXRlQ2FyZCIsImdldFN1Ym1pdHRlZFBsYXllcnMiLCJwbGF5ZXJzVG9TdWJtaXQiLCJqdWRnZURvdWJsZVRhcCIsInBpY2tXaW5uaW5nV2hpdGVDYXJkIiwiXyIsImtleUJ5IiwiY2FyZCIsInN1Ym1pdHRlZEJ5IiwiJHVybFJvdXRlclByb3ZpZGVyIiwiZ2FtZXMiLCJnZXRHYW1lc0J5VGVhbUlkIiwiJGNvcmRvdmFPYXV0aCIsIiRpb25pY1BvcHVwIiwic3RhcnROZXdHYW1lIiwic3RvcmFnZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJnb1RvTmV3R2FtZSIsIm90aGVyd2lzZSIsIiRpb25pY1NpZGVNZW51RGVsZWdhdGUiLCJsb2dpbldpdGhTbGFjayIsImdldFNsYWNrQ3JlZHMiLCJzbGFjayIsImNyZWRzIiwiY2xpZW50SUQiLCJjbGllbnRTZWNyZXQiLCJzZXRVc2VyIiwiaW5mbyIsImNhbkRyYWdDb250ZW50IiwiJG9uIiwicmVkaXJlY3RVc2VyIiwiYWJzdHJhY3QiLCJ0ZWFtRGVja3MiLCJzdGFuZGFyZERlY2siLCJjYXJkcyIsImdldENhcmRzQnlEZWNrSWQiLCJkZWNrSWQiLCJjdXJyZW50VmlldyIsImdhbWVDb25maWciLCJnb1RvRGVja3MiLCJsb2NhdGlvbiIsInJlbG9hZCIsImNvbmNhdCIsImFkZFBpbGVUb0dhbWUiLCJhZGREZWNrc1RvR2FtZSIsImFkZERlY2tzIiwiZGlyZWN0aXZlIiwicmVzdHJpY3QiLCJmYWN0b3J5IiwiJGh0dHAiLCIkcm9vdFNjb3BlIiwicmVmaWxsZXIiLCJjYXJkc05lZWRlZCIsInBpbGVSZWYiLCJoYW5kUmVmIiwibGltaXRUb0ZpcnN0Iiwib25jZSIsImNhcmRzU25hcHNob3QiLCJmb3JFYWNoIiwidXBkYXRlT2JqIiwidHJhbnNhY3Rpb24iLCJrZXkiLCJjYXJkRGF0YSIsInVwZGF0ZSIsImNhdGNoIiwiZXJyIiwiY2hpbGQiLCJoYW5kU25hcHNob3QiLCJudW1DaGlsZHJlbiIsImZpcmViYXNlTW92ZVNpbmdsZUtleVZhbHVlIiwib2xkUmVmIiwibmV3UmVmIiwicmVtb3ZlVXBkYXRlIiwibmV3VXBkYXRlIiwic25hcHNob3QiLCJwYXJlbnQiLCJjYXJkVG9TdWJtaXQiLCJzdWJtaXRSZWYiLCJzZXQiLCJ3aW5uZXIiLCJibGFja0NhcmRJZCIsImJsYWNrQ2FyZFdvbiIsIndpbm5lcklkIiwic2V0Um91bmRTdGF0ZVRvT3ZlciIsImF3YXJkQmxhY2tDYXJkIiwiUHJvbWlzZSIsImFsbCIsInJlbW92ZSIsIm91cklwcyIsIm5pa2l0YSIsImtheWxhIiwibml0aHlhIiwiZGFuIiwiY3VycmVudElwIiwidGVhbSIsImNyZWF0b3JJZCIsInBvc3QiLCJjcmVhdG9yTmFtZSIsInJlcyIsImRhdGEiLCIkYnJvYWRjYXN0IiwiZ2V0IiwiZGVja3NBcnIiLCJwdXNoIiwicGxheWVyTmFtZSIsInBsYXllclJlZiIsImdldFVzZXJzQnlHYW1lSWQiLCJnZXRHYW1lQnlHYW1lSWQiLCJnYW1lc1JlZiIsImdldEdhbWVzQnlVc2VyIiwidXNlcklkIiwibWV0aG9kIiwiaGVhZGVycyIsInNldExvY2FsU3RvcmFnZSIsImdldFNsYWNrSW5mbyIsIiRyZXNldCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQUEsT0FBQUMsR0FBQSxHQUFBQyxRQUFBQyxNQUFBLENBQUEsc0JBQUEsRUFBQSxDQUFBLE9BQUEsRUFBQSxXQUFBLEVBQUEsV0FBQSxFQUFBLGdCQUFBLEVBQUEsV0FBQSxFQUFBLFdBQUEsQ0FBQSxDQUFBOztBQUdBRixJQUFBRyxHQUFBLENBQUEsVUFBQUMsY0FBQSxFQUFBO0FBQ0FBLG1CQUFBQyxLQUFBLENBQUEsWUFBQTtBQUNBLFlBQUFOLE9BQUFPLE9BQUEsSUFBQVAsT0FBQU8sT0FBQSxDQUFBQyxPQUFBLENBQUFDLFFBQUEsRUFBQTtBQUNBO0FBQ0E7QUFDQUYsb0JBQUFDLE9BQUEsQ0FBQUMsUUFBQSxDQUFBQyx3QkFBQSxDQUFBLElBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0FILG9CQUFBQyxPQUFBLENBQUFDLFFBQUEsQ0FBQUUsYUFBQSxDQUFBLElBQUE7QUFDQTtBQUNBLFlBQUFYLE9BQUFZLFNBQUEsRUFBQTtBQUNBQSxzQkFBQUMsaUJBQUE7QUFDQTtBQUNBLEtBZEE7QUFnQkEsQ0FqQkE7O0FDVEFaLElBQUFhLFVBQUEsQ0FBQSxZQUFBLEVBQUEsVUFBQUMsTUFBQSxFQUFBQyxXQUFBLEVBQUFDLE1BQUEsRUFBQUMsYUFBQSxFQUFBQyxRQUFBLEVBQUE7QUFDQUosV0FBQUssTUFBQSxHQUFBLFlBQUE7QUFDQUosb0JBQUFJLE1BQUE7QUFDQUgsZUFBQUksRUFBQSxDQUFBLE9BQUE7QUFDQSxLQUhBO0FBSUEsQ0FMQTtBQ0FBcEIsSUFBQXFCLE1BQUEsQ0FBQSxVQUFBQyxjQUFBLEVBQUE7QUFDQUEsbUJBQUFDLEtBQUEsQ0FBQSxPQUFBLEVBQUE7QUFDQUMsYUFBQSxRQURBO0FBRUFDLHFCQUFBLCtCQUZBO0FBR0FaLG9CQUFBO0FBSEEsS0FBQTtBQUtBLENBTkE7O0FBUUFiLElBQUFhLFVBQUEsQ0FBQSxlQUFBLEVBQUEsVUFBQUMsTUFBQSxFQUFBO0FBQ0FBLFdBQUFZLFFBQUEsR0FBQSxJQUFBO0FBQ0EsQ0FGQTtBQ1JBMUIsSUFBQXFCLE1BQUEsQ0FBQSxVQUFBQyxjQUFBLEVBQUE7QUFDQUEsbUJBQUFDLEtBQUEsQ0FBQSxPQUFBLEVBQUE7QUFDQUMsYUFBQSxlQURBO0FBRUFDLHFCQUFBLHFCQUZBO0FBR0FaLG9CQUFBLFVBSEE7QUFJQWMsaUJBQUE7QUFDQUMsbUJBQUEsZUFBQUMsV0FBQSxFQUFBQyxZQUFBO0FBQUEsdUJBQUFELFlBQUFFLGdCQUFBLENBQUFDLFlBQUFDLE1BQUEsQ0FBQTtBQUFBO0FBREE7QUFKQSxLQUFBO0FBU0EsQ0FWQTs7QUFZQWpDLElBQUFhLFVBQUEsQ0FBQSxVQUFBLEVBQUEsVUFBQUMsTUFBQSxFQUFBLENBSUEsQ0FKQTtBQ1pBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7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QSxXQUFBO0FBQ0FoRSxpQkFBQSxpQkFBQUMsSUFBQSxFQUFBO0FBQUE7O0FBQ0EsbUJBQUFzQixNQUFBO0FBQ0E4RCx3QkFBQSxNQURBO0FBRUFuSyxpQ0FBQWlKLFNBQUEsb0JBRkE7QUFHQW1CLHlCQUFBO0FBQ0Esb0NBQUE7QUFEQSxpQkFIQTtBQU1BYixzQkFBQXhFO0FBTkEsYUFBQSxFQVFBakMsSUFSQSxDQVFBLGVBQUE7QUFDQSxzQkFBQXVILGVBQUEsQ0FBQWYsSUFBQUMsSUFBQSxDQUFBMUksSUFBQSxDQUFBLENBQUEsQ0FBQSxFQUFBeUksSUFBQUMsSUFBQSxDQUFBTCxJQUFBLENBQUEsQ0FBQSxDQUFBO0FBQ0EsYUFWQSxDQUFBO0FBV0EsU0FiQTtBQWNBekUsdUJBQUEseUJBQUE7QUFDQSxtQkFBQTRCLE1BQUFvRCxHQUFBLGFBQUFSLFNBQUEsc0JBQ0FuRyxJQURBLENBQ0EsZUFBQTtBQUNBLHVCQUFBd0csSUFBQUMsSUFBQTtBQUNBLGFBSEEsQ0FBQTtBQUlBLFNBbkJBO0FBb0JBZSxzQkFBQSx3QkFBQTtBQUNBLG1CQUFBakUsTUFBQW9ELEdBQUEsQ0FBQSxzQ0FBQSxDQUFBO0FBQ0EsU0F0QkE7O0FBd0JBWSx5QkFBQSx5QkFBQXhKLElBQUEsRUFBQXFJLElBQUEsRUFBQTtBQUNBekosMEJBQUFvQixJQUFBLEdBQUFBLElBQUE7QUFDQXBCLDBCQUFBeUosSUFBQSxHQUFBQSxJQUFBO0FBQ0EsU0EzQkE7O0FBNkJBdkosZ0JBQUEsa0JBQUE7QUFDQUYsMEJBQUE4SyxNQUFBO0FBQ0E7QUEvQkEsS0FBQTtBQWlDQSxDQTFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW9uaWMgU3RhcnRlciBBcHBcblxuLy8gYW5ndWxhci5tb2R1bGUgaXMgYSBnbG9iYWwgcGxhY2UgZm9yIGNyZWF0aW5nLCByZWdpc3RlcmluZyBhbmQgcmV0cmlldmluZyBBbmd1bGFyIG1vZHVsZXNcbi8vICdzdGFydGVyJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xuXG53aW5kb3cuYXBwID0gYW5ndWxhci5tb2R1bGUoJ0JsYW5rQWdhaW5zdEh1bWFuaXR5JywgWydpb25pYycsICd1aS5yb3V0ZXInLCAnbmdDb3Jkb3ZhJywgJ25nQ29yZG92YU9hdXRoJywgJ25nU3RvcmFnZScsICduZ0FuaW1hdGUnXSlcblxuXG5hcHAucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtKSB7XG4gICAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICAgICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAgICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuXG4gICAgICAgICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcbiAgICAgICAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxuICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgICAgICAgIFN0YXR1c0Jhci5zdHlsZUxpZ2h0Q29udGVudCgpXG4gICAgICAgIH1cbiAgICB9KTtcblxufSlcblxuIiwiYXBwLmNvbnRyb2xsZXIoJ0xvZ291dEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIFVzZXJGYWN0b3J5LCAkc3RhdGUsICRsb2NhbFN0b3JhZ2UsICR0aW1lb3V0KXtcblx0JHNjb3BlLmxvZ091dCA9IGZ1bmN0aW9uKCl7XG5cdFx0VXNlckZhY3RvcnkubG9nT3V0KClcblx0XHQkc3RhdGUuZ28oJ2xvZ2luJylcblx0fVxufSkiLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKXtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2NhcmRzJywge1xuXHRcdHVybDogJy9jYXJkcycsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9jYXJkcy10ZXN0L2NhcmRzLXRlc3QuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0NhcmRzVGVzdEN0cmwnXG5cdH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignQ2FyZHNUZXN0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSl7XG4gXHQkc2NvcGUuZ3JlZXRpbmcgPSBcIkhJXCJcbn0pIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIpID0+IHtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2RlY2tzJywge1xuXHRcdHVybDogJ2RlY2tzLzp0ZWFtaWQnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvZGVja3MvZGVja3MuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0RlY2tDdHJsJyxcblx0XHRyZXNvbHZlOiB7XG5cdFx0XHRkZWNrczogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoc3RhdGVQYXJhbXMudGVhbUlkKVxuXHRcdH1cblx0fSlcblxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0RlY2tDdHJsJywgKCRzY29wZSkgPT4ge1xuXG5cblx0XG59KSIsIi8vIChmdW5jdGlvbiAoKSB7XG5cbi8vICAgICAndXNlIHN0cmljdCc7XG5cbi8vICAgICAvLyBIb3BlIHlvdSBkaWRuJ3QgZm9yZ2V0IEFuZ3VsYXIhIER1aC1kb3kuXG4vLyAgICAgaWYgKCF3aW5kb3cuYW5ndWxhcikgdGhyb3cgbmV3IEVycm9yKCdJIGNhblxcJ3QgZmluZCBBbmd1bGFyIScpO1xuXG4vLyAgICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdmc2FQcmVCdWlsdCcsIFtdKTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdTb2NrZXQnLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgIGlmICghd2luZG93LmlvKSB0aHJvdyBuZXcgRXJyb3IoJ3NvY2tldC5pbyBub3QgZm91bmQhJyk7XG4vLyAgICAgICAgIHJldHVybiB3aW5kb3cuaW8od2luZG93LmxvY2F0aW9uLm9yaWdpbik7XG4vLyAgICAgfSk7XG5cbi8vICAgICAvLyBBVVRIX0VWRU5UUyBpcyB1c2VkIHRocm91Z2hvdXQgb3VyIGFwcCB0b1xuLy8gICAgIC8vIGJyb2FkY2FzdCBhbmQgbGlzdGVuIGZyb20gYW5kIHRvIHRoZSAkcm9vdFNjb3BlXG4vLyAgICAgLy8gZm9yIGltcG9ydGFudCBldmVudHMgYWJvdXQgYXV0aGVudGljYXRpb24gZmxvdy5cbi8vICAgICBhcHAuY29uc3RhbnQoJ0FVVEhfRVZFTlRTJywge1xuLy8gICAgICAgICBsb2dpblN1Y2Nlc3M6ICdhdXRoLWxvZ2luLXN1Y2Nlc3MnLFxuLy8gICAgICAgICBsb2dpbkZhaWxlZDogJ2F1dGgtbG9naW4tZmFpbGVkJyxcbi8vICAgICAgICAgbG9nb3V0U3VjY2VzczogJ2F1dGgtbG9nb3V0LXN1Y2Nlc3MnLFxuLy8gICAgICAgICBzZXNzaW9uVGltZW91dDogJ2F1dGgtc2Vzc2lvbi10aW1lb3V0Jyxcbi8vICAgICAgICAgbm90QXV0aGVudGljYXRlZDogJ2F1dGgtbm90LWF1dGhlbnRpY2F0ZWQnLFxuLy8gICAgICAgICBub3RBdXRob3JpemVkOiAnYXV0aC1ub3QtYXV0aG9yaXplZCdcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdBdXRoSW50ZXJjZXB0b3InLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHEsIEFVVEhfRVZFTlRTKSB7XG4vLyAgICAgICAgIHZhciBzdGF0dXNEaWN0ID0ge1xuLy8gICAgICAgICAgICAgNDAxOiBBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLFxuLy8gICAgICAgICAgICAgNDAzOiBBVVRIX0VWRU5UUy5ub3RBdXRob3JpemVkLFxuLy8gICAgICAgICAgICAgNDE5OiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCxcbi8vICAgICAgICAgICAgIDQ0MDogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXRcbi8vICAgICAgICAgfTtcbi8vICAgICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgICAgIHJlc3BvbnNlRXJyb3I6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChzdGF0dXNEaWN0W3Jlc3BvbnNlLnN0YXR1c10sIHJlc3BvbnNlKTtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlc3BvbnNlKVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9O1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLmNvbmZpZyhmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xuLy8gICAgICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKFtcbi8vICAgICAgICAgICAgICckaW5qZWN0b3InLFxuLy8gICAgICAgICAgICAgZnVuY3Rpb24gKCRpbmplY3Rvcikge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkaW5qZWN0b3IuZ2V0KCdBdXRoSW50ZXJjZXB0b3InKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgXSk7XG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuc2VydmljZSgnQXV0aFNlcnZpY2UnLCBmdW5jdGlvbiAoJGh0dHAsIFNlc3Npb24sICRyb290U2NvcGUsIEFVVEhfRVZFTlRTLCAkcSkge1xuXG4vLyAgICAgICAgIGZ1bmN0aW9uIG9uU3VjY2Vzc2Z1bExvZ2luKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICB2YXIgdXNlciA9IHJlc3BvbnNlLmRhdGEudXNlcjtcbi8vICAgICAgICAgICAgIFNlc3Npb24uY3JlYXRlKHVzZXIpO1xuLy8gICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ2luU3VjY2Vzcyk7XG4vLyAgICAgICAgICAgICByZXR1cm4gdXNlcjtcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIC8vIFVzZXMgdGhlIHNlc3Npb24gZmFjdG9yeSB0byBzZWUgaWYgYW5cbi8vICAgICAgICAgLy8gYXV0aGVudGljYXRlZCB1c2VyIGlzIGN1cnJlbnRseSByZWdpc3RlcmVkLlxuLy8gICAgICAgICB0aGlzLmlzQXV0aGVudGljYXRlZCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAhIVNlc3Npb24udXNlcjtcbi8vICAgICAgICAgfTtcblxuICAgICAgICBcbi8vICAgICAgICAgdGhpcy5pc0FkbWluID0gZnVuY3Rpb24odXNlcklkKXtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdydW5uaW5nIGFkbWluIGZ1bmMnKVxuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKVxuLy8gICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YS51c2VyLmlzQWRtaW4pXG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICB0aGlzLmdldExvZ2dlZEluVXNlciA9IGZ1bmN0aW9uIChmcm9tU2VydmVyKSB7XG5cbi8vICAgICAgICAgICAgIC8vIElmIGFuIGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbiBleGlzdHMsIHdlXG4vLyAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIHVzZXIgYXR0YWNoZWQgdG8gdGhhdCBzZXNzaW9uXG4vLyAgICAgICAgICAgICAvLyB3aXRoIGEgcHJvbWlzZS4gVGhpcyBlbnN1cmVzIHRoYXQgd2UgY2FuXG4vLyAgICAgICAgICAgICAvLyBhbHdheXMgaW50ZXJmYWNlIHdpdGggdGhpcyBtZXRob2QgYXN5bmNocm9ub3VzbHkuXG5cbi8vICAgICAgICAgICAgIC8vIE9wdGlvbmFsbHksIGlmIHRydWUgaXMgZ2l2ZW4gYXMgdGhlIGZyb21TZXJ2ZXIgcGFyYW1ldGVyLFxuLy8gICAgICAgICAgICAgLy8gdGhlbiB0aGlzIGNhY2hlZCB2YWx1ZSB3aWxsIG5vdCBiZSB1c2VkLlxuXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSAmJiBmcm9tU2VydmVyICE9PSB0cnVlKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLndoZW4oU2Vzc2lvbi51c2VyKTtcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgLy8gTWFrZSByZXF1ZXN0IEdFVCAvc2Vzc2lvbi5cbi8vICAgICAgICAgICAgIC8vIElmIGl0IHJldHVybnMgYSB1c2VyLCBjYWxsIG9uU3VjY2Vzc2Z1bExvZ2luIHdpdGggdGhlIHJlc3BvbnNlLlxuLy8gICAgICAgICAgICAgLy8gSWYgaXQgcmV0dXJucyBhIDQwMSByZXNwb25zZSwgd2UgY2F0Y2ggaXQgYW5kIGluc3RlYWQgcmVzb2x2ZSB0byBudWxsLlxuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKS50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKS5jYXRjaChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4vLyAgICAgICAgICAgICB9KTtcblxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbiAoY3JlZGVudGlhbHMpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvbG9naW4nLCBjcmVkZW50aWFscylcbi8vICAgICAgICAgICAgICAgICAudGhlbihvblN1Y2Nlc3NmdWxMb2dpbilcbi8vICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHsgbWVzc2FnZTogJ0ludmFsaWQgbG9naW4gY3JlZGVudGlhbHMuJ30pO1xuLy8gICAgICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMuc2lnbnVwID0gZnVuY3Rpb24oY3JlZGVudGlhbHMpe1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbi8vICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbi8vICAgICAgICAgICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbi8vICAgICAgICAgICAgICAgICBkYXRhOiBjcmVkZW50aWFsc1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQuZGF0YSlcbi8vICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbigpe1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3Qoe21lc3NhZ2U6ICdUaGF0IGVtYWlsIGlzIGFscmVhZHkgYmVpbmcgdXNlZC4nfSk7XG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL2xvZ291dCcpLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgIFNlc3Npb24uZGVzdHJveSgpO1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dvdXRTdWNjZXNzKTtcbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuc2VydmljZSgnU2Vzc2lvbicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUykge1xuXG4vLyAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuLy8gICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICBzZWxmLmRlc3Ryb3koKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuXG4vLyAgICAgICAgIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24gKHVzZXIpIHtcbi8vICAgICAgICAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcbi8vICAgICAgICAgfTtcblxuLy8gICAgIH0pO1xuXG4vLyB9KCkpO1xuIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIpID0+IHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdnYW1lJywge1xuICAgICAgICB1cmw6ICcvZ2FtZS86Z2FtZUlkJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL2dhbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdHYW1lQ3RybCcsXG4gICAgICAgIC8vIHJlc29sdmU6IHtcbiAgICAgICAgLy8gICAgIGdhbWUgOiAoR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcykgPT4gR2FtZUZhY3RvcnkuZ2V0R2FtZUJ5R2FtZUlkKCRzdGF0ZVBhcmFtcy5nYW1lSWQpXG4gICAgICAgIC8vIH0gIFxuICAgIH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignR2FtZUN0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zLCAkbG9jYWxTdG9yYWdlLCBBY3RpdmVHYW1lRmFjdG9yeSkgPT4geyAgIFxuICAgIC8vIGNvbnN0IGdhbWVJZCA9ICRzdGF0ZVBhcmFtcy5nYW1lSWQ7XG4gICAgJHNjb3BlLmdhbWVJZCA9IDU3O1xuICAgIGNvbnN0IHBsYXllcklkID0gJGxvY2FsU3RvcmFnZS51c2VyLmlkO1xuICAgIGNvbnN0IHRlYW1JZCA9IDI7IFxuICAgIC8vIGNvbnN0IHRlYW1JZCA9ICRsb2NhbFN0b3JhZ2UudGVhbS5pZFxuICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7JHNjb3BlLmdhbWVJZH0vYCk7XG5cbiAgICBnYW1lUmVmLm9uKCd2YWx1ZScsIGdhbWVTbmFwc2hvdCA9PiB7XG4gICAgICAgICRzY29wZS5nYW1lID0gZ2FtZVNuYXBzaG90LnZhbCgpO1xuICAgICAgICAkc2NvcGUuZ2FtZU5hbWUgPSAkc2NvcGUuZ2FtZS5zZXR0aW5ncy5uYW1lO1xuICAgICAgICBpZiAoJHNjb3BlLmdhbWUucGxheWVyc1twbGF5ZXJJZF0uaGFuZCl7XG4gICAgICAgICAgICAkc2NvcGUucGxheWVySGFuZCA9ICRzY29wZS5nYW1lLnBsYXllcnNbcGxheWVySWRdLmhhbmQ7XG4gICAgICAgICAgICAkc2NvcGUucGxheWVySGFuZENvdW50ID0gT2JqZWN0LmtleXMoJHNjb3BlLnBsYXllckhhbmQpLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICAkc2NvcGUuYmxhY2tDYXJkID0gJHNjb3BlLmdhbWUuY3VycmVudEJsYWNrQ2FyZFsxXS50ZXh0XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYmxhY2tDYXJkXCIsICRzY29wZS5ibGFja0NhcmQpXG4gICAgICAgICRzY29wZS5qdWRnZSA9ICRzY29wZS5nYW1lLmN1cnJlbnRKdWRnZTtcbiAgICAgICAgJHNjb3BlLnBsYXllcnMgPSAkc2NvcGUuZ2FtZS5wbGF5ZXJzO1xuICAgICAgICBjb25zb2xlLmxvZyhcInBsYXllcnNcIiwkc2NvcGUucGxheWVycylcbiAgICAgICAgY29uc29sZS5sb2coXCJ0eXBlb2YgcGxheWVyc1wiLCB0eXBlb2YgJHNjb3BlLnBsYXllcnMpXG4gICAgICAgICRzY29wZS5zdWJtaXR0ZWRXaGl0ZUNhcmRzID0gJHNjb3BlLmdhbWUuc3VibWl0dGVkV2hpdGVDYXJkc1xuICAgICAgICAkc2NvcGUuJGV2YWxBc3luYygpO1xuICAgIH0pXG4gICBcbiAgICAkc2NvcGUuc2hvd0NhcmRzID0gZmFsc2U7XG4gICAgJHNjb3BlLnN1Ym1pdHRlZCA9IGZhbHNlO1xuXG5cbiAgICAkc2NvcGUub25Td2lwZURvd24gPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgIEdhbWVGYWN0b3J5LmpvaW5HYW1lQnlJZChnYW1lSWQpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBBY3RpdmVHYW1lRmFjdG9yeS5yZWZpbGxNeUhhbmQoJHNjb3BlLmdhbWVJZCwgcGxheWVySWQsIHRlYW1JZClcbiAgICAgICAgICAkc2NvcGUuc2hvd0NhcmRzID0gdHJ1ZTtcbiAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUucGxheWVySGFuZClcbiAgICAgICAgICAkc2NvcGUuJGV2YWxBc3luYygpO1xuICAgICAgICB9KVxuICAgIH0gIFxuXG4gICAgJHNjb3BlLm9uRG91YmxlVGFwID0gKGNhcmRJZCwgY2FyZFRleHQpID0+IHtcbiAgICAgICAgQWN0aXZlR2FtZUZhY3Rvcnkuc3VibWl0V2hpdGVDYXJkKHBsYXllcklkLCBjYXJkSWQsICRzY29wZS5nYW1lSWQsIHRlYW1JZCwgY2FyZFRleHQpXG4gICAgICAgICRzY29wZS5nZXRTdWJtaXR0ZWRQbGF5ZXJzKCk7XG4gICAgICAgICRzY29wZS5zdWJtaXR0ZWQgPSB0cnVlO1xuICAgICAgICAkc2NvcGUuJGV2YWxBc3luYygpO1xuICAgICAgICBjb25zb2xlLmxvZyhcInN1Ym1pdHRlZCBwbGF5ZXJzXCIsICRzY29wZS5wbGF5ZXJzVG9TdWJtaXQpXG4gICAgICAgIGNvbnNvbGUubG9nKFwic3VibWl0dGVkXCIsICRzY29wZS5zdWJtaXR0ZWQpXG4gICAgfVxuXG4gICAgJHNjb3BlLmp1ZGdlRG91YmxlVGFwID0gKGNhcmRJZCkgPT4ge1xuICAgICAgICAvLyBpZiAocGxheWVySWQgPT09IGp1ZGdlKSB7XG4gICAgICAgICAgICBBY3RpdmVHYW1lRmFjdG9yeS5waWNrV2lubmluZ1doaXRlQ2FyZChjYXJkSWQsICRzY29wZS5nYW1lSWQsIHRlYW1JZClcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwianVkZ2luZ1wiKVxuICAgICAgICAvLyB9XG4gICAgfVxuXG5cbiAgICAkc2NvcGUuZ2V0U3VibWl0dGVkUGxheWVycyA9ICgpID0+IHtcbiAgICAgICAgJHNjb3BlLnBsYXllcnNUb1N1Ym1pdCA9ICBfLmtleUJ5KCRzY29wZS5zdWJtaXR0ZWRXaGl0ZUNhcmRzLCBjYXJkID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjYXJkLnN1Ym1pdHRlZEJ5OyBcbiAgICAgICAgfSlcbiAgICB9XG5cbn0pXG5cblxuLy8gYXBwLmNvbnRyb2xsZXIoXCJBY3RpdmVHYW1lQ3RybFwiLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgQWN0aXZlR2FtZUZhY3RvcnksIGdhbWUsICRzdGF0ZVBhcmFtcywgJGxvY2FsU3RvcmFnZSwgJHN0YXRlKSA9PiB7XG5cbiAgICBcbi8vICAgICAkc2NvcGUub25Td2lwZURvd24gPSAoKSA9PiB7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKCd3b3JraW5nJyk7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5zaG93Q2FyZHMpO1xuLy8gICAgICAgICAkc2NvcGUuc2hvd0NhcmRzID0gdHJ1ZSA7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5zaG93Q2FyZHMpO1xuLy8gICAgICAgICAkc2NvcGUuJGV2YWxBc3luYygpO1xuLy8gICAgIH1cblxuLy8gICAgICRzY29wZS5vblN3aXBlVXAgPSAoKSA9PiB7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwic3dpcGVkIHVwXCIpO1xuLy8gICAgIH1cblxuLy8gICAgICRzY29wZS5vbkRvdWJsZVRhcCA9IChrZXkpID0+IHtcbi8vICAgICAgICAgY29uc29sZS5sb2coXCJkb3VibGUgdGFwcGVkXCIpXG4vLyAgICAgICAgICRzY29wZS5wbGF5ZWQgPSB0cnVlO1xuLy8gICAgICAgICAvL2NhbGwgc3VibWl0IGNhcmQgZnVuY3Rpb24gaGVyZS5cbi8vICAgICB9XG5cbi8vICAgICBBY3RpdmVHYW1lRmFjdG9yeS5yZWZpbGxNeUhhbmQoJHNjb3BlLmdhbWVJZCwgJHNjb3BlLnBsYXllcklkLCAkc2NvcGUudGVhbUlkKTtcblxuLy8gICAgICRzY29wZS4kb24oJ2NoYW5nZWRHYW1lJywgKGV2ZW50LHNuYXBzaG90KSA9Pntcbi8vICAgICAgICAgJHNjb3BlLmdhbWUgPSBzbmFwc2hvdDtcbi8vICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmdhbWUpO1xuLy8gICAgICAgICBpZihnYW1lLnN0YXRlID09PSAnc3VibWlzc2lvbicpe1xuLy8gICAgICAgICAgICAgJHN0YXRlLmdvKCdnYW1lLnN1Ym1pc3Npb24tZ2FtZScpXG4vLyAgICAgICAgIH0gXG4vLyAgICAgfSlcbi8vIH0pXG5cblxuXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgdXJsOiAnLycsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvaG9tZS9ob21lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnSG9tZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBnYW1lczogZnVuY3Rpb24oR2FtZUZhY3RvcnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUsICRjb3Jkb3ZhT2F1dGgsIFVzZXJGYWN0b3J5LCBHYW1lRmFjdG9yeSwgJGxvY2FsU3RvcmFnZSwgZ2FtZXMsICRpb25pY1BvcHVwKSB7XG4gICAgJHNjb3BlLnN0YXJ0TmV3R2FtZSA9IEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZTtcbiAgICAkc2NvcGUuc3RvcmFnZSA9ICRsb2NhbFN0b3JhZ2U7XG4gICAgJHNjb3BlLmdhbWVzID0gZ2FtZXM7XG5cbiAgICBjb25zb2xlLmxvZyhcImdhbWVzXCIsIEpTT04uc3RyaW5naWZ5KCRzY29wZS5nYW1lcykpXG4gICAgJHNjb3BlLmdvVG9OZXdHYW1lID0gKCkgPT4ge1xuICAgICAgICAkc3RhdGUuZ28oJ25ldy1nYW1lLm1haW4nKVxuICAgIH1cblxuXG4gICAgLy8gJHNjb3BlLmpvaW5HYW1lID0gR2FtZUZhY3Rvcnkuam9pbkdhbWVCeUlkO1xuXG4gICAgLy8gJHNjb3BlLnNob3dQb3B1cCA9IGZ1bmN0aW9uKGdhbWVJZCkge1xuXG4gICAgLy8gICAgICRzY29wZS5nYW1lID0gJHNjb3BlLmdhbWVzW2dhbWVJZF07XG4gICAgLy8gICAgICRzY29wZS5nYW1lTmFtZSA9ICRzY29wZS5nYW1lLnNldHRpbmdzLm5hbWU7XG4gICAgLy8gICAgICRzY29wZS5wbGF5ZXJDb3VudCA9IE9iamVjdC5rZXlzKCRzY29wZS5nYW1lLnBsYXllcnMpLmxlbmd0aDtcbiAgICAvLyAgICAgJHNjb3BlLndhaXRpbmdGb3JQbGF5ZXJzID0gICgkc2NvcGUuZ2FtZS5zZXR0aW5ncy5taW5QbGF5ZXJzIHx8IDQpIC0gJHNjb3BlLnBsYXllckNvdW50O1xuICAgICAgICAgXG4gICAgLy8gICAgICBjb25zdCBteVBvcHVwID0gJGlvbmljUG9wdXAuc2hvdyh7XG4gICAgLy8gICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2hvbWUvcG9wdXAuaHRtbCcsXG4gICAgLy8gICAgICAgICB0aXRsZTogJ0pvaW4gJyArICRzY29wZS5nYW1lTmFtZSxcbiAgICAvLyAgICAgICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgLy8gICAgICAgICBidXR0b25zOiBcbiAgICAvLyAgICAgICAgIFtcbiAgICAvLyAgICAgICAgICAgICB7dGV4dDogJ0dvIGJhY2snfSxcbiAgICAvLyAgICAgICAgICAgICB7XG4gICAgLy8gICAgICAgICAgICAgICAgIHRleHQ6ICdKb2luIGdhbWUnLFxuICAgIC8vICAgICAgICAgICAgICAgICB0eXBlOiAnYnV0dG9uLWJhbGFuY2VkJyxcbiAgICAvLyAgICAgICAgICAgICAgICAgb25UYXA6IGUgPT4ge1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmpvaW5HYW1lKGdhbWVJZCk7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2dhbWUuYWN0aXZlLWdhbWUnLCB7IGdhbWVJZDogZ2FtZUlkIH0pXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICBdXG4gICAgLy8gICAgIH0pXG4gICAgLy8gfVxufSlcblxuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2xvZ2luJywge1xuICAgICAgICB1cmw6ICcvbG9naW4nLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2xvZ2luL2xvZ2luLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnTG9naW5DdHJsJ1xuICAgIH0pXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2xvZ2luJyk7XG59KVxuXG5hcHAuY29udHJvbGxlcignTG9naW5DdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUsIFVzZXJGYWN0b3J5LCAkY29yZG92YU9hdXRoLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCwgJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZSkge1xuICAgICRzY29wZS5sb2dpbldpdGhTbGFjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gVXNlckZhY3RvcnkuZ2V0U2xhY2tDcmVkcygpXG4gICAgICAgICAgICAudGhlbihjcmVkcyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRjb3Jkb3ZhT2F1dGguc2xhY2soY3JlZHMuY2xpZW50SUQsIGNyZWRzLmNsaWVudFNlY3JldCwgWydpZGVudGl0eS5iYXNpYycsICdpZGVudGl0eS50ZWFtJywgJ2lkZW50aXR5LmF2YXRhciddKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGluZm8gPT4gVXNlckZhY3Rvcnkuc2V0VXNlcihpbmZvKSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+ICRzdGF0ZS5nbygnaG9tZScpKVxuICAgIH1cblxuICAgICRpb25pY1NpZGVNZW51RGVsZWdhdGUuY2FuRHJhZ0NvbnRlbnQoZmFsc2UpO1xuXG4gICAgJHNjb3BlLiRvbignJGlvbmljVmlldy5sZWF2ZScsIGZ1bmN0aW9uKCkgeyAkaW9uaWNTaWRlTWVudURlbGVnYXRlLmNhbkRyYWdDb250ZW50KHRydWUpIH0pO1xuXG4gICAgJHNjb3BlLnN0b3JhZ2UgPSAkbG9jYWxTdG9yYWdlXG5cbiAgICBmdW5jdGlvbiByZWRpcmVjdFVzZXIoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic2NvcGUgc3RvcmFnZSB1c2VyXCIsICRzY29wZS5zdG9yYWdlLnVzZXIpXG4gICAgICAgIGlmICgkc2NvcGUuc3RvcmFnZS51c2VyKSAkc3RhdGUuZ28oJ2hvbWUnKVxuICAgIH1cblxuICAgIHJlZGlyZWN0VXNlcigpO1xufSlcblxuIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikgPT4ge1xuXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ25ldy1nYW1lJywge1xuICAgICAgICB1cmw6ICcvbmV3LWdhbWUnLFxuICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9tYWluLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnTmV3R2FtZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICB0ZWFtRGVja3M6IChHYW1lRmFjdG9yeSkgPT4gR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCgpLFxuICAgICAgICAgICAgc3RhbmRhcmREZWNrOiAoR2FtZUZhY3RvcnkpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoMSlcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ25ldy1nYW1lLm1haW4nLCB7XG4gICAgICAgIHVybDogJy9zZXR1cC1nYW1lJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9uZXctZ2FtZS5odG1sJyxcbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5hZGQtZGVja3MnLCB7XG4gICAgICAgIHVybDogJy9hZGQtZGVja3MnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL2FkZC1kZWNrcy5odG1sJyxcbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5kZWNrJywge1xuICAgICAgICB1cmw6ICcvZGVjay86ZGVja0lkJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9kZWNrLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnRGVja0N0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBjYXJkczogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldENhcmRzQnlEZWNrSWQoJHN0YXRlUGFyYW1zLmRlY2tJZClcbiAgICAgICAgfVxuXG5cbiAgICB9KVxuXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL25ldy1nYW1lL3NldHVwLWdhbWUnKTtcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdOZXdHYW1lQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkc3RhdGUsIHRlYW1EZWNrcywgc3RhbmRhcmREZWNrKSA9PiB7XG4gICAgJHNjb3BlLmN1cnJlbnRWaWV3ID0gJ2FkZERlY2tzJ1xuICAgICRzY29wZS5nYW1lQ29uZmlnID0ge307XG4gICAgJHNjb3BlLmdhbWVDb25maWcuZGVja3MgPSB7fTtcbiAgICAkc2NvcGUuZ29Ub0RlY2tzID0gKCkgPT4ge1xuICAgICAgICAkc3RhdGUuZ28oJ25ldy1nYW1lLmFkZC1kZWNrcycsIHt9LCB7IGxvY2F0aW9uOiB0cnVlLCByZWxvYWQ6IHRydWUgfSlcbiAgICB9XG5cbiAgICAkc2NvcGUuZGVja3MgPSBzdGFuZGFyZERlY2suY29uY2F0KHRlYW1EZWNrcyk7XG5cbiAgICAkc2NvcGUuc3RhcnROZXdHYW1lID0gKGdhbWVDb25maWcpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJjYWxsZWQgc3RhcnQgbmV3IGdhbWVcIilcbiAgICAgICAgR2FtZUZhY3Rvcnkuc3RhcnROZXdHYW1lKGdhbWVDb25maWcpLnRoZW4oKGlkKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1hZGUgaXQgdG8gdGhlIC50aGVuXCIpXG4gICAgICAgICAgICBHYW1lRmFjdG9yeS5hZGRQaWxlVG9HYW1lKGlkLCAkc2NvcGUuZ2FtZUNvbmZpZy5kZWNrcylcbiAgICAgICAgICAgICRzdGF0ZS5nbygnZ2FtZS5hY3RpdmUtZ2FtZScsIHsgZ2FtZUlkOiBpZCB9KVxuXG5cbiAgICAgICAgfSlcbiAgICB9XG4gICAgJHNjb3BlLmFkZERlY2tzVG9HYW1lID0gR2FtZUZhY3RvcnkuYWRkRGVja3M7XG4gICAgLy8gJHNjb3BlLiRvbignY2hhbmdlZEdhbWUnLCAoZXZlbnQsIGRhdGEpID0+IHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ3JlY2VpdmVkIGV2ZW50JylcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ2RhdGEgb2JqOicsIGRhdGEpXG4gICAgLy8gICAgICRzY29wZS5nYW1lID0gZGF0YTtcbiAgICAvLyAgICAgJHNjb3BlLiRkaWdlc3QoKVxuXG4gICAgLy8gfSlcblxuXG59KVxuXG5hcHAuY29udHJvbGxlcignRGVja0N0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgJHN0YXRlLCBjYXJkcykgPT4ge1xuICAgICRzY29wZS5jYXJkcyA9IGNhcmRzXG59KVxuXG4iLCIvL0RpcmVjdGl2ZSBGaWxlIiwiYXBwLmRpcmVjdGl2ZSgnc3VibWl0dGVkQ2FyZHMnLCBmdW5jdGlvbigpe1xuXG5cdHJldHVybiB7XG5cblx0XHRyZXN0cmljdDogJ0UnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvY29tbW9uL2RpcmVjdGl2ZXMvc3VibWl0dGVkLWNhcmRzLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdHYW1lQ3RybCdcblx0fVxufSkiLCJhcHAuZGlyZWN0aXZlKCd3aGl0ZUNhcmRzJywgZnVuY3Rpb24oKXtcblxuXHRyZXR1cm4ge1xuXG5cdFx0cmVzdHJpY3Q6ICdFJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2NvbW1vbi9kaXJlY3RpdmVzL3doaXRlLWNhcmRzLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdHYW1lQ3RybCdcblx0fVxufSkiLCJhcHAuZmFjdG9yeSgnQWN0aXZlR2FtZUZhY3RvcnknLCAoJGh0dHAsICRyb290U2NvcGUsICRsb2NhbFN0b3JhZ2UpID0+IHtcblxuICAgICAgICBjb25zdCBBY3RpdmVHYW1lRmFjdG9yeSA9IHt9O1xuXG4gICAgICAgIGNvbnN0IHJlZmlsbGVyID0gKGNhcmRzTmVlZGVkLCBwaWxlUmVmLCBoYW5kUmVmKSA9PiB7XG4gICAgICAgICAgcGlsZVJlZi5saW1pdFRvRmlyc3QoY2FyZHNOZWVkZWQpLm9uY2UoJ3ZhbHVlJywgY2FyZHNTbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICBjYXJkc1NuYXBzaG90LmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgICAgICAgIGxldCB1cGRhdGVPYmogPSB7fVxuICAgICAgICAgICAgICBjYXJkLnJlZi50cmFuc2FjdGlvbihjYXJkRGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICB1cGRhdGVPYmpbY2FyZC5rZXldID0gY2FyZERhdGFcbiAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBoYW5kUmVmLnVwZGF0ZSh1cGRhdGVPYmopKVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgICAgIH1cblxuICAgICAgICBBY3RpdmVHYW1lRmFjdG9yeS5yZWZpbGxNeUhhbmQgPSAoZ2FtZUlkLCBwbGF5ZXJJZCwgdGVhbUlkKSA9PiB7XG4gICAgICAgICAgLy8gaG93IG1hbnkgY2FyZHMgZG8gSSBuZWVkP1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVmaWxsaW5nIGhhbmRcIilcbiAgICAgICAgICBsZXQgY2FyZHNOZWVkZWQgPSAwXG4gICAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICBjb25zdCBoYW5kUmVmID0gZ2FtZVJlZi5jaGlsZChgcGxheWVycy8ke3BsYXllcklkfS9oYW5kYClcbiAgICAgICAgICBjb25zdCBwaWxlUmVmID0gZ2FtZVJlZi5jaGlsZCgncGlsZS93aGl0ZWNhcmRzJylcbiAgICAgICAgICBoYW5kUmVmLm9uY2UoJ3ZhbHVlJywgaGFuZFNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgY2FyZHNOZWVkZWQgPSA3IC0gaGFuZFNuYXBzaG90Lm51bUNoaWxkcmVuKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHJlZmlsbGVyKGNhcmRzTmVlZGVkLCBwaWxlUmVmLCBoYW5kUmVmKVxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1hZGUgaXQgdG8gcmVmaWxsZXJcIilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmaXJlYmFzZU1vdmVTaW5nbGVLZXlWYWx1ZSA9IChvbGRSZWYsIG5ld1JlZikgPT4ge1xuICAgICAgICAgICAgbGV0IHJlbW92ZVVwZGF0ZSA9IHt9XG4gICAgICAgICAgICBsZXQgbmV3VXBkYXRlID0ge31cbiAgICAgICAgICAgIHJldHVybiBvbGRSZWYub25jZSgndmFsdWUnKVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICAgICAgICAgICAgICAudGhlbihzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZVVwZGF0ZVtzbmFwc2hvdC5rZXldID0gbnVsbFxuICAgICAgICAgICAgICAgICAgICBuZXdVcGRhdGVbc25hcHNob3Qua2V5XSA9IHNuYXBzaG90LnZhbCgpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdSZWYudXBkYXRlKG5ld1VwZGF0ZSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IG9sZFJlZi5wYXJlbnQudXBkYXRlKHJlbW92ZVVwZGF0ZSkpXG4gICAgICAgIH1cblxuXG4gICAgICAgIEFjdGl2ZUdhbWVGYWN0b3J5LnN1Ym1pdFdoaXRlQ2FyZCA9IChwbGF5ZXJJZCwgY2FyZElkLCBnYW1lSWQsIHRlYW1JZCwgY2FyZFRleHQpID0+IHtcbiAgICAgICAgICBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKTtcbiAgICAgICAgICBjb25zdCBjYXJkVG9TdWJtaXQgPSBnYW1lUmVmLmNoaWxkKGBwbGF5ZXJzLyR7cGxheWVySWR9L2hhbmQvJHtjYXJkSWR9YCk7XG4gICAgICAgICAgY29uc3Qgc3VibWl0UmVmID0gZ2FtZVJlZi5jaGlsZCgnc3VibWl0dGVkV2hpdGVDYXJkcycpO1xuICAgICAgICAgIGZpcmViYXNlTW92ZVNpbmdsZUtleVZhbHVlKGNhcmRUb1N1Ym1pdCwgc3VibWl0UmVmKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICBzdWJtaXRSZWYuY2hpbGQoY2FyZElkKS5zZXQoe1xuICAgICAgICAgICAgICAgIHN1Ym1pdHRlZEJ5OiBwbGF5ZXJJZCxcbiAgICAgICAgICAgICAgICB0ZXh0OiBjYXJkVGV4dFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG5cblxuICAgICAgICAvL25pa2l0YSdzIHVwZGF0ZWQgdmVyc2lvblxuICAgICAgICAvLyBBY3RpdmVHYW1lRmFjdG9yeS5zdWJtaXRXaGl0ZUNhcmQgPSAocGxheWVySWQsIGNhcmRJZCwgZ2FtZUlkLCB0ZWFtSWQsIGNhcmRUZXh0KSA9PiB7XG4gICAgICAgIC8vICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YCk7XG4gICAgICAgIC8vICAgY29uc3QgY2FyZFRvU3VibWl0ID0gZ2FtZVJlZi5jaGlsZChgcGxheWVycy8ke3BsYXllcklkfS9oYW5kLyR7Y2FyZElkfS90ZXh0YCk7XG4gICAgICAgIC8vICAgY29uc3Qgc3VibWl0UmVmID0gZ2FtZVJlZi5jaGlsZCgnc3VibWl0dGVkV2hpdGVDYXJkcycpO1xuICAgICAgICAvLyAgIGxldCB0ZXh0ID0gJydcbiAgICAgICAgLy8gICByZXR1cm4gY2FyZFRvU3VibWl0LnRyYW5zYWN0aW9uKGNhcmRUZXh0ID0+IHtcbiAgICAgICAgLy8gICAgICAgdGV4dCA9IGNhcmRUZXh0XG4gICAgICAgIC8vICAgICAgIHJldHVybiBudWxsXG4gICAgICAgIC8vICAgICB9KVxuICAgICAgICAvLyAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAvLyAgICAgICBsZXQgdXBkYXRlT2JqID0ge307XG4gICAgICAgIC8vICAgICAgIHVwZGF0ZU9ialtwbGF5ZXJJZF0udGV4dCA9IHRleHQ7XG4gICAgICAgIC8vICAgICAgIHVwZGF0ZU9ialtwbGF5ZXJJZF0uY2FyZElkID0gY2FyZElkXG4gICAgICAgIC8vICAgICAgIHJldHVybiBzdWJtaXRSZWYudXBkYXRlKHVwZGF0ZU9iailcbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgIC8vICAgICAudGhlbigoKSA9PiBjb25zb2xlLmxvZygnc3VibWlzc2lvbiBzdWNjZXNzJykpXG4gICAgICAgIC8vICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICAgICAgLy8gfVxuXG5cblxuICAgICAgICBBY3RpdmVHYW1lRmFjdG9yeS5waWNrV2lubmluZ1doaXRlQ2FyZCA9IChjYXJkSWQsIGdhbWVJZCwgdGVhbUlkKSA9PiB7XG4gICAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YCk7XG4gICAgICAgICAgbGV0IHdpbm5lciA9IGdhbWVSZWYuY2hpbGQoYHN1Ym1pdHRlZFdoaXRlQ2FyZHMvJHtjYXJkSWR9L3N1Ym1pdHRlZEJ5YClcbiAgICAgICAgICBsZXQgYmxhY2tDYXJkSWQgPSAnJztcbiAgICAgICAgICBsZXQgYmxhY2tDYXJkV29uID0ge31cbiAgICAgICAgICB3aW5uZXIub25jZSgndmFsdWUnKVxuICAgICAgICAgICAgLnRoZW4od2lubmVySWQgPT4ge1xuICAgICAgICAgICAgICB3aW5uZXIgPSB3aW5uZXJJZC52YWwoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHNldFJvdW5kU3RhdGVUb092ZXIgPSBnYW1lUmVmLmNoaWxkKCdzdGF0ZScpLnNldCgncG9zdHJvdW5kJylcbiAgICAgICAgICAgICAgY29uc3QgYXdhcmRCbGFja0NhcmQgPSBnYW1lUmVmLmNoaWxkKCdjdXJyZW50QmxhY2tDYXJkJykudHJhbnNhY3Rpb24oKGN1cnJlbnRCbGFja0NhcmQpID0+IHtcbiAgICAgICAgICAgICAgICBibGFja0NhcmRXb24gPSBjdXJyZW50QmxhY2tDYXJkOyAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIyMjI0JMQUNLIENBUkQgV09OXCIsIGJsYWNrQ2FyZFdvbilcbiAgICAgICAgICAgICAgICBnYW1lUmVmLmNoaWxkKGBwbGF5ZXJzLyR7d2lubmVyfS9ibGFja0NhcmRzV29uYCkuc2V0KGJsYWNrQ2FyZFdvbilcblxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbc2V0Um91bmRTdGF0ZVRvT3ZlciwgYXdhcmRCbGFja0NhcmQsIGdhbWVSZWYuY2hpbGQoJ3N1Ym1pdHRlZFdoaXRlQ2FyZHMnKS5yZW1vdmUoKV0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEFjdGl2ZUdhbWVGYWN0b3J5OyBcblxuXG59KTsiLCJhcHAuZmFjdG9yeSgnR2FtZUZhY3RvcnknLCAoJGh0dHAsICRyb290U2NvcGUsICRsb2NhbFN0b3JhZ2UpID0+IHtcblxuICAgICAgICBjb25zdCBvdXJJcHMgPSB7XG4gICAgICAgICAgICBuaWtpdGE6IFwiMTkyLjE2OC40LjIxM1wiLFxuICAgICAgICAgICAga2F5bGE6IFwiMTkyLjE2OC40LjIyNVwiLFxuICAgICAgICAgICAgbml0aHlhOiBcIjE5Mi4xNjguMS40OFwiLFxuICAgICAgICAgICAgZGFuOiBcIjE5Mi4xNjguNC4yMzZcIlxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGN1cnJlbnRJcCA9IG91cklwcy5rYXlsYVxuXG5cbiAgICAgICAgLy8gc3RhcnQgYSBuZXcgZ2FtZSBkZXJwXG4gICAgICAgIGNvbnN0IEdhbWVGYWN0b3J5ID0ge307XG4gICAgICAgIEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZSA9IChnYW1lQ29uZmlnKSA9PiB7XG4gICAgICAgICAgICAvL2NhbiBhbHNvIGdldCBhbGwgdGhlIGRlY2tzIGJ5IHRlYW0gaGVyZSB0byBwcmVwYXJlXG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAkbG9jYWxTdG9yYWdlLnRlYW0uaWQgfHwgMjtcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0b3JJZCA9ICRsb2NhbFN0b3JhZ2UudXNlci5pZCB8fCAzO1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZ2FtZXNgLCB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGdhbWVDb25maWcubmFtZSB8fCAnQVdFU09NRSBOYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgdGVhbUlkOiB0ZWFtSWQsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0b3JJZDogY3JlYXRvcklkLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdG9yTmFtZTogJGxvY2FsU3RvcmFnZS51c2VyLm5hbWUgfHwgJ2RhbicsIC8vbWlnaHQgYmUgdW5uZWNlc3NhcnkgaWYgd2UgaGF2ZSB0aGUgdXNlciBpZFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczogZ2FtZUNvbmZpZ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2FtZUlkID0gcmVzLmRhdGFcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGAvdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICAgICAgICAgIGdhbWVSZWYub24oJ3ZhbHVlJywgc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdjaGFuZ2VkR2FtZScsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdhbWVJZDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9O1xuICAgICAgICAvLyBnZXQgYWxsIG9mIGEgZGVja3MgY2FyZHMgdG8gZGlzcGxheSB3aGVuIGxvb2tpbmcgYXQgZGVja3NcbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0Q2FyZHNCeURlY2tJZCA9IChpZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9kZWNrcy8ke2lkfS9jYXJkc2ApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBUT0RPOiBjb21iaW5lIHRoaXMgaW50byB0aGUgYWJvdmUgc3RhcnROZXdHYW1lIGZ1bmNcbiAgICAgICAgLy8gdGFrZSBhbGwgb2YgdGhlIHNlbGVjdGVkIGRlY2tzJyBjYXJkcyBhbmQgcHV0IHRoZW0gaW4gdGhlIGZpcmViYXNlIGdhbWUgb2JqZWN0IHBpbGUgKHRocm91Z2ggcm91dGUpXG4gICAgICAgIEdhbWVGYWN0b3J5LmFkZFBpbGVUb0dhbWUgPSAoZ2FtZUlkLCBkZWNrcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZGRpbmcgcGlsZSB0byBnYW1lXCIpXG4gICAgICAgICAgICBjb25zdCBkZWNrc0FyciA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgZGVja0lkIGluIGRlY2tzKSB7XG4gICAgICAgICAgICAgICAgZGVja3NBcnIucHVzaChkZWNrSWQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0vZGVja3NgLCB7XG4gICAgICAgICAgICAgICAgJ2RlY2tzJzogZGVja3NBcnJcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAkbG9jYWxTdG9yYWdlLnRlYW0uaWQ7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJJZCA9ICRsb2NhbFN0b3JhZ2UudXNlci5pZDtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllck5hbWUgPSAkbG9jYWxTdG9yYWdlLnVzZXIubmFtZTtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllclJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9L3BsYXllcnMvJHtwbGF5ZXJJZH1gKVxuICAgICAgICAgICAgcGxheWVyUmVmLnNldCh7XG4gICAgICAgICAgICAgICAgbmFtZTogcGxheWVyTmFtZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzLyR7Z2FtZUlkfT9wbGF5ZXJJZD0ke3BsYXllcklkfWApXG4gICAgICAgIH1cblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkID0gKGlkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAodHlwZW9mIGlkICE9PSAnbnVtYmVyJykgPyAkbG9jYWxTdG9yYWdlLnRlYW0uaWQgOiBpZDsgLy8gaWQgfHwgbG9jYWxzdG9yYWdlIGRvZXNuJ3Qgd29yayBiZWNhdXNlIDAgaXMgZmFsc2V5XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2RlY2tzP3RlYW09JHt0ZWFtSWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG5cbiAgICAgICAgfTtcblxuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldFVzZXJzQnlHYW1lSWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzLyR7Z2FtZUlkfS91c2Vyc2ApO1xuICAgICAgICB9O1xuXG5cblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRHYW1lQnlHYW1lSWQgPSAoZ2FtZUlkLCB0ZWFtSWQpID0+IHtcbiAgICAgICAgICAgIHRlYW1JZCA9IHRlYW1JZCB8fCAkbG9jYWxTdG9yYWdlLnRlYW0uaWRcbiAgICAgICAgICAgIGNvbnN0IGdhbWVzUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAgICAgcmV0dXJuIGdhbWVzUmVmLm9uY2UoJ3ZhbHVlJykudGhlbihzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNuYXBzaG90LnZhbCgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VGVhbUlkID0gKHRlYW1JZCkgPT4ge1xuICAgICAgICAgICAgdGVhbUlkID0gdGVhbUlkIHx8ICRsb2NhbFN0b3JhZ2UudGVhbS5pZFxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lcy8/dGVhbUlkPSR7dGVhbUlkfWApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VXNlciA9ICh1c2VySWQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZ2FtZXMvP3VzZXJJZD0ke3VzZXJJZH1gKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEdhbWVGYWN0b3J5O1xuICAgIH1cblxuKTtcblxuIiwiYXBwLmZhY3RvcnkoJ1VzZXJGYWN0b3J5JywgZnVuY3Rpb24oJGh0dHAsICRsb2NhbFN0b3JhZ2UpIHtcbiAgICBjb25zdCBvdXJJcHMgPSB7XG4gICAgICAgIG5pa2l0YTogXCIxOTIuMTY4LjQuMjEzXCIsXG4gICAgICAgIGtheWxhOiBcIjE5Mi4xNjguNC4yMjVcIixcbiAgICAgICAgbml0aHlhOiBcIjE5Mi4xNjguMS40OFwiLFxuICAgICAgICBkYW46IFwiMTkyLjE2OC40LjIzNlwiXG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudElwID0gb3VySXBzLmtheWxhXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0VXNlcjogZnVuY3Rpb24oaW5mbykge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgIHVybDogYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvdXNlcnNgLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGluZm9cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TG9jYWxTdG9yYWdlKHJlcy5kYXRhLnVzZXJbMF0sIHJlcy5kYXRhLnRlYW1bMF0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGdldFNsYWNrQ3JlZHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9zbGFja2ApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5kYXRhXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0U2xhY2tJbmZvOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2h0dHBzOi8vc2xhY2suY29tL2FwaS91c2Vycy5pZGVudGl0eScpXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0TG9jYWxTdG9yYWdlOiBmdW5jdGlvbih1c2VyLCB0ZWFtKSB7XG4gICAgICAgICAgICAkbG9jYWxTdG9yYWdlLnVzZXIgPSB1c2VyO1xuICAgICAgICAgICAgJGxvY2FsU3RvcmFnZS50ZWFtID0gdGVhbTtcbiAgICAgICAgfSxcblxuICAgICAgICBsb2dPdXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGxvY2FsU3RvcmFnZS4kcmVzZXQoKTtcbiAgICAgICAgfVxuICAgIH1cbn0pXG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
