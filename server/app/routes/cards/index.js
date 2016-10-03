'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
const db = require('../../../db/');
const Card = db.model('card')
const User = db.model('user')
const Team = db.model('team')
const Deck = db.model('deck')
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
    const cardType = req.body.command.replace('/','');
    const cardText = req.body.text
    const user = req.body.user_name
    const deck = req.body.channel_name
    const team = req.body.team_domain

    // note: req.body will not currently create a valid card. we need to set this up to work with the
    // req defaults from slack. i'll do this next week. -KF


    const teamProm = Team
        .findOrCreate({where: {name: team}})
        .then(foundTeam => {return foundTeam})
        .catch(err => console.log('team findorcreate failed bc of' + err))
    const userProm = User
        .findOrCreate({where: {slack_id: user}})
        .then(foundUser => {return foundUser})
        .catch(err => console.log('user findorcreate failed bc of' + err))
    const deckProm = Deck
        .findOrCreate({where: {name: deck}})
        .then(foundDeck => {return foundDeck})
        .catch(err => console.log('deck findorcreate failed bc of' + err))
    const cardProm = Card
        .create({
            text: cardText,
            type: cardType,
        })
        .then(createdCard => {return createdCard})
        .catch(err => console.log('card create failed bc of' + err))
    Promise
        .all([teamProm, userProm, deckProm, cardProm])
        .then(resultArr => {
            const userTeamProm = resultArr[1]
                .setTeam(resultArr[0])
                .then(updatedUser => {return updatedUser})
                .catch(err => console.log('user team assoc failed bc of' + err))
            const deckTeamProm = resultArr[2]
                .setTeam(resultArr[0])
                .then(updatedDeck => {return updatedDeck})
                .catch(err => console.log('deck team assoc failed bc of' + err))
            const cardDeckProm = resultArr[3]
                .setDeck(resultArr[2])
                .then(updatedCard => {return updatedCard})
                .catch(err => console.log('card deck assoc failed bc of' + err))
            const cardAuthorProm = resultArr[3]
                .setAuthor(resultArr[1])
                .then(updatedCard => {return updatedCard})
                .catch(err => console.log('card author assoc failed bc of' + err))
            return Promise
                .all([userTeamProm, deckTeamProm, cardDeckProm, cardAuthorProm])
        })
        .then(resArray => {
            res.send(resArray[1].name + 'added a new' + resArray[2].type + 'to deck' + resArray[1].name)
        })
        .catch(err => console.log(err))


})
