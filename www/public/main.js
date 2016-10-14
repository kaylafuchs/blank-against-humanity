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
app.config(function ($stateProvider) {

    $stateProvider.state('game', {
        url: '/game/:gameId',
        templateUrl: 'js/game/game.html',
        controller: 'GameCtrl'
    });
});

app.controller('GameCtrl', function ($scope, GameFactory, $stateParams, $localStorage, ActiveGameFactory) {
    // const gameId = $stateParams.gameId;
    $scope.gameId = 32;
    var playerId = $localStorage.user.id;
    var teamId = 2;
    // const teamId = $localStorage.team.id
    var gameRef = firebase.database().ref('teams/' + teamId + '/games/' + $scope.gameId + '/');

    gameRef.on('value', function (gameSnapshot) {
        $scope.game = gameSnapshot.val();
        $scope.gameName = $scope.game.settings.name;
        $scope.playerHand = $scope.game.players[playerId].hand;
        $scope.playerHandCount = Object.keys($scope.playerHand).length;
        $scope.blackCard = $scope.game.currentBlackCard;
        $scope.blackCardText = $scope.blackCard[Object.keys($scope.blackCard)[0]];
        $scope.judge = $scope.game.currentJudge;
        $scope.players = $scope.game.players;
        $scope.submittedWhiteCards = $scope.game.submittedWhiteCards;
        $scope.$evalAsync();
    });

    ActiveGameFactory.refillMyHand($scope.gameId, playerId, teamId);

    $scope.showCards = false;

    $scope.onSwipeDown = function (gameId) {
        if ($scope.playerHandCount < 7) {
            ActiveGameFactory.refillMyHand($scope.gameId, playerId, teamId);
        }
        $scope.showCards = true;
        //GameFactory.joinGameById(gameId);
        $scope.$evalAsync();
    };

    $scope.onDoubleTap = function (cardId, cardText) {
        ActiveGameFactory.submitWhiteCard(playerId, cardId, $scope.gameId, teamId, cardText);
    };

    $scope.getSubmittedPlayers = function () {
        $scope.submittedPlayers = _.keyBy($scope.submittedWhiteCards, function (card) {
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
        //console.log(JSON.stringify($localStorage));
        var playerRef = firebase.database().ref('teams/' + teamId + '/games/' + gameId + '/players/' + playerId);
        playerRef.set({
            name: playerName
        });
        var gameRef = firebase.database().ref('teams/' + teamId + '/games/' + gameId);
        gameRef.on('value', function (snapshot) {
            $rootScope.$broadcast('changedGame', snapshot.val());
        });
        $http.post('http://' + currentIp + ':1337/api/games/' + gameId + '/?playerId=' + playerId);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImNhcmRzLXRlc3QvY2FyZHNUZXN0LmpzIiwiZGVja3MvZGVja3MuanMiLCJnYW1lL2dhbWUuanMiLCJmcm9tIGZzZy9mcm9tLWZzZy5qcyIsImhvbWUvaG9tZS5qcyIsImxvZ2luL2xvZ2luLmpzIiwibmV3LWdhbWUvbmV3LWdhbWUuanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiLCJjb21tb24vZGlyZWN0aXZlcy9zdWJtaXR0ZWQtY2FyZHMuanMiLCJjb21tb24vZGlyZWN0aXZlcy93aGl0ZS1jYXJkcy5qcyIsImNvbW1vbi9mYWN0b3JpZXMvQWN0aXZlR2FtZUZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yaWVzL0dhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy91c2VyRmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJhcHAiLCJhbmd1bGFyIiwibW9kdWxlIiwicnVuIiwiJGlvbmljUGxhdGZvcm0iLCJyZWFkeSIsImNvcmRvdmEiLCJwbHVnaW5zIiwiS2V5Ym9hcmQiLCJoaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIiLCJkaXNhYmxlU2Nyb2xsIiwiU3RhdHVzQmFyIiwic3R5bGVMaWdodENvbnRlbnQiLCJjb250cm9sbGVyIiwiJHNjb3BlIiwiVXNlckZhY3RvcnkiLCIkc3RhdGUiLCIkbG9jYWxTdG9yYWdlIiwiJHRpbWVvdXQiLCJsb2dPdXQiLCJnbyIsImNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwic3RhdGUiLCJ1cmwiLCJ0ZW1wbGF0ZVVybCIsImdyZWV0aW5nIiwicmVzb2x2ZSIsImRlY2tzIiwiR2FtZUZhY3RvcnkiLCIkc3RhdGVQYXJhbXMiLCJnZXREZWNrc0J5VGVhbUlkIiwic3RhdGVQYXJhbXMiLCJ0ZWFtSWQiLCJBY3RpdmVHYW1lRmFjdG9yeSIsImdhbWVJZCIsInBsYXllcklkIiwidXNlciIsImlkIiwiZ2FtZVJlZiIsImZpcmViYXNlIiwiZGF0YWJhc2UiLCJyZWYiLCJvbiIsImdhbWUiLCJnYW1lU25hcHNob3QiLCJ2YWwiLCJnYW1lTmFtZSIsInNldHRpbmdzIiwibmFtZSIsInBsYXllckhhbmQiLCJwbGF5ZXJzIiwiaGFuZCIsInBsYXllckhhbmRDb3VudCIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJibGFja0NhcmQiLCJjdXJyZW50QmxhY2tDYXJkIiwiYmxhY2tDYXJkVGV4dCIsImp1ZGdlIiwiY3VycmVudEp1ZGdlIiwic3VibWl0dGVkV2hpdGVDYXJkcyIsIiRldmFsQXN5bmMiLCJyZWZpbGxNeUhhbmQiLCJzaG93Q2FyZHMiLCJvblN3aXBlRG93biIsIm9uRG91YmxlVGFwIiwiY2FyZElkIiwiY2FyZFRleHQiLCJzdWJtaXRXaGl0ZUNhcmQiLCJnZXRTdWJtaXR0ZWRQbGF5ZXJzIiwic3VibWl0dGVkUGxheWVycyIsIl8iLCJrZXlCeSIsImNhcmQiLCJzdWJtaXR0ZWRCeSIsIiR1cmxSb3V0ZXJQcm92aWRlciIsImdhbWVzIiwiZ2V0R2FtZXNCeVRlYW1JZCIsIiRjb3Jkb3ZhT2F1dGgiLCIkaW9uaWNQb3B1cCIsInN0YXJ0TmV3R2FtZSIsInN0b3JhZ2UiLCJjb25zb2xlIiwibG9nIiwiSlNPTiIsInN0cmluZ2lmeSIsImdvVG9OZXdHYW1lIiwib3RoZXJ3aXNlIiwiJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZSIsImxvZ2luV2l0aFNsYWNrIiwiZ2V0U2xhY2tDcmVkcyIsInRoZW4iLCJzbGFjayIsImNyZWRzIiwiY2xpZW50SUQiLCJjbGllbnRTZWNyZXQiLCJzZXRVc2VyIiwiaW5mbyIsImNhbkRyYWdDb250ZW50IiwiJG9uIiwicmVkaXJlY3RVc2VyIiwiYWJzdHJhY3QiLCJ0ZWFtRGVja3MiLCJzdGFuZGFyZERlY2siLCJjYXJkcyIsImdldENhcmRzQnlEZWNrSWQiLCJkZWNrSWQiLCJjdXJyZW50VmlldyIsImdhbWVDb25maWciLCJnb1RvRGVja3MiLCJsb2NhdGlvbiIsInJlbG9hZCIsImNvbmNhdCIsImFkZFBpbGVUb0dhbWUiLCJhZGREZWNrc1RvR2FtZSIsImFkZERlY2tzIiwiZGlyZWN0aXZlIiwicmVzdHJpY3QiLCJmYWN0b3J5IiwiJGh0dHAiLCIkcm9vdFNjb3BlIiwicmVmaWxsZXIiLCJjYXJkc05lZWRlZCIsInBpbGVSZWYiLCJoYW5kUmVmIiwibGltaXRUb0ZpcnN0Iiwib25jZSIsImNhcmRzU25hcHNob3QiLCJmb3JFYWNoIiwidXBkYXRlT2JqIiwidHJhbnNhY3Rpb24iLCJrZXkiLCJjYXJkRGF0YSIsInVwZGF0ZSIsImNhdGNoIiwiZXJyIiwiY2hpbGQiLCJoYW5kU25hcHNob3QiLCJudW1DaGlsZHJlbiIsImZpcmViYXNlTW92ZVNpbmdsZUtleVZhbHVlIiwib2xkUmVmIiwibmV3UmVmIiwicmVtb3ZlVXBkYXRlIiwibmV3VXBkYXRlIiwic25hcHNob3QiLCJwYXJlbnQiLCJjYXJkVG9TdWJtaXQiLCJzdWJtaXRSZWYiLCJzZXQiLCJ0ZXh0Iiwib3VySXBzIiwibmlraXRhIiwia2F5bGEiLCJuaXRoeWEiLCJkYW4iLCJjdXJyZW50SXAiLCJ0ZWFtIiwiY3JlYXRvcklkIiwicG9zdCIsImNyZWF0b3JOYW1lIiwicmVzIiwiZGF0YSIsIiRicm9hZGNhc3QiLCJnZXQiLCJkZWNrc0FyciIsInB1c2giLCJqb2luR2FtZUJ5SWQiLCJwbGF5ZXJOYW1lIiwicGxheWVyUmVmIiwiZ2V0VXNlcnNCeUdhbWVJZCIsImdldEdhbWVCeUdhbWVJZCIsImdhbWVzUmVmIiwiZ2V0R2FtZXNCeVVzZXIiLCJ1c2VySWQiLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0TG9jYWxTdG9yYWdlIiwiZ2V0U2xhY2tJbmZvIiwiJHJlc2V0Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQUEsT0FBQUMsR0FBQSxHQUFBQyxRQUFBQyxNQUFBLENBQUEsc0JBQUEsRUFBQSxDQUFBLE9BQUEsRUFBQSxXQUFBLEVBQUEsV0FBQSxFQUFBLGdCQUFBLEVBQUEsV0FBQSxFQUFBLFdBQUEsQ0FBQSxDQUFBOztBQUdBRixJQUFBRyxH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Q0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDaEdBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUNwSkE1RSxJQUFBcUIsTUFBQSxDQUFBLFVBQUFDLGNBQUEsRUFBQXVELGtCQUFBLEVBQUE7QUFDQXZELG1CQUFBQyxLQUFBLENBQUEsTUFBQSxFQUFBO0FBQ0FDLGFBQUEsR0FEQTtBQUVBQyxxQkFBQSxtQkFGQTtBQUdBWixvQkFBQSxVQUhBO0FBSUFjLGlCQUFBO0FBQ0FtRCxtQkFBQSxlQUFBakQsV0FBQSxFQUFBO0FB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QUFBQSxJQUFBO0FBQ0FwQiwwQkFBQTZJLElBQUEsR0FBQUEsSUFBQTtBQUNBLFNBM0JBOztBQTZCQTNJLGdCQUFBLGtCQUFBO0FBQ0FGLDBCQUFBbUssTUFBQTtBQUNBO0FBL0JBLEtBQUE7QUFpQ0EsQ0ExQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIElvbmljIFN0YXJ0ZXIgQXBwXG5cbi8vIGFuZ3VsYXIubW9kdWxlIGlzIGEgZ2xvYmFsIHBsYWNlIGZvciBjcmVhdGluZywgcmVnaXN0ZXJpbmcgYW5kIHJldHJpZXZpbmcgQW5ndWxhciBtb2R1bGVzXG4vLyAnc3RhcnRlcicgaXMgdGhlIG5hbWUgb2YgdGhpcyBhbmd1bGFyIG1vZHVsZSBleGFtcGxlIChhbHNvIHNldCBpbiBhIDxib2R5PiBhdHRyaWJ1dGUgaW4gaW5kZXguaHRtbClcbi8vIHRoZSAybmQgcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9mICdyZXF1aXJlcydcblxud2luZG93LmFwcCA9IGFuZ3VsYXIubW9kdWxlKCdCbGFua0FnYWluc3RIdW1hbml0eScsIFsnaW9uaWMnLCAndWkucm91dGVyJywgJ25nQ29yZG92YScsICduZ0NvcmRvdmFPYXV0aCcsICduZ1N0b3JhZ2UnLCAnbmdBbmltYXRlJ10pXG5cblxuYXBwLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxuICAgICAgICAgICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcblxuICAgICAgICAgICAgLy8gRG9uJ3QgcmVtb3ZlIHRoaXMgbGluZSB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nLiBJdCBzdG9wcyB0aGUgdmlld3BvcnRcbiAgICAgICAgICAgIC8vIGZyb20gc25hcHBpbmcgd2hlbiB0ZXh0IGlucHV0cyBhcmUgZm9jdXNlZC4gSW9uaWMgaGFuZGxlcyB0aGlzIGludGVybmFsbHkgZm9yXG4gICAgICAgICAgICAvLyBhIG11Y2ggbmljZXIga2V5Ym9hcmQgZXhwZXJpZW5jZS5cbiAgICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5kaXNhYmxlU2Nyb2xsKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICAgICAgICBTdGF0dXNCYXIuc3R5bGVMaWdodENvbnRlbnQoKVxuICAgICAgICB9XG4gICAgfSk7XG5cbn0pXG5cbiIsImFwcC5jb250cm9sbGVyKCdMb2dvdXRDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBVc2VyRmFjdG9yeSwgJHN0YXRlLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCl7XG5cdCRzY29wZS5sb2dPdXQgPSBmdW5jdGlvbigpe1xuXHRcdFVzZXJGYWN0b3J5LmxvZ091dCgpXG5cdFx0JHN0YXRlLmdvKCdsb2dpbicpXG5cdH1cbn0pIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcil7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdjYXJkcycsIHtcblx0XHR1cmw6ICcvY2FyZHMnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvY2FyZHMtdGVzdC9jYXJkcy10ZXN0Lmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdDYXJkc1Rlc3RDdHJsJ1xuXHR9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0NhcmRzVGVzdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpe1xuIFx0JHNjb3BlLmdyZWV0aW5nID0gXCJISVwiXG59KSIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdkZWNrcycsIHtcblx0XHR1cmw6ICdkZWNrcy86dGVhbWlkJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2RlY2tzL2RlY2tzLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdEZWNrQ3RybCcsXG5cdFx0cmVzb2x2ZToge1xuXHRcdFx0ZGVja3M6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkKHN0YXRlUGFyYW1zLnRlYW1JZClcblx0XHR9XG5cdH0pXG5cbn0pXG5cbmFwcC5jb250cm9sbGVyKCdEZWNrQ3RybCcsICgkc2NvcGUpID0+IHtcblxuXG5cdFxufSkiLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlcikgPT4ge1xuXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2dhbWUnLCB7XG4gICAgICAgIHVybDogJy9nYW1lLzpnYW1lSWQnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2dhbWUvZ2FtZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0dhbWVDdHJsJyxcbiAgICAgICAgLy8gcmVzb2x2ZToge1xuICAgICAgICAvLyAgICAgZ2FtZSA6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXRHYW1lQnlHYW1lSWQoJHN0YXRlUGFyYW1zLmdhbWVJZClcbiAgICAgICAgLy8gfSAgXG4gICAgfSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdHYW1lQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMsICRsb2NhbFN0b3JhZ2UsIEFjdGl2ZUdhbWVGYWN0b3J5KSA9PiB7ICAgXG4gICAgLy8gY29uc3QgZ2FtZUlkID0gJHN0YXRlUGFyYW1zLmdhbWVJZDtcbiAgICAkc2NvcGUuZ2FtZUlkID0gMzI7XG4gICAgY29uc3QgcGxheWVySWQgPSAkbG9jYWxTdG9yYWdlLnVzZXIuaWQ7XG4gICAgY29uc3QgdGVhbUlkID0gMjsgXG4gICAgLy8gY29uc3QgdGVhbUlkID0gJGxvY2FsU3RvcmFnZS50ZWFtLmlkXG4gICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHskc2NvcGUuZ2FtZUlkfS9gKTsgXG5cbiAgICBnYW1lUmVmLm9uKCd2YWx1ZScsIGdhbWVTbmFwc2hvdCA9PiB7XG4gICAgICAgICRzY29wZS5nYW1lID0gZ2FtZVNuYXBzaG90LnZhbCgpO1xuICAgICAgICAkc2NvcGUuZ2FtZU5hbWUgPSAkc2NvcGUuZ2FtZS5zZXR0aW5ncy5uYW1lO1xuICAgICAgICAkc2NvcGUucGxheWVySGFuZCA9ICRzY29wZS5nYW1lLnBsYXllcnNbcGxheWVySWRdLmhhbmQ7XG4gICAgICAgICRzY29wZS5wbGF5ZXJIYW5kQ291bnQgPSBPYmplY3Qua2V5cygkc2NvcGUucGxheWVySGFuZCkubGVuZ3RoOyBcbiAgICAgICAgJHNjb3BlLmJsYWNrQ2FyZCA9ICRzY29wZS5nYW1lLmN1cnJlbnRCbGFja0NhcmQ7XG4gICAgICAgICRzY29wZS5ibGFja0NhcmRUZXh0ID0gJHNjb3BlLmJsYWNrQ2FyZFtPYmplY3Qua2V5cygkc2NvcGUuYmxhY2tDYXJkKVswXV1cbiAgICAgICAgJHNjb3BlLmp1ZGdlID0gJHNjb3BlLmdhbWUuY3VycmVudEp1ZGdlO1xuICAgICAgICAkc2NvcGUucGxheWVycyA9ICRzY29wZS5nYW1lLnBsYXllcnM7XG4gICAgICAgICRzY29wZS5zdWJtaXR0ZWRXaGl0ZUNhcmRzPSAkc2NvcGUuZ2FtZS5zdWJtaXR0ZWRXaGl0ZUNhcmRzXG4gICAgICAgICRzY29wZS4kZXZhbEFzeW5jKCk7XG4gICAgfSlcblxuXG4gICAgQWN0aXZlR2FtZUZhY3RvcnkucmVmaWxsTXlIYW5kKCRzY29wZS5nYW1lSWQsIHBsYXllcklkLCB0ZWFtSWQpXG4gICAgXG4gICAgJHNjb3BlLnNob3dDYXJkcyA9IGZhbHNlO1xuXG5cbiAgICAkc2NvcGUub25Td2lwZURvd24gPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgIGlmKCRzY29wZS5wbGF5ZXJIYW5kQ291bnQ8Nyl7XG4gICAgICAgICAgICBBY3RpdmVHYW1lRmFjdG9yeS5yZWZpbGxNeUhhbmQoJHNjb3BlLmdhbWVJZCwgcGxheWVySWQsIHRlYW1JZClcbiAgICAgICAgfVxuICAgICAgICAkc2NvcGUuc2hvd0NhcmRzID0gdHJ1ZSA7XG4gICAgICAgIC8vR2FtZUZhY3Rvcnkuam9pbkdhbWVCeUlkKGdhbWVJZCk7XG4gICAgICAgICRzY29wZS4kZXZhbEFzeW5jKCk7XG4gICAgfSAgXG5cbiAgICAkc2NvcGUub25Eb3VibGVUYXAgPSAoY2FyZElkLCBjYXJkVGV4dCkgPT4ge1xuICAgICAgICBBY3RpdmVHYW1lRmFjdG9yeS5zdWJtaXRXaGl0ZUNhcmQocGxheWVySWQsIGNhcmRJZCwgJHNjb3BlLmdhbWVJZCwgdGVhbUlkLCBjYXJkVGV4dClcbiAgICB9XG5cblxuXG4gICAgJHNjb3BlLmdldFN1Ym1pdHRlZFBsYXllcnMgPSAoKSA9PiB7XG4gICAgICAgICRzY29wZS5zdWJtaXR0ZWRQbGF5ZXJzID0gIF8ua2V5QnkoJHNjb3BlLnN1Ym1pdHRlZFdoaXRlQ2FyZHMsIGNhcmQgPT57XG4gICAgICAgICAgICByZXR1cm4gY2FyZC5zdWJtaXR0ZWRCeTsgXG4gICAgICAgIH0pXG4gICAgfVxuXG5cblxuXG59KVxuXG5cbi8vIGFwcC5jb250cm9sbGVyKFwiQWN0aXZlR2FtZUN0cmxcIiwgKCRzY29wZSwgR2FtZUZhY3RvcnksIEFjdGl2ZUdhbWVGYWN0b3J5LCBnYW1lLCAkc3RhdGVQYXJhbXMsICRsb2NhbFN0b3JhZ2UsICRzdGF0ZSkgPT4ge1xuXG4gICAgXG4vLyAgICAgJHNjb3BlLm9uU3dpcGVEb3duID0gKCkgPT4ge1xuLy8gICAgICAgICBjb25zb2xlLmxvZygnd29ya2luZycpO1xuLy8gICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuc2hvd0NhcmRzKTtcbi8vICAgICAgICAgJHNjb3BlLnNob3dDYXJkcyA9IHRydWUgO1xuLy8gICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuc2hvd0NhcmRzKTtcbi8vICAgICAgICAgJHNjb3BlLiRldmFsQXN5bmMoKTtcbi8vICAgICB9XG5cbi8vICAgICAkc2NvcGUub25Td2lwZVVwID0gKCkgPT4ge1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhcInN3aXBlZCB1cFwiKTtcbi8vICAgICB9XG5cbi8vICAgICAkc2NvcGUub25Eb3VibGVUYXAgPSAoa2V5KSA9PiB7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwiZG91YmxlIHRhcHBlZFwiKVxuLy8gICAgICAgICAkc2NvcGUucGxheWVkID0gdHJ1ZTtcbi8vICAgICAgICAgLy9jYWxsIHN1Ym1pdCBjYXJkIGZ1bmN0aW9uIGhlcmUuXG4vLyAgICAgfVxuXG4vLyAgICAgQWN0aXZlR2FtZUZhY3RvcnkucmVmaWxsTXlIYW5kKCRzY29wZS5nYW1lSWQsICRzY29wZS5wbGF5ZXJJZCwgJHNjb3BlLnRlYW1JZCk7XG5cbi8vICAgICAkc2NvcGUuJG9uKCdjaGFuZ2VkR2FtZScsIChldmVudCxzbmFwc2hvdCkgPT57XG4vLyAgICAgICAgICRzY29wZS5nYW1lID0gc25hcHNob3Q7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5nYW1lKTtcbi8vICAgICAgICAgaWYoZ2FtZS5zdGF0ZSA9PT0gJ3N1Ym1pc3Npb24nKXtcbi8vICAgICAgICAgICAgICRzdGF0ZS5nbygnZ2FtZS5zdWJtaXNzaW9uLWdhbWUnKVxuLy8gICAgICAgICB9IFxuLy8gICAgIH0pXG4vLyB9KVxuXG5cblxuIiwiLy8gKGZ1bmN0aW9uICgpIHtcblxuLy8gICAgICd1c2Ugc3RyaWN0JztcblxuLy8gICAgIC8vIEhvcGUgeW91IGRpZG4ndCBmb3JnZXQgQW5ndWxhciEgRHVoLWRveS5cbi8vICAgICBpZiAoIXdpbmRvdy5hbmd1bGFyKSB0aHJvdyBuZXcgRXJyb3IoJ0kgY2FuXFwndCBmaW5kIEFuZ3VsYXIhJyk7XG5cbi8vICAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2ZzYVByZUJ1aWx0JywgW10pO1xuXG4vLyAgICAgYXBwLmZhY3RvcnkoJ1NvY2tldCcsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgaWYgKCF3aW5kb3cuaW8pIHRocm93IG5ldyBFcnJvcignc29ja2V0LmlvIG5vdCBmb3VuZCEnKTtcbi8vICAgICAgICAgcmV0dXJuIHdpbmRvdy5pbyh3aW5kb3cubG9jYXRpb24ub3JpZ2luKTtcbi8vICAgICB9KTtcblxuLy8gICAgIC8vIEFVVEhfRVZFTlRTIGlzIHVzZWQgdGhyb3VnaG91dCBvdXIgYXBwIHRvXG4vLyAgICAgLy8gYnJvYWRjYXN0IGFuZCBsaXN0ZW4gZnJvbSBhbmQgdG8gdGhlICRyb290U2NvcGVcbi8vICAgICAvLyBmb3IgaW1wb3J0YW50IGV2ZW50cyBhYm91dCBhdXRoZW50aWNhdGlvbiBmbG93LlxuLy8gICAgIGFwcC5jb25zdGFudCgnQVVUSF9FVkVOVFMnLCB7XG4vLyAgICAgICAgIGxvZ2luU3VjY2VzczogJ2F1dGgtbG9naW4tc3VjY2VzcycsXG4vLyAgICAgICAgIGxvZ2luRmFpbGVkOiAnYXV0aC1sb2dpbi1mYWlsZWQnLFxuLy8gICAgICAgICBsb2dvdXRTdWNjZXNzOiAnYXV0aC1sb2dvdXQtc3VjY2VzcycsXG4vLyAgICAgICAgIHNlc3Npb25UaW1lb3V0OiAnYXV0aC1zZXNzaW9uLXRpbWVvdXQnLFxuLy8gICAgICAgICBub3RBdXRoZW50aWNhdGVkOiAnYXV0aC1ub3QtYXV0aGVudGljYXRlZCcsXG4vLyAgICAgICAgIG5vdEF1dGhvcml6ZWQ6ICdhdXRoLW5vdC1hdXRob3JpemVkJ1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLmZhY3RvcnkoJ0F1dGhJbnRlcmNlcHRvcicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkcSwgQVVUSF9FVkVOVFMpIHtcbi8vICAgICAgICAgdmFyIHN0YXR1c0RpY3QgPSB7XG4vLyAgICAgICAgICAgICA0MDE6IEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsXG4vLyAgICAgICAgICAgICA0MDM6IEFVVEhfRVZFTlRTLm5vdEF1dGhvcml6ZWQsXG4vLyAgICAgICAgICAgICA0MTk6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0LFxuLy8gICAgICAgICAgICAgNDQwOiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dFxuLy8gICAgICAgICB9O1xuLy8gICAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAgICAgcmVzcG9uc2VFcnJvcjogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KHN0YXR1c0RpY3RbcmVzcG9uc2Uuc3RhdHVzXSwgcmVzcG9uc2UpO1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzcG9uc2UpXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH07XG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuY29uZmlnKGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XG4vLyAgICAgICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goW1xuLy8gICAgICAgICAgICAgJyRpbmplY3RvcicsXG4vLyAgICAgICAgICAgICBmdW5jdGlvbiAoJGluamVjdG9yKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRpbmplY3Rvci5nZXQoJ0F1dGhJbnRlcmNlcHRvcicpO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICBdKTtcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5zZXJ2aWNlKCdBdXRoU2VydmljZScsIGZ1bmN0aW9uICgkaHR0cCwgU2Vzc2lvbiwgJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMsICRxKSB7XG5cbi8vICAgICAgICAgZnVuY3Rpb24gb25TdWNjZXNzZnVsTG9naW4ocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgIHZhciB1c2VyID0gcmVzcG9uc2UuZGF0YS51c2VyO1xuLy8gICAgICAgICAgICAgU2Vzc2lvbi5jcmVhdGUodXNlcik7XG4vLyAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoQVVUSF9FVkVOVFMubG9naW5TdWNjZXNzKTtcbi8vICAgICAgICAgICAgIHJldHVybiB1c2VyO1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgLy8gVXNlcyB0aGUgc2Vzc2lvbiBmYWN0b3J5IHRvIHNlZSBpZiBhblxuLy8gICAgICAgICAvLyBhdXRoZW50aWNhdGVkIHVzZXIgaXMgY3VycmVudGx5IHJlZ2lzdGVyZWQuXG4vLyAgICAgICAgIHRoaXMuaXNBdXRoZW50aWNhdGVkID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuICEhU2Vzc2lvbi51c2VyO1xuLy8gICAgICAgICB9O1xuXG4gICAgICAgIFxuLy8gICAgICAgICB0aGlzLmlzQWRtaW4gPSBmdW5jdGlvbih1c2VySWQpe1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ3J1bm5pbmcgYWRtaW4gZnVuYycpXG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpXG4vLyAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhLnVzZXIuaXNBZG1pbilcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIHRoaXMuZ2V0TG9nZ2VkSW5Vc2VyID0gZnVuY3Rpb24gKGZyb21TZXJ2ZXIpIHtcblxuLy8gICAgICAgICAgICAgLy8gSWYgYW4gYXV0aGVudGljYXRlZCBzZXNzaW9uIGV4aXN0cywgd2Vcbi8vICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgdXNlciBhdHRhY2hlZCB0byB0aGF0IHNlc3Npb25cbi8vICAgICAgICAgICAgIC8vIHdpdGggYSBwcm9taXNlLiBUaGlzIGVuc3VyZXMgdGhhdCB3ZSBjYW5cbi8vICAgICAgICAgICAgIC8vIGFsd2F5cyBpbnRlcmZhY2Ugd2l0aCB0aGlzIG1ldGhvZCBhc3luY2hyb25vdXNseS5cblxuLy8gICAgICAgICAgICAgLy8gT3B0aW9uYWxseSwgaWYgdHJ1ZSBpcyBnaXZlbiBhcyB0aGUgZnJvbVNlcnZlciBwYXJhbWV0ZXIsXG4vLyAgICAgICAgICAgICAvLyB0aGVuIHRoaXMgY2FjaGVkIHZhbHVlIHdpbGwgbm90IGJlIHVzZWQuXG5cbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlzQXV0aGVudGljYXRlZCgpICYmIGZyb21TZXJ2ZXIgIT09IHRydWUpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbihTZXNzaW9uLnVzZXIpO1xuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICAvLyBNYWtlIHJlcXVlc3QgR0VUIC9zZXNzaW9uLlxuLy8gICAgICAgICAgICAgLy8gSWYgaXQgcmV0dXJucyBhIHVzZXIsIGNhbGwgb25TdWNjZXNzZnVsTG9naW4gd2l0aCB0aGUgcmVzcG9uc2UuXG4vLyAgICAgICAgICAgICAvLyBJZiBpdCByZXR1cm5zIGEgNDAxIHJlc3BvbnNlLCB3ZSBjYXRjaCBpdCBhbmQgaW5zdGVhZCByZXNvbHZlIHRvIG51bGwuXG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbi8vICAgICAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5sb2dpbiA9IGZ1bmN0aW9uIChjcmVkZW50aWFscykge1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9sb2dpbicsIGNyZWRlbnRpYWxzKVxuLy8gICAgICAgICAgICAgICAgIC50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKVxuLy8gICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QoeyBtZXNzYWdlOiAnSW52YWxpZCBsb2dpbiBjcmVkZW50aWFscy4nfSk7XG4vLyAgICAgICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5zaWdudXAgPSBmdW5jdGlvbihjcmVkZW50aWFscyl7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuLy8gICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuLy8gICAgICAgICAgICAgICAgIHVybDogJy9zaWdudXAnLFxuLy8gICAgICAgICAgICAgICAgIGRhdGE6IGNyZWRlbnRpYWxzXG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5kYXRhKVxuLy8gICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKCl7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCh7bWVzc2FnZTogJ1RoYXQgZW1haWwgaXMgYWxyZWFkeSBiZWluZyB1c2VkLid9KTtcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5sb2dvdXQgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvbG9nb3V0JykudGhlbihmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgU2Vzc2lvbi5kZXN0cm95KCk7XG4vLyAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ291dFN1Y2Nlc3MpO1xuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5zZXJ2aWNlKCdTZXNzaW9uJywgZnVuY3Rpb24gKCRyb290U2NvcGUsIEFVVEhfRVZFTlRTKSB7XG5cbi8vICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4vLyAgICAgICAgICRyb290U2NvcGUuJG9uKEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCwgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgc2VsZi5kZXN0cm95KCk7XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XG5cbi8vICAgICAgICAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbiAodXNlcikge1xuLy8gICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgfSk7XG5cbi8vIH0oKSk7XG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgdXJsOiAnLycsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvaG9tZS9ob21lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnSG9tZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBnYW1lczogZnVuY3Rpb24oR2FtZUZhY3RvcnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUsICRjb3Jkb3ZhT2F1dGgsIFVzZXJGYWN0b3J5LCBHYW1lRmFjdG9yeSwgJGxvY2FsU3RvcmFnZSwgZ2FtZXMsICRpb25pY1BvcHVwKSB7XG4gICAgJHNjb3BlLnN0YXJ0TmV3R2FtZSA9IEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZTtcbiAgICAkc2NvcGUuc3RvcmFnZSA9ICRsb2NhbFN0b3JhZ2U7XG4gICAgJHNjb3BlLmdhbWVzID0gZ2FtZXM7XG5cbiAgICBjb25zb2xlLmxvZyhcImdhbWVzXCIsIEpTT04uc3RyaW5naWZ5KCRzY29wZS5nYW1lcykpXG4gICAgJHNjb3BlLmdvVG9OZXdHYW1lID0gKCkgPT4ge1xuICAgICAgICAkc3RhdGUuZ28oJ25ldy1nYW1lLm1haW4nKVxuICAgIH1cblxuXG4gICAgLy8gJHNjb3BlLmpvaW5HYW1lID0gR2FtZUZhY3Rvcnkuam9pbkdhbWVCeUlkO1xuXG4gICAgLy8gJHNjb3BlLnNob3dQb3B1cCA9IGZ1bmN0aW9uKGdhbWVJZCkge1xuXG4gICAgLy8gICAgICRzY29wZS5nYW1lID0gJHNjb3BlLmdhbWVzW2dhbWVJZF07XG4gICAgLy8gICAgICRzY29wZS5nYW1lTmFtZSA9ICRzY29wZS5nYW1lLnNldHRpbmdzLm5hbWU7XG4gICAgLy8gICAgICRzY29wZS5wbGF5ZXJDb3VudCA9IE9iamVjdC5rZXlzKCRzY29wZS5nYW1lLnBsYXllcnMpLmxlbmd0aDtcbiAgICAvLyAgICAgJHNjb3BlLndhaXRpbmdGb3JQbGF5ZXJzID0gICgkc2NvcGUuZ2FtZS5zZXR0aW5ncy5taW5QbGF5ZXJzIHx8IDQpIC0gJHNjb3BlLnBsYXllckNvdW50O1xuICAgICAgICAgXG4gICAgLy8gICAgICBjb25zdCBteVBvcHVwID0gJGlvbmljUG9wdXAuc2hvdyh7XG4gICAgLy8gICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2hvbWUvcG9wdXAuaHRtbCcsXG4gICAgLy8gICAgICAgICB0aXRsZTogJ0pvaW4gJyArICRzY29wZS5nYW1lTmFtZSxcbiAgICAvLyAgICAgICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgLy8gICAgICAgICBidXR0b25zOiBcbiAgICAvLyAgICAgICAgIFtcbiAgICAvLyAgICAgICAgICAgICB7dGV4dDogJ0dvIGJhY2snfSxcbiAgICAvLyAgICAgICAgICAgICB7XG4gICAgLy8gICAgICAgICAgICAgICAgIHRleHQ6ICdKb2luIGdhbWUnLFxuICAgIC8vICAgICAgICAgICAgICAgICB0eXBlOiAnYnV0dG9uLWJhbGFuY2VkJyxcbiAgICAvLyAgICAgICAgICAgICAgICAgb25UYXA6IGUgPT4ge1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmpvaW5HYW1lKGdhbWVJZCk7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2dhbWUuYWN0aXZlLWdhbWUnLCB7IGdhbWVJZDogZ2FtZUlkIH0pXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICBdXG4gICAgLy8gICAgIH0pXG4gICAgLy8gfVxufSlcblxuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2xvZ2luJywge1xuICAgICAgICB1cmw6ICcvbG9naW4nLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2xvZ2luL2xvZ2luLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnTG9naW5DdHJsJ1xuICAgIH0pXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2xvZ2luJyk7XG59KVxuXG5hcHAuY29udHJvbGxlcignTG9naW5DdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUsIFVzZXJGYWN0b3J5LCAkY29yZG92YU9hdXRoLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCwgJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZSkge1xuICAgICRzY29wZS5sb2dpbldpdGhTbGFjayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gVXNlckZhY3RvcnkuZ2V0U2xhY2tDcmVkcygpXG4gICAgICAgICAgICAudGhlbihjcmVkcyA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRjb3Jkb3ZhT2F1dGguc2xhY2soY3JlZHMuY2xpZW50SUQsIGNyZWRzLmNsaWVudFNlY3JldCwgWydpZGVudGl0eS5iYXNpYycsICdpZGVudGl0eS50ZWFtJywgJ2lkZW50aXR5LmF2YXRhciddKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKGluZm8gPT4gVXNlckZhY3Rvcnkuc2V0VXNlcihpbmZvKSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+ICRzdGF0ZS5nbygnaG9tZScpKVxuICAgIH1cblxuICAgICRpb25pY1NpZGVNZW51RGVsZWdhdGUuY2FuRHJhZ0NvbnRlbnQoZmFsc2UpO1xuXG4gICAgJHNjb3BlLiRvbignJGlvbmljVmlldy5sZWF2ZScsIGZ1bmN0aW9uKCkgeyAkaW9uaWNTaWRlTWVudURlbGVnYXRlLmNhbkRyYWdDb250ZW50KHRydWUpIH0pO1xuXG4gICAgJHNjb3BlLnN0b3JhZ2UgPSAkbG9jYWxTdG9yYWdlXG5cbiAgICBmdW5jdGlvbiByZWRpcmVjdFVzZXIoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic2NvcGUgc3RvcmFnZSB1c2VyXCIsICRzY29wZS5zdG9yYWdlLnVzZXIpXG4gICAgICAgIGlmICgkc2NvcGUuc3RvcmFnZS51c2VyKSAkc3RhdGUuZ28oJ2hvbWUnKVxuICAgIH1cblxuICAgIHJlZGlyZWN0VXNlcigpO1xufSlcblxuIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikgPT4ge1xuXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ25ldy1nYW1lJywge1xuICAgICAgICB1cmw6ICcvbmV3LWdhbWUnLFxuICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9tYWluLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnTmV3R2FtZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICB0ZWFtRGVja3M6IChHYW1lRmFjdG9yeSkgPT4gR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCgpLFxuICAgICAgICAgICAgc3RhbmRhcmREZWNrOiAoR2FtZUZhY3RvcnkpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoMSlcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ25ldy1nYW1lLm1haW4nLCB7XG4gICAgICAgIHVybDogJy9zZXR1cC1nYW1lJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9uZXctZ2FtZS5odG1sJyxcbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5hZGQtZGVja3MnLCB7XG4gICAgICAgIHVybDogJy9hZGQtZGVja3MnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL2FkZC1kZWNrcy5odG1sJyxcbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5kZWNrJywge1xuICAgICAgICB1cmw6ICcvZGVjay86ZGVja0lkJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9kZWNrLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnRGVja0N0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBjYXJkczogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldENhcmRzQnlEZWNrSWQoJHN0YXRlUGFyYW1zLmRlY2tJZClcbiAgICAgICAgfVxuXG5cbiAgICB9KVxuXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL25ldy1nYW1lL3NldHVwLWdhbWUnKTtcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdOZXdHYW1lQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkc3RhdGUsIHRlYW1EZWNrcywgc3RhbmRhcmREZWNrKSA9PiB7XG4gICAgJHNjb3BlLmN1cnJlbnRWaWV3ID0gJ2FkZERlY2tzJ1xuICAgICRzY29wZS5nYW1lQ29uZmlnID0ge307XG4gICAgJHNjb3BlLmdhbWVDb25maWcuZGVja3MgPSB7fTtcbiAgICAkc2NvcGUuZ29Ub0RlY2tzID0gKCkgPT4ge1xuICAgICAgICAkc3RhdGUuZ28oJ25ldy1nYW1lLmFkZC1kZWNrcycsIHt9LCB7IGxvY2F0aW9uOiB0cnVlLCByZWxvYWQ6IHRydWUgfSlcbiAgICB9XG5cbiAgICAkc2NvcGUuZGVja3MgPSBzdGFuZGFyZERlY2suY29uY2F0KHRlYW1EZWNrcyk7XG5cbiAgICAkc2NvcGUuc3RhcnROZXdHYW1lID0gKGdhbWVDb25maWcpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJjYWxsZWQgc3RhcnQgbmV3IGdhbWVcIilcbiAgICAgICAgR2FtZUZhY3Rvcnkuc3RhcnROZXdHYW1lKGdhbWVDb25maWcpLnRoZW4oKGlkKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1hZGUgaXQgdG8gdGhlIC50aGVuXCIpXG4gICAgICAgICAgICBHYW1lRmFjdG9yeS5hZGRQaWxlVG9HYW1lKGlkLCAkc2NvcGUuZ2FtZUNvbmZpZy5kZWNrcylcbiAgICAgICAgICAgICRzdGF0ZS5nbygnZ2FtZS5hY3RpdmUtZ2FtZScsIHsgZ2FtZUlkOiBpZCB9KVxuXG5cbiAgICAgICAgfSlcbiAgICB9XG4gICAgJHNjb3BlLmFkZERlY2tzVG9HYW1lID0gR2FtZUZhY3RvcnkuYWRkRGVja3M7XG4gICAgLy8gJHNjb3BlLiRvbignY2hhbmdlZEdhbWUnLCAoZXZlbnQsIGRhdGEpID0+IHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ3JlY2VpdmVkIGV2ZW50JylcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ2RhdGEgb2JqOicsIGRhdGEpXG4gICAgLy8gICAgICRzY29wZS5nYW1lID0gZGF0YTtcbiAgICAvLyAgICAgJHNjb3BlLiRkaWdlc3QoKVxuXG4gICAgLy8gfSlcblxuXG59KVxuXG5hcHAuY29udHJvbGxlcignRGVja0N0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgJHN0YXRlLCBjYXJkcykgPT4ge1xuICAgICRzY29wZS5jYXJkcyA9IGNhcmRzXG59KVxuXG4iLCIvL0RpcmVjdGl2ZSBGaWxlIiwiYXBwLmRpcmVjdGl2ZSgnc3VibWl0dGVkQ2FyZHMnLCBmdW5jdGlvbigpe1xuXG5cdHJldHVybiB7XG5cblx0XHRyZXN0cmljdDogJ0UnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvY29tbW9uL2RpcmVjdGl2ZXMvc3VibWl0dGVkLWNhcmRzLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdHYW1lQ3RybCdcblx0fVxufSkiLCJhcHAuZGlyZWN0aXZlKCd3aGl0ZUNhcmRzJywgZnVuY3Rpb24oKXtcblxuXHRyZXR1cm4ge1xuXG5cdFx0cmVzdHJpY3Q6ICdFJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2NvbW1vbi9kaXJlY3RpdmVzL3doaXRlLWNhcmRzLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdHYW1lQ3RybCdcblx0fVxufSkiLCJhcHAuZmFjdG9yeSgnQWN0aXZlR2FtZUZhY3RvcnknLCAoJGh0dHAsICRyb290U2NvcGUsICRsb2NhbFN0b3JhZ2UpID0+IHtcblxuICAgICAgICBjb25zdCBBY3RpdmVHYW1lRmFjdG9yeSA9IHt9O1xuXG4gICAgICAgIGNvbnN0IHJlZmlsbGVyID0gKGNhcmRzTmVlZGVkLCBwaWxlUmVmLCBoYW5kUmVmKSA9PiB7XG4gICAgICAgICAgcGlsZVJlZi5saW1pdFRvRmlyc3QoY2FyZHNOZWVkZWQpLm9uY2UoJ3ZhbHVlJywgY2FyZHNTbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICBjYXJkc1NuYXBzaG90LmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgICAgICAgIGxldCB1cGRhdGVPYmogPSB7fVxuICAgICAgICAgICAgICBjYXJkLnJlZi50cmFuc2FjdGlvbihjYXJkRGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICB1cGRhdGVPYmpbY2FyZC5rZXldID0gY2FyZERhdGFcbiAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBoYW5kUmVmLnVwZGF0ZSh1cGRhdGVPYmopKVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgICAgIH1cblxuICAgICAgICBBY3RpdmVHYW1lRmFjdG9yeS5yZWZpbGxNeUhhbmQgPSAoZ2FtZUlkLCBwbGF5ZXJJZCwgdGVhbUlkKSA9PiB7XG4gICAgICAgICAgLy8gaG93IG1hbnkgY2FyZHMgZG8gSSBuZWVkP1xuICAgICAgICAgIGxldCBjYXJkc05lZWRlZCA9IDBcbiAgICAgICAgICBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAgIGNvbnN0IGhhbmRSZWYgPSBnYW1lUmVmLmNoaWxkKGBwbGF5ZXJzLyR7cGxheWVySWR9L2hhbmRgKVxuICAgICAgICAgIGNvbnN0IHBpbGVSZWYgPSBnYW1lUmVmLmNoaWxkKCdwaWxlL3doaXRlY2FyZHMnKVxuICAgICAgICAgIGhhbmRSZWYub25jZSgndmFsdWUnLCBoYW5kU25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICBjYXJkc05lZWRlZCA9IDcgLSBoYW5kU25hcHNob3QubnVtQ2hpbGRyZW4oKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgcmVmaWxsZXIoY2FyZHNOZWVkZWQsIHBpbGVSZWYsIGhhbmRSZWYpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZmlyZWJhc2VNb3ZlU2luZ2xlS2V5VmFsdWUgPSAob2xkUmVmLCBuZXdSZWYpID0+IHtcbiAgICAgICAgICAgIGxldCByZW1vdmVVcGRhdGUgPSB7fVxuICAgICAgICAgICAgbGV0IG5ld1VwZGF0ZSA9IHt9XG4gICAgICAgICAgICByZXR1cm4gb2xkUmVmLm9uY2UoJ3ZhbHVlJylcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgICAgICAgICAgICAgLnRoZW4oc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVVcGRhdGVbc25hcHNob3Qua2V5XSA9IG51bGxcbiAgICAgICAgICAgICAgICAgICAgbmV3VXBkYXRlW3NuYXBzaG90LmtleV0gPSBzbmFwc2hvdC52YWwoKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3UmVmLnVwZGF0ZShuZXdVcGRhdGUpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBvbGRSZWYucGFyZW50LnVwZGF0ZShyZW1vdmVVcGRhdGUpKVxuICAgICAgICB9XG5cbiAgICAgICAgQWN0aXZlR2FtZUZhY3Rvcnkuc3VibWl0V2hpdGVDYXJkID0gKHBsYXllcklkLCBjYXJkSWQsIGdhbWVJZCwgdGVhbUlkLCBjYXJkVGV4dCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApO1xuICAgICAgICAgIGNvbnN0IGNhcmRUb1N1Ym1pdCA9IGdhbWVSZWYuY2hpbGQoYHBsYXllcnMvJHtwbGF5ZXJJZH0vaGFuZC8ke2NhcmRJZH1gKTtcbiAgICAgICAgICBjb25zdCBzdWJtaXRSZWYgPSBnYW1lUmVmLmNoaWxkKCdzdWJtaXR0ZWRXaGl0ZUNhcmRzJyk7XG4gICAgICAgICAgZmlyZWJhc2VNb3ZlU2luZ2xlS2V5VmFsdWUoY2FyZFRvU3VibWl0LCBzdWJtaXRSZWYpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHN1Ym1pdFJlZi5jaGlsZChjYXJkSWQpLnNldCh7XG4gICAgICAgICAgICAgICAgc3VibWl0dGVkQnk6IHBsYXllcklkLFxuICAgICAgICAgICAgICAgIHRleHQ6IGNhcmRUZXh0XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gQWN0aXZlR2FtZUZhY3Rvcnk7IFxuXG5cbn0pOyIsImFwcC5mYWN0b3J5KCdHYW1lRmFjdG9yeScsICgkaHR0cCwgJHJvb3RTY29wZSwgJGxvY2FsU3RvcmFnZSkgPT4ge1xuXG4gICAgICAgIGNvbnN0IG91cklwcyA9IHtcbiAgICAgICAgICAgIG5pa2l0YTogXCIxOTIuMTY4LjQuMjEzXCIsXG4gICAgICAgICAgICBrYXlsYTogXCIxOTIuMTY4LjQuMjI1XCIsXG4gICAgICAgICAgICBuaXRoeWE6IFwiMTkyLjE2OC4xLjQ4XCIsXG4gICAgICAgICAgICBkYW46IFwiMTkyLjE2OC40LjIzNlwiXG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgY3VycmVudElwID0gb3VySXBzLm5pdGh5YVxuXG5cbiAgICAgICAgLy8gc3RhcnQgYSBuZXcgZ2FtZSBkZXJwXG4gICAgICAgIGNvbnN0IEdhbWVGYWN0b3J5ID0ge307XG4gICAgICAgIEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZSA9IChnYW1lQ29uZmlnKSA9PiB7XG4gICAgICAgICAgICAvL2NhbiBhbHNvIGdldCBhbGwgdGhlIGRlY2tzIGJ5IHRlYW0gaGVyZSB0byBwcmVwYXJlXG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAkbG9jYWxTdG9yYWdlLnRlYW0uaWQgfHwgMjtcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0b3JJZCA9ICRsb2NhbFN0b3JhZ2UudXNlci5pZCB8fCAzO1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZ2FtZXNgLCB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGdhbWVDb25maWcubmFtZSB8fCAnQVdFU09NRSBOYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgdGVhbUlkOiB0ZWFtSWQsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0b3JJZDogY3JlYXRvcklkLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdG9yTmFtZTogJGxvY2FsU3RvcmFnZS51c2VyLm5hbWUgfHwgJ2RhbicsIC8vbWlnaHQgYmUgdW5uZWNlc3NhcnkgaWYgd2UgaGF2ZSB0aGUgdXNlciBpZFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczogZ2FtZUNvbmZpZ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2FtZUlkID0gcmVzLmRhdGFcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGAvdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICAgICAgICAgIGdhbWVSZWYub24oJ3ZhbHVlJywgc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdjaGFuZ2VkR2FtZScsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdhbWVJZDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9O1xuICAgICAgICAvLyBnZXQgYWxsIG9mIGEgZGVja3MgY2FyZHMgdG8gZGlzcGxheSB3aGVuIGxvb2tpbmcgYXQgZGVja3NcbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0Q2FyZHNCeURlY2tJZCA9IChpZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9kZWNrcy8ke2lkfS9jYXJkc2ApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBUT0RPOiBjb21iaW5lIHRoaXMgaW50byB0aGUgYWJvdmUgc3RhcnROZXdHYW1lIGZ1bmNcbiAgICAgICAgLy8gdGFrZSBhbGwgb2YgdGhlIHNlbGVjdGVkIGRlY2tzJyBjYXJkcyBhbmQgcHV0IHRoZW0gaW4gdGhlIGZpcmViYXNlIGdhbWUgb2JqZWN0IHBpbGUgKHRocm91Z2ggcm91dGUpXG4gICAgICAgIEdhbWVGYWN0b3J5LmFkZFBpbGVUb0dhbWUgPSAoZ2FtZUlkLCBkZWNrcykgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZGRpbmcgcGlsZSB0byBnYW1lXCIpXG4gICAgICAgICAgICBjb25zdCBkZWNrc0FyciA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgZGVja0lkIGluIGRlY2tzKSB7XG4gICAgICAgICAgICAgICAgZGVja3NBcnIucHVzaChkZWNrSWQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0vZGVja3NgLCB7XG4gICAgICAgICAgICAgICAgJ2RlY2tzJzogZGVja3NBcnJcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAkbG9jYWxTdG9yYWdlLnRlYW0uaWQ7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJJZCA9ICRsb2NhbFN0b3JhZ2UudXNlci5pZDtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllck5hbWUgPSAkbG9jYWxTdG9yYWdlLnVzZXIubmFtZTtcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoJGxvY2FsU3RvcmFnZSkpO1xuICAgICAgICAgICAgY29uc3QgcGxheWVyUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH0vcGxheWVycy8ke3BsYXllcklkfWApXG4gICAgICAgICAgICBwbGF5ZXJSZWYuc2V0KHtcbiAgICAgICAgICAgICAgICBuYW1lOiBwbGF5ZXJOYW1lXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICAgIGdhbWVSZWYub24oJ3ZhbHVlJywgc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnY2hhbmdlZEdhbWUnLCBzbmFwc2hvdC52YWwoKSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgJGh0dHAucG9zdChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0vP3BsYXllcklkPSR7cGxheWVySWR9YClcbiAgICAgICAgfVxuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQgPSAoaWQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRlYW1JZCA9ICh0eXBlb2YgaWQgIT09ICdudW1iZXInKSA/ICRsb2NhbFN0b3JhZ2UudGVhbS5pZCA6IGlkOyAvLyBpZCB8fCBsb2NhbHN0b3JhZ2UgZG9lc24ndCB3b3JrIGJlY2F1c2UgMCBpcyBmYWxzZXlcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZGVja3M/dGVhbT0ke3RlYW1JZH1gKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcblxuICAgICAgICB9O1xuXG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0VXNlcnNCeUdhbWVJZCA9IChnYW1lSWQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZ2FtZXMvJHtnYW1lSWR9L3VzZXJzYCk7XG4gICAgICAgIH07XG5cblxuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVCeUdhbWVJZCA9IChnYW1lSWQsIHRlYW1JZCkgPT4ge1xuICAgICAgICAgICAgdGVhbUlkID0gdGVhbUlkIHx8ICRsb2NhbFN0b3JhZ2UudGVhbS5pZFxuICAgICAgICAgICAgY29uc3QgZ2FtZXNSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICByZXR1cm4gZ2FtZXNSZWYub25jZSgndmFsdWUnKS50aGVuKHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc25hcHNob3QudmFsKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQgPSAodGVhbUlkKSA9PiB7XG4gICAgICAgICAgICB0ZWFtSWQgPSB0ZWFtSWQgfHwgJGxvY2FsU3RvcmFnZS50ZWFtLmlkXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzLz90ZWFtSWQ9JHt0ZWFtSWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlVc2VyID0gKHVzZXJJZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lcy8/dXNlcklkPSR7dXNlcklkfWApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gR2FtZUZhY3Rvcnk7XG4gICAgfVxuXG4pO1xuXG4iLCJhcHAuZmFjdG9yeSgnVXNlckZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCwgJGxvY2FsU3RvcmFnZSkge1xuICAgIGNvbnN0IG91cklwcyA9IHtcbiAgICAgICAgbmlraXRhOiBcIjE5Mi4xNjguNC4yMTNcIixcbiAgICAgICAga2F5bGE6IFwiMTkyLjE2OC40LjIyNVwiLFxuICAgICAgICBuaXRoeWE6IFwiMTkyLjE2OC4xLjQ4XCIsXG4gICAgICAgIGRhbjogXCIxOTIuMTY4LjQuMjM2XCJcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50SXAgPSBvdXJJcHMubml0aHlhXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0VXNlcjogZnVuY3Rpb24oaW5mbykge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgICAgIHVybDogYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvdXNlcnNgLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGluZm9cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TG9jYWxTdG9yYWdlKHJlcy5kYXRhLnVzZXJbMF0sIHJlcy5kYXRhLnRlYW1bMF0pO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGdldFNsYWNrQ3JlZHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9zbGFja2ApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5kYXRhXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0U2xhY2tJbmZvOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2h0dHBzOi8vc2xhY2suY29tL2FwaS91c2Vycy5pZGVudGl0eScpXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0TG9jYWxTdG9yYWdlOiBmdW5jdGlvbih1c2VyLCB0ZWFtKSB7XG4gICAgICAgICAgICAkbG9jYWxTdG9yYWdlLnVzZXIgPSB1c2VyO1xuICAgICAgICAgICAgJGxvY2FsU3RvcmFnZS50ZWFtID0gdGVhbTtcbiAgICAgICAgfSxcblxuICAgICAgICBsb2dPdXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJGxvY2FsU3RvcmFnZS4kcmVzZXQoKTtcbiAgICAgICAgfVxuICAgIH1cbn0pXG5cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
