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
    // const gameId = $stateParams.gameId;
    var gameId = $stateParams.gameId; //32;
    var playerId = $localStorage.user.id;
    $scope.playerId = playerId;
    var teamId = $localStorage.team.id; //;
    // const teamId = $localStorage.team.id
    var gameRef = firebase.database().ref('teams/' + teamId + '/games/' + gameId + '/');
    console.log(gameRef.toString());
    $scope.round = {};

    $scope.showCards = false;

    gameRef.on('value', function (gameSnapshot) {
        // console.log(gameSnapshot.val())
        $scope.game = gameSnapshot.val();
        $scope.gameName = $scope.game.settings.name;
        // $scope.playerHand = $scope.game.players[playerId].hand ? $scope.game.players[playerId].hand : null
        // console.log('phand is', JSON.stringify($scope.playerHand))
        // $scope.playerHandCount = Object.keys($scope.playerHand).length;

        $scope.blackCard = $scope.game.currentBlackCard[1];
        // console.log('black card', $scope.blackCard)
        $scope.blackCardText = $scope.blackCard.text;
        $scope.judge = $scope.game.currentJudge;
        $scope.$evalAsync();
    });

    //ActiveGameFactory.refillMyHand($scope.gameId, playerId, teamId)

    // $scope.join = GameFactory.joinGameById
    // $scope.joinAndGetHand = (gameId, playerId, teamId) => {
    //         GameFactory.joinGameById(gameId)
    //         ActiveGameFactory.refillMyHand(gameId, playerId, teamId)
    //     }
    $scope.joinThenGetCards = function () {
        $scope.showCards = true;
        GameFactory.joinGameById(gameId).then(function () {
            return ActiveGameFactory.refillMyHand(gameId, playerId, teamId);
        }).then(function () {
            console.log($scope.game.players[playerId]);
            console.log('playerHand', $scope.playerHand);
            $scope.$evalAsync();
        }).catch(function (err) {
            return console.log(err);
        });
    };

    $scope.onDoubleTap = function (cardId) {
        ActiveGameFactory.submitWhiteCard(playerId, cardId, gameId, teamId);
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
                console.log('getting games');
                return GameFactory.getGamesByTeamId();
            },
            openGames: function openGames(GameFactory) {
                return GameFactory.getOpenGames();
            }

        }
    });
});

app.controller('HomeCtrl', function ($scope, $state, $cordovaOauth, UserFactory, GameFactory, $localStorage, games, $ionicPopup) {
    $scope.startNewGame = GameFactory.startNewGame;
    $scope.storage = $localStorage;
    $scope.games = games;
    //$scope.openGames = openGames;

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
        var cardsNeeded = 0;
        var gameRef = firebase.database().ref('teams/' + teamId + '/games/' + gameId);
        var handRef = gameRef.child('players/' + playerId + '/hand');
        var pileRef = gameRef.child('pile/whitecards');
        return handRef.once('value', function (handSnapshot) {
            cardsNeeded = 7 - handSnapshot.numChildren();
        }).then(function () {
            return refiller(cardsNeeded, pileRef, handRef);
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

    ActiveGameFactory.submitWhiteCard = function (playerId, cardId, gameId, teamId) {
        var gameRef = firebase.database().ref('teams/' + teamId + '/games/' + gameId);
        var cardToSubmit = gameRef.child('players/' + playerId + '/hand/' + cardId);
        var submitRef = gameRef.child('submittedWhiteCards');
        firebaseMoveSingleKeyValue(cardToSubmit, submitRef).then(function () {
            console.log(cardToSubmit, submitRef);
            submitRef.child(cardId).set({
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
        }).then(function () {
            return gameId;
        });
    };

    GameFactory.joinGameById = function (gameId) {
        var teamId = $localStorage.team.id;
        var playerId = $localStorage.user.id;
        var playerName = $localStorage.user.name;
        //console.log(JSON.stringify($localStorage));
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
        teamId = teamId || $localStorage.team.id;
        console.log('the team id is:', teamId);
        return $http.get('http://' + currentIp + ':1337/api/games/?teamId=' + teamId).then(function (res) {
            return res.data;
        }).catch(function (err) {
            return console.log(err);
        });
    };

    GameFactory.getOpenGames = function () {
        var teamId = $localstorage.team.id;
        var userId = $localstorage.user.id;
        return $http.get('http://' + currentIp + ':1337/api/games/?teamId=' + teamId + '&userId=' + userId + '&open=true').then(function (res) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImNhcmRzLXRlc3QvY2FyZHNUZXN0LmpzIiwiZGVja3MvZGVja3MuanMiLCJmcm9tIGZzZy9mcm9tLWZzZy5qcyIsImdhbWUvZ2FtZS5qcyIsImhvbWUvaG9tZS5qcyIsImxvZ2luL2xvZ2luLmpzIiwibmV3LWdhbWUvbmV3LWdhbWUuanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiLCJjb21tb24vZGlyZWN0aXZlcy93aGl0ZS1jYXJkcy5qcyIsImNvbW1vbi9mYWN0b3JpZXMvQWN0aXZlR2FtZUZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yaWVzL0dhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy91c2VyRmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJhcHAiLCJhbmd1bGFyIiwibW9kdWxlIiwicnVuIiwiJGlvbmljUGxhdGZvcm0iLCJyZWFkeSIsImNvcmRvdmEiLCJwbHVnaW5zIiwiS2V5Ym9hcmQiLCJoaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIiLCJkaXNhYmxlU2Nyb2xsIiwiU3RhdHVzQmFyIiwic3R5bGVMaWdodENvbnRlbnQiLCIkcm9vdFNjb3BlIiwiJG9uIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJhcmd1bWVudHMiLCJjb250cm9sbGVyIiwiJHNjb3BlIiwiVXNlckZhY3RvcnkiLCIkc3RhdGUiLCIkbG9jYWxTdG9yYWdlIiwiJHRpbWVvdXQiLCJsb2dPdXQiLCJnbyIsImNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwic3RhdGUiLCJ1cmwiLCJ0ZW1wbGF0ZVVybCIsImdyZWV0aW5nIiwicmVzb2x2ZSIsImRlY2tzIiwiR2FtZUZhY3RvcnkiLCIkc3RhdGVQYXJhbXMiLCJnZXREZWNrc0J5VGVhbUlkIiwic3RhdGVQYXJhbXMiLCJ0ZWFtSWQiLCJBY3RpdmVHYW1lRmFjdG9yeSIsImdhbWVJZCIsInBsYXllcklkIiwidXNlciIsImlkIiwidGVhbSIsImdhbWVSZWYiLCJmaXJlYmFzZSIsImRhdGFiYXNlIiwicmVmIiwidG9TdHJpbmciLCJyb3VuZCIsInNob3dDYXJkcyIsIm9uIiwiZ2FtZSIsImdhbWVTbmFwc2hvdCIsInZhbCIsImdhbWVOYW1lIiwic2V0dGluZ3MiLCJuYW1lIiwiYmxhY2tDYXJkIiwiY3VycmVudEJsYWNrQ2FyZCIsImJsYWNrQ2FyZFRleHQiLCJ0ZXh0IiwianVkZ2UiLCJjdXJyZW50SnVkZ2UiLCIkZXZhbEFzeW5jIiwiam9pblRoZW5HZXRDYXJkcyIsImpvaW5HYW1lQnlJZCIsInRoZW4iLCJyZWZpbGxNeUhhbmQiLCJwbGF5ZXJzIiwicGxheWVySGFuZCIsImNhdGNoIiwiZXJyIiwib25Eb3VibGVUYXAiLCJjYXJkSWQiLCJzdWJtaXRXaGl0ZUNhcmQiLCIkdXJsUm91dGVyUHJvdmlkZXIiLCJnYW1lcyIsImdldEdhbWVzQnlUZWFtSWQiLCJvcGVuR2FtZXMiLCJnZXRPcGVuR2FtZXMiLCIkY29yZG92YU9hdXRoIiwiJGlvbmljUG9wdXAiLCJzdGFydE5ld0dhbWUiLCJzdG9yYWdlIiwiZ29Ub05ld0dhbWUiLCJvdGhlcndpc2UiLCIkaW9uaWNTaWRlTWVudURlbGVnYXRlIiwibG9naW5XaXRoU2xhY2siLCJnZXRTbGFja0NyZWRzIiwic2xhY2siLCJjcmVkcyIsImNsaWVudElEIiwiY2xpZW50U2VjcmV0Iiwic2V0VXNlciIsImluZm8iLCJjYW5EcmFnQ29udGVudCIsInJlZGlyZWN0VXNlciIsImFic3RyYWN0IiwidGVhbURlY2tzIiwic3RhbmRhcmREZWNrIiwiY2FyZHMiLCJnZXRDYXJkc0J5RGVja0lkIiwiZGVja0lkIiwiY3VycmVudFZpZXciLCJnYW1lQ29uZmlnIiwiZ29Ub0RlY2tzIiwibG9jYXRpb24iLCJyZWxvYWQiLCJjb25jYXQiLCJhZGRQaWxlVG9HYW1lIiwiYWRkRGVja3NUb0dhbWUiLCJhZGREZWNrcyIsImRpcmVjdGl2ZSIsInJlc3RyaWN0IiwiZmFjdG9yeSIsIiRodHRwIiwicmVmaWxsZXIiLCJjYXJkc05lZWRlZCIsInBpbGVSZWYiLCJoYW5kUmVmIiwibGltaXRUb0ZpcnN0Iiwib25jZSIsImNhcmRzU25hcHNob3QiLCJmb3JFYWNoIiwidXBkYXRlT2JqIiwiY2FyZCIsInRyYW5zYWN0aW9uIiwia2V5IiwiY2FyZERhdGEiLCJ1cGRhdGUiLCJjaGlsZCIsImhhbmRTbmFwc2hvdCIsIm51bUNoaWxkcmVuIiwiZmlyZWJhc2VNb3ZlU2luZ2xlS2V5VmFsdWUiLCJvbGRSZWYiLCJuZXdSZWYiLCJyZW1vdmVVcGRhdGUiLCJuZXdVcGRhdGUiLCJzbmFwc2hvdCIsInBhcmVudCIsImNhcmRUb1N1Ym1pdCIsInN1Ym1pdFJlZiIsInNldCIsInN1Ym1pdHRlZEJ5Iiwib3VySXBzIiwibmlraXRhIiwia2F5bGEiLCJuaXRoeWEiLCJkYW4iLCJjdXJyZW50SXAiLCJjcmVhdG9ySWQiLCJwb3N0IiwiY3JlYXRvck5hbWUiLCJyZXMiLCJkYXRhIiwiJGJyb2FkY2FzdCIsImdldCIsImRlY2tzQXJyIiwicHVzaCIsInBsYXllck5hbWUiLCJwbGF5ZXJSZWYiLCJnZXRVc2Vyc0J5R2FtZUlkIiwiZ2V0R2FtZUJ5R2FtZUlkIiwiZ2FtZXNSZWYiLCIkbG9jYWxzdG9yYWdlIiwidXNlcklkIiwiZ2V0R2FtZXNCeVVzZXIiLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0TG9jYWxTdG9yYWdlIiwiZ2V0U2xhY2tJbmZvIiwiJHJlc2V0Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQUEsT0FBQUMsR0FBQSxHQUFBQyxRQUFBQyxNQUFBLENBQUEsc0JBQUEsRUFBQSxDQUFBLE9BQUEsRUFBQSxXQUFBLEVBQUEsV0FBQSxFQUFBLGdCQUFBLEVBQUEsV0FBQSxFQUFBLFdBQUEsQ0FBQSxDQUFBOztBQUdBRixJQUFBRyxHQUFBLENBQUEsVUFBQUMsY0FBQSxFQUFBO0FBQ0FBLG1CQUFBQyxLQUFBLENBQUEsWUFBQTtBQUNBLFlBQUFOLE9BQUFPLE9BQUEsSUFBQVAsT0FBQU8sT0FBQSxDQUFB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QUFBO0FBQ0EsYUFWQSxDQUFBO0FBV0EsU0FiQTtBQWNBOEMsdUJBQUEseUJBQUE7QUFDQSxtQkFBQTJCLE1BQUF5QyxHQUFBLGFBQUFQLFNBQUEsc0JBQ0FuRixJQURBLENBQ0EsZUFBQTtBQUNBLHVCQUFBdUYsSUFBQUMsSUFBQTtBQUNBLGFBSEEsQ0FBQTtBQUlBLFNBbkJBO0FBb0JBZ0Isc0JBQUEsd0JBQUE7QUFDQSxtQkFBQXZELE1BQUF5QyxHQUFBLENBQUEsc0NBQUEsQ0FBQTtBQUNBLFNBdEJBOztBQXdCQWEseUJBQUEseUJBQUFqSSxJQUFBLEVBQUFFLElBQUEsRUFBQTtBQUNBdEIsMEJBQUFvQixJQUFBLEdBQUFBLElBQUE7QUFDQXBCLDBCQUFBc0IsSUFBQSxHQUFBQSxJQUFBO0FBQ0EsU0EzQkE7O0FBNkJBcEIsZ0JBQUEsa0JBQUE7QUFDQUYsMEJBQUF1SixNQUFBO0FBQ0E7QUEvQkEsS0FBQTtBQWlDQSxDQTFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW9uaWMgU3RhcnRlciBBcHBcblxuLy8gYW5ndWxhci5tb2R1bGUgaXMgYSBnbG9iYWwgcGxhY2UgZm9yIGNyZWF0aW5nLCByZWdpc3RlcmluZyBhbmQgcmV0cmlldmluZyBBbmd1bGFyIG1vZHVsZXNcbi8vICdzdGFydGVyJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xuXG53aW5kb3cuYXBwID0gYW5ndWxhci5tb2R1bGUoJ0JsYW5rQWdhaW5zdEh1bWFuaXR5JywgWydpb25pYycsICd1aS5yb3V0ZXInLCAnbmdDb3Jkb3ZhJywgJ25nQ29yZG92YU9hdXRoJywgJ25nU3RvcmFnZScsICduZ0FuaW1hdGUnXSlcblxuXG5hcHAucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtKSB7XG4gICAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICAgICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAgICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuXG4gICAgICAgICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcbiAgICAgICAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxuICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgICAgICAgIFN0YXR1c0Jhci5zdHlsZUxpZ2h0Q29udGVudCgpXG4gICAgICAgIH1cbiAgICB9KTtcblxufSlcblxuYXBwLnJ1bihmdW5jdGlvbigkcm9vdFNjb3BlKSB7XG4gICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZUVycm9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGFyZ3VtZW50c1s1XSkpO1xuICAgIH0pO1xufSk7XG5cbiIsImFwcC5jb250cm9sbGVyKCdMb2dvdXRDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBVc2VyRmFjdG9yeSwgJHN0YXRlLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCl7XG5cdCRzY29wZS5sb2dPdXQgPSBmdW5jdGlvbigpe1xuXHRcdFVzZXJGYWN0b3J5LmxvZ091dCgpXG5cdFx0JHN0YXRlLmdvKCdsb2dpbicpXG5cdH1cbn0pIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcil7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdjYXJkcycsIHtcblx0XHR1cmw6ICcvY2FyZHMnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvY2FyZHMtdGVzdC9jYXJkcy10ZXN0Lmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdDYXJkc1Rlc3RDdHJsJ1xuXHR9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0NhcmRzVGVzdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpe1xuIFx0JHNjb3BlLmdyZWV0aW5nID0gXCJISVwiXG59KSIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdkZWNrcycsIHtcblx0XHR1cmw6ICdkZWNrcy86dGVhbWlkJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2RlY2tzL2RlY2tzLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdEZWNrQ3RybCcsXG5cdFx0cmVzb2x2ZToge1xuXHRcdFx0ZGVja3M6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkKHN0YXRlUGFyYW1zLnRlYW1JZClcblx0XHR9XG5cdH0pXG5cbn0pXG5cbmFwcC5jb250cm9sbGVyKCdEZWNrQ3RybCcsICgkc2NvcGUpID0+IHtcblxuXG5cdFxufSkiLCIvLyAoZnVuY3Rpb24gKCkge1xuXG4vLyAgICAgJ3VzZSBzdHJpY3QnO1xuXG4vLyAgICAgLy8gSG9wZSB5b3UgZGlkbid0IGZvcmdldCBBbmd1bGFyISBEdWgtZG95LlxuLy8gICAgIGlmICghd2luZG93LmFuZ3VsYXIpIHRocm93IG5ldyBFcnJvcignSSBjYW5cXCd0IGZpbmQgQW5ndWxhciEnKTtcblxuLy8gICAgIHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnZnNhUHJlQnVpbHQnLCBbXSk7XG5cbi8vICAgICBhcHAuZmFjdG9yeSgnU29ja2V0JywgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICBpZiAoIXdpbmRvdy5pbykgdGhyb3cgbmV3IEVycm9yKCdzb2NrZXQuaW8gbm90IGZvdW5kIScpO1xuLy8gICAgICAgICByZXR1cm4gd2luZG93LmlvKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pO1xuLy8gICAgIH0pO1xuXG4vLyAgICAgLy8gQVVUSF9FVkVOVFMgaXMgdXNlZCB0aHJvdWdob3V0IG91ciBhcHAgdG9cbi8vICAgICAvLyBicm9hZGNhc3QgYW5kIGxpc3RlbiBmcm9tIGFuZCB0byB0aGUgJHJvb3RTY29wZVxuLy8gICAgIC8vIGZvciBpbXBvcnRhbnQgZXZlbnRzIGFib3V0IGF1dGhlbnRpY2F0aW9uIGZsb3cuXG4vLyAgICAgYXBwLmNvbnN0YW50KCdBVVRIX0VWRU5UUycsIHtcbi8vICAgICAgICAgbG9naW5TdWNjZXNzOiAnYXV0aC1sb2dpbi1zdWNjZXNzJyxcbi8vICAgICAgICAgbG9naW5GYWlsZWQ6ICdhdXRoLWxvZ2luLWZhaWxlZCcsXG4vLyAgICAgICAgIGxvZ291dFN1Y2Nlc3M6ICdhdXRoLWxvZ291dC1zdWNjZXNzJyxcbi8vICAgICAgICAgc2Vzc2lvblRpbWVvdXQ6ICdhdXRoLXNlc3Npb24tdGltZW91dCcsXG4vLyAgICAgICAgIG5vdEF1dGhlbnRpY2F0ZWQ6ICdhdXRoLW5vdC1hdXRoZW50aWNhdGVkJyxcbi8vICAgICAgICAgbm90QXV0aG9yaXplZDogJ2F1dGgtbm90LWF1dGhvcml6ZWQnXG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuZmFjdG9yeSgnQXV0aEludGVyY2VwdG9yJywgZnVuY3Rpb24gKCRyb290U2NvcGUsICRxLCBBVVRIX0VWRU5UUykge1xuLy8gICAgICAgICB2YXIgc3RhdHVzRGljdCA9IHtcbi8vICAgICAgICAgICAgIDQwMTogQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCxcbi8vICAgICAgICAgICAgIDQwMzogQVVUSF9FVkVOVFMubm90QXV0aG9yaXplZCxcbi8vICAgICAgICAgICAgIDQxOTogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsXG4vLyAgICAgICAgICAgICA0NDA6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0XG4vLyAgICAgICAgIH07XG4vLyAgICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgICAgICByZXNwb25zZUVycm9yOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3Qoc3RhdHVzRGljdFtyZXNwb25zZS5zdGF0dXNdLCByZXNwb25zZSk7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXNwb25zZSlcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfTtcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5jb25maWcoZnVuY3Rpb24gKCRodHRwUHJvdmlkZXIpIHtcbi8vICAgICAgICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaChbXG4vLyAgICAgICAgICAgICAnJGluamVjdG9yJyxcbi8vICAgICAgICAgICAgIGZ1bmN0aW9uICgkaW5qZWN0b3IpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJGluamVjdG9yLmdldCgnQXV0aEludGVyY2VwdG9yJyk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIF0pO1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLnNlcnZpY2UoJ0F1dGhTZXJ2aWNlJywgZnVuY3Rpb24gKCRodHRwLCBTZXNzaW9uLCAkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUywgJHEpIHtcblxuLy8gICAgICAgICBmdW5jdGlvbiBvblN1Y2Nlc3NmdWxMb2dpbihyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgdmFyIHVzZXIgPSByZXNwb25zZS5kYXRhLnVzZXI7XG4vLyAgICAgICAgICAgICBTZXNzaW9uLmNyZWF0ZSh1c2VyKTtcbi8vICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dpblN1Y2Nlc3MpO1xuLy8gICAgICAgICAgICAgcmV0dXJuIHVzZXI7XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICAvLyBVc2VzIHRoZSBzZXNzaW9uIGZhY3RvcnkgdG8gc2VlIGlmIGFuXG4vLyAgICAgICAgIC8vIGF1dGhlbnRpY2F0ZWQgdXNlciBpcyBjdXJyZW50bHkgcmVnaXN0ZXJlZC5cbi8vICAgICAgICAgdGhpcy5pc0F1dGhlbnRpY2F0ZWQgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gISFTZXNzaW9uLnVzZXI7XG4vLyAgICAgICAgIH07XG5cbiAgICAgICAgXG4vLyAgICAgICAgIHRoaXMuaXNBZG1pbiA9IGZ1bmN0aW9uKHVzZXJJZCl7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZygncnVubmluZyBhZG1pbiBmdW5jJylcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJylcbi8vICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEudXNlci5pc0FkbWluKVxuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgdGhpcy5nZXRMb2dnZWRJblVzZXIgPSBmdW5jdGlvbiAoZnJvbVNlcnZlcikge1xuXG4vLyAgICAgICAgICAgICAvLyBJZiBhbiBhdXRoZW50aWNhdGVkIHNlc3Npb24gZXhpc3RzLCB3ZVxuLy8gICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSB1c2VyIGF0dGFjaGVkIHRvIHRoYXQgc2Vzc2lvblxuLy8gICAgICAgICAgICAgLy8gd2l0aCBhIHByb21pc2UuIFRoaXMgZW5zdXJlcyB0aGF0IHdlIGNhblxuLy8gICAgICAgICAgICAgLy8gYWx3YXlzIGludGVyZmFjZSB3aXRoIHRoaXMgbWV0aG9kIGFzeW5jaHJvbm91c2x5LlxuXG4vLyAgICAgICAgICAgICAvLyBPcHRpb25hbGx5LCBpZiB0cnVlIGlzIGdpdmVuIGFzIHRoZSBmcm9tU2VydmVyIHBhcmFtZXRlcixcbi8vICAgICAgICAgICAgIC8vIHRoZW4gdGhpcyBjYWNoZWQgdmFsdWUgd2lsbCBub3QgYmUgdXNlZC5cblxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuaXNBdXRoZW50aWNhdGVkKCkgJiYgZnJvbVNlcnZlciAhPT0gdHJ1ZSkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKFNlc3Npb24udXNlcik7XG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIC8vIE1ha2UgcmVxdWVzdCBHRVQgL3Nlc3Npb24uXG4vLyAgICAgICAgICAgICAvLyBJZiBpdCByZXR1cm5zIGEgdXNlciwgY2FsbCBvblN1Y2Nlc3NmdWxMb2dpbiB3aXRoIHRoZSByZXNwb25zZS5cbi8vICAgICAgICAgICAgIC8vIElmIGl0IHJldHVybnMgYSA0MDEgcmVzcG9uc2UsIHdlIGNhdGNoIGl0IGFuZCBpbnN0ZWFkIHJlc29sdmUgdG8gbnVsbC5cbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJykudGhlbihvblN1Y2Nlc3NmdWxMb2dpbikuY2F0Y2goZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuLy8gICAgICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmxvZ2luID0gZnVuY3Rpb24gKGNyZWRlbnRpYWxzKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2xvZ2luJywgY3JlZGVudGlhbHMpXG4vLyAgICAgICAgICAgICAgICAgLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pXG4vLyAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCh7IG1lc3NhZ2U6ICdJbnZhbGlkIGxvZ2luIGNyZWRlbnRpYWxzLid9KTtcbi8vICAgICAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLnNpZ251cCA9IGZ1bmN0aW9uKGNyZWRlbnRpYWxzKXtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4vLyAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4vLyAgICAgICAgICAgICAgICAgdXJsOiAnL3NpZ251cCcsXG4vLyAgICAgICAgICAgICAgICAgZGF0YTogY3JlZGVudGlhbHNcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4gcmVzdWx0LmRhdGEpXG4vLyAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oKXtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHttZXNzYWdlOiAnVGhhdCBlbWFpbCBpcyBhbHJlYWR5IGJlaW5nIHVzZWQuJ30pO1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmxvZ291dCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9sb2dvdXQnKS50aGVuKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICBTZXNzaW9uLmRlc3Ryb3koKTtcbi8vICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoQVVUSF9FVkVOVFMubG9nb3V0U3VjY2Vzcyk7XG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfTtcblxuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLnNlcnZpY2UoJ1Nlc3Npb24nLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMpIHtcblxuLy8gICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbi8vICAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCwgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgc2VsZi5kZXN0cm95KCk7XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgICRyb290U2NvcGUuJG9uKEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0LCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICBzZWxmLmRlc3Ryb3koKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcblxuLy8gICAgICAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uICh1c2VyKSB7XG4vLyAgICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICB9KTtcblxuLy8gfSgpKTtcbiIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnZ2FtZScsIHtcblxuICAgICAgICB1cmw6ICcvZ2FtZS86Z2FtZUlkJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL2dhbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdHYW1lQ3RybCcsXG4gICAgICAgIC8vIHJlc29sdmU6IHtcbiAgICAgICAgLy8gICAgIGdhbWUgOiAoR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcykgPT4gR2FtZUZhY3RvcnkuZ2V0R2FtZUJ5R2FtZUlkKCRzdGF0ZVBhcmFtcy5nYW1lSWQpXG4gICAgICAgIC8vIH0gIFxuICAgIH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignR2FtZUN0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zLCAkbG9jYWxTdG9yYWdlLCBBY3RpdmVHYW1lRmFjdG9yeSkgPT4ge1xuICAgIC8vIGNvbnN0IGdhbWVJZCA9ICRzdGF0ZVBhcmFtcy5nYW1lSWQ7XG4gICAgY29uc3QgZ2FtZUlkID0gJHN0YXRlUGFyYW1zLmdhbWVJZCAvLzMyO1xuICAgIGNvbnN0IHBsYXllcklkID0gJGxvY2FsU3RvcmFnZS51c2VyLmlkO1xuICAgICRzY29wZS5wbGF5ZXJJZCA9IHBsYXllcklkO1xuICAgIGNvbnN0IHRlYW1JZCA9ICRsb2NhbFN0b3JhZ2UudGVhbS5pZCAvLztcbiAgICAgICAgLy8gY29uc3QgdGVhbUlkID0gJGxvY2FsU3RvcmFnZS50ZWFtLmlkXG4gICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9L2ApO1xuICAgIGNvbnNvbGUubG9nKGdhbWVSZWYudG9TdHJpbmcoKSlcbiAgICAkc2NvcGUucm91bmQgPSB7fTtcblxuXG4gICAgJHNjb3BlLnNob3dDYXJkcyA9IGZhbHNlO1xuXG4gICAgZ2FtZVJlZi5vbigndmFsdWUnLCBnYW1lU25hcHNob3QgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lU25hcHNob3QudmFsKCkpXG4gICAgICAgICRzY29wZS5nYW1lID0gZ2FtZVNuYXBzaG90LnZhbCgpO1xuICAgICAgICAkc2NvcGUuZ2FtZU5hbWUgPSAkc2NvcGUuZ2FtZS5zZXR0aW5ncy5uYW1lO1xuICAgICAgICAvLyAkc2NvcGUucGxheWVySGFuZCA9ICRzY29wZS5nYW1lLnBsYXllcnNbcGxheWVySWRdLmhhbmQgPyAkc2NvcGUuZ2FtZS5wbGF5ZXJzW3BsYXllcklkXS5oYW5kIDogbnVsbFxuICAgICAgICAvLyBjb25zb2xlLmxvZygncGhhbmQgaXMnLCBKU09OLnN0cmluZ2lmeSgkc2NvcGUucGxheWVySGFuZCkpXG4gICAgICAgIC8vICRzY29wZS5wbGF5ZXJIYW5kQ291bnQgPSBPYmplY3Qua2V5cygkc2NvcGUucGxheWVySGFuZCkubGVuZ3RoO1xuXG4gICAgICAgICRzY29wZS5ibGFja0NhcmQgPSAkc2NvcGUuZ2FtZS5jdXJyZW50QmxhY2tDYXJkWzFdO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnYmxhY2sgY2FyZCcsICRzY29wZS5ibGFja0NhcmQpXG4gICAgICAgICRzY29wZS5ibGFja0NhcmRUZXh0ID0gJHNjb3BlLmJsYWNrQ2FyZC50ZXh0XG4gICAgICAgICRzY29wZS5qdWRnZSA9ICRzY29wZS5nYW1lLmN1cnJlbnRKdWRnZTtcbiAgICAgICAgJHNjb3BlLiRldmFsQXN5bmMoKTtcbiAgICB9KVxuXG5cblxuXG5cbiAgICAvL0FjdGl2ZUdhbWVGYWN0b3J5LnJlZmlsbE15SGFuZCgkc2NvcGUuZ2FtZUlkLCBwbGF5ZXJJZCwgdGVhbUlkKVxuXG4gICAgLy8gJHNjb3BlLmpvaW4gPSBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWRcbiAgICAvLyAkc2NvcGUuam9pbkFuZEdldEhhbmQgPSAoZ2FtZUlkLCBwbGF5ZXJJZCwgdGVhbUlkKSA9PiB7XG4gICAgLy8gICAgICAgICBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWQoZ2FtZUlkKVxuICAgIC8vICAgICAgICAgQWN0aXZlR2FtZUZhY3RvcnkucmVmaWxsTXlIYW5kKGdhbWVJZCwgcGxheWVySWQsIHRlYW1JZClcbiAgICAvLyAgICAgfVxuICAgICRzY29wZS5qb2luVGhlbkdldENhcmRzID0gKCkgPT4ge1xuICAgICAgICAkc2NvcGUuc2hvd0NhcmRzID0gdHJ1ZTtcbiAgICAgICAgR2FtZUZhY3Rvcnkuam9pbkdhbWVCeUlkKGdhbWVJZClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IEFjdGl2ZUdhbWVGYWN0b3J5LnJlZmlsbE15SGFuZChnYW1lSWQsIHBsYXllcklkLCB0ZWFtSWQpKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5nYW1lLnBsYXllcnNbcGxheWVySWRdKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwbGF5ZXJIYW5kJywgJHNjb3BlLnBsYXllckhhbmQpXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRldmFsQXN5bmMoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICB9XG5cbiAgICAkc2NvcGUub25Eb3VibGVUYXAgPSAoY2FyZElkKSA9PiB7XG4gICAgICAgIEFjdGl2ZUdhbWVGYWN0b3J5LnN1Ym1pdFdoaXRlQ2FyZChwbGF5ZXJJZCwgY2FyZElkLCBnYW1lSWQsIHRlYW1JZClcbiAgICB9XG5cbn0pXG5cblxuLy8gYXBwLmNvbnRyb2xsZXIoXCJBY3RpdmVHYW1lQ3RybFwiLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgQWN0aXZlR2FtZUZhY3RvcnksIGdhbWUsICRzdGF0ZVBhcmFtcywgJGxvY2FsU3RvcmFnZSwgJHN0YXRlKSA9PiB7XG5cblxuLy8gICAgICRzY29wZS5vblN3aXBlRG93biA9ICgpID0+IHtcbi8vICAgICAgICAgY29uc29sZS5sb2coJ3dvcmtpbmcnKTtcbi8vICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnNob3dDYXJkcyk7XG4vLyAgICAgICAgICRzY29wZS5zaG93Q2FyZHMgPSB0cnVlIDtcbi8vICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnNob3dDYXJkcyk7XG4vLyAgICAgICAgICRzY29wZS4kZXZhbEFzeW5jKCk7XG4vLyAgICAgfVxuXG4vLyAgICAgJHNjb3BlLm9uU3dpcGVVcCA9ICgpID0+IHtcbi8vICAgICAgICAgY29uc29sZS5sb2coXCJzd2lwZWQgdXBcIik7XG4vLyAgICAgfVxuXG4vLyAgICAgJHNjb3BlLm9uRG91YmxlVGFwID0gKGtleSkgPT4ge1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhcImRvdWJsZSB0YXBwZWRcIilcbi8vICAgICAgICAgJHNjb3BlLnBsYXllZCA9IHRydWU7XG4vLyAgICAgICAgIC8vY2FsbCBzdWJtaXQgY2FyZCBmdW5jdGlvbiBoZXJlLlxuLy8gICAgIH1cblxuLy8gICAgIEFjdGl2ZUdhbWVGYWN0b3J5LnJlZmlsbE15SGFuZCgkc2NvcGUuZ2FtZUlkLCAkc2NvcGUucGxheWVySWQsICRzY29wZS50ZWFtSWQpO1xuXG4vLyAgICAgJHNjb3BlLiRvbignY2hhbmdlZEdhbWUnLCAoZXZlbnQsc25hcHNob3QpID0+e1xuLy8gICAgICAgICAkc2NvcGUuZ2FtZSA9IHNuYXBzaG90O1xuLy8gICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuZ2FtZSk7XG4vLyAgICAgICAgIGlmKGdhbWUuc3RhdGUgPT09ICdzdWJtaXNzaW9uJyl7XG4vLyAgICAgICAgICAgICAkc3RhdGUuZ28oJ2dhbWUuc3VibWlzc2lvbi1nYW1lJylcbi8vICAgICAgICAgfSBcbi8vICAgICB9KVxuLy8gfSlcblxuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgIHVybDogJy8nLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2hvbWUvaG9tZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgZ2FtZXM6IChHYW1lRmFjdG9yeSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnZXR0aW5nIGdhbWVzJylcbiAgICAgICAgICAgICAgICByZXR1cm4gR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3BlbkdhbWVzOiAoR2FtZUZhY3RvcnkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gR2FtZUZhY3RvcnkuZ2V0T3BlbkdhbWVzKClcbiAgICAgICAgICAgIH1cblxuXG5cblxuICAgICAgICB9XG4gICAgfSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdIb21lQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCAkY29yZG92YU9hdXRoLCBVc2VyRmFjdG9yeSwgR2FtZUZhY3RvcnksICRsb2NhbFN0b3JhZ2UsIGdhbWVzLCAkaW9uaWNQb3B1cCkge1xuICAgICRzY29wZS5zdGFydE5ld0dhbWUgPSBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWU7XG4gICAgJHNjb3BlLnN0b3JhZ2UgPSAkbG9jYWxTdG9yYWdlO1xuICAgICRzY29wZS5nYW1lcyA9IGdhbWVzO1xuICAgIC8vJHNjb3BlLm9wZW5HYW1lcyA9IG9wZW5HYW1lcztcblxuICAgIGNvbnNvbGUubG9nKFwiZ2FtZXNcIiwgSlNPTi5zdHJpbmdpZnkoJHNjb3BlLmdhbWVzKSlcbiAgICAkc2NvcGUuZ29Ub05ld0dhbWUgPSAoKSA9PiB7XG4gICAgICAgICRzdGF0ZS5nbygnbmV3LWdhbWUubWFpbicpXG4gICAgfVxuXG5cbiAgICAvLyAkc2NvcGUuam9pbkdhbWUgPSBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWQ7XG5cbiAgICAvLyAkc2NvcGUuc2hvd1BvcHVwID0gZnVuY3Rpb24oZ2FtZUlkKSB7XG5cbiAgICAvLyAgICAgJHNjb3BlLmdhbWUgPSAkc2NvcGUuZ2FtZXNbZ2FtZUlkXTtcbiAgICAvLyAgICAgJHNjb3BlLmdhbWVOYW1lID0gJHNjb3BlLmdhbWUuc2V0dGluZ3MubmFtZTtcbiAgICAvLyAgICAgJHNjb3BlLnBsYXllckNvdW50ID0gT2JqZWN0LmtleXMoJHNjb3BlLmdhbWUucGxheWVycykubGVuZ3RoO1xuICAgIC8vICAgICAkc2NvcGUud2FpdGluZ0ZvclBsYXllcnMgPSAgKCRzY29wZS5nYW1lLnNldHRpbmdzLm1pblBsYXllcnMgfHwgNCkgLSAkc2NvcGUucGxheWVyQ291bnQ7XG5cbiAgICAvLyAgICAgIGNvbnN0IG15UG9wdXAgPSAkaW9uaWNQb3B1cC5zaG93KHtcbiAgICAvLyAgICAgICAgIHRlbXBsYXRlVXJsOiAnanMvaG9tZS9wb3B1cC5odG1sJyxcbiAgICAvLyAgICAgICAgIHRpdGxlOiAnSm9pbiAnICsgJHNjb3BlLmdhbWVOYW1lLFxuICAgIC8vICAgICAgICAgc2NvcGU6ICRzY29wZSxcbiAgICAvLyAgICAgICAgIGJ1dHRvbnM6IFxuICAgIC8vICAgICAgICAgW1xuICAgIC8vICAgICAgICAgICAgIHt0ZXh0OiAnR28gYmFjayd9LFxuICAgIC8vICAgICAgICAgICAgIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgdGV4dDogJ0pvaW4gZ2FtZScsXG4gICAgLy8gICAgICAgICAgICAgICAgIHR5cGU6ICdidXR0b24tYmFsYW5jZWQnLFxuICAgIC8vICAgICAgICAgICAgICAgICBvblRhcDogZSA9PiB7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAkc2NvcGUuam9pbkdhbWUoZ2FtZUlkKTtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnZ2FtZS5hY3RpdmUtZ2FtZScsIHsgZ2FtZUlkOiBnYW1lSWQgfSlcbiAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIF1cbiAgICAvLyAgICAgfSlcbiAgICAvLyB9XG59KVxuXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbG9naW4nLCB7XG4gICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbG9naW4vbG9naW4uaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdMb2dpbkN0cmwnXG4gICAgfSlcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvbG9naW4nKTtcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdMb2dpbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSwgVXNlckZhY3RvcnksICRjb3Jkb3ZhT2F1dGgsICRsb2NhbFN0b3JhZ2UsICR0aW1lb3V0LCAkaW9uaWNTaWRlTWVudURlbGVnYXRlKSB7XG4gICAgJHNjb3BlLmxvZ2luV2l0aFNsYWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBVc2VyRmFjdG9yeS5nZXRTbGFja0NyZWRzKClcbiAgICAgICAgICAgIC50aGVuKGNyZWRzID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGNvcmRvdmFPYXV0aC5zbGFjayhjcmVkcy5jbGllbnRJRCwgY3JlZHMuY2xpZW50U2VjcmV0LCBbJ2lkZW50aXR5LmJhc2ljJywgJ2lkZW50aXR5LnRlYW0nLCAnaWRlbnRpdHkuYXZhdGFyJ10pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oaW5mbyA9PiBVc2VyRmFjdG9yeS5zZXRVc2VyKGluZm8pKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gJHN0YXRlLmdvKCdob21lJykpXG4gICAgfVxuXG4gICAgJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZS5jYW5EcmFnQ29udGVudChmYWxzZSk7XG5cbiAgICAkc2NvcGUuJG9uKCckaW9uaWNWaWV3LmxlYXZlJywgZnVuY3Rpb24oKSB7ICRpb25pY1NpZGVNZW51RGVsZWdhdGUuY2FuRHJhZ0NvbnRlbnQodHJ1ZSkgfSk7XG5cbiAgICAkc2NvcGUuc3RvcmFnZSA9ICRsb2NhbFN0b3JhZ2VcblxuICAgIGZ1bmN0aW9uIHJlZGlyZWN0VXNlcigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzY29wZSBzdG9yYWdlIHVzZXJcIiwgJHNjb3BlLnN0b3JhZ2UudXNlcilcbiAgICAgICAgaWYgKCRzY29wZS5zdG9yYWdlLnVzZXIpICRzdGF0ZS5nbygnaG9tZScpXG4gICAgfVxuXG4gICAgcmVkaXJlY3RVc2VyKCk7XG59KVxuXG4iLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSA9PiB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbmV3LWdhbWUnLCB7XG4gICAgICAgIHVybDogJy9uZXctZ2FtZScsXG4gICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL21haW4uaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdOZXdHYW1lQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIHRlYW1EZWNrczogKEdhbWVGYWN0b3J5KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05hdmlnYXRpbmcgdG8gc3RhdGUgb3IgdHJ5aW5nIHRvIGhlbGxvJylcbiAgICAgICAgICAgICAgICByZXR1cm4gR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RhbmRhcmREZWNrOiAoR2FtZUZhY3RvcnkpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoMSlcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ25ldy1nYW1lLm1haW4nLCB7XG4gICAgICAgIHVybDogJy9zZXR1cC1nYW1lJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9uZXctZ2FtZS5odG1sJyxcbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5hZGQtZGVja3MnLCB7XG4gICAgICAgIHVybDogJy9hZGQtZGVja3MnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL2FkZC1kZWNrcy5odG1sJyxcbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5kZWNrJywge1xuICAgICAgICB1cmw6ICcvZGVjay86ZGVja0lkJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9kZWNrLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnRGVja0N0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBjYXJkczogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldENhcmRzQnlEZWNrSWQoJHN0YXRlUGFyYW1zLmRlY2tJZClcbiAgICAgICAgfVxuXG5cbiAgICB9KVxuXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL25ldy1nYW1lL3NldHVwLWdhbWUnKTtcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdOZXdHYW1lQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkc3RhdGUsIHRlYW1EZWNrcywgc3RhbmRhcmREZWNrKSA9PiB7XG4gICAgJHNjb3BlLmN1cnJlbnRWaWV3ID0gJ2FkZERlY2tzJ1xuICAgICRzY29wZS5nYW1lQ29uZmlnID0ge307XG4gICAgJHNjb3BlLmdhbWVDb25maWcuZGVja3MgPSB7fTtcbiAgICAkc2NvcGUuZ29Ub0RlY2tzID0gKCkgPT4ge1xuICAgICAgICAkc3RhdGUuZ28oJ25ldy1nYW1lLmFkZC1kZWNrcycsIHt9LCB7IGxvY2F0aW9uOiB0cnVlLCByZWxvYWQ6IHRydWUgfSlcbiAgICB9XG5cbiAgICAkc2NvcGUuZGVja3MgPSBzdGFuZGFyZERlY2suY29uY2F0KHRlYW1EZWNrcyk7XG5cbiAgICAkc2NvcGUuc3RhcnROZXdHYW1lID0gKGdhbWVDb25maWcpID0+IHtcbiAgICAgICAgcmV0dXJuIEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZShnYW1lQ29uZmlnKVxuICAgICAgICAgICAgLnRoZW4oKGlkKSA9PiBHYW1lRmFjdG9yeS5hZGRQaWxlVG9HYW1lKGlkLCAkc2NvcGUuZ2FtZUNvbmZpZy5kZWNrcykpXG4gICAgICAgICAgICAudGhlbigoaWQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaW0gaGVyZScpXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdnYW1lJywgeyBnYW1lSWQ6IGlkIH0pXG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgJHNjb3BlLmFkZERlY2tzVG9HYW1lID0gR2FtZUZhY3RvcnkuYWRkRGVja3M7XG4gICAgLy8gJHNjb3BlLiRvbignY2hhbmdlZEdhbWUnLCAoZXZlbnQsIGRhdGEpID0+IHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ3JlY2VpdmVkIGV2ZW50JylcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ2RhdGEgb2JqOicsIGRhdGEpXG4gICAgLy8gICAgICRzY29wZS5nYW1lID0gZGF0YTtcbiAgICAvLyAgICAgJHNjb3BlLiRkaWdlc3QoKVxuXG4gICAgLy8gfSlcblxuXG59KVxuXG5hcHAuY29udHJvbGxlcignRGVja0N0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgJHN0YXRlLCBjYXJkcykgPT4ge1xuICAgICRzY29wZS5jYXJkcyA9IGNhcmRzXG59KVxuXG4iLCIvL0RpcmVjdGl2ZSBGaWxlIiwiYXBwLmRpcmVjdGl2ZSgnd2hpdGVDYXJkcycsIGZ1bmN0aW9uKCl7XG5cblx0cmV0dXJuIHtcblxuXHRcdHJlc3RyaWN0OiAnRScsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9jb21tb24vZGlyZWN0aXZlcy93aGl0ZS1jYXJkcy5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnR2FtZUN0cmwnXG5cdH1cbn0pIiwiYXBwLmZhY3RvcnkoJ0FjdGl2ZUdhbWVGYWN0b3J5JywgKCRodHRwLCAkcm9vdFNjb3BlLCAkbG9jYWxTdG9yYWdlKSA9PiB7XG5cbiAgICBjb25zdCBBY3RpdmVHYW1lRmFjdG9yeSA9IHt9O1xuXG4gICAgY29uc3QgcmVmaWxsZXIgPSAoY2FyZHNOZWVkZWQsIHBpbGVSZWYsIGhhbmRSZWYpID0+IHtcbiAgICAgICAgcmV0dXJuIHBpbGVSZWYubGltaXRUb0ZpcnN0KGNhcmRzTmVlZGVkKS5vbmNlKCd2YWx1ZScsIGNhcmRzU25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgIGNhcmRzU25hcHNob3QuZm9yRWFjaChjYXJkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVwZGF0ZU9iaiA9IHt9XG4gICAgICAgICAgICAgICAgICAgIGNhcmQucmVmLnRyYW5zYWN0aW9uKGNhcmREYXRhID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVPYmpbY2FyZC5rZXldID0gY2FyZERhdGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IGhhbmRSZWYudXBkYXRlKHVwZGF0ZU9iaikpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgfVxuXG4gICAgQWN0aXZlR2FtZUZhY3RvcnkucmVmaWxsTXlIYW5kID0gKGdhbWVJZCwgcGxheWVySWQsIHRlYW1JZCkgPT4ge1xuICAgICAgICAvLyBob3cgbWFueSBjYXJkcyBkbyBJIG5lZWQ/XG4gICAgICAgIGxldCBjYXJkc05lZWRlZCA9IDBcbiAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgY29uc3QgaGFuZFJlZiA9IGdhbWVSZWYuY2hpbGQoYHBsYXllcnMvJHtwbGF5ZXJJZH0vaGFuZGApXG4gICAgICAgIGNvbnN0IHBpbGVSZWYgPSBnYW1lUmVmLmNoaWxkKCdwaWxlL3doaXRlY2FyZHMnKVxuICAgICAgICByZXR1cm4gaGFuZFJlZi5vbmNlKCd2YWx1ZScsIGhhbmRTbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgY2FyZHNOZWVkZWQgPSA3IC0gaGFuZFNuYXBzaG90Lm51bUNoaWxkcmVuKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlZmlsbGVyKGNhcmRzTmVlZGVkLCBwaWxlUmVmLCBoYW5kUmVmKVxuICAgICAgICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCBmaXJlYmFzZU1vdmVTaW5nbGVLZXlWYWx1ZSA9IChvbGRSZWYsIG5ld1JlZikgPT4ge1xuICAgICAgICBsZXQgcmVtb3ZlVXBkYXRlID0ge31cbiAgICAgICAgbGV0IG5ld1VwZGF0ZSA9IHt9XG4gICAgICAgIHJldHVybiBvbGRSZWYub25jZSgndmFsdWUnKVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICAgICAgLnRoZW4oc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgIHJlbW92ZVVwZGF0ZVtzbmFwc2hvdC5rZXldID0gbnVsbFxuICAgICAgICAgICAgICAgIG5ld1VwZGF0ZVtzbmFwc2hvdC5rZXldID0gc25hcHNob3QudmFsKClcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3UmVmLnVwZGF0ZShuZXdVcGRhdGUpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gb2xkUmVmLnBhcmVudC51cGRhdGUocmVtb3ZlVXBkYXRlKSlcbiAgICB9XG5cbiAgICBBY3RpdmVHYW1lRmFjdG9yeS5zdWJtaXRXaGl0ZUNhcmQgPSAocGxheWVySWQsIGNhcmRJZCwgZ2FtZUlkLCB0ZWFtSWQpID0+IHtcbiAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YCk7XG4gICAgICAgIGNvbnN0IGNhcmRUb1N1Ym1pdCA9IGdhbWVSZWYuY2hpbGQoYHBsYXllcnMvJHtwbGF5ZXJJZH0vaGFuZC8ke2NhcmRJZH1gKTtcbiAgICAgICAgY29uc3Qgc3VibWl0UmVmID0gZ2FtZVJlZi5jaGlsZCgnc3VibWl0dGVkV2hpdGVDYXJkcycpO1xuICAgICAgICBmaXJlYmFzZU1vdmVTaW5nbGVLZXlWYWx1ZShjYXJkVG9TdWJtaXQsIHN1Ym1pdFJlZilcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjYXJkVG9TdWJtaXQsIHN1Ym1pdFJlZilcbiAgICAgICAgICAgICAgICBzdWJtaXRSZWYuY2hpbGQoY2FyZElkKS5zZXQoe1xuICAgICAgICAgICAgICAgICAgICBzdWJtaXR0ZWRCeTogcGxheWVySWRcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gQWN0aXZlR2FtZUZhY3Rvcnk7XG5cblxufSk7XG5cbiIsImFwcC5mYWN0b3J5KCdHYW1lRmFjdG9yeScsICgkaHR0cCwgJHJvb3RTY29wZSwgJGxvY2FsU3RvcmFnZSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IG91cklwcyA9IHtcbiAgICAgICAgICAgIG5pa2l0YTogXCIxOTIuMTY4LjQuMjEzXCIsXG4gICAgICAgICAgICBrYXlsYTogXCIxOTIuMTY4LjQuMjI1XCIsXG4gICAgICAgICAgICBuaXRoeWE6IFwiMTkyLjE2OC4xLjQ4XCIsXG4gICAgICAgICAgICBkYW46IFwiMTkyLjE2OC40LjIzNlwiXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY3VycmVudElwID0gb3VySXBzLmRhblxuXG5cbiAgICAgICAgLy8gc3RhcnQgYSBuZXcgZ2FtZSBkZXJwXG4gICAgICAgIGNvbnN0IEdhbWVGYWN0b3J5ID0ge307XG4gICAgICAgIEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZSA9IChnYW1lQ29uZmlnKSA9PiB7XG4gICAgICAgICAgICAvL2NhbiBhbHNvIGdldCBhbGwgdGhlIGRlY2tzIGJ5IHRlYW0gaGVyZSB0byBwcmVwYXJlXG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAkbG9jYWxTdG9yYWdlLnRlYW0uaWQgfHwgMjtcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0b3JJZCA9ICRsb2NhbFN0b3JhZ2UudXNlci5pZCB8fCAzO1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZ2FtZXNgLCB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGdhbWVDb25maWcubmFtZSB8fCAnQVdFU09NRSBOYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgdGVhbUlkOiB0ZWFtSWQsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0b3JJZDogY3JlYXRvcklkLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdG9yTmFtZTogJGxvY2FsU3RvcmFnZS51c2VyLm5hbWUgfHwgJ2RhbicsIC8vbWlnaHQgYmUgdW5uZWNlc3NhcnkgaWYgd2UgaGF2ZSB0aGUgdXNlciBpZFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczogZ2FtZUNvbmZpZ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2FtZUlkID0gcmVzLmRhdGFcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGAvdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICAgICAgICAgIGdhbWVSZWYub24oJ3ZhbHVlJywgc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdjaGFuZ2VkR2FtZScsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdhbWVJZDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9O1xuICAgICAgICAvLyBnZXQgYWxsIG9mIGEgZGVja3MgY2FyZHMgdG8gZGlzcGxheSB3aGVuIGxvb2tpbmcgYXQgZGVja3NcbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0Q2FyZHNCeURlY2tJZCA9IChpZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9kZWNrcy8ke2lkfS9jYXJkc2ApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBUT0RPOiBjb21iaW5lIHRoaXMgaW50byB0aGUgYWJvdmUgc3RhcnROZXdHYW1lIGZ1bmNcbiAgICAgICAgLy8gdGFrZSBhbGwgb2YgdGhlIHNlbGVjdGVkIGRlY2tzJyBjYXJkcyBhbmQgcHV0IHRoZW0gaW4gdGhlIGZpcmViYXNlIGdhbWUgb2JqZWN0IHBpbGUgKHRocm91Z2ggcm91dGUpXG4gICAgICAgIEdhbWVGYWN0b3J5LmFkZFBpbGVUb0dhbWUgPSAoZ2FtZUlkLCBkZWNrcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZGRpbmcgcGlsZSB0byBnYW1lXCIpXG4gICAgICAgICAgICBjb25zdCBkZWNrc0FyciA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgZGVja0lkIGluIGRlY2tzKSB7XG4gICAgICAgICAgICAgICAgZGVja3NBcnIucHVzaChkZWNrSWQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0vZGVja3NgLCB7XG4gICAgICAgICAgICAgICAgICAgICdkZWNrcyc6IGRlY2tzQXJyXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBnYW1lSWQpXG4gICAgICAgIH1cblxuICAgICAgICBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAkbG9jYWxTdG9yYWdlLnRlYW0uaWQ7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJJZCA9ICRsb2NhbFN0b3JhZ2UudXNlci5pZDtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllck5hbWUgPSAkbG9jYWxTdG9yYWdlLnVzZXIubmFtZTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoJGxvY2FsU3RvcmFnZSkpO1xuICAgICAgICAgICAgY29uc3QgcGxheWVyUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH0vcGxheWVycy8ke3BsYXllcklkfWApXG4gICAgICAgICAgICBwbGF5ZXJSZWYuc2V0KHtcbiAgICAgICAgICAgICAgICBuYW1lOiBwbGF5ZXJOYW1lXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZ2FtZXMvJHtnYW1lSWR9Lz9wbGF5ZXJJZD0ke3BsYXllcklkfWApXG4gICAgICAgIH1cblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkID0gKGlkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAodHlwZW9mIGlkICE9PSAnbnVtYmVyJykgPyAkbG9jYWxTdG9yYWdlLnRlYW0uaWQgOiBpZDsgLy8gaWQgfHwgbG9jYWxzdG9yYWdlIGRvZXNuJ3Qgd29yayBiZWNhdXNlIDAgaXMgZmFsc2V5XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2RlY2tzP3RlYW09JHt0ZWFtSWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG5cbiAgICAgICAgfTtcblxuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldFVzZXJzQnlHYW1lSWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzLyR7Z2FtZUlkfS91c2Vyc2ApO1xuICAgICAgICB9O1xuXG5cblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRHYW1lQnlHYW1lSWQgPSAoZ2FtZUlkLCB0ZWFtSWQpID0+IHtcbiAgICAgICAgICAgIHRlYW1JZCA9IHRlYW1JZCB8fCAkbG9jYWxTdG9yYWdlLnRlYW0uaWRcbiAgICAgICAgICAgIGNvbnN0IGdhbWVzUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAgICAgcmV0dXJuIGdhbWVzUmVmLm9uY2UoJ3ZhbHVlJykudGhlbihzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNuYXBzaG90LnZhbCgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VGVhbUlkID0gKHRlYW1JZCkgPT4ge1xuICAgICAgICAgICAgdGVhbUlkID0gdGVhbUlkIHx8ICRsb2NhbFN0b3JhZ2UudGVhbS5pZFxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZSB0ZWFtIGlkIGlzOicsIHRlYW1JZClcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZ2FtZXMvP3RlYW1JZD0ke3RlYW1JZH1gKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgICAgIH07XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0T3BlbkdhbWVzID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gJGxvY2Fsc3RvcmFnZS50ZWFtLmlkO1xuICAgICAgICAgICAgY29uc3QgdXNlcklkID0gJGxvY2Fsc3RvcmFnZS51c2VyLmlkXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzLz90ZWFtSWQ9JHt0ZWFtSWR9JnVzZXJJZD0ke3VzZXJJZH0mb3Blbj10cnVlYClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICB9XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVVzZXIgPSAodXNlcklkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzLz91c2VySWQ9JHt1c2VySWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBHYW1lRmFjdG9yeTtcbiAgICB9XG5cbik7XG5cbiIsImFwcC5mYWN0b3J5KCdVc2VyRmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwLCAkbG9jYWxTdG9yYWdlKSB7XG4gICAgY29uc3Qgb3VySXBzID0ge1xuICAgICAgICBuaWtpdGE6IFwiMTkyLjE2OC40LjIxM1wiLFxuICAgICAgICBrYXlsYTogXCIxOTIuMTY4LjQuMjI1XCIsXG4gICAgICAgIG5pdGh5YTogXCIxOTIuMTY4LjEuNDhcIixcbiAgICAgICAgZGFuOiBcIjE5Mi4xNjguNC4yMzZcIlxuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRJcCA9IG91cklwcy5kYW5cbiAgICByZXR1cm4ge1xuICAgICAgICBzZXRVc2VyOiBmdW5jdGlvbihpbmZvKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS91c2Vyc2AsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogaW5mb1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRMb2NhbFN0b3JhZ2UocmVzLmRhdGEudXNlclswXSwgcmVzLmRhdGEudGVhbVswXSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0U2xhY2tDcmVkczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL3NsYWNrYClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmRhdGFcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBnZXRTbGFja0luZm86IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnaHR0cHM6Ly9zbGFjay5jb20vYXBpL3VzZXJzLmlkZW50aXR5JylcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRMb2NhbFN0b3JhZ2U6IGZ1bmN0aW9uKHVzZXIsIHRlYW0pIHtcbiAgICAgICAgICAgICRsb2NhbFN0b3JhZ2UudXNlciA9IHVzZXI7XG4gICAgICAgICAgICAkbG9jYWxTdG9yYWdlLnRlYW0gPSB0ZWFtO1xuICAgICAgICB9LFxuXG4gICAgICAgIGxvZ091dDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkbG9jYWxTdG9yYWdlLiRyZXNldCgpO1xuICAgICAgICB9XG4gICAgfVxufSlcblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
