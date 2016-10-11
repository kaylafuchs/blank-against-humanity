'use strict';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
window.app = angular.module('BlankAgainstHumanity', ['ionic', 'ui.router', 'ngCordova', 'ngCordovaOauth', 'ngStorage', 'ui.bootstrap']);

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
        url: '/game',
        abstract: true,
        templateUrl: 'js/game/game.html',
        controller: 'GameCtrl'
    }).state('game.pre-game', {
        url: '/:gameId/pre-game',
        templateUrl: 'js/game/pre-game.html',
        controller: 'PreGameCtrl',
        resolve: {
            game: function game(GameFactory, $stateParams) {
                return GameFactory.getGameByGameId($stateParams.gameId);
            }
        }
    });
});

app.controller('GameCtrl', function ($scope, GameFactory) {});

app.controller("PreGameCtrl", function ($scope, GameFactory, game) {

    // $scope.$on('changedGame', (event,snapshot) => {
    //     console.log(snapshot);
    //     $scope.name = snapshot.name;
    //     $scope.$digest();
    // })

    console.log(game);
    $scope.game = game;
    $scope.name = game.settings.name;
    $scope.playerCount = Object.keys(game.players).length;
    $scope.waitingForPlayers = game.settings.minPlayers - $scope.playerCount;
    $scope.whiteCards = game.pile.whitecards;
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

app.controller('HomeCtrl', function ($scope, $state, $cordovaOauth, UserFactory, GameFactory, $localStorage, games) {
    $scope.storage = $localStorage;
    $scope.games = games;
    console.log("games", JSON.stringify($scope.games));
    $scope.goToNewGame = function () {
        $state.go('new-game.main');
    };

    // // get games from postgres
    // GameFactory.getGamesByUser()
    // .then(games => {
    //     console.log("games found:", games)
    //     $scope.games = games;
    // })

    //get games from firebase
    // GameFactory.getGamesByTeamId($scope.storage.team.id)
    // .then(games => {
    //     console.log("the games are:", games)
    //     $scope.games = games;
    // })

    //$scope.startNewGame = GameFactory.startNewGame;
    $scope.createNewGame = function () {
        console.log('going to new state');
        $state.go('new-game.main');
    };

    $scope.$on('changedGame', function (event, data) {
        console.log('received event in home');
        console.log('data obj:', data);
        //$scope.game = data;
        // $scope.$digest()
    });
});

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });
    $urlRouterProvider.otherwise('/login');
});

app.controller('LoginCtrl', function ($scope, $state, LoginFactory, UserFactory, $cordovaOauth, $localStorage, $timeout, $ionicSideMenuDelegate) {
    $scope.loginWithSlack = function () {
        return LoginFactory.getSlackCreds().then(function (creds) {
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
                return GameFactory.getDecksByTeamId(0);
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
    console.log('curre', $scope);
    $scope.test = 1345234523;
    $scope.currentView = 'addDecks';
    $scope.gameConfig = {};
    $scope.gameConfig.decks = {};
    $scope.goToDecks = function () {
        $state.go('new-game.add-decks', {}, { location: true, reload: true });
    };

    $scope.decks = standardDeck.concat(teamDecks);

    $scope.startNewGame = GameFactory.startNewGame;
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

app.config(function ($stateProvider) {
    $stateProvider.state('team-games', {
        url: '/team-games',
        templateUrl: 'js/team-games/team-games.html',
        controller: 'TeamGamesCtrl'
    });
});

app.controller('TeamGamesCtrl', function ($scope, GameFactory, $ionicPopup, $timeout, $state) {

    GameFactory.getGamesByTeamId('1').then(function (games) {
        $scope.games = games;
        $scope.$digest();
    });

    $scope.$on('changedGame', function (event, snapshot) {
        $scope.name = snapshot.name;
        $scope.$digest();
    });

    $scope.joinGame = GameFactory.joinGameById;

    $scope.showPopup = function (gameId) {

        var myPopup = $ionicPopup.show({
            template: '<p>Information</p>',
            title: 'Game Information',
            scope: $scope,
            buttons: [{ text: 'Cancel' }, {
                text: '<b>Join</b>',
                type: 'button-positive',
                onTap: function onTap(e) {
                    console.log(gameId);
                    $scope.joinGame(gameId);
                    $state.go('game.pre-game', { gameId: gameId });
                }
            }]
        });
    };
});

//Directive File
app.factory('GameFactory', function ($http, $rootScope, $localStorage, $q) {

    var GameFactory = {};

    var initializeFirebase = function initializeFirebase() {
        var config = {
            apiKey: "AIzaSyAvQ7yQ7fKIUUOxEqHP2-hCBLzuMkdoXko",
            authDomain: "blank-against-humanity-d9cbf.firebaseapp.com",
            databaseURL: "https://blank-against-humanity-d9cbf.firebaseio.com",
            storageBucket: "blank-against-humanity-d9cbf.appspot.com",
            messagingSenderId: "778108071646"
        };
        firebase.initializeApp(config);
    };
    initializeFirebase();

    GameFactory.startNewGame = function (gameConfig) {
        //can also get all the decks by team here to prepare
        console.log('the settings are:', gameConfig);
        var teamId = $localStorage.team.id || 2;
        var creatorId = $localStorage.user.id || 3;
        return $http.post('http://192.168.4.236:1337/api/games', {
            name: gameConfig.name || 'Boring Name',
            teamId: teamId,
            creatorId: creatorId,
            creatorName: $localStorage.user.name || 'dan', //might be unnecessary if we have the user id
            settings: gameConfig
        }).then(function (res) {
            return res.data;
        }).then(function (gameId) {
            var gameRef = firebase.database().ref('/teams/' + teamId + '/games/' + gameId);
            gameRef.on('value', function (snapshot) {
                console.log('snapshot is:', snapshot.val());
                $rootScope.$broadcast('changedGame', snapshot.val());
            });
        });
    };

    GameFactory.addCardToGame = function (gameId) {};

    GameFactory.addDecksToGame = function (gameId, decks) {
        return $http.post('api/games/' + gameId + '/decks', decks);

        // const gameRef = firebase.database().ref(`teams/${teamId}/games/${gameId}/pile/`)
        // gameRef.set({
        //     deckId: true
        // })
    };

    GameFactory.joinGameById = function (gameId) {
        var teamId = 1;
        var playerId = 4;
        var playerName = 'cat';
        var playerRef = firebase.database().ref('teams/' + teamId + '/games/' + gameId + '/players/' + playerId);
        playerRef.set({
            name: playerName
        });
        var gameRef = firebase.database().ref('teams/' + teamId + '/games/' + gameId);
        gameRef.on('value', function (snapshot) {
            $rootScope.$broadcast('changedGame', snapshot.val());
        });
    };

    GameFactory.createGameByIdFireBase = function (firebasegameId) {
        //return $http.post(`http://localhost:1337/api/firebase/games/${gameId}`)
        //needs to be .thenable
        var newRef = firebase.database().ref('games/' + firebasegameId).push();
        newRef.set({
            playerId: req.query.playerId
        });
    };

    //GameFactory.getCardsByDeckId 


    GameFactory.getDecksByTeamId = function (id) {
        var teamId = id || $localStorage.team.id; //(typeof id !== 'number') ? $localStorage.team.id : id; // uses localstorage unless id param is provided
        return $http.get('http://localhost:1337/api/decks/' + teamId).then(function (res) {
            return res.data;
        });
    };

    GameFactory.getUsersByGameId = function (gameId) {
        return $http.get('http://localhost:1337/api/games/' + gameId + '/users');
    };

    GameFactory.getGameByGameId = function (gameId) {
        // const defer = $q.defer();
        console.log(gameId);
        var teamId = 1;
        var gamesRef = firebase.database().ref('teams/' + teamId + '/games/' + gameId);
        return gamesRef.once('value').then(function (snapshot) {
            console.log('TEST3', snapshot.val());
            return snapshot.val();
        });

        // return defer.promise;
    };

    GameFactory.getGamesByTeamId = function (teamId) {
        console.log('the team is id', teamId);

        var gamesRef = firebase.database().ref('teams/' + teamId + '/games');
        return gamesRef.once('value').then(function (snapshot) {
            //might break after you do it once
            console.log('the val is', snapshot.val());
            return snapshot.val();
        });
    };

    GameFactory.getGamesByTeamId = function (teamId) {
        teamId = teamId || $localStorage.team.id;
        console.log('the team is id', teamId);
        var defer = $q.defer();

        var gamesRef = firebase.database().ref('teams/' + teamId + '/games');
        gamesRef.on('value', function (snapshot) {
            console.log('the val is', snapshot.val());
            defer.resolve(snapshot.val());
        });
        console.log("defer promise", defer.promise);
        return defer.promise;
    };

    GameFactory.getGamesByUser = function (userId) {
        return $http.get('http://localStorage:1337/api/games/?userId=' + userId).then(function (res) {
            return res.data;
        });
    };

    return GameFactory;
});

app.factory('LoginFactory', function ($http) {
    return {
        getSlackCreds: function getSlackCreds() {
            return $http.get('http://localhost:1337/api/slack').then(function (res) {
                return res.data;
            });
        }
    };
});

app.factory('UserFactory', function ($http, $localStorage, $timeout, $state) {

    return {
        setUser: function setUser(info) {
            var _this = this;

            return $http({
                method: 'POST',
                url: 'http://localhost:1337/api/users',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: info
            }).then(function (res) {
                _this.setLocalStorage(res.data.user[0], res.data.team[0]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImNhcmRzLXRlc3QvY2FyZHNUZXN0LmpzIiwiZGVja3MvZGVja3MuanMiLCJmcm9tIGZzZy9mcm9tLWZzZy5qcyIsImdhbWUvZ2FtZS5qcyIsImhvbWUvaG9tZS5qcyIsImxvZ2luL2xvZ2luLmpzIiwibmV3LWdhbWUvbmV3LWdhbWUuanMiLCJ0ZWFtLWdhbWVzL3RlYW0tZ2FtZXMuanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiLCJjb21tb24vZmFjdG9yaWVzL0dhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9sb2dpbkZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yaWVzL3VzZXJGYWN0b3J5LmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImFwcCIsImFuZ3VsYXIiLCJtb2R1bGUiLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZUxpZ2h0Q29udGVudCIsImNvbnRyb2xsZXIiLCIkc2NvcGUiLCJVc2VyRmFjdG9yeSIsIiRzdGF0ZSIsIiRsb2NhbFN0b3JhZ2UiLCIkdGltZW91dCIsImxvZ091dCIsImdvIiwiY29uZmlnIiwiJHN0YXRlUHJvdmlkZXIiLCJzdGF0ZSIsInVybCIsInRlbXBsYXRlVXJsIiwiZ3JlZXRpbmciLCJyZXNvbHZlIiwiZGVja3MiLCJHYW1lRmFjdG9yeSIsIiRzdGF0ZVBhcmFtcyIsImdldERlY2tzQnlUZWFtSWQiLCJzdGF0ZVBhcmFtcyIsInRlYW1JZCIsImFic3RyYWN0IiwiZ2FtZSIsImdldEdhbWVCeUdhbWVJZCIsImdhbWVJZCIsImNvbnNvbGUiLCJsb2ciLCJuYW1lIiwic2V0dGluZ3MiLCJwbGF5ZXJDb3VudCIsIk9iamVjdCIsImtleXMiLCJwbGF5ZXJzIiwibGVuZ3RoIiwid2FpdGluZ0ZvclBsYXllcnMiLCJtaW5QbGF5ZXJzIiwid2hpdGVDYXJkcyIsInBpbGUiLCJ3aGl0ZWNhcmRzIiwiJHVybFJvdXRlclByb3ZpZGVyIiwiZ2FtZXMiLCJnZXRHYW1lc0J5VGVhbUlkIiwiJGNvcmRvdmFPYXV0aCIsInN0b3JhZ2UiLCJKU09OIiwic3RyaW5naWZ5IiwiZ29Ub05ld0dhbWUiLCJjcmVhdGVOZXdHYW1lIiwiJG9uIiwiZXZlbnQiLCJkYXRhIiwib3RoZXJ3aXNlIiwiTG9naW5GYWN0b3J5IiwiJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZSIsImxvZ2luV2l0aFNsYWNrIiwiZ2V0U2xhY2tDcmVkcyIsInRoZW4iLCJzbGFjayIsImNyZWRzIiwiY2xpZW50SUQiLCJjbGllbnRTZWNyZXQiLCJzZXRVc2VyIiwiaW5mbyIsImNhbkRyYWdDb250ZW50IiwicmVkaXJlY3RVc2VyIiwidXNlciIsInRlYW1EZWNrcyIsInN0YW5kYXJkRGVjayIsImNhcmRzIiwiZ2V0Q2FyZHNCeURlY2tJZCIsImRlY2tJZCIsInRlc3QiLCJjdXJyZW50VmlldyIsImdhbWVDb25maWciLCJnb1RvRGVja3MiLCJsb2NhdGlvbiIsInJlbG9hZCIsImNvbmNhdCIsInN0YXJ0TmV3R2FtZSIsImFkZERlY2tzVG9HYW1lIiwiYWRkRGVja3MiLCIkaW9uaWNQb3B1cCIsIiRkaWdlc3QiLCJzbmFwc2hvdCIsImpvaW5HYW1lIiwiam9pbkdhbWVCeUlkIiwic2hvd1BvcHVwIiwibXlQb3B1cCIsInNob3ciLCJ0ZW1wbGF0ZSIsInRpdGxlIiwic2NvcGUiLCJidXR0b25zIiwidGV4dCIsInR5cGUiLCJvblRhcCIsImZhY3RvcnkiLCIkaHR0cCIsIiRyb290U2NvcGUiLCIkcSIsImluaXRpYWxpemVGaXJlYmFzZSIsImFwaUtleSIsImF1dGhEb21haW4iLCJkYXRhYmFzZVVSTCIsInN0b3JhZ2VCdWNrZXQiLCJtZXNzYWdpbmdTZW5kZXJJZCIsImZpcmViYXNlIiwiaW5pdGlhbGl6ZUFwcCIsInRlYW0iLCJpZCIsImNyZWF0b3JJZCIsInBvc3QiLCJjcmVhdG9yTmFtZSIsInJlcyIsImdhbWVSZWYiLCJkYXRhYmFzZSIsInJlZiIsIm9uIiwidmFsIiwiJGJyb2FkY2FzdCIsImFkZENhcmRUb0dhbWUiLCJwbGF5ZXJJZCIsInBsYXllck5hbWUiLCJwbGF5ZXJSZWYiLCJzZXQiLCJjcmVhdGVHYW1lQnlJZEZpcmVCYXNlIiwiZmlyZWJhc2VnYW1lSWQiLCJuZXdSZWYiLCJwdXNoIiwicmVxIiwicXVlcnkiLCJnZXQiLCJnZXRVc2Vyc0J5R2FtZUlkIiwiZ2FtZXNSZWYiLCJvbmNlIiwiZGVmZXIiLCJwcm9taXNlIiwiZ2V0R2FtZXNCeVVzZXIiLCJ1c2VySWQiLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0TG9jYWxTdG9yYWdlIiwiZ2V0U2xhY2tJbmZvIiwiJHJlc2V0Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBQSxPQUFBQyxHQUFBLEdBQUFDLFFBQUFDLE1BQUEsQ0FBQSxzQkFBQSxFQUFBLENBQUEsT0FBQSxFQUFBLFdBQUEsRUFBQSxXQUFBLEVBQUEsZ0JBQUEsRUFBQSxXQUFBLEVBQUEsY0FBQSxDQUFBLENBQUE7O0FBRUFGLElBQUFHLEdBQUEsQ0FBQSxVQUFBQyxjQUFBLEVBQUE7QUFDQUEsbUJBQUFDLEtBQUEsQ0FBQSxZQUFBO0FBQ0EsWUFBQU4sT0FBQU8sT0FBQSxJQUFBUCxPQUFBTyxPQUFBLENBQUFDLE9BQUEsQ0FBQUMsUUFBQSxFQUFBO0FBQ0E7QUFDQTtBQUNBRixvQkFBQUMsT0FBQSxDQUFBQyxRQUFBLENBQUFDLHdCQUFBLENBQUEsSUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQUgsb0JBQUFDLE9BQUEsQ0FBQUMsUUFBQSxDQUFBRSxhQUFBLENBQUEsSUFBQTtBQUNBO0FBQ0EsWUFBQVgsT0FBQVksU0FBQSxFQUFBO0FBQ0FBLHNCQUFBQyxpQkFBQTtBQUNBO0FBQ0EsS0FkQTtBQWdCQSxDQWpCQTs7QUNQQVosSUFBQWEsVUFBQSxDQUFBLFlBQUEsRUFBQSxVQUFBQyxNQUFBLEVB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YUFBQSxFQUFBQyxRQUFBLEVBQUFGLE1BQUEsRUFBQTs7QUFFQSxXQUFBO0FBQ0EwRCxpQkFBQSxpQkFBQUMsSUFBQSxFQUFBO0FBQUE7O0FBQ0EsbUJBQUFtQyxNQUFBO0FBQ0EwQyx3QkFBQSxNQURBO0FBRUFoSSxxQkFBQSxpQ0FGQTtBQUdBaUkseUJBQUE7QUFDQSxvQ0FBQTtBQURBLGlCQUhBO0FBTUExRixzQkFBQVk7QUFOQSxhQUFBLEVBUUFOLElBUkEsQ0FRQSxlQUFBO0FBQ0Esc0JBQUFxRixlQUFBLENBQUE1QixJQUFBL0QsSUFBQSxDQUFBZSxJQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUFnRCxJQUFBL0QsSUFBQSxDQUFBMEQsSUFBQSxDQUFBLENBQUEsQ0FBQTtBQUNBLGFBVkEsQ0FBQTtBQVdBLFNBYkE7O0FBZUFrQyxzQkFBQSx3QkFBQTtBQUNBLG1CQUFBN0MsTUFBQWtDLEdBQUEsQ0FBQSxzQ0FBQSxDQUFBO0FBQ0EsU0FqQkE7O0FBbUJBVSx5QkFBQSx5QkFBQTVFLElBQUEsRUFBQTJDLElBQUEsRUFBQTtBQUNBeEcsMEJBQUE2RCxJQUFBLEdBQUFBLElBQUE7QUFDQTdELDBCQUFBd0csSUFBQSxHQUFBQSxJQUFBO0FBQ0EsU0F0QkE7O0FBd0JBdEcsZ0JBQUEsa0JBQUE7QUFDQUYsMEJBQUEySSxNQUFBO0FBQ0E7QUExQkEsS0FBQTtBQTRCQSxDQTlCQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW9uaWMgU3RhcnRlciBBcHBcblxuLy8gYW5ndWxhci5tb2R1bGUgaXMgYSBnbG9iYWwgcGxhY2UgZm9yIGNyZWF0aW5nLCByZWdpc3RlcmluZyBhbmQgcmV0cmlldmluZyBBbmd1bGFyIG1vZHVsZXNcbi8vICdzdGFydGVyJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xud2luZG93LmFwcCA9IGFuZ3VsYXIubW9kdWxlKCdCbGFua0FnYWluc3RIdW1hbml0eScsIFsnaW9uaWMnLCAndWkucm91dGVyJywnbmdDb3Jkb3ZhJywnbmdDb3Jkb3ZhT2F1dGgnLCAnbmdTdG9yYWdlJywgJ3VpLmJvb3RzdHJhcCddKVxuXG5hcHAucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtKSB7XG4gICAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICAgICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAgICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuXG4gICAgICAgICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcbiAgICAgICAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxuICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgICAgICAgIFN0YXR1c0Jhci5zdHlsZUxpZ2h0Q29udGVudCgpXG4gICAgICAgIH1cbiAgICB9KTtcblxufSlcbiIsImFwcC5jb250cm9sbGVyKCdMb2dvdXRDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBVc2VyRmFjdG9yeSwgJHN0YXRlLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCl7XG5cdCRzY29wZS5sb2dPdXQgPSBmdW5jdGlvbigpe1xuXHRcdFVzZXJGYWN0b3J5LmxvZ091dCgpXG5cdFx0JHN0YXRlLmdvKCdsb2dpbicpXG5cdH1cbn0pIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcil7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdjYXJkcycsIHtcblx0XHR1cmw6ICcvY2FyZHMnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvY2FyZHMtdGVzdC9jYXJkcy10ZXN0Lmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdDYXJkc1Rlc3RDdHJsJ1xuXHR9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0NhcmRzVGVzdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpe1xuIFx0JHNjb3BlLmdyZWV0aW5nID0gXCJISVwiXG59KSIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdkZWNrcycsIHtcblx0XHR1cmw6ICdkZWNrcy86dGVhbWlkJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2RlY2tzL2RlY2tzLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdEZWNrQ3RybCcsXG5cdFx0cmVzb2x2ZToge1xuXHRcdFx0ZGVja3M6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkKHN0YXRlUGFyYW1zLnRlYW1JZClcblx0XHR9XG5cdH0pXG5cbn0pXG5cbmFwcC5jb250cm9sbGVyKCdEZWNrQ3RybCcsICgkc2NvcGUpID0+IHtcblxuXG5cdFxufSkiLCIvLyAoZnVuY3Rpb24gKCkge1xuXG4vLyAgICAgJ3VzZSBzdHJpY3QnO1xuXG4vLyAgICAgLy8gSG9wZSB5b3UgZGlkbid0IGZvcmdldCBBbmd1bGFyISBEdWgtZG95LlxuLy8gICAgIGlmICghd2luZG93LmFuZ3VsYXIpIHRocm93IG5ldyBFcnJvcignSSBjYW5cXCd0IGZpbmQgQW5ndWxhciEnKTtcblxuLy8gICAgIHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnZnNhUHJlQnVpbHQnLCBbXSk7XG5cbi8vICAgICBhcHAuZmFjdG9yeSgnU29ja2V0JywgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICBpZiAoIXdpbmRvdy5pbykgdGhyb3cgbmV3IEVycm9yKCdzb2NrZXQuaW8gbm90IGZvdW5kIScpO1xuLy8gICAgICAgICByZXR1cm4gd2luZG93LmlvKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pO1xuLy8gICAgIH0pO1xuXG4vLyAgICAgLy8gQVVUSF9FVkVOVFMgaXMgdXNlZCB0aHJvdWdob3V0IG91ciBhcHAgdG9cbi8vICAgICAvLyBicm9hZGNhc3QgYW5kIGxpc3RlbiBmcm9tIGFuZCB0byB0aGUgJHJvb3RTY29wZVxuLy8gICAgIC8vIGZvciBpbXBvcnRhbnQgZXZlbnRzIGFib3V0IGF1dGhlbnRpY2F0aW9uIGZsb3cuXG4vLyAgICAgYXBwLmNvbnN0YW50KCdBVVRIX0VWRU5UUycsIHtcbi8vICAgICAgICAgbG9naW5TdWNjZXNzOiAnYXV0aC1sb2dpbi1zdWNjZXNzJyxcbi8vICAgICAgICAgbG9naW5GYWlsZWQ6ICdhdXRoLWxvZ2luLWZhaWxlZCcsXG4vLyAgICAgICAgIGxvZ291dFN1Y2Nlc3M6ICdhdXRoLWxvZ291dC1zdWNjZXNzJyxcbi8vICAgICAgICAgc2Vzc2lvblRpbWVvdXQ6ICdhdXRoLXNlc3Npb24tdGltZW91dCcsXG4vLyAgICAgICAgIG5vdEF1dGhlbnRpY2F0ZWQ6ICdhdXRoLW5vdC1hdXRoZW50aWNhdGVkJyxcbi8vICAgICAgICAgbm90QXV0aG9yaXplZDogJ2F1dGgtbm90LWF1dGhvcml6ZWQnXG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuZmFjdG9yeSgnQXV0aEludGVyY2VwdG9yJywgZnVuY3Rpb24gKCRyb290U2NvcGUsICRxLCBBVVRIX0VWRU5UUykge1xuLy8gICAgICAgICB2YXIgc3RhdHVzRGljdCA9IHtcbi8vICAgICAgICAgICAgIDQwMTogQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCxcbi8vICAgICAgICAgICAgIDQwMzogQVVUSF9FVkVOVFMubm90QXV0aG9yaXplZCxcbi8vICAgICAgICAgICAgIDQxOTogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsXG4vLyAgICAgICAgICAgICA0NDA6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0XG4vLyAgICAgICAgIH07XG4vLyAgICAgICAgIHJldHVybiB7XG4vLyAgICAgICAgICAgICByZXNwb25zZUVycm9yOiBmdW5jdGlvbiAocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3Qoc3RhdHVzRGljdFtyZXNwb25zZS5zdGF0dXNdLCByZXNwb25zZSk7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXNwb25zZSlcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfTtcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5jb25maWcoZnVuY3Rpb24gKCRodHRwUHJvdmlkZXIpIHtcbi8vICAgICAgICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaChbXG4vLyAgICAgICAgICAgICAnJGluamVjdG9yJyxcbi8vICAgICAgICAgICAgIGZ1bmN0aW9uICgkaW5qZWN0b3IpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJGluamVjdG9yLmdldCgnQXV0aEludGVyY2VwdG9yJyk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIF0pO1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLnNlcnZpY2UoJ0F1dGhTZXJ2aWNlJywgZnVuY3Rpb24gKCRodHRwLCBTZXNzaW9uLCAkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUywgJHEpIHtcblxuLy8gICAgICAgICBmdW5jdGlvbiBvblN1Y2Nlc3NmdWxMb2dpbihyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgdmFyIHVzZXIgPSByZXNwb25zZS5kYXRhLnVzZXI7XG4vLyAgICAgICAgICAgICBTZXNzaW9uLmNyZWF0ZSh1c2VyKTtcbi8vICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dpblN1Y2Nlc3MpO1xuLy8gICAgICAgICAgICAgcmV0dXJuIHVzZXI7XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICAvLyBVc2VzIHRoZSBzZXNzaW9uIGZhY3RvcnkgdG8gc2VlIGlmIGFuXG4vLyAgICAgICAgIC8vIGF1dGhlbnRpY2F0ZWQgdXNlciBpcyBjdXJyZW50bHkgcmVnaXN0ZXJlZC5cbi8vICAgICAgICAgdGhpcy5pc0F1dGhlbnRpY2F0ZWQgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gISFTZXNzaW9uLnVzZXI7XG4vLyAgICAgICAgIH07XG5cbiAgICAgICAgXG4vLyAgICAgICAgIHRoaXMuaXNBZG1pbiA9IGZ1bmN0aW9uKHVzZXJJZCl7XG4vLyAgICAgICAgICAgICBjb25zb2xlLmxvZygncnVubmluZyBhZG1pbiBmdW5jJylcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJylcbi8vICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEudXNlci5pc0FkbWluKVxuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgdGhpcy5nZXRMb2dnZWRJblVzZXIgPSBmdW5jdGlvbiAoZnJvbVNlcnZlcikge1xuXG4vLyAgICAgICAgICAgICAvLyBJZiBhbiBhdXRoZW50aWNhdGVkIHNlc3Npb24gZXhpc3RzLCB3ZVxuLy8gICAgICAgICAgICAgLy8gcmV0dXJuIHRoZSB1c2VyIGF0dGFjaGVkIHRvIHRoYXQgc2Vzc2lvblxuLy8gICAgICAgICAgICAgLy8gd2l0aCBhIHByb21pc2UuIFRoaXMgZW5zdXJlcyB0aGF0IHdlIGNhblxuLy8gICAgICAgICAgICAgLy8gYWx3YXlzIGludGVyZmFjZSB3aXRoIHRoaXMgbWV0aG9kIGFzeW5jaHJvbm91c2x5LlxuXG4vLyAgICAgICAgICAgICAvLyBPcHRpb25hbGx5LCBpZiB0cnVlIGlzIGdpdmVuIGFzIHRoZSBmcm9tU2VydmVyIHBhcmFtZXRlcixcbi8vICAgICAgICAgICAgIC8vIHRoZW4gdGhpcyBjYWNoZWQgdmFsdWUgd2lsbCBub3QgYmUgdXNlZC5cblxuLy8gICAgICAgICAgICAgaWYgKHRoaXMuaXNBdXRoZW50aWNhdGVkKCkgJiYgZnJvbVNlcnZlciAhPT0gdHJ1ZSkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKFNlc3Npb24udXNlcik7XG4vLyAgICAgICAgICAgICB9XG5cbi8vICAgICAgICAgICAgIC8vIE1ha2UgcmVxdWVzdCBHRVQgL3Nlc3Npb24uXG4vLyAgICAgICAgICAgICAvLyBJZiBpdCByZXR1cm5zIGEgdXNlciwgY2FsbCBvblN1Y2Nlc3NmdWxMb2dpbiB3aXRoIHRoZSByZXNwb25zZS5cbi8vICAgICAgICAgICAgIC8vIElmIGl0IHJldHVybnMgYSA0MDEgcmVzcG9uc2UsIHdlIGNhdGNoIGl0IGFuZCBpbnN0ZWFkIHJlc29sdmUgdG8gbnVsbC5cbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9zZXNzaW9uJykudGhlbihvblN1Y2Nlc3NmdWxMb2dpbikuY2F0Y2goZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuLy8gICAgICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmxvZ2luID0gZnVuY3Rpb24gKGNyZWRlbnRpYWxzKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2xvZ2luJywgY3JlZGVudGlhbHMpXG4vLyAgICAgICAgICAgICAgICAgLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pXG4vLyAgICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCh7IG1lc3NhZ2U6ICdJbnZhbGlkIGxvZ2luIGNyZWRlbnRpYWxzLid9KTtcbi8vICAgICAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLnNpZ251cCA9IGZ1bmN0aW9uKGNyZWRlbnRpYWxzKXtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cCh7XG4vLyAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4vLyAgICAgICAgICAgICAgICAgdXJsOiAnL3NpZ251cCcsXG4vLyAgICAgICAgICAgICAgICAgZGF0YTogY3JlZGVudGlhbHNcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgICAgICAudGhlbihyZXN1bHQgPT4gcmVzdWx0LmRhdGEpXG4vLyAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oKXtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHttZXNzYWdlOiAnVGhhdCBlbWFpbCBpcyBhbHJlYWR5IGJlaW5nIHVzZWQuJ30pO1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmxvZ291dCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9sb2dvdXQnKS50aGVuKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICBTZXNzaW9uLmRlc3Ryb3koKTtcbi8vICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoQVVUSF9FVkVOVFMubG9nb3V0U3VjY2Vzcyk7XG4vLyAgICAgICAgICAgICB9KTtcbi8vICAgICAgICAgfTtcblxuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLnNlcnZpY2UoJ1Nlc3Npb24nLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMpIHtcblxuLy8gICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbi8vICAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMubm90QXV0aGVudGljYXRlZCwgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgc2VsZi5kZXN0cm95KCk7XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgICRyb290U2NvcGUuJG9uKEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0LCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICBzZWxmLmRlc3Ryb3koKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcblxuLy8gICAgICAgICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uICh1c2VyKSB7XG4vLyAgICAgICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICB9KTtcblxuLy8gfSgpKTtcbiIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnL2dhbWUnLFxuICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL2dhbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdHYW1lQ3RybCcsXG4gICAgfSlcbiAgICAuc3RhdGUoJ2dhbWUucHJlLWdhbWUnLCB7XG4gICAgICAgIHVybDogJy86Z2FtZUlkL3ByZS1nYW1lJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL3ByZS1nYW1lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnUHJlR2FtZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBnYW1lIDogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldEdhbWVCeUdhbWVJZCgkc3RhdGVQYXJhbXMuZ2FtZUlkKVxuICAgICAgICB9XG4gICAgfSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdHYW1lQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5KSA9PiB7XG4gICBcbn0pXG5cbmFwcC5jb250cm9sbGVyKFwiUHJlR2FtZUN0cmxcIiwgKCRzY29wZSwgR2FtZUZhY3RvcnksIGdhbWUpID0+IHtcblxuICAgIC8vICRzY29wZS4kb24oJ2NoYW5nZWRHYW1lJywgKGV2ZW50LHNuYXBzaG90KSA9PiB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKHNuYXBzaG90KTtcbiAgICAvLyAgICAgJHNjb3BlLm5hbWUgPSBzbmFwc2hvdC5uYW1lO1xuICAgIC8vICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgIC8vIH0pXG5cbiAgICBjb25zb2xlLmxvZyhnYW1lKTtcbiAgICAkc2NvcGUuZ2FtZSA9IGdhbWU7XG4gICAgJHNjb3BlLm5hbWUgPSBnYW1lLnNldHRpbmdzLm5hbWU7XG4gICAgJHNjb3BlLnBsYXllckNvdW50ID0gT2JqZWN0LmtleXMoZ2FtZS5wbGF5ZXJzKS5sZW5ndGg7XG4gICAgJHNjb3BlLndhaXRpbmdGb3JQbGF5ZXJzID0gIGdhbWUuc2V0dGluZ3MubWluUGxheWVycyAtICRzY29wZS5wbGF5ZXJDb3VudDtcbiAgICAkc2NvcGUud2hpdGVDYXJkcyA9IGdhbWUucGlsZS53aGl0ZWNhcmRzO1xuICAgXG4gICAgXG59KVxuXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgdXJsOiAnLycsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvaG9tZS9ob21lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnSG9tZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBnYW1lczogZnVuY3Rpb24oR2FtZUZhY3RvcnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUsICRjb3Jkb3ZhT2F1dGgsIFVzZXJGYWN0b3J5LCBHYW1lRmFjdG9yeSwgJGxvY2FsU3RvcmFnZSwgZ2FtZXMpIHtcbiAgICAkc2NvcGUuc3RvcmFnZSA9ICRsb2NhbFN0b3JhZ2U7XG4gICAgJHNjb3BlLmdhbWVzID0gZ2FtZXM7XG4gICAgY29uc29sZS5sb2coXCJnYW1lc1wiLCBKU09OLnN0cmluZ2lmeSgkc2NvcGUuZ2FtZXMpKVxuICAgICRzY29wZS5nb1RvTmV3R2FtZSA9ICgpID0+IHtcbiAgICAgICAgJHN0YXRlLmdvKCduZXctZ2FtZS5tYWluJylcbiAgICB9XG5cblxuICAgIC8vIC8vIGdldCBnYW1lcyBmcm9tIHBvc3RncmVzXG4gICAgLy8gR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVVzZXIoKVxuICAgIC8vIC50aGVuKGdhbWVzID0+IHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coXCJnYW1lcyBmb3VuZDpcIiwgZ2FtZXMpXG4gICAgLy8gICAgICRzY29wZS5nYW1lcyA9IGdhbWVzO1xuICAgIC8vIH0pXG5cbiAgICAvL2dldCBnYW1lcyBmcm9tIGZpcmViYXNlXG4gICAgLy8gR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCgkc2NvcGUuc3RvcmFnZS50ZWFtLmlkKVxuICAgIC8vIC50aGVuKGdhbWVzID0+IHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coXCJ0aGUgZ2FtZXMgYXJlOlwiLCBnYW1lcylcbiAgICAvLyAgICAgJHNjb3BlLmdhbWVzID0gZ2FtZXM7XG4gICAgLy8gfSlcblxuICAgIC8vJHNjb3BlLnN0YXJ0TmV3R2FtZSA9IEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZTtcbiAgICAkc2NvcGUuY3JlYXRlTmV3R2FtZSA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2dvaW5nIHRvIG5ldyBzdGF0ZScpXG4gICAgICAgICRzdGF0ZS5nbygnbmV3LWdhbWUubWFpbicpXG4gICAgfVxuXG4gICAgJHNjb3BlLiRvbignY2hhbmdlZEdhbWUnLCAoZXZlbnQsIGRhdGEpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlY2VpdmVkIGV2ZW50IGluIGhvbWUnKVxuICAgICAgICBjb25zb2xlLmxvZygnZGF0YSBvYmo6JywgZGF0YSlcbiAgICAgICAgICAgIC8vJHNjb3BlLmdhbWUgPSBkYXRhO1xuICAgICAgICAgICAgLy8gJHNjb3BlLiRkaWdlc3QoKVxuXG4gICAgfSlcbn0pXG5cbiIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcil7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdsb2dpbicsIHtcblx0XHR1cmw6ICcvbG9naW4nLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvbG9naW4vbG9naW4uaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0xvZ2luQ3RybCdcblx0fSlcblx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2xvZ2luJyk7XG59KVxuXG5hcHAuY29udHJvbGxlcignTG9naW5DdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUsIExvZ2luRmFjdG9yeSwgVXNlckZhY3RvcnksICRjb3Jkb3ZhT2F1dGgsICRsb2NhbFN0b3JhZ2UsICR0aW1lb3V0LCAkaW9uaWNTaWRlTWVudURlbGVnYXRlKXtcbiBcdCRzY29wZS5sb2dpbldpdGhTbGFjayA9IGZ1bmN0aW9uKCl7XG4gXHRcdHJldHVybiBMb2dpbkZhY3RvcnkuZ2V0U2xhY2tDcmVkcygpXG4gXHRcdC50aGVuKGNyZWRzID0+e1xuIFx0XHRcdHJldHVybiAkY29yZG92YU9hdXRoLnNsYWNrKGNyZWRzLmNsaWVudElELCBjcmVkcy5jbGllbnRTZWNyZXQsIFsnaWRlbnRpdHkuYmFzaWMnLCAnaWRlbnRpdHkudGVhbScsICdpZGVudGl0eS5hdmF0YXInXSlcbiBcdFx0fSlcbiBcdFx0LnRoZW4oaW5mbyA9PiBVc2VyRmFjdG9yeS5zZXRVc2VyKGluZm8pKVxuIFx0XHQudGhlbigoKSA9PiAkc3RhdGUuZ28oJ2hvbWUnKSlcbiBcdH1cblxuIFx0JGlvbmljU2lkZU1lbnVEZWxlZ2F0ZS5jYW5EcmFnQ29udGVudChmYWxzZSk7XG5cbiBcdCRzY29wZS4kb24oJyRpb25pY1ZpZXcubGVhdmUnLCBmdW5jdGlvbiAoKSB7ICRpb25pY1NpZGVNZW51RGVsZWdhdGUuY2FuRHJhZ0NvbnRlbnQodHJ1ZSkgfSk7XG5cbiBcdCRzY29wZS5zdG9yYWdlID0gJGxvY2FsU3RvcmFnZVxuXG4gXHRmdW5jdGlvbiByZWRpcmVjdFVzZXIoKXtcbiBcdFx0Y29uc29sZS5sb2coXCJzY29wZSBzdG9yYWdlIHVzZXJcIiwgJHNjb3BlLnN0b3JhZ2UudXNlcilcbiBcdFx0aWYgKCRzY29wZS5zdG9yYWdlLnVzZXIpICRzdGF0ZS5nbygnaG9tZScpXG4gXHR9XG5cblx0cmVkaXJlY3RVc2VyKCk7XG59KSIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpID0+IHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCduZXctZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnL25ldy1nYW1lJyxcbiAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvbWFpbi5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ05ld0dhbWVDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgdGVhbURlY2tzOiAoR2FtZUZhY3RvcnkpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoKSxcbiAgICAgICAgICAgIHN0YW5kYXJkRGVjazogKEdhbWVGYWN0b3J5KSA9PiBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkKDApXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5tYWluJywge1xuICAgICAgICB1cmw6ICcvc2V0dXAtZ2FtZScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvbmV3LWdhbWUuaHRtbCcsXG4gICAgfSlcblxuICAgIC5zdGF0ZSgnbmV3LWdhbWUuYWRkLWRlY2tzJywge1xuICAgICAgICB1cmw6ICcvYWRkLWRlY2tzJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9hZGQtZGVja3MuaHRtbCcsXG4gICAgfSlcblxuICAgIC5zdGF0ZSgnbmV3LWdhbWUuZGVjaycsIHtcbiAgICAgICAgdXJsOiAnL2RlY2svOmRlY2tJZCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvZGVjay5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0RlY2tDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgY2FyZHM6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXRDYXJkc0J5RGVja0lkKCRzdGF0ZVBhcmFtcy5kZWNrSWQpXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL25ldy1nYW1lL3NldHVwLWdhbWUnKTtcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdOZXdHYW1lQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkc3RhdGUsIHRlYW1EZWNrcywgc3RhbmRhcmREZWNrKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ2N1cnJlJywgJHNjb3BlKVxuICAgICRzY29wZS50ZXN0ID0gMTM0NTIzNDUyM1xuICAgICRzY29wZS5jdXJyZW50VmlldyA9ICdhZGREZWNrcydcbiAgICAkc2NvcGUuZ2FtZUNvbmZpZyA9IHt9O1xuICAgICRzY29wZS5nYW1lQ29uZmlnLmRlY2tzID0ge307XG4gICAgJHNjb3BlLmdvVG9EZWNrcyA9ICgpID0+IHtcbiAgICAgICAgJHN0YXRlLmdvKCduZXctZ2FtZS5hZGQtZGVja3MnLCB7fSwgeyBsb2NhdGlvbjogdHJ1ZSwgcmVsb2FkOiB0cnVlIH0pXG4gICAgfVxuXG4gICAgJHNjb3BlLmRlY2tzID0gc3RhbmRhcmREZWNrLmNvbmNhdCh0ZWFtRGVja3MpO1xuXG4gICAgJHNjb3BlLnN0YXJ0TmV3R2FtZSA9IEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZTtcbiAgICAkc2NvcGUuYWRkRGVja3NUb0dhbWUgPSBHYW1lRmFjdG9yeS5hZGREZWNrcztcbiAgICAvLyAkc2NvcGUuJG9uKCdjaGFuZ2VkR2FtZScsIChldmVudCwgZGF0YSkgPT4ge1xuICAgIC8vICAgICBjb25zb2xlLmxvZygncmVjZWl2ZWQgZXZlbnQnKVxuICAgIC8vICAgICBjb25zb2xlLmxvZygnZGF0YSBvYmo6JywgZGF0YSlcbiAgICAvLyAgICAgJHNjb3BlLmdhbWUgPSBkYXRhO1xuICAgIC8vICAgICAkc2NvcGUuJGRpZ2VzdCgpXG5cbiAgICAvLyB9KVxuXG5cbn0pXG5cbmFwcC5jb250cm9sbGVyKCdEZWNrQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkc3RhdGUsIGNhcmRzKSA9PiB7XG4gICAgJHNjb3BlLmNhcmRzID0gY2FyZHNcbn0pXG5cbiIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCd0ZWFtLWdhbWVzJywge1xuXHRcdHVybDogJy90ZWFtLWdhbWVzJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL3RlYW0tZ2FtZXMvdGVhbS1nYW1lcy5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnVGVhbUdhbWVzQ3RybCcsXG5cdH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignVGVhbUdhbWVzQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkaW9uaWNQb3B1cCwgJHRpbWVvdXQsICRzdGF0ZSkgPT4ge1xuXHQgXG5cdCBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VGVhbUlkKCcxJylcblx0IFx0LnRoZW4oZ2FtZXMgPT4ge1xuXHQgXHRcdCRzY29wZS5nYW1lcyA9IGdhbWVzO1xuXHQgXHRcdCRzY29wZS4kZGlnZXN0KCk7XG5cdCBcdH0pXG5cblx0IFxuXHQgJHNjb3BlLiRvbignY2hhbmdlZEdhbWUnLCAoZXZlbnQsc25hcHNob3QpID0+e1xuXHQgXHQkc2NvcGUubmFtZT0gc25hcHNob3QubmFtZTtcblx0IFx0JHNjb3BlLiRkaWdlc3QoKTtcblx0IH0pXG5cblx0ICRzY29wZS5qb2luR2FtZSA9IEdhbWVGYWN0b3J5LmpvaW5HYW1lQnlJZDtcblxuXHQgJHNjb3BlLnNob3dQb3B1cCA9IGZ1bmN0aW9uIChnYW1lSWQpIHtcblx0ICAgICBcblx0ICAgICBjb25zdCBteVBvcHVwID0gJGlvbmljUG9wdXAuc2hvdyh7XG5cdCAgICAgXHR0ZW1wbGF0ZTogJzxwPkluZm9ybWF0aW9uPC9wPicsXG5cdCAgICAgXHR0aXRsZTogJ0dhbWUgSW5mb3JtYXRpb24nLFxuXHQgICAgIFx0c2NvcGU6ICRzY29wZSxcblx0ICAgICBcdGJ1dHRvbnM6IFtcblx0ICAgICBcdFx0e3RleHQ6ICdDYW5jZWwnfSxcblx0ICAgICBcdFx0e1xuXHQgICAgIFx0XHRcdHRleHQ6ICc8Yj5Kb2luPC9iPicsXG5cdCAgICAgXHRcdCBcdHR5cGU6ICdidXR0b24tcG9zaXRpdmUnLFxuXHQgICAgIFx0XHQgXHRvblRhcDogZSA9PiB7XG5cdCAgICAgXHRcdCBcdFx0Y29uc29sZS5sb2coZ2FtZUlkKTtcblx0ICAgICBcdFx0IFx0XHQkc2NvcGUuam9pbkdhbWUoZ2FtZUlkKTtcblx0ICAgICBcdFx0IFx0XHQkc3RhdGUuZ28oJ2dhbWUucHJlLWdhbWUnLCB7Z2FtZUlkOiBnYW1lSWR9KVxuXHQgICAgIFx0XHQgXHR9XG5cdCAgICAgXHRcdH1cblx0XHRcdF1cblx0ICAgIH0pXG5cdCB9XG59KVxuIiwiLy9EaXJlY3RpdmUgRmlsZSIsImFwcC5mYWN0b3J5KCdHYW1lRmFjdG9yeScsICgkaHR0cCwgJHJvb3RTY29wZSwgJGxvY2FsU3RvcmFnZSwgJHEpID0+IHtcblxuICAgICAgICBjb25zdCBHYW1lRmFjdG9yeSA9IHt9O1xuXG4gICAgICAgIGNvbnN0IGluaXRpYWxpemVGaXJlYmFzZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICBhcGlLZXk6IFwiQUl6YVN5QXZRN3lRN2ZLSVVVT3hFcUhQMi1oQ0JMenVNa2RvWGtvXCIsXG4gICAgICAgICAgICAgICAgYXV0aERvbWFpbjogXCJibGFuay1hZ2FpbnN0LWh1bWFuaXR5LWQ5Y2JmLmZpcmViYXNlYXBwLmNvbVwiLFxuICAgICAgICAgICAgICAgIGRhdGFiYXNlVVJMOiBcImh0dHBzOi8vYmxhbmstYWdhaW5zdC1odW1hbml0eS1kOWNiZi5maXJlYmFzZWlvLmNvbVwiLFxuICAgICAgICAgICAgICAgIHN0b3JhZ2VCdWNrZXQ6IFwiYmxhbmstYWdhaW5zdC1odW1hbml0eS1kOWNiZi5hcHBzcG90LmNvbVwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjc3ODEwODA3MTY0NlwiXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChjb25maWcpO1xuICAgICAgICB9O1xuICAgICAgICBpbml0aWFsaXplRmlyZWJhc2UoKTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWUgPSAoZ2FtZUNvbmZpZykgPT4ge1xuICAgICAgICAgICAgLy9jYW4gYWxzbyBnZXQgYWxsIHRoZSBkZWNrcyBieSB0ZWFtIGhlcmUgdG8gcHJlcGFyZVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZSBzZXR0aW5ncyBhcmU6JywgZ2FtZUNvbmZpZylcbiAgICAgICAgICAgIGNvbnN0IHRlYW1JZCA9ICRsb2NhbFN0b3JhZ2UudGVhbS5pZCB8fCAyO1xuICAgICAgICAgICAgY29uc3QgY3JlYXRvcklkID0gJGxvY2FsU3RvcmFnZS51c2VyLmlkIHx8IDM7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnaHR0cDovLzE5Mi4xNjguNC4yMzY6MTMzNy9hcGkvZ2FtZXMnLCB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGdhbWVDb25maWcubmFtZSB8fCAnQm9yaW5nIE5hbWUnLFxuICAgICAgICAgICAgICAgICAgICB0ZWFtSWQ6IHRlYW1JZCxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvcklkOiBjcmVhdG9ySWQsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0b3JOYW1lOiAkbG9jYWxTdG9yYWdlLnVzZXIubmFtZSB8fCAnZGFuJywgLy9taWdodCBiZSB1bm5lY2Vzc2FyeSBpZiB3ZSBoYXZlIHRoZSB1c2VyIGlkXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiBnYW1lQ29uZmlnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgLnRoZW4oZ2FtZUlkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGAvdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICAgICAgICAgIGdhbWVSZWYub24oJ3ZhbHVlJywgc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NuYXBzaG90IGlzOicsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdjaGFuZ2VkR2FtZScsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgIH07XG5cblxuICAgICAgICBHYW1lRmFjdG9yeS5hZGRDYXJkVG9HYW1lID0gKGdhbWVJZCkgPT4ge1xuXG4gICAgICAgIH1cblxuICAgICAgICBHYW1lRmFjdG9yeS5hZGREZWNrc1RvR2FtZSA9IChnYW1lSWQsIGRlY2tzKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChgYXBpL2dhbWVzLyR7Z2FtZUlkfS9kZWNrc2AsIGRlY2tzKVxuXG4gICAgICAgICAgICAvLyBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH0vcGlsZS9gKVxuICAgICAgICAgICAgLy8gZ2FtZVJlZi5zZXQoe1xuICAgICAgICAgICAgLy8gICAgIGRlY2tJZDogdHJ1ZVxuICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgfVxuXG5cbiAgICAgICAgR2FtZUZhY3Rvcnkuam9pbkdhbWVCeUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gMTtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllcklkID0gNDtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllck5hbWUgPSAnY2F0JztcbiAgICAgICAgICAgIGNvbnN0IHBsYXllclJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9L3BsYXllcnMvJHtwbGF5ZXJJZH1gKVxuICAgICAgICAgICAgcGxheWVyUmVmLnNldCh7XG4gICAgICAgICAgICAgICAgbmFtZTogcGxheWVyTmFtZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICBnYW1lUmVmLm9uKCd2YWx1ZScsIHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2NoYW5nZWRHYW1lJywgc25hcHNob3QudmFsKCkpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG5cbiAgICAgICAgR2FtZUZhY3RvcnkuY3JlYXRlR2FtZUJ5SWRGaXJlQmFzZSA9IChmaXJlYmFzZWdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgLy9yZXR1cm4gJGh0dHAucG9zdChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9maXJlYmFzZS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAgICAgLy9uZWVkcyB0byBiZSAudGhlbmFibGVcbiAgICAgICAgICAgIGNvbnN0IG5ld1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBnYW1lcy8ke2ZpcmViYXNlZ2FtZUlkfWApLnB1c2goKTtcbiAgICAgICAgICAgIG5ld1JlZi5zZXQoe1xuICAgICAgICAgICAgICAgIHBsYXllcklkOiByZXEucXVlcnkucGxheWVySWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9HYW1lRmFjdG9yeS5nZXRDYXJkc0J5RGVja0lkIFxuXG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCA9IChpZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gaWQgfHwgJGxvY2FsU3RvcmFnZS50ZWFtLmlkIC8vKHR5cGVvZiBpZCAhPT0gJ251bWJlcicpID8gJGxvY2FsU3RvcmFnZS50ZWFtLmlkIDogaWQ7IC8vIHVzZXMgbG9jYWxzdG9yYWdlIHVubGVzcyBpZCBwYXJhbSBpcyBwcm92aWRlZFxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9kZWNrcy8ke3RlYW1JZH1gKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcblxuICAgICAgICB9O1xuXG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0VXNlcnNCeUdhbWVJZCA9IChnYW1lSWQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZ2FtZXMvJHtnYW1lSWR9L3VzZXJzYCk7XG4gICAgICAgIH07XG5cblxuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVCeUdhbWVJZCA9IChnYW1lSWQpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnN0IGRlZmVyID0gJHEuZGVmZXIoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGdhbWVJZCk7XG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAxO1xuICAgICAgICAgICAgY29uc3QgZ2FtZXNSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICByZXR1cm4gZ2FtZXNSZWYub25jZSgndmFsdWUnKS50aGVuKHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVEVTVDMnLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gc25hcHNob3QudmFsKCk7XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAvLyByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VGVhbUlkID0gKHRlYW1JZCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZSB0ZWFtIGlzIGlkJywgdGVhbUlkKVxuXG4gICAgICAgICAgICBjb25zdCBnYW1lc1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXNgKVxuICAgICAgICAgICAgcmV0dXJuIGdhbWVzUmVmLm9uY2UoJ3ZhbHVlJykudGhlbihzbmFwc2hvdCA9PiB7IC8vbWlnaHQgYnJlYWsgYWZ0ZXIgeW91IGRvIGl0IG9uY2VcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGhlIHZhbCBpcycsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgIHJldHVybiBzbmFwc2hvdC52YWwoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCA9ICh0ZWFtSWQpID0+IHtcbiAgICAgICAgICAgIHRlYW1JZCA9IHRlYW1JZCB8fCAkbG9jYWxTdG9yYWdlLnRlYW0uaWRcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGUgdGVhbSBpcyBpZCcsIHRlYW1JZClcbiAgICAgICAgICAgIGNvbnN0IGRlZmVyID0gJHEuZGVmZXIoKTtcblxuICAgICAgICAgICAgY29uc3QgZ2FtZXNSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzYClcbiAgICAgICAgICAgIGdhbWVzUmVmLm9uKCd2YWx1ZScsIHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGhlIHZhbCBpcycsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUoc25hcHNob3QudmFsKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRlZmVyIHByb21pc2VcIiwgZGVmZXIucHJvbWlzZSlcbiAgICAgICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlVc2VyID0gKHVzZXJJZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnaHR0cDovL2xvY2FsU3RvcmFnZToxMzM3L2FwaS9nYW1lcy8/dXNlcklkPScgKyB1c2VySWQpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4gR2FtZUZhY3Rvcnk7XG4gICAgfVxuXG4pO1xuXG4iLCJhcHAuZmFjdG9yeSgnTG9naW5GYWN0b3J5JywgZnVuY3Rpb24oJGh0dHApe1xuXHRyZXR1cm4ge1xuXHRcdGdldFNsYWNrQ3JlZHM6IGZ1bmN0aW9uKCl7XG5cdFx0XHRyZXR1cm4gJGh0dHAuZ2V0KCdodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL3NsYWNrJylcdFxuXHRcdFx0XHQudGhlbihyZXMgPT4ge1xuXHRcdFx0XHRcdHJldHVybiByZXMuZGF0YVxuXHRcdFx0XHR9KVxuXHRcdH1cblx0fVxufSlcbiIsImFwcC5mYWN0b3J5KCdVc2VyRmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCwgJHN0YXRlKXtcblx0XG5cdHJldHVybiB7XG5cdFx0c2V0VXNlcjogZnVuY3Rpb24oaW5mbyl7XG5cdFx0XHRyZXR1cm4gJGh0dHAoe1xuXHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdFx0dXJsOiAnaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS91c2VycycsXG5cdFx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRhdGE6IGluZm9cblx0XHRcdH0pXG5cdFx0XHQudGhlbihyZXMgPT4ge1xuXHRcdFx0XHR0aGlzLnNldExvY2FsU3RvcmFnZShyZXMuZGF0YS51c2VyWzBdLCByZXMuZGF0YS50ZWFtWzBdKTtcblx0XHRcdH0pXG5cdFx0fSxcblxuXHRcdGdldFNsYWNrSW5mbzogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiAkaHR0cC5nZXQoJ2h0dHBzOi8vc2xhY2suY29tL2FwaS91c2Vycy5pZGVudGl0eScpXG5cdFx0fSxcblxuXHRcdHNldExvY2FsU3RvcmFnZTogZnVuY3Rpb24odXNlciwgdGVhbSl7XG5cdFx0XHQkbG9jYWxTdG9yYWdlLnVzZXIgPSB1c2VyO1xuXHRcdFx0JGxvY2FsU3RvcmFnZS50ZWFtID0gdGVhbTtcblx0XHR9LFxuXG5cdFx0bG9nT3V0OiBmdW5jdGlvbigpe1xuXHRcdFx0JGxvY2FsU3RvcmFnZS4kcmVzZXQoKTtcblx0XHR9XG5cdH1cbn0pIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
