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
    $scope.currentView = 'addDecks';
    $scope.gameConfig = {};
    $scope.gameConfig.decks = {};
    $scope.goToDecks = function () {
        $state.go('new-game.add-decks', {}, { location: true, reload: true });
    };

    $scope.decks = standardDeck.concat(teamDecks);
    console.log('the decks are: ', $scope.decks);

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
        var teamId = typeof id !== 'number' ? $localStorage.team.id : id; // id || localstorage doesn't work because 0 is falsey
        console.log('the id requested is', teamId);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImxvZ291dC5qcyIsImNhcmRzLXRlc3QvY2FyZHNUZXN0LmpzIiwiZGVja3MvZGVja3MuanMiLCJmcm9tIGZzZy9mcm9tLWZzZy5qcyIsImdhbWUvZ2FtZS5qcyIsImhvbWUvaG9tZS5qcyIsImxvZ2luL2xvZ2luLmpzIiwibmV3LWdhbWUvbmV3LWdhbWUuanMiLCJ0ZWFtLWdhbWVzL3RlYW0tZ2FtZXMuanMiLCJjb21tb24vZGlyZWN0aXZlcy9kaXJlY3RpdmUuanMiLCJjb21tb24vZmFjdG9yaWVzL0dhbWVGYWN0b3J5LmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9sb2dpbkZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yaWVzL3VzZXJGYWN0b3J5LmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsImFwcCIsImFuZ3VsYXIiLCJtb2R1bGUiLCJydW4iLCIkaW9uaWNQbGF0Zm9ybSIsInJlYWR5IiwiY29yZG92YSIsInBsdWdpbnMiLCJLZXlib2FyZCIsImhpZGVLZXlib2FyZEFjY2Vzc29yeUJhciIsImRpc2FibGVTY3JvbGwiLCJTdGF0dXNCYXIiLCJzdHlsZUxpZ2h0Q29udGVudCIsImNvbnRyb2xsZXIiLCIkc2NvcGUiLCJVc2VyRmFjdG9yeSIsIiRzdGF0ZSIsIiRsb2NhbFN0b3JhZ2UiLCIkdGltZW91dCIsImxvZ091dCIsImdvIiwiY29uZmlnIiwiJHN0YXRlUHJvdmlkZXIiLCJzdGF0ZSIsInVybCIsInRlbXBsYXRlVXJsIiwiZ3JlZXRpbmciLCJyZXNvbHZlIiwiZGVja3MiLCJHYW1lRmFjdG9yeSIsIiRzdGF0ZVBhcmFtcyIsImdldERlY2tzQnlUZWFtSWQiLCJzdGF0ZVBhcmFtcyIsInRlYW1JZCIsImFic3RyYWN0IiwiZ2FtZSIsImdldEdhbWVCeUdhbWVJZCIsImdhbWVJZCIsImNvbnNvbGUiLCJsb2ciLCJuYW1lIiwic2V0dGluZ3MiLCJwbGF5ZXJDb3VudCIsIk9iamVjdCIsImtleXMiLCJwbGF5ZXJzIiwibGVuZ3RoIiwid2FpdGluZ0ZvclBsYXllcnMiLCJtaW5QbGF5ZXJzIiwid2hpdGVDYXJkcyIsInBpbGUiLCJ3aGl0ZWNhcmRzIiwiJHVybFJvdXRlclByb3ZpZGVyIiwiZ2FtZXMiLCJnZXRHYW1lc0J5VGVhbUlkIiwiJGNvcmRvdmFPYXV0aCIsInN0b3JhZ2UiLCJKU09OIiwic3RyaW5naWZ5IiwiZ29Ub05ld0dhbWUiLCJjcmVhdGVOZXdHYW1lIiwiJG9uIiwiZXZlbnQiLCJkYXRhIiwib3RoZXJ3aXNlIiwiTG9naW5GYWN0b3J5IiwiJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZSIsImxvZ2luV2l0aFNsYWNrIiwiZ2V0U2xhY2tDcmVkcyIsInRoZW4iLCJzbGFjayIsImNyZWRzIiwiY2xpZW50SUQiLCJjbGllbnRTZWNyZXQiLCJzZXRVc2VyIiwiaW5mbyIsImNhbkRyYWdDb250ZW50IiwicmVkaXJlY3RVc2VyIiwidXNlciIsInRlYW1EZWNrcyIsInN0YW5kYXJkRGVjayIsImNhcmRzIiwiZ2V0Q2FyZHNCeURlY2tJZCIsImRlY2tJZCIsImN1cnJlbnRWaWV3IiwiZ2FtZUNvbmZpZyIsImdvVG9EZWNrcyIsImxvY2F0aW9uIiwicmVsb2FkIiwiY29uY2F0Iiwic3RhcnROZXdHYW1lIiwiYWRkRGVja3NUb0dhbWUiLCJhZGREZWNrcyIsIiRpb25pY1BvcHVwIiwiJGRpZ2VzdCIsInNuYXBzaG90Iiwiam9pbkdhbWUiLCJqb2luR2FtZUJ5SWQiLCJzaG93UG9wdXAiLCJteVBvcHVwIiwic2hvdyIsInRlbXBsYXRlIiwidGl0bGUiLCJzY29wZSIsImJ1dHRvbnMiLCJ0ZXh0IiwidHlwZSIsIm9uVGFwIiwiZmFjdG9yeSIsIiRodHRwIiwiJHJvb3RTY29wZSIsIiRxIiwiaW5pdGlhbGl6ZUZpcmViYXNlIiwiYXBpS2V5IiwiYXV0aERvbWFpbiIsImRhdGFiYXNlVVJMIiwic3RvcmFnZUJ1Y2tldCIsIm1lc3NhZ2luZ1NlbmRlcklkIiwiZmlyZWJhc2UiLCJpbml0aWFsaXplQXBwIiwidGVhbSIsImlkIiwiY3JlYXRvcklkIiwicG9zdCIsImNyZWF0b3JOYW1lIiwicmVzIiwiZ2FtZVJlZiIsImRhdGFiYXNlIiwicmVmIiwib24iLCJ2YWwiLCIkYnJvYWRjYXN0IiwiYWRkQ2FyZFRvR2FtZSIsInBsYXllcklkIiwicGxheWVyTmFtZSIsInBsYXllclJlZiIsInNldCIsImNyZWF0ZUdhbWVCeUlkRmlyZUJhc2UiLCJmaXJlYmFzZWdhbWVJZCIsIm5ld1JlZiIsInB1c2giLCJyZXEiLCJxdWVyeSIsImdldCIsImdldFVzZXJzQnlHYW1lSWQiLCJnYW1lc1JlZiIsIm9uY2UiLCJkZWZlciIsInByb21pc2UiLCJnZXRHYW1lc0J5VXNlciIsInVzZXJJZCIsIm1ldGhvZCIsImhlYWRlcnMiLCJzZXRMb2NhbFN0b3JhZ2UiLCJnZXRTbGFja0luZm8iLCIkcmVzZXQiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0FBLE9BQUFDLEdBQUEsR0FBQUMsUUFBQUMsTUFBQSxDQUFBLHNCQUFBLEVBQUEsQ0FBQSxPQUFBLEVBQUEsV0FBQSxFQUFBLFdBQUEsRUFBQSxnQkFBQSxFQUFBLFdBQUEsRUFBQSxjQUFBLENBQUEsQ0FBQTs7QUFFQUYsSUFBQUcsR0FBQSxDQUFBLFVBQUFDLGNBQUEsRUFBQTtBQUNBQSxtQkFBQUMsS0FBQSxDQUFBLFlBQUE7QUFDQSxZQUFBTixPQUFBTyxPQUFBLElBQUFQLE9BQUFPLE9BQUEsQ0FBQUMsT0FBQSxDQUFBQyxRQUFBLEVBQUE7QUFDQTtBQUNBO0FBQ0FGLG9CQUFBQyxPQUFBLENBQUFDLFFBQUEsQ0FBQUMsd0JBQUEsQ0FBQSxJQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBSCxvQkFBQUMsT0FBQSxDQUFBQyxRQUFBLENBQUFFLGFBQUEsQ0FBQSxJQUFBO0FBQ0E7QUFDQSxZQUFBWCxPQUFBWSxTQUFBLEVBQUE7QUFDQUEsc0JBQUFDLGlCQUFBO0FBQ0E7QUFDQSxLQWRBO0FBZ0JBLENBakJBOztBQ1BBWixJQUFBYSxVQUFBLENBQUEsWUFBQSxFQUFBLFVBQUFDLE1BQUEsRUFBQUMsV0FB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QyxHQUFBLENBQUEsaUNBQUEsRUFDQTFFLElBREEsQ0FDQSxlQUFBO0FBQ0EsdUJBQUF3RCxJQUFBOUQsSUFBQTtBQUNBLGFBSEEsQ0FBQTtBQUlBO0FBTkEsS0FBQTtBQVFBLENBVEE7O0FDQUEvRCxJQUFBNEcsT0FBQSxDQUFBLGFBQUEsRUFBQSxVQUFBQyxLQUFBLEVBQUE1RixhQUFBLEVBQUFDLFFBQUEsRUFBQUYsTUFBQSxFQUFBOztBQUVBLFdBQUE7QUFDQTBELGlCQUFBLGlCQUFBQyxJQUFBLEVBQUE7QUFBQTs7QUFDQSxtQkFBQWtDLE1BQUE7QUFDQTBDLHdCQUFBLE1BREE7QUFFQS9ILHFCQUFBLGlDQUZBO0FBR0FnSSx5QkFBQTtBQUNBLG9DQUFBO0FBREEsaUJBSEE7QUFNQXpGLHNCQUFBWTtBQU5BLGFBQUEsRUFRQU4sSUFSQSxDQVFBLGVBQUE7QUFDQSxzQkFBQW9GLGVBQUEsQ0FBQTVCLElBQUE5RCxJQUFBLENBQUFlLElBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQStDLElBQUE5RCxJQUFBLENBQUF5RCxJQUFBLENBQUEsQ0FBQSxDQUFBO0FBQ0EsYUFWQSxDQUFBO0FBV0EsU0FiQTs7QUFlQWtDLHNCQUFBLHdCQUFBO0FBQ0EsbUJBQUE3QyxNQUFBa0MsR0FBQSxDQUFBLHNDQUFBLENBQUE7QUFDQSxTQWpCQTs7QUFtQkFVLHlCQUFBLHlCQUFBM0UsSUFBQSxFQUFBMEMsSUFBQSxFQUFBO0FBQ0F2RywwQkFBQTZELElBQUEsR0FBQUEsSUFBQTtBQUNBN0QsMEJBQUF1RyxJQUFBLEdBQUFBLElBQUE7QUFDQSxTQXRCQTs7QUF3QkFyRyxnQkFBQSxrQkFBQTtBQUNBRiwwQkFBQTBJLE1BQUE7QUFDQTtBQTFCQSxLQUFBO0FBNEJBLENBOUJBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJb25pYyBTdGFydGVyIEFwcFxuXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xuLy8gJ3N0YXJ0ZXInIGlzIHRoZSBuYW1lIG9mIHRoaXMgYW5ndWxhciBtb2R1bGUgZXhhbXBsZSAoYWxzbyBzZXQgaW4gYSA8Ym9keT4gYXR0cmlidXRlIGluIGluZGV4Lmh0bWwpXG4vLyB0aGUgMm5kIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiAncmVxdWlyZXMnXG53aW5kb3cuYXBwID0gYW5ndWxhci5tb2R1bGUoJ0JsYW5rQWdhaW5zdEh1bWFuaXR5JywgWydpb25pYycsICd1aS5yb3V0ZXInLCduZ0NvcmRvdmEnLCduZ0NvcmRvdmFPYXV0aCcsICduZ1N0b3JhZ2UnLCAndWkuYm9vdHN0cmFwJ10pXG5cbmFwcC5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0pIHtcbiAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgICAgICAgIC8vIEhpZGUgdGhlIGFjY2Vzc29yeSBiYXIgYnkgZGVmYXVsdCAocmVtb3ZlIHRoaXMgdG8gc2hvdyB0aGUgYWNjZXNzb3J5IGJhciBhYm92ZSB0aGUga2V5Ym9hcmRcbiAgICAgICAgICAgIC8vIGZvciBmb3JtIGlucHV0cylcbiAgICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG5cbiAgICAgICAgICAgIC8vIERvbid0IHJlbW92ZSB0aGlzIGxpbmUgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZy4gSXQgc3RvcHMgdGhlIHZpZXdwb3J0XG4gICAgICAgICAgICAvLyBmcm9tIHNuYXBwaW5nIHdoZW4gdGV4dCBpbnB1dHMgYXJlIGZvY3VzZWQuIElvbmljIGhhbmRsZXMgdGhpcyBpbnRlcm5hbGx5IGZvclxuICAgICAgICAgICAgLy8gYSBtdWNoIG5pY2VyIGtleWJvYXJkIGV4cGVyaWVuY2UuXG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2luZG93LlN0YXR1c0Jhcikge1xuICAgICAgICAgICAgU3RhdHVzQmFyLnN0eWxlTGlnaHRDb250ZW50KClcbiAgICAgICAgfVxuICAgIH0pO1xuXG59KVxuIiwiYXBwLmNvbnRyb2xsZXIoJ0xvZ291dEN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIFVzZXJGYWN0b3J5LCAkc3RhdGUsICRsb2NhbFN0b3JhZ2UsICR0aW1lb3V0KXtcblx0JHNjb3BlLmxvZ091dCA9IGZ1bmN0aW9uKCl7XG5cdFx0VXNlckZhY3RvcnkubG9nT3V0KClcblx0XHQkc3RhdGUuZ28oJ2xvZ2luJylcblx0fVxufSkiLCJhcHAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyKXtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2NhcmRzJywge1xuXHRcdHVybDogJy9jYXJkcycsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9jYXJkcy10ZXN0L2NhcmRzLXRlc3QuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0NhcmRzVGVzdEN0cmwnXG5cdH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignQ2FyZHNUZXN0Q3RybCcsIGZ1bmN0aW9uKCRzY29wZSl7XG4gXHQkc2NvcGUuZ3JlZXRpbmcgPSBcIkhJXCJcbn0pIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIpID0+IHtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2RlY2tzJywge1xuXHRcdHVybDogJ2RlY2tzLzp0ZWFtaWQnLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvZGVja3MvZGVja3MuaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0RlY2tDdHJsJyxcblx0XHRyZXNvbHZlOiB7XG5cdFx0XHRkZWNrczogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoc3RhdGVQYXJhbXMudGVhbUlkKVxuXHRcdH1cblx0fSlcblxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0RlY2tDdHJsJywgKCRzY29wZSkgPT4ge1xuXG5cblx0XG59KSIsIi8vIChmdW5jdGlvbiAoKSB7XG5cbi8vICAgICAndXNlIHN0cmljdCc7XG5cbi8vICAgICAvLyBIb3BlIHlvdSBkaWRuJ3QgZm9yZ2V0IEFuZ3VsYXIhIER1aC1kb3kuXG4vLyAgICAgaWYgKCF3aW5kb3cuYW5ndWxhcikgdGhyb3cgbmV3IEVycm9yKCdJIGNhblxcJ3QgZmluZCBBbmd1bGFyIScpO1xuXG4vLyAgICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdmc2FQcmVCdWlsdCcsIFtdKTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdTb2NrZXQnLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgIGlmICghd2luZG93LmlvKSB0aHJvdyBuZXcgRXJyb3IoJ3NvY2tldC5pbyBub3QgZm91bmQhJyk7XG4vLyAgICAgICAgIHJldHVybiB3aW5kb3cuaW8od2luZG93LmxvY2F0aW9uLm9yaWdpbik7XG4vLyAgICAgfSk7XG5cbi8vICAgICAvLyBBVVRIX0VWRU5UUyBpcyB1c2VkIHRocm91Z2hvdXQgb3VyIGFwcCB0b1xuLy8gICAgIC8vIGJyb2FkY2FzdCBhbmQgbGlzdGVuIGZyb20gYW5kIHRvIHRoZSAkcm9vdFNjb3BlXG4vLyAgICAgLy8gZm9yIGltcG9ydGFudCBldmVudHMgYWJvdXQgYXV0aGVudGljYXRpb24gZmxvdy5cbi8vICAgICBhcHAuY29uc3RhbnQoJ0FVVEhfRVZFTlRTJywge1xuLy8gICAgICAgICBsb2dpblN1Y2Nlc3M6ICdhdXRoLWxvZ2luLXN1Y2Nlc3MnLFxuLy8gICAgICAgICBsb2dpbkZhaWxlZDogJ2F1dGgtbG9naW4tZmFpbGVkJyxcbi8vICAgICAgICAgbG9nb3V0U3VjY2VzczogJ2F1dGgtbG9nb3V0LXN1Y2Nlc3MnLFxuLy8gICAgICAgICBzZXNzaW9uVGltZW91dDogJ2F1dGgtc2Vzc2lvbi10aW1lb3V0Jyxcbi8vICAgICAgICAgbm90QXV0aGVudGljYXRlZDogJ2F1dGgtbm90LWF1dGhlbnRpY2F0ZWQnLFxuLy8gICAgICAgICBub3RBdXRob3JpemVkOiAnYXV0aC1ub3QtYXV0aG9yaXplZCdcbi8vICAgICB9KTtcblxuLy8gICAgIGFwcC5mYWN0b3J5KCdBdXRoSW50ZXJjZXB0b3InLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHEsIEFVVEhfRVZFTlRTKSB7XG4vLyAgICAgICAgIHZhciBzdGF0dXNEaWN0ID0ge1xuLy8gICAgICAgICAgICAgNDAxOiBBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLFxuLy8gICAgICAgICAgICAgNDAzOiBBVVRIX0VWRU5UUy5ub3RBdXRob3JpemVkLFxuLy8gICAgICAgICAgICAgNDE5OiBBVVRIX0VWRU5UUy5zZXNzaW9uVGltZW91dCxcbi8vICAgICAgICAgICAgIDQ0MDogQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXRcbi8vICAgICAgICAgfTtcbi8vICAgICAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgICAgIHJlc3BvbnNlRXJyb3I6IGZ1bmN0aW9uIChyZXNwb25zZSkge1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChzdGF0dXNEaWN0W3Jlc3BvbnNlLnN0YXR1c10sIHJlc3BvbnNlKTtcbi8vICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHJlc3BvbnNlKVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9O1xuLy8gICAgIH0pO1xuXG4vLyAgICAgYXBwLmNvbmZpZyhmdW5jdGlvbiAoJGh0dHBQcm92aWRlcikge1xuLy8gICAgICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKFtcbi8vICAgICAgICAgICAgICckaW5qZWN0b3InLFxuLy8gICAgICAgICAgICAgZnVuY3Rpb24gKCRpbmplY3Rvcikge1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkaW5qZWN0b3IuZ2V0KCdBdXRoSW50ZXJjZXB0b3InKTtcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgXSk7XG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuc2VydmljZSgnQXV0aFNlcnZpY2UnLCBmdW5jdGlvbiAoJGh0dHAsIFNlc3Npb24sICRyb290U2NvcGUsIEFVVEhfRVZFTlRTLCAkcSkge1xuXG4vLyAgICAgICAgIGZ1bmN0aW9uIG9uU3VjY2Vzc2Z1bExvZ2luKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgICAgICB2YXIgdXNlciA9IHJlc3BvbnNlLmRhdGEudXNlcjtcbi8vICAgICAgICAgICAgIFNlc3Npb24uY3JlYXRlKHVzZXIpO1xuLy8gICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KEFVVEhfRVZFTlRTLmxvZ2luU3VjY2Vzcyk7XG4vLyAgICAgICAgICAgICByZXR1cm4gdXNlcjtcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIC8vIFVzZXMgdGhlIHNlc3Npb24gZmFjdG9yeSB0byBzZWUgaWYgYW5cbi8vICAgICAgICAgLy8gYXV0aGVudGljYXRlZCB1c2VyIGlzIGN1cnJlbnRseSByZWdpc3RlcmVkLlxuLy8gICAgICAgICB0aGlzLmlzQXV0aGVudGljYXRlZCA9IGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAhIVNlc3Npb24udXNlcjtcbi8vICAgICAgICAgfTtcblxuICAgICAgICBcbi8vICAgICAgICAgdGhpcy5pc0FkbWluID0gZnVuY3Rpb24odXNlcklkKXtcbi8vICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdydW5uaW5nIGFkbWluIGZ1bmMnKVxuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKVxuLy8gICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YS51c2VyLmlzQWRtaW4pXG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICB0aGlzLmdldExvZ2dlZEluVXNlciA9IGZ1bmN0aW9uIChmcm9tU2VydmVyKSB7XG5cbi8vICAgICAgICAgICAgIC8vIElmIGFuIGF1dGhlbnRpY2F0ZWQgc2Vzc2lvbiBleGlzdHMsIHdlXG4vLyAgICAgICAgICAgICAvLyByZXR1cm4gdGhlIHVzZXIgYXR0YWNoZWQgdG8gdGhhdCBzZXNzaW9uXG4vLyAgICAgICAgICAgICAvLyB3aXRoIGEgcHJvbWlzZS4gVGhpcyBlbnN1cmVzIHRoYXQgd2UgY2FuXG4vLyAgICAgICAgICAgICAvLyBhbHdheXMgaW50ZXJmYWNlIHdpdGggdGhpcyBtZXRob2QgYXN5bmNocm9ub3VzbHkuXG5cbi8vICAgICAgICAgICAgIC8vIE9wdGlvbmFsbHksIGlmIHRydWUgaXMgZ2l2ZW4gYXMgdGhlIGZyb21TZXJ2ZXIgcGFyYW1ldGVyLFxuLy8gICAgICAgICAgICAgLy8gdGhlbiB0aGlzIGNhY2hlZCB2YWx1ZSB3aWxsIG5vdCBiZSB1c2VkLlxuXG4vLyAgICAgICAgICAgICBpZiAodGhpcy5pc0F1dGhlbnRpY2F0ZWQoKSAmJiBmcm9tU2VydmVyICE9PSB0cnVlKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuICRxLndoZW4oU2Vzc2lvbi51c2VyKTtcbi8vICAgICAgICAgICAgIH1cblxuLy8gICAgICAgICAgICAgLy8gTWFrZSByZXF1ZXN0IEdFVCAvc2Vzc2lvbi5cbi8vICAgICAgICAgICAgIC8vIElmIGl0IHJldHVybnMgYSB1c2VyLCBjYWxsIG9uU3VjY2Vzc2Z1bExvZ2luIHdpdGggdGhlIHJlc3BvbnNlLlxuLy8gICAgICAgICAgICAgLy8gSWYgaXQgcmV0dXJucyBhIDQwMSByZXNwb25zZSwgd2UgY2F0Y2ggaXQgYW5kIGluc3RlYWQgcmVzb2x2ZSB0byBudWxsLlxuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL3Nlc3Npb24nKS50aGVuKG9uU3VjY2Vzc2Z1bExvZ2luKS5jYXRjaChmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4vLyAgICAgICAgICAgICB9KTtcblxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9naW4gPSBmdW5jdGlvbiAoY3JlZGVudGlhbHMpIHtcbi8vICAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvbG9naW4nLCBjcmVkZW50aWFscylcbi8vICAgICAgICAgICAgICAgICAudGhlbihvblN1Y2Nlc3NmdWxMb2dpbilcbi8vICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVqZWN0KHsgbWVzc2FnZTogJ0ludmFsaWQgbG9naW4gY3JlZGVudGlhbHMuJ30pO1xuLy8gICAgICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMuc2lnbnVwID0gZnVuY3Rpb24oY3JlZGVudGlhbHMpe1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwKHtcbi8vICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbi8vICAgICAgICAgICAgICAgICB1cmw6ICcvc2lnbnVwJyxcbi8vICAgICAgICAgICAgICAgICBkYXRhOiBjcmVkZW50aWFsc1xuLy8gICAgICAgICAgICAgfSlcbi8vICAgICAgICAgICAgIC50aGVuKHJlc3VsdCA9PiByZXN1bHQuZGF0YSlcbi8vICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbigpe1xuLy8gICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3Qoe21lc3NhZ2U6ICdUaGF0IGVtYWlsIGlzIGFscmVhZHkgYmVpbmcgdXNlZC4nfSk7XG4vLyAgICAgICAgICAgICB9KVxuLy8gICAgICAgICB9O1xuXG4vLyAgICAgICAgIHRoaXMubG9nb3V0ID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgcmV0dXJuICRodHRwLmdldCgnL2xvZ291dCcpLnRoZW4oZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgICAgIFNlc3Npb24uZGVzdHJveSgpO1xuLy8gICAgICAgICAgICAgICAgICRyb290U2NvcGUuJGJyb2FkY2FzdChBVVRIX0VWRU5UUy5sb2dvdXRTdWNjZXNzKTtcbi8vICAgICAgICAgICAgIH0pO1xuLy8gICAgICAgICB9O1xuXG4vLyAgICAgfSk7XG5cbi8vICAgICBhcHAuc2VydmljZSgnU2Vzc2lvbicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCBBVVRIX0VWRU5UUykge1xuXG4vLyAgICAgICAgIHZhciBzZWxmID0gdGhpcztcblxuLy8gICAgICAgICAkcm9vdFNjb3BlLiRvbihBVVRIX0VWRU5UUy5ub3RBdXRoZW50aWNhdGVkLCBmdW5jdGlvbiAoKSB7XG4vLyAgICAgICAgICAgICBzZWxmLmRlc3Ryb3koKTtcbi8vICAgICAgICAgfSk7XG5cbi8vICAgICAgICAgJHJvb3RTY29wZS4kb24oQVVUSF9FVkVOVFMuc2Vzc2lvblRpbWVvdXQsIGZ1bmN0aW9uICgpIHtcbi8vICAgICAgICAgICAgIHNlbGYuZGVzdHJveSgpO1xuLy8gICAgICAgICB9KTtcblxuLy8gICAgICAgICB0aGlzLnVzZXIgPSBudWxsO1xuXG4vLyAgICAgICAgIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24gKHVzZXIpIHtcbi8vICAgICAgICAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4vLyAgICAgICAgIH07XG5cbi8vICAgICAgICAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuLy8gICAgICAgICAgICAgdGhpcy51c2VyID0gbnVsbDtcbi8vICAgICAgICAgfTtcblxuLy8gICAgIH0pO1xuXG4vLyB9KCkpO1xuIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIpID0+IHtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdnYW1lJywge1xuICAgICAgICB1cmw6ICcvZ2FtZScsXG4gICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2dhbWUvZ2FtZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0dhbWVDdHJsJyxcbiAgICB9KVxuICAgIC5zdGF0ZSgnZ2FtZS5wcmUtZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnLzpnYW1lSWQvcHJlLWdhbWUnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2dhbWUvcHJlLWdhbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdQcmVHYW1lQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGdhbWUgOiAoR2FtZUZhY3RvcnksICRzdGF0ZVBhcmFtcykgPT4gR2FtZUZhY3RvcnkuZ2V0R2FtZUJ5R2FtZUlkKCRzdGF0ZVBhcmFtcy5nYW1lSWQpXG4gICAgICAgIH1cbiAgICB9KVxufSlcblxuYXBwLmNvbnRyb2xsZXIoJ0dhbWVDdHJsJywgKCRzY29wZSwgR2FtZUZhY3RvcnkpID0+IHtcbiAgIFxufSlcblxuYXBwLmNvbnRyb2xsZXIoXCJQcmVHYW1lQ3RybFwiLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSwgZ2FtZSkgPT4ge1xuXG4gICAgLy8gJHNjb3BlLiRvbignY2hhbmdlZEdhbWUnLCAoZXZlbnQsc25hcHNob3QpID0+IHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coc25hcHNob3QpO1xuICAgIC8vICAgICAkc2NvcGUubmFtZSA9IHNuYXBzaG90Lm5hbWU7XG4gICAgLy8gICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgLy8gfSlcblxuICAgIGNvbnNvbGUubG9nKGdhbWUpO1xuICAgICRzY29wZS5nYW1lID0gZ2FtZTtcbiAgICAkc2NvcGUubmFtZSA9IGdhbWUuc2V0dGluZ3MubmFtZTtcbiAgICAkc2NvcGUucGxheWVyQ291bnQgPSBPYmplY3Qua2V5cyhnYW1lLnBsYXllcnMpLmxlbmd0aDtcbiAgICAkc2NvcGUud2FpdGluZ0ZvclBsYXllcnMgPSAgZ2FtZS5zZXR0aW5ncy5taW5QbGF5ZXJzIC0gJHNjb3BlLnBsYXllckNvdW50O1xuICAgICRzY29wZS53aGl0ZUNhcmRzID0gZ2FtZS5waWxlLndoaXRlY2FyZHM7XG4gICBcbiAgICBcbn0pXG5cbiIsImFwcC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lJywge1xuICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9ob21lL2hvbWUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ3RybCcsXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGdhbWVzOiBmdW5jdGlvbihHYW1lRmFjdG9yeSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VGVhbUlkKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignSG9tZUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSwgJGNvcmRvdmFPYXV0aCwgVXNlckZhY3RvcnksIEdhbWVGYWN0b3J5LCAkbG9jYWxTdG9yYWdlLCBnYW1lcykge1xuICAgICRzY29wZS5zdG9yYWdlID0gJGxvY2FsU3RvcmFnZTtcbiAgICAkc2NvcGUuZ2FtZXMgPSBnYW1lcztcbiAgICBjb25zb2xlLmxvZyhcImdhbWVzXCIsIEpTT04uc3RyaW5naWZ5KCRzY29wZS5nYW1lcykpXG4gICAgJHNjb3BlLmdvVG9OZXdHYW1lID0gKCkgPT4ge1xuICAgICAgICAkc3RhdGUuZ28oJ25ldy1nYW1lLm1haW4nKVxuICAgIH1cblxuXG4gICAgLy8gLy8gZ2V0IGdhbWVzIGZyb20gcG9zdGdyZXNcbiAgICAvLyBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VXNlcigpXG4gICAgLy8gLnRoZW4oZ2FtZXMgPT4ge1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhcImdhbWVzIGZvdW5kOlwiLCBnYW1lcylcbiAgICAvLyAgICAgJHNjb3BlLmdhbWVzID0gZ2FtZXM7XG4gICAgLy8gfSlcblxuICAgIC8vZ2V0IGdhbWVzIGZyb20gZmlyZWJhc2VcbiAgICAvLyBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VGVhbUlkKCRzY29wZS5zdG9yYWdlLnRlYW0uaWQpXG4gICAgLy8gLnRoZW4oZ2FtZXMgPT4ge1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhcInRoZSBnYW1lcyBhcmU6XCIsIGdhbWVzKVxuICAgIC8vICAgICAkc2NvcGUuZ2FtZXMgPSBnYW1lcztcbiAgICAvLyB9KVxuXG4gICAgLy8kc2NvcGUuc3RhcnROZXdHYW1lID0gR2FtZUZhY3Rvcnkuc3RhcnROZXdHYW1lO1xuICAgICRzY29wZS5jcmVhdGVOZXdHYW1lID0gKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnZ29pbmcgdG8gbmV3IHN0YXRlJylcbiAgICAgICAgJHN0YXRlLmdvKCduZXctZ2FtZS5tYWluJylcbiAgICB9XG5cbiAgICAkc2NvcGUuJG9uKCdjaGFuZ2VkR2FtZScsIChldmVudCwgZGF0YSkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygncmVjZWl2ZWQgZXZlbnQgaW4gaG9tZScpXG4gICAgICAgIGNvbnNvbGUubG9nKCdkYXRhIG9iajonLCBkYXRhKVxuICAgICAgICAgICAgLy8kc2NvcGUuZ2FtZSA9IGRhdGE7XG4gICAgICAgICAgICAvLyAkc2NvcGUuJGRpZ2VzdCgpXG5cbiAgICB9KVxufSlcblxuIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKXtcblx0JHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2xvZ2luJywge1xuXHRcdHVybDogJy9sb2dpbicsXG5cdFx0dGVtcGxhdGVVcmw6ICdqcy9sb2dpbi9sb2dpbi5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnTG9naW5DdHJsJ1xuXHR9KVxuXHQkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvbG9naW4nKTtcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdMb2dpbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSwgTG9naW5GYWN0b3J5LCBVc2VyRmFjdG9yeSwgJGNvcmRvdmFPYXV0aCwgJGxvY2FsU3RvcmFnZSwgJHRpbWVvdXQsICRpb25pY1NpZGVNZW51RGVsZWdhdGUpe1xuIFx0JHNjb3BlLmxvZ2luV2l0aFNsYWNrID0gZnVuY3Rpb24oKXtcbiBcdFx0cmV0dXJuIExvZ2luRmFjdG9yeS5nZXRTbGFja0NyZWRzKClcbiBcdFx0LnRoZW4oY3JlZHMgPT57XG4gXHRcdFx0cmV0dXJuICRjb3Jkb3ZhT2F1dGguc2xhY2soY3JlZHMuY2xpZW50SUQsIGNyZWRzLmNsaWVudFNlY3JldCwgWydpZGVudGl0eS5iYXNpYycsICdpZGVudGl0eS50ZWFtJywgJ2lkZW50aXR5LmF2YXRhciddKVxuIFx0XHR9KVxuIFx0XHQudGhlbihpbmZvID0+IFVzZXJGYWN0b3J5LnNldFVzZXIoaW5mbykpXG4gXHRcdC50aGVuKCgpID0+ICRzdGF0ZS5nbygnaG9tZScpKVxuIFx0fVxuXG4gXHQkaW9uaWNTaWRlTWVudURlbGVnYXRlLmNhbkRyYWdDb250ZW50KGZhbHNlKTtcblxuIFx0JHNjb3BlLiRvbignJGlvbmljVmlldy5sZWF2ZScsIGZ1bmN0aW9uICgpIHsgJGlvbmljU2lkZU1lbnVEZWxlZ2F0ZS5jYW5EcmFnQ29udGVudCh0cnVlKSB9KTtcblxuIFx0JHNjb3BlLnN0b3JhZ2UgPSAkbG9jYWxTdG9yYWdlXG5cbiBcdGZ1bmN0aW9uIHJlZGlyZWN0VXNlcigpe1xuIFx0XHRjb25zb2xlLmxvZyhcInNjb3BlIHN0b3JhZ2UgdXNlclwiLCAkc2NvcGUuc3RvcmFnZS51c2VyKVxuIFx0XHRpZiAoJHNjb3BlLnN0b3JhZ2UudXNlcikgJHN0YXRlLmdvKCdob21lJylcbiBcdH1cblxuXHRyZWRpcmVjdFVzZXIoKTtcbn0pIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikgPT4ge1xuXG4gICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ25ldy1nYW1lJywge1xuICAgICAgICB1cmw6ICcvbmV3LWdhbWUnLFxuICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9tYWluLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnTmV3R2FtZUN0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICB0ZWFtRGVja3M6IChHYW1lRmFjdG9yeSkgPT4gR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCgpLFxuICAgICAgICAgICAgc3RhbmRhcmREZWNrOiAoR2FtZUZhY3RvcnkpID0+IEdhbWVGYWN0b3J5LmdldERlY2tzQnlUZWFtSWQoMClcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAuc3RhdGUoJ25ldy1nYW1lLm1haW4nLCB7XG4gICAgICAgIHVybDogJy9zZXR1cC1nYW1lJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9uZXctZ2FtZS5odG1sJyxcbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5hZGQtZGVja3MnLCB7XG4gICAgICAgIHVybDogJy9hZGQtZGVja3MnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL25ldy1nYW1lL2FkZC1kZWNrcy5odG1sJyxcbiAgICB9KVxuXG4gICAgLnN0YXRlKCduZXctZ2FtZS5kZWNrJywge1xuICAgICAgICB1cmw6ICcvZGVjay86ZGVja0lkJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdqcy9uZXctZ2FtZS9kZWNrLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnRGVja0N0cmwnLFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBjYXJkczogKEdhbWVGYWN0b3J5LCAkc3RhdGVQYXJhbXMpID0+IEdhbWVGYWN0b3J5LmdldENhcmRzQnlEZWNrSWQoJHN0YXRlUGFyYW1zLmRlY2tJZClcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvbmV3LWdhbWUvc2V0dXAtZ2FtZScpO1xufSlcblxuYXBwLmNvbnRyb2xsZXIoJ05ld0dhbWVDdHJsJywgKCRzY29wZSwgR2FtZUZhY3RvcnksICRzdGF0ZSwgdGVhbURlY2tzLCBzdGFuZGFyZERlY2spID0+IHtcbiAgICAkc2NvcGUuY3VycmVudFZpZXcgPSAnYWRkRGVja3MnXG4gICAgJHNjb3BlLmdhbWVDb25maWcgPSB7fTtcbiAgICAkc2NvcGUuZ2FtZUNvbmZpZy5kZWNrcyA9IHt9O1xuICAgICRzY29wZS5nb1RvRGVja3MgPSAoKSA9PiB7XG4gICAgICAgICRzdGF0ZS5nbygnbmV3LWdhbWUuYWRkLWRlY2tzJywge30sIHsgbG9jYXRpb246IHRydWUsIHJlbG9hZDogdHJ1ZSB9KVxuICAgIH1cblxuICAgICRzY29wZS5kZWNrcyA9IHN0YW5kYXJkRGVjay5jb25jYXQodGVhbURlY2tzKTtcbiAgICBjb25zb2xlLmxvZygndGhlIGRlY2tzIGFyZTogJywgJHNjb3BlLmRlY2tzKVxuXG4gICAgJHNjb3BlLnN0YXJ0TmV3R2FtZSA9IChnYW1lQ29uZmlnKSA9PiB7XG4gICAgICAgIEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZShnYW1lQ29uZmlnKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICRzdGF0ZS5nbygnaG9tZScpIC8vJ2dhbWUucHJlLWdhbWUnLCB7ICdnYW1lSWQnOiAxMDAgfVxuICAgICAgICB9KVxuICAgIH1cbiAgICAkc2NvcGUuYWRkRGVja3NUb0dhbWUgPSBHYW1lRmFjdG9yeS5hZGREZWNrcztcbiAgICAvLyAkc2NvcGUuJG9uKCdjaGFuZ2VkR2FtZScsIChldmVudCwgZGF0YSkgPT4ge1xuICAgIC8vICAgICBjb25zb2xlLmxvZygncmVjZWl2ZWQgZXZlbnQnKVxuICAgIC8vICAgICBjb25zb2xlLmxvZygnZGF0YSBvYmo6JywgZGF0YSlcbiAgICAvLyAgICAgJHNjb3BlLmdhbWUgPSBkYXRhO1xuICAgIC8vICAgICAkc2NvcGUuJGRpZ2VzdCgpXG5cbiAgICAvLyB9KVxuXG5cbn0pXG5cbmFwcC5jb250cm9sbGVyKCdEZWNrQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkc3RhdGUsIGNhcmRzKSA9PiB7XG4gICAgJHNjb3BlLmNhcmRzID0gY2FyZHNcbn0pXG5cbiIsImFwcC5jb25maWcoKCRzdGF0ZVByb3ZpZGVyKSA9PiB7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCd0ZWFtLWdhbWVzJywge1xuXHRcdHVybDogJy90ZWFtLWdhbWVzJyxcblx0XHR0ZW1wbGF0ZVVybDogJ2pzL3RlYW0tZ2FtZXMvdGVhbS1nYW1lcy5odG1sJyxcblx0XHRjb250cm9sbGVyOiAnVGVhbUdhbWVzQ3RybCcsXG5cdH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignVGVhbUdhbWVzQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5LCAkaW9uaWNQb3B1cCwgJHRpbWVvdXQsICRzdGF0ZSkgPT4ge1xuXHQgXG5cdCBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VGVhbUlkKCcxJylcblx0IFx0LnRoZW4oZ2FtZXMgPT4ge1xuXHQgXHRcdCRzY29wZS5nYW1lcyA9IGdhbWVzO1xuXHQgXHRcdCRzY29wZS4kZGlnZXN0KCk7XG5cdCBcdH0pXG5cblx0IFxuXHQgJHNjb3BlLiRvbignY2hhbmdlZEdhbWUnLCAoZXZlbnQsc25hcHNob3QpID0+e1xuXHQgXHQkc2NvcGUubmFtZT0gc25hcHNob3QubmFtZTtcblx0IFx0JHNjb3BlLiRkaWdlc3QoKTtcblx0IH0pXG5cblx0ICRzY29wZS5qb2luR2FtZSA9IEdhbWVGYWN0b3J5LmpvaW5HYW1lQnlJZDtcblxuXHQgJHNjb3BlLnNob3dQb3B1cCA9IGZ1bmN0aW9uIChnYW1lSWQpIHtcblx0ICAgICBcblx0ICAgICBjb25zdCBteVBvcHVwID0gJGlvbmljUG9wdXAuc2hvdyh7XG5cdCAgICAgXHR0ZW1wbGF0ZTogJzxwPkluZm9ybWF0aW9uPC9wPicsXG5cdCAgICAgXHR0aXRsZTogJ0dhbWUgSW5mb3JtYXRpb24nLFxuXHQgICAgIFx0c2NvcGU6ICRzY29wZSxcblx0ICAgICBcdGJ1dHRvbnM6IFtcblx0ICAgICBcdFx0e3RleHQ6ICdDYW5jZWwnfSxcblx0ICAgICBcdFx0e1xuXHQgICAgIFx0XHRcdHRleHQ6ICc8Yj5Kb2luPC9iPicsXG5cdCAgICAgXHRcdCBcdHR5cGU6ICdidXR0b24tcG9zaXRpdmUnLFxuXHQgICAgIFx0XHQgXHRvblRhcDogZSA9PiB7XG5cdCAgICAgXHRcdCBcdFx0Y29uc29sZS5sb2coZ2FtZUlkKTtcblx0ICAgICBcdFx0IFx0XHQkc2NvcGUuam9pbkdhbWUoZ2FtZUlkKTtcblx0ICAgICBcdFx0IFx0XHQkc3RhdGUuZ28oJ2dhbWUucHJlLWdhbWUnLCB7Z2FtZUlkOiBnYW1lSWR9KVxuXHQgICAgIFx0XHQgXHR9XG5cdCAgICAgXHRcdH1cblx0XHRcdF1cblx0ICAgIH0pXG5cdCB9XG59KVxuIiwiLy9EaXJlY3RpdmUgRmlsZSIsImFwcC5mYWN0b3J5KCdHYW1lRmFjdG9yeScsICgkaHR0cCwgJHJvb3RTY29wZSwgJGxvY2FsU3RvcmFnZSwgJHEpID0+IHtcblxuICAgICAgICBjb25zdCBHYW1lRmFjdG9yeSA9IHt9O1xuXG4gICAgICAgIGNvbnN0IGluaXRpYWxpemVGaXJlYmFzZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgICAgICAgICAgICBhcGlLZXk6IFwiQUl6YVN5RC10RGV2WHZpcHl1RTVsemhlV0FScTRodXUxVW1xb0prXCIsXG4gICAgICAgICAgICAgICAgYXV0aERvbWFpbjogXCJjYXBzdG9uZS1mYjBlOC5maXJlYmFzZWFwcC5jb21cIixcbiAgICAgICAgICAgICAgICBkYXRhYmFzZVVSTDogXCJodHRwczovL2NhcHN0b25lLWZiMGU4LmZpcmViYXNlaW8uY29tXCIsXG4gICAgICAgICAgICAgICAgc3RvcmFnZUJ1Y2tldDogXCJjYXBzdG9uZS1mYjBlOC5hcHBzcG90LmNvbVwiLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2luZ1NlbmRlcklkOiBcIjg0OTgzOTY4MDEwN1wiXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChjb25maWcpO1xuICAgICAgICB9O1xuICAgICAgICBpbml0aWFsaXplRmlyZWJhc2UoKTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWUgPSAoZ2FtZUNvbmZpZykgPT4ge1xuICAgICAgICAgICAgLy9jYW4gYWxzbyBnZXQgYWxsIHRoZSBkZWNrcyBieSB0ZWFtIGhlcmUgdG8gcHJlcGFyZVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZSBzZXR0aW5ncyBhcmU6JywgZ2FtZUNvbmZpZylcbiAgICAgICAgICAgIGNvbnN0IHRlYW1JZCA9ICRsb2NhbFN0b3JhZ2UudGVhbS5pZCB8fCAyO1xuICAgICAgICAgICAgY29uc3QgY3JlYXRvcklkID0gJGxvY2FsU3RvcmFnZS51c2VyLmlkIHx8IDM7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnaHR0cDovLzE5Mi4xNjguNC4yMzY6MTMzNy9hcGkvZ2FtZXMnLCB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGdhbWVDb25maWcubmFtZSB8fCAnQm9yaW5nIE5hbWUnLFxuICAgICAgICAgICAgICAgICAgICB0ZWFtSWQ6IHRlYW1JZCxcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRvcklkOiBjcmVhdG9ySWQsXG4gICAgICAgICAgICAgICAgICAgIGNyZWF0b3JOYW1lOiAkbG9jYWxTdG9yYWdlLnVzZXIubmFtZSB8fCAnZGFuJywgLy9taWdodCBiZSB1bm5lY2Vzc2FyeSBpZiB3ZSBoYXZlIHRoZSB1c2VyIGlkXG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiBnYW1lQ29uZmlnXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG4gICAgICAgICAgICAgICAgLnRoZW4oZ2FtZUlkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2FtZVJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGAvdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICAgICAgICAgIGdhbWVSZWYub24oJ3ZhbHVlJywgc25hcHNob3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NuYXBzaG90IGluIGdhbWVmYWN0b3J5IGlzOicsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgJHJvb3RTY29wZS4kYnJvYWRjYXN0KCdjaGFuZ2VkR2FtZScsIHNuYXBzaG90LnZhbCgpKVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgIH07XG5cblxuICAgICAgICBHYW1lRmFjdG9yeS5hZGRDYXJkVG9HYW1lID0gKGdhbWVJZCkgPT4ge1xuXG4gICAgICAgIH1cblxuICAgICAgICBHYW1lRmFjdG9yeS5hZGREZWNrc1RvR2FtZSA9IChnYW1lSWQsIGRlY2tzKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdChgYXBpL2dhbWVzLyR7Z2FtZUlkfS9kZWNrc2AsIGRlY2tzKVxuXG4gICAgICAgICAgICAvLyBjb25zdCBnYW1lUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH0vcGlsZS9gKVxuICAgICAgICAgICAgLy8gZ2FtZVJlZi5zZXQoe1xuICAgICAgICAgICAgLy8gICAgIGRlY2tJZDogdHJ1ZVxuICAgICAgICAgICAgLy8gfSlcbiAgICAgICAgfVxuXG5cbiAgICAgICAgR2FtZUZhY3Rvcnkuam9pbkdhbWVCeUlkID0gKGdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gMTtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllcklkID0gNDtcbiAgICAgICAgICAgIGNvbnN0IHBsYXllck5hbWUgPSAnY2F0JztcbiAgICAgICAgICAgIGNvbnN0IHBsYXllclJlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGB0ZWFtcy8ke3RlYW1JZH0vZ2FtZXMvJHtnYW1lSWR9L3BsYXllcnMvJHtwbGF5ZXJJZH1gKVxuICAgICAgICAgICAgcGxheWVyUmVmLnNldCh7XG4gICAgICAgICAgICAgICAgbmFtZTogcGxheWVyTmFtZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGNvbnN0IGdhbWVSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzLyR7Z2FtZUlkfWApXG4gICAgICAgICAgICBnYW1lUmVmLm9uKCd2YWx1ZScsIHNuYXBzaG90ID0+IHtcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLiRicm9hZGNhc3QoJ2NoYW5nZWRHYW1lJywgc25hcHNob3QudmFsKCkpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG5cbiAgICAgICAgR2FtZUZhY3RvcnkuY3JlYXRlR2FtZUJ5SWRGaXJlQmFzZSA9IChmaXJlYmFzZWdhbWVJZCkgPT4ge1xuICAgICAgICAgICAgLy9yZXR1cm4gJGh0dHAucG9zdChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9maXJlYmFzZS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAgICAgLy9uZWVkcyB0byBiZSAudGhlbmFibGVcbiAgICAgICAgICAgIGNvbnN0IG5ld1JlZiA9IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBnYW1lcy8ke2ZpcmViYXNlZ2FtZUlkfWApLnB1c2goKTtcbiAgICAgICAgICAgIG5ld1JlZi5zZXQoe1xuICAgICAgICAgICAgICAgIHBsYXllcklkOiByZXEucXVlcnkucGxheWVySWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9HYW1lRmFjdG9yeS5nZXRDYXJkc0J5RGVja0lkIFxuXG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0RGVja3NCeVRlYW1JZCA9IChpZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gKHR5cGVvZiBpZCAhPT0gJ251bWJlcicpID8gJGxvY2FsU3RvcmFnZS50ZWFtLmlkIDogaWQ7IC8vIGlkIHx8IGxvY2Fsc3RvcmFnZSBkb2Vzbid0IHdvcmsgYmVjYXVzZSAwIGlzIGZhbHNleVxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZSBpZCByZXF1ZXN0ZWQgaXMnLCB0ZWFtSWQpXG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2RlY2tzP3RlYW09JHt0ZWFtSWR9YClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpXG5cbiAgICAgICAgfTtcblxuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldFVzZXJzQnlHYW1lSWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KGBodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2dhbWVzLyR7Z2FtZUlkfS91c2Vyc2ApO1xuICAgICAgICB9O1xuXG5cblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRHYW1lQnlHYW1lSWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zdCBkZWZlciA9ICRxLmRlZmVyKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhnYW1lSWQpO1xuICAgICAgICAgICAgY29uc3QgdGVhbUlkID0gMTtcbiAgICAgICAgICAgIGNvbnN0IGdhbWVzUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lcy8ke2dhbWVJZH1gKVxuICAgICAgICAgICAgcmV0dXJuIGdhbWVzUmVmLm9uY2UoJ3ZhbHVlJykudGhlbihzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1RFU1QzJywgc25hcHNob3QudmFsKCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNuYXBzaG90LnZhbCgpO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgLy8gcmV0dXJuIGRlZmVyLnByb21pc2U7XG4gICAgICAgIH07XG5cbiAgICAgICAgR2FtZUZhY3RvcnkuZ2V0R2FtZXNCeVRlYW1JZCA9ICh0ZWFtSWQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aGUgdGVhbSBpcyBpZCcsIHRlYW1JZClcblxuICAgICAgICAgICAgY29uc3QgZ2FtZXNSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZihgdGVhbXMvJHt0ZWFtSWR9L2dhbWVzYClcbiAgICAgICAgICAgIHJldHVybiBnYW1lc1JlZi5vbmNlKCd2YWx1ZScpLnRoZW4oc25hcHNob3QgPT4geyAvL21pZ2h0IGJyZWFrIGFmdGVyIHlvdSBkbyBpdCBvbmNlXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZSB2YWwgaXMnLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gc25hcHNob3QudmFsKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9O1xuXG4gICAgICAgIEdhbWVGYWN0b3J5LmdldEdhbWVzQnlUZWFtSWQgPSAodGVhbUlkKSA9PiB7XG4gICAgICAgICAgICB0ZWFtSWQgPSB0ZWFtSWQgfHwgJGxvY2FsU3RvcmFnZS50ZWFtLmlkXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGhlIHRlYW0gaXMgaWQnLCB0ZWFtSWQpXG4gICAgICAgICAgICBjb25zdCBkZWZlciA9ICRxLmRlZmVyKCk7XG5cbiAgICAgICAgICAgIGNvbnN0IGdhbWVzUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYHRlYW1zLyR7dGVhbUlkfS9nYW1lc2ApXG4gICAgICAgICAgICBnYW1lc1JlZi5vbigndmFsdWUnLCBzbmFwc2hvdCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3RoZSB2YWwgaXMnLCBzbmFwc2hvdC52YWwoKSlcbiAgICAgICAgICAgICAgICBkZWZlci5yZXNvbHZlKHNuYXBzaG90LnZhbCgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJkZWZlciBwcm9taXNlXCIsIGRlZmVyLnByb21pc2UpXG4gICAgICAgICAgICByZXR1cm4gZGVmZXIucHJvbWlzZTtcbiAgICAgICAgfTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5nZXRHYW1lc0J5VXNlciA9ICh1c2VySWQpID0+IHtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJ2h0dHA6Ly9sb2NhbFN0b3JhZ2U6MTMzNy9hcGkvZ2FtZXMvP3VzZXJJZD0nICsgdXNlcklkKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmV0dXJuIEdhbWVGYWN0b3J5O1xuICAgIH1cblxuKTtcblxuIiwiYXBwLmZhY3RvcnkoJ0xvZ2luRmFjdG9yeScsIGZ1bmN0aW9uKCRodHRwKXtcblx0cmV0dXJuIHtcblx0XHRnZXRTbGFja0NyZWRzOiBmdW5jdGlvbigpe1xuXHRcdFx0cmV0dXJuICRodHRwLmdldCgnaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9zbGFjaycpXHRcblx0XHRcdFx0LnRoZW4ocmVzID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gcmVzLmRhdGFcblx0XHRcdFx0fSlcblx0XHR9XG5cdH1cbn0pXG4iLCJhcHAuZmFjdG9yeSgnVXNlckZhY3RvcnknLCBmdW5jdGlvbigkaHR0cCwgJGxvY2FsU3RvcmFnZSwgJHRpbWVvdXQsICRzdGF0ZSl7XG5cdFxuXHRyZXR1cm4ge1xuXHRcdHNldFVzZXI6IGZ1bmN0aW9uKGluZm8pe1xuXHRcdFx0cmV0dXJuICRodHRwKHtcblx0XHRcdFx0bWV0aG9kOiAnUE9TVCcsXG5cdFx0XHRcdHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvdXNlcnMnLFxuXHRcdFx0XHRoZWFkZXJzOiB7XG5cdFx0XHRcdFx0J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRkYXRhOiBpbmZvXG5cdFx0XHR9KVxuXHRcdFx0LnRoZW4ocmVzID0+IHtcblx0XHRcdFx0dGhpcy5zZXRMb2NhbFN0b3JhZ2UocmVzLmRhdGEudXNlclswXSwgcmVzLmRhdGEudGVhbVswXSk7XG5cdFx0XHR9KVxuXHRcdH0sXG5cblx0XHRnZXRTbGFja0luZm86IGZ1bmN0aW9uKCl7XG5cdFx0XHRyZXR1cm4gJGh0dHAuZ2V0KCdodHRwczovL3NsYWNrLmNvbS9hcGkvdXNlcnMuaWRlbnRpdHknKVxuXHRcdH0sXG5cblx0XHRzZXRMb2NhbFN0b3JhZ2U6IGZ1bmN0aW9uKHVzZXIsIHRlYW0pe1xuXHRcdFx0JGxvY2FsU3RvcmFnZS51c2VyID0gdXNlcjtcblx0XHRcdCRsb2NhbFN0b3JhZ2UudGVhbSA9IHRlYW07XG5cdFx0fSxcblxuXHRcdGxvZ091dDogZnVuY3Rpb24oKXtcblx0XHRcdCRsb2NhbFN0b3JhZ2UuJHJlc2V0KCk7XG5cdFx0fVxuXHR9XG59KSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
