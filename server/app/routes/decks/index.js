'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
const db = require('../../../db/');
const Deck = db.model('deck');
const Team = db.model('team');
const firebase = require('firebase')
module.exports = router;

router.get('/:teamId', (req, res, next) => {
    return Deck.findAll({
            where: { teamId: req.params.teamId }
        })
        .then(decks => res.send(decks))
        .catch(next);
});

