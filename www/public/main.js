'use strict';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
window.app = angular.module('BlankAgainstHumanity', ['ionic', 'ui.router']);

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
            StatusBar.styleDefault();
        }
    });
});

app.run(function ($http) {
    $http.get('http://localhost:1337/api/cards');
});
app.config(function ($stateProvider) {
    $stateProvider.state('game', {
        url: '/game',
        templateUrl: 'js/game/game.html',
        controller: 'GameCtrl'
    });
});

app.controller('GameCtrl', function ($scope, GameFactory) {
    $scope.startNewGame = GameFactory.startNewGame;
});
angular.module('myApp', []).controller('MainCtrl', function ($scope) {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAjm8gBlobk922u5APxv3SB-9KnjQwJqmw",
        authDomain: "blankagainst.firebaseapp.com",
        databaseURL: "https://blankagainst.firebaseio.com",
        storageBucket: "blankagainst.appspot.com",
        messagingSenderId: "580664847840"
    };
    firebase.initializeApp(config);

    $scope.comment = {};
    $scope.signIn = function () {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
    };

    $scope.signOut = function () {
        firebase.auth().signOut();
    };

    $scope.comments = [{
        text: 'seed',
        username: 'firstuser'
    }];

    $scope.addComment = function (comment) {
        var newRef = firebase.database().ref().child('comments').push();
        newRef.set({
            username: comment.username,
            text: comment.text
        });
    };

    var readComments = function readComments() {
        console.log('checking comments');

        var commentsRef = firebase.database().ref('comments/');

        commentsRef.on('child_added', function (datas) {
            console.log('data from child added', datas.val());
            console.log('the scope is', $scope);
            var comment = {};
            comment.text = datas.val().text;
            comment.username = datas.val().username;
            $scope.comments.push(comment);
            $scope.$evalAsync();
        });
    };

    readComments();
});
app.config(function ($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });
});

app.controller('LoginCtrl', function ($scope, $state) {
    console.log('LOGIN STATE');
});
//Directive File
app.factory('GameFactory', function ($http) {
    var GameFactory = {};

    GameFactory.addUser = function () {};

    GameFactory.startNewGame = function () {
        console.log('starting new game');
        return $http.post('http://localhost:1337/api/games', {
            name: 'testgame'
        }).then(function (res) {
            return res.data;
        });
    };

    GameFactory.getLoggedInUsersGame = function () {};

    GameFactory.joinGameById = function (gameId) {
        console.log('joining game');
        //var playersTeam = 
        var gameId = 8;
        var playerId = 2; //eventually make it get current 
        return $http.post('http://localhost:1337/api/games/' + gameId + '?playerId=' + playerId, {});
    };

    return GameFactory;
});

//Factory File
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImdhbWUvZ2FtZS5qcyIsImdhbWUvbWFpbi5qcyIsImxvZ2luL2xvZ2luLmpzIiwiY29tbW9uL2RpcmVjdGl2ZXMvZGlyZWN0aXZlLmpzIiwiY29tbW9uL2ZhY3Rvcmllcy9HYW1lRmFjdG9yeS5qcyIsImNvbW1vbi9mYWN0b3JpZXMvZmFjdG9yeS5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJhcHAiLCJhbmd1bGFyIiwibW9kdWxlIiwicnVuIiwiJGlvbmljUGxhdGZvcm0iLCJyZWFkeSIsImNvcmRvdmEiLCJwbHVnaW5zIiwiS2V5Ym9hcmQiLCJoaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIiLCJkaXNhYmxlU2Nyb2xsIiwiU3RhdHVzQmFyIiwic3R5bGVEZWZhdWx0IiwiJGh0dHAiLCJnZXQiLCJjb25maWciLCIkc3RhdGVQcm92aWRlciIsInN0YXRlIiwidXJsIiwidGVtcGxhdGVVcmwiLCJjb250cm9sbGVyIiwiJHNjb3BlIiwiR2FtZUZhY3RvcnkiLCJzdGFydE5ld0dhbWUiLCJhcGlLZXkiLCJhdXRoRG9tYWluIiwiZGF0YWJhc2VVUkwiLCJzdG9yYWdlQnVja2V0IiwibWVzc2FnaW5nU2VuZGVySWQiLCJmaXJlYmFzZSIsImluaXRpYWxpemVBcHAiLCJjb21tZW50Iiwic2lnbkluIiwicHJvdmlkZXIiLCJhdXRoIiwiR29vZ2xlQXV0aFByb3ZpZGVyIiwic2lnbkluV2l0aFBvcHVwIiwic2lnbk91dCIsImNvbW1lbnRzIiwidGV4dCIsInVzZXJuYW1lIiwiYWRkQ29tbWVudCIsIm5ld1JlZiIsImRhdGFiYXNlIiwicmVmIiwiY2hpbGQiLCJwdXNoIiwic2V0IiwicmVhZENvbW1lbnRzIiwiY29uc29sZSIsImxvZyIsImNvbW1lbnRzUmVmIiwib24iLCJkYXRhcyIsInZhbCIsIiRldmFsQXN5bmMiLCIkc3RhdGUiLCJmYWN0b3J5IiwiYWRkVXNlciIsInBvc3QiLCJuYW1lIiwidGhlbiIsInJlcyIsImRhdGEiLCJnZXRMb2dnZWRJblVz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QUFBQyxXQUFBLENBQUEsQ0FKQSxDQUlBO0FBQ0EsZUFBQXRELE1BQUE4QyxJQUFBLHNDQUFBTyxNQUFBLGtCQUFBQyxRQUFBLEVBQUEsRUFBQSxDQUFBO0FBR0EsS0FSQTs7QUFVQSxXQUFBN0MsV0FBQTtBQUNBLENBOUJBOztBQ0FBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBJb25pYyBTdGFydGVyIEFwcFxuXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xuLy8gJ3N0YXJ0ZXInIGlzIHRoZSBuYW1lIG9mIHRoaXMgYW5ndWxhciBtb2R1bGUgZXhhbXBsZSAoYWxzbyBzZXQgaW4gYSA8Ym9keT4gYXR0cmlidXRlIGluIGluZGV4Lmh0bWwpXG4vLyB0aGUgMm5kIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiAncmVxdWlyZXMnXG53aW5kb3cuYXBwID0gYW5ndWxhci5tb2R1bGUoJ0JsYW5rQWdhaW5zdEh1bWFuaXR5JywgWydpb25pYycsICd1aS5yb3V0ZXInXSlcblxuYXBwLnJ1bihmdW5jdGlvbigkaW9uaWNQbGF0Zm9ybSkge1xuICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgICAgICAgLy8gSGlkZSB0aGUgYWNjZXNzb3J5IGJhciBieSBkZWZhdWx0IChyZW1vdmUgdGhpcyB0byBzaG93IHRoZSBhY2Nlc3NvcnkgYmFyIGFib3ZlIHRoZSBrZXlib2FyZFxuICAgICAgICAgICAgLy8gZm9yIGZvcm0gaW5wdXRzKVxuICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcblxuICAgICAgICAgICAgLy8gRG9uJ3QgcmVtb3ZlIHRoaXMgbGluZSB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nLiBJdCBzdG9wcyB0aGUgdmlld3BvcnRcbiAgICAgICAgICAgIC8vIGZyb20gc25hcHBpbmcgd2hlbiB0ZXh0IGlucHV0cyBhcmUgZm9jdXNlZC4gSW9uaWMgaGFuZGxlcyB0aGlzIGludGVybmFsbHkgZm9yXG4gICAgICAgICAgICAvLyBhIG11Y2ggbmljZXIga2V5Ym9hcmQgZXhwZXJpZW5jZS5cbiAgICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5kaXNhYmxlU2Nyb2xsKHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICAgICAgICBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn0pXG5cbmFwcC5ydW4oZnVuY3Rpb24oJGh0dHApIHtcbiAgICAkaHR0cC5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkvY2FyZHMnKTtcbn0pIiwiYXBwLmNvbmZpZygoJHN0YXRlUHJvdmlkZXIpID0+IHtcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnZ2FtZScsIHtcbiAgICAgICAgdXJsOiAnL2dhbWUnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2dhbWUvZ2FtZS5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0dhbWVDdHJsJ1xuICAgIH0pXG59KVxuXG5hcHAuY29udHJvbGxlcignR2FtZUN0cmwnLCAoJHNjb3BlLCBHYW1lRmFjdG9yeSkgPT4ge1xuICAgICRzY29wZS5zdGFydE5ld0dhbWUgPSBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWU7XG59KSIsImFuZ3VsYXIubW9kdWxlKCdteUFwcCcsIFtdKS5jb250cm9sbGVyKCdNYWluQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSkge1xuICAgIC8vIEluaXRpYWxpemUgRmlyZWJhc2VcbiAgICB2YXIgY29uZmlnID0ge1xuICAgICAgICBhcGlLZXk6IFwiQUl6YVN5QWptOGdCbG9iazkyMnU1QVB4djNTQi05S25qUXdKcW13XCIsXG4gICAgICAgIGF1dGhEb21haW46IFwiYmxhbmthZ2FpbnN0LmZpcmViYXNlYXBwLmNvbVwiLFxuICAgICAgICBkYXRhYmFzZVVSTDogXCJodHRwczovL2JsYW5rYWdhaW5zdC5maXJlYmFzZWlvLmNvbVwiLFxuICAgICAgICBzdG9yYWdlQnVja2V0OiBcImJsYW5rYWdhaW5zdC5hcHBzcG90LmNvbVwiLFxuICAgICAgICBtZXNzYWdpbmdTZW5kZXJJZDogXCI1ODA2NjQ4NDc4NDBcIlxuICAgIH07XG4gICAgZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChjb25maWcpO1xuXG4gICAgJHNjb3BlLmNvbW1lbnQgPSB7fTtcbiAgICAkc2NvcGUuc2lnbkluID0gKCkgPT4ge1xuICAgICAgICB2YXIgcHJvdmlkZXIgPSBuZXcgZmlyZWJhc2UuYXV0aC5Hb29nbGVBdXRoUHJvdmlkZXIoKTtcbiAgICAgICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25JbldpdGhQb3B1cChwcm92aWRlcik7XG4gICAgfTtcblxuICAgICRzY29wZS5zaWduT3V0ID0gKCkgPT4ge1xuICAgICAgICBmaXJlYmFzZS5hdXRoKCkuc2lnbk91dCgpO1xuICAgIH07XG5cbiAgICAkc2NvcGUuY29tbWVudHMgPSBbe1xuICAgICAgICB0ZXh0OiAnc2VlZCcsXG4gICAgICAgIHVzZXJuYW1lOiAnZmlyc3R1c2VyJ1xuICAgIH1dO1xuXG5cbiAgICAkc2NvcGUuYWRkQ29tbWVudCA9IChjb21tZW50KSA9PiB7XG4gICAgICAgIHZhciBuZXdSZWYgPSBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZigpLmNoaWxkKCdjb21tZW50cycpLnB1c2goKVxuICAgICAgICBuZXdSZWYuc2V0KHtcbiAgICAgICAgICAgIHVzZXJuYW1lOiBjb21tZW50LnVzZXJuYW1lLFxuICAgICAgICAgICAgdGV4dDogY29tbWVudC50ZXh0XG4gICAgICAgIH0pXG5cbiAgICB9XG5cbiAgICBjb25zdCByZWFkQ29tbWVudHMgPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjaGVja2luZyBjb21tZW50cycpXG5cbiAgICAgICAgdmFyIGNvbW1lbnRzUmVmID0gZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ2NvbW1lbnRzLycpO1xuXG4gICAgICAgIGNvbW1lbnRzUmVmLm9uKCdjaGlsZF9hZGRlZCcsIGZ1bmN0aW9uKGRhdGFzKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZGF0YSBmcm9tIGNoaWxkIGFkZGVkJywgZGF0YXMudmFsKCkpXG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGhlIHNjb3BlIGlzJywgJHNjb3BlKVxuICAgICAgICAgICAgbGV0IGNvbW1lbnQgPSB7fTtcbiAgICAgICAgICAgIGNvbW1lbnQudGV4dCA9IGRhdGFzLnZhbCgpLnRleHQ7XG4gICAgICAgICAgICBjb21tZW50LnVzZXJuYW1lID0gZGF0YXMudmFsKCkudXNlcm5hbWU7XG4gICAgICAgICAgICAkc2NvcGUuY29tbWVudHMucHVzaChjb21tZW50KTtcbiAgICAgICAgICAgICRzY29wZS4kZXZhbEFzeW5jKCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcmVhZENvbW1lbnRzKClcbn0pIiwiYXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlcil7XG5cdCRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdsb2dpbicsIHtcblx0XHR1cmw6ICcvbG9naW4nLFxuXHRcdHRlbXBsYXRlVXJsOiAnanMvbG9naW4vbG9naW4uaHRtbCcsXG5cdFx0Y29udHJvbGxlcjogJ0xvZ2luQ3RybCdcblx0fSlcbn0pXG5cbmFwcC5jb250cm9sbGVyKCdMb2dpbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZSl7XG4gY29uc29sZS5sb2coJ0xPR0lOIFNUQVRFJylcbn0pIiwiLy9EaXJlY3RpdmUgRmlsZSIsImFwcC5mYWN0b3J5KCdHYW1lRmFjdG9yeScsICgkaHR0cCkgPT4ge1xuICAgIGNvbnN0IEdhbWVGYWN0b3J5ID0ge307XG5cbiAgICBHYW1lRmFjdG9yeS5hZGRVc2VyID0gKCkgPT4ge1xuXG4gICAgfTtcblxuICAgIEdhbWVGYWN0b3J5LnN0YXJ0TmV3R2FtZSA9ICgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coJ3N0YXJ0aW5nIG5ldyBnYW1lJyk7XG4gICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCdodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpL2dhbWVzJywge1xuICAgICAgICAgICAgICAgIG5hbWU6ICd0ZXN0Z2FtZSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmRhdGEpO1xuICAgIH07XG5cbiAgICBHYW1lRmFjdG9yeS5nZXRMb2dnZWRJblVzZXJzR2FtZSA9ICgpID0+IHtcblxuICAgIH07XG5cbiAgICBHYW1lRmFjdG9yeS5qb2luR2FtZUJ5SWQgPSAoZ2FtZUlkKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdqb2luaW5nIGdhbWUnKVxuICAgICAgICAgICAgLy92YXIgcGxheWVyc1RlYW0gPSBcbiAgICAgICAgdmFyIGdhbWVJZCA9IDg7XG4gICAgICAgIHZhciBwbGF5ZXJJZCA9IDI7IC8vZXZlbnR1YWxseSBtYWtlIGl0IGdldCBjdXJyZW50IFxuICAgICAgICByZXR1cm4gJGh0dHAucG9zdChgaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS9nYW1lcy8ke2dhbWVJZH0/cGxheWVySWQ9JHtwbGF5ZXJJZH1gLCB7XG5cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZXR1cm4gR2FtZUZhY3Rvcnk7XG59KTtcbiIsIi8vRmFjdG9yeSBGaWxlIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
