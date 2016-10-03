'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
const db = require('../../../db/');
const Game = db.model('game');
const firebase = require('firebase')
module.exports = router;



const initializeFB = () => {
    const config = {
        apiKey: "AIzaSyAjm8gBlobk922u5APxv3SB-9KnjQwJqmw",
        authDomain: "blankagainst.firebaseapp.com",
        databaseURL: "https://blankagainst.firebaseio.com",
        storageBucket: "blankagainst.appspot.com",
        messagingSenderId: "580664847840"
    };
    firebase.initializeApp(config);
};

initializeFB()



router.get('/', (req, res, next) => {

});

router.post('/', (req, res, next) => {
    return Game.create(req.body)
        .then(createdGame => {
            //var newRef = firebase.database().ref().child('games').push();
            var newRef = firebase.database().ref(`games/${createdGame.id}`).push();
            newRef.set({
                players: 'obj',
                whitecards: 'whitecardObj',
                blackCards: 'blackcardObj'
            });
        })
});