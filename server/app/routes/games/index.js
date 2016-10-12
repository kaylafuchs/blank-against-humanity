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

router.param('id', (req, res, next, id) => {
    return Game.findById(id)
        .then(foundGame => {
            if (!foundGame) res.sendStatus(404);
            else req.requestedGame = foundGame;
            next();
        })
        .catch(next);
})

router.get('/:id/decks', (req, res, next) => {
    return req.requestedGame.getDecks()
        .then(foundDecks => res.send(foundDecks))
})

router.get('/:id/users', (req, res, next) => {
    return req.requestedGame.getUsers()
        .then(foundUsers => res.send(foundUsers));
})

router.get('/:id', (req, res, next) => {
    res.send(req.requestedGame);
});

// api/games/?teamId=25
// api/games/?userId=2
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
router.post('/:id', (req, res, next) => {
    if (req.query.playerId) {
        return req.requestedGame.addUsers(req.query.playerId)
            .then(updatedGame => res.send(updatedGame));
    }

    //if ()
    else {
        res.send('bad request')
    }
})

// api/games/firebase/2?playerId=1
router.post('/firebase/:id', (req, res, next) => {
    //how to make this return a thenable func
    if (req.query.playerId) {

        const newRef = firebase.database().ref(`games/${req.requestedGame.id}/players/${req.query.playerId}`) //.push();
        newRef.set({
            playerId: req.query.playerId
        });
        return req.requestedGame.addUsers(req.query.playerId)
            .then(updatedGame => res.send(updatedGame));
    }

    // if ()
    else {
        res.send('bad request')
    }
})


// router.post('/:id/decks', (req, res, next) => {
//     // decksArr = req.body.deck.makearr()
//     const addingDecks = req.body.decks.map(deck => Game.addDeck(deckId));
//     return Promise.all(addingDecks)
//         .then(createdDecks => {
//             const gettingCards = createdDecks.map(deck => deck.getCards())

//             return Promise.all(gettingCards)
//         })
//         .then((cardsArr) => {

//             const flatcards = _.flattenDeep(cardsArr)
//             const addingCardsToFb = flatcards.map(card => {
//                 if (card.type === 'white') {
//                     let whiteCardRef = firebase.database().ref(`teams/${requestedGame.teamId}/games/${requestedGame.id}/pile/whitecard`)
//                     return whiteCardRef.set({
//                         [`${card.id}`]: card
//                     })
//                 } else {
//                     let blackCardRef = firebase.database().ref(`teams/${requestedGame.teamId}/games/${requestedGame.id}/pile/blackcard`)
//                     return blackCardRef.set({
//                         [`${card.id}`]: card
//                     })
//                 }
//             })
//             return Promise.all(addingCardsToFB);
//         })

// })

router.post('/:id/decks', (req, res, next) => {

    console.log(`teams/${req.requestedGame.teamId}/games/${req.requestedGame.id}/pile/blackcard`)
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

                if (card.type === 'white') {
                    //console.log('the card is', card.id, card.type)
                    whiteCardRef = firebase.database().ref(`teams/${req.requestedGame.teamId}/games/${req.requestedGame.id}/pile/whitecards/${card.id}`)
                    return whiteCardRef.set({
                        'text': card.text
                    })
                } else {
                    console.log('the card is', card.id, card.type)
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
    return Game.create({
            name: req.body.name,
            teamId: req.body.teamId
                //settings: req.body.gameConfig
        })
        .then(createdGame => {
            const gameRef = firebase.database().ref(`teams/${req.body.teamId}/games/${createdGame.id}`)
            gameId = createdGame.id;
            return gameRef.set({
                    teamId: req.body.teamId,
                    // settings: req.body.settings
                })
                .then(() => {
                    return gameRef.child(`players/${req.body.creatorId}`).set({
                        name: req.body.creatorName //should be player name
                    })
                })
                .then(() => {
                    stateManager(gameId, req.body.teamId)
                    console.log('createdGame', gameId + '')
                    // res.send(gameId + '')
                })

        })
        .catch(next)
});

