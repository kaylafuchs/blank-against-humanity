angular
    .module('starter')
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

        // GameFactory.test = () => {
        //     console.log('it worked')
        // };

        GameFactory.addUser = () => {

        };

        GameFactory.startNewGame = () => {
            console.log('starting new game');
            var newRef = firebase.database().ref().child('games').push();
            newRef.set({
                players: 'obj',
                whitecards: 'whitecardObj',
                blackCards: 'blackcardObj'
            })

        };

        return GameFactory;
    });