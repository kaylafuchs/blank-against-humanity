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

    $scope.joinGame = GameFactory.joinGameById;

    $scope.showPopup = function (gameId) {

        $scope.game = $scope.games[gameId];
        $scope.gameName = $scope.game.settings.name;
        $scope.playerCount = Object.keys($scope.game.players).length;
        $scope.waitingForPlayers = ($scope.game.settings.minPlayers || 4) - $scope.playerCount;

        var myPopup = $ionicPopup.show({
            templateUrl: 'js/home/popup.html',
            title: 'Join ' + $scope.gameName,
            scope: $scope,
            buttons: [{ text: 'Go back' }, {
                text: 'Join game',
                type: 'button-balanced',
                onTap: function onTap(e) {
                    $scope.joinGame(gameId);
                    $state.go('game.active-game', { gameId: gameId });
                }
            }]
        });
    };
});

app.config(function ($stateProvider) {

    $stateProvider.state('game', {
        url: '/game/:gameId',
        abstract: true,
        templateUrl: 'js/game/game.html',
        controller: 'GameCtrl',
        resolve: {
            game: function game(GameFactory, $stateParams) {
                return GameFactory.getGameByGameId($stateParams.gameId);
            }
        }
    }).state('game.active-game', {
        url: '/active-game',
        templateUrl: 'js/game/active-game.html',
        controller: 'ActiveGameCtrl'
    }).state('game.submission-game', {
        url: '/submission-game',
        templateUrl: 'js/game/submission-game.html',
        controller: 'SubmissionGameCtrl'
    });
});

app.controller('GameCtrl', function ($scope, GameFactory, $stateParams, $localStorage, game) {
    var gameId = $stateParams.gameId;
    var playerId = $localStorage.user.id;
    console.log("player id", playerId);
    var teamId = $localStorage.team.id;
    $scope.game = game;
    $scope.gameName = $scope.game.settings.name;
    console.log("active state game", $scope.game);
    $scope.judge = $scope.game.players[$scope.game.currentJudge];
    console.log("the judge is", $scope.judge);
    $scope.blackCard = $scope.game.currentBlackCard;
    $scope.blackCardText = $scope.blackCard[Object.keys($scope.blackCard)[0]].text;
    console.log("the black card is", $scope.blackCardText);
    //this should be uncommented in final versions
    $scope.whiteCards = $scope.game.pile.whitecards;
    var slicer = Math.floor(Math.random() * $scope.whiteCards.length - 7);
    // $scope.playerHand = $scope.whiteCards.slice(slicer, slicer + 8)
    $scope.playerHand = $scope.game.players[playerId].hand;
    console.log('players hand', $scope.playerHand);

    //temporary implementation for design purposes.
    // $scope.game.whiteCards = $scope.game.pile.whitecards
    $scope.showCards = false;

    //$scope.playerHand = $scope.game.players[playerId].hand;
    //(console.log("player hand", $scope.hand))

    $scope.playerCount = Object.keys($scope.game.players).length;
});

app.controller("ActiveGameCtrl", function ($scope, GameFactory, ActiveGameFactory, game, $stateParams, $localStorage, $state) {

    $scope.onSwipeDown = function () {
        console.log('working');
        console.log($scope.showCards);
        $scope.showCards = true;
        console.log($scope.showCards);
        $scope.$evalAsync();
    };

    $scope.onSwipeUp = function () {
        console.log("swiped up");
    };

    $scope.onDoubleTap = function (key) {
        console.log("double tapped");
        $scope.played = true;
        //call submit card function here.
    };

    ActiveGameFactory.refillMyHand($scope.gameId, $scope.playerId, $scope.teamId);

    $scope.$on('changedGame', function (event, snapshot) {
        $scope.game = snapshot;
        console.log('changedGame event listener', $scope.game.blackcards);
        if (game.state === 'submission') {
            $state.go('game.submission-game');
        }
    });
});

app.controller('SubmissionGameCtrl', function ($scope, $localStorage) {
    $scope.$on('changedGame', function (event, snapshot) {
        $scope.game = snapshot;
    });

    $scope.judge = $scope.game.players[$scope.game.currentJudge].name;
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

    ActiveGameFactory.submitWhiteCard = function (playerId, cardId, gameId, teamId) {
        var gameRef = firebase.database().ref('teams/' + teamId + '/games/' + gameId);
        var cardToSubmit = gameRef.child('players/' + playerId + '/hand/' + cardId);
        var submitRef = gameRef.child('submittedWhiteCards');
        firebaseMoveSingleKeyValue(cardToSubmit, submitRef).then(function () {
            return submitRef.child(cardId).set({
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
        var playerRef = firebase.database().ref('teams/' + teamId + '/games/' + gameId + '/players/' + playerId);
        playerRef.set({
            name: playerName
        });
        var gameRef = firebase.database().ref('teams/' + teamId + '/games/' + gameId);
        gameRef.on('value', function (snapshot) {
            $rootScope.$broadcast('changedGame', snapshot.val());
        });
        $http.post('http://' + currentIp + ':1337/api/games/' + gameId + '?playerId=' + playerId);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImNhcmRzLXRlc3QvY2FyZHNUZXN0LmpzIiwiZnJvbSBmc2cvZnJvbS1mc2cuanMiLCJkZWNrcy9kZWNrcy5qcyIsImhvbWUvaG9tZS5qcyIsImdhbWUvZ2FtZS5qcyIsImxvZ2luL2xvZ2luLmpzIiwibmV3LWdhbWUvbmV3LWdhbWUuanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiLCJjb21tb24vZmFjdG9yaWVzL0FjdGl2ZUdhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9HYW1lRmFjdG9yeS5qcyIsImNvbW1vbi9mYWN0b3JpZXMvdXNlckZhY3RvcnkuanMiXSwibmFtZXMiOlsid2luZG93IiwiYXBwIiwiYW5ndWxhciIsIm1vZHVsZSIsInJ1biIsIiRpb25pY1BsYXRmb3JtIiwicmVhZHkiLCJjb3Jkb3ZhIiwicGx1Z2lucyIsIktleWJvYXJkIiwiaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyIiwiZGlzYWJsZVNjcm9sbCIsIlN0YXR1c0JhciIsInN0eWxlTGlnaHRDb250ZW50IiwiJHJvb3RTY29wZSIsIiRvbiIsImNvbnNvbGUiLCJsb2ciLCJKU09OIiwic3RyaW5naWZ5IiwiYXJndW1lbnRzIiwiY29udHJvbGxlciIsIiRzY29wZSIsIlVzZXJGYWN0b3J5IiwiJHN0YXRlIiwiJGxvY2FsU3RvcmFnZSIsIiR0aW1lb3V0IiwibG9nT3V0IiwiZ28iLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsInN0YXRlIiwidXJsIiwidGVtcGxhdGVVcmwiLCJncmVldGluZyIsInJlc29sdmUiLCJkZWNrcyIsIkdhbWVGYWN0b3J5IiwiJHN0YXRlUGFyYW1zIiwiZ2V0RGVja3NCeVRlYW1JZCIsInN0YXRlUGFyYW1zIiwidGVhbUlkIiwiJHVybFJvdXRlclByb3ZpZGVyIiwiZ2FtZXMiLCJnZXRHYW1lc0J5VGVhbUlkIiwiJGNvcmRvdmFPYXV0aCIsIiRpb25pY1BvcHVwIiwic3RhcnROZXdHYW1lIiwic3RvcmFnZSIsImdvVG9OZXdHYW1lIiwiam9pbkdhbWUiLCJqb2luR2FtZUJ5SWQiLCJzaG93UG9wdXAiLCJnYW1lSWQiLCJnYW1lIiwiZ2FtZU5hbWUiLCJzZXR0aW5ncyIsIm5hbWUiLCJwbGF5ZXJDb3VudCIsIk9iamVjdCIsImtleXMiLCJwbGF5ZXJzIiwibGVuZ3RoIiwid2FpdGluZ0ZvclBsYXllcnMiLCJtaW5QbGF5ZXJzIiwibXlQb3B1cCIsInNob3ciLCJ0aXRsZSIsInNjb3BlIiwiYnV0dG9ucyIsInRleHQiLCJ0eXBlIiwib25UYXAiLCJhYnN0cmFjdCIsImdldEdhbWVCeUdhbWVJZCIsInBsYXllcklkIiwidXNlciIsImlkIiwidGVhbSIsImp1ZGdlIiwiY3VycmVudEp1ZGdlIiwiYmxhY2tDYXJkIiwiY3VycmVudEJsYWNrQ2FyZCIsImJsYWNrQ2FyZFRleHQiLCJ3aGl0ZUNhcmRzIiwicGlsZSIsIndoaXRlY2FyZHMiLCJzbGljZXIiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJwbGF5ZXJIYW5kIiwiaGFuZCIsInNob3dDYXJkcyIsIkFjdGl2ZUdhbWVGYWN0b3J5Iiwib25Td2lwZURvd24iLCIkZXZhbEFzeW5jIiwib25Td2lwZVVwIiwib25Eb3VibGVUYXAiLCJrZXkiLCJwbGF5ZWQiLCJyZWZpbGxNeUhhbmQiLCJldmVudCIsInNuYXBzaG90IiwiYmxhY2tjYXJkcyIsIm90aGVyd2lzZSIsIiRpb25pY1NpZGVNZW51RGVsZWdhdGUiLCJsb2dpbldpdGhTbGFjayIsImdldFNsYWNrQ3JlZHMiLCJ0aGVuIiwic2xhY2siLCJjcmVkcyIsImNsaWVudElEIiwiY2xpZW50U2VjcmV0Iiwic2V0VXNlciIsImluZm8iLCJjYW5EcmFnQ29udGVudCIsInJlZGlyZWN0VXNlciIsInRlYW1EZWNrcyIsInN0YW5kYXJkRGVjayIsImNhcmRzIiwiZ2V0Q2FyZHNCeURlY2tJZCIsImRlY2tJZCIsImN1cnJlbnRWaWV3IiwiZ2FtZUNvbmZpZyIsImdvVG9EZWNrcyIsImxvY2F0aW9uIiwicmVsb2FkIiwiY29uY2F0IiwiYWRkUGlsZVRvR2FtZSIsImFkZERlY2tzVG9HYW1lIiwiYWRkRGVja3MiLCJmYWN0b3J5IiwiJGh0dHAiLCJyZWZpbGxlciIsImNhcmRzTmVlZGVkIiwicGlsZVJlZiIsImhhbmRSZWYiLCJsaW1pdFRvRmlyc3QiLCJvbmNlIiwiY2FyZHNTbmFwc2hvdCIsImZvckVhY2giLCJ1cGRhdGVPYmoiLCJjYXJkIiwicmVmIiwidHJhbnNhY3Rpb24iLCJjYXJkRGF0YSIsInVwZGF0ZSIsImNhdGNoIiwiZXJyIiwiZ2FtZVJlZiIsImZpcmViYXNlIiwiZGF0YWJhc2UiLCJjaGlsZCIsImhhbmRTbmFwc2hvdCIsIm51bUNoaWxkcmVuIiwic3VibWl0V2hpdGVDYXJkIiwiY2FyZElkIiwiY2FyZFRvU3VibWl0Iiwic3VibWl0UmVmIiwiZmlyZWJhc2VNb3ZlU2luZ2xlS2V5VmFsdWUiLCJzZXQiLCJzdWJtaXR0ZWRCeSIsIm91cklwcyIsIm5pa2l0YSIsImtheWxhIiwibml0aHlhIiwiZGFuIiwiY3VycmVudElwIiwiY3JlYXRvcklkIiwicG9zdCIsImNyZWF0b3JOYW1lIiwicmVzIiwiZGF0YSIsIm9uIiwiJGJyb2FkY2FzdCIsInZhbCIsImdldCIsImRlY2tzQXJyIiwicHVzaCIsInBsYXllck5hbWUiLCJwbGF5ZXJSZWYiLCJnZXRVc2Vyc0J5R2FtZUlkIiwiZ2FtZXNSZWYiLCJnZXRHYW1lc0J5VXNlciIsInVzZXJJZCIsIm1ldGhvZCIsImhlYWRlcnMiLCJzZXRMb2NhbFN0b3JhZ2UiLCJnZXRTbGFja0luZm8iLCIkcmVzZXQiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBQSxPQUFBQyxHQUFBLEdBQUFDLFFBQUFDLE1BQUEsQ0FBQSxzQkFBQSxFQUFBLENBQUEsT0FBQSxFQUFBLFdBQUEsRUFBQSxXQUFBLEVBQUEsZ0JBQUEsRUFBQSxXQUFBLEVBQUEsV0FBQSxDQUFBLENBQUE7O0FBR0FGLElBQUFHLEdBQUEsQ0FBQSxVQUFBQyxjQUFBLEVB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QUFBeEQsTUFBQTRDLEdBQUEsQ0FBQSxzQ0FBQSxDQUFBO0FBQ0EsU0F0QkE7O0FBd0JBVyx5QkFBQSx5QkFBQWhILElBQUEsRUFBQUUsSUFBQSxFQUFBO0FBQ0FyRCwwQkFBQW1ELElBQUEsR0FBQUEsSUFBQTtBQUNBbkQsMEJBQUFxRCxJQUFBLEdBQUFBLElBQUE7QUFDQSxTQTNCQTs7QUE2QkFuRCxnQkFBQSxrQkFBQTtBQUNBRiwwQkFBQXFLLE1BQUE7QUFDQTtBQS9CQSxLQUFBO0FBaUNBLENBMUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJb25pYyBTdGFydGVyIEFwcFxuXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xuLy8gJ3N0YXJ0ZXInIGlzIHRoZSBuYW1lIG9mIHRoaXMgYW5ndWxhciBtb2R1bGUgZXhhbXBsZSAoYWxzbyBzZXQgaW4gYSA8Ym9keT4gYXR0cmlidXRlIGluIGluZGV4Lmh0bWwpXG4vLyB0aGUgMm5kIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiAncmVxdWlyZXMnXG5cbndpbmRvdy5hcHAgPSBhbmd1bGFyLm1vZHVsZSgnQmxhbmtBZ2FpbnN0SHVtYW5pdHknLCBbJ2lvbmljJywgJ3VpLnJvdXRlcicsICduZ0NvcmRvdmEnLCAnbmdDb3Jkb3ZhT2F1dGgnLCAnbmdTdG9yYWdlJywgJ25nQW5pbWF0ZSddKVxuXG5cbmFwcC5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0pIHtcbiAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgICAgICAgIC8vIEhpZGUgdGhlIGFjY2Vzc29yeSBiYXIgYnkgZGVmYXVsdCAocmVtb3ZlIHRoaXMgdG8gc2hvdyB0aGUgYWNjZXNzb3J5IGJhciBhYm92ZSB0aGUga2V5Ym9hcmRcbiAgICAgICAgICAgIC8vIGZvciBmb3JtIGlucHV0cylcbiAgICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG5cbiAgICAgICAgICAgIC8vIERvbid0IHJlbW92ZSB0aGlzIGxpbmUgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZy4gSXQgc3RvcHMgdGhlIHZpZXdwb3J0XG4gICAgICAgICAgICAvLyBmcm9tIHNuYXBwaW5nIHdoZW4gdGV4dCBpbnB1dHMgYXJlIGZvY3VzZWQuIElvbmljIGhhbmRsZXMgdGhpcyBpbnRlcm5hbGx5IGZvclxuICAgICAgICAgICAgLy8gYSBtdWNoIG5pY2VyIGtleWJvYXJkIGV4cGVyaWVuY2UuXG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2luZG93LlN0YXR1c0Jhcikge1xuICAgICAgICAgICAgU3RhdHVzQmFyLnN0eWxlTGlnaHRDb250ZW50KClcbiAgICAgICAgfVxuICAgIH0pO1xuXG59KVxuXG5hcHAucnVuKGZ1bmN0aW9uKCRyb290U2NvcGUpIHtcbiAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlRXJyb3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoYXJndW1lbnRzWzVdKSk7XG4gICAgfSk7XG59KTtcblxuIiwiYXBwLmNvbnRyb2xsZXIoJ0xvZ291dEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIFVzZXJGYWN0b3J5LCAkc3RhdGUsICRsb2NhbFN0b3JhZ2UsICR0aW1lb3V0KXtcblx0JHNjb3BlLmxvZ091dCA9IGZ1bmN0aW9uKCl7XG5cdFx0VXNlckZhY3RvcnkubG9nT3V0KClcblx0XHQkc3RhdGUuZ28oJ2xvZ2luJylcblx0fVxufSkiLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKXtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2NhcmRzJywge1xuXHRcdHVybDogJy9jYXJkcycsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9jYXJkcy10ZXN0L2NhcmRzLXRlc3QuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0NhcmRzVGVzdEN0cmwnXG5cdH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignQ2FyZHNUZXN0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSl7XG4gXHQkc2NvcGUuZ3JlZXRpbmcgPSBcIkhJXCJcbn0pIiwiLy8gKGZ1bmN0aW9uICgpIHtcblxuLy8gICAgICd1c2Ugc3RyaWN0JztcblxuLy8gICAgIC8vIEhvcGUgeW91IGRpZG4ndCBmb3JnZXQgQW5ndWxhciEgRHVoLWRveS5cbi8vICAgICBpZiAoIXdpbmRvdy5hbmd1bGFyKSB0aHJvdyBuZXcgRXJyb3IoJ0kgY2FuXFwndCBmaW5kIEFuZ3VsYXIhJyk7XG5cbi8vICAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2ZzYVByZUJ1aWx0JywgW10pO1xuXG4vLyAgICAgYXBwLmZhY3RvcnkoJ1NvY2tldCcsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgaWYgKCF3aW5kb3cuaW8pIHRocm93IG5ldyBFcnJvcignc29ja2V0LmlvIG5vdCBmb3VuZCEnKTtcbi8vICAgICAgICAgcmV0dXJuIHdpbmRvdy5pbyh3aW5kb3cubG9jYXRpb24ub3JpZ2luKTtcbi8vICAgICB9KTtcblxuLy8gICAgIC8vIEFVVEhfRVZFTlRTIGlzIHVzZWQgdGhyb3VnaG91dCBvdXIgYXBwIHRvXG4vLyAgICAgLy8gYnJvYWRjYXN0IGFuZCBsaXN0ZW4gZnJvbSBhbmQgdG8gdGhlICRyb290U2NvcGVcbi8vICAgICAvLyBmb3IgaW1wb3J0YW50IGV2ZW50cyBhYm91dCBhdXRoZW50aWNhdGlvbiBmbG93LlxuLy8gICAgIGFwcC5jb25zdGFudCgnQVVUSF9FVkVOVFMnLCB7XG4vLyAgICAgICAgIGxvZ2luU3VjY2VzczogJ2F1dGgtbG9naW4tc3VjY2VzcycsXG4vLyAgICAgICAgIGxvZ2luRmFpbGVkOiAnYXV0aC1sb2dpbi1mYWlsZWQnLFxuLy8gICAgICAgICBsb2dvdXRTdWNjZXNzOiAnYXV0aC1sb2dvdXQtc3VjY2VzcycsXG4vLyAgICAgICAgIHNlc3Npb25UaW1lb3V0OiAnYXV0aC1zZXNzaW9uLXRpbWVvdXQnLFxuLy8gICAgICAgICBub3RBdXRoZW50aWNhdGVkOiAnYXV0aC1ub3QtYXV0aGVudGljYXRlZCcsXG4vLyAgICAgICAgIG5vdEF1dGhvcml6ZWQ6ICdhdXRoLW5vdC1hdXRob3JpemVkJ1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLmZhY3RvcnkoJ0F1dGhJbnRlcmNlcHRvcicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkcSwgQVVUSF9FVkVOVFMpIHtcbi8vICAgICAgICAgdmFyIHN0YXR1c0RpY3QgPSB7XG4vLyAgICAgICAgICAgICA0MDE6IEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsXG4vLyAgICAgICAgICAgICA0MDM6IEFVVEhfRVZFTlRTLm5vdEF1dGhvcml6ZWQsXG4vLyAgICAgICAgICAgICA0MTk6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0LFxuLy8gICAgICAgICAgICAgNDQwOiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dFxuLy8gICAgICAgICB9O1xuLy8gICAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAgICAgcmVzcG9uc2VFcnJvcjogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KHN0YXR1c0RpY3RbcmVzcG9uc2Uuc3RhdHVzXSwgcmVzcG9uc2UpO1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzcG9uc2UpXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH07XG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuY29uZmlnKGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XG4vLyAgICAgICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goW1xuLy8gICAgICAgICAgICAgJyRpbmplY3RvcicsXG4vLyAgICAgICAgICAgICBmdW5jdGlvbiAoJGluamVjdG9yKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRpbmplY3Rvci5nZXQoJ0F1dGhJbnRlcmNlcHRvcicpO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICBdKTtcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5zZXJ2aWNlKCdBdXRoU2VydmljZScsIGZ1bmN0aW9uICgkaHR0cCwgU2Vzc2lvbiwgJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMsICRxKSB7XG5cbi8vICAgICAgICAgZnVuY3Rpb24gb25TdWNjZXNzZnVsTG9naW4ocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgIHZhciB1c2VyID0gcmVzcG9uc2UuZGF0YS51c2VyO1xuLy8gICAgICAgICAgICAgU2Vzc2lvbi5jcmVhdGUodXNlcik7XG4vLyAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoQVVUSF9FVkVOVFMubG9naW5TdWNjZXNzKTtcbi8vICAgICAgICAgICAgIHJldHVybiB1c2VyO1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgLy8gVXNlcyB0aGUgc2Vzc2lvbiBmYWN0b3J5IHRvIHNlZSBpZiBhblxuLy8gICAgICAgICAvLyBhdXRoZW50aWNhdGVkIHVzZXIgaXMgY3VycmVudGx5IHJlZ2lzdGVyZWQuXG4vLyAgICAgICAgIHRoaXMuaXNBdXRoZW50aWNhdGVkID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuICEhU2Vzc2lvbi51c2VyO1xuLy8gICAgICAgICB9O1xuXG4gICAgICAgIFxuLy8gICAgICAgICB0aGlzLmlzQWRtaW4gPSBmdW5jdGlvbih1c2VySWQpe1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ3J1bm5pbmcgYWRtaW4gZnVuYycpXG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpXG4vLyAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhLnVzZXIuaXNBZG1pbilcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIHRoaXMuZ2V0TG9nZ2VkSW5Vc2VyID0gZnVuY3Rpb24gKGZyb21TZXJ2ZXIpIHtcblxuLy8gICAgICAgICAgICAgLy8gSWYgYW4gYXV0aGVudGljYXRlZCBzZXNzaW9uIGV4aXN0cywgd2Vcbi8vICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgdXNlciBhdHRhY2hlZCB0byB0aGF0IHNlc3Npb25cbi8vICAgICAgICAgICAgIC8vIHdpdGggYSBwcm9taXNlLiBUaGlzIGVuc3VyZXMgdGhhdCB3ZSBjYW5cbi8vICAgICAgICAgICAgIC8vIGFsd2F5cyBpbnRlcmZhY2Ugd2l0aCB0aGlzIG1ldGhvZCBhc3luY2hyb25vdXNseS5cblxuLy8gICAgICAgICAgICAgLy8gT3B0aW9uYWxseSwgaWYgdHJ1ZSBpcyBnaXZlbiBhcyB0aGUgZnJvbVNlcnZlciBwYXJhbWV0ZXIsXG4vLyAgICAgICAgICAgICAvLyB0aGVuIHRoaXMgY2FjaGVkIHZhbHVlIHdpbGwgbm90IGJlIHVzZWQuXG5cbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlzQXV0aGVudGljYXRlZCgpICYmIGZyb21TZXJ2ZXIgIT09IHRydWUpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbihTZXNzaW9uLnVzZXIpO1xuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICAvLyBNYWtlIHJlcXVlc3QgR0VUIC9zZXNzaW9uLlxuLy8gICAgICAgICAgICAgLy8gSWYgaXQgcmV0dXJucyBhIHVzZXIsIGNhbGwgb25TdWNjZXNzZnVsTG9naW4gd2l0aCB0aGUgcmVzcG9uc2UuXG4vLyAgICAgICAgICAgICAvLyBJZiBpdCByZXR1cm5zIGEgNDAxIHJlc3BvbnNlLCB3ZSBjYXRjaCBpdCBhbmQgaW5zdGVhZCByZXNvbHZlIHRvIG51bGwuXG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbi8vICAgICAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5sb2dpbiA9IGZ1bmN0aW9uIChjcmVkZW50aWFscykge1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9sb2dpbicsIGNyZWRlbnRpYWxzKVxuLy8gICAgICAgICAgICAgICAgIC50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKVxuLy8gICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QoeyBtZXNzYWdlOiAnSW52YWxpZCBsb2dpbiBjcmVkZW50aWFscy4nfSk7XG4vLyAgICAgICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5zaWdudXAgPSBmdW5jdGlvbihjcmVkZW50aWFscyl7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuLy8gICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuLy8gICAgICAgICAgICAgICAgIHVybDogJy9zaWdudXAnLFxuLy8gICAgICAgICAgICAgICAgIGRhdGE6IGNyZWRlbnRpYWxzXG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5kYXRhKVxuLy8gICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKCl7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCh7bWVzc2FnZTogJ1RoYXQgZW1haWwgaXMgYWxyZWFkeSBiZWluZyB1c2VkLid9KTtcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5sb2dvdXQgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvbG9nb3V0JykudGhlbihmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgU2Vzc2lvbi5kZXN0cm95KCk7XG4vLyAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ291dFN1Y2Nlc3MpO1xuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5zZXJ2aWNlKCdTZXNzaW9uJywgZnVuY3Rpb24gKCRyb290U2NvcGUsIEFVVEhfRVZFTlRTKSB7XG5cbi8vICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4vLyAgICAgICAgICRyb290U2NvcGUuJG9uKEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCwgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgc2VsZi5kZXN0cm95KCk7XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XG5cbi8vICAgICAgICAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbiAodXNlcikge1xuLy8gICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgfSk7XG5cbi8vIH0oKSk7XG4iLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlcikgPT4ge1xuXHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnZGVja3MnLCB7XG5cdFx0dXJsOiAnZGVja3MvOnRlYW1pZCcsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9kZWNrcy9kZWNrcy5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnRGVja0N0cmwnLFxuXHRcdHJlc29sdmU6IHtcblx0XHRcdGRlY2tzOiAoR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcykgPT4gR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZChzdGF0ZVBhcmFtcy50ZWFtSWQpXG5cdFx0fVxuXHR9KVxuXG59KVxuXG5hcHAuY29udHJvbGxlcignRGVja0N0cmwnLCAoJHNjb3BlKSA9PiB7XG5cblxuXHRcbn0pIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgIHVybDogJy8nLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2hvbWUvaG9tZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgZ2FtZXM6IGZ1bmN0aW9uKEdhbWVGYWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdIb21lQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCAkY29yZG92YU9hdXRoLCBVc2VyRmFjdG9yeSwgR2FtZUZhY3RvcnksICRsb2NhbFN0b3JhZ2UsIGdhbWVzLCAkaW9uaWNQb3B1cCkge1xuICAgICRzY29wZS5zdGFydE5ld0dhbWUgPSBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWU7XG4gICAgJHNjb3BlLnN0b3JhZ2UgPSAkbG9jYWxTdG9yYWdlO1xuICAgICRzY29wZS5nYW1lcyA9IGdhbWVzO1xuXG4gICAgY29uc29sZS5sb2coXCJnYW1lc1wiLCBKU09OLnN0cmluZ2lmeSgkc2NvcGUuZ2FtZXMpKVxuICAgICRzY29wZS5nb1RvTmV3R2FtZSA9ICgpID0+IHtcbiAgICAgICAgJHN0YXRlLmdvKCduZXctZ2FtZS5tYWluJylcbiAgICB9XG5cblxuICAgICRzY29wZS5qb2luR2FtZSA9IEdhbWVGYWN0b3J5LmpvaW5HYW1lQnlJZDtcblxuICAgICRzY29wZS5zaG93UG9wdXAgPSBmdW5jdGlvbihnYW1lSWQpIHtcblxuICAgICAgICAkc2NvcGUuZ2FtZSA9ICRzY29wZS5nYW1lc1tnYW1lSWRdO1xuICAgICAgICAkc2NvcGUuZ2FtZU5hbWUgPSAkc2NvcGUuZ2FtZS5zZXR0aW5ncy5uYW1lO1xuICAgICAgICAkc2NvcGUucGxheWVyQ291bnQgPSBPYmplY3Qua2V5cygkc2NvcGUuZ2FtZS5wbGF5ZXJzKS5sZW5ndGg7XG4gICAgICAgICRzY29wZS53YWl0aW5nRm9yUGxheWVycyA9ICAoJHNjb3BlLmdhbWUuc2V0dGluZ3MubWluUGxheWVycyB8fCA0KSAtICRzY29wZS5wbGF5ZXJDb3VudDtcbiAgICAgICAgIFxuICAgICAgICAgY29uc3QgbXlQb3B1cCA9ICRpb25pY1BvcHVwLnNob3coe1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9ob21lL3BvcHVwLmh0bWwnLFxuICAgICAgICAgICAgdGl0bGU6ICdKb2luICcgKyAkc2NvcGUuZ2FtZU5hbWUsXG4gICAgICAgICAgICBzY29wZTogJHNjb3BlLFxuICAgICAgICAgICAgYnV0dG9uczogXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAge3RleHQ6ICdHbyBiYWNrJ30sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnSm9pbiBnYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2J1dHRvbi1iYWxhbmNlZCcsXG4gICAgICAgICAgICAgICAgICAgIG9uVGFwOiBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5qb2luR2FtZShnYW1lSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdnYW1lLmFjdGl2ZS1nYW1lJywgeyBnYW1lSWQ6IGdhbWVJZCB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9KVxuICAgIH1cbn0pXG5cbiIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnZ2FtZScsIHtcbiAgICAgICAgICAgIHVybDogJy9nYW1lLzpnYW1lSWQnLFxuICAgICAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2dhbWUvZ2FtZS5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdHYW1lQ3RybCcsXG4gICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgZ2FtZTogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldEdhbWVCeUdhbWVJZCgkc3RhdGVQYXJhbXMuZ2FtZUlkKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuc3RhdGUoJ2dhbWUuYWN0aXZlLWdhbWUnLCB7XG4gICAgICAgICAgICB1cmw6ICcvYWN0aXZlLWdhbWUnLFxuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL2FjdGl2ZS1nYW1lLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0FjdGl2ZUdhbWVDdHJsJ1xuICAgICAgICB9KVxuICAgICAgICAuc3RhdGUoJ2dhbWUuc3VibWlzc2lvbi1nYW1lJywge1xuICAgICAgICAgICAgdXJsOiAnL3N1Ym1pc3Npb24tZ2FtZScsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2dhbWUvc3VibWlzc2lvbi1nYW1lLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1N1Ym1pc3Npb25HYW1lQ3RybCdcbiAgICAgICAgfSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdHYW1lQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMsICRsb2NhbFN0b3JhZ2UsIGdhbWUpID0+IHtcbiAgICBjb25zdCBnYW1lSWQgPSAkc3RhdGVQYXJhbXMuZ2FtZUlkO1xuICAgIGNvbnN0IHBsYXllcklkID0gJGxvY2FsU3RvcmFnZS51c2VyLmlkO1xuICAgIGNvbnNvbGUubG9nKFwicGxheWVyIGlkXCIsIHBsYXllcklkKVxuICAgIGNvbnN0IHRlYW1JZCA9ICRsb2NhbFN0b3JhZ2UudGVhbS5pZFxuICAgICRzY29wZS5nYW1lID0gZ2FtZTtcbiAgICAkc2NvcGUuZ2FtZU5hbWUgPSAkc2NvcGUuZ2FtZS5zZXR0aW5ncy5uYW1lO1xuICAgIGNvbnNvbGUubG9nKFwiYWN0aXZlIHN0YXRlIGdhbWVcIiwgJHNjb3BlLmdhbWUpO1xuICAgICRzY29wZS5qdWRnZSA9ICRzY29wZS5nYW1lLnBsYXllcnNbJHNjb3BlLmdhbWUuY3VycmVudEp1ZGdlXVxuICAgIGNvbnNvbGUubG9nKFwidGhlIGp1ZGdlIGlzXCIsICRzY29wZS5qdWRnZSlcbiAgICAkc2NvcGUuYmxhY2tDYXJkID0gJHNjb3BlLmdhbWUuY3VycmVudEJsYWNrQ2FyZDtcbiAgICAkc2NvcGUuYmxhY2tDYXJkVGV4dCA9ICRzY29wZS5ibGFja0NhcmRbT2JqZWN0LmtleXMoJHNjb3BlLmJsYWNrQ2FyZClbMF1dLnRleHRcbiAgICBjb25zb2xlLmxvZyhcInRoZSBibGFjayBjYXJkIGlzXCIsICRzY29wZS5ibGFja0NhcmRUZXh0KVxuICAgICAgICAvL3RoaXMgc2hvdWxkIGJlIHVuY29tbWVudGVkIGluIGZpbmFsIHZlcnNpb25zXG4gICAgJHNjb3BlLndoaXRlQ2FyZHMgPSAkc2NvcGUuZ2FtZS5waWxlLndoaXRlY2FyZHM7XG4gICAgdmFyIHNsaWNlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICRzY29wZS53aGl0ZUNhcmRzLmxlbmd0aCAtIDcpXG4gICAgICAgIC8vICRzY29wZS5wbGF5ZXJIYW5kID0gJHNjb3BlLndoaXRlQ2FyZHMuc2xpY2Uoc2xpY2VyLCBzbGljZXIgKyA4KVxuICAgICRzY29wZS5wbGF5ZXJIYW5kID0gJHNjb3BlLmdhbWUucGxheWVyc1twbGF5ZXJJZF0uaGFuZDtcbiAgICBjb25zb2xlLmxvZygncGxheWVycyBoYW5kJywgJHNjb3BlLnBsYXllckhhbmQpXG5cbiAgICAvL3RlbXBvcmFyeSBpbXBsZW1lbnRhdGlvbiBmb3IgZGVzaWduIHB1cnBvc2VzLlxuICAgIC8vICRzY29wZS5nYW1lLndoaXRlQ2FyZHMgPSAkc2NvcGUuZ2FtZS5waWxlLndoaXRlY2FyZHNcbiAgICAkc2NvcGUuc2hvd0NhcmRzID0gZmFsc2U7XG5cbiAgICAvLyRzY29wZS5wbGF5ZXJIYW5kID0gJHNjb3BlLmdhbWUucGxheWVyc1twbGF5ZXJJZF0uaGFuZDtcbiAgICAvLyhjb25zb2xlLmxvZyhcInBsYXllciBoYW5kXCIsICRzY29wZS5oYW5kKSlcblxuICAgICRzY29wZS5wbGF5ZXJDb3VudCA9IE9iamVjdC5rZXlzKCRzY29wZS5nYW1lLnBsYXllcnMpLmxlbmd0aDtcbn0pXG5cblxuYXBwLmNvbnRyb2xsZXIoXCJBY3RpdmVHYW1lQ3RybFwiLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgQWN0aXZlR2FtZUZhY3RvcnksIGdhbWUsICRzdGF0ZVBhcmFtcywgJGxvY2FsU3RvcmFnZSwgJHN0YXRlKSA9PiB7XG5cblxuICAgICRzY29wZS5vblN3aXBlRG93biA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3dvcmtpbmcnKTtcbiAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLnNob3dDYXJkcyk7XG4gICAgICAgICRzY29wZS5zaG93Q2FyZHMgPSB0cnVlO1xuICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuc2hvd0NhcmRzKTtcbiAgICAgICAgJHNjb3BlLiRldmFsQXN5bmMoKTtcbiAgICB9XG5cbiAgICAkc2NvcGUub25Td2lwZVVwID0gKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcInN3aXBlZCB1cFwiKTtcbiAgICB9XG5cbiAgICAkc2NvcGUub25Eb3VibGVUYXAgPSAoa2V5KSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiZG91YmxlIHRhcHBlZFwiKVxuICAgICAgICAkc2NvcGUucGxheWVkID0gdHJ1ZTtcbiAgICAgICAgLy9jYWxsIHN1Ym1pdCBjYXJkIGZ1bmN0aW9uIGhlcmUuXG4gICAgfVxuXG4gICAgQWN0aXZlR2FtZUZhY3RvcnkucmVmaWxsTXlIYW5kKCRzY29wZS5nYW1lSWQsICRzY29wZS5wbGF5ZXJJZCwgJHNjb3BlLnRlYW1JZCk7XG5cbiAgICAkc2NvcGUuJG9uKCdjaGFuZ2VkR2FtZScsIChldmVudCwgc25hcHNob3QpID0+IHtcbiAgICAgICAgJHNjb3BlLmdhbWUgPSBzbmFwc2hvdDtcbiAgICAgICAgY29uc29sZS5sb2coJ2NoYW5nZWRHYW1lIGV2ZW50IGxpc3RlbmVyJywgJHNjb3BlLmdhbWUuYmxhY2tjYXJkcyk7XG4gICAgICAgIGlmIChnYW1lLnN0YXRlID09PSAnc3VibWlzc2lvbicpIHtcbiAgICAgICAgICAgICRzdGF0ZS5nbygnZ2FtZS5zdWJtaXNzaW9uLWdhbWUnKVxuICAgICAgICB9XG4gICAgfSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdTdWJtaXNzaW9uR2FtZUN0cmwnLCAoJHNjb3BlLCAkbG9jYWxTdG9yYWdlKSA9PiB7XG4gICAgJHNjb3BlLiRvbignY2hhbmdlZEdhbWUnLCAoZXZlbnQsIHNuYXBzaG90KSA9PiB7XG4gICAgICAgICRzY29wZS5nYW1lID0gc25hcHNob3Q7XG4gICAgfSlcblxuICAgICRzY29wZS5qdWRnZSA9ICRzY29wZS5nYW1lLnBsYXllcnNbJHNjb3BlLmdhbWUuY3VycmVudEp1ZGdlXS5uYW1lXG59KVxuXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbG9naW4nLCB7XG4gICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbG9naW4vbG9naW4uaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdMb2dpbkN0cmwnXG4gICAgfSlcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvbG9naW4nKTtcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdMb2dpbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSwgVXNlckZhY3RvcnksICRjb3Jkb3ZhT2F1dGgsICRsb2NhbFN0b3JhZ2UsICR0aW1lb3V0LCAkaW9uaWNTaWRlTWVudURlbGVnYXRlKSB7XG4gICAgJHNjb3BlLmxvZ2luV2l0aFNsYWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBVc2VyRmFjdG9yeS5nZXRTbGFja0NyZWRzKClcbiAgICAgICAgICAgIC50aGVuKGNyZWRzID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGNvcmRvdmFPYXV0aC5zbGFjayhjcmVkcy5jbGllbnRJRCwgY3JlZHMuY2xpZW50U2VjcmV0LCBbJ2lkZW50aXR5LmJhc2ljJywgJ2lkZW50aXR5LnRlYW0nLCAnaWRlbnRpdHkuYXZhdGFyJ10pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oaW5mbyA9PiBVc2VyRmFjdG9yeS5zZXRVc2VyKGluZm8pKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4gJHN0YXRlLmdvKCdob21lJykpXG4gICAgfVxuXG4gICAgJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZS5jYW5EcmFnQ29udGVudChmYWxzZSk7XG5cbiAgICAkc2NvcGUuJG9uKCckaW9uaWNWaWV3LmxlYXZlJywgZnVuY3Rpb24oKSB7ICRpb25pY1NpZGVNZW51RGVsZWdhdGUuY2FuRHJhZ0NvbnRlbnQodHJ1ZSkgfSk7XG5cbiAgICAkc2NvcGUuc3RvcmFnZSA9ICRsb2NhbFN0b3JhZ2VcblxuICAgIGZ1bmN0aW9uIHJlZGlyZWN0VXNlcigpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJzY29wZSBzdG9yYWdlIHVzZXJcIiwgJHNjb3BlLnN0b3JhZ2UudXNlcilcbiAgICAgICAgaWYgKCRzY29wZS5zdG9yYWdlLnVzZXIpICRzdGF0ZS5nbygnaG9tZScpXG4gICAgfVxuXG4gICAgcmVkaXJlY3RVc2VyKCk7XG59KVxuXG4iLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSA9PiB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbmV3LWdhbWUnLCB7XG4gICAgICAgIHVybDogJy9uZXctZ2FtZScsXG4gICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL21haW4uaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdOZXdHYW1lQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIHRlYW1EZWNrczogKEdhbWVGYWN0b3J5KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ05hdmlnYXRpbmcgdG8gc3RhdGUgb3IgdHJ5aW5nIHRvIGhlbGxvJylcbiAgICAgICAgICAgICAgICByZXR1cm4gR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RhbmRhcmREZWNrOiAoR2FtZUZhY3RvcnkpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoMSlcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ25ldy1nYW1lLm1haW4nLCB7XG4gICAgICAgIHVybDogJy9zZXR1cC1nYW1lJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9uZXctZ2FtZS5odG1sJyxcbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5hZGQtZGVja3MnLCB7XG4gICAgICAgIHVybDogJy9hZGQtZGVja3MnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL2FkZC1kZWNrcy5odG1sJyxcbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5kZWNrJywge1xuICAgICAgICB1cmw6ICcvZGVjay86ZGVja0lkJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9kZWNrLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnRGVja0N0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBjYXJkczogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldENhcmRzQnlEZWNrSWQoJHN0YXRlUGFyYW1zLmRlY2tJZClcbiAgICAgICAgfVxuXG5cbiAgICB9KVxuXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL25ldy1nYW1lL3NldHVwLWdhbWUnKTtcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdOZXdHYW1lQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkc3RhdGUsIHRlYW1EZWNrcywgc3RhbmRhcmREZWNrKSA9PiB7XG4gICAgJHNjb3BlLmN1cnJlbnRWaWV3ID0gJ2FkZERlY2tzJ1xuICAgICRzY29wZS5nYW1lQ29uZmlnID0ge307XG4gICAgJHNjb3BlLmdhbWVDb25maWcuZGVja3MgPSB7fTtcbiAgICAkc2NvcGUuZ29Ub0RlY2tzID0gKCkgPT4ge1xuICAgICAgICAkc3RhdGUuZ28oJ25ldy1nYW1lLmFkZC1kZWNrcycsIHt9LCB7IGxvY2F0aW9uOiB0cnVlLCByZWxvYWQ6IHRydWUgfSlcbiAgICB9XG5cbiAgICAkc2NvcGUuZGVja3MgPSBzdGFuZGFyZERlY2suY29uY2F0KHRlYW1EZWNrcyk7XG5cbiAgICAkc2NvcGUuc3RhcnROZXdHYW1lID0gKGdhbWVDb25maWcpID0+IHtcbiAgICAgICAgcmV0dXJuIEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZShnYW1lQ29uZmlnKVxuICAgICAgICAgICAgLnRoZW4oKGlkKSA9PiBHYW1lRmFjdG9yeS5hZGRQaWxlVG9HYW1lKGlkLCAkc2NvcGUuZ2FtZUNvbmZpZy5kZWNrcykpXG4gICAgICAgICAgICAudGhlbigoaWQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaW0gaGVyZScpXG4gICAgICAgICAgICAgICAgJHN0YXRlLmdvKCdnYW1lLmFjdGl2ZS1nYW1lJywgeyBnYW1lSWQ6IGlkIH0pXG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgJHNjb3BlLmFkZERlY2tzVG9HYW1lID0gR2FtZUZhY3RvcnkuYWRkRGVja3M7XG4gICAgLy8gJHNjb3BlLiRvbignY2hhbmdlZEdhbWUnLCAoZXZlbnQsIGRhdGEpID0+IHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ3JlY2VpdmVkIGV2ZW50JylcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ2RhdGEgb2JqOicsIGRhdGEpXG4gICAgLy8gICAgICRzY29wZS5nYW1lID0gZGF0YTtcbiAgICAvLyAgICAgJHNjb3BlLiRkaWdlc3QoKVxuXG4gICAgLy8gfSlcblxuXG59KVxuXG5hcHAuY29udHJvbGxlcignRGVja0N0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgJHN0YXRlLCBjYXJkcykgPT4ge1xuICAgICRzY29wZS5jYXJkcyA9IGNhcmRzXG59KVxuXG4iLCIvL0RpcmVjdGl2ZSBGaWxlIiwiYXBwLmZhY3RvcnkoJ0FjdGl2ZUdhbWVGYWN0b3J5JywgKCRodHRwLCAkcm9vdFNjb3BlLCAkbG9jYWxTdG9yYWdlKSA9PiB7XG5cbiAgICAgICAgY29uc3QgQWN0aXZlR2FtZUZhY3RvcnkgPSB7fTtcblxuICAgICAgICBjb25zdCByZWZpbGxlciA9IChjYXJkc05lZWRlZCwgcGlsZVJlZiwgaGFuZFJlZikgPT4ge1xuICAgICAgICAgIHBpbGVSZWYubGltaXRUb0ZpcnN0KGNhcmRzTmVlZGVkKS5vbmNlKCd2YWx1ZScsIGNhcmRzU25hcHNob3QgPT4ge1xuICAgICAgICAgICAgY2FyZHNTbmFwc2hvdC5mb3JFYWNoKGNhcmQgPT4ge1xuICAgICAgICAgICAgICBsZXQgdXBkYXRlT2JqID0ge31cbiAgICAgICAgICAgICAgY2FyZC5yZWYudHJhbnNhY3Rpb24oY2FyZERhdGEgPT4ge1xuICAgICAgICAgICAgICAgICAgdXBkYXRlT2JqW2NhcmQua2V5XSA9IGNhcmREYXRhXG4gICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gaGFuZFJlZi51cGRhdGUodXBkYXRlT2JqKSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuICAgICAgICB9XG5cbiAgICAgICAgQWN0aXZlR2FtZUZhY3RvcnkucmVmaWxsTXlIYW5kID0gKGdhbWVJZCwgcGxheWVySWQsIHRlYW1JZCkgPT4ge1xuICAgICAgICAgIC8vIGhvdyBtYW55IGNhcmRzIGRvIEkgbmVlZD9cbiAgICAgICAgICBsZXQgY2FyZHNOZWVkZWQgPSAwXG4gICAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICBjb25zdCBoYW5kUmVmID0gZ2FtZVJlZi5jaGlsZChgcGxheWVycy8ke3BsYXllcklkfS9oYW5kYClcbiAgICAgICAgICBjb25zdCBwaWxlUmVmID0gZ2FtZVJlZi5jaGlsZCgncGlsZS93aGl0ZWNhcmRzJylcbiAgICAgICAgICBoYW5kUmVmLm9uY2UoJ3ZhbHVlJywgaGFuZFNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgY2FyZHNOZWVkZWQgPSA3IC0gaGFuZFNuYXBzaG90Lm51bUNoaWxkcmVuKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgIHJlZmlsbGVyKGNhcmRzTmVlZGVkLCBwaWxlUmVmLCBoYW5kUmVmKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIEFjdGl2ZUdhbWVGYWN0b3J5LnN1Ym1pdFdoaXRlQ2FyZCA9IChwbGF5ZXJJZCwgY2FyZElkLCBnYW1lSWQsIHRlYW1JZCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApO1xuICAgICAgICAgIGNvbnN0IGNhcmRUb1N1Ym1pdCA9IGdhbWVSZWYuY2hpbGQoYHBsYXllcnMvJHtwbGF5ZXJJZH0vaGFuZC8ke2NhcmRJZH1gKTtcbiAgICAgICAgICBjb25zdCBzdWJtaXRSZWYgPSBnYW1lUmVmLmNoaWxkKCdzdWJtaXR0ZWRXaGl0ZUNhcmRzJyk7XG4gICAgICAgICAgZmlyZWJhc2VNb3ZlU2luZ2xlS2V5VmFsdWUoY2FyZFRvU3VibWl0LCBzdWJtaXRSZWYpXG4gICAgICAgICAgICAudGhlbigoKSA9PiBzdWJtaXRSZWYuY2hpbGQoY2FyZElkKS5zZXQoe1xuICAgICAgICAgICAgICBzdWJtaXR0ZWRCeTogcGxheWVySWRcbiAgICAgICAgICAgIH0pKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEFjdGl2ZUdhbWVGYWN0b3J5OyBcblxuXG59KTsiLCJhcHAuZmFjdG9yeSgnR2FtZUZhY3RvcnknLCAoJGh0dHAsICRyb290U2NvcGUsICRsb2NhbFN0b3JhZ2UpID0+IHtcblxuICAgICAgICBjb25zdCBvdXJJcHMgPSB7XG4gICAgICAgICAgICBuaWtpdGE6IFwiMTkyLjE2OC40LjIxM1wiLFxuICAgICAgICAgICAga2F5bGE6IFwiMTkyLjE2OC40LjIyNVwiLFxuICAgICAgICAgICAgbml0aHlhOiBcIjE5Mi4xNjguMS40OFwiLFxuICAgICAgICAgICAgZGFuOiBcIjE5Mi4xNjguNC4yMzZcIlxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGN1cnJlbnRJcCA9IG91cklwcy5kYW5cblxuXG4gICAgICAgIC8vIHN0YXJ0IGEgbmV3IGdhbWUgZGVycFxuICAgICAgICBjb25zdCBHYW1lRmFjdG9yeSA9IHt9O1xuICAgICAgICBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWUgPSAoZ2FtZUNvbmZpZykgPT4ge1xuICAgICAgICAgICAgLy9jYW4gYWxzbyBnZXQgYWxsIHRoZSBkZWNrcyBieSB0ZWFtIGhlcmUgdG8gcHJlcGFyZVxuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gJGxvY2FsU3RvcmFnZS50ZWFtLmlkIHx8IDI7XG4gICAgICAgICAgICBjb25zdCBjcmVhdG9ySWQgPSAkbG9jYWxTdG9yYWdlLnVzZXIuaWQgfHwgMztcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzYCwge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBnYW1lQ29uZmlnLm5hbWUgfHwgJ0FXRVNPTUUgTmFtZScsXG4gICAgICAgICAgICAgICAgICAgIHRlYW1JZDogdGVhbUlkLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdG9ySWQ6IGNyZWF0b3JJZCxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvck5hbWU6ICRsb2NhbFN0b3JhZ2UudXNlci5uYW1lIHx8ICdkYW4nLCAvL21pZ2h0IGJlIHVubmVjZXNzYXJ5IGlmIHdlIGhhdmUgdGhlIHVzZXIgaWRcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3M6IGdhbWVDb25maWdcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdhbWVJZCA9IHJlcy5kYXRhXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgL3RlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAgICAgICAgICAgICBnYW1lUmVmLm9uKCd2YWx1ZScsIHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnY2hhbmdlZEdhbWUnLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnYW1lSWQ7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcbiAgICAgICAgLy8gZ2V0IGFsbCBvZiBhIGRlY2tzIGNhcmRzIHRvIGRpc3BsYXkgd2hlbiBsb29raW5nIGF0IGRlY2tzXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldENhcmRzQnlEZWNrSWQgPSAoaWQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZGVja3MvJHtpZH0vY2FyZHNgKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gVE9ETzogY29tYmluZSB0aGlzIGludG8gdGhlIGFib3ZlIHN0YXJ0TmV3R2FtZSBmdW5jXG4gICAgICAgIC8vIHRha2UgYWxsIG9mIHRoZSBzZWxlY3RlZCBkZWNrcycgY2FyZHMgYW5kIHB1dCB0aGVtIGluIHRoZSBmaXJlYmFzZSBnYW1lIG9iamVjdCBwaWxlICh0aHJvdWdoIHJvdXRlKVxuICAgICAgICBHYW1lRmFjdG9yeS5hZGRQaWxlVG9HYW1lID0gKGdhbWVJZCwgZGVja3MpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRkaW5nIHBpbGUgdG8gZ2FtZVwiKVxuICAgICAgICAgICAgY29uc3QgZGVja3NBcnIgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGRlY2tJZCBpbiBkZWNrcykge1xuICAgICAgICAgICAgICAgIGRlY2tzQXJyLnB1c2goZGVja0lkKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZ2FtZXMvJHtnYW1lSWR9L2RlY2tzYCwge1xuICAgICAgICAgICAgICAgICAgICAnZGVja3MnOiBkZWNrc0FyclxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4gZ2FtZUlkKVxuICAgICAgICB9XG5cbiAgICAgICAgR2FtZUZhY3Rvcnkuam9pbkdhbWVCeUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gJGxvY2FsU3RvcmFnZS50ZWFtLmlkO1xuICAgICAgICAgICAgY29uc3QgcGxheWVySWQgPSAkbG9jYWxTdG9yYWdlLnVzZXIuaWQ7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJOYW1lID0gJGxvY2FsU3RvcmFnZS51c2VyLm5hbWU7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfS9wbGF5ZXJzLyR7cGxheWVySWR9YClcbiAgICAgICAgICAgIHBsYXllclJlZi5zZXQoe1xuICAgICAgICAgICAgICAgIG5hbWU6IHBsYXllck5hbWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAgICAgZ2FtZVJlZi5vbigndmFsdWUnLCBzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdjaGFuZ2VkR2FtZScsIHNuYXBzaG90LnZhbCgpKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAkaHR0cC5wb3N0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzLyR7Z2FtZUlkfT9wbGF5ZXJJZD0ke3BsYXllcklkfWApXG4gICAgICAgIH1cblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkID0gKGlkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAodHlwZW9mIGlkICE9PSAnbnVtYmVyJykgPyAkbG9jYWxTdG9yYWdlLnRlYW0uaWQgOiBpZDsgLy8gaWQgfHwgbG9jYWxzdG9yYWdlIGRvZXNuJ3Qgd29yayBiZWNhdXNlIDAgaXMgZmFsc2V5XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2RlY2tzP3RlYW09JHt0ZWFtSWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG5cbiAgICAgICAgfTtcblxuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldFVzZXJzQnlHYW1lSWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL2dhbWVzLyR7Z2FtZUlkfS91c2Vyc2ApO1xuICAgICAgICB9O1xuXG5cblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRHYW1lQnlHYW1lSWQgPSAoZ2FtZUlkLCB0ZWFtSWQpID0+IHtcbiAgICAgICAgICAgIHRlYW1JZCA9IHRlYW1JZCB8fCAkbG9jYWxTdG9yYWdlLnRlYW0uaWRcbiAgICAgICAgICAgIGNvbnN0IGdhbWVzUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAgICAgcmV0dXJuIGdhbWVzUmVmLm9uY2UoJ3ZhbHVlJykudGhlbihzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNuYXBzaG90LnZhbCgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VGVhbUlkID0gKHRlYW1JZCkgPT4ge1xuICAgICAgICAgICAgdGVhbUlkID0gdGVhbUlkIHx8ICRsb2NhbFN0b3JhZ2UudGVhbS5pZFxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLyR7Y3VycmVudElwfToxMzM3L2FwaS9nYW1lcy8/dGVhbUlkPSR7dGVhbUlkfWApXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VXNlciA9ICh1c2VySWQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvZ2FtZXMvP3VzZXJJZD0ke3VzZXJJZH1gKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUubG9nKGVycikpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEdhbWVGYWN0b3J5O1xuICAgIH1cblxuKTtcblxuIiwiYXBwLmZhY3RvcnkoJ1VzZXJGYWN0b3J5JywgZnVuY3Rpb24oJGh0dHAsICRsb2NhbFN0b3JhZ2UpIHtcbiAgICBjb25zdCBvdXJJcHMgPSB7XG4gICAgICAgIG5pa2l0YTogXCIxOTIuMTY4LjQuMjEzXCIsXG4gICAgICAgIGtheWxhOiBcIjE5Mi4xNjguNC4yMjVcIixcbiAgICAgICAgbml0aHlhOiBcIjE5Mi4xNjguMS40OFwiLFxuICAgICAgICBkYW46IFwiMTkyLjE2OC40LjIzNlwiXG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudElwID0gb3VySXBzLmRhblxuICAgIHJldHVybiB7XG4gICAgICAgIHNldFVzZXI6IGZ1bmN0aW9uKGluZm8pIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IGBodHRwOi8vJHtjdXJyZW50SXB9OjEzMzcvYXBpL3VzZXJzYCxcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBpbmZvXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldExvY2FsU3RvcmFnZShyZXMuZGF0YS51c2VyWzBdLCByZXMuZGF0YS50ZWFtWzBdKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICB9LFxuICAgICAgICBnZXRTbGFja0NyZWRzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8ke2N1cnJlbnRJcH06MTMzNy9hcGkvc2xhY2tgKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuZGF0YVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG4gICAgICAgIGdldFNsYWNrSW5mbzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdodHRwczovL3NsYWNrLmNvbS9hcGkvdXNlcnMuaWRlbnRpdHknKVxuICAgICAgICB9LFxuXG4gICAgICAgIHNldExvY2FsU3RvcmFnZTogZnVuY3Rpb24odXNlciwgdGVhbSkge1xuICAgICAgICAgICAgJGxvY2FsU3RvcmFnZS51c2VyID0gdXNlcjtcbiAgICAgICAgICAgICRsb2NhbFN0b3JhZ2UudGVhbSA9IHRlYW07XG4gICAgICAgIH0sXG5cbiAgICAgICAgbG9nT3V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRsb2NhbFN0b3JhZ2UuJHJlc2V0KCk7XG4gICAgICAgIH1cbiAgICB9XG59KVxuXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
