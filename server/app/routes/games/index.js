'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
const db = require('../../../db/');
const Game = db.model('game');
const User = db.model('user');
const Card = db.model('card');
const firebase = require('firebase')
const _ = require('lodash');
module.exports = router;

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


router.post('/:id/decks', (req, res, next) => {

    // const addingDecks = req.body.decks.map(deckId => Game.addDecks(deckId));

    // return Promise.all(addingDecks)
    //     .then(createdDecks => {
    //         const gettingCards = createdDecks.map(deck => deck.getCards())

    //         return Promise.all(gettingCards);
    //     })

    console.log(`teams/${req.requestedGame.teamId}/games/${req.requestedGame.id}/pile/blackcard`)
    const gettingCards = req.body.decks.map(deckId => Card.findAll({
        where: {
            deckId: deckId
        }
    }));

    return Promise.all(gettingCards)
        .then((cardsArr) => {
            const flatcards = _.flattenDeep(cardsArr)

            // const addingCardsToFB = flatcards.map(card => {
            //     if (card.type === 'white') {
            //         let whiteCardRef = firebase.database().ref(`teams/${req.requestedGame.teamId}/games/${req.requestedGame.id}/pile/whitecards`)
            //         whiteCardRef.set({
            //             //[`${card.id}`]: card
            //             [`${card.id}`]: 'asdfad'
            //         })
            //     } else {
            //         // console.log('adding bcard:', card)
            //         let blackCardRef = firebase.database().ref(`teams/${req.requestedGame.teamId}/games/${req.requestedGame.id}/pile/blackcards`)
            //         blackCardRef.set({
            //             //[`${card.id}`]: card
            //             [`${card.id}`]: 'asdfasfd'
            //         })
            //     }
            // })
            // return Promise.all(addingCardsToFB);
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
                        // var blackCardRef = firebase.database().ref(`teams/${req.requestedGame.teamId}/games/${req.requestedGame.id}/pile/blackcards`)
                        // blackCardRef.set({
                        //     //[`${card.id}`]: card
                        //     [`${card.id}`]: 'asdfasfd'
                        // })
                }
            })
            return Promise.all(addingCardsToFb);
        })

})

//create game in postgres then in firebase
// api/teams/2/games/

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
                    settings: req.body.settings
                })
                .then(() => {
                    const firstPlayerRef = firebase.database().ref(`teams/${req.body.teamId}/games/${createdGame.id}/players/${req.body.creatorId}`)
                    return firstPlayerRef.set({
                        name: req.body.creatorName //should be player name
                    })
                })
                .then(() => {
                    console.log('createdGame', gameId + '')
                    res.send(gameId + '')
                })

        })
        .catch(next)
});

