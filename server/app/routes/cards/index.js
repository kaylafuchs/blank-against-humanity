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
    // a promise for finding or creating the team associated with the post message
    const teamProm = Team
        .findOrCreate({where: {name: team}})
        .spread(foundTeam => {return foundTeam})
        .catch(err => console.log('team findorcreate failed bc of' + err))
    // a promise for finding or creating the user associated with the post message
    const userProm = User
        .findOrCreate({where: {slack_id: user}})
        .spread(foundUser => foundUser)
        .catch(err => console.log('user findorcreate failed bc of' + err))
    // a promise for finding or creating the deck associated with the post message
    const deckProm = Deck
        .findOrCreate({where: {name: deck}})
        .spread(foundDeck => {return foundDeck})
        .catch(err => console.log('deck findorcreate failed bc of' + err))
    // a promise for creating the card
    const cardProm = Card
        .create({
            text: cardText,
            type: cardType,
        })
        .then(createdCard => {return createdCard})
        .catch(err => console.log('card create failed bc of' + err))
    // run all this async goodness in parallel, and when we're all done let's do some more cool stuff
    Promise
        .all([teamProm, userProm, deckProm, cardProm])
        .then(resultArr => {
            // a promise for associating a user to the team
            const userTeamProm = resultArr[1]
                .setTeam(resultArr[0])
                .then(updatedUser => {return updatedUser})
                .catch(err => console.log('user team assoc failed bc of' + err))
            // a promise for associating a deck to the team
            const deckTeamProm = resultArr[2]
                .setTeam(resultArr[0])
                .then(updatedDeck => {return updatedDeck})
                .catch(err => console.log('deck team assoc failed bc of' + err))
                // a promise for associating a card to the deck
            const cardDeckProm = resultArr[3]
                .setDeck(resultArr[2])
                .then(updatedCard => {return updatedCard})
                .catch(err => console.log('card deck assoc failed bc of' + err))
                // a promise for associating the card to the author
            const cardAuthorProm = resultArr[3]
                .setAuthor(resultArr[1])
                .then(updatedCard => {return updatedCard})
                .catch(err => console.log('card author assoc failed bc of' + err))
            return Promise
                .all([userTeamProm, deckTeamProm, cardDeckProm, cardAuthorProm])
        })
        .then(resArray => {
            res.send(resArray[0].slack_id + ' added a new ' + resArray[2].type + ' to deck ' + resArray[1].name)
        })
        .catch(err => console.log(err))


})
