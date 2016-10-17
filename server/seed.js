const chalk = require('chalk');
const db = require('./db');
const User = db.model('user');
const Card = db.model('card');
const Team = db.model('team');
const Deck = db.model('deck');
const Promise = require('sequelize').Promise;
const getBlackCardData = require('./getBlackCards');
const getWhiteCardData = require('./getWhiteCards');

const seedUsers = function() {
    const users = [{
        email: 'testing@fsa.com',
        password: 'password'
    }, {
        email: 'obama@gmail.com',
        password: 'potus'
    }];

    const creatingUsers = users.map(function(userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);
};

const seedTeams = () => {
    const teams = [
        { name: 'default' },
        { name: 'Fullstack Academy', slack_id: 'T024FPYBQ' },

    ]

    const creatingTeams = teams.map(team => Team.create(team))
    return Promise.all(creatingTeams)
};

const seedDecks = () => {
    const decks = [{
        name: 'Cards Against Humanity',
        teamId: 1
    }, {
        name: 'Execs',
        teamId: 2
    }, {
        name: 'Dev Team',
        teamId: 2
    }, {
        name: 'Watercooler Friends',
        teamId: 2
    }]



    const creatingDecks = decks.map(deck => Deck.create(deck))
    return Promise.all(creatingDecks)
};

const seedBlackCards = () => {
    return getBlackCardData
        .then(cards => Promise.all(cards.map((card, index) => {
            card.deck = 1;
            card.type = 'black'
            card.deckId = (index % 2 === 0) ? 1 : 2;
            return Card.create(card)


        })));
};

const seedWhiteCards = () => {
    const cardObj = {};
    return getWhiteCardData
        .then(cards => Promise.all(cards.map((card, index) => {
            cardObj.text = card;
            cardObj.deck = 1;
            cardObj.type = 'white';
            cardObj.deckId = (index % 2 === 0) ? 1 : 2;
            return Card.create(cardObj);
        })))
};


db.sync({
        force: true
    })
    .then(() => Promise.all([seedUsers(), seedTeams(), seedDecks()]))
    .then(() => Promise.all([seedBlackCards(), seedWhiteCards()]))
    .then(() => {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });

