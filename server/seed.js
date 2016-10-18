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


const seedWhiteCardsSFW = () => {
    const cards = [{
        text: 'Bootcamp Grads',
        type: 'white',
        deckId: 3
    }, {
        text: 'Being late to standup',
        type: 'white',
        deckId: 3
    }, {
        text: 'Inverting Binary Search Trees',
        type: 'white',
        deckId: 3
    }, {
        text: 'Watercooler Friends',
        type: 'white',
        deckId: 3
    }, {
        text: 'Head bartender at willy’ s pub',
        type: 'white',
        deckId: 3
    }, {
        text: 'Execs',
        type: 'white',
        deckId: 3
    }, {
        text: 'jQuery',
        type: 'white',
        deckId: 3
    }, {
        text: 'Being a Scrumlord',
        type: 'white',
        deckId: 3
    }, {
        text: 'What makes a javascript developer sad?',
        type: 'black',
        deckId: 3,
        pick: 1
    }, {
        text: 'React',
        type: 'white',
        deckId: 3
    }, {
        text: 'Webpack',
        type: 'white',
        deckId: 3
    }, {
        text: 'Internal Server Error',
        type: 'white',
        deckId: 3
    }, {
        text: 'Computer Science',
        type: 'white',
        deckId: 3
    }, {
        text: 'DROP TABLES',
        type: 'white',
        deckId: 3
    }, {
        text: 'A never ending promise chain',
        type: 'white',
        deckId: 3
    }, {
        text: 'Callback hell',
        type: 'white',
        deckId: 3
    }, {
        text: 'Cross Browser Compatibility',
        type: 'white',
        deckId: 3
    }, {
        text: 'Sanitizing your inputs',
        type: 'white',
        deckId: 3
    }, {
        text: 'Internal Server Error',
        type: 'white',
        deckId: 3
    }, {
        text: 'Computer Science',
        type: 'white',
        deckId: 3
    }, {
        text: 'DROP TABLES',
        type: 'white',
        deckId: 3
    }, {
        text: 'A never ending promise chain',
        type: 'white',
        deckId: 3
    }, {
        text: 'Callback hell',
        type: 'white',
        deckId: 3
    }, {
        text: 'Cross Browser Compatibility',
        type: 'white',
        deckId: 3
    }, {
        text: 'Sanitizing your inputs',
        type: 'white',
        deckId: 3
    },{
        text: 'Sanitizing your inputs',
        type: 'white',
        deckId: 3
    }, {
        text: 'Internal Server Error',
        type: 'white',
        deckId: 3
    }, {
        text: 'Computer Science',
        type: 'white',
        deckId: 3
    }, {
        text: 'DROP TABLES',
        type: 'white',
        deckId: 3
    }, {
        text: 'A never ending promise chain',
        type: 'white',
        deckId: 3
    }, {
        text: 'Callback hell',
        type: 'white',
        deckId: 3
    }, {
        text: 'Cross Browser Compatibility',
        type: 'white',
        deckId: 3
    }, {
        text: 'Sanitizing your inputs',
        type: 'white',
        deckId: 3
    }, {
        text: '404: ______ not found.',
        type: 'black',
        deckId: 3,
        pick: 1
    }]

    const creatingCards = cards.map(card => Card.create(card))
    return Promise.all(creatingCards)
}

const seedOtherCardsSFW = () => {
    const cards = [{
        text: 'Blank Against Humanity',
        type: 'white',
        deckId: 4
    }, {
        text: 'Preteens.',
        type: 'white',
        deckId: 4
    }, {
        text: 'Former President George W. Bush',
        type: 'white',
        deckId: 4
    }, {
        text: 'Stranger danger',
        type: 'white',
        deckId: 4
    }, {
        text: 'Nickelback',
        type: 'white',
        deckId: 4
    }, {
        text: 'The Chinese gymnastics team.',
        type: 'white',
        deckId: 4
    }, {
        text: 'Figgy pudding.',
        type: 'white',
        deckId: 4
    }, {
        text: 'The Tempur-Pedic &reg; Swedish Sleep System &trade.',
        type: 'white',
        deckId: 4
    }, {
        text: 'Who should I hire?',
        type: 'black',
        deckId: 4,
        pick: 1
    }]

    const creatingCards = cards.map(card => Card.create(card))
    return Promise.all(creatingCards)

}

db.sync({
        force: true
    })
    .then(() => Promise.all([seedUsers(), seedTeams(), seedDecks()]))
    .then(() => Promise.all([seedBlackCards(), seedWhiteCards(), seedWhiteCardsSFW(), seedOtherCardsSFW()]))
    .then(() => {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
