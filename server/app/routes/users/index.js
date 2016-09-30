'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
const db = require('../../../db/');
const User = db.model('user')
module.exports = router;


// var ensureAuthenticated = function (req, res, next) {
//     if (req.isAuthenticated()) {
//         next();
//     } else {
//         res.status(401).end();
//     }
// };

router.get('/', (req, res, next) => {
    if (req.query.email) {
        return User.findAll({
            where: {
                email: req.query.email
            }
        })
        .then(foundUser => res.send(foundUser))
        .catch(next);
    }

    else {
        return User.findAll()
        .then(foundUsers => res.send(foundUsers))
        .catch(next);
    }
});


router.post('/', (req, res, next) => {
    return User.create(req.body)
    .then(createdUser => res.send(createdUser))
    .catch(next);
})
