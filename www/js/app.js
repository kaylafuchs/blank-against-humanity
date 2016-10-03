// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
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
})

.factory('GameFactory', () => {
    const GameFactory = {};
    var config = {
        apiKey: "AIzaSyAjm8gBlobk922u5APxv3SB-9KnjQwJqmw",
        authDomain: "blankagainst.firebaseapp.com",
        databaseURL: "https://blankagainst.firebaseio.com",
        storageBucket: "blankagainst.appspot.com",
        messagingSenderId: "580664847840"
    };
    firebase.initializeApp(config);

    GameFactory.startNewGame = () => {
        console.log('starting new game');
        //var newRef = firebase.database().ref().child('games').push();
        var newRef = firebase.database().ref('games/').push();
        newRef.set({
            players: 'obj',
            whitecards: 'whitecardObj',
            blackCards: 'blackcardObj'
        })

    };

    return GameFactory;
})

.controller('MainCtrl', ($scope, GameFactory) => {
    $scope.test = 'hey'
    $scope.func = GameFactory.test
    $scope.startNewGame = GameFactory.startNewGame;
})