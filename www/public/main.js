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
        return $http.post('https://blankagainsthumanity.herokuapp.com/api/games', {
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
        return $http.get('https://blankagainsthumanity.herokuapp.com/api/decks/' + id + '/cards').then(function (res) {
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
        return $http.post('https://blankagainsthumanity.herokuapp.com/api/games/' + gameId + '/decks', {
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
        return $http.post('https://blankagainsthumanity.herokuapp.com/api/games/' + gameId + '/?playerId=' + playerId);
    };

    GameFactory.getDecksByTeamId = function (id) {
        var teamId = typeof id !== 'number' ? $localStorage.team.id : id; // id || localstorage doesn't work because 0 is falsey
        return $http.get('https://blankagainsthumanity.herokuapp.com/api/decks?team=' + teamId).then(function (res) {
            return res.data;
        });
    };

    GameFactory.getUsersByGameId = function (gameId) {
        return $http.get('https://blankagainsthumanity.herokuapp.com/api/games/' + gameId + '/users');
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
        return $http.get('https://blankagainsthumanity.herokuapp.com/api/games/?teamId=' + teamId).then(function (res) {
            return res.data;
        }).catch(function (err) {
            return console.log(err);
        });
    };

    GameFactory.getGamesByUserId = function () {
        console.log('getGamesByUserId called');
        return $http.jsonp('https://blankagainsthumanity.herokuapp.com/api/games/?userId=' + $localStorage.user.id).then(function (res) {
            console.log('resolved');
            return res.data;
        }).catch(function (err) {
            return console.log(err);
        });
    };

    GameFactory.getOpenGames = function () {
        console.log('getGamesByUserId called');
        var teamId = $localStorage.team.id;
        var userId = $localStorage.user.id;
        return $http.get('https://blankagainsthumanity.herokuapp.com/api/games/?teamId=' + teamId + '&userId=' + userId + '&open=true').then(function (res) {
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
                url: 'https://blankagainsthumanity.herokuapp.com/api/users',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: info
            }).then(function (res) {
                _this.setLocalStorage(res.data.user[0], res.data.team[0]);
            });
        },
        getSlackCreds: function getSlackCreds() {
            return $http.get('https://blankagainsthumanity.herokuapp.com/api/slack').then(function (res) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImNhcmRzLXRlc3QvY2FyZHNUZXN0LmpzIiwiZGVja3MvZGVja3MuanMiLCJmcm9tIGZzZy9mcm9tLWZzZy5qcyIsImdhbWUvZ2FtZS5qcyIsImhvbWUvaG9tZS5qcyIsImxvZ2luL2xvZ2luLmpzIiwibmV3LWdhbWUvbmV3LWdhbWUuanMiLCJjb21tb24vZmFjdG9yaWVzL0FjdGl2ZUdhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9HYW1lRmFjdG9yeS5qcyIsImNvbW1vbi9mYWN0b3JpZXMvdXNlckZhY3RvcnkuanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiLCJjb21tb24vZGlyZWN0aXZlcy9zdWJtaXR0ZWQtY2FyZHMuanMiLCJjb21tb24vZGlyZWN0aXZlcy93aGl0ZS1jYXJkcy5qcyIsImNvbW1vbi9kaXJlY3RpdmVzL3dpbm5pbmctY2FyZC5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJhcHAiLCJhbmd1bGFyIiwibW9kdWxlIiwicnVuIiwiJGlvbmljUGxhdGZvcm0iLCJyZWFkeSIsImNvcmRvdmEiLCJwbHVnaW5zIiwiS2V5Ym9hcmQiLCJoaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIiLCJkaXNhYmxlU2Nyb2xsIiwiU3RhdHVzQmFyIiwic3R5bGVMaWdodENvbnRlbnQiLCIkcm9vdFNjb3BlIiwiJG9uIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJhcmd1bWVudHMiLCJjb250cm9sbGVyIiwiJHNjb3BlIiwiVXNlckZhY3RvcnkiLCIkc3RhdGUiLCIkbG9jYWxTdG9yYWdlIiwiJHRpbWVvdXQiLCJsb2dPdXQiLCJnbyIsImNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwic3RhdGUiLCJ1cmwiLCJ0ZW1wbGF0ZVVybCIsImdyZWV0aW5nIiwicmVzb2x2ZSIsImRlY2tzIiwiR2FtZUZhY3RvcnkiLCIkc3RhdGVQYXJhbXMiLCJnZXREZWNrc0J5VGVhbUlkIiwic3RhdGVQYXJhbXMiLCJ0ZWFtSWQiLCJBY3RpdmVHYW1lRmFjdG9yeSIsImdhbWVJZCIsInBsYXllcklkIiwidXNlciIsImlkIiwidGVhbSIsImdhbWVSZWYiLCJmaXJlYmFzZSIsImRhdGFiYXNlIiwicmVmIiwib24iLCJnYW1lIiwiZ2FtZVNuYXBzaG90IiwidmFsIiwiZ2FtZU5hbWUiLCJzZXR0aW5ncyIsIm5hbWUiLCJwbGF5ZXJzIiwiaGFuZCIsInBsYXllckhhbmQiLCJwbGF5ZXJIYW5kQ291bnQiLCJPYmplY3QiLCJrZXlzIiwibGVuZ3RoIiwiYmxhY2tDYXJkIiwiY3VycmVudEJsYWNrQ2FyZCIsInRleHQiLCJqdWRnZSIsImN1cnJlbnRKdWRnZSIsInN1Ym1pdHRlZFdoaXRlQ2FyZHMiLCIkZXZhbEFzeW5jIiwid2lubmluZ0NhcmQiLCJzaG93Q2FyZHMiLCJzdWJtaXR0ZWQiLCJvblN3aXBlRG93biIsImpvaW5HYW1lQnlJZCIsInRoZW4iLCJyZWZpbGxNeUhhbmQiLCJvbkRvdWJsZVRhcCIsImNhcmRJZCIsImNhcmRUZXh0Iiwic3VibWl0V2hpdGVDYXJkIiwianVkZ2VEb3VibGVUYXAiLCJwaWNrV2lubmluZ1doaXRlQ2FyZCIsIiR1cmxSb3V0ZXJQcm92aWRlciIsImNhY2hlIiwiZ2FtZXMiLCJnZXRHYW1lc0J5VXNlcklkIiwib3BlbkdhbWVzIiwiZ2V0T3BlbkdhbWVzIiwiJGNvcmRvdmFPYXV0aCIsIiRpb25pY1BvcHVwIiwic3RhcnROZXdHYW1lIiwic3RvcmFnZSIsImdvVG9OZXdHYW1lIiwib3RoZXJ3aXNlIiwiJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZSIsImxvZ2luV2l0aFNsYWNrIiwiZ2V0U2xhY2tDcmVkcyIsInNsYWNrIiwiY3JlZHMiLCJjbGllbnRJRCIsImNsaWVudFNlY3JldCIsInNldFVzZXIiLCJpbmZvIiwiY2FuRHJhZ0NvbnRlbnQiLCJyZWRpcmVjdFVzZXIiLCJhYnN0cmFjdCIsInRlYW1EZWNrcyIsInN0YW5kYXJkRGVjayIsImNhcmRzIiwiZ2V0Q2FyZHNCeURlY2tJZCIsImRlY2tJZCIsImN1cnJlbnRWaWV3IiwiZ2FtZUNvbmZpZyIsImdvVG9EZWNrcyIsImxvY2F0aW9uIiwicmVsb2FkIiwiY29uY2F0IiwiYWRkUGlsZVRvR2FtZSIsImFkZERlY2tzVG9HYW1lIiwiYWRkRGVja3MiLCJmYWN0b3J5IiwiJGh0dHAiLCJyZWZpbGxlciIsImNhcmRzTmVlZGVkIiwicGlsZVJlZiIsImhhbmRSZWYiLCJsaW1pdFRvRmlyc3QiLCJvbmNlIiwiY2FyZHNTbmFwc2hvdCIsImZvckVhY2giLCJ1cGRhdGVPYmoiLCJjYXJkIiwidHJhbnNhY3Rpb24iLCJrZXkiLCJjYXJkRGF0YSIsInVwZGF0ZSIsImNhdGNoIiwiZXJyIiwiY2hpbGQiLCJoYW5kU25hcHNob3QiLCJudW1DaGlsZHJlbiIsImZpcmViYXNlTW92ZVNpbmdsZUtleVZhbHVlIiwib2xkUmVmIiwibmV3UmVmIiwicmVtb3ZlVXBkYXRlIiwibmV3VXBkYXRlIiwic25hcHNob3QiLCJwYXJlbnQiLCJjYXJkVG9TdWJtaXQiLCJzdWJtaXRSZWYiLCJzZXQiLCJzdWJtaXR0ZWRCeSIsIndpbm5lciIsImJsYWNrQ2FyZElkIiwiYmxhY2tDYXJkV29uIiwid2lubmVySWQiLCJzZXRSb3VuZFN0YXRlVG9PdmVyIiwiYXdhcmRCbGFja0NhcmQiLCJ3aW5uaW5nQ2FyZFNuYXBzaG90IiwicmVtb3ZlIiwiUHJvbWlzZSIsImFsbCIsIm91cklwcyIsIm5pa2l0YSIsImtheWxhIiwibml0aHlhIiwiZGFuIiwiY3VycmVudElwIiwiY3JlYXRvcklkIiwicG9zdCIsImNyZWF0b3JOYW1lIiwicmVzIiwiZGF0YSIsIiRicm9hZGNhc3QiLCJnZXQiLCJkZWNrc0FyciIsInB1c2giLCJwbGF5ZXJOYW1lIiwicGxheWVyUmVmIiwiZ2V0VXNlcnNCeUdhbWVJZCIsImdldEdhbWVCeUdhbWVJZCIsImdhbWVzUmVmIiwiZ2V0R2FtZXNCeVRlYW1JZCIsImpzb25wIiwidXNlcklkIiwibWV0aG9kIiwiaGVhZGVycyIsInNldExvY2FsU3Rv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QUF5QixNQUFBcUQsR0FBQSx5REFDQXBHLElBREEsQ0FDQSxlQUFBO0FBQ0EsdUJBQUFpRyxJQUFBQyxJQUFBO0FBQ0EsYUFIQSxDQUFBO0FBSUEsU0FuQkE7QUFvQkFnQixzQkFBQSx3QkFBQTtBQUNBLG1CQUFBbkUsTUFBQXFELEdBQUEsQ0FBQSxzQ0FBQSxDQUFBO0FBQ0EsU0F0QkE7O0FBd0JBYSx5QkFBQSx5QkFBQWxKLElBQUEsRUFBQUUsSUFBQSxFQUFBO0FBQ0F0QiwwQkFBQW9CLElBQUEsR0FBQUEsSUFBQTtBQUNBcEIsMEJBQUFzQixJQUFBLEdBQUFBLElBQUE7QUFDQSxTQTNCQTs7QUE2QkFwQixnQkFBQSxrQkFBQTtBQUNBRiwwQkFBQXdLLE1BQUE7QUFDQTtBQS9CQSxLQUFBO0FBaUNBLENBM0NBOztBQ0FBO0FDQUFoTSxJQUFBaU0sU0FBQSxDQUFBLGdCQUFBLEVBQUEsWUFBQTtBQUNBLFdBQUE7QUFDQUMsa0JBQUEsR0FEQTtBQUVBbEsscUJBQUEsMkNBRkE7QUFHQVosb0JBQUE7QUFIQSxLQUFBO0FBS0EsQ0FOQTtBQ0FBcEIsSUFBQWlNLFNBQUEsQ0FBQSxZQUFBLEVBQUEsWUFBQTtBQUNBLFdBQUE7QUFDQUMsa0JBQUEsR0FEQTtBQUVBbEsscUJBQUEsdUNBRkE7QUFHQVosb0JBQUE7QUFIQSxLQUFBO0FBS0EsQ0FOQTtBQ0FBcEIsSUFBQWlNLFNBQUEsQ0FBQSxjQUFBLEVBQUEsWUFBQTtBQUNBLFdBQUE7QUFDQUMsa0JBQUEsR0FEQTtBQUVBbEsscUJBQUEsdUNBRkE7QUFHQVosb0JBQUE7QUFIQSxLQUFBO0FBS0EsQ0FOQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW9uaWMgU3RhcnRlciBBcHBcblxuLy8gYW5ndWxhci5tb2R1bGUgaXMgYSBnbG9iYWwgcGxhY2UgZm9yIGNyZWF0aW5nLCByZWdpc3RlcmluZyBhbmQgcmV0cmlldmluZyBBbmd1bGFyIG1vZHVsZXNcbi8vICdzdGFydGVyJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xuXG53aW5kb3cuYXBwID0gYW5ndWxhci5tb2R1bGUoJ0JsYW5rQWdhaW5zdEh1bWFuaXR5JywgWydpb25pYycsICd1aS5yb3V0ZXInLCAnbmdDb3Jkb3ZhJywgJ25nQ29yZG92YU9hdXRoJywgJ25nU3RvcmFnZScsICduZ0FuaW1hdGUnXSlcblxuXG5hcHAucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtKSB7XG4gICAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICAgICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAgICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuXG4gICAgICAgICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcbiAgICAgICAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxuICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgICAgICAgIFN0YXR1c0Jhci5zdHlsZUxpZ2h0Q29udGVudCgpXG4gICAgICAgIH1cbiAgICB9KTtcblxufSlcblxuYXBwLnJ1bihmdW5jdGlvbigkcm9vdFNjb3BlKSB7XG4gICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZUVycm9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGFyZ3VtZW50c1s1XSkpO1xuICAgIH0pO1xufSk7XG5cbiIsImFwcC5jb250cm9sbGVyKCdMb2dvdXRDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBVc2VyRmFjdG9yeSwgJHN0YXRlLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCl7XG5cdCRzY29wZS5sb2dPdXQgPSBmdW5jdGlvbigpe1xuXHRcdFVzZXJGYWN0b3J5LmxvZ091dCgpXG5cdFx0JHN0YXRlLmdvKCdsb2dpbicpXG5cdH1cbn0pIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcil7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdjYXJkcycsIHtcblx0XHR1cmw6ICcvY2FyZHMnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvY2FyZHMtdGVzdC9jYXJkcy10ZXN0Lmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdDYXJkc1Rlc3RDdHJsJ1xuXHR9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0NhcmRzVGVzdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpe1xuIFx0JHNjb3BlLmdyZWV0aW5nID0gXCJISVwiXG59KSIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdkZWNrcycsIHtcblx0XHR1cmw6ICdkZWNrcy86dGVhbWlkJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2RlY2tzL2RlY2tzLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdEZWNrQ3RybCcsXG5cdFx0cmVzb2x2ZToge1xuXHRcdFx0ZGVja3M6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkKHN0YXRlUGFyYW1zLnRlYW1JZClcblx0XHR9XG5cdH0pXG5cbn0pXG5cbmFwcC5jb250cm9sbGVyKCdEZWNrQ3RybCcsICgkc2NvcGUpID0+IHtcblxuXG5cdFxufSkiLCIvLyAoZnVuY3Rpb24gKCkge1xuXG4vLyAgICAgJ3VzZSBzdHJpY3QnO1xuXG4vLyAgICAgLy8gSG9wZSB5b3UgZGlkbid0IGZvcmdldCBBbmd1bGFyISBEdWgtZG95LlxuLy8gICAgIGlmICghd2luZG93LmFuZ3VsYXIpIHRocm93IG5ldyBFcnJvcignSSBjYW5cXCd0IGZpbmQgQW5ndWxhciEnKTtcblxuLy8gICAgIHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnZnNhUHJlQnVpbHQnLCBbXSk7XG5cbi8vICAgICBhcHAuZmFjdG9yeSgnU29ja2V0JywgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICBpZiAoIXdpbmRvdy5pbykgdGhyb3cgbmV3IEVycm9yKCdzb2NrZXQuaW8gbm90IGZvdW5kIScpO1xuLy8gICAgICAgICByZXR1cm4gd2luZG93LmlvKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pO1xuLy8gICAgIH0pO1xuXG4vLyAgICAgLy8gQVVUSF9FVkVOVFMgaXMgdXNlZCB0aHJvdWdob3V0IG91ciBhcHAgdG9cbi8vICAgICAvLyBicm9hZGNhc3QgYW5kIGxpc3RlbiBmcm9tIGFuZCB0byB0aGUgJHJvb3RTY29wZVxuLy8gICAgIC8vIGZvciBpbXBvcnRhbnQgZXZlbnRzIGFib3V0IGF1dGhlbnRpY2F0aW9uIGZsb3cuXG4vLyAgICAgYXBwLmNvbnN0YW50KCdBVVRIX0VWRU5UUycsIHtcbi8vICAgICAgICAgbG9naW5TdWNjZXNzOiAnYXV0aC1sb2dpbi1zdWNjZXNzJyxcbi8vICAgICAgICAgbG9naW5GYWlsZWQ6ICdhdXRoLWxvZ2luLWZhaWxlZCcsXG4vLyAgICAgICAgIGxvZ291dFN1Y2Nlc3M6ICdhdXRoLWxvZ291dC1zdWNjZXNzJyxcbi8vICAgICAgICAgc2Vzc2lvblRpbWVvdXQ6ICdhdXRoLXNlc3Npb24tdGltZW91dCcsXG4vLyAgICAgICAgIG5vdEF1dGhlbnRpY2F0ZWQ6ICdhdXRoLW5vdC1hdXRoZW50aWNhdGVkJyxcbi8vICAgICAgICAgbm90QXV0aG9yaXplZDogJ2F1dGgtbm90LWF1dGhvcml6ZWQnXG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuZmFjdG9yeSgnQXV0aEludGVyY2VwdG9yJywgZnVuY3Rpb24gKCRyb290U2NvcGUsICRxLCBBVVRIX0VWRU5UUykge1xuLy8gICAgICAgICB2YXIgc3RhdHVzRGljdCA9IHtcbi8vICAgICAgICAgICAgIDQwMTogQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCxcbi8vICAgICAgICAgICAgIDQwMzogQVVUSF9FVkVOVFMubm90QXV0aG9yaXplZCxcbi8vICAgICAgICAgICAgIDQxOTogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsXG4vLyAgICAgICAgICAgICA0NDA6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0XG4vLyAgICAgICAgIH07XG4vLyAgICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgICAgICByZXNwb25zZUVycm9yOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3Qoc3RhdHVzRGljdFtyZXNwb25zZS5zdGF0dXNdLCByZXNwb25zZSk7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXNwb25zZSlcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfTtcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5jb25maWcoZnVuY3Rpb24gKCRodHRwUHJvdmlkZXIpIHtcbi8vICAgICAgICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaChbXG4vLyAgICAgICAgICAgICAnJGluamVjdG9yJyxcbi8vICAgICAgICAgICAgIGZ1bmN0aW9uICgkaW5qZWN0b3IpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJGluamVjdG9yLmdldCgnQXV0aEludGVyY2VwdG9yJyk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIF0pO1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLnNlcnZpY2UoJ0F1dGhTZXJ2aWNlJywgZnVuY3Rpb24gKCRodHRwLCBTZXNzaW9uLCAkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUywgJHEpIHtcblxuLy8gICAgICAgICBmdW5jdGlvbiBvblN1Y2Nlc3NmdWxMb2dpbihyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgdmFyIHVzZXIgPSByZXNwb25zZS5kYXRhLnVzZXI7XG4vLyAgICAgICAgICAgICBTZXNzaW9uLmNyZWF0ZSh1c2VyKTtcbi8vICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dpblN1Y2Nlc3MpO1xuLy8gICAgICAgICAgICAgcmV0dXJuIHVzZXI7XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICAvLyBVc2VzIHRoZSBzZXNzaW9uIGZhY3RvcnkgdG8gc2VlIGlmIGFuXG4vLyAgICAgICAgIC8vIGF1dGhlbnRpY2F0ZWQgdXNlciBpcyBjdXJyZW50bHkgcmVnaXN0ZXJlZC5cbi8vICAgICAgICAgdGhpcy5pc0F1dGhlbnRpY2F0ZWQgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gISFTZXNzaW9uLnVzZXI7XG4vLyAgICAgICAgIH07XG5cbiAgICAgICAgXG4vLyAgICAgICAgIHRoaXMuaXNBZG1pbiA9IGZ1bmN0aW9uKHVzZXJJZCl7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZygncnVubmluZyBhZG1pbiBmdW5jJylcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJylcbi8vICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEudXNlci5pc0FkbWluKVxuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgdGhpcy5nZXRMb2dnZWRJblVzZXIgPSBmdW5jdGlvbiAoZnJvbVNlcnZlcikge1xuXG4vLyAgICAgICAgICAgICAvLyBJZiBhbiBhdXRoZW50aWNhdGVkIHNlc3Npb24gZXhpc3RzLCB3ZVxuLy8gICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSB1c2VyIGF0dGFjaGVkIHRvIHRoYXQgc2Vzc2lvblxuLy8gICAgICAgICAgICAgLy8gd2l0aCBhIHByb21pc2UuIFRoaXMgZW5zdXJlcyB0aGF0IHdlIGNhblxuLy8gICAgICAgICAgICAgLy8gYWx3YXlzIGludGVyZmFjZSB3aXRoIHRoaXMgbWV0aG9kIGFzeW5jaHJvbm91c2x5LlxuXG4vLyAgICAgICAgICAgICAvLyBPcHRpb25hbGx5LCBpZiB0cnVlIGlzIGdpdmVuIGFzIHRoZSBmcm9tU2VydmVyIHBhcmFtZXRlcixcbi8vICAgICAgICAgICAgIC8vIHRoZW4gdGhpcyBjYWNoZWQgdmFsdWUgd2lsbCBub3QgYmUgdXNlZC5cblxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuaXNBdXRoZW50aWNhdGVkKCkgJiYgZnJvbVNlcnZlciAhPT0gdHJ1ZSkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKFNlc3Npb24udXNlcik7XG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIC8vIE1ha2UgcmVxdWVzdCBHRVQgL3Nlc3Npb24uXG4vLyAgICAgICAgICAgICAvLyBJZiBpdCByZXR1cm5zIGEgdXNlciwgY2FsbCBvblN1Y2Nlc3NmdWxMb2dpbiB3aXRoIHRoZSByZXNwb25zZS5cbi8vICAgICAgICAgICAgIC8vIElmIGl0IHJldHVybnMgYSA0MDEgcmVzcG9uc2UsIHdlIGNhdGNoIGl0IGFuZCBpbnN0ZWFkIHJlc29sdmUgdG8gbnVsbC5cbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJykudGhlbihvblN1Y2Nlc3NmdWxMb2dpbikuY2F0Y2goZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuLy8gICAgICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmxvZ2luID0gZnVuY3Rpb24gKGNyZWRlbnRpYWxzKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2xvZ2luJywgY3JlZGVudGlhbHMpXG4vLyAgICAgICAgICAgICAgICAgLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pXG4vLyAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCh7IG1lc3NhZ2U6ICdJbnZhbGlkIGxvZ2luIGNyZWRlbnRpYWxzLid9KTtcbi8vICAgICAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLnNpZ251cCA9IGZ1bmN0aW9uKGNyZWRlbnRpYWxzKXtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4vLyAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4vLyAgICAgICAgICAgICAgICAgdXJsOiAnL3NpZ251cCcsXG4vLyAgICAgICAgICAgICAgICAgZGF0YTogY3JlZGVudGlhbHNcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4gcmVzdWx0LmRhdGEpXG4vLyAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oKXtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHttZXNzYWdlOiAnVGhhdCBlbWFpbCBpcyBhbHJlYWR5IGJlaW5nIHVzZWQuJ30pO1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmxvZ291dCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9sb2dvdXQnKS50aGVuKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICBTZXNzaW9uLmRlc3Ryb3koKTtcbi8vICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoQVVUSF9FVkVOVFMubG9nb3V0U3VjY2Vzcyk7XG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfTtcblxuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLnNlcnZpY2UoJ1Nlc3Npb24nLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMpIHtcblxuLy8gICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbi8vICAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCwgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgc2VsZi5kZXN0cm95KCk7XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgICRyb290U2NvcGUuJG9uKEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0LCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICBzZWxmLmRlc3Ryb3koKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcblxuLy8gICAgICAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uICh1c2VyKSB7XG4vLyAgICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICB9KTtcblxuLy8gfSgpKTtcbiIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnL2dhbWUvOmdhbWVJZCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvZ2FtZS9nYW1lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnR2FtZUN0cmwnLFxuICAgICAgICAvLyByZXNvbHZlOiB7XG4gICAgICAgIC8vICAgICBnYW1lIDogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldEdhbWVCeUdhbWVJZCgkc3RhdGVQYXJhbXMuZ2FtZUlkKVxuICAgICAgICAvLyB9XG4gICAgfSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdHYW1lQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMsICRsb2NhbFN0b3JhZ2UsIEFjdGl2ZUdhbWVGYWN0b3J5KSA9PiB7XG4gICAgJHNjb3BlLmdhbWVJZCA9ICRzdGF0ZVBhcmFtcy5nYW1lSWQ7XG4gICAgLy8kc2NvcGUuZ2FtZUlkID0gMTI7XG4gICAgY29uc3QgcGxheWVySWQgPSAkbG9jYWxTdG9yYWdlLnVzZXIuaWQ7XG4gICAgLy9jb25zdCB0ZWFtSWQgPSAyO1xuICAgIGNvbnN0IHRlYW1JZCA9ICRsb2NhbFN0b3JhZ2UudGVhbS5pZFxuICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7JHNjb3BlLmdhbWVJZH0vYCk7XG5cbiAgICBnYW1lUmVmLm9uKCd2YWx1ZScsIGdhbWVTbmFwc2hvdCA9PiB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGdhbWVTbmFwc2hvdC52YWwoKSlcbiAgICAgICAgJHNjb3BlLmdhbWUgPSBnYW1lU25hcHNob3QudmFsKCk7XG4gICAgICAgICRzY29wZS5nYW1lTmFtZSA9ICRzY29wZS5nYW1lLnNldHRpbmdzLm5hbWU7XG4gICAgICAgIGlmICgkc2NvcGUuZ2FtZS5wbGF5ZXJzW3BsYXllcklkXS5oYW5kKXtcbiAgICAgICAgICAgICRzY29wZS5wbGF5ZXJIYW5kID0gJHNjb3BlLmdhbWUucGxheWVyc1twbGF5ZXJJZF0uaGFuZDtcbiAgICAgICAgICAgICRzY29wZS5wbGF5ZXJIYW5kQ291bnQgPSBPYmplY3Qua2V5cygkc2NvcGUucGxheWVySGFuZCkubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgICRzY29wZS5ibGFja0NhcmQgPSAkc2NvcGUuZ2FtZS5jdXJyZW50QmxhY2tDYXJkWzFdLnRleHRcbiAgICAgICAgJHNjb3BlLmp1ZGdlID0gJHNjb3BlLmdhbWUuY3VycmVudEp1ZGdlO1xuICAgICAgICAkc2NvcGUucGxheWVycyA9ICRzY29wZS5nYW1lLnBsYXllcnM7XG4gICAgICAgICRzY29wZS5zdWJtaXR0ZWRXaGl0ZUNhcmRzID0gJHNjb3BlLmdhbWUuc3VibWl0dGVkV2hpdGVDYXJkc1xuICAgICAgICAkc2NvcGUuJGV2YWxBc3luYygpO1xuICAgICAgICBpZigkc2NvcGUuZ2FtZS53aW5uaW5nQ2FyZCl7XG4gICAgICAgICAgICAkc2NvcGUud2lubmluZ0NhcmQgPSAkc2NvcGUuZ2FtZS53aW5uaW5nQ2FyZFxuICAgICAgICB9XG4gICAgfSlcblxuICAgICRzY29wZS5zaG93Q2FyZHMgPSBmYWxzZTtcbiAgICAkc2NvcGUuc3VibWl0dGVkID0gZmFsc2U7XG5cbiAgICAkc2NvcGUub25Td2lwZURvd24gPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgIEdhbWVGYWN0b3J5LmpvaW5HYW1lQnlJZChnYW1lSWQpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBBY3RpdmVHYW1lRmFjdG9yeS5yZWZpbGxNeUhhbmQoJHNjb3BlLmdhbWVJZCwgcGxheWVySWQsIHRlYW1JZClcbiAgICAgICAgICAkc2NvcGUuc2hvd0NhcmRzID0gdHJ1ZTtcbiAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUucGxheWVySGFuZClcbiAgICAgICAgICAkc2NvcGUuJGV2YWxBc3luYygpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgICRzY29wZS5vbkRvdWJsZVRhcCA9IChjYXJkSWQsIGNhcmRUZXh0KSA9PiB7XG4gICAgICAgIEFjdGl2ZUdhbWVGYWN0b3J5LnN1Ym1pdFdoaXRlQ2FyZChwbGF5ZXJJZCwgY2FyZElkLCAkc2NvcGUuZ2FtZUlkLCB0ZWFtSWQsIGNhcmRUZXh0KVxuICAgICAgICAvLyRzY29wZS5nZXRTdWJtaXR0ZWRQbGF5ZXJzKCk7XG4gICAgICAgICRzY29wZS5zdWJtaXR0ZWQgPSB0cnVlO1xuICAgICAgICAkc2NvcGUuJGV2YWxBc3luYygpO1xuICAgIH1cblxuICAgICRzY29wZS5qdWRnZURvdWJsZVRhcCA9IChjYXJkSWQpID0+IHtcbiAgICAgICAgLy8gaWYgKHBsYXllcklkID09PSBqdWRnZSkge1xuICAgICAgICAgICAgQWN0aXZlR2FtZUZhY3RvcnkucGlja1dpbm5pbmdXaGl0ZUNhcmQoY2FyZElkLCAkc2NvcGUuZ2FtZUlkLCB0ZWFtSWQpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImp1ZGdpbmdcIilcbiAgICAgICAgLy8gfVxuICAgIH1cblxuXG4gICAgLy8gJHNjb3BlLmdldFN1Ym1pdHRlZFBsYXllcnMgPSAoKSA9PiB7XG4gICAgLy8gICAgICRzY29wZS5wbGF5ZXJzVG9TdWJtaXQgPSAgXy5rZXlCeSgkc2NvcGUuc3VibWl0dGVkV2hpdGVDYXJkcywgY2FyZCA9PiB7XG4gICAgLy8gICAgICAgICByZXR1cm4gY2FyZC5zdWJtaXR0ZWRCeTtcbiAgICAvLyAgICAgfSlcbiAgICAvLyB9XG5cbn0pXG5cbiIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lJywge1xuICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2hvbWUvaG9tZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgZ2FtZXM6IChHYW1lRmFjdG9yeSkgPT4gR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVVzZXJJZCgpLFxuICAgICAgICAgICAgb3BlbkdhbWVzOiAoR2FtZUZhY3RvcnkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZ2V0dGluZyB0aGUgZ2FtZXMnKVxuICAgICAgICAgICAgICAgIHJldHVybiBHYW1lRmFjdG9yeS5nZXRPcGVuR2FtZXMoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdIb21lQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCAkY29yZG92YU9hdXRoLCBVc2VyRmFjdG9yeSwgR2FtZUZhY3RvcnksICRsb2NhbFN0b3JhZ2UsICRpb25pY1BvcHVwLCBnYW1lcywgb3BlbkdhbWVzKSB7XG4gICAgJHNjb3BlLnN0YXJ0TmV3R2FtZSA9IEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZTtcbiAgICAkc2NvcGUuc3RvcmFnZSA9ICRsb2NhbFN0b3JhZ2U7XG4gICAgJHNjb3BlLmdhbWVzID0gZ2FtZXM7XG4gICAgLy8kc2NvcGUub3BlbkdhbWVzID0gb3BlbkdhbWVzO1xuXG4gICAgY29uc29sZS5sb2coXCJnYW1lc1wiLCBKU09OLnN0cmluZ2lmeSgkc2NvcGUuZ2FtZXMpKVxuICAgICRzY29wZS5nb1RvTmV3R2FtZSA9ICgpID0+IHtcbiAgICAgICAgJHN0YXRlLmdvKCduZXctZ2FtZS5tYWluJylcbiAgICB9XG5cbiAgICAkc2NvcGUub3BlbkdhbWVzID0gb3BlbkdhbWVzXG5cblxuICAgIC8vICRzY29wZS5qb2luR2FtZSA9IEdhbWVGYWN0b3J5LmpvaW5HYW1lQnlJZDtcblxuICAgIC8vICRzY29wZS5zaG93UG9wdXAgPSBmdW5jdGlvbihnYW1lSWQpIHtcblxuICAgIC8vICAgICAkc2NvcGUuZ2FtZSA9ICRzY29wZS5nYW1lc1tnYW1lSWRdO1xuICAgIC8vICAgICAkc2NvcGUuZ2FtZU5hbWUgPSAkc2NvcGUuZ2FtZS5zZXR0aW5ncy5uYW1lO1xuICAgIC8vICAgICAkc2NvcGUucGxheWVyQ291bnQgPSBPYmplY3Qua2V5cygkc2NvcGUuZ2FtZS5wbGF5ZXJzKS5sZW5ndGg7XG4gICAgLy8gICAgICRzY29wZS53YWl0aW5nRm9yUGxheWVycyA9ICAoJHNjb3BlLmdhbWUuc2V0dGluZ3MubWluUGxheWVycyB8fCA0KSAtICRzY29wZS5wbGF5ZXJDb3VudDtcblxuICAgIC8vICAgICAgY29uc3QgbXlQb3B1cCA9ICRpb25pY1BvcHVwLnNob3coe1xuICAgIC8vICAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9ob21lL3BvcHVwLmh0bWwnLFxuICAgIC8vICAgICAgICAgdGl0bGU6ICdKb2luICcgKyAkc2NvcGUuZ2FtZU5hbWUsXG4gICAgLy8gICAgICAgICBzY29wZTogJHNjb3BlLFxuICAgIC8vICAgICAgICAgYnV0dG9uczogXG4gICAgLy8gICAgICAgICBbXG4gICAgLy8gICAgICAgICAgICAge3RleHQ6ICdHbyBiYWNrJ30sXG4gICAgLy8gICAgICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgICAgICB0ZXh0OiAnSm9pbiBnYW1lJyxcbiAgICAvLyAgICAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbi1iYWxhbmNlZCcsXG4gICAgLy8gICAgICAgICAgICAgICAgIG9uVGFwOiBlID0+IHtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICRzY29wZS5qb2luR2FtZShnYW1lSWQpO1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdnYW1lLmFjdGl2ZS1nYW1lJywgeyBnYW1lSWQ6IGdhbWVJZCB9KVxuICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgXVxuICAgIC8vICAgICB9KVxuICAgIC8vIH1cbn0pXG5cbiIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdsb2dpbicsIHtcbiAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9sb2dpbi9sb2dpbi5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luQ3RybCdcbiAgICB9KVxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9sb2dpbicpO1xufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCBVc2VyRmFjdG9yeSwgJGNvcmRvdmFPYXV0aCwgJGxvY2FsU3RvcmFnZSwgJHRpbWVvdXQsICRpb25pY1NpZGVNZW51RGVsZWdhdGUpIHtcbiAgICAkc2NvcGUubG9naW5XaXRoU2xhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFVzZXJGYWN0b3J5LmdldFNsYWNrQ3JlZHMoKVxuICAgICAgICAgICAgLnRoZW4oY3JlZHMgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAkY29yZG92YU9hdXRoLnNsYWNrKGNyZWRzLmNsaWVudElELCBjcmVkcy5jbGllbnRTZWNyZXQsIFsnaWRlbnRpdHkuYmFzaWMnLCAnaWRlbnRpdHkudGVhbScsICdpZGVudGl0eS5hdmF0YXInXSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihpbmZvID0+IFVzZXJGYWN0b3J5LnNldFVzZXIoaW5mbykpXG4gICAgICAgICAgICAudGhlbigoKSA9PiAkc3RhdGUuZ28oJ2hvbWUnKSlcbiAgICB9XG5cbiAgICAkaW9uaWNTaWRlTWVudURlbGVnYXRlLmNhbkRyYWdDb250ZW50KGZhbHNlKTtcblxuICAgICRzY29wZS4kb24oJyRpb25pY1ZpZXcubGVhdmUnLCBmdW5jdGlvbigpIHsgJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZS5jYW5EcmFnQ29udGVudCh0cnVlKSB9KTtcblxuICAgICRzY29wZS5zdG9yYWdlID0gJGxvY2FsU3RvcmFnZVxuXG4gICAgZnVuY3Rpb24gcmVkaXJlY3RVc2VyKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInNjb3BlIHN0b3JhZ2UgdXNlclwiLCAkc2NvcGUuc3RvcmFnZS51c2VyKVxuICAgICAgICBpZiAoJHNjb3BlLnN0b3JhZ2UudXNlcikgJHN0YXRlLmdvKCdob21lJylcbiAgICB9XG5cbiAgICByZWRpcmVjdFVzZXIoKTtcbn0pXG5cbiIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpID0+IHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCduZXctZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnL25ldy1nYW1lJyxcbiAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvbWFpbi5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ05ld0dhbWVDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgdGVhbURlY2tzOiAoR2FtZUZhY3RvcnkpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTmF2aWdhdGluZyB0byBzdGF0ZSBvciB0cnlpbmcgdG8gaGVsbG8nKVxuICAgICAgICAgICAgICAgIHJldHVybiBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkKClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdGFuZGFyZERlY2s6IChHYW1lRmFjdG9yeSkgPT4gR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCgxKVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIC5zdGF0ZSgnbmV3LWdhbWUubWFpbicsIHtcbiAgICAgICAgdXJsOiAnL3NldHVwLWdhbWUnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL25ldy1nYW1lLmh0bWwnLFxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ25ldy1nYW1lLmFkZC1kZWNrcycsIHtcbiAgICAgICAgdXJsOiAnL2FkZC1kZWNrcycsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvYWRkLWRlY2tzLmh0bWwnLFxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ25ldy1nYW1lLmRlY2snLCB7XG4gICAgICAgIHVybDogJy9kZWNrLzpkZWNrSWQnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL2RlY2suaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdEZWNrQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGNhcmRzOiAoR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcykgPT4gR2FtZUZhY3RvcnkuZ2V0Q2FyZHNCeURlY2tJZCgkc3RhdGVQYXJhbXMuZGVja0lkKVxuICAgICAgICB9XG5cblxuICAgIH0pXG5cbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvbmV3LWdhbWUvc2V0dXAtZ2FtZScpO1xufSlcblxuYXBwLmNvbnRyb2xsZXIoJ05ld0dhbWVDdHJsJywgKCRzY29wZSwgR2FtZUZhY3RvcnksICRzdGF0ZSwgdGVhbURlY2tzLCBzdGFuZGFyZERlY2spID0+IHtcbiAgICAkc2NvcGUuY3VycmVudFZpZXcgPSAnYWRkRGVja3MnXG4gICAgJHNjb3BlLmdhbWVDb25maWcgPSB7fTtcbiAgICAkc2NvcGUuZ2FtZUNvbmZpZy5kZWNrcyA9IHt9O1xuICAgICRzY29wZS5nb1RvRGVja3MgPSAoKSA9PiB7XG4gICAgICAgICRzdGF0ZS5nbygnbmV3LWdhbWUuYWRkLWRlY2tzJywge30sIHsgbG9jYXRpb246IHRydWUsIHJlbG9hZDogdHJ1ZSB9KVxuICAgIH1cblxuXG5cbiAgICAkc2NvcGUuZGVja3MgPSBzdGFuZGFyZERlY2suY29uY2F0KHRlYW1EZWNrcyk7XG5cbiAgICAkc2NvcGUuc3RhcnROZXdHYW1lID0gKGdhbWVDb25maWcpID0+IHtcbiAgICAgICAgcmV0dXJuIEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZShnYW1lQ29uZmlnKVxuICAgICAgICAgICAgLnRoZW4oKGlkKSA9PiBHYW1lRmFjdG9yeS5hZGRQaWxlVG9HYW1lKGlkLCAkc2NvcGUuZ2FtZUNvbmZpZy5kZWNrcykpXG4gICAgICAgICAgICAudGhlbigoaWQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaW0gaGVyZScpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJyMjI0dBTUUgUlVMRVMnLCAkc2NvcGUuZ2FtZVJ1bGVzKVxuICAgICAgICAgICAgICAgIC8vJHNjb3BlLmdhbWVSdWxlcy4kc2V0UHJpc3RpbmUoKTtcbiAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2dhbWUnLCB7IGdhbWVJZDogaWQgfSlcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICAkc2NvcGUuYWRkRGVja3NUb0dhbWUgPSBHYW1lRmFjdG9yeS5hZGREZWNrcztcbiAgICAvLyAkc2NvcGUuJG9uKCdjaGFuZ2VkR2FtZScsIChldmVudCwgZGF0YSkgPT4ge1xuICAgIC8vICAgICBjb25zb2xlLmxvZygncmVjZWl2ZWQgZXZlbnQnKVxuICAgIC8vICAgICBjb25zb2xlLmxvZygnZGF0YSBvYmo6JywgZGF0YSlcbiAgICAvLyAgICAgJHNjb3BlLmdhbWUgPSBkYXRhO1xuICAgIC8vICAgICAkc2NvcGUuJGRpZ2VzdCgpXG5cbiAgICAvLyB9KVxuXG5cbn0pXG5cbmFwcC5jb250cm9sbGVyKCdEZWNrQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkc3RhdGUsIGNhcmRzKSA9PiB7XG4gICAgJHNjb3BlLmNhcmRzID0gY2FyZHNcbn0pXG5cbiIsImFwcC5mYWN0b3J5KCdBY3RpdmVHYW1lRmFjdG9yeScsICgkaHR0cCwgJHJvb3RTY29wZSwgJGxvY2FsU3RvcmFnZSkgPT4ge1xuXG4gICAgY29uc3QgQWN0aXZlR2FtZUZhY3RvcnkgPSB7fTtcblxuICAgIGNvbnN0IHJlZmlsbGVyID0gKGNhcmRzTmVlZGVkLCBwaWxlUmVmLCBoYW5kUmVmKSA9PiB7XG4gICAgICAgIHJldHVybiBwaWxlUmVmLmxpbWl0VG9GaXJzdChjYXJkc05lZWRlZCkub25jZSgndmFsdWUnLCBjYXJkc1NuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICBjYXJkc1NuYXBzaG90LmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB1cGRhdGVPYmogPSB7fVxuICAgICAgICAgICAgICAgICAgICBjYXJkLnJlZi50cmFuc2FjdGlvbihjYXJkRGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlT2JqW2NhcmQua2V5XSA9IGNhcmREYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBoYW5kUmVmLnVwZGF0ZSh1cGRhdGVPYmopKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgIH1cblxuICAgIEFjdGl2ZUdhbWVGYWN0b3J5LnJlZmlsbE15SGFuZCA9IChnYW1lSWQsIHBsYXllcklkLCB0ZWFtSWQpID0+IHtcbiAgICAgICAgLy8gaG93IG1hbnkgY2FyZHMgZG8gSSBuZWVkP1xuICAgICAgICBjb25zb2xlLmxvZyhcInJlZmlsbGluZyBoYW5kXCIpXG4gICAgICAgIGxldCBjYXJkc05lZWRlZCA9IDBcbiAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgY29uc3QgaGFuZFJlZiA9IGdhbWVSZWYuY2hpbGQoYHBsYXllcnMvJHtwbGF5ZXJJZH0vaGFuZGApXG4gICAgICAgIGNvbnN0IHBpbGVSZWYgPSBnYW1lUmVmLmNoaWxkKCdwaWxlL3doaXRlY2FyZHMnKVxuICAgICAgICBoYW5kUmVmLm9uY2UoJ3ZhbHVlJywgaGFuZFNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICBjYXJkc05lZWRlZCA9IDcgLSBoYW5kU25hcHNob3QubnVtQ2hpbGRyZW4oKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICByZWZpbGxlcihjYXJkc05lZWRlZCwgcGlsZVJlZiwgaGFuZFJlZilcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1hZGUgaXQgdG8gcmVmaWxsZXJcIilcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgZmlyZWJhc2VNb3ZlU2luZ2xlS2V5VmFsdWUgPSAob2xkUmVmLCBuZXdSZWYpID0+IHtcbiAgICAgICAgbGV0IHJlbW92ZVVwZGF0ZSA9IHt9XG4gICAgICAgIGxldCBuZXdVcGRhdGUgPSB7fVxuICAgICAgICByZXR1cm4gb2xkUmVmLm9uY2UoJ3ZhbHVlJylcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICAgICAgICAgIC50aGVuKHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICByZW1vdmVVcGRhdGVbc25hcHNob3Qua2V5XSA9IG51bGxcbiAgICAgICAgICAgICAgICBuZXdVcGRhdGVbc25hcHNob3Qua2V5XSA9IHNuYXBzaG90LnZhbCgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1JlZi51cGRhdGUobmV3VXBkYXRlKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IG9sZFJlZi5wYXJlbnQudXBkYXRlKHJlbW92ZVVwZGF0ZSkpXG4gICAgfVxuXG5cbiAgICBBY3RpdmVHYW1lRmFjdG9yeS5zdWJtaXRXaGl0ZUNhcmQgPSAocGxheWVySWQsIGNhcmRJZCwgZ2FtZUlkLCB0ZWFtSWQsIGNhcmRUZXh0KSA9PiB7XG4gICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApO1xuICAgICAgICBjb25zdCBjYXJkVG9TdWJtaXQgPSBnYW1lUmVmLmNoaWxkKGBwbGF5ZXJzLyR7cGxheWVySWR9L2hhbmQvJHtjYXJkSWR9YCk7XG4gICAgICAgIGNvbnN0IHN1Ym1pdFJlZiA9IGdhbWVSZWYuY2hpbGQoJ3N1Ym1pdHRlZFdoaXRlQ2FyZHMnKTtcbiAgICAgICAgZmlyZWJhc2VNb3ZlU2luZ2xlS2V5VmFsdWUoY2FyZFRvU3VibWl0LCBzdWJtaXRSZWYpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgc3VibWl0UmVmLmNoaWxkKGNhcmRJZCkuc2V0KHtcbiAgICAgICAgICAgICAgICAgICAgc3VibWl0dGVkQnk6IHBsYXllcklkLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBjYXJkVGV4dFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgIH1cblxuXG4gICAgLy9uaWtpdGEncyB1cGRhdGVkIHZlcnNpb25cbiAgICAvLyBBY3RpdmVHYW1lRmFjdG9yeS5zdWJtaXRXaGl0ZUNhcmQgPSAocGxheWVySWQsIGNhcmRJZCwgZ2FtZUlkLCB0ZWFtSWQsIGNhcmRUZXh0KSA9PiB7XG4gICAgLy8gICBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKTtcbiAgICAvLyAgIGNvbnN0IGNhcmRUb1N1Ym1pdCA9IGdhbWVSZWYuY2hpbGQoYHBsYXllcnMvJHtwbGF5ZXJJZH0vaGFuZC8ke2NhcmRJZH0vdGV4dGApO1xuICAgIC8vICAgY29uc3Qgc3VibWl0UmVmID0gZ2FtZVJlZi5jaGlsZCgnc3VibWl0dGVkV2hpdGVDYXJkcycpO1xuICAgIC8vICAgbGV0IHRleHQgPSAnJ1xuICAgIC8vICAgcmV0dXJuIGNhcmRUb1N1Ym1pdC50cmFuc2FjdGlvbihjYXJkVGV4dCA9PiB7XG4gICAgLy8gICAgICAgdGV4dCA9IGNhcmRUZXh0XG4gICAgLy8gICAgICAgcmV0dXJuIG51bGxcbiAgICAvLyAgICAgfSlcbiAgICAvLyAgICAgLnRoZW4oKCkgPT4ge1xuICAgIC8vICAgICAgIGxldCB1cGRhdGVPYmogPSB7fTtcbiAgICAvLyAgICAgICB1cGRhdGVPYmpbcGxheWVySWRdLnRleHQgPSB0ZXh0O1xuICAgIC8vICAgICAgIHVwZGF0ZU9ialtwbGF5ZXJJZF0uY2FyZElkID0gY2FyZElkXG4gICAgLy8gICAgICAgcmV0dXJuIHN1Ym1pdFJlZi51cGRhdGUodXBkYXRlT2JqKVxuICAgIC8vICAgICB9KVxuICAgIC8vICAgICAudGhlbigoKSA9PiBjb25zb2xlLmxvZygnc3VibWlzc2lvbiBzdWNjZXNzJykpXG4gICAgLy8gICAgIC5jYXRjaCgoZXJyKSA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgIC8vIH1cblxuXG5cbiAgICBBY3RpdmVHYW1lRmFjdG9yeS5waWNrV2lubmluZ1doaXRlQ2FyZCA9IChjYXJkSWQsIGdhbWVJZCwgdGVhbUlkKSA9PiB7XG4gICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApO1xuICAgICAgICBsZXQgd2lubmVyID0gZ2FtZVJlZi5jaGlsZChgc3VibWl0dGVkV2hpdGVDYXJkcy8ke2NhcmRJZH0vc3VibWl0dGVkQnlgKVxuICAgICAgICBjb25zdCB3aW5uaW5nQ2FyZCA9IGdhbWVSZWYuY2hpbGQoYHN1Ym1pdHRlZFdoaXRlQ2FyZHMvJHtjYXJkSWR9YClcbiAgICAgICAgY29uc29sZS5sb2coJ1dJTk5JTkcgQ0FSRCcsIHdpbm5pbmdDYXJkKVxuICAgICAgICBsZXQgYmxhY2tDYXJkSWQgPSAnJztcbiAgICAgICAgbGV0IGJsYWNrQ2FyZFdvbiA9IHt9XG4gICAgICAgIHdpbm5lci5vbmNlKCd2YWx1ZScpXG4gICAgICAgICAgICAudGhlbih3aW5uZXJJZCA9PiB7XG4gICAgICAgICAgICAgICAgd2lubmVyID0gd2lubmVySWQudmFsKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNldFJvdW5kU3RhdGVUb092ZXIgPSBnYW1lUmVmLmNoaWxkKCdzdGF0ZScpLnNldCgncG9zdHJvdW5kJylcbiAgICAgICAgICAgICAgICBjb25zdCBhd2FyZEJsYWNrQ2FyZCA9IGdhbWVSZWYuY2hpbGQoJ2N1cnJlbnRCbGFja0NhcmQnKS50cmFuc2FjdGlvbigoY3VycmVudEJsYWNrQ2FyZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmxhY2tDYXJkV29uID0gY3VycmVudEJsYWNrQ2FyZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiIyMjI0JMQUNLIENBUkQgV09OXCIsIGJsYWNrQ2FyZFdvbilcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhbWVSZWYuY2hpbGQoYHBsYXllcnMvJHt3aW5uZXJ9L2JsYWNrQ2FyZHNXb25gKS51cGRhdGUoYmxhY2tDYXJkV29uKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpbm5pbmdDYXJkLm9uY2UoJ3ZhbHVlJylcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4od2lubmluZ0NhcmRTbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnU05BUFNIT1QnLCB3aW5uaW5nQ2FyZFNuYXBzaG90LnZhbCgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbm5pbmdDYXJkU25hcHNob3QgPSB3aW5uaW5nQ2FyZFNuYXBzaG90LnZhbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdhbWVSZWYuY2hpbGQoYHdpbm5pbmdDYXJkYCkuc2V0KHdpbm5pbmdDYXJkU25hcHNob3QpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IGdhbWVSZWYuY2hpbGQoJ3N1Ym1pdHRlZFdoaXRlQ2FyZHMnKS5yZW1vdmUoKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW3NldFJvdW5kU3RhdGVUb092ZXIsIGF3YXJkQmxhY2tDYXJkXSlcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIEFjdGl2ZUdhbWVGYWN0b3J5O1xufSk7IiwiYXBwLmZhY3RvcnkoJ0dhbWVGYWN0b3J5JywgKCRodHRwLCAkcm9vdFNjb3BlLCAkbG9jYWxTdG9yYWdlKSA9PiB7XG5cbiAgICAgICAgY29uc3Qgb3VySXBzID0ge1xuICAgICAgICAgICAgbmlraXRhOiBcIjE5Mi4xNjguNC4yMTNcIixcbiAgICAgICAgICAgIGtheWxhOiBcIjE5Mi4xNjguNC4yMjVcIixcbiAgICAgICAgICAgIG5pdGh5YTogXCIxOTIuMTY4LjEuNDhcIixcbiAgICAgICAgICAgIGRhbjogXCIxOTIuMTY4LjQuMjM2XCJcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGN1cnJlbnRJcCA9IG91cklwcy5rYXlsYTtcblxuICAgICAgICAvLyBzdGFydCBhIG5ldyBnYW1lIGRlcnBcbiAgICAgICAgY29uc3QgR2FtZUZhY3RvcnkgPSB7fTtcbiAgICAgICAgR2FtZUZhY3Rvcnkuc3RhcnROZXdHYW1lID0gKGdhbWVDb25maWcpID0+IHtcbiAgICAgICAgICAgIC8vY2FuIGFsc28gZ2V0IGFsbCB0aGUgZGVja3MgYnkgdGVhbSBoZXJlIHRvIHByZXBhcmVcbiAgICAgICAgICAgIGNvbnN0IHRlYW1JZCA9ICRsb2NhbFN0b3JhZ2UudGVhbS5pZCB8fCAyO1xuICAgICAgICAgICAgY29uc3QgY3JlYXRvcklkID0gJGxvY2FsU3RvcmFnZS51c2VyLmlkIHx8IDM7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChgaHR0cHM6Ly9ibGFua2FnYWluc3RodW1hbml0eS5oZXJva3VhcHAuY29tL2FwaS9nYW1lc2AsIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZ2FtZUNvbmZpZy5uYW1lIHx8ICdBV0VTT01FIE5hbWUnLFxuICAgICAgICAgICAgICAgICAgICB0ZWFtSWQ6IHRlYW1JZCxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvcklkOiBjcmVhdG9ySWQsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0b3JOYW1lOiAkbG9jYWxTdG9yYWdlLnVzZXIubmFtZSB8fCAnZGFuJywgLy9taWdodCBiZSB1bm5lY2Vzc2FyeSBpZiB3ZSBoYXZlIHRoZSB1c2VyIGlkXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiBnYW1lQ29uZmlnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBnYW1lSWQgPSByZXMuZGF0YVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYC90ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICAgICAgICAgICAgZ2FtZVJlZi5vbigndmFsdWUnLCBzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2NoYW5nZWRHYW1lJywgc25hcHNob3QudmFsKCkpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2FtZUlkO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG4gICAgICAgIC8vIGdldCBhbGwgb2YgYSBkZWNrcyBjYXJkcyB0byBkaXNwbGF5IHdoZW4gbG9va2luZyBhdCBkZWNrc1xuICAgICAgICBHYW1lRmFjdG9yeS5nZXRDYXJkc0J5RGVja0lkID0gKGlkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwczovL2JsYW5rYWdhaW5zdGh1bWFuaXR5Lmhlcm9rdWFwcC5jb20vYXBpL2RlY2tzLyR7aWR9L2NhcmRzYClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIFRPRE86IGNvbWJpbmUgdGhpcyBpbnRvIHRoZSBhYm92ZSBzdGFydE5ld0dhbWUgZnVuY1xuICAgICAgICAvLyB0YWtlIGFsbCBvZiB0aGUgc2VsZWN0ZWQgZGVja3MnIGNhcmRzIGFuZCBwdXQgdGhlbSBpbiB0aGUgZmlyZWJhc2UgZ2FtZSBvYmplY3QgcGlsZSAodGhyb3VnaCByb3V0ZSlcbiAgICAgICAgR2FtZUZhY3RvcnkuYWRkUGlsZVRvR2FtZSA9IChnYW1lSWQsIGRlY2tzKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImFkZGluZyBwaWxlIHRvIGdhbWVcIilcbiAgICAgICAgICAgIGNvbnN0IGRlY2tzQXJyID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBkZWNrSWQgaW4gZGVja3MpIHtcbiAgICAgICAgICAgICAgICBkZWNrc0Fyci5wdXNoKGRlY2tJZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGBodHRwczovL2JsYW5rYWdhaW5zdGh1bWFuaXR5Lmhlcm9rdWFwcC5jb20vYXBpL2dhbWVzLyR7Z2FtZUlkfS9kZWNrc2AsIHtcbiAgICAgICAgICAgICAgICAgICAgJ2RlY2tzJzogZGVja3NBcnJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IGdhbWVJZClcbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAkbG9jYWxTdG9yYWdlLnRlYW0uaWQ7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJJZCA9ICRsb2NhbFN0b3JhZ2UudXNlci5pZDtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllck5hbWUgPSAkbG9jYWxTdG9yYWdlLnVzZXIubmFtZTtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllclJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9L3BsYXllcnMvJHtwbGF5ZXJJZH1gKVxuICAgICAgICAgICAgcGxheWVyUmVmLnNldCh7XG4gICAgICAgICAgICAgICAgbmFtZTogcGxheWVyTmFtZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGBodHRwczovL2JsYW5rYWdhaW5zdGh1bWFuaXR5Lmhlcm9rdWFwcC5jb20vYXBpL2dhbWVzLyR7Z2FtZUlkfS8/cGxheWVySWQ9JHtwbGF5ZXJJZH1gKVxuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQgPSAoaWQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRlYW1JZCA9ICh0eXBlb2YgaWQgIT09ICdudW1iZXInKSA/ICRsb2NhbFN0b3JhZ2UudGVhbS5pZCA6IGlkOyAvLyBpZCB8fCBsb2NhbHN0b3JhZ2UgZG9lc24ndCB3b3JrIGJlY2F1c2UgMCBpcyBmYWxzZXlcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHBzOi8vYmxhbmthZ2FpbnN0aHVtYW5pdHkuaGVyb2t1YXBwLmNvbS9hcGkvZGVja3M/dGVhbT0ke3RlYW1JZH1gKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcblxuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldFVzZXJzQnlHYW1lSWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwczovL2JsYW5rYWdhaW5zdGh1bWFuaXR5Lmhlcm9rdWFwcC5jb20vYXBpL2dhbWVzLyR7Z2FtZUlkfS91c2Vyc2ApO1xuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVCeUdhbWVJZCA9IChnYW1lSWQsIHRlYW1JZCkgPT4ge1xuICAgICAgICAgICAgdGVhbUlkID0gdGVhbUlkIHx8ICRsb2NhbFN0b3JhZ2UudGVhbS5pZFxuICAgICAgICAgICAgY29uc3QgZ2FtZXNSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICByZXR1cm4gZ2FtZXNSZWYub25jZSgndmFsdWUnKS50aGVuKHNuYXBzaG90ID0+IHNuYXBzaG90LnZhbCgpKVxuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQgPSAodGVhbUlkKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIiMjI1RFQU0gSURcIiwgdGVhbUlkKVxuICAgICAgICAgICAgdGVhbUlkID0gdGVhbUlkIHx8ICRsb2NhbFN0b3JhZ2UudGVhbS5pZFxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZSB0ZWFtIGlkIGlzOicsIHRlYW1JZClcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHBzOi8vYmxhbmthZ2FpbnN0aHVtYW5pdHkuaGVyb2t1YXBwLmNvbS9hcGkvZ2FtZXMvP3RlYW1JZD0ke3RlYW1JZH1gKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgICAgIH07XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVVzZXJJZCA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnZXRHYW1lc0J5VXNlcklkIGNhbGxlZCcpXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuanNvbnAoYGh0dHBzOi8vYmxhbmthZ2FpbnN0aHVtYW5pdHkuaGVyb2t1YXBwLmNvbS9hcGkvZ2FtZXMvP3VzZXJJZD0keyRsb2NhbFN0b3JhZ2UudXNlci5pZH1gKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXNvbHZlZCcpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuZGF0YVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKTtcbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRPcGVuR2FtZXMgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ2V0R2FtZXNCeVVzZXJJZCBjYWxsZWQnKVxuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gJGxvY2FsU3RvcmFnZS50ZWFtLmlkO1xuICAgICAgICAgICAgY29uc3QgdXNlcklkID0gJGxvY2FsU3RvcmFnZS51c2VyLmlkO1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cHM6Ly9ibGFua2FnYWluc3RodW1hbml0eS5oZXJva3VhcHAuY29tL2FwaS9nYW1lcy8/dGVhbUlkPSR7dGVhbUlkfSZ1c2VySWQ9JHt1c2VySWR9Jm9wZW49dHJ1ZWApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIEdhbWVGYWN0b3J5O1xuICAgIH1cblxuKTtcblxuIiwiYXBwLmZhY3RvcnkoJ1VzZXJGYWN0b3J5JywgZnVuY3Rpb24oJGh0dHAsICRsb2NhbFN0b3JhZ2UpIHtcbiAgICBjb25zdCBvdXJJcHMgPSB7XG4gICAgICAgIG5pa2l0YTogXCIxOTIuMTY4LjQuMjEzXCIsXG4gICAgICAgIGtheWxhOiBcIjE5Mi4xNjguNC4yMjVcIixcbiAgICAgICAgbml0aHlhOiBcIjE5Mi4xNjguMS40OFwiLFxuICAgICAgICBkYW46IFwiMTkyLjE2OC40LjIzNlwiXG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudElwID0gb3VySXBzLmtheWxhXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzZXRVc2VyOiBmdW5jdGlvbihpbmZvKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBgaHR0cHM6Ly9ibGFua2FnYWluc3RodW1hbml0eS5oZXJva3VhcHAuY29tL2FwaS91c2Vyc2AsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogaW5mb1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRMb2NhbFN0b3JhZ2UocmVzLmRhdGEudXNlclswXSwgcmVzLmRhdGEudGVhbVswXSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0U2xhY2tDcmVkczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwczovL2JsYW5rYWdhaW5zdGh1bWFuaXR5Lmhlcm9rdWFwcC5jb20vYXBpL3NsYWNrYClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmRhdGFcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBnZXRTbGFja0luZm86IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnaHR0cHM6Ly9zbGFjay5jb20vYXBpL3VzZXJzLmlkZW50aXR5JylcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRMb2NhbFN0b3JhZ2U6IGZ1bmN0aW9uKHVzZXIsIHRlYW0pIHtcbiAgICAgICAgICAgICRsb2NhbFN0b3JhZ2UudXNlciA9IHVzZXI7XG4gICAgICAgICAgICAkbG9jYWxTdG9yYWdlLnRlYW0gPSB0ZWFtO1xuICAgICAgICB9LFxuXG4gICAgICAgIGxvZ091dDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkbG9jYWxTdG9yYWdlLiRyZXNldCgpO1xuICAgICAgICB9XG4gICAgfVxufSlcblxuIiwiLy9EaXJlY3RpdmUgRmlsZSIsImFwcC5kaXJlY3RpdmUoJ3N1Ym1pdHRlZENhcmRzJywgZnVuY3Rpb24oKXtcblx0cmV0dXJuIHtcblx0XHRyZXN0cmljdDogJ0UnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvY29tbW9uL2RpcmVjdGl2ZXMvc3VibWl0dGVkLWNhcmRzLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdHYW1lQ3RybCdcblx0fVxufSkiLCJhcHAuZGlyZWN0aXZlKCd3aGl0ZUNhcmRzJywgZnVuY3Rpb24oKXtcblx0cmV0dXJuIHtcblx0XHRyZXN0cmljdDogJ0UnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvY29tbW9uL2RpcmVjdGl2ZXMvd2hpdGUtY2FyZHMuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0dhbWVDdHJsJ1xuXHR9XG59KSIsImFwcC5kaXJlY3RpdmUoJ3dpbm5pbmdDYXJkcycsIGZ1bmN0aW9uKCl7XG5cdHJldHVybiB7XG5cdFx0cmVzdHJpY3Q6ICdFJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2NvbW1vbi9kaXJlY3RpdmVzL3doaXRlLWNhcmRzLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdHYW1lQ3RybCdcblx0fVxufSkiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
