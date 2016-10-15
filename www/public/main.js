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

app.config(function ($stateProvider) {

    $stateProvider.state('game', {
        url: '/game/:gameId',
        templateUrl: 'js/game/game.html',
        controller: 'GameCtrl'
    });
});

app.controller('GameCtrl', function ($scope, GameFactory, $stateParams, $localStorage, ActiveGameFactory) {
    // const gameId = $stateParams.gameId;
    $scope.gameId = 12;
    var playerId = $localStorage.user.id;
    var teamId = 2;
    // const teamId = $localStorage.team.id
    var gameRef = firebase.database().ref('teams/' + teamId + '/games/' + $scope.gameId + '/');

    gameRef.on('value', function (gameSnapshot) {
        // console.log(gameSnapshot.val())
        $scope.game = gameSnapshot.val();
        $scope.gameName = $scope.game.settings.name;
        if ($scope.game.players[playerId].hand) {
            $scope.playerHand = $scope.game.players[playerId].hand;
            $scope.playerHandCount = Object.keys($scope.playerHand).length;
        }
        $scope.blackCard = $scope.game.currentBlackCard.text;
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
        $scope.getSubmittedPlayers();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImNhcmRzLXRlc3QvY2FyZHNUZXN0LmpzIiwiZGVja3MvZGVja3MuanMiLCJmcm9tIGZzZy9mcm9tLWZzZy5qcyIsImhvbWUvaG9tZS5qcyIsImdhbWUvZ2FtZS5qcyIsImxvZ2luL2xvZ2luLmpzIiwibmV3LWdhbWUvbmV3LWdhbWUuanMiLCJjb21tb24vZmFjdG9yaWVzL0FjdGl2ZUdhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9HYW1lRmFjdG9yeS5qcyIsImNvbW1vbi9mYWN0b3JpZXMvdXNlckZhY3RvcnkuanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiLCJjb21tb24vZGlyZWN0aXZlcy9zdWJtaXR0ZWQtY2FyZHMuanMiLCJjb21tb24vZGlyZWN0aXZlcy93aGl0ZS1jYXJkcy5qcyIsImNvbW1vbi9kaXJlY3RpdmVzL3dpbm5pbmctY2FyZC5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJhcHAiLCJhbmd1bGFyIiwibW9kdWxlIiwicnVuIiwiJGlvbmljUGxhdGZvcm0iLCJyZWFkeSIsImNvcmRvdmEiLCJwbHVnaW5zIiwiS2V5Ym9hcmQiLCJoaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIiLCJkaXNhYmxlU2Nyb2xsIiwiU3RhdHVzQmFyIiwic3R5bGVMaWdodENvbnRlbnQiLCIkcm9vdFNjb3BlIiwiJG9uIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJhcmd1bWVudHMiLCJjb250cm9sbGVyIiwiJHNjb3BlIiwiVXNlckZhY3RvcnkiLCIkc3RhdGUiLCIkbG9jYWxTdG9yYWdlIiwiJHRpbWVvdXQiLCJsb2dPdXQiLCJnbyIsImNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwic3RhdGUiLCJ1cmwiLCJ0ZW1wbGF0ZVVybCIsImdyZWV0aW5nIiwicmVzb2x2ZSIsImRlY2tzIiwiR2FtZUZhY3RvcnkiLCIkc3RhdGVQYXJhbXMiLCJnZXREZWNrc0J5VGVhbUlkIiwic3RhdGVQYXJhbXMiLCJ0ZWFtSWQiLCIkdXJsUm91dGVyUHJvdmlkZXIiLCJjYWNoZSIsImdhbWVzIiwiZ2V0R2FtZXNCeVVzZXJJZCIsIm9wZW5HYW1lcyIsImdldE9wZW5HYW1lcyIsIiRjb3Jkb3ZhT2F1dGgiLCIkaW9uaWNQb3B1cCIsInN0YXJ0TmV3R2FtZSIsInN0b3JhZ2UiLCJnb1RvTmV3R2FtZSIsIkFjdGl2ZUdhbWVGYWN0b3J5IiwiZ2FtZUlkIiwicGxheWVySWQiLCJ1c2VyIiwiaWQiLCJnYW1lUmVmIiwiZmlyZWJhc2UiLCJkYXRhYmFzZSIsInJlZiIsIm9uIiwiZ2FtZSIsImdhbWVTbmFwc2hvdCIsInZhbCIsImdhbWVOYW1lIiwic2V0dGluZ3MiLCJuYW1lIiwicGxheWVycyIsImhhbmQiLCJwbGF5ZXJIYW5kIiwicGxheWVySGFuZENvdW50IiwiT2JqZWN0Iiwia2V5cyIsImxlbmd0aCIsImJsYWNrQ2FyZCIsImN1cnJlbnRCbGFja0NhcmQiLCJ0ZXh0IiwianVkZ2UiLCJjdXJyZW50SnVkZ2UiLCJzdWJtaXR0ZWRXaGl0ZUNhcmRzIiwiJGV2YWxBc3luYyIsIndpbm5pbmdDYXJkIiwic2hvd0NhcmRzIiwic3VibWl0dGVkIiwib25Td2lwZURvd24iLCJqb2luR2FtZUJ5SWQiLCJ0aGVuIiwicmVmaWxsTXlIYW5kIiwib25Eb3VibGVUYXAiLCJjYXJkSWQiLCJjYXJkVGV4dCIsInN1Ym1pdFdoaXRlQ2FyZCIsImdldFN1Ym1pdHRlZFBsYXllcnMiLCJqdWRnZURvdWJsZVRhcCIsInBpY2tXaW5uaW5nV2hpdGVDYXJkIiwib3RoZXJ3aXNlIiwiJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZSIsImxvZ2luV2l0aFNsYWNrIiwiZ2V0U2xhY2tDcmVkcyIsInNsYWNrIiwiY3JlZHMiLCJjbGllbnRJRCIsImNsaWVudFNlY3JldCIsInNldFVzZXIiLCJpbmZvIiwiY2FuRHJhZ0NvbnRlbnQiLCJyZWRpcmVjdFVzZXIiLCJhYnN0cmFjdCIsInRlYW1EZWNrcyIsInN0YW5kYXJkRGVjayIsImNhcmRzIiwiZ2V0Q2FyZHNCeURlY2tJZCIsImRlY2tJZCIsImN1cnJlbnRWaWV3IiwiZ2FtZUNvbmZpZyIsImdvVG9EZWNrcyIsImxvY2F0aW9uIiwicmVsb2FkIiwiY29uY2F0IiwiYWRkUGlsZVRvR2FtZSIsImFkZERlY2tzVG9HYW1lIiwiYWRkRGVja3MiLCJmYWN0b3J5IiwiJGh0dHAiLCJyZWZpbGxlciIsImNhcmRzTmVlZGVkIiwicGlsZVJlZiIsImhhbmRSZWYiLCJsaW1pdFRvRmlyc3QiLCJvbmNlIiwiY2FyZHNTbmFwc2hvdCIsImZvckVhY2giLCJ1cGRhdGVPYmoiLCJjYXJkIiwidHJhbnNhY3Rpb24iLCJrZXkiLCJjYXJkRGF0YSIsInVwZGF0ZSIsImNhdGNoIiwiZXJyIiwiY2hpbGQiLCJoYW5kU25hcHNob3QiLCJudW1DaGlsZHJlbiIsImZpcmViYXNlTW92ZVNpbmdsZUtleVZhbHVlIiwib2xkUmVmIiwibmV3UmVmIiwicmVtb3ZlVXBkYXRlIiwibmV3VXBkYXRlIiwic25hcHNob3QiLCJwYXJlbnQiLCJjYXJkVG9TdWJtaXQiLCJzdWJtaXRSZWYiLCJzZXQiLCJzdWJtaXR0ZWRCeSIsIndpbm5lciIsImJsYWNrQ2FyZElkIiwiYmxhY2tDYXJkV29uIiwid2lubmVySWQiLCJzZXRSb3VuZFN0YXRlVG9PdmVyIiwiYXdhcmRCbGFja0NhcmQiLCJ3aW5uaW5nQ2FyZFNuYXBzaG90IiwicmVtb3ZlIiwiUHJvbWlzZSIsImFsbCIsIm91cklwcyIsIm5pa2l0YSIsImtheWxhIiwibml0aHlhIiwiZGFuIiwiY3VycmVudElwIiwidGVhbSIsImNyZWF0b3JJZCIsInBvc3QiLCJjcmVhdG9yTmFtZSIsInJlcyIsImRhdGEiLCIkYnJvYWRjYXN0IiwiZ2V0IiwiZGVja3NBcnIiLCJwdXNoIiwicGxheWVyTmFtZSIsInBsYXllclJlZiIsImdldFVzZXJzQnlHYW1lSWQiLCJnZXRHYW1lQnlHYW1lSWQiLCJnYW1lc1JlZiIsImdldEdhbWVzQnlUZWFtSWQiLCJ1c2VySWQiLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0TG9jYWxTdG9yYWdlIiwiZ2V0U2xhY2tJbmZvIiwiJHJlc2V0IiwiZGlyZWN0aXZlIiwicmVzdHJpY3QiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBQSxPQUFBQyxHQUFBLEdBQUFDLFFBQUFDLE1BQUEsQ0FBQSxzQkFBQSxFQUFBLENBQUEsT0FBQSxFQUFBLFdBQUEsRUFBQSxXQUFBLEVBQUEsZ0JBQUEsRUFBQSxXQUFBLEVBQUEsV0FBQSxDQUFBLENBQUE7O0FBR0FGLElBQUFHLEdBQUEsQ0FBQSxVQUFBQyxjQUFBLEVBQUE7QUFDQUEsbUJBQUFDLEtBQUEsQ0FBQSxZQUFBO0FBQ0EsWUFBQU4sT0FBQU8sT0FBQSxJQUFBUCxPQUFBTyxPQUFBLENBQUFDLE9BQUEsQ0FBQUMsUUFBQSxFQUFBO0FBQ0E7QUFDQTtBQUNBRixvQkFBQUMsT0FBQSxDQUFBQyxRQUFBLENBQUFDLHdCQUFBLENBQUEsSUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQUgsb0JBQUFDLE9BQUEsQ0FBQUMsUUFBQSxDQUFBRSxhQUFBLENBQUEsSUFBQTtBQUNBO0FBQ0EsWUFBQVgsT0FBQVksU0FBQSxFQUFBO0FBQ0FBLHNCQUFBQyxpQkFBQTtBQUNBO0FBQ0EsS0FkQTtBQWdCQSxDQWpCQTs7QUFtQkFaLElBQUFHLEdBQUEsQ0FBQSxVQUFBVSxVQUFBLEVBQUE7QUFDQUEsZUFBQUMsR0FBQSxDQUFBLG1CQUFBLEVBQUEsWUFBQTtBQUNBQyxnQkFBQUMsR0FBQSxDQUFBQyxLQUFBQyxTQUFBLENBQUFDLFVBQUEsQ0FBQSxDQUFBLENBQUE7QUFDQSxLQUZBO0FBR0EsQ0FKQTs7QUM1QkFuQixJQUFBb0IsVUFBQSxDQUFBLFlBQUEsRUFBQSxVQUFBQyxNQUFBLEVBQUFDLFdBQUEsRUFBQUMsTUFBQSxFQUFBQyxhQUFBLEVBQUFDLFFBQUEsRUFBQTtBQUNBSixXQUFBSyxNQUFBLEdBQUEsWUFBQTtBQUNBSixvQkFBQUksTUFBQTtBQUNBSCxlQUFBSSxFQUFBLENBQUEsT0FBQTtBQUNBLEtBSEE7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TUFBQXNELEdBQUEsYUFBQVIsU0FBQSxzQkFDQW5GLElBREEsQ0FDQSxlQUFBO0FBQ0EsdUJBQUF3RixJQUFBQyxJQUFBO0FBQ0EsYUFIQSxDQUFBO0FBSUEsU0FuQkE7QUFvQkFlLHNCQUFBLHdCQUFBO0FBQ0EsbUJBQUFuRSxNQUFBc0QsR0FBQSxDQUFBLHNDQUFBLENBQUE7QUFDQSxTQXRCQTs7QUF3QkFZLHlCQUFBLHlCQUFBdkksSUFBQSxFQUFBb0gsSUFBQSxFQUFBO0FBQ0FuSiwwQkFBQStCLElBQUEsR0FBQUEsSUFBQTtBQUNBL0IsMEJBQUFtSixJQUFBLEdBQUFBLElBQUE7QUFDQSxTQTNCQTs7QUE2QkFqSixnQkFBQSxrQkFBQTtBQUNBRiwwQkFBQXdLLE1BQUE7QUFDQTtBQS9CQSxLQUFBO0FBaUNBLENBM0NBOztBQ0FBO0FDQUFoTSxJQUFBaU0sU0FBQSxDQUFBLGdCQUFBLEVBQUEsWUFBQTtBQUNBLFdBQUE7QUFDQUMsa0JBQUEsR0FEQTtBQUVBbEsscUJBQUEsMkNBRkE7QUFHQVosb0JBQUE7QUFIQSxLQUFBO0FBS0EsQ0FOQTtBQ0FBcEIsSUFBQWlNLFNBQUEsQ0FBQSxZQUFBLEVBQUEsWUFBQTtBQUNBLFdBQUE7QUFDQUMsa0JBQUEsR0FEQTtBQUVBbEsscUJBQUEsdUNBRkE7QUFHQVosb0JBQUE7QUFIQSxLQUFBO0FBS0EsQ0FOQTtBQ0FBcEIsSUFBQWlNLFNBQUEsQ0FBQSxjQUFBLEVBQUEsWUFBQTtBQUNBLFdBQUE7QUFDQUMsa0JBQUEsR0FEQTtBQUVBbEsscUJBQUEsdUNBRkE7QUFHQVosb0JBQUE7QUFIQSxLQUFBO0FBS0EsQ0FOQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW9uaWMgU3RhcnRlciBBcHBcblxuLy8gYW5ndWxhci5tb2R1bGUgaXMgYSBnbG9iYWwgcGxhY2UgZm9yIGNyZWF0aW5nLCByZWdpc3RlcmluZyBhbmQgcmV0cmlldmluZyBBbmd1bGFyIG1vZHVsZXNcbi8vICdzdGFydGVyJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xuXG53aW5kb3cuYXBwID0gYW5ndWxhci5tb2R1bGUoJ0JsYW5rQWdhaW5zdEh1bWFuaXR5JywgWydpb25pYycsICd1aS5yb3V0ZXInLCAnbmdDb3Jkb3ZhJywgJ25nQ29yZG92YU9hdXRoJywgJ25nU3RvcmFnZScsICduZ0FuaW1hdGUnXSlcblxuXG5hcHAucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtKSB7XG4gICAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICAgICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAgICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuXG4gICAgICAgICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcbiAgICAgICAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxuICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgICAgICAgIFN0YXR1c0Jhci5zdHlsZUxpZ2h0Q29udGVudCgpXG4gICAgICAgIH1cbiAgICB9KTtcblxufSlcblxuYXBwLnJ1bihmdW5jdGlvbigkcm9vdFNjb3BlKSB7XG4gICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZUVycm9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGFyZ3VtZW50c1s1XSkpO1xuICAgIH0pO1xufSk7XG5cbiIsImFwcC5jb250cm9sbGVyKCdMb2dvdXRDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBVc2VyRmFjdG9yeSwgJHN0YXRlLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCl7XG5cdCRzY29wZS5sb2dPdXQgPSBmdW5jdGlvbigpe1xuXHRcdFVzZXJGYWN0b3J5LmxvZ091dCgpXG5cdFx0JHN0YXRlLmdvKCdsb2dpbicpXG5cdH1cbn0pIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcil7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdjYXJkcycsIHtcblx0XHR1cmw6ICcvY2FyZHMnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvY2FyZHMtdGVzdC9jYXJkcy10ZXN0Lmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdDYXJkc1Rlc3RDdHJsJ1xuXHR9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0NhcmRzVGVzdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpe1xuIFx0JHNjb3BlLmdyZWV0aW5nID0gXCJISVwiXG59KSIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdkZWNrcycsIHtcblx0XHR1cmw6ICdkZWNrcy86dGVhbWlkJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2RlY2tzL2RlY2tzLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdEZWNrQ3RybCcsXG5cdFx0cmVzb2x2ZToge1xuXHRcdFx0ZGVja3M6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkKHN0YXRlUGFyYW1zLnRlYW1JZClcblx0XHR9XG5cdH0pXG5cbn0pXG5cbmFwcC5jb250cm9sbGVyKCdEZWNrQ3RybCcsICgkc2NvcGUpID0+IHtcblxuXG5cdFxufSkiLCIvLyAoZnVuY3Rpb24gKCkge1xuXG4vLyAgICAgJ3VzZSBzdHJpY3QnO1xuXG4vLyAgICAgLy8gSG9wZSB5b3UgZGlkbid0IGZvcmdldCBBbmd1bGFyISBEdWgtZG95LlxuLy8gICAgIGlmICghd2luZG93LmFuZ3VsYXIpIHRocm93IG5ldyBFcnJvcignSSBjYW5cXCd0IGZpbmQgQW5ndWxhciEnKTtcblxuLy8gICAgIHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnZnNhUHJlQnVpbHQnLCBbXSk7XG5cbi8vICAgICBhcHAuZmFjdG9yeSgnU29ja2V0JywgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICBpZiAoIXdpbmRvdy5pbykgdGhyb3cgbmV3IEVycm9yKCdzb2NrZXQuaW8gbm90IGZvdW5kIScpO1xuLy8gICAgICAgICByZXR1cm4gd2luZG93LmlvKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pO1xuLy8gICAgIH0pO1xuXG4vLyAgICAgLy8gQVVUSF9FVkVOVFMgaXMgdXNlZCB0aHJvdWdob3V0IG91ciBhcHAgdG9cbi8vICAgICAvLyBicm9hZGNhc3QgYW5kIGxpc3RlbiBmcm9tIGFuZCB0byB0aGUgJHJvb3RTY29wZVxuLy8gICAgIC8vIGZvciBpbXBvcnRhbnQgZXZlbnRzIGFib3V0IGF1dGhlbnRpY2F0aW9uIGZsb3cuXG4vLyAgICAgYXBwLmNvbnN0YW50KCdBVVRIX0VWRU5UUycsIHtcbi8vICAgICAgICAgbG9naW5TdWNjZXNzOiAnYXV0aC1sb2dpbi1zdWNjZXNzJyxcbi8vICAgICAgICAgbG9naW5GYWlsZWQ6ICdhdXRoLWxvZ2luLWZhaWxlZCcsXG4vLyAgICAgICAgIGxvZ291dFN1Y2Nlc3M6ICdhdXRoLWxvZ291dC1zdWNjZXNzJyxcbi8vICAgICAgICAgc2Vzc2lvblRpbWVvdXQ6ICdhdXRoLXNlc3Npb24tdGltZW91dCcsXG4vLyAgICAgICAgIG5vdEF1dGhlbnRpY2F0ZWQ6ICdhdXRoLW5vdC1hdXRoZW50aWNhdGVkJyxcbi8vICAgICAgICAgbm90QXV0aG9yaXplZDogJ2F1dGgtbm90LWF1dGhvcml6ZWQnXG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuZmFjdG9yeSgnQXV0aEludGVyY2VwdG9yJywgZnVuY3Rpb24gKCRyb290U2NvcGUsICRxLCBBVVRIX0VWRU5UUykge1xuLy8gICAgICAgICB2YXIgc3RhdHVzRGljdCA9IHtcbi8vICAgICAgICAgICAgIDQwMTogQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCxcbi8vICAgICAgICAgICAgIDQwMzogQVVUSF9FVkVOVFMubm90QXV0aG9yaXplZCxcbi8vICAgICAgICAgICAgIDQxOTogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsXG4vLyAgICAgICAgICAgICA0NDA6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0XG4vLyAgICAgICAgIH07XG4vLyAgICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgICAgICByZXNwb25zZUVycm9yOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3Qoc3RhdHVzRGljdFtyZXNwb25zZS5zdGF0dXNdLCByZXNwb25zZSk7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXNwb25zZSlcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfTtcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5jb25maWcoZnVuY3Rpb24gKCRodHRwUHJvdmlkZXIpIHtcbi8vICAgICAgICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaChbXG4vLyAgICAgICAgICAgICAnJGluamVjdG9yJyxcbi8vICAgICAgICAgICAgIGZ1bmN0aW9uICgkaW5qZWN0b3IpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJGluamVjdG9yLmdldCgnQXV0aEludGVyY2VwdG9yJyk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIF0pO1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLnNlcnZpY2UoJ0F1dGhTZXJ2aWNlJywgZnVuY3Rpb24gKCRodHRwLCBTZXNzaW9uLCAkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUywgJHEpIHtcblxuLy8gICAgICAgICBmdW5jdGlvbiBvblN1Y2Nlc3NmdWxMb2dpbihyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgdmFyIHVzZXIgPSByZXNwb25zZS5kYXRhLnVzZXI7XG4vLyAgICAgICAgICAgICBTZXNzaW9uLmNyZWF0ZSh1c2VyKTtcbi8vICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dpblN1Y2Nlc3MpO1xuLy8gICAgICAgICAgICAgcmV0dXJuIHVzZXI7XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICAvLyBVc2VzIHRoZSBzZXNzaW9uIGZhY3RvcnkgdG8gc2VlIGlmIGFuXG4vLyAgICAgICAgIC8vIGF1dGhlbnRpY2F0ZWQgdXNlciBpcyBjdXJyZW50bHkgcmVnaXN0ZXJlZC5cbi8vICAgICAgICAgdGhpcy5pc0F1dGhlbnRpY2F0ZWQgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gISFTZXNzaW9uLnVzZXI7XG4vLyAgICAgICAgIH07XG5cbiAgICAgICAgXG4vLyAgICAgICAgIHRoaXMuaXNBZG1pbiA9IGZ1bmN0aW9uKHVzZXJJZCl7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZygncnVubmluZyBhZG1pbiBmdW5jJylcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJylcbi8vICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEudXNlci5pc0FkbWluKVxuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgdGhpcy5nZXRMb2dnZWRJblVzZXIgPSBmdW5jdGlvbiAoZnJvbVNlcnZlcikge1xuXG4vLyAgICAgICAgICAgICAvLyBJZiBhbiBhdXRoZW50aWNhdGVkIHNlc3Npb24gZXhpc3RzLCB3ZVxuLy8gICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSB1c2VyIGF0dGFjaGVkIHRvIHRoYXQgc2Vzc2lvblxuLy8gICAgICAgICAgICAgLy8gd2l0aCBhIHByb21pc2UuIFRoaXMgZW5zdXJlcyB0aGF0IHdlIGNhblxuLy8gICAgICAgICAgICAgLy8gYWx3YXlzIGludGVyZmFjZSB3aXRoIHRoaXMgbWV0aG9kIGFzeW5jaHJvbm91c2x5LlxuXG4vLyAgICAgICAgICAgICAvLyBPcHRpb25hbGx5LCBpZiB0cnVlIGlzIGdpdmVuIGFzIHRoZSBmcm9tU2VydmVyIHBhcmFtZXRlcixcbi8vICAgICAgICAgICAgIC8vIHRoZW4gdGhpcyBjYWNoZWQgdmFsdWUgd2lsbCBub3QgYmUgdXNlZC5cblxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuaXNBdXRoZW50aWNhdGVkKCkgJiYgZnJvbVNlcnZlciAhPT0gdHJ1ZSkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKFNlc3Npb24udXNlcik7XG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIC8vIE1ha2UgcmVxdWVzdCBHRVQgL3Nlc3Npb24uXG4vLyAgICAgICAgICAgICAvLyBJZiBpdCByZXR1cm5zIGEgdXNlciwgY2FsbCBvblN1Y2Nlc3NmdWxMb2dpbiB3aXRoIHRoZSByZXNwb25zZS5cbi8vICAgICAgICAgICAgIC8vIElmIGl0IHJldHVybnMgYSA0MDEgcmVzcG9uc2UsIHdlIGNhdGNoIGl0IGFuZCBpbnN0ZWFkIHJlc29sdmUgdG8gbnVsbC5cbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJykudGhlbihvblN1Y2Nlc3NmdWxMb2dpbikuY2F0Y2goZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuLy8gICAgICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmxvZ2luID0gZnVuY3Rpb24gKGNyZWRlbnRpYWxzKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2xvZ2luJywgY3JlZGVudGlhbHMpXG4vLyAgICAgICAgICAgICAgICAgLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pXG4vLyAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCh7IG1lc3NhZ2U6ICdJbnZhbGlkIGxvZ2luIGNyZWRlbnRpYWxzLid9KTtcbi8vICAgICAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLnNpZ251cCA9IGZ1bmN0aW9uKGNyZWRlbnRpYWxzKXtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4vLyAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4vLyAgICAgICAgICAgICAgICAgdXJsOiAnL3NpZ251cCcsXG4vLyAgICAgICAgICAgICAgICAgZGF0YTogY3JlZGVudGlhbHNcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4gcmVzdWx0LmRhdGEpXG4vLyAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oKXtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHttZXNzYWdlOiAnVGhhdCBlbWFpbCBpcyBhbHJlYWR5IGJlaW5nIHVzZWQuJ30pO1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmxvZ291dCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9sb2dvdXQnKS50aGVuKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICBTZXNzaW9uLmRlc3Ryb3koKTtcbi8vICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoQVVUSF9FVkVOVFMubG9nb3V0U3VjY2Vzcyk7XG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfTtcblxuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLnNlcnZpY2UoJ1Nlc3Npb24nLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMpIHtcblxuLy8gICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbi8vICAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCwgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgc2VsZi5kZXN0cm95KCk7XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgICRyb290U2NvcGUuJG9uKEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0LCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICBzZWxmLmRlc3Ryb3koKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcblxuLy8gICAgICAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uICh1c2VyKSB7XG4vLyAgICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICB9KTtcblxuLy8gfSgpKTtcbiIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lJywge1xuICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2hvbWUvaG9tZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgZ2FtZXM6IChHYW1lRmFjdG9yeSkgPT4gR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVVzZXJJZCgpLFxuICAgICAgICAgICAgb3BlbkdhbWVzOiAoR2FtZUZhY3RvcnkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZ2V0dGluZyB0aGUgZ2FtZXMnKVxuICAgICAgICAgICAgICAgIHJldHVybiBHYW1lRmFjdG9yeS5nZXRPcGVuR2FtZXMoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdIb21lQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCAkY29yZG92YU9hdXRoLCBVc2VyRmFjdG9yeSwgR2FtZUZhY3RvcnksICRsb2NhbFN0b3JhZ2UsICRpb25pY1BvcHVwLCBnYW1lcywgb3BlbkdhbWVzKSB7XG4gICAgJHNjb3BlLnN0YXJ0TmV3R2FtZSA9IEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZTtcbiAgICAkc2NvcGUuc3RvcmFnZSA9ICRsb2NhbFN0b3JhZ2U7XG4gICAgJHNjb3BlLmdhbWVzID0gZ2FtZXM7XG4gICAgLy8kc2NvcGUub3BlbkdhbWVzID0gb3BlbkdhbWVzO1xuXG4gICAgY29uc29sZS5sb2coXCJnYW1lc1wiLCBKU09OLnN0cmluZ2lmeSgkc2NvcGUuZ2FtZXMpKVxuICAgICRzY29wZS5nb1RvTmV3R2FtZSA9ICgpID0+IHtcbiAgICAgICAgJHN0YXRlLmdvKCduZXctZ2FtZS5tYWluJylcbiAgICB9XG5cbiAgICAkc2NvcGUub3BlbkdhbWVzID0gb3BlbkdhbWVzXG5cblxuICAgIC8vICRzY29wZS5qb2luR2FtZSA9IEdhbWVGYWN0b3J5LmpvaW5HYW1lQnlJZDtcblxuICAgIC8vICRzY29wZS5zaG93UG9wdXAgPSBmdW5jdGlvbihnYW1lSWQpIHtcblxuICAgIC8vICAgICAkc2NvcGUuZ2FtZSA9ICRzY29wZS5nYW1lc1tnYW1lSWRdO1xuICAgIC8vICAgICAkc2NvcGUuZ2FtZU5hbWUgPSAkc2NvcGUuZ2FtZS5zZXR0aW5ncy5uYW1lO1xuICAgIC8vICAgICAkc2NvcGUucGxheWVyQ291bnQgPSBPYmplY3Qua2V5cygkc2NvcGUuZ2FtZS5wbGF5ZXJzKS5sZW5ndGg7XG4gICAgLy8gICAgICRzY29wZS53YWl0aW5nRm9yUGxheWVycyA9ICAoJHNjb3BlLmdhbWUuc2V0dGluZ3MubWluUGxheWVycyB8fCA0KSAtICRzY29wZS5wbGF5ZXJDb3VudDtcblxuICAgIC8vICAgICAgY29uc3QgbXlQb3B1cCA9ICRpb25pY1BvcHVwLnNob3coe1xuICAgIC8vICAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9ob21lL3BvcHVwLmh0bWwnLFxuICAgIC8vICAgICAgICAgdGl0bGU6ICdKb2luICcgKyAkc2NvcGUuZ2FtZU5hbWUsXG4gICAgLy8gICAgICAgICBzY29wZTogJHNjb3BlLFxuICAgIC8vICAgICAgICAgYnV0dG9uczogXG4gICAgLy8gICAgICAgICBbXG4gICAgLy8gICAgICAgICAgICAge3RleHQ6ICdHbyBiYWNrJ30sXG4gICAgLy8gICAgICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgICAgICB0ZXh0OiAnSm9pbiBnYW1lJyxcbiAgICAvLyAgICAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbi1iYWxhbmNlZCcsXG4gICAgLy8gICAgICAgICAgICAgICAgIG9uVGFwOiBlID0+IHtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICRzY29wZS5qb2luR2FtZShnYW1lSWQpO1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdnYW1lLmFjdGl2ZS1nYW1lJywgeyBnYW1lSWQ6IGdhbWVJZCB9KVxuICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgXVxuICAgIC8vICAgICB9KVxuICAgIC8vIH1cbn0pXG5cbiIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnL2dhbWUvOmdhbWVJZCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvZ2FtZS9nYW1lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnR2FtZUN0cmwnLFxuICAgICAgICAvLyByZXNvbHZlOiB7XG4gICAgICAgIC8vICAgICBnYW1lIDogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldEdhbWVCeUdhbWVJZCgkc3RhdGVQYXJhbXMuZ2FtZUlkKVxuICAgICAgICAvLyB9XG4gICAgfSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdHYW1lQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMsICRsb2NhbFN0b3JhZ2UsIEFjdGl2ZUdhbWVGYWN0b3J5KSA9PiB7XG4gICAgLy8gY29uc3QgZ2FtZUlkID0gJHN0YXRlUGFyYW1zLmdhbWVJZDtcbiAgICAkc2NvcGUuZ2FtZUlkID0gMTI7XG4gICAgY29uc3QgcGxheWVySWQgPSAkbG9jYWxTdG9yYWdlLnVzZXIuaWQ7XG4gICAgY29uc3QgdGVhbUlkID0gMjtcbiAgICAvLyBjb25zdCB0ZWFtSWQgPSAkbG9jYWxTdG9yYWdlLnRlYW0uaWRcbiAgICBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8keyRzY29wZS5nYW1lSWR9L2ApO1xuXG4gICAgZ2FtZVJlZi5vbigndmFsdWUnLCBnYW1lU25hcHNob3QgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lU25hcHNob3QudmFsKCkpXG4gICAgICAgICRzY29wZS5nYW1lID0gZ2FtZVNuYXBzaG90LnZhbCgpO1xuICAgICAgICAkc2NvcGUuZ2FtZU5hbWUgPSAkc2NvcGUuZ2FtZS5zZXR0aW5ncy5uYW1lO1xuICAgICAgICBpZiAoJHNjb3BlLmdhbWUucGxheWVyc1twbGF5ZXJJZF0uaGFuZCl7XG4gICAgICAgICAgICAkc2NvcGUucGxheWVySGFuZCA9ICRzY29wZS5nYW1lLnBsYXllcnNbcGxheWVySWRdLmhhbmQ7XG4gICAgICAgICAgICAkc2NvcGUucGxheWVySGFuZENvdW50ID0gT2JqZWN0LmtleXMoJHNjb3BlLnBsYXllckhhbmQpLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICAkc2NvcGUuYmxhY2tDYXJkID0gJHNjb3BlLmdhbWUuY3VycmVudEJsYWNrQ2FyZC50ZXh0XG4gICAgICAgICRzY29wZS5qdWRnZSA9ICRzY29wZS5nYW1lLmN1cnJlbnRKdWRnZTtcbiAgICAgICAgJHNjb3BlLnBsYXllcnMgPSAkc2NvcGUuZ2FtZS5wbGF5ZXJzO1xuICAgICAgICAkc2NvcGUuc3VibWl0dGVkV2hpdGVDYXJkcyA9ICRzY29wZS5nYW1lLnN1Ym1pdHRlZFdoaXRlQ2FyZHNcbiAgICAgICAgJHNjb3BlLiRldmFsQXN5bmMoKTtcbiAgICAgICAgaWYoJHNjb3BlLmdhbWUud2lubmluZ0NhcmQpe1xuICAgICAgICAgICAgJHNjb3BlLndpbm5pbmdDYXJkID0gJHNjb3BlLmdhbWUud2lubmluZ0NhcmRcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAkc2NvcGUuc2hvd0NhcmRzID0gZmFsc2U7XG4gICAgJHNjb3BlLnN1Ym1pdHRlZCA9IGZhbHNlO1xuXG4gICAgJHNjb3BlLm9uU3dpcGVEb3duID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWQoZ2FtZUlkKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgQWN0aXZlR2FtZUZhY3RvcnkucmVmaWxsTXlIYW5kKCRzY29wZS5nYW1lSWQsIHBsYXllcklkLCB0ZWFtSWQpXG4gICAgICAgICAgJHNjb3BlLnNob3dDYXJkcyA9IHRydWU7XG4gICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnBsYXllckhhbmQpXG4gICAgICAgICAgJHNjb3BlLiRldmFsQXN5bmMoKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAkc2NvcGUub25Eb3VibGVUYXAgPSAoY2FyZElkLCBjYXJkVGV4dCkgPT4ge1xuICAgICAgICBBY3RpdmVHYW1lRmFjdG9yeS5zdWJtaXRXaGl0ZUNhcmQocGxheWVySWQsIGNhcmRJZCwgJHNjb3BlLmdhbWVJZCwgdGVhbUlkLCBjYXJkVGV4dClcbiAgICAgICAgJHNjb3BlLmdldFN1Ym1pdHRlZFBsYXllcnMoKTtcbiAgICAgICAgJHNjb3BlLnN1Ym1pdHRlZCA9IHRydWU7XG4gICAgICAgICRzY29wZS4kZXZhbEFzeW5jKCk7XG4gICAgfVxuXG4gICAgJHNjb3BlLmp1ZGdlRG91YmxlVGFwID0gKGNhcmRJZCkgPT4ge1xuICAgICAgICAvLyBpZiAocGxheWVySWQgPT09IGp1ZGdlKSB7XG4gICAgICAgICAgICBBY3RpdmVHYW1lRmFjdG9yeS5waWNrV2lubmluZ1doaXRlQ2FyZChjYXJkSWQsICRzY29wZS5nYW1lSWQsIHRlYW1JZClcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwianVkZ2luZ1wiKVxuICAgICAgICAvLyB9XG4gICAgfVxuXG5cbiAgICAvLyAkc2NvcGUuZ2V0U3VibWl0dGVkUGxheWVycyA9ICgpID0+IHtcbiAgICAvLyAgICAgJHNjb3BlLnBsYXllcnNUb1N1Ym1pdCA9ICBfLmtleUJ5KCRzY29wZS5zdWJtaXR0ZWRXaGl0ZUNhcmRzLCBjYXJkID0+IHtcbiAgICAvLyAgICAgICAgIHJldHVybiBjYXJkLnN1Ym1pdHRlZEJ5O1xuICAgIC8vICAgICB9KVxuICAgIC8vIH1cblxufSlcblxuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2xvZ2luJywge1xuICAgICAgICB1cmw6ICcvbG9naW4nLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2xvZ2luL2xvZ2luLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnTG9naW5DdHJsJ1xuICAgIH0pXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2xvZ2luJyk7XG59KVxuXG5hcHAuY29udHJvbGxlcignTG9naW5DdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUsIFVzZXJGYWN0b3J5LCAkY29yZG92YU9hdXRoLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCwgJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZSkge1xuICAgICRzY29wZS5sb2dpbldpdGhTbGFjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gVXNlckZhY3RvcnkuZ2V0U2xhY2tDcmVkcygpXG4gICAgICAgICAgICAudGhlbihjcmVkcyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRjb3Jkb3ZhT2F1dGguc2xhY2soY3JlZHMuY2xpZW50SUQsIGNyZWRzLmNsaWVudFNlY3JldCwgWydpZGVudGl0eS5iYXNpYycsICdpZGVudGl0eS50ZWFtJywgJ2lkZW50aXR5LmF2YXRhciddKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGluZm8gPT4gVXNlckZhY3Rvcnkuc2V0VXNlcihpbmZvKSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+ICRzdGF0ZS5nbygnaG9tZScpKVxuICAgIH1cblxuICAgICRpb25pY1NpZGVNZW51RGVsZWdhdGUuY2FuRHJhZ0NvbnRlbnQoZmFsc2UpO1xuXG4gICAgJHNjb3BlLiRvbignJGlvbmljVmlldy5sZWF2ZScsIGZ1bmN0aW9uKCkgeyAkaW9uaWNTaWRlTWVudURlbGVnYXRlLmNhbkRyYWdDb250ZW50KHRydWUpIH0pO1xuXG4gICAgJHNjb3BlLnN0b3JhZ2UgPSAkbG9jYWxTdG9yYWdlXG5cbiAgICBmdW5jdGlvbiByZWRpcmVjdFVzZXIoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic2NvcGUgc3RvcmFnZSB1c2VyXCIsICRzY29wZS5zdG9yYWdlLnVzZXIpXG4gICAgICAgIGlmICgkc2NvcGUuc3RvcmFnZS51c2VyKSAkc3RhdGUuZ28oJ2hvbWUnKVxuICAgIH1cblxuICAgIHJlZGlyZWN0VXNlcigpO1xufSlcblxuIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikgPT4ge1xuXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ25ldy1nYW1lJywge1xuICAgICAgICB1cmw6ICcvbmV3LWdhbWUnLFxuICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9tYWluLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnTmV3R2FtZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICB0ZWFtRGVja3M6IChHYW1lRmFjdG9yeSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdOYXZpZ2F0aW5nIHRvIHN0YXRlIG9yIHRyeWluZyB0byBoZWxsbycpXG4gICAgICAgICAgICAgICAgcmV0dXJuIEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0YW5kYXJkRGVjazogKEdhbWVGYWN0b3J5KSA9PiBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkKDEpXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5tYWluJywge1xuICAgICAgICB1cmw6ICcvc2V0dXAtZ2FtZScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvbmV3LWdhbWUuaHRtbCcsXG4gICAgfSlcblxuICAgIC5zdGF0ZSgnbmV3LWdhbWUuYWRkLWRlY2tzJywge1xuICAgICAgICB1cmw6ICcvYWRkLWRlY2tzJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9hZGQtZGVja3MuaHRtbCcsXG4gICAgfSlcblxuICAgIC5zdGF0ZSgnbmV3LWdhbWUuZGVjaycsIHtcbiAgICAgICAgdXJsOiAnL2RlY2svOmRlY2tJZCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvZGVjay5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0RlY2tDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgY2FyZHM6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXRDYXJkc0J5RGVja0lkKCRzdGF0ZVBhcmFtcy5kZWNrSWQpXG4gICAgICAgIH1cblxuXG4gICAgfSlcblxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9uZXctZ2FtZS9zZXR1cC1nYW1lJyk7XG59KVxuXG5hcHAuY29udHJvbGxlcignTmV3R2FtZUN0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgJHN0YXRlLCB0ZWFtRGVja3MsIHN0YW5kYXJkRGVjaykgPT4ge1xuICAgICRzY29wZS5jdXJyZW50VmlldyA9ICdhZGREZWNrcydcbiAgICAkc2NvcGUuZ2FtZUNvbmZpZyA9IHt9O1xuICAgICRzY29wZS5nYW1lQ29uZmlnLmRlY2tzID0ge307XG4gICAgJHNjb3BlLmdvVG9EZWNrcyA9ICgpID0+IHtcbiAgICAgICAgJHN0YXRlLmdvKCduZXctZ2FtZS5hZGQtZGVja3MnLCB7fSwgeyBsb2NhdGlvbjogdHJ1ZSwgcmVsb2FkOiB0cnVlIH0pXG4gICAgfVxuXG5cblxuICAgICRzY29wZS5kZWNrcyA9IHN0YW5kYXJkRGVjay5jb25jYXQodGVhbURlY2tzKTtcblxuICAgICRzY29wZS5zdGFydE5ld0dhbWUgPSAoZ2FtZUNvbmZpZykgPT4ge1xuICAgICAgICByZXR1cm4gR2FtZUZhY3Rvcnkuc3RhcnROZXdHYW1lKGdhbWVDb25maWcpXG4gICAgICAgICAgICAudGhlbigoaWQpID0+IEdhbWVGYWN0b3J5LmFkZFBpbGVUb0dhbWUoaWQsICRzY29wZS5nYW1lQ29uZmlnLmRlY2tzKSlcbiAgICAgICAgICAgIC50aGVuKChpZCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdpbSBoZXJlJyk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnIyMjR0FNRSBSVUxFUycsICRzY29wZS5nYW1lUnVsZXMpXG4gICAgICAgICAgICAgICAgLy8kc2NvcGUuZ2FtZVJ1bGVzLiRzZXRQcmlzdGluZSgpO1xuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnZ2FtZScsIHsgZ2FtZUlkOiBpZCB9KVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgICRzY29wZS5hZGREZWNrc1RvR2FtZSA9IEdhbWVGYWN0b3J5LmFkZERlY2tzO1xuICAgIC8vICRzY29wZS4kb24oJ2NoYW5nZWRHYW1lJywgKGV2ZW50LCBkYXRhKSA9PiB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdyZWNlaXZlZCBldmVudCcpXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdkYXRhIG9iajonLCBkYXRhKVxuICAgIC8vICAgICAkc2NvcGUuZ2FtZSA9IGRhdGE7XG4gICAgLy8gICAgICRzY29wZS4kZGlnZXN0KClcblxuICAgIC8vIH0pXG5cblxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0RlY2tDdHJsJywgKCRzY29wZSwgR2FtZUZhY3RvcnksICRzdGF0ZSwgY2FyZHMpID0+IHtcbiAgICAkc2NvcGUuY2FyZHMgPSBjYXJkc1xufSlcblxuIiwiYXBwLmZhY3RvcnkoJ0FjdGl2ZUdhbWVGYWN0b3J5JywgKCRodHRwLCAkcm9vdFNjb3BlLCAkbG9jYWxTdG9yYWdlKSA9PiB7XG5cbiAgICBjb25zdCBBY3RpdmVHYW1lRmFjdG9yeSA9IHt9O1xuXG4gICAgY29uc3QgcmVmaWxsZXIgPSAoY2FyZHNOZWVkZWQsIHBpbGVSZWYsIGhhbmRSZWYpID0+IHtcbiAgICAgICAgcmV0dXJuIHBpbGVSZWYubGltaXRUb0ZpcnN0KGNhcmRzTmVlZGVkKS5vbmNlKCd2YWx1ZScsIGNhcmRzU25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgIGNhcmRzU25hcHNob3QuZm9yRWFjaChjYXJkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVwZGF0ZU9iaiA9IHt9XG4gICAgICAgICAgICAgICAgICAgIGNhcmQucmVmLnRyYW5zYWN0aW9uKGNhcmREYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVPYmpbY2FyZC5rZXldID0gY2FyZERhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IGhhbmRSZWYudXBkYXRlKHVwZGF0ZU9iaikpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgfVxuXG4gICAgQWN0aXZlR2FtZUZhY3RvcnkucmVmaWxsTXlIYW5kID0gKGdhbWVJZCwgcGxheWVySWQsIHRlYW1JZCkgPT4ge1xuICAgICAgICAvLyBob3cgbWFueSBjYXJkcyBkbyBJIG5lZWQ/XG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVmaWxsaW5nIGhhbmRcIilcbiAgICAgICAgbGV0IGNhcmRzTmVlZGVkID0gMFxuICAgICAgICBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICBjb25zdCBoYW5kUmVmID0gZ2FtZVJlZi5jaGlsZChgcGxheWVycy8ke3BsYXllcklkfS9oYW5kYClcbiAgICAgICAgY29uc3QgcGlsZVJlZiA9IGdhbWVSZWYuY2hpbGQoJ3BpbGUvd2hpdGVjYXJkcycpXG4gICAgICAgIGhhbmRSZWYub25jZSgndmFsdWUnLCBoYW5kU25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgIGNhcmRzTmVlZGVkID0gNyAtIGhhbmRTbmFwc2hvdC5udW1DaGlsZHJlbigpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlZmlsbGVyKGNhcmRzTmVlZGVkLCBwaWxlUmVmLCBoYW5kUmVmKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibWFkZSBpdCB0byByZWZpbGxlclwiKVxuICAgICAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBmaXJlYmFzZU1vdmVTaW5nbGVLZXlWYWx1ZSA9IChvbGRSZWYsIG5ld1JlZikgPT4ge1xuICAgICAgICBsZXQgcmVtb3ZlVXBkYXRlID0ge31cbiAgICAgICAgbGV0IG5ld1VwZGF0ZSA9IHt9XG4gICAgICAgIHJldHVybiBvbGRSZWYub25jZSgndmFsdWUnKVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICAgICAgLnRoZW4oc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgIHJlbW92ZVVwZGF0ZVtzbmFwc2hvdC5rZXldID0gbnVsbFxuICAgICAgICAgICAgICAgIG5ld1VwZGF0ZVtzbmFwc2hvdC5rZXldID0gc25hcHNob3QudmFsKClcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3UmVmLnVwZGF0ZShuZXdVcGRhdGUpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gb2xkUmVmLnBhcmVudC51cGRhdGUocmVtb3ZlVXBkYXRlKSlcbiAgICB9XG5cblxuICAgIEFjdGl2ZUdhbWVGYWN0b3J5LnN1Ym1pdFdoaXRlQ2FyZCA9IChwbGF5ZXJJZCwgY2FyZElkLCBnYW1lSWQsIHRlYW1JZCwgY2FyZFRleHQpID0+IHtcbiAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YCk7XG4gICAgICAgIGNvbnN0IGNhcmRUb1N1Ym1pdCA9IGdhbWVSZWYuY2hpbGQoYHBsYXllcnMvJHtwbGF5ZXJJZH0vaGFuZC8ke2NhcmRJZH1gKTtcbiAgICAgICAgY29uc3Qgc3VibWl0UmVmID0gZ2FtZVJlZi5jaGlsZCgnc3VibWl0dGVkV2hpdGVDYXJkcycpO1xuICAgICAgICBmaXJlYmFzZU1vdmVTaW5nbGVLZXlWYWx1ZShjYXJkVG9TdWJtaXQsIHN1Ym1pdFJlZilcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBzdWJtaXRSZWYuY2hpbGQoY2FyZElkKS5zZXQoe1xuICAgICAgICAgICAgICAgICAgICBzdWJtaXR0ZWRCeTogcGxheWVySWQsXG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IGNhcmRUZXh0XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG5cbiAgICAvL25pa2l0YSdzIHVwZGF0ZWQgdmVyc2lvblxuICAgIC8vIEFjdGl2ZUdhbWVGYWN0b3J5LnN1Ym1pdFdoaXRlQ2FyZCA9IChwbGF5ZXJJZCwgY2FyZElkLCBnYW1lSWQsIHRlYW1JZCwgY2FyZFRleHQpID0+IHtcbiAgICAvLyAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApO1xuICAgIC8vICAgY29uc3QgY2FyZFRvU3VibWl0ID0gZ2FtZVJlZi5jaGlsZChgcGxheWVycy8ke3BsYXllcklkfS9oYW5kLyR7Y2FyZElkfS90ZXh0YCk7XG4gICAgLy8gICBjb25zdCBzdWJtaXRSZWYgPSBnYW1lUmVmLmNoaWxkKCdzdWJtaXR0ZWRXaGl0ZUNhcmRzJyk7XG4gICAgLy8gICBsZXQgdGV4dCA9ICcnXG4gICAgLy8gICByZXR1cm4gY2FyZFRvU3VibWl0LnRyYW5zYWN0aW9uKGNhcmRUZXh0ID0+IHtcbiAgICAvLyAgICAgICB0ZXh0ID0gY2FyZFRleHRcbiAgICAvLyAgICAgICByZXR1cm4gbnVsbFxuICAgIC8vICAgICB9KVxuICAgIC8vICAgICAudGhlbigoKSA9PiB7XG4gICAgLy8gICAgICAgbGV0IHVwZGF0ZU9iaiA9IHt9O1xuICAgIC8vICAgICAgIHVwZGF0ZU9ialtwbGF5ZXJJZF0udGV4dCA9IHRleHQ7XG4gICAgLy8gICAgICAgdXBkYXRlT2JqW3BsYXllcklkXS5jYXJkSWQgPSBjYXJkSWRcbiAgICAvLyAgICAgICByZXR1cm4gc3VibWl0UmVmLnVwZGF0ZSh1cGRhdGVPYmopXG4gICAgLy8gICAgIH0pXG4gICAgLy8gICAgIC50aGVuKCgpID0+IGNvbnNvbGUubG9nKCdzdWJtaXNzaW9uIHN1Y2Nlc3MnKSlcbiAgICAvLyAgICAgLmNhdGNoKChlcnIpID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgLy8gfVxuXG5cblxuICAgIEFjdGl2ZUdhbWVGYWN0b3J5LnBpY2tXaW5uaW5nV2hpdGVDYXJkID0gKGNhcmRJZCwgZ2FtZUlkLCB0ZWFtSWQpID0+IHtcbiAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YCk7XG4gICAgICAgIGxldCB3aW5uZXIgPSBnYW1lUmVmLmNoaWxkKGBzdWJtaXR0ZWRXaGl0ZUNhcmRzLyR7Y2FyZElkfS9zdWJtaXR0ZWRCeWApXG4gICAgICAgIGNvbnN0IHdpbm5pbmdDYXJkID0gZ2FtZVJlZi5jaGlsZChgc3VibWl0dGVkV2hpdGVDYXJkcy8ke2NhcmRJZH1gKVxuICAgICAgICBjb25zb2xlLmxvZygnV0lOTklORyBDQVJEJywgd2lubmluZ0NhcmQpXG4gICAgICAgIGxldCBibGFja0NhcmRJZCA9ICcnO1xuICAgICAgICBsZXQgYmxhY2tDYXJkV29uID0ge31cbiAgICAgICAgd2lubmVyLm9uY2UoJ3ZhbHVlJylcbiAgICAgICAgICAgIC50aGVuKHdpbm5lcklkID0+IHtcbiAgICAgICAgICAgICAgICB3aW5uZXIgPSB3aW5uZXJJZC52YWwoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2V0Um91bmRTdGF0ZVRvT3ZlciA9IGdhbWVSZWYuY2hpbGQoJ3N0YXRlJykuc2V0KCdwb3N0cm91bmQnKVxuICAgICAgICAgICAgICAgIGNvbnN0IGF3YXJkQmxhY2tDYXJkID0gZ2FtZVJlZi5jaGlsZCgnY3VycmVudEJsYWNrQ2FyZCcpLnRyYW5zYWN0aW9uKChjdXJyZW50QmxhY2tDYXJkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBibGFja0NhcmRXb24gPSBjdXJyZW50QmxhY2tDYXJkO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIjIyMjQkxBQ0sgQ0FSRCBXT05cIiwgYmxhY2tDYXJkV29uKVxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZVJlZi5jaGlsZChgcGxheWVycy8ke3dpbm5lcn0vYmxhY2tDYXJkc1dvbmApLnVwZGF0ZShibGFja0NhcmRXb24pXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2lubmluZ0NhcmQub25jZSgndmFsdWUnKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbih3aW5uaW5nQ2FyZFNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTTkFQU0hPVCcsIHdpbm5pbmdDYXJkU25hcHNob3QudmFsKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lubmluZ0NhcmRTbmFwc2hvdCA9IHdpbm5pbmdDYXJkU25hcHNob3QudmFsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2FtZVJlZi5jaGlsZChgd2lubmluZ0NhcmRgKS5zZXQod2lubmluZ0NhcmRTbmFwc2hvdClcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gZ2FtZVJlZi5jaGlsZCgnc3VibWl0dGVkV2hpdGVDYXJkcycpLnJlbW92ZSgpKVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbc2V0Um91bmRTdGF0ZVRvT3ZlciwgYXdhcmRCbGFja0NhcmRdKVxuICAgICAgICAgICAgfSlcbiAgICB9XG59KTsiLCJhcHAuZmFjdG9yeSgnR2FtZUZhY3RvcnknLCAoJGh0dHAsICRyb290U2NvcGUsICRsb2NhbFN0b3JhZ2UpID0+IHtcblxuICAgICAgICBjb25zdCBvdXJJcHMgPSB7XG4gICAgICAgICAgICBuaWtpdGE6IFwiMTkyLjE2OC40LjIxM1wiLFxuICAgICAgICAgICAga2F5bGE6IFwiMTkyLjE2OC40LjIyNVwiLFxuICAgICAgICAgICAgbml0aHlhOiBcIjE5Mi4xNjguMS40OFwiLFxuICAgICAgICAgICAgZGFuOiBcIjE5Mi4xNjguNC4yMzZcIlxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3VycmVudElwID0gb3VySXBzLmRhbjtcblxuICAgICAgICAvLyBzdGFydCBhIG5ldyBnYW1lIGRlcnBcbiAgICAgICAgY29uc3QgR2FtZUZhY3RvcnkgPSB7fTtcbiAgICAgICAgR2FtZUZhY3Rvcnkuc3RhcnROZXdHYW1lID0gKGdhbWVDb25maWcpID0+IHtcbiAgICAgICAgICAgIC8vY2FuIGFsc28gZ2V0IGFsbCB0aGUgZGVja3MgYnkgdGVhbSBoZXJlIHRvIHByZXBhcmVcbiAgICAgICAgICAgIGNvbnN0IHRlYW1JZCA9ICRsb2NhbFN0b3JhZ2UudGVhbS5pZCB8fCAyO1xuICAgICAgICAgICAgY29uc3QgY3JlYXRvcklkID0gJGxvY2FsU3RvcmFnZS51c2VyLmlkIHx8IDM7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lc2AsIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZ2FtZUNvbmZpZy5uYW1lIHx8ICdBV0VTT01FIE5hbWUnLFxuICAgICAgICAgICAgICAgICAgICB0ZWFtSWQ6IHRlYW1JZCxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvcklkOiBjcmVhdG9ySWQsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0b3JOYW1lOiAkbG9jYWxTdG9yYWdlLnVzZXIubmFtZSB8fCAnZGFuJywgLy9taWdodCBiZSB1bm5lY2Vzc2FyeSBpZiB3ZSBoYXZlIHRoZSB1c2VyIGlkXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiBnYW1lQ29uZmlnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBnYW1lSWQgPSByZXMuZGF0YVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYC90ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICAgICAgICAgICAgZ2FtZVJlZi5vbigndmFsdWUnLCBzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2NoYW5nZWRHYW1lJywgc25hcHNob3QudmFsKCkpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2FtZUlkO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG4gICAgICAgIC8vIGdldCBhbGwgb2YgYSBkZWNrcyBjYXJkcyB0byBkaXNwbGF5IHdoZW4gbG9va2luZyBhdCBkZWNrc1xuICAgICAgICBHYW1lRmFjdG9yeS5nZXRDYXJkc0J5RGVja0lkID0gKGlkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2RlY2tzLyR7aWR9L2NhcmRzYClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFRPRE86IGNvbWJpbmUgdGhpcyBpbnRvIHRoZSBhYm92ZSBzdGFydE5ld0dhbWUgZnVuY1xuICAgICAgICAvLyB0YWtlIGFsbCBvZiB0aGUgc2VsZWN0ZWQgZGVja3MnIGNhcmRzIGFuZCBwdXQgdGhlbSBpbiB0aGUgZmlyZWJhc2UgZ2FtZSBvYmplY3QgcGlsZSAodGhyb3VnaCByb3V0ZSlcbiAgICAgICAgR2FtZUZhY3RvcnkuYWRkUGlsZVRvR2FtZSA9IChnYW1lSWQsIGRlY2tzKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImFkZGluZyBwaWxlIHRvIGdhbWVcIilcbiAgICAgICAgICAgIGNvbnN0IGRlY2tzQXJyID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBkZWNrSWQgaW4gZGVja3MpIHtcbiAgICAgICAgICAgICAgICBkZWNrc0Fyci5wdXNoKGRlY2tJZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzLyR7Z2FtZUlkfS9kZWNrc2AsIHtcbiAgICAgICAgICAgICAgICAgICAgJ2RlY2tzJzogZGVja3NBcnJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IGdhbWVJZClcbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAkbG9jYWxTdG9yYWdlLnRlYW0uaWQ7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJJZCA9ICRsb2NhbFN0b3JhZ2UudXNlci5pZDtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllck5hbWUgPSAkbG9jYWxTdG9yYWdlLnVzZXIubmFtZTtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllclJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9L3BsYXllcnMvJHtwbGF5ZXJJZH1gKVxuICAgICAgICAgICAgcGxheWVyUmVmLnNldCh7XG4gICAgICAgICAgICAgICAgbmFtZTogcGxheWVyTmFtZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzLyR7Z2FtZUlkfS8/cGxheWVySWQ9JHtwbGF5ZXJJZH1gKVxuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQgPSAoaWQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRlYW1JZCA9ICh0eXBlb2YgaWQgIT09ICdudW1iZXInKSA/ICRsb2NhbFN0b3JhZ2UudGVhbS5pZCA6IGlkOyAvLyBpZCB8fCBsb2NhbHN0b3JhZ2UgZG9lc24ndCB3b3JrIGJlY2F1c2UgMCBpcyBmYWxzZXlcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZGVja3M/dGVhbT0ke3RlYW1JZH1gKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcblxuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldFVzZXJzQnlHYW1lSWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzLyR7Z2FtZUlkfS91c2Vyc2ApO1xuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVCeUdhbWVJZCA9IChnYW1lSWQsIHRlYW1JZCkgPT4ge1xuICAgICAgICAgICAgdGVhbUlkID0gdGVhbUlkIHx8ICRsb2NhbFN0b3JhZ2UudGVhbS5pZFxuICAgICAgICAgICAgY29uc3QgZ2FtZXNSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICByZXR1cm4gZ2FtZXNSZWYub25jZSgndmFsdWUnKS50aGVuKHNuYXBzaG90ID0+IHNuYXBzaG90LnZhbCgpKVxuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQgPSAodGVhbUlkKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIiMjI1RFQU0gSURcIiwgdGVhbUlkKVxuICAgICAgICAgICAgdGVhbUlkID0gdGVhbUlkIHx8ICRsb2NhbFN0b3JhZ2UudGVhbS5pZFxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZSB0ZWFtIGlkIGlzOicsIHRlYW1JZClcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZ2FtZXMvP3RlYW1JZD0ke3RlYW1JZH1gKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgICAgIH07XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVVzZXJJZCA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZ2FtZXMvP3VzZXJJZD0keyRsb2NhbFN0b3JhZ2UudXNlci5pZH1gKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpO1xuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldE9wZW5HYW1lcyA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRlYW1JZCA9ICRsb2NhbFN0b3JhZ2UudGVhbS5pZDtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJJZCA9ICRsb2NhbFN0b3JhZ2UudXNlci5pZDtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZ2FtZXMvP3RlYW1JZD0ke3RlYW1JZH0mdXNlcklkPSR7dXNlcklkfSZvcGVuPXRydWVgKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBHYW1lRmFjdG9yeTtcbiAgICB9XG5cbik7XG5cbiIsImFwcC5mYWN0b3J5KCdVc2VyRmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwLCAkbG9jYWxTdG9yYWdlKSB7XG4gICAgY29uc3Qgb3VySXBzID0ge1xuICAgICAgICBuaWtpdGE6IFwiMTkyLjE2OC40LjIxM1wiLFxuICAgICAgICBrYXlsYTogXCIxOTIuMTY4LjQuMjI1XCIsXG4gICAgICAgIG5pdGh5YTogXCIxOTIuMTY4LjEuNDhcIixcbiAgICAgICAgZGFuOiBcIjE5Mi4xNjguNC4yMzZcIlxuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRJcCA9IG91cklwcy5kYW5cblxuICAgIHJldHVybiB7XG4gICAgICAgIHNldFVzZXI6IGZ1bmN0aW9uKGluZm8pIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL3VzZXJzYCxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBpbmZvXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldExvY2FsU3RvcmFnZShyZXMuZGF0YS51c2VyWzBdLCByZXMuZGF0YS50ZWFtWzBdKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBnZXRTbGFja0NyZWRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvc2xhY2tgKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuZGF0YVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGdldFNsYWNrSW5mbzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdodHRwczovL3NsYWNrLmNvbS9hcGkvdXNlcnMuaWRlbnRpdHknKVxuICAgICAgICB9LFxuXG4gICAgICAgIHNldExvY2FsU3RvcmFnZTogZnVuY3Rpb24odXNlciwgdGVhbSkge1xuICAgICAgICAgICAgJGxvY2FsU3RvcmFnZS51c2VyID0gdXNlcjtcbiAgICAgICAgICAgICRsb2NhbFN0b3JhZ2UudGVhbSA9IHRlYW07XG4gICAgICAgIH0sXG5cbiAgICAgICAgbG9nT3V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRsb2NhbFN0b3JhZ2UuJHJlc2V0KCk7XG4gICAgICAgIH1cbiAgICB9XG59KVxuXG4iLCIvL0RpcmVjdGl2ZSBGaWxlIiwiYXBwLmRpcmVjdGl2ZSgnc3VibWl0dGVkQ2FyZHMnLCBmdW5jdGlvbigpe1xuXHRyZXR1cm4ge1xuXHRcdHJlc3RyaWN0OiAnRScsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9jb21tb24vZGlyZWN0aXZlcy9zdWJtaXR0ZWQtY2FyZHMuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0dhbWVDdHJsJ1xuXHR9XG59KSIsImFwcC5kaXJlY3RpdmUoJ3doaXRlQ2FyZHMnLCBmdW5jdGlvbigpe1xuXHRyZXR1cm4ge1xuXHRcdHJlc3RyaWN0OiAnRScsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9jb21tb24vZGlyZWN0aXZlcy93aGl0ZS1jYXJkcy5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnR2FtZUN0cmwnXG5cdH1cbn0pIiwiYXBwLmRpcmVjdGl2ZSgnd2lubmluZ0NhcmRzJywgZnVuY3Rpb24oKXtcblx0cmV0dXJuIHtcblx0XHRyZXN0cmljdDogJ0UnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvY29tbW9uL2RpcmVjdGl2ZXMvd2hpdGUtY2FyZHMuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0dhbWVDdHJsJ1xuXHR9XG59KSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
