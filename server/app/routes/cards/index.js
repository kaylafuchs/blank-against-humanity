'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
const db = require('../../../db/');
const Card = db.model('card')
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
    }

    else {
        return Card.findAll()
        .then(foundCards => res.send(foundCards))
        .catch(next);
    }
});


router.post('/', (req, res, next) => {
    return Card.create(req.body)
    .then(createdCard => res.send(createdCard))
    .catch(next);
})
