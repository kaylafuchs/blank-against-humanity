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
                gameRef.child('players/' + winner + '/blackCardsWon').update(blackCardWon);
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
        console.log("###TEAM ID", teamId);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImNhcmRzLXRlc3QvY2FyZHNUZXN0LmpzIiwiZGVja3MvZGVja3MuanMiLCJmcm9tIGZzZy9mcm9tLWZzZy5qcyIsImdhbWUvZ2FtZS5qcyIsImhvbWUvaG9tZS5qcyIsImxvZ2luL2xvZ2luLmpzIiwibmV3LWdhbWUvbmV3LWdhbWUuanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiLCJjb21tb24vZGlyZWN0aXZlcy9zdWJtaXR0ZWQtY2FyZHMuanMiLCJjb21tb24vZGlyZWN0aXZlcy93aGl0ZS1jYXJkcy5qcyIsImNvbW1vbi9mYWN0b3JpZXMvQWN0aXZlR2FtZUZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yaWVzL0dhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy91c2VyRmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJhcHAiLCJhbmd1bGFyIiwibW9kdWxlIiwicnVuIiwiJGlvbmljUGxhdGZvcm0iLCJyZWFkeSIsImNvcmRvdmEiLCJwbHVnaW5zIiwiS2V5Ym9hcmQiLCJoaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIiLCJkaXNhYmxlU2Nyb2xsIiwiU3RhdHVzQmFyIiwic3R5bGVMaWdodENvbnRlbnQiLCJjb250cm9sbGVyIiwiJHNjb3BlIiwiVXNlckZhY3RvcnkiLCIkc3RhdGUiLCIkbG9jYWxTdG9yYWdlIiwiJHRpbWVvdXQiLCJsb2dPdXQiLCJnbyIsImNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwic3RhdGUiLCJ1cmwiLCJ0ZW1wbGF0ZVVybCIsImdyZWV0aW5nIiwicmVzb2x2ZSIsImRlY2tzIiwiR2FtZUZhY3RvcnkiLCIkc3RhdGVQYXJhbXMiLCJnZXREZWNrc0J5VGVhbUlkIiwic3RhdGVQYXJhbXMiLCJ0ZWFtSWQiLCJBY3RpdmVHYW1lRmFjdG9yeSIsImdhbWVJZCIsInBsYXllcklkIiwidXNlciIsImlkIiwiZ2FtZVJlZiIsImZpcmViYXNlIiwiZGF0YWJhc2UiLCJyZWYiLCJvbiIsImdhbWUiLCJnYW1lU25hcHNob3QiLCJ2YWwiLCJnYW1lTmFtZSIsInNldHRpbmdzIiwibmFtZSIsInBsYXllcnMiLCJoYW5kIiwicGxheWVySGFuZCIsInBsYXllckhhbmRDb3VudCIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJibGFja0NhcmQiLCJjdXJyZW50QmxhY2tDYXJkIiwidGV4dCIsImNvbnNvbGUiLCJsb2ciLCJqdWRnZSIsImN1cnJlbnRKdWRnZSIsInN1Ym1pdHRlZFdoaXRlQ2FyZHMiLCIkZXZhbEFzeW5jIiwic2hvd0NhcmRzIiwic3VibWl0dGVkIiwib25Td2lwZURvd24iLCJqb2luR2FtZUJ5SWQiLCJ0aGVuIiwicmVmaWxsTXlIYW5kIiwib25Eb3VibGVUYXAiLCJjYXJkSWQiLCJjYXJkVGV4dCIsInN1Ym1pdFdoaXRlQ2FyZCIsImdldFN1Ym1pdHRlZFBsYXllcnMiLCJwbGF5ZXJzVG9TdWJtaXQiLCJqdWRnZURvdWJsZVRhcCIsInBpY2tXaW5uaW5nV2hpdGVDYXJkIiwiXyIsImtleUJ5IiwiY2FyZCIsInN1Ym1pdHRlZEJ5IiwiJHVybFJvdXRlclByb3ZpZGVyIiwiZ2FtZXMiLCJnZXRHYW1lc0J5VGVhbUlkIiwiJGNvcmRvdmFPYXV0aCIsIiRpb25pY1BvcHVwIiwic3RhcnROZXdHYW1lIiwic3RvcmFnZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJnb1RvTmV3R2FtZSIsIm90aGVyd2lzZSIsIiRpb25pY1NpZGVNZW51RGVsZWdhdGUiLCJsb2dpbldpdGhTbGFjayIsImdldFNsYWNrQ3JlZHMiLCJzbGFjayIsImNyZWRzIiwiY2xpZW50SUQiLCJjbGllbnRTZWNyZXQiLCJzZXRVc2VyIiwiaW5mbyIsImNhbkRyYWdDb250ZW50IiwiJG9uIiwicmVkaXJlY3RVc2VyIiwiYWJzdHJhY3QiLCJ0ZWFtRGVja3MiLCJzdGFuZGFyZERlY2siLCJjYXJkcyIsImdldENhcmRzQnlEZWNrSWQiLCJkZWNrSWQiLCJjdXJyZW50VmlldyIsImdhbWVDb25maWciLCJnb1RvRGVja3MiLCJsb2NhdGlvbiIsInJlbG9hZCIsImNvbmNhdCIsImFkZFBpbGVUb0dhbWUiLCJhZGREZWNrc1RvR2FtZSIsImFkZERlY2tzIiwiZGlyZWN0aXZlIiwicmVzdHJpY3QiLCJmYWN0b3J5IiwiJGh0dHAiLCIkcm9vdFNjb3BlIiwicmVmaWxsZXIiLCJjYXJkc05lZWRlZCIsInBpbGVSZWYiLCJoYW5kUmVmIiwibGltaXRUb0ZpcnN0Iiwib25jZSIsImNhcmRzU25hcHNob3QiLCJmb3JFYWNoIiwidXBkYXRlT2JqIiwidHJhbnNhY3Rpb24iLCJrZXkiLCJjYXJkRGF0YSIsInVwZGF0ZSIsImNhdGNoIiwiZXJyIiwiY2hpbGQiLCJoYW5kU25hcHNob3QiLCJudW1DaGlsZHJlbiIsImZpcmViYXNlTW92ZVNpbmdsZUtleVZhbHVlIiwib2xkUmVmIiwibmV3UmVmIiwicmVtb3ZlVXBkYXRlIiwibmV3VXBkYXRlIiwic25hcHNob3QiLCJwYXJlbnQiLCJjYXJkVG9TdWJtaXQiLCJzdWJtaXRSZWYiLCJzZXQiLCJ3aW5uZXIiLCJibGFja0NhcmRJZCIsImJsYWNrQ2FyZFdvbiIsIndpbm5lcklkIiwic2V0Um91bmRTdGF0ZVRvT3ZlciIsImF3YXJkQmxhY2tDYXJkIiwiUHJvbWlzZSIsImFsbCIsInJlbW92ZSIsIm91cklwcyIsIm5pa2l0YSIsImtheWxhIiwibml0aHlhIiwiZGFuIiwiY3VycmVudElwIiwidGVhbSIsImNyZWF0b3JJZCIsInBvc3QiLCJjcmVhdG9yTmFtZSIsInJlcyIsImRhdGEiLCIkYnJvYWRjYXN0IiwiZ2V0IiwiZGVja3NBcnIiLCJwdXNoIiwicGxheWVyTmFtZSIsInBsYXllclJlZiIsImdldFVzZXJzQnlHYW1lSWQiLCJnZXRHYW1lQnlHYW1lSWQiLCJnYW1lc1JlZiIsImdldEdhbWVzQnlVc2VyIiwidXNlcklkIiwibWV0aG9kIiwiaGVhZGVycyIsInNldExvY2FsU3RvcmFnZSIsImdldFNsYWNrSW5mbyIsIiRyZXNldCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQUEsT0FBQUMsR0FBQSxHQUFBQyxRQUFBQyxNQUFBLENBQUEsc0JBQUEsRUFBQSxDQUFBLE9BQUEsRUFBQSxXQUFBLEVBQUEsV0FBQSxFQUFBLGdCQUFBLEVBQUEsV0FBQSxFQUFBLFdBQUEsQ0FBQSxDQUFBOztBQUdBRixJQUFBRyxHQUFBLENBQUEsVUFBQUMsY0FBQSxFQUFBO0FBQ0FBLG1CQUFBQyxLQUFBLENBQUEsWUFBQTtBQUNBLFlBQUFOLE9BQUFPLE9BQUEsSUFBQVAsT0FBQU8sT0FBQSxDQUFBQyxPQUFBLENBQUFDLFFBQUEsRUFBQTtBQUNBO0FBQ0E7QUFDQUYsb0JBQUFDLE9BQUEsQ0FBQUMsUUFBQSxDQUFBQyx3QkFBQSxDQUFBLElBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0FILG9CQUFBQyxPQUFBLENBQUFDLFFBQUEsQ0FBQUUsYUFBQSxDQUFBLElBQUE7QUFDQTtBQUNBLFlBQUFYLE9BQUFZLFNBQUEsRUFBQTtBQUNBQSxzQkFBQUMsaUJBQUE7QUFDQTtBQUNBLEtBZEE7QUFnQkEsQ0FqQkE7O0FDVEFaLElBQUFhLFVBQUEsQ0FBQSxZQUFBLEVBQUEsVUFBQUMsTUFBQSxFQUFBQyxXQUFBLEVBQUFDLE1BQUEsRUFBQUMsYUFBQSxFQUFBQyxRQUFBLEVBQUE7QUFDQUosV0FBQUssTUFBQSxHQUFBLFlBQUE7QUFDQUosb0JBQUFJLE1BQUE7QUFDQUgsZUFBQUksRUFBQSxDQUFBLE9BQUE7QUFDQSxLQUhBO0FBSUEsQ0FMQTtBQ0FBcEIsSUFBQXFCLE1BQUEsQ0FBQSxVQUFBQyxjQUFBLEVBQUE7QUFDQUEsbUJBQUFDLEtBQUEsQ0FBQSxPQUFBLEVBQUE7QUFDQUMsYUFBQSxRQURBO0FBRUFDLHFCQUFBLCtCQUZBO0FBR0FaLG9CQUFBO0FBSEEsS0FBQTtBQUtBLENBTkE7O0FBUUFiLElBQUFhLFVBQUEsQ0FBQSxlQUFBLEVBQUEsVUFBQUMsTUFBQSxFQUFBO0FBQ0FBLFdBQUFZLFFBQUEsR0FBQSxJQUFBO0FBQ0EsQ0FGQTtBQ1JBMUIsSUFBQXFCLE1BQUEsQ0FBQSxVQUFBQyxjQUFBLEVBQUE7QUFDQUEsbUJBQUFDLEtBQUEsQ0FBQSxPQUFBLEVBQUE7QUFDQUMsYUFBQSxlQURBO0FBRUFDLHFCQUFBLHFCQUZBO0FBR0FaLG9CQUFBLFVBSEE7QUFJQWMsaUJBQUE7QUFDQUMsbUJBQUEsZUFBQUMsV0FBQSxFQUFBQyxZQUFBO0FBQUEsdUJBQUFELFlBQUFFLGdCQUFBLENBQUFDLFlBQUFDLE1BQUEsQ0FBQTtBQUFBO0FBREE7QUFKQSxLQUFBO0FBU0EsQ0FWQTs7QUFZQWpDLElBQUFhLFVBQUEsQ0FBQSxVQUFBLEVBQUEsVUFBQUMsTUFBQSxFQUFBLENBSUEsQ0FKQTtBQ1pBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7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QUFDLElBQUEsRUFBQTtBQUFBOztBQUNBLG1CQUFBc0IsTUFBQTtBQUNBOEQsd0JBQUEsTUFEQTtBQUVBbkssaUNBQUFpSixTQUFBLG9CQUZBO0FBR0FtQix5QkFBQTtBQUNBLG9DQUFBO0FBREEsaUJBSEE7QUFNQWIsc0JBQUF4RTtBQU5BLGFBQUEsRUFRQWpDLElBUkEsQ0FRQSxlQUFBO0FBQ0Esc0JBQUF1SCxlQUFBLENBQUFmLElBQUFDLElBQUEsQ0FBQTFJLElBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQXlJLElBQUFDLElBQUEsQ0FBQUwsSUFBQSxDQUFBLENBQUEsQ0FBQTtBQUNBLGFBVkEsQ0FBQTtBQVdBLFNBYkE7QUFjQXpFLHVCQUFBLHlCQUFBO0FBQ0EsbUJBQUE0QixNQUFBb0QsR0FBQSxhQUFBUixTQUFBLHNCQUNBbkcsSUFEQSxDQUNBLGVBQUE7QUFDQSx1QkFBQXdHLElBQUFDLElBQUE7QUFDQSxhQUhBLENBQUE7QUFJQSxTQW5CQTtBQW9CQWUsc0JBQUEsd0JBQUE7QUFDQSxtQkFBQWpFLE1BQUFvRCxHQUFBLENBQUEsc0NBQUEsQ0FBQTtBQUNBLFNBdEJBOztBQXdCQVkseUJBQUEseUJBQUF4SixJQUFBLEVBQUFxSSxJQUFBLEVBQUE7QUFDQXpKLDBCQUFBb0IsSUFBQSxHQUFBQSxJQUFBO0FBQ0FwQiwwQkFBQXlKLElBQUEsR0FBQUEsSUFBQTtBQUNBLFNBM0JBOztBQTZCQXZKLGdCQUFBLGtCQUFBO0FBQ0FGLDBCQUFBOEssTUFBQTtBQUNBO0FBL0JBLEtBQUE7QUFpQ0EsQ0ExQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIElvbmljIFN0YXJ0ZXIgQXBwXG5cbi8vIGFuZ3VsYXIubW9kdWxlIGlzIGEgZ2xvYmFsIHBsYWNlIGZvciBjcmVhdGluZywgcmVnaXN0ZXJpbmcgYW5kIHJldHJpZXZpbmcgQW5ndWxhciBtb2R1bGVzXG4vLyAnc3RhcnRlcicgaXMgdGhlIG5hbWUgb2YgdGhpcyBhbmd1bGFyIG1vZHVsZSBleGFtcGxlIChhbHNvIHNldCBpbiBhIDxib2R5PiBhdHRyaWJ1dGUgaW4gaW5kZXguaHRtbClcbi8vIHRoZSAybmQgcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9mICdyZXF1aXJlcydcblxud2luZG93LmFwcCA9IGFuZ3VsYXIubW9kdWxlKCdCbGFua0FnYWluc3RIdW1hbml0eScsIFsnaW9uaWMnLCAndWkucm91dGVyJywgJ25nQ29yZG92YScsICduZ0NvcmRvdmFPYXV0aCcsICduZ1N0b3JhZ2UnLCAnbmdBbmltYXRlJ10pXG5cblxuYXBwLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxuICAgICAgICAgICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcblxuICAgICAgICAgICAgLy8gRG9uJ3QgcmVtb3ZlIHRoaXMgbGluZSB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nLiBJdCBzdG9wcyB0aGUgdmlld3BvcnRcbiAgICAgICAgICAgIC8vIGZyb20gc25hcHBpbmcgd2hlbiB0ZXh0IGlucHV0cyBhcmUgZm9jdXNlZC4gSW9uaWMgaGFuZGxlcyB0aGlzIGludGVybmFsbHkgZm9yXG4gICAgICAgICAgICAvLyBhIG11Y2ggbmljZXIga2V5Ym9hcmQgZXhwZXJpZW5jZS5cbiAgICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5kaXNhYmxlU2Nyb2xsKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICAgICAgICBTdGF0dXNCYXIuc3R5bGVMaWdodENvbnRlbnQoKVxuICAgICAgICB9XG4gICAgfSk7XG5cbn0pXG5cbiIsImFwcC5jb250cm9sbGVyKCdMb2dvdXRDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBVc2VyRmFjdG9yeSwgJHN0YXRlLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCl7XG5cdCRzY29wZS5sb2dPdXQgPSBmdW5jdGlvbigpe1xuXHRcdFVzZXJGYWN0b3J5LmxvZ091dCgpXG5cdFx0JHN0YXRlLmdvKCdsb2dpbicpXG5cdH1cbn0pIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcil7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdjYXJkcycsIHtcblx0XHR1cmw6ICcvY2FyZHMnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvY2FyZHMtdGVzdC9jYXJkcy10ZXN0Lmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdDYXJkc1Rlc3RDdHJsJ1xuXHR9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0NhcmRzVGVzdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpe1xuIFx0JHNjb3BlLmdyZWV0aW5nID0gXCJISVwiXG59KSIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdkZWNrcycsIHtcblx0XHR1cmw6ICdkZWNrcy86dGVhbWlkJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2RlY2tzL2RlY2tzLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdEZWNrQ3RybCcsXG5cdFx0cmVzb2x2ZToge1xuXHRcdFx0ZGVja3M6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkKHN0YXRlUGFyYW1zLnRlYW1JZClcblx0XHR9XG5cdH0pXG5cbn0pXG5cbmFwcC5jb250cm9sbGVyKCdEZWNrQ3RybCcsICgkc2NvcGUpID0+IHtcblxuXG5cdFxufSkiLCIvLyAoZnVuY3Rpb24gKCkge1xuXG4vLyAgICAgJ3VzZSBzdHJpY3QnO1xuXG4vLyAgICAgLy8gSG9wZSB5b3UgZGlkbid0IGZvcmdldCBBbmd1bGFyISBEdWgtZG95LlxuLy8gICAgIGlmICghd2luZG93LmFuZ3VsYXIpIHRocm93IG5ldyBFcnJvcignSSBjYW5cXCd0IGZpbmQgQW5ndWxhciEnKTtcblxuLy8gICAgIHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnZnNhUHJlQnVpbHQnLCBbXSk7XG5cbi8vICAgICBhcHAuZmFjdG9yeSgnU29ja2V0JywgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICBpZiAoIXdpbmRvdy5pbykgdGhyb3cgbmV3IEVycm9yKCdzb2NrZXQuaW8gbm90IGZvdW5kIScpO1xuLy8gICAgICAgICByZXR1cm4gd2luZG93LmlvKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pO1xuLy8gICAgIH0pO1xuXG4vLyAgICAgLy8gQVVUSF9FVkVOVFMgaXMgdXNlZCB0aHJvdWdob3V0IG91ciBhcHAgdG9cbi8vICAgICAvLyBicm9hZGNhc3QgYW5kIGxpc3RlbiBmcm9tIGFuZCB0byB0aGUgJHJvb3RTY29wZVxuLy8gICAgIC8vIGZvciBpbXBvcnRhbnQgZXZlbnRzIGFib3V0IGF1dGhlbnRpY2F0aW9uIGZsb3cuXG4vLyAgICAgYXBwLmNvbnN0YW50KCdBVVRIX0VWRU5UUycsIHtcbi8vICAgICAgICAgbG9naW5TdWNjZXNzOiAnYXV0aC1sb2dpbi1zdWNjZXNzJyxcbi8vICAgICAgICAgbG9naW5GYWlsZWQ6ICdhdXRoLWxvZ2luLWZhaWxlZCcsXG4vLyAgICAgICAgIGxvZ291dFN1Y2Nlc3M6ICdhdXRoLWxvZ291dC1zdWNjZXNzJyxcbi8vICAgICAgICAgc2Vzc2lvblRpbWVvdXQ6ICdhdXRoLXNlc3Npb24tdGltZW91dCcsXG4vLyAgICAgICAgIG5vdEF1dGhlbnRpY2F0ZWQ6ICdhdXRoLW5vdC1hdXRoZW50aWNhdGVkJyxcbi8vICAgICAgICAgbm90QXV0aG9yaXplZDogJ2F1dGgtbm90LWF1dGhvcml6ZWQnXG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuZmFjdG9yeSgnQXV0aEludGVyY2VwdG9yJywgZnVuY3Rpb24gKCRyb290U2NvcGUsICRxLCBBVVRIX0VWRU5UUykge1xuLy8gICAgICAgICB2YXIgc3RhdHVzRGljdCA9IHtcbi8vICAgICAgICAgICAgIDQwMTogQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCxcbi8vICAgICAgICAgICAgIDQwMzogQVVUSF9FVkVOVFMubm90QXV0aG9yaXplZCxcbi8vICAgICAgICAgICAgIDQxOTogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsXG4vLyAgICAgICAgICAgICA0NDA6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0XG4vLyAgICAgICAgIH07XG4vLyAgICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgICAgICByZXNwb25zZUVycm9yOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3Qoc3RhdHVzRGljdFtyZXNwb25zZS5zdGF0dXNdLCByZXNwb25zZSk7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXNwb25zZSlcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfTtcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5jb25maWcoZnVuY3Rpb24gKCRodHRwUHJvdmlkZXIpIHtcbi8vICAgICAgICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaChbXG4vLyAgICAgICAgICAgICAnJGluamVjdG9yJyxcbi8vICAgICAgICAgICAgIGZ1bmN0aW9uICgkaW5qZWN0b3IpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJGluamVjdG9yLmdldCgnQXV0aEludGVyY2VwdG9yJyk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIF0pO1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLnNlcnZpY2UoJ0F1dGhTZXJ2aWNlJywgZnVuY3Rpb24gKCRodHRwLCBTZXNzaW9uLCAkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUywgJHEpIHtcblxuLy8gICAgICAgICBmdW5jdGlvbiBvblN1Y2Nlc3NmdWxMb2dpbihyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgdmFyIHVzZXIgPSByZXNwb25zZS5kYXRhLnVzZXI7XG4vLyAgICAgICAgICAgICBTZXNzaW9uLmNyZWF0ZSh1c2VyKTtcbi8vICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dpblN1Y2Nlc3MpO1xuLy8gICAgICAgICAgICAgcmV0dXJuIHVzZXI7XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICAvLyBVc2VzIHRoZSBzZXNzaW9uIGZhY3RvcnkgdG8gc2VlIGlmIGFuXG4vLyAgICAgICAgIC8vIGF1dGhlbnRpY2F0ZWQgdXNlciBpcyBjdXJyZW50bHkgcmVnaXN0ZXJlZC5cbi8vICAgICAgICAgdGhpcy5pc0F1dGhlbnRpY2F0ZWQgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gISFTZXNzaW9uLnVzZXI7XG4vLyAgICAgICAgIH07XG5cbiAgICAgICAgXG4vLyAgICAgICAgIHRoaXMuaXNBZG1pbiA9IGZ1bmN0aW9uKHVzZXJJZCl7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZygncnVubmluZyBhZG1pbiBmdW5jJylcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJylcbi8vICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEudXNlci5pc0FkbWluKVxuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgdGhpcy5nZXRMb2dnZWRJblVzZXIgPSBmdW5jdGlvbiAoZnJvbVNlcnZlcikge1xuXG4vLyAgICAgICAgICAgICAvLyBJZiBhbiBhdXRoZW50aWNhdGVkIHNlc3Npb24gZXhpc3RzLCB3ZVxuLy8gICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSB1c2VyIGF0dGFjaGVkIHRvIHRoYXQgc2Vzc2lvblxuLy8gICAgICAgICAgICAgLy8gd2l0aCBhIHByb21pc2UuIFRoaXMgZW5zdXJlcyB0aGF0IHdlIGNhblxuLy8gICAgICAgICAgICAgLy8gYWx3YXlzIGludGVyZmFjZSB3aXRoIHRoaXMgbWV0aG9kIGFzeW5jaHJvbm91c2x5LlxuXG4vLyAgICAgICAgICAgICAvLyBPcHRpb25hbGx5LCBpZiB0cnVlIGlzIGdpdmVuIGFzIHRoZSBmcm9tU2VydmVyIHBhcmFtZXRlcixcbi8vICAgICAgICAgICAgIC8vIHRoZW4gdGhpcyBjYWNoZWQgdmFsdWUgd2lsbCBub3QgYmUgdXNlZC5cblxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuaXNBdXRoZW50aWNhdGVkKCkgJiYgZnJvbVNlcnZlciAhPT0gdHJ1ZSkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKFNlc3Npb24udXNlcik7XG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIC8vIE1ha2UgcmVxdWVzdCBHRVQgL3Nlc3Npb24uXG4vLyAgICAgICAgICAgICAvLyBJZiBpdCByZXR1cm5zIGEgdXNlciwgY2FsbCBvblN1Y2Nlc3NmdWxMb2dpbiB3aXRoIHRoZSByZXNwb25zZS5cbi8vICAgICAgICAgICAgIC8vIElmIGl0IHJldHVybnMgYSA0MDEgcmVzcG9uc2UsIHdlIGNhdGNoIGl0IGFuZCBpbnN0ZWFkIHJlc29sdmUgdG8gbnVsbC5cbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJykudGhlbihvblN1Y2Nlc3NmdWxMb2dpbikuY2F0Y2goZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuLy8gICAgICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmxvZ2luID0gZnVuY3Rpb24gKGNyZWRlbnRpYWxzKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2xvZ2luJywgY3JlZGVudGlhbHMpXG4vLyAgICAgICAgICAgICAgICAgLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pXG4vLyAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCh7IG1lc3NhZ2U6ICdJbnZhbGlkIGxvZ2luIGNyZWRlbnRpYWxzLid9KTtcbi8vICAgICAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLnNpZ251cCA9IGZ1bmN0aW9uKGNyZWRlbnRpYWxzKXtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4vLyAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4vLyAgICAgICAgICAgICAgICAgdXJsOiAnL3NpZ251cCcsXG4vLyAgICAgICAgICAgICAgICAgZGF0YTogY3JlZGVudGlhbHNcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4gcmVzdWx0LmRhdGEpXG4vLyAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oKXtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHttZXNzYWdlOiAnVGhhdCBlbWFpbCBpcyBhbHJlYWR5IGJlaW5nIHVzZWQuJ30pO1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmxvZ291dCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9sb2dvdXQnKS50aGVuKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICBTZXNzaW9uLmRlc3Ryb3koKTtcbi8vICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoQVVUSF9FVkVOVFMubG9nb3V0U3VjY2Vzcyk7XG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfTtcblxuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLnNlcnZpY2UoJ1Nlc3Npb24nLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMpIHtcblxuLy8gICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbi8vICAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCwgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgc2VsZi5kZXN0cm95KCk7XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgICRyb290U2NvcGUuJG9uKEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0LCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICBzZWxmLmRlc3Ryb3koKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcblxuLy8gICAgICAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uICh1c2VyKSB7XG4vLyAgICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICB9KTtcblxuLy8gfSgpKTtcbiIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnL2dhbWUvOmdhbWVJZCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvZ2FtZS9nYW1lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnR2FtZUN0cmwnLFxuICAgICAgICAvLyByZXNvbHZlOiB7XG4gICAgICAgIC8vICAgICBnYW1lIDogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldEdhbWVCeUdhbWVJZCgkc3RhdGVQYXJhbXMuZ2FtZUlkKVxuICAgICAgICAvLyB9ICBcbiAgICB9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0dhbWVDdHJsJywgKCRzY29wZSwgR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcywgJGxvY2FsU3RvcmFnZSwgQWN0aXZlR2FtZUZhY3RvcnkpID0+IHsgICBcbiAgICAvLyBjb25zdCBnYW1lSWQgPSAkc3RhdGVQYXJhbXMuZ2FtZUlkO1xuICAgICRzY29wZS5nYW1lSWQgPSA1NztcbiAgICBjb25zdCBwbGF5ZXJJZCA9ICRsb2NhbFN0b3JhZ2UudXNlci5pZDtcbiAgICBjb25zdCB0ZWFtSWQgPSAyOyBcbiAgICAvLyBjb25zdCB0ZWFtSWQgPSAkbG9jYWxTdG9yYWdlLnRlYW0uaWRcbiAgICBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8keyRzY29wZS5nYW1lSWR9L2ApO1xuXG4gICAgZ2FtZVJlZi5vbigndmFsdWUnLCBnYW1lU25hcHNob3QgPT4ge1xuICAgICAgICAkc2NvcGUuZ2FtZSA9IGdhbWVTbmFwc2hvdC52YWwoKTtcbiAgICAgICAgJHNjb3BlLmdhbWVOYW1lID0gJHNjb3BlLmdhbWUuc2V0dGluZ3MubmFtZTtcbiAgICAgICAgaWYgKCRzY29wZS5nYW1lLnBsYXllcnNbcGxheWVySWRdLmhhbmQpe1xuICAgICAgICAgICAgJHNjb3BlLnBsYXllckhhbmQgPSAkc2NvcGUuZ2FtZS5wbGF5ZXJzW3BsYXllcklkXS5oYW5kO1xuICAgICAgICAgICAgJHNjb3BlLnBsYXllckhhbmRDb3VudCA9IE9iamVjdC5rZXlzKCRzY29wZS5wbGF5ZXJIYW5kKS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLmJsYWNrQ2FyZCA9ICRzY29wZS5nYW1lLmN1cnJlbnRCbGFja0NhcmRbMV0udGV4dFxuICAgICAgICBjb25zb2xlLmxvZyhcImJsYWNrQ2FyZFwiLCAkc2NvcGUuYmxhY2tDYXJkKVxuICAgICAgICAkc2NvcGUuanVkZ2UgPSAkc2NvcGUuZ2FtZS5jdXJyZW50SnVkZ2U7XG4gICAgICAgICRzY29wZS5wbGF5ZXJzID0gJHNjb3BlLmdhbWUucGxheWVycztcbiAgICAgICAgY29uc29sZS5sb2coXCJwbGF5ZXJzXCIsJHNjb3BlLnBsYXllcnMpXG4gICAgICAgIGNvbnNvbGUubG9nKFwidHlwZW9mIHBsYXllcnNcIiwgdHlwZW9mICRzY29wZS5wbGF5ZXJzKVxuICAgICAgICAkc2NvcGUuc3VibWl0dGVkV2hpdGVDYXJkcyA9ICRzY29wZS5nYW1lLnN1Ym1pdHRlZFdoaXRlQ2FyZHNcbiAgICAgICAgJHNjb3BlLiRldmFsQXN5bmMoKTtcbiAgICB9KVxuICAgXG4gICAgJHNjb3BlLnNob3dDYXJkcyA9IGZhbHNlO1xuICAgICRzY29wZS5zdWJtaXR0ZWQgPSBmYWxzZTtcblxuXG4gICAgJHNjb3BlLm9uU3dpcGVEb3duID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWQoZ2FtZUlkKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgQWN0aXZlR2FtZUZhY3RvcnkucmVmaWxsTXlIYW5kKCRzY29wZS5nYW1lSWQsIHBsYXllcklkLCB0ZWFtSWQpXG4gICAgICAgICAgJHNjb3BlLnNob3dDYXJkcyA9IHRydWU7XG4gICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnBsYXllckhhbmQpXG4gICAgICAgICAgJHNjb3BlLiRldmFsQXN5bmMoKTtcbiAgICAgICAgfSlcbiAgICB9ICBcblxuICAgICRzY29wZS5vbkRvdWJsZVRhcCA9IChjYXJkSWQsIGNhcmRUZXh0KSA9PiB7XG4gICAgICAgIEFjdGl2ZUdhbWVGYWN0b3J5LnN1Ym1pdFdoaXRlQ2FyZChwbGF5ZXJJZCwgY2FyZElkLCAkc2NvcGUuZ2FtZUlkLCB0ZWFtSWQsIGNhcmRUZXh0KVxuICAgICAgICAkc2NvcGUuZ2V0U3VibWl0dGVkUGxheWVycygpO1xuICAgICAgICAkc2NvcGUuc3VibWl0dGVkID0gdHJ1ZTtcbiAgICAgICAgJHNjb3BlLiRldmFsQXN5bmMoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJzdWJtaXR0ZWQgcGxheWVyc1wiLCAkc2NvcGUucGxheWVyc1RvU3VibWl0KVxuICAgICAgICBjb25zb2xlLmxvZyhcInN1Ym1pdHRlZFwiLCAkc2NvcGUuc3VibWl0dGVkKVxuICAgIH1cblxuICAgICRzY29wZS5qdWRnZURvdWJsZVRhcCA9IChjYXJkSWQpID0+IHtcbiAgICAgICAgLy8gaWYgKHBsYXllcklkID09PSBqdWRnZSkge1xuICAgICAgICAgICAgQWN0aXZlR2FtZUZhY3RvcnkucGlja1dpbm5pbmdXaGl0ZUNhcmQoY2FyZElkLCAkc2NvcGUuZ2FtZUlkLCB0ZWFtSWQpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImp1ZGdpbmdcIilcbiAgICAgICAgLy8gfVxuICAgIH1cblxuXG4gICAgJHNjb3BlLmdldFN1Ym1pdHRlZFBsYXllcnMgPSAoKSA9PiB7XG4gICAgICAgICRzY29wZS5wbGF5ZXJzVG9TdWJtaXQgPSAgXy5rZXlCeSgkc2NvcGUuc3VibWl0dGVkV2hpdGVDYXJkcywgY2FyZCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2FyZC5zdWJtaXR0ZWRCeTsgXG4gICAgICAgIH0pXG4gICAgfVxuXG59KVxuXG5cbi8vIGFwcC5jb250cm9sbGVyKFwiQWN0aXZlR2FtZUN0cmxcIiwgKCRzY29wZSwgR2FtZUZhY3RvcnksIEFjdGl2ZUdhbWVGYWN0b3J5LCBnYW1lLCAkc3RhdGVQYXJhbXMsICRsb2NhbFN0b3JhZ2UsICRzdGF0ZSkgPT4ge1xuXG4gICAgXG4vLyAgICAgJHNjb3BlLm9uU3dpcGVEb3duID0gKCkgPT4ge1xuLy8gICAgICAgICBjb25zb2xlLmxvZygnd29ya2luZycpO1xuLy8gICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuc2hvd0NhcmRzKTtcbi8vICAgICAgICAgJHNjb3BlLnNob3dDYXJkcyA9IHRydWUgO1xuLy8gICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuc2hvd0NhcmRzKTtcbi8vICAgICAgICAgJHNjb3BlLiRldmFsQXN5bmMoKTtcbi8vICAgICB9XG5cbi8vICAgICAkc2NvcGUub25Td2lwZVVwID0gKCkgPT4ge1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhcInN3aXBlZCB1cFwiKTtcbi8vICAgICB9XG5cbi8vICAgICAkc2NvcGUub25Eb3VibGVUYXAgPSAoa2V5KSA9PiB7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwiZG91YmxlIHRhcHBlZFwiKVxuLy8gICAgICAgICAkc2NvcGUucGxheWVkID0gdHJ1ZTtcbi8vICAgICAgICAgLy9jYWxsIHN1Ym1pdCBjYXJkIGZ1bmN0aW9uIGhlcmUuXG4vLyAgICAgfVxuXG4vLyAgICAgQWN0aXZlR2FtZUZhY3RvcnkucmVmaWxsTXlIYW5kKCRzY29wZS5nYW1lSWQsICRzY29wZS5wbGF5ZXJJZCwgJHNjb3BlLnRlYW1JZCk7XG5cbi8vICAgICAkc2NvcGUuJG9uKCdjaGFuZ2VkR2FtZScsIChldmVudCxzbmFwc2hvdCkgPT57XG4vLyAgICAgICAgICRzY29wZS5nYW1lID0gc25hcHNob3Q7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5nYW1lKTtcbi8vICAgICAgICAgaWYoZ2FtZS5zdGF0ZSA9PT0gJ3N1Ym1pc3Npb24nKXtcbi8vICAgICAgICAgICAgICRzdGF0ZS5nbygnZ2FtZS5zdWJtaXNzaW9uLWdhbWUnKVxuLy8gICAgICAgICB9IFxuLy8gICAgIH0pXG4vLyB9KVxuXG5cblxuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgIHVybDogJy8nLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2hvbWUvaG9tZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgZ2FtZXM6IGZ1bmN0aW9uKEdhbWVGYWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdIb21lQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCAkY29yZG92YU9hdXRoLCBVc2VyRmFjdG9yeSwgR2FtZUZhY3RvcnksICRsb2NhbFN0b3JhZ2UsIGdhbWVzLCAkaW9uaWNQb3B1cCkge1xuICAgICRzY29wZS5zdGFydE5ld0dhbWUgPSBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWU7XG4gICAgJHNjb3BlLnN0b3JhZ2UgPSAkbG9jYWxTdG9yYWdlO1xuICAgICRzY29wZS5nYW1lcyA9IGdhbWVzO1xuXG4gICAgY29uc29sZS5sb2coXCJnYW1lc1wiLCBKU09OLnN0cmluZ2lmeSgkc2NvcGUuZ2FtZXMpKVxuICAgICRzY29wZS5nb1RvTmV3R2FtZSA9ICgpID0+IHtcbiAgICAgICAgJHN0YXRlLmdvKCduZXctZ2FtZS5tYWluJylcbiAgICB9XG5cblxuICAgIC8vICRzY29wZS5qb2luR2FtZSA9IEdhbWVGYWN0b3J5LmpvaW5HYW1lQnlJZDtcblxuICAgIC8vICRzY29wZS5zaG93UG9wdXAgPSBmdW5jdGlvbihnYW1lSWQpIHtcblxuICAgIC8vICAgICAkc2NvcGUuZ2FtZSA9ICRzY29wZS5nYW1lc1tnYW1lSWRdO1xuICAgIC8vICAgICAkc2NvcGUuZ2FtZU5hbWUgPSAkc2NvcGUuZ2FtZS5zZXR0aW5ncy5uYW1lO1xuICAgIC8vICAgICAkc2NvcGUucGxheWVyQ291bnQgPSBPYmplY3Qua2V5cygkc2NvcGUuZ2FtZS5wbGF5ZXJzKS5sZW5ndGg7XG4gICAgLy8gICAgICRzY29wZS53YWl0aW5nRm9yUGxheWVycyA9ICAoJHNjb3BlLmdhbWUuc2V0dGluZ3MubWluUGxheWVycyB8fCA0KSAtICRzY29wZS5wbGF5ZXJDb3VudDtcbiAgICAgICAgIFxuICAgIC8vICAgICAgY29uc3QgbXlQb3B1cCA9ICRpb25pY1BvcHVwLnNob3coe1xuICAgIC8vICAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9ob21lL3BvcHVwLmh0bWwnLFxuICAgIC8vICAgICAgICAgdGl0bGU6ICdKb2luICcgKyAkc2NvcGUuZ2FtZU5hbWUsXG4gICAgLy8gICAgICAgICBzY29wZTogJHNjb3BlLFxuICAgIC8vICAgICAgICAgYnV0dG9uczogXG4gICAgLy8gICAgICAgICBbXG4gICAgLy8gICAgICAgICAgICAge3RleHQ6ICdHbyBiYWNrJ30sXG4gICAgLy8gICAgICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgICAgICB0ZXh0OiAnSm9pbiBnYW1lJyxcbiAgICAvLyAgICAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbi1iYWxhbmNlZCcsXG4gICAgLy8gICAgICAgICAgICAgICAgIG9uVGFwOiBlID0+IHtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICRzY29wZS5qb2luR2FtZShnYW1lSWQpO1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdnYW1lLmFjdGl2ZS1nYW1lJywgeyBnYW1lSWQ6IGdhbWVJZCB9KVxuICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgXVxuICAgIC8vICAgICB9KVxuICAgIC8vIH1cbn0pXG5cbiIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdsb2dpbicsIHtcbiAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9sb2dpbi9sb2dpbi5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luQ3RybCdcbiAgICB9KVxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9sb2dpbicpO1xufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCBVc2VyRmFjdG9yeSwgJGNvcmRvdmFPYXV0aCwgJGxvY2FsU3RvcmFnZSwgJHRpbWVvdXQsICRpb25pY1NpZGVNZW51RGVsZWdhdGUpIHtcbiAgICAkc2NvcGUubG9naW5XaXRoU2xhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFVzZXJGYWN0b3J5LmdldFNsYWNrQ3JlZHMoKVxuICAgICAgICAgICAgLnRoZW4oY3JlZHMgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAkY29yZG92YU9hdXRoLnNsYWNrKGNyZWRzLmNsaWVudElELCBjcmVkcy5jbGllbnRTZWNyZXQsIFsnaWRlbnRpdHkuYmFzaWMnLCAnaWRlbnRpdHkudGVhbScsICdpZGVudGl0eS5hdmF0YXInXSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihpbmZvID0+IFVzZXJGYWN0b3J5LnNldFVzZXIoaW5mbykpXG4gICAgICAgICAgICAudGhlbigoKSA9PiAkc3RhdGUuZ28oJ2hvbWUnKSlcbiAgICB9XG5cbiAgICAkaW9uaWNTaWRlTWVudURlbGVnYXRlLmNhbkRyYWdDb250ZW50KGZhbHNlKTtcblxuICAgICRzY29wZS4kb24oJyRpb25pY1ZpZXcubGVhdmUnLCBmdW5jdGlvbigpIHsgJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZS5jYW5EcmFnQ29udGVudCh0cnVlKSB9KTtcblxuICAgICRzY29wZS5zdG9yYWdlID0gJGxvY2FsU3RvcmFnZVxuXG4gICAgZnVuY3Rpb24gcmVkaXJlY3RVc2VyKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInNjb3BlIHN0b3JhZ2UgdXNlclwiLCAkc2NvcGUuc3RvcmFnZS51c2VyKVxuICAgICAgICBpZiAoJHNjb3BlLnN0b3JhZ2UudXNlcikgJHN0YXRlLmdvKCdob21lJylcbiAgICB9XG5cbiAgICByZWRpcmVjdFVzZXIoKTtcbn0pXG5cbiIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpID0+IHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCduZXctZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnL25ldy1nYW1lJyxcbiAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvbWFpbi5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ05ld0dhbWVDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgdGVhbURlY2tzOiAoR2FtZUZhY3RvcnkpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoKSxcbiAgICAgICAgICAgIHN0YW5kYXJkRGVjazogKEdhbWVGYWN0b3J5KSA9PiBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkKDEpXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5tYWluJywge1xuICAgICAgICB1cmw6ICcvc2V0dXAtZ2FtZScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvbmV3LWdhbWUuaHRtbCcsXG4gICAgfSlcblxuICAgIC5zdGF0ZSgnbmV3LWdhbWUuYWRkLWRlY2tzJywge1xuICAgICAgICB1cmw6ICcvYWRkLWRlY2tzJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9hZGQtZGVja3MuaHRtbCcsXG4gICAgfSlcblxuICAgIC5zdGF0ZSgnbmV3LWdhbWUuZGVjaycsIHtcbiAgICAgICAgdXJsOiAnL2RlY2svOmRlY2tJZCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvZGVjay5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0RlY2tDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgY2FyZHM6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXRDYXJkc0J5RGVja0lkKCRzdGF0ZVBhcmFtcy5kZWNrSWQpXG4gICAgICAgIH1cblxuXG4gICAgfSlcblxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9uZXctZ2FtZS9zZXR1cC1nYW1lJyk7XG59KVxuXG5hcHAuY29udHJvbGxlcignTmV3R2FtZUN0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgJHN0YXRlLCB0ZWFtRGVja3MsIHN0YW5kYXJkRGVjaykgPT4ge1xuICAgICRzY29wZS5jdXJyZW50VmlldyA9ICdhZGREZWNrcydcbiAgICAkc2NvcGUuZ2FtZUNvbmZpZyA9IHt9O1xuICAgICRzY29wZS5nYW1lQ29uZmlnLmRlY2tzID0ge307XG4gICAgJHNjb3BlLmdvVG9EZWNrcyA9ICgpID0+IHtcbiAgICAgICAgJHN0YXRlLmdvKCduZXctZ2FtZS5hZGQtZGVja3MnLCB7fSwgeyBsb2NhdGlvbjogdHJ1ZSwgcmVsb2FkOiB0cnVlIH0pXG4gICAgfVxuXG4gICAgJHNjb3BlLmRlY2tzID0gc3RhbmRhcmREZWNrLmNvbmNhdCh0ZWFtRGVja3MpO1xuXG4gICAgJHNjb3BlLnN0YXJ0TmV3R2FtZSA9IChnYW1lQ29uZmlnKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2FsbGVkIHN0YXJ0IG5ldyBnYW1lXCIpXG4gICAgICAgIEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZShnYW1lQ29uZmlnKS50aGVuKChpZCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJtYWRlIGl0IHRvIHRoZSAudGhlblwiKVxuICAgICAgICAgICAgR2FtZUZhY3RvcnkuYWRkUGlsZVRvR2FtZShpZCwgJHNjb3BlLmdhbWVDb25maWcuZGVja3MpXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2dhbWUuYWN0aXZlLWdhbWUnLCB7IGdhbWVJZDogaWQgfSlcblxuXG4gICAgICAgIH0pXG4gICAgfVxuICAgICRzY29wZS5hZGREZWNrc1RvR2FtZSA9IEdhbWVGYWN0b3J5LmFkZERlY2tzO1xuICAgIC8vICRzY29wZS4kb24oJ2NoYW5nZWRHYW1lJywgKGV2ZW50LCBkYXRhKSA9PiB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdyZWNlaXZlZCBldmVudCcpXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdkYXRhIG9iajonLCBkYXRhKVxuICAgIC8vICAgICAkc2NvcGUuZ2FtZSA9IGRhdGE7XG4gICAgLy8gICAgICRzY29wZS4kZGlnZXN0KClcblxuICAgIC8vIH0pXG5cblxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0RlY2tDdHJsJywgKCRzY29wZSwgR2FtZUZhY3RvcnksICRzdGF0ZSwgY2FyZHMpID0+IHtcbiAgICAkc2NvcGUuY2FyZHMgPSBjYXJkc1xufSlcblxuIiwiLy9EaXJlY3RpdmUgRmlsZSIsImFwcC5kaXJlY3RpdmUoJ3N1Ym1pdHRlZENhcmRzJywgZnVuY3Rpb24oKXtcblxuXHRyZXR1cm4ge1xuXG5cdFx0cmVzdHJpY3Q6ICdFJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2NvbW1vbi9kaXJlY3RpdmVzL3N1Ym1pdHRlZC1jYXJkcy5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnR2FtZUN0cmwnXG5cdH1cbn0pIiwiYXBwLmRpcmVjdGl2ZSgnd2hpdGVDYXJkcycsIGZ1bmN0aW9uKCl7XG5cblx0cmV0dXJuIHtcblxuXHRcdHJlc3RyaWN0OiAnRScsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9jb21tb24vZGlyZWN0aXZlcy93aGl0ZS1jYXJkcy5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnR2FtZUN0cmwnXG5cdH1cbn0pIiwiYXBwLmZhY3RvcnkoJ0FjdGl2ZUdhbWVGYWN0b3J5JywgKCRodHRwLCAkcm9vdFNjb3BlLCAkbG9jYWxTdG9yYWdlKSA9PiB7XG5cbiAgICAgICAgY29uc3QgQWN0aXZlR2FtZUZhY3RvcnkgPSB7fTtcblxuICAgICAgICBjb25zdCByZWZpbGxlciA9IChjYXJkc05lZWRlZCwgcGlsZVJlZiwgaGFuZFJlZikgPT4ge1xuICAgICAgICAgIHBpbGVSZWYubGltaXRUb0ZpcnN0KGNhcmRzTmVlZGVkKS5vbmNlKCd2YWx1ZScsIGNhcmRzU25hcHNob3QgPT4ge1xuICAgICAgICAgICAgY2FyZHNTbmFwc2hvdC5mb3JFYWNoKGNhcmQgPT4ge1xuICAgICAgICAgICAgICBsZXQgdXBkYXRlT2JqID0ge31cbiAgICAgICAgICAgICAgY2FyZC5yZWYudHJhbnNhY3Rpb24oY2FyZERhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgdXBkYXRlT2JqW2NhcmQua2V5XSA9IGNhcmREYXRhXG4gICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gaGFuZFJlZi51cGRhdGUodXBkYXRlT2JqKSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICB9XG5cbiAgICAgICAgQWN0aXZlR2FtZUZhY3RvcnkucmVmaWxsTXlIYW5kID0gKGdhbWVJZCwgcGxheWVySWQsIHRlYW1JZCkgPT4ge1xuICAgICAgICAgIC8vIGhvdyBtYW55IGNhcmRzIGRvIEkgbmVlZD9cbiAgICAgICAgICBjb25zb2xlLmxvZyhcInJlZmlsbGluZyBoYW5kXCIpXG4gICAgICAgICAgbGV0IGNhcmRzTmVlZGVkID0gMFxuICAgICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgY29uc3QgaGFuZFJlZiA9IGdhbWVSZWYuY2hpbGQoYHBsYXllcnMvJHtwbGF5ZXJJZH0vaGFuZGApXG4gICAgICAgICAgY29uc3QgcGlsZVJlZiA9IGdhbWVSZWYuY2hpbGQoJ3BpbGUvd2hpdGVjYXJkcycpXG4gICAgICAgICAgaGFuZFJlZi5vbmNlKCd2YWx1ZScsIGhhbmRTbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgIGNhcmRzTmVlZGVkID0gNyAtIGhhbmRTbmFwc2hvdC5udW1DaGlsZHJlbigpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICByZWZpbGxlcihjYXJkc05lZWRlZCwgcGlsZVJlZiwgaGFuZFJlZilcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJtYWRlIGl0IHRvIHJlZmlsbGVyXCIpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZmlyZWJhc2VNb3ZlU2luZ2xlS2V5VmFsdWUgPSAob2xkUmVmLCBuZXdSZWYpID0+IHtcbiAgICAgICAgICAgIGxldCByZW1vdmVVcGRhdGUgPSB7fVxuICAgICAgICAgICAgbGV0IG5ld1VwZGF0ZSA9IHt9XG4gICAgICAgICAgICByZXR1cm4gb2xkUmVmLm9uY2UoJ3ZhbHVlJylcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgICAgICAgICAgICAgLnRoZW4oc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVVcGRhdGVbc25hcHNob3Qua2V5XSA9IG51bGxcbiAgICAgICAgICAgICAgICAgICAgbmV3VXBkYXRlW3NuYXBzaG90LmtleV0gPSBzbmFwc2hvdC52YWwoKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3UmVmLnVwZGF0ZShuZXdVcGRhdGUpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBvbGRSZWYucGFyZW50LnVwZGF0ZShyZW1vdmVVcGRhdGUpKVxuICAgICAgICB9XG5cblxuICAgICAgICBBY3RpdmVHYW1lRmFjdG9yeS5zdWJtaXRXaGl0ZUNhcmQgPSAocGxheWVySWQsIGNhcmRJZCwgZ2FtZUlkLCB0ZWFtSWQsIGNhcmRUZXh0KSA9PiB7XG4gICAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YCk7XG4gICAgICAgICAgY29uc3QgY2FyZFRvU3VibWl0ID0gZ2FtZVJlZi5jaGlsZChgcGxheWVycy8ke3BsYXllcklkfS9oYW5kLyR7Y2FyZElkfWApO1xuICAgICAgICAgIGNvbnN0IHN1Ym1pdFJlZiA9IGdhbWVSZWYuY2hpbGQoJ3N1Ym1pdHRlZFdoaXRlQ2FyZHMnKTtcbiAgICAgICAgICBmaXJlYmFzZU1vdmVTaW5nbGVLZXlWYWx1ZShjYXJkVG9TdWJtaXQsIHN1Ym1pdFJlZilcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgc3VibWl0UmVmLmNoaWxkKGNhcmRJZCkuc2V0KHtcbiAgICAgICAgICAgICAgICBzdWJtaXR0ZWRCeTogcGxheWVySWQsXG4gICAgICAgICAgICAgICAgdGV4dDogY2FyZFRleHRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuXG5cbiAgICAgICAgLy9uaWtpdGEncyB1cGRhdGVkIHZlcnNpb25cbiAgICAgICAgLy8gQWN0aXZlR2FtZUZhY3Rvcnkuc3VibWl0V2hpdGVDYXJkID0gKHBsYXllcklkLCBjYXJkSWQsIGdhbWVJZCwgdGVhbUlkLCBjYXJkVGV4dCkgPT4ge1xuICAgICAgICAvLyAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApO1xuICAgICAgICAvLyAgIGNvbnN0IGNhcmRUb1N1Ym1pdCA9IGdhbWVSZWYuY2hpbGQoYHBsYXllcnMvJHtwbGF5ZXJJZH0vaGFuZC8ke2NhcmRJZH0vdGV4dGApO1xuICAgICAgICAvLyAgIGNvbnN0IHN1Ym1pdFJlZiA9IGdhbWVSZWYuY2hpbGQoJ3N1Ym1pdHRlZFdoaXRlQ2FyZHMnKTtcbiAgICAgICAgLy8gICBsZXQgdGV4dCA9ICcnXG4gICAgICAgIC8vICAgcmV0dXJuIGNhcmRUb1N1Ym1pdC50cmFuc2FjdGlvbihjYXJkVGV4dCA9PiB7XG4gICAgICAgIC8vICAgICAgIHRleHQgPSBjYXJkVGV4dFxuICAgICAgICAvLyAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgLy8gICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgLy8gICAgICAgbGV0IHVwZGF0ZU9iaiA9IHt9O1xuICAgICAgICAvLyAgICAgICB1cGRhdGVPYmpbcGxheWVySWRdLnRleHQgPSB0ZXh0O1xuICAgICAgICAvLyAgICAgICB1cGRhdGVPYmpbcGxheWVySWRdLmNhcmRJZCA9IGNhcmRJZFxuICAgICAgICAvLyAgICAgICByZXR1cm4gc3VibWl0UmVmLnVwZGF0ZSh1cGRhdGVPYmopXG4gICAgICAgIC8vICAgICB9KVxuICAgICAgICAvLyAgICAgLnRoZW4oKCkgPT4gY29uc29sZS5sb2coJ3N1Ym1pc3Npb24gc3VjY2VzcycpKVxuICAgICAgICAvLyAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgICAgIC8vIH1cblxuXG5cbiAgICAgICAgQWN0aXZlR2FtZUZhY3RvcnkucGlja1dpbm5pbmdXaGl0ZUNhcmQgPSAoY2FyZElkLCBnYW1lSWQsIHRlYW1JZCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApO1xuICAgICAgICAgIGxldCB3aW5uZXIgPSBnYW1lUmVmLmNoaWxkKGBzdWJtaXR0ZWRXaGl0ZUNhcmRzLyR7Y2FyZElkfS9zdWJtaXR0ZWRCeWApXG4gICAgICAgICAgbGV0IGJsYWNrQ2FyZElkID0gJyc7XG4gICAgICAgICAgbGV0IGJsYWNrQ2FyZFdvbiA9IHt9XG4gICAgICAgICAgd2lubmVyLm9uY2UoJ3ZhbHVlJylcbiAgICAgICAgICAgIC50aGVuKHdpbm5lcklkID0+IHtcbiAgICAgICAgICAgICAgd2lubmVyID0gd2lubmVySWQudmFsKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBzZXRSb3VuZFN0YXRlVG9PdmVyID0gZ2FtZVJlZi5jaGlsZCgnc3RhdGUnKS5zZXQoJ3Bvc3Ryb3VuZCcpXG4gICAgICAgICAgICAgIGNvbnN0IGF3YXJkQmxhY2tDYXJkID0gZ2FtZVJlZi5jaGlsZCgnY3VycmVudEJsYWNrQ2FyZCcpLnRyYW5zYWN0aW9uKChjdXJyZW50QmxhY2tDYXJkKSA9PiB7XG4gICAgICAgICAgICAgICAgYmxhY2tDYXJkV29uID0gY3VycmVudEJsYWNrQ2FyZDtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIjIyMjQkxBQ0sgQ0FSRCBXT05cIiwgYmxhY2tDYXJkV29uKVxuICAgICAgICAgICAgICAgIGdhbWVSZWYuY2hpbGQoYHBsYXllcnMvJHt3aW5uZXJ9L2JsYWNrQ2FyZHNXb25gKS51cGRhdGUoYmxhY2tDYXJkV29uKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3NldFJvdW5kU3RhdGVUb092ZXIsIGF3YXJkQmxhY2tDYXJkLCBnYW1lUmVmLmNoaWxkKCdzdWJtaXR0ZWRXaGl0ZUNhcmRzJykucmVtb3ZlKCldKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBBY3RpdmVHYW1lRmFjdG9yeTsgXG5cblxufSk7IiwiYXBwLmZhY3RvcnkoJ0dhbWVGYWN0b3J5JywgKCRodHRwLCAkcm9vdFNjb3BlLCAkbG9jYWxTdG9yYWdlKSA9PiB7XG5cbiAgICAgICAgY29uc3Qgb3VySXBzID0ge1xuICAgICAgICAgICAgbmlraXRhOiBcIjE5Mi4xNjguNC4yMTNcIixcbiAgICAgICAgICAgIGtheWxhOiBcIjE5Mi4xNjguNC4yMjVcIixcbiAgICAgICAgICAgIG5pdGh5YTogXCIxOTIuMTY4LjEuNDhcIixcbiAgICAgICAgICAgIGRhbjogXCIxOTIuMTY4LjQuMjM2XCJcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjdXJyZW50SXAgPSBvdXJJcHMua2F5bGFcblxuXG4gICAgICAgIC8vIHN0YXJ0IGEgbmV3IGdhbWUgZGVycFxuICAgICAgICBjb25zdCBHYW1lRmFjdG9yeSA9IHt9O1xuICAgICAgICBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWUgPSAoZ2FtZUNvbmZpZykgPT4ge1xuICAgICAgICAgICAgLy9jYW4gYWxzbyBnZXQgYWxsIHRoZSBkZWNrcyBieSB0ZWFtIGhlcmUgdG8gcHJlcGFyZVxuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gJGxvY2FsU3RvcmFnZS50ZWFtLmlkIHx8IDI7XG4gICAgICAgICAgICBjb25zdCBjcmVhdG9ySWQgPSAkbG9jYWxTdG9yYWdlLnVzZXIuaWQgfHwgMztcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzYCwge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBnYW1lQ29uZmlnLm5hbWUgfHwgJ0FXRVNPTUUgTmFtZScsXG4gICAgICAgICAgICAgICAgICAgIHRlYW1JZDogdGVhbUlkLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdG9ySWQ6IGNyZWF0b3JJZCxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvck5hbWU6ICRsb2NhbFN0b3JhZ2UudXNlci5uYW1lIHx8ICdkYW4nLCAvL21pZ2h0IGJlIHVubmVjZXNzYXJ5IGlmIHdlIGhhdmUgdGhlIHVzZXIgaWRcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IGdhbWVDb25maWdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdhbWVJZCA9IHJlcy5kYXRhXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgL3RlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAgICAgICAgICAgICBnYW1lUmVmLm9uKCd2YWx1ZScsIHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnY2hhbmdlZEdhbWUnLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnYW1lSWQ7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcbiAgICAgICAgLy8gZ2V0IGFsbCBvZiBhIGRlY2tzIGNhcmRzIHRvIGRpc3BsYXkgd2hlbiBsb29raW5nIGF0IGRlY2tzXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldENhcmRzQnlEZWNrSWQgPSAoaWQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZGVja3MvJHtpZH0vY2FyZHNgKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gVE9ETzogY29tYmluZSB0aGlzIGludG8gdGhlIGFib3ZlIHN0YXJ0TmV3R2FtZSBmdW5jXG4gICAgICAgIC8vIHRha2UgYWxsIG9mIHRoZSBzZWxlY3RlZCBkZWNrcycgY2FyZHMgYW5kIHB1dCB0aGVtIGluIHRoZSBmaXJlYmFzZSBnYW1lIG9iamVjdCBwaWxlICh0aHJvdWdoIHJvdXRlKVxuICAgICAgICBHYW1lRmFjdG9yeS5hZGRQaWxlVG9HYW1lID0gKGdhbWVJZCwgZGVja3MpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRkaW5nIHBpbGUgdG8gZ2FtZVwiKVxuICAgICAgICAgICAgY29uc3QgZGVja3NBcnIgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGRlY2tJZCBpbiBkZWNrcykge1xuICAgICAgICAgICAgICAgIGRlY2tzQXJyLnB1c2goZGVja0lkKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZ2FtZXMvJHtnYW1lSWR9L2RlY2tzYCwge1xuICAgICAgICAgICAgICAgICdkZWNrcyc6IGRlY2tzQXJyXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgR2FtZUZhY3Rvcnkuam9pbkdhbWVCeUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gJGxvY2FsU3RvcmFnZS50ZWFtLmlkO1xuICAgICAgICAgICAgY29uc3QgcGxheWVySWQgPSAkbG9jYWxTdG9yYWdlLnVzZXIuaWQ7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJOYW1lID0gJGxvY2FsU3RvcmFnZS51c2VyLm5hbWU7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfS9wbGF5ZXJzLyR7cGxheWVySWR9YClcbiAgICAgICAgICAgIHBsYXllclJlZi5zZXQoe1xuICAgICAgICAgICAgICAgIG5hbWU6IHBsYXllck5hbWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0/cGxheWVySWQ9JHtwbGF5ZXJJZH1gKVxuICAgICAgICB9XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCA9IChpZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gKHR5cGVvZiBpZCAhPT0gJ251bWJlcicpID8gJGxvY2FsU3RvcmFnZS50ZWFtLmlkIDogaWQ7IC8vIGlkIHx8IGxvY2Fsc3RvcmFnZSBkb2Vzbid0IHdvcmsgYmVjYXVzZSAwIGlzIGZhbHNleVxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9kZWNrcz90ZWFtPSR7dGVhbUlkfWApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuXG4gICAgICAgIH07XG5cblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRVc2Vyc0J5R2FtZUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0vdXNlcnNgKTtcbiAgICAgICAgfTtcblxuXG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZUJ5R2FtZUlkID0gKGdhbWVJZCwgdGVhbUlkKSA9PiB7XG4gICAgICAgICAgICB0ZWFtSWQgPSB0ZWFtSWQgfHwgJGxvY2FsU3RvcmFnZS50ZWFtLmlkXG4gICAgICAgICAgICBjb25zdCBnYW1lc1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICAgIHJldHVybiBnYW1lc1JlZi5vbmNlKCd2YWx1ZScpLnRoZW4oc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBzbmFwc2hvdC52YWwoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCA9ICh0ZWFtSWQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIyMjVEVBTSBJRFwiLCB0ZWFtSWQpXG4gICAgICAgICAgICB0ZWFtSWQgPSB0ZWFtSWQgfHwgJGxvY2FsU3RvcmFnZS50ZWFtLmlkXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzLz90ZWFtSWQ9JHt0ZWFtSWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlVc2VyID0gKHVzZXJJZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lcy8/dXNlcklkPSR7dXNlcklkfWApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gR2FtZUZhY3Rvcnk7XG4gICAgfVxuXG4pO1xuXG4iLCJhcHAuZmFjdG9yeSgnVXNlckZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCwgJGxvY2FsU3RvcmFnZSkge1xuICAgIGNvbnN0IG91cklwcyA9IHtcbiAgICAgICAgbmlraXRhOiBcIjE5Mi4xNjguNC4yMTNcIixcbiAgICAgICAga2F5bGE6IFwiMTkyLjE2OC40LjIyNVwiLFxuICAgICAgICBuaXRoeWE6IFwiMTkyLjE2OC4xLjQ4XCIsXG4gICAgICAgIGRhbjogXCIxOTIuMTY4LjQuMjM2XCJcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50SXAgPSBvdXJJcHMua2F5bGFcbiAgICByZXR1cm4ge1xuICAgICAgICBzZXRVc2VyOiBmdW5jdGlvbihpbmZvKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS91c2Vyc2AsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogaW5mb1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRMb2NhbFN0b3JhZ2UocmVzLmRhdGEudXNlclswXSwgcmVzLmRhdGEudGVhbVswXSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0U2xhY2tDcmVkczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL3NsYWNrYClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmRhdGFcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBnZXRTbGFja0luZm86IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnaHR0cHM6Ly9zbGFjay5jb20vYXBpL3VzZXJzLmlkZW50aXR5JylcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRMb2NhbFN0b3JhZ2U6IGZ1bmN0aW9uKHVzZXIsIHRlYW0pIHtcbiAgICAgICAgICAgICRsb2NhbFN0b3JhZ2UudXNlciA9IHVzZXI7XG4gICAgICAgICAgICAkbG9jYWxTdG9yYWdlLnRlYW0gPSB0ZWFtO1xuICAgICAgICB9LFxuXG4gICAgICAgIGxvZ091dDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkbG9jYWxTdG9yYWdlLiRyZXNldCgpO1xuICAgICAgICB9XG4gICAgfVxufSlcblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
