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
    $scope.currentView = 'addDecks';
    $scope.gameConfig = {};
    $scope.gameConfig.decks = {};
    $scope.goToDecks = function () {
        $state.go('new-game.add-decks', {}, { location: true, reload: true });
    };

    $scope.decks = standardDeck.concat(teamDecks);

    $scope.startNewGame = function (gameConfig) {
        GameFactory.startNewGame(gameConfig).then(function () {
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
                console.log('snapshot in gamefactory is:', snapshot.val());
                $rootScope.$broadcast('changedGame', snapshot.val());
            });
        });
    };

    GameFactory.getCardsByDeckId = function (id) {
        console.log('calling gamefactory wit id ', id);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImNhcmRzLXRlc3QvY2FyZHNUZXN0LmpzIiwiZnJvbSBmc2cvZnJvbS1mc2cuanMiLCJkZWNrcy9kZWNrcy5qcyIsImdhbWUvZ2FtZS5qcyIsImhvbWUvaG9tZS5qcyIsImxvZ2luL2xvZ2luLmpzIiwibmV3LWdhbWUvbmV3LWdhbWUuanMiLCJ0ZWFtLWdhbWVzL3RlYW0tZ2FtZXMuanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiLCJjb21tb24vZmFjdG9yaWVzL0dhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9sb2dpbkZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yaWVzL3VzZXJGYWN0b3J5LmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImFwcCIsImFuZ3VsYXIiLCJtb2R1bGUiLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZUxpZ2h0Q29udGVudCIsImNvbnRyb2xsZXIiLCIkc2NvcGUiLCJVc2VyRmFjdG9yeSIsIiRzdGF0ZSIsIiRsb2NhbFN0b3JhZ2UiLCIkdGltZW91dCIsImxvZ091dCIsImdvIiwiY29uZmlnIiwiJHN0YXRlUHJvdmlkZXIiLCJzdGF0ZSIsInVybCIsInRlbXBsYXRlVXJsIiwiZ3JlZXRpbmciLCJyZXNvbHZlIiwiZGVja3MiLCJHYW1lRmFjdG9yeSIsIiRzdGF0ZVBhcmFtcyIsImdldERlY2tzQnlUZWFtSWQiLCJzdGF0ZVBhcmFtcyIsInRlYW1JZCIsImFic3RyYWN0IiwiZ2FtZSIsImdldEdhbWVCeUdhbWVJZCIsImdhbWVJZCIsImNvbnNvbGUiLCJsb2ciLCJuYW1lIiwic2V0dGluZ3MiLCJwbGF5ZXJDb3VudCIsIk9iamVjdCIsImtleXMiLCJwbGF5ZXJzIiwibGVuZ3RoIiwid2FpdGluZ0ZvclBsYXllcnMiLCJtaW5QbGF5ZXJzIiwid2hpdGVDYXJkcyIsInBpbGUiLCJ3aGl0ZWNhcmRzIiwiJHVybFJvdXRlclByb3ZpZGVyIiwiZ2FtZXMiLCJnZXRHYW1lc0J5VGVhbUlkIiwiJGNvcmRvdmFPYXV0aCIsInN0b3JhZ2UiLCJKU09OIiwic3RyaW5naWZ5IiwiZ29Ub05ld0dhbWUiLCJjcmVhdGVOZXdHYW1lIiwiJG9uIiwiZXZlbnQiLCJkYXRhIiwib3RoZXJ3aXNlIiwiTG9naW5GYWN0b3J5IiwiJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZSIsImxvZ2luV2l0aFNsYWNrIiwiZ2V0U2xhY2tDcmVkcyIsInRoZW4iLCJzbGFjayIsImNyZWRzIiwiY2xpZW50SUQiLCJjbGllbnRTZWNyZXQiLCJzZXRVc2VyIiwiaW5mbyIsImNhbkRyYWdDb250ZW50IiwicmVkaXJlY3RVc2VyIiwidXNlciIsInRlYW1EZWNrcyIsInN0YW5kYXJkRGVjayIsImNhcmRzIiwiZ2V0Q2FyZHNCeURlY2tJZCIsImRlY2tJZCIsImN1cnJlbnRWaWV3IiwiZ2FtZUNvbmZpZyIsImdvVG9EZWNrcyIsImxvY2F0aW9uIiwicmVsb2FkIiwiY29uY2F0Iiwic3RhcnROZXdHYW1lIiwiYWRkRGVja3NUb0dhbWUiLCJhZGREZWNrcyIsIiRpb25pY1BvcHVwIiwiJGRpZ2VzdCIsInNuYXBzaG90Iiwiam9pbkdhbWUiLCJqb2luR2FtZUJ5SWQiLCJzaG93UG9wdXAiLCJteVBvcHVwIiwic2hvdyIsInRlbXBsYXRlIiwidGl0bGUiLCJzY29wZSIsImJ1dHRvbnMiLCJ0ZXh0IiwidHlwZSIsIm9uVGFwIiwiZmFjdG9yeSIsIiRodHRwIiwiJHJvb3RTY29wZSIsIiRxIiwiaW5pdGlhbGl6ZUZpcmViYXNlIiwiYXBpS2V5IiwiYXV0aERvbWFpbiIsImRhdGFiYXNlVVJMIiwic3RvcmFnZUJ1Y2tldCIsIm1lc3NhZ2luZ1NlbmRlcklkIiwiZmlyZWJhc2UiLCJpbml0aWFsaXplQXBwIiwidGVhbSIsImlkIiwiY3JlYXRvcklkIiwicG9zdCIsImNyZWF0b3JOYW1lIiwicmVzIiwiZ2FtZVJlZiIsImRhdGFiYXNlIiwicmVmIiwib24iLCJ2YWwiLCIkYnJvYWRjYXN0IiwiZ2V0IiwicGxheWVySWQiLCJwbGF5ZXJOYW1lIiwicGxheWVyUmVmIiwic2V0IiwiZ2V0VXNlcnNCeUdhbWVJZCIsImdhbWVzUmVmIiwib25jZSIsImRlZmVyIiwicHJvbWlzZSIsImdldEdhbWVzQnlVc2VyIiwidXNlcklkIiwibWV0aG9kIiwiaGVhZGVycyIsInNldExvY2FsU3RvcmFnZSIsImdldFNsYWNrSW5mbyIsIiRyZXNldCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQUEsT0FBQUMsR0FBQSxHQUFBQyxRQUFBQyxNQUFBLENBQUEsc0JBQUEsRUFBQSxDQUFBLE9BQUEsRUFBQSxXQUFBLEVBQUEsV0FBQSxFQUFBLGdCQUFBLEVBQUEsV0FBQSxFQUFBLGNBQUEsQ0FBQSxDQUFBOztBQUVBRixJQUFBRyxHQUFBLENBQUEsVUFBQUMsY0FBQSxFQUFBO0FBQ0FBLG1CQUFBQyxLQUFBLENBQUEsWUFBQTtBQUNBLFlBQUFOLE9BQUFPLE9BQUEsSUFBQVAsT0FBQU8sT0FBQSxDQUFBQyxPQUFBLENBQUFDLFFBQUEsRUFBQTtBQUNBO0FBQ0E7QUFDQUYsb0JBQUFDLE9BQUEsQ0FBQUMsUUFBQSxDQUFBQyx3QkFBQSxDQUFBLElBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0FILG9CQUFBQyxPQUFBLENBQUFDLFFBQUEsQ0FBQUUsYUFBQSxDQUFBLElBQUE7QUFDQTtBQUNBLFlBQUFYLE9BQUFZLFNBQUEsRUFBQTtBQUNBQSxzQkFBQUMsaUJBQUE7QUFDQTtBQUNBLEtBZEE7QUFnQkEsQ0FqQkE7O0FDUEFaLElBQUFhLFVBQUEsQ0FBQSxZQUFBLEVBQUEsVUFBQUMsTUFBQSxFQUFBQyxXQUFBLEVBQUFDLE1BQUEsRUFBQUMsYUFBQSxFQUFBQyxRQUFBLEVBQUE7QUFDQUosV0FBQUssTUFBQSxHQUFBLFlBQUE7QUFDQUosb0JBQUFJLE1BQUE7QUFDQUgsZUFBQUksRUFBQSxDQUFBLE9BQUE7QUFDQSxLQUhBO0FBSUEsQ0FMQTtBQ0FBcEIsSUFBQXFCLE1BQUEsQ0FBQSxVQUFBQyxjQUFBLEVBQUE7QUFDQUEsbUJBQUFDLEtBQUEsQ0FBQSxPQUFBLEVBQUE7QUFDQUMsYUFBQSxRQURBO0FBRUFDLHFCQUFBLCtCQUZBO0FBR0FaLG9CQUFBO0FBSEEsS0FBQTtBQUtBLENBTkE7O0FBUUFiLElBQUFhLFVBQUEsQ0FBQSxlQUFBLEVBQUEsVUFBQUMsTUFBQSxFQUFBO0FBQ0FBLFdBQUFZLFFBQUEsR0FBQSxJQUFBO0FBQ0EsQ0FGQTtBQ1JBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUNwSkExQixJQUFBcUIsTUFBQSxDQUFBLFVBQUFDLGNBQUEsRUFBQTtBQUNBQSxtQkFBQUMsS0FBQSxDQUFBLE9BQUEsRUFBQTtBQUNBQyxhQUFBLGVBREE7QUFFQUMscUJBQUEscUJBRkE7QUFHQVosb0JBQUEsVUFIQTtBQUlBYyxpQkFBQTtBQUNBQyxtQkFBQSxlQUFBQyxXQUFBLEVBQUFDLFlBQUE7QUFBQSx1QkFBQUQsWUFBQUUsZ0JBQUEsQ0FBQUMsWUFBQUMsTUFBQSxDQUFBO0FBQUE7QUFEQTtBQUpBLEtBQUE7QUFTQSxDQVZBOztBQVlBakMsSUFBQWEsVUFBQSxDQUFBLFVBQUEsRUFBQSxVQUFBQyxNQUFBLEVBQUEsQ0FJQSxDQUpBO0FDWkFkLElBQUFxQixNQUFBLENBQUEsVUFBQUMsY0FBQSxFQUFBOztBQUVBQSxtQkFBQUMsS0FBQSxDQUFBLE1BQUEsRUFBQTtBQUNBQyxhQUFBLE9BREE7QUFFQVUsa0JBQUEsSUFGQTtBQUdBVCxxQkFBQSxtQkFIQTtBQUlBWixvQkFBQTtBQUpBLEtBQUEsRUFNQVUsS0FOQSxDQU1BLGVBTkEsRUFNQTtBQUNBQyxhQUFBLG1CQURBO0FBRUFDLHFCQUFBLHVCQUZBO0FBR0FaLG9CQUFBLGFBSEE7QUFJQWMsaUJBQUE7QUFDQVEsa0JBQUEsY0FBQU4sV0FBQSxFQUFBQyxZQUFBO0FBQUEsdUJBQUFELFlBQUFPLGVBQUEsQ0FBQU4sYUFBQU8sTUFBQSxDQUFBO0FBQUE7QUFEQTtBQUpBLEtBTkE7QUFjQSxDQWhCQTs7QUFrQkFyQyxJQUFBYSxVQUFBLENBQUEsVUFBQSxFQUFBLFVBQUFDLE1BQUEsRUFBQWUsV0FBQSxFQUFBLENBRUEsQ0FGQTs7QUFJQTdCLElBQUFhLFVBQUEsQ0FBQSxhQUFBLEVBQUEsVUFBQUMsTUFBQSxFQUFBZSxXQUFBLEVBQUFNLElBQUEsRUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBRyxZQUFBQyxHQUFBLENBQUFKLElBQUE7QUFDQXJCLFdBQUFxQixJQUFBLEdBQUFBLElBQUE7QUFDQXJCLFdBQUEwQixJQUFBLEdBQUFMLEtBQUFNLFFBQUEsQ0FBQUQsSUFBQTtBQUNBMUIsV0FBQTRCLFdBQUEsR0FBQUMsT0FBQUMsSUFBQSxDQUFBVCxLQUFBVSxPQUFBLEVBQUFDLE1BQUE7QUFDQWhDLFdBQUFpQyxpQkFBQSxHQUFBWixLQUFBTSxRQUFBLENBQUFPLFVBQUEsR0FBQWxDLE9BQUE0QixXQUFBO0FBQ0E1QixXQUFBbUMsVUFBQSxHQUFBZCxLQUFBZSxJQUFBLENBQUFDLFVBQUE7QUFHQSxDQWhCQTs7QUN0QkFuRCxJQUFBcUIsTUFBQSxDQUFBLFVBQUFDLGNBQUEsRUFBQThCLGtCQUFBLEVBQUE7QUFDQTlCLG1CQUFBQyxLQUFBLENBQUEsTUFBQSxFQUFBO0FBQ0FDLGFBQUEsR0FEQTtBQUVBQyxxQkFBQSxtQkFGQTtBQUdBWixvQkFBQSxVQUhBO0FBSUFjLGlCQUFBO0FBQ0EwQixtQkFBQSxlQUFBeEIsV0FBQSxFQUFBO0FBQ0EsdUJBQUFBLFlBQUF5QixnQkFBQSxFQUFBO0FBQ0E7QUFIQTtBQUpBLEtBQUE7QUFVQSxDQVhBOztBQWFBdEQsSUFBQWEsVUFBQSxDQUFBLFVBQUEsRUFBQSxVQUFBQyxNQUFBLEVBQUFFLE1BQUEsRUFBQXVDLGFBQUEsRUFBQXhDLFdBQUEsRUFBQWMsV0FBQSxFQUFBWixhQUFBLEVBQUFvQyxLQUFBLEVBQUE7QUFDQXZDLFdBQUEwQyxPQUFBLEdBQUF2QyxhQUFBO0FBQ0FILFdBQUF1QyxLQUFBLEdBQUFBLEtBQUE7QUFDQWYsWUFBQUMsR0FBQSxDQUFBLE9BQUEsRUFBQWtCLEtBQUFDLFNBQUEsQ0FBQTVDLE9BQUF1QyxLQUFBLENBQUE7QUFDQXZDLFdBQUE2QyxXQUFBLEdBQUEsWUFBQTtBQUNBM0MsZUFBQUksRUFBQSxDQUFBLGVBQUE7QUFDQSxLQUZBOztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQU4sV0FBQThDLGFBQUEsR0FBQSxZQUFBO0FBQ0F0QixnQkFBQUMsR0FBQSxDQUFBLG9CQUFBO0FBQ0F2QixlQUFBSSxFQUFBLENBQUEsZUFBQTtBQUNBLEtBSEE7O0FBS0FOLFdBQUErQyxHQUFBLENBQUEsYUFBQSxFQUFBLFVBQUFDLEtBQUEsRUFBQUMsSUFBQSxFQUFBO0FBQ0F6QixnQkFBQUMsR0FBQSxDQUFBLHdCQUFBO0FBQ0FELGdCQUFBQyxHQUFBLENBQUEsV0FBQSxFQUFBd0IsSUFBQTtBQUNBO0FBQ0E7QUFFQSxLQU5BO0FBT0EsQ0FwQ0E7O0FDYkEvRCxJQUFBcUIsTUFBQSxDQUFBLFVBQUFDLGNBQUEsRUFBQThCLGtCQUFBLEVBQUE7QUFDQTlCLG1CQUFBQyxLQUFBLENBQUEsT0FBQSxFQUFBO0FBQ0FDLGFBQUEsUUFEQTtBQUVBQyxxQkFBQSxxQkFGQTtBQUdBWixvQkFBQTtBQUhBLEtBQUE7QUFLQXVDLHVCQUFBWSxTQUFBLENBQUEsUUFBQTtBQUNBLENBUEE7O0FBU0FoRSxJQUFBYSxVQUFBLENBQUEsV0FBQSxFQUFBLFVBQUFDLE1BQUEsRUFBQUUsTUFBQSxFQUFBaUQsWUFBQSxFQUFBbEQsV0FBQSxFQUFBd0MsYUFBQSxFQUFBdEMsYUFBQSxFQUFBQyxRQUFBLEVBQUFnRCxzQkFBQSxFQUFBO0FBQ0FwRCxXQUFBcUQsY0FBQSxHQUFBLFlBQUE7QUFDQSxlQUFBRixhQUFBRyxhQUFBLEdBQ0FDLElBREEsQ0FDQSxpQkFBQTtBQUNBLG1CQUFBZCxjQUFBZSxLQUFBLENBQUFDLE1BQUFDLFFBQUEsRUFBQUQsTUFBQUUsWUFBQSxFQUFBLENBQUEsZ0JBQUEsRUFBQSxlQUFBLEVBQUEsaUJBQUEsQ0FBQSxDQUFBO0FBQ0EsU0FIQSxFQUlBSixJQUpBLENBSUE7QUFBQSxtQkFBQXRELFlBQUEyRCxPQUFBLENBQUFDLElBQUEsQ0FBQTtBQUFBLFNBSkEsRUFLQU4sSUFMQSxDQUtBO0FBQUEsbUJBQUFyRCxPQUFBSSxFQUFBLENBQUEsTUFBQSxDQUFBO0FBQUEsU0FMQSxDQUFBO0FBTUEsS0FQQTs7QUFTQThDLDJCQUFBVSxjQUFBLENBQUEsS0FBQTs7QUFFQTlELFdBQUErQyxHQUFBLENBQUEsa0JBQUEsRUFBQSxZQUFBO0FBQUFLLCtCQUFBVSxjQUFBLENBQUEsSUFBQTtBQUFBLEtBQUE7O0FBRUE5RCxXQUFBMEMsT0FBQSxHQUFBdkMsYUFBQTs7QUFFQSxhQUFBNEQsWUFBQSxHQUFBO0FBQ0F2QyxnQkFBQUMsR0FBQSxDQUFBLG9CQUFBLEVBQUF6QixPQUFBMEMsT0FBQSxDQUFBc0IsSUFBQTtBQUNBLFlBQUFoRSxPQUFBMEMsT0FBQSxDQUFBc0IsSUFBQSxFQUFBOUQsT0FBQUksRUFBQSxDQUFBLE1BQUE7QUFDQTs7QUFFQXlEO0FBQ0EsQ0F0QkE7QUNUQTdFLElBQUFxQixNQUFBLENBQUEsVUFBQUMsY0FBQSxFQUFBOEIsa0JBQUEsRUFBQTs7QUFFQTlCLG1CQUFBQyxLQUFBLENBQUEsVUFBQSxFQUFBO0FBQ0FDLGFBQUEsV0FEQTtBQUVBVSxrQkFBQSxJQUZBO0FBR0FULHFCQUFBLHVCQUhBO0FBSUFaLG9CQUFBLGFBSkE7QUFLQWMsaUJBQUE7QUFDQW9ELHVCQUFBLG1CQUFBbEQsV0FBQTtBQUFBLHVCQUFBQSxZQUFBRSxnQkFBQSxFQUFBO0FBQUEsYUFEQTtBQUVBaUQsMEJBQUEsc0JBQUFuRCxXQUFBO0FBQUEsdUJBQUFBLFlBQUFFLGdCQUFBLENBQUEsQ0FBQSxDQUFBO0FBQUE7QUFGQTtBQUxBLEtBQUEsRUFXQVIsS0FYQSxDQVdBLGVBWEEsRUFXQTtBQUNBQyxhQUFBLGFBREE7QUFFQUMscUJBQUE7QUFGQSxLQVhBLEVBZ0JBRixLQWhCQSxDQWdCQSxvQkFoQkEsRUFnQkE7QUFDQUMsYUFBQSxZQURBO0FBRUFDLHFCQUFBO0FBRkEsS0FoQkEsRUFxQkFGLEtBckJBLENBcUJBLGVBckJBLEVBcUJBO0FBQ0FDLGFBQUEsZUFEQTtBQUVBQyxxQkFBQSx1QkFGQTtBQUdBWixvQkFBQSxVQUhBO0FBSUFjLGlCQUFBO0FBQ0FzRCxtQkFBQSxlQUFBcEQsV0FBQSxFQUFBQyxZQUFBO0FBQUEsdUJBQUFELFlBQUFxRCxnQkFBQSxDQUFBcEQsYUFBQXFELE1BQUEsQ0FBQTtBQUFBO0FBREE7O0FBSkEsS0FyQkE7O0FBZ0NBL0IsdUJBQUFZLFNBQUEsQ0FBQSxzQkFBQTtBQUNBLENBbkNBOztBQXFDQWhFLElBQUFhLFVBQUEsQ0FBQSxhQUFBLEVBQUEsVUFBQUMsTUFBQSxFQUFBZSxXQUFBLEVBQUFiLE1BQUEsRUFBQStELFNBQUEsRUFBQUMsWUFBQSxFQUFBO0FBQ0FsRSxXQUFBc0UsV0FBQSxHQUFBLFVBQUE7QUFDQXRFLFdBQUF1RSxVQUFBLEdBQUEsRUFBQTtBQUNBdkUsV0FBQXVFLFVBQUEsQ0FBQXpELEtBQUEsR0FBQSxFQUFBO0FBQ0FkLFdBQUF3RSxTQUFBLEdBQUEsWUFBQTtBQUNBdEUsZUFBQUksRUFBQSxDQUFBLG9CQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUFtRSxVQUFBLElBQUEsRUFBQUMsUUFBQSxJQUFBLEVBQUE7QUFDQSxLQUZBOztBQUlBMUUsV0FBQWMsS0FBQSxHQUFBb0QsYUFBQVMsTUFBQSxDQUFBVixTQUFBLENBQUE7O0FBRUFqRSxXQUFBNEUsWUFBQSxHQUFBLFVBQUFMLFVBQUEsRUFBQTtBQUNBeEQsb0JBQUE2RCxZQUFBLENBQUFMLFVBQUEsRUFBQWhCLElBQUEsQ0FBQSxZQUFBO0FBQ0FyRCxtQkFBQUksRUFBQSxDQUFBLE1BQUEsRUFEQSxDQUNBO0FBQ0EsU0FGQTtBQUdBLEtBSkE7QUFLQU4sV0FBQTZFLGNBQUEsR0FBQTlELFlBQUErRCxRQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFHQSxDQXpCQTs7QUEyQkE1RixJQUFBYSxVQUFBLENBQUEsVUFBQSxFQUFBLFVBQUFDLE1BQUEsRUFBQWUsV0FBQSxFQUFBYixNQUFBLEVBQUFpRSxLQUFBLEVBQUE7QUFDQW5FLFdBQUFtRSxLQUFBLEdBQUFBLEtBQUE7QUFDQSxDQUZBOztBQ2hFQWpGLElBQUFxQixNQUFBLENBQUEsVUFBQUMsY0FBQSxFQUFBO0FBQ0FBLG1CQUFBQyxLQUFBLENBQUEsWUFBQSxFQUFBO0FBQ0FDLGFBQUEsYUFEQTtBQUVBQyxxQkFBQSwrQkFGQTtBQUdBWixvQkFBQTtBQUhBLEtBQUE7QUFLQSxDQU5BOztBQVFBYixJQUFBYSxVQUFBLENBQUEsZUFBQSxFQUFBLFVBQUFDLE1BQUEsRUFBQWUsV0FBQSxFQUFBZ0UsV0FBQSxFQUFBM0UsUUFBQSxFQUFBRixNQUFBLEVBQUE7O0FBRUFhLGdCQUFBeUIsZ0JBQUEsQ0FBQSxHQUFBLEVBQ0FlLElBREEsQ0FDQSxpQkFBQTtBQUNBdkQsZUFBQXVDLEtBQUEsR0FBQUEsS0FBQTtBQUNBdkMsZUFBQWdGLE9BQUE7QUFDQSxLQUpBOztBQU9BaEYsV0FBQStDLEdBQUEsQ0FBQSxhQUFBLEVBQUEsVUFBQUMsS0FBQSxFQUFBaUMsUUFBQSxFQUFBO0FBQ0FqRixlQUFBMEIsSUFBQSxHQUFBdUQsU0FBQXZELElBQUE7QUFDQTFCLGVBQUFnRixPQUFBO0FBQ0EsS0FIQTs7QUFLQWhGLFdBQUFrRixRQUFBLEdBQUFuRSxZQUFBb0UsWUFBQTs7QUFFQW5GLFdBQUFvRixTQUFBLEdBQUEsVUFBQTdELE1BQUEsRUFBQTs7QUFFQSxZQUFBOEQsVUFBQU4sWUFBQU8sSUFBQSxDQUFBO0FBQ0FDLHNCQUFBLG9CQURBO0FBRUFDLG1CQUFBLGtCQUZBO0FBR0FDLG1CQUFBekYsTUFIQTtBQUlBMEYscUJBQUEsQ0FDQSxFQUFBQyxNQUFBLFFBQUEsRUFEQSxFQUVBO0FBQ0FBLHNCQUFBLGFBREE7QUFFQUMsc0JBQUEsaUJBRkE7QUFHQUMsdUJBQUEsa0JBQUE7QUFDQXJFLDRCQUFBQyxHQUFBLENBQUFGLE1BQUE7QUFDQXZCLDJCQUFBa0YsUUFBQSxDQUFBM0QsTUFBQTtBQUNBckIsMkJBQUFJLEVBQUEsQ0FBQSxlQUFBLEVBQUEsRUFBQWlCLFFBQUFBLE1BQUEsRUFBQTtBQUNBO0FBUEEsYUFGQTtBQUpBLFNBQUEsQ0FBQTtBQWlCQSxLQW5CQTtBQW9CQSxDQXBDQTs7QUNSQTtBQ0FBckMsSUFBQTRHLE9BQUEsQ0FBQSxhQUFBLEVBQUEsVUFBQUMsS0FBQSxFQUFBQyxVQUFBLEVBQUE3RixhQUFBLEVBQUE4RixFQUFBLEVBQUE7O0FBRUEsUUFBQWxGLGNBQUEsRUFBQTs7QUFFQSxRQUFBbUYscUJBQUEsU0FBQUEsa0JBQUEsR0FBQTtBQUNBLFlBQUEzRixTQUFBO0FBQ0E0RixvQkFBQSx5Q0FEQTtBQUVBQyx3QkFBQSxnQ0FGQTtBQUdBQyx5QkFBQSx1Q0FIQTtBQUlBQywyQkFBQSw0QkFKQTtBQUtBQywrQkFBQTtBQUxBLFNBQUE7QUFPQUMsaUJBQUFDLGFBQUEsQ0FBQWxHLE1BQUE7QUFDQSxLQVRBO0FBVUEyRjs7QUFFQW5GLGdCQUFBNkQsWUFBQSxHQUFBLFVBQUFMLFVBQUEsRUFBQTtBQUNBO0FBQ0EvQyxnQkFBQUMsR0FBQSxDQUFBLG1CQUFBLEVBQUE4QyxVQUFBO0FBQ0EsWUFBQXBELFNBQUFoQixjQUFBdUcsSUFBQSxDQUFBQyxFQUFBLElBQUEsQ0FBQTtBQUNBLFlBQUFDLFlBQUF6RyxjQUFBNkQsSUFBQSxDQUFBMkMsRUFBQSxJQUFBLENBQUE7QUFDQSxlQUFBWixNQUFBYyxJQUFBLENBQUEscUNBQUEsRUFBQTtBQUNBbkYsa0JBQUE2QyxXQUFBN0MsSUFBQSxJQUFBLGFBREE7QUFFQVAsb0JBQUFBLE1BRkE7QUFHQXlGLHVCQUFBQSxTQUhBO0FBSUFFLHlCQUFBM0csY0FBQTZELElBQUEsQ0FBQXRDLElBQUEsSUFBQSxLQUpBLEVBSUE7QUFDQUMsc0JBQUE0QztBQUxBLFNBQUEsRUFPQWhCLElBUEEsQ0FPQTtBQUFBLG1CQUFBd0QsSUFBQTlELElBQUE7QUFBQSxTQVBBLEVBUUFNLElBUkEsQ0FRQSxrQkFBQTtBQUNBLGdCQUFBeUQsVUFBQVIsU0FBQVMsUUFBQSxHQUFBQyxHQUFBLGFBQUEvRixNQUFBLGVBQUFJLE1BQUEsQ0FBQTtBQUNBeUYsb0JBQUFHLEVBQUEsQ0FBQSxPQUFBLEVBQUEsb0JBQUE7QUFDQTNGLHdCQUFBQyxHQUFBLENBQUEsNkJBQUEsRUFBQXdELFNBQUFtQyxHQUFBLEVBQUE7QUFDQXBCLDJCQUFBcUIsVUFBQSxDQUFBLGFBQUEsRUFBQXBDLFNBQUFtQyxHQUFBLEVBQUE7QUFDQSxhQUhBO0FBSUEsU0FkQSxDQUFBO0FBZ0JBLEtBckJBOztBQXVCQXJHLGdCQUFBcUQsZ0JBQUEsR0FBQSxVQUFBdUMsRUFBQSxFQUFBO0FBQ0FuRixnQkFBQUMsR0FBQSxDQUFBLDZCQUFBLEVBQUFrRixFQUFBO0FBQ0EsZUFBQVosTUFBQXVCLEdBQUEsMENBQUFYLEVBQUEsYUFDQXBELElBREEsQ0FDQSxlQUFBO0FBQ0EvQixvQkFBQUMsR0FBQSxDQUFBLGNBQUEsRUFBQXNGLElBQUE5RCxJQUFBO0FBQ0EsbUJBQUE4RCxJQUFBOUQsSUFBQTtBQUNBLFNBSkEsQ0FBQTtBQUtBLEtBUEE7O0FBV0FsQyxnQkFBQThELGNBQUEsR0FBQSxVQUFBdEQsTUFBQSxFQUFBVCxLQUFBLEVBQUE7QUFDQSxlQUFBaUYsTUFBQWMsSUFBQSxnQkFBQXRGLE1BQUEsYUFBQVQsS0FBQSxDQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FQQTs7QUFVQUMsZ0JBQUFvRSxZQUFBLEdBQUEsVUFBQTVELE1BQUEsRUFBQTtBQUNBLFlBQUFKLFNBQUEsQ0FBQTtBQUNBLFlBQUFvRyxXQUFBLENBQUE7QUFDQSxZQUFBQyxhQUFBLEtBQUE7QUFDQSxZQUFBQyxZQUFBakIsU0FBQVMsUUFBQSxHQUFBQyxHQUFBLFlBQUEvRixNQUFBLGVBQUFJLE1BQUEsaUJBQUFnRyxRQUFBLENBQUE7QUFDQUUsa0JBQUFDLEdBQUEsQ0FBQTtBQUNBaEcsa0JBQUE4RjtBQURBLFNBQUE7QUFHQSxZQUFBUixVQUFBUixTQUFBUyxRQUFBLEdBQUFDLEdBQUEsWUFBQS9GLE1BQUEsZUFBQUksTUFBQSxDQUFBO0FBQ0F5RixnQkFBQUcsRUFBQSxDQUFBLE9BQUEsRUFBQSxvQkFBQTtBQUNBbkIsdUJBQUFxQixVQUFBLENBQUEsYUFBQSxFQUFBcEMsU0FBQW1DLEdBQUEsRUFBQTtBQUNBLFNBRkE7QUFHQSxLQVpBOztBQWVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUFyRyxnQkFBQUUsZ0JBQUEsR0FBQSxVQUFBMEYsRUFBQSxFQUFBO0FBQ0EsWUFBQXhGLFNBQUEsT0FBQXdGLEVBQUEsS0FBQSxRQUFBLEdBQUF4RyxjQUFBdUcsSUFBQSxDQUFBQyxFQUFBLEdBQUFBLEVBQUEsQ0FEQSxDQUNBO0FBQ0EsZUFBQVosTUFBQXVCLEdBQUEsMkNBQUFuRyxNQUFBLEVBQ0FvQyxJQURBLENBQ0E7QUFBQSxtQkFBQXdELElBQUE5RCxJQUFBO0FBQUEsU0FEQSxDQUFBO0FBR0EsS0FMQTs7QUFRQWxDLGdCQUFBNEcsZ0JBQUEsR0FBQSxVQUFBcEcsTUFBQSxFQUFBO0FBQ0EsZUFBQXdFLE1BQUF1QixHQUFBLHNDQUFBL0YsTUFBQSxZQUFBO0FBQ0EsS0FGQTs7QUFNQVIsZ0JBQUFPLGVBQUEsR0FBQSxVQUFBQyxNQUFBLEVBQUE7QUFDQTtBQUNBQyxnQkFBQUMsR0FBQSxDQUFBRixNQUFBO0FBQ0EsWUFBQUosU0FBQSxDQUFBO0FBQ0EsWUFBQXlHLFdBQUFwQixTQUFBUyxRQUFBLEdBQUFDLEdBQUEsWUFBQS9GLE1BQUEsZUFBQUksTUFBQSxDQUFBO0FBQ0EsZUFBQXFHLFNBQUFDLElBQUEsQ0FBQSxPQUFBLEVBQUF0RSxJQUFBLENBQUEsb0JBQUE7QUFDQS9CLG9CQUFBQyxHQUFBLENBQUEsT0FBQSxFQUFBd0QsU0FBQW1DLEdBQUEsRUFBQTtBQUNBLG1CQUFBbkMsU0FBQW1DLEdBQUEsRUFBQTtBQUNBLFNBSEEsQ0FBQTs7QUFLQTtBQUNBLEtBWEE7O0FBYUFyRyxnQkFBQXlCLGdCQUFBLEdBQUEsVUFBQXJCLE1BQUEsRUFBQTtBQUNBSyxnQkFBQUMsR0FBQSxDQUFBLGdCQUFBLEVBQUFOLE1BQUE7O0FBRUEsWUFBQXlHLFdBQUFwQixTQUFBUyxRQUFBLEdBQUFDLEdBQUEsWUFBQS9GLE1BQUEsWUFBQTtBQUNBLGVBQUF5RyxTQUFBQyxJQUFBLENBQUEsT0FBQSxFQUFBdEUsSUFBQSxDQUFBLG9CQUFBO0FBQUE7QUFDQS9CLG9CQUFBQyxHQUFBLENBQUEsWUFBQSxFQUFBd0QsU0FBQW1DLEdBQUEsRUFBQTtBQUNBLG1CQUFBbkMsU0FBQW1DLEdBQUEsRUFBQTtBQUNBLFNBSEEsQ0FBQTtBQUlBLEtBUkE7O0FBVUFyRyxnQkFBQXlCLGdCQUFBLEdBQUEsVUFBQXJCLE1BQUEsRUFBQTtBQUNBQSxpQkFBQUEsVUFBQWhCLGNBQUF1RyxJQUFBLENBQUFDLEVBQUE7QUFDQW5GLGdCQUFBQyxHQUFBLENBQUEsZ0JBQUEsRUFBQU4sTUFBQTtBQUNBLFlBQUEyRyxRQUFBN0IsR0FBQTZCLEtBQUEsRUFBQTs7QUFFQSxZQUFBRixXQUFBcEIsU0FBQVMsUUFBQSxHQUFBQyxHQUFBLFlBQUEvRixNQUFBLFlBQUE7QUFDQXlHLGlCQUFBVCxFQUFBLENBQUEsT0FBQSxFQUFBLG9CQUFBO0FBQ0EzRixvQkFBQUMsR0FBQSxDQUFBLFlBQUEsRUFBQXdELFNBQUFtQyxHQUFBLEVBQUE7QUFDQVUsa0JBQUFqSCxPQUFBLENBQUFvRSxTQUFBbUMsR0FBQSxFQUFBO0FBQ0EsU0FIQTtBQUlBNUYsZ0JBQUFDLEdBQUEsQ0FBQSxlQUFBLEVBQUFxRyxNQUFBQyxPQUFBO0FBQ0EsZUFBQUQsTUFBQUMsT0FBQTtBQUNBLEtBWkE7O0FBY0FoSCxnQkFBQWlILGNBQUEsR0FBQSxVQUFBQyxNQUFBLEVBQUE7QUFDQSxlQUFBbEMsTUFBQXVCLEdBQUEsQ0FBQSxnREFBQVcsTUFBQSxFQUNBMUUsSUFEQSxDQUNBO0FBQUEsbUJBQUF3RCxJQUFBOUQsSUFBQTtBQUFBLFNBREEsQ0FBQTtBQUVBLEtBSEE7O0FBTUEsV0FBQWxDLFdBQUE7QUFDQSxDQTlJQTs7QUNBQTdCLElBQUE0RyxPQUFBLENBQUEsY0FBQSxFQUFBLFVBQUFDLEtBQUEsRUFBQTtBQUNBLFdBQUE7QUFDQXpDLHVCQUFBLHlCQUFBO0FBQ0EsbUJBQUF5QyxNQUFBdUIsR0FBQSxDQUFBLGlDQUFBLEVBQ0EvRCxJQURBLENBQ0EsZUFBQTtBQUNBLHVCQUFBd0QsSUFBQTlELElBQUE7QUFDQSxhQUhBLENBQUE7QUFJQTtBQU5BLEtBQUE7QUFRQSxDQVRBOztBQ0FBL0QsSUFBQTRHLE9BQUEsQ0FBQSxhQUFBLEVBQUEsVUFBQUMsS0FBQSxFQUFBNUYsYUFBQSxFQUFBQyxRQUFBLEVBQUFGLE1BQUEsRUFBQTs7QUFFQSxXQUFBO0FBQ0EwRCxpQkFBQSxpQkFBQUMsSUFBQSxFQUFBO0FBQUE7O0FBQ0EsbUJBQUFrQyxNQUFBO0FBQ0FtQyx3QkFBQSxNQURBO0FBRUF4SCxxQkFBQSxpQ0FGQTtBQUdBeUgseUJBQUE7QUFDQSxvQ0FBQTtBQURBLGlCQUhBO0FBTUFsRixzQkFBQVk7QUFOQSxhQUFBLEVBUUFOLElBUkEsQ0FRQSxlQUFBO0FBQ0Esc0JBQUE2RSxlQUFBLENBQUFyQixJQUFBOUQsSUFBQSxDQUFBZSxJQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUErQyxJQUFBOUQsSUFBQSxDQUFBeUQsSUFBQSxDQUFBLENBQUEsQ0FBQTtBQUNBLGFBVkEsQ0FBQTtBQVdBLFNBYkE7O0FBZUEyQixzQkFBQSx3QkFBQTtBQUNBLG1CQUFBdEMsTUFBQXVCLEdBQUEsQ0FBQSxzQ0FBQSxDQUFBO0FBQ0EsU0FqQkE7O0FBbUJBYyx5QkFBQSx5QkFBQXBFLElBQUEsRUFBQTBDLElBQUEsRUFBQTtBQUNBdkcsMEJBQUE2RCxJQUFBLEdBQUFBLElBQUE7QUFDQTdELDBCQUFBdUcsSUFBQSxHQUFBQSxJQUFBO0FBQ0EsU0F0QkE7O0FBd0JBckcsZ0JBQUEsa0JBQUE7QUFDQUYsMEJBQUFtSSxNQUFBO0FBQ0E7QUExQkEsS0FBQTtBQTRCQSxDQTlCQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW9uaWMgU3RhcnRlciBBcHBcblxuLy8gYW5ndWxhci5tb2R1bGUgaXMgYSBnbG9iYWwgcGxhY2UgZm9yIGNyZWF0aW5nLCByZWdpc3RlcmluZyBhbmQgcmV0cmlldmluZyBBbmd1bGFyIG1vZHVsZXNcbi8vICdzdGFydGVyJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xud2luZG93LmFwcCA9IGFuZ3VsYXIubW9kdWxlKCdCbGFua0FnYWluc3RIdW1hbml0eScsIFsnaW9uaWMnLCAndWkucm91dGVyJywnbmdDb3Jkb3ZhJywnbmdDb3Jkb3ZhT2F1dGgnLCAnbmdTdG9yYWdlJywgJ3VpLmJvb3RzdHJhcCddKVxuXG5hcHAucnVuKGZ1bmN0aW9uKCRpb25pY1BsYXRmb3JtKSB7XG4gICAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh3aW5kb3cuY29yZG92YSAmJiB3aW5kb3cuY29yZG92YS5wbHVnaW5zLktleWJvYXJkKSB7XG4gICAgICAgICAgICAvLyBIaWRlIHRoZSBhY2Nlc3NvcnkgYmFyIGJ5IGRlZmF1bHQgKHJlbW92ZSB0aGlzIHRvIHNob3cgdGhlIGFjY2Vzc29yeSBiYXIgYWJvdmUgdGhlIGtleWJvYXJkXG4gICAgICAgICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuaGlkZUtleWJvYXJkQWNjZXNzb3J5QmFyKHRydWUpO1xuXG4gICAgICAgICAgICAvLyBEb24ndCByZW1vdmUgdGhpcyBsaW5lIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcuIEl0IHN0b3BzIHRoZSB2aWV3cG9ydFxuICAgICAgICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcbiAgICAgICAgICAgIC8vIGEgbXVjaCBuaWNlciBrZXlib2FyZCBleHBlcmllbmNlLlxuICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmRpc2FibGVTY3JvbGwodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgICAgICAgIFN0YXR1c0Jhci5zdHlsZUxpZ2h0Q29udGVudCgpXG4gICAgICAgIH1cbiAgICB9KTtcblxufSlcbiIsImFwcC5jb250cm9sbGVyKCdMb2dvdXRDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCBVc2VyRmFjdG9yeSwgJHN0YXRlLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCl7XG5cdCRzY29wZS5sb2dPdXQgPSBmdW5jdGlvbigpe1xuXHRcdFVzZXJGYWN0b3J5LmxvZ091dCgpXG5cdFx0JHN0YXRlLmdvKCdsb2dpbicpXG5cdH1cbn0pIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcil7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdjYXJkcycsIHtcblx0XHR1cmw6ICcvY2FyZHMnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvY2FyZHMtdGVzdC9jYXJkcy10ZXN0Lmh0bWwnLFxuXHRcdGNvbnRyb2xsZXI6ICdDYXJkc1Rlc3RDdHJsJ1xuXHR9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0NhcmRzVGVzdEN0cmwnLCBmdW5jdGlvbigkc2NvcGUpe1xuIFx0JHNjb3BlLmdyZWV0aW5nID0gXCJISVwiXG59KSIsIi8vIChmdW5jdGlvbiAoKSB7XG5cbi8vICAgICAndXNlIHN0cmljdCc7XG5cbi8vICAgICAvLyBIb3BlIHlvdSBkaWRuJ3QgZm9yZ2V0IEFuZ3VsYXIhIER1aC1kb3kuXG4vLyAgICAgaWYgKCF3aW5kb3cuYW5ndWxhcikgdGhyb3cgbmV3IEVycm9yKCdJIGNhblxcJ3QgZmluZCBBbmd1bGFyIScpO1xuXG4vLyAgICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdmc2FQcmVCdWlsdCcsIFtdKTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdTb2NrZXQnLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgIGlmICghd2luZG93LmlvKSB0aHJvdyBuZXcgRXJyb3IoJ3NvY2tldC5pbyBub3QgZm91bmQhJyk7XG4vLyAgICAgICAgIHJldHVybiB3aW5kb3cuaW8od2luZG93LmxvY2F0aW9uLm9yaWdpbik7XG4vLyAgICAgfSk7XG5cbi8vICAgICAvLyBBVVRIX0VWRU5UUyBpcyB1c2VkIHRocm91Z2hvdXQgb3VyIGFwcCB0b1xuLy8gICAgIC8vIGJyb2FkY2FzdCBhbmQgbGlzdGVuIGZyb20gYW5kIHRvIHRoZSAkcm9vdFNjb3BlXG4vLyAgICAgLy8gZm9yIGltcG9ydGFudCBldmVudHMgYWJvdXQgYXV0aGVudGljYXRpb24gZmxvdy5cbi8vICAgICBhcHAuY29uc3RhbnQoJ0FVVEhfRVZFTlRTJywge1xuLy8gICAgICAgICBsb2dpblN1Y2Nlc3M6ICdhdXRoLWxvZ2luLXN1Y2Nlc3MnLFxuLy8gICAgICAgICBsb2dpbkZhaWxlZDogJ2F1dGgtbG9naW4tZmFpbGVkJyxcbi8vICAgICAgICAgbG9nb3V0U3VjY2VzczogJ2F1dGgtbG9nb3V0LXN1Y2Nlc3MnLFxuLy8gICAgICAgICBzZXNzaW9uVGltZW91dDogJ2F1dGgtc2Vzc2lvbi10aW1lb3V0Jyxcbi8vICAgICAgICAgbm90QXV0aGVudGljYXRlZDogJ2F1dGgtbm90LWF1dGhlbnRpY2F0ZWQnLFxuLy8gICAgICAgICBub3RBdXRob3JpemVkOiAnYXV0aC1ub3QtYXV0aG9yaXplZCdcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdBdXRoSW50ZXJjZXB0b3InLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHEsIEFVVEhfRVZFTlRTKSB7XG4vLyAgICAgICAgIHZhciBzdGF0dXNEaWN0ID0ge1xuLy8gICAgICAgICAgICAgNDAxOiBBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLFxuLy8gICAgICAgICAgICAgNDAzOiBBVVRIX0VWRU5UUy5ub3RBdXRob3JpemVkLFxuLy8gICAgICAgICAgICAgNDE5OiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCxcbi8vICAgICAgICAgICAgIDQ0MDogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXRcbi8vICAgICAgICAgfTtcbi8vICAgICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgICAgIHJlc3BvbnNlRXJyb3I6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChzdGF0dXNEaWN0W3Jlc3BvbnNlLnN0YXR1c10sIHJlc3BvbnNlKTtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlc3BvbnNlKVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9O1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLmNvbmZpZyhmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xuLy8gICAgICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKFtcbi8vICAgICAgICAgICAgICckaW5qZWN0b3InLFxuLy8gICAgICAgICAgICAgZnVuY3Rpb24gKCRpbmplY3Rvcikge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkaW5qZWN0b3IuZ2V0KCdBdXRoSW50ZXJjZXB0b3InKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgXSk7XG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuc2VydmljZSgnQXV0aFNlcnZpY2UnLCBmdW5jdGlvbiAoJGh0dHAsIFNlc3Npb24sICRyb290U2NvcGUsIEFVVEhfRVZFTlRTLCAkcSkge1xuXG4vLyAgICAgICAgIGZ1bmN0aW9uIG9uU3VjY2Vzc2Z1bExvZ2luKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICB2YXIgdXNlciA9IHJlc3BvbnNlLmRhdGEudXNlcjtcbi8vICAgICAgICAgICAgIFNlc3Npb24uY3JlYXRlKHVzZXIpO1xuLy8gICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ2luU3VjY2Vzcyk7XG4vLyAgICAgICAgICAgICByZXR1cm4gdXNlcjtcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIC8vIFVzZXMgdGhlIHNlc3Npb24gZmFjdG9yeSB0byBzZWUgaWYgYW5cbi8vICAgICAgICAgLy8gYXV0aGVudGljYXRlZCB1c2VyIGlzIGN1cnJlbnRseSByZWdpc3RlcmVkLlxuLy8gICAgICAgICB0aGlzLmlzQXV0aGVudGljYXRlZCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAhIVNlc3Npb24udXNlcjtcbi8vICAgICAgICAgfTtcblxuICAgICAgICBcbi8vICAgICAgICAgdGhpcy5pc0FkbWluID0gZnVuY3Rpb24odXNlcklkKXtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdydW5uaW5nIGFkbWluIGZ1bmMnKVxuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKVxuLy8gICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YS51c2VyLmlzQWRtaW4pXG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICB0aGlzLmdldExvZ2dlZEluVXNlciA9IGZ1bmN0aW9uIChmcm9tU2VydmVyKSB7XG5cbi8vICAgICAgICAgICAgIC8vIElmIGFuIGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbiBleGlzdHMsIHdlXG4vLyAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIHVzZXIgYXR0YWNoZWQgdG8gdGhhdCBzZXNzaW9uXG4vLyAgICAgICAgICAgICAvLyB3aXRoIGEgcHJvbWlzZS4gVGhpcyBlbnN1cmVzIHRoYXQgd2UgY2FuXG4vLyAgICAgICAgICAgICAvLyBhbHdheXMgaW50ZXJmYWNlIHdpdGggdGhpcyBtZXRob2QgYXN5bmNocm9ub3VzbHkuXG5cbi8vICAgICAgICAgICAgIC8vIE9wdGlvbmFsbHksIGlmIHRydWUgaXMgZ2l2ZW4gYXMgdGhlIGZyb21TZXJ2ZXIgcGFyYW1ldGVyLFxuLy8gICAgICAgICAgICAgLy8gdGhlbiB0aGlzIGNhY2hlZCB2YWx1ZSB3aWxsIG5vdCBiZSB1c2VkLlxuXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSAmJiBmcm9tU2VydmVyICE9PSB0cnVlKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLndoZW4oU2Vzc2lvbi51c2VyKTtcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgLy8gTWFrZSByZXF1ZXN0IEdFVCAvc2Vzc2lvbi5cbi8vICAgICAgICAgICAgIC8vIElmIGl0IHJldHVybnMgYSB1c2VyLCBjYWxsIG9uU3VjY2Vzc2Z1bExvZ2luIHdpdGggdGhlIHJlc3BvbnNlLlxuLy8gICAgICAgICAgICAgLy8gSWYgaXQgcmV0dXJucyBhIDQwMSByZXNwb25zZSwgd2UgY2F0Y2ggaXQgYW5kIGluc3RlYWQgcmVzb2x2ZSB0byBudWxsLlxuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKS50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKS5jYXRjaChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4vLyAgICAgICAgICAgICB9KTtcblxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbiAoY3JlZGVudGlhbHMpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvbG9naW4nLCBjcmVkZW50aWFscylcbi8vICAgICAgICAgICAgICAgICAudGhlbihvblN1Y2Nlc3NmdWxMb2dpbilcbi8vICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHsgbWVzc2FnZTogJ0ludmFsaWQgbG9naW4gY3JlZGVudGlhbHMuJ30pO1xuLy8gICAgICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMuc2lnbnVwID0gZnVuY3Rpb24oY3JlZGVudGlhbHMpe1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbi8vICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbi8vICAgICAgICAgICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbi8vICAgICAgICAgICAgICAgICBkYXRhOiBjcmVkZW50aWFsc1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQuZGF0YSlcbi8vICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbigpe1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3Qoe21lc3NhZ2U6ICdUaGF0IGVtYWlsIGlzIGFscmVhZHkgYmVpbmcgdXNlZC4nfSk7XG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL2xvZ291dCcpLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgIFNlc3Npb24uZGVzdHJveSgpO1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dvdXRTdWNjZXNzKTtcbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuc2VydmljZSgnU2Vzc2lvbicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUykge1xuXG4vLyAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuLy8gICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICBzZWxmLmRlc3Ryb3koKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuXG4vLyAgICAgICAgIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24gKHVzZXIpIHtcbi8vICAgICAgICAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcbi8vICAgICAgICAgfTtcblxuLy8gICAgIH0pO1xuXG4vLyB9KCkpO1xuIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIpID0+IHtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2RlY2tzJywge1xuXHRcdHVybDogJ2RlY2tzLzp0ZWFtaWQnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvZGVja3MvZGVja3MuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0RlY2tDdHJsJyxcblx0XHRyZXNvbHZlOiB7XG5cdFx0XHRkZWNrczogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoc3RhdGVQYXJhbXMudGVhbUlkKVxuXHRcdH1cblx0fSlcblxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0RlY2tDdHJsJywgKCRzY29wZSkgPT4ge1xuXG5cblx0XG59KSIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnL2dhbWUnLFxuICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL2dhbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdHYW1lQ3RybCcsXG4gICAgfSlcbiAgICAuc3RhdGUoJ2dhbWUucHJlLWdhbWUnLCB7XG4gICAgICAgIHVybDogJy86Z2FtZUlkL3ByZS1nYW1lJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9nYW1lL3ByZS1nYW1lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnUHJlR2FtZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBnYW1lIDogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldEdhbWVCeUdhbWVJZCgkc3RhdGVQYXJhbXMuZ2FtZUlkKVxuICAgICAgICB9XG4gICAgfSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdHYW1lQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5KSA9PiB7XG4gICBcbn0pXG5cbmFwcC5jb250cm9sbGVyKFwiUHJlR2FtZUN0cmxcIiwgKCRzY29wZSwgR2FtZUZhY3RvcnksIGdhbWUpID0+IHtcblxuICAgIC8vICRzY29wZS4kb24oJ2NoYW5nZWRHYW1lJywgKGV2ZW50LHNuYXBzaG90KSA9PiB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKHNuYXBzaG90KTtcbiAgICAvLyAgICAgJHNjb3BlLm5hbWUgPSBzbmFwc2hvdC5uYW1lO1xuICAgIC8vICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgIC8vIH0pXG5cbiAgICBjb25zb2xlLmxvZyhnYW1lKTtcbiAgICAkc2NvcGUuZ2FtZSA9IGdhbWU7XG4gICAgJHNjb3BlLm5hbWUgPSBnYW1lLnNldHRpbmdzLm5hbWU7XG4gICAgJHNjb3BlLnBsYXllckNvdW50ID0gT2JqZWN0LmtleXMoZ2FtZS5wbGF5ZXJzKS5sZW5ndGg7XG4gICAgJHNjb3BlLndhaXRpbmdGb3JQbGF5ZXJzID0gIGdhbWUuc2V0dGluZ3MubWluUGxheWVycyAtICRzY29wZS5wbGF5ZXJDb3VudDtcbiAgICAkc2NvcGUud2hpdGVDYXJkcyA9IGdhbWUucGlsZS53aGl0ZWNhcmRzO1xuICAgXG4gICAgXG59KVxuXG4iLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgdXJsOiAnLycsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvaG9tZS9ob21lLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnSG9tZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBnYW1lczogZnVuY3Rpb24oR2FtZUZhY3RvcnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUsICRjb3Jkb3ZhT2F1dGgsIFVzZXJGYWN0b3J5LCBHYW1lRmFjdG9yeSwgJGxvY2FsU3RvcmFnZSwgZ2FtZXMpIHtcbiAgICAkc2NvcGUuc3RvcmFnZSA9ICRsb2NhbFN0b3JhZ2U7XG4gICAgJHNjb3BlLmdhbWVzID0gZ2FtZXM7XG4gICAgY29uc29sZS5sb2coXCJnYW1lc1wiLCBKU09OLnN0cmluZ2lmeSgkc2NvcGUuZ2FtZXMpKVxuICAgICRzY29wZS5nb1RvTmV3R2FtZSA9ICgpID0+IHtcbiAgICAgICAgJHN0YXRlLmdvKCduZXctZ2FtZS5tYWluJylcbiAgICB9XG5cblxuICAgIC8vIC8vIGdldCBnYW1lcyBmcm9tIHBvc3RncmVzXG4gICAgLy8gR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVVzZXIoKVxuICAgIC8vIC50aGVuKGdhbWVzID0+IHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coXCJnYW1lcyBmb3VuZDpcIiwgZ2FtZXMpXG4gICAgLy8gICAgICRzY29wZS5nYW1lcyA9IGdhbWVzO1xuICAgIC8vIH0pXG5cbiAgICAvL2dldCBnYW1lcyBmcm9tIGZpcmViYXNlXG4gICAgLy8gR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCgkc2NvcGUuc3RvcmFnZS50ZWFtLmlkKVxuICAgIC8vIC50aGVuKGdhbWVzID0+IHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coXCJ0aGUgZ2FtZXMgYXJlOlwiLCBnYW1lcylcbiAgICAvLyAgICAgJHNjb3BlLmdhbWVzID0gZ2FtZXM7XG4gICAgLy8gfSlcblxuICAgIC8vJHNjb3BlLnN0YXJ0TmV3R2FtZSA9IEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZTtcbiAgICAkc2NvcGUuY3JlYXRlTmV3R2FtZSA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ2dvaW5nIHRvIG5ldyBzdGF0ZScpXG4gICAgICAgICRzdGF0ZS5nbygnbmV3LWdhbWUubWFpbicpXG4gICAgfVxuXG4gICAgJHNjb3BlLiRvbignY2hhbmdlZEdhbWUnLCAoZXZlbnQsIGRhdGEpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3JlY2VpdmVkIGV2ZW50IGluIGhvbWUnKVxuICAgICAgICBjb25zb2xlLmxvZygnZGF0YSBvYmo6JywgZGF0YSlcbiAgICAgICAgICAgIC8vJHNjb3BlLmdhbWUgPSBkYXRhO1xuICAgICAgICAgICAgLy8gJHNjb3BlLiRkaWdlc3QoKVxuXG4gICAgfSlcbn0pXG5cbiIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcil7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdsb2dpbicsIHtcblx0XHR1cmw6ICcvbG9naW4nLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvbG9naW4vbG9naW4uaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0xvZ2luQ3RybCdcblx0fSlcblx0JHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2xvZ2luJyk7XG59KVxuXG5hcHAuY29udHJvbGxlcignTG9naW5DdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGUsIExvZ2luRmFjdG9yeSwgVXNlckZhY3RvcnksICRjb3Jkb3ZhT2F1dGgsICRsb2NhbFN0b3JhZ2UsICR0aW1lb3V0LCAkaW9uaWNTaWRlTWVudURlbGVnYXRlKXtcbiBcdCRzY29wZS5sb2dpbldpdGhTbGFjayA9IGZ1bmN0aW9uKCl7XG4gXHRcdHJldHVybiBMb2dpbkZhY3RvcnkuZ2V0U2xhY2tDcmVkcygpXG4gXHRcdC50aGVuKGNyZWRzID0+e1xuIFx0XHRcdHJldHVybiAkY29yZG92YU9hdXRoLnNsYWNrKGNyZWRzLmNsaWVudElELCBjcmVkcy5jbGllbnRTZWNyZXQsIFsnaWRlbnRpdHkuYmFzaWMnLCAnaWRlbnRpdHkudGVhbScsICdpZGVudGl0eS5hdmF0YXInXSlcbiBcdFx0fSlcbiBcdFx0LnRoZW4oaW5mbyA9PiBVc2VyRmFjdG9yeS5zZXRVc2VyKGluZm8pKVxuIFx0XHQudGhlbigoKSA9PiAkc3RhdGUuZ28oJ2hvbWUnKSlcbiBcdH1cblxuIFx0JGlvbmljU2lkZU1lbnVEZWxlZ2F0ZS5jYW5EcmFnQ29udGVudChmYWxzZSk7XG5cbiBcdCRzY29wZS4kb24oJyRpb25pY1ZpZXcubGVhdmUnLCBmdW5jdGlvbiAoKSB7ICRpb25pY1NpZGVNZW51RGVsZWdhdGUuY2FuRHJhZ0NvbnRlbnQodHJ1ZSkgfSk7XG5cbiBcdCRzY29wZS5zdG9yYWdlID0gJGxvY2FsU3RvcmFnZVxuXG4gXHRmdW5jdGlvbiByZWRpcmVjdFVzZXIoKXtcbiBcdFx0Y29uc29sZS5sb2coXCJzY29wZSBzdG9yYWdlIHVzZXJcIiwgJHNjb3BlLnN0b3JhZ2UudXNlcilcbiBcdFx0aWYgKCRzY29wZS5zdG9yYWdlLnVzZXIpICRzdGF0ZS5nbygnaG9tZScpXG4gXHR9XG5cblx0cmVkaXJlY3RVc2VyKCk7XG59KSIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpID0+IHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCduZXctZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnL25ldy1nYW1lJyxcbiAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvbWFpbi5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ05ld0dhbWVDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgdGVhbURlY2tzOiAoR2FtZUZhY3RvcnkpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoKSxcbiAgICAgICAgICAgIHN0YW5kYXJkRGVjazogKEdhbWVGYWN0b3J5KSA9PiBHYW1lRmFjdG9yeS5nZXREZWNrc0J5VGVhbUlkKDApXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5tYWluJywge1xuICAgICAgICB1cmw6ICcvc2V0dXAtZ2FtZScsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvbmV3LWdhbWUuaHRtbCcsXG4gICAgfSlcblxuICAgIC5zdGF0ZSgnbmV3LWdhbWUuYWRkLWRlY2tzJywge1xuICAgICAgICB1cmw6ICcvYWRkLWRlY2tzJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9hZGQtZGVja3MuaHRtbCcsXG4gICAgfSlcblxuICAgIC5zdGF0ZSgnbmV3LWdhbWUuZGVjaycsIHtcbiAgICAgICAgdXJsOiAnL2RlY2svOmRlY2tJZCcsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnanMvbmV3LWdhbWUvZGVjay5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0RlY2tDdHJsJyxcbiAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgY2FyZHM6IChHYW1lRmFjdG9yeSwgJHN0YXRlUGFyYW1zKSA9PiBHYW1lRmFjdG9yeS5nZXRDYXJkc0J5RGVja0lkKCRzdGF0ZVBhcmFtcy5kZWNrSWQpXG4gICAgICAgIH1cblxuXG4gICAgfSlcblxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9uZXctZ2FtZS9zZXR1cC1nYW1lJyk7XG59KVxuXG5hcHAuY29udHJvbGxlcignTmV3R2FtZUN0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgJHN0YXRlLCB0ZWFtRGVja3MsIHN0YW5kYXJkRGVjaykgPT4ge1xuICAgICRzY29wZS5jdXJyZW50VmlldyA9ICdhZGREZWNrcydcbiAgICAkc2NvcGUuZ2FtZUNvbmZpZyA9IHt9O1xuICAgICRzY29wZS5nYW1lQ29uZmlnLmRlY2tzID0ge307XG4gICAgJHNjb3BlLmdvVG9EZWNrcyA9ICgpID0+IHtcbiAgICAgICAgJHN0YXRlLmdvKCduZXctZ2FtZS5hZGQtZGVja3MnLCB7fSwgeyBsb2NhdGlvbjogdHJ1ZSwgcmVsb2FkOiB0cnVlIH0pXG4gICAgfVxuXG4gICAgJHNjb3BlLmRlY2tzID0gc3RhbmRhcmREZWNrLmNvbmNhdCh0ZWFtRGVja3MpO1xuXG4gICAgJHNjb3BlLnN0YXJ0TmV3R2FtZSA9IChnYW1lQ29uZmlnKSA9PiB7XG4gICAgICAgIEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZShnYW1lQ29uZmlnKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICRzdGF0ZS5nbygnaG9tZScpIC8vJ2dhbWUucHJlLWdhbWUnLCB7ICdnYW1lSWQnOiAxMDAgfVxuICAgICAgICB9KVxuICAgIH1cbiAgICAkc2NvcGUuYWRkRGVja3NUb0dhbWUgPSBHYW1lRmFjdG9yeS5hZGREZWNrcztcbiAgICAvLyAkc2NvcGUuJG9uKCdjaGFuZ2VkR2FtZScsIChldmVudCwgZGF0YSkgPT4ge1xuICAgIC8vICAgICBjb25zb2xlLmxvZygncmVjZWl2ZWQgZXZlbnQnKVxuICAgIC8vICAgICBjb25zb2xlLmxvZygnZGF0YSBvYmo6JywgZGF0YSlcbiAgICAvLyAgICAgJHNjb3BlLmdhbWUgPSBkYXRhO1xuICAgIC8vICAgICAkc2NvcGUuJGRpZ2VzdCgpXG5cbiAgICAvLyB9KVxuXG5cbn0pXG5cbmFwcC5jb250cm9sbGVyKCdEZWNrQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkc3RhdGUsIGNhcmRzKSA9PiB7XG4gICAgJHNjb3BlLmNhcmRzID0gY2FyZHNcbn0pXG5cbiIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCd0ZWFtLWdhbWVzJywge1xuXHRcdHVybDogJy90ZWFtLWdhbWVzJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL3RlYW0tZ2FtZXMvdGVhbS1nYW1lcy5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnVGVhbUdhbWVzQ3RybCcsXG5cdH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignVGVhbUdhbWVzQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkaW9uaWNQb3B1cCwgJHRpbWVvdXQsICRzdGF0ZSkgPT4ge1xuXHQgXG5cdCBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VGVhbUlkKCcxJylcblx0IFx0LnRoZW4oZ2FtZXMgPT4ge1xuXHQgXHRcdCRzY29wZS5nYW1lcyA9IGdhbWVzO1xuXHQgXHRcdCRzY29wZS4kZGlnZXN0KCk7XG5cdCBcdH0pXG5cblx0IFxuXHQgJHNjb3BlLiRvbignY2hhbmdlZEdhbWUnLCAoZXZlbnQsc25hcHNob3QpID0+e1xuXHQgXHQkc2NvcGUubmFtZT0gc25hcHNob3QubmFtZTtcblx0IFx0JHNjb3BlLiRkaWdlc3QoKTtcblx0IH0pXG5cblx0ICRzY29wZS5qb2luR2FtZSA9IEdhbWVGYWN0b3J5LmpvaW5HYW1lQnlJZDtcblxuXHQgJHNjb3BlLnNob3dQb3B1cCA9IGZ1bmN0aW9uIChnYW1lSWQpIHtcblx0ICAgICBcblx0ICAgICBjb25zdCBteVBvcHVwID0gJGlvbmljUG9wdXAuc2hvdyh7XG5cdCAgICAgXHR0ZW1wbGF0ZTogJzxwPkluZm9ybWF0aW9uPC9wPicsXG5cdCAgICAgXHR0aXRsZTogJ0dhbWUgSW5mb3JtYXRpb24nLFxuXHQgICAgIFx0c2NvcGU6ICRzY29wZSxcblx0ICAgICBcdGJ1dHRvbnM6IFtcblx0ICAgICBcdFx0e3RleHQ6ICdDYW5jZWwnfSxcblx0ICAgICBcdFx0e1xuXHQgICAgIFx0XHRcdHRleHQ6ICc8Yj5Kb2luPC9iPicsXG5cdCAgICAgXHRcdCBcdHR5cGU6ICdidXR0b24tcG9zaXRpdmUnLFxuXHQgICAgIFx0XHQgXHRvblRhcDogZSA9PiB7XG5cdCAgICAgXHRcdCBcdFx0Y29uc29sZS5sb2coZ2FtZUlkKTtcblx0ICAgICBcdFx0IFx0XHQkc2NvcGUuam9pbkdhbWUoZ2FtZUlkKTtcblx0ICAgICBcdFx0IFx0XHQkc3RhdGUuZ28oJ2dhbWUucHJlLWdhbWUnLCB7Z2FtZUlkOiBnYW1lSWR9KVxuXHQgICAgIFx0XHQgXHR9XG5cdCAgICAgXHRcdH1cblx0XHRcdF1cblx0ICAgIH0pXG5cdCB9XG59KVxuIiwiLy9EaXJlY3RpdmUgRmlsZSIsImFwcC5mYWN0b3J5KCdHYW1lRmFjdG9yeScsICgkaHR0cCwgJHJvb3RTY29wZSwgJGxvY2FsU3RvcmFnZSwgJHEpID0+IHtcblxuICAgICAgICBjb25zdCBHYW1lRmFjdG9yeSA9IHt9O1xuXG4gICAgICAgIGNvbnN0IGluaXRpYWxpemVGaXJlYmFzZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICBhcGlLZXk6IFwiQUl6YVN5RC10RGV2WHZpcHl1RTVsemhlV0FScTRodXUxVW1xb0prXCIsXG4gICAgICAgICAgICAgICAgYXV0aERvbWFpbjogXCJjYXBzdG9uZS1mYjBlOC5maXJlYmFzZWFwcC5jb21cIixcbiAgICAgICAgICAgICAgICBkYXRhYmFzZVVSTDogXCJodHRwczovL2NhcHN0b25lLWZiMGU4LmZpcmViYXNlaW8uY29tXCIsXG4gICAgICAgICAgICAgICAgc3RvcmFnZUJ1Y2tldDogXCJjYXBzdG9uZS1mYjBlOC5hcHBzcG90LmNvbVwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjg0OTgzOTY4MDEwN1wiXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChjb25maWcpO1xuICAgICAgICB9O1xuICAgICAgICBpbml0aWFsaXplRmlyZWJhc2UoKTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWUgPSAoZ2FtZUNvbmZpZykgPT4ge1xuICAgICAgICAgICAgLy9jYW4gYWxzbyBnZXQgYWxsIHRoZSBkZWNrcyBieSB0ZWFtIGhlcmUgdG8gcHJlcGFyZVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZSBzZXR0aW5ncyBhcmU6JywgZ2FtZUNvbmZpZylcbiAgICAgICAgICAgIGNvbnN0IHRlYW1JZCA9ICRsb2NhbFN0b3JhZ2UudGVhbS5pZCB8fCAyO1xuICAgICAgICAgICAgY29uc3QgY3JlYXRvcklkID0gJGxvY2FsU3RvcmFnZS51c2VyLmlkIHx8IDM7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnaHR0cDovLzE5Mi4xNjguNC4yMzY6MTMzNy9hcGkvZ2FtZXMnLCB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGdhbWVDb25maWcubmFtZSB8fCAnQm9yaW5nIE5hbWUnLFxuICAgICAgICAgICAgICAgICAgICB0ZWFtSWQ6IHRlYW1JZCxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvcklkOiBjcmVhdG9ySWQsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0b3JOYW1lOiAkbG9jYWxTdG9yYWdlLnVzZXIubmFtZSB8fCAnZGFuJywgLy9taWdodCBiZSB1bm5lY2Vzc2FyeSBpZiB3ZSBoYXZlIHRoZSB1c2VyIGlkXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiBnYW1lQ29uZmlnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgLnRoZW4oZ2FtZUlkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGAvdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICAgICAgICAgIGdhbWVSZWYub24oJ3ZhbHVlJywgc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NuYXBzaG90IGluIGdhbWVmYWN0b3J5IGlzOicsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdjaGFuZ2VkR2FtZScsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgIH07XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0Q2FyZHNCeURlY2tJZCA9IChpZCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NhbGxpbmcgZ2FtZWZhY3Rvcnkgd2l0IGlkICcsIGlkKVxuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldChgaHR0cDovLzE5Mi4xNjguNC4yMzY6MTMzNy9hcGkvZGVja3MvJHtpZH0vY2FyZHNgKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZXMuZGF0YSBpczonLCByZXMuZGF0YSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5kYXRhXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgR2FtZUZhY3RvcnkuYWRkRGVja3NUb0dhbWUgPSAoZ2FtZUlkLCBkZWNrcykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoYGFwaS9nYW1lcy8ke2dhbWVJZH0vZGVja3NgLCBkZWNrcylcblxuICAgICAgICAgICAgLy8gY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9L3BpbGUvYClcbiAgICAgICAgICAgIC8vIGdhbWVSZWYuc2V0KHtcbiAgICAgICAgICAgIC8vICAgICBkZWNrSWQ6IHRydWVcbiAgICAgICAgICAgIC8vIH0pXG4gICAgICAgIH1cblxuXG4gICAgICAgIEdhbWVGYWN0b3J5LmpvaW5HYW1lQnlJZCA9IChnYW1lSWQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRlYW1JZCA9IDE7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJJZCA9IDQ7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJOYW1lID0gJ2NhdCc7XG4gICAgICAgICAgICBjb25zdCBwbGF5ZXJSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfS9wbGF5ZXJzLyR7cGxheWVySWR9YClcbiAgICAgICAgICAgIHBsYXllclJlZi5zZXQoe1xuICAgICAgICAgICAgICAgIG5hbWU6IHBsYXllck5hbWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAgICAgZ2FtZVJlZi5vbigndmFsdWUnLCBzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdjaGFuZ2VkR2FtZScsIHNuYXBzaG90LnZhbCgpKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIEdhbWVGYWN0b3J5LmNyZWF0ZUdhbWVCeUlkRmlyZUJhc2UgPSAoZmlyZWJhc2VnYW1lSWQpID0+IHtcbiAgICAgICAgLy8gICAgIC8vcmV0dXJuICRodHRwLnBvc3QoYGh0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZmlyZWJhc2UvZ2FtZXMvJHtnYW1lSWR9YClcbiAgICAgICAgLy8gICAgIC8vbmVlZHMgdG8gYmUgLnRoZW5hYmxlXG4gICAgICAgIC8vICAgICBjb25zdCBuZXdSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgZ2FtZXMvJHtmaXJlYmFzZWdhbWVJZH1gKS5wdXNoKCk7XG4gICAgICAgIC8vICAgICBuZXdSZWYuc2V0KHtcbiAgICAgICAgLy8gICAgICAgICBwbGF5ZXJJZDogcmVxLnF1ZXJ5LnBsYXllcklkXG4gICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQgPSAoaWQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRlYW1JZCA9ICh0eXBlb2YgaWQgIT09ICdudW1iZXInKSA/ICRsb2NhbFN0b3JhZ2UudGVhbS5pZCA6IGlkOyAvLyBpZCB8fCBsb2NhbHN0b3JhZ2UgZG9lc24ndCB3b3JrIGJlY2F1c2UgMCBpcyBmYWxzZXlcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZGVja3M/dGVhbT0ke3RlYW1JZH1gKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcblxuICAgICAgICB9O1xuXG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0VXNlcnNCeUdhbWVJZCA9IChnYW1lSWQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoYGh0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvZ2FtZXMvJHtnYW1lSWR9L3VzZXJzYCk7XG4gICAgICAgIH07XG5cblxuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVCeUdhbWVJZCA9IChnYW1lSWQpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnN0IGRlZmVyID0gJHEuZGVmZXIoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGdhbWVJZCk7XG4gICAgICAgICAgICBjb25zdCB0ZWFtSWQgPSAxO1xuICAgICAgICAgICAgY29uc3QgZ2FtZXNSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICByZXR1cm4gZ2FtZXNSZWYub25jZSgndmFsdWUnKS50aGVuKHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVEVTVDMnLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gc25hcHNob3QudmFsKCk7XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAvLyByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VGVhbUlkID0gKHRlYW1JZCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZSB0ZWFtIGlzIGlkJywgdGVhbUlkKVxuXG4gICAgICAgICAgICBjb25zdCBnYW1lc1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXNgKVxuICAgICAgICAgICAgcmV0dXJuIGdhbWVzUmVmLm9uY2UoJ3ZhbHVlJykudGhlbihzbmFwc2hvdCA9PiB7IC8vbWlnaHQgYnJlYWsgYWZ0ZXIgeW91IGRvIGl0IG9uY2VcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGhlIHZhbCBpcycsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgIHJldHVybiBzbmFwc2hvdC52YWwoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH07XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCA9ICh0ZWFtSWQpID0+IHtcbiAgICAgICAgICAgIHRlYW1JZCA9IHRlYW1JZCB8fCAkbG9jYWxTdG9yYWdlLnRlYW0uaWRcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGUgdGVhbSBpcyBpZCcsIHRlYW1JZClcbiAgICAgICAgICAgIGNvbnN0IGRlZmVyID0gJHEuZGVmZXIoKTtcblxuICAgICAgICAgICAgY29uc3QgZ2FtZXNSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzYClcbiAgICAgICAgICAgIGdhbWVzUmVmLm9uKCd2YWx1ZScsIHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndGhlIHZhbCBpcycsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgIGRlZmVyLnJlc29sdmUoc25hcHNob3QudmFsKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRlZmVyIHByb21pc2VcIiwgZGVmZXIucHJvbWlzZSlcbiAgICAgICAgICAgIHJldHVybiBkZWZlci5wcm9taXNlO1xuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlVc2VyID0gKHVzZXJJZCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnaHR0cDovL2xvY2FsU3RvcmFnZToxMzM3L2FwaS9nYW1lcy8/dXNlcklkPScgKyB1c2VySWQpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4gR2FtZUZhY3Rvcnk7XG4gICAgfVxuXG4pO1xuXG4iLCJhcHAuZmFjdG9yeSgnTG9naW5GYWN0b3J5JywgZnVuY3Rpb24oJGh0dHApe1xuXHRyZXR1cm4ge1xuXHRcdGdldFNsYWNrQ3JlZHM6IGZ1bmN0aW9uKCl7XG5cdFx0XHRyZXR1cm4gJGh0dHAuZ2V0KCdodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL3NsYWNrJylcdFxuXHRcdFx0XHQudGhlbihyZXMgPT4ge1xuXHRcdFx0XHRcdHJldHVybiByZXMuZGF0YVxuXHRcdFx0XHR9KVxuXHRcdH1cblx0fVxufSlcbiIsImFwcC5mYWN0b3J5KCdVc2VyRmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwLCAkbG9jYWxTdG9yYWdlLCAkdGltZW91dCwgJHN0YXRlKXtcblx0XG5cdHJldHVybiB7XG5cdFx0c2V0VXNlcjogZnVuY3Rpb24oaW5mbyl7XG5cdFx0XHRyZXR1cm4gJGh0dHAoe1xuXHRcdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdFx0dXJsOiAnaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS91c2VycycsXG5cdFx0XHRcdGhlYWRlcnM6IHtcblx0XHRcdFx0XHQnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGRhdGE6IGluZm9cblx0XHRcdH0pXG5cdFx0XHQudGhlbihyZXMgPT4ge1xuXHRcdFx0XHR0aGlzLnNldExvY2FsU3RvcmFnZShyZXMuZGF0YS51c2VyWzBdLCByZXMuZGF0YS50ZWFtWzBdKTtcblx0XHRcdH0pXG5cdFx0fSxcblxuXHRcdGdldFNsYWNrSW5mbzogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiAkaHR0cC5nZXQoJ2h0dHBzOi8vc2xhY2suY29tL2FwaS91c2Vycy5pZGVudGl0eScpXG5cdFx0fSxcblxuXHRcdHNldExvY2FsU3RvcmFnZTogZnVuY3Rpb24odXNlciwgdGVhbSl7XG5cdFx0XHQkbG9jYWxTdG9yYWdlLnVzZXIgPSB1c2VyO1xuXHRcdFx0JGxvY2FsU3RvcmFnZS50ZWFtID0gdGVhbTtcblx0XHR9LFxuXG5cdFx0bG9nT3V0OiBmdW5jdGlvbigpe1xuXHRcdFx0JGxvY2FsU3RvcmFnZS4kcmVzZXQoKTtcblx0XHR9XG5cdH1cbn0pIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
