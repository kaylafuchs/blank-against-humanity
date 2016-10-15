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
                blackCardWon = currentBlackCard.slice(0);
                return null;
            }).then(function () {
                console.log("####BLACK CARD WON", blackCardWon);
                gameRef.child('players/' + winner + '/blackCardsWon').set(blackCardWon);
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
            creatorName: $localStorage.user.name,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImNhcmRzLXRlc3QvY2FyZHNUZXN0LmpzIiwiZnJvbSBmc2cvZnJvbS1mc2cuanMiLCJkZWNrcy9kZWNrcy5qcyIsImdhbWUvZ2FtZS5qcyIsImhvbWUvaG9tZS5qcyIsImxvZ2luL2xvZ2luLmpzIiwibmV3LWdhbWUvbmV3LWdhbWUuanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiLCJjb21tb24vZGlyZWN0aXZlcy9zdWJtaXR0ZWQtY2FyZHMuanMiLCJjb21tb24vZGlyZWN0aXZlcy93aGl0ZS1jYXJkcy5qcyIsImNvbW1vbi9kaXJlY3RpdmVzL3dpbm5pbmctY2FyZC5qcyIsImNvbW1vbi9mYWN0b3JpZXMvQWN0aXZlR2FtZUZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yaWVzL0dhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy91c2VyRmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJhcHAiLCJhbmd1bGFyIiwibW9kdWxlIiwicnVuIiwiJGlvbmljUGxhdGZvcm0iLCJyZWFkeSIsImNvcmRvdmEiLCJwbHVnaW5zIiwiS2V5Ym9hcmQiLCJoaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIiLCJkaXNhYmxlU2Nyb2xsIiwiU3RhdHVzQmFyIiwic3R5bGVMaWdodENvbnRlbnQiLCIkcm9vdFNjb3BlIiwiJG9uIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJhcmd1bWVudHMiLCJjb250cm9sbGVyIiwiJHNjb3BlIiwiVXNlckZhY3RvcnkiLCIkc3RhdGUiLCIkbG9jYWxTdG9yYWdlIiwiJHRpbWVvdXQiLCJsb2dPdXQiLCJnbyIsImNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwic3RhdGUiLCJ1cmwiLCJ0ZW1wbGF0ZVVybCIsImdyZWV0aW5nIiwicmVzb2x2ZSIsImRlY2tzIiwiR2FtZUZhY3RvcnkiLCIkc3RhdGVQYXJhbXMiLCJnZXREZWNrc0J5VGVhbUlkIiwic3RhdGVQYXJhbXMiLCJ0ZWFtSWQiLCJBY3RpdmVHYW1lRmFjdG9yeSIsImdhbWVJZCIsInBsYXllcklkIiwidXNlciIsImlkIiwidGVhbSIsImdhbWVSZWYiLCJmaXJlYmFzZSIsImRhdGFiYXNlIiwicmVmIiwib24iLCJnYW1lIiwiZ2FtZVNuYXBzaG90IiwidmFsIiwiZ2FtZU5hbWUiLCJzZXR0aW5ncyIsIm5hbWUiLCJwbGF5ZXJzIiwiaGFuZCIsInBsYXllckhhbmQiLCJwbGF5ZXJIYW5kQ291bnQiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiYmxhY2tDYXJkIiwiY3VycmVudEJsYWNrQ2FyZCIsInRleHQiLCJqdWRnZSIsImN1cnJlbnRKdWRnZSIsInN1Ym1pdHRlZFdoaXRlQ2FyZHMiLCIkZXZhbEFzeW5jIiwid2lubmluZ0NhcmQiLCJzaG93Q2FyZHMiLCJzdWJtaXR0ZWQiLCJvblN3aXBlRG93biIsImpvaW5HYW1lQnlJZCIsInRoZW4iLCJyZWZpbGxNeUhhbmQiLCJvbkRvdWJsZVRhcCIsImNhcmRJZCIsImNhcmRUZXh0Iiwic3VibWl0V2hpdGVDYXJkIiwianVkZ2VEb3VibGVUYXAiLCJwaWNrV2lubmluZ1doaXRlQ2FyZCIsIiR1cmxSb3V0ZXJQcm92aWRlciIsImNhY2hlIiwiZ2FtZXMiLCJnZXRHYW1lc0J5VXNlcklkIiwib3BlbkdhbWVzIiwiZ2V0T3BlbkdhbWVzIiwiJGNvcmRvdmFPYXV0aCIsIiRpb25pY1BvcHVwIiwic3RhcnROZXdHYW1lIiwic3RvcmFnZSIsImdvVG9OZXdHYW1lIiwib3RoZXJ3aXNlIiwiJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZSIsImxvZ2luV2l0aFNsYWNrIiwiZ2V0U2xhY2tDcmVkcyIsInNsYWNrIiwiY3JlZHMiLCJjbGllbnRJRCIsImNsaWVudFNlY3JldCIsInNldFVzZXIiLCJpbmZvIiwiY2FuRHJhZ0NvbnRlbnQiLCJyZWRpcmVjdFVzZXIiLCJhYnN0cmFjdCIsInRlYW1EZWNrcyIsInN0YW5kYXJkRGVjayIsImNhcmRzIiwiZ2V0Q2FyZHNCeURlY2tJZCIsImRlY2tJZCIsImN1cnJlbnRWaWV3IiwiZ2FtZUNvbmZpZyIsImdvVG9EZWNrcyIsImxvY2F0aW9uIiwicmVsb2FkIiwiY29uY2F0IiwiYWRkUGlsZVRvR2FtZSIsImFkZERlY2tzVG9HYW1lIiwiYWRkRGVja3MiLCJkaXJlY3RpdmUiLCJyZXN0cmljdCIsImZhY3RvcnkiLCIkaHR0cCIsInJlZmlsbGVyIiwiY2FyZHNOZWVkZWQiLCJwaWxlUmVmIiwiaGFuZFJlZiIsImxpbWl0VG9GaXJzdCIsIm9uY2UiLCJjYXJkc1NuYXBzaG90IiwiZm9yRWFjaCIsInVwZGF0ZU9iaiIsImNhcmQiLCJ0cmFuc2FjdGlvbiIsImtleSIsImNhcmREYXRhIiwidXBkYXRlIiwiY2F0Y2giLCJlcnIiLCJjaGlsZCIsImhhbmRTbmFwc2hvdCIsIm51bUNoaWxkcmVuIiwiZmlyZWJhc2VNb3ZlU2luZ2xlS2V5VmFsdWUiLCJvbGRSZWYiLCJuZXdSZWYiLCJyZW1vdmVVcGRhdGUiLCJuZXdVcGRhdGUiLCJzbmFwc2hvdCIsInBhcmVudCIsImNhcmRUb1N1Ym1pdCIsInN1Ym1pdFJlZiIsInNldCIsInN1Ym1pdHRlZEJ5Iiwid2lubmVyIiwiYmxhY2tDYXJkSWQiLCJibGFja0NhcmRXb24iLCJ3aW5uZXJJZCIsInNldFJvdW5kU3RhdGVUb092ZXIiLCJhd2FyZEJsYWNrQ2FyZCIsInNsaWNlIiwid2lubmluZ0NhcmRTbmFwc2hvdCIsInJlbW92ZSIsIlByb21pc2UiLCJhbGwiLCJvdXJJcHMiLCJuaWtpdGEiLCJrYXlsYSIsIm5pdGh5YSIsImRhbiIsImN1cnJlbnRJcCIsImNyZWF0b3JJZCIsInBvc3QiLCJjcmVhdG9yTmFtZSIsInJlcyIsImRhdGEiLCIkYnJvYWRjYXN0IiwiZ2V0IiwiZGVja3NBcnIiLCJwdXNoIiwicGxheWVyTmFtZSIsInBsYXllclJlZiIsImdldFVzZXJzQnlHYW1lSWQiLCJnZXRHYW1lQnlHYW1lSWQiLCJnYW1lc1JlZiIsImdldEdhbWVzQnlUZWFtSWQiLCJ1c2VySWQiLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0TG9jYWxTdG9yYWdlIiwiZ2V0U2xhY2tJbmZvIiwiJHJlc2V0Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQUEsT0FBQUMsR0FBQSxHQUFBQyxRQUFBQyxNQUFBLENBQUEsc0JBQUEsRUFBQSxDQUFBLE9BQUEsRUFBQSxXQUFBLEVBQUEsV0FBQSxFQUFBLGdCQUFBLEVBQUEsV0FBQSxFQUFBLFdBQUEsQ0FBQSxDQUFBOztBQUdBRixJQUFBRyxHQUFBLENBQUEsVUFBQUMsY0FBQSxFQUFBO0FBQ0FBLG1CQUFBQyxLQUFBLENBQUEsWUFBQTtBQUNBLFlBQUFOLE9BQUFPLE9BQUEsSUFBQVAsT0FBQU8sT0FBQSxDQUFBQyxPQUFBLENBQUFDLFFBQUEsRUFBQTtBQUNBO0FBQ0E7QUFDQUYsb0JBQUFDLE9BQUEsQ0FBQUMsUUFBQSxDQUFBQyx3QkFBQSxDQUFBLElBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0FILG9CQUFBQyxPQUFBLENBQUFDLFFBQUEsQ0FBQUUsYUFBQSxDQUFBLElBQUE7QUFDQTtBQUNBLFlBQUFYLE9BQUFZLFNBQUEsRUFBQTtBQUNBQSxzQkFBQUMsaUJBQUE7QUFDQTtBQUNBLEtBZEE7QUFnQkEsQ0FqQkE7O0FBbUJBWixJQUFBRyxHQUFBLENBQUEsVUFBQVUsVUFBQSxFQUFBO0FBQ0FBLGVBQUFDLEdBQUEsQ0FBQSxtQkFBQSxFQUFBLFlBQUE7QUFDQUMsZ0JBQUFDLEdBQUEsQ0FBQUMsS0FBQUMsU0FBQSxDQUFBQyxVQUFBLENBQUEsQ0FBQSxDQUFBO0FBQ0EsS0FGQTtBQUdBLENBSkE7O0FDNUJBbkIsSUFBQW9CLFVBQUEsQ0FBQSxZQUFBLEVBQUEsVUFBQUMsTUFBQSxFQUFBQyxXQUFBLEVBQUFDLE1BQUEsRUFBQUMsYUFBQSxFQUFBQyxRQUFBLEVBQUE7QUFDQUosV0FBQUssTUFBQSxHQUFBLFlBQUE7QUFDQUosb0JBQUFJLE1BQUE7QUFDQUgsZUFBQUksRUFBQSxDQUFBLE9BQUE7QUFDQSxLQUhBO0FBSUEsQ0FMQTtBQ0FBM0IsSUFBQTRCLE1BQUEsQ0FBQSxVQUFBQyxjQUFBLEVBQUE7QUFDQUEsbUJBQUFDLEtBQUEsQ0FBQSxPQUFBLEVBQUE7QUFDQUMsYUFBQSxRQURBO0FBRUFDLHFCQUFBLCtCQUZBO0FBR0FaLG9CQUFBO0FBSEEsS0FBQTtBQUtBLENBTkE7O0FBUUFwQixJQUFBb0IsVUFBQSxDQUFBLGVBQUEsRUFBQSxVQUFBQyxNQUFBLEVBQUE7QUFDQUEsV0FBQVksUUFBQSxHQUFBLElBQUE7QUFDQSxDQUZBO0FDUkE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQ3BKQWpDLElBQUE0QixNQUFBLENBQUEsVUFBQUMsY0FBQSxFQUFBO0FBQ0FBLG1CQUFBQyxLQUFBLENBQUEsT0FBQSxFQUFBO0FBQ0FDLGFBQUEsZUFEQTtBQUVBQyxxQkFBQSxxQkFGQTtBQUdBWixvQkFBQSxVQUhBO0FBSUFjLGlCQUFBO0FBQ0FDLG1CQUFBLGVBQUFDLFdBQUEsRUFBQUMsWUFBQTtBQUFBLHVCQUFBRCxZQUFBRSxnQkFBQSxDQUFBQyxZQUFBQyxNQUFBLENBQUE7QUFBQTtBQURBO0FBSkEsS0FBQTtBQVNBLENBVkE7O0FBWUF4QyxJQUFBb0IsVUFBQSxDQUFBLFVBQUEsRUFBQSxVQUFBQyxNQUFBLEVBQUEsQ0FJQSxDQUpBO0FDWkFyQixJQUFBNEIsTUFBQSxDQUFBLFVBQUFDLGNBQUEsRUFBQTs7QUFFQUEsbUJBQUFDLEtBQUEsQ0FBQSxNQUFBLEVBQUE7QUFDQUMsYUFBQSxlQURBO0FBRUFDLHFCQUFBLG1CQUZBO0FBR0FaLG9CQUFBO0FBSEEsS0FBQTtBQVFBLENBVkE7O0FBWUFwQixJQUFBb0IsVUFBQSxDQUFBLFVBQUEsRUFBQSxVQUFBQyxNQUFBLEVBQUFlLFdBQUEsRUFBQUMsWUFBQSxFQUFBYixhQUFBLEVBQUFpQixpQkFBQSxFQUFBO0FBQ0FwQixXQUFBcUIsTUFBQSxHQUFBTCxhQUFBSyxNQUFBO0FBQ0E7QUFDQSxRQUFBQyxXQUFBbkIsY0FBQW9CLElBQUEsQ0FBQUMsRUFBQTtBQUNBO0FBQ0EsUUFBQUwsU0FBQWhCLGNBQUFzQixJQUFBLENBQUFELEVBQUE7QUFDQSxRQUFBRSxVQUFBQyxTQUFBQyxRQUFBLEdBQUFDLEdBQUEsWUFBQVYsTUFBQSxlQUFBbkIsT0FBQXFCLE1BQUEsT0FBQTs7QUFFQUssWUFBQUksRUFBQSxDQUFBLE9BQUEsRUFBQSx3QkFBQTtBQUNBO0FBQ0E5QixlQUFBK0IsSUFBQSxHQUFBQyxhQUFBQyxHQUFBLEVBQUE7QUFDQWpDLGVBQUFrQyxRQUFBLEdBQUFsQyxPQUFBK0IsSUFBQSxDQUFBSSxRQUFBLENBQUFDLElBQUE7QUFDQSxZQUFBcEMsT0FBQStCLElBQUEsQ0FBQU0sT0FBQSxDQUFBZixRQUFBLEVBQUFnQixJQUFBLEVBQUE7QUFDQXRDLG1CQUFBdUMsVUFBQSxHQUFBdkMsT0FBQStCLElBQUEsQ0FBQU0sT0FBQSxDQUFBZixRQUFBLEVBQUFnQixJQUFBO0FBQ0F0QyxtQkFBQXdDLGVBQUEsR0FBQUMsT0FBQUMsSUFBQSxDQUFBMUMsT0FBQXVDLFVBQUEsRUFBQUksTUFBQTtBQUNBO0FBQ0EzQyxlQUFBNEMsU0FBQSxHQUFBNUMsT0FBQStCLElBQUEsQ0FBQWMsZ0JBQUEsQ0FBQSxDQUFBLEVBQUFDLElBQUE7QUFDQTlDLGVBQUErQyxLQUFBLEdBQUEvQyxPQUFBK0IsSUFBQSxDQUFBaUIsWUFBQTtBQUNBaEQsZUFBQXFDLE9BQUEsR0FBQXJDLE9BQUErQixJQUFBLENBQUFNLE9BQUE7QUFDQXJDLGVBQUFpRCxtQkFBQSxHQUFBakQsT0FBQStCLElBQUEsQ0FBQWtCLG1CQUFBO0FBQ0FqRCxlQUFBa0QsVUFBQTtBQUNBLFlBQUFsRCxPQUFBK0IsSUFBQSxDQUFBb0IsV0FBQSxFQUFBO0FBQ0FuRCxtQkFBQW1ELFdBQUEsR0FBQW5ELE9BQUErQixJQUFBLENBQUFvQixXQUFBO0FBQ0E7QUFDQSxLQWhCQTs7QUFrQkFuRCxXQUFBb0QsU0FBQSxHQUFBLEtBQUE7QUFDQXBELFdBQUFxRCxTQUFBLEdBQUEsS0FBQTs7QUFFQXJELFdBQUFzRCxXQUFBLEdBQUEsVUFBQWpDLE1BQUEsRUFBQTtBQUNBTixvQkFBQXdDLFlBQUEsQ0FBQWxDLE1BQUEsRUFDQW1DLElBREEsQ0FDQSxZQUFBO0FBQ0FwQyw4QkFBQXFDLFlBQUEsQ0FBQXpELE9BQUFxQixNQUFBLEVBQUFDLFFBQUEsRUFBQUgsTUFBQTtBQUNBbkIsbUJBQUFvRCxTQUFBLEdBQUEsSUFBQTtBQUNBMUQsb0JBQUFDLEdBQUEsQ0FBQUssT0FBQXVDLFVBQUE7QUFDQXZDLG1CQUFBa0QsVUFBQTtBQUNBLFNBTkE7QUFPQSxLQVJBOztBQVVBbEQsV0FBQTBELFdBQUEsR0FBQSxVQUFBQyxNQUFBLEVBQUFDLFFBQUEsRUFBQTtBQUNBeEMsMEJBQUF5QyxlQUFBLENBQUF2QyxRQUFBLEVBQUFxQyxNQUFBLEVBQUEzRCxPQUFBcUIsTUFBQSxFQUFBRixNQUFBLEVBQUF5QyxRQUFBO0FBQ0E7QUFDQTVELGVBQUFxRCxTQUFBLEdBQUEsSUFBQTtBQUNBckQsZUFBQWtELFVBQUE7QUFDQSxLQUxBOztBQU9BbEQsV0FBQThELGNBQUEsR0FBQSxVQUFBSCxNQUFBLEVBQUE7QUFDQTtBQUNBdkMsMEJBQUEyQyxvQkFBQSxDQUFBSixNQUFBLEVBQUEzRCxPQUFBcUIsTUFBQSxFQUFBRixNQUFBO0FBQ0F6QixnQkFBQUMsR0FBQSxDQUFBLFNBQUE7QUFDQTtBQUNBLEtBTEE7O0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLENBNURBOztBQ1pBaEIsSUFBQTRCLE1BQUEsQ0FBQSxVQUFBQyxjQUFBLEVBQUF3RCxrQkFBQSxFQUFBO0FBQ0F4RCxtQkFBQUMsS0FBQSxDQUFBLE1BQUEsRUFBQTtBQUNBQyxhQUFBLEdBREE7QUFFQXVELGVBQUEsS0FGQTtBQUdBdEQscUJBQUEsbUJBSEE7QUFJQVosb0JBQUEsVUFKQTtBQUtBYyxpQkFBQTtBQUNBcUQsbUJBQUEsZUFBQW5ELFdBQUE7QUFBQSx1QkFBQUEsWUFBQW9ELGdCQUFBLEVBQUE7QUFBQSxhQURBO0FBRUFDLHVCQUFBLG1CQUFBckQsV0FBQSxFQUFBO0FBQ0FyQix3QkFBQUMsR0FBQSxDQUFBLG1CQUFBO0FBQ0EsdUJBQUFvQixZQUFBc0QsWUFBQSxFQUFBO0FBQ0E7QUFMQTtBQUxBLEtBQUE7QUFhQSxDQWRBOztBQWdCQTFGLElBQUFvQixVQUFBLENBQUEsVUFBQSxFQUFBLFVBQUFDLE1BQUEsRUFBQUUsTUFBQSxFQUFBb0UsYUFBQSxFQUFBckUsV0FBQSxFQUFBYyxXQUFBLEVBQUFaLGFBQUEsRUFBQW9FLFdBQUEsRUFBQUwsS0FBQSxFQUFBRSxTQUFBLEVBQUE7QUFDQXBFLFdBQUF3RSxZQUFBLEdBQUF6RCxZQUFBeUQsWUFBQTtBQUNBeEUsV0FBQXlFLE9BQUEsR0FBQXRFLGFBQUE7QUFDQUgsV0FBQWtFLEtBQUEsR0FBQUEsS0FBQTtBQUNBOztBQUVBeEUsWUFBQUMsR0FBQSxDQUFBLE9BQUEsRUFBQUMsS0FBQUMsU0FBQSxDQUFBRyxPQUFBa0UsS0FBQSxDQUFBO0FBQ0FsRSxXQUFBMEUsV0FBQSxHQUFBLFlBQUE7QUFDQXhFLGVBQUFJLEVBQUEsQ0FBQSxlQUFBO0FBQ0EsS0FGQTs7QUFJQU4sV0FBQW9FLFNBQUEsR0FBQUEsU0FBQTs7QUFHQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQXpDQTs7QUNoQkF6RixJQUFBNEIsTUFBQSxDQUFBLFVBQUFDLGNBQUEsRUFBQXdELGtCQUFBLEVBQUE7QUFDQXhELG1CQUFBQyxLQUFBLENBQUEsT0FBQSxFQUFBO0FBQ0FDLGFBQUEsUUFEQTtBQUVBQyxxQkFBQSxxQkFGQTtBQUdBWixvQkFBQTtBQUhBLEtBQUE7QUFLQWlFLHVCQUFBVyxTQUFBLENBQUEsUUFBQTtBQUNBLENBUEE7O0FBU0FoRyxJQUFBb0IsVUFBQSxDQUFBLFdBQUEsRUFBQSxVQUFBQyxNQUFBLEVBQUFFLE1BQUEsRUFBQUQsV0FBQSxFQUFBcUUsYUFBQSxFQUFBbkUsYUFBQSxFQUFBQyxRQUFBLEVBQUF3RSxzQkFBQSxFQUFBO0FBQ0E1RSxXQUFBNkUsY0FBQSxHQUFBLFlBQUE7QUFDQSxlQUFBNUUsWUFBQTZFLGFBQUEsR0FDQXRCLElBREEsQ0FDQSxpQkFBQTtBQUNBLG1CQUFBYyxjQUFBUyxLQUFBLENBQUFDLE1BQUFDLFFBQUEsRUFBQUQsTUFBQUUsWUFBQSxFQUFBLENBQUEsZ0JBQUEsRUFBQSxlQUFBLEVBQUEsaUJBQUEsQ0FBQSxDQUFBO0FBQ0EsU0FIQSxFQUlBMUIsSUFKQSxDQUlBO0FBQUEsbUJBQUF2RCxZQUFBa0YsT0FBQSxDQUFBQyxJQUFBLENBQUE7QUFBQSxTQUpBLEVBS0E1QixJQUxBLENBS0E7QUFBQSxtQkFBQXRELE9BQUFJLEVBQUEsQ0FBQSxNQUFBLENBQUE7QUFBQSxTQUxBLENBQUE7QUFNQSxLQVBBOztBQVNBc0UsMkJBQUFTLGNBQUEsQ0FBQSxLQUFBOztBQUVBckYsV0FBQVAsR0FBQSxDQUFBLGtCQUFBLEVBQUEsWUFBQTtBQUFBbUYsK0JBQUFTLGNBQUEsQ0FBQSxJQUFBO0FBQUEsS0FBQTs7QUFFQXJGLFdBQUF5RSxPQUFBLEdBQUF0RSxhQUFBOztBQUVBLGFBQUFtRixZQUFBLEdBQUE7QUFDQTVGLGdCQUFBQyxHQUFBLENBQUEsb0JBQUEsRUFBQUssT0FBQXlFLE9BQUEsQ0FBQWxELElBQUE7QUFDQSxZQUFBdkIsT0FBQXlFLE9BQUEsQ0FBQWxELElBQUEsRUFBQXJCLE9BQUFJLEVBQUEsQ0FBQSxNQUFBO0FBQ0E7O0FBRUFnRjtBQUNBLENBdEJBOztBQ1RBM0csSUFBQTRCLE1BQUEsQ0FBQSxVQUFBQyxjQUFBLEVBQUF3RCxrQkFBQSxFQUFBOztBQUVBeEQsbUJBQUFDLEtBQUEsQ0FBQSxVQUFBLEVBQUE7QUFDQUMsYUFBQSxXQURBO0FBRUE2RSxrQkFBQSxJQUZBO0FBR0E1RSxxQkFBQSx1QkFIQTtBQUlBWixvQkFBQSxhQUpBO0FBS0FjLGlCQUFBO0FBQ0EyRSx1QkFBQSxtQkFBQXpFLFdBQUEsRUFBQTtBQUNBckIsd0JBQUFDLEdBQUEsQ0FBQSx3Q0FBQTtBQUNBLHVCQUFBb0IsWUFBQUUsZ0JBQUEsRUFBQTtBQUNBLGFBSkE7QUFLQXdFLDBCQUFBLHNCQUFBMUUsV0FBQTtBQUFBLHVCQUFBQSxZQUFBRSxnQkFBQSxDQUFBLENBQUEsQ0FBQTtBQUFBO0FBTEE7QUFMQSxLQUFBLEVBY0FSLEtBZEEsQ0FjQSxlQWRBLEVBY0E7QUFDQUMsYUFBQSxhQURBO0FBRUFDLHFCQUFBO0FBRkEsS0FkQSxFQW1CQUYsS0FuQkEsQ0FtQkEsb0JBbkJBLEVBbUJBO0FBQ0FDLGFBQUEsWUFEQTtBQUVBQyxxQkFBQTtBQUZBLEtBbkJBLEVBd0JBRixLQXhCQSxDQXdCQSxlQXhCQSxFQXdCQTtBQUNBQyxhQUFBLGVBREE7QUFFQUMscUJBQUEsdUJBRkE7QUFHQVosb0JBQUEsVUFIQTtBQUlBYyxpQkFBQTtBQUNBNkUsbUJBQUEsZUFBQTNFLFdBQUEsRUFBQUMsWUFBQTtBQUFBLHVCQUFBRCxZQUFBNEUsZ0JBQUEsQ0FBQTNFLGFBQUE0RSxNQUFBLENBQUE7QUFBQTtBQURBOztBQUpBLEtBeEJBOztBQW1DQTVCLHVCQUFBVyxTQUFBLENBQUEsc0JBQUE7QUFDQSxDQXRDQTs7QUF3Q0FoRyxJQUFBb0IsVUFBQSxDQUFBLGFBQUEsRUFBQSxVQUFBQyxNQUFBLEVBQUFlLFdBQUEsRUFBQWIsTUFBQSxFQUFBc0YsU0FBQSxFQUFBQyxZQUFBLEVBQUE7QUFDQXpGLFdBQUE2RixXQUFBLEdBQUEsVUFBQTtBQUNBN0YsV0FBQThGLFVBQUEsR0FBQSxFQUFBO0FBQ0E5RixXQUFBOEYsVUFBQSxDQUFBaEYsS0FBQSxHQUFBLEVBQUE7QUFDQWQsV0FBQStGLFNBQUEsR0FBQSxZQUFBO0FBQ0E3RixlQUFBSSxFQUFBLENBQUEsb0JBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQTBGLFVBQUEsSUFBQSxFQUFBQyxRQUFBLElBQUEsRUFBQTtBQUNBLEtBRkE7O0FBTUFqRyxXQUFBYyxLQUFBLEdBQUEyRSxhQUFBUyxNQUFBLENBQUFWLFNBQUEsQ0FBQTs7QUFFQXhGLFdBQUF3RSxZQUFBLEdBQUEsVUFBQXNCLFVBQUEsRUFBQTtBQUNBLGVBQUEvRSxZQUFBeUQsWUFBQSxDQUFBc0IsVUFBQSxFQUNBdEMsSUFEQSxDQUNBLFVBQUFoQyxFQUFBO0FBQUEsbUJBQUFULFlBQUFvRixhQUFBLENBQUEzRSxFQUFBLEVBQUF4QixPQUFBOEYsVUFBQSxDQUFBaEYsS0FBQSxDQUFBO0FBQUEsU0FEQSxFQUVBMEMsSUFGQSxDQUVBLFVBQUFoQyxFQUFBLEVBQUE7QUFDQTlCLG9CQUFBQyxHQUFBLENBQUEsU0FBQTtBQUNBO0FBQ0E7QUFDQU8sbUJBQUFJLEVBQUEsQ0FBQSxNQUFBLEVBQUEsRUFBQWUsUUFBQUcsRUFBQSxFQUFBO0FBQ0EsU0FQQSxDQUFBO0FBUUEsS0FUQTtBQVVBeEIsV0FBQW9HLGNBQUEsR0FBQXJGLFlBQUFzRixRQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFHQSxDQWhDQTs7QUFrQ0ExSCxJQUFBb0IsVUFBQSxDQUFBLFVBQUEsRUFBQSxVQUFBQyxNQUFBLEVBQUFlLFdBQUEsRUFBQWIsTUFBQSxFQUFBd0YsS0FBQSxFQUFBO0FBQ0ExRixXQUFBMEYsS0FBQSxHQUFBQSxLQUFBO0FBQ0EsQ0FGQTs7QUMxRUE7QUNBQS9HLElBQUEySCxTQUFBLENBQUEsZ0JBQUEsRUFBQSxZQUFBO0FBQ0EsV0FBQTtBQUNBQyxrQkFBQSxHQURBO0FBRUE1RixxQkFBQSwyQ0FGQTtBQUdBWixvQkFBQTtBQUhBLEtBQUE7QUFLQSxDQU5BO0FDQUFwQixJQUFBMkgsU0FBQSxDQUFBLFlBQUEsRUFBQSxZQUFBO0FBQ0EsV0FBQTtBQUNBQyxrQkFBQSxHQURBO0FBRUE1RixxQkFBQSx1Q0FGQTtBQUdBWixvQkFBQTtBQUhBLEtBQUE7QUFLQSxDQU5BO0FDQUFwQixJQUFBMkgsU0FBQSxDQUFBLGNBQUEsRUFBQSxZQUFBO0FBQ0EsV0FBQTtBQUNBQyxrQkFBQSxHQURBO0FBRUE1RixxQkFBQSx1Q0FGQTtBQUdBWixvQkFBQTtBQUhBLEtBQUE7QUFLQSxDQU5BO0FDQUFwQixJQUFBNkgsT0FBQSxDQUFBLG1CQUFBLEVBQUEsVUFBQUMsS0FBQSxFQUFBakgsVUFBQSxFQUFBVyxhQUFBLEVBQUE7O0FBRUEsUUFBQWlCLG9CQUFBLEVBQUE7O0FBRUEsUUFBQXNGLFdBQUEsU0FBQUEsUUFBQSxDQUFBQyxXQUFBLEVBQUFDLE9BQUEsRUFBQUMsT0FBQSxFQUFBO0FBQ0EsZUFBQUQsUUFBQUUsWUFBQSxDQUFBSCxXQUFBLEVBQUFJLElBQUEsQ0FBQSxPQUFBLEVBQUEseUJBQUE7QUFDQUMsMEJBQUFDLE9BQUEsQ0FBQSxnQkFBQTtBQUNBLG9CQUFBQyxZQUFBLEVBQUE7QUFDQUMscUJBQUF0RixHQUFBLENBQUF1RixXQUFBLENBQUEsb0JBQUE7QUFDQUYsOEJBQUFDLEtBQUFFLEdBQUEsSUFBQUMsUUFBQTtBQUNBLDJCQUFBLElBQUE7QUFDQSxpQkFIQSxFQUlBOUQsSUFKQSxDQUlBO0FBQUEsMkJBQUFxRCxRQUFBVSxNQUFBLENBQUFMLFNBQUEsQ0FBQTtBQUFBLGlCQUpBLEVBS0FNLEtBTEEsQ0FLQTtBQUFBLDJCQUFBOUgsUUFBQUMsR0FBQSxDQUFBOEgsR0FBQSxDQUFBO0FBQUEsaUJBTEE7QUFNQSxhQVJBO0FBU0EsU0FWQSxFQVdBRCxLQVhBLENBV0E7QUFBQSxtQkFBQTlILFFBQUFDLEdBQUEsQ0FBQThILEdBQUEsQ0FBQTtBQUFBLFNBWEEsQ0FBQTtBQVlBLEtBYkE7O0FBZUFyRyxzQkFBQXFDLFlBQUEsR0FBQSxVQUFBcEMsTUFBQSxFQUFBQyxRQUFBLEVBQUFILE1BQUEsRUFBQTtBQUNBO0FBQ0F6QixnQkFBQUMsR0FBQSxDQUFBLGdCQUFBO0FBQ0EsWUFBQWdILGNBQUEsQ0FBQTtBQUNBLFlBQUFqRixVQUFBQyxTQUFBQyxRQUFBLEdBQUFDLEdBQUEsWUFBQVYsTUFBQSxlQUFBRSxNQUFBLENBQUE7QUFDQSxZQUFBd0YsVUFBQW5GLFFBQUFnRyxLQUFBLGNBQUFwRyxRQUFBLFdBQUE7QUFDQSxZQUFBc0YsVUFBQWxGLFFBQUFnRyxLQUFBLENBQUEsaUJBQUEsQ0FBQTtBQUNBYixnQkFBQUUsSUFBQSxDQUFBLE9BQUEsRUFBQSx3QkFBQTtBQUNBSiwwQkFBQSxJQUFBZ0IsYUFBQUMsV0FBQSxFQUFBO0FBQ0EsU0FGQSxFQUdBcEUsSUFIQSxDQUdBLFlBQUE7QUFDQWtELHFCQUFBQyxXQUFBLEVBQUFDLE9BQUEsRUFBQUMsT0FBQTtBQUNBbkgsb0JBQUFDLEdBQUEsQ0FBQSxxQkFBQTtBQUNBLFNBTkE7QUFPQSxLQWRBOztBQWdCQSxRQUFBa0ksNkJBQUEsU0FBQUEsMEJBQUEsQ0FBQUMsTUFBQSxFQUFBQyxNQUFBLEVBQUE7QUFDQSxZQUFBQyxlQUFBLEVBQUE7QUFDQSxZQUFBQyxZQUFBLEVBQUE7QUFDQSxlQUFBSCxPQUFBZixJQUFBLENBQUEsT0FBQSxFQUNBUyxLQURBLENBQ0E7QUFBQSxtQkFBQTlILFFBQUFDLEdBQUEsQ0FBQThILEdBQUEsQ0FBQTtBQUFBLFNBREEsRUFFQWpFLElBRkEsQ0FFQSxvQkFBQTtBQUNBd0UseUJBQUFFLFNBQUFiLEdBQUEsSUFBQSxJQUFBO0FBQ0FZLHNCQUFBQyxTQUFBYixHQUFBLElBQUFhLFNBQUFqRyxHQUFBLEVBQUE7QUFDQSxtQkFBQThGLE9BQUFSLE1BQUEsQ0FBQVUsU0FBQSxDQUFBO0FBQ0EsU0FOQSxFQU9BekUsSUFQQSxDQU9BO0FBQUEsbUJBQUFzRSxPQUFBSyxNQUFBLENBQUFaLE1BQUEsQ0FBQVMsWUFBQSxDQUFBO0FBQUEsU0FQQSxDQUFBO0FBUUEsS0FYQTs7QUFjQTVHLHNCQUFBeUMsZUFBQSxHQUFBLFVBQUF2QyxRQUFBLEVBQUFxQyxNQUFBLEVBQUF0QyxNQUFBLEVBQUFGLE1BQUEsRUFBQXlDLFFBQUEsRUFBQTtBQUNBLFlBQUFsQyxVQUFBQyxTQUFBQyxRQUFBLEdBQUFDLEdBQUEsWUFBQVYsTUFBQSxlQUFBRSxNQUFBLENBQUE7QUFDQSxZQUFBK0csZUFBQTFHLFFBQUFnRyxLQUFBLGNBQUFwRyxRQUFBLGNBQUFxQyxNQUFBLENBQUE7QUFDQSxZQUFBMEUsWUFBQTNHLFFBQUFnRyxLQUFBLENBQUEscUJBQUEsQ0FBQTtBQUNBRyxtQ0FBQU8sWUFBQSxFQUFBQyxTQUFBLEVBQ0E3RSxJQURBLENBQ0EsWUFBQTtBQUNBNkUsc0JBQUFYLEtBQUEsQ0FBQS9ELE1BQUEsRUFBQTJFLEdBQUEsQ0FBQTtBQUNBQyw2QkFBQWpILFFBREE7QUFFQXdCLHNCQUFBYztBQUZBLGFBQUE7QUFJQSxTQU5BO0FBT0EsS0FYQTs7QUFjQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBSUF4QyxzQkFBQTJDLG9CQUFBLEdBQUEsVUFBQUosTUFBQSxFQUFBdEMsTUFBQSxFQUFBRixNQUFBLEVBQUE7QUFDQSxZQUFBTyxVQUFBQyxTQUFBQyxRQUFBLEdBQUFDLEdBQUEsWUFBQVYsTUFBQSxlQUFBRSxNQUFBLENBQUE7QUFDQSxZQUFBbUgsU0FBQTlHLFFBQUFnRyxLQUFBLDBCQUFBL0QsTUFBQSxrQkFBQTtBQUNBLFlBQUFSLGNBQUF6QixRQUFBZ0csS0FBQSwwQkFBQS9ELE1BQUEsQ0FBQTtBQUNBakUsZ0JBQUFDLEdBQUEsQ0FBQSxjQUFBLEVBQUF3RCxXQUFBO0FBQ0EsWUFBQXNGLGNBQUEsRUFBQTtBQUNBLFlBQUFDLGVBQUEsRUFBQTtBQUNBRixlQUFBekIsSUFBQSxDQUFBLE9BQUEsRUFDQXZELElBREEsQ0FDQSxvQkFBQTtBQUNBZ0YscUJBQUFHLFNBQUExRyxHQUFBLEVBQUE7QUFDQSxTQUhBLEVBSUF1QixJQUpBLENBSUEsWUFBQTtBQUNBLGdCQUFBb0Ysc0JBQUFsSCxRQUFBZ0csS0FBQSxDQUFBLE9BQUEsRUFBQVksR0FBQSxDQUFBLFdBQUEsQ0FBQTtBQUNBLGdCQUFBTyxpQkFBQW5ILFFBQUFnRyxLQUFBLENBQUEsa0JBQUEsRUFBQU4sV0FBQSxDQUFBLFVBQUF2RSxnQkFBQSxFQUFBO0FBQ0E2RiwrQkFBQTdGLGlCQUFBaUcsS0FBQSxDQUFBLENBQUEsQ0FBQTtBQUNBLHVCQUFBLElBQUE7QUFDQSxhQUhBLEVBSUF0RixJQUpBLENBSUEsWUFBQTtBQUNBOUQsd0JBQUFDLEdBQUEsQ0FBQSxvQkFBQSxFQUFBK0ksWUFBQTtBQUNBaEgsd0JBQUFnRyxLQUFBLGNBQUFjLE1BQUEscUJBQUFGLEdBQUEsQ0FBQUksWUFBQTtBQUNBLHVCQUFBdkYsWUFBQTRELElBQUEsQ0FBQSxPQUFBLENBQUE7QUFDQSxhQVJBLEVBU0F2RCxJQVRBLENBU0EsK0JBQUE7QUFDQTlELHdCQUFBQyxHQUFBLENBQUEsVUFBQSxFQUFBb0osb0JBQUE5RyxHQUFBLEVBQUE7QUFDQThHLHNDQUFBQSxvQkFBQTlHLEdBQUEsRUFBQTtBQUNBLHVCQUFBUCxRQUFBZ0csS0FBQSxnQkFBQVksR0FBQSxDQUFBUyxtQkFBQSxDQUFBO0FBQ0EsYUFiQSxFQWNBdkYsSUFkQSxDQWNBO0FBQUEsdUJBQUE5QixRQUFBZ0csS0FBQSxDQUFBLHFCQUFBLEVBQUFzQixNQUFBLEVBQUE7QUFBQSxhQWRBLENBQUE7QUFlQSxtQkFBQUMsUUFBQUMsR0FBQSxDQUFBLENBQUFOLG1CQUFBLEVBQUFDLGNBQUEsQ0FBQSxDQUFBO0FBQ0EsU0F0QkE7QUF1QkEsS0E5QkE7O0FBZ0NBLFdBQUF6SCxpQkFBQTtBQUNBLENBdEhBO0FDQUF6QyxJQUFBNkgsT0FBQSxDQUFBLGFBQUEsRUFBQSxVQUFBQyxLQUFBLEVBQUFqSCxVQUFBLEVBQUFXLGFBQUEsRUFBQTs7QUFFQSxRQUFBZ0osU0FBQTtBQUNBQyxnQkFBQSxlQURBO0FBRUFDLGVBQUEsZUFGQTtBQUdBQyxnQkFBQSxjQUhBO0FBSUFDLGFBQUE7QUFKQSxLQUFBOztBQU9BLFFBQUFDLFlBQUFMLE9BQUFFLEtBQUE7O0FBRUE7QUFDQSxRQUFBdEksY0FBQSxFQUFBO0FBQ0FBLGdCQUFBeUQsWUFBQSxHQUFBLFVBQUFzQixVQUFBLEVBQUE7QUFDQTtBQUNBLFlBQUEzRSxTQUFBaEIsY0FBQXNCLElBQUEsQ0FBQUQsRUFBQSxJQUFBLENBQUE7QUFDQSxZQUFBaUksWUFBQXRKLGNBQUFvQixJQUFBLENBQUFDLEVBQUEsSUFBQSxDQUFBO0FBQ0EsZUFBQWlGLE1BQUFpRCxJQUFBLGFBQUFGLFNBQUEsc0JBQUE7QUFDQXBILGtCQUFBMEQsV0FBQTFELElBQUEsSUFBQSxjQURBO0FBRUFqQixvQkFBQUEsTUFGQTtBQUdBc0ksdUJBQUFBLFNBSEE7QUFJQUUseUJBQUF4SixjQUFBb0IsSUFBQSxDQUFBYSxJQUpBO0FBS0FELHNCQUFBMkQ7QUFMQSxTQUFBLEVBT0F0QyxJQVBBLENBT0EsZUFBQTtBQUNBLGdCQUFBbkMsU0FBQXVJLElBQUFDLElBQUE7QUFDQSxnQkFBQW5JLFVBQUFDLFNBQUFDLFFBQUEsR0FBQUMsR0FBQSxhQUFBVixNQUFBLGVBQUFFLE1BQUEsQ0FBQTtBQUNBSyxvQkFBQUksRUFBQSxDQUFBLE9BQUEsRUFBQSxvQkFBQTtBQUNBdEMsMkJBQUFzSyxVQUFBLENBQUEsYUFBQSxFQUFBNUIsU0FBQWpHLEdBQUEsRUFBQTtBQUNBLGFBRkE7QUFHQSxtQkFBQVosTUFBQTtBQUNBLFNBZEEsQ0FBQTtBQWVBLEtBbkJBO0FBb0JBO0FBQ0FOLGdCQUFBNEUsZ0JBQUEsR0FBQSxVQUFBbkUsRUFBQSxFQUFBO0FBQ0EsZUFBQWlGLE1BQUFzRCxHQUFBLGFBQUFQLFNBQUEsd0JBQUFoSSxFQUFBLGFBQ0FnQyxJQURBLENBQ0E7QUFBQSxtQkFBQW9HLElBQUFDLElBQUE7QUFBQSxTQURBLENBQUE7QUFFQSxLQUhBOztBQUtBO0FBQ0E7QUFDQTlJLGdCQUFBb0YsYUFBQSxHQUFBLFVBQUE5RSxNQUFBLEVBQUFQLEtBQUEsRUFBQTtBQUNBcEIsZ0JBQUFDLEdBQUEsQ0FBQSxxQkFBQTtBQUNBLFlBQUFxSyxXQUFBLEVBQUE7QUFDQSxhQUFBLElBQUFwRSxNQUFBLElBQUE5RSxLQUFBLEVBQUE7QUFDQWtKLHFCQUFBQyxJQUFBLENBQUFyRSxNQUFBO0FBQ0E7QUFDQSxlQUFBYSxNQUFBaUQsSUFBQSxhQUFBRixTQUFBLHdCQUFBbkksTUFBQSxhQUFBO0FBQ0EscUJBQUEySTtBQURBLFNBQUEsRUFHQXhHLElBSEEsQ0FHQTtBQUFBLG1CQUFBbkMsTUFBQTtBQUFBLFNBSEEsQ0FBQTtBQUlBLEtBVkE7O0FBWUFOLGdCQUFBd0MsWUFBQSxHQUFBLFVBQUFsQyxNQUFBLEVBQUE7QUFDQSxZQUFBRixTQUFBaEIsY0FBQXNCLElBQUEsQ0FBQUQsRUFBQTtBQUNBLFlBQUFGLFdBQUFuQixjQUFBb0IsSUFBQSxDQUFBQyxFQUFBO0FBQ0EsWUFBQTBJLGFBQUEvSixjQUFBb0IsSUFBQSxDQUFBYSxJQUFBO0FBQ0EsWUFBQStILFlBQUF4SSxTQUFBQyxRQUFBLEdBQUFDLEdBQUEsWUFBQVYsTUFBQSxlQUFBRSxNQUFBLGlCQUFBQyxRQUFBLENBQUE7QUFDQTZJLGtCQUFBN0IsR0FBQSxDQUFBO0FBQ0FsRyxrQkFBQThIO0FBREEsU0FBQTtBQUdBLGVBQUF6RCxNQUFBaUQsSUFBQSxhQUFBRixTQUFBLHdCQUFBbkksTUFBQSxtQkFBQUMsUUFBQSxDQUFBO0FBQ0EsS0FUQTs7QUFXQVAsZ0JBQUFFLGdCQUFBLEdBQUEsVUFBQU8sRUFBQSxFQUFBO0FBQ0EsWUFBQUwsU0FBQSxPQUFBSyxFQUFBLEtBQUEsUUFBQSxHQUFBckIsY0FBQXNCLElBQUEsQ0FBQUQsRUFBQSxHQUFBQSxFQUFBLENBREEsQ0FDQTtBQUNBLGVBQUFpRixNQUFBc0QsR0FBQSxhQUFBUCxTQUFBLDZCQUFBckksTUFBQSxFQUNBcUMsSUFEQSxDQUNBO0FBQUEsbUJBQUFvRyxJQUFBQyxJQUFBO0FBQUEsU0FEQSxDQUFBO0FBR0EsS0FMQTs7QUFPQTlJLGdCQUFBcUosZ0JBQUEsR0FBQSxVQUFBL0ksTUFBQSxFQUFBO0FBQ0EsZUFBQW9GLE1BQUFzRCxHQUFBLGFBQUFQLFNBQUEsd0JBQUFuSSxNQUFBLFlBQUE7QUFDQSxLQUZBOztBQUlBTixnQkFBQXNKLGVBQUEsR0FBQSxVQUFBaEosTUFBQSxFQUFBRixNQUFBLEVBQUE7QUFDQUEsaUJBQUFBLFVBQUFoQixjQUFBc0IsSUFBQSxDQUFBRCxFQUFBO0FBQ0EsWUFBQThJLFdBQUEzSSxTQUFBQyxRQUFBLEdBQUFDLEdBQUEsWUFBQVYsTUFBQSxlQUFBRSxNQUFBLENBQUE7QUFDQSxlQUFBaUosU0FBQXZELElBQUEsQ0FBQSxPQUFBLEVBQUF2RCxJQUFBLENBQUE7QUFBQSxtQkFBQTBFLFNBQUFqRyxHQUFBLEVBQUE7QUFBQSxTQUFBLENBQUE7QUFDQSxLQUpBOztBQU1BbEIsZ0JBQUF3SixnQkFBQSxHQUFBLFVBQUFwSixNQUFBLEVBQUE7QUFDQXpCLGdCQUFBQyxHQUFBLENBQUEsWUFBQSxFQUFBd0IsTUFBQTtBQUNBQSxpQkFBQUEsVUFBQWhCLGNBQUFzQixJQUFBLENBQUFELEVBQUE7QUFDQTlCLGdCQUFBQyxHQUFBLENBQUEsaUJBQUEsRUFBQXdCLE1BQUE7QUFDQSxlQUFBc0YsTUFBQXNELEdBQUEsYUFBQVAsU0FBQSxnQ0FBQXJJLE1BQUEsRUFDQXFDLElBREEsQ0FDQTtBQUFBLG1CQUFBb0csSUFBQUMsSUFBQTtBQUFBLFNBREEsRUFFQXJDLEtBRkEsQ0FFQTtBQUFBLG1CQUFBOUgsUUFBQUMsR0FBQSxDQUFBOEgsR0FBQSxDQUFBO0FBQUEsU0FGQSxDQUFBO0FBR0EsS0FQQTs7QUFTQTFHLGdCQUFBb0QsZ0JBQUEsR0FBQSxZQUFBO0FBQ0EsZUFBQXNDLE1BQUFzRCxHQUFBLGFBQUFQLFNBQUEsZ0NBQUFySixjQUFBb0IsSUFBQSxDQUFBQyxFQUFBLEVBQ0FnQyxJQURBLENBQ0E7QUFBQSxtQkFBQW9HLElBQUFDLElBQUE7QUFBQSxTQURBLEVBRUFyQyxLQUZBLENBRUE7QUFBQSxtQkFBQTlILFFBQUFDLEdBQUEsQ0FBQThILEdBQUEsQ0FBQTtBQUFBLFNBRkEsQ0FBQTtBQUdBLEtBSkE7O0FBTUExRyxnQkFBQXNELFlBQUEsR0FBQSxZQUFBO0FBQ0EsWUFBQWxELFNBQUFoQixjQUFBc0IsSUFBQSxDQUFBRCxFQUFBO0FBQ0EsWUFBQWdKLFNBQUFySyxjQUFBb0IsSUFBQSxDQUFBQyxFQUFBO0FBQ0EsZUFBQWlGLE1BQUFzRCxHQUFBLGFBQUFQLFNBQUEsZ0NBQUFySSxNQUFBLGdCQUFBcUosTUFBQSxpQkFDQWhILElBREEsQ0FDQTtBQUFBLG1CQUFBb0csSUFBQUMsSUFBQTtBQUFBLFNBREEsRUFFQXJDLEtBRkEsQ0FFQTtBQUFBLG1CQUFBOUgsUUFBQUMsR0FBQSxDQUFBOEgsR0FBQSxDQUFBO0FBQUEsU0FGQSxDQUFBO0FBR0EsS0FOQTs7QUFRQSxXQUFBMUcsV0FBQTtBQUNBLENBekdBOztBQ0FBcEMsSUFBQTZILE9BQUEsQ0FBQSxhQUFBLEVBQUEsVUFBQUMsS0FBQSxFQUFBdEcsYUFBQSxFQUFBO0FBQ0EsUUFBQWdKLFNBQUE7QUFDQUMsZ0JBQUEsZUFEQTtBQUVBQyxlQUFBLGVBRkE7QUFHQUMsZ0JBQUEsY0FIQTtBQUlBQyxhQUFBO0FBSkEsS0FBQTs7QUFPQSxRQUFBQyxZQUFBTCxPQUFBRSxLQUFBOztBQUVBLFdBQUE7QUFDQWxFLGlCQUFBLGlCQUFBQyxJQUFBLEVBQUE7QUFBQTs7QUFDQSxtQkFBQXFCLE1BQUE7QUFDQWdFLHdCQUFBLE1BREE7QUFFQS9KLGlDQUFBOEksU0FBQSxvQkFGQTtBQUdBa0IseUJBQUE7QUFDQSxvQ0FBQTtBQURBLGlCQUhBO0FBTUFiLHNCQUFBekU7QUFOQSxhQUFBLEVBUUE1QixJQVJBLENBUUEsZUFBQTtBQUNBLHNCQUFBbUgsZUFBQSxDQUFBZixJQUFBQyxJQUFBLENBQUF0SSxJQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUFxSSxJQUFBQyxJQUFBLENBQUFwSSxJQUFBLENBQUEsQ0FBQSxDQUFBO0FBQ0EsYUFWQSxDQUFBO0FBV0EsU0FiQTtBQWNBcUQsdUJBQUEseUJBQUE7QUFDQSxtQkFBQTJCLE1BQUFzRCxHQUFBLGFBQUFQLFNBQUEsc0JBQ0FoRyxJQURBLENBQ0EsZUFBQTtBQUNBLHVCQUFBb0csSUFBQUMsSUFBQTtBQUNBLGFBSEEsQ0FBQTtBQUlBLFNBbkJBO0FBb0JBZSxzQkFBQSx3QkFBQTtBQUNBLG1CQUFBbkUsTUFBQXNELEdBQUEsQ0FBQSxzQ0FBQSxDQUFBO0FBQ0EsU0F0QkE7O0FBd0JBWSx5QkFBQSx5QkFBQXBKLElBQUEsRUFBQUUsSUFBQSxFQUFBO0FBQ0F0QiwwQkFBQW9CLElBQUEsR0FBQUEsSUFBQTtBQUNBcEIsMEJBQUFzQixJQUFBLEdBQUFBLElBQUE7QUFDQSxTQTNCQTs7QUE2QkFwQixnQkFBQSxrQkFBQTtBQUNBRiwwQkFBQTBLLE1BQUE7QUFDQTtBQS9CQSxLQUFBO0FBaUNBLENBM0NBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJb25pYyBTdGFydGVyIEFwcFxuXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xuLy8gJ3N0YXJ0ZXInIGlzIHRoZSBuYW1lIG9mIHRoaXMgYW5ndWxhciBtb2R1bGUgZXhhbXBsZSAoYWxzbyBzZXQgaW4gYSA8Ym9keT4gYXR0cmlidXRlIGluIGluZGV4Lmh0bWwpXG4vLyB0aGUgMm5kIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiAncmVxdWlyZXMnXG5cbndpbmRvdy5hcHAgPSBhbmd1bGFyLm1vZHVsZSgnQmxhbmtBZ2FpbnN0SHVtYW5pdHknLCBbJ2lvbmljJywgJ3VpLnJvdXRlcicsICduZ0NvcmRvdmEnLCAnbmdDb3Jkb3ZhT2F1dGgnLCAnbmdTdG9yYWdlJywgJ25nQW5pbWF0ZSddKVxuXG5cbmFwcC5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0pIHtcbiAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgICAgICAgIC8vIEhpZGUgdGhlIGFjY2Vzc29yeSBiYXIgYnkgZGVmYXVsdCAocmVtb3ZlIHRoaXMgdG8gc2hvdyB0aGUgYWNjZXNzb3J5IGJhciBhYm92ZSB0aGUga2V5Ym9hcmRcbiAgICAgICAgICAgIC8vIGZvciBmb3JtIGlucHV0cylcbiAgICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG5cbiAgICAgICAgICAgIC8vIERvbid0IHJlbW92ZSB0aGlzIGxpbmUgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZy4gSXQgc3RvcHMgdGhlIHZpZXdwb3J0XG4gICAgICAgICAgICAvLyBmcm9tIHNuYXBwaW5nIHdoZW4gdGV4dCBpbnB1dHMgYXJlIGZvY3VzZWQuIElvbmljIGhhbmRsZXMgdGhpcyBpbnRlcm5hbGx5IGZvclxuICAgICAgICAgICAgLy8gYSBtdWNoIG5pY2VyIGtleWJvYXJkIGV4cGVyaWVuY2UuXG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2luZG93LlN0YXR1c0Jhcikge1xuICAgICAgICAgICAgU3RhdHVzQmFyLnN0eWxlTGlnaHRDb250ZW50KClcbiAgICAgICAgfVxuICAgIH0pO1xuXG59KVxuXG5hcHAucnVuKGZ1bmN0aW9uKCRyb290U2NvcGUpIHtcbiAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlRXJyb3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoYXJndW1lbnRzWzVdKSk7XG4gICAgfSk7XG59KTtcblxuIiwiYXBwLmNvbnRyb2xsZXIoJ0xvZ291dEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIFVzZXJGYWN0b3J5LCAkc3RhdGUsICRsb2NhbFN0b3JhZ2UsICR0aW1lb3V0KXtcblx0JHNjb3BlLmxvZ091dCA9IGZ1bmN0aW9uKCl7XG5cdFx0VXNlckZhY3RvcnkubG9nT3V0KClcblx0XHQkc3RhdGUuZ28oJ2xvZ2luJylcblx0fVxufSkiLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKXtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2NhcmRzJywge1xuXHRcdHVybDogJy9jYXJkcycsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9jYXJkcy10ZXN0L2NhcmRzLXRlc3QuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0NhcmRzVGVzdEN0cmwnXG5cdH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignQ2FyZHNUZXN0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSl7XG4gXHQkc2NvcGUuZ3JlZXRpbmcgPSBcIkhJXCJcbn0pIiwiLy8gKGZ1bmN0aW9uICgpIHtcblxuLy8gICAgICd1c2Ugc3RyaWN0JztcblxuLy8gICAgIC8vIEhvcGUgeW91IGRpZG4ndCBmb3JnZXQgQW5ndWxhciEgRHVoLWRveS5cbi8vICAgICBpZiAoIXdpbmRvdy5hbmd1bGFyKSB0aHJvdyBuZXcgRXJyb3IoJ0kgY2FuXFwndCBmaW5kIEFuZ3VsYXIhJyk7XG5cbi8vICAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2ZzYVByZUJ1aWx0JywgW10pO1xuXG4vLyAgICAgYXBwLmZhY3RvcnkoJ1NvY2tldCcsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgaWYgKCF3aW5kb3cuaW8pIHRocm93IG5ldyBFcnJvcignc29ja2V0LmlvIG5vdCBmb3VuZCEnKTtcbi8vICAgICAgICAgcmV0dXJuIHdpbmRvdy5pbyh3aW5kb3cubG9jYXRpb24ub3JpZ2luKTtcbi8vICAgICB9KTtcblxuLy8gICAgIC8vIEFVVEhfRVZFTlRTIGlzIHVzZWQgdGhyb3VnaG91dCBvdXIgYXBwIHRvXG4vLyAgICAgLy8gYnJvYWRjYXN0IGFuZCBsaXN0ZW4gZnJvbSBhbmQgdG8gdGhlICRyb290U2NvcGVcbi8vICAgICAvLyBmb3IgaW1wb3J0YW50IGV2ZW50cyBhYm91dCBhdXRoZW50aWNhdGlvbiBmbG93LlxuLy8gICAgIGFwcC5jb25zdGFudCgnQVVUSF9FVkVOVFMnLCB7XG4vLyAgICAgICAgIGxvZ2luU3VjY2VzczogJ2F1dGgtbG9naW4tc3VjY2VzcycsXG4vLyAgICAgICAgIGxvZ2luRmFpbGVkOiAnYXV0aC1sb2dpbi1mYWlsZWQnLFxuLy8gICAgICAgICBsb2dvdXRTdWNjZXNzOiAnYXV0aC1sb2dvdXQtc3VjY2VzcycsXG4vLyAgICAgICAgIHNlc3Npb25UaW1lb3V0OiAnYXV0aC1zZXNzaW9uLXRpbWVvdXQnLFxuLy8gICAgICAgICBub3RBdXRoZW50aWNhdGVkOiAnYXV0aC1ub3QtYXV0aGVudGljYXRlZCcsXG4vLyAgICAgICAgIG5vdEF1dGhvcml6ZWQ6ICdhdXRoLW5vdC1hdXRob3JpemVkJ1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLmZhY3RvcnkoJ0F1dGhJbnRlcmNlcHRvcicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkcSwgQVVUSF9FVkVOVFMpIHtcbi8vICAgICAgICAgdmFyIHN0YXR1c0RpY3QgPSB7XG4vLyAgICAgICAgICAgICA0MDE6IEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsXG4vLyAgICAgICAgICAgICA0MDM6IEFVVEhfRVZFTlRTLm5vdEF1dGhvcml6ZWQsXG4vLyAgICAgICAgICAgICA0MTk6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0LFxuLy8gICAgICAgICAgICAgNDQwOiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dFxuLy8gICAgICAgICB9O1xuLy8gICAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAgICAgcmVzcG9uc2VFcnJvcjogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KHN0YXR1c0RpY3RbcmVzcG9uc2Uuc3RhdHVzXSwgcmVzcG9uc2UpO1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzcG9uc2UpXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH07XG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuY29uZmlnKGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XG4vLyAgICAgICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goW1xuLy8gICAgICAgICAgICAgJyRpbmplY3RvcicsXG4vLyAgICAgICAgICAgICBmdW5jdGlvbiAoJGluamVjdG9yKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRpbmplY3Rvci5nZXQoJ0F1dGhJbnRlcmNlcHRvcicpO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICBdKTtcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5zZXJ2aWNlKCdBdXRoU2VydmljZScsIGZ1bmN0aW9uICgkaHR0cCwgU2Vzc2lvbiwgJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMsICRxKSB7XG5cbi8vICAgICAgICAgZnVuY3Rpb24gb25TdWNjZXNzZnVsTG9naW4ocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgIHZhciB1c2VyID0gcmVzcG9uc2UuZGF0YS51c2VyO1xuLy8gICAgICAgICAgICAgU2Vzc2lvbi5jcmVhdGUodXNlcik7XG4vLyAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoQVVUSF9FVkVOVFMubG9naW5TdWNjZXNzKTtcbi8vICAgICAgICAgICAgIHJldHVybiB1c2VyO1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgLy8gVXNlcyB0aGUgc2Vzc2lvbiBmYWN0b3J5IHRvIHNlZSBpZiBhblxuLy8gICAgICAgICAvLyBhdXRoZW50aWNhdGVkIHVzZXIgaXMgY3VycmVudGx5IHJlZ2lzdGVyZWQuXG4vLyAgICAgICAgIHRoaXMuaXNBdXRoZW50aWNhdGVkID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuICEhU2Vzc2lvbi51c2VyO1xuLy8gICAgICAgICB9O1xuXG4gICAgICAgIFxuLy8gICAgICAgICB0aGlzLmlzQWRtaW4gPSBmdW5jdGlvbih1c2VySWQpe1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ3J1bm5pbmcgYWRtaW4gZnVuYycpXG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpXG4vLyAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhLnVzZXIuaXNBZG1pbilcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIHRoaXMuZ2V0TG9nZ2VkSW5Vc2VyID0gZnVuY3Rpb24gKGZyb21TZXJ2ZXIpIHtcblxuLy8gICAgICAgICAgICAgLy8gSWYgYW4gYXV0aGVudGljYXRlZCBzZXNzaW9uIGV4aXN0cywgd2Vcbi8vICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgdXNlciBhdHRhY2hlZCB0byB0aGF0IHNlc3Npb25cbi8vICAgICAgICAgICAgIC8vIHdpdGggYSBwcm9taXNlLiBUaGlzIGVuc3VyZXMgdGhhdCB3ZSBjYW5cbi8vICAgICAgICAgICAgIC8vIGFsd2F5cyBpbnRlcmZhY2Ugd2l0aCB0aGlzIG1ldGhvZCBhc3luY2hyb25vdXNseS5cblxuLy8gICAgICAgICAgICAgLy8gT3B0aW9uYWxseSwgaWYgdHJ1ZSBpcyBnaXZlbiBhcyB0aGUgZnJvbVNlcnZlciBwYXJhbWV0ZXIsXG4vLyAgICAgICAgICAgICAvLyB0aGVuIHRoaXMgY2FjaGVkIHZhbHVlIHdpbGwgbm90IGJlIHVzZWQuXG5cbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlzQXV0aGVudGljYXRlZCgpICYmIGZyb21TZXJ2ZXIgIT09IHRydWUpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbihTZXNzaW9uLnVzZXIpO1xuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICAvLyBNYWtlIHJlcXVlc3QgR0VUIC9zZXNzaW9uLlxuLy8gICAgICAgICAgICAgLy8gSWYgaXQgcmV0dXJucyBhIHVzZXIsIGNhbGwgb25TdWNjZXNzZnVsTG9naW4gd2l0aCB0aGUgcmVzcG9uc2UuXG4vLyAgICAgICAgICAgICAvLyBJZiBpdCByZXR1cm5zIGEgNDAxIHJlc3BvbnNlLCB3ZSBjYXRjaCBpdCBhbmQgaW5zdGVhZCByZXNvbHZlIHRvIG51bGwuXG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbi8vICAgICAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5sb2dpbiA9IGZ1bmN0aW9uIChjcmVkZW50aWFscykge1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9sb2dpbicsIGNyZWRlbnRpYWxzKVxuLy8gICAgICAgICAgICAgICAgIC50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKVxuLy8gICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QoeyBtZXNzYWdlOiAnSW52YWxpZCBsb2dpbiBjcmVkZW50aWFscy4nfSk7XG4vLyAgICAgICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5zaWdudXAgPSBmdW5jdGlvbihjcmVkZW50aWFscyl7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuLy8gICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuLy8gICAgICAgICAgICAgICAgIHVybDogJy9zaWdudXAnLFxuLy8gICAgICAgICAgICAgICAgIGRhdGE6IGNyZWRlbnRpYWxzXG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5kYXRhKVxuLy8gICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKCl7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCh7bWVzc2FnZTogJ1RoYXQgZW1haWwgaXMgYWxyZWFkeSBiZWluZyB1c2VkLid9KTtcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5sb2dvdXQgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvbG9nb3V0JykudGhlbihmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgU2Vzc2lvbi5kZXN0cm95KCk7XG4vLyAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ291dFN1Y2Nlc3MpO1xuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5zZXJ2aWNlKCdTZXNzaW9uJywgZnVuY3Rpb24gKCRyb290U2NvcGUsIEFVVEhfRVZFTlRTKSB7XG5cbi8vICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4vLyAgICAgICAgICRyb290U2NvcGUuJG9uKEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCwgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgc2VsZi5kZXN0cm95KCk7XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XG5cbi8vICAgICAgICAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbiAodXNlcikge1xuLy8gICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgfSk7XG5cbi8vIH0oKSk7XG4iLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlcikgPT4ge1xuXHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnZGVja3MnLCB7XG5cdFx0dXJsOiAnZGVja3MvOnRlYW1pZCcsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9kZWNrcy9kZWNrcy5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnRGVja0N0cmwnLFxuXHRcdHJlc29sdmU6IHtcblx0XHRcdGRlY2tzOiAoR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcykgPT4gR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZChzdGF0ZVBhcmFtcy50ZWFtSWQpXG5cdFx0fVxuXHR9KVxuXG59KVxuXG5hcHAuY29udHJvbGxlcignRGVja0N0cmwnLCAoJHNjb3BlKSA9PiB7XG5cblxuXHRcbn0pIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIpID0+IHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdnYW1lJywge1xuICAgICAgICB1cmw6ICcvZ2FtZS86Z2FtZUlkJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL2dhbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdHYW1lQ3RybCcsXG4gICAgICAgIC8vIHJlc29sdmU6IHtcbiAgICAgICAgLy8gICAgIGdhbWUgOiAoR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcykgPT4gR2FtZUZhY3RvcnkuZ2V0R2FtZUJ5R2FtZUlkKCRzdGF0ZVBhcmFtcy5nYW1lSWQpXG4gICAgICAgIC8vIH1cbiAgICB9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0dhbWVDdHJsJywgKCRzY29wZSwgR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcywgJGxvY2FsU3RvcmFnZSwgQWN0aXZlR2FtZUZhY3RvcnkpID0+IHtcbiAgICAkc2NvcGUuZ2FtZUlkID0gJHN0YXRlUGFyYW1zLmdhbWVJZDtcbiAgICAvLyRzY29wZS5nYW1lSWQgPSAxMjtcbiAgICBjb25zdCBwbGF5ZXJJZCA9ICRsb2NhbFN0b3JhZ2UudXNlci5pZDtcbiAgICAvL2NvbnN0IHRlYW1JZCA9IDI7XG4gICAgY29uc3QgdGVhbUlkID0gJGxvY2FsU3RvcmFnZS50ZWFtLmlkXG4gICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHskc2NvcGUuZ2FtZUlkfS9gKTtcblxuICAgIGdhbWVSZWYub24oJ3ZhbHVlJywgZ2FtZVNuYXBzaG90ID0+IHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZ2FtZVNuYXBzaG90LnZhbCgpKVxuICAgICAgICAkc2NvcGUuZ2FtZSA9IGdhbWVTbmFwc2hvdC52YWwoKTtcbiAgICAgICAgJHNjb3BlLmdhbWVOYW1lID0gJHNjb3BlLmdhbWUuc2V0dGluZ3MubmFtZTtcbiAgICAgICAgaWYgKCRzY29wZS5nYW1lLnBsYXllcnNbcGxheWVySWRdLmhhbmQpe1xuICAgICAgICAgICAgJHNjb3BlLnBsYXllckhhbmQgPSAkc2NvcGUuZ2FtZS5wbGF5ZXJzW3BsYXllcklkXS5oYW5kO1xuICAgICAgICAgICAgJHNjb3BlLnBsYXllckhhbmRDb3VudCA9IE9iamVjdC5rZXlzKCRzY29wZS5wbGF5ZXJIYW5kKS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLmJsYWNrQ2FyZCA9ICRzY29wZS5nYW1lLmN1cnJlbnRCbGFja0NhcmRbMV0udGV4dDtcbiAgICAgICAgJHNjb3BlLmp1ZGdlID0gJHNjb3BlLmdhbWUuY3VycmVudEp1ZGdlO1xuICAgICAgICAkc2NvcGUucGxheWVycyA9ICRzY29wZS5nYW1lLnBsYXllcnM7XG4gICAgICAgICRzY29wZS5zdWJtaXR0ZWRXaGl0ZUNhcmRzID0gJHNjb3BlLmdhbWUuc3VibWl0dGVkV2hpdGVDYXJkc1xuICAgICAgICAkc2NvcGUuJGV2YWxBc3luYygpO1xuICAgICAgICBpZiAoJHNjb3BlLmdhbWUud2lubmluZ0NhcmQpe1xuICAgICAgICAgICAgJHNjb3BlLndpbm5pbmdDYXJkID0gJHNjb3BlLmdhbWUud2lubmluZ0NhcmRcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAkc2NvcGUuc2hvd0NhcmRzID0gZmFsc2U7XG4gICAgJHNjb3BlLnN1Ym1pdHRlZCA9IGZhbHNlO1xuXG4gICAgJHNjb3BlLm9uU3dpcGVEb3duID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWQoZ2FtZUlkKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgQWN0aXZlR2FtZUZhY3RvcnkucmVmaWxsTXlIYW5kKCRzY29wZS5nYW1lSWQsIHBsYXllcklkLCB0ZWFtSWQpXG4gICAgICAgICAgJHNjb3BlLnNob3dDYXJkcyA9IHRydWU7XG4gICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnBsYXllckhhbmQpXG4gICAgICAgICAgJHNjb3BlLiRldmFsQXN5bmMoKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAkc2NvcGUub25Eb3VibGVUYXAgPSAoY2FyZElkLCBjYXJkVGV4dCkgPT4ge1xuICAgICAgICBBY3RpdmVHYW1lRmFjdG9yeS5zdWJtaXRXaGl0ZUNhcmQocGxheWVySWQsIGNhcmRJZCwgJHNjb3BlLmdhbWVJZCwgdGVhbUlkLCBjYXJkVGV4dClcbiAgICAgICAgLy8kc2NvcGUuZ2V0U3VibWl0dGVkUGxheWVycygpO1xuICAgICAgICAkc2NvcGUuc3VibWl0dGVkID0gdHJ1ZTtcbiAgICAgICAgJHNjb3BlLiRldmFsQXN5bmMoKTtcbiAgICB9XG5cbiAgICAkc2NvcGUuanVkZ2VEb3VibGVUYXAgPSAoY2FyZElkKSA9PiB7XG4gICAgICAgIC8vIGlmIChwbGF5ZXJJZCA9PT0ganVkZ2UpIHtcbiAgICAgICAgICAgIEFjdGl2ZUdhbWVGYWN0b3J5LnBpY2tXaW5uaW5nV2hpdGVDYXJkKGNhcmRJZCwgJHNjb3BlLmdhbWVJZCwgdGVhbUlkKVxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJqdWRnaW5nXCIpXG4gICAgICAgIC8vIH1cbiAgICB9XG5cblxuICAgIC8vICRzY29wZS5nZXRTdWJtaXR0ZWRQbGF5ZXJzID0gKCkgPT4ge1xuICAgIC8vICAgICAkc2NvcGUucGxheWVyc1RvU3VibWl0ID0gIF8ua2V5QnkoJHNjb3BlLnN1Ym1pdHRlZFdoaXRlQ2FyZHMsIGNhcmQgPT4ge1xuICAgIC8vICAgICAgICAgcmV0dXJuIGNhcmQuc3VibWl0dGVkQnk7XG4gICAgLy8gICAgIH0pXG4gICAgLy8gfVxuXG59KVxuXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgdXJsOiAnLycsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9ob21lL2hvbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGdhbWVzOiAoR2FtZUZhY3RvcnkpID0+IEdhbWVGYWN0b3J5LmdldEdhbWVzQnlVc2VySWQoKSxcbiAgICAgICAgICAgIG9wZW5HYW1lczogKEdhbWVGYWN0b3J5KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2dldHRpbmcgdGhlIGdhbWVzJylcbiAgICAgICAgICAgICAgICByZXR1cm4gR2FtZUZhY3RvcnkuZ2V0T3BlbkdhbWVzKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignSG9tZUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSwgJGNvcmRvdmFPYXV0aCwgVXNlckZhY3RvcnksIEdhbWVGYWN0b3J5LCAkbG9jYWxTdG9yYWdlLCAkaW9uaWNQb3B1cCwgZ2FtZXMsIG9wZW5HYW1lcykge1xuICAgICRzY29wZS5zdGFydE5ld0dhbWUgPSBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWU7XG4gICAgJHNjb3BlLnN0b3JhZ2UgPSAkbG9jYWxTdG9yYWdlO1xuICAgICRzY29wZS5nYW1lcyA9IGdhbWVzO1xuICAgIC8vJHNjb3BlLm9wZW5HYW1lcyA9IG9wZW5HYW1lcztcblxuICAgIGNvbnNvbGUubG9nKFwiZ2FtZXNcIiwgSlNPTi5zdHJpbmdpZnkoJHNjb3BlLmdhbWVzKSlcbiAgICAkc2NvcGUuZ29Ub05ld0dhbWUgPSAoKSA9PiB7XG4gICAgICAgICRzdGF0ZS5nbygnbmV3LWdhbWUubWFpbicpXG4gICAgfVxuXG4gICAgJHNjb3BlLm9wZW5HYW1lcyA9IG9wZW5HYW1lc1xuXG5cbiAgICAvLyAkc2NvcGUuam9pbkdhbWUgPSBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWQ7XG5cbiAgICAvLyAkc2NvcGUuc2hvd1BvcHVwID0gZnVuY3Rpb24oZ2FtZUlkKSB7XG5cbiAgICAvLyAgICAgJHNjb3BlLmdhbWUgPSAkc2NvcGUuZ2FtZXNbZ2FtZUlkXTtcbiAgICAvLyAgICAgJHNjb3BlLmdhbWVOYW1lID0gJHNjb3BlLmdhbWUuc2V0dGluZ3MubmFtZTtcbiAgICAvLyAgICAgJHNjb3BlLnBsYXllckNvdW50ID0gT2JqZWN0LmtleXMoJHNjb3BlLmdhbWUucGxheWVycykubGVuZ3RoO1xuICAgIC8vICAgICAkc2NvcGUud2FpdGluZ0ZvclBsYXllcnMgPSAgKCRzY29wZS5nYW1lLnNldHRpbmdzLm1pblBsYXllcnMgfHwgNCkgLSAkc2NvcGUucGxheWVyQ291bnQ7XG5cbiAgICAvLyAgICAgIGNvbnN0IG15UG9wdXAgPSAkaW9uaWNQb3B1cC5zaG93KHtcbiAgICAvLyAgICAgICAgIHRlbXBsYXRlVXJsOiAnanMvaG9tZS9wb3B1cC5odG1sJyxcbiAgICAvLyAgICAgICAgIHRpdGxlOiAnSm9pbiAnICsgJHNjb3BlLmdhbWVOYW1lLFxuICAgIC8vICAgICAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAvLyAgICAgICAgIGJ1dHRvbnM6IFxuICAgIC8vICAgICAgICAgW1xuICAgIC8vICAgICAgICAgICAgIHt0ZXh0OiAnR28gYmFjayd9LFxuICAgIC8vICAgICAgICAgICAgIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgdGV4dDogJ0pvaW4gZ2FtZScsXG4gICAgLy8gICAgICAgICAgICAgICAgIHR5cGU6ICdidXR0b24tYmFsYW5jZWQnLFxuICAgIC8vICAgICAgICAgICAgICAgICBvblRhcDogZSA9PiB7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAkc2NvcGUuam9pbkdhbWUoZ2FtZUlkKTtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnZ2FtZS5hY3RpdmUtZ2FtZScsIHsgZ2FtZUlkOiBnYW1lSWQgfSlcbiAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIF1cbiAgICAvLyAgICAgfSlcbiAgICAvLyB9XG59KVxuXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbG9naW4nLCB7XG4gICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbG9naW4vbG9naW4uaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdMb2dpbkN0cmwnXG4gICAgfSlcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvbG9naW4nKTtcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdMb2dpbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSwgVXNlckZhY3RvcnksICRjb3Jkb3ZhT2F1dGgsICRsb2NhbFN0b3JhZ2UsICR0aW1lb3V0LCAkaW9uaWNTaWRlTWVudURlbGVnYXRlKSB7XG4gICAgJHNjb3BlLmxvZ2luV2l0aFNsYWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBVc2VyRmFjdG9yeS5nZXRTbGFja0NyZWRzKClcbiAgICAgICAgICAgIC50aGVuKGNyZWRzID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGNvcmRvdmFPYXV0aC5zbGFjayhjcmVkcy5jbGllbnRJRCwgY3JlZHMuY2xpZW50U2VjcmV0LCBbJ2lkZW50aXR5LmJhc2ljJywgJ2lkZW50aXR5LnRlYW0nLCAnaWRlbnRpdHkuYXZhdGFyJ10pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oaW5mbyA9PiBVc2VyRmFjdG9yeS5zZXRVc2VyKGluZm8pKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gJHN0YXRlLmdvKCdob21lJykpXG4gICAgfVxuXG4gICAgJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZS5jYW5EcmFnQ29udGVudChmYWxzZSk7XG5cbiAgICAkc2NvcGUuJG9uKCckaW9uaWNWaWV3LmxlYXZlJywgZnVuY3Rpb24oKSB7ICRpb25pY1NpZGVNZW51RGVsZWdhdGUuY2FuRHJhZ0NvbnRlbnQodHJ1ZSkgfSk7XG5cbiAgICAkc2NvcGUuc3RvcmFnZSA9ICRsb2NhbFN0b3JhZ2VcblxuICAgIGZ1bmN0aW9uIHJlZGlyZWN0VXNlcigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzY29wZSBzdG9yYWdlIHVzZXJcIiwgJHNjb3BlLnN0b3JhZ2UudXNlcilcbiAgICAgICAgaWYgKCRzY29wZS5zdG9yYWdlLnVzZXIpICRzdGF0ZS5nbygnaG9tZScpXG4gICAgfVxuXG4gICAgcmVkaXJlY3RVc2VyKCk7XG59KVxuXG4iLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSA9PiB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbmV3LWdhbWUnLCB7XG4gICAgICAgIHVybDogJy9uZXctZ2FtZScsXG4gICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL21haW4uaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdOZXdHYW1lQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIHRlYW1EZWNrczogKEdhbWVGYWN0b3J5KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05hdmlnYXRpbmcgdG8gc3RhdGUgb3IgdHJ5aW5nIHRvIGhlbGxvJylcbiAgICAgICAgICAgICAgICByZXR1cm4gR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RhbmRhcmREZWNrOiAoR2FtZUZhY3RvcnkpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoMSlcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ25ldy1nYW1lLm1haW4nLCB7XG4gICAgICAgIHVybDogJy9zZXR1cC1nYW1lJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9uZXctZ2FtZS5odG1sJyxcbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5hZGQtZGVja3MnLCB7XG4gICAgICAgIHVybDogJy9hZGQtZGVja3MnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL2FkZC1kZWNrcy5odG1sJyxcbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5kZWNrJywge1xuICAgICAgICB1cmw6ICcvZGVjay86ZGVja0lkJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9kZWNrLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnRGVja0N0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBjYXJkczogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldENhcmRzQnlEZWNrSWQoJHN0YXRlUGFyYW1zLmRlY2tJZClcbiAgICAgICAgfVxuXG5cbiAgICB9KVxuXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL25ldy1nYW1lL3NldHVwLWdhbWUnKTtcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdOZXdHYW1lQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkc3RhdGUsIHRlYW1EZWNrcywgc3RhbmRhcmREZWNrKSA9PiB7XG4gICAgJHNjb3BlLmN1cnJlbnRWaWV3ID0gJ2FkZERlY2tzJ1xuICAgICRzY29wZS5nYW1lQ29uZmlnID0ge307XG4gICAgJHNjb3BlLmdhbWVDb25maWcuZGVja3MgPSB7fTtcbiAgICAkc2NvcGUuZ29Ub0RlY2tzID0gKCkgPT4ge1xuICAgICAgICAkc3RhdGUuZ28oJ25ldy1nYW1lLmFkZC1kZWNrcycsIHt9LCB7IGxvY2F0aW9uOiB0cnVlLCByZWxvYWQ6IHRydWUgfSlcbiAgICB9XG5cblxuXG4gICAgJHNjb3BlLmRlY2tzID0gc3RhbmRhcmREZWNrLmNvbmNhdCh0ZWFtRGVja3MpO1xuXG4gICAgJHNjb3BlLnN0YXJ0TmV3R2FtZSA9IChnYW1lQ29uZmlnKSA9PiB7XG4gICAgICAgIHJldHVybiBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWUoZ2FtZUNvbmZpZylcbiAgICAgICAgICAgIC50aGVuKChpZCkgPT4gR2FtZUZhY3RvcnkuYWRkUGlsZVRvR2FtZShpZCwgJHNjb3BlLmdhbWVDb25maWcuZGVja3MpKVxuICAgICAgICAgICAgLnRoZW4oKGlkKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ltIGhlcmUnKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCcjIyNHQU1FIFJVTEVTJywgJHNjb3BlLmdhbWVSdWxlcylcbiAgICAgICAgICAgICAgICAvLyRzY29wZS5nYW1lUnVsZXMuJHNldFByaXN0aW5lKCk7XG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdnYW1lJywgeyBnYW1lSWQ6IGlkIH0pXG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgJHNjb3BlLmFkZERlY2tzVG9HYW1lID0gR2FtZUZhY3RvcnkuYWRkRGVja3M7XG4gICAgLy8gJHNjb3BlLiRvbignY2hhbmdlZEdhbWUnLCAoZXZlbnQsIGRhdGEpID0+IHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ3JlY2VpdmVkIGV2ZW50JylcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ2RhdGEgb2JqOicsIGRhdGEpXG4gICAgLy8gICAgICRzY29wZS5nYW1lID0gZGF0YTtcbiAgICAvLyAgICAgJHNjb3BlLiRkaWdlc3QoKVxuXG4gICAgLy8gfSlcblxuXG59KVxuXG5hcHAuY29udHJvbGxlcignRGVja0N0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgJHN0YXRlLCBjYXJkcykgPT4ge1xuICAgICRzY29wZS5jYXJkcyA9IGNhcmRzXG59KVxuXG4iLCIvL0RpcmVjdGl2ZSBGaWxlIiwiYXBwLmRpcmVjdGl2ZSgnc3VibWl0dGVkQ2FyZHMnLCBmdW5jdGlvbigpe1xuXHRyZXR1cm4ge1xuXHRcdHJlc3RyaWN0OiAnRScsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9jb21tb24vZGlyZWN0aXZlcy9zdWJtaXR0ZWQtY2FyZHMuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0dhbWVDdHJsJ1xuXHR9XG59KSIsImFwcC5kaXJlY3RpdmUoJ3doaXRlQ2FyZHMnLCBmdW5jdGlvbigpe1xuXHRyZXR1cm4ge1xuXHRcdHJlc3RyaWN0OiAnRScsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9jb21tb24vZGlyZWN0aXZlcy93aGl0ZS1jYXJkcy5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnR2FtZUN0cmwnXG5cdH1cbn0pIiwiYXBwLmRpcmVjdGl2ZSgnd2lubmluZ0NhcmRzJywgZnVuY3Rpb24oKXtcblx0cmV0dXJuIHtcblx0XHRyZXN0cmljdDogJ0UnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvY29tbW9uL2RpcmVjdGl2ZXMvd2hpdGUtY2FyZHMuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0dhbWVDdHJsJ1xuXHR9XG59KSIsImFwcC5mYWN0b3J5KCdBY3RpdmVHYW1lRmFjdG9yeScsICgkaHR0cCwgJHJvb3RTY29wZSwgJGxvY2FsU3RvcmFnZSkgPT4ge1xuXG4gICAgY29uc3QgQWN0aXZlR2FtZUZhY3RvcnkgPSB7fTtcblxuICAgIGNvbnN0IHJlZmlsbGVyID0gKGNhcmRzTmVlZGVkLCBwaWxlUmVmLCBoYW5kUmVmKSA9PiB7XG4gICAgICAgIHJldHVybiBwaWxlUmVmLmxpbWl0VG9GaXJzdChjYXJkc05lZWRlZCkub25jZSgndmFsdWUnLCBjYXJkc1NuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICBjYXJkc1NuYXBzaG90LmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB1cGRhdGVPYmogPSB7fVxuICAgICAgICAgICAgICAgICAgICBjYXJkLnJlZi50cmFuc2FjdGlvbihjYXJkRGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlT2JqW2NhcmQua2V5XSA9IGNhcmREYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBoYW5kUmVmLnVwZGF0ZSh1cGRhdGVPYmopKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgIH1cblxuICAgIEFjdGl2ZUdhbWVGYWN0b3J5LnJlZmlsbE15SGFuZCA9IChnYW1lSWQsIHBsYXllcklkLCB0ZWFtSWQpID0+IHtcbiAgICAgICAgLy8gaG93IG1hbnkgY2FyZHMgZG8gSSBuZWVkP1xuICAgICAgICBjb25zb2xlLmxvZyhcInJlZmlsbGluZyBoYW5kXCIpXG4gICAgICAgIGxldCBjYXJkc05lZWRlZCA9IDBcbiAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgY29uc3QgaGFuZFJlZiA9IGdhbWVSZWYuY2hpbGQoYHBsYXllcnMvJHtwbGF5ZXJJZH0vaGFuZGApXG4gICAgICAgIGNvbnN0IHBpbGVSZWYgPSBnYW1lUmVmLmNoaWxkKCdwaWxlL3doaXRlY2FyZHMnKVxuICAgICAgICBoYW5kUmVmLm9uY2UoJ3ZhbHVlJywgaGFuZFNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICBjYXJkc05lZWRlZCA9IDcgLSBoYW5kU25hcHNob3QubnVtQ2hpbGRyZW4oKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZWZpbGxlcihjYXJkc05lZWRlZCwgcGlsZVJlZiwgaGFuZFJlZilcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1hZGUgaXQgdG8gcmVmaWxsZXJcIilcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgZmlyZWJhc2VNb3ZlU2luZ2xlS2V5VmFsdWUgPSAob2xkUmVmLCBuZXdSZWYpID0+IHtcbiAgICAgICAgbGV0IHJlbW92ZVVwZGF0ZSA9IHt9XG4gICAgICAgIGxldCBuZXdVcGRhdGUgPSB7fVxuICAgICAgICByZXR1cm4gb2xkUmVmLm9uY2UoJ3ZhbHVlJylcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICAgICAgICAgIC50aGVuKHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICByZW1vdmVVcGRhdGVbc25hcHNob3Qua2V5XSA9IG51bGxcbiAgICAgICAgICAgICAgICBuZXdVcGRhdGVbc25hcHNob3Qua2V5XSA9IHNuYXBzaG90LnZhbCgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1JlZi51cGRhdGUobmV3VXBkYXRlKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IG9sZFJlZi5wYXJlbnQudXBkYXRlKHJlbW92ZVVwZGF0ZSkpXG4gICAgfVxuXG5cbiAgICBBY3RpdmVHYW1lRmFjdG9yeS5zdWJtaXRXaGl0ZUNhcmQgPSAocGxheWVySWQsIGNhcmRJZCwgZ2FtZUlkLCB0ZWFtSWQsIGNhcmRUZXh0KSA9PiB7XG4gICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApO1xuICAgICAgICBjb25zdCBjYXJkVG9TdWJtaXQgPSBnYW1lUmVmLmNoaWxkKGBwbGF5ZXJzLyR7cGxheWVySWR9L2hhbmQvJHtjYXJkSWR9YCk7XG4gICAgICAgIGNvbnN0IHN1Ym1pdFJlZiA9IGdhbWVSZWYuY2hpbGQoJ3N1Ym1pdHRlZFdoaXRlQ2FyZHMnKTtcbiAgICAgICAgZmlyZWJhc2VNb3ZlU2luZ2xlS2V5VmFsdWUoY2FyZFRvU3VibWl0LCBzdWJtaXRSZWYpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgc3VibWl0UmVmLmNoaWxkKGNhcmRJZCkuc2V0KHtcbiAgICAgICAgICAgICAgICAgICAgc3VibWl0dGVkQnk6IHBsYXllcklkLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBjYXJkVGV4dFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgIH1cblxuXG4gICAgLy9uaWtpdGEncyB1cGRhdGVkIHZlcnNpb25cbiAgICAvLyBBY3RpdmVHYW1lRmFjdG9yeS5zdWJtaXRXaGl0ZUNhcmQgPSAocGxheWVySWQsIGNhcmRJZCwgZ2FtZUlkLCB0ZWFtSWQsIGNhcmRUZXh0KSA9PiB7XG4gICAgLy8gICBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKTtcbiAgICAvLyAgIGNvbnN0IGNhcmRUb1N1Ym1pdCA9IGdhbWVSZWYuY2hpbGQoYHBsYXllcnMvJHtwbGF5ZXJJZH0vaGFuZC8ke2NhcmRJZH0vdGV4dGApO1xuICAgIC8vICAgY29uc3Qgc3VibWl0UmVmID0gZ2FtZVJlZi5jaGlsZCgnc3VibWl0dGVkV2hpdGVDYXJkcycpO1xuICAgIC8vICAgbGV0IHRleHQgPSAnJ1xuICAgIC8vICAgcmV0dXJuIGNhcmRUb1N1Ym1pdC50cmFuc2FjdGlvbihjYXJkVGV4dCA9PiB7XG4gICAgLy8gICAgICAgdGV4dCA9IGNhcmRUZXh0XG4gICAgLy8gICAgICAgcmV0dXJuIG51bGxcbiAgICAvLyAgICAgfSlcbiAgICAvLyAgICAgLnRoZW4oKCkgPT4ge1xuICAgIC8vICAgICAgIGxldCB1cGRhdGVPYmogPSB7fTtcbiAgICAvLyAgICAgICB1cGRhdGVPYmpbcGxheWVySWRdLnRleHQgPSB0ZXh0O1xuICAgIC8vICAgICAgIHVwZGF0ZU9ialtwbGF5ZXJJZF0uY2FyZElkID0gY2FyZElkXG4gICAgLy8gICAgICAgcmV0dXJuIHN1Ym1pdFJlZi51cGRhdGUodXBkYXRlT2JqKVxuICAgIC8vICAgICB9KVxuICAgIC8vICAgICAudGhlbigoKSA9PiBjb25zb2xlLmxvZygnc3VibWlzc2lvbiBzdWNjZXNzJykpXG4gICAgLy8gICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgIC8vIH1cblxuXG5cbiAgICBBY3RpdmVHYW1lRmFjdG9yeS5waWNrV2lubmluZ1doaXRlQ2FyZCA9IChjYXJkSWQsIGdhbWVJZCwgdGVhbUlkKSA9PiB7XG4gICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApO1xuICAgICAgICBsZXQgd2lubmVyID0gZ2FtZVJlZi5jaGlsZChgc3VibWl0dGVkV2hpdGVDYXJkcy8ke2NhcmRJZH0vc3VibWl0dGVkQnlgKVxuICAgICAgICBjb25zdCB3aW5uaW5nQ2FyZCA9IGdhbWVSZWYuY2hpbGQoYHN1Ym1pdHRlZFdoaXRlQ2FyZHMvJHtjYXJkSWR9YClcbiAgICAgICAgY29uc29sZS5sb2coJ1dJTk5JTkcgQ0FSRCcsIHdpbm5pbmdDYXJkKVxuICAgICAgICBsZXQgYmxhY2tDYXJkSWQgPSAnJztcbiAgICAgICAgbGV0IGJsYWNrQ2FyZFdvbiA9IHt9XG4gICAgICAgIHdpbm5lci5vbmNlKCd2YWx1ZScpXG4gICAgICAgICAgICAudGhlbih3aW5uZXJJZCA9PiB7XG4gICAgICAgICAgICAgICAgd2lubmVyID0gd2lubmVySWQudmFsKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNldFJvdW5kU3RhdGVUb092ZXIgPSBnYW1lUmVmLmNoaWxkKCdzdGF0ZScpLnNldCgncG9zdHJvdW5kJylcbiAgICAgICAgICAgICAgICBjb25zdCBhd2FyZEJsYWNrQ2FyZCA9IGdhbWVSZWYuY2hpbGQoJ2N1cnJlbnRCbGFja0NhcmQnKS50cmFuc2FjdGlvbigoY3VycmVudEJsYWNrQ2FyZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmxhY2tDYXJkV29uID0gY3VycmVudEJsYWNrQ2FyZC5zbGljZSgwKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCIjIyMjQkxBQ0sgQ0FSRCBXT05cIiwgYmxhY2tDYXJkV29uKVxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FtZVJlZi5jaGlsZChgcGxheWVycy8ke3dpbm5lcn0vYmxhY2tDYXJkc1dvbmApLnNldChibGFja0NhcmRXb24pXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2lubmluZ0NhcmQub25jZSgndmFsdWUnKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbih3aW5uaW5nQ2FyZFNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdTTkFQU0hPVCcsIHdpbm5pbmdDYXJkU25hcHNob3QudmFsKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lubmluZ0NhcmRTbmFwc2hvdCA9IHdpbm5pbmdDYXJkU25hcHNob3QudmFsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2FtZVJlZi5jaGlsZChgd2lubmluZ0NhcmRgKS5zZXQod2lubmluZ0NhcmRTbmFwc2hvdClcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gZ2FtZVJlZi5jaGlsZCgnc3VibWl0dGVkV2hpdGVDYXJkcycpLnJlbW92ZSgpKVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbc2V0Um91bmRTdGF0ZVRvT3ZlciwgYXdhcmRCbGFja0NhcmRdKVxuICAgICAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gQWN0aXZlR2FtZUZhY3Rvcnk7XG59KTsiLCJhcHAuZmFjdG9yeSgnR2FtZUZhY3RvcnknLCAoJGh0dHAsICRyb290U2NvcGUsICRsb2NhbFN0b3JhZ2UpID0+IHtcblxuICAgICAgICBjb25zdCBvdXJJcHMgPSB7XG4gICAgICAgICAgICBuaWtpdGE6IFwiMTkyLjE2OC40LjIxM1wiLFxuICAgICAgICAgICAga2F5bGE6IFwiMTkyLjE2OC40LjIyNVwiLFxuICAgICAgICAgICAgbml0aHlhOiBcIjE5Mi4xNjguMS40OFwiLFxuICAgICAgICAgICAgZGFuOiBcIjE5Mi4xNjguNC4yMzZcIlxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY3VycmVudElwID0gb3VySXBzLmtheWxhO1xuXG4gICAgICAgIC8vIHN0YXJ0IGEgbmV3IGdhbWUgZGVycFxuICAgICAgICBjb25zdCBHYW1lRmFjdG9yeSA9IHt9O1xuICAgICAgICBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWUgPSAoZ2FtZUNvbmZpZykgPT4ge1xuICAgICAgICAgICAgLy9jYW4gYWxzbyBnZXQgYWxsIHRoZSBkZWNrcyBieSB0ZWFtIGhlcmUgdG8gcHJlcGFyZVxuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gJGxvY2FsU3RvcmFnZS50ZWFtLmlkIHx8IDI7XG4gICAgICAgICAgICBjb25zdCBjcmVhdG9ySWQgPSAkbG9jYWxTdG9yYWdlLnVzZXIuaWQgfHwgMztcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzYCwge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBnYW1lQ29uZmlnLm5hbWUgfHwgJ0FXRVNPTUUgTmFtZScsXG4gICAgICAgICAgICAgICAgICAgIHRlYW1JZDogdGVhbUlkLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdG9ySWQ6IGNyZWF0b3JJZCxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvck5hbWU6ICRsb2NhbFN0b3JhZ2UudXNlci5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczogZ2FtZUNvbmZpZ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2FtZUlkID0gcmVzLmRhdGFcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGAvdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICAgICAgICAgIGdhbWVSZWYub24oJ3ZhbHVlJywgc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdjaGFuZ2VkR2FtZScsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdhbWVJZDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9O1xuICAgICAgICAvLyBnZXQgYWxsIG9mIGEgZGVja3MgY2FyZHMgdG8gZGlzcGxheSB3aGVuIGxvb2tpbmcgYXQgZGVja3NcbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0Q2FyZHNCeURlY2tJZCA9IChpZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9kZWNrcy8ke2lkfS9jYXJkc2ApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBUT0RPOiBjb21iaW5lIHRoaXMgaW50byB0aGUgYWJvdmUgc3RhcnROZXdHYW1lIGZ1bmNcbiAgICAgICAgLy8gdGFrZSBhbGwgb2YgdGhlIHNlbGVjdGVkIGRlY2tzJyBjYXJkcyBhbmQgcHV0IHRoZW0gaW4gdGhlIGZpcmViYXNlIGdhbWUgb2JqZWN0IHBpbGUgKHRocm91Z2ggcm91dGUpXG4gICAgICAgIEdhbWVGYWN0b3J5LmFkZFBpbGVUb0dhbWUgPSAoZ2FtZUlkLCBkZWNrcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZGRpbmcgcGlsZSB0byBnYW1lXCIpXG4gICAgICAgICAgICBjb25zdCBkZWNrc0FyciA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgZGVja0lkIGluIGRlY2tzKSB7XG4gICAgICAgICAgICAgICAgZGVja3NBcnIucHVzaChkZWNrSWQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0vZGVja3NgLCB7XG4gICAgICAgICAgICAgICAgICAgICdkZWNrcyc6IGRlY2tzQXJyXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBnYW1lSWQpXG4gICAgICAgIH07XG5cbiAgICAgICAgR2FtZUZhY3Rvcnkuam9pbkdhbWVCeUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gJGxvY2FsU3RvcmFnZS50ZWFtLmlkO1xuICAgICAgICAgICAgY29uc3QgcGxheWVySWQgPSAkbG9jYWxTdG9yYWdlLnVzZXIuaWQ7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJOYW1lID0gJGxvY2FsU3RvcmFnZS51c2VyLm5hbWU7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfS9wbGF5ZXJzLyR7cGxheWVySWR9YClcbiAgICAgICAgICAgIHBsYXllclJlZi5zZXQoe1xuICAgICAgICAgICAgICAgIG5hbWU6IHBsYXllck5hbWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0vP3BsYXllcklkPSR7cGxheWVySWR9YClcbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkID0gKGlkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAodHlwZW9mIGlkICE9PSAnbnVtYmVyJykgPyAkbG9jYWxTdG9yYWdlLnRlYW0uaWQgOiBpZDsgLy8gaWQgfHwgbG9jYWxzdG9yYWdlIGRvZXNuJ3Qgd29yayBiZWNhdXNlIDAgaXMgZmFsc2V5XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2RlY2tzP3RlYW09JHt0ZWFtSWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG5cbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRVc2Vyc0J5R2FtZUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0vdXNlcnNgKTtcbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRHYW1lQnlHYW1lSWQgPSAoZ2FtZUlkLCB0ZWFtSWQpID0+IHtcbiAgICAgICAgICAgIHRlYW1JZCA9IHRlYW1JZCB8fCAkbG9jYWxTdG9yYWdlLnRlYW0uaWRcbiAgICAgICAgICAgIGNvbnN0IGdhbWVzUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAgICAgcmV0dXJuIGdhbWVzUmVmLm9uY2UoJ3ZhbHVlJykudGhlbihzbmFwc2hvdCA9PiBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VGVhbUlkID0gKHRlYW1JZCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCIjIyNURUFNIElEXCIsIHRlYW1JZClcbiAgICAgICAgICAgIHRlYW1JZCA9IHRlYW1JZCB8fCAkbG9jYWxTdG9yYWdlLnRlYW0uaWRcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGUgdGVhbSBpZCBpczonLCB0ZWFtSWQpXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzLz90ZWFtSWQ9JHt0ZWFtSWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlVc2VySWQgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzLz91c2VySWQ9JHskbG9jYWxTdG9yYWdlLnVzZXIuaWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKTtcbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRPcGVuR2FtZXMgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAkbG9jYWxTdG9yYWdlLnRlYW0uaWQ7XG4gICAgICAgICAgICBjb25zdCB1c2VySWQgPSAkbG9jYWxTdG9yYWdlLnVzZXIuaWQ7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzLz90ZWFtSWQ9JHt0ZWFtSWR9JnVzZXJJZD0ke3VzZXJJZH0mb3Blbj10cnVlYClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gR2FtZUZhY3Rvcnk7XG4gICAgfVxuXG4pO1xuXG4iLCJhcHAuZmFjdG9yeSgnVXNlckZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCwgJGxvY2FsU3RvcmFnZSkge1xuICAgIGNvbnN0IG91cklwcyA9IHtcbiAgICAgICAgbmlraXRhOiBcIjE5Mi4xNjguNC4yMTNcIixcbiAgICAgICAga2F5bGE6IFwiMTkyLjE2OC40LjIyNVwiLFxuICAgICAgICBuaXRoeWE6IFwiMTkyLjE2OC4xLjQ4XCIsXG4gICAgICAgIGRhbjogXCIxOTIuMTY4LjQuMjM2XCJcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50SXAgPSBvdXJJcHMua2F5bGFcblxuICAgIHJldHVybiB7XG4gICAgICAgIHNldFVzZXI6IGZ1bmN0aW9uKGluZm8pIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL3VzZXJzYCxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBpbmZvXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldExvY2FsU3RvcmFnZShyZXMuZGF0YS51c2VyWzBdLCByZXMuZGF0YS50ZWFtWzBdKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBnZXRTbGFja0NyZWRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvc2xhY2tgKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuZGF0YVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGdldFNsYWNrSW5mbzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdodHRwczovL3NsYWNrLmNvbS9hcGkvdXNlcnMuaWRlbnRpdHknKVxuICAgICAgICB9LFxuXG4gICAgICAgIHNldExvY2FsU3RvcmFnZTogZnVuY3Rpb24odXNlciwgdGVhbSkge1xuICAgICAgICAgICAgJGxvY2FsU3RvcmFnZS51c2VyID0gdXNlcjtcbiAgICAgICAgICAgICRsb2NhbFN0b3JhZ2UudGVhbSA9IHRlYW07XG4gICAgICAgIH0sXG5cbiAgICAgICAgbG9nT3V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRsb2NhbFN0b3JhZ2UuJHJlc2V0KCk7XG4gICAgICAgIH1cbiAgICB9XG59KVxuXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
