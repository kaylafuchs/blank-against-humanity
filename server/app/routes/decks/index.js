'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
const db = require('../../../db/');
const Deck = db.model('deck');
const Team = db.model('team');
const Card = db.model('card');
const firebase = require('firebase')
module.exports = router;



router.get('/:deckId/cards', (req, res, next) => {
    return Card.findAll({
            where: {
                deckId: req.params.deckId
            }
        })
        .then(cards => res.send(cards))
        .catch(next)
})

router.get('/:deckId', (req, res, next) => {
    return Deck.findById(req.params.deckId)
        .then(decks => res.send(decks))
});

router.get('/', (req, res, next) => {
    if (req.query.team) {
        return Deck.findAll({
                where: {
                    teamId: req.query.team
                }
            })
            .then(decks => res.send(decks))
            .catch(next);
    } else {
        return Deck.findAll()
            .then(decks => res.send(decks))
            .catch(next);
    }

});

