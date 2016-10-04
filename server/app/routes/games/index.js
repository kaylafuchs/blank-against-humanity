'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
const db = require('../../../db/');
const Game = db.model('game');
const firebase = require('firebase')
module.exports = router;

router.param('id', (req, res, next, id) => {
    return Game.findById(id)
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

// api/games/teamId=25?
router.get('/', (req, res, next) => {
    if (req.query.team) {
        return Game.findAll({
                where: {
                    teamId: req.query.teamId
                }
            })
            .then(foundGames => res.send(foundGames))
            .catch(next);
    } else {
        return Game.findAll()
            .then(foundGames => res.send(foundGames));
    }

});

router.post('/', (req, res, next) => {
    return Game.create(req.body)
        .then(createdGame => {
            res.send(createdGame);
            const newRef = firebase.database().ref(`games/${createdGame.id}`) //.push();
            newRef.set({
                players: 'obj',
                whiteCards: 'whitecardObj',
                blackCards: 'blackcardObj'
            });
        });
});

// api/games/32?playerId=42
router.post('/:id', (req, res, next) => {
    if (req.query.playerId) {
        console.log('the req game is', req.requestedGame)
        return req.requestedGame.addUsers(req.query.playerId)
            .then(updatedGame => res.send(updatedGame));

    } else {
        res.send('bad request')
    }
})
