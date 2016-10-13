'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
const db = require('../../../db/');
const Game = db.model('game');
const User = db.model('user');
const Card = db.model('card');
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
})
// send out game instance corresponding to id
router.get('/:id', (req, res, next) => {
    res.send(req.requestedGame);
});

// api/games/?teamId=25
// api/games/?userId=2
// get a user or teams games, to display in a lobby
router.get('/', (req, res, next) => {
    if (req.query.userId) {

        return Game.findAll({
                include: [{
                    model: User,
                    through: {
                        attributes: ['player_games'],
                        where: { userId: req.query.userId }
                    }
                }]
            })
            .then(foundGames => res.send(foundGames))
            .catch(next);
    }
// TODO: filter out the team's games that the user is already in
    if (req.query.teamId) {
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


// api/games/2/
// api/games/32?playerId=42
// associate a user to a game in postGreSQL
router.post('/:id', (req, res, next) => {
    if (req.query.playerId) {
        return req.requestedGame.addUsers(req.query.playerId)
            .then(updatedGame => res.send(updatedGame));
    }
    else {
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

            var blackCardRef;
            var whiteCardRef;
            const addingCardsToFb = flatcards.map(card => {
// TODO: get rid of if else, just interpolate card type in firebase route
                if (card.type === 'white') {
                    whiteCardRef = firebase.database().ref(`teams/${req.requestedGame.teamId}/games/${req.requestedGame.id}/pile/whitecards/${card.id}`)
                    return whiteCardRef.set({
                        'text': card.text
                    })
                } else {
                    blackCardRef = firebase.database().ref(`teams/${req.requestedGame.teamId}/games/${req.requestedGame.id}/pile/blackcards/${card.id}`)
                    return blackCardRef.set({
                            'text': card.text
                                // 'pick': card.pick
                        })

                }
            })
            return Promise.all(addingCardsToFb);
        })

})

router.post('/', (req, res, next) => {
    var gameId;
    // TODO: update model to account for settings
    return Game.create({
            name: req.body.name,
            teamId: req.body.teamId,
            settings: req.body.gameConfig
        })
        .then(createdGame => {
            const gameRef = firebase.database().ref(`teams/${req.body.teamId}/games/${createdGame.id}`)
            gameId = createdGame.id;
            return gameRef.set({
                    teamId: req.body.teamId,
                    settings: req.body.settings
                })
                .then(() => {
                    return gameRef.child(`players/${req.body.creatorId}`).set({
                        name: req.body.creatorName //should be player name
                    })
                })
                .then(() => {
                    stateManager(gameId, req.body.teamId, req.body.settings.maxTurnTime)
                    res.send(gameId + '')
                })

        })
        .catch(next)
});

