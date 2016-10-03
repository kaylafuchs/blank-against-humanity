const chalk = require('chalk');
const db = require('./server/db');
const User = db.model('user');
const Card = db.model('card')
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

const seedBlackCards = () => {
    return getBlackCardData
        .then(cards => Promise.all(cards.map(card => {
            card.deck = 'Base Set';
            card.type = 'black'
            return Card.create(card)
        })));
};

const seedWhiteCards = () => {
    const cardObj = {};
    return getWhiteCardData
        .then(cards => Promise.all(cards.map(card => {
            cardObj.text = card;
            cardObj.deck = 'Base Set'
            cardObj.type = 'white';
            return Card.create(cardObj);
        })))
};

db.sync({
        force: true
    })
    .then(() => Promise.all([seedUsers(), seedBlackCards(), seedWhiteCards()]))
    .then(() => {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });