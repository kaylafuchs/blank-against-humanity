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

app.run(function ($rootScope) {
    $rootScope.$on('$stateChangeError', function () {
        console.log(JSON.stringify(arguments[5]));
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
    $scope.gameId = $stateParams.gameId;
    //$scope.gameId = 12;
    var playerId = $localStorage.user.id;
    //const teamId = 2;
    var teamId = $localStorage.team.id;
    var gameRef = firebase.database().ref('teams/' + teamId + '/games/' + $scope.gameId + '/');

    gameRef.on('value', function (gameSnapshot) {
        // console.log(gameSnapshot.val())
        $scope.game = gameSnapshot.val();
        $scope.gameName = $scope.game.settings.name;
        if ($scope.game.players[playerId].hand) {
            $scope.playerHand = $scope.game.players[playerId].hand;
            $scope.playerHandCount = Object.keys($scope.playerHand).length;
        }
        $scope.blackCard = $scope.game.currentBlackCard[1].text;
        $scope.judge = $scope.game.currentJudge;
        $scope.players = $scope.game.players;
        $scope.submittedWhiteCards = $scope.game.submittedWhiteCards;
        $scope.$evalAsync();
        if ($scope.game.winningCard) {
            $scope.winningCard = $scope.game.winningCard;
        }
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
        //$scope.getSubmittedPlayers();
        $scope.submitted = true;
        $scope.$evalAsync();
    };

    $scope.judgeDoubleTap = function (cardId) {
        // if (playerId === judge) {
        ActiveGameFactory.pickWinningWhiteCard(cardId, $scope.gameId, teamId);
        console.log("judging");
        // }
    };

    // $scope.getSubmittedPlayers = () => {
    //     $scope.playersToSubmit =  _.keyBy($scope.submittedWhiteCards, card => {
    //         return card.submittedBy;
    //     })
    // }
});

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        cache: false,
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
            games: function games(GameFactory) {
                return GameFactory.getGamesByUserId();
            },
            openGames: function openGames(GameFactory) {
                console.log('getting the games');
                return GameFactory.getOpenGames();
            }
        }
    });
});

app.controller('HomeCtrl', function ($scope, $state, $cordovaOauth, UserFactory, GameFactory, $localStorage, $ionicPopup, games, openGames) {
    $scope.startNewGame = GameFactory.startNewGame;
    $scope.storage = $localStorage;
    $scope.games = games;
    //$scope.openGames = openGames;

    console.log("games", JSON.stringify($scope.games));
    $scope.goToNewGame = function () {
        $state.go('new-game.main');
    };

    $scope.openGames = openGames;

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
                console.log('Navigating to state or trying to hello');
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
        return GameFactory.startNewGame(gameConfig).then(function (id) {
            return GameFactory.addPileToGame(id, $scope.gameConfig.decks);
        }).then(function (id) {
            console.log('im here');
            //console.log('###GAME RULES', $scope.gameRules)
            //$scope.gameRules.$setPristine();
            $state.go('game', { gameId: id });
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

app.factory('ActiveGameFactory', function ($http, $rootScope, $localStorage) {

    var ActiveGameFactory = {};

    var refiller = function refiller(cardsNeeded, pileRef, handRef) {
        return pileRef.limitToFirst(cardsNeeded).once('value', function (cardsSnapshot) {
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
        var winningCard = gameRef.child('submittedWhiteCards/' + cardId);
        console.log('WINNING CARD', winningCard);
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
                return winningCard.once('value');
            }).then(function (winningCardSnapshot) {
                console.log('SNAPSHOT', winningCardSnapshot.val());
                winningCardSnapshot = winningCardSnapshot.val();
                return gameRef.child('winningCard').set(winningCardSnapshot);
            }).then(function () {
                return gameRef.child('submittedWhiteCards').remove();
            });
            return Promise.all([setRoundStateToOver, awardBlackCard]);
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
        }).then(function () {
            return gameId;
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
        return $http.post('http://' + currentIp + ':1337/api/games/' + gameId + '/?playerId=' + playerId);
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
        console.log('the team id is:', teamId);
        return $http.get('http://' + currentIp + ':1337/api/games/?teamId=' + teamId).then(function (res) {
            return res.data;
        }).catch(function (err) {
            return console.log(err);
        });
    };

    GameFactory.getGamesByUserId = function () {
        return $http.get('http://' + currentIp + ':1337/api/games/?userId=' + $localStorage.user.id).then(function (res) {
            return res.data;
        }).catch(function (err) {
            return console.log(err);
        });
    };

    GameFactory.getOpenGames = function () {
        var teamId = $localStorage.team.id;
        var userId = $localStorage.user.id;
        return $http.get('http://' + currentIp + ':1337/api/games/?teamId=' + teamId + '&userId=' + userId + '&open=true').then(function (res) {
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
app.directive('winningCards', function () {
    return {
        restrict: 'E',
        templateUrl: 'js/common/directives/white-cards.html',
        controller: 'GameCtrl'
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImNhcmRzLXRlc3QvY2FyZHNUZXN0LmpzIiwiZGVja3MvZGVja3MuanMiLCJmcm9tIGZzZy9mcm9tLWZzZy5qcyIsImdhbWUvZ2FtZS5qcyIsImhvbWUvaG9tZS5qcyIsImxvZ2luL2xvZ2luLmpzIiwibmV3LWdhbWUvbmV3LWdhbWUuanMiLCJjb21tb24vZmFjdG9yaWVzL0FjdGl2ZUdhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9HYW1lRmFjdG9yeS5qcyIsImNvbW1vbi9mYWN0b3JpZXMvdXNlckZhY3RvcnkuanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiLCJjb21tb24vZGlyZWN0aXZlcy9zdWJtaXR0ZWQtY2FyZHMuanMiLCJjb21tb24vZGlyZWN0aXZlcy93aGl0ZS1jYXJkcy5qcyIsImNvbW1vbi9kaXJlY3RpdmVzL3dpbm5pbmctY2FyZC5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJhcHAiLCJhbmd1bGFyIiwibW9kdWxlIiwicnVuIiwiJGlvbmljUGxhdGZvcm0iLCJyZWFkeSIsImNvcmRvdmEiLCJwbHVnaW5zIiwiS2V5Ym9hcmQiLCJoaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIiLCJkaXNhYmxlU2Nyb2xsIiwiU3RhdHVzQmFyIiwic3R5bGVMaWdodENvbnRlbnQiLCIkcm9vdFNjb3BlIiwiJG9uIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJhcmd1bWVudHMiLCJjb250cm9sbGVyIiwiJHNjb3BlIiwiVXNlckZhY3RvcnkiLCIkc3RhdGUiLCIkbG9jYWxTdG9yYWdlIiwiJHRpbWVvdXQiLCJsb2dPdXQiLCJnbyIsImNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwic3RhdGUiLCJ1cmwiLCJ0ZW1wbGF0ZVVybCIsImdyZWV0aW5nIiwicmVzb2x2ZSIsImRlY2tzIiwiR2FtZUZhY3RvcnkiLCIkc3RhdGVQYXJhbXMiLCJnZXREZWNrc0J5VGVhbUlkIiwic3RhdGVQYXJhbXMiLCJ0ZWFtSWQiLCJBY3RpdmVHYW1lRmFjdG9yeSIsImdhbWVJZCIsInBsYXllcklkIiwidXNlciIsImlkIiwidGVhbSIsImdhbWVSZWYiLCJmaXJlYmFzZSIsImRhdGFiYXNlIiwicmVmIiwib24iLCJnYW1lIiwiZ2FtZVNuYXBzaG90IiwidmFsIiwiZ2FtZU5hbWUiLCJzZXR0aW5ncyIsIm5hbWUiLCJwbGF5ZXJzIiwiaGFuZCIsInBsYXllckhhbmQiLCJwbGF5ZXJIYW5kQ291bnQiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiYmxhY2tDYXJkIiwiY3VycmVudEJsYWNrQ2FyZCIsInRleHQiLCJqdWRnZSIsImN1cnJlbnRKdWRnZSIsInN1Ym1pdHRlZFdoaXRlQ2FyZHMiLCIkZXZhbEFzeW5jIiwid2lubmluZ0NhcmQiLCJzaG93Q2FyZHMiLCJzdWJtaXR0ZWQiLCJvblN3aXBlRG93biIsImpvaW5HYW1lQnlJZCIsInRoZW4iLCJyZWZpbGxNeUhhbmQiLCJvbkRvdWJsZVRhcCIsImNhcmRJZCIsImNhcmRUZXh0Iiwic3VibWl0V2hpdGVDYXJkIiwianVkZ2VEb3VibGVUYXAiLCJwaWNrV2lubmluZ1doaXRlQ2FyZCIsIiR1cmxSb3V0ZXJQcm92aWRlciIsImNhY2hlIiwiZ2FtZXMiLCJnZXRHYW1lc0J5VXNlcklkIiwib3BlbkdhbWVzIiwiZ2V0T3BlbkdhbWVzIiwiJGNvcmRvdmFPYXV0aCIsIiRpb25pY1BvcHVwIiwic3RhcnROZXdHYW1lIiwic3RvcmFnZSIsImdvVG9OZXdHYW1lIiwib3RoZXJ3aXNlIiwiJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZSIsImxvZ2luV2l0aFNsYWNrIiwiZ2V0U2xhY2tDcmVkcyIsInNsYWNrIiwiY3JlZHMiLCJjbGllbnRJRCIsImNsaWVudFNlY3JldCIsInNldFVzZXIiLCJpbmZvIiwiY2FuRHJhZ0NvbnRlbnQiLCJyZWRpcmVjdFVzZXIiLCJhYnN0cmFjdCIsInRlYW1EZWNrcyIsInN0YW5kYXJkRGVjayIsImNhcmRzIiwiZ2V0Q2FyZHNCeURlY2tJZCIsImRlY2tJZCIsImN1cnJlbnRWaWV3IiwiZ2FtZUNvbmZpZyIsImdvVG9EZWNrcyIsImxvY2F0aW9uIiwicmVsb2FkIiwiY29uY2F0IiwiYWRkUGlsZVRvR2FtZSIsImFkZERlY2tzVG9HYW1lIiwiYWRkRGVja3MiLCJmYWN0b3J5IiwiJGh0dHAiLCJyZWZpbGxlciIsImNhcmRzTmVlZGVkIiwicGlsZVJlZiIsImhhbmRSZWYiLCJsaW1pdFRvRmlyc3QiLCJvbmNlIiwiY2FyZHNTbmFwc2hvdCIsImZvckVhY2giLCJ1cGRhdGVPYmoiLCJjYXJkIiwidHJhbnNhY3Rpb24iLCJrZXkiLCJjYXJkRGF0YSIsInVwZGF0ZSIsImNhdGNoIiwiZXJyIiwiY2hpbGQiLCJoYW5kU25hcHNob3QiLCJudW1DaGlsZHJlbiIsImZpcmViYXNlTW92ZVNpbmdsZUtleVZhbHVlIiwib2xkUmVmIiwibmV3UmVmIiwicmVtb3ZlVXBkYXRlIiwibmV3VXBkYXRlIiwic25hcHNob3QiLCJwYXJlbnQiLCJjYXJkVG9TdWJtaXQiLCJzdWJtaXRSZWYiLCJzZXQiLCJzdWJtaXR0ZWRCeSIsIndpbm5lciIsImJsYWNrQ2FyZElkIiwiYmxhY2tDYXJkV29uIiwid2lubmVySWQiLCJzZXRSb3VuZFN0YXRlVG9PdmVyIiwiYXdhcmRCbGFja0NhcmQiLCJ3aW5uaW5nQ2FyZFNuYXBzaG90IiwicmVtb3ZlIiwiUHJvbWlzZSIsImFsbCIsIm91cklwcyIsIm5pa2l0YSIsImtheWxhIiwibml0aHlhIiwiZGFuIiwiY3VycmVudElwIiwiY3JlYXRvcklkIiwicG9zdCIsImNyZWF0b3JOYW1lIiwicmVzIiwiZGF0YSIsIiRicm9hZGNhc3QiLCJnZXQiLCJkZWNrc0FyciIsInB1c2giLCJwbGF5ZXJOYW1lIiwicGxheWVyUmVmIiwiZ2V0VXNlcnNCeUdhbWVJZCIsImdldEdhbWVCeUdhbWVJZCIsImdhbWVzUmVmIiwiZ2V0R2FtZXNCeVRlYW1JZCIsInVzZXJJZCIsIm1ldGhvZCIsImhlYWRlcnMiLCJzZXRMb2NhbFN0b3JhZ2UiLCJn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O0FBQ0EsbUJBQUF5QixNQUFBcUQsR0FBQSxhQUFBUCxTQUFBLHNCQUNBN0YsSUFEQSxDQUNBLGVBQUE7QUFDQSx1QkFBQWlHLElBQUFDLElBQUE7QUFDQSxhQUhBLENBQUE7QUFJQSxTQW5CQTtBQW9CQWUsc0JBQUEsd0JBQUE7QUFDQSxtQkFBQWxFLE1BQUFxRCxHQUFBLENBQUEsc0NBQUEsQ0FBQTtBQUNBLFNBdEJBOztBQXdCQVkseUJBQUEseUJBQUFqSixJQUFBLEVBQUFFLElBQUEsRUFBQTtBQUNBdEIsMEJBQUFvQixJQUFBLEdBQUFBLElBQUE7QUFDQXBCLDBCQUFBc0IsSUFBQSxHQUFBQSxJQUFBO0FBQ0EsU0EzQkE7O0FBNkJBcEIsZ0JBQUEsa0JBQUE7QUFDQUYsMEJBQUF1SyxNQUFBO0FBQ0E7QUEvQkEsS0FBQTtBQWlDQSxDQTNDQTs7QUNBQTtBQ0FBL0wsSUFBQWdNLFNBQUEsQ0FBQSxnQkFBQSxFQUFBLFlBQUE7QUFDQSxXQUFBO0FBQ0FDLGtCQUFBLEdBREE7QUFFQWpLLHFCQUFBLDJDQUZBO0FBR0FaLG9CQUFBO0FBSEEsS0FBQTtBQUtBLENBTkE7QUNBQXBCLElBQUFnTSxTQUFBLENBQUEsWUFBQSxFQUFBLFlBQUE7QUFDQSxXQUFBO0FBQ0FDLGtCQUFBLEdBREE7QUFFQWpLLHFCQUFBLHVDQUZBO0FBR0FaLG9CQUFBO0FBSEEsS0FBQTtBQUtBLENBTkE7QUNBQXBCLElBQUFnTSxTQUFBLENBQUEsY0FBQSxFQUFBLFlBQUE7QUFDQSxXQUFBO0FBQ0FDLGtCQUFBLEdBREE7QUFFQWpLLHFCQUFBLHVDQUZBO0FBR0FaLG9CQUFBO0FBSEEsS0FBQTtBQUtBLENBTkEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIElvbmljIFN0YXJ0ZXIgQXBwXG5cbi8vIGFuZ3VsYXIubW9kdWxlIGlzIGEgZ2xvYmFsIHBsYWNlIGZvciBjcmVhdGluZywgcmVnaXN0ZXJpbmcgYW5kIHJldHJpZXZpbmcgQW5ndWxhciBtb2R1bGVzXG4vLyAnc3RhcnRlcicgaXMgdGhlIG5hbWUgb2YgdGhpcyBhbmd1bGFyIG1vZHVsZSBleGFtcGxlIChhbHNvIHNldCBpbiBhIDxib2R5PiBhdHRyaWJ1dGUgaW4gaW5kZXguaHRtbClcbi8vIHRoZSAybmQgcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9mICdyZXF1aXJlcydcblxud2luZG93LmFwcCA9IGFuZ3VsYXIubW9kdWxlKCdCbGFua0FnYWluc3RIdW1hbml0eScsIFsnaW9uaWMnLCAndWkucm91dGVyJywgJ25nQ29yZG92YScsICduZ0NvcmRvdmFPYXV0aCcsICduZ1N0b3JhZ2UnLCAnbmdBbmltYXRlJ10pXG5cblxuYXBwLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxuICAgICAgICAgICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcblxuICAgICAgICAgICAgLy8gRG9uJ3QgcmVtb3ZlIHRoaXMgbGluZSB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nLiBJdCBzdG9wcyB0aGUgdmlld3BvcnRcbiAgICAgICAgICAgIC8vIGZyb20gc25hcHBpbmcgd2hlbiB0ZXh0IGlucHV0cyBhcmUgZm9jdXNlZC4gSW9uaWMgaGFuZGxlcyB0aGlzIGludGVybmFsbHkgZm9yXG4gICAgICAgICAgICAvLyBhIG11Y2ggbmljZXIga2V5Ym9hcmQgZXhwZXJpZW5jZS5cbiAgICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5kaXNhYmxlU2Nyb2xsKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICAgICAgICBTdGF0dXNCYXIuc3R5bGVMaWdodENvbnRlbnQoKVxuICAgICAgICB9XG4gICAgfSk7XG5cbn0pXG5cbmFwcC5ydW4oZnVuY3Rpb24oJHJvb3RTY29wZSkge1xuICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VFcnJvcicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShhcmd1bWVudHNbNV0pKTtcbiAgICB9KTtcbn0pO1xuXG4iLCJhcHAuY29udHJvbGxlcignTG9nb3V0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgVXNlckZhY3RvcnksICRzdGF0ZSwgJGxvY2FsU3RvcmFnZSwgJHRpbWVvdXQpe1xuXHQkc2NvcGUubG9nT3V0ID0gZnVuY3Rpb24oKXtcblx0XHRVc2VyRmFjdG9yeS5sb2dPdXQoKVxuXHRcdCRzdGF0ZS5nbygnbG9naW4nKVxuXHR9XG59KSIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpe1xuXHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnY2FyZHMnLCB7XG5cdFx0dXJsOiAnL2NhcmRzJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2NhcmRzLXRlc3QvY2FyZHMtdGVzdC5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnQ2FyZHNUZXN0Q3RybCdcblx0fSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdDYXJkc1Rlc3RDdHJsJywgZnVuY3Rpb24oJHNjb3BlKXtcbiBcdCRzY29wZS5ncmVldGluZyA9IFwiSElcIlxufSkiLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlcikgPT4ge1xuXHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnZGVja3MnLCB7XG5cdFx0dXJsOiAnZGVja3MvOnRlYW1pZCcsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9kZWNrcy9kZWNrcy5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnRGVja0N0cmwnLFxuXHRcdHJlc29sdmU6IHtcblx0XHRcdGRlY2tzOiAoR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcykgPT4gR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZChzdGF0ZVBhcmFtcy50ZWFtSWQpXG5cdFx0fVxuXHR9KVxuXG59KVxuXG5hcHAuY29udHJvbGxlcignRGVja0N0cmwnLCAoJHNjb3BlKSA9PiB7XG5cblxuXHRcbn0pIiwiLy8gKGZ1bmN0aW9uICgpIHtcblxuLy8gICAgICd1c2Ugc3RyaWN0JztcblxuLy8gICAgIC8vIEhvcGUgeW91IGRpZG4ndCBmb3JnZXQgQW5ndWxhciEgRHVoLWRveS5cbi8vICAgICBpZiAoIXdpbmRvdy5hbmd1bGFyKSB0aHJvdyBuZXcgRXJyb3IoJ0kgY2FuXFwndCBmaW5kIEFuZ3VsYXIhJyk7XG5cbi8vICAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2ZzYVByZUJ1aWx0JywgW10pO1xuXG4vLyAgICAgYXBwLmZhY3RvcnkoJ1NvY2tldCcsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgaWYgKCF3aW5kb3cuaW8pIHRocm93IG5ldyBFcnJvcignc29ja2V0LmlvIG5vdCBmb3VuZCEnKTtcbi8vICAgICAgICAgcmV0dXJuIHdpbmRvdy5pbyh3aW5kb3cubG9jYXRpb24ub3JpZ2luKTtcbi8vICAgICB9KTtcblxuLy8gICAgIC8vIEFVVEhfRVZFTlRTIGlzIHVzZWQgdGhyb3VnaG91dCBvdXIgYXBwIHRvXG4vLyAgICAgLy8gYnJvYWRjYXN0IGFuZCBsaXN0ZW4gZnJvbSBhbmQgdG8gdGhlICRyb290U2NvcGVcbi8vICAgICAvLyBmb3IgaW1wb3J0YW50IGV2ZW50cyBhYm91dCBhdXRoZW50aWNhdGlvbiBmbG93LlxuLy8gICAgIGFwcC5jb25zdGFudCgnQVVUSF9FVkVOVFMnLCB7XG4vLyAgICAgICAgIGxvZ2luU3VjY2VzczogJ2F1dGgtbG9naW4tc3VjY2VzcycsXG4vLyAgICAgICAgIGxvZ2luRmFpbGVkOiAnYXV0aC1sb2dpbi1mYWlsZWQnLFxuLy8gICAgICAgICBsb2dvdXRTdWNjZXNzOiAnYXV0aC1sb2dvdXQtc3VjY2VzcycsXG4vLyAgICAgICAgIHNlc3Npb25UaW1lb3V0OiAnYXV0aC1zZXNzaW9uLXRpbWVvdXQnLFxuLy8gICAgICAgICBub3RBdXRoZW50aWNhdGVkOiAnYXV0aC1ub3QtYXV0aGVudGljYXRlZCcsXG4vLyAgICAgICAgIG5vdEF1dGhvcml6ZWQ6ICdhdXRoLW5vdC1hdXRob3JpemVkJ1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLmZhY3RvcnkoJ0F1dGhJbnRlcmNlcHRvcicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkcSwgQVVUSF9FVkVOVFMpIHtcbi8vICAgICAgICAgdmFyIHN0YXR1c0RpY3QgPSB7XG4vLyAgICAgICAgICAgICA0MDE6IEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsXG4vLyAgICAgICAgICAgICA0MDM6IEFVVEhfRVZFTlRTLm5vdEF1dGhvcml6ZWQsXG4vLyAgICAgICAgICAgICA0MTk6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0LFxuLy8gICAgICAgICAgICAgNDQwOiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dFxuLy8gICAgICAgICB9O1xuLy8gICAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAgICAgcmVzcG9uc2VFcnJvcjogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KHN0YXR1c0RpY3RbcmVzcG9uc2Uuc3RhdHVzXSwgcmVzcG9uc2UpO1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzcG9uc2UpXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH07XG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuY29uZmlnKGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XG4vLyAgICAgICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goW1xuLy8gICAgICAgICAgICAgJyRpbmplY3RvcicsXG4vLyAgICAgICAgICAgICBmdW5jdGlvbiAoJGluamVjdG9yKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRpbmplY3Rvci5nZXQoJ0F1dGhJbnRlcmNlcHRvcicpO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICBdKTtcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5zZXJ2aWNlKCdBdXRoU2VydmljZScsIGZ1bmN0aW9uICgkaHR0cCwgU2Vzc2lvbiwgJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMsICRxKSB7XG5cbi8vICAgICAgICAgZnVuY3Rpb24gb25TdWNjZXNzZnVsTG9naW4ocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgIHZhciB1c2VyID0gcmVzcG9uc2UuZGF0YS51c2VyO1xuLy8gICAgICAgICAgICAgU2Vzc2lvbi5jcmVhdGUodXNlcik7XG4vLyAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoQVVUSF9FVkVOVFMubG9naW5TdWNjZXNzKTtcbi8vICAgICAgICAgICAgIHJldHVybiB1c2VyO1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgLy8gVXNlcyB0aGUgc2Vzc2lvbiBmYWN0b3J5IHRvIHNlZSBpZiBhblxuLy8gICAgICAgICAvLyBhdXRoZW50aWNhdGVkIHVzZXIgaXMgY3VycmVudGx5IHJlZ2lzdGVyZWQuXG4vLyAgICAgICAgIHRoaXMuaXNBdXRoZW50aWNhdGVkID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuICEhU2Vzc2lvbi51c2VyO1xuLy8gICAgICAgICB9O1xuXG4gICAgICAgIFxuLy8gICAgICAgICB0aGlzLmlzQWRtaW4gPSBmdW5jdGlvbih1c2VySWQpe1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ3J1bm5pbmcgYWRtaW4gZnVuYycpXG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpXG4vLyAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhLnVzZXIuaXNBZG1pbilcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIHRoaXMuZ2V0TG9nZ2VkSW5Vc2VyID0gZnVuY3Rpb24gKGZyb21TZXJ2ZXIpIHtcblxuLy8gICAgICAgICAgICAgLy8gSWYgYW4gYXV0aGVudGljYXRlZCBzZXNzaW9uIGV4aXN0cywgd2Vcbi8vICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgdXNlciBhdHRhY2hlZCB0byB0aGF0IHNlc3Npb25cbi8vICAgICAgICAgICAgIC8vIHdpdGggYSBwcm9taXNlLiBUaGlzIGVuc3VyZXMgdGhhdCB3ZSBjYW5cbi8vICAgICAgICAgICAgIC8vIGFsd2F5cyBpbnRlcmZhY2Ugd2l0aCB0aGlzIG1ldGhvZCBhc3luY2hyb25vdXNseS5cblxuLy8gICAgICAgICAgICAgLy8gT3B0aW9uYWxseSwgaWYgdHJ1ZSBpcyBnaXZlbiBhcyB0aGUgZnJvbVNlcnZlciBwYXJhbWV0ZXIsXG4vLyAgICAgICAgICAgICAvLyB0aGVuIHRoaXMgY2FjaGVkIHZhbHVlIHdpbGwgbm90IGJlIHVzZWQuXG5cbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlzQXV0aGVudGljYXRlZCgpICYmIGZyb21TZXJ2ZXIgIT09IHRydWUpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbihTZXNzaW9uLnVzZXIpO1xuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICAvLyBNYWtlIHJlcXVlc3QgR0VUIC9zZXNzaW9uLlxuLy8gICAgICAgICAgICAgLy8gSWYgaXQgcmV0dXJucyBhIHVzZXIsIGNhbGwgb25TdWNjZXNzZnVsTG9naW4gd2l0aCB0aGUgcmVzcG9uc2UuXG4vLyAgICAgICAgICAgICAvLyBJZiBpdCByZXR1cm5zIGEgNDAxIHJlc3BvbnNlLCB3ZSBjYXRjaCBpdCBhbmQgaW5zdGVhZCByZXNvbHZlIHRvIG51bGwuXG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbi8vICAgICAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5sb2dpbiA9IGZ1bmN0aW9uIChjcmVkZW50aWFscykge1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9sb2dpbicsIGNyZWRlbnRpYWxzKVxuLy8gICAgICAgICAgICAgICAgIC50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKVxuLy8gICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QoeyBtZXNzYWdlOiAnSW52YWxpZCBsb2dpbiBjcmVkZW50aWFscy4nfSk7XG4vLyAgICAgICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5zaWdudXAgPSBmdW5jdGlvbihjcmVkZW50aWFscyl7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuLy8gICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuLy8gICAgICAgICAgICAgICAgIHVybDogJy9zaWdudXAnLFxuLy8gICAgICAgICAgICAgICAgIGRhdGE6IGNyZWRlbnRpYWxzXG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5kYXRhKVxuLy8gICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKCl7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCh7bWVzc2FnZTogJ1RoYXQgZW1haWwgaXMgYWxyZWFkeSBiZWluZyB1c2VkLid9KTtcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5sb2dvdXQgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvbG9nb3V0JykudGhlbihmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgU2Vzc2lvbi5kZXN0cm95KCk7XG4vLyAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ291dFN1Y2Nlc3MpO1xuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5zZXJ2aWNlKCdTZXNzaW9uJywgZnVuY3Rpb24gKCRyb290U2NvcGUsIEFVVEhfRVZFTlRTKSB7XG5cbi8vICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4vLyAgICAgICAgICRyb290U2NvcGUuJG9uKEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCwgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgc2VsZi5kZXN0cm95KCk7XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XG5cbi8vICAgICAgICAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbiAodXNlcikge1xuLy8gICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgfSk7XG5cbi8vIH0oKSk7XG4iLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlcikgPT4ge1xuXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2dhbWUnLCB7XG4gICAgICAgIHVybDogJy9nYW1lLzpnYW1lSWQnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2dhbWUvZ2FtZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0dhbWVDdHJsJyxcbiAgICAgICAgLy8gcmVzb2x2ZToge1xuICAgICAgICAvLyAgICAgZ2FtZSA6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXRHYW1lQnlHYW1lSWQoJHN0YXRlUGFyYW1zLmdhbWVJZClcbiAgICAgICAgLy8gfVxuICAgIH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignR2FtZUN0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zLCAkbG9jYWxTdG9yYWdlLCBBY3RpdmVHYW1lRmFjdG9yeSkgPT4ge1xuICAgICRzY29wZS5nYW1lSWQgPSAkc3RhdGVQYXJhbXMuZ2FtZUlkO1xuICAgIC8vJHNjb3BlLmdhbWVJZCA9IDEyO1xuICAgIGNvbnN0IHBsYXllcklkID0gJGxvY2FsU3RvcmFnZS51c2VyLmlkO1xuICAgIC8vY29uc3QgdGVhbUlkID0gMjtcbiAgICBjb25zdCB0ZWFtSWQgPSAkbG9jYWxTdG9yYWdlLnRlYW0uaWRcbiAgICBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8keyRzY29wZS5nYW1lSWR9L2ApO1xuXG4gICAgZ2FtZVJlZi5vbigndmFsdWUnLCBnYW1lU25hcHNob3QgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lU25hcHNob3QudmFsKCkpXG4gICAgICAgICRzY29wZS5nYW1lID0gZ2FtZVNuYXBzaG90LnZhbCgpO1xuICAgICAgICAkc2NvcGUuZ2FtZU5hbWUgPSAkc2NvcGUuZ2FtZS5zZXR0aW5ncy5uYW1lO1xuICAgICAgICBpZiAoJHNjb3BlLmdhbWUucGxheWVyc1twbGF5ZXJJZF0uaGFuZCl7XG4gICAgICAgICAgICAkc2NvcGUucGxheWVySGFuZCA9ICRzY29wZS5nYW1lLnBsYXllcnNbcGxheWVySWRdLmhhbmQ7XG4gICAgICAgICAgICAkc2NvcGUucGxheWVySGFuZENvdW50ID0gT2JqZWN0LmtleXMoJHNjb3BlLnBsYXllckhhbmQpLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICAkc2NvcGUuYmxhY2tDYXJkID0gJHNjb3BlLmdhbWUuY3VycmVudEJsYWNrQ2FyZFsxXS50ZXh0XG4gICAgICAgICRzY29wZS5qdWRnZSA9ICRzY29wZS5nYW1lLmN1cnJlbnRKdWRnZTtcbiAgICAgICAgJHNjb3BlLnBsYXllcnMgPSAkc2NvcGUuZ2FtZS5wbGF5ZXJzO1xuICAgICAgICAkc2NvcGUuc3VibWl0dGVkV2hpdGVDYXJkcyA9ICRzY29wZS5nYW1lLnN1Ym1pdHRlZFdoaXRlQ2FyZHNcbiAgICAgICAgJHNjb3BlLiRldmFsQXN5bmMoKTtcbiAgICAgICAgaWYoJHNjb3BlLmdhbWUud2lubmluZ0NhcmQpe1xuICAgICAgICAgICAgJHNjb3BlLndpbm5pbmdDYXJkID0gJHNjb3BlLmdhbWUud2lubmluZ0NhcmRcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAkc2NvcGUuc2hvd0NhcmRzID0gZmFsc2U7XG4gICAgJHNjb3BlLnN1Ym1pdHRlZCA9IGZhbHNlO1xuXG4gICAgJHNjb3BlLm9uU3dpcGVEb3duID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWQoZ2FtZUlkKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgQWN0aXZlR2FtZUZhY3RvcnkucmVmaWxsTXlIYW5kKCRzY29wZS5nYW1lSWQsIHBsYXllcklkLCB0ZWFtSWQpXG4gICAgICAgICAgJHNjb3BlLnNob3dDYXJkcyA9IHRydWU7XG4gICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnBsYXllckhhbmQpXG4gICAgICAgICAgJHNjb3BlLiRldmFsQXN5bmMoKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAkc2NvcGUub25Eb3VibGVUYXAgPSAoY2FyZElkLCBjYXJkVGV4dCkgPT4ge1xuICAgICAgICBBY3RpdmVHYW1lRmFjdG9yeS5zdWJtaXRXaGl0ZUNhcmQocGxheWVySWQsIGNhcmRJZCwgJHNjb3BlLmdhbWVJZCwgdGVhbUlkLCBjYXJkVGV4dClcbiAgICAgICAgLy8kc2NvcGUuZ2V0U3VibWl0dGVkUGxheWVycygpO1xuICAgICAgICAkc2NvcGUuc3VibWl0dGVkID0gdHJ1ZTtcbiAgICAgICAgJHNjb3BlLiRldmFsQXN5bmMoKTtcbiAgICB9XG5cbiAgICAkc2NvcGUuanVkZ2VEb3VibGVUYXAgPSAoY2FyZElkKSA9PiB7XG4gICAgICAgIC8vIGlmIChwbGF5ZXJJZCA9PT0ganVkZ2UpIHtcbiAgICAgICAgICAgIEFjdGl2ZUdhbWVGYWN0b3J5LnBpY2tXaW5uaW5nV2hpdGVDYXJkKGNhcmRJZCwgJHNjb3BlLmdhbWVJZCwgdGVhbUlkKVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJqdWRnaW5nXCIpXG4gICAgICAgIC8vIH1cbiAgICB9XG5cblxuICAgIC8vICRzY29wZS5nZXRTdWJtaXR0ZWRQbGF5ZXJzID0gKCkgPT4ge1xuICAgIC8vICAgICAkc2NvcGUucGxheWVyc1RvU3VibWl0ID0gIF8ua2V5QnkoJHNjb3BlLnN1Ym1pdHRlZFdoaXRlQ2FyZHMsIGNhcmQgPT4ge1xuICAgIC8vICAgICAgICAgcmV0dXJuIGNhcmQuc3VibWl0dGVkQnk7XG4gICAgLy8gICAgIH0pXG4gICAgLy8gfVxuXG59KVxuXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgdXJsOiAnLycsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9ob21lL2hvbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGdhbWVzOiAoR2FtZUZhY3RvcnkpID0+IEdhbWVGYWN0b3J5LmdldEdhbWVzQnlVc2VySWQoKSxcbiAgICAgICAgICAgIG9wZW5HYW1lczogKEdhbWVGYWN0b3J5KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2dldHRpbmcgdGhlIGdhbWVzJylcbiAgICAgICAgICAgICAgICByZXR1cm4gR2FtZUZhY3RvcnkuZ2V0T3BlbkdhbWVzKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignSG9tZUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSwgJGNvcmRvdmFPYXV0aCwgVXNlckZhY3RvcnksIEdhbWVGYWN0b3J5LCAkbG9jYWxTdG9yYWdlLCAkaW9uaWNQb3B1cCwgZ2FtZXMsIG9wZW5HYW1lcykge1xuICAgICRzY29wZS5zdGFydE5ld0dhbWUgPSBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWU7XG4gICAgJHNjb3BlLnN0b3JhZ2UgPSAkbG9jYWxTdG9yYWdlO1xuICAgICRzY29wZS5nYW1lcyA9IGdhbWVzO1xuICAgIC8vJHNjb3BlLm9wZW5HYW1lcyA9IG9wZW5HYW1lcztcblxuICAgIGNvbnNvbGUubG9nKFwiZ2FtZXNcIiwgSlNPTi5zdHJpbmdpZnkoJHNjb3BlLmdhbWVzKSlcbiAgICAkc2NvcGUuZ29Ub05ld0dhbWUgPSAoKSA9PiB7XG4gICAgICAgICRzdGF0ZS5nbygnbmV3LWdhbWUubWFpbicpXG4gICAgfVxuXG4gICAgJHNjb3BlLm9wZW5HYW1lcyA9IG9wZW5HYW1lc1xuXG5cbiAgICAvLyAkc2NvcGUuam9pbkdhbWUgPSBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWQ7XG5cbiAgICAvLyAkc2NvcGUuc2hvd1BvcHVwID0gZnVuY3Rpb24oZ2FtZUlkKSB7XG5cbiAgICAvLyAgICAgJHNjb3BlLmdhbWUgPSAkc2NvcGUuZ2FtZXNbZ2FtZUlkXTtcbiAgICAvLyAgICAgJHNjb3BlLmdhbWVOYW1lID0gJHNjb3BlLmdhbWUuc2V0dGluZ3MubmFtZTtcbiAgICAvLyAgICAgJHNjb3BlLnBsYXllckNvdW50ID0gT2JqZWN0LmtleXMoJHNjb3BlLmdhbWUucGxheWVycykubGVuZ3RoO1xuICAgIC8vICAgICAkc2NvcGUud2FpdGluZ0ZvclBsYXllcnMgPSAgKCRzY29wZS5nYW1lLnNldHRpbmdzLm1pblBsYXllcnMgfHwgNCkgLSAkc2NvcGUucGxheWVyQ291bnQ7XG5cbiAgICAvLyAgICAgIGNvbnN0IG15UG9wdXAgPSAkaW9uaWNQb3B1cC5zaG93KHtcbiAgICAvLyAgICAgICAgIHRlbXBsYXRlVXJsOiAnanMvaG9tZS9wb3B1cC5odG1sJyxcbiAgICAvLyAgICAgICAgIHRpdGxlOiAnSm9pbiAnICsgJHNjb3BlLmdhbWVOYW1lLFxuICAgIC8vICAgICAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAvLyAgICAgICAgIGJ1dHRvbnM6IFxuICAgIC8vICAgICAgICAgW1xuICAgIC8vICAgICAgICAgICAgIHt0ZXh0OiAnR28gYmFjayd9LFxuICAgIC8vICAgICAgICAgICAgIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgdGV4dDogJ0pvaW4gZ2FtZScsXG4gICAgLy8gICAgICAgICAgICAgICAgIHR5cGU6ICdidXR0b24tYmFsYW5jZWQnLFxuICAgIC8vICAgICAgICAgICAgICAgICBvblRhcDogZSA9PiB7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAkc2NvcGUuam9pbkdhbWUoZ2FtZUlkKTtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnZ2FtZS5hY3RpdmUtZ2FtZScsIHsgZ2FtZUlkOiBnYW1lSWQgfSlcbiAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIF1cbiAgICAvLyAgICAgfSlcbiAgICAvLyB9XG59KVxuXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbG9naW4nLCB7XG4gICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbG9naW4vbG9naW4uaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdMb2dpbkN0cmwnXG4gICAgfSlcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvbG9naW4nKTtcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdMb2dpbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSwgVXNlckZhY3RvcnksICRjb3Jkb3ZhT2F1dGgsICRsb2NhbFN0b3JhZ2UsICR0aW1lb3V0LCAkaW9uaWNTaWRlTWVudURlbGVnYXRlKSB7XG4gICAgJHNjb3BlLmxvZ2luV2l0aFNsYWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBVc2VyRmFjdG9yeS5nZXRTbGFja0NyZWRzKClcbiAgICAgICAgICAgIC50aGVuKGNyZWRzID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGNvcmRvdmFPYXV0aC5zbGFjayhjcmVkcy5jbGllbnRJRCwgY3JlZHMuY2xpZW50U2VjcmV0LCBbJ2lkZW50aXR5LmJhc2ljJywgJ2lkZW50aXR5LnRlYW0nLCAnaWRlbnRpdHkuYXZhdGFyJ10pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oaW5mbyA9PiBVc2VyRmFjdG9yeS5zZXRVc2VyKGluZm8pKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gJHN0YXRlLmdvKCdob21lJykpXG4gICAgfVxuXG4gICAgJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZS5jYW5EcmFnQ29udGVudChmYWxzZSk7XG5cbiAgICAkc2NvcGUuJG9uKCckaW9uaWNWaWV3LmxlYXZlJywgZnVuY3Rpb24oKSB7ICRpb25pY1NpZGVNZW51RGVsZWdhdGUuY2FuRHJhZ0NvbnRlbnQodHJ1ZSkgfSk7XG5cbiAgICAkc2NvcGUuc3RvcmFnZSA9ICRsb2NhbFN0b3JhZ2VcblxuICAgIGZ1bmN0aW9uIHJlZGlyZWN0VXNlcigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzY29wZSBzdG9yYWdlIHVzZXJcIiwgJHNjb3BlLnN0b3JhZ2UudXNlcilcbiAgICAgICAgaWYgKCRzY29wZS5zdG9yYWdlLnVzZXIpICRzdGF0ZS5nbygnaG9tZScpXG4gICAgfVxuXG4gICAgcmVkaXJlY3RVc2VyKCk7XG59KVxuXG4iLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSA9PiB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbmV3LWdhbWUnLCB7XG4gICAgICAgIHVybDogJy9uZXctZ2FtZScsXG4gICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL21haW4uaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdOZXdHYW1lQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIHRlYW1EZWNrczogKEdhbWVGYWN0b3J5KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05hdmlnYXRpbmcgdG8gc3RhdGUgb3IgdHJ5aW5nIHRvIGhlbGxvJylcbiAgICAgICAgICAgICAgICByZXR1cm4gR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RhbmRhcmREZWNrOiAoR2FtZUZhY3RvcnkpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoMSlcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ25ldy1nYW1lLm1haW4nLCB7XG4gICAgICAgIHVybDogJy9zZXR1cC1nYW1lJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9uZXctZ2FtZS5odG1sJyxcbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5hZGQtZGVja3MnLCB7XG4gICAgICAgIHVybDogJy9hZGQtZGVja3MnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL2FkZC1kZWNrcy5odG1sJyxcbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5kZWNrJywge1xuICAgICAgICB1cmw6ICcvZGVjay86ZGVja0lkJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9kZWNrLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnRGVja0N0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBjYXJkczogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldENhcmRzQnlEZWNrSWQoJHN0YXRlUGFyYW1zLmRlY2tJZClcbiAgICAgICAgfVxuXG5cbiAgICB9KVxuXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL25ldy1nYW1lL3NldHVwLWdhbWUnKTtcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdOZXdHYW1lQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkc3RhdGUsIHRlYW1EZWNrcywgc3RhbmRhcmREZWNrKSA9PiB7XG4gICAgJHNjb3BlLmN1cnJlbnRWaWV3ID0gJ2FkZERlY2tzJ1xuICAgICRzY29wZS5nYW1lQ29uZmlnID0ge307XG4gICAgJHNjb3BlLmdhbWVDb25maWcuZGVja3MgPSB7fTtcbiAgICAkc2NvcGUuZ29Ub0RlY2tzID0gKCkgPT4ge1xuICAgICAgICAkc3RhdGUuZ28oJ25ldy1nYW1lLmFkZC1kZWNrcycsIHt9LCB7IGxvY2F0aW9uOiB0cnVlLCByZWxvYWQ6IHRydWUgfSlcbiAgICB9XG5cblxuXG4gICAgJHNjb3BlLmRlY2tzID0gc3RhbmRhcmREZWNrLmNvbmNhdCh0ZWFtRGVja3MpO1xuXG4gICAgJHNjb3BlLnN0YXJ0TmV3R2FtZSA9IChnYW1lQ29uZmlnKSA9PiB7XG4gICAgICAgIHJldHVybiBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWUoZ2FtZUNvbmZpZylcbiAgICAgICAgICAgIC50aGVuKChpZCkgPT4gR2FtZUZhY3RvcnkuYWRkUGlsZVRvR2FtZShpZCwgJHNjb3BlLmdhbWVDb25maWcuZGVja3MpKVxuICAgICAgICAgICAgLnRoZW4oKGlkKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ltIGhlcmUnKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCcjIyNHQU1FIFJVTEVTJywgJHNjb3BlLmdhbWVSdWxlcylcbiAgICAgICAgICAgICAgICAvLyRzY29wZS5nYW1lUnVsZXMuJHNldFByaXN0aW5lKCk7XG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdnYW1lJywgeyBnYW1lSWQ6IGlkIH0pXG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgJHNjb3BlLmFkZERlY2tzVG9HYW1lID0gR2FtZUZhY3RvcnkuYWRkRGVja3M7XG4gICAgLy8gJHNjb3BlLiRvbignY2hhbmdlZEdhbWUnLCAoZXZlbnQsIGRhdGEpID0+IHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ3JlY2VpdmVkIGV2ZW50JylcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ2RhdGEgb2JqOicsIGRhdGEpXG4gICAgLy8gICAgICRzY29wZS5nYW1lID0gZGF0YTtcbiAgICAvLyAgICAgJHNjb3BlLiRkaWdlc3QoKVxuXG4gICAgLy8gfSlcblxuXG59KVxuXG5hcHAuY29udHJvbGxlcignRGVja0N0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgJHN0YXRlLCBjYXJkcykgPT4ge1xuICAgICRzY29wZS5jYXJkcyA9IGNhcmRzXG59KVxuXG4iLCJhcHAuZmFjdG9yeSgnQWN0aXZlR2FtZUZhY3RvcnknLCAoJGh0dHAsICRyb290U2NvcGUsICRsb2NhbFN0b3JhZ2UpID0+IHtcblxuICAgIGNvbnN0IEFjdGl2ZUdhbWVGYWN0b3J5ID0ge307XG5cbiAgICBjb25zdCByZWZpbGxlciA9IChjYXJkc05lZWRlZCwgcGlsZVJlZiwgaGFuZFJlZikgPT4ge1xuICAgICAgICByZXR1cm4gcGlsZVJlZi5saW1pdFRvRmlyc3QoY2FyZHNOZWVkZWQpLm9uY2UoJ3ZhbHVlJywgY2FyZHNTbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgY2FyZHNTbmFwc2hvdC5mb3JFYWNoKGNhcmQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdXBkYXRlT2JqID0ge31cbiAgICAgICAgICAgICAgICAgICAgY2FyZC5yZWYudHJhbnNhY3Rpb24oY2FyZERhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZU9ialtjYXJkLmtleV0gPSBjYXJkRGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gaGFuZFJlZi51cGRhdGUodXBkYXRlT2JqKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICB9XG5cbiAgICBBY3RpdmVHYW1lRmFjdG9yeS5yZWZpbGxNeUhhbmQgPSAoZ2FtZUlkLCBwbGF5ZXJJZCwgdGVhbUlkKSA9PiB7XG4gICAgICAgIC8vIGhvdyBtYW55IGNhcmRzIGRvIEkgbmVlZD9cbiAgICAgICAgY29uc29sZS5sb2coXCJyZWZpbGxpbmcgaGFuZFwiKVxuICAgICAgICBsZXQgY2FyZHNOZWVkZWQgPSAwXG4gICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgIGNvbnN0IGhhbmRSZWYgPSBnYW1lUmVmLmNoaWxkKGBwbGF5ZXJzLyR7cGxheWVySWR9L2hhbmRgKVxuICAgICAgICBjb25zdCBwaWxlUmVmID0gZ2FtZVJlZi5jaGlsZCgncGlsZS93aGl0ZWNhcmRzJylcbiAgICAgICAgaGFuZFJlZi5vbmNlKCd2YWx1ZScsIGhhbmRTbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgY2FyZHNOZWVkZWQgPSA3IC0gaGFuZFNuYXBzaG90Lm51bUNoaWxkcmVuKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVmaWxsZXIoY2FyZHNOZWVkZWQsIHBpbGVSZWYsIGhhbmRSZWYpXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJtYWRlIGl0IHRvIHJlZmlsbGVyXCIpXG4gICAgICAgICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IGZpcmViYXNlTW92ZVNpbmdsZUtleVZhbHVlID0gKG9sZFJlZiwgbmV3UmVmKSA9PiB7XG4gICAgICAgIGxldCByZW1vdmVVcGRhdGUgPSB7fVxuICAgICAgICBsZXQgbmV3VXBkYXRlID0ge31cbiAgICAgICAgcmV0dXJuIG9sZFJlZi5vbmNlKCd2YWx1ZScpXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgICAgICAgICAudGhlbihzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlVXBkYXRlW3NuYXBzaG90LmtleV0gPSBudWxsXG4gICAgICAgICAgICAgICAgbmV3VXBkYXRlW3NuYXBzaG90LmtleV0gPSBzbmFwc2hvdC52YWwoKVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXdSZWYudXBkYXRlKG5ld1VwZGF0ZSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiBvbGRSZWYucGFyZW50LnVwZGF0ZShyZW1vdmVVcGRhdGUpKVxuICAgIH1cblxuXG4gICAgQWN0aXZlR2FtZUZhY3Rvcnkuc3VibWl0V2hpdGVDYXJkID0gKHBsYXllcklkLCBjYXJkSWQsIGdhbWVJZCwgdGVhbUlkLCBjYXJkVGV4dCkgPT4ge1xuICAgICAgICBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKTtcbiAgICAgICAgY29uc3QgY2FyZFRvU3VibWl0ID0gZ2FtZVJlZi5jaGlsZChgcGxheWVycy8ke3BsYXllcklkfS9oYW5kLyR7Y2FyZElkfWApO1xuICAgICAgICBjb25zdCBzdWJtaXRSZWYgPSBnYW1lUmVmLmNoaWxkKCdzdWJtaXR0ZWRXaGl0ZUNhcmRzJyk7XG4gICAgICAgIGZpcmViYXNlTW92ZVNpbmdsZUtleVZhbHVlKGNhcmRUb1N1Ym1pdCwgc3VibWl0UmVmKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHN1Ym1pdFJlZi5jaGlsZChjYXJkSWQpLnNldCh7XG4gICAgICAgICAgICAgICAgICAgIHN1Ym1pdHRlZEJ5OiBwbGF5ZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogY2FyZFRleHRcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICB9XG5cblxuICAgIC8vbmlraXRhJ3MgdXBkYXRlZCB2ZXJzaW9uXG4gICAgLy8gQWN0aXZlR2FtZUZhY3Rvcnkuc3VibWl0V2hpdGVDYXJkID0gKHBsYXllcklkLCBjYXJkSWQsIGdhbWVJZCwgdGVhbUlkLCBjYXJkVGV4dCkgPT4ge1xuICAgIC8vICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YCk7XG4gICAgLy8gICBjb25zdCBjYXJkVG9TdWJtaXQgPSBnYW1lUmVmLmNoaWxkKGBwbGF5ZXJzLyR7cGxheWVySWR9L2hhbmQvJHtjYXJkSWR9L3RleHRgKTtcbiAgICAvLyAgIGNvbnN0IHN1Ym1pdFJlZiA9IGdhbWVSZWYuY2hpbGQoJ3N1Ym1pdHRlZFdoaXRlQ2FyZHMnKTtcbiAgICAvLyAgIGxldCB0ZXh0ID0gJydcbiAgICAvLyAgIHJldHVybiBjYXJkVG9TdWJtaXQudHJhbnNhY3Rpb24oY2FyZFRleHQgPT4ge1xuICAgIC8vICAgICAgIHRleHQgPSBjYXJkVGV4dFxuICAgIC8vICAgICAgIHJldHVybiBudWxsXG4gICAgLy8gICAgIH0pXG4gICAgLy8gICAgIC50aGVuKCgpID0+IHtcbiAgICAvLyAgICAgICBsZXQgdXBkYXRlT2JqID0ge307XG4gICAgLy8gICAgICAgdXBkYXRlT2JqW3BsYXllcklkXS50ZXh0ID0gdGV4dDtcbiAgICAvLyAgICAgICB1cGRhdGVPYmpbcGxheWVySWRdLmNhcmRJZCA9IGNhcmRJZFxuICAgIC8vICAgICAgIHJldHVybiBzdWJtaXRSZWYudXBkYXRlKHVwZGF0ZU9iailcbiAgICAvLyAgICAgfSlcbiAgICAvLyAgICAgLnRoZW4oKCkgPT4gY29uc29sZS5sb2coJ3N1Ym1pc3Npb24gc3VjY2VzcycpKVxuICAgIC8vICAgICAuY2F0Y2goKGVycikgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICAvLyB9XG5cblxuXG4gICAgQWN0aXZlR2FtZUZhY3RvcnkucGlja1dpbm5pbmdXaGl0ZUNhcmQgPSAoY2FyZElkLCBnYW1lSWQsIHRlYW1JZCkgPT4ge1xuICAgICAgICBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKTtcbiAgICAgICAgbGV0IHdpbm5lciA9IGdhbWVSZWYuY2hpbGQoYHN1Ym1pdHRlZFdoaXRlQ2FyZHMvJHtjYXJkSWR9L3N1Ym1pdHRlZEJ5YClcbiAgICAgICAgY29uc3Qgd2lubmluZ0NhcmQgPSBnYW1lUmVmLmNoaWxkKGBzdWJtaXR0ZWRXaGl0ZUNhcmRzLyR7Y2FyZElkfWApXG4gICAgICAgIGNvbnNvbGUubG9nKCdXSU5OSU5HIENBUkQnLCB3aW5uaW5nQ2FyZClcbiAgICAgICAgbGV0IGJsYWNrQ2FyZElkID0gJyc7XG4gICAgICAgIGxldCBibGFja0NhcmRXb24gPSB7fVxuICAgICAgICB3aW5uZXIub25jZSgndmFsdWUnKVxuICAgICAgICAgICAgLnRoZW4od2lubmVySWQgPT4ge1xuICAgICAgICAgICAgICAgIHdpbm5lciA9IHdpbm5lcklkLnZhbCgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzZXRSb3VuZFN0YXRlVG9PdmVyID0gZ2FtZVJlZi5jaGlsZCgnc3RhdGUnKS5zZXQoJ3Bvc3Ryb3VuZCcpXG4gICAgICAgICAgICAgICAgY29uc3QgYXdhcmRCbGFja0NhcmQgPSBnYW1lUmVmLmNoaWxkKCdjdXJyZW50QmxhY2tDYXJkJykudHJhbnNhY3Rpb24oKGN1cnJlbnRCbGFja0NhcmQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsYWNrQ2FyZFdvbiA9IGN1cnJlbnRCbGFja0NhcmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIiMjIyNCTEFDSyBDQVJEIFdPTlwiLCBibGFja0NhcmRXb24pXG4gICAgICAgICAgICAgICAgICAgICAgICBnYW1lUmVmLmNoaWxkKGBwbGF5ZXJzLyR7d2lubmVyfS9ibGFja0NhcmRzV29uYCkudXBkYXRlKGJsYWNrQ2FyZFdvbilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5uaW5nQ2FyZC5vbmNlKCd2YWx1ZScpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHdpbm5pbmdDYXJkU25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1NOQVBTSE9UJywgd2lubmluZ0NhcmRTbmFwc2hvdC52YWwoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5uaW5nQ2FyZFNuYXBzaG90ID0gd2lubmluZ0NhcmRTbmFwc2hvdC52YWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBnYW1lUmVmLmNoaWxkKGB3aW5uaW5nQ2FyZGApLnNldCh3aW5uaW5nQ2FyZFNuYXBzaG90KVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBnYW1lUmVmLmNoaWxkKCdzdWJtaXR0ZWRXaGl0ZUNhcmRzJykucmVtb3ZlKCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtzZXRSb3VuZFN0YXRlVG9PdmVyLCBhd2FyZEJsYWNrQ2FyZF0pXG4gICAgICAgICAgICB9KVxuICAgIH1cblxuICAgIHJldHVybiBBY3RpdmVHYW1lRmFjdG9yeTtcbn0pOyIsImFwcC5mYWN0b3J5KCdHYW1lRmFjdG9yeScsICgkaHR0cCwgJHJvb3RTY29wZSwgJGxvY2FsU3RvcmFnZSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IG91cklwcyA9IHtcbiAgICAgICAgICAgIG5pa2l0YTogXCIxOTIuMTY4LjQuMjEzXCIsXG4gICAgICAgICAgICBrYXlsYTogXCIxOTIuMTY4LjQuMjI1XCIsXG4gICAgICAgICAgICBuaXRoeWE6IFwiMTkyLjE2OC4xLjQ4XCIsXG4gICAgICAgICAgICBkYW46IFwiMTkyLjE2OC40LjIzNlwiXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjdXJyZW50SXAgPSBvdXJJcHMua2F5bGE7XG5cbiAgICAgICAgLy8gc3RhcnQgYSBuZXcgZ2FtZSBkZXJwXG4gICAgICAgIGNvbnN0IEdhbWVGYWN0b3J5ID0ge307XG4gICAgICAgIEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZSA9IChnYW1lQ29uZmlnKSA9PiB7XG4gICAgICAgICAgICAvL2NhbiBhbHNvIGdldCBhbGwgdGhlIGRlY2tzIGJ5IHRlYW0gaGVyZSB0byBwcmVwYXJlXG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAkbG9jYWxTdG9yYWdlLnRlYW0uaWQgfHwgMjtcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0b3JJZCA9ICRsb2NhbFN0b3JhZ2UudXNlci5pZCB8fCAzO1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZ2FtZXNgLCB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGdhbWVDb25maWcubmFtZSB8fCAnQVdFU09NRSBOYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgdGVhbUlkOiB0ZWFtSWQsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0b3JJZDogY3JlYXRvcklkLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdG9yTmFtZTogJGxvY2FsU3RvcmFnZS51c2VyLm5hbWUgfHwgJ2RhbicsIC8vbWlnaHQgYmUgdW5uZWNlc3NhcnkgaWYgd2UgaGF2ZSB0aGUgdXNlciBpZFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczogZ2FtZUNvbmZpZ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2FtZUlkID0gcmVzLmRhdGFcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGAvdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICAgICAgICAgIGdhbWVSZWYub24oJ3ZhbHVlJywgc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdjaGFuZ2VkR2FtZScsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdhbWVJZDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9O1xuICAgICAgICAvLyBnZXQgYWxsIG9mIGEgZGVja3MgY2FyZHMgdG8gZGlzcGxheSB3aGVuIGxvb2tpbmcgYXQgZGVja3NcbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0Q2FyZHNCeURlY2tJZCA9IChpZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9kZWNrcy8ke2lkfS9jYXJkc2ApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBUT0RPOiBjb21iaW5lIHRoaXMgaW50byB0aGUgYWJvdmUgc3RhcnROZXdHYW1lIGZ1bmNcbiAgICAgICAgLy8gdGFrZSBhbGwgb2YgdGhlIHNlbGVjdGVkIGRlY2tzJyBjYXJkcyBhbmQgcHV0IHRoZW0gaW4gdGhlIGZpcmViYXNlIGdhbWUgb2JqZWN0IHBpbGUgKHRocm91Z2ggcm91dGUpXG4gICAgICAgIEdhbWVGYWN0b3J5LmFkZFBpbGVUb0dhbWUgPSAoZ2FtZUlkLCBkZWNrcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZGRpbmcgcGlsZSB0byBnYW1lXCIpXG4gICAgICAgICAgICBjb25zdCBkZWNrc0FyciA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgZGVja0lkIGluIGRlY2tzKSB7XG4gICAgICAgICAgICAgICAgZGVja3NBcnIucHVzaChkZWNrSWQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0vZGVja3NgLCB7XG4gICAgICAgICAgICAgICAgICAgICdkZWNrcyc6IGRlY2tzQXJyXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBnYW1lSWQpXG4gICAgICAgIH07XG5cbiAgICAgICAgR2FtZUZhY3Rvcnkuam9pbkdhbWVCeUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gJGxvY2FsU3RvcmFnZS50ZWFtLmlkO1xuICAgICAgICAgICAgY29uc3QgcGxheWVySWQgPSAkbG9jYWxTdG9yYWdlLnVzZXIuaWQ7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJOYW1lID0gJGxvY2FsU3RvcmFnZS51c2VyLm5hbWU7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfS9wbGF5ZXJzLyR7cGxheWVySWR9YClcbiAgICAgICAgICAgIHBsYXllclJlZi5zZXQoe1xuICAgICAgICAgICAgICAgIG5hbWU6IHBsYXllck5hbWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0vP3BsYXllcklkPSR7cGxheWVySWR9YClcbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkID0gKGlkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAodHlwZW9mIGlkICE9PSAnbnVtYmVyJykgPyAkbG9jYWxTdG9yYWdlLnRlYW0uaWQgOiBpZDsgLy8gaWQgfHwgbG9jYWxzdG9yYWdlIGRvZXNuJ3Qgd29yayBiZWNhdXNlIDAgaXMgZmFsc2V5XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2RlY2tzP3RlYW09JHt0ZWFtSWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG5cbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRVc2Vyc0J5R2FtZUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0vdXNlcnNgKTtcbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRHYW1lQnlHYW1lSWQgPSAoZ2FtZUlkLCB0ZWFtSWQpID0+IHtcbiAgICAgICAgICAgIHRlYW1JZCA9IHRlYW1JZCB8fCAkbG9jYWxTdG9yYWdlLnRlYW0uaWRcbiAgICAgICAgICAgIGNvbnN0IGdhbWVzUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAgICAgcmV0dXJuIGdhbWVzUmVmLm9uY2UoJ3ZhbHVlJykudGhlbihzbmFwc2hvdCA9PiBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VGVhbUlkID0gKHRlYW1JZCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCIjIyNURUFNIElEXCIsIHRlYW1JZClcbiAgICAgICAgICAgIHRlYW1JZCA9IHRlYW1JZCB8fCAkbG9jYWxTdG9yYWdlLnRlYW0uaWRcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGUgdGVhbSBpZCBpczonLCB0ZWFtSWQpXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzLz90ZWFtSWQ9JHt0ZWFtSWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlVc2VySWQgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzLz91c2VySWQ9JHskbG9jYWxTdG9yYWdlLnVzZXIuaWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKTtcbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRPcGVuR2FtZXMgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAkbG9jYWxTdG9yYWdlLnRlYW0uaWQ7XG4gICAgICAgICAgICBjb25zdCB1c2VySWQgPSAkbG9jYWxTdG9yYWdlLnVzZXIuaWQ7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzLz90ZWFtSWQ9JHt0ZWFtSWR9JnVzZXJJZD0ke3VzZXJJZH0mb3Blbj10cnVlYClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gR2FtZUZhY3Rvcnk7XG4gICAgfVxuXG4pO1xuXG4iLCJhcHAuZmFjdG9yeSgnVXNlckZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCwgJGxvY2FsU3RvcmFnZSkge1xuICAgIGNvbnN0IG91cklwcyA9IHtcbiAgICAgICAgbmlraXRhOiBcIjE5Mi4xNjguNC4yMTNcIixcbiAgICAgICAga2F5bGE6IFwiMTkyLjE2OC40LjIyNVwiLFxuICAgICAgICBuaXRoeWE6IFwiMTkyLjE2OC4xLjQ4XCIsXG4gICAgICAgIGRhbjogXCIxOTIuMTY4LjQuMjM2XCJcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50SXAgPSBvdXJJcHMua2F5bGFcblxuICAgIHJldHVybiB7XG4gICAgICAgIHNldFVzZXI6IGZ1bmN0aW9uKGluZm8pIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL3VzZXJzYCxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBpbmZvXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldExvY2FsU3RvcmFnZShyZXMuZGF0YS51c2VyWzBdLCByZXMuZGF0YS50ZWFtWzBdKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBnZXRTbGFja0NyZWRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvc2xhY2tgKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuZGF0YVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGdldFNsYWNrSW5mbzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdodHRwczovL3NsYWNrLmNvbS9hcGkvdXNlcnMuaWRlbnRpdHknKVxuICAgICAgICB9LFxuXG4gICAgICAgIHNldExvY2FsU3RvcmFnZTogZnVuY3Rpb24odXNlciwgdGVhbSkge1xuICAgICAgICAgICAgJGxvY2FsU3RvcmFnZS51c2VyID0gdXNlcjtcbiAgICAgICAgICAgICRsb2NhbFN0b3JhZ2UudGVhbSA9IHRlYW07XG4gICAgICAgIH0sXG5cbiAgICAgICAgbG9nT3V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRsb2NhbFN0b3JhZ2UuJHJlc2V0KCk7XG4gICAgICAgIH1cbiAgICB9XG59KVxuXG4iLCIvL0RpcmVjdGl2ZSBGaWxlIiwiYXBwLmRpcmVjdGl2ZSgnc3VibWl0dGVkQ2FyZHMnLCBmdW5jdGlvbigpe1xuXHRyZXR1cm4ge1xuXHRcdHJlc3RyaWN0OiAnRScsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9jb21tb24vZGlyZWN0aXZlcy9zdWJtaXR0ZWQtY2FyZHMuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0dhbWVDdHJsJ1xuXHR9XG59KSIsImFwcC5kaXJlY3RpdmUoJ3doaXRlQ2FyZHMnLCBmdW5jdGlvbigpe1xuXHRyZXR1cm4ge1xuXHRcdHJlc3RyaWN0OiAnRScsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9jb21tb24vZGlyZWN0aXZlcy93aGl0ZS1jYXJkcy5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnR2FtZUN0cmwnXG5cdH1cbn0pIiwiYXBwLmRpcmVjdGl2ZSgnd2lubmluZ0NhcmRzJywgZnVuY3Rpb24oKXtcblx0cmV0dXJuIHtcblx0XHRyZXN0cmljdDogJ0UnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvY29tbW9uL2RpcmVjdGl2ZXMvd2hpdGUtY2FyZHMuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0dhbWVDdHJsJ1xuXHR9XG59KSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
