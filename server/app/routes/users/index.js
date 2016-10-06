'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
const db = require('../../../db/');
const User = db.model('user');
const Team = db.model('team');
module.exports = router;

router.get('/', (req, res, next) => {
    User.findAll({where: req.query})
    .then(foundUsers => res.send(foundUsers))
    .catch(next);
});


router.post('/', (req, res, next) => {
    return Team.findOrCreate({
        where: {slack_id: req.body.team.id}, 
        defaults: {name: req.body.team.name}
    })
    .then(returnedTeam => {
        return User.findOrCreate({
            where: {slack_id: req.body.user.id}, 
            defaults: {name: req.body.user.name, avatar: req.body.user.image_72, teamId: returnedTeam[0].dataValues.id}
        })
        .then(returnedUser => {
            res.json({user: returnedUser, team: returnedTeam})
        })
    })
    .catch(next);
})
