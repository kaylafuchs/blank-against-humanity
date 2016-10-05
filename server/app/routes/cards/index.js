'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
const db = require('../../../db/');
const Card = db.model('card')
const User = db.model('user')
const Team = db.model('team')
const Deck = db.model('deck')
const _ = require('lodash')
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

// /api/cards/deckId?type=white
router.get('/:deckId', (req,res,next) => {
    Deck.findById(req.params.id)
    .then(deckCards => res.send(foundCards))
    .catch(next);
})


router.post('/', (req, res, next) => {
    const cardType = req.body.command.replace('/', '');
    const cardText = req.body.text
    const user = req.body.user_name
    const deck = req.body.channel_name
    const team = req.body.team_domain
    const taggedUserNames = _.chain(cardText)
        .split(' ')
        .filter(word => _.startsWith(word, '@'))
        .map(userName => userName.slice(1, userName.length))
        .value();
    const imgUrl = _.chain(cardText)
        .split(' ')
        .dropWhile(element => !/(https?:\/\/\S+\.(?:jpg|png|gif))/.test(element))
        .value()
    let pick = 0
    if (cardType === 'blackcard') {
        _.chain(cardText)
            .split(' ')
            .each(element => {
                if (element === 'blank') {
                    pick++
                }
            })
            .value()
            // pick should always be one for black cards because people will always be submitting at least 1 card
        if (pick === 0) pick++
    }
    let taggedUsersProm = []
    _.forEach(taggedUserNames, name => {
        taggedUsersProm.push(User
            .findOrCreate({
                where: {
                    slack_id: name
                }
            })
            .spread(foundUser => foundUser))
    })
    taggedUsersProm = Promise.all(taggedUsersProm)
        .then(taggedUsersArr => taggedUsersArr)
        // a promise for finding or creating the team associated with the post message
    const teamProm = Team
        .findOrCreate({
            where: {
                name: team
            }
        })
        .spread(foundTeam => {
            return foundTeam
        })
        .catch(err => console.log('team findorcreate failed bc of' + err))
        // a promise for finding or creating the user associated with the post message
    const authorProm = User
        .findOrCreate({
            where: {
                slack_id: user
            }
        })
        .spread(foundUser => foundUser)
        .catch(err => console.log('user findorcreate failed bc of' + err))
        // a promise for finding or creating the deck associated with the post message
    const deckProm = Deck
        .findOrCreate({
            where: {
                name: deck
            }
        })
        .spread(foundDeck => {
            return foundDeck
        })
        .catch(err => console.log('deck findorcreate failed bc of' + err))
        // a promise for creating the card
    const cardProm = Card
        .create({
            text: cardText,
            type: cardType,
            image_url: imgUrl[0],
            pick: pick
        })
        .then(createdCard => {
            return createdCard
        })
        .catch(err => console.log('card create failed bc of' + err))
        // run all this async goodness in parallel, and when we're all done let's do some more cool stuff
    Promise
        .all([teamProm, authorProm, deckProm, cardProm, taggedUsersProm])
        .then(resultArr => {
            // a promise for associating a user to the team
            const userTeamProm = resultArr[1]
                .setTeam(resultArr[0])
                .then(updatedUser => {
                    return updatedUser
                })
                .catch(err => console.log('user team assoc failed bc of' + err))
                // a promise for associating a deck to the team
            const deckTeamProm = resultArr[2]
                .setTeam(resultArr[0])
                .then(updatedDeck => {
                    return updatedDeck
                })
                .catch(err => console.log('deck team assoc failed bc of' + err))
                // a promise for associating a card to the deck
            const cardDeckProm = resultArr[3]
                .setDeck(resultArr[2])
                .then(updatedCard => {
                    return updatedCard
                })
                .catch(err => console.log('card deck assoc failed bc of' + err))
                // a promise for associating the card to the author
            const cardAuthorProm = resultArr[3]
                .setAuthor(resultArr[1])
                .then(updatedCard => {
                    return updatedCard
                })
                .catch(err => console.log('card author assoc failed bc of' + err))
            const cardTaggedUsersProm = resultArr[3]
                .setUsers(resultArr[4])
                .then(updatedCard => updatedCard)
            return Promise
                .all([userTeamProm, deckTeamProm, cardDeckProm, cardAuthorProm, cardTaggedUsersProm])
        })
        .then(resArray => {
            res.send({
                "response_type": "in_channel",
                "text": resArray[0].slack_id + ' added a new ' + resArray[2].type + ' to deck ' + resArray[1].name,
                "attachments": [{
                    "text": resArray[2].text
                }]
            })
        })
        .catch(err => console.log(err))
})
