'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
const db = require('../../../db/');
const Game = db.model('game');
const User = db.model('user');
const Card = db.model('card');
const Team = db.model('team');
const firebase = require('firebase')
const _ = require('lodash');
module.exports = router;
const stateManager = require('../../../../utils/managers').stateManager

// get game instance for id, put on req object
router.param('id', (req, res, next, id) => {
    return Game.findById(id)
        .then(foundGame => {
            if (!foundGame) res.sendStatus(404);
            else req.requestedGame = foundGame;
            next();
        })
        .catch(next);
});
// send out game instance corresponding to id

router.get('/:id', (req, res, next) => {
    res.send(req.requestedGame);
});

// api/games?teamId=25
// api/games?userId=2
// api/games?teamId=31&userId=3&open=true
// get a user or teams games, to display in a lobby
router.get('/', (req, res, next) => {
    return Game.findAll({
            where: {
                teamId: req.query.teamId
            }
        })
        .then(foundGames => res.send(foundGames))
        .catch(next);
});


// api/games/2/
// api/games/32?playerId=42
// associate a user to a game in postGreSQL
router.post('/:id', (req, res, next) => {
        if (req.query.playerId) {
            console.log(req.body);
            return req.requestedGame.addUsers(+req.query.playerId)
                .then(updatedGame => res.send(updatedGame));
        } else {
            res.send('bad request')
        }
    })
    // put all the cards for selected decks in the games firebase object
router.post('/:id/decks', (req, res, next) => {

    const gettingCards = req.body.decks.map(deckId => Card.findAll({
        where: {
            deckId: deckId
        }
    }));

    return Promise.all(gettingCards)
        .then((cardsArr) => {
            const flatcards = _.flattenDeep(cardsArr)
            const addingCardsToFb = flatcards.map(card => {
                let cardRef = firebase.database().ref(`teams/${req.requestedGame.teamId}/games/${req.requestedGame.id}/pile/${card.type}cards/${card.id}`)
                return cardRef.set({
                    'text': card.text,
                    'pick': card.pick
                })
            })

            return Promise.all(addingCardsToFb)
        })
        .then(() => {
            stateManager(req.requestedGame.id, req.requestedGame.teamId, req.requestedGame.maxTurnTime, req.requestedGame.minPlayers)
            res.sendStatus(200)
        })

});

router.post('/', (req, res, next) => {
    var gameId;
    return Game.create({
            name: req.body.name,
            teamId: req.body.teamId,
            maxPlayers: req.body.settings.maxPlayers,
            minPlayers: req.body.settings.minPlayers,
            maxTurnTime: req.body.settings.maxTurnTime
        })
        .then(createdGame => {
            gameId = createdGame.id
            return createdGame.addUsers(+req.body.creatorId);
        })
        .then(() => firebase.database().ref(`teams/${req.body.teamId}/games/${gameId}`).set({
            teamId: req.body.teamId,
            settings: req.body.settings
        }))
        .then(() => firebase.database().ref(`teams/${req.body.teamId}/games/${gameId}/players/${req.body.creatorId}`).set({
            name: req.body.creatorName
        }))
        .then(() => {
            res.send(gameId + '');
        })
        .catch(next);
});