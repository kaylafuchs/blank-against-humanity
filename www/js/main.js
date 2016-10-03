'use strict';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic']).run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
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
}).controller('MainCtrl', function($scope, GameFactory) {
    $scope.test = 'hey';
    $scope.func = GameFactory.test;
    $scope.startNewGame = GameFactory.startNewGame;
});
'use strict';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic']).run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
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
}).controller('MainCtrl', function($scope, GameFactory) {
    $scope.test = 'hey';
    $scope.func = GameFactory.test;
    $scope.startNewGame = GameFactory.startNewGame;
});
//Directive File
angular.module('starter').factory('GameFactory', function() {
    var GameFactory = {};

    GameFactory.addUser = function() {};

    GameFactory.startNewGame = function() {
        console.log('starting new game');
        return $http.post('/api/games', {
            name: 'testgame'
        }).then(function(res) {
            return res.data;
        });
    };

    return GameFactory;
});
//Factory File


//Directive File
angular.module('starter').factory('GameFactory', function() {
    var GameFactory = {};

    GameFactory.addUser = function() {};

    GameFactory.startNewGame = function() {
        console.log('starting new game');
        return $http.post('/api/games', {
            name: 'testgame'
        }).then(function(res) {
            return res.data;
        });
    };

    return GameFactory;
});
//Factory File
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImNvbW1vbi9kaXJlY3RpdmVzL2RpcmVjdGl2ZS5qcyIsImNvbW1vbi9mYWN0b3JpZXMvR2FtZUZhY3RvcnkuanMiLCJjb21tb24vZmFjdG9yaWVzL2ZhY3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOztBQUVBO0FBQ0EsMkJBQ0EsQUFDQSxjQUFBLFVBQUEsZ0JBQUEsQUFFQSxBQUNBO0FBQUEsbUJBQUEsTUFBQSxZQUNBO0FBQUEsWUFBQSxPQUFBLFdBQUEsT0FBQSxRQUFBLFFBQUEsVUFDQTtBQUNBO0FBQ0E7QUFBQSxvQkFBQSxRQUFBLFNBQUEseUJBQUEsQUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFBQSxvQkFBQSxRQUFBLFNBQUEsY0FBQSxBQUNBO0FBQ0E7QUFBQSxZQUFBLE9BQUEsV0FDQTtBQUFBLHNCQUFBLEFBQ0E7QUFiQSxBQWNBO0FBakJBLEFBa0JBLEFBQ0E7QUFuQkEsQUFtQkEsQUFDQSxHQUFBLFdBQUEsMkNBQ0E7QUFBQSxXQUFBLE9BQUEsQUFDQTtBQUFBLGtCQUFBLFlBdEJBLEFBc0JBLEFBQ0E7c0NDNUJBOztBQ0FBLEFBQ0EsQUFDQSxBQUNBOztBQUVBLEFBRUE7OztBQUVBO0FBQ0E7QUFDQSxlQUFBLFdBQUEsV0FBQSw4QkFDQTtBQUFBLHFDQURBO0FBQUEsQUFHQSxZQUhBLEFBR0EsbURBQUE7QUFIQSxBQUdBO0FBTEEsQUFNQTs4REFFQTs7QUFqQkEsQUFpQkEsQUFDQTtBQ2xCQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW9uaWMgU3RhcnRlciBBcHBcblxuLy8gYW5ndWxhci5tb2R1bGUgaXMgYSBnbG9iYWwgcGxhY2UgZm9yIGNyZWF0aW5nLCByZWdpc3RlcmluZyBhbmQgcmV0cmlldmluZyBBbmd1bGFyIG1vZHVsZXNcbi8vICdzdGFydGVyJyBpcyB0aGUgbmFtZSBvZiB0aGlzIGFuZ3VsYXIgbW9kdWxlIGV4YW1wbGUgKGFsc28gc2V0IGluIGEgPGJvZHk+IGF0dHJpYnV0ZSBpbiBpbmRleC5odG1sKVxuLy8gdGhlIDJuZCBwYXJhbWV0ZXIgaXMgYW4gYXJyYXkgb2YgJ3JlcXVpcmVzJ1xuYW5ndWxhci5tb2R1bGUoJ3N0YXJ0ZXInLCBbJ2lvbmljJ10pXG5cbi5ydW4oZnVuY3Rpb24oJGlvbmljUGxhdGZvcm0pIHtcbiAgICAgICAgJGlvbmljUGxhdGZvcm0ucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgICAgICAgICAgIC8vIEhpZGUgdGhlIGFjY2Vzc29yeSBiYXIgYnkgZGVmYXVsdCAocmVtb3ZlIHRoaXMgdG8gc2hvdyB0aGUgYWNjZXNzb3J5IGJhciBhYm92ZSB0aGUga2V5Ym9hcmRcbiAgICAgICAgICAgICAgICAvLyBmb3IgZm9ybSBpbnB1dHMpXG4gICAgICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcblxuICAgICAgICAgICAgICAgIC8vIERvbid0IHJlbW92ZSB0aGlzIGxpbmUgdW5sZXNzIHlvdSBrbm93IHdoYXQgeW91IGFyZSBkb2luZy4gSXQgc3RvcHMgdGhlIHZpZXdwb3J0XG4gICAgICAgICAgICAgICAgLy8gZnJvbSBzbmFwcGluZyB3aGVuIHRleHQgaW5wdXRzIGFyZSBmb2N1c2VkLiBJb25pYyBoYW5kbGVzIHRoaXMgaW50ZXJuYWxseSBmb3JcbiAgICAgICAgICAgICAgICAvLyBhIG11Y2ggbmljZXIga2V5Ym9hcmQgZXhwZXJpZW5jZS5cbiAgICAgICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICAgICAgICAgICAgU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KVxuICAgIC5jb250cm9sbGVyKCdNYWluQ3RybCcsICgkc2NvcGUsIEdhbWVGYWN0b3J5KSA9PiB7XG4gICAgICAgICRzY29wZS50ZXN0ID0gJ2hleSdcbiAgICAgICAgJHNjb3BlLmZ1bmMgPSBHYW1lRmFjdG9yeS50ZXN0XG4gICAgICAgICRzY29wZS5zdGFydE5ld0dhbWUgPSBHYW1lRmFjdG9yeS5zdGFydE5ld0dhbWU7XG4gICAgfSkiLCIvL0RpcmVjdGl2ZSBGaWxlIiwiYW5ndWxhclxuICAgIC5tb2R1bGUoJ3N0YXJ0ZXInKVxuICAgIC5mYWN0b3J5KCdHYW1lRmFjdG9yeScsICgpID0+IHtcbiAgICAgICAgY29uc3QgR2FtZUZhY3RvcnkgPSB7fTtcblxuICAgICAgICBHYW1lRmFjdG9yeS5hZGRVc2VyID0gKCkgPT4ge1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgR2FtZUZhY3Rvcnkuc3RhcnROZXdHYW1lID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3N0YXJ0aW5nIG5ldyBnYW1lJyk7XG4gICAgICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2FwaS9nYW1lcycsIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3Rlc3RnYW1lJ1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gR2FtZUZhY3Rvcnk7XG4gICAgfSk7IiwiLy9GYWN0b3J5IEZpbGUiXX0=