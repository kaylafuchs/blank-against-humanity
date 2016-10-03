'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
const db = require('../../../db/');
const Game = db.model('game');
const firebase = require('firebase')
module.exports = router;

const initializeFirebase = () => {
    const config = {
        apiKey: "AIzaSyAjm8gBlobk922u5APxv3SB-9KnjQwJqmw",
        authDomain: "blankagainst.firebaseapp.com",
        databaseURL: "https://blankagainst.firebaseio.com",
        storageBucket: "blankagainst.appspot.com",
        messagingSenderId: "580664847840"
    };
    firebase.initializeApp(config);
};
initializeFirebase();

router.get('/', (req, res, next) => {
    return Game.findAll()
        .then(foundGames => res.send(foundGames));
});

// 
router.post('/', (req, res, next) => {
    return Game.create(req.body)
        .then(createdGame => {
            res.send(createdGame);
            var newRef = firebase.database().ref(`games/${createdGame.id}`) //.push();
            newRef.set({
                players: 'obj',
                whitecards: 'whitecardObj',
                blackCards: 'blackcardObj'
            })
        })
});