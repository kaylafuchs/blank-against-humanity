'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
module.exports = router;

// var ensureAuthenticated = function (req, res, next) {
//     if (req.isAuthenticated()) {
//         next();
//     } else {
//         res.status(401).end();
//     }
// };


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