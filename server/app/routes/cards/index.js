'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
const db = require('../../../db/');
const Card = db.model('card');
module.exports = router;


// var ensureAuthenticated = function (req, res, next) {
//     if (req.isAuthenticated()) {
//         next();
//     } else {
//         res.status(401).end();
//     }
// };

// /api/cards?type=white
router.get('/', (req, res, next) => {
    if (req.query.type) {
        return Card.findAll({
                where: {
                    type: req.query.type
                }
            })
            .then(foundCards => res.send(foundCards))
            .catch(next);
    } else {
        return Card.findAll()
            .then(foundCards => res.send(foundCards))
            .catch(next);
    }
});


router.post('/', (req, res, next) => {
    const cardType = req.body.command.replace('/', '');
    const cardText = req.body.text
    const user = req.body.user_name

    // note: req.body will not currently create a valid card. we need to set this up to work with the
    // req defaults from slack. i'll do this next week. -KF

    return Card.create(req.body)
        .then(createdCard => {
            res.send({
                "text": "New " + cardType + " created by " + user + ": " + "\"" + cardText + "\"",
                "response_type": "in_channel"
            }).status(200);
        })
        .catch(next);
})