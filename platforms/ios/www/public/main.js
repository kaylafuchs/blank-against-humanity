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
    $scope.gameId = 59;
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
        $scope.submittedWhiteCards = $scope.game.submittedWhiteCards;
        $scope.$evalAsync();
    });

    $scope.showCards = false;
    $scope.submitted = false;

    $scope.onSwipeDown = function (gameId) {
        GameFactory.joinGameById(gameId).then(function () {
            ActiveGameFactory.refillMyHand($scope.gameId, playerId, teamId);
            $scope.showCards = true;
        });
        $scope.$evalAsync();
    };

    $scope.onDoubleTap = function (cardId, cardText) {
        ActiveGameFactory.submitWhiteCard(playerId, cardId, $scope.gameId, teamId, cardText);
        $scope.getSubmittedPlayers();
        $scope.submitted = true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImNhcmRzLXRlc3QvY2FyZHNUZXN0LmpzIiwiZGVja3MvZGVja3MuanMiLCJmcm9tIGZzZy9mcm9tLWZzZy5qcyIsImdhbWUvZ2FtZS5qcyIsImxvZ2luL2xvZ2luLmpzIiwiaG9tZS9ob21lLmpzIiwibmV3LWdhbWUvbmV3LWdhbWUuanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiLCJjb21tb24vZGlyZWN0aXZlcy9zdWJtaXR0ZWQtY2FyZHMuanMiLCJjb21tb24vZGlyZWN0aXZlcy93aGl0ZS1jYXJkcy5qcyIsImNvbW1vbi9mYWN0b3JpZXMvQWN0aXZlR2FtZUZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yaWVzL0dhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy91c2VyRmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJhcHAiLCJhbmd1bGFyIiwibW9kdWxlIiwicnVuIiwiJGlvbmljUGxhdGZvcm0iLCJyZWFkeSIsImNvcmRvdmEiLCJwbHVnaW5zIiwiS2V5Ym9hcmQiLCJoaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIiLCJkaXNhYmxlU2Nyb2xsIiwiU3RhdHVzQmFyIiwic3R5bGVMaWdodENvbnRlbnQiLCJjb250cm9sbGVyIiwiJHNjb3BlIiwiVXNlckZhY3RvcnkiLCIkc3RhdGUiLCIkbG9jYWxTdG9yYWdlIiwiJHRpbWVvdXQiLCJsb2dPdXQiLCJnbyIsImNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwic3RhdGUiLCJ1cmwiLCJ0ZW1wbGF0ZVVybCIsImdyZWV0aW5nIiwicmVzb2x2ZSIsImRlY2tzIiwiR2FtZUZhY3RvcnkiLCIkc3RhdGVQYXJhbXMiLCJnZXREZWNrc0J5VGVhbUlkIiwic3RhdGVQYXJhbXMiLCJ0ZWFtSWQiLCJBY3RpdmVHYW1lRmFjdG9yeSIsImdhbWVJZCIsInBsYXllcklkIiwidXNlciIsImlkIiwiZ2FtZVJlZiIsImZpcmViYXNlIiwiZGF0YWJhc2UiLCJyZWYiLCJvbiIsImdhbWUiLCJnYW1lU25hcHNob3QiLCJ2YWwiLCJnYW1lTmFtZSIsInNldHRpbmdzIiwibmFtZSIsInBsYXllcnMiLCJoYW5kIiwicGxheWVySGFuZCIsInBsYXllckhhbmRDb3VudCIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJibGFja0NhcmQiLCJjdXJyZW50QmxhY2tDYXJkIiwidGV4dCIsImNvbnNvbGUiLCJsb2ciLCJqdWRnZSIsImN1cnJlbnRKdWRnZSIsInN1Ym1pdHRlZFdoaXRlQ2FyZHMiLCIkZXZhbEFzeW5jIiwic2hvd0NhcmRzIiwic3VibWl0dGVkIiwib25Td2lwZURvd24iLCJqb2luR2FtZUJ5SWQiLCJ0aGVuIiwicmVmaWxsTXlIYW5kIiwib25Eb3VibGVUYXAiLCJjYXJkSWQiLCJjYXJkVGV4dCIsInN1Ym1pdFdoaXRlQ2FyZCIsImdldFN1Ym1pdHRlZFBsYXllcnMiLCJzdWJtaXR0ZWRQbGF5ZXJzIiwiXyIsImtleUJ5IiwiY2FyZCIsInN1Ym1pdHRlZEJ5IiwiJHVybFJvdXRlclByb3ZpZGVyIiwib3RoZXJ3aXNlIiwiJGNvcmRvdmFPYXV0aCIsIiRpb25pY1NpZGVNZW51RGVsZWdhdGUiLCJsb2dpbldpdGhTbGFjayIsImdldFNsYWNrQ3JlZHMiLCJzbGFjayIsImNyZWRzIiwiY2xpZW50SUQiLCJjbGllbnRTZWNyZXQiLCJzZXRVc2VyIiwiaW5mbyIsImNhbkRyYWdDb250ZW50IiwiJG9uIiwic3RvcmFnZSIsInJlZGlyZWN0VXNlciIsImdhbWVzIiwiZ2V0R2FtZXNCeVRlYW1JZCIsIiRpb25pY1BvcHVwIiwic3RhcnROZXdHYW1lIiwiSlNPTiIsInN0cmluZ2lmeSIsImdvVG9OZXdHYW1lIiwiYWJzdHJhY3QiLCJ0ZWFtRGVja3MiLCJzdGFuZGFyZERlY2siLCJjYXJkcyIsImdldENhcmRzQnlEZWNrSWQiLCJkZWNrSWQiLCJjdXJyZW50VmlldyIsImdhbWVDb25maWciLCJnb1RvRGVja3MiLCJsb2NhdGlvbiIsInJlbG9hZCIsImNvbmNhdCIsImFkZFBpbGVUb0dhbWUiLCJhZGREZWNrc1RvR2FtZSIsImFkZERlY2tzIiwiZGlyZWN0aXZlIiwicmVzdHJpY3QiLCJmYWN0b3J5IiwiJGh0dHAiLCIkcm9vdFNjb3BlIiwicmVmaWxsZXIiLCJjYXJkc05lZWRlZCIsInBpbGVSZWYiLCJoYW5kUmVmIiwibGltaXRUb0ZpcnN0Iiwib25jZSIsImNhcmRzU25hcHNob3QiLCJmb3JFYWNoIiwidXBkYXRlT2JqIiwidHJhbnNhY3Rpb24iLCJrZXkiLCJjYXJkRGF0YSIsInVwZGF0ZSIsImNhdGNoIiwiZXJyIiwiY2hpbGQiLCJoYW5kU25hcHNob3QiLCJudW1DaGlsZHJlbiIsImZpcmViYXNlTW92ZVNpbmdsZUtleVZhbHVlIiwib2xkUmVmIiwibmV3UmVmIiwicmVtb3ZlVXBkYXRlIiwibmV3VXBkYXRlIiwic25hcHNob3QiLCJwYXJlbnQiLCJjYXJkVG9TdWJtaXQiLCJzdWJtaXRSZWYiLCJzZXQiLCJvdXJJcHMiLCJuaWtpdGEiLCJrYXlsYSIsIm5pdGh5YSIsImRhbiIsImN1cnJlbnRJcCIsInRlYW0iLCJjcmVhdG9ySWQiLCJwb3N0IiwiY3JlYXRvck5hbWUiLCJyZXMiLCJkYXRhIiwiJGJyb2FkY2FzdCIsImdldCIsImRlY2tzQXJyIiwicHVzaCIsInBsYXllck5hbWUiLCJwbGF5ZXJSZWYiLCJnZXRVc2Vyc0J5R2FtZUlkIiwiZ2V0R2FtZUJ5R2FtZUlkIiwiZ2FtZXNSZWYiLCJnZXRHYW1lc0J5VXNlciIsInVzZXJJZCIsIm1ldGhvZCIsImhlYWRlcnMiLCJzZXRMb2NhbFN0b3JhZ2UiLCJnZXRTbGFja0luZm8iLCIkcmVzZXQiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBQSxPQUFBQyxHQUFBLEdBQUFDLFFBQUFDLE1BQUEsQ0FBQSxzQkFBQSxFQUFBLENBQUEsT0FBQSxFQUFBLFdBQUEsRUFBQSxXQUFBLEVBQUEsZ0JBQUEsRUFBQSxXQUFBLEVBQUEsV0FBQSxDQUFBLENBQUE7O0FBR0FGLElBQUFHLEdBQUEsQ0FBQSxVQUFBQyxjQUFBLEVBQUE7QUFDQUEsbUJBQUFDLEtBQUEsQ0FBQSxZQUFBO0FBQ0EsWUFBQU4sT0FBQU8sT0FBQSxJQUFBUCxPQUFBTyxPQUFBLENBQUFDLE9BQUEsQ0FBQUMsUUFBQSxFQUFBO0FBQ0E7QUFDQTtBQUNBRixvQkFBQUMsT0FBQSxDQUFBQyxRQUFBLENBQUFDLHdCQUFBLENBQUEsSUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQUgsb0JBQUFDLE9BQUEsQ0FBQUMsUUFBQSxDQUFBRSxhQUFBLENBQUEsSUFBQTtBQUNBO0FBQ0EsWUFBQVgsT0FBQVksU0FBQSxFQUFBO0FBQ0FBLHNCQUFBQyxpQkFBQTtBQUNBO0FBQ0EsS0FkQTtBQWdCQSxDQWpCQTs7QUNUQVosSUFBQWEsVUFBQSxDQUFBLFlBQUEsRUFBQSxVQUFBQyxNQUFBLEVBQUFDLFdBQUEsRUFBQUMsTUFBQSxFQUFBQyxhQUFBLEVBQUFDLFFBQUEsRUFBQTtBQUNBSixXQUFBSyxNQUFBLEdBQUEsWUFBQTtBQUNBSixvQkFBQUksTUFBQTtBQUNBSCxlQUFBSSxFQUFBLENBQUEsT0FBQTtBQUNBLEtBSEE7QUFJQSxDQUxBO0FDQUFwQixJQUFBcUIsTUFBQSxDQUFBLFVBQUFDLGNBQUEsRUFBQTtBQUNBQSxtQkFBQUMsS0FBQSxDQUFBLE9BQUEsRUFBQTtBQUNBQyxhQUFBLFFBREE7QUFFQUMscUJBQUEsK0JBRkE7QUFHQVosb0JBQUE7QUFIQSxLQUFBO0FBS0EsQ0FOQTs7QUFRQWIsSUFBQWEsVUFBQSxDQUFBLGVBQUEsRUFBQSxVQUFBQyxNQUFBLEVBQUE7QUFDQUEsV0FBQVksUUFBQSxHQUFBLElBQUE7QUFDQSxDQUZBO0FDUkExQixJQUFBcUIsTUFBQSxDQUFBLFVBQUFDLGNBQUEsRUFBQTtBQUNBQSxtQkFBQUMsS0FBQSxDQUFBLE9BQUEsRUFBQTtBQUNBQyxhQUFBLGVBREE7QUFFQUMscUJBQUEscUJBRkE7QUFHQVosb0JBQUEsVUFIQTtBQUlBYyxpQkFBQTtBQUNBQyxtQkFBQSxlQUFBQyxXQUFBLEVBQUFDLFlBQUE7QUFBQSx1QkFBQUQsWUFBQUUsZ0JBQUEsQ0FBQUMsWUFBQUMsTUFBQSxDQUFBO0FBQUE7QUFEQTtBQUpBLEtBQUE7QUFTQSxDQVZBOztBQVlBakMsSUFBQWEsVUFBQSxDQUFBLFVBQUEsRUFBQSxVQUFBQyxNQUFBLEVBQUEsQ0FJQSxDQUpBO0FDWkE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQ3BKQWQsSUFBQXFCLE1BQUEsQ0FBQSxVQUFBQyxjQUFBLEVBQUE7O0FBRUFBLG1CQUFBQyxLQUFBLENBQUEsTUFBQSxFQUFBO0FBQ0FDLGFBQUEsZUFEQTtBQUVBQyxxQkFBQSxtQkFGQTtBQUdBWixvQkFBQTtBQUhBLEtBQUE7QUFRQSxDQVZBOztB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QSxJQUFBO0FBQ0EsU0EzQkE7O0FBNkJBNUksZ0JBQUEsa0JBQUE7QUFDQUYsMEJBQUFtSyxNQUFBO0FBQ0E7QUEvQkEsS0FBQTtBQWlDQSxDQTFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW9uaWMgU3RhcnRlciBBcHBcblxuLy8gYW5ndWxhci5tb2R1bGUgaXMgYSBnbG9iYWwgcGxhY2UgZm9yIGNyZWF0aW5nLCByZWdpc3RlcmluZyBhbmQgcmV0cmlldmluZyBBbmd1bGFyIG1vZHVsZXNcbi8vICdzdGFydGVyJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xuXG53aW5kb3cuYXBwID0gYW5ndWxhci5tb2R1bGUoJ0JsYW5rQWdhaW5zdEh1bWFuaXR5JywgWydpb25pYycsICd1aS5yb3V0ZXInLCAnbmdDb3Jkb3ZhJywgJ25nQ29yZG92YU9hdXRoJywgJ25nU3RvcmFnZScsICduZ0FuaW1hdGUnXSlcblxuXG5hcHAucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtKSB7XG4gICAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICAgICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAgICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuXG4gICAgICAgICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcbiAgICAgICAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxuICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgICAgICAgIFN0YXR1c0Jhci5zdHlsZUxpZ2h0Q29udGVudCgpXG4gICAgICAgIH1cbiAgICB9KTtcblxufSlcblxuIiwiYXBwLmNvbnRyb2xsZXIoJ0xvZ291dEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIFVzZXJGYWN0b3J5LCAkc3RhdGUsICRsb2NhbFN0b3JhZ2UsICR0aW1lb3V0KXtcblx0JHNjb3BlLmxvZ091dCA9IGZ1bmN0aW9uKCl7XG5cdFx0VXNlckZhY3RvcnkubG9nT3V0KClcblx0XHQkc3RhdGUuZ28oJ2xvZ2luJylcblx0fVxufSkiLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKXtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2NhcmRzJywge1xuXHRcdHVybDogJy9jYXJkcycsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9jYXJkcy10ZXN0L2NhcmRzLXRlc3QuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0NhcmRzVGVzdEN0cmwnXG5cdH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignQ2FyZHNUZXN0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSl7XG4gXHQkc2NvcGUuZ3JlZXRpbmcgPSBcIkhJXCJcbn0pIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIpID0+IHtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2RlY2tzJywge1xuXHRcdHVybDogJ2RlY2tzLzp0ZWFtaWQnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvZGVja3MvZGVja3MuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0RlY2tDdHJsJyxcblx0XHRyZXNvbHZlOiB7XG5cdFx0XHRkZWNrczogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoc3RhdGVQYXJhbXMudGVhbUlkKVxuXHRcdH1cblx0fSlcblxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0RlY2tDdHJsJywgKCRzY29wZSkgPT4ge1xuXG5cblx0XG59KSIsIi8vIChmdW5jdGlvbiAoKSB7XG5cbi8vICAgICAndXNlIHN0cmljdCc7XG5cbi8vICAgICAvLyBIb3BlIHlvdSBkaWRuJ3QgZm9yZ2V0IEFuZ3VsYXIhIER1aC1kb3kuXG4vLyAgICAgaWYgKCF3aW5kb3cuYW5ndWxhcikgdGhyb3cgbmV3IEVycm9yKCdJIGNhblxcJ3QgZmluZCBBbmd1bGFyIScpO1xuXG4vLyAgICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdmc2FQcmVCdWlsdCcsIFtdKTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdTb2NrZXQnLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgIGlmICghd2luZG93LmlvKSB0aHJvdyBuZXcgRXJyb3IoJ3NvY2tldC5pbyBub3QgZm91bmQhJyk7XG4vLyAgICAgICAgIHJldHVybiB3aW5kb3cuaW8od2luZG93LmxvY2F0aW9uLm9yaWdpbik7XG4vLyAgICAgfSk7XG5cbi8vICAgICAvLyBBVVRIX0VWRU5UUyBpcyB1c2VkIHRocm91Z2hvdXQgb3VyIGFwcCB0b1xuLy8gICAgIC8vIGJyb2FkY2FzdCBhbmQgbGlzdGVuIGZyb20gYW5kIHRvIHRoZSAkcm9vdFNjb3BlXG4vLyAgICAgLy8gZm9yIGltcG9ydGFudCBldmVudHMgYWJvdXQgYXV0aGVudGljYXRpb24gZmxvdy5cbi8vICAgICBhcHAuY29uc3RhbnQoJ0FVVEhfRVZFTlRTJywge1xuLy8gICAgICAgICBsb2dpblN1Y2Nlc3M6ICdhdXRoLWxvZ2luLXN1Y2Nlc3MnLFxuLy8gICAgICAgICBsb2dpbkZhaWxlZDogJ2F1dGgtbG9naW4tZmFpbGVkJyxcbi8vICAgICAgICAgbG9nb3V0U3VjY2VzczogJ2F1dGgtbG9nb3V0LXN1Y2Nlc3MnLFxuLy8gICAgICAgICBzZXNzaW9uVGltZW91dDogJ2F1dGgtc2Vzc2lvbi10aW1lb3V0Jyxcbi8vICAgICAgICAgbm90QXV0aGVudGljYXRlZDogJ2F1dGgtbm90LWF1dGhlbnRpY2F0ZWQnLFxuLy8gICAgICAgICBub3RBdXRob3JpemVkOiAnYXV0aC1ub3QtYXV0aG9yaXplZCdcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdBdXRoSW50ZXJjZXB0b3InLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHEsIEFVVEhfRVZFTlRTKSB7XG4vLyAgICAgICAgIHZhciBzdGF0dXNEaWN0ID0ge1xuLy8gICAgICAgICAgICAgNDAxOiBBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLFxuLy8gICAgICAgICAgICAgNDAzOiBBVVRIX0VWRU5UUy5ub3RBdXRob3JpemVkLFxuLy8gICAgICAgICAgICAgNDE5OiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCxcbi8vICAgICAgICAgICAgIDQ0MDogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXRcbi8vICAgICAgICAgfTtcbi8vICAgICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgICAgIHJlc3BvbnNlRXJyb3I6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChzdGF0dXNEaWN0W3Jlc3BvbnNlLnN0YXR1c10sIHJlc3BvbnNlKTtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlc3BvbnNlKVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9O1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLmNvbmZpZyhmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xuLy8gICAgICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKFtcbi8vICAgICAgICAgICAgICckaW5qZWN0b3InLFxuLy8gICAgICAgICAgICAgZnVuY3Rpb24gKCRpbmplY3Rvcikge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkaW5qZWN0b3IuZ2V0KCdBdXRoSW50ZXJjZXB0b3InKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgXSk7XG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuc2VydmljZSgnQXV0aFNlcnZpY2UnLCBmdW5jdGlvbiAoJGh0dHAsIFNlc3Npb24sICRyb290U2NvcGUsIEFVVEhfRVZFTlRTLCAkcSkge1xuXG4vLyAgICAgICAgIGZ1bmN0aW9uIG9uU3VjY2Vzc2Z1bExvZ2luKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICB2YXIgdXNlciA9IHJlc3BvbnNlLmRhdGEudXNlcjtcbi8vICAgICAgICAgICAgIFNlc3Npb24uY3JlYXRlKHVzZXIpO1xuLy8gICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ2luU3VjY2Vzcyk7XG4vLyAgICAgICAgICAgICByZXR1cm4gdXNlcjtcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIC8vIFVzZXMgdGhlIHNlc3Npb24gZmFjdG9yeSB0byBzZWUgaWYgYW5cbi8vICAgICAgICAgLy8gYXV0aGVudGljYXRlZCB1c2VyIGlzIGN1cnJlbnRseSByZWdpc3RlcmVkLlxuLy8gICAgICAgICB0aGlzLmlzQXV0aGVudGljYXRlZCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAhIVNlc3Npb24udXNlcjtcbi8vICAgICAgICAgfTtcblxuICAgICAgICBcbi8vICAgICAgICAgdGhpcy5pc0FkbWluID0gZnVuY3Rpb24odXNlcklkKXtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdydW5uaW5nIGFkbWluIGZ1bmMnKVxuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKVxuLy8gICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YS51c2VyLmlzQWRtaW4pXG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICB0aGlzLmdldExvZ2dlZEluVXNlciA9IGZ1bmN0aW9uIChmcm9tU2VydmVyKSB7XG5cbi8vICAgICAgICAgICAgIC8vIElmIGFuIGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbiBleGlzdHMsIHdlXG4vLyAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIHVzZXIgYXR0YWNoZWQgdG8gdGhhdCBzZXNzaW9uXG4vLyAgICAgICAgICAgICAvLyB3aXRoIGEgcHJvbWlzZS4gVGhpcyBlbnN1cmVzIHRoYXQgd2UgY2FuXG4vLyAgICAgICAgICAgICAvLyBhbHdheXMgaW50ZXJmYWNlIHdpdGggdGhpcyBtZXRob2QgYXN5bmNocm9ub3VzbHkuXG5cbi8vICAgICAgICAgICAgIC8vIE9wdGlvbmFsbHksIGlmIHRydWUgaXMgZ2l2ZW4gYXMgdGhlIGZyb21TZXJ2ZXIgcGFyYW1ldGVyLFxuLy8gICAgICAgICAgICAgLy8gdGhlbiB0aGlzIGNhY2hlZCB2YWx1ZSB3aWxsIG5vdCBiZSB1c2VkLlxuXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSAmJiBmcm9tU2VydmVyICE9PSB0cnVlKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLndoZW4oU2Vzc2lvbi51c2VyKTtcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgLy8gTWFrZSByZXF1ZXN0IEdFVCAvc2Vzc2lvbi5cbi8vICAgICAgICAgICAgIC8vIElmIGl0IHJldHVybnMgYSB1c2VyLCBjYWxsIG9uU3VjY2Vzc2Z1bExvZ2luIHdpdGggdGhlIHJlc3BvbnNlLlxuLy8gICAgICAgICAgICAgLy8gSWYgaXQgcmV0dXJucyBhIDQwMSByZXNwb25zZSwgd2UgY2F0Y2ggaXQgYW5kIGluc3RlYWQgcmVzb2x2ZSB0byBudWxsLlxuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKS50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKS5jYXRjaChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4vLyAgICAgICAgICAgICB9KTtcblxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbiAoY3JlZGVudGlhbHMpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvbG9naW4nLCBjcmVkZW50aWFscylcbi8vICAgICAgICAgICAgICAgICAudGhlbihvblN1Y2Nlc3NmdWxMb2dpbilcbi8vICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHsgbWVzc2FnZTogJ0ludmFsaWQgbG9naW4gY3JlZGVudGlhbHMuJ30pO1xuLy8gICAgICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMuc2lnbnVwID0gZnVuY3Rpb24oY3JlZGVudGlhbHMpe1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbi8vICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbi8vICAgICAgICAgICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbi8vICAgICAgICAgICAgICAgICBkYXRhOiBjcmVkZW50aWFsc1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQuZGF0YSlcbi8vICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbigpe1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3Qoe21lc3NhZ2U6ICdUaGF0IGVtYWlsIGlzIGFscmVhZHkgYmVpbmcgdXNlZC4nfSk7XG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL2xvZ291dCcpLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgIFNlc3Npb24uZGVzdHJveSgpO1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dvdXRTdWNjZXNzKTtcbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuc2VydmljZSgnU2Vzc2lvbicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUykge1xuXG4vLyAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuLy8gICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICBzZWxmLmRlc3Ryb3koKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuXG4vLyAgICAgICAgIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24gKHVzZXIpIHtcbi8vICAgICAgICAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcbi8vICAgICAgICAgfTtcblxuLy8gICAgIH0pO1xuXG4vLyB9KCkpO1xuIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIpID0+IHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdnYW1lJywge1xuICAgICAgICB1cmw6ICcvZ2FtZS86Z2FtZUlkJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL2dhbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdHYW1lQ3RybCcsXG4gICAgICAgIC8vIHJlc29sdmU6IHtcbiAgICAgICAgLy8gICAgIGdhbWUgOiAoR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcykgPT4gR2FtZUZhY3RvcnkuZ2V0R2FtZUJ5R2FtZUlkKCRzdGF0ZVBhcmFtcy5nYW1lSWQpXG4gICAgICAgIC8vIH0gIFxuICAgIH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignR2FtZUN0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zLCAkbG9jYWxTdG9yYWdlLCBBY3RpdmVHYW1lRmFjdG9yeSkgPT4geyAgIFxuICAgIC8vIGNvbnN0IGdhbWVJZCA9ICRzdGF0ZVBhcmFtcy5nYW1lSWQ7XG4gICAgJHNjb3BlLmdhbWVJZCA9IDU5O1xuICAgIGNvbnN0IHBsYXllcklkID0gJGxvY2FsU3RvcmFnZS51c2VyLmlkO1xuICAgIGNvbnN0IHRlYW1JZCA9IDI7IFxuICAgIC8vIGNvbnN0IHRlYW1JZCA9ICRsb2NhbFN0b3JhZ2UudGVhbS5pZFxuICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7JHNjb3BlLmdhbWVJZH0vYCk7XG5cbiAgICBnYW1lUmVmLm9uKCd2YWx1ZScsIGdhbWVTbmFwc2hvdCA9PiB7XG4gICAgICAgICRzY29wZS5nYW1lID0gZ2FtZVNuYXBzaG90LnZhbCgpO1xuICAgICAgICAkc2NvcGUuZ2FtZU5hbWUgPSAkc2NvcGUuZ2FtZS5zZXR0aW5ncy5uYW1lO1xuICAgICAgICBpZiAoJHNjb3BlLmdhbWUucGxheWVyc1twbGF5ZXJJZF0uaGFuZCl7XG4gICAgICAgICAgICAkc2NvcGUucGxheWVySGFuZCA9ICRzY29wZS5nYW1lLnBsYXllcnNbcGxheWVySWRdLmhhbmQ7XG4gICAgICAgICAgICAkc2NvcGUucGxheWVySGFuZENvdW50ID0gT2JqZWN0LmtleXMoJHNjb3BlLnBsYXllckhhbmQpLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICAkc2NvcGUuYmxhY2tDYXJkID0gJHNjb3BlLmdhbWUuY3VycmVudEJsYWNrQ2FyZFsxXS50ZXh0XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYmxhY2tDYXJkXCIsICRzY29wZS5ibGFja0NhcmQpXG4gICAgICAgICRzY29wZS5qdWRnZSA9ICRzY29wZS5nYW1lLmN1cnJlbnRKdWRnZTtcbiAgICAgICAgJHNjb3BlLnBsYXllcnMgPSAkc2NvcGUuZ2FtZS5wbGF5ZXJzO1xuICAgICAgICAkc2NvcGUuc3VibWl0dGVkV2hpdGVDYXJkcyA9ICRzY29wZS5nYW1lLnN1Ym1pdHRlZFdoaXRlQ2FyZHNcbiAgICAgICAgJHNjb3BlLiRldmFsQXN5bmMoKTtcbiAgICB9KVxuICAgXG4gICAgJHNjb3BlLnNob3dDYXJkcyA9IGZhbHNlO1xuICAgICRzY29wZS5zdWJtaXR0ZWQgPSBmYWxzZTtcblxuXG4gICAgJHNjb3BlLm9uU3dpcGVEb3duID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWQoZ2FtZUlkKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgQWN0aXZlR2FtZUZhY3RvcnkucmVmaWxsTXlIYW5kKCRzY29wZS5nYW1lSWQsIHBsYXllcklkLCB0ZWFtSWQpXG4gICAgICAgICAgJHNjb3BlLnNob3dDYXJkcyA9IHRydWU7XG4gICAgICAgIH0pIFxuICAgICAgICAkc2NvcGUuJGV2YWxBc3luYygpO1xuICAgIH0gIFxuXG4gICAgJHNjb3BlLm9uRG91YmxlVGFwID0gKGNhcmRJZCwgY2FyZFRleHQpID0+IHtcbiAgICAgICAgQWN0aXZlR2FtZUZhY3Rvcnkuc3VibWl0V2hpdGVDYXJkKHBsYXllcklkLCBjYXJkSWQsICRzY29wZS5nYW1lSWQsIHRlYW1JZCwgY2FyZFRleHQpXG4gICAgICAgICRzY29wZS5nZXRTdWJtaXR0ZWRQbGF5ZXJzKCk7XG4gICAgICAgICRzY29wZS5zdWJtaXR0ZWQgPSB0cnVlO1xuICAgIH1cblxuXG5cbiAgICAkc2NvcGUuZ2V0U3VibWl0dGVkUGxheWVycyA9ICgpID0+IHtcbiAgICAgICAgJHNjb3BlLnN1Ym1pdHRlZFBsYXllcnMgPSAgXy5rZXlCeSgkc2NvcGUuc3VibWl0dGVkV2hpdGVDYXJkcywgY2FyZCA9PntcbiAgICAgICAgICAgIHJldHVybiBjYXJkLnN1Ym1pdHRlZEJ5OyBcbiAgICAgICAgfSlcbiAgICB9XG5cblxuXG5cbn0pXG5cblxuLy8gYXBwLmNvbnRyb2xsZXIoXCJBY3RpdmVHYW1lQ3RybFwiLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgQWN0aXZlR2FtZUZhY3RvcnksIGdhbWUsICRzdGF0ZVBhcmFtcywgJGxvY2FsU3RvcmFnZSwgJHN0YXRlKSA9PiB7XG5cbiAgICBcbi8vICAgICAkc2NvcGUub25Td2lwZURvd24gPSAoKSA9PiB7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKCd3b3JraW5nJyk7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5zaG93Q2FyZHMpO1xuLy8gICAgICAgICAkc2NvcGUuc2hvd0NhcmRzID0gdHJ1ZSA7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5zaG93Q2FyZHMpO1xuLy8gICAgICAgICAkc2NvcGUuJGV2YWxBc3luYygpO1xuLy8gICAgIH1cblxuLy8gICAgICRzY29wZS5vblN3aXBlVXAgPSAoKSA9PiB7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKFwic3dpcGVkIHVwXCIpO1xuLy8gICAgIH1cblxuLy8gICAgICRzY29wZS5vbkRvdWJsZVRhcCA9IChrZXkpID0+IHtcbi8vICAgICAgICAgY29uc29sZS5sb2coXCJkb3VibGUgdGFwcGVkXCIpXG4vLyAgICAgICAgICRzY29wZS5wbGF5ZWQgPSB0cnVlO1xuLy8gICAgICAgICAvL2NhbGwgc3VibWl0IGNhcmQgZnVuY3Rpb24gaGVyZS5cbi8vICAgICB9XG5cbi8vICAgICBBY3RpdmVHYW1lRmFjdG9yeS5yZWZpbGxNeUhhbmQoJHNjb3BlLmdhbWVJZCwgJHNjb3BlLnBsYXllcklkLCAkc2NvcGUudGVhbUlkKTtcblxuLy8gICAgICRzY29wZS4kb24oJ2NoYW5nZWRHYW1lJywgKGV2ZW50LHNuYXBzaG90KSA9Pntcbi8vICAgICAgICAgJHNjb3BlLmdhbWUgPSBzbmFwc2hvdDtcbi8vICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmdhbWUpO1xuLy8gICAgICAgICBpZihnYW1lLnN0YXRlID09PSAnc3VibWlzc2lvbicpe1xuLy8gICAgICAgICAgICAgJHN0YXRlLmdvKCdnYW1lLnN1Ym1pc3Npb24tZ2FtZScpXG4vLyAgICAgICAgIH0gXG4vLyAgICAgfSlcbi8vIH0pXG5cblxuXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbG9naW4nLCB7XG4gICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbG9naW4vbG9naW4uaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdMb2dpbkN0cmwnXG4gICAgfSlcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvbG9naW4nKTtcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdMb2dpbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSwgVXNlckZhY3RvcnksICRjb3Jkb3ZhT2F1dGgsICRsb2NhbFN0b3JhZ2UsICR0aW1lb3V0LCAkaW9uaWNTaWRlTWVudURlbGVnYXRlKSB7XG4gICAgJHNjb3BlLmxvZ2luV2l0aFNsYWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBVc2VyRmFjdG9yeS5nZXRTbGFja0NyZWRzKClcbiAgICAgICAgICAgIC50aGVuKGNyZWRzID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGNvcmRvdmFPYXV0aC5zbGFjayhjcmVkcy5jbGllbnRJRCwgY3JlZHMuY2xpZW50U2VjcmV0LCBbJ2lkZW50aXR5LmJhc2ljJywgJ2lkZW50aXR5LnRlYW0nLCAnaWRlbnRpdHkuYXZhdGFyJ10pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oaW5mbyA9PiBVc2VyRmFjdG9yeS5zZXRVc2VyKGluZm8pKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gJHN0YXRlLmdvKCdob21lJykpXG4gICAgfVxuXG4gICAgJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZS5jYW5EcmFnQ29udGVudChmYWxzZSk7XG5cbiAgICAkc2NvcGUuJG9uKCckaW9uaWNWaWV3LmxlYXZlJywgZnVuY3Rpb24oKSB7ICRpb25pY1NpZGVNZW51RGVsZWdhdGUuY2FuRHJhZ0NvbnRlbnQodHJ1ZSkgfSk7XG5cbiAgICAkc2NvcGUuc3RvcmFnZSA9ICRsb2NhbFN0b3JhZ2VcblxuICAgIGZ1bmN0aW9uIHJlZGlyZWN0VXNlcigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzY29wZSBzdG9yYWdlIHVzZXJcIiwgJHNjb3BlLnN0b3JhZ2UudXNlcilcbiAgICAgICAgaWYgKCRzY29wZS5zdG9yYWdlLnVzZXIpICRzdGF0ZS5nbygnaG9tZScpXG4gICAgfVxuXG4gICAgcmVkaXJlY3RVc2VyKCk7XG59KVxuXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgdXJsOiAnLycsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvaG9tZS9ob21lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnSG9tZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBnYW1lczogZnVuY3Rpb24oR2FtZUZhY3RvcnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUsICRjb3Jkb3ZhT2F1dGgsIFVzZXJGYWN0b3J5LCBHYW1lRmFjdG9yeSwgJGxvY2FsU3RvcmFnZSwgZ2FtZXMsICRpb25pY1BvcHVwKSB7XG4gICAgJHNjb3BlLnN0YXJ0TmV3R2FtZSA9IEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZTtcbiAgICAkc2NvcGUuc3RvcmFnZSA9ICRsb2NhbFN0b3JhZ2U7XG4gICAgJHNjb3BlLmdhbWVzID0gZ2FtZXM7XG5cbiAgICBjb25zb2xlLmxvZyhcImdhbWVzXCIsIEpTT04uc3RyaW5naWZ5KCRzY29wZS5nYW1lcykpXG4gICAgJHNjb3BlLmdvVG9OZXdHYW1lID0gKCkgPT4ge1xuICAgICAgICAkc3RhdGUuZ28oJ25ldy1nYW1lLm1haW4nKVxuICAgIH1cblxuXG4gICAgLy8gJHNjb3BlLmpvaW5HYW1lID0gR2FtZUZhY3Rvcnkuam9pbkdhbWVCeUlkO1xuXG4gICAgLy8gJHNjb3BlLnNob3dQb3B1cCA9IGZ1bmN0aW9uKGdhbWVJZCkge1xuXG4gICAgLy8gICAgICRzY29wZS5nYW1lID0gJHNjb3BlLmdhbWVzW2dhbWVJZF07XG4gICAgLy8gICAgICRzY29wZS5nYW1lTmFtZSA9ICRzY29wZS5nYW1lLnNldHRpbmdzLm5hbWU7XG4gICAgLy8gICAgICRzY29wZS5wbGF5ZXJDb3VudCA9IE9iamVjdC5rZXlzKCRzY29wZS5nYW1lLnBsYXllcnMpLmxlbmd0aDtcbiAgICAvLyAgICAgJHNjb3BlLndhaXRpbmdGb3JQbGF5ZXJzID0gICgkc2NvcGUuZ2FtZS5zZXR0aW5ncy5taW5QbGF5ZXJzIHx8IDQpIC0gJHNjb3BlLnBsYXllckNvdW50O1xuICAgICAgICAgXG4gICAgLy8gICAgICBjb25zdCBteVBvcHVwID0gJGlvbmljUG9wdXAuc2hvdyh7XG4gICAgLy8gICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2hvbWUvcG9wdXAuaHRtbCcsXG4gICAgLy8gICAgICAgICB0aXRsZTogJ0pvaW4gJyArICRzY29wZS5nYW1lTmFtZSxcbiAgICAvLyAgICAgICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgLy8gICAgICAgICBidXR0b25zOiBcbiAgICAvLyAgICAgICAgIFtcbiAgICAvLyAgICAgICAgICAgICB7dGV4dDogJ0dvIGJhY2snfSxcbiAgICAvLyAgICAgICAgICAgICB7XG4gICAgLy8gICAgICAgICAgICAgICAgIHRleHQ6ICdKb2luIGdhbWUnLFxuICAgIC8vICAgICAgICAgICAgICAgICB0eXBlOiAnYnV0dG9uLWJhbGFuY2VkJyxcbiAgICAvLyAgICAgICAgICAgICAgICAgb25UYXA6IGUgPT4ge1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmpvaW5HYW1lKGdhbWVJZCk7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2dhbWUuYWN0aXZlLWdhbWUnLCB7IGdhbWVJZDogZ2FtZUlkIH0pXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICBdXG4gICAgLy8gICAgIH0pXG4gICAgLy8gfVxufSlcblxuIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikgPT4ge1xuXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ25ldy1nYW1lJywge1xuICAgICAgICB1cmw6ICcvbmV3LWdhbWUnLFxuICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9tYWluLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnTmV3R2FtZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICB0ZWFtRGVja3M6IChHYW1lRmFjdG9yeSkgPT4gR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCgpLFxuICAgICAgICAgICAgc3RhbmRhcmREZWNrOiAoR2FtZUZhY3RvcnkpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoMSlcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ25ldy1nYW1lLm1haW4nLCB7XG4gICAgICAgIHVybDogJy9zZXR1cC1nYW1lJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9uZXctZ2FtZS5odG1sJyxcbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5hZGQtZGVja3MnLCB7XG4gICAgICAgIHVybDogJy9hZGQtZGVja3MnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL2FkZC1kZWNrcy5odG1sJyxcbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5kZWNrJywge1xuICAgICAgICB1cmw6ICcvZGVjay86ZGVja0lkJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9kZWNrLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnRGVja0N0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBjYXJkczogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldENhcmRzQnlEZWNrSWQoJHN0YXRlUGFyYW1zLmRlY2tJZClcbiAgICAgICAgfVxuXG5cbiAgICB9KVxuXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL25ldy1nYW1lL3NldHVwLWdhbWUnKTtcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdOZXdHYW1lQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkc3RhdGUsIHRlYW1EZWNrcywgc3RhbmRhcmREZWNrKSA9PiB7XG4gICAgJHNjb3BlLmN1cnJlbnRWaWV3ID0gJ2FkZERlY2tzJ1xuICAgICRzY29wZS5nYW1lQ29uZmlnID0ge307XG4gICAgJHNjb3BlLmdhbWVDb25maWcuZGVja3MgPSB7fTtcbiAgICAkc2NvcGUuZ29Ub0RlY2tzID0gKCkgPT4ge1xuICAgICAgICAkc3RhdGUuZ28oJ25ldy1nYW1lLmFkZC1kZWNrcycsIHt9LCB7IGxvY2F0aW9uOiB0cnVlLCByZWxvYWQ6IHRydWUgfSlcbiAgICB9XG5cbiAgICAkc2NvcGUuZGVja3MgPSBzdGFuZGFyZERlY2suY29uY2F0KHRlYW1EZWNrcyk7XG5cbiAgICAkc2NvcGUuc3RhcnROZXdHYW1lID0gKGdhbWVDb25maWcpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJjYWxsZWQgc3RhcnQgbmV3IGdhbWVcIilcbiAgICAgICAgR2FtZUZhY3Rvcnkuc3RhcnROZXdHYW1lKGdhbWVDb25maWcpLnRoZW4oKGlkKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1hZGUgaXQgdG8gdGhlIC50aGVuXCIpXG4gICAgICAgICAgICBHYW1lRmFjdG9yeS5hZGRQaWxlVG9HYW1lKGlkLCAkc2NvcGUuZ2FtZUNvbmZpZy5kZWNrcylcbiAgICAgICAgICAgICRzdGF0ZS5nbygnZ2FtZS5hY3RpdmUtZ2FtZScsIHsgZ2FtZUlkOiBpZCB9KVxuXG5cbiAgICAgICAgfSlcbiAgICB9XG4gICAgJHNjb3BlLmFkZERlY2tzVG9HYW1lID0gR2FtZUZhY3RvcnkuYWRkRGVja3M7XG4gICAgLy8gJHNjb3BlLiRvbignY2hhbmdlZEdhbWUnLCAoZXZlbnQsIGRhdGEpID0+IHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ3JlY2VpdmVkIGV2ZW50JylcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ2RhdGEgb2JqOicsIGRhdGEpXG4gICAgLy8gICAgICRzY29wZS5nYW1lID0gZGF0YTtcbiAgICAvLyAgICAgJHNjb3BlLiRkaWdlc3QoKVxuXG4gICAgLy8gfSlcblxuXG59KVxuXG5hcHAuY29udHJvbGxlcignRGVja0N0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgJHN0YXRlLCBjYXJkcykgPT4ge1xuICAgICRzY29wZS5jYXJkcyA9IGNhcmRzXG59KVxuXG4iLCIvL0RpcmVjdGl2ZSBGaWxlIiwiYXBwLmRpcmVjdGl2ZSgnc3VibWl0dGVkQ2FyZHMnLCBmdW5jdGlvbigpe1xuXG5cdHJldHVybiB7XG5cblx0XHRyZXN0cmljdDogJ0UnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvY29tbW9uL2RpcmVjdGl2ZXMvc3VibWl0dGVkLWNhcmRzLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdHYW1lQ3RybCdcblx0fVxufSkiLCJhcHAuZGlyZWN0aXZlKCd3aGl0ZUNhcmRzJywgZnVuY3Rpb24oKXtcblxuXHRyZXR1cm4ge1xuXG5cdFx0cmVzdHJpY3Q6ICdFJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2NvbW1vbi9kaXJlY3RpdmVzL3doaXRlLWNhcmRzLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdHYW1lQ3RybCdcblx0fVxufSkiLCJhcHAuZmFjdG9yeSgnQWN0aXZlR2FtZUZhY3RvcnknLCAoJGh0dHAsICRyb290U2NvcGUsICRsb2NhbFN0b3JhZ2UpID0+IHtcblxuICAgICAgICBjb25zdCBBY3RpdmVHYW1lRmFjdG9yeSA9IHt9O1xuXG4gICAgICAgIGNvbnN0IHJlZmlsbGVyID0gKGNhcmRzTmVlZGVkLCBwaWxlUmVmLCBoYW5kUmVmKSA9PiB7XG4gICAgICAgICAgcGlsZVJlZi5saW1pdFRvRmlyc3QoY2FyZHNOZWVkZWQpLm9uY2UoJ3ZhbHVlJywgY2FyZHNTbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICBjYXJkc1NuYXBzaG90LmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgICAgICAgIGxldCB1cGRhdGVPYmogPSB7fVxuICAgICAgICAgICAgICBjYXJkLnJlZi50cmFuc2FjdGlvbihjYXJkRGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICB1cGRhdGVPYmpbY2FyZC5rZXldID0gY2FyZERhdGFcbiAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBoYW5kUmVmLnVwZGF0ZSh1cGRhdGVPYmopKVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgICAgIH1cblxuICAgICAgICBBY3RpdmVHYW1lRmFjdG9yeS5yZWZpbGxNeUhhbmQgPSAoZ2FtZUlkLCBwbGF5ZXJJZCwgdGVhbUlkKSA9PiB7XG4gICAgICAgICAgLy8gaG93IG1hbnkgY2FyZHMgZG8gSSBuZWVkP1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVmaWxsaW5nIGhhbmRcIilcbiAgICAgICAgICBsZXQgY2FyZHNOZWVkZWQgPSAwXG4gICAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICBjb25zdCBoYW5kUmVmID0gZ2FtZVJlZi5jaGlsZChgcGxheWVycy8ke3BsYXllcklkfS9oYW5kYClcbiAgICAgICAgICBjb25zdCBwaWxlUmVmID0gZ2FtZVJlZi5jaGlsZCgncGlsZS93aGl0ZWNhcmRzJylcbiAgICAgICAgICBoYW5kUmVmLm9uY2UoJ3ZhbHVlJywgaGFuZFNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgY2FyZHNOZWVkZWQgPSA3IC0gaGFuZFNuYXBzaG90Lm51bUNoaWxkcmVuKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHJlZmlsbGVyKGNhcmRzTmVlZGVkLCBwaWxlUmVmLCBoYW5kUmVmKVxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIm1hZGUgaXQgdG8gcmVmaWxsZXJcIilcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmaXJlYmFzZU1vdmVTaW5nbGVLZXlWYWx1ZSA9IChvbGRSZWYsIG5ld1JlZikgPT4ge1xuICAgICAgICAgICAgbGV0IHJlbW92ZVVwZGF0ZSA9IHt9XG4gICAgICAgICAgICBsZXQgbmV3VXBkYXRlID0ge31cbiAgICAgICAgICAgIHJldHVybiBvbGRSZWYub25jZSgndmFsdWUnKVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICAgICAgICAgICAgICAudGhlbihzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZVVwZGF0ZVtzbmFwc2hvdC5rZXldID0gbnVsbFxuICAgICAgICAgICAgICAgICAgICBuZXdVcGRhdGVbc25hcHNob3Qua2V5XSA9IHNuYXBzaG90LnZhbCgpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdSZWYudXBkYXRlKG5ld1VwZGF0ZSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IG9sZFJlZi5wYXJlbnQudXBkYXRlKHJlbW92ZVVwZGF0ZSkpXG4gICAgICAgIH1cblxuICAgICAgICBBY3RpdmVHYW1lRmFjdG9yeS5zdWJtaXRXaGl0ZUNhcmQgPSAocGxheWVySWQsIGNhcmRJZCwgZ2FtZUlkLCB0ZWFtSWQsIGNhcmRUZXh0KSA9PiB7XG4gICAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YCk7XG4gICAgICAgICAgY29uc3QgY2FyZFRvU3VibWl0ID0gZ2FtZVJlZi5jaGlsZChgcGxheWVycy8ke3BsYXllcklkfS9oYW5kLyR7Y2FyZElkfWApO1xuICAgICAgICAgIGNvbnN0IHN1Ym1pdFJlZiA9IGdhbWVSZWYuY2hpbGQoJ3N1Ym1pdHRlZFdoaXRlQ2FyZHMnKTtcbiAgICAgICAgICBmaXJlYmFzZU1vdmVTaW5nbGVLZXlWYWx1ZShjYXJkVG9TdWJtaXQsIHN1Ym1pdFJlZilcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgc3VibWl0UmVmLmNoaWxkKGNhcmRJZCkuc2V0KHtcbiAgICAgICAgICAgICAgICBzdWJtaXR0ZWRCeTogcGxheWVySWQsXG4gICAgICAgICAgICAgICAgdGV4dDogY2FyZFRleHRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBBY3RpdmVHYW1lRmFjdG9yeTsgXG5cblxufSk7IiwiYXBwLmZhY3RvcnkoJ0dhbWVGYWN0b3J5JywgKCRodHRwLCAkcm9vdFNjb3BlLCAkbG9jYWxTdG9yYWdlKSA9PiB7XG5cbiAgICAgICAgY29uc3Qgb3VySXBzID0ge1xuICAgICAgICAgICAgbmlraXRhOiBcIjE5Mi4xNjguNC4yMTNcIixcbiAgICAgICAgICAgIGtheWxhOiBcIjE5Mi4xNjguNC4yMjVcIixcbiAgICAgICAgICAgIG5pdGh5YTogXCIxOTIuMTY4LjEuNDhcIixcbiAgICAgICAgICAgIGRhbjogXCIxOTIuMTY4LjQuMjM2XCJcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjdXJyZW50SXAgPSBvdXJJcHMua2F5bGFcblxuXG4gICAgICAgIC8vIHN0YXJ0IGEgbmV3IGdhbWUgZGVycFxuICAgICAgICBjb25zdCBHYW1lRmFjdG9yeSA9IHt9O1xuICAgICAgICBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWUgPSAoZ2FtZUNvbmZpZykgPT4ge1xuICAgICAgICAgICAgLy9jYW4gYWxzbyBnZXQgYWxsIHRoZSBkZWNrcyBieSB0ZWFtIGhlcmUgdG8gcHJlcGFyZVxuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gJGxvY2FsU3RvcmFnZS50ZWFtLmlkIHx8IDI7XG4gICAgICAgICAgICBjb25zdCBjcmVhdG9ySWQgPSAkbG9jYWxTdG9yYWdlLnVzZXIuaWQgfHwgMztcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzYCwge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBnYW1lQ29uZmlnLm5hbWUgfHwgJ0FXRVNPTUUgTmFtZScsXG4gICAgICAgICAgICAgICAgICAgIHRlYW1JZDogdGVhbUlkLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdG9ySWQ6IGNyZWF0b3JJZCxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvck5hbWU6ICRsb2NhbFN0b3JhZ2UudXNlci5uYW1lIHx8ICdkYW4nLCAvL21pZ2h0IGJlIHVubmVjZXNzYXJ5IGlmIHdlIGhhdmUgdGhlIHVzZXIgaWRcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IGdhbWVDb25maWdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdhbWVJZCA9IHJlcy5kYXRhXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgL3RlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAgICAgICAgICAgICBnYW1lUmVmLm9uKCd2YWx1ZScsIHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnY2hhbmdlZEdhbWUnLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnYW1lSWQ7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcbiAgICAgICAgLy8gZ2V0IGFsbCBvZiBhIGRlY2tzIGNhcmRzIHRvIGRpc3BsYXkgd2hlbiBsb29raW5nIGF0IGRlY2tzXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldENhcmRzQnlEZWNrSWQgPSAoaWQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZGVja3MvJHtpZH0vY2FyZHNgKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gVE9ETzogY29tYmluZSB0aGlzIGludG8gdGhlIGFib3ZlIHN0YXJ0TmV3R2FtZSBmdW5jXG4gICAgICAgIC8vIHRha2UgYWxsIG9mIHRoZSBzZWxlY3RlZCBkZWNrcycgY2FyZHMgYW5kIHB1dCB0aGVtIGluIHRoZSBmaXJlYmFzZSBnYW1lIG9iamVjdCBwaWxlICh0aHJvdWdoIHJvdXRlKVxuICAgICAgICBHYW1lRmFjdG9yeS5hZGRQaWxlVG9HYW1lID0gKGdhbWVJZCwgZGVja3MpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRkaW5nIHBpbGUgdG8gZ2FtZVwiKVxuICAgICAgICAgICAgY29uc3QgZGVja3NBcnIgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGRlY2tJZCBpbiBkZWNrcykge1xuICAgICAgICAgICAgICAgIGRlY2tzQXJyLnB1c2goZGVja0lkKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZ2FtZXMvJHtnYW1lSWR9L2RlY2tzYCwge1xuICAgICAgICAgICAgICAgICdkZWNrcyc6IGRlY2tzQXJyXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgR2FtZUZhY3Rvcnkuam9pbkdhbWVCeUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gJGxvY2FsU3RvcmFnZS50ZWFtLmlkO1xuICAgICAgICAgICAgY29uc3QgcGxheWVySWQgPSAkbG9jYWxTdG9yYWdlLnVzZXIuaWQ7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJOYW1lID0gJGxvY2FsU3RvcmFnZS51c2VyLm5hbWU7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfS9wbGF5ZXJzLyR7cGxheWVySWR9YClcbiAgICAgICAgICAgIHBsYXllclJlZi5zZXQoe1xuICAgICAgICAgICAgICAgIG5hbWU6IHBsYXllck5hbWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0/cGxheWVySWQ9JHtwbGF5ZXJJZH1gKVxuICAgICAgICB9XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCA9IChpZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gKHR5cGVvZiBpZCAhPT0gJ251bWJlcicpID8gJGxvY2FsU3RvcmFnZS50ZWFtLmlkIDogaWQ7IC8vIGlkIHx8IGxvY2Fsc3RvcmFnZSBkb2Vzbid0IHdvcmsgYmVjYXVzZSAwIGlzIGZhbHNleVxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9kZWNrcz90ZWFtPSR7dGVhbUlkfWApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuXG4gICAgICAgIH07XG5cblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRVc2Vyc0J5R2FtZUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0vdXNlcnNgKTtcbiAgICAgICAgfTtcblxuXG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZUJ5R2FtZUlkID0gKGdhbWVJZCwgdGVhbUlkKSA9PiB7XG4gICAgICAgICAgICB0ZWFtSWQgPSB0ZWFtSWQgfHwgJGxvY2FsU3RvcmFnZS50ZWFtLmlkXG4gICAgICAgICAgICBjb25zdCBnYW1lc1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICAgIHJldHVybiBnYW1lc1JlZi5vbmNlKCd2YWx1ZScpLnRoZW4oc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBzbmFwc2hvdC52YWwoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCA9ICh0ZWFtSWQpID0+IHtcbiAgICAgICAgICAgIHRlYW1JZCA9IHRlYW1JZCB8fCAkbG9jYWxTdG9yYWdlLnRlYW0uaWRcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZ2FtZXMvP3RlYW1JZD0ke3RlYW1JZH1gKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgICAgIH07XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVVzZXIgPSAodXNlcklkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzLz91c2VySWQ9JHt1c2VySWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBHYW1lRmFjdG9yeTtcbiAgICB9XG5cbik7XG5cbiIsImFwcC5mYWN0b3J5KCdVc2VyRmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwLCAkbG9jYWxTdG9yYWdlKSB7XG4gICAgY29uc3Qgb3VySXBzID0ge1xuICAgICAgICBuaWtpdGE6IFwiMTkyLjE2OC40LjIxM1wiLFxuICAgICAgICBrYXlsYTogXCIxOTIuMTY4LjQuMjI1XCIsXG4gICAgICAgIG5pdGh5YTogXCIxOTIuMTY4LjEuNDhcIixcbiAgICAgICAgZGFuOiBcIjE5Mi4xNjguNC4yMzZcIlxuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRJcCA9IG91cklwcy5rYXlsYVxuICAgIHJldHVybiB7XG4gICAgICAgIHNldFVzZXI6IGZ1bmN0aW9uKGluZm8pIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL3VzZXJzYCxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBpbmZvXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldExvY2FsU3RvcmFnZShyZXMuZGF0YS51c2VyWzBdLCByZXMuZGF0YS50ZWFtWzBdKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBnZXRTbGFja0NyZWRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvc2xhY2tgKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuZGF0YVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGdldFNsYWNrSW5mbzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdodHRwczovL3NsYWNrLmNvbS9hcGkvdXNlcnMuaWRlbnRpdHknKVxuICAgICAgICB9LFxuXG4gICAgICAgIHNldExvY2FsU3RvcmFnZTogZnVuY3Rpb24odXNlciwgdGVhbSkge1xuICAgICAgICAgICAgJGxvY2FsU3RvcmFnZS51c2VyID0gdXNlcjtcbiAgICAgICAgICAgICRsb2NhbFN0b3JhZ2UudGVhbSA9IHRlYW07XG4gICAgICAgIH0sXG5cbiAgICAgICAgbG9nT3V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRsb2NhbFN0b3JhZ2UuJHJlc2V0KCk7XG4gICAgICAgIH1cbiAgICB9XG59KVxuXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
