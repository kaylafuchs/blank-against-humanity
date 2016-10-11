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
    // $scope.createNewGame = () => {
    //     GameFactory.startNewGame()
    //     .then(() => {
    //         console.log('going to new state')
    //         $state.go('new-game.main')
    //     })
    // }

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
    $scope.currentView = 'addDecks';
    $scope.gameConfig = {};
    $scope.gameConfig.decks = {};
    $scope.goToDecks = function () {
        $state.go('new-game.add-decks', {}, { location: true, reload: true });
    };

    $scope.decks = standardDeck.concat(teamDecks);

    $scope.startNewGame = function (gameConfig) {
        GameFactory.startNewGame(gameConfig).then(function (id) {
            console.log('the game id is', id);
            $state.go('home'); //'game.pre-game', { 'gameId': 100 }
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
            apiKey: "AIzaSyD-tDevXvipyuE5lzheWARq4huu1UmqoJk",
            authDomain: "capstone-fb0e8.firebaseapp.com",
            databaseURL: "https://capstone-fb0e8.firebaseio.com",
            storageBucket: "capstone-fb0e8.appspot.com",
            messagingSenderId: "849839680107"
        };
        initializeFirebase();
    };

    GameFactory.startNewGame = function (gameConfig) {
        //can also get all the decks by team here to prepare
        console.log('the settings are:', gameConfig);
        var teamId = $localStorage.team.id || 2;
        var creatorId = $localStorage.user.id || 3;
        return $http.post('http://192.168.4.225:1337/api/games', {
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
                console.log('snapshot in gamefactory is:', snapshot.val());
                $rootScope.$broadcast('changedGame', snapshot.val());
            });
            return gameId;
        });
    };

    GameFactory.getCardsByDeckId = function (id) {
        return $http.get('http://192.168.4.236:1337/api/decks/' + id + '/cards').then(function (res) {
            console.log('res.data is:', res.data);
            return res.data;
        });
    };

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

<<<<<<< HEAD
    GameFactory.createGameByIdFireBase = function (firebasegameId) {
        //return $http.post(`http://localhost:1337/api/firebase/games/${gameId}`)
        //needs to be .thenable
        var newRef = firebase.database().ref('games/' + firebasegameId).push();
        newRef.set({
            playerId: req.query.playerId
        });
    };

    //GameFactory.getCardsByDeckId 


    GameFactory.getDecksByTeamId = function (teamId) {
        teamId = teamId || $localStorage.team.id;

        return $http.get('http://localhost:1337/api/decks/' + teamId).the(function (res) {
=======
    // GameFactory.createGameByIdFireBase = (firebasegameId) => {
    //     //return $http.post(`http://localhost:1337/api/firebase/games/${gameId}`)
    //     //needs to be .thenable
    //     const newRef = firebase.database().ref(`games/${firebasegameId}`).push();
    //     newRef.set({
    //         playerId: req.query.playerId
    //     });
    // }

    GameFactory.getDecksByTeamId = function (id) {
        var teamId = typeof id !== 'number' ? $localStorage.team.id : id; // id || localstorage doesn't work because 0 is falsey
        return $http.get('http://localhost:1337/api/decks?team=' + teamId).then(function (res) {
>>>>>>> master
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
<<<<<<< HEAD
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImNhcmRzLXRlc3QvY2FyZHNUZXN0LmpzIiwiZGVja3MvZGVja3MuanMiLCJmcm9tIGZzZy9mcm9tLWZzZy5qcyIsImdhbWUvZ2FtZS5qcyIsImhvbWUvaG9tZS5qcyIsImxvZ2luL2xvZ2luLmpzIiwibmV3LWdhbWUvbmV3LWdhbWUuanMiLCJ0ZWFtLWdhbWVzL3RlYW0tZ2FtZXMuanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiLCJjb21tb24vZmFjdG9yaWVzL0dhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9sb2dpbkZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yaWVzL3VzZXJGYWN0b3J5LmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImFwcCIsImFuZ3VsYXIiLCJtb2R1bGUiLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZUxpZ2h0Q29udGVudCIsImNvbnRyb2xsZXIiLCIkc2NvcGUiLCJVc2VyRmFjdG9yeSIsIiRzdGF0ZSIsIiRsb2NhbFN0b3JhZ2UiLCIkdGltZW91dCIsImxvZ091dCIsImdvIiwiY29uZmlnIiwiJHN0YXRlUHJvdmlkZXIiLCJzdGF0ZSIsInVybCIsInRlbXBsYXRlVXJsIiwiZ3JlZXRpbmciLCJyZXNvbHZlIiwiZGVja3MiLCJHYW1lRmFjdG9yeSIsIiRzdGF0ZVBhcmFtcyIsImdldERlY2tzQnlUZWFtSWQiLCJzdGF0ZVBhcmFtcyIsInRlYW1JZCIsImFic3RyYWN0IiwiZ2FtZSIsImdldEdhbWVCeUdhbWVJZCIsImdhbWVJZCIsImNvbnNvbGUiLCJsb2ciLCJuYW1lIiwic2V0dGluZ3MiLCJwbGF5ZXJDb3VudCIsIk9iamVjdCIsImtleXMiLCJwbGF5ZXJzIiwibGVuZ3RoIiwid2FpdGluZ0ZvclBsYXllcnMiLCJtaW5QbGF5ZXJzIiwid2hpdGVDYXJkcyIsInBpbGUiLCJ3aGl0ZWNhcmRzIiwiJHVybFJvdXRlclByb3ZpZGVyIiwiZ2FtZXMiLCJnZXRHYW1lc0J5VGVhbUlkIiwiJGNvcmRvdmFPYXV0aCIsInN0b3JhZ2UiLCJKU09OIiwic3RyaW5naWZ5IiwiJG9uIiwiZXZlbnQiLCJkYXRhIiwib3RoZXJ3aXNlIiwiTG9naW5GYWN0b3J5IiwiJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZSIsImxvZ2luV2l0aFNsYWNrIiwiZ2V0U2xhY2tDcmVkcyIsInRoZW4iLCJzbGFjayIsImNyZWRzIiwiY2xpZW50SUQiLCJjbGllbnRTZWNyZXQiLCJzZXRVc2VyIiwiaW5mbyIsImNhbkRyYWdDb250ZW50IiwicmVkaXJlY3RVc2VyIiwidXNlciIsInRlYW1EZWNrcyIsInN0YW5kYXJkRGVjayIsImNhcmRzIiwiZ2V0Q2FyZHNCeURlY2tJZCIsImRlY2tJZCIsInRlc3QiLCJjdXJyZW50VmlldyIsImdhbWVDb25maWciLCJnb1RvRGVja3MiLCJsb2NhdGlvbiIsInJlbG9hZCIsImNvbmNhdCIsInN0YXJ0TmV3R2FtZSIsImFkZERlY2tzVG9HYW1lIiwiYWRkRGVja3MiLCIkaW9uaWNQb3B1cCIsIiRkaWdlc3QiLCJzbmFwc2hvdCIsImpvaW5HYW1lIiwiam9pbkdhbWVCeUlkIiwic2hvd1BvcHVwIiwibXlQb3B1cCIsInNob3ciLCJ0ZW1wbGF0ZSIsInRpdGxlIiwic2NvcGUiLCJidXR0b25zIiwidGV4dCIsInR5cGUiLCJvblRhcCIsImZhY3RvcnkiLCIkaHR0cCIsIiRyb290U2NvcGUiLCIkcSIsImluaXRpYWxpemVGaXJlYmFzZSIsImFwaUtleSIsImF1dGhEb21haW4iLCJkYXRhYmFzZVVSTCIsInN0b3JhZ2VCdWNrZXQiLCJtZXNzYWdpbmdTZW5kZXJJZCIsImZpcmViYXNlIiwiaW5pdGlhbGl6ZUFwcCIsInRlYW0iLCJpZCIsImNyZWF0b3JJZCIsInBvc3QiLCJjcmVhdG9yTmFtZSIsInJlcyIsImdhbWVSZWYiLCJkYXRhYmFzZSIsInJlZiIsIm9uIiwidmFsIiwiJGJyb2FkY2FzdCIsImFkZENhcmRUb0dhbWUiLCJwbGF5ZXJJZCIsInBsYXllck5hbWUiLCJwbGF5ZXJSZWYiLCJzZXQiLCJjcmVhdGVHYW1lQnlJZEZpcmVCYXNlIiwiZmlyZWJhc2VnYW1lSWQiLCJuZXdSZWYiLCJwdXNoIiwicmVxIiwicXVlcnkiLCJnZXQiLCJ0aGUiLCJnZXRVc2Vyc0J5R2FtZUlkIiwiZ2FtZXNSZWYiLCJvbmNlIiwiZGVmZXIiLCJwcm9taXNlIiwiZ2V0R2FtZXNCeVVzZXIiLCJ1c2VySWQiLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0TG9jYWxTdG9yYWdlIiwiZ2V0U2xhY2tJbmZvIiwiJHJlc2V0Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBQSxPQUFBQyxHQUFBLEdBQUFDLFFBQUFDLE1BQUEsQ0FBQSxzQkFBQSxFQUFBLENBQUEsT0FBQSxFQUFBLFdBQUEsRUFBQSxXQUFBLEVBQUEsZ0JBQUEsRUFBQSxXQUFBLEVBQUEsY0FBQSxDQUFBLENBQUE7O0FBRUFGLElBQUFHLEdBQUEsQ0FBQSxVQUFBQyxjQUFBLEVBQUE7QUFDQUEsbUJBQUFDLEtBQUEsQ0FBQSxZQUFBO0FBQ0EsWUFBQU4sT0FBQU8sT0FBQSxJQUFBUCxPQUFBTyxPQUFBLENBQUFDLE9BQUEsQ0FBQUMsUUFBQSxFQUFBO0FBQ0E7QUFDQTtBQUNBRixvQkFBQUMsT0FBQSxDQUFBQyxRQUFBLENBQUFDLHdCQUFBLENBQUEsSUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQUgsb0JBQUFDLE9BQUEsQ0FBQUMsUUFBQSxDQUFBRSxhQUFBLENBQUEsSUFBQTtBQUNBO0FBQ0EsWUFBQVgsT0FBQVksU0FBQSxFQUFBO0FBQ0FBLHNCQUFBQyxpQkFBQTtBQUNBO0FBQ0EsS0FkQTtBQWdCQSxDQWpCQTs7QUNQQVosSUFBQWEsVUFBQSxDQUFBLFlBQUEsRUFBQSxVQUFBQyxNQUFBLEVBQUFDLFdBQUEsRUFBQUMsTUFBQSxFQUFB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QTtBQU1BM0Ysc0JBQUFZO0FBTkEsYUFBQSxFQVFBTixJQVJBLENBUUEsZUFBQTtBQUNBLHNCQUFBc0YsZUFBQSxDQUFBN0IsSUFBQS9ELElBQUEsQ0FBQWUsSUFBQSxDQUFBLENBQUEsQ0FBQSxFQUFBZ0QsSUFBQS9ELElBQUEsQ0FBQTBELElBQUEsQ0FBQSxDQUFBLENBQUE7QUFDQSxhQVZBLENBQUE7QUFXQSxTQWJBOztBQWVBbUMsc0JBQUEsd0JBQUE7QUFDQSxtQkFBQTlDLE1BQUFrQyxHQUFBLENBQUEsc0NBQUEsQ0FBQTtBQUNBLFNBakJBOztBQW1CQVcseUJBQUEseUJBQUE3RSxJQUFBLEVBQUEyQyxJQUFBLEVBQUE7QUFDQXRHLDBCQUFBMkQsSUFBQSxHQUFBQSxJQUFBO0FBQ0EzRCwwQkFBQXNHLElBQUEsR0FBQUEsSUFBQTtBQUNBLFNBdEJBOztBQXdCQXBHLGdCQUFBLGtCQUFBO0FBQ0FGLDBCQUFBMEksTUFBQTtBQUNBO0FBMUJBLEtBQUE7QUE0QkEsQ0E5QkEiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIElvbmljIFN0YXJ0ZXIgQXBwXG5cbi8vIGFuZ3VsYXIubW9kdWxlIGlzIGEgZ2xvYmFsIHBsYWNlIGZvciBjcmVhdGluZywgcmVnaXN0ZXJpbmcgYW5kIHJldHJpZXZpbmcgQW5ndWxhciBtb2R1bGVzXG4vLyAnc3RhcnRlcicgaXMgdGhlIG5hbWUgb2YgdGhpcyBhbmd1bGFyIG1vZHVsZSBleGFtcGxlIChhbHNvIHNldCBpbiBhIDxib2R5PiBhdHRyaWJ1dGUgaW4gaW5kZXguaHRtbClcbi8vIHRoZSAybmQgcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9mICdyZXF1aXJlcydcbndpbmRvdy5hcHAgPSBhbmd1bGFyLm1vZHVsZSgnQmxhbmtBZ2FpbnN0SHVtYW5pdHknLCBbJ2lvbmljJywgJ3VpLnJvdXRlcicsJ25nQ29yZG92YScsJ25nQ29yZG92YU9hdXRoJywgJ25nU3RvcmFnZScsICd1aS5ib290c3RyYXAnXSlcblxuYXBwLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxuICAgICAgICAgICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcblxuICAgICAgICAgICAgLy8gRG9uJ3QgcmVtb3ZlIHRoaXMgbGluZSB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nLiBJdCBzdG9wcyB0aGUgdmlld3BvcnRcbiAgICAgICAgICAgIC8vIGZyb20gc25hcHBpbmcgd2hlbiB0ZXh0IGlucHV0cyBhcmUgZm9jdXNlZC4gSW9uaWMgaGFuZGxlcyB0aGlzIGludGVybmFsbHkgZm9yXG4gICAgICAgICAgICAvLyBhIG11Y2ggbmljZXIga2V5Ym9hcmQgZXhwZXJpZW5jZS5cbiAgICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5kaXNhYmxlU2Nyb2xsKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICAgICAgICBTdGF0dXNCYXIuc3R5bGVMaWdodENvbnRlbnQoKVxuICAgICAgICB9XG4gICAgfSk7XG5cbn0pXG4iLCJhcHAuY29udHJvbGxlcignTG9nb3V0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgVXNlckZhY3RvcnksICRzdGF0ZSwgJGxvY2FsU3RvcmFnZSwgJHRpbWVvdXQpe1xuXHQkc2NvcGUubG9nT3V0ID0gZnVuY3Rpb24oKXtcblx0XHRVc2VyRmFjdG9yeS5sb2dPdXQoKVxuXHRcdCRzdGF0ZS5nbygnbG9naW4nKVxuXHR9XG59KSIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIpe1xuXHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnY2FyZHMnLCB7XG5cdFx0dXJsOiAnL2NhcmRzJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2NhcmRzLXRlc3QvY2FyZHMtdGVzdC5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnQ2FyZHNUZXN0Q3RybCdcblx0fSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdDYXJkc1Rlc3RDdHJsJywgZnVuY3Rpb24oJHNjb3BlKXtcbiBcdCRzY29wZS5ncmVldGluZyA9IFwiSElcIlxufSkiLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlcikgPT4ge1xuXHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnZGVja3MnLCB7XG5cdFx0dXJsOiAnZGVja3MvOnRlYW1pZCcsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9kZWNrcy9kZWNrcy5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnRGVja0N0cmwnLFxuXHRcdHJlc29sdmU6IHtcblx0XHRcdGRlY2tzOiAoR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcykgPT4gR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZChzdGF0ZVBhcmFtcy50ZWFtSWQpXG5cdFx0fVxuXHR9KVxuXG59KVxuXG5hcHAuY29udHJvbGxlcignRGVja0N0cmwnLCAoJHNjb3BlKSA9PiB7XG5cblxuXHRcbn0pIiwiLy8gKGZ1bmN0aW9uICgpIHtcblxuLy8gICAgICd1c2Ugc3RyaWN0JztcblxuLy8gICAgIC8vIEhvcGUgeW91IGRpZG4ndCBmb3JnZXQgQW5ndWxhciEgRHVoLWRveS5cbi8vICAgICBpZiAoIXdpbmRvdy5hbmd1bGFyKSB0aHJvdyBuZXcgRXJyb3IoJ0kgY2FuXFwndCBmaW5kIEFuZ3VsYXIhJyk7XG5cbi8vICAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2ZzYVByZUJ1aWx0JywgW10pO1xuXG4vLyAgICAgYXBwLmZhY3RvcnkoJ1NvY2tldCcsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgaWYgKCF3aW5kb3cuaW8pIHRocm93IG5ldyBFcnJvcignc29ja2V0LmlvIG5vdCBmb3VuZCEnKTtcbi8vICAgICAgICAgcmV0dXJuIHdpbmRvdy5pbyh3aW5kb3cubG9jYXRpb24ub3JpZ2luKTtcbi8vICAgICB9KTtcblxuLy8gICAgIC8vIEFVVEhfRVZFTlRTIGlzIHVzZWQgdGhyb3VnaG91dCBvdXIgYXBwIHRvXG4vLyAgICAgLy8gYnJvYWRjYXN0IGFuZCBsaXN0ZW4gZnJvbSBhbmQgdG8gdGhlICRyb290U2NvcGVcbi8vICAgICAvLyBmb3IgaW1wb3J0YW50IGV2ZW50cyBhYm91dCBhdXRoZW50aWNhdGlvbiBmbG93LlxuLy8gICAgIGFwcC5jb25zdGFudCgnQVVUSF9FVkVOVFMnLCB7XG4vLyAgICAgICAgIGxvZ2luU3VjY2VzczogJ2F1dGgtbG9naW4tc3VjY2VzcycsXG4vLyAgICAgICAgIGxvZ2luRmFpbGVkOiAnYXV0aC1sb2dpbi1mYWlsZWQnLFxuLy8gICAgICAgICBsb2dvdXRTdWNjZXNzOiAnYXV0aC1sb2dvdXQtc3VjY2VzcycsXG4vLyAgICAgICAgIHNlc3Npb25UaW1lb3V0OiAnYXV0aC1zZXNzaW9uLXRpbWVvdXQnLFxuLy8gICAgICAgICBub3RBdXRoZW50aWNhdGVkOiAnYXV0aC1ub3QtYXV0aGVudGljYXRlZCcsXG4vLyAgICAgICAgIG5vdEF1dGhvcml6ZWQ6ICdhdXRoLW5vdC1hdXRob3JpemVkJ1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLmZhY3RvcnkoJ0F1dGhJbnRlcmNlcHRvcicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkcSwgQVVUSF9FVkVOVFMpIHtcbi8vICAgICAgICAgdmFyIHN0YXR1c0RpY3QgPSB7XG4vLyAgICAgICAgICAgICA0MDE6IEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsXG4vLyAgICAgICAgICAgICA0MDM6IEFVVEhfRVZFTlRTLm5vdEF1dGhvcml6ZWQsXG4vLyAgICAgICAgICAgICA0MTk6IEFVVEhfRVZFTlRTLnNlc3Npb25UaW1lb3V0LFxuLy8gICAgICAgICAgICAgNDQwOiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dFxuLy8gICAgICAgICB9O1xuLy8gICAgICAgICByZXR1cm4ge1xuLy8gICAgICAgICAgICAgcmVzcG9uc2VFcnJvcjogZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KHN0YXR1c0RpY3RbcmVzcG9uc2Uuc3RhdHVzXSwgcmVzcG9uc2UpO1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzcG9uc2UpXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH07XG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuY29uZmlnKGZ1bmN0aW9uICgkaHR0cFByb3ZpZGVyKSB7XG4vLyAgICAgICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goW1xuLy8gICAgICAgICAgICAgJyRpbmplY3RvcicsXG4vLyAgICAgICAgICAgICBmdW5jdGlvbiAoJGluamVjdG9yKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRpbmplY3Rvci5nZXQoJ0F1dGhJbnRlcmNlcHRvcicpO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICBdKTtcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5zZXJ2aWNlKCdBdXRoU2VydmljZScsIGZ1bmN0aW9uICgkaHR0cCwgU2Vzc2lvbiwgJHJvb3RTY29wZSwgQVVUSF9FVkVOVFMsICRxKSB7XG5cbi8vICAgICAgICAgZnVuY3Rpb24gb25TdWNjZXNzZnVsTG9naW4ocmVzcG9uc2UpIHtcbi8vICAgICAgICAgICAgIHZhciB1c2VyID0gcmVzcG9uc2UuZGF0YS51c2VyO1xuLy8gICAgICAgICAgICAgU2Vzc2lvbi5jcmVhdGUodXNlcik7XG4vLyAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoQVVUSF9FVkVOVFMubG9naW5TdWNjZXNzKTtcbi8vICAgICAgICAgICAgIHJldHVybiB1c2VyO1xuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgLy8gVXNlcyB0aGUgc2Vzc2lvbiBmYWN0b3J5IHRvIHNlZSBpZiBhblxuLy8gICAgICAgICAvLyBhdXRoZW50aWNhdGVkIHVzZXIgaXMgY3VycmVudGx5IHJlZ2lzdGVyZWQuXG4vLyAgICAgICAgIHRoaXMuaXNBdXRoZW50aWNhdGVkID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuICEhU2Vzc2lvbi51c2VyO1xuLy8gICAgICAgICB9O1xuXG4gICAgICAgIFxuLy8gICAgICAgICB0aGlzLmlzQWRtaW4gPSBmdW5jdGlvbih1c2VySWQpe1xuLy8gICAgICAgICAgICAgY29uc29sZS5sb2coJ3J1bm5pbmcgYWRtaW4gZnVuYycpXG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpXG4vLyAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhLnVzZXIuaXNBZG1pbilcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIHRoaXMuZ2V0TG9nZ2VkSW5Vc2VyID0gZnVuY3Rpb24gKGZyb21TZXJ2ZXIpIHtcblxuLy8gICAgICAgICAgICAgLy8gSWYgYW4gYXV0aGVudGljYXRlZCBzZXNzaW9uIGV4aXN0cywgd2Vcbi8vICAgICAgICAgICAgIC8vIHJldHVybiB0aGUgdXNlciBhdHRhY2hlZCB0byB0aGF0IHNlc3Npb25cbi8vICAgICAgICAgICAgIC8vIHdpdGggYSBwcm9taXNlLiBUaGlzIGVuc3VyZXMgdGhhdCB3ZSBjYW5cbi8vICAgICAgICAgICAgIC8vIGFsd2F5cyBpbnRlcmZhY2Ugd2l0aCB0aGlzIG1ldGhvZCBhc3luY2hyb25vdXNseS5cblxuLy8gICAgICAgICAgICAgLy8gT3B0aW9uYWxseSwgaWYgdHJ1ZSBpcyBnaXZlbiBhcyB0aGUgZnJvbVNlcnZlciBwYXJhbWV0ZXIsXG4vLyAgICAgICAgICAgICAvLyB0aGVuIHRoaXMgY2FjaGVkIHZhbHVlIHdpbGwgbm90IGJlIHVzZWQuXG5cbi8vICAgICAgICAgICAgIGlmICh0aGlzLmlzQXV0aGVudGljYXRlZCgpICYmIGZyb21TZXJ2ZXIgIT09IHRydWUpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbihTZXNzaW9uLnVzZXIpO1xuLy8gICAgICAgICAgICAgfVxuXG4vLyAgICAgICAgICAgICAvLyBNYWtlIHJlcXVlc3QgR0VUIC9zZXNzaW9uLlxuLy8gICAgICAgICAgICAgLy8gSWYgaXQgcmV0dXJucyBhIHVzZXIsIGNhbGwgb25TdWNjZXNzZnVsTG9naW4gd2l0aCB0aGUgcmVzcG9uc2UuXG4vLyAgICAgICAgICAgICAvLyBJZiBpdCByZXR1cm5zIGEgNDAxIHJlc3BvbnNlLCB3ZSBjYXRjaCBpdCBhbmQgaW5zdGVhZCByZXNvbHZlIHRvIG51bGwuXG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvc2Vzc2lvbicpLnRoZW4ob25TdWNjZXNzZnVsTG9naW4pLmNhdGNoKGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbi8vICAgICAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5sb2dpbiA9IGZ1bmN0aW9uIChjcmVkZW50aWFscykge1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9sb2dpbicsIGNyZWRlbnRpYWxzKVxuLy8gICAgICAgICAgICAgICAgIC50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKVxuLy8gICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QoeyBtZXNzYWdlOiAnSW52YWxpZCBsb2dpbiBjcmVkZW50aWFscy4nfSk7XG4vLyAgICAgICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5zaWdudXAgPSBmdW5jdGlvbihjcmVkZW50aWFscyl7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAoe1xuLy8gICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuLy8gICAgICAgICAgICAgICAgIHVybDogJy9zaWdudXAnLFxuLy8gICAgICAgICAgICAgICAgIGRhdGE6IGNyZWRlbnRpYWxzXG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICAgICAgLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5kYXRhKVxuLy8gICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKCl7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdCh7bWVzc2FnZTogJ1RoYXQgZW1haWwgaXMgYWxyZWFkeSBiZWluZyB1c2VkLid9KTtcbi8vICAgICAgICAgICAgIH0pXG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5sb2dvdXQgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvbG9nb3V0JykudGhlbihmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgU2Vzc2lvbi5kZXN0cm95KCk7XG4vLyAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ291dFN1Y2Nlc3MpO1xuLy8gICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5zZXJ2aWNlKCdTZXNzaW9uJywgZnVuY3Rpb24gKCRyb290U2NvcGUsIEFVVEhfRVZFTlRTKSB7XG5cbi8vICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4vLyAgICAgICAgICRyb290U2NvcGUuJG9uKEFVVEhfRVZFTlRTLm5vdEF1dGhlbnRpY2F0ZWQsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCwgZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgc2VsZi5kZXN0cm95KCk7XG4vLyAgICAgICAgIH0pO1xuXG4vLyAgICAgICAgIHRoaXMudXNlciA9IG51bGw7XG5cbi8vICAgICAgICAgdGhpcy5jcmVhdGUgPSBmdW5jdGlvbiAodXNlcikge1xuLy8gICAgICAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcbi8vICAgICAgICAgfTtcblxuLy8gICAgICAgICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgfSk7XG5cbi8vIH0oKSk7XG4iLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlcikgPT4ge1xuXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2dhbWUnLCB7XG4gICAgICAgIHVybDogJy9nYW1lJyxcbiAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvZ2FtZS9nYW1lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnR2FtZUN0cmwnLFxuICAgIH0pXG4gICAgLnN0YXRlKCdnYW1lLnByZS1nYW1lJywge1xuICAgICAgICB1cmw6ICcvOmdhbWVJZC9wcmUtZ2FtZScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvZ2FtZS9wcmUtZ2FtZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ1ByZUdhbWVDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgZ2FtZSA6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXRHYW1lQnlHYW1lSWQoJHN0YXRlUGFyYW1zLmdhbWVJZClcbiAgICAgICAgfVxuICAgIH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignR2FtZUN0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSkgPT4ge1xuICAgXG59KVxuXG5hcHAuY29udHJvbGxlcihcIlByZUdhbWVDdHJsXCIsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCBnYW1lKSA9PiB7XG5cbiAgICAvLyAkc2NvcGUuJG9uKCdjaGFuZ2VkR2FtZScsIChldmVudCxzbmFwc2hvdCkgPT4ge1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhzbmFwc2hvdCk7XG4gICAgLy8gICAgICRzY29wZS5uYW1lID0gc25hcHNob3QubmFtZTtcbiAgICAvLyAgICAgJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAvLyB9KVxuXG4gICAgY29uc29sZS5sb2coZ2FtZSk7XG4gICAgJHNjb3BlLmdhbWUgPSBnYW1lO1xuICAgICRzY29wZS5uYW1lID0gZ2FtZS5zZXR0aW5ncy5uYW1lO1xuICAgICRzY29wZS5wbGF5ZXJDb3VudCA9IE9iamVjdC5rZXlzKGdhbWUucGxheWVycykubGVuZ3RoO1xuICAgICRzY29wZS53YWl0aW5nRm9yUGxheWVycyA9ICBnYW1lLnNldHRpbmdzLm1pblBsYXllcnMgLSAkc2NvcGUucGxheWVyQ291bnQ7XG4gICAgJHNjb3BlLndoaXRlQ2FyZHMgPSBnYW1lLnBpbGUud2hpdGVjYXJkcztcbiAgIFxuICAgIFxufSlcblxuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2hvbWUnLCB7XG4gICAgICAgIHVybDogJy8nLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2hvbWUvaG9tZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgZ2FtZXM6IGZ1bmN0aW9uKEdhbWVGYWN0b3J5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdIb21lQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCAkY29yZG92YU9hdXRoLCBVc2VyRmFjdG9yeSwgR2FtZUZhY3RvcnksICRsb2NhbFN0b3JhZ2UsIGdhbWVzKSB7XG4gICAgJHNjb3BlLnN0b3JhZ2UgPSAkbG9jYWxTdG9yYWdlO1xuICAgICRzY29wZS5nYW1lcyA9IGdhbWVzO1xuICAgIGNvbnNvbGUubG9nKFwiZ2FtZXNcIiwgSlNPTi5zdHJpbmdpZnkoJHNjb3BlLmdhbWVzKSlcblxuICAgIC8vIC8vIGdldCBnYW1lcyBmcm9tIHBvc3RncmVzXG4gICAgLy8gR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVVzZXIoKVxuICAgIC8vIC50aGVuKGdhbWVzID0+IHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coXCJnYW1lcyBmb3VuZDpcIiwgZ2FtZXMpXG4gICAgLy8gICAgICRzY29wZS5nYW1lcyA9IGdhbWVzO1xuICAgIC8vIH0pXG5cbiAgICAvL2dldCBnYW1lcyBmcm9tIGZpcmViYXNlXG4gICAgLy8gR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCgkc2NvcGUuc3RvcmFnZS50ZWFtLmlkKVxuICAgIC8vIC50aGVuKGdhbWVzID0+IHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coXCJ0aGUgZ2FtZXMgYXJlOlwiLCBnYW1lcylcbiAgICAvLyAgICAgJHNjb3BlLmdhbWVzID0gZ2FtZXM7XG4gICAgLy8gfSlcblxuICAgIC8vJHNjb3BlLnN0YXJ0TmV3R2FtZSA9IEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZTtcbiAgICAvLyAkc2NvcGUuY3JlYXRlTmV3R2FtZSA9ICgpID0+IHtcbiAgICAvLyAgICAgR2FtZUZhY3Rvcnkuc3RhcnROZXdHYW1lKClcbiAgICAvLyAgICAgLnRoZW4oKCkgPT4ge1xuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coJ2dvaW5nIHRvIG5ldyBzdGF0ZScpXG4gICAgLy8gICAgICAgICAkc3RhdGUuZ28oJ25ldy1nYW1lLm1haW4nKVxuICAgIC8vICAgICB9KVxuICAgIC8vIH1cblxuICAgICRzY29wZS4kb24oJ2NoYW5nZWRHYW1lJywgKGV2ZW50LCBkYXRhKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZWNlaXZlZCBldmVudCBpbiBob21lJylcbiAgICAgICAgY29uc29sZS5sb2coJ2RhdGEgb2JqOicsIGRhdGEpXG4gICAgICAgICAgICAvLyRzY29wZS5nYW1lID0gZGF0YTtcbiAgICAgICAgICAgIC8vICRzY29wZS4kZGlnZXN0KClcblxuICAgIH0pXG59KVxuXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpe1xuXHQkc3RhdGVQcm92aWRlci5zdGF0ZSgnbG9naW4nLCB7XG5cdFx0dXJsOiAnL2xvZ2luJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL2xvZ2luL2xvZ2luLmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdMb2dpbkN0cmwnXG5cdH0pXG5cdCR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9sb2dpbicpO1xufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0xvZ2luQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlLCBMb2dpbkZhY3RvcnksIFVzZXJGYWN0b3J5LCAkY29yZG92YU9hdXRoLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCwgJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZSl7XG4gXHQkc2NvcGUubG9naW5XaXRoU2xhY2sgPSBmdW5jdGlvbigpe1xuIFx0XHRyZXR1cm4gTG9naW5GYWN0b3J5LmdldFNsYWNrQ3JlZHMoKVxuIFx0XHQudGhlbihjcmVkcyA9PntcbiBcdFx0XHRyZXR1cm4gJGNvcmRvdmFPYXV0aC5zbGFjayhjcmVkcy5jbGllbnRJRCwgY3JlZHMuY2xpZW50U2VjcmV0LCBbJ2lkZW50aXR5LmJhc2ljJywgJ2lkZW50aXR5LnRlYW0nLCAnaWRlbnRpdHkuYXZhdGFyJ10pXG4gXHRcdH0pXG4gXHRcdC50aGVuKGluZm8gPT4gVXNlckZhY3Rvcnkuc2V0VXNlcihpbmZvKSlcbiBcdFx0LnRoZW4oKCkgPT4gJHN0YXRlLmdvKCdob21lJykpXG4gXHR9XG5cbiBcdCRpb25pY1NpZGVNZW51RGVsZWdhdGUuY2FuRHJhZ0NvbnRlbnQoZmFsc2UpO1xuXG4gXHQkc2NvcGUuJG9uKCckaW9uaWNWaWV3LmxlYXZlJywgZnVuY3Rpb24gKCkgeyAkaW9uaWNTaWRlTWVudURlbGVnYXRlLmNhbkRyYWdDb250ZW50KHRydWUpIH0pO1xuXG4gXHQkc2NvcGUuc3RvcmFnZSA9ICRsb2NhbFN0b3JhZ2VcblxuIFx0ZnVuY3Rpb24gcmVkaXJlY3RVc2VyKCl7XG4gXHRcdGNvbnNvbGUubG9nKFwic2NvcGUgc3RvcmFnZSB1c2VyXCIsICRzY29wZS5zdG9yYWdlLnVzZXIpXG4gXHRcdGlmICgkc2NvcGUuc3RvcmFnZS51c2VyKSAkc3RhdGUuZ28oJ2hvbWUnKVxuIFx0fVxuXG5cdHJlZGlyZWN0VXNlcigpO1xufSkiLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSA9PiB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnbmV3LWdhbWUnLCB7XG4gICAgICAgIHVybDogJy9uZXctZ2FtZScsXG4gICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL21haW4uaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdOZXdHYW1lQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIHRlYW1EZWNrczogKEdhbWVGYWN0b3J5KSA9PiBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkKCksXG4gICAgICAgICAgICBzdGFuZGFyZERlY2s6IChHYW1lRmFjdG9yeSkgPT4gR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCgwKVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIC5zdGF0ZSgnbmV3LWdhbWUubWFpbicsIHtcbiAgICAgICAgdXJsOiAnL3NldHVwLWdhbWUnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL25ldy1nYW1lLmh0bWwnLFxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ25ldy1nYW1lLmFkZC1kZWNrcycsIHtcbiAgICAgICAgdXJsOiAnL2FkZC1kZWNrcycsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvYWRkLWRlY2tzLmh0bWwnLFxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ25ldy1nYW1lLmRlY2snLCB7XG4gICAgICAgIHVybDogJy9kZWNrLzpkZWNrSWQnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL2RlY2suaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdEZWNrQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGNhcmRzOiAoR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcykgPT4gR2FtZUZhY3RvcnkuZ2V0Q2FyZHNCeURlY2tJZCgkc3RhdGVQYXJhbXMuZGVja0lkKVxuICAgICAgICB9XG4gICAgfSlcblxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9uZXctZ2FtZS9zZXR1cC1nYW1lJyk7XG59KVxuXG5hcHAuY29udHJvbGxlcignTmV3R2FtZUN0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgJHN0YXRlLCB0ZWFtRGVja3MsIHN0YW5kYXJkRGVjaykgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdjdXJyZScsICRzY29wZSlcbiAgICAkc2NvcGUudGVzdCA9IDEzNDUyMzQ1MjNcbiAgICAkc2NvcGUuY3VycmVudFZpZXcgPSAnYWRkRGVja3MnXG4gICAgJHNjb3BlLmdhbWVDb25maWcgPSB7fTtcbiAgICAkc2NvcGUuZ2FtZUNvbmZpZy5kZWNrcyA9IHt9O1xuICAgICRzY29wZS5nb1RvRGVja3MgPSAoKSA9PiB7XG4gICAgICAgICRzdGF0ZS5nbygnbmV3LWdhbWUuYWRkLWRlY2tzJywge30sIHsgbG9jYXRpb246IHRydWUsIHJlbG9hZDogdHJ1ZSB9KVxuICAgIH1cblxuICAgICRzY29wZS5kZWNrcyA9IHN0YW5kYXJkRGVjay5jb25jYXQodGVhbURlY2tzKTtcblxuICAgICRzY29wZS5zdGFydE5ld0dhbWUgPSBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWU7XG4gICAgJHNjb3BlLmFkZERlY2tzVG9HYW1lID0gR2FtZUZhY3RvcnkuYWRkRGVja3M7XG4gICAgLy8gJHNjb3BlLiRvbignY2hhbmdlZEdhbWUnLCAoZXZlbnQsIGRhdGEpID0+IHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ3JlY2VpdmVkIGV2ZW50JylcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ2RhdGEgb2JqOicsIGRhdGEpXG4gICAgLy8gICAgICRzY29wZS5nYW1lID0gZGF0YTtcbiAgICAvLyAgICAgJHNjb3BlLiRkaWdlc3QoKVxuXG4gICAgLy8gfSlcblxuXG59KVxuXG5hcHAuY29udHJvbGxlcignRGVja0N0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgJHN0YXRlLCBjYXJkcykgPT4ge1xuICAgICRzY29wZS5jYXJkcyA9IGNhcmRzXG59KVxuXG4iLCJhcHAuY29uZmlnKCgkc3RhdGVQcm92aWRlcikgPT4ge1xuXHQkc3RhdGVQcm92aWRlci5zdGF0ZSgndGVhbS1nYW1lcycsIHtcblx0XHR1cmw6ICcvdGVhbS1nYW1lcycsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy90ZWFtLWdhbWVzL3RlYW0tZ2FtZXMuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ1RlYW1HYW1lc0N0cmwnLFxuXHR9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ1RlYW1HYW1lc0N0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgJGlvbmljUG9wdXAsICR0aW1lb3V0LCAkc3RhdGUpID0+IHtcblx0IFxuXHQgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCgnMScpXG5cdCBcdC50aGVuKGdhbWVzID0+IHtcblx0IFx0XHQkc2NvcGUuZ2FtZXMgPSBnYW1lcztcblx0IFx0XHQkc2NvcGUuJGRpZ2VzdCgpO1xuXHQgXHR9KVxuXG5cdCBcblx0ICRzY29wZS4kb24oJ2NoYW5nZWRHYW1lJywgKGV2ZW50LHNuYXBzaG90KSA9Pntcblx0IFx0JHNjb3BlLm5hbWU9IHNuYXBzaG90Lm5hbWU7XG5cdCBcdCRzY29wZS4kZGlnZXN0KCk7XG5cdCB9KVxuXG5cdCAkc2NvcGUuam9pbkdhbWUgPSBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWQ7XG5cblx0ICRzY29wZS5zaG93UG9wdXAgPSBmdW5jdGlvbiAoZ2FtZUlkKSB7XG5cdCAgICAgXG5cdCAgICAgY29uc3QgbXlQb3B1cCA9ICRpb25pY1BvcHVwLnNob3coe1xuXHQgICAgIFx0dGVtcGxhdGU6ICc8cD5JbmZvcm1hdGlvbjwvcD4nLFxuXHQgICAgIFx0dGl0bGU6ICdHYW1lIEluZm9ybWF0aW9uJyxcblx0ICAgICBcdHNjb3BlOiAkc2NvcGUsXG5cdCAgICAgXHRidXR0b25zOiBbXG5cdCAgICAgXHRcdHt0ZXh0OiAnQ2FuY2VsJ30sXG5cdCAgICAgXHRcdHtcblx0ICAgICBcdFx0XHR0ZXh0OiAnPGI+Sm9pbjwvYj4nLFxuXHQgICAgIFx0XHQgXHR0eXBlOiAnYnV0dG9uLXBvc2l0aXZlJyxcblx0ICAgICBcdFx0IFx0b25UYXA6IGUgPT4ge1xuXHQgICAgIFx0XHQgXHRcdGNvbnNvbGUubG9nKGdhbWVJZCk7XG5cdCAgICAgXHRcdCBcdFx0JHNjb3BlLmpvaW5HYW1lKGdhbWVJZCk7XG5cdCAgICAgXHRcdCBcdFx0JHN0YXRlLmdvKCdnYW1lLnByZS1nYW1lJywge2dhbWVJZDogZ2FtZUlkfSlcblx0ICAgICBcdFx0IFx0fVxuXHQgICAgIFx0XHR9XG5cdFx0XHRdXG5cdCAgICB9KVxuXHQgfVxufSlcbiIsIi8vRGlyZWN0aXZlIEZpbGUiLCJhcHAuZmFjdG9yeSgnR2FtZUZhY3RvcnknLCAoJGh0dHAsICRyb290U2NvcGUsICRsb2NhbFN0b3JhZ2UsICRxKSA9PiB7XG5cbiAgICAgICAgY29uc3QgR2FtZUZhY3RvcnkgPSB7fTtcblxuICAgICAgICBjb25zdCBpbml0aWFsaXplRmlyZWJhc2UgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgICAgICAgICAgICAgIGFwaUtleTogXCJBSXphU3lBdlE3eVE3ZktJVVVPeEVxSFAyLWhDQkx6dU1rZG9Ya29cIixcbiAgICAgICAgICAgICAgICAgICAgYXV0aERvbWFpbjogXCJibGFuay1hZ2FpbnN0LWh1bWFuaXR5LWQ5Y2JmLmZpcmViYXNlYXBwLmNvbVwiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhYmFzZVVSTDogXCJodHRwczovL2JsYW5rLWFnYWluc3QtaHVtYW5pdHktZDljYmYuZmlyZWJhc2Vpby5jb21cIixcbiAgICAgICAgICAgICAgICAgICAgc3RvcmFnZUJ1Y2tldDogXCJibGFuay1hZ2FpbnN0LWh1bWFuaXR5LWQ5Y2JmLmFwcHNwb3QuY29tXCIsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjc3ODEwODA3MTY0NlwiXG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChjb25maWcpO1xuICAgICAgICB9O1xuICAgICAgICBpbml0aWFsaXplRmlyZWJhc2UoKTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWUgPSAoZ2FtZUNvbmZpZykgPT4ge1xuICAgICAgICAgICAgLy9jYW4gYWxzbyBnZXQgYWxsIHRoZSBkZWNrcyBieSB0ZWFtIGhlcmUgdG8gcHJlcGFyZVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZSBzZXR0aW5ncyBhcmU6JywgZ2FtZUNvbmZpZylcbiAgICAgICAgICAgIGNvbnN0IHRlYW1JZCA9ICRsb2NhbFN0b3JhZ2UudGVhbS5pZCB8fCAyO1xuICAgICAgICAgICAgY29uc3QgY3JlYXRvcklkID0gJGxvY2FsU3RvcmFnZS51c2VyLmlkIHx8IDM7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnaHR0cDovLzE5Mi4xNjguNC4yMjU6MTMzNy9hcGkvZ2FtZXMnLCB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGdhbWVDb25maWcubmFtZSB8fCAnQm9yaW5nIE5hbWUnLFxuICAgICAgICAgICAgICAgICAgICB0ZWFtSWQ6IHRlYW1JZCxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvcklkOiBjcmVhdG9ySWQsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0b3JOYW1lOiAkbG9jYWxTdG9yYWdlLnVzZXIubmFtZSB8fCAnZGFuJywgLy9taWdodCBiZSB1bm5lY2Vzc2FyeSBpZiB3ZSBoYXZlIHRoZSB1c2VyIGlkXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiBnYW1lQ29uZmlnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgLnRoZW4oZ2FtZUlkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGAvdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICAgICAgICAgIGdhbWVSZWYub24oJ3ZhbHVlJywgc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NuYXBzaG90IGlzOicsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdjaGFuZ2VkR2FtZScsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgIH07XG5cblxuICAgICAgICBHYW1lRmFjdG9yeS5hZGRDYXJkVG9HYW1lID0gKGdhbWVJZCkgPT4ge1xuXG4gICAgICAgIH1cblxuICAgICAgICBHYW1lRmFjdG9yeS5hZGREZWNrc1RvR2FtZSA9IChnYW1lSWQsIGRlY2tzKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChgYXBpL2dhbWVzLyR7Z2FtZUlkfS9kZWNrc2AsIGRlY2tzKVxuXG4gICAgICAgICAgICAvLyBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH0vcGlsZS9gKVxuICAgICAgICAgICAgLy8gZ2FtZVJlZi5zZXQoe1xuICAgICAgICAgICAgLy8gICAgIGRlY2tJZDogdHJ1ZVxuICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgfVxuXG5cbiAgICAgICAgR2FtZUZhY3Rvcnkuam9pbkdhbWVCeUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gMTtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllcklkID0gNDtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllck5hbWUgPSAnY2F0JztcbiAgICAgICAgICAgIGNvbnN0IHBsYXllclJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9L3BsYXllcnMvJHtwbGF5ZXJJZH1gKVxuICAgICAgICAgICAgcGxheWVyUmVmLnNldCh7XG4gICAgICAgICAgICAgICAgbmFtZTogcGxheWVyTmFtZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICBnYW1lUmVmLm9uKCd2YWx1ZScsIHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2NoYW5nZWRHYW1lJywgc25hcHNob3QudmFsKCkpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG5cbiAgICAgICAgR2FtZUZhY3RvcnkuY3JlYXRlR2FtZUJ5SWRGaXJlQmFzZSA9IChmaXJlYmFzZWdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgLy9yZXR1cm4gJGh0dHAucG9zdChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9maXJlYmFzZS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAgICAgLy9uZWVkcyB0byBiZSAudGhlbmFibGVcbiAgICAgICAgICAgIGNvbnN0IG5ld1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBnYW1lcy8ke2ZpcmViYXNlZ2FtZUlkfWApLnB1c2goKTtcbiAgICAgICAgICAgIG5ld1JlZi5zZXQoe1xuICAgICAgICAgICAgICAgIHBsYXllcklkOiByZXEucXVlcnkucGxheWVySWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9HYW1lRmFjdG9yeS5nZXRDYXJkc0J5RGVja0lkIFxuXG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCA9ICh0ZWFtSWQpID0+IHtcbiAgICAgICAgICAgIHRlYW1JZCA9IHRlYW1JZCB8fCAkbG9jYWxTdG9yYWdlLnRlYW0uaWRcblxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9kZWNrcy8ke3RlYW1JZH1gKVxuICAgICAgICAgICAgICAgIC50aGUocmVzID0+IHJlcy5kYXRhKVxuXG4gICAgICAgIH07XG5cblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRVc2Vyc0J5R2FtZUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0vdXNlcnNgKTtcbiAgICAgICAgfTtcblxuXG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZUJ5R2FtZUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc3QgZGVmZXIgPSAkcS5kZWZlcigpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZ2FtZUlkKTtcbiAgICAgICAgICAgIGNvbnN0IHRlYW1JZCA9IDE7XG4gICAgICAgICAgICBjb25zdCBnYW1lc1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICAgIHJldHVybiBnYW1lc1JlZi5vbmNlKCd2YWx1ZScpLnRoZW4oc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdURVNUMycsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgIHJldHVybiBzbmFwc2hvdC52YWwoKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIC8vIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQgPSAodGVhbUlkKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGhlIHRlYW0gaXMgaWQnLCB0ZWFtSWQpXG5cbiAgICAgICAgICAgIGNvbnN0IGdhbWVzUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lc2ApXG4gICAgICAgICAgICByZXR1cm4gZ2FtZXNSZWYub25jZSgndmFsdWUnKS50aGVuKHNuYXBzaG90ID0+IHsgLy9taWdodCBicmVhayBhZnRlciB5b3UgZG8gaXQgb25jZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGUgdmFsIGlzJywgc25hcHNob3QudmFsKCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNuYXBzaG90LnZhbCgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VGVhbUlkID0gKHRlYW1JZCkgPT4ge1xuICAgICAgICAgICAgdGVhbUlkID0gdGVhbUlkIHx8ICRsb2NhbFN0b3JhZ2UudGVhbS5pZFxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZSB0ZWFtIGlzIGlkJywgdGVhbUlkKVxuICAgICAgICAgICAgY29uc3QgZGVmZXIgPSAkcS5kZWZlcigpO1xuXG4gICAgICAgICAgICBjb25zdCBnYW1lc1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXNgKVxuICAgICAgICAgICAgZ2FtZXNSZWYub24oJ3ZhbHVlJywgc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGUgdmFsIGlzJywgc25hcHNob3QudmFsKCkpXG4gICAgICAgICAgICAgICAgZGVmZXIucmVzb2x2ZShzbmFwc2hvdC52YWwoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGVmZXIgcHJvbWlzZVwiLCBkZWZlci5wcm9taXNlKVxuICAgICAgICAgICAgcmV0dXJuIGRlZmVyLnByb21pc2U7XG4gICAgICAgIH07XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVVzZXIgPSAodXNlcklkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdodHRwOi8vbG9jYWxTdG9yYWdlOjEzMzcvYXBpL2dhbWVzLz91c2VySWQ9JyArIHVzZXJJZClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybiBHYW1lRmFjdG9yeTtcbiAgICB9XG5cbik7XG5cbiIsImFwcC5mYWN0b3J5KCdMb2dpbkZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCl7XG5cdHJldHVybiB7XG5cdFx0Z2V0U2xhY2tDcmVkczogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiAkaHR0cC5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvc2xhY2snKVx0XG5cdFx0XHRcdC50aGVuKHJlcyA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIHJlcy5kYXRhXG5cdFx0XHRcdH0pXG5cdFx0fVxuXHR9XG59KVxuIiwiYXBwLmZhY3RvcnkoJ1VzZXJGYWN0b3J5JywgZnVuY3Rpb24oJGh0dHAsICRsb2NhbFN0b3JhZ2UsICR0aW1lb3V0LCAkc3RhdGUpe1xuXHRcblx0cmV0dXJuIHtcblx0XHRzZXRVc2VyOiBmdW5jdGlvbihpbmZvKXtcblx0XHRcdHJldHVybiAkaHR0cCh7XG5cdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdFx0XHR1cmw6ICdodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL3VzZXJzJyxcblx0XHRcdFx0aGVhZGVyczoge1xuXHRcdFx0XHRcdCdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcblx0XHRcdFx0fSxcblx0XHRcdFx0ZGF0YTogaW5mb1xuXHRcdFx0fSlcblx0XHRcdC50aGVuKHJlcyA9PiB7XG5cdFx0XHRcdHRoaXMuc2V0TG9jYWxTdG9yYWdlKHJlcy5kYXRhLnVzZXJbMF0sIHJlcy5kYXRhLnRlYW1bMF0pO1xuXHRcdFx0fSlcblx0XHR9LFxuXG5cdFx0Z2V0U2xhY2tJbmZvOiBmdW5jdGlvbigpe1xuXHRcdFx0cmV0dXJuICRodHRwLmdldCgnaHR0cHM6Ly9zbGFjay5jb20vYXBpL3VzZXJzLmlkZW50aXR5Jylcblx0XHR9LFxuXG5cdFx0c2V0TG9jYWxTdG9yYWdlOiBmdW5jdGlvbih1c2VyLCB0ZWFtKXtcblx0XHRcdCRsb2NhbFN0b3JhZ2UudXNlciA9IHVzZXI7XG5cdFx0XHQkbG9jYWxTdG9yYWdlLnRlYW0gPSB0ZWFtO1xuXHRcdH0sXG5cblx0XHRsb2dPdXQ6IGZ1bmN0aW9uKCl7XG5cdFx0XHQkbG9jYWxTdG9yYWdlLiRyZXNldCgpO1xuXHRcdH1cblx0fVxufSkiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
=======
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImNhcmRzLXRlc3QvY2FyZHNUZXN0LmpzIiwiZGVja3MvZGVja3MuanMiLCJmcm9tIGZzZy9mcm9tLWZzZy5qcyIsImdhbWUvZ2FtZS5qcyIsImhvbWUvaG9tZS5qcyIsImxvZ2luL2xvZ2luLmpzIiwibmV3LWdhbWUvbmV3LWdhbWUuanMiLCJ0ZWFtLWdhbWVzL3RlYW0tZ2FtZXMuanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiLCJjb21tb24vZmFjdG9yaWVzL0dhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9sb2dpbkZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yaWVzL3VzZXJGYWN0b3J5LmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImFwcCIsImFuZ3VsYXIiLCJtb2R1bGUiLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZUxpZ2h0Q29udGVudCIsImNvbnRyb2xsZXIiLCIkc2NvcGUiLCJVc2VyRmFjdG9yeSIsIiRzdGF0ZSIsIiRsb2NhbFN0b3JhZ2UiLCIkdGltZW91dCIsImxvZ091dCIsImdvIiwiY29uZmlnIiwiJHN0YXRlUHJvdmlkZXIiLCJzdGF0ZSIsInVybCIsInRlbXBsYXRlVXJsIiwiZ3JlZXRpbmciLCJyZXNvbHZlIiwiZGVja3MiLCJHYW1lRmFjdG9yeSIsIiRzdGF0ZVBhcmFtcyIsImdldERlY2tzQnlUZWFtSWQiLCJzdGF0ZVBhcmFtcyIsInRlYW1JZCIsImFic3RyYWN0IiwiZ2FtZSIsImdldEdhbWVCeUdhbWVJZCIsImdhbWVJZCIsImNvbnNvbGUiLCJsb2ciLCJuYW1lIiwic2V0dGluZ3MiLCJwbGF5ZXJDb3VudCIsIk9iamVjdCIsImtleXMiLCJwbGF5ZXJzIiwibGVuZ3RoIiwid2FpdGluZ0ZvclBsYXllcnMiLCJtaW5QbGF5ZXJzIiwid2hpdGVDYXJkcyIsInBpbGUiLCJ3aGl0ZWNhcmRzIiwiJHVybFJvdXRlclByb3ZpZGVyIiwiZ2FtZXMiLCJnZXRHYW1lc0J5VGVhbUlkIiwiJGNvcmRvdmFPYXV0aCIsInN0b3JhZ2UiLCJKU09OIiwic3RyaW5naWZ5IiwiZ29Ub05ld0dhbWUiLCJjcmVhdGVOZXdHYW1lIiwiJG9uIiwiZXZlbnQiLCJkYXRhIiwib3RoZXJ3aXNlIiwiTG9naW5GYWN0b3J5IiwiJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZSIsImxvZ2luV2l0aFNsYWNrIiwiZ2V0U2xhY2tDcmVkcyIsInRoZW4iLCJzbGFjayIsImNyZWRzIiwiY2xpZW50SUQiLCJjbGllbnRTZWNyZXQiLCJzZXRVc2VyIiwiaW5mbyIsImNhbkRyYWdDb250ZW50IiwicmVkaXJlY3RVc2VyIiwidXNlciIsInRlYW1EZWNrcyIsInN0YW5kYXJkRGVjayIsImNhcmRzIiwiZ2V0Q2FyZHNCeURlY2tJZCIsImRlY2tJZCIsImN1cnJlbnRWaWV3IiwiZ2FtZUNvbmZpZyIsImdvVG9EZWNrcyIsImxvY2F0aW9uIiwicmVsb2FkIiwiY29uY2F0Iiwic3RhcnROZXdHYW1lIiwiaWQiLCJhZGREZWNrc1RvR2FtZSIsImFkZERlY2tzIiwiJGlvbmljUG9wdXAiLCIkZGlnZXN0Iiwic25hcHNob3QiLCJqb2luR2FtZSIsImpvaW5HYW1lQnlJZCIsInNob3dQb3B1cCIsIm15UG9wdXAiLCJzaG93IiwidGVtcGxhdGUiLCJ0aXRsZSIsInNjb3BlIiwiYnV0dG9ucyIsInRleHQiLCJ0eXBlIiwib25UYXAiLCJmYWN0b3J5IiwiJGh0dHAiLCIkcm9vdFNjb3BlIiwiJHEiLCJpbml0aWFsaXplRmlyZWJhc2UiLCJhcGlLZXkiLCJhdXRoRG9tYWluIiwiZGF0YWJhc2VVUkwiLCJzdG9yYWdlQnVja2V0IiwibWVzc2FnaW5nU2VuZGVySWQiLCJ0ZWFtIiwiY3JlYXRvcklkIiwicG9zdCIsImNyZWF0b3JOYW1lIiwicmVzIiwiZ2FtZVJlZiIsImZpcmViYXNlIiwiZGF0YWJhc2UiLCJyZWYiLCJvbiIsInZhbCIsIiRicm9hZGNhc3QiLCJnZXQiLCJwbGF5ZXJJZCIsInBsYXllck5hbWUiLCJwbGF5ZXJSZWYiLCJzZXQiLCJnZXRVc2Vyc0J5R2FtZUlkIiwiZ2FtZXNSZWYiLCJvbmNlIiwiZGVmZXIiLCJwcm9taXNlIiwiZ2V0R2FtZXNCeVVzZXIiLCJ1c2VySWQiLCJtZXRob2QiLCJoZWFkZXJzIiwic2V0TG9jYWxTdG9yYWdlIiwiZ2V0U2xhY2tJbmZvIiwiJHJlc2V0Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBQSxPQUFBQyxHQUFBLEdBQUFDLFFBQUFDLE1BQUEsQ0FBQSxzQkFBQSxFQUFBLENBQUEsT0FBQSxFQUFBLFdBQUEsRUFBQSxXQUFBLEVBQUEsZ0JBQUEsRUFBQSxXQUFBLEVBQUEsY0FBQSxDQUFBLENBQUE7O0FBRUFGLElBQUFHLEdBQUEsQ0FBQSxVQUFBQyxjQUFBLEVBQUE7QUFDQUEsbUJBQUFDLEtBQUEsQ0FBQSxZQUFBO0FBQ0EsWUFBQU4sT0FBQU8sT0FBQSxJQUFBUCxPQUFBTyxPQUFBLENBQUFDLE9BQUEsQ0FBQUMsUUFBQSxFQUFBO0FBQ0E7QUFDQTtBQUNBRixvQkFBQUMsT0FBQSxDQUFBQyxRQUFBLENBQUFDLHdCQUFBLENBQUEsSUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQUgsb0JBQUFDLE9BQUEsQ0FBQUMsUUFBQSxDQUFBRSxhQUFBLENBQUEsSUFBQTtBQUNBO0FBQ0EsWUFBQVgsT0FBQVksU0FBQSxFQUFBO0FBQ0FBLHNCQUFBQyxpQkFBQTtBQUNBO0FBQ0EsS0FkQTtBQWdCQSxDQWpCQTs7QUNQQVosSUFBQWEsVUFBQSxDQUFBLFlBQUEsRUFBQSxVQUFBQyxNQUFBLEVBQUFDLFdBQUEsRUFBQUMsTUFBQSxFQUFBQyxhQUFBLEVBQUFDLFFBQUEsRUFBQTtBQUNBSixXQUFBSyxNQUFBLEdBQUEsWUFBQTtBQUNBSixvQkFBQUksTUFBQTtBQUNBSCxlQUFBSSxFQUFBLENB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LEVBQUFDLFFBQUEsRUFBQUYsTUFBQSxFQUFBOztBQUVBLFdBQUE7QUFDQTBELGlCQUFBLGlCQUFBQyxJQUFBLEVBQUE7QUFBQTs7QUFDQSxtQkFBQW1DLE1BQUE7QUFDQWlDLHdCQUFBLE1BREE7QUFFQXZILHFCQUFBLGlDQUZBO0FBR0F3SCx5QkFBQTtBQUNBLG9DQUFBO0FBREEsaUJBSEE7QUFNQWpGLHNCQUFBWTtBQU5BLGFBQUEsRUFRQU4sSUFSQSxDQVFBLGVBQUE7QUFDQSxzQkFBQTRFLGVBQUEsQ0FBQXRCLElBQUE1RCxJQUFBLENBQUFlLElBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQTZDLElBQUE1RCxJQUFBLENBQUF3RCxJQUFBLENBQUEsQ0FBQSxDQUFBO0FBQ0EsYUFWQSxDQUFBO0FBV0EsU0FiQTs7QUFlQTJCLHNCQUFBLHdCQUFBO0FBQ0EsbUJBQUFwQyxNQUFBcUIsR0FBQSxDQUFBLHNDQUFBLENBQUE7QUFDQSxTQWpCQTs7QUFtQkFjLHlCQUFBLHlCQUFBbkUsSUFBQSxFQUFBeUMsSUFBQSxFQUFBO0FBQ0F0RywwQkFBQTZELElBQUEsR0FBQUEsSUFBQTtBQUNBN0QsMEJBQUFzRyxJQUFBLEdBQUFBLElBQUE7QUFDQSxTQXRCQTs7QUF3QkFwRyxnQkFBQSxrQkFBQTtBQUNBRiwwQkFBQWtJLE1BQUE7QUFDQTtBQTFCQSxLQUFBO0FBNEJBLENBOUJBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJb25pYyBTdGFydGVyIEFwcFxuXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xuLy8gJ3N0YXJ0ZXInIGlzIHRoZSBuYW1lIG9mIHRoaXMgYW5ndWxhciBtb2R1bGUgZXhhbXBsZSAoYWxzbyBzZXQgaW4gYSA8Ym9keT4gYXR0cmlidXRlIGluIGluZGV4Lmh0bWwpXG4vLyB0aGUgMm5kIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiAncmVxdWlyZXMnXG53aW5kb3cuYXBwID0gYW5ndWxhci5tb2R1bGUoJ0JsYW5rQWdhaW5zdEh1bWFuaXR5JywgWydpb25pYycsICd1aS5yb3V0ZXInLCduZ0NvcmRvdmEnLCduZ0NvcmRvdmFPYXV0aCcsICduZ1N0b3JhZ2UnLCAndWkuYm9vdHN0cmFwJ10pXG5cbmFwcC5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0pIHtcbiAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgICAgICAgIC8vIEhpZGUgdGhlIGFjY2Vzc29yeSBiYXIgYnkgZGVmYXVsdCAocmVtb3ZlIHRoaXMgdG8gc2hvdyB0aGUgYWNjZXNzb3J5IGJhciBhYm92ZSB0aGUga2V5Ym9hcmRcbiAgICAgICAgICAgIC8vIGZvciBmb3JtIGlucHV0cylcbiAgICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG5cbiAgICAgICAgICAgIC8vIERvbid0IHJlbW92ZSB0aGlzIGxpbmUgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZy4gSXQgc3RvcHMgdGhlIHZpZXdwb3J0XG4gICAgICAgICAgICAvLyBmcm9tIHNuYXBwaW5nIHdoZW4gdGV4dCBpbnB1dHMgYXJlIGZvY3VzZWQuIElvbmljIGhhbmRsZXMgdGhpcyBpbnRlcm5hbGx5IGZvclxuICAgICAgICAgICAgLy8gYSBtdWNoIG5pY2VyIGtleWJvYXJkIGV4cGVyaWVuY2UuXG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2luZG93LlN0YXR1c0Jhcikge1xuICAgICAgICAgICAgU3RhdHVzQmFyLnN0eWxlTGlnaHRDb250ZW50KClcbiAgICAgICAgfVxuICAgIH0pO1xuXG59KVxuIiwiYXBwLmNvbnRyb2xsZXIoJ0xvZ291dEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIFVzZXJGYWN0b3J5LCAkc3RhdGUsICRsb2NhbFN0b3JhZ2UsICR0aW1lb3V0KXtcblx0JHNjb3BlLmxvZ091dCA9IGZ1bmN0aW9uKCl7XG5cdFx0VXNlckZhY3RvcnkubG9nT3V0KClcblx0XHQkc3RhdGUuZ28oJ2xvZ2luJylcblx0fVxufSkiLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKXtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2NhcmRzJywge1xuXHRcdHVybDogJy9jYXJkcycsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9jYXJkcy10ZXN0L2NhcmRzLXRlc3QuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0NhcmRzVGVzdEN0cmwnXG5cdH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignQ2FyZHNUZXN0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSl7XG4gXHQkc2NvcGUuZ3JlZXRpbmcgPSBcIkhJXCJcbn0pIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIpID0+IHtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2RlY2tzJywge1xuXHRcdHVybDogJ2RlY2tzLzp0ZWFtaWQnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvZGVja3MvZGVja3MuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0RlY2tDdHJsJyxcblx0XHRyZXNvbHZlOiB7XG5cdFx0XHRkZWNrczogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoc3RhdGVQYXJhbXMudGVhbUlkKVxuXHRcdH1cblx0fSlcblxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0RlY2tDdHJsJywgKCRzY29wZSkgPT4ge1xuXG5cblx0XG59KSIsIi8vIChmdW5jdGlvbiAoKSB7XG5cbi8vICAgICAndXNlIHN0cmljdCc7XG5cbi8vICAgICAvLyBIb3BlIHlvdSBkaWRuJ3QgZm9yZ2V0IEFuZ3VsYXIhIER1aC1kb3kuXG4vLyAgICAgaWYgKCF3aW5kb3cuYW5ndWxhcikgdGhyb3cgbmV3IEVycm9yKCdJIGNhblxcJ3QgZmluZCBBbmd1bGFyIScpO1xuXG4vLyAgICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdmc2FQcmVCdWlsdCcsIFtdKTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdTb2NrZXQnLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgIGlmICghd2luZG93LmlvKSB0aHJvdyBuZXcgRXJyb3IoJ3NvY2tldC5pbyBub3QgZm91bmQhJyk7XG4vLyAgICAgICAgIHJldHVybiB3aW5kb3cuaW8od2luZG93LmxvY2F0aW9uLm9yaWdpbik7XG4vLyAgICAgfSk7XG5cbi8vICAgICAvLyBBVVRIX0VWRU5UUyBpcyB1c2VkIHRocm91Z2hvdXQgb3VyIGFwcCB0b1xuLy8gICAgIC8vIGJyb2FkY2FzdCBhbmQgbGlzdGVuIGZyb20gYW5kIHRvIHRoZSAkcm9vdFNjb3BlXG4vLyAgICAgLy8gZm9yIGltcG9ydGFudCBldmVudHMgYWJvdXQgYXV0aGVudGljYXRpb24gZmxvdy5cbi8vICAgICBhcHAuY29uc3RhbnQoJ0FVVEhfRVZFTlRTJywge1xuLy8gICAgICAgICBsb2dpblN1Y2Nlc3M6ICdhdXRoLWxvZ2luLXN1Y2Nlc3MnLFxuLy8gICAgICAgICBsb2dpbkZhaWxlZDogJ2F1dGgtbG9naW4tZmFpbGVkJyxcbi8vICAgICAgICAgbG9nb3V0U3VjY2VzczogJ2F1dGgtbG9nb3V0LXN1Y2Nlc3MnLFxuLy8gICAgICAgICBzZXNzaW9uVGltZW91dDogJ2F1dGgtc2Vzc2lvbi10aW1lb3V0Jyxcbi8vICAgICAgICAgbm90QXV0aGVudGljYXRlZDogJ2F1dGgtbm90LWF1dGhlbnRpY2F0ZWQnLFxuLy8gICAgICAgICBub3RBdXRob3JpemVkOiAnYXV0aC1ub3QtYXV0aG9yaXplZCdcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdBdXRoSW50ZXJjZXB0b3InLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHEsIEFVVEhfRVZFTlRTKSB7XG4vLyAgICAgICAgIHZhciBzdGF0dXNEaWN0ID0ge1xuLy8gICAgICAgICAgICAgNDAxOiBBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLFxuLy8gICAgICAgICAgICAgNDAzOiBBVVRIX0VWRU5UUy5ub3RBdXRob3JpemVkLFxuLy8gICAgICAgICAgICAgNDE5OiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCxcbi8vICAgICAgICAgICAgIDQ0MDogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXRcbi8vICAgICAgICAgfTtcbi8vICAgICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgICAgIHJlc3BvbnNlRXJyb3I6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChzdGF0dXNEaWN0W3Jlc3BvbnNlLnN0YXR1c10sIHJlc3BvbnNlKTtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlc3BvbnNlKVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9O1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLmNvbmZpZyhmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xuLy8gICAgICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKFtcbi8vICAgICAgICAgICAgICckaW5qZWN0b3InLFxuLy8gICAgICAgICAgICAgZnVuY3Rpb24gKCRpbmplY3Rvcikge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkaW5qZWN0b3IuZ2V0KCdBdXRoSW50ZXJjZXB0b3InKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgXSk7XG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuc2VydmljZSgnQXV0aFNlcnZpY2UnLCBmdW5jdGlvbiAoJGh0dHAsIFNlc3Npb24sICRyb290U2NvcGUsIEFVVEhfRVZFTlRTLCAkcSkge1xuXG4vLyAgICAgICAgIGZ1bmN0aW9uIG9uU3VjY2Vzc2Z1bExvZ2luKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICB2YXIgdXNlciA9IHJlc3BvbnNlLmRhdGEudXNlcjtcbi8vICAgICAgICAgICAgIFNlc3Npb24uY3JlYXRlKHVzZXIpO1xuLy8gICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ2luU3VjY2Vzcyk7XG4vLyAgICAgICAgICAgICByZXR1cm4gdXNlcjtcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIC8vIFVzZXMgdGhlIHNlc3Npb24gZmFjdG9yeSB0byBzZWUgaWYgYW5cbi8vICAgICAgICAgLy8gYXV0aGVudGljYXRlZCB1c2VyIGlzIGN1cnJlbnRseSByZWdpc3RlcmVkLlxuLy8gICAgICAgICB0aGlzLmlzQXV0aGVudGljYXRlZCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAhIVNlc3Npb24udXNlcjtcbi8vICAgICAgICAgfTtcblxuICAgICAgICBcbi8vICAgICAgICAgdGhpcy5pc0FkbWluID0gZnVuY3Rpb24odXNlcklkKXtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdydW5uaW5nIGFkbWluIGZ1bmMnKVxuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKVxuLy8gICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YS51c2VyLmlzQWRtaW4pXG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICB0aGlzLmdldExvZ2dlZEluVXNlciA9IGZ1bmN0aW9uIChmcm9tU2VydmVyKSB7XG5cbi8vICAgICAgICAgICAgIC8vIElmIGFuIGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbiBleGlzdHMsIHdlXG4vLyAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIHVzZXIgYXR0YWNoZWQgdG8gdGhhdCBzZXNzaW9uXG4vLyAgICAgICAgICAgICAvLyB3aXRoIGEgcHJvbWlzZS4gVGhpcyBlbnN1cmVzIHRoYXQgd2UgY2FuXG4vLyAgICAgICAgICAgICAvLyBhbHdheXMgaW50ZXJmYWNlIHdpdGggdGhpcyBtZXRob2QgYXN5bmNocm9ub3VzbHkuXG5cbi8vICAgICAgICAgICAgIC8vIE9wdGlvbmFsbHksIGlmIHRydWUgaXMgZ2l2ZW4gYXMgdGhlIGZyb21TZXJ2ZXIgcGFyYW1ldGVyLFxuLy8gICAgICAgICAgICAgLy8gdGhlbiB0aGlzIGNhY2hlZCB2YWx1ZSB3aWxsIG5vdCBiZSB1c2VkLlxuXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSAmJiBmcm9tU2VydmVyICE9PSB0cnVlKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLndoZW4oU2Vzc2lvbi51c2VyKTtcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgLy8gTWFrZSByZXF1ZXN0IEdFVCAvc2Vzc2lvbi5cbi8vICAgICAgICAgICAgIC8vIElmIGl0IHJldHVybnMgYSB1c2VyLCBjYWxsIG9uU3VjY2Vzc2Z1bExvZ2luIHdpdGggdGhlIHJlc3BvbnNlLlxuLy8gICAgICAgICAgICAgLy8gSWYgaXQgcmV0dXJucyBhIDQwMSByZXNwb25zZSwgd2UgY2F0Y2ggaXQgYW5kIGluc3RlYWQgcmVzb2x2ZSB0byBudWxsLlxuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKS50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKS5jYXRjaChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4vLyAgICAgICAgICAgICB9KTtcblxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbiAoY3JlZGVudGlhbHMpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvbG9naW4nLCBjcmVkZW50aWFscylcbi8vICAgICAgICAgICAgICAgICAudGhlbihvblN1Y2Nlc3NmdWxMb2dpbilcbi8vICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHsgbWVzc2FnZTogJ0ludmFsaWQgbG9naW4gY3JlZGVudGlhbHMuJ30pO1xuLy8gICAgICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMuc2lnbnVwID0gZnVuY3Rpb24oY3JlZGVudGlhbHMpe1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbi8vICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbi8vICAgICAgICAgICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbi8vICAgICAgICAgICAgICAgICBkYXRhOiBjcmVkZW50aWFsc1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQuZGF0YSlcbi8vICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbigpe1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3Qoe21lc3NhZ2U6ICdUaGF0IGVtYWlsIGlzIGFscmVhZHkgYmVpbmcgdXNlZC4nfSk7XG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL2xvZ291dCcpLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgIFNlc3Npb24uZGVzdHJveSgpO1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dvdXRTdWNjZXNzKTtcbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuc2VydmljZSgnU2Vzc2lvbicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUykge1xuXG4vLyAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuLy8gICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICBzZWxmLmRlc3Ryb3koKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuXG4vLyAgICAgICAgIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24gKHVzZXIpIHtcbi8vICAgICAgICAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcbi8vICAgICAgICAgfTtcblxuLy8gICAgIH0pO1xuXG4vLyB9KCkpO1xuIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIpID0+IHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdnYW1lJywge1xuICAgICAgICB1cmw6ICcvZ2FtZScsXG4gICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2dhbWUvZ2FtZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0dhbWVDdHJsJyxcbiAgICB9KVxuICAgIC5zdGF0ZSgnZ2FtZS5wcmUtZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnLzpnYW1lSWQvcHJlLWdhbWUnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2dhbWUvcHJlLWdhbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdQcmVHYW1lQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGdhbWUgOiAoR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcykgPT4gR2FtZUZhY3RvcnkuZ2V0R2FtZUJ5R2FtZUlkKCRzdGF0ZVBhcmFtcy5nYW1lSWQpXG4gICAgICAgIH1cbiAgICB9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0dhbWVDdHJsJywgKCRzY29wZSwgR2FtZUZhY3RvcnkpID0+IHtcbiAgIFxufSlcblxuYXBwLmNvbnRyb2xsZXIoXCJQcmVHYW1lQ3RybFwiLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgZ2FtZSkgPT4ge1xuXG4gICAgLy8gJHNjb3BlLiRvbignY2hhbmdlZEdhbWUnLCAoZXZlbnQsc25hcHNob3QpID0+IHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coc25hcHNob3QpO1xuICAgIC8vICAgICAkc2NvcGUubmFtZSA9IHNuYXBzaG90Lm5hbWU7XG4gICAgLy8gICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgLy8gfSlcblxuICAgIGNvbnNvbGUubG9nKGdhbWUpO1xuICAgICRzY29wZS5nYW1lID0gZ2FtZTtcbiAgICAkc2NvcGUubmFtZSA9IGdhbWUuc2V0dGluZ3MubmFtZTtcbiAgICAkc2NvcGUucGxheWVyQ291bnQgPSBPYmplY3Qua2V5cyhnYW1lLnBsYXllcnMpLmxlbmd0aDtcbiAgICAkc2NvcGUud2FpdGluZ0ZvclBsYXllcnMgPSAgZ2FtZS5zZXR0aW5ncy5taW5QbGF5ZXJzIC0gJHNjb3BlLnBsYXllckNvdW50O1xuICAgICRzY29wZS53aGl0ZUNhcmRzID0gZ2FtZS5waWxlLndoaXRlY2FyZHM7XG4gICBcbiAgICBcbn0pXG5cbiIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lJywge1xuICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9ob21lL2hvbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGdhbWVzOiBmdW5jdGlvbihHYW1lRmFjdG9yeSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VGVhbUlkKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignSG9tZUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSwgJGNvcmRvdmFPYXV0aCwgVXNlckZhY3RvcnksIEdhbWVGYWN0b3J5LCAkbG9jYWxTdG9yYWdlLCBnYW1lcykge1xuICAgICRzY29wZS5zdG9yYWdlID0gJGxvY2FsU3RvcmFnZTtcbiAgICAkc2NvcGUuZ2FtZXMgPSBnYW1lcztcbiAgICBjb25zb2xlLmxvZyhcImdhbWVzXCIsIEpTT04uc3RyaW5naWZ5KCRzY29wZS5nYW1lcykpXG4gICAgJHNjb3BlLmdvVG9OZXdHYW1lID0gKCkgPT4ge1xuICAgICAgICAkc3RhdGUuZ28oJ25ldy1nYW1lLm1haW4nKVxuICAgIH1cblxuXG4gICAgLy8gLy8gZ2V0IGdhbWVzIGZyb20gcG9zdGdyZXNcbiAgICAvLyBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VXNlcigpXG4gICAgLy8gLnRoZW4oZ2FtZXMgPT4ge1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhcImdhbWVzIGZvdW5kOlwiLCBnYW1lcylcbiAgICAvLyAgICAgJHNjb3BlLmdhbWVzID0gZ2FtZXM7XG4gICAgLy8gfSlcblxuICAgIC8vZ2V0IGdhbWVzIGZyb20gZmlyZWJhc2VcbiAgICAvLyBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VGVhbUlkKCRzY29wZS5zdG9yYWdlLnRlYW0uaWQpXG4gICAgLy8gLnRoZW4oZ2FtZXMgPT4ge1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhcInRoZSBnYW1lcyBhcmU6XCIsIGdhbWVzKVxuICAgIC8vICAgICAkc2NvcGUuZ2FtZXMgPSBnYW1lcztcbiAgICAvLyB9KVxuXG4gICAgLy8kc2NvcGUuc3RhcnROZXdHYW1lID0gR2FtZUZhY3Rvcnkuc3RhcnROZXdHYW1lO1xuICAgICRzY29wZS5jcmVhdGVOZXdHYW1lID0gKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnZ29pbmcgdG8gbmV3IHN0YXRlJylcbiAgICAgICAgJHN0YXRlLmdvKCduZXctZ2FtZS5tYWluJylcbiAgICB9XG5cbiAgICAkc2NvcGUuJG9uKCdjaGFuZ2VkR2FtZScsIChldmVudCwgZGF0YSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygncmVjZWl2ZWQgZXZlbnQgaW4gaG9tZScpXG4gICAgICAgIGNvbnNvbGUubG9nKCdkYXRhIG9iajonLCBkYXRhKVxuICAgICAgICAgICAgLy8kc2NvcGUuZ2FtZSA9IGRhdGE7XG4gICAgICAgICAgICAvLyAkc2NvcGUuJGRpZ2VzdCgpXG5cbiAgICB9KVxufSlcblxuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKXtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2xvZ2luJywge1xuXHRcdHVybDogJy9sb2dpbicsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9sb2dpbi9sb2dpbi5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnTG9naW5DdHJsJ1xuXHR9KVxuXHQkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvbG9naW4nKTtcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdMb2dpbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSwgTG9naW5GYWN0b3J5LCBVc2VyRmFjdG9yeSwgJGNvcmRvdmFPYXV0aCwgJGxvY2FsU3RvcmFnZSwgJHRpbWVvdXQsICRpb25pY1NpZGVNZW51RGVsZWdhdGUpe1xuIFx0JHNjb3BlLmxvZ2luV2l0aFNsYWNrID0gZnVuY3Rpb24oKXtcbiBcdFx0cmV0dXJuIExvZ2luRmFjdG9yeS5nZXRTbGFja0NyZWRzKClcbiBcdFx0LnRoZW4oY3JlZHMgPT57XG4gXHRcdFx0cmV0dXJuICRjb3Jkb3ZhT2F1dGguc2xhY2soY3JlZHMuY2xpZW50SUQsIGNyZWRzLmNsaWVudFNlY3JldCwgWydpZGVudGl0eS5iYXNpYycsICdpZGVudGl0eS50ZWFtJywgJ2lkZW50aXR5LmF2YXRhciddKVxuIFx0XHR9KVxuIFx0XHQudGhlbihpbmZvID0+IFVzZXJGYWN0b3J5LnNldFVzZXIoaW5mbykpXG4gXHRcdC50aGVuKCgpID0+ICRzdGF0ZS5nbygnaG9tZScpKVxuIFx0fVxuXG4gXHQkaW9uaWNTaWRlTWVudURlbGVnYXRlLmNhbkRyYWdDb250ZW50KGZhbHNlKTtcblxuIFx0JHNjb3BlLiRvbignJGlvbmljVmlldy5sZWF2ZScsIGZ1bmN0aW9uICgpIHsgJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZS5jYW5EcmFnQ29udGVudCh0cnVlKSB9KTtcblxuIFx0JHNjb3BlLnN0b3JhZ2UgPSAkbG9jYWxTdG9yYWdlXG5cbiBcdGZ1bmN0aW9uIHJlZGlyZWN0VXNlcigpe1xuIFx0XHRjb25zb2xlLmxvZyhcInNjb3BlIHN0b3JhZ2UgdXNlclwiLCAkc2NvcGUuc3RvcmFnZS51c2VyKVxuIFx0XHRpZiAoJHNjb3BlLnN0b3JhZ2UudXNlcikgJHN0YXRlLmdvKCdob21lJylcbiBcdH1cblxuXHRyZWRpcmVjdFVzZXIoKTtcbn0pIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikgPT4ge1xuXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ25ldy1nYW1lJywge1xuICAgICAgICB1cmw6ICcvbmV3LWdhbWUnLFxuICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9tYWluLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnTmV3R2FtZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICB0ZWFtRGVja3M6IChHYW1lRmFjdG9yeSkgPT4gR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCgpLFxuICAgICAgICAgICAgc3RhbmRhcmREZWNrOiAoR2FtZUZhY3RvcnkpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoMClcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ25ldy1nYW1lLm1haW4nLCB7XG4gICAgICAgIHVybDogJy9zZXR1cC1nYW1lJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9uZXctZ2FtZS5odG1sJyxcbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5hZGQtZGVja3MnLCB7XG4gICAgICAgIHVybDogJy9hZGQtZGVja3MnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL2FkZC1kZWNrcy5odG1sJyxcbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5kZWNrJywge1xuICAgICAgICB1cmw6ICcvZGVjay86ZGVja0lkJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9kZWNrLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnRGVja0N0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBjYXJkczogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldENhcmRzQnlEZWNrSWQoJHN0YXRlUGFyYW1zLmRlY2tJZClcbiAgICAgICAgfVxuXG5cbiAgICB9KVxuXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL25ldy1nYW1lL3NldHVwLWdhbWUnKTtcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdOZXdHYW1lQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkc3RhdGUsIHRlYW1EZWNrcywgc3RhbmRhcmREZWNrKSA9PiB7XG4gICAgJHNjb3BlLmN1cnJlbnRWaWV3ID0gJ2FkZERlY2tzJ1xuICAgICRzY29wZS5nYW1lQ29uZmlnID0ge307XG4gICAgJHNjb3BlLmdhbWVDb25maWcuZGVja3MgPSB7fTtcbiAgICAkc2NvcGUuZ29Ub0RlY2tzID0gKCkgPT4ge1xuICAgICAgICAkc3RhdGUuZ28oJ25ldy1nYW1lLmFkZC1kZWNrcycsIHt9LCB7IGxvY2F0aW9uOiB0cnVlLCByZWxvYWQ6IHRydWUgfSlcbiAgICB9XG5cbiAgICAkc2NvcGUuZGVja3MgPSBzdGFuZGFyZERlY2suY29uY2F0KHRlYW1EZWNrcyk7XG5cbiAgICAkc2NvcGUuc3RhcnROZXdHYW1lID0gKGdhbWVDb25maWcpID0+IHtcbiAgICAgICAgR2FtZUZhY3Rvcnkuc3RhcnROZXdHYW1lKGdhbWVDb25maWcpLnRoZW4oKGlkKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGhlIGdhbWUgaWQgaXMnLCBpZClcbiAgICAgICAgICAgICRzdGF0ZS5nbygnaG9tZScpIC8vJ2dhbWUucHJlLWdhbWUnLCB7ICdnYW1lSWQnOiAxMDAgfVxuICAgICAgICB9KVxuICAgIH1cbiAgICAkc2NvcGUuYWRkRGVja3NUb0dhbWUgPSBHYW1lRmFjdG9yeS5hZGREZWNrcztcbiAgICAvLyAkc2NvcGUuJG9uKCdjaGFuZ2VkR2FtZScsIChldmVudCwgZGF0YSkgPT4ge1xuICAgIC8vICAgICBjb25zb2xlLmxvZygncmVjZWl2ZWQgZXZlbnQnKVxuICAgIC8vICAgICBjb25zb2xlLmxvZygnZGF0YSBvYmo6JywgZGF0YSlcbiAgICAvLyAgICAgJHNjb3BlLmdhbWUgPSBkYXRhO1xuICAgIC8vICAgICAkc2NvcGUuJGRpZ2VzdCgpXG5cbiAgICAvLyB9KVxuXG5cbn0pXG5cbmFwcC5jb250cm9sbGVyKCdEZWNrQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkc3RhdGUsIGNhcmRzKSA9PiB7XG4gICAgJHNjb3BlLmNhcmRzID0gY2FyZHNcbn0pXG5cbiIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCd0ZWFtLWdhbWVzJywge1xuXHRcdHVybDogJy90ZWFtLWdhbWVzJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL3RlYW0tZ2FtZXMvdGVhbS1nYW1lcy5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnVGVhbUdhbWVzQ3RybCcsXG5cdH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignVGVhbUdhbWVzQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkaW9uaWNQb3B1cCwgJHRpbWVvdXQsICRzdGF0ZSkgPT4ge1xuXHQgXG5cdCBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VGVhbUlkKCcxJylcblx0IFx0LnRoZW4oZ2FtZXMgPT4ge1xuXHQgXHRcdCRzY29wZS5nYW1lcyA9IGdhbWVzO1xuXHQgXHRcdCRzY29wZS4kZGlnZXN0KCk7XG5cdCBcdH0pXG5cblx0IFxuXHQgJHNjb3BlLiRvbignY2hhbmdlZEdhbWUnLCAoZXZlbnQsc25hcHNob3QpID0+e1xuXHQgXHQkc2NvcGUubmFtZT0gc25hcHNob3QubmFtZTtcblx0IFx0JHNjb3BlLiRkaWdlc3QoKTtcblx0IH0pXG5cblx0ICRzY29wZS5qb2luR2FtZSA9IEdhbWVGYWN0b3J5LmpvaW5HYW1lQnlJZDtcblxuXHQgJHNjb3BlLnNob3dQb3B1cCA9IGZ1bmN0aW9uIChnYW1lSWQpIHtcblx0ICAgICBcblx0ICAgICBjb25zdCBteVBvcHVwID0gJGlvbmljUG9wdXAuc2hvdyh7XG5cdCAgICAgXHR0ZW1wbGF0ZTogJzxwPkluZm9ybWF0aW9uPC9wPicsXG5cdCAgICAgXHR0aXRsZTogJ0dhbWUgSW5mb3JtYXRpb24nLFxuXHQgICAgIFx0c2NvcGU6ICRzY29wZSxcblx0ICAgICBcdGJ1dHRvbnM6IFtcblx0ICAgICBcdFx0e3RleHQ6ICdDYW5jZWwnfSxcblx0ICAgICBcdFx0e1xuXHQgICAgIFx0XHRcdHRleHQ6ICc8Yj5Kb2luPC9iPicsXG5cdCAgICAgXHRcdCBcdHR5cGU6ICdidXR0b24tcG9zaXRpdmUnLFxuXHQgICAgIFx0XHQgXHRvblRhcDogZSA9PiB7XG5cdCAgICAgXHRcdCBcdFx0Y29uc29sZS5sb2coZ2FtZUlkKTtcblx0ICAgICBcdFx0IFx0XHQkc2NvcGUuam9pbkdhbWUoZ2FtZUlkKTtcblx0ICAgICBcdFx0IFx0XHQkc3RhdGUuZ28oJ2dhbWUucHJlLWdhbWUnLCB7Z2FtZUlkOiBnYW1lSWR9KVxuXHQgICAgIFx0XHQgXHR9XG5cdCAgICAgXHRcdH1cblx0XHRcdF1cblx0ICAgIH0pXG5cdCB9XG59KVxuIiwiLy9EaXJlY3RpdmUgRmlsZSIsImFwcC5mYWN0b3J5KCdHYW1lRmFjdG9yeScsICgkaHR0cCwgJHJvb3RTY29wZSwgJGxvY2FsU3RvcmFnZSwgJHEpID0+IHtcblxuICAgICAgICBjb25zdCBHYW1lRmFjdG9yeSA9IHt9O1xuXG4gICAgICAgIGNvbnN0IGluaXRpYWxpemVGaXJlYmFzZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICBhcGlLZXk6IFwiQUl6YVN5RC10RGV2WHZpcHl1RTVsemhlV0FScTRodXUxVW1xb0prXCIsXG4gICAgICAgICAgICAgICAgYXV0aERvbWFpbjogXCJjYXBzdG9uZS1mYjBlOC5maXJlYmFzZWFwcC5jb21cIixcbiAgICAgICAgICAgICAgICBkYXRhYmFzZVVSTDogXCJodHRwczovL2NhcHN0b25lLWZiMGU4LmZpcmViYXNlaW8uY29tXCIsXG4gICAgICAgICAgICAgICAgc3RvcmFnZUJ1Y2tldDogXCJjYXBzdG9uZS1mYjBlOC5hcHBzcG90LmNvbVwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjg0OTgzOTY4MDEwN1wiXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaW5pdGlhbGl6ZUZpcmViYXNlKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgR2FtZUZhY3Rvcnkuc3RhcnROZXdHYW1lID0gKGdhbWVDb25maWcpID0+IHtcbiAgICAgICAgICAgIC8vY2FuIGFsc28gZ2V0IGFsbCB0aGUgZGVja3MgYnkgdGVhbSBoZXJlIHRvIHByZXBhcmVcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGUgc2V0dGluZ3MgYXJlOicsIGdhbWVDb25maWcpXG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAkbG9jYWxTdG9yYWdlLnRlYW0uaWQgfHwgMjtcbiAgICAgICAgICAgIGNvbnN0IGNyZWF0b3JJZCA9ICRsb2NhbFN0b3JhZ2UudXNlci5pZCB8fCAzO1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJ2h0dHA6Ly8xOTIuMTY4LjQuMjM2OjEzMzcvYXBpL2dhbWVzJywge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBnYW1lQ29uZmlnLm5hbWUgfHwgJ0JvcmluZyBOYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgdGVhbUlkOiB0ZWFtSWQsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0b3JJZDogY3JlYXRvcklkLFxuICAgICAgICAgICAgICAgICAgICBjcmVhdG9yTmFtZTogJGxvY2FsU3RvcmFnZS51c2VyLm5hbWUgfHwgJ2RhbicsIC8vbWlnaHQgYmUgdW5uZWNlc3NhcnkgaWYgd2UgaGF2ZSB0aGUgdXNlciBpZFxuICAgICAgICAgICAgICAgICAgICBzZXR0aW5nczogZ2FtZUNvbmZpZ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICAgICAgICAgIC50aGVuKGdhbWVJZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgL3RlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAgICAgICAgICAgICBnYW1lUmVmLm9uKCd2YWx1ZScsIHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzbmFwc2hvdCBpbiBnYW1lZmFjdG9yeSBpczonLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnY2hhbmdlZEdhbWUnLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnYW1lSWQ7XG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldENhcmRzQnlEZWNrSWQgPSAoaWQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly8xOTIuMTY4LjQuMjM2OjEzMzcvYXBpL2RlY2tzLyR7aWR9L2NhcmRzYClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVzLmRhdGEgaXM6JywgcmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuZGF0YVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmFkZERlY2tzVG9HYW1lID0gKGdhbWVJZCwgZGVja3MpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KGBhcGkvZ2FtZXMvJHtnYW1lSWR9L2RlY2tzYCwgZGVja3MpXG5cbiAgICAgICAgICAgIC8vIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfS9waWxlL2ApXG4gICAgICAgICAgICAvLyBnYW1lUmVmLnNldCh7XG4gICAgICAgICAgICAvLyAgICAgZGVja0lkOiB0cnVlXG4gICAgICAgICAgICAvLyB9KVxuICAgICAgICB9XG5cblxuICAgICAgICBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAxO1xuICAgICAgICAgICAgY29uc3QgcGxheWVySWQgPSA0O1xuICAgICAgICAgICAgY29uc3QgcGxheWVyTmFtZSA9ICdjYXQnO1xuICAgICAgICAgICAgY29uc3QgcGxheWVyUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH0vcGxheWVycy8ke3BsYXllcklkfWApXG4gICAgICAgICAgICBwbGF5ZXJSZWYuc2V0KHtcbiAgICAgICAgICAgICAgICBuYW1lOiBwbGF5ZXJOYW1lXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgICAgIGdhbWVSZWYub24oJ3ZhbHVlJywgc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdCgnY2hhbmdlZEdhbWUnLCBzbmFwc2hvdC52YWwoKSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cblxuICAgICAgICAvLyBHYW1lRmFjdG9yeS5jcmVhdGVHYW1lQnlJZEZpcmVCYXNlID0gKGZpcmViYXNlZ2FtZUlkKSA9PiB7XG4gICAgICAgIC8vICAgICAvL3JldHVybiAkaHR0cC5wb3N0KGBodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2ZpcmViYXNlL2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgIC8vICAgICAvL25lZWRzIHRvIGJlIC50aGVuYWJsZVxuICAgICAgICAvLyAgICAgY29uc3QgbmV3UmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYGdhbWVzLyR7ZmlyZWJhc2VnYW1lSWR9YCkucHVzaCgpO1xuICAgICAgICAvLyAgICAgbmV3UmVmLnNldCh7XG4gICAgICAgIC8vICAgICAgICAgcGxheWVySWQ6IHJlcS5xdWVyeS5wbGF5ZXJJZFxuICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgIC8vIH1cblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkID0gKGlkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAodHlwZW9mIGlkICE9PSAnbnVtYmVyJykgPyAkbG9jYWxTdG9yYWdlLnRlYW0uaWQgOiBpZDsgLy8gaWQgfHwgbG9jYWxzdG9yYWdlIGRvZXNuJ3Qgd29yayBiZWNhdXNlIDAgaXMgZmFsc2V5XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2RlY2tzP3RlYW09JHt0ZWFtSWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG5cbiAgICAgICAgfTtcblxuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldFVzZXJzQnlHYW1lSWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2dhbWVzLyR7Z2FtZUlkfS91c2Vyc2ApO1xuICAgICAgICB9O1xuXG5cblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRHYW1lQnlHYW1lSWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zdCBkZWZlciA9ICRxLmRlZmVyKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhnYW1lSWQpO1xuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gMTtcbiAgICAgICAgICAgIGNvbnN0IGdhbWVzUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAgICAgcmV0dXJuIGdhbWVzUmVmLm9uY2UoJ3ZhbHVlJykudGhlbihzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1RFU1QzJywgc25hcHNob3QudmFsKCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNuYXBzaG90LnZhbCgpO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgLy8gcmV0dXJuIGRlZmVyLnByb21pc2U7XG4gICAgICAgIH07XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCA9ICh0ZWFtSWQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGUgdGVhbSBpcyBpZCcsIHRlYW1JZClcblxuICAgICAgICAgICAgY29uc3QgZ2FtZXNSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzYClcbiAgICAgICAgICAgIHJldHVybiBnYW1lc1JlZi5vbmNlKCd2YWx1ZScpLnRoZW4oc25hcHNob3QgPT4geyAvL21pZ2h0IGJyZWFrIGFmdGVyIHlvdSBkbyBpdCBvbmNlXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZSB2YWwgaXMnLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gc25hcHNob3QudmFsKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQgPSAodGVhbUlkKSA9PiB7XG4gICAgICAgICAgICB0ZWFtSWQgPSB0ZWFtSWQgfHwgJGxvY2FsU3RvcmFnZS50ZWFtLmlkXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGhlIHRlYW0gaXMgaWQnLCB0ZWFtSWQpXG4gICAgICAgICAgICBjb25zdCBkZWZlciA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGdhbWVzUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lc2ApXG4gICAgICAgICAgICBnYW1lc1JlZi5vbigndmFsdWUnLCBzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZSB2YWwgaXMnLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICBkZWZlci5yZXNvbHZlKHNuYXBzaG90LnZhbCgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJkZWZlciBwcm9taXNlXCIsIGRlZmVyLnByb21pc2UpXG4gICAgICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VXNlciA9ICh1c2VySWQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2h0dHA6Ly9sb2NhbFN0b3JhZ2U6MTMzNy9hcGkvZ2FtZXMvP3VzZXJJZD0nICsgdXNlcklkKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmV0dXJuIEdhbWVGYWN0b3J5O1xuICAgIH1cblxuKTtcblxuIiwiYXBwLmZhY3RvcnkoJ0xvZ2luRmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwKXtcblx0cmV0dXJuIHtcblx0XHRnZXRTbGFja0NyZWRzOiBmdW5jdGlvbigpe1xuXHRcdFx0cmV0dXJuICRodHRwLmdldCgnaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9zbGFjaycpXHRcblx0XHRcdFx0LnRoZW4ocmVzID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gcmVzLmRhdGFcblx0XHRcdFx0fSlcblx0XHR9XG5cdH1cbn0pXG4iLCJhcHAuZmFjdG9yeSgnVXNlckZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCwgJGxvY2FsU3RvcmFnZSwgJHRpbWVvdXQsICRzdGF0ZSl7XG5cdFxuXHRyZXR1cm4ge1xuXHRcdHNldFVzZXI6IGZ1bmN0aW9uKGluZm8pe1xuXHRcdFx0cmV0dXJuICRodHRwKHtcblx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRcdHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvdXNlcnMnLFxuXHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRkYXRhOiBpbmZvXG5cdFx0XHR9KVxuXHRcdFx0LnRoZW4ocmVzID0+IHtcblx0XHRcdFx0dGhpcy5zZXRMb2NhbFN0b3JhZ2UocmVzLmRhdGEudXNlclswXSwgcmVzLmRhdGEudGVhbVswXSk7XG5cdFx0XHR9KVxuXHRcdH0sXG5cblx0XHRnZXRTbGFja0luZm86IGZ1bmN0aW9uKCl7XG5cdFx0XHRyZXR1cm4gJGh0dHAuZ2V0KCdodHRwczovL3NsYWNrLmNvbS9hcGkvdXNlcnMuaWRlbnRpdHknKVxuXHRcdH0sXG5cblx0XHRzZXRMb2NhbFN0b3JhZ2U6IGZ1bmN0aW9uKHVzZXIsIHRlYW0pe1xuXHRcdFx0JGxvY2FsU3RvcmFnZS51c2VyID0gdXNlcjtcblx0XHRcdCRsb2NhbFN0b3JhZ2UudGVhbSA9IHRlYW07XG5cdFx0fSxcblxuXHRcdGxvZ091dDogZnVuY3Rpb24oKXtcblx0XHRcdCRsb2NhbFN0b3JhZ2UuJHJlc2V0KCk7XG5cdFx0fVxuXHR9XG59KSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
>>>>>>> master
