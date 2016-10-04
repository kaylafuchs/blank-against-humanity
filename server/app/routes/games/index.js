'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
const db = require('../../../db/');
const Game = db.model('game');
const firebase = require('firebase')
module.exports = router;

router.param('id', (req, res, next, id) => {
    Game.findById(id)
        .then(foundGame => {
            if (!foundGame) res.sendStatus(404)
            else req.requestedGame = foundGame;
            next();
        })
        .catch(next);
})

router.get('/:id', (req, res, next) => {
    res.send(req.requestedGame);
});

router.get('/', (req, res, next) => {
    return Game.findAll()
        .then(foundGames => res.send(foundGames));
});

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

// api/games/32?playerId=42
router.post('/:id', (req, res, next) => {
    if (req.query.playerId) {
        console.log('the req game is', req.requestedGame)
        // res.send(req.requestedGame)
        return req.requestedGame.addUsers(req.query.playerId)
            //.updateAttributes(req.body)
            .then(updatedGame => res.send(updatedGame));

    } else {
        res.send('bad request')
    }
})
