'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
const db = require('../../../db/');
const Game = db.model('game');
const User = db.model('user');
const Card = db.model('card');
const Team = db.model('team');
const firebase = require('firebase')
const _ = require('lodash');
module.exports = router;
const stateManager = require('../../../../utils/managers').stateManager
var gameId;


// get game instance for id, put on req object
router.param('id', (req, res, next, id) => {
    return Game.findById(id)
        .then(foundGame => {
            if (!foundGame) res.sendStatus(404);
            else req.requestedGame = foundGame;
            next();
        })
        .catch(next);
});
// send out game instance corresponding to id

router.get('/:id', (req, res, next) => {
    res.send(req.requestedGame);
});

// api/games?teamId=25
// api/games?userId=2
// api/games?teamId=31&userId=3&open=true
// get a user or teams games, to display in a lobby
router.get('/', (req, res, next) => {

    if (req.query.teamId && req.query.open) {
        console.log('inside route thing')
        return Game.findAll({
                include: [{
                    model: User,
                    where: {
                        id: req.query.userId
                    }
                }]
            }).then((foundGames) => {
                return Game.findAll({
                    include: [{
                        model: Team,
                        where: {
                            id: req.query.teamId,
                        }
                    }],
                    where: {
                        id: {
                            $notIn: foundGames.map(game => game.id)
                        }
                    }
                })


            })
            .then(games => res.send(games))


        //                 .then(users => users.map(user => console.log('id is:', user.id))))
        // res.send(foundGames)


        //get all games for a team
        //get all games for team + userid
        //get find the difference
        // return Game.findAll({
        //         where: {
        //             teamId: req.query.teamId
        //         }
        //     })
        //     .then(foundGames => {
        //         //for every game, return array of its users
        //         const gettingUsers = foundGames.map(game => game.getUsers().then(usersArr => )  )
        //         return Promise.all(gettingUsers)
        //     })
        //     .then(userArrs => {
        //         //for every array of users, check to make sure it doesn't contain req.query.userId. if it doesn't, return it.
        //         console.log('userArrs..can i get gameId?', userArrs[0])
        //     })


        // const gettingTeamGames = Game.findAll({
        //     where: {
        //         teamId: req.query.teamId
        //     }
        // })

        // const gettingUserGames = Game.findAll({
        //     include: [{
        //         model: User,
        //         through: {
        //             attributes: ['player_games'],
        //             where: { userId: req.query.userId }
        //         }
        //     }]
        // })


        // return Promise.all([gettingTeamGames, gettingUserGames])
        //     .then((arr) => {
        //         const teamGames = arr[0];
        //         const userGames = arr[1]; //game 1
        //         console.log('teamgames', teamgames)
        //             //console.log('user games', userGames)
        //             //console.log('the difference is', _.difference(teamGames, userGames))
        //         return _.difference(teamGames, userGames)
        //     })

    } else if (req.query.userId) {
        console.log('userid query')
            // return Game.findAll({
            //         include: [{
            //             model: User,
            //             through: {
            //                 attributes: ['player_games'],
            //                 where: { userId: req.query.userId }
            //             }
            //         }]
            //     })

        return Game.findAll({
                include: [{
                    model: User,
                    where: { id: req.query.userId }
                }],
                // where: { userId: req.query.userId }
            })
            // return Game.findAll({
            //     include: [{
            //         model: User,
            //         through: { attributes: 'player_games' }
            //     }],
            //     where: { userId: req.query.userId }
            // })



        .then(foundGames => res.send(foundGames))
            .catch(next);
    }
    // TODO: filter out the team's games that the user is already in
    else if (req.query.teamId) {
        console.log('teamid query')
        return Game.findAll({
                where: {
                    teamId: req.query.teamId
                }
            })
            .then(foundGames => res.send(foundGames))
            .catch(next);
    } else {
        console.log('else query')
        return Game.findAll()
            .then(foundGames => res.send(foundGames));
    }

});


// api/games/2/
// api/games/32?playerId=42
// associate a user to a game in postGreSQL
router.post('/:id', (req, res, next) => {
        if (req.query.playerId) {
            console.log(req.body);
            return req.requestedGame.addUsers(+req.query.playerId)
                .then(updatedGame => res.send(updatedGame));
        } else {
            res.send('bad request')
        }
    })
    // put all the cards for selected decks in the games firebase object
router.post('/:id/decks', (req, res, next) => {

    const gettingCards = req.body.decks.map(deckId => Card.findAll({
        where: {
            deckId: deckId
        }
    }));

    return Promise.all(gettingCards)
        .then((cardsArr) => {
            const flatcards = _.flattenDeep(cardsArr)

            var blackCardRef;
            var whiteCardRef;
            const addingCardsToFb = flatcards.map(card => {
                // TODO: get rid of if else, just interpolate card type in firebase route
                if (card.type === 'white') {
                    whiteCardRef = firebase.database().ref(`teams/${req.requestedGame.teamId}/games/${req.requestedGame.id}/pile/whitecards/${card.id}`)
                    return whiteCardRef.set({
                        'text': card.text
                    })
                } else {
                    blackCardRef = firebase.database().ref(`teams/${req.requestedGame.teamId}/games/${req.requestedGame.id}/pile/blackcards/${card.id}`)
                    return blackCardRef.set({
                        'text': card.text
                            // 'pick': card.pick
                    })

                }
            })
            return Promise.all(addingCardsToFb)
        })
        .then(() => {
            stateManager(req.requestedGame.id, req.requestedGame.teamId)
            res.sendStatus(200)
        })

})

router.post('/', (req, res, next) => {

    var gameId;
    return Game.create({
            name: req.body.name,
            teamId: req.body.teamId,
            maxPlayers: req.body.settings.maxPlayers,
            minPlayers: req.body.settings.minPlayers,
            maxTurnTime: req.body.settings.maxTurnTime

        })
        .then(createdGame => {
            const gameRef = firebase.database().ref(`teams/${req.body.teamId}/games/${createdGame.id}`)
            gameId = createdGame.id;
            return gameRef.set({
                    teamId: req.body.teamId,
                    settings: req.body.settings
                })
                .then(() => {
                    return gameRef.child(`players/${req.body.creatorId}`).set({
                        name: req.body.creatorName //should be player name
                    })
                })
                .then(() => {
                    res.send(gameId + '');
                })

        })
        .catch(next)
});

