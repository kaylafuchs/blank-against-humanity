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
app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'HomeCtrl',
        resolve: {
            games: function games(GameFactory) {
                return GameFactory.getGamesByTeamId();
            },
            openGames: function openGames(GameFactory) {
                return GameFactory.getOpenGames();
            }
        }
    });
});

app.controller('HomeCtrl', function ($scope, $state, $cordovaOauth, UserFactory, GameFactory, $localStorage, $ionicPopup, openGames, games) {
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
        var teamId = $localStorage.team.id;
        var userId = $localStorage.user.id;
        console.log('running getOpenGames');
        return $http.get('http://' + currentIp + ':1337/api/games/?teamId=' + teamId + '&userId=' + userId + '&open=true').then(function (res) {
            console.log('hitting getOpenGames');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImNhcmRzLXRlc3QvY2FyZHNUZXN0LmpzIiwiZnJvbSBmc2cvZnJvbS1mc2cuanMiLCJkZWNrcy9kZWNrcy5qcyIsImhvbWUvaG9tZS5qcyIsImxvZ2luL2xvZ2luLmpzIiwiZ2FtZS9nYW1lLmpzIiwibmV3LWdhbWUvbmV3LWdhbWUuanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiLCJjb21tb24vZGlyZWN0aXZlcy93aGl0ZS1jYXJkcy5qcyIsImNvbW1vbi9mYWN0b3JpZXMvQWN0aXZlR2FtZUZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yaWVzL0dhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy91c2VyRmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJhcHAiLCJhbmd1bGFyIiwibW9kdWxlIiwicnVuIiwiJGlvbmljUGxhdGZvcm0iLCJyZWFkeSIsImNvcmRvdmEiLCJwbHVnaW5zIiwiS2V5Ym9hcmQiLCJoaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIiLCJkaXNhYmxlU2Nyb2xsIiwiU3RhdHVzQmFyIiwic3R5bGVMaWdodENvbnRlbnQiLCIkcm9vdFNjb3BlIiwiJG9uIiwiY29uc29sZSIsImxvZyIsIkpTT04iLCJzdHJpbmdpZnkiLCJhcmd1bWVudHMiLCJjb250cm9sbGVyIiwiJHNjb3BlIiwiVXNlckZhY3RvcnkiLCIkc3RhdGUiLCIkbG9jYWxTdG9yYWdlIiwiJHRpbWVvdXQiLCJsb2dPdXQiLCJnbyIsImNvbmZpZyIsIiRzdGF0ZVByb3ZpZGVyIiwic3RhdGUiLCJ1cmwiLCJ0ZW1wbGF0ZVVybCIsImdyZWV0aW5nIiwicmVzb2x2ZSIsImRlY2tzIiwiR2FtZUZhY3RvcnkiLCIkc3RhdGVQYXJhbXMiLCJnZXREZWNrc0J5VGVhbUlkIiwic3RhdGVQYXJhbXMiLCJ0ZWFtSWQiLCIkdXJsUm91dGVyUHJvdmlkZXIiLCJnYW1lcyIsImdldEdhbWVzQnlUZWFtSWQiLCJvcGVuR2FtZXMiLCJnZXRPcGVuR2FtZXMiLCIkY29yZG92YU9hdXRoIiwiJGlvbmljUG9wdXAiLCJzdGFydE5ld0dhbWUiLCJzdG9yYWdlIiwiZ29Ub05ld0dhbWUiLCJvdGhlcndpc2UiLCIkaW9uaWNTaWRlTWVudURlbGVnYXRlIiwibG9naW5XaXRoU2xhY2siLCJnZXRTbGFja0NyZWRzIiwidGhlbiIsInNsYWNrIiwiY3JlZHMiLCJjbGllbnRJRCIsImNsaWVudFNlY3JldCIsInNldFVzZXIiLCJpbmZvIiwiY2FuRHJhZ0NvbnRlbnQiLCJyZWRpcmVjdFVzZXIiLCJ1c2VyIiwiQWN0aXZlR2FtZUZhY3RvcnkiLCJnYW1lSWQiLCJwbGF5ZXJJZCIsImlkIiwidGVhbSIsImdhbWVSZWYiLCJmaXJlYmFzZSIsImRhdGFiYXNlIiwicmVmIiwidG9TdHJpbmciLCJyb3VuZCIsInNob3dDYXJkcyIsIm9uIiwiZ2FtZSIsImdhbWVTbmFwc2hvdCIsInZhbCIsImdhbWVOYW1lIiwic2V0dGluZ3MiLCJuYW1lIiwiYmxhY2tDYXJkIiwiY3VycmVudEJsYWNrQ2FyZCIsImJsYWNrQ2FyZFRleHQiLCJ0ZXh0IiwianVkZ2UiLCJjdXJyZW50SnVkZ2UiLCIkZXZhbEFzeW5jIiwiam9pblRoZW5HZXRDYXJkcyIsImpvaW5HYW1lQnlJZCIsInJlZmlsbE15SGFuZCIsInBsYXllcnMiLCJwbGF5ZXJIYW5kIiwiY2F0Y2giLCJlcnIiLCJvbkRvdWJsZVRhcCIsImNhcmRJZCIsInN1Ym1pdFdoaXRlQ2FyZCIsImFic3RyYWN0IiwidGVhbURlY2tzIiwic3RhbmRhcmREZWNrIiwiY2FyZHMiLCJnZXRDYXJkc0J5RGVja0lkIiwiZGVja0lkIiwiY3VycmVudFZpZXciLCJnYW1lQ29uZmlnIiwiZ29Ub0RlY2tzIiwibG9jYXRpb24iLCJyZWxvYWQiLCJjb25jYXQiLCJhZGRQaWxlVG9HYW1lIiwiYWRkRGVja3NUb0dhbWUiLCJhZGREZWNrcyIsImRpcmVjdGl2ZSIsInJlc3RyaWN0IiwiZmFjdG9yeSIsIiRodHRwIiwicmVmaWxsZXIiLCJjYXJkc05lZWRlZCIsInBpbGVSZWYiLCJoYW5kUmVmIiwibGltaXRUb0ZpcnN0Iiwib25jZSIsImNhcmRzU25hcHNob3QiLCJmb3JFYWNoIiwidXBkYXRlT2JqIiwiY2FyZCIsInRyYW5zYWN0aW9uIiwia2V5IiwiY2FyZERhdGEiLCJ1cGRhdGUiLCJjaGlsZCIsImhhbmRTbmFwc2hvdCIsIm51bUNoaWxkcmVuIiwiZmlyZWJhc2VNb3ZlU2luZ2xlS2V5VmFsdWUiLCJvbGRSZWYiLCJuZXdSZWYiLCJyZW1vdmVVcGRhdGUiLCJuZXdVcGRhdGUiLCJzbmFwc2hvdCIsInBhcmVudCIsImNhcmRUb1N1Ym1pdCIsInN1Ym1pdFJlZiIsInNldCIsInN1Ym1pdHRlZEJ5Iiwib3VySXBzIiwibmlraXRhIiwia2F5bGEiLCJuaXRoeWEiLCJkYW4iLCJjdXJyZW50SXAiLCJjcmVhdG9ySWQiLCJwb3N0IiwiY3JlYXRvck5hbWUiLCJyZXMiLCJkYXRhIiwiJGJyb2FkY2FzdCIsImdldCIsImRlY2tzQXJyIiwicHVzaCIsInBsYXllck5hbWUiLCJwbGF5ZXJSZWYiLCJnZXRVc2Vyc0J5R2FtZUlkIiwiZ2V0R2FtZUJ5R2FtZUlkIiwiZ2FtZXNSZWYiLCJ1c2VySWQiLCJnZXRHYW1lc0J5VXNlciIsIm1ldGhvZCIsImhlYWRlcnMiLCJzZXRMb2NhbFN0b3JhZ2UiLCJnZXRTbGFja0luZm8iLCIkcmVzZXQiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBQSxPQUFBQyxHQUFBLEdBQUFDLFFBQUFDLE1BQUEsQ0FBQSxzQkFBQSxFQUFBLENBQUEsT0FBQSxFQUFBLFdBQUEsRUFBQSxXQUFBLEVBQUEsZ0JBQUEsRUFBQSxXQUFBLEVBQUEsV0FBQSxDQUFBLENBQUE7O0FBR0FGLElBQUFHLEdBQUEsQ0FBQSxVQUFBQyxjQUFBLEVBQUE7QUFDQUEsbUJBQUFDLEtBQUEsQ0FBQSxZQUFBO0FBQ0EsWUFBQU4sT0FBQU8sT0FBQSxJQUFBUCxPQUFBTyxPQUFBLENBQUFDLE9BQUEsQ0FBQUMsUUFB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RUFBQTZGLElBQUFDLElBQUEsQ0FBQXpGLElBQUEsQ0FBQSxDQUFBLENBQUE7QUFDQSxhQVZBLENBQUE7QUFXQSxTQWJBO0FBY0FmLHVCQUFBLHlCQUFBO0FBQ0EsbUJBQUFpRSxNQUFBeUMsR0FBQSxhQUFBUCxTQUFBLHNCQUNBbEcsSUFEQSxDQUNBLGVBQUE7QUFDQSx1QkFBQXNHLElBQUFDLElBQUE7QUFDQSxhQUhBLENBQUE7QUFJQSxTQW5CQTtBQW9CQWUsc0JBQUEsd0JBQUE7QUFDQSxtQkFBQXRELE1BQUF5QyxHQUFBLENBQUEsc0NBQUEsQ0FBQTtBQUNBLFNBdEJBOztBQXdCQVkseUJBQUEseUJBQUE1RyxJQUFBLEVBQUFLLElBQUEsRUFBQTtBQUNBN0MsMEJBQUF3QyxJQUFBLEdBQUFBLElBQUE7QUFDQXhDLDBCQUFBNkMsSUFBQSxHQUFBQSxJQUFBO0FBQ0EsU0EzQkE7O0FBNkJBM0MsZ0JBQUEsa0JBQUE7QUFDQUYsMEJBQUFzSixNQUFBO0FBQ0E7QUEvQkEsS0FBQTtBQWlDQSxDQTFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW9uaWMgU3RhcnRlciBBcHBcblxuLy8gYW5ndWxhci5tb2R1bGUgaXMgYSBnbG9iYWwgcGxhY2UgZm9yIGNyZWF0aW5nLCByZWdpc3RlcmluZyBhbmQgcmV0cmlldmluZyBBbmd1bGFyIG1vZHVsZXNcbi8vICdzdGFydGVyJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xuXG53aW5kb3cuYXBwID0gYW5ndWxhci5tb2R1bGUoJ0JsYW5rQWdhaW5zdEh1bWFuaXR5JywgWydpb25pYycsICd1aS5yb3V0ZXInLCAnbmdDb3Jkb3ZhJywgJ25nQ29yZG92YU9hdXRoJywgJ25nU3RvcmFnZScsICduZ0FuaW1hdGUnXSlcblxuXG5hcHAucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtKSB7XG4gICAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICAgICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAgICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuXG4gICAgICAgICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcbiAgICAgICAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxuICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgICAgICAgIFN0YXR1c0Jhci5zdHlsZUxpZ2h0Q29udGVudCgpXG4gICAgICAgIH1cbiAgICB9KTtcblxufSlcblxuYXBwLnJ1bihmdW5jdGlvbigkcm9vdFNjb3BlKSB7XG4gICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZUVycm9yJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGFyZ3VtZW50c1s1XSkpO1xuICAgIH0pO1xufSk7XG5cbiIsImFwcC5jb250cm9sbGVyKCdMb2dvdXRDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBVc2VyRmFjdG9yeSwgJHN0YXRlLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCl7XG5cdCRzY29wZS5sb2dPdXQgPSBmdW5jdGlvbigpe1xuXHRcdFVzZXJGYWN0b3J5LmxvZ091dCgpXG5cdFx0JHN0YXRlLmdvKCdsb2dpbicpXG5cdH1cbn0pIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcil7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdjYXJkcycsIHtcblx0XHR1cmw6ICcvY2FyZHMnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvY2FyZHMtdGVzdC9jYXJkcy10ZXN0Lmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdDYXJkc1Rlc3RDdHJsJ1xuXHR9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0NhcmRzVGVzdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpe1xuIFx0JHNjb3BlLmdyZWV0aW5nID0gXCJISVwiXG59KSIsIi8vIChmdW5jdGlvbiAoKSB7XG5cbi8vICAgICAndXNlIHN0cmljdCc7XG5cbi8vICAgICAvLyBIb3BlIHlvdSBkaWRuJ3QgZm9yZ2V0IEFuZ3VsYXIhIER1aC1kb3kuXG4vLyAgICAgaWYgKCF3aW5kb3cuYW5ndWxhcikgdGhyb3cgbmV3IEVycm9yKCdJIGNhblxcJ3QgZmluZCBBbmd1bGFyIScpO1xuXG4vLyAgICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdmc2FQcmVCdWlsdCcsIFtdKTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdTb2NrZXQnLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgIGlmICghd2luZG93LmlvKSB0aHJvdyBuZXcgRXJyb3IoJ3NvY2tldC5pbyBub3QgZm91bmQhJyk7XG4vLyAgICAgICAgIHJldHVybiB3aW5kb3cuaW8od2luZG93LmxvY2F0aW9uLm9yaWdpbik7XG4vLyAgICAgfSk7XG5cbi8vICAgICAvLyBBVVRIX0VWRU5UUyBpcyB1c2VkIHRocm91Z2hvdXQgb3VyIGFwcCB0b1xuLy8gICAgIC8vIGJyb2FkY2FzdCBhbmQgbGlzdGVuIGZyb20gYW5kIHRvIHRoZSAkcm9vdFNjb3BlXG4vLyAgICAgLy8gZm9yIGltcG9ydGFudCBldmVudHMgYWJvdXQgYXV0aGVudGljYXRpb24gZmxvdy5cbi8vICAgICBhcHAuY29uc3RhbnQoJ0FVVEhfRVZFTlRTJywge1xuLy8gICAgICAgICBsb2dpblN1Y2Nlc3M6ICdhdXRoLWxvZ2luLXN1Y2Nlc3MnLFxuLy8gICAgICAgICBsb2dpbkZhaWxlZDogJ2F1dGgtbG9naW4tZmFpbGVkJyxcbi8vICAgICAgICAgbG9nb3V0U3VjY2VzczogJ2F1dGgtbG9nb3V0LXN1Y2Nlc3MnLFxuLy8gICAgICAgICBzZXNzaW9uVGltZW91dDogJ2F1dGgtc2Vzc2lvbi10aW1lb3V0Jyxcbi8vICAgICAgICAgbm90QXV0aGVudGljYXRlZDogJ2F1dGgtbm90LWF1dGhlbnRpY2F0ZWQnLFxuLy8gICAgICAgICBub3RBdXRob3JpemVkOiAnYXV0aC1ub3QtYXV0aG9yaXplZCdcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdBdXRoSW50ZXJjZXB0b3InLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHEsIEFVVEhfRVZFTlRTKSB7XG4vLyAgICAgICAgIHZhciBzdGF0dXNEaWN0ID0ge1xuLy8gICAgICAgICAgICAgNDAxOiBBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLFxuLy8gICAgICAgICAgICAgNDAzOiBBVVRIX0VWRU5UUy5ub3RBdXRob3JpemVkLFxuLy8gICAgICAgICAgICAgNDE5OiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCxcbi8vICAgICAgICAgICAgIDQ0MDogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXRcbi8vICAgICAgICAgfTtcbi8vICAgICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgICAgIHJlc3BvbnNlRXJyb3I6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChzdGF0dXNEaWN0W3Jlc3BvbnNlLnN0YXR1c10sIHJlc3BvbnNlKTtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlc3BvbnNlKVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9O1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLmNvbmZpZyhmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xuLy8gICAgICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKFtcbi8vICAgICAgICAgICAgICckaW5qZWN0b3InLFxuLy8gICAgICAgICAgICAgZnVuY3Rpb24gKCRpbmplY3Rvcikge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkaW5qZWN0b3IuZ2V0KCdBdXRoSW50ZXJjZXB0b3InKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgXSk7XG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuc2VydmljZSgnQXV0aFNlcnZpY2UnLCBmdW5jdGlvbiAoJGh0dHAsIFNlc3Npb24sICRyb290U2NvcGUsIEFVVEhfRVZFTlRTLCAkcSkge1xuXG4vLyAgICAgICAgIGZ1bmN0aW9uIG9uU3VjY2Vzc2Z1bExvZ2luKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICB2YXIgdXNlciA9IHJlc3BvbnNlLmRhdGEudXNlcjtcbi8vICAgICAgICAgICAgIFNlc3Npb24uY3JlYXRlKHVzZXIpO1xuLy8gICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ2luU3VjY2Vzcyk7XG4vLyAgICAgICAgICAgICByZXR1cm4gdXNlcjtcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIC8vIFVzZXMgdGhlIHNlc3Npb24gZmFjdG9yeSB0byBzZWUgaWYgYW5cbi8vICAgICAgICAgLy8gYXV0aGVudGljYXRlZCB1c2VyIGlzIGN1cnJlbnRseSByZWdpc3RlcmVkLlxuLy8gICAgICAgICB0aGlzLmlzQXV0aGVudGljYXRlZCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAhIVNlc3Npb24udXNlcjtcbi8vICAgICAgICAgfTtcblxuICAgICAgICBcbi8vICAgICAgICAgdGhpcy5pc0FkbWluID0gZnVuY3Rpb24odXNlcklkKXtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdydW5uaW5nIGFkbWluIGZ1bmMnKVxuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKVxuLy8gICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YS51c2VyLmlzQWRtaW4pXG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICB0aGlzLmdldExvZ2dlZEluVXNlciA9IGZ1bmN0aW9uIChmcm9tU2VydmVyKSB7XG5cbi8vICAgICAgICAgICAgIC8vIElmIGFuIGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbiBleGlzdHMsIHdlXG4vLyAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIHVzZXIgYXR0YWNoZWQgdG8gdGhhdCBzZXNzaW9uXG4vLyAgICAgICAgICAgICAvLyB3aXRoIGEgcHJvbWlzZS4gVGhpcyBlbnN1cmVzIHRoYXQgd2UgY2FuXG4vLyAgICAgICAgICAgICAvLyBhbHdheXMgaW50ZXJmYWNlIHdpdGggdGhpcyBtZXRob2QgYXN5bmNocm9ub3VzbHkuXG5cbi8vICAgICAgICAgICAgIC8vIE9wdGlvbmFsbHksIGlmIHRydWUgaXMgZ2l2ZW4gYXMgdGhlIGZyb21TZXJ2ZXIgcGFyYW1ldGVyLFxuLy8gICAgICAgICAgICAgLy8gdGhlbiB0aGlzIGNhY2hlZCB2YWx1ZSB3aWxsIG5vdCBiZSB1c2VkLlxuXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSAmJiBmcm9tU2VydmVyICE9PSB0cnVlKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLndoZW4oU2Vzc2lvbi51c2VyKTtcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgLy8gTWFrZSByZXF1ZXN0IEdFVCAvc2Vzc2lvbi5cbi8vICAgICAgICAgICAgIC8vIElmIGl0IHJldHVybnMgYSB1c2VyLCBjYWxsIG9uU3VjY2Vzc2Z1bExvZ2luIHdpdGggdGhlIHJlc3BvbnNlLlxuLy8gICAgICAgICAgICAgLy8gSWYgaXQgcmV0dXJucyBhIDQwMSByZXNwb25zZSwgd2UgY2F0Y2ggaXQgYW5kIGluc3RlYWQgcmVzb2x2ZSB0byBudWxsLlxuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKS50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKS5jYXRjaChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4vLyAgICAgICAgICAgICB9KTtcblxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbiAoY3JlZGVudGlhbHMpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvbG9naW4nLCBjcmVkZW50aWFscylcbi8vICAgICAgICAgICAgICAgICAudGhlbihvblN1Y2Nlc3NmdWxMb2dpbilcbi8vICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHsgbWVzc2FnZTogJ0ludmFsaWQgbG9naW4gY3JlZGVudGlhbHMuJ30pO1xuLy8gICAgICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMuc2lnbnVwID0gZnVuY3Rpb24oY3JlZGVudGlhbHMpe1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbi8vICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbi8vICAgICAgICAgICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbi8vICAgICAgICAgICAgICAgICBkYXRhOiBjcmVkZW50aWFsc1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQuZGF0YSlcbi8vICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbigpe1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3Qoe21lc3NhZ2U6ICdUaGF0IGVtYWlsIGlzIGFscmVhZHkgYmVpbmcgdXNlZC4nfSk7XG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL2xvZ291dCcpLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgIFNlc3Npb24uZGVzdHJveSgpO1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dvdXRTdWNjZXNzKTtcbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuc2VydmljZSgnU2Vzc2lvbicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUykge1xuXG4vLyAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuLy8gICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICBzZWxmLmRlc3Ryb3koKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuXG4vLyAgICAgICAgIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24gKHVzZXIpIHtcbi8vICAgICAgICAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcbi8vICAgICAgICAgfTtcblxuLy8gICAgIH0pO1xuXG4vLyB9KCkpO1xuIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIpID0+IHtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2RlY2tzJywge1xuXHRcdHVybDogJ2RlY2tzLzp0ZWFtaWQnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvZGVja3MvZGVja3MuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0RlY2tDdHJsJyxcblx0XHRyZXNvbHZlOiB7XG5cdFx0XHRkZWNrczogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoc3RhdGVQYXJhbXMudGVhbUlkKVxuXHRcdH1cblx0fSlcblxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0RlY2tDdHJsJywgKCRzY29wZSkgPT4ge1xuXG5cblx0XG59KSIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lJywge1xuICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9ob21lL2hvbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGdhbWVzOiAoR2FtZUZhY3RvcnkpID0+IEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQoKSxcbiAgICAgICAgICAgIG9wZW5HYW1lczogKEdhbWVGYWN0b3J5KSA9PiBHYW1lRmFjdG9yeS5nZXRPcGVuR2FtZXMoKVxuICAgICAgICB9XG4gICAgfSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdIb21lQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCAkY29yZG92YU9hdXRoLCBVc2VyRmFjdG9yeSwgR2FtZUZhY3RvcnksICRsb2NhbFN0b3JhZ2UsICRpb25pY1BvcHVwLCBvcGVuR2FtZXMsIGdhbWVzKSB7XG4gICAgJHNjb3BlLnN0YXJ0TmV3R2FtZSA9IEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZTtcbiAgICAkc2NvcGUuc3RvcmFnZSA9ICRsb2NhbFN0b3JhZ2U7XG4gICAgJHNjb3BlLmdhbWVzID0gZ2FtZXM7XG4gICAgLy8kc2NvcGUub3BlbkdhbWVzID0gb3BlbkdhbWVzO1xuXG4gICAgY29uc29sZS5sb2coXCJnYW1lc1wiLCBKU09OLnN0cmluZ2lmeSgkc2NvcGUuZ2FtZXMpKVxuICAgICRzY29wZS5nb1RvTmV3R2FtZSA9ICgpID0+IHtcbiAgICAgICAgJHN0YXRlLmdvKCduZXctZ2FtZS5tYWluJylcbiAgICB9XG5cbiAgICAkc2NvcGUub3BlbkdhbWVzID0gb3BlbkdhbWVzXG4gICAgICAgIC8vICRzY29wZS5qb2luR2FtZSA9IEdhbWVGYWN0b3J5LmpvaW5HYW1lQnlJZDtcblxuICAgIC8vICRzY29wZS5zaG93UG9wdXAgPSBmdW5jdGlvbihnYW1lSWQpIHtcblxuICAgIC8vICAgICAkc2NvcGUuZ2FtZSA9ICRzY29wZS5nYW1lc1tnYW1lSWRdO1xuICAgIC8vICAgICAkc2NvcGUuZ2FtZU5hbWUgPSAkc2NvcGUuZ2FtZS5zZXR0aW5ncy5uYW1lO1xuICAgIC8vICAgICAkc2NvcGUucGxheWVyQ291bnQgPSBPYmplY3Qua2V5cygkc2NvcGUuZ2FtZS5wbGF5ZXJzKS5sZW5ndGg7XG4gICAgLy8gICAgICRzY29wZS53YWl0aW5nRm9yUGxheWVycyA9ICAoJHNjb3BlLmdhbWUuc2V0dGluZ3MubWluUGxheWVycyB8fCA0KSAtICRzY29wZS5wbGF5ZXJDb3VudDtcblxuICAgIC8vICAgICAgY29uc3QgbXlQb3B1cCA9ICRpb25pY1BvcHVwLnNob3coe1xuICAgIC8vICAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9ob21lL3BvcHVwLmh0bWwnLFxuICAgIC8vICAgICAgICAgdGl0bGU6ICdKb2luICcgKyAkc2NvcGUuZ2FtZU5hbWUsXG4gICAgLy8gICAgICAgICBzY29wZTogJHNjb3BlLFxuICAgIC8vICAgICAgICAgYnV0dG9uczogXG4gICAgLy8gICAgICAgICBbXG4gICAgLy8gICAgICAgICAgICAge3RleHQ6ICdHbyBiYWNrJ30sXG4gICAgLy8gICAgICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgICAgICB0ZXh0OiAnSm9pbiBnYW1lJyxcbiAgICAvLyAgICAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbi1iYWxhbmNlZCcsXG4gICAgLy8gICAgICAgICAgICAgICAgIG9uVGFwOiBlID0+IHtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICRzY29wZS5qb2luR2FtZShnYW1lSWQpO1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdnYW1lLmFjdGl2ZS1nYW1lJywgeyBnYW1lSWQ6IGdhbWVJZCB9KVxuICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgXVxuICAgIC8vICAgICB9KVxuICAgIC8vIH1cbn0pXG5cbiIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdsb2dpbicsIHtcbiAgICAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9sb2dpbi9sb2dpbi5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luQ3RybCdcbiAgICB9KVxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9sb2dpbicpO1xufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCBVc2VyRmFjdG9yeSwgJGNvcmRvdmFPYXV0aCwgJGxvY2FsU3RvcmFnZSwgJHRpbWVvdXQsICRpb25pY1NpZGVNZW51RGVsZWdhdGUpIHtcbiAgICAkc2NvcGUubG9naW5XaXRoU2xhY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIFVzZXJGYWN0b3J5LmdldFNsYWNrQ3JlZHMoKVxuICAgICAgICAgICAgLnRoZW4oY3JlZHMgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAkY29yZG92YU9hdXRoLnNsYWNrKGNyZWRzLmNsaWVudElELCBjcmVkcy5jbGllbnRTZWNyZXQsIFsnaWRlbnRpdHkuYmFzaWMnLCAnaWRlbnRpdHkudGVhbScsICdpZGVudGl0eS5hdmF0YXInXSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihpbmZvID0+IFVzZXJGYWN0b3J5LnNldFVzZXIoaW5mbykpXG4gICAgICAgICAgICAudGhlbigoKSA9PiAkc3RhdGUuZ28oJ2hvbWUnKSlcbiAgICB9XG5cbiAgICAkaW9uaWNTaWRlTWVudURlbGVnYXRlLmNhbkRyYWdDb250ZW50KGZhbHNlKTtcblxuICAgICRzY29wZS4kb24oJyRpb25pY1ZpZXcubGVhdmUnLCBmdW5jdGlvbigpIHsgJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZS5jYW5EcmFnQ29udGVudCh0cnVlKSB9KTtcblxuICAgICRzY29wZS5zdG9yYWdlID0gJGxvY2FsU3RvcmFnZVxuXG4gICAgZnVuY3Rpb24gcmVkaXJlY3RVc2VyKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInNjb3BlIHN0b3JhZ2UgdXNlclwiLCAkc2NvcGUuc3RvcmFnZS51c2VyKVxuICAgICAgICBpZiAoJHNjb3BlLnN0b3JhZ2UudXNlcikgJHN0YXRlLmdvKCdob21lJylcbiAgICB9XG5cbiAgICByZWRpcmVjdFVzZXIoKTtcbn0pXG5cbiIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnZ2FtZScsIHtcblxuICAgICAgICB1cmw6ICcvZ2FtZS86Z2FtZUlkJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL2dhbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdHYW1lQ3RybCcsXG4gICAgICAgIC8vIHJlc29sdmU6IHtcbiAgICAgICAgLy8gICAgIGdhbWUgOiAoR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcykgPT4gR2FtZUZhY3RvcnkuZ2V0R2FtZUJ5R2FtZUlkKCRzdGF0ZVBhcmFtcy5nYW1lSWQpXG4gICAgICAgIC8vIH0gIFxuICAgIH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignR2FtZUN0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zLCAkbG9jYWxTdG9yYWdlLCBBY3RpdmVHYW1lRmFjdG9yeSkgPT4ge1xuICAgIC8vIGNvbnN0IGdhbWVJZCA9ICRzdGF0ZVBhcmFtcy5nYW1lSWQ7XG4gICAgY29uc3QgZ2FtZUlkID0gJHN0YXRlUGFyYW1zLmdhbWVJZCAvLzMyO1xuICAgIGNvbnN0IHBsYXllcklkID0gJGxvY2FsU3RvcmFnZS51c2VyLmlkO1xuICAgICRzY29wZS5wbGF5ZXJJZCA9IHBsYXllcklkO1xuICAgIGNvbnN0IHRlYW1JZCA9ICRsb2NhbFN0b3JhZ2UudGVhbS5pZCAvLztcbiAgICAgICAgLy8gY29uc3QgdGVhbUlkID0gJGxvY2FsU3RvcmFnZS50ZWFtLmlkXG4gICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9L2ApO1xuICAgIGNvbnNvbGUubG9nKGdhbWVSZWYudG9TdHJpbmcoKSlcbiAgICAkc2NvcGUucm91bmQgPSB7fTtcblxuXG4gICAgJHNjb3BlLnNob3dDYXJkcyA9IGZhbHNlO1xuXG4gICAgZ2FtZVJlZi5vbigndmFsdWUnLCBnYW1lU25hcHNob3QgPT4ge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhnYW1lU25hcHNob3QudmFsKCkpXG4gICAgICAgICRzY29wZS5nYW1lID0gZ2FtZVNuYXBzaG90LnZhbCgpO1xuICAgICAgICAkc2NvcGUuZ2FtZU5hbWUgPSAkc2NvcGUuZ2FtZS5zZXR0aW5ncy5uYW1lO1xuICAgICAgICAvLyAkc2NvcGUucGxheWVySGFuZCA9ICRzY29wZS5nYW1lLnBsYXllcnNbcGxheWVySWRdLmhhbmQgPyAkc2NvcGUuZ2FtZS5wbGF5ZXJzW3BsYXllcklkXS5oYW5kIDogbnVsbFxuICAgICAgICAvLyBjb25zb2xlLmxvZygncGhhbmQgaXMnLCBKU09OLnN0cmluZ2lmeSgkc2NvcGUucGxheWVySGFuZCkpXG4gICAgICAgIC8vICRzY29wZS5wbGF5ZXJIYW5kQ291bnQgPSBPYmplY3Qua2V5cygkc2NvcGUucGxheWVySGFuZCkubGVuZ3RoO1xuXG4gICAgICAgICRzY29wZS5ibGFja0NhcmQgPSAkc2NvcGUuZ2FtZS5jdXJyZW50QmxhY2tDYXJkWzFdO1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnYmxhY2sgY2FyZCcsICRzY29wZS5ibGFja0NhcmQpXG4gICAgICAgICRzY29wZS5ibGFja0NhcmRUZXh0ID0gJHNjb3BlLmJsYWNrQ2FyZC50ZXh0XG4gICAgICAgICRzY29wZS5qdWRnZSA9ICRzY29wZS5nYW1lLmN1cnJlbnRKdWRnZTtcbiAgICAgICAgJHNjb3BlLiRldmFsQXN5bmMoKTtcbiAgICB9KVxuXG5cblxuXG5cbiAgICAvL0FjdGl2ZUdhbWVGYWN0b3J5LnJlZmlsbE15SGFuZCgkc2NvcGUuZ2FtZUlkLCBwbGF5ZXJJZCwgdGVhbUlkKVxuXG4gICAgLy8gJHNjb3BlLmpvaW4gPSBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWRcbiAgICAvLyAkc2NvcGUuam9pbkFuZEdldEhhbmQgPSAoZ2FtZUlkLCBwbGF5ZXJJZCwgdGVhbUlkKSA9PiB7XG4gICAgLy8gICAgICAgICBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWQoZ2FtZUlkKVxuICAgIC8vICAgICAgICAgQWN0aXZlR2FtZUZhY3RvcnkucmVmaWxsTXlIYW5kKGdhbWVJZCwgcGxheWVySWQsIHRlYW1JZClcbiAgICAvLyAgICAgfVxuICAgICRzY29wZS5qb2luVGhlbkdldENhcmRzID0gKCkgPT4ge1xuICAgICAgICAkc2NvcGUuc2hvd0NhcmRzID0gdHJ1ZTtcbiAgICAgICAgR2FtZUZhY3Rvcnkuam9pbkdhbWVCeUlkKGdhbWVJZClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IEFjdGl2ZUdhbWVGYWN0b3J5LnJlZmlsbE15SGFuZChnYW1lSWQsIHBsYXllcklkLCB0ZWFtSWQpKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5nYW1lLnBsYXllcnNbcGxheWVySWRdKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwbGF5ZXJIYW5kJywgJHNjb3BlLnBsYXllckhhbmQpXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRldmFsQXN5bmMoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICB9XG5cbiAgICAkc2NvcGUub25Eb3VibGVUYXAgPSAoY2FyZElkKSA9PiB7XG4gICAgICAgIEFjdGl2ZUdhbWVGYWN0b3J5LnN1Ym1pdFdoaXRlQ2FyZChwbGF5ZXJJZCwgY2FyZElkLCBnYW1lSWQsIHRlYW1JZClcbiAgICB9XG5cbn0pXG5cblxuLy8gYXBwLmNvbnRyb2xsZXIoXCJBY3RpdmVHYW1lQ3RybFwiLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgQWN0aXZlR2FtZUZhY3RvcnksIGdhbWUsICRzdGF0ZVBhcmFtcywgJGxvY2FsU3RvcmFnZSwgJHN0YXRlKSA9PiB7XG5cblxuLy8gICAgICRzY29wZS5vblN3aXBlRG93biA9ICgpID0+IHtcbi8vICAgICAgICAgY29uc29sZS5sb2coJ3dvcmtpbmcnKTtcbi8vICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnNob3dDYXJkcyk7XG4vLyAgICAgICAgICRzY29wZS5zaG93Q2FyZHMgPSB0cnVlIDtcbi8vICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnNob3dDYXJkcyk7XG4vLyAgICAgICAgICRzY29wZS4kZXZhbEFzeW5jKCk7XG4vLyAgICAgfVxuXG4vLyAgICAgJHNjb3BlLm9uU3dpcGVVcCA9ICgpID0+IHtcbi8vICAgICAgICAgY29uc29sZS5sb2coXCJzd2lwZWQgdXBcIik7XG4vLyAgICAgfVxuXG4vLyAgICAgJHNjb3BlLm9uRG91YmxlVGFwID0gKGtleSkgPT4ge1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhcImRvdWJsZSB0YXBwZWRcIilcbi8vICAgICAgICAgJHNjb3BlLnBsYXllZCA9IHRydWU7XG4vLyAgICAgICAgIC8vY2FsbCBzdWJtaXQgY2FyZCBmdW5jdGlvbiBoZXJlLlxuLy8gICAgIH1cblxuLy8gICAgIEFjdGl2ZUdhbWVGYWN0b3J5LnJlZmlsbE15SGFuZCgkc2NvcGUuZ2FtZUlkLCAkc2NvcGUucGxheWVySWQsICRzY29wZS50ZWFtSWQpO1xuXG4vLyAgICAgJHNjb3BlLiRvbignY2hhbmdlZEdhbWUnLCAoZXZlbnQsc25hcHNob3QpID0+e1xuLy8gICAgICAgICAkc2NvcGUuZ2FtZSA9IHNuYXBzaG90O1xuLy8gICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuZ2FtZSk7XG4vLyAgICAgICAgIGlmKGdhbWUuc3RhdGUgPT09ICdzdWJtaXNzaW9uJyl7XG4vLyAgICAgICAgICAgICAkc3RhdGUuZ28oJ2dhbWUuc3VibWlzc2lvbi1nYW1lJylcbi8vICAgICAgICAgfSBcbi8vICAgICB9KVxuLy8gfSlcblxuIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikgPT4ge1xuXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ25ldy1nYW1lJywge1xuICAgICAgICB1cmw6ICcvbmV3LWdhbWUnLFxuICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9tYWluLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnTmV3R2FtZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICB0ZWFtRGVja3M6IChHYW1lRmFjdG9yeSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdOYXZpZ2F0aW5nIHRvIHN0YXRlIG9yIHRyeWluZyB0byBoZWxsbycpXG4gICAgICAgICAgICAgICAgcmV0dXJuIEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0YW5kYXJkRGVjazogKEdhbWVGYWN0b3J5KSA9PiBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkKDEpXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5tYWluJywge1xuICAgICAgICB1cmw6ICcvc2V0dXAtZ2FtZScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvbmV3LWdhbWUuaHRtbCcsXG4gICAgfSlcblxuICAgIC5zdGF0ZSgnbmV3LWdhbWUuYWRkLWRlY2tzJywge1xuICAgICAgICB1cmw6ICcvYWRkLWRlY2tzJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9hZGQtZGVja3MuaHRtbCcsXG4gICAgfSlcblxuICAgIC5zdGF0ZSgnbmV3LWdhbWUuZGVjaycsIHtcbiAgICAgICAgdXJsOiAnL2RlY2svOmRlY2tJZCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvZGVjay5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0RlY2tDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgY2FyZHM6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXRDYXJkc0J5RGVja0lkKCRzdGF0ZVBhcmFtcy5kZWNrSWQpXG4gICAgICAgIH1cblxuXG4gICAgfSlcblxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9uZXctZ2FtZS9zZXR1cC1nYW1lJyk7XG59KVxuXG5hcHAuY29udHJvbGxlcignTmV3R2FtZUN0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgJHN0YXRlLCB0ZWFtRGVja3MsIHN0YW5kYXJkRGVjaykgPT4ge1xuICAgICRzY29wZS5jdXJyZW50VmlldyA9ICdhZGREZWNrcydcbiAgICAkc2NvcGUuZ2FtZUNvbmZpZyA9IHt9O1xuICAgICRzY29wZS5nYW1lQ29uZmlnLmRlY2tzID0ge307XG4gICAgJHNjb3BlLmdvVG9EZWNrcyA9ICgpID0+IHtcbiAgICAgICAgJHN0YXRlLmdvKCduZXctZ2FtZS5hZGQtZGVja3MnLCB7fSwgeyBsb2NhdGlvbjogdHJ1ZSwgcmVsb2FkOiB0cnVlIH0pXG4gICAgfVxuXG4gICAgJHNjb3BlLmRlY2tzID0gc3RhbmRhcmREZWNrLmNvbmNhdCh0ZWFtRGVja3MpO1xuXG4gICAgJHNjb3BlLnN0YXJ0TmV3R2FtZSA9IChnYW1lQ29uZmlnKSA9PiB7XG4gICAgICAgIHJldHVybiBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWUoZ2FtZUNvbmZpZylcbiAgICAgICAgICAgIC50aGVuKChpZCkgPT4gR2FtZUZhY3RvcnkuYWRkUGlsZVRvR2FtZShpZCwgJHNjb3BlLmdhbWVDb25maWcuZGVja3MpKVxuICAgICAgICAgICAgLnRoZW4oKGlkKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2ltIGhlcmUnKVxuICAgICAgICAgICAgICAgICRzdGF0ZS5nbygnZ2FtZScsIHsgZ2FtZUlkOiBpZCB9KVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuICAgICRzY29wZS5hZGREZWNrc1RvR2FtZSA9IEdhbWVGYWN0b3J5LmFkZERlY2tzO1xuICAgIC8vICRzY29wZS4kb24oJ2NoYW5nZWRHYW1lJywgKGV2ZW50LCBkYXRhKSA9PiB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdyZWNlaXZlZCBldmVudCcpXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdkYXRhIG9iajonLCBkYXRhKVxuICAgIC8vICAgICAkc2NvcGUuZ2FtZSA9IGRhdGE7XG4gICAgLy8gICAgICRzY29wZS4kZGlnZXN0KClcblxuICAgIC8vIH0pXG5cblxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0RlY2tDdHJsJywgKCRzY29wZSwgR2FtZUZhY3RvcnksICRzdGF0ZSwgY2FyZHMpID0+IHtcbiAgICAkc2NvcGUuY2FyZHMgPSBjYXJkc1xufSlcblxuIiwiLy9EaXJlY3RpdmUgRmlsZSIsImFwcC5kaXJlY3RpdmUoJ3doaXRlQ2FyZHMnLCBmdW5jdGlvbigpe1xuXG5cdHJldHVybiB7XG5cblx0XHRyZXN0cmljdDogJ0UnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvY29tbW9uL2RpcmVjdGl2ZXMvd2hpdGUtY2FyZHMuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0dhbWVDdHJsJ1xuXHR9XG59KSIsImFwcC5mYWN0b3J5KCdBY3RpdmVHYW1lRmFjdG9yeScsICgkaHR0cCwgJHJvb3RTY29wZSwgJGxvY2FsU3RvcmFnZSkgPT4ge1xuXG4gICAgY29uc3QgQWN0aXZlR2FtZUZhY3RvcnkgPSB7fTtcblxuICAgIGNvbnN0IHJlZmlsbGVyID0gKGNhcmRzTmVlZGVkLCBwaWxlUmVmLCBoYW5kUmVmKSA9PiB7XG4gICAgICAgIHJldHVybiBwaWxlUmVmLmxpbWl0VG9GaXJzdChjYXJkc05lZWRlZCkub25jZSgndmFsdWUnLCBjYXJkc1NuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICBjYXJkc1NuYXBzaG90LmZvckVhY2goY2FyZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB1cGRhdGVPYmogPSB7fVxuICAgICAgICAgICAgICAgICAgICBjYXJkLnJlZi50cmFuc2FjdGlvbihjYXJkRGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlT2JqW2NhcmQua2V5XSA9IGNhcmREYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBoYW5kUmVmLnVwZGF0ZSh1cGRhdGVPYmopKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgIH1cblxuICAgIEFjdGl2ZUdhbWVGYWN0b3J5LnJlZmlsbE15SGFuZCA9IChnYW1lSWQsIHBsYXllcklkLCB0ZWFtSWQpID0+IHtcbiAgICAgICAgLy8gaG93IG1hbnkgY2FyZHMgZG8gSSBuZWVkP1xuICAgICAgICBsZXQgY2FyZHNOZWVkZWQgPSAwXG4gICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgIGNvbnN0IGhhbmRSZWYgPSBnYW1lUmVmLmNoaWxkKGBwbGF5ZXJzLyR7cGxheWVySWR9L2hhbmRgKVxuICAgICAgICBjb25zdCBwaWxlUmVmID0gZ2FtZVJlZi5jaGlsZCgncGlsZS93aGl0ZWNhcmRzJylcbiAgICAgICAgcmV0dXJuIGhhbmRSZWYub25jZSgndmFsdWUnLCBoYW5kU25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgIGNhcmRzTmVlZGVkID0gNyAtIGhhbmRTbmFwc2hvdC5udW1DaGlsZHJlbigpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiByZWZpbGxlcihjYXJkc05lZWRlZCwgcGlsZVJlZiwgaGFuZFJlZilcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgY29uc3QgZmlyZWJhc2VNb3ZlU2luZ2xlS2V5VmFsdWUgPSAob2xkUmVmLCBuZXdSZWYpID0+IHtcbiAgICAgICAgbGV0IHJlbW92ZVVwZGF0ZSA9IHt9XG4gICAgICAgIGxldCBuZXdVcGRhdGUgPSB7fVxuICAgICAgICByZXR1cm4gb2xkUmVmLm9uY2UoJ3ZhbHVlJylcbiAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICAgICAgICAgIC50aGVuKHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICByZW1vdmVVcGRhdGVbc25hcHNob3Qua2V5XSA9IG51bGxcbiAgICAgICAgICAgICAgICBuZXdVcGRhdGVbc25hcHNob3Qua2V5XSA9IHNuYXBzaG90LnZhbCgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1JlZi51cGRhdGUobmV3VXBkYXRlKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IG9sZFJlZi5wYXJlbnQudXBkYXRlKHJlbW92ZVVwZGF0ZSkpXG4gICAgfVxuXG4gICAgQWN0aXZlR2FtZUZhY3Rvcnkuc3VibWl0V2hpdGVDYXJkID0gKHBsYXllcklkLCBjYXJkSWQsIGdhbWVJZCwgdGVhbUlkKSA9PiB7XG4gICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApO1xuICAgICAgICBjb25zdCBjYXJkVG9TdWJtaXQgPSBnYW1lUmVmLmNoaWxkKGBwbGF5ZXJzLyR7cGxheWVySWR9L2hhbmQvJHtjYXJkSWR9YCk7XG4gICAgICAgIGNvbnN0IHN1Ym1pdFJlZiA9IGdhbWVSZWYuY2hpbGQoJ3N1Ym1pdHRlZFdoaXRlQ2FyZHMnKTtcbiAgICAgICAgZmlyZWJhc2VNb3ZlU2luZ2xlS2V5VmFsdWUoY2FyZFRvU3VibWl0LCBzdWJtaXRSZWYpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coY2FyZFRvU3VibWl0LCBzdWJtaXRSZWYpXG4gICAgICAgICAgICAgICAgc3VibWl0UmVmLmNoaWxkKGNhcmRJZCkuc2V0KHtcbiAgICAgICAgICAgICAgICAgICAgc3VibWl0dGVkQnk6IHBsYXllcklkXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIEFjdGl2ZUdhbWVGYWN0b3J5O1xuXG5cbn0pO1xuXG4iLCJhcHAuZmFjdG9yeSgnR2FtZUZhY3RvcnknLCAoJGh0dHAsICRyb290U2NvcGUsICRsb2NhbFN0b3JhZ2UpID0+IHtcblxuICAgICAgICBjb25zdCBvdXJJcHMgPSB7XG4gICAgICAgICAgICBuaWtpdGE6IFwiMTkyLjE2OC40LjIxM1wiLFxuICAgICAgICAgICAga2F5bGE6IFwiMTkyLjE2OC40LjIyNVwiLFxuICAgICAgICAgICAgbml0aHlhOiBcIjE5Mi4xNjguMS40OFwiLFxuICAgICAgICAgICAgZGFuOiBcIjE5Mi4xNjguNC4yMzZcIlxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGN1cnJlbnRJcCA9IG91cklwcy5kYW5cblxuXG4gICAgICAgIC8vIHN0YXJ0IGEgbmV3IGdhbWUgZGVycFxuICAgICAgICBjb25zdCBHYW1lRmFjdG9yeSA9IHt9O1xuICAgICAgICBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWUgPSAoZ2FtZUNvbmZpZykgPT4ge1xuICAgICAgICAgICAgLy9jYW4gYWxzbyBnZXQgYWxsIHRoZSBkZWNrcyBieSB0ZWFtIGhlcmUgdG8gcHJlcGFyZVxuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gJGxvY2FsU3RvcmFnZS50ZWFtLmlkIHx8IDI7XG4gICAgICAgICAgICBjb25zdCBjcmVhdG9ySWQgPSAkbG9jYWxTdG9yYWdlLnVzZXIuaWQgfHwgMztcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzYCwge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBnYW1lQ29uZmlnLm5hbWUgfHwgJ0FXRVNPTUUgTmFtZScsXG4gICAgICAgICAgICAgICAgICAgIHRlYW1JZDogdGVhbUlkLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdG9ySWQ6IGNyZWF0b3JJZCxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvck5hbWU6ICRsb2NhbFN0b3JhZ2UudXNlci5uYW1lIHx8ICdkYW4nLCAvL21pZ2h0IGJlIHVubmVjZXNzYXJ5IGlmIHdlIGhhdmUgdGhlIHVzZXIgaWRcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IGdhbWVDb25maWdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdhbWVJZCA9IHJlcy5kYXRhXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgL3RlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAgICAgICAgICAgICBnYW1lUmVmLm9uKCd2YWx1ZScsIHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnY2hhbmdlZEdhbWUnLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnYW1lSWQ7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcbiAgICAgICAgLy8gZ2V0IGFsbCBvZiBhIGRlY2tzIGNhcmRzIHRvIGRpc3BsYXkgd2hlbiBsb29raW5nIGF0IGRlY2tzXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldENhcmRzQnlEZWNrSWQgPSAoaWQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZGVja3MvJHtpZH0vY2FyZHNgKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gVE9ETzogY29tYmluZSB0aGlzIGludG8gdGhlIGFib3ZlIHN0YXJ0TmV3R2FtZSBmdW5jXG4gICAgICAgIC8vIHRha2UgYWxsIG9mIHRoZSBzZWxlY3RlZCBkZWNrcycgY2FyZHMgYW5kIHB1dCB0aGVtIGluIHRoZSBmaXJlYmFzZSBnYW1lIG9iamVjdCBwaWxlICh0aHJvdWdoIHJvdXRlKVxuICAgICAgICBHYW1lRmFjdG9yeS5hZGRQaWxlVG9HYW1lID0gKGdhbWVJZCwgZGVja3MpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRkaW5nIHBpbGUgdG8gZ2FtZVwiKVxuICAgICAgICAgICAgY29uc3QgZGVja3NBcnIgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGRlY2tJZCBpbiBkZWNrcykge1xuICAgICAgICAgICAgICAgIGRlY2tzQXJyLnB1c2goZGVja0lkKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZ2FtZXMvJHtnYW1lSWR9L2RlY2tzYCwge1xuICAgICAgICAgICAgICAgICAgICAnZGVja3MnOiBkZWNrc0FyclxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gZ2FtZUlkKVxuICAgICAgICB9XG5cbiAgICAgICAgR2FtZUZhY3Rvcnkuam9pbkdhbWVCeUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gJGxvY2FsU3RvcmFnZS50ZWFtLmlkO1xuICAgICAgICAgICAgY29uc3QgcGxheWVySWQgPSAkbG9jYWxTdG9yYWdlLnVzZXIuaWQ7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJOYW1lID0gJGxvY2FsU3RvcmFnZS51c2VyLm5hbWU7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KCRsb2NhbFN0b3JhZ2UpKTtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllclJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9L3BsYXllcnMvJHtwbGF5ZXJJZH1gKVxuICAgICAgICAgICAgcGxheWVyUmVmLnNldCh7XG4gICAgICAgICAgICAgICAgbmFtZTogcGxheWVyTmFtZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzLyR7Z2FtZUlkfS8/cGxheWVySWQ9JHtwbGF5ZXJJZH1gKVxuICAgICAgICB9XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCA9IChpZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gKHR5cGVvZiBpZCAhPT0gJ251bWJlcicpID8gJGxvY2FsU3RvcmFnZS50ZWFtLmlkIDogaWQ7IC8vIGlkIHx8IGxvY2Fsc3RvcmFnZSBkb2Vzbid0IHdvcmsgYmVjYXVzZSAwIGlzIGZhbHNleVxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9kZWNrcz90ZWFtPSR7dGVhbUlkfWApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuXG4gICAgICAgIH07XG5cblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRVc2Vyc0J5R2FtZUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0vdXNlcnNgKTtcbiAgICAgICAgfTtcblxuXG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZUJ5R2FtZUlkID0gKGdhbWVJZCwgdGVhbUlkKSA9PiB7XG4gICAgICAgICAgICB0ZWFtSWQgPSB0ZWFtSWQgfHwgJGxvY2FsU3RvcmFnZS50ZWFtLmlkXG4gICAgICAgICAgICBjb25zdCBnYW1lc1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICAgIHJldHVybiBnYW1lc1JlZi5vbmNlKCd2YWx1ZScpLnRoZW4oc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBzbmFwc2hvdC52YWwoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCA9ICh0ZWFtSWQpID0+IHtcbiAgICAgICAgICAgIHRlYW1JZCA9IHRlYW1JZCB8fCAkbG9jYWxTdG9yYWdlLnRlYW0uaWRcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGUgdGVhbSBpZCBpczonLCB0ZWFtSWQpXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzLz90ZWFtSWQ9JHt0ZWFtSWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldE9wZW5HYW1lcyA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRlYW1JZCA9ICRsb2NhbFN0b3JhZ2UudGVhbS5pZDtcbiAgICAgICAgICAgIGNvbnN0IHVzZXJJZCA9ICRsb2NhbFN0b3JhZ2UudXNlci5pZFxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3J1bm5pbmcgZ2V0T3BlbkdhbWVzJylcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZ2FtZXMvP3RlYW1JZD0ke3RlYW1JZH0mdXNlcklkPSR7dXNlcklkfSZvcGVuPXRydWVgKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoaXR0aW5nIGdldE9wZW5HYW1lcycpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuZGF0YVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICB9XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVVzZXIgPSAodXNlcklkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzLz91c2VySWQ9JHt1c2VySWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBHYW1lRmFjdG9yeTtcbiAgICB9XG5cbik7XG5cbiIsImFwcC5mYWN0b3J5KCdVc2VyRmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwLCAkbG9jYWxTdG9yYWdlKSB7XG4gICAgY29uc3Qgb3VySXBzID0ge1xuICAgICAgICBuaWtpdGE6IFwiMTkyLjE2OC40LjIxM1wiLFxuICAgICAgICBrYXlsYTogXCIxOTIuMTY4LjQuMjI1XCIsXG4gICAgICAgIG5pdGh5YTogXCIxOTIuMTY4LjEuNDhcIixcbiAgICAgICAgZGFuOiBcIjE5Mi4xNjguNC4yMzZcIlxuICAgIH1cblxuICAgIGNvbnN0IGN1cnJlbnRJcCA9IG91cklwcy5kYW5cbiAgICByZXR1cm4ge1xuICAgICAgICBzZXRVc2VyOiBmdW5jdGlvbihpbmZvKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS91c2Vyc2AsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogaW5mb1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRMb2NhbFN0b3JhZ2UocmVzLmRhdGEudXNlclswXSwgcmVzLmRhdGEudGVhbVswXSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0U2xhY2tDcmVkczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL3NsYWNrYClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmRhdGFcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBnZXRTbGFja0luZm86IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnaHR0cHM6Ly9zbGFjay5jb20vYXBpL3VzZXJzLmlkZW50aXR5JylcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRMb2NhbFN0b3JhZ2U6IGZ1bmN0aW9uKHVzZXIsIHRlYW0pIHtcbiAgICAgICAgICAgICRsb2NhbFN0b3JhZ2UudXNlciA9IHVzZXI7XG4gICAgICAgICAgICAkbG9jYWxTdG9yYWdlLnRlYW0gPSB0ZWFtO1xuICAgICAgICB9LFxuXG4gICAgICAgIGxvZ091dDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkbG9jYWxTdG9yYWdlLiRyZXNldCgpO1xuICAgICAgICB9XG4gICAgfVxufSlcblxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
